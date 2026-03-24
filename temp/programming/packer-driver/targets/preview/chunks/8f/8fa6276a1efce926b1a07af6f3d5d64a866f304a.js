System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, UIView, _class, _crd, ccclass, UIScene;

  function _reportPossibleCrUseOfUIView(extras) {
    _reporterNs.report("UIView", "./UIView", _context.meta, extras);
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
      UIView = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "bb3faW2SelNOZ7pvdf2mMtz", "UIScene", undefined);

      __checkObsolete__(['_decorator']);

      ({
        ccclass
      } = _decorator);
      /** 场景基类 */

      _export("UIScene", UIScene = ccclass(_class = class UIScene extends (_crd && UIView === void 0 ? (_reportPossibleCrUseOfUIView({
        error: Error()
      }), UIView) : UIView) {
        /** 组件加载时调用 */
        onLoad() {
          // 场景不需要模态窗
          this.isModal = false; // 调用父类的初始化方法

          this.onInit();
        }

      }) || _class);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8fa6276a1efce926b1a07af6f3d5d64a866f304a.js.map