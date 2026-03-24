System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Character, _dec, _class, _crd, ccclass, property, BaseComponet;

  function _reportPossibleCrUseOfCharacter(extras) {
    _reporterNs.report("Character", "../Role/Character", _context.meta, extras);
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
      Character = _unresolved_2.Character;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3f754suOwRMTKHG/XA0lUBK", "BaseComponet", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Component', 'Node', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 基础动画组件 - 所有动画组件的父类，包含通用逻辑
       */

      _export("BaseComponet", BaseComponet = (_dec = ccclass('BaseComponet'), _dec(_class = class BaseComponet extends Component {
        constructor(...args) {
          super(...args);
          this._character = null;
        }

        onLoad() {
          this.character = this.node.getComponent(_crd && Character === void 0 ? (_reportPossibleCrUseOfCharacter({
            error: Error()
          }), Character) : Character);
        }

        get character() {
          return this._character;
        }

        set character(value) {
          this._character = value;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=dba1a855f86121305f46bc190eb175df05eed8b6.js.map