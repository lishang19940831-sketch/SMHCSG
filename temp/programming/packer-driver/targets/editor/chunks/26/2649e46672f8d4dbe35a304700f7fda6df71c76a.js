System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _crd, ccclass, property, HealthBar;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "52dbdmmRe9OuY4TASXpYtd+", "HealthBar", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'UITransform', 'Sprite', 'CCFloat', 'UIOpacity', 'tween']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * HealthBar 类
       * 用于显示角色的生命值
       */

      _export("HealthBar", HealthBar = (_dec = ccclass('HealthBar'), _dec(_class = class HealthBar extends Component {
        /**
         * 更新血条显示
         * @param percentage 生命值百分比 (0-1)
         */
        updateHealth(percentage) {}
        /**
         * 显示血条
         */


        show() {}
        /**
         * 隐藏血条
         */


        hide() {}
        /**
         * 立即隐藏血条
         */


        hideImmediately() {}
        /**
         * 初始化血条
         */


        init() {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2649e46672f8d4dbe35a304700f7fda6df71c76a.js.map