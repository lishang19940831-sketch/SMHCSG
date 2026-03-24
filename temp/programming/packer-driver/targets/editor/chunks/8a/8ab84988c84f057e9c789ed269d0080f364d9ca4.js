System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _class, _crd, ccclass, UIComponent;

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

      _cclegacy._RF.push({}, "64441+Sx0ZJGrkvsBZ1HoiP", "UIComp", undefined);

      __checkObsolete__(['_decorator', 'Component']);

      ({
        ccclass
      } = _decorator);
      /** 基础UI组件类 */

      _export("default", UIComponent = ccclass(_class = class UIComponent extends Component {
        constructor(...args) {
          super(...args);

          /** 组件数据 */
          this.data = void 0;
        }

        /** 组件加载时调用 */
        onLoad() {
          this.onInit();
        }
        /** 组件启用时调用 */


        onEnable() {
          this.onShow();
        }
        /** 组件禁用时调用 */


        onDisable() {
          this.onHide();
        }
        /** 初始化组件 */


        onInit() {// 初始化逻辑
        }
        /** 显示组件 */


        onShow() {// 显示逻辑
        }
        /** 隐藏组件 */


        onHide() {// 隐藏逻辑
        }
        /**
         * 隐藏组件，并根据需要销毁节点
         * @param isDispose - 如果为 true，则销毁节点；否则仅移除节点
         */


        Hide(isDispose = false) {
          if (isDispose) {
            this.node.destroy();
          } else {
            this.node.removeFromParent();
          }
        }

      }) || _class);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8ab84988c84f057e9c789ed269d0080f364d9ca4.js.map