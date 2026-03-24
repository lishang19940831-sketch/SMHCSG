System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Sprite, SpriteFrame, EDITOR, I18nBase, logMgr, langMgr, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _dec4, _dec5, _dec6, _class4, _class5, _descriptor3, _crd, ccclass, property, requireComponent, I18nSpriteData, I18nSprite;

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
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
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

      _cclegacy._RF.push({}, "c5d4c/+Wv5CKJ3bYynBrSbI", "I18nSprite", undefined);

      __checkObsolete__(['_decorator', 'Sprite', 'SpriteFrame']);

      ({
        ccclass,
        property,
        requireComponent
      } = _decorator);
      /** 存储语言代码与对应的精灵帧 */

      _export("I18nSpriteData", I18nSpriteData = (_dec = ccclass("I18nSpriteData"), _dec2 = property({
        displayName: "语言代码",
        tooltip: "如：en、zh等"
      }), _dec3 = property({
        displayName: "对应精灵",
        type: SpriteFrame
      }), _dec(_class = (_class2 = class I18nSpriteData {
        constructor() {
          _initializerDefineProperty(this, "langCode", _descriptor, this);

          _initializerDefineProperty(this, "spriteFrame", _descriptor2, this);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "langCode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spriteFrame", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      /** 根据当前语言自动更新精灵帧 */


      _export("I18nSprite", I18nSprite = (_dec4 = ccclass("I18nSprite"), _dec5 = requireComponent(Sprite), _dec6 = property({
        displayName: "多语言精灵数据列表",
        type: [I18nSpriteData]
      }), _dec4(_class4 = _dec5(_class4 = (_class5 = class I18nSprite extends (_crd && I18nBase === void 0 ? (_reportPossibleCrUseOfI18nBase({
        error: Error()
      }), I18nBase) : I18nBase) {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "spList", _descriptor3, this);

          /** 多语言精灵组件变量 */
          this.sp = null;
        }

        /** 刷新精灵帧，根据当前语言设置更新 Sprite 的 spriteFrame 属性 */
        refresh() {
          if (EDITOR) return; // 编辑器模式下不刷新

          if (!this.sp) {
            this.sp = this.getComponent(Sprite);

            if (!this.sp) {
              (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
                error: Error()
              }), logMgr) : logMgr).err("未找到 Sprite 组件。");
              return;
            }
          }

          var spriteData = this.spList.find(data => data.langCode === (_crd && langMgr === void 0 ? (_reportPossibleCrUseOflangMgr({
            error: Error()
          }), langMgr) : langMgr).lang);

          if (spriteData != null && spriteData.spriteFrame) {
            this.sp.spriteFrame = spriteData.spriteFrame;
          } else {
            (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
              error: Error()
            }), logMgr) : logMgr).err("\u672A\u627E\u5230\u8BED\u8A00\u4EE3\u7801\u4E3A " + (_crd && langMgr === void 0 ? (_reportPossibleCrUseOflangMgr({
              error: Error()
            }), langMgr) : langMgr).lang + " \u7684\u7CBE\u7075\u5E27\u3002");
          }
        }

      }, (_descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "spList", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class5)) || _class4) || _class4));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=37d81c8d98a4d5dca6cb1cd9420184ded99618bd.js.map