import { _decorator, Animation, clamp, Enum, easing, Node, tween, Vec3, Quat } from 'cc';
import { ObjectType, BuildUnlockState } from '../Common/CommonEnum';
import { HealthComponent } from '../Components/HealthComponent';
import { BuildingBase } from './BuildingBase';
import { Arrow } from '../Bullet/Arraw';

const { ccclass, property } = _decorator;

/**
 * 箭塔类 - 自动寻找并攻击范围内的随机敌人，继承自建筑基类
 */
@ccclass('ArrowTower')
export class ArrowTower extends BuildingBase {

    /** 箭塔动画 */
    @property({ type: Animation, displayName: '箭塔动画' })
    private animation: Animation = null!;

    /** 箭塔转动部位模型节点 */
    @property({ type: Node, displayName: '箭塔转动部位模型节点' })
    private rotationNode: Node = null!;

    /** 基座节点（用于解锁动画）*/
    @property({ type: Node, displayName: '基座节点' })
    private baseNode: Node = null!;

    /** 箭矢发射点 */
    @property({ type: Node, displayName: '箭矢发射点' })
    private firePoint: Node = null!;

    /** 攻击范围 */
    @property({ displayName: '攻击范围', tooltip: '箭塔的攻击半径' })
    private attackRange: number = 15;

    /** 攻击伤害 */
    @property({ displayName: '攻击伤害', tooltip: '每次攻击造成的伤害' })
    private attackDamage: number = 25;

    /** 攻击速度（次/秒） */
    @property({ displayName: '攻击速度', tooltip: '每秒攻击次数' })
    private attackSpeed: number = 1.5;

    /** 连击次数 */
    @property({ displayName: '连击次数', tooltip: '连续攻击次数' })
    private comboCount: number = 1;

    /** 是否显示攻击范围 */
    @property({ displayName: '显示攻击范围', tooltip: '是否在编辑器中显示攻击范围' })
    private showAttackRange: boolean = true;

    /** 是否自动寻找目标 */
    @property({ displayName: '自动瞄准', tooltip: '是否自动寻找范围内的随机敌人' })
    private autoTarget: boolean = true;

    /** Y轴旋转角度限制（度） */
    @property({ displayName: 'Y轴旋转限制', tooltip: '限制rotationNode的Y轴旋转角度，0表示无限制', range: [0, 180] })
    private yRotationLimit: number = 0;

    /** 旋转速度 */
    @property({ displayName: '旋转速度', tooltip: 'rotationNode旋转到目标位置的速度' })
    private rotationSpeed: number = 360; // 度/秒

    /** 旋转朝向偏移（度），用于补偿模型朝向与坐标轴的偏差，一般为 0 / 90 / -90 / 180 */
    @property({ displayName: '旋转朝向偏移', tooltip: '补偿模型朝向偏差，常见值：0 / 90 / -90 / 180' })
    private rotationOffset: number = 0;

    @property({ type: Node, displayName: '额外解锁的Node 不需要缩放动画' })
    private extraUnlockNode: Node[] = [];

    @property({ type: Node, displayName: '额外解锁的Node 需要缩放动画' })
    private extraUnlockNodeNeedScale: Node[] = [];

    // ──────────────────────────────────────────────
    // 私有变量
    // ──────────────────────────────────────────────

    private _currentTarget: Node | null = null;
    private _lastAttackTime: number = 0;
    private _attackCooldown: number = 0;
    private _isActive: boolean = true;
    private _tempVec3 = new Vec3();
    private _currentRotationY: number = 0;  // 世界空间当前 Y 角（度）
    private _targetRotationY: number = 0;   // 世界空间目标 Y 角（度）
    // bow 初始世界欧拉角的 X/Z 分量，每帧只替换 Y，保留模型姿态
    private _rotationNodeBaseEulerX: number = 0;
    private _rotationNodeBaseEulerZ: number = 0;

    // 连击相关变量
    private _currentComboCount: number = 0;
    private _comboInterval: number = 0.1;
    private _lastComboTime: number = 0;
    private _isInCombo: boolean = false;

    // ──────────────────────────────────────────────
    // 生命周期
    // ──────────────────────────────────────────────

    onLoad() {
        super.onLoad();
        this._attackCooldown = 1 / this.attackSpeed;
        this._validateComponents();
        this._registerEvents();
        this._isActive = (this.state === BuildUnlockState.Unlocked);
        // 直接读取 rotationNode 的世界欧拉角 Y 作为初始值
        // 全程在世界空间操作，避免父节点旋转干扰
        this._currentRotationY = this.rotationNode.eulerAngles.y;
        this._targetRotationY = this._currentRotationY;
        // 保存 bow 初始世界欧拉角的 X/Z，每帧只替换 Y，保留模型姿态
        this._rotationNodeBaseEulerX = this.rotationNode.eulerAngles.x;
        this._rotationNodeBaseEulerZ = this.rotationNode.eulerAngles.z;
    }

    start() {
        super.start();
    }

    onDestroy() {
        this._unregisterEvents();
    }

    update(dt: number) {
        if (!this._isActive || !this.autoTarget) return;

        // 检查连击超时重置
        this._checkComboTimeout();

        // 更新当前目标
        this._updateTarget();

        // 更新塔朝向（先旋转，再决定是否攻击）
        this._updateTowerRotation(dt);

        // 检查是否可以攻击
        if (this._canAttack()) {
            this._performAttack();
        }
    }

    // ──────────────────────────────────────────────
    // 私有方法
    // ──────────────────────────────────────────────

    private _validateComponents() {
        if (!this.firePoint) {
            this.firePoint = this.node;
        }
        if (!this.rotationNode) {
            this.rotationNode = this.node;
        }
        if (!this.baseNode) {
            this.baseNode = this.node;
        }
    }

    private _registerEvents() {
        // app.event.on(CommonEvent.GameStart, this._onGameStart, this);
        // app.event.on(CommonEvent.GamePause, this._onGamePause, this);
        // app.event.on(CommonEvent.GameResume, this._onGameResume, this);
    }

    private _unregisterEvents() {
        app.event.offAllByTarget(this);
    }

    /**
     * 更新目标
     */
    private _updateTarget() {
        if (this._currentTarget && this._isTargetValid(this._currentTarget)) {
            if (this._getDistanceToTarget(this._currentTarget) <= this.attackRange) {
                return;
            }
        }
        this._currentTarget = this._findRandomEnemy();
    }

    /**
     * 在攻击范围内随机选择一个敌人
     */
    private _findRandomEnemy(): Node | null {
        const towerPos = this.baseNode ? this.baseNode.getWorldPosition() : this.node.getWorldPosition();
        const enemies = manager.enemy.getRangeEnemies(towerPos, this.attackRange);
        if (enemies.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * enemies.length);
        return enemies[randomIndex].node;
    }

    /**
     * 检查目标是否有效
     */
    private _isTargetValid(target: Node): boolean {
        if (!target || !target.isValid) return false;
        const health = target.getComponent(HealthComponent);
        if (health && health.isDead) return false;
        return true;
    }

    /**
     * 获取到目标的距离
     */
    private _getDistanceToTarget(target: Node): number {
        const towerPos = this.baseNode ? this.baseNode.getWorldPosition() : this.node.getWorldPosition();
        const targetPos = target.getWorldPosition();
        return Vec3.distance(towerPos, targetPos);
    }

    /**
     * 检查是否可以攻击
     */
    private _canAttack(): boolean {
        if (!this._currentTarget) return false;

        const currentTime = Date.now() / 1000;

        if (this._isInCombo) {
            if (this._currentComboCount >= this.comboCount) {
                return false;
            }
            return currentTime - this._lastComboTime >= this._comboInterval;
        }

        return currentTime - this._lastAttackTime >= this._attackCooldown;
    }

    /**
     * 执行攻击
     */
    private _performAttack() {
        if (!this._isInCombo) {
            this._isInCombo = true;
            this._currentComboCount = 0;
        }

        this._currentComboCount++;
        const currentTime = Date.now() / 1000;

        this._fireArrow();

        this._lastComboTime = currentTime;

        if (this._currentComboCount >= this.comboCount) {
            this._lastAttackTime = currentTime;
            this._resetCombo();
        }
    }

    /**
     * 发射单发箭矢 - 从对象池获取箭矢并追踪目标
     */
    private _fireArrow() {
        if (!this._currentTarget) return;

        // 播放箭塔动画
        this.animation && this.animation.play();

        // 从对象池获取箭矢节点
        const arrowNode = manager.pool.getNode(ObjectType.Arrow, this.node.parent!);
        if (!arrowNode) return;

        // 获取发射点世界坐标
        const startPos = this.firePoint
            ? this.firePoint.getWorldPosition()
            : this.node.getWorldPosition();

        // 计算朝向目标的方向向量
        const targetPos = this._currentTarget.getWorldPosition();
        const dir = new Vec3();
        Vec3.subtract(dir, targetPos, startPos);
        dir.normalize();

        // 设置箭矢参数并发射
        const arrow = arrowNode.getComponent(Arrow);
        if (arrow) {
            arrow.damage = this.attackDamage;
            arrow.setTarget(this._currentTarget);
            arrow.fire(startPos, dir);
        }
    }

    /**
     * 重置连击状态
     */
    private _resetCombo() {
        this._isInCombo = false;
        this._currentComboCount = 0;
        this._lastComboTime = 0;
    }

    /**
     * 检查连击超时并重置
     */
    private _checkComboTimeout() {
        if (!this._isInCombo) return;
        const currentTime = Date.now() / 1000;
        const comboTimeout = 2.0;
        if (currentTime - this._lastComboTime > comboTimeout) {
            this._resetCombo();
        }
    }

    /**
     * 更新塔朝向
     * 全程在【世界空间】操作：
     * 1. atan2 计算世界目标 Y 角
     * 2. 与当前世界 Y 角做最短路径插值
     * 3. 用 setWorldRotationFromEuler 写回，保留 bow 初始世界 X/Z 姿态
     */
    private _updateTowerRotation(dt: number) {
        if (!this._currentTarget || !this.rotationNode) return;

        const rotationNodePos = this.rotationNode.getWorldPosition();
        const targetPos = this._currentTarget.getWorldPosition();

        this._tempVec3.set(targetPos).subtract(rotationNodePos);
        this._tempVec3.y = 0;

        if (this._tempVec3.length() <= 0) return;

        this._tempVec3.normalize();

        // 世界空间目标 Y 角，加上 rotationOffset 补偿模型朝向偏差
        this._targetRotationY = Math.atan2(this._tempVec3.x, this._tempVec3.z) * 180 / Math.PI + this.rotationOffset;

        // 归一化到 -180~180
        if (this._targetRotationY > 180) this._targetRotationY -= 360;
        else if (this._targetRotationY < -180) this._targetRotationY += 360;

        if (this.yRotationLimit > 0) {
            this._targetRotationY = clamp(this._targetRotationY, -this.yRotationLimit, this.yRotationLimit);
        }

        // 最短角度差插值
        let shortestDiff = this._targetRotationY - this._currentRotationY;
        if (shortestDiff > 180) shortestDiff -= 360;
        else if (shortestDiff < -180) shortestDiff += 360;

        if (Math.abs(shortestDiff) < 0.1) return;

        if (this.rotationSpeed > 0) {
            const maxRotationThisFrame = this.rotationSpeed * dt;
            const rotationStep = clamp(shortestDiff, -maxRotationThisFrame, maxRotationThisFrame);
            this._currentRotationY += rotationStep;
            if (this._currentRotationY > 180) this._currentRotationY -= 360;
            else if (this._currentRotationY < -180) this._currentRotationY += 360;
        } else {
            this._currentRotationY = this._targetRotationY;
        }

        // 世界空间写回：只替换 Y，保留 bow 初始世界 X/Z 姿态
        this.rotationNode.setWorldRotationFromEuler(
            this._rotationNodeBaseEulerX,
            this._currentRotationY,
            this._rotationNodeBaseEulerZ
        );
    }

    // ──────────────────────────────────────────────
    // 公开接口
    // ──────────────────────────────────────────────

    /** 获取当前目标 */
    public getCurrentTarget(): Node | null {
        return this._currentTarget;
    }

    /** 手动设置目标 */
    public setTarget(target: Node | null) {
        this._currentTarget = target;
    }

    /** 设置是否激活 */
    public setActive(active: boolean) {
        this._isActive = active;
    }

    /** 获取攻击范围 */
    public getAttackRange(): number {
        return this.attackRange;
    }

    /** 设置攻击范围 */
    public setAttackRange(range: number) {
        this.attackRange = Math.max(1, range);
    }

    /** 升级箭塔 */
    public upgrade(damageBonus: number = 10, rangeBonus: number = 2, speedBonus: number = 0.2, rotationSpeedBonus: number = 0) {
        this.attackDamage += damageBonus;
        this.attackRange += rangeBonus;
        this.attackSpeed += speedBonus;
        this.rotationSpeed += rotationSpeedBonus;
        this._attackCooldown = 1 / this.attackSpeed;
    }

    /** 获取当前旋转角度 */
    public getCurrentRotationY(): number {
        return this._currentRotationY;
    }

    /** 获取目标旋转角度 */
    public getTargetRotationY(): number {
        return this._targetRotationY;
    }

    /** 设置Y轴旋转限制 */
    public setYRotationLimit(limit: number) {
        this.yRotationLimit = Math.max(0, limit);
    }

    /** 设置旋转速度 */
    public setRotationSpeed(speed: number) {
        this.rotationSpeed = Math.max(0, speed);
    }

    // ──────────────────────────────────────────────
    // BuildingBase 实现
    // ──────────────────────────────────────────────

    protected init(): void {
        super.init();
        this.extraUnlockNode.forEach(node => {
            node.active = false;
        });
        this.extraUnlockNodeNeedScale.forEach(node => {
            node.active = false;
        });
    }

    /**
     * 显示解锁动画
     */
    protected showUnlockAnim(): Promise<void> {
        return new Promise((resolve) => {
            this.baseNode.active = true;
            this.rotationNode.active = true;
            const oldScale_baseNode = this.baseNode.getScale().clone();
            const oldScale_rotationNode = this.rotationNode.getScale().clone();
            this.baseNode.setScale(0, 0, 0);
            this.rotationNode.setScale(0, 0, 0);

            this.extraUnlockNode.forEach(node => {
                node.active = true;
            });
            this.extraUnlockNodeNeedScale.forEach(node => {
                node.active = true;
                const oldScale = node.getScale().clone();
                node.setScale(0, 0, 0);
                tween(node).to(0.3, { scale: oldScale }, { easing: easing.backOut }).start();
            });

            tween(this.baseNode)
                .to(0.4, { scale: oldScale_baseNode }, { easing: easing.backOut })
                .call(() => {
                    tween(this.rotationNode)
                        .to(0.3, { scale: oldScale_rotationNode }, { easing: easing.backOut })
                        .call(() => {
                            this._isActive = true;
                            resolve();
                        })
                        .start();
                })
                .start();
        });
    }

    /**
     * 显示锁定状态
     */
    protected showlock(): Promise<void> {
        return new Promise((resolve) => {
            this.baseNode.active = false;
            this.rotationNode.active = false;
            this._isActive = false;
            resolve();
        });
    }

    protected onUnlockFinished(): void {
        // 可在此添加解锁后的额外逻辑
    }

    /**
     * 在编辑器中绘制攻击范围
     */
    onDrawGizmos() {
        if (!this.showAttackRange) return;
        const pos = this.node.getWorldPosition();
        const segments = 32;
        const angleStep = (Math.PI * 2) / segments;
        for (let i = 0; i < segments; i++) {
            const angle1 = i * angleStep;
            const angle2 = (i + 1) * angleStep;
            const x1 = pos.x + Math.cos(angle1) * this.attackRange;
            const z1 = pos.z + Math.sin(angle1) * this.attackRange;
            const x2 = pos.x + Math.cos(angle2) * this.attackRange;
            const z2 = pos.z + Math.sin(angle2) * this.attackRange;
        }
    }
}
