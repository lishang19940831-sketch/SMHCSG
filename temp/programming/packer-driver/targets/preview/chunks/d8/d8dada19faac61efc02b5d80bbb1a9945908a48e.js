System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Vec3, CommonEvent, CharacterState, ObjectType, ComponentInitializer, ComponentEvent, HealthComponent, PickupComponent, Character, MovementComponent, TipLabel, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, Hero;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCharacterState(extras) {
    _reporterNs.report("CharacterState", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDamageData(extras) {
    _reporterNs.report("DamageData", "../../Main/Common/CommonInterface", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentInitializer(extras) {
    _reporterNs.report("ComponentInitializer", "../../Main/Common/ComponentInitializer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../../Main/Common/ComponentEvents", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHealthComponent(extras) {
    _reporterNs.report("HealthComponent", "../Components/HealthComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPickupComponent(extras) {
    _reporterNs.report("PickupComponent", "../Components/PickupComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCharacter(extras) {
    _reporterNs.report("Character", "./Character", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMovementComponent(extras) {
    _reporterNs.report("MovementComponent", "../Components/MovementComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTipLabel(extras) {
    _reporterNs.report("TipLabel", "../UI/TipLabel", _context.meta, extras);
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
    }, function (_unresolved_2) {
      CommonEvent = _unresolved_2.CommonEvent;
      CharacterState = _unresolved_2.CharacterState;
      ObjectType = _unresolved_2.ObjectType;
    }, function (_unresolved_3) {
      ComponentInitializer = _unresolved_3.ComponentInitializer;
    }, function (_unresolved_4) {
      ComponentEvent = _unresolved_4.ComponentEvent;
    }, function (_unresolved_5) {
      HealthComponent = _unresolved_5.HealthComponent;
    }, function (_unresolved_6) {
      PickupComponent = _unresolved_6.PickupComponent;
    }, function (_unresolved_7) {
      Character = _unresolved_7.Character;
    }, function (_unresolved_8) {
      MovementComponent = _unresolved_8.MovementComponent;
    }, function (_unresolved_9) {
      TipLabel = _unresolved_9.TipLabel;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "63ef89GvIREl4GIlh72XmFw", "Hero", undefined);

      __checkObsolete__(['_decorator', 'Node', 'Vec3', 'ParticleSystem', 'ICollisionEvent', 'ITriggerEvent']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 英雄组件 - 基于组件化设计的英雄类
       */

      _export("Hero", Hero = (_dec = ccclass('Hero'), _dec2 = property({
        type: _crd && PickupComponent === void 0 ? (_reportPossibleCrUseOfPickupComponent({
          error: Error()
        }), PickupComponent) : PickupComponent,
        displayName: '拾取组件'
      }), _dec3 = property({
        displayName: '自动攻击检测间隔',
        range: [0.1, 2.0]
      }), _dec(_class = (_class2 = class Hero extends (_crd && Character === void 0 ? (_reportPossibleCrUseOfCharacter({
        error: Error()
      }), Character) : Character) {
        constructor() {
          super(...arguments);

          /** 拾取组件 */
          _initializerDefineProperty(this, "pickupComponent", _descriptor, this);

          /** 自动攻击检测间隔（秒） */
          _initializerDefineProperty(this, "autoAttackInterval", _descriptor2, this);

          /** 自动攻击计时器 */
          this.autoAttackTimer = 0;

          /** 上次显示提示的时间戳，用于限制提示显示频率 */
          this.lastTipTime = 0;

          /** 是否处于安全区 */
          this.isSafeArea = true;

          /** 自动回血间隔 */
          this.autoHealInterval = 3;
          this.debugTimer = 0;

          /** 上次执行攻击的时间戳 */
          this.lastPerformAttackTime = 0;
        }

        onLoad() {
          super.onLoad();
          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).UPDATE_ITEM_COUNT, this.onUpdateItemCount, this);
          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).ATTACK_COOLDOWN_END, this.onAttackCooldownEnd, this);
          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).PICKUP_ITEM_FULL, this.onPickupItemFull, this); // 延迟初始化碰撞器配置

          this.scheduleOnce(() => {
            this.initHeroCollider();
          }, 0);
        }
        /**
         * 初始化英雄碰撞器配置
         */


        initHeroCollider() {
          if (this.collider) {
            this.collider.on("onTriggerEnter", this.onTriggerEnter, this);
            this.collider.on("onTriggerExit", this.onTriggerExit, this);
          }
        }

        onTriggerEnter(event) {
          var otherCollider = event.otherCollider;

          if (otherCollider.node.name === 'banzi') {
            var skin = this.node.getChildByPath("ModelNode/skin");

            if (skin) {
              skin.setPosition(skin.position.x, 0.2, skin.position.z);
            }
          }
        }

        onTriggerExit(event) {
          var otherCollider = event.otherCollider;

          if (otherCollider.node.name === 'banzi') {
            var skin = this.node.getChildByPath("ModelNode/skin");

            if (skin) {
              skin.setPosition(skin.position.x, 0, skin.position.z);
            }
          }
        }

        onDestroy() {
          app.event.offAllByTarget(this);
        }

        initComponents() {
          super.initComponents();
          (_crd && ComponentInitializer === void 0 ? (_reportPossibleCrUseOfComponentInitializer({
            error: Error()
          }), ComponentInitializer) : ComponentInitializer).initComponents(this.node, {
            pickupComponent: _crd && PickupComponent === void 0 ? (_reportPossibleCrUseOfPickupComponent({
              error: Error()
            }), PickupComponent) : PickupComponent
          }, this);
        }

        update(dt) {
          super.update(dt); // 自动攻击逻辑

          this.updateAutoAttack(dt); // 每 autoHealInterval 秒调用一次自动回血

          this.debugTimer += dt;

          if (this.debugTimer >= this.autoHealInterval) {
            this.debugTimer = 0;
            this.autoHeal();
          }
        }

        onCollisionEnter(event) {// 子类可重写
        }

        onAttackCooldownEnd() {
          // 立即检查是否可以攻击，避免移动停止后的攻击延迟
          this.checkAndAutoAttack();
          this.autoAttackTimer = 0;
        }
        /**
         * 监听拾取物品满事件
         * @param itemType 物品类型
         */


        onPickupItemFull(itemType) {
          var _manager$pool$getNode;

          var currentTime = Date.now(); // 限制提示显示频率（1秒内不重复显示）

          if (currentTime - this.lastTipTime < 1000) {
            return;
          }

          var tipLabel = (_manager$pool$getNode = manager.pool.getNode((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).TipLabel, this.uiNode)) == null ? void 0 : _manager$pool$getNode.getComponent(_crd && TipLabel === void 0 ? (_reportPossibleCrUseOfTipLabel({
            error: Error()
          }), TipLabel) : TipLabel);

          if (tipLabel) {
            tipLabel.showTip(app.lang.getLanguage("Full"), this.node.getWorldPosition().add(new Vec3(0, 1, 0)));
            this.lastTipTime = currentTime;
          }
        }
        /**
         * 更新自动攻击逻辑
         * @param dt 帧时间差
         */


        updateAutoAttack(dt) {
          var currentState = this.stateComponent.getCurrentState(); // 死亡或技能状态不执行自动攻击

          if (currentState === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Dead || currentState === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Skill) {
            return;
          } // 正在攻击且冷却中，不执行自动攻击


          if (currentState === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Attack && !this.attackComponent.canAttack()) {
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


        checkAndAutoAttack() {
          var heroPosition = this.node.getWorldPosition();
          var enemies = manager.enemy.getRangeEnemies(heroPosition, this.attackComponent.attackRangeValue); // 安全区内且门未打开时，不可攻击敌人

          if (this.isSafeArea && manager.door && !manager.door.isOpen) {
            enemies = [];
          }

          if (enemies.length > 0 && this.attackComponent.canAttack()) {
            this.attack();
          }
        }

        move(direction) {
          super.move(direction);
        }
        /**
         * 变换监听回调，用于通知UI位置变化
         */


        onTransformChanged() {
          super.onTransformChanged();
          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).HerMove, this.node.getWorldPosition());
        }

        onUpdateItemCount(type, count) {
          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).UpdateHeroItemCount, {
            type: type,
            count: count
          });
        }
        /** 自动回血 */


        autoHeal() {
          if (this.isSafeArea) {
            this.healthComponent.heal(1);
          }
        }

        onPerformAttack(damageData) {
          var now = Date.now(); // 防抖：100ms 内不重复触发

          if (now - this.lastPerformAttackTime < 100) {
            return;
          }

          this.lastPerformAttackTime = now;
          var primaryTargets = this.getAttackTargetList();

          for (var target of primaryTargets) {
            var cornHealth = target.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
              error: Error()
            }), HealthComponent) : HealthComponent);
            var isDie = false;

            if (cornHealth) {
              isDie = cornHealth.takeDamage(damageData);
            }

            var moveAnimation = target.getComponent(_crd && MovementComponent === void 0 ? (_reportPossibleCrUseOfMovementComponent({
              error: Error()
            }), MovementComponent) : MovementComponent);

            if (moveAnimation) {
              if (isDie) {
                moveAnimation.knockback(this.node.getWorldPosition(), 2);
              } else {
                moveAnimation.knockback(this.node.getWorldPosition(), 4);
              }
            }
          }
        }

        getAttackTargetList() {
          var attackRange = this.attackComponent.attackRangeValue;
          var heroPosition = this.node.getWorldPosition();
          var enemies = manager.enemy.getRangeEnemies(heroPosition, attackRange); // 安全区内且门未打开时，不可攻击敌人

          if (this.isSafeArea && manager.door && !manager.door.isOpen) {
            enemies = [];
          }

          var targetsWithDistance = [];

          for (var enemy of enemies) {
            var distanceSquared = Vec3.squaredDistance(heroPosition, enemy.node.getWorldPosition());
            targetsWithDistance.push({
              node: enemy.node,
              distanceSquared
            });
          }

          targetsWithDistance.sort((a, b) => a.distanceSquared - b.distanceSquared);
          return targetsWithDistance.map(target => target.node);
        }

        GetAttackTarget() {
          return this.getAttackTargetList()[0] || null;
        }

        attack() {
          // 技能状态下禁用攻击
          if (this.stateComponent.getCurrentState() === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Skill) {
            return false;
          }

          super.attack();
        }

        onHurt(damageData) {
          super.onHurt(damageData);
          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).HeroHurt, {
            damageData: damageData
          });
          var healPercent = this.healthComponent.healthPercentage;

          if (healPercent < 0.3) {
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).ShowTips, {
              tips: app.lang.getLanguage("HurtTips"),
              id: "HurtTips",
              duration: 3
            });
          }
        }

        onDead() {
          super.onDead();
          this.scheduleOnce(() => {
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).GameFail);
          }, 1);
        }

        reset() {
          super.reset();
          this.autoAttackTimer = 0;
        }

        GetItemCount(itemType) {
          return this.pickupComponent.getItemCount(itemType);
        }
        /**
         * 控制英雄3D模型的显示/隐藏
         * @param visible true = 显示模型；false = 隐藏模型
         */


        setModelVisible(visible) {
          var modelNode = this.node.getChildByPath("ModelNode");

          if (modelNode) {
            modelNode.active = visible;
          }
        }
        /**
         * 启用或禁用英雄的移动组件（摇杆输入和寻路）
         * @param enabled true = 允许移动；false = 锁定（停止当前移动）
         */


        setMovementEnabled(enabled) {
          var movement = this.node.getComponent(_crd && MovementComponent === void 0 ? (_reportPossibleCrUseOfMovementComponent({
            error: Error()
          }), MovementComponent) : MovementComponent);
          if (!movement) return;

          if (!enabled) {
            movement.stopMovingToTarget(); // 停止当前移动
          }

          movement.enabled = enabled;
        }
        /**
         * 移动状态进入回调
         */


        onMoveEnter() {
          this.animationComponent.playMove(1.2);
        }
        /**
         * 移动状态更新回调
         */


        onMoveUpdate(dt) {
          if (!this.animationComponent.isPlayingAnimation() || this.animationComponent.getCurrentAnimationName() != this.animationComponent.MoveAnimName) {
            this.animationComponent.playMove(1.2);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pickupComponent", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "autoAttackInterval", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d8dada19faac61efc02b5d80bbb1a9945908a48e.js.map