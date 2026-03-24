System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Message, WsCoder, Ws, _crd;

  function _reportPossibleCrUseOfISocket(extras) {
    _reporterNs.report("ISocket", "./ISocket", _context.meta, extras);
  }

  function _reportPossibleCrUseOfWsData(extras) {
    _reporterNs.report("WsData", "./ISocket", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMessage(extras) {
    _reporterNs.report("Message", "./WsCoder", _context.meta, extras);
  }

  function _reportPossibleCrUseOfWsCoder(extras) {
    _reporterNs.report("WsCoder", "./WsCoder", _context.meta, extras);
  }

  _export("Ws", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      Message = _unresolved_2.Message;
      WsCoder = _unresolved_2.WsCoder;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "901c46Zzr9HpphGgjvNpA+y", "Ws", undefined);

      /** WebSocket类，实现ISocket接口 */
      _export("Ws", Ws = class Ws {
        constructor() {
          this.ws = null;
        }

        /** WebSocket对象 */

        /** 连接成功时的回调 */
        onConnected() {}
        /** 收到消息时的回调 */


        onMessage(msg) {}
        /** 错误处理回调 */


        onError(err) {}
        /** 连接关闭时的回调 */


        onClosed() {}
        /**
         * 连接到WebSocket服务器
         * @param urlOrIp URL地址或IP地址
         * @param port 端口号（可选）
         * @returns 是否成功发起连接
         */


        connect(urlOrIp, port) {
          if (this.isConnecting) return false;
          const url = port ? `${urlOrIp}:${port}` : urlOrIp;

          try {
            this.ws = new WebSocket(url);
            this.ws.binaryType = "arraybuffer";
            this.ws.onopen = this.onConnected.bind(this);

            this.ws.onmessage = event => this.onMessage(event.data);

            this.ws.onerror = event => this.onError(event);

            this.ws.onclose = this.onClosed.bind(this);
            return true;
          } catch (error) {
            this.onError(error instanceof Error ? error.message : 'Unknown error');
            return false;
          }
        }
        /**
         * 发送数据
         * @param data 指定格式数据
         * @returns 是否发送成功
         */


        send(data) {
          if (this.isActive) {
            this.ws.send(data);
            return true;
          }

          return false;
        }
        /**
         * 发送命令和数据
         * @param cmd 主命令码
         * @param buffer 数据
         * @param key 加密密钥（可选）
         * @returns 是否发送成功
         */


        sendBuffer(cmd, buffer, key = '') {
          const message = new (_crd && Message === void 0 ? (_reportPossibleCrUseOfMessage({
            error: Error()
          }), Message) : Message)(cmd, buffer);
          const packedData = (_crd && WsCoder === void 0 ? (_reportPossibleCrUseOfWsCoder({
            error: Error()
          }), WsCoder) : WsCoder).Pack(message, key);
          return this.send(packedData);
        }
        /**
         * 关闭WebSocket连接
         * @param code 关闭代码（可选）
         * @param reason 关闭原因（可选）
         */


        close(code, reason) {
          var _this$ws;

          (_this$ws = this.ws) == null || _this$ws.close(code, reason);
        }
        /**
         * 获取当前连接状态
         * @returns 是否处于活动状态
         */


        get isActive() {
          var _this$ws2;

          return ((_this$ws2 = this.ws) == null ? void 0 : _this$ws2.readyState) === WebSocket.OPEN;
        }
        /**
         * 检查是否正在连接
         * @returns 是否正在连接
         */


        get isConnecting() {
          var _this$ws3;

          return ((_this$ws3 = this.ws) == null ? void 0 : _this$ws3.readyState) === WebSocket.CONNECTING;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=31555179efe9310f1482f38a544f4af0d1c8130f.js.map