System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, assetManager, logMgr, bundleMgr, Parser, ResMgr, _class, _crd, resMgr;

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
        async loadRes(resPath, onProgress, onComplete) {
          try {
            const {
              bundleName,
              path
            } = (_crd && Parser === void 0 ? (_reportPossibleCrUseOfParser({
              error: Error()
            }), Parser) : Parser).path(resPath);
            const bundle = await (_crd && bundleMgr === void 0 ? (_reportPossibleCrUseOfbundleMgr({
              error: Error()
            }), bundleMgr) : bundleMgr).getBundle(bundleName);
            return await this.loadAsset(bundle, path, onProgress, onComplete);
          } catch (error) {
            (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
              error: Error()
            }), logMgr) : logMgr).err(`加载资源失败: ${resPath}`, error.message);
            throw error;
          }
        }
        /**
         * 加载目录下的所有资源
         * @param resPath 资源路径
         * @param onProgress 进度回调函数
         * @param onComplete 完成回调函数
         * @returns Promise<Array<Asset>> 加载完成后的Promise
         */


        async loadResDir(resPath, onProgress, onComplete) {
          try {
            const {
              bundleName,
              path
            } = (_crd && Parser === void 0 ? (_reportPossibleCrUseOfParser({
              error: Error()
            }), Parser) : Parser).path(resPath);
            const bundle = await (_crd && bundleMgr === void 0 ? (_reportPossibleCrUseOfbundleMgr({
              error: Error()
            }), bundleMgr) : bundleMgr).getBundle(bundleName);
            return await this.loadAssetDir(bundle, path, onProgress, onComplete);
          } catch (error) {
            (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
              error: Error()
            }), logMgr) : logMgr).err(`加载目录失败: ${resPath}`, error.message);
            throw error;
          }
        }
        /**
         * 释放指定分包单个资源
         * @param resPath 资源路径
         */


        releaseRes(resPath) {
          const {
            bundleName,
            path
          } = (_crd && Parser === void 0 ? (_reportPossibleCrUseOfParser({
            error: Error()
          }), Parser) : Parser).path(resPath);
          const bundle = assetManager.getBundle(bundleName);

          if (bundle) {
            bundle.release(path);
          } else {
            (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
              error: Error()
            }), logMgr) : logMgr).err(`分包 ${bundleName} 未找到，无法释放资源 ${path}。`);
          }
        }
        /**
         * 释放指定分包全部资源
         * @param bundleName 分包名称
         */


        releaseBundle(bundleName) {
          const bundle = assetManager.getBundle(bundleName);

          if (bundle) {
            bundle.releaseAll();
            assetManager.removeBundle(bundle);
          } else {
            (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
              error: Error()
            }), logMgr) : logMgr).err(`分包 ${bundleName} 未找到，无法移除。`);
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
                }), logMgr) : logMgr).err(`从分包加载资源 ${path} 失败`, err.message);
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
                }), logMgr) : logMgr).err(`从分包加载目录 ${path} 失败`, err.message);
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