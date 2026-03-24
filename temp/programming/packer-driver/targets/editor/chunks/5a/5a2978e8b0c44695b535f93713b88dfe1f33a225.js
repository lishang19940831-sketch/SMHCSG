System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Crypt, Message, WsCoder, _crd;

  function _reportPossibleCrUseOfCrypt(extras) {
    _reporterNs.report("Crypt", "../../Utils/Crypt", _context.meta, extras);
  }

  _export({
    Message: void 0,
    WsCoder: void 0
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      Crypt = _unresolved_2.Crypt;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ad0074Z06FCmplkcFoRfubW", "WsCoder", undefined);

      /** 消息结构 */
      _export("Message", Message = class Message {
        constructor(Cmd, Data) {
          this.Cmd = Cmd;
          this.Data = Data;
        }

      });
      /** 消息编码器，提供WebSocket消息的编码加密和解码解密功能 */


      _export("WsCoder", WsCoder = class WsCoder {
        /**
         * 消息打包（使用大端序）
         * @param msg 要打包的消息
         * @param key 加密密钥（可选）
         * @returns 打包后的字节数组
         */
        static Pack(msg, key = '') {
          if (!msg) throw new Error("消息不能为空");
          const data = key ? (_crd && Crypt === void 0 ? (_reportPossibleCrUseOfCrypt({
            error: Error()
          }), Crypt) : Crypt).byteEncrypt(msg.Data, key) : msg.Data;
          const buffer = new Uint8Array(4 + data.length);
          this.setUint32(buffer, 0, msg.Cmd);
          buffer.set(data, 4);
          return buffer;
        }
        /**
         * 消息解包（使用大端序）
         * @param buffer 要解包的字节数组
         * @param key 解密密钥（可选）
         * @returns 解包后的消息
         */


        static Unpack(buffer, key = '') {
          if (buffer.length < 4) throw new Error("消息长度不足");
          const cmd = this.getUint32(buffer, 0);
          const data = key ? (_crd && Crypt === void 0 ? (_reportPossibleCrUseOfCrypt({
            error: Error()
          }), Crypt) : Crypt).byteDecrypt(buffer.slice(4), key) : buffer.slice(4);
          return new Message(cmd, data);
        }
        /**
         * 通过 DataView 设置 Uint32 值（大端序）
         * @param buffer 目标缓冲区
         * @param offset 偏移量
         * @param value 要设置的值
         */


        static setUint32(buffer, offset, value) {
          new DataView(buffer.buffer).setUint32(offset, value, false);
        }
        /**
         * 通过 DataView 获取 Uint32 值（大端序）
         * @param buffer 源缓冲区
         * @param offset 偏移量
         * @returns 获取的值
         */


        static getUint32(buffer, offset) {
          return new DataView(buffer.buffer).getUint32(offset, false);
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5a2978e8b0c44695b535f93713b88dfe1f33a225.js.map