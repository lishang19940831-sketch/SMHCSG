import { _decorator, Enum, Node, Vec3 } from 'cc';
import { Character } from './Character';
import { PickupComponent } from '../Components/PickupComponent';
import { ComponentInitializer } from '../Common/ComponentInitializer';
import { ComponentEvent } from '../Common/ComponentEvents';
import { BuildingType } from '../Common/CommonEnum';

const { ccclass, property } = _decorator;

/**
 * 售货员状态枚举
 */
export enum SalesmanState {
    /** 未激活（冰封 / 锁定） */
    Inactive = 'Inactive',
    /** 已激活，正在前往工作岗位 */
    MovingToStation = 'MovingToStation',
    /** 在岗待机 */
    Working = 'Working',
}

/**
 * Salesman —— 售货员
 *
 * 生命周期：
 *  1. 初始状态 Inactive：冰封，不执行任何逻辑
 *  2. 调用 activate() 后 → MovingToStation：自动走向工作岗位（shopCollider 区域），播放行走动画
 *  3. 到达工作岗位 → Working：播放在岗动画，站在 shopCollider 上
 *     ShopCommon / ProductionBuilding 的触发器会自动检测到身上的 PickupComponent 并处理背包逻辑
 *
 * 依赖组件（挂在同一节点或编辑器拖入）：
 *  - MovementComponent        移动
 *  - BaseAnimationComponent   动画
 *  - StateComponent           状态机
 *  - PickupComponent          背包（供 ShopCommon 触发器自动检测）
 */
@ccclass('Salesman')
export class Salesman extends Character {

    // ──────────────────────────────────────────────
    // Inspector 属性
    // ──────────────────────────────────────────────

    /** 背包组件 */
    @property({ type: PickupComponent, displayName: '背包组件' })
    public pickupComponent: PickupComponent = null!;



    /**
     * 工作岗位节点。
     * 把此节点放在 ShopCommon / ProductionBuilding 的 shopCollider 触发器范围内，
     * 售货员到达后站立，触发器自动检测 PickupComponent 完成后续逻辑。
     */
    @property({ type: Node, displayName: '工作岗位节点' })
    public workStationNode: Node = null!;

    /**
     * 到达工作岗位后播放的动画名称。
     * 留空则播放默认 idle 动画。
     */
    @property({ displayName: '在岗动画名称', tooltip: '留空使用默认 idle' })
    public workAnimName: string = '';

    /** 判定"到达"工作岗位的距离阈值（米） */
    @property({ displayName: '到达判定距离' })
    public arriveThreshold: number = 0.5;
  /** 售货员类型 */
  @property({
    type: Enum(BuildingType),
    displayName: '售货员类型',
    tooltip: '售货员1和售货员2'
})
public salesmanType: BuildingType = BuildingType.Salesperson1;
    // ──────────────────────────────────────────────
    // 私有状态
    // ──────────────────────────────────────────────

    /** 当前售货员状态 */
    private _state: SalesmanState = SalesmanState.Inactive;

    /** 缓存的工作岗位世界坐标 */
    private _workStationPos: Vec3 | null = null;

    /** 防止重复到达判定的标记 */
    private _arrivedHandled: boolean = false;

    // ──────────────────────────────────────────────
    // 生命周期
    // ──────────────────────────────────────────────
    /**是否激活 */
    getIsActive(){
        return this._state !== SalesmanState.Inactive;
    }
    onLoad() {
        super.onLoad();

        // 自动获取 / 初始化背包组件
        ComponentInitializer.initComponents(this.node, {
            pickupComponent: PickupComponent,
        }, this);

        // 缓存工作岗位坐标
        if (this.workStationNode && this.workStationNode.isValid) {
            this._workStationPos = this.workStationNode.getWorldPosition().clone();
        }

        // 监听到达目标事件
        this.node.on(ComponentEvent.TARGET_REACHED, this._onTargetReached, this);
    }

    onDestroy() {
        super.onDestroy();
        this.node.off(ComponentEvent.TARGET_REACHED, this._onTargetReached, this);
    }

    update(dt: number) {
        super.update(dt);

        // 未激活时跳过所有逻辑
        if (this._state === SalesmanState.Inactive) return;

        // 前往工作岗位途中：若意外停止移动则重新出发
        if (this._state === SalesmanState.MovingToStation) {
            if (!this.movementComponent.isMoving && !this._arrivedHandled) {
                this._tryArrive();
            }
        }

        // 在岗：持续维持在岗动画（防止被状态机覆盖后卡帧）
        if (this._state === SalesmanState.Working) {
            this._maintainWorkAnim();
        }
    }

    // ──────────────────────────────────────────────
    // 公共接口
    // ──────────────────────────────────────────────

    /**
     * 激活售货员，通常由关卡管理器在解锁条件满足后调用。
     * @param workStationPos 工作岗位世界坐标（可选，优先使用 Inspector 中的 workStationNode）
     */
    public activate(workStationPos?: Vec3): void {
        if (this._state !== SalesmanState.Inactive) {
            console.warn('[Salesman] 已激活，忽略重复调用');
            return;
        }

        // 外部传入坐标优先
        if (workStationPos) {
            this._workStationPos = workStationPos.clone();
        }


        // 允许改变朝向
        if (this.movementComponent) {
            this.movementComponent.IsKeepFace = false;
        }

        // 切换状态并出发
        this._state = SalesmanState.MovingToStation;
        this._arrivedHandled = false;
        this._moveToWorkStation();
    }

    /** 获取当前状态 */
    public getSalesmanState(): SalesmanState {
        return this._state;
    }

    /** 获取背包组件 */
    public getPickupComponent(): PickupComponent {
        return this.pickupComponent;
    }

    /**
     * 重置售货员到初始未激活状态（关卡重置时调用）
     */
    public reset(): void {
        this._state = SalesmanState.Inactive;
        this._arrivedHandled = false;

        // 锁定朝向（恢复初始朝向）
        if (this.movementComponent) {
            this.movementComponent.IsKeepFace = true;
        }

        super.reset();
    }

    // ──────────────────────────────────────────────
    // Character 抽象方法实现
    // ──────────────────────────────────────────────

    /** 售货员无攻击目标 */
    public GetAttackTarget(): Node | null {
        return null;
    }

    // ──────────────────────────────────────────────
    // 私有方法
    // ──────────────────────────────────────────────

    /** 移动到工作岗位 */
    private _moveToWorkStation(): void {
        if (!this._workStationPos) {
            console.warn('[Salesman] 未设置工作岗位坐标，直接进入工作状态');
            this._startWorking();
            return;
        }
        this.moveToWorldPosition(this._workStationPos);
    }

    /** 尝试判断是否已到达工作岗位 */
    private _tryArrive(): void {
        if (!this._workStationPos) return;

        const dist = Vec3.distance(
            this.node.getWorldPosition(),
            this._workStationPos
        );

        if (dist <= this.arriveThreshold) {
            this._arrivedHandled = true;
            this._startWorking();
        } else {
            // 距离不够，重新出发
            this._moveToWorkStation();
        }
    }

    /** MovementComponent 到达目标时的回调 */
    private _onTargetReached(): void {
        if (this._state !== SalesmanState.MovingToStation) return;
        if (this._arrivedHandled) return;
        this._tryArrive();
    }

    /** 开始在岗工作 */
    private _startWorking(): void {
        this._state = SalesmanState.Working;

        // 停止移动，站在 shopCollider 上
        // ShopCommon / ProductionBuilding 的触发器会自动检测 PickupComponent
        this.stopMoving();

        // 播放在岗动画
        this._playWorkAnim();

        console.log('[Salesman] 到达工作岗位，开始工作');
    }

    /** 播放在岗动画 */
    private _playWorkAnim(): void {
        if (!this.animationComponent) return;
        // workAnimName 有值时子类可扩展为自定义动作，当前统一播放 idle
        this.animationComponent.playIdle();
    }

    /** 每帧维持在岗动画（防止状态机将其覆盖） */
    private _maintainWorkAnim(): void {
        if (!this.animationComponent) return;
        if (!this.animationComponent.isPlayingAnimation()) {
            this._playWorkAnim();
        }
    }

    // ──────────────────────────────────────────────
    // 动画状态机回调重写（在岗时屏蔽状态机动画切换）
    // ──────────────────────────────────────────────

    protected onMoveEnter(): void {
        if (this._state === SalesmanState.Working) return;
        super.onMoveEnter();
    }

    protected onMoveUpdate(dt: number): void {
        if (this._state === SalesmanState.Working) return;
        super.onMoveUpdate(dt);
    }

    protected onIdleEnter(): void {
        if (this._state === SalesmanState.Working) {
            this._playWorkAnim();
            return;
        }
        super.onIdleEnter();
    }

    protected onIdleUpdate(dt: number): void {
        if (this._state === SalesmanState.Working) return;
        super.onIdleUpdate(dt);
    }
}
