System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Component, Node, tween, Vec3, UIOpacity, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, WinPanel;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Button = _cc.Button;
      Component = _cc.Component;
      Node = _cc.Node;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
      UIOpacity = _cc.UIOpacity;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3af03YiBj9KWq0/jpMVQdNy", "WinPanel", undefined);

      __checkObsolete__(['_decorator', 'Button', 'Component', 'Node', 'tween', 'Vec3', 'UIOpacity']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("WinPanel", WinPanel = (_dec = ccclass('WinPanel'), _dec2 = property({
        type: Node,
        displayName: '黑色背景'
      }), _dec3 = property({
        type: Node,
        displayName: 'Icon'
      }), _dec4 = property({
        type: Node,
        displayName: '胜利标题'
      }), _dec5 = property({
        type: Node,
        displayName: '下载按钮'
      }), _dec(_class = (_class2 = class WinPanel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "blackBg", _descriptor, this);

          _initializerDefineProperty(this, "icon", _descriptor2, this);

          _initializerDefineProperty(this, "winTitle", _descriptor3, this);

          _initializerDefineProperty(this, "downloadBtn", _descriptor4, this);
        }

        onLoad() {
          this.downloadBtn.on(Button.EventType.CLICK, this.onDownload, this);
        }

        onDestroy() {
          this.downloadBtn.off(Button.EventType.CLICK, this.onDownload, this);
        }

        onDownload() {
          //console.log('下载');
          manager.game.onDownload();
        }

        onEnable() {
          this.showWinAni();
        }

        onDisable() {
          this.hideWinAni();
        }

        showWinAni() {
          app.audio.playEffect('resources/audio/Win'); // 初始化所有元素状态

          const blackBgOpacity = this.blackBg.getComponent(UIOpacity) || this.blackBg.addComponent(UIOpacity);
          blackBgOpacity.opacity = 0;
          this.icon.scale = new Vec3(0.2, 0.2, 1);
          const winTitlePos = this.winTitle.position.clone();
          this.winTitle.position = new Vec3(winTitlePos.x, winTitlePos.y + 150, winTitlePos.z);
          const winTitleOpacity = this.winTitle.getComponent(UIOpacity) || this.winTitle.addComponent(UIOpacity);
          winTitleOpacity.opacity = 0;
          const downloadBtnPos = this.downloadBtn.position.clone();
          this.downloadBtn.position = new Vec3(downloadBtnPos.x, downloadBtnPos.y - 100, downloadBtnPos.z);
          const downloadBtnOpacity = this.downloadBtn.getComponent(UIOpacity) || this.downloadBtn.addComponent(UIOpacity);
          downloadBtnOpacity.opacity = 0; // 黑色背景淡入

          tween(blackBgOpacity).to(0.3, {
            opacity: 180
          }).start(); // ICON缩放动画

          tween(this.icon).to(0.5, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: 'backOut'
          }).start(); // 胜利标题滑入并淡入

          tween(this.winTitle).to(0.5, {
            position: winTitlePos
          }, {
            easing: 'backOut'
          }).start();
          tween(winTitleOpacity).to(0.5, {
            opacity: 255
          }).start(); // 下载按钮滑入并淡入

          tween(this.downloadBtn).delay(0.2).to(0.5, {
            position: downloadBtnPos
          }, {
            easing: 'backOut'
          }).start();
          tween(downloadBtnOpacity).delay(0.2).to(0.5, {
            opacity: 255
          }).start();
        }

        hideWinAni() {
          // 停止所有可能正在播放的动画
          tween(this.blackBg).stop();
          tween(this.icon).stop();
          tween(this.winTitle).stop();
          tween(this.downloadBtn).stop(); // 获取UIOpacity组件

          const blackBgOpacity = this.blackBg.getComponent(UIOpacity);
          const winTitleOpacity = this.winTitle.getComponent(UIOpacity);
          const downloadBtnOpacity = this.downloadBtn.getComponent(UIOpacity);
          if (blackBgOpacity) tween(blackBgOpacity).stop();
          if (winTitleOpacity) tween(winTitleOpacity).stop();
          if (downloadBtnOpacity) tween(downloadBtnOpacity).stop();
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
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "winTitle", [_dec4], {
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
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8cdbe05cc46f46b941fd1c1f450c80889c1af881.js.map