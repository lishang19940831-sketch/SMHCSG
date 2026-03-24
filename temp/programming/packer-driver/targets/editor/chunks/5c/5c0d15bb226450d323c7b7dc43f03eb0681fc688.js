System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, tween, Vec3, UIOpacity, Button, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, LosePanel;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
      UIOpacity = _cc.UIOpacity;
      Button = _cc.Button;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c9e82WyzjFNV7r34lmYPUBA", "LosePanel", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'tween', 'Vec3', 'UIOpacity', 'Button']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("LosePanel", LosePanel = (_dec = ccclass('LosePanel'), _dec2 = property({
        type: Node,
        displayName: '黑色背景'
      }), _dec3 = property({
        type: Node,
        displayName: 'Icon'
      }), _dec4 = property({
        type: Node,
        displayName: '失败标题'
      }), _dec5 = property({
        type: Node,
        displayName: '下载按钮'
      }), _dec6 = property({
        type: Node,
        displayName: '重试按钮'
      }), _dec(_class = (_class2 = class LosePanel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "blackBg", _descriptor, this);

          _initializerDefineProperty(this, "icon", _descriptor2, this);

          _initializerDefineProperty(this, "loseTitle", _descriptor3, this);

          _initializerDefineProperty(this, "downloadBtn", _descriptor4, this);

          _initializerDefineProperty(this, "retryBtn", _descriptor5, this);
        }

        onLoad() {
          this.downloadBtn.on(Button.EventType.CLICK, this.onDownload, this);
          this.retryBtn.on(Button.EventType.CLICK, this.onRetry, this);
        }

        onDestroy() {
          this.downloadBtn.off(Button.EventType.CLICK, this.onDownload, this);
          this.retryBtn.off(Button.EventType.CLICK, this.onRetry, this);
        }

        onDownload() {
          //console.log('下载');
          manager.game.onDownload();
        }

        onRetry() {
          //console.log('重试');
          manager.game.onRetry();
          this.node.active = false;
        }

        onEnable() {
          this.showLoseAni();
        }

        onDisable() {
          this.hideLoseAni();
        }
        /**
         * 显示失败动画
         */


        showLoseAni() {
          app.audio.playEffect('resources/audio/Win'); // 初始化所有元素状态

          const blackBgOpacity = this.blackBg.getComponent(UIOpacity) || this.blackBg.addComponent(UIOpacity);
          blackBgOpacity.opacity = 0;
          this.icon.scale = new Vec3(0.2, 0.2, 1);
          const loseTitlePos = this.loseTitle.position.clone();
          this.loseTitle.position = new Vec3(loseTitlePos.x, loseTitlePos.y + 150, loseTitlePos.z);
          const loseTitleOpacity = this.loseTitle.getComponent(UIOpacity) || this.loseTitle.addComponent(UIOpacity);
          loseTitleOpacity.opacity = 0;
          const downloadBtnPos = this.downloadBtn.position.clone();
          this.downloadBtn.position = new Vec3(downloadBtnPos.x, downloadBtnPos.y - 100, downloadBtnPos.z);
          const downloadBtnOpacity = this.downloadBtn.getComponent(UIOpacity) || this.downloadBtn.addComponent(UIOpacity);
          downloadBtnOpacity.opacity = 0; // 重试按钮初始状态

          const retryBtnPos = this.retryBtn.position.clone();
          this.retryBtn.position = new Vec3(retryBtnPos.x, retryBtnPos.y - 100, retryBtnPos.z);
          const retryBtnOpacity = this.retryBtn.getComponent(UIOpacity) || this.retryBtn.addComponent(UIOpacity);
          retryBtnOpacity.opacity = 0; // 黑色背景淡入

          tween(blackBgOpacity).to(0.3, {
            opacity: 180
          }).start(); // ICON缩放动画

          tween(this.icon).to(0.5, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: 'backOut'
          }).start(); // 失败标题滑入并淡入

          tween(this.loseTitle).to(0.5, {
            position: loseTitlePos
          }, {
            easing: 'backOut'
          }).start();
          tween(loseTitleOpacity).to(0.5, {
            opacity: 255
          }).start(); // 下载按钮滑入并淡入

          tween(this.downloadBtn).delay(0.2).to(0.5, {
            position: downloadBtnPos
          }, {
            easing: 'backOut'
          }).start();
          tween(downloadBtnOpacity).delay(0.2).to(0.5, {
            opacity: 255
          }).start(); // 重试按钮滑入并淡入

          tween(this.retryBtn).delay(0.3).to(0.5, {
            position: retryBtnPos
          }, {
            easing: 'backOut'
          }).start();
          tween(retryBtnOpacity).delay(0.3).to(0.5, {
            opacity: 255
          }).start();
        }
        /**
         * 隐藏失败动画
         */


        hideLoseAni() {
          // 停止所有可能正在播放的动画
          tween(this.blackBg).stop();
          tween(this.icon).stop();
          tween(this.loseTitle).stop();
          tween(this.downloadBtn).stop();
          tween(this.retryBtn).stop(); // 获取UIOpacity组件

          const blackBgOpacity = this.blackBg.getComponent(UIOpacity);
          const loseTitleOpacity = this.loseTitle.getComponent(UIOpacity);
          const downloadBtnOpacity = this.downloadBtn.getComponent(UIOpacity);
          const retryBtnOpacity = this.retryBtn.getComponent(UIOpacity);
          if (blackBgOpacity) tween(blackBgOpacity).stop();
          if (loseTitleOpacity) tween(loseTitleOpacity).stop();
          if (downloadBtnOpacity) tween(downloadBtnOpacity).stop();
          if (retryBtnOpacity) tween(retryBtnOpacity).stop();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "blackBg", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "icon", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "loseTitle", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "downloadBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "retryBtn", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5c0d15bb226450d323c7b7dc43f03eb0681fc688.js.map