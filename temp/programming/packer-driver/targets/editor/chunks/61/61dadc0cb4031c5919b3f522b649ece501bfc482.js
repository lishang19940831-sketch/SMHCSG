System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, ObjectType, _dec, _class, _crd, ccclass, property, PoolObjectBase;

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "./CommonEnum", _context.meta, extras);
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
    }, function (_unresolved_2) {
      ObjectType = _unresolved_2.ObjectType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2b210zCT5FGu6j6WjwDFJ/Z", "PoolObjectBase", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Enum', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PoolObjectBase", PoolObjectBase = (_dec = ccclass('PoolObjectBase'), _dec(_class = class PoolObjectBase extends Component {
        constructor(...args) {
          super(...args);

          /** 对象类型 */
          this.objectType = (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).None;
        }
        /**
         * 重置对象
         */


        /**
         * 回收对象
         */
        recycle() {
          this.reset();
          manager.pool.putNode(this.node);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=61dadc0cb4031c5919b3f522b649ece501bfc482.js.map