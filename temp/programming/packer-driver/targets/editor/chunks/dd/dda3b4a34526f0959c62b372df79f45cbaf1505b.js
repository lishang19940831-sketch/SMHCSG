System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, MeshRenderer, tween, Tween, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, Dissolve;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      MeshRenderer = _cc.MeshRenderer;
      tween = _cc.tween;
      Tween = _cc.Tween;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f44e1ExiuxDqZmGq9GWEcdo", "Dissolve", undefined);

      __checkObsolete__(['_decorator', 'Component', 'gfx', 'renderer', 'Material', 'Texture2D', 'SkinnedMeshRenderer', 'MeshRenderer', 'tween', 'Tween']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 溶解效果组件
       * 用于控制3D模型的溶解动画效果，支持多种溶解模式
       */

      _export("Dissolve", Dissolve = (_dec = ccclass('Dissolve'), _dec2 = property({
        type: MeshRenderer,
        displayName: '蒙皮网格渲染器',
        tooltip: '用于渲染3D模型'
      }), _dec(_class = (_class2 = class Dissolve extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "mr", _descriptor, this);

          this._progress = {
            dissolve: 0
          };
        }

        Dissolve() {
          Tween.stopAllByTarget(this._progress);
          this._progress.dissolve = 0;
          tween(this._progress).delay(0.1 * Math.random()).to(2, {
            dissolve: 1
          }, {
            onUpdate: (target, ratio) => {
              this.mr.material.setProperty('dissolveThreshold', target.dissolve, 0);
              this.mr.material.setProperty('dissolveThreshold', target.dissolve, 1);
            }
          }).start();
        }

        reset() {
          Tween.stopAllByTarget(this._progress);
          this._progress.dissolve = 0;
          this.mr.material.setProperty('dissolveThreshold', 0, 0);
          this.mr.material.setProperty('dissolveThreshold', 0, 1);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mr", [_dec2], {
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
//# sourceMappingURL=dda3b4a34526f0959c62b372df79f45cbaf1505b.js.map