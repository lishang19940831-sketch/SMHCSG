import { _decorator, Component, CCFloat, Vec3, RigidBody, ERigidBodyType, v3, Node, Collider, CCBoolean, PhysicsSystem, geometry } from 'cc';
import { ComponentEvent } from '../../Main/Common/ComponentEvents';
import { ColorEffectType } from '../../Main/Common/CommonEnum';
import { BaseComponet } from './BaseComponet';

const { ccclass, property } = _decorator;

/**
 * 移动组件 - 管理角色移动相关功能
 */
@ccclass('MovementComponent')
export class MovementComponent extends BaseComponet {
    @property({
        type: CCFloat, 
        displayName: '移动速度',
        range: [0, 20],
        tooltip: '角色的基础移动速度'
    })
    protected moveSpeed: number = 5;

    @property({
        type: CCFloat,
        displayName: '到达目标距离',
        range: [0.1, 5.0],
        tooltip: '认为角色已到达目标点的距离阈值'
    })
    protected arriveDistance: number = 0.5;

    protected gravity: number = 50;
    protected knockupMaxDuration: number = 3.0;

    @property({
        type: CCFloat,
        displayName: '地面高度偏移',
        range: [0.01, 10.0],
        tooltip: '角色站立时，地面高度偏移'
    })
    protected groundHeightOffset: number = 0.1;

    @property({
        type: Node,
        displayName: '影子'
    })
    protected shadow: Node = null!;

    /** 移动时是否保持朝向 */
    protected isKeepFace: boolean = false;

    /** 减速相关属性 */
    /** 是否处于减速状态 */
    protected isSlowing: boolean = false;
    /** 减速计时器 */
    protected slowTimer: number = 0;
    /** 减速持续时间 */
    protected slowDuration: number = 0;
    /** 减速系数 (0-1之间，表示减少的速度百分比) */
    protected slowRatio: number = 0;
    /** 原始速度 */
    protected originalSpeed: number = 0;

    /** 击退相关属性 */
    /** 是否处于击退状态 */
    protected isKnockingBack: boolean = false;
    /** 击退方向 */
    protected knockbackDirection: Vec3 = new Vec3();
    /** 击退力度 */
    protected knockbackForce: number = 0;
    /** 击退持续时间 */
    protected knockbackDuration: number = 0.3;
    /** 当前击退计时器 */
    protected knockbackTimer: number = 0;
    /** 击退前的移动方向 */
    protected preKnockbackDirection: Vec3 = new Vec3();
    /** 击退前是否正在向目标移动 */
    protected wasMovingToTarget: boolean = false;
    /** 击退前的目标位置 */
    protected preKnockbackTargetPosition: Vec3|null = null;
    /** 击退初始速度（用于刚体的递减速度计算） */
    protected knockbackInitialVelocity: Vec3|null = null;
    /** 击退当前速度（用于刚体的递减速度计算） */
    protected knockbackCurrentVelocity: Vec3 = new Vec3();

    /** 击飞相关属性 */
    /** 是否处于击飞状态 */
    protected isKnockedUp: boolean = false;
    /** 击飞初始速度 */
    protected knockupVelocity: number = 0;
    /** 击飞当前Y轴速度 */
    protected currentYVelocity: number = 0;
    /** 击飞起始高度 */
    protected knockupStartHeight: number = 0;
    /** 击飞时的地面高度 */
    protected knockupGroundHeight: number = 0;
    /** 击飞持续时间计时器 */
    protected knockupTimer: number = 0;
    /** 击飞前的移动状态 */
    protected preKnockupDirection: Vec3 = new Vec3();
    /** 击飞前是否正在向目标移动 */
    protected wasMovingToTargetBeforeKnockup: boolean = false;
    /** 击飞前的目标位置 */
    protected preKnockupTargetPosition: Vec3|null = null;
    /** 击飞方向（水平方向） */
    protected knockupDirection: Vec3 = new Vec3();
    /** 击飞水平速度 */
    protected knockupHorizontalVelocity: Vec3 = new Vec3();
    /** 击飞水平阻力系数（每秒减少的速度比例） */
    protected knockupHorizontalDrag: number = 2.0;

    /** 电击震动相关属性 */
    /** 是否处于电击震动状态 */
    protected isElectricShock: boolean = false;
    /** 电击震动计时器 */
    protected electricShockTimer: number = 0;
    /** 电击震动持续时间 */
    protected electricShockDuration: number = 0;
    /** 电击震动强度 */
    protected electricShockIntensity: number = 0;
    /** 电击震动频率 */
    protected electricShockFrequency: number = 0;
    /** 电击震动的原始位置 */
    protected electricShockOriginPos: Vec3 = new Vec3();
    /** 电击震动的内部计时器（用于控制震动频率） */
    protected electricShockInternalTimer: number = 0;

    /** 移动方向 */
    protected readonly direction: Vec3 = new Vec3();
    /** 是否正在移动到目标点 */
    protected isMovingToTarget: boolean = false;
    /** 目标世界坐标 */
    protected targetWorldPosition: Vec3|null = null;
    /** 到达目标点的回调函数 */
    protected onTargetReachedCallback: Function|null = null;
    /** 临时向量，用于计算 */
    private readonly tempVec3: Vec3 = new Vec3();
    /** 临时向量，用于存储位置 */
    private readonly currentPos: Vec3 = new Vec3();
    /** 刚体组件 */
    protected rigidBody: RigidBody|null = null;

    get ArriveDistance(): number {
        return this.arriveDistance;
    }

    set IsKeepFace(value: boolean) {
        this.isKeepFace = value;
    }

    onLoad() {
        super.onLoad();
        this.initRigidBody();
        this.registerEvents();
    }

    onDestroy() {
        this.unregisterEvents();
    }

    /**
     * 注册事件监听
     */
    private registerEvents() {
        // 监听击飞结束事件，处理基础移动恢复
        this.node.on(ComponentEvent.KNOCKUP_END, this.onKnockupEndForMovement, this);
        // 监听击退结束事件，处理基础移动恢复
        this.node.on(ComponentEvent.KNOCKBACK_END, this.onKnockbackEndForMovement, this);
        // 监听移动到位置事件
        this.node.on(ComponentEvent.MOVE_TO_POSITION, this.onMoveToPosition, this);
        // 监听停止移动事件
        this.node.on(ComponentEvent.STOP_MOVING, this.onStopMoving, this);
        // 监听更新朝向事件
        this.node.on(ComponentEvent.UPDATE_FACE_DIRECTION, this.onUpdateFaceDirection, this);
        // 监听角色移动事件
        this.node.on(ComponentEvent.CHARACTER_MOVE, this.onCharacterMove, this);
        // 监听角色世界坐标移动事件（AI使用，不做方向变换）
        this.node.on(ComponentEvent.CHARACTER_MOVE_WORLD, this.onCharacterMoveWorld, this);
        // 监听角色停止事件
        this.node.on(ComponentEvent.CHARACTER_STOP, this.onCharacterStop, this);
        // 监听角色击退事件
        this.node.on(ComponentEvent.CHARACTER_KNOCKBACK, this.onCharacterKnockback, this);
        // 监听角色击飞事件
        this.node.on(ComponentEvent.CHARACTER_KNOCKUP, this.onCharacterKnockup, this);
        // 监听角色电击震动事件
        this.node.on(ComponentEvent.CHARACTER_ELECTRIC_SHOCK, this.onCharacterElectricShock, this);
    }

    /**
     * 注销事件监听
     */
    private unregisterEvents() {
        this.node.off(ComponentEvent.KNOCKUP_END, this.onKnockupEndForMovement, this);
        this.node.off(ComponentEvent.KNOCKBACK_END, this.onKnockbackEndForMovement, this);
        this.node.off(ComponentEvent.MOVE_TO_POSITION, this.onMoveToPosition, this);
        this.node.off(ComponentEvent.STOP_MOVING, this.onStopMoving, this);
        this.node.off(ComponentEvent.UPDATE_FACE_DIRECTION, this.onUpdateFaceDirection, this);
        this.node.off(ComponentEvent.CHARACTER_MOVE, this.onCharacterMove, this);
        this.node.off(ComponentEvent.CHARACTER_MOVE_WORLD, this.onCharacterMoveWorld, this);
        this.node.off(ComponentEvent.CHARACTER_STOP, this.onCharacterStop, this);
        this.node.off(ComponentEvent.CHARACTER_KNOCKBACK, this.onCharacterKnockback, this);
        this.node.off(ComponentEvent.CHARACTER_KNOCKUP, this.onCharacterKnockup, this);
        this.node.off(ComponentEvent.CHARACTER_ELECTRIC_SHOCK, this.onCharacterElectricShock, this);
    }

    /**
     * 处理移动到位置事件
     */
    private onMoveToPosition(targetPos: Vec3) {
        this.moveToWorldPosition(targetPos);
    }

    /**
     * 处理停止移动事件
     */
    private onStopMoving() {
        this.stopMovingToTarget();
    }

    /**
     * 处理更新朝向事件
     */
    private onUpdateFaceDirection(directionX: number) {
        this.changeFaceDirection(directionX);
    }

    /**
     * 处理角色移动事件
     */
    private onCharacterMove(direction: Vec3) {
        this.move(direction);
    }

    /**
     * 处理角色世界坐标移动事件（AI使用，不做方向变换）
     */
    private onCharacterMoveWorld(direction: Vec3) {
        this.moveWorld(direction);
    }

    /**
     * 处理角色停止事件
     */
    private onCharacterStop() {
        this.stopMovingToTarget();
        this.move(Vec3.ZERO);
    }

    /**
     * 处理角色击退事件
     */
    private onCharacterKnockback(data: { pos: Vec3, force: number }) {
        this.knockback(data.pos, data.force);
    }

    /**
     * 处理角色击飞事件
     */
    private onCharacterKnockup(force: number) {
        this.knockup(force);
    }

    /**
     * 处理角色电击震动事件
     */
    private onCharacterElectricShock(data: { intensity: number, duration: number, frequency?: number }) {
        this.applyElectricShock(data.intensity, data.duration, data.frequency);
    }

    /**
     * 获取刚体组件
     */
    public getRigidBody(): RigidBody|null {
        return this.rigidBody;
    }

    /**
     * 初始化刚体组件
     */
    protected initRigidBody() {
        this.rigidBody = this.getComponent(RigidBody);
        this.rigidBody.type = ERigidBodyType.DYNAMIC;
    }

    update(dt: number) {
        // 游戏暂停时不更新
        // if (manager.game.isGamePause) return;

        // 死亡后只处理击退和击飞效果
        if(this._character && this._character.healthComponent.isDead){
            // 死亡状态下仍然执行击退和击飞
            this.updateKnockbackEffect(dt);
            this.updateKnockupEffect(dt);
            this.updateElectricShockEffect(dt);
            this.updatePosition(dt);
            
            // 更新地面高度
            this.updateGroundHeight();
            return;
        }

        this.updateTargetMovement(dt);
        this.updateSlowEffect(dt);
        this.updateKnockbackEffect(dt);
        this.updateKnockupEffect(dt);
        this.updateElectricShockEffect(dt);
        this.updatePosition(dt);
        
        // 更新地面高度
        this.updateGroundHeight();
    }

    /**
     * 更新击飞效果
     * @param dt 帧间隔时间
     */
    protected updateKnockupEffect(dt: number) {
        if (!this.isKnockedUp) return;
        
        // 更新击飞计时器
        this.knockupTimer += dt;
        
        // 检查是否超过最大持续时间，强制结束击飞
        if (this.knockupTimer >= this.knockupMaxDuration) {
            this.forceEndKnockup();
            return;
        }
        
        // 更新Y轴速度（受重力影响）
        this.currentYVelocity -= this.gravity * dt;
        
        // 获取当前位置
        const currentPos = this.node.getWorldPosition();
        
        // 更新Y轴位置
        currentPos.y += this.currentYVelocity * dt;
        
        // 更新水平位置（如果有水平击飞方向）
        if (!Vec3.equals(this.knockupHorizontalVelocity, Vec3.ZERO)) {
            const oldSpeed = Vec3.len(this.knockupHorizontalVelocity);
            
            // 应用水平移动
            currentPos.x += this.knockupHorizontalVelocity.x * dt;
            currentPos.z += this.knockupHorizontalVelocity.z * dt;
            
            // 应用空气阻力，基于时间的线性衰减
            const dragForce = this.knockupHorizontalDrag * dt;
            const currentSpeed = Vec3.len(this.knockupHorizontalVelocity);
            
            if (currentSpeed > 0) {
                const newSpeed = Math.max(0, currentSpeed - dragForce);
                const speedRatio = newSpeed / currentSpeed;
                Vec3.multiplyScalar(this.knockupHorizontalVelocity, this.knockupHorizontalVelocity, speedRatio);
            }
            
            // 当水平速度很小时，停止水平移动
            if (Vec3.len(this.knockupHorizontalVelocity) < 0.1) {
           //console.log('击飞水平移动结束，速度太小');
                this.knockupHorizontalVelocity.set(0, 0, 0);
            }
            
            // 调试信息（每0.1秒输出一次）
            if (Math.floor(this.knockupTimer * 10) !== Math.floor((this.knockupTimer - dt) * 10)) {
                // console.log(`击飞更新 - 时间:${this.knockupTimer.toFixed(2)}s, 位置变化:(${(this.knockupHorizontalVelocity.x * dt).toFixed(2)}, ${(this.knockupHorizontalVelocity.z * dt).toFixed(2)}), 速度:${Vec3.len(this.knockupHorizontalVelocity).toFixed(2)}`);
            }
        }
        
        // 检查是否落地
        if (currentPos.y <= this.knockupGroundHeight + this.groundHeightOffset) {
            // 落地
            currentPos.y = this.knockupGroundHeight + this.groundHeightOffset;
            this.endKnockup();
        }
        
        // 更新位置
        this.node.setWorldPosition(currentPos);
        
        // 更新影子位置，保持在地面高度（使用已计算的地面高度）
        this.updateShadowPosition(this.knockupGroundHeight);
    }

    /**
     * 更新击退效果
     * @param dt 帧间隔时间
     */
    protected updateKnockbackEffect(dt: number) {
        if (!this.isKnockingBack) return;
        
        this.knockbackTimer += dt;
        if (this.knockbackTimer >= this.knockbackDuration) {
            // 击退结束
            this.isKnockingBack = false;
            
            // 如果有刚体，切换回 DYNAMIC 模式并清零速度
            if (this.rigidBody) {
                this.rigidBody.type = ERigidBodyType.DYNAMIC;
                this.rigidBody.setLinearVelocity(v3(0, 0, 0));
           //console.log("[MovementComponent] 击退结束 - 切换回DYNAMIC");
            }
            
            // 发送击退结束事件
            this.node.emit(ComponentEvent.KNOCKBACK_END);
        } else if (!this.rigidBody) {
            // 无刚体时需要每帧更新方向（非物理模拟）
            const progress = this.knockbackTimer / this.knockbackDuration;
            const currentForce = this.knockbackForce * (1 - progress) * (1 - progress);
            Vec3.multiplyScalar(this.direction, this.knockbackDirection, currentForce);
        }
    }

    /**
     * 根据当前方向和速度更新位置
     * @param dt 帧间隔时间
     */
    protected updatePosition(dt: number) {
        // 击飞时不进行水平移动
        if (this.isKnockedUp) return;
        
        // 限制最大 dt，防止低帧率时单帧移动过大（防止穿墙和掉地）
        // 最大允许 3 倍正常帧时间 (60fps = 0.0166s, max = 0.05s = 20fps)
        const maxDt = 0.05;
        dt = Math.min(dt, maxDt);
        
        const isMoving = !Vec3.equals(this.direction, Vec3.ZERO);
        
        // 如果有刚体，使用线速度
        if (this.rigidBody) {
            // 击退状态下使用 KINEMATIC 平滑移动 + 射线检测地面
            if (this.isKnockingBack && this.knockbackInitialVelocity) {
                // 使用指数阻尼模拟真实物理效果（符合摩擦力和空气阻力）
                // damping 系数：值越大减速越快（推荐范围 3-8）
                const dampingCoefficient = 5.0;
                
                // 指数衰减公式: v(t) = v0 * e^(-damping * t)
                // 这比二次衰减更符合真实物理
                const decayFactor = Math.exp(-dampingCoefficient * this.knockbackTimer);
                
                // 计算当前击退速度
                Vec3.multiplyScalar(
                    this.knockbackCurrentVelocity,
                    this.knockbackInitialVelocity,
                    decayFactor
                );
                
                // 获取当前位置
                const currentPos = this.node.getWorldPosition();
                
                // 计算本帧移动的位移（XZ方向）
                const displacement = new Vec3(
                    this.knockbackCurrentVelocity.x * dt,
                    0,
                    this.knockbackCurrentVelocity.z * dt
                );
                
                // XZ平面检测墙壁（HOME(4) 和 HOME2(9)）- 使用角色碰撞体半径
                let finalDisplacement = displacement.clone();
                const displacementLength = displacement.length();
                
                if (displacementLength > 0.001) {
                    const rayDirection = new Vec3(displacement.x, 0, displacement.z);
                    Vec3.normalize(rayDirection, rayDirection);
                    
                    // 获取角色的碰撞体半径（假设为0.5，可以从Collider组件获取）
                    const characterRadius = 0.5;
                    const safetyMargin = 0.3; // 额外安全距离
                    
                    // 从角色边缘向前发射射线（不是中心）
                    const rayOrigin = new Vec3(
                        currentPos.x + rayDirection.x * characterRadius,
                        currentPos.y + 0.5,
                        currentPos.z + rayDirection.z * characterRadius
                    );
                    
                    // 创建射线
                    const ray = new geometry.Ray();
                    ray.o.set(rayOrigin.x, rayOrigin.y, rayOrigin.z);
                    ray.d.set(rayDirection.x, 0, rayDirection.z); // 确保Y方向为0，只检测XZ平面
                    
                    // 检测HOME(4)和HOME2(9)
                    const mask = (1 << 4) | (1 << 9);
                    const checkDistance = displacementLength + safetyMargin;
                    const hasHit = PhysicsSystem.instance.raycast(ray, mask, checkDistance);
                    
                    if (hasHit) {
                        const raycastResults = PhysicsSystem.instance.raycastResults;
                        if (raycastResults.length > 0) {
                            const hitPoint = raycastResults[0].hitPoint;
                            // 计算从当前位置到碰撞点的距离（XZ平面）
                            const hitPointXZ = new Vec3(hitPoint.x, currentPos.y, hitPoint.z);
                            const currentPosXZ = new Vec3(currentPos.x, currentPos.y, currentPos.z);
                            const hitDistance = Vec3.distance(currentPosXZ, hitPointXZ);
                            
                            // 如果距离墙壁太近（小于角色半径+安全距离），停止移动
                            const minDistance = characterRadius + safetyMargin;
                            if (hitDistance <= minDistance) {
                                // 已经太近了，停止移动
                                Vec3.set(finalDisplacement, 0, 0, 0);
                                // console.log("[击退] 太靠近墙壁，停止移动 dist:", hitDistance.toFixed(2));
                            } else if (hitDistance < displacementLength + minDistance) {
                                // 会撞到墙，缩短位移
                                const allowedDistance = Math.max(0, hitDistance - minDistance);
                                const ratio = allowedDistance / displacementLength;
                                Vec3.multiplyScalar(finalDisplacement, displacement, ratio);
                                // console.log("[击退] 即将撞墙，缩短位移 dist:", hitDistance.toFixed(2), "ratio:", ratio.toFixed(2));
                            }
                        }
                    }
                }
                
                // 计算新位置（只更新XZ，保持当前Y高度）
                const newPos = new Vec3(
                    currentPos.x + finalDisplacement.x,
                    currentPos.y, // 保持当前高度，不检测Y
                    currentPos.z + finalDisplacement.z
                );
                
                // 设置新位置（KINEMATIC 模式下直接设置位置）
                this.node.setWorldPosition(newPos);
                
                return;
            }
            
            if (!isMoving) {
                // 停止移动时，将水平速度设为0
                this.rigidBody.getLinearVelocity(this.tempVec3);
                this.rigidBody.setLinearVelocity(v3(0, this.tempVec3.y, 0));
                return;
            }
            
            // 计算速度系数
            let speedMultiplier = 1.0;
            let speedMultiplierDt = dt / (1 / 60);
            
            // 计算目标速度（只在水平方向）
            const targetSpeed = this.moveSpeed * speedMultiplier * speedMultiplierDt;
            const velocityX = this.direction.x * targetSpeed;
            const velocityZ = this.direction.z * targetSpeed;
            
            // 获取当前Y轴速度，保持不变
            this.rigidBody.getLinearVelocity(this.tempVec3);
            
            // 设置线速度（保持Y轴速度不变）
            this.rigidBody.setLinearVelocity(v3(velocityX, this.tempVec3.y, velocityZ));
        } else {
            // 没有刚体时使用原来的位置更新方式
            if (!isMoving) return;
            
            // 计算速度系数
            let speedMultiplier = 1.0;
            
            // 在击退状态下使用独立的速度计算（非刚体的击退需要每帧更新）
            if (this.isKnockingBack) {
                // 使用二次方曲线实现减速
                const knockbackProgress = this.knockbackTimer / this.knockbackDuration;
                speedMultiplier = this.knockbackForce * (1 - knockbackProgress) * (1 - knockbackProgress);
            }
            
            // 计算位移量 - 不改变Y轴方向，让物理系统控制
            const displacement = new Vec3(
                this.direction.x * this.moveSpeed * dt * speedMultiplier,
                0, // Y轴位移设为0，让物理系统控制
                this.direction.z * this.moveSpeed * dt * speedMultiplier
            );
            
            // 获取当前位置
            this.node.getPosition(this.currentPos);
            
            // 保存原来的Y值
            const originalY = this.currentPos.y;
            
            // 更新位置
            Vec3.add(this.currentPos, this.currentPos, displacement);
            
            // 恢复Y值，让物理系统控制Y轴
            this.currentPos.y = originalY;
            
            this.node.setPosition(this.currentPos);
        }
    }

    /**
     * 更新减速效果
     * @param dt 帧间隔时间
     */
    protected updateSlowEffect(dt: number) {
        if (!this.isSlowing) return;
        
        this.slowTimer += dt;
        if (this.slowTimer >= this.slowDuration) {
            // 减速时间结束，恢复原速
            this.isSlowing = false;
            this.moveSpeed = this.originalSpeed;
            
            // 通过事件取消减速颜色效果
            this.node.emit(ComponentEvent.CANCEL_COLOR_EFFECT, ColorEffectType.SLOW);
            
            // 发送减速结束事件
            this.node.emit(ComponentEvent.SLOW_END);
        }
    }

    /**
     * 更新电击震动效果
     * @param dt 帧间隔时间
     */
    protected updateElectricShockEffect(dt: number) {
        if (!this.isElectricShock) return;
        
        this.electricShockTimer += dt;
        this.electricShockInternalTimer += dt;
        
        // 检查是否超过持续时间
        if (this.electricShockTimer >= this.electricShockDuration) {
            this.endElectricShock();
            return;
        }
        
        // 根据频率计算震动间隔
        const shakeInterval = 1 / this.electricShockFrequency;
        
        if (this.electricShockInternalTimer >= shakeInterval) {
            this.electricShockInternalTimer = 0;
            
            // 生成随机的震动偏移
            const randomX = (Math.random() - 0.5) * 2 * this.electricShockIntensity;
            const randomY = (Math.random() - 0.5) * 2 * this.electricShockIntensity;
            const randomZ = (Math.random() - 0.5) * 2 * this.electricShockIntensity;
            
            // 计算新位置
            const newPos = new Vec3(
                this.electricShockOriginPos.x + randomX,
                this.electricShockOriginPos.y + randomY,
                this.electricShockOriginPos.z + randomZ
            );
            
            // 应用震动位置
            this.node.setWorldPosition(newPos);
        }
    }

    /**
     * 应用减速效果
     * @param ratio 减速比例 (0-1之间，表示减少的速度百分比)
     * @param duration 减速持续时间(秒)
     */
    public applySlowEffect(ratio: number, duration: number) {
        if (ratio <= 0 || duration <= 0) return;
        
        // 限制减速比例在0-1之间
        ratio = Math.max(0, Math.min(1, ratio));
        
        // 如果当前已经处于减速状态
        if (this.isSlowing) {
            // 如果新减速比例更大，更新减速比例
            if (ratio > this.slowRatio) {
                this.slowRatio = ratio;
                this.moveSpeed = this.originalSpeed * (1 - this.slowRatio);
            }
            // 不论减速比例如何，都重置持续时间（刷新时间）
            this.slowDuration = duration;
            this.slowTimer = 0;
            
            // 通过事件应用减速颜色效果
            this.node.emit(ComponentEvent.APPLY_COLOR_EFFECT, {
                type: ColorEffectType.SLOW,
                duration: this.slowDuration
            });
            
            // 发送减速更新事件
            this.node.emit(ComponentEvent.SLOW_UPDATED, this.slowRatio, this.slowDuration);
            return;
        }
        
        // 首次应用减速效果，保存原始速度
        if (!this.isSlowing) {
            this.originalSpeed = this.moveSpeed;
        }
        
        this.isSlowing = true;
        this.slowRatio = ratio;
        this.slowDuration = duration;
        this.slowTimer = 0;
        
        // 计算减速后的速度
        this.moveSpeed = this.originalSpeed * (1 - this.slowRatio);
        
        // 通过事件应用减速颜色效果
        this.node.emit(ComponentEvent.APPLY_COLOR_EFFECT, {
            type: ColorEffectType.SLOW,
            duration: this.slowDuration
        });
        
        // 发送减速开始事件
        this.node.emit(ComponentEvent.SLOW_START, this.slowRatio, this.slowDuration);
    }

    /**
     * 取消减速效果
     */
    public cancelSlowEffect() {
        if (!this.isSlowing) return;
        
        this.isSlowing = false;
        this.moveSpeed = this.originalSpeed;
        
        // 通过事件取消减速颜色效果
        this.node.emit(ComponentEvent.CANCEL_COLOR_EFFECT, ColorEffectType.SLOW);
        
        // 发送减速结束事件
        this.node.emit(ComponentEvent.SLOW_END);
    }

    /**
     * 应用电击震动效果
     * @param intensity 震动强度（位置偏移范围）
     * @param duration 持续时间（秒）
     * @param frequency 震动频率（每秒震动次数），默认为20Hz
     */
    public applyElectricShock(intensity: number, duration: number, frequency: number = 20) {
        if (intensity <= 0 || duration <= 0) return;
        
        // 保存原始位置
        this.electricShockOriginPos.set(this.node.getWorldPosition());
        
        // 设置电击震动参数
        this.isElectricShock = true;
        this.electricShockIntensity = intensity;
        this.electricShockDuration = duration;
        this.electricShockFrequency = frequency;
        this.electricShockTimer = 0;
        this.electricShockInternalTimer = 0;
        
        // 通过事件应用电击颜色效果
        this.node.emit(ComponentEvent.APPLY_COLOR_EFFECT, {
            type: ColorEffectType.ELECTRIC_SHOCK,
            duration: this.electricShockDuration
        });
        
        // 发送电击震动开始事件
        this.node.emit(ComponentEvent.ELECTRIC_SHOCK_START, {
            intensity: this.electricShockIntensity,
            duration: this.electricShockDuration,
            frequency: this.electricShockFrequency
        });
    }

    /**
     * 结束电击震动效果
     */
    protected endElectricShock() {
        if (!this.isElectricShock) return;
        
        this.isElectricShock = false;
        
        // 恢复到原始位置
        this.node.setWorldPosition(this.electricShockOriginPos);
        
        // 通过事件取消电击颜色效果
        this.node.emit(ComponentEvent.CANCEL_COLOR_EFFECT, ColorEffectType.ELECTRIC_SHOCK);
        
        // 发送电击震动结束事件
        this.node.emit(ComponentEvent.ELECTRIC_SHOCK_END);
    }

    /**
     * 取消电击震动效果
     */
    public cancelElectricShock() {
        this.endElectricShock();
    }

    /**
     * 获取是否处于电击震动状态
     */
    public get isInElectricShockState(): boolean {
        return this.isElectricShock;
    }

    /**
     * 更新目标点移动逻辑
     */
    protected updateTargetMovement(dt: number) {
        if (!this.isMovingToTarget || !this.targetWorldPosition) return;
        
        // 检查是否到达目标点
        Vec3.subtract(this.tempVec3, this.targetWorldPosition, this.node.getWorldPosition());
        const distance = Vec3.len(this.tempVec3);
        
        if (distance <= this.arriveDistance) {
            this.onTargetArrived();
            return;
        }
        
        // 如果未到达，更新方向继续移动
        Vec3.normalize(this.tempVec3, this.tempVec3);
        this.moveWorld(this.tempVec3);
    }

    /**
     * 目标点到达后的回调方法
     */
    protected onTargetArrived() {
        this.isMovingToTarget = false;
        this.targetWorldPosition = null;
        this.moveWorld(Vec3.ZERO); // 停止移动
        
        // 发送目标到达事件
        this.node.emit(ComponentEvent.TARGET_REACHED);
        
        // 执行回调函数
        if (this.onTargetReachedCallback) {
            this.onTargetReachedCallback();
            this.onTargetReachedCallback = null;
        }
    }

    public setRigidBodyEnabled(enabled: boolean) {
        if (this.rigidBody) {
            this.rigidBody.enabled = enabled;
        }

        this.node.getComponents(Collider).forEach(collider => {
            collider.enabled = enabled;
        });
    }

    /**
     * 将输入方向根据摄像机Y轴旋转进行变换
     * @param direction 原始输入方向
     * @returns 变换后的世界方向
     */
    private transformDirectionByCamera(direction: Vec3): Vec3 {
        if (Vec3.equals(direction, Vec3.ZERO)) {
            return direction;
        }
        
        // 绕Y轴顺时针旋转45度（+45度）来匹配摄像机视角（摄像机Y轴为-45°）
        // newX = x * cos(θ) - z * sin(θ)
        // newZ = x * sin(θ) + z * cos(θ)
        const cos45 = Math.SQRT1_2; // √2/2 ≈ 0.7071
        const sin45 = Math.SQRT1_2;
        
        const newX = direction.x * cos45 - direction.z * sin45;
        const newZ = direction.x * sin45 + direction.z * cos45;
        
        return new Vec3(newX, direction.y, newZ);
    }

    /**
     * 移动角色（用于玩家输入，会根据摄像机角度变换方向）
     * @param direction 移动方向（输入方向，会根据摄像机角度变换）
     */
    public move(direction: Vec3) {
        // 将输入方向根据摄像机Y轴旋转进行变换
        const worldDirection = this.transformDirectionByCamera(direction);
        this.moveWorld(worldDirection);
    }

    /**
     * 使用世界坐标方向移动角色（用于AI，不做方向变换）
     * @param direction 世界坐标系下的移动方向
     */
    public moveWorld(direction: Vec3) {
        Vec3.copy(this.direction, direction);
        
        const isMoving = !Vec3.equals(direction, Vec3.ZERO);
        // 移动状态发生改变时发送事件
        this.node.emit(ComponentEvent.MOVE_STATE_UPDATE, isMoving);
        
        // 更新朝向
        if (!this.isKeepFace && isMoving) {
            this.node.emit(ComponentEvent.SET_FACE_DIRECTION_FROM_3D, direction);
        }
    }

    /**
     * 更改角色朝向
     */
    public changeFaceDirection(directionX: number) {
        // this.updateFaceDirection(directionX);
        this.node.emit(ComponentEvent.SET_FACE_DIRECTION, directionX);
    }

    /**
     * 移动到指定世界坐标位置
     * @param targetPos 目标世界坐标
     * @param callback 到达目标点后的回调函数
     */
    public moveToWorldPosition(targetPos: Vec3, callback?: Function) {
        this.targetWorldPosition = targetPos.clone();
        this.isMovingToTarget = true;
        
        // 设置回调函数
        this.onTargetReachedCallback = callback || null;
        
        // 计算初始方向并开始移动
        Vec3.subtract(this.tempVec3, this.targetWorldPosition, this.node.getWorldPosition());
        Vec3.normalize(this.tempVec3, this.tempVec3);
        this.moveWorld(this.tempVec3);
        
    }

    /**
     * 停止移动到目标点
     */
    public stopMovingToTarget() {
        this.isMovingToTarget = false;
        this.targetWorldPosition = null;
        this.onTargetReachedCallback = null;
        this.moveWorld(Vec3.ZERO);
    }

    /**
     * 重置组件状态
     */
    public reset() {
        this.isMovingToTarget = false;
        this.wasMovingToTarget = false;
        this.targetWorldPosition = null;
        this.preKnockbackTargetPosition = null;
        this.onTargetReachedCallback = null;
        this.direction.set(Vec3.ZERO);
        this.preKnockbackDirection.set(Vec3.ZERO);
        
        // 重置减速状态
        if (this.isSlowing) {
            this.isSlowing = false;
            this.moveSpeed = this.originalSpeed;
            
            // 通过事件取消减速颜色效果
            this.node.emit(ComponentEvent.CANCEL_COLOR_EFFECT, ColorEffectType.SLOW);
        }
        this.slowTimer = 0;
        
        // 重置击退状态
        this.isKnockingBack = false;
        this.knockbackTimer = 0;
        
        // 重置击飞状态
        this.isKnockedUp = false;
        this.currentYVelocity = 0;
        this.knockupTimer = 0;
        this.wasMovingToTargetBeforeKnockup = false;
        this.preKnockupTargetPosition = null;
        this.preKnockupDirection.set(Vec3.ZERO);
        this.knockupDirection.set(Vec3.ZERO);
        this.knockupHorizontalVelocity.set(Vec3.ZERO);
        
        // 重置电击震动状态
        if (this.isElectricShock) {
            this.isElectricShock = false;
            // 恢复到原始位置
            this.node.setWorldPosition(this.electricShockOriginPos);
            // 通过事件取消电击颜色效果
            this.node.emit(ComponentEvent.CANCEL_COLOR_EFFECT, ColorEffectType.ELECTRIC_SHOCK);
        }
        this.electricShockTimer = 0;
        this.electricShockInternalTimer = 0;

        this.setRigidBodyEnabled(true);
    }

    /**
     * 获取当前移动方向
     */
    public getDirection(): Vec3 {
        return this.direction;
    }

    /**
     * 是否正在移动
     */
    public get isMoving(): boolean {
        return !Vec3.equals(this.direction, Vec3.ZERO);
    }

    /**
     * 获取当前移动速度
     */
    public get speed(): number {
        return this.moveSpeed;
    }

    /**
     * 设置移动速度
     */
    public set speed(value: number) {
        if (this.isSlowing) {
            // 如果处于减速状态，保存为原始速度
            this.originalSpeed = value;
            // 应用减速比例
            this.moveSpeed = value * (1 - this.slowRatio);
        } else {
            this.moveSpeed = value;
        }
    }

    /** 
     * 击退
     * @param pos 击退位置
     * @param force 击退力
     */
    public knockback(pos: Vec3, force: number) {
        if (force <= 0) return;
        
        // 如果第一次击退，保存当前移动到目标的状态
        if (!this.isKnockingBack) {
            // 保存当前是否在向目标移动
            this.wasMovingToTarget = this.isMovingToTarget;
            
            // 保存目标位置
            if (this.isMovingToTarget && this.targetWorldPosition) {
                this.preKnockbackTargetPosition = this.targetWorldPosition.clone();
            }
            
            // 保存当前移动方向，以便击退结束后恢复
            Vec3.copy(this.preKnockbackDirection, this.direction);
        }
        
        // 计算击退方向（从击退源点指向角色的方向）
        const currentPos = this.node.getWorldPosition();
        Vec3.subtract(this.knockbackDirection, currentPos, pos);
        
        // 只考虑水平方向的击退（y设为0）
        this.knockbackDirection.y = 0;
        
        // 如果方向是零向量，设置一个默认方向
        if (Vec3.equals(this.knockbackDirection, Vec3.ZERO)) {
            this.knockbackDirection.set(0, 0, 1);
        }
        
        // 标准化方向向量
        Vec3.normalize(this.knockbackDirection, this.knockbackDirection);
        
        // 先设置击退状态（在清除移动前）
        this.isKnockingBack = true;
        this.knockbackTimer = 0;
        
        // 暂停向目标点移动
        this.isMovingToTarget = false;
        
        
        // 检查是否死亡，决定击退速度
        const isDead = this._character && this._character.healthComponent.isDead;
        // 保存击退力度（用于计算初始速度）
        this.knockbackForce = force;
        
        // 计算初始击退速度（降低速度，避免瞬移）
        const initialSpeed = isDead ? force * 4 : force * 3; // 大幅降低速度
        
        if (this.rigidBody) {
            // 计算初始击退速度
            const initialVelocity = new Vec3();
            Vec3.multiplyScalar(initialVelocity, this.knockbackDirection, initialSpeed);
            
            // 保存初始速度，用于后续平滑移动
            this.knockbackInitialVelocity = initialVelocity.clone();
            this.knockbackCurrentVelocity = initialVelocity.clone();
            
            // 切换到 KINEMATIC 模式，手动控制位置（保持碰撞检测）
            this.rigidBody.type = ERigidBodyType.KINEMATIC;
            
       //console.log("[MovementComponent] 击退开始 - 切换到KINEMATIC, initialSpeed:", initialSpeed);
        } else {
            // 无刚体时使用旧逻辑（非刚体角色）
            Vec3.multiplyScalar(this.direction, this.knockbackDirection, this.knockbackForce);
        }
        
        // 发送击退开始事件
        this.node.emit(ComponentEvent.KNOCKBACK_START);
        
        // 如果没死，设置定时器在x秒后重新给予控制（可选：再给一次小冲量）
        if (!isDead && this.rigidBody) {
            this.knockbackDuration = 0.5; // 0.5秒后恢复控制
        } else {
            this.knockbackDuration = 1.5; // 死亡时击退持续时间更长
        }
    }

    /**
     * 获取是否处于击退状态
     */
    public get isInKnockbackState(): boolean {
        return this.isKnockingBack;
    }

    /**
     * 击飞
     * @param force 击飞力度
     * @param direction 击飞方向（可选，如果不提供则为纯垂直击飞）
     */
    public knockup(force: number, direction?: Vec3) {
        if (force <= 0) return;
        
        // 保存击飞前的状态
        if (!this.isKnockedUp) {
            // 保存当前移动方向
            Vec3.copy(this.preKnockupDirection, this.direction);
            
            // 保存是否正在向目标移动
            this.wasMovingToTargetBeforeKnockup = this.isMovingToTarget;
            
            // 保存目标位置
            if (this.isMovingToTarget && this.targetWorldPosition) {
                this.preKnockupTargetPosition = this.targetWorldPosition.clone();
            }
        }
        
        // 暂停所有移动
        this.isMovingToTarget = false;
        this.isKnockingBack = false;
        this.move(Vec3.ZERO);
        
        // 获取当前位置信息
        const currentPos = this.node.getWorldPosition();
        this.knockupStartHeight = currentPos.y;
        this.knockupGroundHeight = manager.game.calculateGroundHeight(currentPos);
        
        // 处理击飞方向
        if (direction && !Vec3.equals(direction, Vec3.ZERO)) {
            // 有指定方向的击飞
            Vec3.copy(this.knockupDirection, direction);
            Vec3.normalize(this.knockupDirection, this.knockupDirection);
            
            // 设置水平速度，只保留水平分量
            this.knockupHorizontalVelocity.set(
                this.knockupDirection.x * force * 2,
                0,
                this.knockupDirection.z * force * 2
            );
            
            // console.log(`击飞开始 - 力度:${force}, 方向:`, this.knockupDirection, '水平速度:', this.knockupHorizontalVelocity);
        } else {
            // 纯垂直击飞
            this.knockupDirection.set(0, 0, 0);
            this.knockupHorizontalVelocity.set(0, 0, 0);
            // console.log(`纯垂直击飞 - 力度:${force}`);
        }
        
        // 设置击飞状态
        this.isKnockedUp = true;
        this.knockupVelocity = force;
        // 增加初始速度系数，让起飞更快
        this.currentYVelocity = force * 5;
        this.knockupTimer = 0;
        
        // 发送击飞开始事件
        this.node.emit(ComponentEvent.KNOCKUP_START);
    }

    public cherkArrive(wpos: Vec3){
        const distance = Vec3.distance(this.node.getWorldPosition(), wpos);
        if (distance <= this.arriveDistance) {
            return true;
        }
        return false;
    }

    /**
     * 结束击飞状态
     */
    protected endKnockup() {
        this.isKnockedUp = false;
        this.currentYVelocity = 0;
        this.knockupTimer = 0;
        
        // 不再直接恢复移动状态，而是发送事件让其他组件处理
        // 这样可以避免组件间耦合，让路径跟随组件等自己决定如何恢复移动
        
        // 发送击飞结束事件
        this.node.emit(ComponentEvent.KNOCKUP_END);
        
        // 确保影子位置正确
        this.updateShadowPosition();
    }

    /**
     * 强制结束击飞状态（当击飞时间过长时）
     */
    protected forceEndKnockup() {
        // 强制设置到地面高度
        const currentPos = this.node.getWorldPosition();
        currentPos.y = this.knockupGroundHeight + this.groundHeightOffset;
        this.node.setWorldPosition(currentPos);
        
        // 调用正常的结束流程
        this.endKnockup();
    }

    /**
     * 获取是否处于击飞状态
     */
    public get isInKnockupState(): boolean {
        return this.isKnockedUp;
    }

    /**
     * 检查是否需要使用射线检测
     */
    private needRaycastForHeight(): boolean {
        return !this.rigidBody;
    }
    
    /**
     * 更新影子位置，保持在地面高度
     * @param groundHeight 可选的地面高度，如果不提供则自动计算
     */
    private updateShadowPosition(groundHeight?: number) {
        if (!this.shadow) return;
        
        // 如果没有提供地面高度，则计算
        if (groundHeight === undefined) {
            const characterPos = this.node.getWorldPosition();
            groundHeight = manager.game.calculateGroundHeight(characterPos);
        }
        
        // 设置影子位置，保持X和Z不变，Y保持在地面
        const shadowPos = this.shadow.getWorldPosition();
        this.shadow.setWorldPosition(shadowPos.x, groundHeight+0.05, shadowPos.z);
    }

    /**
     * 更新角色高度
     */
    private updateGroundHeight() {
        // 击飞时不更新地面高度，由击飞逻辑控制
        // 击退时在 updatePosition 中已经处理了地面检测，这里也跳过
        if (this.isKnockedUp || this.isKnockingBack) return;
        
        if (this.needRaycastForHeight()) {
            const currentPos = this.node.getWorldPosition();
            const groundHeight = manager.game.calculateGroundHeight(currentPos);
            
            // 【修复低帧率掉地】确保角色不会掉到地面以下
            // 如果当前位置低于地面，隐藏血条
            const targetHeight = groundHeight + this.groundHeightOffset;
            if (currentPos.y < targetHeight - 0.1) {
                
                this._character.healthComponent.healthBar.hide();
            } else {
                // 正常更新高度
                currentPos.y = targetHeight;
            }
            
            this.node.setWorldPosition(currentPos);
            
            // 更新影子位置，传递已计算的地面高度
            this.updateShadowPosition(groundHeight);
        } else {
            // 如果不需要射线检测，单独更新影子位置
            this.updateShadowPosition();
        }
    }

    /**
     * 处理击飞结束后的基础移动恢复
     * 这个方法处理非路径跟随的简单移动场景
     */
    private onKnockupEndForMovement() {
        // 只在没有其他组件处理的情况下恢复基础移动状态
        // 如果有路径跟随组件，它会自己处理移动恢复
        
        // 延迟一帧执行，让其他组件先处理
        this.scheduleOnce(() => {
            // 检查是否仍然没有移动方向（说明没有其他组件处理）
            if (Vec3.equals(this.direction, Vec3.ZERO)) {
                // 恢复击飞前的移动状态
                if (this.wasMovingToTargetBeforeKnockup && this.preKnockupTargetPosition) {
                    this.isMovingToTarget = true;
                    if (!this.targetWorldPosition) {
                        this.targetWorldPosition = this.preKnockupTargetPosition.clone();
                    }
                    
                    // 重新计算移动方向并调用move方法触发状态变化事件
                    Vec3.subtract(this.tempVec3, this.targetWorldPosition, this.node.getWorldPosition());
                    if (!Vec3.equals(this.tempVec3, Vec3.ZERO)) {
                        Vec3.normalize(this.tempVec3, this.tempVec3);
                        this.move(this.tempVec3);
                    } else {
                        this.move(Vec3.ZERO);
                    }
                }
            }else{
                this.move(Vec3.ZERO);
            }
        }, 0);
    }

    /**
     * 处理击退结束后的基础移动恢复
     * 这个方法处理非路径跟随的简单移动场景
     */
    private onKnockbackEndForMovement() {
        // 只在没有其他组件处理的情况下恢复基础移动状态
        // 如果有路径跟随组件，它会自己处理移动恢复
        
        // 延迟一帧执行，让其他组件先处理
        this.scheduleOnce(() => {
            if(this._character.healthComponent.isDead){
                return;
            }
            // 检查是否仍然没有移动方向（说明没有其他组件处理）
            if (Vec3.equals(this.direction, Vec3.ZERO)) {
                // 恢复击退前的移动状态
                if (this.wasMovingToTarget && this.preKnockbackTargetPosition) {
                    this.isMovingToTarget = true;
                    if (!this.targetWorldPosition) {
                        this.targetWorldPosition = this.preKnockbackTargetPosition.clone();
                    }
                    
                    // 重新计算移动方向
                    Vec3.subtract(this.tempVec3, this.targetWorldPosition, this.node.getWorldPosition());
                    if (!Vec3.equals(this.tempVec3, Vec3.ZERO)) {
                        Vec3.normalize(this.tempVec3, this.tempVec3);
                        this.move(this.tempVec3);
                    } else {
                        this.move(Vec3.ZERO);
                    }
                }
            }else{
                this.move(Vec3.ZERO);
            }
        }, 0);
    }
}