System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Tween, MeshRenderer, Color, PoolObjectBase, ComponentEvent, _dec, _class, _crd, ccclass, property, DropItemCom;

  function _reportPossibleCrUseOfPoolObjectBase(extras) {
    _reporterNs.report("PoolObjectBase", "../../Main/Common/PoolObjectBase", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../Common/ComponentEvents", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Tween = _cc.Tween;
      MeshRenderer = _cc.MeshRenderer;
      Color = _cc.Color;
    }, function (_unresolved_2) {
      PoolObjectBase = _unresolved_2.PoolObjectBase;
    }, function (_unresolved_3) {
      ComponentEvent = _unresolved_3.ComponentEvent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4e3b8jVU8hNu51BObBGn7UY", "DropItemCom", undefined);

      __checkObsolete__(['_decorator', 'Tween', 'tween', 'Vec3', 'Node', 'MeshRenderer', 'Color']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("DropItemCom", DropItemCom = (_dec = ccclass('DropItemCom'), _dec(_class = class DropItemCom extends (_crd && PoolObjectBase === void 0 ? (_reportPossibleCrUseOfPoolObjectBase({
        error: Error()
      }), PoolObjectBase) : PoolObjectBase) {
        constructor(...args) {
          super(...args);
          this.canPickup = false;
          this.tween = null;
        }

        /**
         * 播放掉落后的旋转动画
         */
        showRotate() {// Tween.stopAllByTarget(this.node);
          // this.node.setRotationFromEuler(-90, 0, 0);
          // this.tween = tween(this.node)
          //     .by(1, { eulerAngles: new Vec3(0, 360, 0) })
          //     .repeatForever()
          //     .start();
        }

        OnPickUpFinish() {
          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).PICKUP_ITEM_FINISH, this.objectType);
        }

        reset() {
          this.canPickup = false;
          this.node.setRotationFromEuler(0, 0, 0);
          Tween.stopAllByTarget(this.node);
          this.node.setScale(1, 1, 1);
          this.resetColor(this.node);
        }

        onDestroy() {
          var _this$node;

          console.warn(`[DropItemCom] onDestroy! name=${(_this$node = this.node) == null ? void 0 : _this$node.name}`, new Error().stack);
        }

        resetColor(node) {
          //只有肉这么做，其他物品不需要
          return;
          const meshRenderer = node.getComponent(MeshRenderer);

          if (meshRenderer && meshRenderer.material) {
            meshRenderer.material.setProperty('emissive', new Color(0, 0, 0, 255));
          }

          node.children.forEach(child => this.resetColor(child));
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=71dc57ddddabca0a973550560c68193a554c2f52.js.map