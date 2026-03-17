import { _decorator, Collider, Component, ITriggerEvent, Node } from 'cc';
import { CommonEvent } from '../Common/CommonEnum';
import { TrainManager } from '../Train/TrainManager';
import { TrainState } from '../Train/Train';
import { Hero } from '../Role/Hero';
import { JoystickControl } from '../Joystick/JoystickControl';

const { ccclass, property } = _decorator;

/**
 * TrainBoardingTrigger —— 火车乘车系统协调器
 *
 * 挂载位置：TrainManager 节点
 *
 * 节点结构：
 *  TrainManager（挂 TrainManager + TrainBoardingTrigger）
 *  ├── BoardingTrigger  ← 固定在站台，挂 BoxCollider(isTrigger=true)，与火车同级
 *  ├── TrainLv1
 *  ├── TrainLv2
 *  └── TrainLv3
 *
 * 职责：
 *  1. onLoad 时注册 BoardingTrigger 节点的碰撞事件
 *  2. 检测到玩家进入触发区，且火车处于 Idle 停站状态时，执行上车
 *  3. 上车：隐藏Hero模型 / 禁用摇杆 / 锁定Hero移动 / 通知Train玩家上车
 *  4. 每帧：玩家在车时，同步Hero位置到当前激活火车头位置
 *  5. 下车：监听 HeroAlighted 事件 → Hero传送到下车点 → 恢复模型/摇杆/移动
 *
 * Inspector 属性：
 *  - boardingTriggerNode : 站台固定碰撞触发器节点（BoardingTrigger）
 *  - joystickNode        : JoystickControl 所在节点
 *  - heroNode            : Hero 节点
 *  - alightPoint         : 下车点空节点（场景中固定位置）
 */
@ccclass('TrainBoardingTrigger')
export class TrainBoardingTrigger extends Component {

    @property({ type: Node, displayName: '上车触发器节点' })
    public boardingTriggerNode: Node = null!;

    @property({ type: Node, displayName: 'JoystickControl节点' })
    public joystickNode: Node = null!;

    @property({ type: Node, displayName: 'Hero节点' })
    public heroNode: Node = null!;

    @property({ type: Node, displayName: '下车点节点' })
    public alightPoint: Node = null!;

    @property({ type: Node, displayName: '上车Sprite节点' })
    public boardingSpriteNode: Node = null!;
    // ── 运行时 ──
    private _isPlayerOnTrain: boolean = false;
    /** 玩家当前是否处于站台触发区域内（用于卸货结束后补触发上车） */
    private _isInTriggerZone: boolean = false;
    private _joystick: JoystickControl = null!;
    private _hero: Hero = null!;
    private _trainManager: TrainManager = null!;

    onLoad() {
        this._joystick = this.joystickNode.getComponent(JoystickControl)!;
        this._hero = this.heroNode.getComponent(Hero)!;
        this._trainManager = this.getComponent(TrainManager)!;

        // 注册站台固定碰撞触发器的事件
        const collider = this.boardingTriggerNode.getComponent(Collider)!;
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
        collider.on('onTriggerExit', this._onTriggerExit, this);

        // 监听 Train 内部触发的下车事件
        app.event.on(CommonEvent.HeroAlighted, this._onHeroAlighted, this);

        // 监听火车升级事件，升级时强制下车（防止状态残留）
        app.event.on(CommonEvent.TrainUpgraded, this._forceAlight, this);

        // 监听卸货完毕事件：若玩家仍在触发区内则补触发上车
        app.event.on(CommonEvent.TrainIdle, this._onTrainIdle, this);
    }

    onDestroy() {
        if (this.boardingTriggerNode && this.boardingTriggerNode.isValid) {
            const collider = this.boardingTriggerNode.getComponent(Collider);
            collider?.off('onTriggerEnter', this._onTriggerEnter, this);
            collider?.off('onTriggerExit', this._onTriggerExit, this);
        }
        app.event.offAllByTarget(this);
    }

    update(_dt: number): void {
        if (!this._isPlayerOnTrain) return;

        // 每帧：Hero 位置跟随当前激活的火车头
        const trainHeadPos = this._trainManager.activeTrain.node.getWorldPosition();
        this.heroNode.setWorldPosition(trainHeadPos);
    }

    // ────────────────────────────────────────────
    // 私有方法
    // ────────────────────────────────────────────

    /** 站台碰撞触发器：进入 */
    private _onTriggerEnter(event: ITriggerEvent): void {
        this._isInTriggerZone = true;

        // 已在车上，忽略
        if (this._isPlayerOnTrain) return;
        // 火车必须停在站台（Idle 状态），否则不允许上车
        // Unloading / StopAtStation 期间均拒绝，等 TrainIdle 事件再补触发
        if (this._trainManager.activeTrain.state !== TrainState.Idle) return;

        // 尝试上车（Lv3 自动模式返回 false）
        const success = this._trainManager.tryBoardTrain();
        if (!success) return;
        this.boardingSpriteNode.active = true;
        this._boardTrain();
    }

    /** 站台碰撞触发器：离开 */
    private _onTriggerExit(event: ITriggerEvent): void {
        this._isInTriggerZone = false;
        this.boardingSpriteNode.active = false;
    }

    /**
     * 卸货完毕、火车切换到 Idle 时回调。
     * 若玩家此时仍在触发区内且不在车上，补触发一次上车。
     */
    private _onTrainIdle(): void {
        if (this._isPlayerOnTrain) return;
        if (!this._isInTriggerZone) return;

        const success = this._trainManager.tryBoardTrain();
        if (!success) return;

        this._boardTrain();
    }

    /** 执行上车逻辑 */
    private _boardTrain(): void {
        this._isPlayerOnTrain = true;

        // 1. 隐藏 Hero 模型
        this._hero.setModelVisible(false);

        // 2. 禁用 Hero 移动组件
        this._hero.setMovementEnabled(false);

        // 3. 禁用摇杆（同时强制松手，清理摇杆状态）
        this._joystick.setEnabled(false);

        // 4. 发送上车事件（供其他系统监听，如 UI 提示）
        app.event.emit(CommonEvent.HeroBoarded);
    }

    /** 下车回调（由 Train 到站后触发 HeroAlighted 事件 → 此处响应） */
    private _onHeroAlighted(): void {
        if (!this._isPlayerOnTrain) return;
        this._isPlayerOnTrain = false;

        // 1. 将 Hero 传送到下车点
        if (this.alightPoint) {
            this.heroNode.setWorldPosition(this.alightPoint.getWorldPosition());
        }

        // 2. 恢复 Hero 模型
        this._hero.setModelVisible(true);

        // 3. 恢复 Hero 移动组件
        this._hero.setMovementEnabled(true);

        // 4. 恢复摇杆
        this._joystick.setEnabled(true);
    }

    /**
     * 强制下车（火车升级时调用）
     * Train.onDisable 已清理触摸监听，此处补充恢复 Hero 状态
     */
    private _forceAlight(): void {
        if (!this._isPlayerOnTrain) return;
        this._onHeroAlighted();
    }
}
