System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, UIComp, _decorator, uiRoot, _class, _crd, ccclass, UIView;

  function _reportPossibleCrUseOfUIComp(extras) {
    _reporterNs.report("UIComp", "./UIComp", _context.meta, extras);
  }

  function _reportPossibleCrUseOfuiRoot(extras) {
    _reporterNs.report("uiRoot", "./UIRoot", _context.meta, extras);
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
      UIComp = _unresolved_2.default;
    }, function (_unresolved_3) {
      uiRoot = _unresolved_3.uiRoot;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "38153b2fApFPYxYH5ISP4WX", "UIView", undefined);

      __checkObsolete__(['Node']);

      __checkObsolete__(['_decorator']);

      ({
        ccclass
      } = _decorator);
      /** 面板基类 */

      _export("default", UIView = ccclass(_class = class UIView extends (_crd && UIComp === void 0 ? (_reportPossibleCrUseOfUIComp({
        error: Error()
      }), UIComp) : UIComp) {
        constructor(...args) {
          super(...args);

          /** 是否模态窗 */
          this.isModal = true;

          /** 是否点击空白处关闭 */
          this.isClickVoidClose = true;

          /** 用户点击该层时，面板将会被关闭 */
          this.clickCloseLayer = null;
        }

        /** 获取包名 */
        static get pack() {
          return "";
        }
        /** 获取URL */


        static get url() {
          return "";
        }

        /** 组件加载时调用 */
        onLoad() {
          this.onInit();
        }
        /** 组件启用时调用 */


        onEnable() {
          this.showWithAnimation();
        }
        /** 组件禁用时调用 */


        onDisable() {
          this.onHide();
        }
        /** 面板打开动画 */


        showWithAnimation() {
          this.onShow();
        }
        /** 面板关闭动画 */


        hideWithAnimation() {
          this.hideImmediately();
        }
        /** 隐藏面板 */


        hide() {
          if (this.clickCloseLayer) {
            this.clickCloseLayer.removeFromParent();
          }

          this.hideWithAnimation();
        }
        /** 立即隐藏面板 */


        hideImmediately() {
          this.Hide();
          (_crd && uiRoot === void 0 ? (_reportPossibleCrUseOfuiRoot({
            error: Error()
          }), uiRoot) : uiRoot).hideWindowImmediately(this);
        }

      }) || _class);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5010545c86168b956ba99e9fd6980b27299fe0e6.js.map