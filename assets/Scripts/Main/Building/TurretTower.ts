import { _decorator, Component, Node, Vec3, Animation, instantiate, clamp, Enum, tween, Vec3 as Vec3_, easing, ParticleSystem } from 'cc';
import { CommonEvent, ObjectType, BuildingType, BuildUnlockState } from '../Common/CommonEnum';
import { HealthComponent } from '../Components/HealthComponent';
import { BulletBase } from '../Bullet/BulletBase';
import { BuildingBase } from './BuildingBase';

const { ccclass, property } = _decorator;

/**
 * 箭塔类 - 自动寻找并攻击最近的敌人，继承自建筑基类
 */
@ccclass('TurretTower')
export class TurretTower extends BuildingBase {
    /** 炮塔动画 */
    @property({ type: Animation, displayName: '炮塔动画' })
    private animation: Animation = null!;

    /** 炮塔攻击粒子 */
    @property({ type: Node, displayName: '炮塔攻击粒子' })
    private attEff:Node = null!;

    /** 炮塔转动部位模型节点 */
    @property({ type: Node, displayName: '炮塔转动部位模型节点' })
    private rotationNode:Node = null!;

    /** 基座节点（用于解锁动画）*/
    @property({ type: Node, displayName: '基座节点' })
    private baseNode: Node = null!;

    /** 箭矢预制体 */
    @property({ type: Enum(ObjectType), displayName: '箭矢类型' })
    private arrowType: ObjectType = ObjectType.Arrow;

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

    /** 箭矢速度 */
    @property({ displayName: '箭矢速度', tooltip: '箭矢飞行速度' })
    private arrowSpeed: number = 20;

    /** 是否显示攻击范围 */
    @property({ displayName: '显示攻击范围', tooltip: '是否在编辑器中显示攻击范围' })
    private showAttackRange: boolean = true;

    /** 是否自动寻找目标 */
    @property({ displayName: '自动瞄准', tooltip: '是否自动寻找最近的敌人' })
    private autoTarget: boolean = true;

    /** Y轴旋转角度限制（度） */
    @property({ displayName: 'Y轴旋转限制', tooltip: '限制rotationNode的Y轴旋转角度，0表示无限制', range: [0, 180] })
    private yRotationLimit: number = 0;

    /** 旋转速度 */
    @property({ displayName: '旋转速度', tooltip: 'rotationNode旋转到目标位置的速度' })
    private rotationSpeed: number = 360; // 度/秒

    /** 旋转速度 */
    @property({ displayName: '结束节点', tooltip: '结束节点' })
    private endNode: Node = null!;
    // 私有变量
    private _currentTarget: Node | null = null;
    private _lastAttackTime: number = 0;
    private _attackCooldown: number = 0;
    private _isActive: boolean = true;
    private _tempVec3 = new Vec3();
    private _tempVec3_2 = new Vec3();
    private _currentRotationY: number = 180; // 当前Y轴旋转角度
    private _targetRotationY: number = 0; // 目标Y轴旋转角度
    
    // 连击相关变量
    private _currentComboCount: number = 0; // 当前连击数
    private _comboInterval: number = 0.1; // 连击间隔时间（秒）
    private _lastComboTime: number = 0; // 上次连击时间
    private _isInCombo: boolean = false; // 是否正在连击中
    
    onLoad() {
        super.onLoad();
        this._attackCooldown = 1 / this.attackSpeed;
        this._validateComponents();
        this._registerEvents();

        // 初始化时根据建筑状态设置激活状态
        this._isActive = (this.state === BuildUnlockState.Unlocked);
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

    /**
     * 验证必要组件
     */
    private _validateComponents() {
        if (!this.firePoint) {
       //console.warn('箭塔未设置发射点，将使用自身节点');
            this.firePoint = this.node;
        }

        if (!this.rotationNode) {
       //console.warn('箭塔未设置旋转节点，将使用自身节点');
            this.rotationNode = this.node;
        }

        if (!this.baseNode) {
       //console.warn('箭塔未设置基座节点，将使用自身节点');
            this.baseNode = this.node;
        }
    }

    /**
     * 注册事件
     */
    private _registerEvents() {
        // app.event.on(CommonEvent.GamePause, this._onGamePause, this);
        // app.event.on(CommonEvent.GameResume, this._onGameResume, this);
    }

    /**
     * 注销事件
     */
    private _unregisterEvents() {
        app.event.offAllByTarget(this);
    }

    /**
     * 游戏胜利回调
     */
    protected onUnlockItem(type: BuildingType): void{
        if (type === this.type && this.state === BuildUnlockState.Active) {
            this.UnlockBuilding();
        }
        if(type == BuildingType.Wall1) this.autoTarget = false;
    }

    /**
     * 更新目标
     */
    private _updateTarget() {
        // 检查当前目标是否仍然有效
        if (this._currentTarget && this._isTargetValid(this._currentTarget)) {
            // 检查目标是否还在攻击范围内
            if (this._getDistanceToTarget(this._currentTarget) <= this.attackRange) {
                return; // 目标仍然有效
            }
        }

        // 寻找新的目标
        this._currentTarget = this._findNearestEnemy();
    }

    /**
     * 寻找最近的敌人
     */
    private _findNearestEnemy(): Node | null {
        const towerPos = this.node.getWorldPosition();
        const enemies = manager.enemy.getRangeEnemies(towerPos, this.attackRange);

        if (enemies.length === 0) return null;

        // 返回最近的敌人（getRangeEnemies 已经按距离排序）
        return enemies[0].node;
    }

    /**
     * 检查目标是否有效
     */
    private _isTargetValid(target: Node): boolean {
        if (!target || !target.isValid) return false;

        // 检查敌人是否死亡
        const health = target.getComponent(HealthComponent);
        if (health && health.isDead) return false;

        return true;
    }

    /**
     * 获取到目标的距离
     */
    private _getDistanceToTarget(target: Node): number {
        const towerPos = this.node.getWorldPosition();
        const targetPos = target.getWorldPosition();
        return Vec3.distance(towerPos, targetPos);
    }

    /**
     * 检查是否可以攻击
     */
    private _canAttack(): boolean {
        if (!this._currentTarget) return false;

        const currentTime = Date.now() / 1000;
        
        // 如果正在连击中
        if (this._isInCombo) {
            // 检查是否还有连击次数
            if (this._currentComboCount >= this.comboCount) {
                return false; // 连击已完成，等待下一轮攻击
            }
            // 检查连击间隔
            return currentTime - this._lastComboTime >= this._comboInterval;
        }
        
        // 正常攻击冷却检查
        return currentTime - this._lastAttackTime >= this._attackCooldown;
    }

    /**
     * 执行攻击
     */
    private _performAttack() {
        // 开始连击或继续连击
        if (!this._isInCombo) {
            this._isInCombo = true;
            this._currentComboCount = 0;
        }
        
        this._currentComboCount++;
        const currentTime = Date.now() / 1000;
        
        // 发射箭矢
        this._fireArrow();
        
        // 更新连击时间
        this._lastComboTime = currentTime;
        
        // 如果还有连击次数，安排下一次连击
        if (this._currentComboCount < this.comboCount) {
            // 继续连击，不更新主攻击时间
        } else {
            // 连击结束，更新主攻击时间并重置连击状态
            this._lastAttackTime = currentTime;
            this._resetCombo();
        }
    }
    
    /**
     * 发射单发箭矢
     */
    private _fireArrow() {
        const arrowNode = manager.pool.getNode(this.arrowType)

        // 设置箭矢位置
        const firePos = this.firePoint.getWorldPosition();
        arrowNode.setWorldPosition(firePos);

        // 获取箭矢组件
        const arrow = arrowNode.getComponent(BulletBase);
        if (!arrow) {
            arrowNode.destroy();
            return;
        }

        // 配置箭矢属性
        arrow.damage = this.attackDamage;
        arrow.speed = this.arrowSpeed;
        arrow.moveType = 1; // PARABOLA 抛物线类型
        arrow.targetType = 1; // TRACKING 类型
        arrow.setTarget(this._currentTarget);

        // 添加到场景
        this.node.parent?.addChild(arrowNode);

        // 发射箭矢
        const direction = this._calculateFireDirection();
        arrow.fire(firePos, direction);
        app.audio.playEffect('resources/audio/射箭攻击', 0.6);

        // 播放发射特效（可选）
        this._playFireEffect();
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
        const comboTimeout = 2.0; // 连击超时时间（秒）
        
        // 如果连击超时，重置连击状态
        if (currentTime - this._lastComboTime > comboTimeout) {
            this._resetCombo();
        }
    }

    /**
     * 计算发射方向
     */
    private _calculateFireDirection(): Vec3 {
        if (!this._currentTarget) return Vec3.FORWARD;

        const firePos = this.firePoint.getWorldPosition();
        const targetPos = this._currentTarget.getWorldPosition();

        this._tempVec3.set(targetPos).subtract(firePos).normalize();
        return this._tempVec3;
    }

    /**
     * 更新塔朝向 - 修改为使rotationNode的Y轴指向目标，并添加角度限制
     * @param dt 时间增量
     */
    private _updateTowerRotation(dt: number) {
        if (!this._currentTarget || !this.rotationNode) return;

        // 计算从rotationNode到目标的方向向量
        const rotationNodePos = this.rotationNode.getWorldPosition();
        const targetPos = this._currentTarget.getWorldPosition();
        
        // 计算方向向量（Y轴指向目标）
        this._tempVec3.set(targetPos).subtract(rotationNodePos);
        
        // 只在水平面旋转，忽略Y轴差异
        this._tempVec3.y = 0;
        
        if (this._tempVec3.length() <= 0) return;
        
        this._tempVec3.normalize();
        
        // 计算目标Y轴旋转角度（使节点的Y轴指向目标）
        this._targetRotationY = Math.atan2(this._tempVec3.x, this._tempVec3.z) * 180 / Math.PI;
        
        // 应用旋转限制 - 基于初始角度的相对限制
        if (this.yRotationLimit > 0) {
            // 计算相对于初始位置的角度限制
            const relativeTargetAngle = this._targetRotationY;
            const clampedAngle = clamp(relativeTargetAngle, -this.yRotationLimit, this.yRotationLimit);
            this._targetRotationY = clampedAngle;
        }
        
        // 检查是否需要旋转（优化性能）
        const angleDiff = Math.abs(this._targetRotationY - this._currentRotationY);
        if (angleDiff < 0.1) return; // 如果角度差异很小，不需要旋转
        
        // 平滑旋转到目标角度
        if (this.rotationSpeed > 0) {
            const maxRotationThisFrame = this.rotationSpeed * dt;
            
            // 选择最短旋转路径
            let shortestDiff = this._targetRotationY - this._currentRotationY;
            if (Math.abs(shortestDiff) > 180) {
                shortestDiff = shortestDiff > 0 ? shortestDiff - 360 : shortestDiff + 360;
            }
            
            const rotationStep = clamp(shortestDiff, -maxRotationThisFrame, maxRotationThisFrame);
            this._currentRotationY += rotationStep;
            
            // 标准化角度到 -180 到 180 范围
            this._currentRotationY = ((this._currentRotationY + 180) % 360) - 180;
        } else {
            // 直接设置旋转
            this._currentRotationY = this._targetRotationY;
        }
        
        // 应用旋转到rotationNode，只改变Y轴
        this.rotationNode.setWorldRotationFromEuler(0, this._currentRotationY, 0);
    }

    /**
     * 播放发射特效
     */
    private _playFireEffect() {
        // 这里可以添加发射特效，如粒子效果、音效等
        // manager.effect.playEffect('ArrowFire', this.firePoint.getWorldPosition());

        // 处理粒子特效
        const particles = this.attEff.getComponentsInChildren(ParticleSystem);
        particles.forEach(particle => {
            particle.play();
        });

        this.animation.play();
    }

    /**
     * 游戏开始回调
     */
    private _onGameStart() {
        this._isActive = true;
    }

    /**
     * 游戏暂停回调
     */
    private _onGamePause() {
        this._isActive = false;
    }

    /**
     * 游戏恢复回调
     */
    private _onGameResume() {
        this._isActive = true;
    }

    /**
     * 获取当前目标
     */
    public getCurrentTarget(): Node | null {
        return this._currentTarget;
    }

    /**
     * 手动设置目标
     */
    public setTarget(target: Node | null) {
        this._currentTarget = target;
    }

    /**
     * 设置是否激活
     */
    public setActive(active: boolean) {
        this._isActive = active;
    }

    /**
     * 获取攻击范围
     */
    public getAttackRange(): number {
        return this.attackRange;
    }

    /**
     * 设置攻击范围
     */
    public setAttackRange(range: number) {
        this.attackRange = Math.max(1, range);
    }

    /**
     * 升级箭塔
     */
    public upgrade(damageBonus: number = 10, rangeBonus: number = 2, speedBonus: number = 0.2, rotationSpeedBonus: number = 0) {
        this.attackDamage += damageBonus;
        this.attackRange += rangeBonus;
        this.attackSpeed += speedBonus;
        this.rotationSpeed += rotationSpeedBonus;
        this._attackCooldown = 1 / this.attackSpeed;
    }

    /**
     * 获取当前旋转角度
     */
    public getCurrentRotationY(): number {
        return this._currentRotationY;
    }

    /**
     * 获取目标旋转角度
     */
    public getTargetRotationY(): number {
        return this._targetRotationY;
    }

    /**
     * 设置Y轴旋转限制
     */
    public setYRotationLimit(limit: number) {
        this.yRotationLimit = Math.max(0, limit);
    }

    /**
     * 设置旋转速度
     */
    public setRotationSpeed(speed: number) {
        this.rotationSpeed = Math.max(0, speed);
    }

    /**
     * 显示解锁动画
     * 动画序列：
     * 1. 基座节点从0缩放到1（0.3秒）
     * 2. 旋转节点从0缩放到1（0.2秒，延迟0.3秒）
     */
    protected showUnlockAnim(): Promise<void> {
        return new Promise((resolve) => {
            // 初始化缩放为0
            this.baseNode.active = true;
            this.rotationNode.active = true;
            this.baseNode.setScale(0, 0, 0);
            this.rotationNode.setScale(0, 0, 0);

            // 基座节点缩放动画
            tween(this.baseNode)
                .to(0.4, { scale: Vec3.ONE }, {easing: easing.backOut})
                .call(() => {
                    // 基座动画完成后，开始旋转节点动画
                    tween(this.rotationNode)
                        .to(0.3, { scale: Vec3.ONE }, {easing: easing.backOut})
                        .call(() => {
                            // 动画完成后激活箭塔功能
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
     * 锁定状态下缩放为0，不激活功能
     */
    protected showlock(): Promise<void> {
        return new Promise((resolve) => {
            // 设置为锁定状态
            // this.baseNode.setScale(0, 0, 0);
            // this.rotationNode.setScale(0, 0, 0);
            this.baseNode.active = false;
            this.rotationNode.active = false;
            this._isActive = false;
            resolve();
        });
    }

    /**
     * 解锁完成回调
     */
    protected onUnlockFinished(): void {
   //console.log('箭塔解锁完成，开始激活功能');
        // 可以在这里添加额外的解锁效果，如粒子特效、音效等
    }

    /**
     * 在编辑器中绘制攻击范围
     */
    onDrawGizmos() {
        if (!this.showAttackRange) return;

        const pos = this.node.getWorldPosition();

        // 绘制攻击范围圆圈
        const segments = 32;
        const angleStep = (Math.PI * 2) / segments;

        for (let i = 0; i < segments; i++) {
            const angle1 = i * angleStep;
            const angle2 = (i + 1) * angleStep;

            const x1 = pos.x + Math.cos(angle1) * this.attackRange;
            const z1 = pos.z + Math.sin(angle1) * this.attackRange;
            const x2 = pos.x + Math.cos(angle2) * this.attackRange;
            const z2 = pos.z + Math.sin(angle2) * this.attackRange;

            // 这里应该使用 Cocos Creator 的 Gizmos API，但为简化使用 console.log
            // 在实际项目中应该使用: Gizmos.drawLine(new Vec3(x1, pos.y, z1), new Vec3(x2, pos.y, z2));
        }
    }
    

}