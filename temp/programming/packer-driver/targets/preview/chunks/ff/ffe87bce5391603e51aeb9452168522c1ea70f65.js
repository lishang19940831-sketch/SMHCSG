System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Camera, Component, Label, Node, tween, UIOpacity, Button, CommonEvent, ObjectType, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _crd, ccclass, property, UI;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDamageData(extras) {
    _reporterNs.report("DamageData", "../../Main/Common/CommonInterface", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Camera = _cc.Camera;
      Component = _cc.Component;
      Label = _cc.Label;
      Node = _cc.Node;
      tween = _cc.tween;
      UIOpacity = _cc.UIOpacity;
      Button = _cc.Button;
    }, function (_unresolved_2) {
      CommonEvent = _unresolved_2.CommonEvent;
      ObjectType = _unresolved_2.ObjectType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "352cfbVyEVK8og6r8inE7Pc", "UI", undefined);

      __checkObsolete__(['_decorator', 'Camera', 'Component', 'Label', 'Node', 'tween', 'UIOpacity', 'Vec3', 'UITransform', 'Color', 'ProgressBar', 'Button']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("UI", UI = (_dec = ccclass('UI'), _dec2 = property({
        type: Camera,
        displayName: '主相机'
      }), _dec3 = property({
        type: Label,
        displayName: '麦子数量'
      }), _dec4 = property({
        type: Label,
        displayName: '金币数量'
      }), _dec5 = property({
        type: Label,
        displayName: '木头数量'
      }), _dec6 = property({
        type: Label,
        displayName: '大饼数量'
      }), _dec7 = property({
        type: Node,
        displayName: '胜利面板'
      }), _dec8 = property({
        type: Node,
        displayName: '失败面板'
      }), _dec9 = property({
        type: Node,
        displayName: 'Home受伤闪红节点'
      }), _dec10 = property({
        type: Button,
        displayName: '下载按钮'
      }), _dec11 = property({
        type: Label,
        displayName: '提示'
      }), _dec(_class = (_class2 = class UI extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "mainCamera", _descriptor, this);

          _initializerDefineProperty(this, "cornKernelLabel", _descriptor2, this);

          _initializerDefineProperty(this, "goldLabel", _descriptor3, this);

          _initializerDefineProperty(this, "woodLabel", _descriptor4, this);

          _initializerDefineProperty(this, "flatbreadLabel", _descriptor5, this);

          _initializerDefineProperty(this, "winPanel", _descriptor6, this);

          _initializerDefineProperty(this, "losePanel", _descriptor7, this);

          _initializerDefineProperty(this, "heroHurtRed", _descriptor8, this);

          _initializerDefineProperty(this, "downloadBtn", _descriptor9, this);

          _initializerDefineProperty(this, "tipLabel", _descriptor10, this);

          this.isJumped = false;
          this.isShowResult = false;
        }

        onLoad() {
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).UpdateHeroItemCount, this.onUpdateHeroItemCount, this);
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).ShowWinUI, this.onShowWinUI, this);
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).ShowFailUI, this.onShowFailUI, this);
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).HeroHurt, this.onHeroHurt, this);
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).ShowFlashRed, this.onShowFlashRed, this);
          var opacity = this.heroHurtRed.getComponent(UIOpacity);
          tween(opacity).to(0.3, {
            opacity: 255
          }).to(0.3, {
            opacity: 0
          }).union().repeatForever().start();
          this.isShowResult = false;
          this.isJumped = false;
          this.downloadBtn && this.downloadBtn.node.on(Button.EventType.CLICK, this.onDownload, this);
          this.woodLabel.string = "0";
          this.goldLabel.string = "0";
          this.cornKernelLabel.string = "0";
          this.flatbreadLabel.string = "0"; // this.tipLabel.node.active = SuperPackage.Instance.isKR;
        }

        onDestroy() {
          app.event.offAllByTarget(this);
        }

        start() {}

        update(deltaTime) {}

        onUpdateHeroItemCount(data) {
          if (data.type === (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemCoin) {
            this.goldLabel.string = data.count.toString();
          } else if (data.type === (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemWood) {
            this.woodLabel.string = data.count.toString();
          } else if (data.type === (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemCornKernel) {
            this.cornKernelLabel.string = data.count.toString();
          } else if (data.type === (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemFlatbread) {
            this.flatbreadLabel.string = data.count.toString();
          }
        }
        /**
         * 更新家基地血条
         * @param healthPercentage 生命值百分比
         */


        onHeroHurt(data) {
          // 取消之前的所有延迟调用
          this.unscheduleAllCallbacks(); // 显示伤害效果

          this.heroHurtRed.active = true; // 使用新的延迟调用

          this.scheduleOnce(() => {
            this.heroHurtRed.active = false;
          }, 1);
        }
        /** 显示闪红特效 */


        onShowFlashRed() {
          this.heroHurtRed.active = true;
          this.scheduleOnce(() => {
            this.heroHurtRed.active = false;
          }, 2);
        }

        onShowWinUI() {
          if (this.isShowResult) return;
          this.isShowResult = true;
          this.winPanel.active = true;
          this.scheduleOnce(() => {
            manager.game.onDownloadTCE();
          }, 1);
        }

        onShowFailUI() {
          if (this.isShowResult) return;
          this.isShowResult = true;
          this.losePanel.active = true;
          this.scheduleOnce(() => {
            manager.game.onDownloadTCE();
          }, 1);
        }

        converToUIPos(pos) {
          var uiPos = this.mainCamera.convertToUINode(pos, this.node);
          return uiPos;
        }

        onDownload() {
          manager.game.onDownload(); // manager.game.onRetry();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mainCamera", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "cornKernelLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "goldLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "woodLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "flatbreadLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "winPanel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "losePanel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "heroHurtRed", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "downloadBtn", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "tipLabel", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ffe87bce5391603e51aeb9452168522c1ea70f65.js.map