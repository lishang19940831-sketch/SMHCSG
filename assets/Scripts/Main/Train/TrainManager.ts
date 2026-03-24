import { _decorator, Component, Node } from 'cc';
import { BuildingType, BuildUnlockState, CommonEvent, ObjectType } from '../Common/CommonEnum';
import { TrainTrack, TrackPhase } from './TrainTrack';
import { Train, TrainState } from './Train';
import { TrainCar } from './TrainCar';
import { TrainBoardingTrigger } from './TrainBoardingTrigger';
import { TrainUnloadManager } from './TrainUnloadManager';
const { ccclass, property } = _decorator;

/**
 * 火车等级枚举
 */
export enum TrainLevel {
    Lv1 = 1,
    Lv2 = 2,
    Lv3 = 3,
}

/**
 * TrainManager —— 3辆独立火车的切换管理器
 *
 * 设计说明：
 *  - 场景中存在3个独立的火车节点（TrainLv1 / TrainLv2 / TrainLv3），各自挂 Train 组件
 *  - 初始只激活 TrainLv1，其余隐藏
 *  - 升级时：
 *    1. 记录当前火车的行驶进度
 *    2. 隐藏旧火车节点（旧火车 onDisable 自动取消触摸监听）
 *    3. 激活新火车节点（新火车 onEnable 自动注册触摸监听）
 *    4. 调用新火车的 initAtProgress() 让其从旧火车位置继续行驶
 *  - 轨道扩张完成后统一调用所有火车的 syncStationProgress()
 *
 * 节点结构：
 *   TrainManager（挂本脚本）
 *   ├── TrainLv1  ← 挂 Train 组件，speed=6，1节车厢
 *   ├── TrainLv2  ← 挂 Train 组件，speed=9，3节车厢
 *   └── TrainLv3  ← 挂 Train 组件，speed=12，4节车厢
 */
@ccclass('TrainManager')
export class TrainManager extends Component {

    // ─────────────────────────────────────────────
    // Inspector 属性
    // ─────────────────────────────────────────────

    @property({
        type: Train,
        displayName: 'Lv1 火车',
        tooltip: '棕黄色，1节车厢'
    })
    public trainLv1: Train = null!;

    @property({
        type: Train,
        displayName: 'Lv2 火车',
        tooltip: '橙红色，3节车厢'
    })
    public trainLv2: Train = null!;

    @property({
        type: Train,
        displayName: 'Lv3 火车',
        tooltip: '紫色，4节车厢'
    })
    public trainLv3: Train = null!;

    @property({
        type: TrainTrack,
        displayName: '轨道组件',
        tooltip: '场景中的 TrainTrack 节点（3辆火车共享）'
    })
    public track: TrainTrack = null!;
@property({
        type: TrainBoardingTrigger,
        displayName: '轨道上车触发组件',
        tooltip: '场景中的 TrainBoardingTrigger '    
    })
    public trainBoardingTrigger: TrainBoardingTrigger = null!;

@property({
        type: TrainUnloadManager,
        displayName: '火车到站卸货管理器',
        tooltip: '场景中的 TrainUnloadManager '    
    })
    public trainUnloadManager: TrainUnloadManager = null!;
    
@property({
        type: Node,
        displayName: 'hero拖拽移动',
        tooltip: '拖拽移动NodeUI '    
    })
    public heroDragMoveNode: Node = null!;
    
@property({
        type: Node,
        displayName: '火车按住移动',
        tooltip: '按住移动NodeUI '    
    })
    public trainHoldMoveNode: Node = null!;
    // ─────────────────────────────────────────────
    // 运行时数据
    // ─────────────────────────────────────────────

    /** 当前激活的火车 */
    private _activeTrain: Train = null!;

    /** 当前等级 */
    private _level: TrainLevel = TrainLevel.Lv1;

    // ─────────────────────────────────────────────
    // 生命周期
    // ─────────────────────────────────────────────

    /** 是否已因第一次获得金币而升级到 Lv2 */
    private _hasUpgradedOnFirstCoin: boolean = false;

    /** 记录哪些售货员已解锁（用于判断两个都解锁后升级 Lv3） */
    private _unlockedSalesman: Set<BuildingType> = new Set();

    /** 记录已解锁的箭塔（4个全部解锁后开启全自动模式） */
    private _unlockedArrowTowers: Set<BuildingType> = new Set();
    private static readonly _ARROW_TOWER_TYPES: BuildingType[] = [
        BuildingType.ArrowTower,
        BuildingType.ArrowTower1,
        BuildingType.ArrowTower2,
        BuildingType.ArrowTower3,
    ];
    /** 检查箭塔是否全部解锁 */
    public getIsAllArrowTowersUnlocked(): boolean {

        return this._unlockedArrowTowers.size >= TrainManager._ARROW_TOWER_TYPES.length;
    }   
    getTrain(): Train{
        return this._activeTrain;
    }
    onLoad() {
        // 初始只激活 Lv1，其余隐藏（含各自车厢）
        this._level = TrainLevel.Lv1;
        //根据等级显示对应的火车
        this._getTrainByLevel(this._level).setVisible(true);
        this._activeTrain = this._getTrainByLevel(this._level);

        // 监听玩家第一次拾取金币事件，触发后升级到 Lv2
        app.event.on(CommonEvent.PickupCoin, this._onFirstPickupCoin, this);
        // 监听建筑解锁完成事件，两个售货员都解锁后升级到 Lv3
        app.event.on(CommonEvent.UnlockFinished, this._onUnlockFinished, this);
    }

    onDestroy() {
        app.event.offAllByTarget(this);
    }
    public getLevel(): TrainLevel{
        return this._level;
    }
    protected start(): void {
        // 自动行驶由 Train.autoRun 属性控制，在 Inspector 勾选即可，无需在此手动调用
        // 若需要运行时动态切换模式，调用 activeTrain.startAutoRun() 或 activeTrain.startManualRun()
    }

    private _onFirstPickupCoin(): void {
        if (this._hasUpgradedOnFirstCoin) return;
        this._hasUpgradedOnFirstCoin = true;
        //解锁unlockitem
        if(manager.game.unlockItemMap.get(BuildingType.Salesperson1)?.unlockState == BuildUnlockState.NoActive){
            app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.Salesperson1, state: BuildUnlockState.Active});
        }
        //解锁火车升级unlockitem
        if(manager.game.unlockItemMap.get(BuildingType.Train1)?.unlockState == BuildUnlockState.NoActive){
            app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.Train1, state: BuildUnlockState.Active});
        }
    }

    private _onUnlockFinished(type: BuildingType): void {
        // ── 售货员：两个都解锁 → 升级 Lv3 ──
        // if (type === BuildingType.Salesperson1 || type === BuildingType.Salesperson2) {
        //     this._unlockedSalesman.add(type);
        //     if (
        //         this._unlockedSalesman.has(BuildingType.Salesperson1) &&
        //         this._unlockedSalesman.has(BuildingType.Salesperson2)
        //     ) {
        //         // this.upgradeTo(TrainLevel.Lv3);
        //     }
        //     return;
        // }

        // ── 箭塔：4个全部解锁 → 当前火车开启全自动 ──
        if (TrainManager._ARROW_TOWER_TYPES.includes(type)) {
            this._unlockedArrowTowers.add(type);
         
        }
        console.log("已解锁的箭塔数量:", this._unlockedArrowTowers.size,this._level)
        //检查列车等级是否为3
        if (this._unlockedArrowTowers.size >= TrainManager._ARROW_TOWER_TYPES.length&&this._level == TrainLevel.Lv3) {
            this.startAutoRun();
            // 传送带出现并启用
            manager.game.showConveyors()
            app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.EndGame, state: BuildUnlockState.Active});
        }

        
    }
    // ─────────────────────────────────────────────
    // 公开接口
    // ─────────────────────────────────────────────

    /** 当前等级 */
    public get level(): TrainLevel {
        return this._level;
    }

    /** 当前激活的火车 */
    public get activeTrain(): Train {
        return this._activeTrain;
    }

    /**
     * 升级到目标等级
     * @param level 目标等级（只能升不能降）
     * @param onComplete 升级演出完成后的回调（轨道扩张动画结束后触发）
     */
    public upgradeTo(level: TrainLevel, onComplete?: () => void): void {
        if (level <= this._level) return;

        app.audio.playEffect('resources/audio/UPLV', 0.6);
        const prevTrain = this._activeTrain;
        const prevProgress = prevTrain.progress;

        this._level = level;

        // 发送升级事件（供特效系统处理光扫动画）
        app.event.emit(CommonEvent.TrainUpgraded, level);

        // 切换到新火车（含各自车厢同步显隐）
        const nextTrain = this._getTrainByLevel(level);
        // 先在未激活状态下吸附位置与朝向，避免激活瞬间移动/转头
        nextTrain.initAtProgress(prevProgress);
        nextTrain.alignFacingAtProgress(prevProgress);
        // 继承自动/手动标志（由 onEnable 决定是否启动行驶），避免重复 start
        nextTrain.autoRun = prevTrain.autoRun && level === TrainLevel.Lv3 ? true : nextTrain.autoRun;
        prevTrain.setVisible(false);
        nextTrain.setVisible(true);
        this._activeTrain = nextTrain;

        // Lv3 升级时扩张轨道到 Phase3，扩张完成后同步所有火车的站台进度
        if (level === TrainLevel.Lv3) {
            // this.track.expandToPhase(TrackPhase.Phase3, () => {
            //     this._syncAllStationProgress();
            // });
            onComplete && onComplete();
        } else {
            onComplete && onComplete();
        }
    }

    /**
     * 轨道扩张到 Phase2（Step3 丧尸出现时调用，与火车升级解耦）
     * @param onComplete 扩张完成后的回调
     */
    public expandTrackPhase2(onComplete?: () => void): void {
        this.track.expandToPhase(TrackPhase.Phase2, () => {
            this._syncAllStationProgress();
            onComplete && onComplete();
        });
    }

    /**
     * 向当前激活火车的车厢添加资源（由 Chainsaw 锯条收割时调用）
     */
    public addResource(type: ObjectType, amount: number): number {
        return this._activeTrain.addResource(type, amount);
    }

    /**
     * 找到第一个能接收该类型资源的车厢（用于 Chainsaw 获取飞行动画目标）
     */
    public getCarForResource(type: ObjectType): TrainCar | null {
        return this._activeTrain.getCarForResource(type);
    }

    /** 获取当前火车总载量 */
    public getTotalLoad(): number {
        return this._activeTrain.getTotalLoad();
    }

    /** 获取当前火车总容量 */
    public getTotalCapacity(): number {
        return this._activeTrain.getTotalCapacity();
    }

    /** 强制停止当前火车 */
    public stopTrain(): void {
        this._activeTrain.stopTrain();
    }

    /** 切换当前火车为自动驾驶模式并立即出发（运行时动态切换用） */
    public startAutoRun(): void {
        this._activeTrain.startAutoRun();
    }

    /** 切换当前火车为手动触摸模式（运行时动态切换用） */
    public startManualRun(): void {
        this._activeTrain.startManualRun();
    }

    /** 重置当前火车到站台 */
    public reset(): void {
        this._activeTrain.reset();
    }

    /**
     * 尝试让玩家上当前激活的火车
     * @returns true = 上车成功；false = 当前火车不允许上车（Lv3自动模式）
     */
    public tryBoardTrain(): boolean {
        if (this._activeTrain.autoRun) {
            
            return false;  // Lv3 不允许上车
        }
        this._activeTrain.onPlayerBoard();
        //非自动模式下， 玩家上车 就显示 火车按住移动NodeUI
        this.trainHoldMoveNode.active = true;
        this.heroDragMoveNode.active = false;
        return true;
    }

    /**
     * 让玩家下当前激活的火车（强制，不等到站）
     * 通常由 Train 内部自动调用，外部特殊情况（如强制下车）可调用此方法
     */
    public alightTrain(): void {
        this._activeTrain.onPlayerAlight();
        //玩家下火车后， 就隐藏 火车按住移动NodeUI
        this.trainHoldMoveNode.active = false;
        this.heroDragMoveNode.active = true;
    }

    /** 当前火车是否有玩家乘坐 */
    public get trainHasPlayer(): boolean {
        return this._activeTrain.hasPlayer;
    }

    // ─────────────────────────────────────────────
    // 私有方法
    // ─────────────────────────────────────────────

    /** 根据等级获取对应的 Train 实例 */
    private _getTrainByLevel(level: TrainLevel): Train {
        switch (level) {
            case TrainLevel.Lv1: return this.trainLv1;
            case TrainLevel.Lv2: return this.trainLv2;
            case TrainLevel.Lv3: return this.trainLv3;
        }
    }

    /**
     * 轨道扩张后同步所有火车的站台进度
     * 避免因 _halfX/_halfZ 变化导致 getStationProgress() 返回值漂移
     */
    private _syncAllStationProgress(): void {
        this.trainLv1.syncStationProgress();
        this.trainLv2.syncStationProgress();
        this.trainLv3.syncStationProgress();
    }
}

