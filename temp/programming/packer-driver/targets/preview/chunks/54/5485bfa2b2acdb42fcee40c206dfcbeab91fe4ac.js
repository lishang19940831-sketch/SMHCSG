System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Collider, Component, _dec, _class, _crd, ccclass, property, Test;

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

      _cclegacy._RF.push({}, "a881927shlB3KP7fSQvrWsi", "Test", undefined);

      __checkObsolete__(['_decorator', 'CCFloat', 'Collider', 'Component', 'Node', 'tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Test", Test = (_dec = ccclass('Test'), _dec(_class = class Test extends Component {
        onLoad() {
          var coll = this.node.getComponent(Collider);
          coll.on("onTriggerEnter", this.onTriggerEnter, this);
          coll.on("onTriggerExit", this.onTriggerExit, this);
          coll.on("onTriggerStay", this.onTriggerStay, this);
        }

        onTriggerEnter(selfCollider, otherCollider, event) {//console.log("onTriggerEnter");
        }

        onTriggerExit(selfCollider, otherCollider, event) {//console.log("onTriggerExit");
        }

        onTriggerStay(selfCollider, otherCollider, event) {//console.log("onTriggerStay");
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5485bfa2b2acdb42fcee40c206dfcbeab91fe4ac.js.map