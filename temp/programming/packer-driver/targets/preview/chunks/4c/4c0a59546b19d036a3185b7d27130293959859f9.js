System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Animation, BuildingBase, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, BuildingCommon;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBuildingBase(extras) {
    _reporterNs.report("BuildingBase", "./BuildingBase", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Animation = _cc.Animation;
    }, function (_unresolved_2) {
      BuildingBase = _unresolved_2.BuildingBase;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "59d90XGK15MQL7kuy/GqIo0", "BuildingCommon", undefined);

      __checkObsolete__(['_decorator', 'Animation', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BuildingCommon", BuildingCommon = (_dec = ccclass('BuildingCommon'), _dec2 = property({
        type: Animation,
        displayName: '建筑解锁动画'
      }), _dec(_class = (_class2 = class BuildingCommon extends (_crd && BuildingBase === void 0 ? (_reportPossibleCrUseOfBuildingBase({
        error: Error()
      }), BuildingBase) : BuildingBase) {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "anim", _descriptor, this);
        }

        onLoad() {
          super.onLoad();
        }

        showUnlockAnim() {
          var _this = this;

          return _asyncToGenerator(function* () {
            return new Promise((resolve, reject) => {
              _this.anim.node.active = true;

              _this.anim.on(Animation.EventType.FINISHED, () => {
                resolve();
              });

              _this.anim.play();
            });
          })();
        }

        showlock() {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            _this2.anim.node.active = false;
          })();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "anim", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4c0a59546b19d036a3185b7d27130293959859f9.js.map