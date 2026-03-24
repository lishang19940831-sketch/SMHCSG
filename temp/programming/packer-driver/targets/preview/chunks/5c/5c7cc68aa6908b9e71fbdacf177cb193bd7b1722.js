System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, DropItemCom, ObjectType, _dec, _class, _crd, ccclass, DropItemCornKernel;

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
    }, function (_unresolved_2) {
      DropItemCom = _unresolved_2.DropItemCom;
    }, function (_unresolved_3) {
      ObjectType = _unresolved_3.ObjectType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "438afHF6LpFKYPSYlkd+Cok", "DropItemCornKernel", undefined);

      __checkObsolete__(['_decorator', 'Tween']);

      ({
        ccclass
      } = _decorator);
      /**
       * 麦子（玉米粒）掉落物品类
       */

      _export("DropItemCornKernel", DropItemCornKernel = (_dec = ccclass('DropItemCornKernel'), _dec(_class = class DropItemCornKernel extends (_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
        error: Error()
      }), DropItemCom) : DropItemCom) {
        onLoad() {
          this.objectType = (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemCornKernel;
        }

        reset() {
          super.reset();
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5c7cc68aa6908b9e71fbdacf177cb193bd7b1722.js.map