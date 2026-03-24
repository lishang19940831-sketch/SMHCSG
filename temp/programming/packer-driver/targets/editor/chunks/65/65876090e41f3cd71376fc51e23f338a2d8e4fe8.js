System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, director, instantiate, resMgr, UIRoot, _class, _crd, uiRoot;

  function _reportPossibleCrUseOfresMgr(extras) {
    _reporterNs.report("resMgr", "../Managers/ResMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIComp(extras) {
    _reporterNs.report("UIComp", "./UIComp", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIScene(extras) {
    _reporterNs.report("UIScene", "./UIScene", _context.meta, extras);
  }

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
      director = _cc.director;
      instantiate = _cc.instantiate;
    }, function (_unresolved_2) {
      resMgr = _unresolved_2.resMgr;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2cdf3lu2XBArait8fTcbInl", "UIRoot", undefined);

      __checkObsolete__(['director', 'instantiate', 'Node', 'Prefab']);

      /** 管理UI视图的显示和隐藏 */
      UIRoot = class UIRoot {
        constructor() {
          /** 缓存已加载的UI视图 */
          this.cacheList = new Map();

          /** 已打开的UI视图列表 */
          this.openList = [];

          /** 当前显示的场景 */
          this.currentScene = null;
        }

        /** 获取根节点，即Canvas节点 */
        get root() {
          return director.getScene().getChildByName('Canvas');
        }
        /**
         * 显示场景
         * @param SceneClass 场景类
         * @param data 传递给场景的数据
         */


        async showScene(SceneClass, data = null) {
          if (this.currentScene) this.currentScene.hide();
          this.currentScene = await this.showWindow(SceneClass, data);
        }
        /**
         * 显示窗口
         * @param WindowClass 窗口类
         * @param data 传递给窗口的数据
         * @returns 返回显示的UIView实例
         */


        async showWindow(WindowClass, data = null) {
          const path = `${WindowClass['pack']}/${WindowClass['url']}`;
          let view = this.cacheList.get(path);

          if (!view) {
            const node = instantiate(await (_crd && resMgr === void 0 ? (_reportPossibleCrUseOfresMgr({
              error: Error()
            }), resMgr) : resMgr).loadRes(path));
            const uiComp = node.getComponent(WindowClass) || node.addComponent(WindowClass);
            this.cacheList.set(path, uiComp);
            view = uiComp;
            view.data = data;
          }

          view.node.parent = this.root;
          this.openList.push(view);
          view.node.setSiblingIndex(this.root.children.length - 1);
          return view;
        }
        /**
         * 隐藏窗口
         * @param view 要隐藏的UIView实例
         */


        hideWindow(view) {
          view.hide();
        }
        /**
         * 立即隐藏窗口
         * @param view 要隐藏的UIView实例
         * @param dispose 是否销毁
         */


        hideWindowImmediately(view, dispose = false) {
          const index = this.openList.indexOf(view);
          if (index >= 0) this.openList.splice(index, 1);
          if (dispose) view.node.destroy();
        }

      };
      /** 导出单例实例 */

      _class = UIRoot;

      /** 单例实例 */
      UIRoot.instance = new _class();

      _export("uiRoot", uiRoot = UIRoot.instance);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=65876090e41f3cd71376fc51e23f338a2d8e4fe8.js.map