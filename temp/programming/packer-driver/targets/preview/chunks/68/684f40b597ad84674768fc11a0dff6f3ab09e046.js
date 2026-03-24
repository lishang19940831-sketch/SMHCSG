System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Tween, tween, UIOpacity, CommonEvent, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, Tips;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Label = _cc.Label;
      Tween = _cc.Tween;
      tween = _cc.tween;
      UIOpacity = _cc.UIOpacity;
    }, function (_unresolved_2) {
      CommonEvent = _unresolved_2.CommonEvent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a9246J303xFPKAw8VfqqnpB", "Tips", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Label', 'Node', 'Tween', 'tween', 'UIOpacity']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Tips", Tips = (_dec = ccclass('Tips'), _dec2 = property({
        type: Label,
        displayName: '提示字体'
      }), _dec3 = property({
        type: UIOpacity,
        displayName: '提示节点透明度'
      }), _dec(_class = (_class2 = class Tips extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "tipsLabel", _descriptor, this);

          _initializerDefineProperty(this, "tipsOpacity", _descriptor2, this);

          this.datas = [];
          this.currentTip = null;
          this.hideTimer = null;
          this.isShowing = false;
        }

        onLoad() {
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).ShowTips, this.onShowTips, this);
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).HideTips, this.onHideTips, this);
          this.node.active = false;
          this.tipsOpacity.opacity = 0;
        }

        onDestroy() {
          app.event.offAllByTarget(this);
          this.clearTimer();
        }

        start() {}

        update(deltaTime) {}

        onShowTips(data) {
          // 如果当前正在显示相同的提示，只刷新时长
          if (this.isShowing && this.currentTip && this.currentTip.tips === data.tips) {
            // 更新当前提示的数据
            this.currentTip = data; // 重新设置定时器

            if (data.duration !== -1) {
              this.startHideTimer(data.duration);
            } else {
              // 如果新的duration是-1，清除定时器
              this.clearTimer();
            }

            return;
          } // 如果当前正在显示不同的提示，将当前提示加入队列


          if (this.isShowing && this.currentTip) {
            this.datas.push(this.currentTip);
            this.forceHide();
            this.currentTip = null;
          }

          this.showTip(data);
        }

        onHideTips(data) {
          // 只有当ID匹配当前显示的提示时才隐藏
          if (this.currentTip && this.currentTip.id === data.id) {
            this.hideTips();
          }
        }

        hideTips() {
          if (!this.isShowing) return;
          this.clearTimer();
          this.isShowing = false;
          this.hideAnim();
          this.currentTip = null; // 显示队列中的下一个提示

          this.showNextTip();
        }

        forceHide() {
          this.clearTimer();
          this.isShowing = false;
          this.node.active = false;
          this.tipsOpacity.opacity = 0; // 注意：不在这里清空currentTip，因为可能需要先加入队列
        }

        startHideTimer(duration) {
          this.clearTimer();
          this.hideTimer = setTimeout(() => {
            this.hideTips();
          }, duration * 1000);
        }
        /**
         * 显示指定的提示
         */


        showTip(data) {
          this.currentTip = data;
          this.isShowing = true; // 设置提示文本

          this.tipsLabel.string = data.tips;
          this.node.active = true; // 显示动画

          this.showAnim(); // 设置定时器（如果duration不是-1）

          if (data.duration !== -1) {
            this.startHideTimer(data.duration);
          }
        }
        /**
         * 显示队列中的下一个提示
         */


        showNextTip() {
          if (this.datas.length > 0) {
            var nextTip = this.datas.shift(); // 从队列头部取出

            if (nextTip) {
              this.showTip(nextTip);
            }
          }
        }

        clearTimer() {
          if (this.hideTimer) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
          }
        }

        showAnim() {
          Tween.stopAllByTarget(this.tipsOpacity);
          tween(this.tipsOpacity).to(0.5, {
            opacity: 255
          }).start();
        }

        hideAnim() {
          Tween.stopAllByTarget(this.tipsOpacity);
          tween(this.tipsOpacity).to(0.5, {
            opacity: 0
          }).call(() => {
            this.node.active = false;
          }).start();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tipsLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tipsOpacity", [_dec3], {
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
//# sourceMappingURL=684f40b597ad84674768fc11a0dff6f3ab09e046.js.map