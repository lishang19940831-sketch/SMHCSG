System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, Parser, _crd;

  _export("Parser", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c69962pUh9FN597ESsHwcTd", "Parser", undefined);

      /**
       * 解析器
       * 提供路径解析功能。
       */
      _export("Parser", Parser = class Parser {
        /**
         * 解析资源路径并将其分解为包名和路径
         *
         * @param resPath - 要解析的资源路径
         * @returns 返回包含 bundleName 和 path 的对象
         */
        static path(resPath) {
          const [bundleName, ...pathParts] = resPath.split('/');
          return {
            bundleName,
            path: pathParts.join('/')
          };
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3e2b3f993884e79dde020a24a1a92ce4926e9241.js.map