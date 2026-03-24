System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, sys, logMgr, Crypt, Json, DataMgr, _class, _crd, dataMgr;

  function _reportPossibleCrUseOflogMgr(extras) {
    _reporterNs.report("logMgr", "./LogMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCrypt(extras) {
    _reporterNs.report("Crypt", "../Utils/Crypt", _context.meta, extras);
  }

  function _reportPossibleCrUseOfJson(extras) {
    _reporterNs.report("Json", "../Utils/Json", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      sys = _cc.sys;
    }, function (_unresolved_2) {
      logMgr = _unresolved_2.logMgr;
    }, function (_unresolved_3) {
      Crypt = _unresolved_3.Crypt;
    }, function (_unresolved_4) {
      Json = _unresolved_4.Json;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e1096fPk4RLR7UYf2r6l31Z", "DataMgr", undefined);

      __checkObsolete__(['sys']);

      /** 
       * 数据管理器
       * 提供数据的存储、读取（支持文本、数字、JSON）功能。
       */
      DataMgr = class DataMgr {
        /** 私有构造函数，确保外部无法直接通过new创建实例 */
        constructor() {}
        /** 单例实例 */


        /**
         * 存储数据
         * @param key 数据键
         * @param value 数据值，可以是文本、数字或对象
         */
        setData(key, value) {
          const stringValue = typeof value === "object" ? (_crd && Json === void 0 ? (_reportPossibleCrUseOfJson({
            error: Error()
          }), Json) : Json).stringify(value) : value.toString();
          const encryptedValue = (_crd && Crypt === void 0 ? (_reportPossibleCrUseOfCrypt({
            error: Error()
          }), Crypt) : Crypt).strEncrypt(stringValue, 'dataKey');

          try {
            sys.localStorage.setItem(key, encryptedValue);
          } catch (error) {
            (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
              error: Error()
            }), logMgr) : logMgr).err(`数据存储失败: ${key}`, error.message);
          }
        }
        /**
         * 读取文本数据
         * @param key 数据键
         * @returns 返回对应键的数据值
         */


        getText(key) {
          try {
            const encryptedValue = sys.localStorage.getItem(key);

            if (encryptedValue) {
              return (_crd && Crypt === void 0 ? (_reportPossibleCrUseOfCrypt({
                error: Error()
              }), Crypt) : Crypt).strDecrypt(encryptedValue, 'dataKey');
            }

            return null;
          } catch (error) {
            (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
              error: Error()
            }), logMgr) : logMgr).err(`文本数据读取失败: ${key}`, error.message);
            return null;
          }
        }
        /**
         * 读取数字数据
         * @param key 数据键
         * @returns 返回对应键的数字值
         */


        getNumber(key) {
          const textValue = this.getText(key);

          if (textValue) {
            const numberValue = Number(textValue);
            return isNaN(numberValue) ? null : numberValue;
          }

          return null;
        }
        /**
         * 读取JSON数据
         * @param key 数据键
         * @returns 返回对应键的对象
         */


        getJSON(key) {
          const textValue = this.getText(key);

          if (textValue) {
            return (_crd && Json === void 0 ? (_reportPossibleCrUseOfJson({
              error: Error()
            }), Json) : Json).parse(textValue);
          }

          return null;
        }
        /**
         * 删除数据
         * @param key 数据键
         */


        removeData(key) {
          sys.localStorage.removeItem(key);
        }
        /** 清空所有数据 */


        clearAllData() {
          sys.localStorage.clear();
        }

      };
      /** 数据管理器实例 */

      _class = DataMgr;
      DataMgr.instance = new _class();

      _export("dataMgr", dataMgr = DataMgr.instance);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c2fc9c8d39b805844603a52ad62a1052ff5513f4.js.map