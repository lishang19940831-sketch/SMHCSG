System.register(["cc", "cc/env"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _cc, DEBUG, _crd, cc, adaptation_config;

  return {
    setters: [function (_cc2) {
      _cclegacy = _cc2.cclegacy;
      __checkObsolete__ = _cc2.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc2.__checkObsoleteInNamespace__;
      _cc = _cc2;
    }, function (_ccEnv) {
      DEBUG = _ccEnv.DEBUG;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "77e0bP3sSNFjro/CUvGBpN1", "global_config", undefined);

      cc = __checkObsoleteInNamespace__(_cc);

      (function (_adaptation_config) {
        let view;

        (function (_view) {
          let adaptation_mode = /*#__PURE__*/function (adaptation_mode) {
            adaptation_mode[adaptation_mode["none"] = 0] = "none";
            adaptation_mode[adaptation_mode["adaptive"] = 1] = "adaptive";
            adaptation_mode[adaptation_mode["fixed_size"] = 2] = "fixed_size";
            return adaptation_mode;
          }({});

          _view.adaptation_mode = adaptation_mode;
          const adaptation_type = _view.adaptation_type = adaptation_mode.none;
          const original_design_size = _view.original_design_size = cc.size(960, 640);
        })(view || (view = _adaptation_config.view || (_adaptation_config.view = {})));
      })(adaptation_config || (adaptation_config = {}));

      if (DEBUG) {
        window["global_config"] = adaptation_config;
      }

      _export("default", adaptation_config);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6f494361bfb985ec48aadd0915038d1d7152d724.js.map