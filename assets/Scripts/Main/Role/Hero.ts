import { _decorator, Node, Vec3, ParticleSystem, ICollisionEvent, ITriggerEvent } from 'cc';
import { CommonEvent, CharacterState, ObjectType } from '../../Main/Common/CommonEnum';
import { DamageData } from '../../Main/Common/CommonInterface';
import { ComponentInitializer } from '../../Main/Common/ComponentInitializer';
import { ComponentEvent } from '../../Main/Common/ComponentEvents';
import { HealthComponent } from '../Components/HealthComponent';
import { PickupComponent } from '../Components/PickupComponent';
import { Character } from './Character';
import { MovementComponent } from '../Components/MovementComponent';
import { TipLabel } from '../UI/TipLabel';


const { ccclass, property } = _decorator;

/**
 * 英雄组件 - 基于组件化设计的英雄类
 */
@ccclass('Hero')
export class Hero extends Character {
    /** 拾取组件 */
    @property({type: PickupComponent, displayName: '拾取组件'})
    public pickupComponent: PickupComponent = null!;

    /** 自动攻击检测间隔（秒） */
    @property({ displayName: '自动攻击检测间隔', range: [0.1, 2.0] })
    public autoAttackInterval: number = 0.1;

    /** 自动攻击计时器 */
    private autoAttackTimer: number = 0;

    /** 上次显示提示的时间戳，用于限制提示显示频率 */
    private lastTipTime: number = 0;

    /** 是否处于安全区 */
    public isSafeArea: boolean = true;
    onLoad() {
        super.onLoad();

        this.node.on(ComponentEvent.UPDATE_ITEM_COUNT, this.onUpdateItemCount, this);
        this.node.on(ComponentEvent.ATTACK_COOLDOWN_END, this.onAttackCooldownEnd, this);
        this.node.on(ComponentEvent.PICKUP_ITEM_FULL, this.onPickupItemFull, this);

        // 延迟初始化碰撞器配置
        this.scheduleOnce(() => {
            this.initHeroCollider();
        }, 0);
    }

    /**
     * 初始化英雄碰撞器配置
     */
    private initHeroCollider(): void {
        if (this.collider) {
            this.collider.on("onTriggerEnter", this.onTriggerEnter, this);
            this.collider.on("onTriggerExit", this.onTriggerExit, this);
        }
    }

    onTriggerEnter(event: ITriggerEvent) {
        const otherCollider = event.otherCollider;
        if (otherCollider.node.name === 'banzi') {
            const skin = this.node.getChildByPath("ModelNode/skin");
            if (skin) {
                skin.setPosition(skin.position.x, 0.2, skin.position.z);
            }
        }
    }

    onTriggerExit(event: ITriggerEvent) {
        const otherCollider = event.otherCollider;
        if (otherCollider.node.name === 'banzi') {
            const skin = this.node.getChildByPath("ModelNode/skin");
            if (skin) {
                skin.setPosition(skin.position.x, 0, skin.position.z);
            }
        }
    }

    onDestroy() {
        app.event.offAllByTarget(this);
    }

    protected initComponents(): void {
        super.initComponents();
        ComponentInitializer.initComponents(this.node, {
            pickupComponent: PickupComponent,
        }, this);
    }

    /** 自动回血间隔 */
    private autoHealInterval: number = 3;
    private debugTimer: number = 0;

    update(dt: number) {
        super.update(dt);

        // 自动攻击逻辑
        this.updateAutoAttack(dt);

        // 每 autoHealInterval 秒调用一次自动回血
        this.debugTimer += dt;
        if (this.debugTimer >= this.autoHealInterval) {
            this.debugTimer = 0;
            this.autoHeal();
        }
    }

    protected onCollisionEnter(event: ICollisionEvent) {
        // 子类可重写
    }

    private onAttackCooldownEnd(): void {
        // 立即检查是否可以攻击，避免移动停止后的攻击延迟
        this.checkAndAutoAttack();
        this.autoAttackTimer = 0;
    }

    /**
     * 监听拾取物品满事件
     * @param itemType 物品类型
     */
    private onPickupItemFull(itemType: ObjectType): void {
        const currentTime = Date.now();

        // 限制提示显示频率（1秒内不重复显示）
        if (currentTime - this.lastTipTime < 1000) {
            return;
        }

        const tipLabel = manager.pool.getNode(ObjectType.TipLabel, this.uiNode)?.getComponent(TipLabel);
        if (tipLabel) {
            tipLabel.showTip(app.lang.getLanguage("Full"), this.node.getWorldPosition().add(new Vec3(0, 1, 0)));
            this.lastTipTime = currentTime;
        }
    }

    /**
     * 更新自动攻击逻辑
     * @param dt 帧时间差
     */
    private updateAutoAttack(dt: number) {
        const currentState = this.stateComponent.getCurrentState();

        // 死亡或技能状态不执行自动攻击
        if (currentState === CharacterState.Dead || currentState === CharacterState.Skill) {
            return;
        }

        // 正在攻击且冷却中，不执行自动攻击
        if (currentState === CharacterState.Attack && !this.attackComponent.canAttack()) {
            return;
        }

        this.autoAttackTimer += dt;
        if (this.autoAttackTimer < this.autoAttackInterval) {
            return;
        }

        this.autoAttackTimer -= this.autoAttackInterval;
        this.checkAndAutoAttack();
    }

    /**
     * 检测并执行自动攻击
     */
    private checkAndAutoAttack() {
        const heroPosition = this.node.getWorldPosition();

        let enemies = manager.enemy.getRangeEnemies(heroPosition, this.attackComponent.attackRangeValue);

        // 安全区内且门未打开时，不可攻击敌人
        if (this.isSafeArea && manager.door && !manager.door.isOpen) {
            enemies = [];
        }

        if (enemies.length > 0 && this.attackComponent.canAttack()) {
            this.attack();
        }
    }

    public move(direction: Vec3): void {
        super.move(direction);
    }

    /**
     * 变换监听回调，用于通知UI位置变化
     */
    protected onTransformChanged(): void {
        super.onTransformChanged();
        app.event.emit(CommonEvent.HerMove, this.node.getWorldPosition());
    }

    private onUpdateItemCount(type: ObjectType, count: number): void {
        app.event.emit(CommonEvent.UpdateHeroItemCount, {
            type: type,
            count: count
        });
    }

    /** 自动回血 */
    public autoHeal(): void {
        if (this.isSafeArea) {
            this.healthComponent.heal(1);
        }
    }

    /** 上次执行攻击的时间戳 */
    private lastPerformAttackTime: number = 0;

    protected onPerformAttack(damageData: DamageData): void {
        const now = Date.now();
        // 防抖：100ms 内不重复触发
        if (now - this.lastPerformAttackTime < 100) {
            return;
        }
        this.lastPerformAttackTime = now;

        const primaryTargets = this.getAttackTargetList();

        for (const target of primaryTargets) {
            const cornHealth = target.getComponent(HealthComponent);
            let isDie = false;
            if (cornHealth) {
                isDie = cornHealth.takeDamage(damageData);
            }
            const moveAnimation = target.getComponent(MovementComponent);
            if (moveAnimation) {
                if (isDie) {
                    moveAnimation.knockback(this.node.getWorldPosition(), 2);
                } else {
                    moveAnimation.knockback(this.node.getWorldPosition(), 4);
                }
            }
        }
    }

    protected getAttackTargetList(): Node[] {
        const attackRange = this.attackComponent.attackRangeValue;
        const heroPosition = this.node.getWorldPosition();

        let enemies = manager.enemy.getRangeEnemies(heroPosition, attackRange);

        // 安全区内且门未打开时，不可攻击敌人
        if (this.isSafeArea && manager.door && !manager.door.isOpen) {
            enemies = [];
        }

        const targetsWithDistance: Array<{node: Node, distanceSquared: number}> = [];

        for (const enemy of enemies) {
            const distanceSquared = Vec3.squaredDistance(heroPosition, enemy.node.getWorldPosition());
            targetsWithDistance.push({ node: enemy.node, distanceSquared });
        }

        targetsWithDistance.sort((a, b) => a.distanceSquared - b.distanceSquared);

        return targetsWithDistance.map(target => target.node);
    }

    public GetAttackTarget(): Node | null {
        return this.getAttackTargetList()[0] || null;
    }

    public attack() {
        // 技能状态下禁用攻击
        if (this.stateComponent.getCurrentState() === CharacterState.Skill) {
            return false;
        }
        super.attack();
    }

    protected onHurt(damageData: DamageData): void {
        super.onHurt(damageData);
        app.event.emit(CommonEvent.HeroHurt, { damageData: damageData });

        const healPercent = this.healthComponent.healthPercentage;
        if (healPercent < 0.3) {
            app.event.emit(CommonEvent.ShowTips, { tips: app.lang.getLanguage("HurtTips"), id: "HurtTips", duration: 3 });
        }
    }

    protected onDead(): void {
        super.onDead();
        this.scheduleOnce(() => {
            app.event.emit(CommonEvent.GameFail);
        }, 1);
    }

    public reset(): void {
        super.reset();
        this.autoAttackTimer = 0;
    }

    public GetItemCount(itemType: ObjectType): number {
        return this.pickupComponent.getItemCount(itemType);
    }

    /**
     * 控制英雄3D模型的显示/隐藏
     * @param visible true = 显示模型；false = 隐藏模型
     */
    public setModelVisible(visible: boolean): void {
        const modelNode = this.node.getChildByPath("ModelNode");
        if (modelNode) {
            modelNode.active = visible;
        }
    }

    /**
     * 启用或禁用英雄的移动组件（摇杆输入和寻路）
     * @param enabled true = 允许移动；false = 锁定（停止当前移动）
     */
    public setMovementEnabled(enabled: boolean): void {
        const movement = this.node.getComponent(MovementComponent);
        if (!movement) return;
        if (!enabled) {
            movement.stopMovingToTarget();  // 停止当前移动
        }
        movement.enabled = enabled;
    }

    /**
     * 移动状态进入回调
     */
    protected onMoveEnter() {
        this.animationComponent.playMove(1.2);
    }

    /**
     * 移动状态更新回调
     */
    protected onMoveUpdate(dt: number) {
        if (!this.animationComponent.isPlayingAnimation() || this.animationComponent.getCurrentAnimationName() != this.animationComponent.MoveAnimName) {
            this.animationComponent.playMove(1.2);
        }
    }
}
