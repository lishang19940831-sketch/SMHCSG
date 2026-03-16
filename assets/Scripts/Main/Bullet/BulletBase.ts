import { _decorator, Component, Node, Vec3, RigidBody, Collider, ICollisionEvent, Enum, log, BoxCollider, ITriggerEvent, Color, color, Quat, math, Mat4 } from 'cc';
import { HealthComponent } from '../Components/HealthComponent';
import { PoolObjectBase } from '../../Main/Common/PoolObjectBase';
import { Rotation3DUtils } from '../../Main/Common/Rotation3DUtils';
import { CommonEvent } from '../Common/CommonEnum';

const { ccclass, property } = _decorator;

/**
 * 子弹移动类型枚举
 */
enum BulletMoveType {
    /** 直线移动 */
    LINE = 0,
    /** 抛物线移动 */
    PARABOLA = 1,
}

/**
 * 子弹目标类型枚举
 */
enum BulletTargetType {
    /** 固定方向 */
    FIXED_DIRECTION = 0,
    /** 追踪目标 */
    TRACKING = 1,
}

/**
 * 子弹碰撞类型枚举
 */
enum BulletCollisionType {
    /** 非穿透 */
    NORMAL = 0,
    /** 穿透 */
    PENETRATE = 1,
}

/**
 * 追踪命中判定类型
 */
enum TrackingHitType {
    /** 碰撞判定 */
    COLLISION = 0,
    /** 距离判定 */
    DISTANCE = 1,
}

/**
 * 子弹基类
 * @class BulletBase
 */
@ccclass('BulletBase')
export class BulletBase extends PoolObjectBase {
    /** 子弹速度 */
    @property
    public speed: number = 10;

    /** 子弹伤害 */
    @property
    public damage: number = 10;

    /** 子弹伤害颜色 */
    @property
    public damageColor: Color = color().fromHEX('#ffffff');

    /** 子弹最大射程 */
    @property
    public maxRange: number = 100;

    /** 子弹生命周期 */
    @property
    public lifeTime: number = 5;

    /** 子弹移动类型 */
    @property({ type: Enum(BulletMoveType), displayName: '子弹移动类型', tooltip: '子弹移动类型 : LINE 直线' })
    public moveType: BulletMoveType = BulletMoveType.LINE;

    /** 子弹目标类型 */
    @property({ type: Enum(BulletTargetType), displayName: '子弹目标类型', tooltip: '子弹目标类型 : FIXED_DIRECTION 固定方向, TRACKING 追踪目标' })
    public targetType: BulletTargetType = BulletTargetType.FIXED_DIRECTION;

    /** 目标节点 */
    @property({ type: Node, visible: function(this: BulletBase) { return this.targetType === BulletTargetType.TRACKING }, displayName: '目标节点'})
    public targetNode: Node | null = null;

    /** 命中判定类型 */
    @property({ 
        type: Enum(TrackingHitType), 
        displayName: '命中判定类型',
        tooltip: '命中判定类型 : COLLISION 碰撞判定, DISTANCE 距离判定'
    })
    public hitType: TrackingHitType = TrackingHitType.COLLISION;

    /** 命中距离 */
    @property({ 
        displayName: '命中距离',
        tooltip: '当子弹与目标距离小于此值时判定命中',
        visible: function(this: BulletBase) { 
            return this.hitType === TrackingHitType.DISTANCE 
        }
    })
    public hitDistance: number = 1;

    /** 追踪速度 */
    @property({ visible: function(this: BulletBase) { return this.targetType === BulletTargetType.TRACKING }, displayName: '追踪速度'})
    public trackingSpeed: number = 5;

    /** 子弹碰撞类型 */
    @property({ type: Enum(BulletCollisionType), displayName: '子弹碰撞类型', tooltip: '子弹碰撞类型 : NORMAL 非穿透, PENETRATE 穿透' })
    public collisionType: BulletCollisionType = BulletCollisionType.NORMAL;

    /** 最大穿透次数 */
    @property({ visible: function(this: BulletBase) { return this.collisionType === BulletCollisionType.PENETRATE }, displayName: '最大穿透次数'})
    public maxPenetrateCount: number = 3;

    /** 抛物线高度系数 */
    @property({ visible: function(this: BulletBase) { return this.moveType === BulletMoveType.PARABOLA }, displayName: '抛物线高度系数'})
    public parabolaHeightFactor: number = 0.5;

    /** 抛物线基础高度 */
    @property({ visible: function(this: BulletBase) { return this.moveType === BulletMoveType.PARABOLA }, displayName: '抛物线基础高度'})
    public parabolaBaseHeight: number = 5;

    /** 抛物线最大高度 */
    @property({ visible: function(this: BulletBase) { return this.moveType === BulletMoveType.PARABOLA }, displayName: '抛物线最大高度'})
    public parabolaMaxHeight: number = 20;

    /** 是否旋转节点 */
    @property({ displayName: '是否旋转节点', tooltip: '是否根据移动方向旋转子弹节点' })
    public enableRotation: boolean = true;

    // 私有变量 - 按功能分组
    // 物理组件
    private _rigidBody: RigidBody | null = null;
    private _collider: Collider | null = null;
    
    // 运动状态
    private _direction: Vec3 = new Vec3(0, 0, -1);
    private _velocity: Vec3 = new Vec3(0, 0, 0);
    private _initPosition: Vec3 = new Vec3();
    private _currentRange: number = 0;
    private _age: number = 0;
    private _isFired: boolean = false;
    private _isHited: boolean = false;
    
    // 穿透机制
    private _penetrateCount: number = 0;
    private _hitEnemies: Set<Node> = new Set(); // 使用Set提高查找效率
    
    // 抛物线运动专用
    private _parabolaCurve = {
        start: new Vec3(),
        control: new Vec3(),
        end: new Vec3(),
        target: new Vec3(),
        progress: 0,
        distance: 0,
        initialized: false
    };
    
    // 缓存对象，避免频繁创建
    private readonly _tempVec3 = new Vec3();
    private readonly _tempColor = new Color();

    /**
     * 组件加载完成
     */
    onLoad() {
        this._setupPhysics();
        this._initPosition.set(this.node.position);
        app.event.on(CommonEvent.EnemyDead, this.onEnemyDead, this);
    }
    
    /**
     * 初始化物理组件
     */
    private _setupPhysics() {
        this._rigidBody = this.getComponent(RigidBody);
        this._collider = this.getComponent(BoxCollider);
        
        if (!this._collider) {
            return;
        }
        
        this._collider.on('onCollisionEnter', this._onCollisionEnter, this);
        this._collider.on('onTriggerEnter', this._onCollisionEnter, this);
    }

    protected onDestroy(): void {
        if (this._collider) {
            this._collider.off('onCollisionEnter', this._onCollisionEnter, this);
            this._collider.off('onTriggerEnter', this._onCollisionEnter, this);
        }
    }

    private onEnemyDead(node: Node) {
        if (this.targetNode === node) {
            this.targetType = BulletTargetType.FIXED_DIRECTION;
            this.targetNode = null;
        }
    }

    /**
     * 设置子弹方向
     * @param dir 方向向量
     */
    public setDirection(dir: Vec3) {
        this._direction.set(dir).normalize();
        this._updateRotation();
    }

    /**
     * 设置追踪目标
     * @param target 目标节点
     */
    public setTarget(target: Node) {
        this.targetNode = target;
    }

    /**
     * 设置子弹伤害颜色
     * @param color 颜色
     */
    public setDamageColor(color: Color) {
        this.damageColor = color;
    }

    /**
     * 发射子弹
     * @param startPos 起始位置
     * @param direction 方向
     */
    public fire(startPos: Vec3, direction: Vec3) {
        this._resetState();
        this.node.setWorldPosition(startPos);
        this._initPosition.set(startPos);
        this.setDirection(direction);
        this._setupRigidBody();
    }
    
    /**
     * 重置子弹状态
     */
    private _resetState() {
        this._age = 0;
        this._currentRange = 0;
        this._penetrateCount = 0;
        this._isHited = false;
        this._isFired = true;
        this._hitEnemies.clear();
        this._parabolaCurve.progress = 0;
        this._parabolaCurve.initialized = false;
    }
    
    /**
     * 设置刚体属性
     */
    private _setupRigidBody() {
        if (!this._rigidBody) return;
        this._rigidBody.useGravity = false;
        this._rigidBody.isKinematic = true;
    }

    /**
     * 更新子弹朝向
     * 构造正交旋转：让模型的前进轴朝向飞行方向，保持 Y 轴向上
     *
     * Cocos Creator 模型坐标系说明：
     *   - 若模型正面朝 +Z：axisForward = (0,0,1)，对应 fromAxes(right, up, forward)
     *   - 若模型正面朝 +X：axisForward = (1,0,0)，对应 fromAxes(forward, up, -right)
     *   - 目前按 +X 朝前处理（箭矢偏90度时模型正面通常是 +X）
     *
     * 如果修改后方向仍然不对，说明模型正面是 +Z，把下方 fromAxes 参数改为:
     *   Quat.fromAxes(q, axisRight, axisUp, axisForward);
     */
    private _updateRotation() {
        if (!this.enableRotation) return;
        if (Vec3.equals(this._direction, Vec3.ZERO)) return;

        // 飞行方向即模型"前进轴"所指方向
        const axisForward = new Vec3(this._direction.x, this._direction.y, this._direction.z);
        axisForward.normalize();

        // 世界 Up 轴；若飞行方向与 Up 近乎平行则换备用 Up 避免叉积退化
        let worldUp = new Vec3(0, 1, 0);
        if (Math.abs(Vec3.dot(axisForward, worldUp)) > 0.999) {
            worldUp = new Vec3(0, 0, 1);
        }

        // axisRight 垂直于 forward 和 up 平面
        const axisRight = new Vec3();
        Vec3.cross(axisRight, worldUp, axisForward);
        axisRight.normalize();

        // axisUp 由 forward 和 right 重新正交化
        const axisUp = new Vec3();
        Vec3.cross(axisUp, axisForward, axisRight);
        axisUp.normalize();

        const q = new Quat();
        // 模型正面朝 +X：X轴=forward, Y轴=up, Z轴=-right
        // fromAxes(xAxis, yAxis, zAxis)
        const axisZ = new Vec3();
        Vec3.negate(axisZ, axisRight);  // -right
        Quat.fromAxes(q, axisForward, axisUp, axisZ);
        this.node.setWorldRotation(q);
    }

    /**
     * 初始化抛物线参数
     */
    private _initParabola() {
        if (this._parabolaCurve.initialized) return;
        
        this._parabolaCurve.start.set(this.node.getWorldPosition());
        this._calculateTargetPosition();
        this._parabolaCurve.end.set(this._parabolaCurve.target);
        
        this._parabolaCurve.distance = Vec3.distance(this._parabolaCurve.start, this._parabolaCurve.end);
        const height = this._calculateParabolaHeight(this._parabolaCurve.distance);
        
        // 设置控制点
        this._parabolaCurve.control.set(
            (this._parabolaCurve.start.x + this._parabolaCurve.end.x) / 2,
            (this._parabolaCurve.start.y + this._parabolaCurve.end.y) / 2 + height,
            (this._parabolaCurve.start.z + this._parabolaCurve.end.z) / 2
        );
        
        this._parabolaCurve.initialized = true;
    }
    
    /**
     * 计算目标位置
     */
    private _calculateTargetPosition() {
        if (this.targetType === BulletTargetType.TRACKING && this.targetNode?.isValid) {
            const targetPos = this.targetNode.getWorldPosition();
            // 使用地面高度作为抛物线终点，而不是目标节点的高度
            const gameManager = manager.game;
            let groundHeight = 0;
            if (gameManager) {
                groundHeight = gameManager.calculateGroundHeight(targetPos);
            }
            this._parabolaCurve.target.set(targetPos.x, groundHeight, targetPos.z);
        } else {
            this._parabolaCurve.target.set(
                this._initPosition.x + this._direction.x * this.maxRange,
                this._initPosition.y + this._direction.y * this.maxRange,
                this._initPosition.z + this._direction.z * this.maxRange
            );
        }
    }
    
    /**
     * 计算抛物线高度
     * @param distance 距离
     * @returns 高度
     */
    private _calculateParabolaHeight(distance: number): number {
        // 根据距离调整高度，距离越远，高度越高，但有上限
        let height = this.parabolaBaseHeight + (distance * this.parabolaHeightFactor);
        
        // 限制最大高度
        return Math.min(height, this.parabolaMaxHeight);
    }
    
    /**
     * 更新抛物线轨迹
     * @param dt 时间增量
     */
    private _updateParabola(dt: number) {
        if (!this._parabolaCurve.initialized) {
            this._initParabola();
        }
        
        // 动态更新追踪目标
        this._updateTrackingTarget();
        
        // 更新进度
        const progressDelta = (this.speed * dt) / this._parabolaCurve.distance;
        this._parabolaCurve.progress = Math.min(this._parabolaCurve.progress + progressDelta, 1.0);
        
        // 计算新位置
        const newPos = this._quadraticBezier(
            this._parabolaCurve.start,
            this._parabolaCurve.control,
            this._parabolaCurve.end,
            this._parabolaCurve.progress
        );
        
        // 更新距离和位置
        const lastPos = this.node.getWorldPosition();
        this._currentRange += Vec3.distance(lastPos, newPos);
        this.node.setWorldPosition(newPos);
        
        // 检查是否碰撞地面（抛物线模式下也需要实时检测）
        const gameManager = manager.game;
        if (gameManager) {
            const groundHeight = gameManager.calculateGroundHeight(newPos);
            const groundThreshold = 0.5; // 地面检测容差，高度差小于此值认为碰撞
            if (newPos.y <= groundHeight + groundThreshold) {
                this.onGroundHit(newPos, groundHeight);
                return; // 地面碰撞后停止更新
            }
        }
        
        // 更新朝向
        this._updateParabolaDirection();
        
        // 检查是否到达终点
        if (this._parabolaCurve.progress >= 1.0) {
            // 抛物线结束，强制触发地面爆炸
            const currentPos = this.node.getWorldPosition();
            const gameManager = manager.game;
            if (gameManager) {
                const groundHeight = gameManager.calculateGroundHeight(currentPos);
                // 抛物线结束时，无论高度如何都触发地面爆炸
                this.onGroundHit(currentPos, groundHeight);
                return;
            }
            // 如果没有游戏管理器，直接回收
            this.recycleBullet();
        }
    }
    
    /**
     * 更新抛物线朝向
     */
    private _updateParabolaDirection() {
        if (this._parabolaCurve.progress >= 0.98) return;
        
        const nextProgress = Math.min(this._parabolaCurve.progress + 0.02, 1.0);
        const nextPos = this._quadraticBezier(
            this._parabolaCurve.start,
            this._parabolaCurve.control,
            this._parabolaCurve.end,
            nextProgress
        );
        
        this._direction = nextPos.subtract(this.node.position).normalize();
        this._updateRotation();
    }
    
    /**
     * 更新追踪目标
     */
    private _updateTrackingTarget() {
        if (this.targetType !== BulletTargetType.TRACKING) return;
        if (!this.targetNode?.isValid) return;
        
        const health = this.targetNode.getComponent(HealthComponent);
        if (health?.isDead) return;
        
        const targetPos = this.targetNode.getWorldPosition();
        if (Vec3.equals(targetPos, this._parabolaCurve.target)) return;
        
        // 更新终点和控制点
        this._parabolaCurve.target.set(targetPos);
        this._parabolaCurve.end.set(targetPos);
        
        this._parabolaCurve.distance = Vec3.distance(this._parabolaCurve.start, this._parabolaCurve.end);
        const height = this._calculateParabolaHeight(this._parabolaCurve.distance);
        
        this._parabolaCurve.control.set(
            (this._parabolaCurve.start.x + this._parabolaCurve.end.x) / 2,
            (this._parabolaCurve.start.y + this._parabolaCurve.end.y) / 2 + height,
            (this._parabolaCurve.start.z + this._parabolaCurve.end.z) / 2
        );
    }
    
    /**
     * 计算二次贝塞尔曲线点 - 优化版本
     * @param p0 起点
     * @param p1 控制点
     * @param p2 终点
     * @param t 进度 (0-1)
     * @returns 曲线上的点
     */
    private _quadraticBezier(p0: Vec3, p1: Vec3, p2: Vec3, t: number): Vec3 {
        // 二次贝塞尔曲线公式: B(t) = (1-t)²P₀ + 2(1-t)tP₁ + t²P₂
        const mt = 1 - t;
        const mt2 = mt * mt;
        const t2 = t * t;
        const mtt = 2 * mt * t;
        
        this._tempVec3.set(
            mt2 * p0.x + mtt * p1.x + t2 * p2.x,
            mt2 * p0.y + mtt * p1.y + t2 * p2.y,
            mt2 * p0.z + mtt * p1.z + t2 * p2.z
        );
        
        return this._tempVec3;
    }

    /**
     * 碰撞回调 - 优化版本
     * @param event 碰撞事件
     */
    private _onCollisionEnter(event: ICollisionEvent|ITriggerEvent) {
        if (this.hitType === TrackingHitType.DISTANCE) return;
        
        const targetNode = (event as ICollisionEvent).otherCollider?.node || (event as ITriggerEvent).otherCollider?.node;
        if (!targetNode) return;
        
        this._handleHit(targetNode);
    }
    
    /**
     * 处理命中逻辑
     */
    private _handleHit(targetNode: Node) {
        if (this.collisionType === BulletCollisionType.PENETRATE) {
            if (this._hitEnemies.has(targetNode)) return;
            
            this._hitEnemies.add(targetNode);
            this._penetrateCount++;
            this.onHit(targetNode);
            
            if (this._penetrateCount >= this.maxPenetrateCount) {
                this.recycleBullet();
            }
        } else {
            if (!this._isHited) {
                this._isHited = true;
                this.onHit(targetNode);
            }
            this.recycleBullet();
        }
    }

    /**
     * 检查距离命中 - 优化版本
     */
    private _checkDistanceHit() {
        const enemyManager = manager.enemy;
        if (!enemyManager) return;
        
        const bulletPos = this.node.getWorldPosition();
        const enemies = enemyManager.getRangeEnemies(bulletPos, this.hitDistance);
        
        // 查找未命中的敌人
        for (const enemy of enemies) {
            if (this._hitEnemies.has(enemy.node)) continue;
            
            this._hitEnemies.add(enemy.node);
            this.onHit(enemy.node);
            
            if (this.collisionType === BulletCollisionType.PENETRATE) {
                this._penetrateCount++;
                if (this._penetrateCount >= this.maxPenetrateCount) {
                    this.recycleBullet();
                }
            } else {
                this._isHited = true;
                this.recycleBullet();
            }
            break; // 只处理第一个命中的敌人
        }
    }

    /**
     * 检查地面高度，确保子弹不低于地面 - 优化版本
     */
    private _checkGroundHeight() {
        const gameManager = manager.game;
        if (!gameManager) return;
        
        const currentPos = this.node.getWorldPosition();
        const groundHeight = gameManager.calculateGroundHeight(currentPos);
        
        const groundThreshold = 0.5; // 地面检测容差
        
        if (currentPos.y > groundHeight + groundThreshold) return;
        
        // 检测到地面碰撞，触发地面碰撞回调
        this.onGroundHit(currentPos, groundHeight);
        
        // // 调整位置到地面
        // this.node.setWorldPosition(currentPos.x, groundHeight, currentPos.z);
        
        // // 调整方向沿地面飞行
        // this._direction.y = 0;
        // this._direction.normalize();
        // this._updateRotation();
    }

    /**
     * 地面碰撞回调，子类可重写此方法
     * @param hitPosition 碰撞位置
     * @param groundHeight 地面高度
     */
    protected onGroundHit(hitPosition: Vec3, groundHeight: number) {
        // 默认空实现，由子类重写
        this.recycleBullet();
    }

    /**
     * 子弹命中回调，子类可重写此方法
     * @param targetNode 目标节点
     */
    protected onHit(targetNode: Node) {
        // 默认空实现，由子类重写
    }

    /**
     * 回收子弹 - 优化版本
     */
    protected recycleBullet() {
        this.recycle();
    }

    /**
     * 直线移动更新 - 优化版本
     * @param dt 时间增量
     */
    private _updateLineMove(dt: number) {
        const moveStep = this.speed * dt;
        this._tempVec3.set(this._direction).multiplyScalar(moveStep);
        const currentPos = this.node.getWorldPosition();
        currentPos.add(this._tempVec3);
        this.node.setWorldPosition(currentPos);
        this._currentRange += moveStep;
    }

    /**
     * 追踪目标更新
     * @param dt 时间增量
     */
    private _updateTracking(dt: number) {
        if (!this.targetNode?.isValid) {
            this.recycleBullet();
            return;
        }
        
        const health = this.targetNode.getComponent(HealthComponent);
        if (health?.isDead) {
            this.recycleBullet();
            return;
        }
        
        const targetPos = this.targetNode.getWorldPosition();
        const currentPos = this.node.getWorldPosition();
        
        this._tempVec3.set(targetPos).subtract(currentPos).normalize();
        
        // 平滑旋转
        const rotateWeight = Math.min(this.trackingSpeed * dt, 1.0);
        Vec3.lerp(this._direction, this._direction, this._tempVec3, Math.max(0.1, rotateWeight));
        this._direction.normalize();
        
        this._updateRotation();
    }

    /**
     * 帧更新 - 优化版本
     * @param dt 时间增量
     */
    update(dt: number) {
        if (!this._isFired) return;
        
        this._age += dt;
        if (this._age >= this.lifeTime || this._currentRange >= this.maxRange) {
            this.recycleBullet();
            return;
        }
        
        // 距离检测
        if (this.hitType === TrackingHitType.DISTANCE) {
            this._checkDistanceHit();
        }
        
        // 移动更新
        if (this.moveType === BulletMoveType.PARABOLA) {
            this._updateParabola(dt);
        } else {
            if (this.targetType === BulletTargetType.TRACKING) {
                this._updateTracking(dt);
            }
            this._updateLineMove(dt);
        }
        
        // 地面高度检查 - 所有子弹类型都需要检查地面碰撞
        this._checkGroundHeight();
    }

    /**
     * 重置
     */
    public reset(): void {
        this._age = 0;
        this._currentRange = 0;
        this._penetrateCount = 0;
        this._isHited = false;
        this._isFired = false;
        this._hitEnemies.clear();
        this._parabolaCurve.progress = 0;
        this._parabolaCurve.initialized = false;
        this.targetNode = null;
    }
}