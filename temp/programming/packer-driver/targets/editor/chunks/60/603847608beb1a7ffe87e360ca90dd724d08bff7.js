System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Label, tween, UIOpacity, Vec3, PoolObjectBase, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, TipLabel;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPoolObjectBase(extras) {
    _reporterNs.report("PoolObjectBase", "../Common/PoolObjectBase", _context.meta, extras);
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
      tween = _cc.tween;
      UIOpacity = _cc.UIOpacity;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      PoolObjectBase = _unresolved_2.PoolObjectBase;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b213bgxVWpFdpWVrjg+7ty1", "TipLabel", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Component', 'Label', 'Node', 'tween', 'UIOpacity', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("TipLabel", TipLabel = (_dec = ccclass('TipLabel'), _dec2 = property(Label), _dec3 = property(UIOpacity), _dec(_class = (_class2 = class TipLabel extends (_crd && PoolObjectBase === void 0 ? (_reportPossibleCrUseOfPoolObjectBase({
        error: Error()
      }), PoolObjectBase) : PoolObjectBase) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "label", _descriptor, this);

          _initializerDefineProperty(this, "opacity", _descriptor2, this);
        }

        showTip(Tip, worldPos, color) {
          this.label.string = Tip;
          this.node.active = true; // 设置位置

          this.node.setWorldPosition(worldPos); // 设置颜色

          if (color) {
            this.label.color = color;
          }

          this.opacity.opacity = 255;
          const pos = this.node.getPosition().add(new Vec3(0, 3, 0)); // 设置动画

          tween(this.node).delay(0.3).to(0.3, {
            position: pos
          }).start();
          tween(this.opacity).delay(0.3).to(0.3, {
            opacity: 0
          }).call(() => {
            this.node.active = false;
            manager.pool.putNode(this.node);
          }).start();
        }

        reset() {
          this.label.string = '';
          this.opacity.opacity = 0;
          this.node.active = false;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "opacity", [_dec3], {
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
//# sourceMappingURL=603847608beb1a7ffe87e360ca90dd724d08bff7.js.map