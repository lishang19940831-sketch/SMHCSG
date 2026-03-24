import { _decorator, Component, Node, Vec3, CCFloat, CCInteger, input, Input, EventTouch, Animation } from 'cc';
import { CommonEvent } from '../Common/CommonEnum';
import { TrainTrack } from './TrainTrack';
import { TrainCar } from './TrainCar';
import { ObjectType } from '../Common/CommonEnum';
import { TrainUnloadManager, IResourceContainer } from './TrainUnloadManager';
import { ResourceFieldManager } from './ResourceFieldManager';
import { WheatCrop } from './WheatCrop';

const { ccclass, property } = _decorator;

/**
 * 火车状态枚举
 */
export enum TrainState {
    /** 停在站台，等待出发 */
    Idle = 'Idle',
    /** 沿轨道行驶中 */
    Moving = 'Moving',
    /** 到达站台，正在卸载资源 */
    StopAtStation = 'StopAtStation',
    /** 资源飞出动画进行中（禁止上车） */
    Unloading = 'Unloading',
}

/**
 * Train —— 单辆火车控制器
 *
 * 设计说明：
 *  - 每辆火车对应一个独立节点，挂载本组件
 *  - 车厢节点通过 Inspector 拖入 trainCars 数组（每辆火车固定自己的车厢数）
 *  - 由 TrainManager 负责3辆火车的切换（隐藏旧火车、激活新火车）
 *  - 升级切换时，TrainManager 调用 initAtProgress() 让新火车从旧火车位置继续行驶
 *  - autoRun = true（默认）：自动持续行驶，到站卸货后自动重新出发
 *  - autoRun = false：长按屏幕行驶，松手暂停；可在运行时通过 startAutoRun()/startManualRun() 动态切换
 *  - 轨道扩张后需调用 syncStationProgress() 同步站台进度，避免到站判定漂移
 *
 * 节点结构建议：
 *   TrainLv1（挂本脚本 + 可选 TrainCar 作为车头仓，isHeadCar=true）
 *   ├── HeadModel       ← 火车头模型
 *   └── TrainCar_1      ← 挂 TrainCar 组件（共1节）
 *
 *   TrainLv2（挂本脚本 + 可选 TrainCar 作为车头仓，isHeadCar=true）
 *   ├── HeadModel
 *   ├── TrainCar_1
 *   ├── TrainCar_2
 *   └── TrainCar_3      ← 共3节
 *
 *   TrainLv3（挂本脚本 + 可选 TrainCar 作为车头仓，isHeadCar=true）
 *   ├── HeadModel
 *   ├── TrainCar_1
 *   ├── TrainCar_2
 *   ├── TrainCar_3
 *   └── TrainCar_4      ← 共4节
 *
 * 车头仓使用说明：
 *   若车头也需要存放材料，在 Train 节点上额外挂一个 TrainCar 组件，
 *   勾选 isHeadCar = true，并将其拖入本脚本的 headCar 属性。
 *   车头仓不参与轨道位置更新，资源收集顺序：车头仓 → 车厢0 → 车厢1 → …
 */
@ccclass('Train')
export class Train extends Component {

    // ─────────────────────────────────────────────
    // Inspector 属性
    // ─────────────────────────────────────────────

    @property({
        type: TrainTrack,
        displayName: '轨道组件',
        tooltip: '场景中的 TrainTrack 节点'
    })
    public track: TrainTrack = null!;

    @property({
        type: TrainCar,
        displayName: '车头仓',
        tooltip: '（可选）挂在车头节点上的 TrainCar 组件，作为车头自身的资源仓；为空则车头不存放资源'
    })
    public headCar: TrainCar = null!;

    @property({
        type: [TrainCar],
        displayName: '车厢列表',
        tooltip: '按顺序拖入本辆火车的所有车厢节点（TrainCar组件），第0个紧跟火车头'
    })
    public trainCars: TrainCar[] = [];

    @property({
        type: CCFloat,
        displayName: '行驶速度（米/秒）',
        tooltip: '本辆火车的行驶速度',
        min: 0.1
    })
    public speed: number = 6;

    @property({
        type: CCFloat,
        displayName: 'Y轴朝向偏移(度)',
        tooltip: '补偿轨道方向与模型朝向的差值，使静止时模型朝向与编辑器一致'
    })
    public yawOffset: number = 90;

    @property({
        type: CCFloat,
        displayName: '到站判定距离',
        tooltip: '距离站台多近时判定为到站（米）',
        min: 0.1
    })
    public stationArriveDistance: number = 0.8;

    @property({
        type: CCFloat,
        displayName: '卸载动画时长(秒)',
        tooltip: '到站后资源飞出的动画时长，期间火车保持停止',
        min: 0
    })
    public unloadDuration: number = 2.0;

    @property({
        displayName: '自动行驶',
        tooltip: '勾选：火车自动持续行驶（无需按屏幕）；取消勾选：长按屏幕才行驶，松手暂停'
    })
    public autoRun: boolean = true;

    @property({
        type: TrainUnloadManager,
        displayName: '卸货管理器',
        tooltip: '与 TrainManager 同节点的 TrainUnloadManager，用于按类型查找资源仓库'
    })
    public unloadManager: TrainUnloadManager = null!;

    @property({
        type: [Node],
        displayName: '特效节点',
        tooltip: '用于播放火车运行时的特效'
    })
    public effectNodes: Node[] = [];
    @property({
        displayName: '是否Lv1',
    })
    public isLv1: boolean = false;
    @property({
        type: Animation,
        displayName: 'Lv1动画',
    })
    public lv1Animation: Animation = null!;
    // ─────────────────────────────────────────────
    // 运行时数据
    // ─────────────────────────────────────────────

    /** 当前状态 */
    private _state: TrainState = TrainState.Idle;

    /** 火车头在轨道上的归一化进度 [0,1) */
    private _progress: number = 0;

    /** 玩家是否正在长按屏幕 */
    private _isTouching: boolean = false;

    /** 站台进度（需在轨道扩张后调用 syncStationProgress() 更新） */
    private _stationProgress: number = 0;

    /** 是否已离开站台（用于判断回站检测时机） */
    private _hasLeftStation: boolean = false;
    private _arrivalGraceTime: number = 0;

    /** 车厢满事件是否已发送（防止每帧重复发送） */
    private _fullEventFired: boolean = false;

    /** 是否有玩家正在乘车 */
    private _hasPlayer: boolean = false;

    /**
     * 本次到站/停车后是否已经触发过卸货
     * 防止「到站自动卸货」与「玩家下车卸货」同时触发两次
     * 每次火车出发（Moving）时重置
     */
    private _unloadFired: boolean = false;

    /**
     * 卸货缓冲容器：按顺序存放所有车厢（车头仓→车厢0→车厢1→…）的卸货记录
     * 收集阶段：统计每节车厢的资源类型和数量，将车厢物品节点直接 putNode 回收
     * 发送阶段：按 count 次调用 container.receive()，播放飞行动画放入仓库
     */
    private _pendingItems: Array<{ type: ObjectType; count: number }> = [];

    /** 所有车厢的总容量（由 _refreshTotalCapacity 计算） */
    private _totalCapacity: number = 0;

    /** 所有仓（车头仓 + 车厢）的当前总载量 */
    private get _totalLoad(): number {
        return this._allCars.reduce((sum, car) => sum + car.currentLoad, 0);
    }

    /** 返回所有资源仓：车头仓（若存在）+ 车厢列表 */
    private get _allCars(): TrainCar[] {
        return this.headCar ? [this.headCar, ...this.trainCars] : this.trainCars;
    }
    private _sawLoopRunning: boolean = false;
    private _playSawSound = (): void => {
        if (!this.node.active) {
            this._stopSawLoop();
            return;
        }
        app.audio.playEffect('resources/audio/电锯', 0.6);
    };
    private _startSawLoop(): void {
        if (this._sawLoopRunning) return;
        this.unschedule(this._playSawSound);
        this._playSawSound();
        this.schedule(this._playSawSound, 3);
        this._sawLoopRunning = true;
    }
    private _stopSawLoop(): void {
        if (!this._sawLoopRunning) return;
        this.unschedule(this._playSawSound);
        this._sawLoopRunning = false;
    }
    private _onGameOverStop = (): void => {
        this._stopSawLoop();
    };

    // ─────────────────────────────────────────────
    // 生命周期
    // ─────────────────────────────────────────────

    onLoad() {
        // 同步站台进度并将火车放到站台位置
        this.syncStationProgress();
        this._progress = this._stationProgress;
        this._refreshTotalCapacity();
        // 初始化每节车厢的轨道引用和累计间距
        this._initCarsOnTrack();
        this._snapToProgress(this._progress);
    }

    onEnable() {
        if (this.autoRun) {
            // 自动模式：激活时立即开始行驶
            this._startAutoRun();
            this._startSawLoop();
        }
        // 手动模式：不在这里注册触摸，等玩家上车后由 onPlayerBoard() 注册
        app.event.on(CommonEvent.ShowOver, this._onGameOverStop, this);
        app.event.on(CommonEvent.GameWin, this._onGameOverStop, this);
    }

    onDisable() {
        // 无论哪种模式，禁用时都注销触摸并重置状态
        input.off(Input.EventType.TOUCH_START,  this._onTouchStart, this);
        input.off(Input.EventType.TOUCH_END,    this._onTouchEnd,   this);
        input.off(Input.EventType.TOUCH_CANCEL, this._onTouchEnd,   this);
        this._isTouching = false;
        this._hasPlayer = false;
        this._stopSawLoop();
        app.event.off(CommonEvent.ShowOver, this._onGameOverStop,);
        app.event.off(CommonEvent.GameWin, this._onGameOverStop,);
    }
    onDestroy() {
        this._stopSawLoop();
        app.event.off(CommonEvent.ShowOver, this._onGameOverStop,);
        app.event.off(CommonEvent.GameWin, this._onGameOverStop,);
    }

    update(dt: number) {
        if (this._state !== TrainState.Moving) return;
        // 手动模式：松手则暂停；自动模式：不受 _isTouching 影响
        if (!this.autoRun && !this._isTouching) {
            this._stopTrain();
            return;
        }
        if (this._arrivalGraceTime > 0) {
            this._arrivalGraceTime -= dt;
            if (this._arrivalGraceTime < 0) this._arrivalGraceTime = 0;
        }

        // 推进进度
        const distance = this.speed * dt;
        this._progress = this.track.advanceDistance(this._progress, distance);

        // 更新火车头位置和朝向
        const headPos = this.track.getPositionAt(this._progress);
        const headDir = this.track.getDirectionAt(this._progress);
        this.node.setWorldPosition(headPos);
        this._updateHeadFacing(headDir);

        // 更新所有车厢
        this._updateCars();

        // 发送移动事件（供摄像机跟随等使用）
        app.event.emit(CommonEvent.JeepCarMove, headPos);

        // 判断是否回到站台
        const stationPos = this.track.getPositionAt(this._stationProgress);
        const distToStation = Vec3.distance(headPos, stationPos);
        if (this._arrivalGraceTime <= 0 && this._hasLeftStation) {
            if (distToStation <= this.stationArriveDistance) {
                this._arriveStation();
                return;
            }
        } else {
            // 离开站台足够远后才开始检测回站
            if (distToStation > this.stationArriveDistance * 3) {
                this._hasLeftStation = true;
            }
        }

        // 判断车厢是否全满：只发事件（通知 Chainsaw 停止收割），火车继续行驶
        if (this._isFull()) {
            if (!this._fullEventFired) {
                this._fullEventFired = true;
                app.event.emit(CommonEvent.TrainCarFull);
            }
        } else {
            this._fullEventFired = false;
        }
    }

    // ─────────────────────────────────────────────
    // 公开接口
    // ─────────────────────────────────────────────

    /** 当前状态 */
    public get state(): TrainState {
        return this._state;
    }

    /** 当前行驶进度 [0,1) */
    public get progress(): number {
        return this._progress;
    }

    /** 在指定进度对齐朝向（升级吸附时同步方向用） */
    public alignFacingAtProgress(progress: number): void {
        if (!this.track) return;
        const dir = this.track.getDirectionAt(progress);
        this._updateHeadFacing(dir);
    }

    /**
     * 在指定进度位置初始化火车（升级切换时由 TrainManager 调用）
     * 新火车从旧火车当前位置继续行驶，避免瞬移
     * @param progress 继承自旧火车的轨道进度
     */
    public initAtProgress(progress: number): void {
        this._progress = progress;
        this._hasLeftStation = false;
        // 若已离开站台则直接标记，避免新火车出现后立刻触发到站
        const stationPos = this.track.getPositionAt(this._stationProgress);
        const headPos = this.track.getPositionAt(progress);
        if (Vec3.distance(headPos, stationPos) > this.stationArriveDistance * 3) {
            this._hasLeftStation = true;
        }
        this._snapToProgress(this._progress);
        this._arrivalGraceTime = 0.3;
    }

    /**
     * 同步站台进度（轨道扩张后必须调用，否则到站判定位置会漂移）
     * TrainManager 在每次轨道扩张完成的回调中统一调用
     */
    public syncStationProgress(): void {
        this._stationProgress = this.track ? this.track.getStationProgress() : 0;
    }

    /**
     * 向车厢添加资源（由 Chainsaw 锯条收割时调用）
     * 优先填充车头仓，再依次填充各节车厢
     * @param type 资源类型
     * @param amount 数量
     * @returns 实际添加的数量
     */
    public addResource(type: ObjectType, amount: number): number {
        console.log(`[Train] addResource type=${type} amount=${amount} 总车厢数=${this._allCars.length}`);
        for (let i = 0; i < this._allCars.length; i++) {
            const car = this._allCars[i];
            console.log(`[Train]   车厢[${i}] load=${car.currentLoad}/${car.capacity} resType=${car.resourceType} isFull=${car.isFull}`);
            const added = car.addResource(type, amount);
            console.log(`[Train]   车厢[${i}] addResource → added=${added}`);
            if (added > 0) return added;
        }
        console.warn(`[Train] ⚠️ 所有车厢均无法接收 type=${type} amount=${amount}`);
        return 0;
    }

    /**
     * 找到第一个能接收该类型资源的车厢（addResource 成功前的预查询）
     * 用于 Chainsaw 获取飞行动画目标车厢
     */
    public getCarForResource(type: ObjectType): TrainCar | null {
        for (const car of this._allCars) {
            if (!car.isFull && (car.currentLoad === 0 || car.resourceType === type)) {
                return car;
            }
        }
        return null;
    }

    /** 获取所有车厢的当前总载量 */
    public getTotalLoad(): number {
        return this._totalLoad;
    }

    /** 获取所有车厢的总容量 */
    public getTotalCapacity(): number {
        return this._totalCapacity;
    }

    /**
     * 玩家上车（由 TrainBoardingTrigger 触发）
     * 仅在非自动模式（autoRun = false）时生效。
     * 切换到手动模式，注册触摸监听，等待玩家按屏幕启动火车。
     */
    public onPlayerBoard(): void {
        if (this.autoRun) return;  // Lv3 自动模式不允许上车
        this._hasPlayer = true;
        this._arrivalGraceTime = 0.3;
        input.on(Input.EventType.TOUCH_START,  this._onTouchStart, this);
        input.on(Input.EventType.TOUCH_END,    this._onTouchEnd,   this);
        input.on(Input.EventType.TOUCH_CANCEL, this._onTouchEnd,   this);
        this._applyBoardEffects(true);
        if (this.node.active) this._startSawLoop();
    }

    /**
     * 玩家下车（到站时由 _arriveStation 内部调用，或外部强制下车）
     * 注销触摸监听，重置触摸状态，广播下车事件。
     *
     * 若玩家在站外中途下车（State = Moving / Idle），
     * 且车厢有货，则触发卸货（_doUnload 内部有 _unloadFired 防重复）。
     * 若是到站后由 _arriveStation 调用此方法，_arriveStation 自己会调用 _doUnload，
     * 此处因 _unloadFired 已被置 true 而跳过，不会重复卸货。
     */
    public onPlayerAlight(): void {
        this._hasPlayer = false;
        this._isTouching = false;
        this._applyBoardEffects(false);
        input.off(Input.EventType.TOUCH_START,  this._onTouchStart, this);
        input.off(Input.EventType.TOUCH_END,    this._onTouchEnd,   this);
        input.off(Input.EventType.TOUCH_CANCEL, this._onTouchEnd,   this);
        app.event.emit(CommonEvent.HeroAlighted);
        this._stopSawLoop();

        // 站外下车：若有货则触发卸货
        // 到站时 _arriveStation 先调用本函数，此时 _unloadFired 尚为 false，
        // 但 _arriveStation 随后会立即调用 _doUnload(0.1)，
        // 所以这里统一用 _doUnload(0) 尝试触发，内部防重复保证不会执行两次。
        // 注意：到站流程中 _arriveStation 在调用 onPlayerAlight 之后才调用 _doUnload，
        // 因此此处调用时 _unloadFired 仍为 false —— 为避免抢先触发导致状态不一致，
        // 仅在「非到站停车」状态下才在此发起卸货。
        if (this._state !== TrainState.StopAtStation) {
            // 停车再卸货：先让火车停下，再触发卸货流程
            this._stopTrain();
            this._doUnload(0);
        }
    }

    /** 是否有玩家正在乘车 */
    public get hasPlayer(): boolean {
        return this._hasPlayer;
    }

    /**
     * 强制停止火车（外部调用，如玩家下车）
     */
    public stopTrain(): void {
        this._isTouching = false;
        this._stopTrain();
    }

    /**
     * 外部强制切换为自动驾驶模式并立即出发（运行时动态切换用）
     * 若只是初始化，在 Inspector 勾选 autoRun 即可，无需手动调用
     */
    public startAutoRun(): void {
        this.autoRun = true;
        // 若当前有触摸监听则先注销，避免重复
        input.off(Input.EventType.TOUCH_START,  this._onTouchStart, this);
        input.off(Input.EventType.TOUCH_END,    this._onTouchEnd,   this);
        input.off(Input.EventType.TOUCH_CANCEL, this._onTouchEnd,   this);
        this._startAutoRun();
        this._startSawLoop();
    }

    /**
     * 外部切换为手动触摸模式（运行时动态切换用）
     */
    public startManualRun(): void {
        this.autoRun = false;
        this._isTouching = false;
        input.on(Input.EventType.TOUCH_START,  this._onTouchStart, this);
        input.on(Input.EventType.TOUCH_END,    this._onTouchEnd,   this);
        input.on(Input.EventType.TOUCH_CANCEL, this._onTouchEnd,   this);
        // 切换到手动后停止，等待玩家按屏幕
        this._stopTrain();
    }

    /**
     * 统一显示/隐藏火车头及所有关联车厢节点
     * TrainManager 切换火车时应调用此方法，而非直接操作 node.active，
     * 确保车厢节点（独立于火车头节点树之外）同步跟随。
     */
    public setVisible(visible: boolean): void {
        // 显示时：先激活车厢，再激活火车头（触发 onEnable 时车厢已就绪）
        // 隐藏时：先隐藏火车头（触发 onDisable），再隐藏车厢
        if (visible) {
            if (this.headCar?.node?.isValid) this.headCar.node.active = true;
            for (const car of this.trainCars) {
                if (car?.node?.isValid) car.node.active = true;
            }
            this.node.active = true;
        } else {
            this._applyBoardEffects(false);
            this.node.active = false;
            for (const car of this.trainCars) {
                if (car?.node?.isValid) car.node.active = false;
            }
            if (this.headCar?.node?.isValid) this.headCar.node.active = false;
        }
    }

    /**
     * 重置火车到站台初始状态
     */
    public reset(): void {
        this._state = TrainState.Idle;
        this._isTouching = false;
        this._hasLeftStation = false;
        this._progress = this._stationProgress;
        this._snapToProgress(this._progress);
        for (const car of this._allCars) {
            car.reset();
        }
    }

    // ─────────────────────────────────────────────
    // 触摸事件
    // ─────────────────────────────────────────────

    private _onTouchStart(_evt: EventTouch): void {
        if (this._state === TrainState.StopAtStation) return;
        this._isTouching = true;
        if (this._state === TrainState.Idle) {
            this._unloadFired = false;   // 新一圈出发，重置卸货标志
            this._state = TrainState.Moving;
            this._hasLeftStation = false;
            this._arrivalGraceTime = 0.3;
            app.event.emit(CommonEvent.TrainStarted);
        }
    }

    private _onTouchEnd(_evt: EventTouch): void {
        this._isTouching = false;
    }

    // ─────────────────────────────────────────────
    // 内部逻辑
    // ─────────────────────────────────────────────

    /** 内部启动自动行驶（autoRun 模式专用） */
    private _startAutoRun(): void {
        if (this._state === TrainState.StopAtStation) return;
        this._hasLeftStation = false;
        this._unloadFired = false;   // 新一圈出发，重置卸货标志
        this._state = TrainState.Moving;
        app.event.emit(CommonEvent.TrainStarted);
    }

    /** 停止火车（非到站，仅暂停） */
    private _stopTrain(): void {
        if (this._state !== TrainState.Moving) return;
        this._state = TrainState.Idle;
    }

    private _applyBoardEffects(active: boolean): void {
        if (this.isLv1) {
            if (this.lv1Animation) {
                if (active) this.lv1Animation.play();
                else this.lv1Animation.stop();
            }
            return;
        }
        for (const n of this.effectNodes) {
            if (n && n.isValid) n.active = active;
        }
    }

    /** 到达站台处理 */
    private _arriveStation(): void {
        this._state = TrainState.StopAtStation;
        this._isTouching = false;
        this._hasLeftStation = false;
        this._fullEventFired = false;

        // 对齐到站台精确位置
        this._progress = this._stationProgress;
        this._snapToProgress(this._progress);

        app.event.emit(CommonEvent.TrainArrived);

        // 如果有玩家在车上，到站时触发下车
        // 注意：onPlayerAlight 内部会检测 _unloadFired，此处到站卸货尚未触发，
        // 下车逻辑里不会重复触发卸货，顺序：先下车广播 → 再执行卸货
        if (this._hasPlayer) {
            this.onPlayerAlight();
        }

        // 到站卸货（延迟 0.1s 等对齐动画）
        this._doUnload(0.1);
    }

    /**
     * 执行卸货流程（防止重复触发）
     *
     * 触发时机：
     *  - 非自动模式（autoRun=false）：玩家下车时（onPlayerAlight）
     *  - 自动模式（autoRun=true）：到站时（_arriveStation）
     *
     * 新流程（两阶段）：
     *  1. 收集阶段（_collectPendingItems）：
     *     按 _allCars 顺序（车头仓→车厢0→车厢1→…）遍历所有车厢，
     *     将每节车厢 itemLayout 内的资源节点逐一转移到 effect.node，
     *     记录 { node, type, fromPos } 到 _pendingItems 容器，
     *     然后清空布局记录（detachAllItems）并重置车厢计数（unload）。
     *  2. 发送阶段（_flushPendingItems）：
     *     遍历 _pendingItems，按 type 查找对应容器（WheatContainer / WoodContainer），
     *     调用 container.receive() 播放飞行动画放入仓库。
     *
     * @param delay 延迟秒数，到站时给 0.1s 等对齐，站外下车直接用 0
     */
    private _doUnload(delay: number = 0): void {
        // 防止同一次停车触发两次（到站 + 玩家下车）
        if (this._unloadFired) {
            console.log('[Train] _doUnload: 已触发过，跳过重复卸货');
            return;
        }
        this._unloadFired = true;

        const execute = () => {
            this._state = TrainState.Unloading;

            // ── 在卸货前快照所有已被收割的作物，用于后续分帧再生 ──
            const rfm = ResourceFieldManager.instance;
            console.log(`[Train] _doUnload execute: autoRun=${this.autoRun}, RFM存在=${!!rfm}`);
            const harvestedCrops: WheatCrop[] = rfm ? rfm.collectHarvestedCrops() : [];
            console.log(`[Train] _doUnload: 快照已收割作物 ${harvestedCrops.length} 棵`);

            // ── 阶段1：收集所有车厢资源节点到 _pendingItems ──
            this._collectPendingItems();

            // ── 阶段2：将 _pendingItems 内节点按类型送入对应仓库，等所有飞行动画落地后再继续 ──
            this._flushPendingItems(() => {
                // ── 阶段3：分帧触发已收割作物的再生计时器 ──
                if (harvestedCrops.length > 0) {
                    ResourceFieldManager.instance?.startBatchRegrow(harvestedCrops);
                }

                // 所有飞行动画完成，切回 Idle 并（自动模式下）重新出发
                this.finishUnload();
            });
        };

        if (delay > 0) {
            this.scheduleOnce(execute, delay);
        } else {
            execute();
        }
    }

    /**
     * 阶段1：收集阶段
     * 按 _allCars 顺序（车头仓→车厢0→车厢1→…）遍历每节车厢：
     *  1. 读取 itemLayout 实际节点数作为 count（比 currentLoad 更准确）
     *  2. 将车厢内所有物品节点直接 putNode 回收到对象池（安全、无父节点迁移风险）
     *  3. 清空布局记录（clearAllItems）并重置车厢计数（unload）
     *  4. 将 { type, count } 推入 _pendingItems
     *
     * 发送阶段（_flushPendingItems）按 count 次调用 container.receive()，
     * 播放飞行动画放入仓库。
     */
    private _collectPendingItems(): void {
        this._pendingItems = [];

        console.log('[Train] _collectPendingItems 开始，车厢数=', this._allCars.length);

        for (const car of this._allCars) {
            if (!car.itemLayout) {
                // 无布局：仅重置计数
                car.unload();
                continue;
            }

            // 取出所有有效的资源节点（仅读取，用于计数 + 回收）
            const itemNodes = car.itemLayout.getAllItemNodes().filter(n => n && n.isValid);
            const count = itemNodes.length;
            console.log(`[Train]   car=${car.node.name} count=${count} type=${car.resourceType}`);

            if (count === 0) {
                car.unload();
                car.itemLayout.clearAllItems();
                continue;
            }

            // 提前保存资源类型（unload() 会将其重置为 None）
            const resourceType = car.resourceType;

            // 将车厢内所有物品节点安全回收到对象池
            // 不做节点迁移，直接 putNode，由发送阶段让仓库从对象池取新节点飞入
            for (const n of itemNodes) {
                manager.pool.putNode(n);
            }

            // 清空布局记录（节点已回收，使用 clearAllItems 彻底清理 Map）
            car.itemLayout.clearAllItems();
            // 清空车厢计数（同时重置 _resourceType = None）
            car.unload();

            // 记录本节车厢的卸货信息（只需 type 和数量，瞬间放入不需要坐标）
            this._pendingItems.push({ type: resourceType, count });
        }

        const totalCount = this._pendingItems.reduce((s, it) => s + it.count, 0);
        console.log(`[Train] _collectPendingItems 完成，共 ${this._pendingItems.length} 节车厢，待发送 ${totalCount} 个资源`);
    }

    /**
     * 阶段2：发送阶段
     * 遍历 _pendingItems，按 type 查找对应容器（WheatContainer / WoodContainer），
     * 按 count 次调用 container.receive()，播放飞行动画放入仓库。
     * 所有飞行动画完成后调用 onAllArrived；若没有任何资源则立即调用。
     * @param onAllArrived 所有飞行动画落地后的回调
     */
    private _flushPendingItems(onAllArrived: () => void): void {
        const totalCount = this._pendingItems.reduce((s, it) => s + it.count, 0);
        console.log(`[Train] _flushPendingItems 开始，共 ${totalCount} 个资源待发送`);

        if (totalCount === 0) {
            this._pendingItems = [];
            console.log('[Train] _flushPendingItems 无资源，直接完成');
            onAllArrived();
            return;
        }

        const fromPosition = this.node.getWorldPosition();
        let remaining = 0;

        for (const item of this._pendingItems) {
            const container: IResourceContainer | null = this.unloadManager?.getContainer(item.type) ?? null;
            if (!container) {
                console.warn(`[Train] ⚠️ 未找到类型 ${item.type} 的容器（WheatContainer/WoodContainer），跳过 ${item.count} 个资源`);
                continue;
            }
            for (let i = 0; i < item.count; i++) {
                const accepted = container.receive(fromPosition, () => {
                    remaining--;
                    if (remaining <= 0) {
                        console.log('[Train] _flushPendingItems 所有飞行动画完成');
                        onAllArrived();
                    }
                });
                if (accepted) {
                    remaining++;
                }
            }
        }

        // 清空容器，释放引用
        this._pendingItems = [];

        // 若所有 receive 均返回 false（对象池耗尽），直接完成
        if (remaining <= 0) {
            console.log('[Train] _flushPendingItems 所有 receive 未成功，直接完成');
            onAllArrived();
            return;
        }

        console.log(`[Train] _flushPendingItems 等待 ${remaining} 个飞行动画完成`);
    }

    /**
     * 卸货完成后恢复 Idle 并（自动模式下）重新出发
     * 由 _doUnload 执行完毕后内部调用
     */
    public finishUnload(): void {
        this._state = TrainState.Idle;
        app.event.emit(CommonEvent.TrainIdle);
        if (this.autoRun) {
            this._startAutoRun();
        }
    }

    /**
     * 初始化所有车厢的轨道引用和累计间距
     * 在 onLoad 时调用一次
     */
    private _initCarsOnTrack(): void {
        if (!this.track) return;
        let accumulated = 0;
        for (const car of this.trainCars) {
            accumulated += car.spacing;
            car.initOnTrack(this.track, accumulated);
        }
    }

    /**
     * 更新所有车厢的位置和朝向
     * 每节车厢根据车头进度减去累计间距，独立计算自己在轨道上的位置
     * @param updateFacing 是否同时更新朝向，初始化/重置时传 false
     */
    private _updateCars(updateFacing: boolean = true): void {
        for (const car of this.trainCars) {
            car.updateOnTrack(this._progress, updateFacing);
        }
    }

    /** 将火车头和车厢直接吸附到指定进度（不播放动画，用于初始化/重置） */
    private _snapToProgress(progress: number): void {
        if (!this.track) return;
        const headPos = this.track.getPositionAt(progress);
        this.node.setWorldPosition(headPos);
        this._updateCars(false);  // 仅更新位置，保持编辑器设定的初始朝向
    }

    /** 更新火车头朝向，只旋转 this.node 的 Y 轴，子模型节点随父节点一起转 */
    private _updateHeadFacing(direction: Vec3): void {
        if (Vec3.equals(direction, Vec3.ZERO)) return;
        const yaw = Math.atan2(direction.x, direction.z) * (180 / Math.PI) + this.yawOffset;
        this.node.setRotationFromEuler(0, yaw, 0);
    }

    /**
     * 判断所有仓（车头仓 + 车厢）是否全满
     * 注意：无任何仓时返回 false（不触发满载停车）
     */
    private _isFull(): boolean {
        const all = this._allCars;
        if (all.length === 0) return false;
        for (const car of all) {
            if (!car.isFull) return false;
        }
        return true;
    }

    /** 重新计算总容量（包括车头仓） */
    private _refreshTotalCapacity(): void {
        this._totalCapacity = this._allCars.reduce((sum, car) => sum + car.capacity, 0);
    }
}
