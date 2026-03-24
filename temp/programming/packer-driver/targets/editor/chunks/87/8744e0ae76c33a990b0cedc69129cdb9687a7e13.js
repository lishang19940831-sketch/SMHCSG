System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, Json, _crd;

  _export("Json", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c06f9+o3OtCjKwgwE4irwM+", "Json", undefined);

      /**
       * Json工具类
       * 提供JSON字符串与对象之间的转换功能。
       */
      _export("Json", Json = class Json {
        /**
         * 将JSON字符串解析为对象。
         * @param text 要解析的JSON字符串。
         * @returns 解析后的对象或null（如果解析失败）。
         */
        static parse(text) {
          try {
            return JSON.parse(text);
          } catch (error) {
            return null;
          }
        }
        /**
         * 将对象序列化为JSON字符串。
         * @param value 要序列化的对象。
         * @returns 序列化后的JSON字符串或空字符串（如果序列化失败）。
         */


        static stringify(value) {
          try {
            return JSON.stringify(value);
          } catch (error) {
            return '';
          }
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8744e0ae76c33a990b0cedc69129cdb9687a7e13.js.map