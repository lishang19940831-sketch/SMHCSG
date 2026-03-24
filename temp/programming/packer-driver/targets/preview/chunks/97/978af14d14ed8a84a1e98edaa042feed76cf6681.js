System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Node, Vec3, v3, Character, ComponentEvent, CharacterState, CommonEvent, EffectType, FrameEventId, ObjectType, PHY_GROUP, AutoHuntAIComponent, ComponentInitializer, HealthComponent, MovementComponent, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, EnemyBoss;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCharacter(extras) {
    _reporterNs.report("Character", "./Character", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../../Main/Common/ComponentEvents", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDamageData(extras) {
    _reporterNs.report("DamageData", "../../Main/Common/CommonInterface", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCharacterState(extras) {
    _reporterNs.report("CharacterState", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEffectType(extras) {
    _reporterNs.report("EffectType", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfFrameEventId(extras) {
    _reporterNs.report("FrameEventId", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPHY_GROUP(extras) {
    _reporterNs.report("PHY_GROUP", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAutoHuntAIComponent(extras) {
    _reporterNs.report("AutoHuntAIComponent", "../AI/AutoHuntAIComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentInitializer(extras) {
    _reporterNs.report("ComponentInitializer", "../../Main/Common/ComponentInitializer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHealthComponent(extras) {
    _reporterNs.report("HealthComponent", "../Components/HealthComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMovementComponent(extras) {
    _reporterNs.report("MovementComponent", "../Components/MovementComponent", _context.meta, extras);
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
      v3 = _cc.v3;
    }, function (_unresolved_2) {
      Character = _unresolved_2.Character;
    }, function (_unresolved_3) {
      ComponentEvent = _unresolved_3.ComponentEvent;
    }, function (_unresolved_4) {
      CharacterState = _unresolved_4.CharacterState;
      CommonEvent = _unresolved_4.CommonEvent;
      EffectType = _unresolved_4.EffectType;
      FrameEventId = _unresolved_4.FrameEventId;
      ObjectType = _unresolved_4.ObjectType;
      PHY_GROUP = _unresolved_4.PHY_GROUP;
    }, function (_unresolved_5) {
      AutoHuntAIComponent = _unresolved_5.AutoHuntAIComponent;
    }, function (_unresolved_6) {
      ComponentInitializer = _unresolved_6.ComponentInitializer;
    }, function (_unresolved_7) {
      HealthComponent = _unresolved_7.HealthComponent;
    }, function (_unresolved_8) {
      MovementComponent = _unresolved_8.MovementComponent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "54a72SOMChApp5qBLui8irT", "EnemyBoss", undefined);

      __checkObsolete__(['_decorator', 'Color', 'color', 'ICollisionEvent', 'ITriggerEvent', 'Node', 'tween', 'UIOpacity', 'Vec3', 'PhysicsSystem', 'geometry', 'v3']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 敌人角色类 - 展示重构后的事件系统使用
       */

      _export("EnemyBoss", EnemyBoss = (_dec = ccclass('EnemyBoss'), _dec2 = property(_crd && AutoHuntAIComponent === void 0 ? (_reportPossibleCrUseOfAutoHuntAIComponent({
        error: Error()
      }), AutoHuntAIComponent) : AutoHuntAIComponent), _dec3 = property({
        type: Node,
        displayName: '攻击位置'
      }), _dec4 = property({
        displayName: '技能冷却'
      }), _dec(_class = (_class2 = class EnemyBoss extends (_crd && Character === void 0 ? (_reportPossibleCrUseOfCharacter({
        error: Error()
      }), Character) : Character) {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "autoHuntAIComponent", _descriptor, this);

          _initializerDefineProperty(this, "attPos", _descriptor2, this);

          _initializerDefineProperty(this, "skillCooldown", _descriptor3, this);

          this._skillCooldownTimer = 0;
          this._firstHurt = true;
        }

        onLoad() {
          super.onLoad(); // manager.enemy.addEnemy(this.node);
          // this.node.on(ComponentEvent.STATE_CHANGED, this.TEST, this);
        }

        TEST(state) {//console.warn('TEST', state);
        }

        update(dt) {
          if (!manager.game.isGameStart) return;
          super.update(dt); // 更新技能冷却计时器

          if (this._skillCooldownTimer > 0) {
            this._skillCooldownTimer -= dt;

            if (this._skillCooldownTimer < 0) {
              this._skillCooldownTimer = 0;
            }
          }

          if (this.isSkillReady()) {
            this.castSkill();
          }
        }

        initComponents() {
          super.initComponents();
          (_crd && ComponentInitializer === void 0 ? (_reportPossibleCrUseOfComponentInitializer({
            error: Error()
          }), ComponentInitializer) : ComponentInitializer).initComponents(this.node, {
            autoHuntAIComponent: _crd && AutoHuntAIComponent === void 0 ? (_reportPossibleCrUseOfAutoHuntAIComponent({
              error: Error()
            }), AutoHuntAIComponent) : AutoHuntAIComponent
          }, this);
        }

        registerComponentEvents() {
          super.registerComponentEvents(); // 注册目标追踪组件事件（无需设置回调函数）
          // 目标追踪组件现在通过事件与其他组件通信
        }

        registerEvents() {
          super.registerEvents(); // 监听组件初始化完成事件

          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).COMPONENT_INITIALIZED, this.onComponentInitialized, this);
        }

        unregisterEvents() {
          super.unregisterEvents();
          this.node.off((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).COMPONENT_INITIALIZED, this.onComponentInitialized, this);
        }
        /**
         * 组件初始化完成回调
         */


        onComponentInitialized() {// 所有组件都已初始化并注册了事件监听
          // 可以开始使用事件系统进行组件间通信
          //console.log('敌人组件初始化完成，事件系统已准备就绪');
        }
        /**
         * 设置目标（通过事件）
         */


        setTarget(target) {
          // 通过事件设置目标，而不是直接调用组件方法
          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).SET_TARGET, target);
        }
        /**
         * 清除目标（通过事件）
         */


        clearTarget() {
          // 通过事件清除目标
          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).CLEAR_TARGET);
        }

        GetAttackTarget() {
          var attackComponent = this.attackComponent;
          var attackRange = attackComponent.attackRangeValue;
          var enemies = manager.game.getRangeSolder(this.node.getWorldPosition(), attackRange);

          if (enemies.length > 0) {
            if (enemies.some(enemy => enemy.node === manager.game.hero.node)) {
              return manager.game.hero.node;
            }

            return enemies[0].node;
          }

          return null;
        }

        onPerformAttack(damageData) {
          // console.log('onHeroPerformAttack', damageData);
          var target = this.GetAttackTarget();

          if (target) {
            var healthComponent = target.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
              error: Error()
            }), HealthComponent) : HealthComponent);

            if (healthComponent) {
              healthComponent.takeDamage(damageData);
            }

            app.audio.playEffect('resources/audio/蜘蛛攻击');
            var moveAnimation = target.getComponent(_crd && MovementComponent === void 0 ? (_reportPossibleCrUseOfMovementComponent({
              error: Error()
            }), MovementComponent) : MovementComponent);

            if (moveAnimation) {
              moveAnimation.knockback(this.node.getWorldPosition(), 3);
            }

            var pos = manager.game.calculateSolderCount(this.node.getWorldPosition().add(new Vec3(0, 1, 0)), target.getWorldPosition().add(new Vec3(0, 1, 0)), [(_crd && PHY_GROUP === void 0 ? (_reportPossibleCrUseOfPHY_GROUP({
              error: Error()
            }), PHY_GROUP) : PHY_GROUP).SOLDER, (_crd && PHY_GROUP === void 0 ? (_reportPossibleCrUseOfPHY_GROUP({
              error: Error()
            }), PHY_GROUP) : PHY_GROUP).HERO]);

            if (pos) {
              manager.effect.playEffect((_crd && EffectType === void 0 ? (_reportPossibleCrUseOfEffectType({
                error: Error()
              }), EffectType) : EffectType).Boss_Attack, pos);
            }

            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).ShakeCamera, {
              intensity: 0.2,
              duration: 0.1,
              source: this.node
            });
          }
        }
        /**
         * 搜索敌人
         */


        searchForAttackTarget(searchRadius) {
          var currentPos = this.node.getWorldPosition();
          var enemies = manager.game.getRangeSolder(currentPos, searchRadius);

          if (enemies.some(enemy => enemy.node === manager.game.hero.node)) {
            return [{
              node: manager.game.hero.node,
              squaredDistance: 0
            }];
          }

          return enemies;
        }

        onHurt(damageData) {
          super.onHurt(damageData);
        }

        onDead() {
          super.onDead();
          this.autoHuntAIComponent.setAIEnabled(false);
          app.audio.playEffect('resources/audio/蜘蛛死亡');
          this.schedule(() => {
            manager.drop.spawnParabolicItem((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemMeat, this.node.getWorldPosition());
          }, 0, 20);
          this.scheduleOnce(() => {
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).BossDead, this.node);
            this.node.active = false;
          }, 1);
        }

        castSkill() {
          // 检查技能是否在冷却中
          if (!this.isSkillReady()) {
            //console.log('技能冷却中，无法释放技能');
            return false;
          }

          if (this.GetAttackTarget() == null) {
            return false;
          }

          if (this.stateComponent.getCurrentState() === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Dead) {
            return false;
          }

          this.autoHuntAIComponent.setAIEnabled(false);
          this.stateComponent.changeState((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Skill);
          return true;
        }
        /**
         * 检查技能是否准备好（不在冷却中）
         */


        isSkillReady() {
          return this._skillCooldownTimer <= 0;
        }
        /**
         * 获取剩余冷却时间
         */


        getSkillCooldownRemaining() {
          return Math.max(0, this._skillCooldownTimer);
        }
        /**
         * 获取技能冷却进度 (0-1，0表示冷却完成，1表示刚开始冷却)
         */


        getSkillCooldownProgress() {
          if (this.skillCooldown <= 0) return 0;
          return Math.min(1, this._skillCooldownTimer / this.skillCooldown);
        }
        /**
         * 重置技能冷却
         */


        resetSkillCooldown() {
          this._skillCooldownTimer = this.skillCooldown; //console.log(`技能冷却开始，冷却时间: ${this.skillCooldown}秒`);
        }

        performSkill() {
          var enemies = manager.game.getRangeSolder(this.node.getWorldPosition(), 7);

          if (enemies.length > 0) {
            for (var enemy of enemies) {
              var healthComponent = enemy.node.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
                error: Error()
              }), HealthComponent) : HealthComponent);

              if (healthComponent) {
                var damageData = {
                  damage: 80,
                  damageSource: this.node
                };
                healthComponent.takeDamage(damageData);
              }

              var moveAnimation = enemy.node.getComponent(_crd && MovementComponent === void 0 ? (_reportPossibleCrUseOfMovementComponent({
                error: Error()
              }), MovementComponent) : MovementComponent);

              if (moveAnimation) {
                if (this._firstHurt) {
                  this._firstHurt = false;
                  moveAnimation.knockup(9, Vec3.subtract(new Vec3(), enemy.node.getWorldPosition(), this.node.getWorldPosition()));
                } else {
                  moveAnimation.knockup(6, Vec3.subtract(new Vec3(), enemy.node.getWorldPosition(), this.node.getWorldPosition()));
                }
              }

              var pos = manager.game.calculateSolderCount(this.node.getWorldPosition().add(new Vec3(0, 1, 0)), enemy.node.getWorldPosition().add(new Vec3(0, 1, 0)), [(_crd && PHY_GROUP === void 0 ? (_reportPossibleCrUseOfPHY_GROUP({
                error: Error()
              }), PHY_GROUP) : PHY_GROUP).SOLDER, (_crd && PHY_GROUP === void 0 ? (_reportPossibleCrUseOfPHY_GROUP({
                error: Error()
              }), PHY_GROUP) : PHY_GROUP).HERO]);

              if (pos) {
                manager.effect.playEffect((_crd && EffectType === void 0 ? (_reportPossibleCrUseOfEffectType({
                  error: Error()
                }), EffectType) : EffectType).Boss_Attack, pos, undefined, undefined, v3(2, 2, 2));
              }

              app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
                error: Error()
              }), CommonEvent) : CommonEvent).ShakeCamera, {
                intensity: 3,
                duration: 0.15,
                source: this.node
              });
            }
          }
        }

        onSkillEnter() {
          super.onSkillEnter(); // 技能开始时重置冷却计时器

          this.resetSkillCooldown(); // 清除之前的帧事件（避免重复添加）

          this.animationComponent.clearFrameEvents(); // 添加攻击帧事件，在指定进度时触发攻击伤害

          this.animationComponent.addFrameEvent(0.6, () => {
            this.performSkill();
          }, (_crd && FrameEventId === void 0 ? (_reportPossibleCrUseOfFrameEventId({
            error: Error()
          }), FrameEventId) : FrameEventId).SKILL_CAST, true);
          this.animationComponent.playAnimation('skill', false, 0.66);
        }

        onSkillUpdate(dt) {
          super.onSkillUpdate(dt);
        }

        onAnimationComplete(animName) {
          super.onAnimationComplete(animName);

          if (animName === 'skill') {
            this.stateComponent.changeState((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
              error: Error()
            }), CharacterState) : CharacterState).Idle);
            this.autoHuntAIComponent.setAIEnabled(true);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "autoHuntAIComponent", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "attPos", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "skillCooldown", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=978af14d14ed8a84a1e98edaa042feed76cf6681.js.map