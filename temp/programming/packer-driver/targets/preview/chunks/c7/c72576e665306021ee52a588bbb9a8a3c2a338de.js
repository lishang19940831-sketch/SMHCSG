System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, assetManager, logMgr, bundleMgr, Parser, ResMgr, _class, _crd, resMgr;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOflogMgr(extras) {
    _reporterNs.report("logMgr", "./LogMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfbundleMgr(extras) {
    _reporterNs.report("bundleMgr", "./BundleMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfParser(extras) {
    _reporterNs.report("Parser", "../Utils/Parser", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      assetManager = _cc.assetManager;
    }, function (_unresolved_2) {
      logMgr = _unresolved_2.logMgr;
    }, function (_unresolved_3) {
      bundleMgr = _unresolved_3.bundleMgr;
    }, function (_unresolved_4) {
      Parser = _unresolved_4.Parser;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6c5ccd7SGdMFJk8Sm/rWR9l", "ResMgr", undefined);

      __checkObsolete__(['Asset', 'AssetManager', 'assetManager']);

      /** 
       * 资源管理器
       * 提供资源加载、释放功能。
       */
      ResMgr = class ResMgr {
        /** 私有构造函数，确保外部无法直接通过new创建实例 */
        constructor() {}
        /** 单例实例 */


        /**
         * 加载资源
         * @param resPath 资源路径
         * @param onProgress 进度回调函数
         * @param onComplete 完成回调函数
         * @returns Promise<T> 加载完成后的Promise
         */
        loadRes(resPath, onProgress, onComplete) {
          var _this = this;

          return _asyncToGenerator(function* () {
            try {
              var {
                bundleName,
                path
              } = (_crd && Parser === void 0 ? (_reportPossibleCrUseOfParser({
                error: Error()
              }), Parser) : Parser).path(resPath);
              var bundle = yield (_crd && bundleMgr === void 0 ? (_reportPossibleCrUseOfbundleMgr({
                error: Error()
              }), bundleMgr) : bundleMgr).getBundle(bundleName);
              return yield _this.loadAsset(bundle, path, onProgress, onComplete);
            } catch (error) {
              (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
                error: Error()
              }), logMgr) : logMgr).err("\u52A0\u8F7D\u8D44\u6E90\u5931\u8D25: " + resPath, error.message);
              throw error;
            }
          })();
        }
        /**
         * 加载目录下的所有资源
         * @param resPath 资源路径
         * @param onProgress 进度回调函数
         * @param onComplete 完成回调函数
         * @returns Promise<Array<Asset>> 加载完成后的Promise
         */


        loadResDir(resPath, onProgress, onComplete) {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            try {
              var {
                bundleName,
                path
              } = (_crd && Parser === void 0 ? (_reportPossibleCrUseOfParser({
                error: Error()
              }), Parser) : Parser).path(resPath);
              var bundle = yield (_crd && bundleMgr === void 0 ? (_reportPossibleCrUseOfbundleMgr({
                error: Error()
              }), bundleMgr) : bundleMgr).getBundle(bundleName);
              return yield _this2.loadAssetDir(bundle, path, onProgress, onComplete);
            } catch (error) {
              (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
                error: Error()
              }), logMgr) : logMgr).err("\u52A0\u8F7D\u76EE\u5F55\u5931\u8D25: " + resPath, error.message);
              throw error;
            }
          })();
        }
        /**
         * 释放指定分包单个资源
         * @param resPath 资源路径
         */


        releaseRes(resPath) {
          var {
            bundleName,
            path
          } = (_crd && Parser === void 0 ? (_reportPossibleCrUseOfParser({
            error: Error()
          }), Parser) : Parser).path(resPath);
          var bundle = assetManager.getBundle(bundleName);

          if (bundle) {
            bundle.release(path);
          } else {
            (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
              error: Error()
            }), logMgr) : logMgr).err("\u5206\u5305 " + bundleName + " \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u91CA\u653E\u8D44\u6E90 " + path + "\u3002");
          }
        }
        /**
         * 释放指定分包全部资源
         * @param bundleName 分包名称
         */


        releaseBundle(bundleName) {
          var bundle = assetManager.getBundle(bundleName);

          if (bundle) {
            bundle.releaseAll();
            assetManager.removeBundle(bundle);
          } else {
            (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
              error: Error()
            }), logMgr) : logMgr).err("\u5206\u5305 " + bundleName + " \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u79FB\u9664\u3002");
          }
        }
        /** 移除所有分包 */


        releaseAll() {
          assetManager.releaseAll();
        }
        /**
         * 加载单个资源的辅助方法
         * @param bundle 资源所在的分包
         * @param path 资源路径
         * @param onProgress 进度回调函数
         * @param onComplete 完成回调函数
         * @returns Promise<T> 加载完成后的Promise
         */


        loadAsset(bundle, path, onProgress, onComplete) {
          return new Promise((resolve, reject) => {
            bundle.load(path, (completedCount, totalCount, item) => onProgress == null ? void 0 : onProgress(completedCount, totalCount, item), (err, asset) => {
              onComplete == null || onComplete(err, asset);

              if (err) {
                (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
                  error: Error()
                }), logMgr) : logMgr).err("\u4ECE\u5206\u5305\u52A0\u8F7D\u8D44\u6E90 " + path + " \u5931\u8D25", err.message);
                reject(err);
              } else {
                resolve(asset);
              }
            });
          });
        }
        /**
         * 加载目录下所有资源的辅助方法
         * @param bundle 资源所在的分包
         * @param path 目录路径
         * @param onProgress 进度回调函数
         * @param onComplete 完成回调函数
         * @returns Promise<Array<Asset>> 加载完成后的Promise
         */


        loadAssetDir(bundle, path, onProgress, onComplete) {
          return new Promise((resolve, reject) => {
            bundle.loadDir(path, (completedCount, totalCount, item) => onProgress == null ? void 0 : onProgress(completedCount, totalCount, item), (err, assets) => {
              onComplete == null || onComplete(err, assets);

              if (err) {
                (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
                  error: Error()
                }), logMgr) : logMgr).err("\u4ECE\u5206\u5305\u52A0\u8F7D\u76EE\u5F55 " + path + " \u5931\u8D25", err.message);
                reject(err);
              } else {
                resolve(assets);
              }
            });
          });
        }

      };
      /** 资源管理器实例 */

      _class = ResMgr;
      ResMgr.instance = new _class();

      _export("resMgr", resMgr = ResMgr.instance);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c72576e665306021ee52a588bbb9a8a3c2a338de.js.map