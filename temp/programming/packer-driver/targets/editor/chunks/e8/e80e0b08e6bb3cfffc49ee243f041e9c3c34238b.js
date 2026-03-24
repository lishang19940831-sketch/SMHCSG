System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Label, RichText, EDITOR, I18nBase, logMgr, langMgr, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _crd, ccclass, property, requireComponent, I18nLabel;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfI18nBase(extras) {
    _reporterNs.report("I18nBase", "./I18nBase", _context.meta, extras);
  }

  function _reportPossibleCrUseOflogMgr(extras) {
    _reporterNs.report("logMgr", "../../Managers/LogMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOflangMgr(extras) {
    _reporterNs.report("langMgr", "../../Managers/LangMgr", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Label = _cc.Label;
      RichText = _cc.RichText;
    }, function (_ccEnv) {
      EDITOR = _ccEnv.EDITOR;
    }, function (_unresolved_2) {
      I18nBase = _unresolved_2.I18nBase;
    }, function (_unresolved_3) {
      logMgr = _unresolved_3.logMgr;
    }, function (_unresolved_4) {
      langMgr = _unresolved_4.langMgr;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "045408QXz5H4LyghThuaAYp", "I18nLabel", undefined);

      __checkObsolete__(['_decorator', 'Label', 'RichText']);

      ({
        ccclass,
        property,
        requireComponent
      } = _decorator);
      /** 用于显示多语言文本，并根据语言变化自动更新内容 */

      _export("I18nLabel", I18nLabel = (_dec = ccclass("I18nLabel"), _dec2 = requireComponent(Label), _dec3 = requireComponent(RichText), _dec4 = property({
        displayName: "多语言 key"
      }), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = class I18nLabel extends (_crd && I18nBase === void 0 ? (_reportPossibleCrUseOfI18nBase({
        error: Error()
      }), I18nBase) : I18nBase) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "code", _descriptor, this);

          /** 多语言标签组件变量 */
          this.lbl = null;
        }

        /** 获取多语言 key */
        get key() {
          return this.code;
        }
        /** 设置多语言 key 并刷新内容 */


        set key(value) {
          this.code = value;
          this.refresh();
        }
        /** 刷新文本内容，根据当前语言设置更新组件的 string 属性 */


        refresh() {
          if (EDITOR) return; // 编辑器模式下不刷新

          if (!this.lbl) {
            this.lbl = this.getComponent(Label) || this.getComponent(RichText);

            if (!this.lbl) {
              (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
                error: Error()
              }), logMgr) : logMgr).err("未找到 Label 或 RichText 组件。");
              return;
            }
          }

          this.lbl.string = (_crd && langMgr === void 0 ? (_reportPossibleCrUseOflangMgr({
            error: Error()
          }), langMgr) : langMgr).getLanguage(this.key);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "code", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return "";
        }
      })), _class2)) || _class) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e80e0b08e6bb3cfffc49ee243f041e9c3c34238b.js.map