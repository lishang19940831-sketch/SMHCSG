System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, easing, Node, tween, v3, Vec3, BuildingBase, Lumberjack, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, BuildingLumberjack;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBuildingBase(extras) {
    _reporterNs.report("BuildingBase", "./BuildingBase", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLumberjack(extras) {
    _reporterNs.report("Lumberjack", "../Role/Lumberjack", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      easing = _cc.easing;
      Node = _cc.Node;
      tween = _cc.tween;
      v3 = _cc.v3;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      BuildingBase = _unresolved_2.BuildingBase;
    }, function (_unresolved_3) {
      Lumberjack = _unresolved_3.Lumberjack;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ee520GYaLVGQ6ZsbcBiUeLR", "BuildingLumberjack", undefined);

      __checkObsolete__(['_decorator', 'Animation', 'Component', 'easing', 'Node', 'tween', 'v3', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BuildingLumberjack", BuildingLumberjack = (_dec = ccclass('BuildingLumberjack'), _dec2 = property({
        type: Node,
        displayName: '建筑模型'
      }), _dec3 = property({
        type: Node,
        displayName: '解锁后伐木工移动道德位置点'
      }), _dec4 = property({
        type: Node,
        displayName: '每次去砍树先去的位置'
      }), _dec5 = property({
        type: Node,
        displayName: '商店位置（交付木头的目标位置）'
      }), _dec6 = property({
        type: _crd && Lumberjack === void 0 ? (_reportPossibleCrUseOfLumberjack({
          error: Error()
        }), Lumberjack) : Lumberjack,
        displayName: '伐木工人'
      }), _dec(_class = (_class2 = class BuildingLumberjack extends (_crd && BuildingBase === void 0 ? (_reportPossibleCrUseOfBuildingBase({
        error: Error()
      }), BuildingBase) : BuildingBase) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "model", _descriptor, this);

          _initializerDefineProperty(this, "movePos", _descriptor2, this);

          _initializerDefineProperty(this, "treePos", _descriptor3, this);

          _initializerDefineProperty(this, "shopPos", _descriptor4, this);

          _initializerDefineProperty(this, "lumberjack", _descriptor5, this);
        }

        onLoad() {
          super.onLoad(); // 根据建筑类型设置伐木工人的目标列表类型

          this.setLumberjackType();
        }
        /**
         * 根据建筑类型设置伐木工人的目标列表类型
         */


        setLumberjackType() {
          if (this.lumberjack) {
            // 根据建筑类型设置伐木工人类型
            this.lumberjack.lumberjackType = this.Type;
          }
        }

        async showUnlockAnim() {
          return new Promise((resolve, reject) => {
            this.model.active = true;
            this.model.setScale(new Vec3(0, 0, 0));
            this.lumberjack.node.active = true;
            this.lumberjack.node.setScale(0.1, 0.1, 0.1);
            this.lumberjack.enableAI = false;
            tween(this.model).to(0.5, {
              scale: new Vec3(0.4, 0.4, 0.4)
            }, {
              easing: easing.backOut
            }).call(() => {
              tween(this.lumberjack.node).to(0.5, {
                scale: v3(1, 1, 1)
              }, {
                easing: easing.backOut
              }).start();
              resolve();
            }).start();
          });
        }

        async showlock() {
          this.model.active = false;
          this.lumberjack.node.active = false;
          this.lumberjack.node.setScale(0.1, 0.1, 0.1);
          this.lumberjack.enableAI = false;
          this.lumberjack.node.setWorldPosition(this.node.getWorldPosition());
          this.lumberjack.reset();
        }

        onUnlockFinished() {
          // 确保伐木工人类型正确设置
          this.setLumberjackType(); // 初始化伐木工，设置砍树前的位置和商店位置

          if (this.treePos && this.shopPos) {
            this.lumberjack.init(this.treePos.getWorldPosition(), this.shopPos.getWorldPosition());
          } else {//console.warn('BuildingLumberjack: treePos 或 shopPos 未设置');
          } // 子类重写


          this.lumberjack.movementComponent.moveToWorldPosition(this.movePos.getWorldPosition(), () => {
            this.scheduleOnce(() => {
              this.lumberjack.enableAI = true;
            }, 0.3);
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "model", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "movePos", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "treePos", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "shopPos", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "lumberjack", [_dec6], {
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
//# sourceMappingURL=52d2c3eed2a8677793dfa708a36504130f4d31de.js.map