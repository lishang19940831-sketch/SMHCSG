System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Node, Vec3, Animation, clamp, Enum, tween, easing, ParticleSystem, ObjectType, BuildingType, BuildUnlockState, HealthComponent, BulletBase, BuildingBase, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _crd, ccclass, property, TurretTower;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildingType(extras) {
    _reporterNs.report("BuildingType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildUnlockState(extras) {
    _reporterNs.report("BuildUnlockState", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHealthComponent(extras) {
    _reporterNs.report("HealthComponent", "../Components/HealthComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBulletBase(extras) {
    _reporterNs.report("BulletBase", "../Bullet/BulletBase", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildingBase(extras) {
    _reporterNs.report("BuildingBase", "./BuildingBase", _context.meta, extras);
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
      Animation = _cc.Animation;
      clamp = _cc.clamp;
      Enum = _cc.Enum;
      tween = _cc.tween;
      easing = _cc.easing;
      ParticleSystem = _cc.ParticleSystem;
    }, function (_unresolved_2) {
      ObjectType = _unresolved_2.ObjectType;
      BuildingType = _unresolved_2.BuildingType;
      BuildUnlockState = _unresolved_2.BuildUnlockState;
    }, function (_unresolved_3) {
      HealthComponent = _unresolved_3.HealthComponent;
    }, function (_unresolved_4) {
      BulletBase = _unresolved_4.BulletBase;
    }, function (_unresolved_5) {
      BuildingBase = _unresolved_5.BuildingBase;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8615d4sVDFOnKhVCCRM0rhw", "TurretTower", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'Animation', 'instantiate', 'clamp', 'Enum', 'tween', 'Vec3', 'easing', 'ParticleSystem']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 箭塔类 - 自动寻找并攻击最近的敌人，继承自建筑基类
       */

      _export("TurretTower", TurretTower = (_dec = ccclass('TurretTower'), _dec2 = property({
        type: Animation,
        displayName: '炮塔动画'
      }), _dec3 = property({
        type: Node,
        displayName: '炮塔攻击粒子'
      }), _dec4 = property({
        type: Node,
        displayName: '炮塔转动部位模型节点'
      }), _dec5 = property({
        type: Node,
        displayName: '基座节点'
      }), _dec6 = property({
        type: Enum(_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
          error: Error()
        }), ObjectType) : ObjectType),
        displayName: '箭矢类型'
      }), _dec7 = property({
        type: Node,
        displayName: '箭矢发射点'
      }), _dec8 = property({
        displayName: '攻击范围',
        tooltip: '箭塔的攻击半径'
      }), _dec9 = property({
        displayName: '攻击伤害',
        tooltip: '每次攻击造成的伤害'
      }), _dec10 = property({
        displayName: '攻击速度',
        tooltip: '每秒攻击次数'
      }), _dec11 = property({
        displayName: '连击次数',
        tooltip: '连续攻击次数'
      }), _dec12 = property({
        displayName: '箭矢速度',
        tooltip: '箭矢飞行速度'
      }), _dec13 = property({
        displayName: '显示攻击范围',
        tooltip: '是否在编辑器中显示攻击范围'
      }), _dec14 = property({
        displayName: '自动瞄准',
        tooltip: '是否自动寻找最近的敌人'
      }), _dec15 = property({
        displayName: 'Y轴旋转限制',
        tooltip: '限制rotationNode的Y轴旋转角度，0表示无限制',
        range: [0, 180]
      }), _dec16 = property({
        displayName: '旋转速度',
        tooltip: 'rotationNode旋转到目标位置的速度'
      }), _dec17 = property({
        displayName: '结束节点',
        tooltip: '结束节点'
      }), _dec(_class = (_class2 = class TurretTower extends (_crd && BuildingBase === void 0 ? (_reportPossibleCrUseOfBuildingBase({
        error: Error()
      }), BuildingBase) : BuildingBase) {
        constructor(...args) {
          super(...args);

          /** 炮塔动画 */
          _initializerDefineProperty(this, "animation", _descriptor, this);

          /** 炮塔攻击粒子 */
          _initializerDefineProperty(this, "attEff", _descriptor2, this);

          /** 炮塔转动部位模型节点 */
          _initializerDefineProperty(this, "rotationNode", _descriptor3, this);

          /** 基座节点（用于解锁动画）*/
          _initializerDefineProperty(this, "baseNode", _descriptor4, this);

          /** 箭矢预制体 */
          _initializerDefineProperty(this, "arrowType", _descriptor5, this);

          /** 箭矢发射点 */
          _initializerDefineProperty(this, "firePoint", _descriptor6, this);

          /** 攻击范围 */
          _initializerDefineProperty(this, "attackRange", _descriptor7, this);

          /** 攻击伤害 */
          _initializerDefineProperty(this, "attackDamage", _descriptor8, this);

          /** 攻击速度（次/秒） */
          _initializerDefineProperty(this, "attackSpeed", _descriptor9, this);

          /** 连击次数 */
          _initializerDefineProperty(this, "comboCount", _descriptor10, this);

          /** 箭矢速度 */
          _initializerDefineProperty(this, "arrowSpeed", _descriptor11, this);

          /** 是否显示攻击范围 */
          _initializerDefineProperty(this, "showAttackRange", _descriptor12, this);

          /** 是否自动寻找目标 */
          _initializerDefineProperty(this, "autoTarget", _descriptor13, this);

          /** Y轴旋转角度限制（度） */
          _initializerDefineProperty(this, "yRotationLimit", _descriptor14, this);

          /** 旋转速度 */
          _initializerDefineProperty(this, "rotationSpeed", _descriptor15, this);

          // 度/秒

          /** 旋转速度 */
          _initializerDefineProperty(this, "endNode", _descriptor16, this);

          // 私有变量
          this._currentTarget = null;
          this._lastAttackTime = 0;
          this._attackCooldown = 0;
          this._isActive = true;
          this._tempVec3 = new Vec3();
          this._tempVec3_2 = new Vec3();
          this._currentRotationY = 180;
          // 当前Y轴旋转角度
          this._targetRotationY = 0;
          // 目标Y轴旋转角度
          // 连击相关变量
          this._currentComboCount = 0;
          // 当前连击数
          this._comboInterval = 0.1;
          // 连击间隔时间（秒）
          this._lastComboTime = 0;
          // 上次连击时间
          this._isInCombo = false;
        }

        // 是否正在连击中
        onLoad() {
          super.onLoad();
          this._attackCooldown = 1 / this.attackSpeed;

          this._validateComponents();

          this._registerEvents(); // 初始化时根据建筑状态设置激活状态


          this._isActive = this.state === (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).Unlocked;
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
        }
        /**
         * 验证必要组件
         */


        _validateComponents() {
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


        _registerEvents() {// app.event.on(CommonEvent.GamePause, this._onGamePause, this);
          // app.event.on(CommonEvent.GameResume, this._onGameResume, this);
        }
        /**
         * 注销事件
         */


        _unregisterEvents() {
          app.event.offAllByTarget(this);
        }
        /**
         * 游戏胜利回调
         */


        onUnlockItem(type) {
          if (type === this.type && this.state === (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).Active) {
            this.UnlockBuilding();
          }

          if (type == (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).Wall1) this.autoTarget = false;
        }
        /**
         * 更新目标
         */


        _updateTarget() {
          // 检查当前目标是否仍然有效
          if (this._currentTarget && this._isTargetValid(this._currentTarget)) {
            // 检查目标是否还在攻击范围内
            if (this._getDistanceToTarget(this._currentTarget) <= this.attackRange) {
              return; // 目标仍然有效
            }
          } // 寻找新的目标


          this._currentTarget = this._findNearestEnemy();
        }
        /**
         * 寻找最近的敌人
         */


        _findNearestEnemy() {
          const towerPos = this.node.getWorldPosition();
          const enemies = manager.enemy.getRangeEnemies(towerPos, this.attackRange);
          if (enemies.length === 0) return null; // 返回最近的敌人（getRangeEnemies 已经按距离排序）

          return enemies[0].node;
        }
        /**
         * 检查目标是否有效
         */


        _isTargetValid(target) {
          if (!target || !target.isValid) return false; // 检查敌人是否死亡

          const health = target.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
            error: Error()
          }), HealthComponent) : HealthComponent);
          if (health && health.isDead) return false;
          return true;
        }
        /**
         * 获取到目标的距离
         */


        _getDistanceToTarget(target) {
          const towerPos = this.node.getWorldPosition();
          const targetPos = target.getWorldPosition();
          return Vec3.distance(towerPos, targetPos);
        }
        /**
         * 检查是否可以攻击
         */


        _canAttack() {
          if (!this._currentTarget) return false;
          const currentTime = Date.now() / 1000; // 如果正在连击中

          if (this._isInCombo) {
            // 检查是否还有连击次数
            if (this._currentComboCount >= this.comboCount) {
              return false; // 连击已完成，等待下一轮攻击
            } // 检查连击间隔


            return currentTime - this._lastComboTime >= this._comboInterval;
          } // 正常攻击冷却检查


          return currentTime - this._lastAttackTime >= this._attackCooldown;
        }
        /**
         * 执行攻击
         */


        _performAttack() {
          // 开始连击或继续连击
          if (!this._isInCombo) {
            this._isInCombo = true;
            this._currentComboCount = 0;
          }

          this._currentComboCount++;
          const currentTime = Date.now() / 1000; // 发射箭矢

          this._fireArrow(); // 更新连击时间


          this._lastComboTime = currentTime; // 如果还有连击次数，安排下一次连击

          if (this._currentComboCount < this.comboCount) {// 继续连击，不更新主攻击时间
          } else {
            // 连击结束，更新主攻击时间并重置连击状态
            this._lastAttackTime = currentTime;

            this._resetCombo();
          }
        }
        /**
         * 发射单发箭矢
         */


        _fireArrow() {
          var _this$node$parent;

          const arrowNode = manager.pool.getNode(this.arrowType); // 设置箭矢位置

          const firePos = this.firePoint.getWorldPosition();
          arrowNode.setWorldPosition(firePos); // 获取箭矢组件

          const arrow = arrowNode.getComponent(_crd && BulletBase === void 0 ? (_reportPossibleCrUseOfBulletBase({
            error: Error()
          }), BulletBase) : BulletBase);

          if (!arrow) {
            arrowNode.destroy();
            return;
          } // 配置箭矢属性


          arrow.damage = this.attackDamage;
          arrow.speed = this.arrowSpeed;
          arrow.moveType = 1; // PARABOLA 抛物线类型

          arrow.targetType = 1; // TRACKING 类型

          arrow.setTarget(this._currentTarget); // 添加到场景

          (_this$node$parent = this.node.parent) == null || _this$node$parent.addChild(arrowNode); // 发射箭矢

          const direction = this._calculateFireDirection();

          arrow.fire(firePos, direction);
          app.audio.playEffect('resources/audio/射箭', 0.6); // 播放发射特效（可选）

          this._playFireEffect();
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


        _calculateFireDirection() {
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


        _updateTowerRotation(dt) {
          if (!this._currentTarget || !this.rotationNode) return; // 计算从rotationNode到目标的方向向量

          const rotationNodePos = this.rotationNode.getWorldPosition();

          const targetPos = this._currentTarget.getWorldPosition(); // 计算方向向量（Y轴指向目标）


          this._tempVec3.set(targetPos).subtract(rotationNodePos); // 只在水平面旋转，忽略Y轴差异


          this._tempVec3.y = 0;
          if (this._tempVec3.length() <= 0) return;

          this._tempVec3.normalize(); // 计算目标Y轴旋转角度（使节点的Y轴指向目标）


          this._targetRotationY = Math.atan2(this._tempVec3.x, this._tempVec3.z) * 180 / Math.PI; // 应用旋转限制 - 基于初始角度的相对限制

          if (this.yRotationLimit > 0) {
            // 计算相对于初始位置的角度限制
            const relativeTargetAngle = this._targetRotationY;
            const clampedAngle = clamp(relativeTargetAngle, -this.yRotationLimit, this.yRotationLimit);
            this._targetRotationY = clampedAngle;
          } // 检查是否需要旋转（优化性能）


          const angleDiff = Math.abs(this._targetRotationY - this._currentRotationY);
          if (angleDiff < 0.1) return; // 如果角度差异很小，不需要旋转
          // 平滑旋转到目标角度

          if (this.rotationSpeed > 0) {
            const maxRotationThisFrame = this.rotationSpeed * dt; // 选择最短旋转路径

            let shortestDiff = this._targetRotationY - this._currentRotationY;

            if (Math.abs(shortestDiff) > 180) {
              shortestDiff = shortestDiff > 0 ? shortestDiff - 360 : shortestDiff + 360;
            }

            const rotationStep = clamp(shortestDiff, -maxRotationThisFrame, maxRotationThisFrame);
            this._currentRotationY += rotationStep; // 标准化角度到 -180 到 180 范围

            this._currentRotationY = (this._currentRotationY + 180) % 360 - 180;
          } else {
            // 直接设置旋转
            this._currentRotationY = this._targetRotationY;
          } // 应用旋转到rotationNode，只改变Y轴


          this.rotationNode.setWorldRotationFromEuler(0, this._currentRotationY, 0);
        }
        /**
         * 播放发射特效
         */


        _playFireEffect() {
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


        _onGameStart() {
          this._isActive = true;
        }
        /**
         * 游戏暂停回调
         */


        _onGamePause() {
          this._isActive = false;
        }
        /**
         * 游戏恢复回调
         */


        _onGameResume() {
          this._isActive = true;
        }
        /**
         * 获取当前目标
         */


        getCurrentTarget() {
          return this._currentTarget;
        }
        /**
         * 手动设置目标
         */


        setTarget(target) {
          this._currentTarget = target;
        }
        /**
         * 设置是否激活
         */


        setActive(active) {
          this._isActive = active;
        }
        /**
         * 获取攻击范围
         */


        getAttackRange() {
          return this.attackRange;
        }
        /**
         * 设置攻击范围
         */


        setAttackRange(range) {
          this.attackRange = Math.max(1, range);
        }
        /**
         * 升级箭塔
         */


        upgrade(damageBonus = 10, rangeBonus = 2, speedBonus = 0.2, rotationSpeedBonus = 0) {
          this.attackDamage += damageBonus;
          this.attackRange += rangeBonus;
          this.attackSpeed += speedBonus;
          this.rotationSpeed += rotationSpeedBonus;
          this._attackCooldown = 1 / this.attackSpeed;
        }
        /**
         * 获取当前旋转角度
         */


        getCurrentRotationY() {
          return this._currentRotationY;
        }
        /**
         * 获取目标旋转角度
         */


        getTargetRotationY() {
          return this._targetRotationY;
        }
        /**
         * 设置Y轴旋转限制
         */


        setYRotationLimit(limit) {
          this.yRotationLimit = Math.max(0, limit);
        }
        /**
         * 设置旋转速度
         */


        setRotationSpeed(speed) {
          this.rotationSpeed = Math.max(0, speed);
        }
        /**
         * 显示解锁动画
         * 动画序列：
         * 1. 基座节点从0缩放到1（0.3秒）
         * 2. 旋转节点从0缩放到1（0.2秒，延迟0.3秒）
         */


        showUnlockAnim() {
          return new Promise(resolve => {
            // 初始化缩放为0
            this.baseNode.active = true;
            this.rotationNode.active = true;
            this.baseNode.setScale(0, 0, 0);
            this.rotationNode.setScale(0, 0, 0); // 基座节点缩放动画

            tween(this.baseNode).to(0.4, {
              scale: Vec3.ONE
            }, {
              easing: easing.backOut
            }).call(() => {
              // 基座动画完成后，开始旋转节点动画
              tween(this.rotationNode).to(0.3, {
                scale: Vec3.ONE
              }, {
                easing: easing.backOut
              }).call(() => {
                // 动画完成后激活箭塔功能
                this._isActive = true;
                resolve();
              }).start();
            }).start();
          });
        }
        /**
         * 显示锁定状态
         * 锁定状态下缩放为0，不激活功能
         */


        showlock() {
          return new Promise(resolve => {
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


        onUnlockFinished() {//console.log('箭塔解锁完成，开始激活功能');
          // 可以在这里添加额外的解锁效果，如粒子特效、音效等
        }
        /**
         * 在编辑器中绘制攻击范围
         */


        onDrawGizmos() {
          if (!this.showAttackRange) return;
          const pos = this.node.getWorldPosition(); // 绘制攻击范围圆圈

          const segments = 32;
          const angleStep = Math.PI * 2 / segments;

          for (let i = 0; i < segments; i++) {
            const angle1 = i * angleStep;
            const angle2 = (i + 1) * angleStep;
            const x1 = pos.x + Math.cos(angle1) * this.attackRange;
            const z1 = pos.z + Math.sin(angle1) * this.attackRange;
            const x2 = pos.x + Math.cos(angle2) * this.attackRange;
            const z2 = pos.z + Math.sin(angle2) * this.attackRange; // 这里应该使用 Cocos Creator 的 Gizmos API，但为简化使用 console.log
            // 在实际项目中应该使用: Gizmos.drawLine(new Vec3(x1, pos.y, z1), new Vec3(x2, pos.y, z2));
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "animation", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "attEff", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rotationNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "baseNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "arrowType", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).Arrow;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "firePoint", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "attackRange", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 15;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "attackDamage", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 25;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "attackSpeed", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1.5;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "comboCount", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "arrowSpeed", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 20;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "showAttackRange", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "autoTarget", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "yRotationLimit", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "rotationSpeed", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 360;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "endNode", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=fab10cd33517c612dfea0d2eae8ad503327f5c75.js.map