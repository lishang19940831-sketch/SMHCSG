System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Collider, NodeEventType, HealthComponent, MovementComponent, AttackComponent, StateComponent, CharacterState, FrameEventId, ComponentEvent, ComponentInitializer, BaseAnimationComponent, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, Character;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfHealthComponent(extras) {
    _reporterNs.report("HealthComponent", "../Components/HealthComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMovementComponent(extras) {
    _reporterNs.report("MovementComponent", "../Components/MovementComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAttackComponent(extras) {
    _reporterNs.report("AttackComponent", "../Components/AttackComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfStateComponent(extras) {
    _reporterNs.report("StateComponent", "../Components/StateComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCharacterState(extras) {
    _reporterNs.report("CharacterState", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfFrameEventId(extras) {
    _reporterNs.report("FrameEventId", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../../Main/Common/ComponentEvents", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentInitializer(extras) {
    _reporterNs.report("ComponentInitializer", "../../Main/Common/ComponentInitializer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBaseAnimationComponent(extras) {
    _reporterNs.report("BaseAnimationComponent", "../Components/BaseAnimationComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDamageData(extras) {
    _reporterNs.report("DamageData", "../../Main/Common/CommonInterface", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Collider = _cc.Collider;
      NodeEventType = _cc.NodeEventType;
    }, function (_unresolved_2) {
      HealthComponent = _unresolved_2.HealthComponent;
    }, function (_unresolved_3) {
      MovementComponent = _unresolved_3.MovementComponent;
    }, function (_unresolved_4) {
      AttackComponent = _unresolved_4.AttackComponent;
    }, function (_unresolved_5) {
      StateComponent = _unresolved_5.StateComponent;
    }, function (_unresolved_6) {
      CharacterState = _unresolved_6.CharacterState;
      FrameEventId = _unresolved_6.FrameEventId;
    }, function (_unresolved_7) {
      ComponentEvent = _unresolved_7.ComponentEvent;
    }, function (_unresolved_8) {
      ComponentInitializer = _unresolved_8.ComponentInitializer;
    }, function (_unresolved_9) {
      BaseAnimationComponent = _unresolved_9.BaseAnimationComponent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b5f2fsiTTVIN7S59WfGD+Ox", "Character", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Collider', 'ICollisionEvent', 'NodeEventType']);

      __checkObsolete__(['Vec3']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 角色组件 - 基于组件化设计的角色基类
       */

      _export("Character", Character = (_dec = ccclass('Character'), _dec2 = property({
        type: _crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
          error: Error()
        }), HealthComponent) : HealthComponent,
        displayName: '健康组件'
      }), _dec3 = property({
        type: _crd && MovementComponent === void 0 ? (_reportPossibleCrUseOfMovementComponent({
          error: Error()
        }), MovementComponent) : MovementComponent,
        displayName: '移动组件'
      }), _dec4 = property({
        type: _crd && AttackComponent === void 0 ? (_reportPossibleCrUseOfAttackComponent({
          error: Error()
        }), AttackComponent) : AttackComponent,
        displayName: '攻击组件'
      }), _dec5 = property({
        type: _crd && BaseAnimationComponent === void 0 ? (_reportPossibleCrUseOfBaseAnimationComponent({
          error: Error()
        }), BaseAnimationComponent) : BaseAnimationComponent,
        displayName: '动画组件'
      }), _dec6 = property({
        type: _crd && StateComponent === void 0 ? (_reportPossibleCrUseOfStateComponent({
          error: Error()
        }), StateComponent) : StateComponent,
        displayName: '状态组件'
      }), _dec7 = property({
        type: Node,
        displayName: 'UI节点',
        tooltip: '需要始终面向Z轴的UI节点'
      }), _dec(_class = (_class2 = class Character extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "healthComponent", _descriptor, this);

          _initializerDefineProperty(this, "movementComponent", _descriptor2, this);

          _initializerDefineProperty(this, "attackComponent", _descriptor3, this);

          _initializerDefineProperty(this, "animationComponent", _descriptor4, this);

          _initializerDefineProperty(this, "stateComponent", _descriptor5, this);

          _initializerDefineProperty(this, "uiNode", _descriptor6, this);

          /** 碰撞器组件 */
          this.collider = null;

          /** 是否支持移动攻击 */
          this.supportMoveAttack = false;
        }

        onLoad() {
          this.initComponents();
          this.registerComponentEvents();
          this.initCollider();
          this.registerEvents();
        }
        /**
         * 初始化组件引用
         */


        initComponents() {
          // 使用组件初始化器简化组件获取和创建
          (_crd && ComponentInitializer === void 0 ? (_reportPossibleCrUseOfComponentInitializer({
            error: Error()
          }), ComponentInitializer) : ComponentInitializer).initComponents(this.node, {
            healthComponent: _crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
              error: Error()
            }), HealthComponent) : HealthComponent,
            movementComponent: _crd && MovementComponent === void 0 ? (_reportPossibleCrUseOfMovementComponent({
              error: Error()
            }), MovementComponent) : MovementComponent,
            attackComponent: _crd && AttackComponent === void 0 ? (_reportPossibleCrUseOfAttackComponent({
              error: Error()
            }), AttackComponent) : AttackComponent,
            stateComponent: _crd && StateComponent === void 0 ? (_reportPossibleCrUseOfStateComponent({
              error: Error()
            }), StateComponent) : StateComponent
          }, this);
        }
        /**
         * 注册组件事件监听
         */


        registerComponentEvents() {
          // 设置健康组件关联
          this.healthComponent.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).DEAD, this.onDead, this);
          this.healthComponent.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).HURT, this.onHurt, this); // 设置移动组件关联

          this.movementComponent.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).TARGET_REACHED, this.onTargetReached, this);
          this.movementComponent.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).MOVE_STATE_UPDATE, this.onMoveStateUpdate, this); // 设置攻击组件关联

          this.attackComponent.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).ATTACK_START, this.onAttackStart, this);
          this.attackComponent.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).ATTACK_ANI_END, this.onAttackEnd, this);
          this.attackComponent.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).PERFORM_ATTACK, this.onPerformAttack, this); // 设置动画组件关联

          this.animationComponent.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).ANIMATION_COMPLETE, this.onAnimationComplete, this); // 设置状态组件回调

          this.setupStateCallbacks();
        }
        /**
         * 设置状态回调
         */


        setupStateCallbacks() {
          this.stateComponent.setStateEnterCallback((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Idle, this.onIdleEnter.bind(this));
          this.stateComponent.setStateUpdateCallback((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Idle, this.onIdleUpdate.bind(this));
          this.stateComponent.setStateEnterCallback((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Move, this.onMoveEnter.bind(this));
          this.stateComponent.setStateUpdateCallback((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Move, this.onMoveUpdate.bind(this));
          this.stateComponent.setStateExitCallback((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Move, this.onMoveExit.bind(this));
          this.stateComponent.setStateEnterCallback((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Attack, this.onAttackEnter.bind(this));
          this.stateComponent.setStateUpdateCallback((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Attack, this.onAttackUpdate.bind(this));
          this.stateComponent.setStateExitCallback((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Attack, this.onAttackExit.bind(this));
          this.stateComponent.setStateEnterCallback((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Skill, this.onSkillEnter.bind(this));
          this.stateComponent.setStateUpdateCallback((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Skill, this.onSkillUpdate.bind(this));
          this.stateComponent.setStateExitCallback((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Skill, this.onSkillExit.bind(this));
          this.stateComponent.setStateEnterCallback((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Dead, this.onDeadEnter.bind(this));
          this.stateComponent.setStateUpdateCallback((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Dead, this.onDeadUpdate.bind(this));
        }
        /**
         * 初始化碰撞器
         */


        initCollider() {
          this.collider = this.getComponent(Collider);
        }
        /**
         * 注册事件
         */


        registerEvents() {
          if (this.collider) {
            this.collider.on('onCollisionEnter', this.onCollisionEnter, this);
          }

          this.node.on(NodeEventType.TRANSFORM_CHANGED, this.onTransformChanged, this);
        }

        onTransformChanged() {
          if (this.uiNode) {
            var _this$uiNode;

            (_this$uiNode = this.uiNode) == null || _this$uiNode.setWorldRotationFromEuler(0, 0, 0);
          }
        }
        /**
         * 注销事件
         */


        unregisterEvents() {
          if (this.collider) {
            this.collider.off('onCollisionEnter', this.onCollisionEnter, this);
          }
        }

        update(dt) {// 各组件的update已在组件内部实现
        } // 状态回调方法 ===========================

        /**
         * 空闲状态进入回调
         */


        onIdleEnter() {
          this.animationComponent.playIdle();
        }
        /**
         * 空闲状态更新回调
         */


        onIdleUpdate(dt) {
          // 子类可重写
          if (!this.animationComponent.isPlayingAnimation() || this.animationComponent.getCurrentAnimationName() != this.animationComponent.IdleAnimName) {
            this.animationComponent.playIdle();
          }

          if (this.movementComponent.isMoving) {
            this.stateComponent.changeState((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
              error: Error()
            }), CharacterState) : CharacterState).Move);
          }
        }
        /**
         * 移动状态进入回调
         */


        onMoveEnter() {
          this.animationComponent.playMove();
        }
        /**
         * 移动状态更新回调
         */


        onMoveUpdate(dt) {
          // 子类可重写
          if (!this.animationComponent.isPlayingAnimation() || this.animationComponent.getCurrentAnimationName() != this.animationComponent.MoveAnimName) {
            this.animationComponent.playMove();
          }
        }
        /**
         * 移动状态退出回调
         */


        onMoveExit() {// 子类可重写
        }
        /**
         * 攻击状态进入回调
         */


        onAttackEnter() {
          if (this.node.name == "Hero") {// console.log("[攻击状态] 进入攻击状态");
          }

          this.startAttackAnimation();
          this.movementComponent.IsKeepFace = true;
        }
        /**
         * 开始攻击动画
         */


        startAttackAnimation() {
          // 判断是否应该播放移动攻击动画
          var isMoving = this.movementComponent.isMoving;
          var shouldPlayRunAttack = this.supportMoveAttack && isMoving; // 选择动画名称

          var animName = shouldPlayRunAttack ? this.animationComponent.RunAttackAnimName : this.animationComponent.AttackAnimName; // 计算攻击动画的timeScale

          var attackTimeScale = this.calculateAttackTimeScale(animName); // console.log(`[攻击动画] 开始播放攻击动画`, {
          //     '角色': this.node.name,
          //     '动画名称': animName,
          //     '动画速度': attackTimeScale.toFixed(2),
          //     '伤害触发进度': this.attackComponent.attackDamageExecuteTime
          // });
          // 清除之前的帧事件（避免重复添加）

          this.animationComponent.clearFrameEvents(); // 添加攻击帧事件，在指定进度时触发攻击伤害

          var eventId = shouldPlayRunAttack ? (_crd && FrameEventId === void 0 ? (_reportPossibleCrUseOfFrameEventId({
            error: Error()
          }), FrameEventId) : FrameEventId).RUN_ATTACK_DAMAGE : (_crd && FrameEventId === void 0 ? (_reportPossibleCrUseOfFrameEventId({
            error: Error()
          }), FrameEventId) : FrameEventId).ATTACK_DAMAGE;
          this.animationComponent.addAttackFrameEvent(this.attackComponent.attackDamageExecuteTime, () => {
            if (this.node.name == "Hero") {// console.log(`[攻击动画] 🎯 帧事件触发: 执行攻击伤害`, {
              //     '角色': this.node.name,
              //     '动画进度': this.animationComponent.getCurrentAnimationProgress().toFixed(2)
              // });
            }

            this.attackComponent.performAttack();
          }, eventId, true); // console.log(`[攻击动画] 帧事件已添加`, {
          //     '角色': this.node.name,
          //     '事件ID': eventId,
          //     '触发进度': this.attackComponent.attackDamageExecuteTime
          // });
          // 播放相应的攻击动画

          if (shouldPlayRunAttack) {
            this.animationComponent.playRunAttack(attackTimeScale, false);
          } else {
            this.animationComponent.playAttack(attackTimeScale, false);
          } // 检查动画是否成功播放


          this.scheduleOnce(() => {
            var isPlaying = this.animationComponent.isPlayingAnimation();
            var currentAnimName = this.animationComponent.getCurrentAnimationName();
            var progress = this.animationComponent.getCurrentAnimationProgress(); // console.log(`[攻击动画] 动画播放状态检查`, {
            //     '角色': this.node.name,
            //     '是否正在播放': isPlaying,
            //     '当前动画': currentAnimName,
            //     '当前进度': progress.toFixed(2),
            //     '预期动画': animName
            // });
            // if (!isPlaying || currentAnimName !== animName) {
            ////console.warn(`[攻击动画] ⚠️ 动画播放失败！手动触发攻击伤害`, {
            //         '角色': this.node.name,
            //         '预期动画': animName
            //     });
            //     // 动画播放失败，手动触发攻击 
            //     if(this.node.name == "Hero"&&animName == "attack1")return;
            //     this.attackComponent.performAttack();
            // }
          }, 0.1);
        }
        /**
         * 根据攻击冷却时间和动画时长计算timeScale
         * @returns 计算得到的timeScale值，范围限制在0.5到5之间
         */


        calculateAttackTimeScale(attAnimName) {
          // 获取攻击动画时长
          var baseAnimDuration = this.animationComponent.getAnimationDuration(attAnimName);
          var cooldownTime = this.attackComponent.attackCooldownTime;

          if (baseAnimDuration <= 0 || cooldownTime <= 0) {
            return 1.0; // 默认值
          } // 计算基础时间缩放


          var timeScale = 1.0;

          if (cooldownTime < baseAnimDuration) {
            // 如果冷却时间小于动画时长，需要加速动画以实现连续播放
            timeScale = baseAnimDuration / cooldownTime;
          } else {
            // 如果冷却时间大于动画时长，可以适当减慢动画速度
            timeScale = baseAnimDuration / cooldownTime;
          } // 限制timeScale在0.5到5之间，确保攻击速度在合理范围内


          return Math.max(0.8, Math.min(2.0, timeScale));
        }
        /**
         * 攻击状态更新回调
         */


        onAttackUpdate(dt) {
          // 如果支持移动攻击，检查移动状态变化
          if (this.supportMoveAttack) {
            this.handleMoveAttackAnimation();
          }

          var target = this.GetAttackTarget();

          if (target) {
            this.attackComponent.updateAttackTarget(target); // 如果动画已经播放完成但还在冷却，切换到对应状态避免卡帧

            if (!this.animationComponent.isPlayingAnimation() && this.attackComponent.isCooling) {
              if (this.movementComponent.isMoving) {
                this.stateComponent.changeState((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                  error: Error()
                }), CharacterState) : CharacterState).Move);
              } else {
                this.stateComponent.changeState((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                  error: Error()
                }), CharacterState) : CharacterState).Idle);
              }
            }
          } else {
            this.waitForAttackCooldown();
          } // 子类可重写实现其他攻击更新逻辑

        }
        /**
         * 处理攻击完成后的逻辑
         */


        handleAttackComplete() {
          // console.warn('handleAttackComplete');
          var target = this.GetAttackTarget(); // 如果没有目标，直接退出攻击状态

          if (!target) {
            this.exitAttackState();
            return;
          } // 如果有目标且可以攻击，继续攻击


          if (this.attackComponent.canAttack()) {
            if (this.node.name == "Hero") {// console.log("[攻击完成] 可以攻击");
            }

            this.continueAttack();
          } // 如果有目标但还在冷却，等待冷却
          else {
            if (this.node.name == "Hero") {// console.log("[攻击完成] 冷却中");
            }

            this.waitForAttackCooldown();
          }
        }
        /**
         * 继续攻击（连续攻击）
         */


        continueAttack() {
          if (this.attackComponent.attack()) {
            if (this.node.name == "Hero") {// console.log("[攻击完成] 连续攻击");
            }

            this.startAttackAnimation();
          }
        }
        /**
         * 处理移动攻击动画切换
         */


        handleMoveAttackAnimation() {
          var isMoving = this.movementComponent.isMoving;
          var currentAnimName = this.animationComponent.getCurrentAnimationName();
          var isPlayingRunAttack = currentAnimName === this.animationComponent.RunAttackAnimName;
          var isPlayingAttack = currentAnimName === this.animationComponent.AttackAnimName; // 如果移动状态发生变化，切换动画

          if (isMoving && isPlayingAttack) {
            // 从站立攻击切换到移动攻击
            this.switchToRunAttack();
          } else if (!isMoving && isPlayingRunAttack) {
            // 从移动攻击切换到站立攻击
            this.switchToStandAttack();
          }
        }
        /**
         * 切换到移动攻击动画
         */


        switchToRunAttack() {
          // 获取当前动画进度
          var currentProgress = this.animationComponent.getCurrentAnimationProgress(); // 计算新动画的timeScale

          var attackTimeScale = this.calculateAttackTimeScale(this.animationComponent.RunAttackAnimName); // 清除旧的帧事件

          this.animationComponent.clearFrameEvents(false); // 添加新的帧事件

          this.animationComponent.addAttackFrameEvent(this.attackComponent.attackDamageExecuteTime, () => {
            this.attackComponent.performAttack();
          }, (_crd && FrameEventId === void 0 ? (_reportPossibleCrUseOfFrameEventId({
            error: Error()
          }), FrameEventId) : FrameEventId).RUN_ATTACK_DAMAGE, true); // 从当前进度开始播放移动攻击动画

          if (this.animationComponent.playAnimationFromProgress) {
            this.animationComponent.playAnimationFromProgress(this.animationComponent.RunAttackAnimName, false, attackTimeScale, currentProgress);
          } else {
            this.animationComponent.playRunAttack(attackTimeScale, false);
          }
        }
        /**
         * 切换到站立攻击动画
         */


        switchToStandAttack() {
          // 获取当前动画进度
          var currentProgress = this.animationComponent.getCurrentAnimationProgress(); // 计算新动画的timeScale

          var attackTimeScale = this.calculateAttackTimeScale(this.animationComponent.AttackAnimName); // 清除旧的帧事件

          this.animationComponent.clearFrameEvents(false); // 添加新的帧事件

          this.animationComponent.addAttackFrameEvent(this.attackComponent.attackDamageExecuteTime, () => {
            this.attackComponent.performAttack();
          }, (_crd && FrameEventId === void 0 ? (_reportPossibleCrUseOfFrameEventId({
            error: Error()
          }), FrameEventId) : FrameEventId).ATTACK_DAMAGE, true); // 从当前进度开始播放站立攻击动画

          if (this.animationComponent.playAnimationFromProgress) {
            this.animationComponent.playAnimationFromProgress(this.animationComponent.AttackAnimName, false, attackTimeScale, currentProgress);
          } else {
            this.animationComponent.playAttack(attackTimeScale, false);
          }
        }
        /**
         * 等待攻击冷却
         */


        waitForAttackCooldown() {
          // 获取攻击动画基础时长
          var baseAnimDuration = 0;

          if (this.animationComponent.getCurrentAnimationName() === this.animationComponent.AttackAnimName) {
            baseAnimDuration = this.animationComponent.getAnimationDuration(this.animationComponent.AttackAnimName);
          } else if (this.animationComponent.getCurrentAnimationName() === this.animationComponent.RunAttackAnimName) {
            baseAnimDuration = this.animationComponent.getAnimationDuration(this.animationComponent.RunAttackAnimName);
          }

          if (baseAnimDuration <= 0) {
            return;
          } // 如果动画已经播放完成，切换到对应状态，避免卡在最后一帧


          if (!this.animationComponent.isPlayingAnimation()) {
            if (this.movementComponent.isMoving) {
              this.stateComponent.changeState((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                error: Error()
              }), CharacterState) : CharacterState).Move);
            } else {
              this.stateComponent.changeState((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                error: Error()
              }), CharacterState) : CharacterState).Idle);
            }

            return;
          } // 如果冷却时间小于动画时长，保持攻击状态等待冷却
          // 这种情况下动画已经被加速，会连续播放


          if (this.attackComponent.attackCooldownTime < baseAnimDuration) {
            // 保持攻击状态，在下一帧update中会继续检查冷却状态
            return;
          } // 如果冷却时间大于等于动画时长，切换到idle状态
          // 避免在攻击状态下没有动画播放的空档期


          if (this.movementComponent.isMoving) {
            this.stateComponent.changeState((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
              error: Error()
            }), CharacterState) : CharacterState).Move);
          } else {
            this.stateComponent.changeState((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
              error: Error()
            }), CharacterState) : CharacterState).Idle);
          }
        }
        /**
         * 退出攻击状态
         */


        exitAttackState() {
          if (this.movementComponent.isMoving) {
            this.stateComponent.changeState((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
              error: Error()
            }), CharacterState) : CharacterState).Move);
          } else {
            this.stateComponent.changeState((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
              error: Error()
            }), CharacterState) : CharacterState).Idle);
          }
        }
        /**
         * 攻击状态退出回调
         */


        onAttackExit() {
          // 清理攻击相关的帧事件
          this.animationComponent.clearFrameEvents(); // 子类可重写

          this.movementComponent.IsKeepFace = false;
        }
        /**
         * 死亡状态进入回调
         */


        onDeadEnter() {
          this.animationComponent.playDead(); // 发送角色停止事件

          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).CHARACTER_STOP);
        }
        /**
         * 死亡状态更新回调
         */


        onDeadUpdate(dt) {// 子类可重写
        } // 事件回调方法 ===========================

        /**
         * 动画完成回调
         */


        onAnimationComplete(animName) {}
        /**
         * 受伤回调
         */


        onHurt(damageData) {// 子类可重写
        }
        /**
         * 死亡回调
         */


        onDead() {
          this.scheduleOnce(() => {
            this.movementComponent.setRigidBodyEnabled(false);
          });
          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).CHANGE_STATE, (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Dead);
          this.animationComponent.playDissolve();
        }
        /**
         * 攻击开始回调
         */


        onAttackStart() {}
        /**
         * 攻击结束回调 - 简化版本
         */


        onAttackEnd() {
          this.handleAttackComplete();
        }
        /**
         * 执行攻击回调
         */


        onPerformAttack(damageData) {// console.log("[Character] onPerformAttack", damageData,this.node.name);
          // 子类根据需要实现攻击逻辑
        }
        /**
         * 移动状态改变回调
         */


        onMoveStateUpdate(isMoving) {
          var currentState = this.stateComponent.getCurrentState(); // 死亡和技能状态不响应移动状态变化

          if (currentState === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Dead || currentState === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Skill) {
            return;
          } // 如果支持移动攻击且正在攻击状态，不切换状态


          if (this.supportMoveAttack && currentState === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Attack) {
            // 保持攻击状态，让攻击状态内部处理移动攻击逻辑
            return;
          } // Character基类中移动会打断攻击


          if (isMoving) {
            if (currentState != (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
              error: Error()
            }), CharacterState) : CharacterState).Move) {
              this.stateComponent.changeState((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                error: Error()
              }), CharacterState) : CharacterState).Move);
            }
          } else {
            if (currentState != (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
              error: Error()
            }), CharacterState) : CharacterState).Idle && currentState != (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
              error: Error()
            }), CharacterState) : CharacterState).Attack) {
              this.stateComponent.changeState((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                error: Error()
              }), CharacterState) : CharacterState).Idle);
            }
          }
        }
        /**
         * 目标到达回调
         */


        onTargetReached() {// 子类可重写
        }
        /**
         * 碰撞事件回调
         */


        onCollisionEnter(event) {// 子类可重写
        } // 添加技能状态回调方法

        /**
         * 技能状态进入回调
         */


        onSkillEnter() {// 子类可重写
        }
        /**
         * 技能状态更新回调
         */


        onSkillUpdate(dt) {// 子类可重写
        }
        /**
         * 技能状态退出回调
         */


        onSkillExit() {// 子类可重写
        } // 公共接口方法 ===========================

        /**
         * 移动角色（用于玩家输入，会根据摄像机角度变换方向）
         * @param direction 移动方向
         */


        move(direction) {
          if (this.stateComponent.getCurrentState() === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Dead) {
            return;
          } // 发送角色移动事件


          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).CHARACTER_MOVE, direction);
        }
        /**
         * 使用世界坐标方向移动（用于AI，不做方向变换）
         * @param direction 世界坐标系下的移动方向
         */


        moveWorld(direction) {
          if (this.stateComponent.getCurrentState() === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Dead) {
            return;
          } // 发送世界坐标移动事件


          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).CHARACTER_MOVE_WORLD, direction);
        }
        /**
         * 移动到世界坐标位置
         * @param targetPos 目标位置
         */


        moveToWorldPosition(targetPos) {
          if (this.stateComponent.getCurrentState() === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Dead) {
            return;
          } // 发送移动到位置事件


          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).MOVE_TO_POSITION, targetPos);
        }
        /**
         * 停止移动
         */


        stopMoving() {
          // 发送角色停止事件
          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).CHARACTER_STOP);
        }
        /**
         * 获取攻击目标
         * @returns 攻击目标
         */


        /**
         * 执行攻击
         */
        attack() {
          var currentState = this.stateComponent.getCurrentState(); // 如果角色已死亡或正在释放技能，不执行攻击

          if (currentState === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Dead || currentState === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Skill) {
            return false;
          } // 直接调用攻击组件，减少事件传递（方案二）


          if (this.attackComponent.attack()) {
            // 如果已经在攻击状态，重新开始攻击动画
            if (currentState === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
              error: Error()
            }), CharacterState) : CharacterState).Attack) {
              if (this.node.name == "Hero") {//console.log("[攻击完成] 重新开始攻击动画");
              }

              this.startAttackAnimation();
            } else {
              // 否则切换到攻击状态
              this.stateComponent.changeState((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                error: Error()
              }), CharacterState) : CharacterState).Attack);
            }

            return true;
          }

          return false;
        }
        /**
         * 击退
         * @param pos 击退位置
         * @param force 击退力
         */


        knockback(pos, force) {
          // 发送角色击退事件
          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).CHARACTER_KNOCKBACK, {
            pos,
            force
          });
        }
        /**
         * 击飞
         * @param force 击飞力度
         */


        knockup(force) {
          // 发送角色击飞事件
          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).CHARACTER_KNOCKUP, force);
        }
        /**
         * 搜索敌人
         */


        searchForAttackTarget(searchRadius) {
          return [];
        }
        /**
         * 重置角色状态
         */


        reset() {
          this.healthComponent.reset();
          this.movementComponent.reset();
          this.attackComponent.reset();
          this.stateComponent.reset();
          this.animationComponent.reset();
        }

        onDestroy() {
          this.unregisterEvents();
        }

        isAtHome() {
          return !manager.game.isCanHunted(this.node);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "healthComponent", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "movementComponent", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "attackComponent", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "animationComponent", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "stateComponent", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "uiNode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d03dbcdde253f15361873131dc2cddbfd8dd6d9c.js.map