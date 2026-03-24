System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, CCFloat, color, ComponentEvent, HealthBar, ColorEffectType, BaseComponet, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, HealthComponent;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../../Main/Common/ComponentEvents", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHealthBar(extras) {
    _reporterNs.report("HealthBar", "./HealthBar", _context.meta, extras);
  }

  function _reportPossibleCrUseOfColorEffectType(extras) {
    _reporterNs.report("ColorEffectType", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDamageData(extras) {
    _reporterNs.report("DamageData", "../../Main/Common/CommonInterface", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBaseComponet(extras) {
    _reporterNs.report("BaseComponet", "./BaseComponet", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      CCFloat = _cc.CCFloat;
      color = _cc.color;
    }, function (_unresolved_2) {
      ComponentEvent = _unresolved_2.ComponentEvent;
    }, function (_unresolved_3) {
      HealthBar = _unresolved_3.HealthBar;
    }, function (_unresolved_4) {
      ColorEffectType = _unresolved_4.ColorEffectType;
    }, function (_unresolved_5) {
      BaseComponet = _unresolved_5.BaseComponet;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "fd70b91+uNE1JY8Vob9O+sU", "HealthComponent", undefined);

      __checkObsolete__(['_decorator', 'Component', 'CCFloat', 'Color', 'Vec3', 'color', 'sp']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 健康组件 - 管理生命值、受伤和死亡逻辑
       */

      _export("HealthComponent", HealthComponent = (_dec = ccclass('HealthComponent'), _dec2 = property({
        type: CCFloat,
        displayName: '最大生命值',
        range: [1, 100000],
        tooltip: '角色的最大生命值'
      }), _dec3 = property({
        type: CCFloat,
        displayName: '受伤免疫时间',
        range: [0, 3],
        tooltip: '受伤后的短暂无敌时间(秒)'
      }), _dec4 = property({
        type: _crd && HealthBar === void 0 ? (_reportPossibleCrUseOfHealthBar({
          error: Error()
        }), HealthBar) : HealthBar,
        displayName: '血条'
      }), _dec5 = property({
        type: CCFloat,
        displayName: '当前生命值'
      }), _dec(_class = (_class2 = class HealthComponent extends (_crd && BaseComponet === void 0 ? (_reportPossibleCrUseOfBaseComponet({
        error: Error()
      }), BaseComponet) : BaseComponet) {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "maxHealth", _descriptor, this);

          _initializerDefineProperty(this, "damageImmunityTime", _descriptor2, this);

          _initializerDefineProperty(this, "healthBar", _descriptor3, this);

          /** 当前生命值 */
          _initializerDefineProperty(this, "currentHealth", _descriptor4, this);

          /** 是否处于免疫状态 */
          this.isImmune = false;

          /** 免疫计时器 */
          this.immunityTimer = 0;

          /** 无敌开关 - 手动控制的持续无敌状态 */
          this.invincible = false;

          /** 默认伤害颜色 */
          this.defaultDamageColor = color().fromHEX('#B2B488');
        }

        onLoad() {
          this.currentHealth = this.maxHealth; // 初始化时满血状态，隐藏血条

          if (this.healthBar) {
            this.healthBar.hide();
          }
        }
        /**
         * 初始化健康状态
         */


        initHealth() {
          this.currentHealth = this.maxHealth; // 初始化时满血状态，隐藏血条

          if (this.healthBar) {
            this.healthBar.init();
            this.healthBar.hide();
          }
        }

        update(dt) {
          this.updateImmunityStatus(dt);
        }
        /**获取当前生命值 */


        getCurrentHealth() {
          return this.currentHealth;
        }
        /**获取最大生命值 */


        getMaxHealth() {
          return this.maxHealth;
        }
        /**
         * 更新免疫状态
         */


        updateImmunityStatus(dt) {
          if (this.isImmune) {
            this.immunityTimer += dt;

            if (this.immunityTimer >= this.damageImmunityTime) {
              this.isImmune = false;
              this.immunityTimer = 0;
            }
          }
        }
        /**
         * 角色受伤处理
         * @param damageData 伤害数据
         * @returns 是否死亡
         */


        takeDamage(damageData) {
          // console.log(`[目标受击] ========== 受到攻击 ==========`);
          // console.log(`[目标受击] 目标: ${this.node.name}`, {
          //     '攻击来源': damageData.damageSource?.name || 'unknown',
          //     '伤害值': damageData.damage.toFixed(2),
          //     '受击前血量': this.currentHealth.toFixed(2),
          //     '血量百分比': (this.healthPercentage * 100).toFixed(1) + '%'
          // });
          // 已经死亡、处于免疫状态或无敌状态则不受伤害
          if (this.isDead || this.isImmune || this.invincible) {
            var reason = this.isDead ? '已死亡' : this.isImmune ? '免疫中' : '无敌状态'; // console.log(`[目标受击] ❌ 伤害被阻挡: ${reason}`, {
            //     '目标': this.node.name,
            //     'isDead': this.isDead,
            //     'isImmune': this.isImmune,
            //     'invincible': this.invincible
            // });

            return false;
          }

          var beforeHp = this.currentHealth; // 减少生命值

          this.currentHealth = Math.max(0, this.currentHealth - damageData.damage);
          var actualDamage = beforeHp - this.currentHealth; // console.log(`[目标受击] ✓ 伤害生效`, {
          //     '目标': this.node.name,
          //     '实际伤害': actualDamage.toFixed(2),
          //     '受击后血量': this.currentHealth.toFixed(2),
          //     '血量百分比': (this.healthPercentage * 100).toFixed(1) + '%'
          // });
          // 更新血条显示

          if (this.healthBar) {
            this.healthBar.show();
            this.healthBar.updateHealth(this.healthPercentage);
          } // 发送生命值变化事件


          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).HEALTH_CHANGED, this.healthPercentage); // 触发受伤效果

          this.onHurt(damageData); // 设置短暂免疫

          this.isImmune = true;
          this.immunityTimer = 0; // console.log(`[目标受击] 设置伤害免疫, 持续时间: ${this.damageImmunityTime}s`);
          // 显示伤害数字
          // const damageNum = manager.pool.getNode(ObjectType.DamageNum)!.getComponent(DamageNum)!;
          // damageNum.node.setParent(this.node);
          // damageNum.showDamage(damage, this.node.getWorldPosition().add(new Vec3(0, 0, 0.5)), damageColor || this.defaultDamageColor);
          // 检查是否死亡

          if (this.currentHealth <= 0) {
            // console.log(`[目标受击] ☠️ 目标死亡: ${this.node.name}`);
            this.onDead(); // console.log(`[目标受击] ========== 受击结束 (死亡) ==========\n`);

            return true;
          } // console.log(`[目标受击] ========== 受击结束 ==========\n`);


          return false;
        }
        /**
         * 治疗角色
         * @param amount 治疗量
         */


        heal(amount) {
          if (this.isDead) return;
          this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount); // 更新血条显示

          if (this.healthBar) {
            // 如果满血，隐藏血条
            if (this.currentHealth >= this.maxHealth) {
              this.healthBar.hide();
            } else {
              this.healthBar.updateHealth(this.healthPercentage);
            }
          } // 发送生命值变化事件


          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).HEALTH_CHANGED, this.healthPercentage);
        }
        /**
         * 受伤处理
         */


        onHurt(damageData) {
          // console.log(`[目标受击] 触发受伤效果: ${this.node.name}`, {
          //     '伤害来源': damageData.damageSource?.name || 'unknown'
          // });
          // 无论是否死亡，都发送受伤事件（死亡时也算是受伤）
          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).HURT, damageData);
          if (this.isDead) return; // 显示闪红效果

          this.showHurtEffect();
        }
        /**
         * 死亡处理
         */


        onDead() {
          // console.log(`[目标受击] 执行死亡处理: ${this.node.name}`);
          // 显示闪红效果
          this.showHurtEffect(); // 隐藏血条

          if (this.healthBar) {
            this.scheduleOnce(() => {
              this.healthBar.hide();
            }, 0.4);
          } // 发送死亡事件


          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).DEAD, this); // console.log(`[目标受击] 死亡事件已发送: ${this.node.name}`);
        }
        /**
         * 显示受伤闪红效果
         */


        showHurtEffect() {
          // 通过事件应用闪红效果
          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).APPLY_COLOR_EFFECT, {
            type: (_crd && ColorEffectType === void 0 ? (_reportPossibleCrUseOfColorEffectType({
              error: Error()
            }), ColorEffectType) : ColorEffectType).HURT,
            duration: 0.3
          });
        }
        /**
         * 刷新健康状态
         */


        updatehHealthBar() {
          if (this.healthBar) {
            this.healthBar.updateHealth(this.healthPercentage);
          }
        }
        /**
         * 重置组件状态
         */


        reset() {
          this.initHealth();
          this.isImmune = false;
          this.immunityTimer = 0;
          this.invincible = false;
        }
        /**
         * 获取当前生命值
         */


        get health() {
          return this.currentHealth;
        }
        /**
         * 获取生命值百分比
         */


        get healthPercentage() {
          return this.currentHealth / this.maxHealth;
        }
        /**
         * 判断是否已死亡
         */


        get isDead() {
          return this.currentHealth <= 0;
        }
        /**
         * 设置最大生命值
         */


        setMaxHealth(maxHealth) {
          this.maxHealth = maxHealth;
          this.updatehHealthBar();
        }
        /**
         * 设置当前生命值
         */


        setCurrentHealth(currentHealth) {
          this.currentHealth = currentHealth; // 更新血条显示

          if (this.healthBar) {
            // 如果满血，隐藏血条
            if (this.currentHealth >= this.maxHealth) {
              this.healthBar.hide();
            } else {
              this.healthBar.updateHealth(this.healthPercentage);
            }
          }
        }
        /**
         * 恢复所有生命
         */


        restoreAllHealth() {
          this.currentHealth = this.maxHealth; // 满血时隐藏血条

          if (this.healthBar) {
            this.healthBar.hide();
          }
        }
        /**
         * 设置无敌状态
         * @param invincible 是否无敌
         */


        setInvincible(invincible) {
          this.invincible = invincible;
        }
        /**
         * 切换无敌状态
         */


        toggleInvincible() {
          this.invincible = !this.invincible;
        }
        /**
         * 获取当前是否无敌
         */


        get isInvincible() {
          return this.invincible;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "maxHealth", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "damageImmunityTime", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "healthBar", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "currentHealth", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=73eb3ff2789149d6d9d2dc0a3919418f8638c0a5.js.map