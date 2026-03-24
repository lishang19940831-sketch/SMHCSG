System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, eventMgr, _dec, _class, _crd, ccclass, I18nBase;

  function _reportPossibleCrUseOfeventMgr(extras) {
    _reporterNs.report("eventMgr", "../../Managers/EventMgr", _context.meta, extras);
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
      eventMgr = _unresolved_2.eventMgr;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1f3efbkbIJCLZB5dTJesvgf", "I18nBase", undefined);

      __checkObsolete__(['_decorator', 'Component']);

      ({
        ccclass
      } = _decorator);
      /** 多语言抽象组件基类 */

      _export("I18nBase", I18nBase = (_dec = ccclass('I18nBase'), _dec(_class = class I18nBase extends Component {
        /** 组件加载时调用，注册语言更改事件 */
        onLoad() {
          (_crd && eventMgr === void 0 ? (_reportPossibleCrUseOfeventMgr({
            error: Error()
          }), eventMgr) : eventMgr).on('langChange', this.refresh, this);
          this.refresh();
        }
        /** 组件销毁时调用，注销语言更改事件 */


        onDestroy() {
          (_crd && eventMgr === void 0 ? (_reportPossibleCrUseOfeventMgr({
            error: Error()
          }), eventMgr) : eventMgr).off('langChange', this.refresh);
        }
        /** 刷新多语言，子类需实现具体逻辑 */


      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=31fdae4afcc3a7abacafc69a67734846cbf98c1e.js.map