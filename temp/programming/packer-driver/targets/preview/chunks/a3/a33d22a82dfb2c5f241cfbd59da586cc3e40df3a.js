System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Animation, clamp, easing, Node, tween, Vec3, ObjectType, BuildUnlockState, HealthComponent, BuildingBase, Arrow, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _crd, ccclass, property, ArrowTower;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildUnlockState(extras) {
    _reporterNs.report("BuildUnlockState", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHealthComponent(extras) {
    _reporterNs.report("HealthComponent", "../Components/HealthComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildingBase(extras) {
    _reporterNs.report("BuildingBase", "./BuildingBase", _context.meta, extras);
  }

  function _reportPossibleCrUseOfArrow(extras) {
    _reporterNs.report("Arrow", "../Bullet/Arraw", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Animation = _cc.Animation;
      clamp = _cc.clamp;
      easing = _cc.easing;
      Node = _cc.Node;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      ObjectType = _unresolved_2.ObjectType;
      BuildUnlockState = _unresolved_2.BuildUnlockState;
    }, function (_unresolved_3) {
      HealthComponent = _unresolved_3.HealthComponent;
    }, function (_unresolved_4) {
      BuildingBase = _unresolved_4.BuildingBase;
    }, function (_unresolved_5) {
      Arrow = _unresolved_5.Arrow;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d028dcmNCVBpbbrjaXIZxED", "ArrowTower", undefined);

      __checkObsolete__(['_decorator', 'Animation', 'clamp', 'Enum', 'easing', 'Node', 'tween', 'Vec3', 'Quat']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 箭塔类 - 自动寻找并攻击范围内的随机敌人，继承自建筑基类
       */

      _export("ArrowTower", ArrowTower = (_dec = ccclass('ArrowTower'), _dec2 = property({
        type: Animation,
        displayName: '箭塔动画'
      }), _dec3 = property({
        type: Node,
        displayName: '箭塔转动部位模型节点'
      }), _dec4 = property({
        type: Node,
        displayName: '基座节点'
      }), _dec5 = property({
        type: Node,
        displayName: '箭矢发射点'
      }), _dec6 = property({
        displayName: '攻击范围',
        tooltip: '箭塔的攻击半径'
      }), _dec7 = property({
        displayName: '攻击伤害',
        tooltip: '每次攻击造成的伤害'
      }), _dec8 = property({
        displayName: '攻击速度',
        tooltip: '每秒攻击次数'
      }), _dec9 = property({
        displayName: '连击次数',
        tooltip: '连续攻击次数'
      }), _dec10 = property({
        displayName: '显示攻击范围',
        tooltip: '是否在编辑器中显示攻击范围'
      }), _dec11 = property({
        displayName: '自动瞄准',
        tooltip: '是否自动寻找范围内的随机敌人'
      }), _dec12 = property({
        displayName: 'Y轴旋转限制',
        tooltip: '限制rotationNode的Y轴旋转角度，0表示无限制',
        range: [0, 180]
      }), _dec13 = property({
        displayName: '旋转速度',
        tooltip: 'rotationNode旋转到目标位置的速度'
      }), _dec14 = property({
        displayName: '旋转朝向偏移',
        tooltip: '补偿模型朝向偏差，常见值：0 / 90 / -90 / 180'
      }), _dec15 = property({
        type: Node,
        displayName: '额外解锁的Node 不需要缩放动画'
      }), _dec16 = property({
        type: Node,
        displayName: '额外解锁的Node 需要缩放动画'
      }), _dec(_class = (_class2 = class ArrowTower extends (_crd && BuildingBase === void 0 ? (_reportPossibleCrUseOfBuildingBase({
        error: Error()
      }), BuildingBase) : BuildingBase) {
        constructor() {
          super(...arguments);

          /** 箭塔动画 */
          _initializerDefineProperty(this, "animation", _descriptor, this);

          /** 箭塔转动部位模型节点 */
          _initializerDefineProperty(this, "rotationNode", _descriptor2, this);

          /** 基座节点（用于解锁动画）*/
          _initializerDefineProperty(this, "baseNode", _descriptor3, this);

          /** 箭矢发射点 */
          _initializerDefineProperty(this, "firePoint", _descriptor4, this);

          /** 攻击范围 */
          _initializerDefineProperty(this, "attackRange", _descriptor5, this);

          /** 攻击伤害 */
          _initializerDefineProperty(this, "attackDamage", _descriptor6, this);

          /** 攻击速度（次/秒） */
          _initializerDefineProperty(this, "attackSpeed", _descriptor7, this);

          /** 连击次数 */
          _initializerDefineProperty(this, "comboCount", _descriptor8, this);

          /** 是否显示攻击范围 */
          _initializerDefineProperty(this, "showAttackRange", _descriptor9, this);

          /** 是否自动寻找目标 */
          _initializerDefineProperty(this, "autoTarget", _descriptor10, this);

          /** Y轴旋转角度限制（度） */
          _initializerDefineProperty(this, "yRotationLimit", _descriptor11, this);

          /** 旋转速度 */
          _initializerDefineProperty(this, "rotationSpeed", _descriptor12, this);

          // 度/秒

          /** 旋转朝向偏移（度），用于补偿模型朝向与坐标轴的偏差，一般为 0 / 90 / -90 / 180 */
          _initializerDefineProperty(this, "rotationOffset", _descriptor13, this);

          _initializerDefineProperty(this, "extraUnlockNode", _descriptor14, this);

          _initializerDefineProperty(this, "extraUnlockNodeNeedScale", _descriptor15, this);

          // ──────────────────────────────────────────────
          // 私有变量
          // ──────────────────────────────────────────────
          this._currentTarget = null;
          this._lastAttackTime = 0;
          this._attackCooldown = 0;
          this._isActive = true;
          this._tempVec3 = new Vec3();
          this._currentRotationY = 0;
          // 世界空间当前 Y 角（度）
          this._targetRotationY = 0;
          // 世界空间目标 Y 角（度）
          // bow 初始世界欧拉角的 X/Z 分量，每帧只替换 Y，保留模型姿态
          this._rotationNodeBaseEulerX = 0;
          this._rotationNodeBaseEulerZ = 0;
          // 连击相关变量
          this._currentComboCount = 0;
          this._comboInterval = 0.1;
          this._lastComboTime = 0;
          this._isInCombo = false;
        }

        // ──────────────────────────────────────────────
        // 生命周期
        // ──────────────────────────────────────────────
        onLoad() {
          super.onLoad();
          this._attackCooldown = 1 / this.attackSpeed;

          this._validateComponents();

          this._registerEvents();

          this._isActive = this.state === (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).Unlocked; // 直接读取 rotationNode 的世界欧拉角 Y 作为初始值
          // 全程在世界空间操作，避免父节点旋转干扰

          this._currentRotationY = this.rotationNode.eulerAngles.y;
          this._targetRotationY = this._currentRotationY; // 保存 bow 初始世界欧拉角的 X/Z，每帧只替换 Y，保留模型姿态

          this._rotationNodeBaseEulerX = this.rotationNode.eulerAngles.x;
          this._rotationNodeBaseEulerZ = this.rotationNode.eulerAngles.z;
        }

        start() {
          super.start();
        }

        onDestroy() {
          this._unregisterEvents();
        }

        update(dt) {
          if (!this._isActive || !this.autoTarget) return; // 检查连击超时重置

          this._checkComboTimeout(); // 更新当前目标


          this._updateTarget(); // 更新塔朝向（先旋转，再决定是否攻击）


          this._updateTowerRotation(dt); // 检查是否可以攻击


          if (this._canAttack()) {
            this._performAttack();
          }
        } // ──────────────────────────────────────────────
        // 私有方法
        // ──────────────────────────────────────────────


        _validateComponents() {
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

        _registerEvents() {// app.event.on(CommonEvent.GameStart, this._onGameStart, this);
          // app.event.on(CommonEvent.GamePause, this._onGamePause, this);
          // app.event.on(CommonEvent.GameResume, this._onGameResume, this);
        }

        _unregisterEvents() {
          app.event.offAllByTarget(this);
        }
        /**
         * 更新目标
         */


        _updateTarget() {
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


        _findRandomEnemy() {
          var towerPos = this.baseNode ? this.baseNode.getWorldPosition() : this.node.getWorldPosition();
          var enemies = manager.enemy.getRangeEnemies(towerPos, this.attackRange);
          if (enemies.length === 0) return null;
          var randomIndex = Math.floor(Math.random() * enemies.length);
          return enemies[randomIndex].node;
        }
        /**
         * 检查目标是否有效
         */


        _isTargetValid(target) {
          if (!target || !target.isValid) return false;
          var health = target.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
            error: Error()
          }), HealthComponent) : HealthComponent);
          if (health && health.isDead) return false;
          return true;
        }
        /**
         * 获取到目标的距离
         */


        _getDistanceToTarget(target) {
          var towerPos = this.baseNode ? this.baseNode.getWorldPosition() : this.node.getWorldPosition();
          var targetPos = target.getWorldPosition();
          return Vec3.distance(towerPos, targetPos);
        }
        /**
         * 检查是否可以攻击
         */


        _canAttack() {
          if (!this._currentTarget) return false;
          var currentTime = Date.now() / 1000;

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


        _performAttack() {
          if (!this._isInCombo) {
            this._isInCombo = true;
            this._currentComboCount = 0;
          }

          this._currentComboCount++;
          var currentTime = Date.now() / 1000;

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


        _fireArrow() {
          if (!this._currentTarget) return; // 播放箭塔动画

          this.animation && this.animation.play(); // 从对象池获取箭矢节点

          var arrowNode = manager.pool.getNode((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).Arrow, this.node.parent);
          if (!arrowNode) return; // 获取发射点世界坐标

          var startPos = this.firePoint ? this.firePoint.getWorldPosition() : this.node.getWorldPosition(); // 计算朝向目标的方向向量

          var targetPos = this._currentTarget.getWorldPosition();

          var dir = new Vec3();
          Vec3.subtract(dir, targetPos, startPos);
          dir.normalize(); // 设置箭矢参数并发射

          var arrow = arrowNode.getComponent(_crd && Arrow === void 0 ? (_reportPossibleCrUseOfArrow({
            error: Error()
          }), Arrow) : Arrow);

          if (arrow) {
            arrow.damage = this.attackDamage;
            arrow.setTarget(this._currentTarget);
            arrow.fire(startPos, dir);
          }
        }
        /**
         * 重置连击状态
         */


        _resetCombo() {
          this._isInCombo = false;
          this._currentComboCount = 0;
          this._lastComboTime = 0;
        }
        /**
         * 检查连击超时并重置
         */


        _checkComboTimeout() {
          if (!this._isInCombo) return;
          var currentTime = Date.now() / 1000;
          var comboTimeout = 2.0;

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


        _updateTowerRotation(dt) {
          if (!this._currentTarget || !this.rotationNode) return;
          var rotationNodePos = this.rotationNode.getWorldPosition();

          var targetPos = this._currentTarget.getWorldPosition();

          this._tempVec3.set(targetPos).subtract(rotationNodePos);

          this._tempVec3.y = 0;
          if (this._tempVec3.length() <= 0) return;

          this._tempVec3.normalize(); // 世界空间目标 Y 角，加上 rotationOffset 补偿模型朝向偏差


          this._targetRotationY = Math.atan2(this._tempVec3.x, this._tempVec3.z) * 180 / Math.PI + this.rotationOffset; // 归一化到 -180~180

          if (this._targetRotationY > 180) this._targetRotationY -= 360;else if (this._targetRotationY < -180) this._targetRotationY += 360;

          if (this.yRotationLimit > 0) {
            this._targetRotationY = clamp(this._targetRotationY, -this.yRotationLimit, this.yRotationLimit);
          } // 最短角度差插值


          var shortestDiff = this._targetRotationY - this._currentRotationY;
          if (shortestDiff > 180) shortestDiff -= 360;else if (shortestDiff < -180) shortestDiff += 360;
          if (Math.abs(shortestDiff) < 0.1) return;

          if (this.rotationSpeed > 0) {
            var maxRotationThisFrame = this.rotationSpeed * dt;
            var rotationStep = clamp(shortestDiff, -maxRotationThisFrame, maxRotationThisFrame);
            this._currentRotationY += rotationStep;
            if (this._currentRotationY > 180) this._currentRotationY -= 360;else if (this._currentRotationY < -180) this._currentRotationY += 360;
          } else {
            this._currentRotationY = this._targetRotationY;
          } // 世界空间写回：只替换 Y，保留 bow 初始世界 X/Z 姿态


          this.rotationNode.setWorldRotationFromEuler(this._rotationNodeBaseEulerX, this._currentRotationY, this._rotationNodeBaseEulerZ);
        } // ──────────────────────────────────────────────
        // 公开接口
        // ──────────────────────────────────────────────

        /** 获取当前目标 */


        getCurrentTarget() {
          return this._currentTarget;
        }
        /** 手动设置目标 */


        setTarget(target) {
          this._currentTarget = target;
        }
        /** 设置是否激活 */


        setActive(active) {
          this._isActive = active;
        }
        /** 获取攻击范围 */


        getAttackRange() {
          return this.attackRange;
        }
        /** 设置攻击范围 */


        setAttackRange(range) {
          this.attackRange = Math.max(1, range);
        }
        /** 升级箭塔 */


        upgrade(damageBonus, rangeBonus, speedBonus, rotationSpeedBonus) {
          if (damageBonus === void 0) {
            damageBonus = 10;
          }

          if (rangeBonus === void 0) {
            rangeBonus = 2;
          }

          if (speedBonus === void 0) {
            speedBonus = 0.2;
          }

          if (rotationSpeedBonus === void 0) {
            rotationSpeedBonus = 0;
          }

          this.attackDamage += damageBonus;
          this.attackRange += rangeBonus;
          this.attackSpeed += speedBonus;
          this.rotationSpeed += rotationSpeedBonus;
          this._attackCooldown = 1 / this.attackSpeed;
        }
        /** 获取当前旋转角度 */


        getCurrentRotationY() {
          return this._currentRotationY;
        }
        /** 获取目标旋转角度 */


        getTargetRotationY() {
          return this._targetRotationY;
        }
        /** 设置Y轴旋转限制 */


        setYRotationLimit(limit) {
          this.yRotationLimit = Math.max(0, limit);
        }
        /** 设置旋转速度 */


        setRotationSpeed(speed) {
          this.rotationSpeed = Math.max(0, speed);
        } // ──────────────────────────────────────────────
        // BuildingBase 实现
        // ──────────────────────────────────────────────


        init() {
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


        showUnlockAnim() {
          return new Promise(resolve => {
            this.baseNode.active = true;
            this.rotationNode.active = true;
            var oldScale_baseNode = this.baseNode.getScale().clone();
            var oldScale_rotationNode = this.rotationNode.getScale().clone();
            this.baseNode.setScale(0, 0, 0);
            this.rotationNode.setScale(0, 0, 0);
            this.extraUnlockNode.forEach(node => {
              node.active = true;
            });
            this.extraUnlockNodeNeedScale.forEach(node => {
              node.active = true;
              var oldScale = node.getScale().clone();
              node.setScale(0, 0, 0);
              tween(node).to(0.3, {
                scale: oldScale
              }, {
                easing: easing.backOut
              }).start();
            });
            tween(this.baseNode).to(0.4, {
              scale: oldScale_baseNode
            }, {
              easing: easing.backOut
            }).call(() => {
              tween(this.rotationNode).to(0.3, {
                scale: oldScale_rotationNode
              }, {
                easing: easing.backOut
              }).call(() => {
                this._isActive = true;
                resolve();
              }).start();
            }).start();
          });
        }
        /**
         * 显示锁定状态
         */


        showlock() {
          return new Promise(resolve => {
            this.baseNode.active = false;
            this.rotationNode.active = false;
            this._isActive = false;
            resolve();
          });
        }

        onUnlockFinished() {// 可在此添加解锁后的额外逻辑
        }
        /**
         * 在编辑器中绘制攻击范围
         */


        onDrawGizmos() {
          if (!this.showAttackRange) return;
          var pos = this.node.getWorldPosition();
          var segments = 32;
          var angleStep = Math.PI * 2 / segments;

          for (var i = 0; i < segments; i++) {
            var angle1 = i * angleStep;
            var angle2 = (i + 1) * angleStep;
            var x1 = pos.x + Math.cos(angle1) * this.attackRange;
            var z1 = pos.z + Math.sin(angle1) * this.attackRange;
            var x2 = pos.x + Math.cos(angle2) * this.attackRange;
            var z2 = pos.z + Math.sin(angle2) * this.attackRange;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "animation", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rotationNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "baseNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "firePoint", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "attackRange", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 15;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "attackDamage", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 25;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "attackSpeed", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.5;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "comboCount", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "showAttackRange", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "autoTarget", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "yRotationLimit", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "rotationSpeed", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 360;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "rotationOffset", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "extraUnlockNode", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "extraUnlockNodeNeedScale", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a33d22a82dfb2c5f241cfbd59da586cc3e40df3a.js.map