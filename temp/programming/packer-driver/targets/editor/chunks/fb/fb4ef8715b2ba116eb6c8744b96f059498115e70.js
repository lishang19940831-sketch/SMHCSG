System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Node, Vec3, RigidBody, Enum, BoxCollider, Color, color, Quat, HealthComponent, PoolObjectBase, CommonEvent, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _crd, ccclass, property, BulletMoveType, BulletTargetType, BulletCollisionType, TrackingHitType, BulletBase;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfHealthComponent(extras) {
    _reporterNs.report("HealthComponent", "../Components/HealthComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPoolObjectBase(extras) {
    _reporterNs.report("PoolObjectBase", "../../Main/Common/PoolObjectBase", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../Common/CommonEnum", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Node = _cc.Node;
      Vec3 = _cc.Vec3;
      RigidBody = _cc.RigidBody;
      Enum = _cc.Enum;
      BoxCollider = _cc.BoxCollider;
      Color = _cc.Color;
      color = _cc.color;
      Quat = _cc.Quat;
    }, function (_unresolved_2) {
      HealthComponent = _unresolved_2.HealthComponent;
    }, function (_unresolved_3) {
      PoolObjectBase = _unresolved_3.PoolObjectBase;
    }, function (_unresolved_4) {
      CommonEvent = _unresolved_4.CommonEvent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "aabe0lfFShBH4xK1l1W9ZJc", "BulletBase", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'RigidBody', 'Collider', 'ICollisionEvent', 'Enum', 'log', 'BoxCollider', 'ITriggerEvent', 'Color', 'color', 'Quat', 'math', 'Mat4']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 子弹移动类型枚举
       */

      BulletMoveType = /*#__PURE__*/function (BulletMoveType) {
        BulletMoveType[BulletMoveType["LINE"] = 0] = "LINE";
        BulletMoveType[BulletMoveType["PARABOLA"] = 1] = "PARABOLA";
        return BulletMoveType;
      }(BulletMoveType || {});
      /**
       * 子弹目标类型枚举
       */


      BulletTargetType = /*#__PURE__*/function (BulletTargetType) {
        BulletTargetType[BulletTargetType["FIXED_DIRECTION"] = 0] = "FIXED_DIRECTION";
        BulletTargetType[BulletTargetType["TRACKING"] = 1] = "TRACKING";
        return BulletTargetType;
      }(BulletTargetType || {});
      /**
       * 子弹碰撞类型枚举
       */


      BulletCollisionType = /*#__PURE__*/function (BulletCollisionType) {
        BulletCollisionType[BulletCollisionType["NORMAL"] = 0] = "NORMAL";
        BulletCollisionType[BulletCollisionType["PENETRATE"] = 1] = "PENETRATE";
        return BulletCollisionType;
      }(BulletCollisionType || {});
      /**
       * 追踪命中判定类型
       */


      TrackingHitType = /*#__PURE__*/function (TrackingHitType) {
        TrackingHitType[TrackingHitType["COLLISION"] = 0] = "COLLISION";
        TrackingHitType[TrackingHitType["DISTANCE"] = 1] = "DISTANCE";
        return TrackingHitType;
      }(TrackingHitType || {});
      /**
       * 子弹基类
       * @class BulletBase
       */


      _export("BulletBase", BulletBase = (_dec = ccclass('BulletBase'), _dec2 = property({
        type: Enum(BulletMoveType),
        displayName: '子弹移动类型',
        tooltip: '子弹移动类型 : LINE 直线'
      }), _dec3 = property({
        type: Enum(BulletTargetType),
        displayName: '子弹目标类型',
        tooltip: '子弹目标类型 : FIXED_DIRECTION 固定方向, TRACKING 追踪目标'
      }), _dec4 = property({
        type: Node,
        visible: function () {
          return this.targetType === BulletTargetType.TRACKING;
        },
        displayName: '目标节点'
      }), _dec5 = property({
        type: Enum(TrackingHitType),
        displayName: '命中判定类型',
        tooltip: '命中判定类型 : COLLISION 碰撞判定, DISTANCE 距离判定'
      }), _dec6 = property({
        displayName: '命中距离',
        tooltip: '当子弹与目标距离小于此值时判定命中',
        visible: function () {
          return this.hitType === TrackingHitType.DISTANCE;
        }
      }), _dec7 = property({
        visible: function () {
          return this.targetType === BulletTargetType.TRACKING;
        },
        displayName: '追踪速度'
      }), _dec8 = property({
        type: Enum(BulletCollisionType),
        displayName: '子弹碰撞类型',
        tooltip: '子弹碰撞类型 : NORMAL 非穿透, PENETRATE 穿透'
      }), _dec9 = property({
        visible: function () {
          return this.collisionType === BulletCollisionType.PENETRATE;
        },
        displayName: '最大穿透次数'
      }), _dec10 = property({
        visible: function () {
          return this.moveType === BulletMoveType.PARABOLA;
        },
        displayName: '抛物线高度系数'
      }), _dec11 = property({
        visible: function () {
          return this.moveType === BulletMoveType.PARABOLA;
        },
        displayName: '抛物线基础高度'
      }), _dec12 = property({
        visible: function () {
          return this.moveType === BulletMoveType.PARABOLA;
        },
        displayName: '抛物线最大高度'
      }), _dec13 = property({
        displayName: '是否旋转节点',
        tooltip: '是否根据移动方向旋转子弹节点'
      }), _dec(_class = (_class2 = class BulletBase extends (_crd && PoolObjectBase === void 0 ? (_reportPossibleCrUseOfPoolObjectBase({
        error: Error()
      }), PoolObjectBase) : PoolObjectBase) {
        constructor(...args) {
          super(...args);

          /** 子弹速度 */
          _initializerDefineProperty(this, "speed", _descriptor, this);

          /** 子弹伤害 */
          _initializerDefineProperty(this, "damage", _descriptor2, this);

          /** 子弹伤害颜色 */
          _initializerDefineProperty(this, "damageColor", _descriptor3, this);

          /** 子弹最大射程 */
          _initializerDefineProperty(this, "maxRange", _descriptor4, this);

          /** 子弹生命周期 */
          _initializerDefineProperty(this, "lifeTime", _descriptor5, this);

          /** 子弹移动类型 */
          _initializerDefineProperty(this, "moveType", _descriptor6, this);

          /** 子弹目标类型 */
          _initializerDefineProperty(this, "targetType", _descriptor7, this);

          /** 目标节点 */
          _initializerDefineProperty(this, "targetNode", _descriptor8, this);

          /** 命中判定类型 */
          _initializerDefineProperty(this, "hitType", _descriptor9, this);

          /** 命中距离 */
          _initializerDefineProperty(this, "hitDistance", _descriptor10, this);

          /** 追踪速度 */
          _initializerDefineProperty(this, "trackingSpeed", _descriptor11, this);

          /** 子弹碰撞类型 */
          _initializerDefineProperty(this, "collisionType", _descriptor12, this);

          /** 最大穿透次数 */
          _initializerDefineProperty(this, "maxPenetrateCount", _descriptor13, this);

          /** 抛物线高度系数 */
          _initializerDefineProperty(this, "parabolaHeightFactor", _descriptor14, this);

          /** 抛物线基础高度 */
          _initializerDefineProperty(this, "parabolaBaseHeight", _descriptor15, this);

          /** 抛物线最大高度 */
          _initializerDefineProperty(this, "parabolaMaxHeight", _descriptor16, this);

          /** 是否旋转节点 */
          _initializerDefineProperty(this, "enableRotation", _descriptor17, this);

          // 私有变量 - 按功能分组
          // 物理组件
          this._rigidBody = null;
          this._collider = null;
          // 运动状态
          this._direction = new Vec3(0, 0, -1);
          this._velocity = new Vec3(0, 0, 0);
          this._initPosition = new Vec3();
          this._currentRange = 0;
          this._age = 0;
          this._isFired = false;
          this._isHited = false;
          // 穿透机制
          this._penetrateCount = 0;
          this._hitEnemies = new Set();
          // 使用Set提高查找效率
          // 抛物线运动专用
          this._parabolaCurve = {
            start: new Vec3(),
            control: new Vec3(),
            end: new Vec3(),
            target: new Vec3(),
            progress: 0,
            distance: 0,
            initialized: false
          };
          // 缓存对象，避免频繁创建
          this._tempVec3 = new Vec3();
          this._tempColor = new Color();
        }

        /**
         * 组件加载完成
         */
        onLoad() {
          this._setupPhysics();

          this._initPosition.set(this.node.position);

          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).EnemyDead, this.onEnemyDead, this);
        }
        /**
         * 初始化物理组件
         */


        _setupPhysics() {
          this._rigidBody = this.getComponent(RigidBody);
          this._collider = this.getComponent(BoxCollider);

          if (!this._collider) {
            return;
          }

          this._collider.on('onCollisionEnter', this._onCollisionEnter, this);

          this._collider.on('onTriggerEnter', this._onCollisionEnter, this);
        }

        onDestroy() {
          if (this._collider) {
            this._collider.off('onCollisionEnter', this._onCollisionEnter, this);

            this._collider.off('onTriggerEnter', this._onCollisionEnter, this);
          }
        }

        onEnemyDead(node) {
          if (this.targetNode === node) {
            this.targetType = BulletTargetType.FIXED_DIRECTION;
            this.targetNode = null;
          }
        }
        /**
         * 设置子弹方向
         * @param dir 方向向量
         */


        setDirection(dir) {
          this._direction.set(dir).normalize();

          this._updateRotation();
        }
        /**
         * 设置追踪目标
         * @param target 目标节点
         */


        setTarget(target) {
          this.targetNode = target;
        }
        /**
         * 设置子弹伤害颜色
         * @param color 颜色
         */


        setDamageColor(color) {
          this.damageColor = color;
        }
        /**
         * 发射子弹
         * @param startPos 起始位置
         * @param direction 方向
         */


        fire(startPos, direction) {
          this._resetState();

          this.node.setWorldPosition(startPos);

          this._initPosition.set(startPos);

          this.setDirection(direction);

          this._setupRigidBody();
        }
        /**
         * 重置子弹状态
         */


        _resetState() {
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


        _setupRigidBody() {
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


        _updateRotation() {
          if (!this.enableRotation) return;
          if (Vec3.equals(this._direction, Vec3.ZERO)) return; // 飞行方向即模型"前进轴"所指方向

          const axisForward = new Vec3(this._direction.x, this._direction.y, this._direction.z);
          axisForward.normalize(); // 世界 Up 轴；若飞行方向与 Up 近乎平行则换备用 Up 避免叉积退化

          let worldUp = new Vec3(0, 1, 0);

          if (Math.abs(Vec3.dot(axisForward, worldUp)) > 0.999) {
            worldUp = new Vec3(0, 0, 1);
          } // axisRight 垂直于 forward 和 up 平面


          const axisRight = new Vec3();
          Vec3.cross(axisRight, worldUp, axisForward);
          axisRight.normalize(); // axisUp 由 forward 和 right 重新正交化

          const axisUp = new Vec3();
          Vec3.cross(axisUp, axisForward, axisRight);
          axisUp.normalize();
          const q = new Quat(); // 模型正面朝 +X：X轴=forward, Y轴=up, Z轴=-right
          // fromAxes(xAxis, yAxis, zAxis)

          const axisZ = new Vec3();
          Vec3.negate(axisZ, axisRight); // -right

          Quat.fromAxes(q, axisForward, axisUp, axisZ);
          this.node.setWorldRotation(q);
        }
        /**
         * 初始化抛物线参数
         */


        _initParabola() {
          if (this._parabolaCurve.initialized) return;

          this._parabolaCurve.start.set(this.node.getWorldPosition());

          this._calculateTargetPosition();

          this._parabolaCurve.end.set(this._parabolaCurve.target);

          this._parabolaCurve.distance = Vec3.distance(this._parabolaCurve.start, this._parabolaCurve.end);

          const height = this._calculateParabolaHeight(this._parabolaCurve.distance); // 设置控制点


          this._parabolaCurve.control.set((this._parabolaCurve.start.x + this._parabolaCurve.end.x) / 2, (this._parabolaCurve.start.y + this._parabolaCurve.end.y) / 2 + height, (this._parabolaCurve.start.z + this._parabolaCurve.end.z) / 2);

          this._parabolaCurve.initialized = true;
        }
        /**
         * 计算目标位置
         */


        _calculateTargetPosition() {
          var _this$targetNode;

          if (this.targetType === BulletTargetType.TRACKING && (_this$targetNode = this.targetNode) != null && _this$targetNode.isValid) {
            const targetPos = this.targetNode.getWorldPosition(); // 使用地面高度作为抛物线终点，而不是目标节点的高度

            const gameManager = manager.game;
            let groundHeight = 0;

            if (gameManager) {
              groundHeight = gameManager.calculateGroundHeight(targetPos);
            }

            this._parabolaCurve.target.set(targetPos.x, groundHeight, targetPos.z);
          } else {
            this._parabolaCurve.target.set(this._initPosition.x + this._direction.x * this.maxRange, this._initPosition.y + this._direction.y * this.maxRange, this._initPosition.z + this._direction.z * this.maxRange);
          }
        }
        /**
         * 计算抛物线高度
         * @param distance 距离
         * @returns 高度
         */


        _calculateParabolaHeight(distance) {
          // 根据距离调整高度，距离越远，高度越高，但有上限
          let height = this.parabolaBaseHeight + distance * this.parabolaHeightFactor; // 限制最大高度

          return Math.min(height, this.parabolaMaxHeight);
        }
        /**
         * 更新抛物线轨迹
         * @param dt 时间增量
         */


        _updateParabola(dt) {
          if (!this._parabolaCurve.initialized) {
            this._initParabola();
          } // 动态更新追踪目标


          this._updateTrackingTarget(); // 更新进度


          const progressDelta = this.speed * dt / this._parabolaCurve.distance;
          this._parabolaCurve.progress = Math.min(this._parabolaCurve.progress + progressDelta, 1.0); // 计算新位置

          const newPos = this._quadraticBezier(this._parabolaCurve.start, this._parabolaCurve.control, this._parabolaCurve.end, this._parabolaCurve.progress); // 更新距离和位置


          const lastPos = this.node.getWorldPosition();
          this._currentRange += Vec3.distance(lastPos, newPos);
          this.node.setWorldPosition(newPos); // 检查是否碰撞地面（抛物线模式下也需要实时检测）

          const gameManager = manager.game;

          if (gameManager) {
            const groundHeight = gameManager.calculateGroundHeight(newPos);
            const groundThreshold = 0.5; // 地面检测容差，高度差小于此值认为碰撞

            if (newPos.y <= groundHeight + groundThreshold) {
              this.onGroundHit(newPos, groundHeight);
              return; // 地面碰撞后停止更新
            }
          } // 更新朝向


          this._updateParabolaDirection(); // 检查是否到达终点


          if (this._parabolaCurve.progress >= 1.0) {
            // 抛物线结束，强制触发地面爆炸
            const currentPos = this.node.getWorldPosition();
            const gameManager = manager.game;

            if (gameManager) {
              const groundHeight = gameManager.calculateGroundHeight(currentPos); // 抛物线结束时，无论高度如何都触发地面爆炸

              this.onGroundHit(currentPos, groundHeight);
              return;
            } // 如果没有游戏管理器，直接回收


            this.recycleBullet();
          }
        }
        /**
         * 更新抛物线朝向
         */


        _updateParabolaDirection() {
          if (this._parabolaCurve.progress >= 0.98) return;
          const nextProgress = Math.min(this._parabolaCurve.progress + 0.02, 1.0);

          const nextPos = this._quadraticBezier(this._parabolaCurve.start, this._parabolaCurve.control, this._parabolaCurve.end, nextProgress);

          this._direction = nextPos.subtract(this.node.position).normalize();

          this._updateRotation();
        }
        /**
         * 更新追踪目标
         */


        _updateTrackingTarget() {
          var _this$targetNode2;

          if (this.targetType !== BulletTargetType.TRACKING) return;
          if (!((_this$targetNode2 = this.targetNode) != null && _this$targetNode2.isValid)) return;
          const health = this.targetNode.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
            error: Error()
          }), HealthComponent) : HealthComponent);
          if (health != null && health.isDead) return;
          const targetPos = this.targetNode.getWorldPosition();
          if (Vec3.equals(targetPos, this._parabolaCurve.target)) return; // 更新终点和控制点

          this._parabolaCurve.target.set(targetPos);

          this._parabolaCurve.end.set(targetPos);

          this._parabolaCurve.distance = Vec3.distance(this._parabolaCurve.start, this._parabolaCurve.end);

          const height = this._calculateParabolaHeight(this._parabolaCurve.distance);

          this._parabolaCurve.control.set((this._parabolaCurve.start.x + this._parabolaCurve.end.x) / 2, (this._parabolaCurve.start.y + this._parabolaCurve.end.y) / 2 + height, (this._parabolaCurve.start.z + this._parabolaCurve.end.z) / 2);
        }
        /**
         * 计算二次贝塞尔曲线点 - 优化版本
         * @param p0 起点
         * @param p1 控制点
         * @param p2 终点
         * @param t 进度 (0-1)
         * @returns 曲线上的点
         */


        _quadraticBezier(p0, p1, p2, t) {
          // 二次贝塞尔曲线公式: B(t) = (1-t)²P₀ + 2(1-t)tP₁ + t²P₂
          const mt = 1 - t;
          const mt2 = mt * mt;
          const t2 = t * t;
          const mtt = 2 * mt * t;

          this._tempVec3.set(mt2 * p0.x + mtt * p1.x + t2 * p2.x, mt2 * p0.y + mtt * p1.y + t2 * p2.y, mt2 * p0.z + mtt * p1.z + t2 * p2.z);

          return this._tempVec3;
        }
        /**
         * 碰撞回调 - 优化版本
         * @param event 碰撞事件
         */


        _onCollisionEnter(event) {
          var _otherCollider, _otherCollider2;

          if (this.hitType === TrackingHitType.DISTANCE) return;
          const targetNode = ((_otherCollider = event.otherCollider) == null ? void 0 : _otherCollider.node) || ((_otherCollider2 = event.otherCollider) == null ? void 0 : _otherCollider2.node);
          if (!targetNode) return;

          this._handleHit(targetNode);
        }
        /**
         * 处理命中逻辑
         */


        _handleHit(targetNode) {
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


        _checkDistanceHit() {
          const enemyManager = manager.enemy;
          if (!enemyManager) return;
          const bulletPos = this.node.getWorldPosition();
          const enemies = enemyManager.getRangeEnemies(bulletPos, this.hitDistance); // 查找未命中的敌人

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


        _checkGroundHeight() {
          const gameManager = manager.game;
          if (!gameManager) return;
          const currentPos = this.node.getWorldPosition();
          const groundHeight = gameManager.calculateGroundHeight(currentPos);
          const groundThreshold = 0.5; // 地面检测容差

          if (currentPos.y > groundHeight + groundThreshold) return; // 检测到地面碰撞，触发地面碰撞回调

          this.onGroundHit(currentPos, groundHeight); // // 调整位置到地面
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


        onGroundHit(hitPosition, groundHeight) {
          // 默认空实现，由子类重写
          this.recycleBullet();
        }
        /**
         * 子弹命中回调，子类可重写此方法
         * @param targetNode 目标节点
         */


        onHit(targetNode) {// 默认空实现，由子类重写
        }
        /**
         * 回收子弹 - 优化版本
         */


        recycleBullet() {
          this.recycle();
        }
        /**
         * 直线移动更新 - 优化版本
         * @param dt 时间增量
         */


        _updateLineMove(dt) {
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


        _updateTracking(dt) {
          var _this$targetNode3;

          if (!((_this$targetNode3 = this.targetNode) != null && _this$targetNode3.isValid)) {
            this.recycleBullet();
            return;
          }

          const health = this.targetNode.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
            error: Error()
          }), HealthComponent) : HealthComponent);

          if (health != null && health.isDead) {
            this.recycleBullet();
            return;
          }

          const targetPos = this.targetNode.getWorldPosition();
          const currentPos = this.node.getWorldPosition();

          this._tempVec3.set(targetPos).subtract(currentPos).normalize(); // 平滑旋转


          const rotateWeight = Math.min(this.trackingSpeed * dt, 1.0);
          Vec3.lerp(this._direction, this._direction, this._tempVec3, Math.max(0.1, rotateWeight));

          this._direction.normalize();

          this._updateRotation();
        }
        /**
         * 帧更新 - 优化版本
         * @param dt 时间增量
         */


        update(dt) {
          if (!this._isFired) return;
          this._age += dt;

          if (this._age >= this.lifeTime || this._currentRange >= this.maxRange) {
            this.recycleBullet();
            return;
          } // 距离检测


          if (this.hitType === TrackingHitType.DISTANCE) {
            this._checkDistanceHit();
          } // 移动更新


          if (this.moveType === BulletMoveType.PARABOLA) {
            this._updateParabola(dt);
          } else {
            if (this.targetType === BulletTargetType.TRACKING) {
              this._updateTracking(dt);
            }

            this._updateLineMove(dt);
          } // 地面高度检查 - 所有子弹类型都需要检查地面碰撞


          this._checkGroundHeight();
        }
        /**
         * 重置
         */


        reset() {
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

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "damage", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "damageColor", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return color().fromHEX('#ffffff');
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "maxRange", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 100;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "lifeTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 5;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "moveType", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return BulletMoveType.LINE;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "targetType", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return BulletTargetType.FIXED_DIRECTION;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "targetNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "hitType", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return TrackingHitType.COLLISION;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "hitDistance", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "trackingSpeed", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 5;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "collisionType", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return BulletCollisionType.NORMAL;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "maxPenetrateCount", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 3;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "parabolaHeightFactor", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.5;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "parabolaBaseHeight", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 5;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "parabolaMaxHeight", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 20;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "enableRotation", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=fb4ef8715b2ba116eb6c8744b96f059498115e70.js.map