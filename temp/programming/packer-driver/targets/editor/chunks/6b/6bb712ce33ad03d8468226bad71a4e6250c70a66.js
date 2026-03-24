System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, CCFloat, Vec3, ComponentEvent, BaseComponet, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, AttackComponent;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../../Main/Common/ComponentEvents", _context.meta, extras);
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
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      ComponentEvent = _unresolved_2.ComponentEvent;
    }, function (_unresolved_3) {
      BaseComponet = _unresolved_3.BaseComponet;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8ca9c00eABEhplGsL/ZRrY8", "AttackComponent", undefined);

      __checkObsolete__(['_decorator', 'Component', 'CCFloat', 'Vec3', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 攻击组件 - 管理角色攻击相关功能
       */

      _export("AttackComponent", AttackComponent = (_dec = ccclass('AttackComponent'), _dec2 = property({
        type: CCFloat,
        displayName: '攻击距离',
        range: [0.5, 500],
        tooltip: '角色可以攻击目标的距离'
      }), _dec3 = property({
        type: CCFloat,
        displayName: '攻击冷却',
        range: [0.1, 5],
        tooltip: '攻击之间的冷却时间(秒)'
      }), _dec4 = property({
        type: CCFloat,
        displayName: '伤害值',
        range: [1, 1000],
        tooltip: '攻击造成的伤害'
      }), _dec5 = property({
        type: CCFloat,
        displayName: '攻击伤害浮动范围',
        range: [0, 200],
        tooltip: '攻击伤害浮动范围：伤害值±设定值'
      }), _dec6 = property({
        type: CCFloat,
        displayName: '攻击伤害触发时机',
        range: [0, 1],
        tooltip: '攻击动画播放到多少进度时触发伤害(0-1)'
      }), _dec(_class = (_class2 = class AttackComponent extends (_crd && BaseComponet === void 0 ? (_reportPossibleCrUseOfBaseComponet({
        error: Error()
      }), BaseComponet) : BaseComponet) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "attackRange", _descriptor, this);

          _initializerDefineProperty(this, "attackCooldown", _descriptor2, this);

          _initializerDefineProperty(this, "damageValue", _descriptor3, this);

          _initializerDefineProperty(this, "damageRange", _descriptor4, this);

          _initializerDefineProperty(this, "damageExecuteTime", _descriptor5, this);

          /** 剩余攻击冷却时间 */
          this._remainingCooldownTime = 0;

          /** 是否已执行本次攻击的伤害 */
          this.hasPerformedAttack = false;

          /** 攻击状态标志 */
          this._canPerformAttack = true;

          /** 记录冷却时间的超出部分，用于抵消下一轮冷却 */
          this.cooldownCarry = 0;
        }

        onLoad() {
          super.onLoad();
          this.registerEvents();
        }

        onDestroy() {
          this.unregisterEvents();
        }
        /**
         * 注册事件监听
         */


        registerEvents() {
          // 监听攻击请求事件
          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).REQUEST_ATTACK, this.onRequestAttack, this);
          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).ATTACK_ANI_COMPLETE, this.onAttackAniComplete, this);
        }
        /**
         * 注销事件监听
         */


        unregisterEvents() {
          this.node.off((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).REQUEST_ATTACK, this.onRequestAttack, this);
          this.node.off((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).ATTACK_ANI_COMPLETE, this.onAttackAniComplete, this);
        }
        /**
         * 处理攻击请求事件
         */


        onRequestAttack() {
          this.attack();
        }
        /**
         * 获取攻击冷却时间
         */


        get attackCooldownTime() {
          return this.attackCooldown;
        }
        /**
         * 获取攻击伤害触发时机
         */


        get attackDamageExecuteTime() {
          return this.damageExecuteTime;
        }
        /**
         * 获取伤害浮动范围
         */


        get damageRangeValue() {
          return this.damageRange;
        }

        update(dt) {
          this.handleAttackCooldown(dt);
        }
        /**
         * 处理攻击冷却逻辑
         */


        handleAttackCooldown(dt) {
          // 如果正在冷却中，减少剩余冷却时间
          if (!this._canPerformAttack && this._remainingCooldownTime > 0) {
            this._remainingCooldownTime -= dt; // 当冷却时间结束时，允许攻击

            if (this._remainingCooldownTime <= 0) {
              // 记录冷却超出的时间，保持攻击节奏的相对偏移
              this.cooldownCarry = this._remainingCooldownTime;
              this._remainingCooldownTime = 0;
              this._canPerformAttack = true; // 发送攻击冷却结束事件

              this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
                error: Error()
              }), ComponentEvent) : ComponentEvent).ATTACK_COOLDOWN_END);
            }
          }
        }

        updateAttackTarget(target) {
          const direction = new Vec3();
          Vec3.subtract(direction, target.getWorldPosition(), this.node.getWorldPosition());
          direction.normalize();
          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).SET_FACE_DIRECTION_FROM_3D, direction, 1);
        }
        /**
         * 判断是否可以攻击
         * @returns 是否可以攻击
         */


        canAttack() {
          // if(this.node.name == "Hero"){
          ////console.log("canAttack", this._canPerformAttack, this._remainingCooldownTime, this.node.name);  
          // }
          return this._canPerformAttack && !manager.game.isGamePause;
        }
        /**
         * 尝试执行攻击
         * @returns 是否成功执行攻击
         */


        attack() {
          if (!this.canAttack()) {
            return false;
          }

          return this.startAttack();
        }
        /**
         * 开始攻击
         * @returns 是否成功开始攻击
         */


        startAttack() {
          // 设置攻击状态为冷却中，并设置剩余冷却时间
          this._canPerformAttack = false;
          const overshoot = Math.min(this.cooldownCarry, 0);
          this._remainingCooldownTime = this.attackCooldown + overshoot;

          if (this._remainingCooldownTime <= 0) {
            this._remainingCooldownTime = this.attackCooldown;
          }

          this.cooldownCarry = 0;
          this.hasPerformedAttack = false; // 发送攻击开始事件

          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).ATTACK_START);
          return true;
        }

        onAttackAniComplete(animName) {
          // 攻击动画结束，重置攻击执行标志，确保下次攻击可以正常进行
          this.hasPerformedAttack = false; // 发送攻击结束事件

          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).ATTACK_ANI_END);
        }
        /**
         * 执行攻击伤害
         */


        performAttack() {
          if (this.hasPerformedAttack) return;
          this.hasPerformedAttack = true; // 计算伤害值并发送执行攻击事件

          const damage = this.calculatDamage();
          const damageData = {
            damage: damage,
            damageSource: this.node
          }; // console.log("[AttackComponent] performAttack", damageData,this.node.name);

          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).PERFORM_ATTACK, damageData); // 在攻击执行后重置攻击标志，确保下次攻击可以正常进行

          this.scheduleOnce(() => {
            this.hasPerformedAttack = false;
          }, 0.1); // 稍微延迟重置，避免重复触发
        }
        /**
         * 计算实际伤害值
         */


        calculatDamage() {
          // 在基础伤害值上增加随机浮动
          return this.damageValue + this.damageRange * (Math.random() - 0.5) * 2;
        }
        /**
         * 重置组件状态
         */


        reset() {
          this._remainingCooldownTime = 0;
          this._canPerformAttack = true;
          this.hasPerformedAttack = false;
          this.cooldownCarry = 0;
        }
        /**
         * 获取伤害值
         */


        get damage() {
          return this.damageValue;
        }
        /**
         * 判断是否正在冷却
         */


        get isCooling() {
          return !this._canPerformAttack;
        }
        /**
         * 获取剩余攻击冷却时间
         */


        get currentAttackTime() {
          return this._remainingCooldownTime;
        }
        /**
         * 判断是否已执行本次攻击的伤害
         */


        get hasPerformedDamage() {
          return this.hasPerformedAttack;
        }
        /**
         * 设置伤害值
         * @param value 新的伤害值
         */


        setDamage(value) {
          this.damageValue = value;
        }
        /**
         * 获取攻击距离
         */


        get attackRangeValue() {
          return this.attackRange;
        }
        /**
         * 设置攻击参数
         * @param attackRange 攻击距离
         * @param attackCooldown 攻击冷却
         * @param damageValue 伤害值
         * @param damageRange 伤害浮动范围
         * @param damageExecuteTime 伤害触发时机
         */


        setAttackParams(attackRange, attackCooldown, damageValue, damageRange, damageExecuteTime) {
          this.attackRange = attackRange;
          this.attackCooldown = attackCooldown;
          this.damageValue = damageValue;
          this.damageRange = damageRange;
          this.damageExecuteTime = damageExecuteTime;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "attackRange", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 2;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "attackCooldown", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "damageValue", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "damageRange", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "damageExecuteTime", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.6;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6bb712ce33ad03d8468226bad71a4e6250c70a66.js.map