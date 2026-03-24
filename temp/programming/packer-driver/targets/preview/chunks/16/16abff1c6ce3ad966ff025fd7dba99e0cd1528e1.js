System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _cc, EDITOR, adaptation_config, _crd, cc;

  function _reportPossibleCrUseOfadaptation_config(extras) {
    _reporterNs.report("adaptation_config", "./global_config", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc2) {
      _cclegacy = _cc2.cclegacy;
      __checkObsolete__ = _cc2.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc2.__checkObsoleteInNamespace__;
      _cc = _cc2;
    }, function (_ccEnv) {
      EDITOR = _ccEnv.EDITOR;
    }, function (_unresolved_2) {
      adaptation_config = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "294a82+wtZN9J4CYp7lp3/a", "mk_init", undefined);

      cc = __checkObsoleteInNamespace__(_cc);

      // 初始化逻辑
      if (!EDITOR) {
        // 保存初始设计分辨率
        cc.director.once(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, () => {
          (_crd && adaptation_config === void 0 ? (_reportPossibleCrUseOfadaptation_config({
            error: Error()
          }), adaptation_config) : adaptation_config).view.original_design_size.set(cc.view.getDesignResolutionSize());
        }); // 屏幕大小改变事件分发

        cc.screen.on("window-resize", () => {
          app.event.emit("view_resize");
        });
        cc.screen.on("fullscreen-change", () => {
          app.event.emit("view_resize");
        });
        cc.screen.on("orientation-change", () => {
          app.event.emit("view_resize");
        });
      }

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=16abff1c6ce3ad966ff025fd7dba99e0cd1528e1.js.map