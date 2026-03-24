System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Vec3, CCFloat, BaseAIComponent, StateMachine, ComponentEvent, HealthComponent, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, AutoHuntState, AutoHuntAIComponent;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBaseAIComponent(extras) {
    _reporterNs.report("BaseAIComponent", "./BaseAIComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAITarget(extras) {
    _reporterNs.report("AITarget", "./BaseAIComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfStateMachine(extras) {
    _reporterNs.report("StateMachine", "../StateMachine/StateMachine", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../Common/ComponentEvents", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHealthComponent(extras) {
    _reporterNs.report("HealthComponent", "../Components/HealthComponent", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Vec3 = _cc.Vec3;
      CCFloat = _cc.CCFloat;
    }, function (_unresolved_2) {
      BaseAIComponent = _unresolved_2.BaseAIComponent;
    }, function (_unresolved_3) {
      StateMachine = _unresolved_3.StateMachine;
    }, function (_unresolved_4) {
      ComponentEvent = _unresolved_4.ComponentEvent;
    }, function (_unresolved_5) {
      HealthComponent = _unresolved_5.HealthComponent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "94d4eKtKh5CZaYjvQKKR3Zj", "AutoHuntAIComponent", undefined);

      __checkObsolete__(['_decorator', 'Vec3', 'CCFloat', 'game']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 自动追击敌人状态枚举
       */

      _export("AutoHuntState", AutoHuntState = /*#__PURE__*/function (AutoHuntState) {
        AutoHuntState["Idle"] = "idle";
        AutoHuntState["Patrol"] = "patrol";
        AutoHuntState["Hunt"] = "hunt";
        AutoHuntState["Attack"] = "attack";
        AutoHuntState["Return"] = "return";
        return AutoHuntState;
      }({}));
      /**
       * 自动追击AI组件
       * 实现自动寻找敌人、追击和攻击的功能
       */


      _export("AutoHuntAIComponent", AutoHuntAIComponent = (_dec = ccclass('AutoHuntAIComponent'), _dec2 = property({
        type: CCFloat,
        displayName: '搜索半径',
        range: [1, 50],
        tooltip: '搜索敌人的半径范围'
      }), _dec3 = property({
        type: CCFloat,
        displayName: '追击距离',
        range: [1, 100],
        tooltip: '开始追击敌人的最大距离'
      }), _dec4 = property({
        type: CCFloat,
        displayName: '脱离距离',
        range: [1, 100],
        tooltip: '超过此距离会放弃追击'
      }), _dec5 = property({
        displayName: '启用巡逻',
        tooltip: '是否在空闲时进行巡逻'
      }), _dec6 = property({
        type: CCFloat,
        displayName: '巡逻半径',
        range: [1, 20],
        tooltip: '巡逻的范围半径'
      }), _dec7 = property({
        type: CCFloat,
        displayName: '巡逻停留时间',
        range: [1, 10],
        tooltip: '到达巡逻点后的停留时间'
      }), _dec(_class = (_class2 = class AutoHuntAIComponent extends (_crd && BaseAIComponent === void 0 ? (_reportPossibleCrUseOfBaseAIComponent({
        error: Error()
      }), BaseAIComponent) : BaseAIComponent) {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "searchRadius", _descriptor, this);

          _initializerDefineProperty(this, "huntRange", _descriptor2, this);

          _initializerDefineProperty(this, "maxHuntDistance", _descriptor3, this);

          _initializerDefineProperty(this, "enablePatrol", _descriptor4, this);

          _initializerDefineProperty(this, "patrolRadius", _descriptor5, this);

          _initializerDefineProperty(this, "patrolWaitTime", _descriptor6, this);

          /** 状态机 */
          this._stateMachine = new (_crd && StateMachine === void 0 ? (_reportPossibleCrUseOfStateMachine({
            error: Error()
          }), StateMachine) : StateMachine)();

          /** 初始位置 */
          this._initialPosition = new Vec3();

          /** 当前巡逻目标位置 */
          this._patrolTarget = new Vec3();

          /** 巡逻等待计时器 */
          this._patrolWaitTimer = 0;

          /** 搜索计时器 */
          this._searchTimer = 0;

          /** 搜索间隔 */
          this._searchInterval = 0.5;
        }

        initializeAI() {
          super.initializeAI(); // 记录初始位置

          this._initialPosition.set(this.node.getWorldPosition());
        }

        setInitialPosition(pos) {
          this._initialPosition.set(pos);
        }

        update(dt) {
          super.update(dt);
          if (!this.aiEnabled) return;

          this._stateMachine.update(dt); // 更新搜索计时器


          this._searchTimer += dt;
        }

        makeDecision() {
          // 定期搜索敌人
          if (this._searchTimer >= this._searchInterval) {
            this._searchTimer = 0;
            this.searchForEnemies();
          } // 根据当前状态执行决策


          switch (this._stateMachine.currentState) {
            case AutoHuntState.Idle:
              this.handleIdleDecision();
              break;

            case AutoHuntState.Patrol:
              this.handlePatrolDecision();
              break;

            case AutoHuntState.Hunt:
              this.handleHuntDecision();
              break;

            case AutoHuntState.Attack:
              this.handleAttackDecision();
              break;

            case AutoHuntState.Return:
              this.handleReturnDecision();
              break;
          }
        }

        setupStateMachine() {
          // 注册空闲状态
          this._stateMachine.registerState(AutoHuntState.Idle, {
            onEnter: () => this.onIdleEnter(),
            onUpdate: dt => this.onIdleUpdate(dt),
            onExit: () => this.onIdleExit()
          }); // 注册巡逻状态


          this._stateMachine.registerState(AutoHuntState.Patrol, {
            onEnter: () => this.onPatrolEnter(),
            onUpdate: dt => this.onPatrolUpdate(dt),
            onExit: () => this.onPatrolExit()
          }); // 注册追击状态


          this._stateMachine.registerState(AutoHuntState.Hunt, {
            onEnter: () => this.onHuntEnter(),
            onUpdate: dt => this.onHuntUpdate(dt),
            onExit: () => this.onHuntExit()
          }); // 注册攻击状态


          this._stateMachine.registerState(AutoHuntState.Attack, {
            onEnter: () => this.onAttackEnter(),
            onUpdate: dt => this.onAttackUpdate(dt),
            onExit: () => this.onAttackExit()
          }); // 注册返回状态


          this._stateMachine.registerState(AutoHuntState.Return, {
            onEnter: () => this.onReturnEnter(),
            onUpdate: dt => this.onReturnUpdate(dt),
            onExit: () => this.onReturnExit()
          });

          this._stateMachine.changeState(AutoHuntState.Idle);
        }
        /**
         * 搜索敌人
         */


        searchForEnemies() {
          var targets = this.character.searchForAttackTarget(this.searchRadius);

          for (var i = 0; i < targets.length; i++) {
            var target = targets[i];

            if (target && manager.game.isCanHunted(target.node)) {
              // 检查目标是否已死亡
              var healthComponent = target.node.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
                error: Error()
              }), HealthComponent) : HealthComponent);

              if (healthComponent && healthComponent.isDead) {
                continue; // 跳过已死亡的目标
              }

              this.currentTarget = {
                node: target.node,
                priority: 1,
                distance: Math.sqrt(target.squaredDistance),
                lastSeenTime: Date.now()
              };
              break;
            }
          }
        }
        /**
         * 生成随机巡逻点（进行安全位置检测）
         */


        generatePatrolPoint() {
          var maxAttempts = 20; // 最大重试次数

          var attempts = 0;

          while (attempts < maxAttempts) {
            attempts++; // 生成随机角度和距离

            var angle = Math.random() * Math.PI * 2;
            var distance = Math.random() * this.patrolRadius; // 计算巡逻点位置

            var patrolPoint = new Vec3();
            patrolPoint.x = this._initialPosition.x + Math.cos(angle) * distance;
            patrolPoint.z = this._initialPosition.z + Math.sin(angle) * distance;
            patrolPoint.y = this._initialPosition.y; // 检测位置是否安全（不在家触发器范围内）

            if (manager.enemy && manager.enemy.isPositionSafeFromHome(patrolPoint)) {
              // console.log(`巡逻点安全位置生成成功，尝试次数: ${attempts}`);
              return patrolPoint;
            }
          } // 如果超过最大尝试次数，返回初始位置作为后备方案
          //console.warn(`巡逻点安全位置生成失败，使用初始位置，总尝试次数: ${attempts}`);


          return this._initialPosition.clone();
        } // ==================== 决策处理方法 ====================


        handleIdleDecision() {
          if (this.currentTarget) {
            this._stateMachine.changeState(AutoHuntState.Hunt);
          } else if (this.enablePatrol) {
            this._stateMachine.changeState(AutoHuntState.Patrol);
          }
        }

        handlePatrolDecision() {
          if (this.currentTarget) {
            this._stateMachine.changeState(AutoHuntState.Hunt);

            return;
          } // 检查是否到达巡逻点


          var currentPos = this.node.getWorldPosition();
          var distance = Vec3.distance(currentPos, this._patrolTarget);

          if (distance <= this.character.movementComponent.ArriveDistance) {
            // 到达巡逻点，等待一段时间后选择新的巡逻点
            this._patrolWaitTimer += this.decisionInterval;

            if (this._patrolWaitTimer >= this.patrolWaitTime) {
              this._patrolTarget = this.generatePatrolPoint();
              this.character.movementComponent.moveToWorldPosition(this._patrolTarget);
              this._patrolWaitTimer = 0;
            }
          }
        }

        handleHuntDecision() {
          if (!this.currentTarget || !this.currentTarget.node.isValid) {
            this.currentTarget = null;

            this._stateMachine.changeState(AutoHuntState.Return);

            return;
          } // 检查目标是否已死亡


          var healthComponent = this.currentTarget.node.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
            error: Error()
          }), HealthComponent) : HealthComponent);

          if (healthComponent && healthComponent.isDead) {
            this.currentTarget = null;

            this._stateMachine.changeState(AutoHuntState.Idle); // 重新寻找新目标


            return;
          } // 检查当前目标是否还能被追击


          if (!manager.game.isCanHunted(this.currentTarget.node)) {
            this.currentTarget = null;

            this._stateMachine.changeState(AutoHuntState.Return);

            return;
          }

          var currentPos = this.node.getWorldPosition();
          var targetPos = this.currentTarget.node.getWorldPosition();
          var distance = Vec3.distance(currentPos, targetPos); // 更新目标距离

          this.currentTarget.distance = distance; // 检查是否超出最大追击距离

          if (distance > this.maxHuntDistance) {
            this.currentTarget = null;

            this._stateMachine.changeState(AutoHuntState.Return);

            return;
          } // 检查是否到达攻击距离


          var attackRange = this.character.attackComponent.attackRangeValue;

          if (distance <= attackRange) {
            this._stateMachine.changeState(AutoHuntState.Attack);
          }
        }

        handleAttackDecision() {
          if (!this.currentTarget || !this.currentTarget.node.isValid) {
            this.currentTarget = null;

            this._stateMachine.changeState(AutoHuntState.Return);

            return;
          } // 检查目标是否已死亡


          var healthComponent = this.currentTarget.node.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
            error: Error()
          }), HealthComponent) : HealthComponent);

          if (healthComponent && healthComponent.isDead) {
            this.currentTarget = null;

            this._stateMachine.changeState(AutoHuntState.Idle); // 重新寻找新目标


            return;
          } // 检查当前目标是否还能被攻击


          if (!manager.game.isCanHunted(this.currentTarget.node)) {
            this.currentTarget = null;

            this._stateMachine.changeState(AutoHuntState.Return);

            return;
          }

          var currentPos = this.node.getWorldPosition();
          var targetPos = this.currentTarget.node.getWorldPosition();
          var distance = Vec3.distance(currentPos, targetPos);
          var attackRange = this.character.attackComponent.attackRangeValue; // 如果敌人离开攻击范围，继续追击

          if (distance > attackRange) {
            this._stateMachine.changeState(AutoHuntState.Hunt);
          }
        }

        handleReturnDecision() {
          var currentPos = this.node.getWorldPosition();
          var distance = Vec3.distance(currentPos, this._initialPosition); // 如果已经回到初始位置附近

          if (distance <= this.character.movementComponent.ArriveDistance) {
            this._stateMachine.changeState(AutoHuntState.Idle);
          }
        } // ==================== 状态回调方法 ====================


        onIdleEnter() {
          this.character.movementComponent.stopMovingToTarget();
        }

        onIdleUpdate(dt) {// 空闲状态的更新逻辑
        }

        onIdleExit() {// 退出空闲状态的清理工作
        }

        onPatrolEnter() {
          this._patrolTarget = this.generatePatrolPoint();
          this.character.movementComponent.moveToWorldPosition(this._patrolTarget);
          this._patrolWaitTimer = 0;
        }

        onPatrolUpdate(dt) {// 巡逻状态的更新逻辑
        }

        onPatrolExit() {
          this.character.movementComponent.stopMovingToTarget();
        }

        onHuntEnter() {
          if (this.currentTarget) {
            var targetPos = this.currentTarget.node.getWorldPosition();
            this.character.movementComponent.moveToWorldPosition(targetPos);
          }
        }

        onHuntUpdate(dt) {
          var _this$currentTarget$n;

          // 持续追踪目标位置
          if (this.currentTarget && this.currentTarget.node.isValid && !((_this$currentTarget$n = this.currentTarget.node.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
            error: Error()
          }), HealthComponent) : HealthComponent)) != null && _this$currentTarget$n.isDead)) {
            // 检查目标是否还能被追击
            if (!manager.game.isCanHunted(this.currentTarget.node)) {
              this.currentTarget = null;

              this._stateMachine.changeState(AutoHuntState.Return);

              return;
            }

            var targetPos = this.currentTarget.node.getWorldPosition();
            this.character.movementComponent.moveToWorldPosition(targetPos);
          }
        }

        onHuntExit() {// 退出追击状态
        }

        onAttackEnter() {
          this.character.movementComponent.stopMovingToTarget();
        }

        onAttackUpdate(dt) {
          var _this$currentTarget$n2;

          // 朝向目标并攻击
          if (this.currentTarget && this.currentTarget.node.isValid && !((_this$currentTarget$n2 = this.currentTarget.node.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
            error: Error()
          }), HealthComponent) : HealthComponent)) != null && _this$currentTarget$n2.isDead)) {
            // 检查目标是否还能被攻击
            if (!manager.game.isCanHunted(this.currentTarget.node)) {
              this.currentTarget = null;

              this._stateMachine.changeState(AutoHuntState.Return);

              return;
            } // 朝向目标


            var currentPos = this.node.getWorldPosition();
            var targetPos = this.currentTarget.node.getWorldPosition();
            var direction = new Vec3();
            Vec3.subtract(direction, targetPos, currentPos);
            direction.normalize(); // this.character.movementComponent.updateFaceDirectionFrom3D(direction);

            this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
              error: Error()
            }), ComponentEvent) : ComponentEvent).SET_FACE_DIRECTION_FROM_3D, direction); // 尝试攻击

            if (this.character.attackComponent.canAttack()) {
              this.character.attack();
            }
          }
        }

        onAttackExit() {// 退出攻击状态
        }

        onReturnEnter() {
          this.character.movementComponent.moveToWorldPosition(this._initialPosition);
        }

        onReturnUpdate(dt) {// 返回状态的更新逻辑
        }

        onReturnExit() {// 退出返回状态
        } // ==================== 公共方法 ====================

        /**
         * 设置搜索半径
         */


        setSearchRadius(radius) {
          this.searchRadius = radius;
        }
        /**
         * 设置追击距离
         */


        setHuntRange(range) {
          this.huntRange = range;
        }
        /**
         * 启用/禁用AI
         */


        setAIEnabled(enabled) {
          this.aiEnabled = enabled; // console.warn('setAIEnabled', enabled);

          if (!enabled) {
            this.currentTarget = null;

            this._stateMachine.changeState(AutoHuntState.Idle);
          }
        }
        /**
         * 获取当前状态
         */


        getCurrentState() {
          return this._stateMachine.currentState;
        }
        /**
         * 强制切换到指定状态
         */


        forceChangeState(state) {
          this._stateMachine.changeState(state);
        }
        /**
         * 设置是否启用巡逻
         */


        setPatrolEnabled(enabled) {
          this.enablePatrol = enabled;
        }
        /**
         * 设置巡逻参数
         */


        setPatrolParams(radius, waitTime) {
          this.patrolRadius = radius;
          this.patrolWaitTime = waitTime;
        }
        /**
         * 设置最大追击距离
         */


        setMaxHuntDistance(distance) {
          this.maxHuntDistance = distance;
        }
        /**
         * 获取当前目标
         */


        getCurrentTarget() {
          return this.currentTarget;
        }
        /**
         * 清除当前目标
         */


        clearTarget() {
          this.currentTarget = null;

          this._stateMachine.changeState(AutoHuntState.Idle);
        }
        /**
         * 获取初始位置
         */


        getInitialPosition() {
          return this._initialPosition.clone();
        }
        /**
         * 重置到初始位置
         */


        resetToInitialPosition() {
          this._initialPosition.set(this.node.getWorldPosition()); // 检查状态机是否已经初始化（是否有注册的状态）


          if (this._stateMachine && this._stateMachine.hasState(AutoHuntState.Idle)) {
            this._stateMachine.changeState(AutoHuntState.Idle);
          }
        }

        reset() {
          super.reset();
          this.currentTarget = null; // 检查状态机是否已经初始化（是否有注册的状态）

          if (this._stateMachine && this._stateMachine.hasState(AutoHuntState.Idle)) {
            this._stateMachine.changeState(AutoHuntState.Idle);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "searchRadius", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "huntRange", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 15;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "maxHuntDistance", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 20;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "enablePatrol", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "patrolRadius", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "patrolWaitTime", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c4116565f0398337201d4f70b3bbde887a1e1cf9.js.map