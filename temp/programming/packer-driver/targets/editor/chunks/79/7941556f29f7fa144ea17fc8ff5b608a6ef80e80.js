System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, CommonEvent, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, executeInEditMode, LookAtCamera;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      CommonEvent = _unresolved_2.CommonEvent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "cbd44LE+rpAGoiv/StkaTtv", "LookAtCamera", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Quat', 'v3', 'Vec3']);

      ({
        ccclass,
        property,
        executeInEditMode
      } = _decorator);

      _export("LookAtCamera", LookAtCamera = (_dec = ccclass('LookAtCamera'), _dec2 = property(Node), _dec(_class = (_class2 = class LookAtCamera extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "displayNode", _descriptor, this);

          this.cameraWorldPosition = new Vec3();
          this.isUpdating = false;
        }

        // 防止递归调用的标志
        onLoad() {
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).CameraMove, this.onCameraMove, this);
          this.displayNode.on(Node.EventType.TRANSFORM_CHANGED, this.updateLookAt, this);
        }

        onDestroy() {
          this.displayNode.off(Node.EventType.TRANSFORM_CHANGED, this.updateLookAt, this);
          app.event.off((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).CameraMove, this);
        }

        onCameraMove(wpos) {
          this.cameraWorldPosition = wpos;
          this.updateLookAt(); // 直接调用更新，避免通过事件触发
        }

        updateLookAt() {
          if (!this.displayNode || this.isUpdating) return;
          this.isUpdating = true; // 设置标志，防止递归

          this.displayNode.lookAt(this.cameraWorldPosition);
          this.isUpdating = false; // 重置标志
        }

        update(dt) {// this.updateLookAt();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "displayNode", [_dec2], {
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
//# sourceMappingURL=7941556f29f7fa144ea17fc8ff5b608a6ef80e80.js.map