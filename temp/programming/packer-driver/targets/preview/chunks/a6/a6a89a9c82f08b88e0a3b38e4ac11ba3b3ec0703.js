System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, LogMgr, _crd, logMgr;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e8f64DJlgJIJrM+vNkaKeLl", "LogMgr", undefined);

      /**
       * 日志管理器
       * 用于统一日志输出格式
       */
      LogMgr = class LogMgr {
        /**
         * 用于输出调试信息
         */
        static get debug() {
          return window.console.log.bind(window.console, '%c【调试】', 'color: white; background-color: #007BFF; font-weight: bold; font-size: 14px;');
        }
        /**
         * 用于输出一般信息
         */


        static get info() {
          return window.console.log.bind(window.console, '%c【信息】', 'color: white; background-color: #28A745; font-weight: bold; font-size: 14px;');
        }
        /**
         * 用于输出警告信息
         */


        static get warn() {
          return window.console.log.bind(window.console, '%c【警告】', 'color: black; background-color: #FFC107; font-weight: bold; font-size: 14px;');
        }
        /**
         * 用于输出错误信息
         */


        static get err() {
          return window.console.log.bind(window.console, '%c【错误】', 'color: white; background-color: #DC3545; font-weight: bold; font-size: 14px;');
        }

      };
      /** 日志管理器实例 */

      _export("logMgr", logMgr = LogMgr);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a6a89a9c82f08b88e0a3b38e4ac11ba3b3ec0703.js.map