System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, logMgr, Http, _crd;

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
        static async get(url, params = {}, callback, retries = 3, timeout = 5000) {
          const queryString = Http.formEncode(params);
          const fullUrl = `${url}?${queryString}`;
          await Http.httpRequest(fullUrl, {
            method: 'GET'
          }, callback, retries, timeout);
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


        static async post(url, body, callback, contentType = 'json', retries = 3, timeout = 5000) {
          const {
            headers,
            bodyData
          } = Http.preparePostData(body, contentType);
          await Http.httpRequest(url, {
            method: 'POST',
            headers,
            body: bodyData
          }, callback, retries, timeout);
        }
        /**
         * 准备POST请求的数据
         * @param body 请求体
         * @param contentType 内容类型
         * @returns headers和bodyData
         */


        static preparePostData(body, contentType) {
          const headers = {};
          let bodyData = '';

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


        static async httpRequest(url, options, callback, retries, timeout) {
          for (let attempt = 0; attempt < retries; attempt++) {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);
            options.signal = controller.signal;

            try {
              const response = await fetch(url, options);
              clearTimeout(id);

              if (response.ok) {
                const data = await response.json();
                callback(data); // 调用回调函数，传递数据

                return;
              } else {
                (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
                  error: Error()
                }), logMgr) : logMgr).err(`${options.method} 请求失败: ${response.statusText}`);
              }
            } catch (error) {
              clearTimeout(id);
              (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
                error: Error()
              }), logMgr) : logMgr).err(`${options.method} 请求异常: ${error}`);
            }

            if (attempt < retries - 1) {
              (_crd && logMgr === void 0 ? (_reportPossibleCrUseOflogMgr({
                error: Error()
              }), logMgr) : logMgr).warn(`${options.method} 重试中... 剩余尝试次数: ${retries - attempt - 1}`);
              await Http.delay(timeout);
            }
          }

          throw new Error('HTTP请求失败，已达到最大重试次数。');
        }
        /**
         * 将对象编码为查询字符串
         * @param data 要编码的数据
         * @returns 编码后的字符串
         */


        static formEncode(data) {
          return Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
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