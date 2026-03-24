System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, logMgr, Http, _crd;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOflogMgr(extras) {
    _reporterNs.report("logMgr", "../../Managers/LogMgr", _context.meta, extras);
  }

  _export("Http", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      logMgr = _unresolved_2.logMgr;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c9fd7j5s4dPM6FxTE/cPR73", "Http", undefined);

      /** Http类，用于发送HTTP请求 */
      _export("Http", Http = class Http {
        /**
         * 发送GET请求
         * @param url 请求的URL
         * @param params 查询参数
         * @param callback 回调函数，接收返回数据
         * @param retries 重试次数
         * @param timeout 超时时间
         */
        static get(url, params, callback, retries, timeout) {
          return _asyncToGenerator(function* () {
            if (params === void 0) {
              params = {};
            }

            if (retries === void 0) {
              retries = 3;
            }

            if (timeout === void 0) {
              timeout = 5000;
            }

            var queryString = Http.formEncode(params);
            var fullUrl = url + "?" + queryString;
            yield Http.httpRequest(fullUrl, {
              method: 'GET'
            }, callback, retries, timeout);
          })();
        }
        /**
         * 发送POST请求
         * @param url 请求的URL
         * @param body 请求体
         * @param callback 回调函数，接收返回数据
         * @param contentType 内容类型
         * @param retries 重试次数
         * @param timeout 超时时间
         */


        static post(url, body, callback, contentType, retries, timeout) {
          return _asyncToGenerator(function* () {
            if (contentType === void 0) {
              contentType = 'json';
            }

            if (retries === void 0) {
              retries = 3;
            }

            if (timeout === void 0) {
              timeout = 5000;
            }

            var {
              headers,
              bodyData
            } = Http.preparePostData(body, contentType);
            yield Http.httpRequest(url, {
              method: 'POST',
              headers,
              body: bodyData
            }, callback, retries, timeout);
          })();
        }
        /**
         * 准备POST请求的数据
         * @param body 请求体
         * @param contentType 内容类型
         * @returns headers和bodyData
         */


        static preparePostData(body, contentType) {
          var headers = {};
          var bodyData = '';

          switch (contentType) {
            case 'json':
              headers['Content-Type'] = 'application/json';
              bodyData = typeof body === 'string' ? body : JSON.stringify(body);
              break;

            case 'form':
              headers['Content-Type'] = 'application/x-www-form-urlencoded';
              bodyData = typeof body === 'string' ? body : Http.formEncode(body);
              break;
          }

          return {
            headers,
            bodyData
          };
        }
        /**
         * 发送HTTP请求
         * @param url 请求的URL
         * @param options 请求选项
         * @param callback 回调函数，接收返回数据
         * @param retries 重试次数
         * @param timeout 超时时间
         */


        static httpRequest(url, options, callback, retries, timeout) {
          return _asyncToGenerator(function* () {
            var _loop = function* _loop() {
              var controller = new AbortController();
              var id = setTimeout(() => controller.abort(), timeout);
              options.signal = controller.signal;

              try {
                var response = yield fetch(url, options);
                clearTimeout(id);

                if (response.ok) {
                  var _data = yield response.json();

                  callback(_data); // 调用回调函数，传递数据

                  return {
                    v: void 0
                  };
                } else {
                  (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
                    error: Error()
                  }), logMgr) : logMgr).err(options.method + " \u8BF7\u6C42\u5931\u8D25: " + response.statusText);
                }
              } catch (error) {
                clearTimeout(id);
                (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
                  error: Error()
                }), logMgr) : logMgr).err(options.method + " \u8BF7\u6C42\u5F02\u5E38: " + error);
              }

              if (attempt < retries - 1) {
                (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
                  error: Error()
                }), logMgr) : logMgr).warn(options.method + " \u91CD\u8BD5\u4E2D... \u5269\u4F59\u5C1D\u8BD5\u6B21\u6570: " + (retries - attempt - 1));
                yield Http.delay(timeout);
              }
            },
                _ret;

            for (var attempt = 0; attempt < retries; attempt++) {
              _ret = yield* _loop();
              if (_ret) return _ret.v;
            }

            throw new Error('HTTP请求失败，已达到最大重试次数。');
          })();
        }
        /**
         * 将对象编码为查询字符串
         * @param data 要编码的数据
         * @returns 编码后的字符串
         */


        static formEncode(data) {
          return Object.keys(data).map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join('&');
        }
        /**
         * 延迟指定的毫秒数
         * @param ms 延迟时间
         * @returns Promise
         */


        static delay(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4cbd3a96c0477ef35fcd1f5ae3ffa7e9d0eda5e7.js.map