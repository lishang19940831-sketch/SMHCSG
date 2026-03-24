System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, assetManager, logMgr, BundleMgr, _class, _crd, bundleMgr;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOflogMgr(extras) {
    _reporterNs.report("logMgr", "./LogMgr", _context.meta, extras);
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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7c9efBXtChIdKrSyH1Ka8nI", "BundleMgr", undefined);

      __checkObsolete__(['assetManager', 'AssetManager']);

      /**
       * 分包管理器
       * 提供分包加载、获取、移除功能。
       */
      BundleMgr = class BundleMgr {
        /** 私有构造函数，确保外部无法直接通过new创建实例 */
        constructor() {}
        /** 单例实例 */


        /**
         * 获取指定分包，如果未加载则进行加载。
         * @param nameOrUrl - 分包名称或URL。
         * @param onProgress - 进度回调函数。
         * @returns Promise<AssetManager.Bundle | null> - 加载完成后的Promise。
         */
        getBundle(nameOrUrl, onProgress) {
          var _this = this;

          return _asyncToGenerator(function* () {
            var bundle = assetManager.getBundle(nameOrUrl);
            if (bundle) return bundle;

            try {
              var loadedBundle = yield _this.loadBundle(nameOrUrl);

              if (onProgress) {
                yield _this.loadAssetsWithProgress(loadedBundle, onProgress);
              }

              return loadedBundle;
            } catch (error) {
              (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
                error: Error()
              }), logMgr) : logMgr).err("\u5206\u5305 " + nameOrUrl + " \u52A0\u8F7D\u5931\u8D25", error.message);
              return null;
            }
          })();
        }
        /**
         * 加载指定分包。
         * @param nameOrUrl - 分包名称或URL。
         * @returns Promise<AssetManager.Bundle> - 加载完成后的Promise。
         */


        loadBundle(nameOrUrl) {
          return new Promise((resolve, reject) => {
            assetManager.loadBundle(nameOrUrl, (err, loadedBundle) => {
              if (err) {
                reject(err);
              } else {
                resolve(loadedBundle);
              }
            });
          });
        }
        /**
         * 加载分包中的资源并提供进度反馈。
         * @param bundle - 已加载的分包。
         * @param onProgress - 进度回调函数。
         * @returns Promise<void> - 加载完成后的Promise。
         */


        loadAssetsWithProgress(bundle, onProgress) {
          return new Promise((resolve, reject) => {
            var assets = bundle.getDirWithPath('');
            var totalAssets = assets.length;
            var loadedAssets = 0;

            if (totalAssets === 0) {
              onProgress(1);
              resolve();
              return;
            }

            assets.forEach(asset => {
              bundle.load(asset.path, err => {
                if (err) {
                  reject(err);
                  return;
                }

                loadedAssets++;
                onProgress(loadedAssets / totalAssets);

                if (loadedAssets === totalAssets) {
                  resolve();
                }
              });
            });
          });
        }

      };
      /** 分包管理器实例 */

      _class = BundleMgr;
      BundleMgr.instance = new _class();

      _export("bundleMgr", bundleMgr = BundleMgr.instance);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=50d92e58cfd68c2ac1ba961af3c7ab8fd02f7698.js.map