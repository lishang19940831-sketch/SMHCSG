System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, CCFloat, Character, BaseComponet, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, BaseAIComponent;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCharacter(extras) {
    _reporterNs.report("Character", "../Role/Character", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBaseComponet(extras) {
    _reporterNs.report("BaseComponet", "../Components/BaseComponet", _context.meta, extras);
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
    }, function (_unresolved_2) {
      Character = _unresolved_2.Character;
    }, function (_unresolved_3) {
      BaseComponet = _unresolved_3.BaseComponet;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "718880YY/NPaaxPDd3m8obN", "BaseAIComponent", undefined);

      __checkObsolete__(['_decorator', 'Component', 'CCFloat', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * AI目标信息接口
       */

      /**
       * AI组件基类
       * 提供最基础的AI功能框架，适用于所有类型的AI角色
       */
      _export("BaseAIComponent", BaseAIComponent = (_dec = ccclass('BaseAIComponent'), _dec2 = property({
        type: CCFloat,
        displayName: '决策间隔',
        range: [0.1, 2],
        tooltip: 'AI决策更新的时间间隔（秒）'
      }), _dec(_class = (_class2 = class BaseAIComponent extends (_crd && BaseComponet === void 0 ? (_reportPossibleCrUseOfBaseComponet({
        error: Error()
      }), BaseComponet) : BaseComponet) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "decisionInterval", _descriptor, this);

          this._character = null;

          /** 当前目标 */
          this.currentTarget = null;

          /** 决策计时器 */
          this.decisionTimer = 0;

          /** 是否启用AI */
          this.aiEnabled = true;
        }

        get AIEnabled() {
          return this.aiEnabled;
        }

        set AIEnabled(value) {
          this.aiEnabled = value;
        }

        onLoad() {
          super.onLoad();
          this.initializeAI();
          this.setupStateMachine();
          this.registerEvents();
        }

        onDestroy() {
          this.unregisterEvents();
        }

        reset() {
          this.currentTarget = null;
          this.decisionTimer = 0;
          this.aiEnabled = true;
        }
        /**
         * 初始化AI组件
         * 子类可重写此方法进行自定义初始化
         */


        initializeAI() {
          this._character = this.node.getComponent(_crd && Character === void 0 ? (_reportPossibleCrUseOfCharacter({
            error: Error()
          }), Character) : Character);
          this.currentTarget = null;
        }
        /**
         * 注册事件监听
         */


        registerEvents() {}
        /**
         * 注销事件监听
         */


        unregisterEvents() {}

        update(dt) {
          if (!this.aiEnabled || !manager.game.isGameStart) return; // 更新决策逻辑

          this.updateDecision(dt);
        }
        /**
         * 更新决策逻辑
         */


        updateDecision(dt) {
          this.decisionTimer += dt;

          if (this.decisionTimer >= this.decisionInterval) {
            this.decisionTimer = 0;
            this.makeDecision();
          }
        }
        /**
         * AI决策核心逻辑
         * 子类必须重写此方法实现具体的决策逻辑
         */

        /**
         * 设置状态机
         * 子类可重写此方法添加自定义状态
         */
        // ==================== 状态机回调方法 ====================


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "decisionInterval", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.2;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=257303b063e2c92de61e669eb43ca4092007c112.js.map