System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, DropItemCom, ObjectType, _dec, _class, _crd, ccclass, DropItemFlatbread;

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

      _cclegacy._RF.push({}, "14e8f9JQcBCsqaYwTBOuWm5", "DropItemFlatbread", undefined);

      __checkObsolete__(['_decorator']);

      ({
        ccclass
      } = _decorator);
      /**
       * 大饼掉落物品类
       */

      _export("DropItemFlatbread", DropItemFlatbread = (_dec = ccclass('DropItemFlatbread'), _dec(_class = class DropItemFlatbread extends (_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
        error: Error()
      }), DropItemCom) : DropItemCom) {
        onLoad() {
          this.objectType = (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemFlatbread;
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
//# sourceMappingURL=84f4f81010239a85e4bbeaabb26facb3aea0ec0e.js.map