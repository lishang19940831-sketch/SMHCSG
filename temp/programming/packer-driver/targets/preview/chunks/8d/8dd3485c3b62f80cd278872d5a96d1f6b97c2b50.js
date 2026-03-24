System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Tween, tween, Vec3, DropItemCom, ObjectType, _dec, _class, _crd, ccclass, property, DropItemWood;

  function _reportPossibleCrUseOfDropItemCom(extras) {
    _reporterNs.report("DropItemCom", "./DropItemCom", _context.meta, extras);
  }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../../Main/Common/CommonEnum", _context.meta, extras);
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
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      DropItemCom = _unresolved_2.DropItemCom;
    }, function (_unresolved_3) {
      ObjectType = _unresolved_3.ObjectType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7d558RVrkZOL7ubOsSmKJPq", "DropItemWood", undefined);

      __checkObsolete__(['_decorator', 'Tween', 'tween', 'Vec3', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 木头掉落物品类
       */

      _export("DropItemWood", DropItemWood = (_dec = ccclass('DropItemWood'), _dec(_class = class DropItemWood extends (_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
        error: Error()
      }), DropItemCom) : DropItemCom) {
        onLoad() {
          // 设置物品类型为木头
          this.objectType = (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemWood;
        }
        /**
         * 播放掉落后的旋转动画
         */


        showRotate() {
          // 可以在这里添加木头特有的掉落动画
          // 例如轻微的摇摆效果
          Tween.stopAllByTarget(this.node); // 轻微的左右摇摆动画

          tween(this.node).by(0.5, {
            eulerAngles: new Vec3(0, 0, 5)
          }).by(1, {
            eulerAngles: new Vec3(0, 0, -10)
          }).by(1, {
            eulerAngles: new Vec3(0, 0, 10)
          }).by(0.5, {
            eulerAngles: new Vec3(0, 0, -5)
          }).repeatForever().start();
        }

        reset() {
          super.reset(); // 木头特有的重置逻辑可以在这里添加
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8dd3485c3b62f80cd278872d5a96d1f6b97c2b50.js.map