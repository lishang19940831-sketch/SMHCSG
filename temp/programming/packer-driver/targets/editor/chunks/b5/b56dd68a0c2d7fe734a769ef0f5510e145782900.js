System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, audioMgr, bundleMgr, dataMgr, eventMgr, langMgr, logMgr, resMgr, timeMgr, uiRoot, Core, _crd;

  function _reportPossibleCrUseOfaudioMgr(extras) {
    _reporterNs.report("audioMgr", "./Managers/AudioMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfbundleMgr(extras) {
    _reporterNs.report("bundleMgr", "./Managers/BundleMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfdataMgr(extras) {
    _reporterNs.report("dataMgr", "./Managers/DataMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfeventMgr(extras) {
    _reporterNs.report("eventMgr", "./Managers/EventMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOflangMgr(extras) {
    _reporterNs.report("langMgr", "./Managers/LangMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOflogMgr(extras) {
    _reporterNs.report("logMgr", "./Managers/LogMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfresMgr(extras) {
    _reporterNs.report("resMgr", "./Managers/ResMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOftimeMgr(extras) {
    _reporterNs.report("timeMgr", "./Managers/TimeMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfuiRoot(extras) {
    _reporterNs.report("uiRoot", "./UI/UIRoot", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      audioMgr = _unresolved_2.audioMgr;
    }, function (_unresolved_3) {
      bundleMgr = _unresolved_3.bundleMgr;
    }, function (_unresolved_4) {
      dataMgr = _unresolved_4.dataMgr;
    }, function (_unresolved_5) {
      eventMgr = _unresolved_5.eventMgr;
    }, function (_unresolved_6) {
      langMgr = _unresolved_6.langMgr;
    }, function (_unresolved_7) {
      logMgr = _unresolved_7.logMgr;
    }, function (_unresolved_8) {
      resMgr = _unresolved_8.resMgr;
    }, function (_unresolved_9) {
      timeMgr = _unresolved_9.timeMgr;
    }, function (_unresolved_10) {
      uiRoot = _unresolved_10.uiRoot;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f7f91WeY6JEP5A3XGfORIKy", "Core", undefined); // 管理器


      /**
       * Core 类
       * 负责映射导出框架接口
       */
      Core = class Core {
        constructor() {
          /** 音频管理器 */
          this.audio = _crd && audioMgr === void 0 ? (_reportPossibleCrUseOfaudioMgr({
            error: Error()
          }), audioMgr) : audioMgr;

          /** 分包管理器 */
          this.bundle = _crd && bundleMgr === void 0 ? (_reportPossibleCrUseOfbundleMgr({
            error: Error()
          }), bundleMgr) : bundleMgr;

          /** 数据管理器 */
          this.data = _crd && dataMgr === void 0 ? (_reportPossibleCrUseOfdataMgr({
            error: Error()
          }), dataMgr) : dataMgr;

          /** 事件管理器 */
          this.event = _crd && eventMgr === void 0 ? (_reportPossibleCrUseOfeventMgr({
            error: Error()
          }), eventMgr) : eventMgr;

          /** 语言管理器 */
          this.lang = _crd && langMgr === void 0 ? (_reportPossibleCrUseOflangMgr({
            error: Error()
          }), langMgr) : langMgr;

          /** 日志管理器 */
          this.log = _crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
            error: Error()
          }), logMgr) : logMgr;

          /** 资源管理器 */
          this.res = _crd && resMgr === void 0 ? (_reportPossibleCrUseOfresMgr({
            error: Error()
          }), resMgr) : resMgr;

          /** 时间管理器 */
          this.time = _crd && timeMgr === void 0 ? (_reportPossibleCrUseOftimeMgr({
            error: Error()
          }), timeMgr) : timeMgr;

          /** 界面管理器 */
          this.ui = _crd && uiRoot === void 0 ? (_reportPossibleCrUseOfuiRoot({
            error: Error()
          }), uiRoot) : uiRoot;
        }

      };
      /** 全局 Window 接口 */

      /** 创建 Core 类的实例并赋值给全局 window 对象 */
      window.app = new Core();

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b56dd68a0c2d7fe734a769ef0f5510e145782900.js.map