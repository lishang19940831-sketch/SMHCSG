System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Collider, Component, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, SAFE;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Collider = _cc.Collider;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "08c3dBOIH1L6KcAjl+iSSoL", "SAFE", undefined);

      __checkObsolete__(['_decorator', 'Collider', 'Component', 'Node', 'Tween', 'tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("SAFE", SAFE = (_dec = ccclass('SAFE'), _dec2 = property({
        type: Collider,
        displayName: '区域监听'
      }), _dec(_class = (_class2 = class SAFE extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "areaCollider", _descriptor, this);
        }

        start() {
          this.areaCollider.on('onTriggerEnter', this.onTriggerEnter, this);
          this.areaCollider.on('onTriggerExit', this.onTriggerExit, this);
        }

        update(deltaTime) {}

        onTriggerEnter(selfCollider, otherCollider, event) {
          manager.game.hero.isSafeArea = true;
        }

        onTriggerExit(selfCollider, otherCollider, event) {
          manager.game.hero.isSafeArea = false;
          manager.game.hero.healEffect.active = false;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "areaCollider", [_dec2], {
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
//# sourceMappingURL=c1238df0bbd6088bc384b4e6a594bb1699d887fb.js.map