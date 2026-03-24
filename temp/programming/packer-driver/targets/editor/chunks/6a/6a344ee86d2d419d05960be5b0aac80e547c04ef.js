System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Sprite, CCFloat, UIOpacity, tween, HealthBar, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, HealthBar_Cycle;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfHealthBar(extras) {
    _reporterNs.report("HealthBar", "./HealthBar", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Sprite = _cc.Sprite;
      CCFloat = _cc.CCFloat;
      UIOpacity = _cc.UIOpacity;
      tween = _cc.tween;
    }, function (_unresolved_2) {
      HealthBar = _unresolved_2.HealthBar;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "794f5CqCjRFMraK/AtRYZ5I", "HealthBar_Cycle", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'UITransform', 'Sprite', 'CCFloat', 'UIOpacity', 'tween']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * HealthBar_Cycle 类
       * 用于显示角色的生命值
       */

      _export("HealthBar_Cycle", HealthBar_Cycle = (_dec = ccclass('HealthBar_Cycle'), _dec2 = property({
        type: Sprite,
        displayName: '血条填充',
        tooltip: '血条填充节点，会根据生命值百分比调整填充范围'
      }), _dec3 = property({
        type: Sprite,
        displayName: '血条平滑背景',
        tooltip: '血条平滑背景节点，会在受伤后缓慢减少'
      }), _dec4 = property({
        type: CCFloat,
        displayName: '平滑动画时长',
        range: [0.1, 2.0],
        tooltip: '血条减少的平滑动画持续时间（秒）'
      }), _dec5 = property({
        type: UIOpacity,
        displayName: '血条透明度'
      }), _dec(_class = (_class2 = class HealthBar_Cycle extends (_crd && HealthBar === void 0 ? (_reportPossibleCrUseOfHealthBar({
        error: Error()
      }), HealthBar) : HealthBar) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "fill", _descriptor, this);

          _initializerDefineProperty(this, "backgroundFill", _descriptor2, this);

          _initializerDefineProperty(this, "animationDuration", _descriptor3, this);

          _initializerDefineProperty(this, "opacity", _descriptor4, this);

          // 动画相关
          this.isAnimating = false;
          this.currentHealthPercent = 1.0;
          this.targetHealthPercent = 1.0;
          this.animationTimer = 0;
          this.isShow = false;
        }

        onLoad() {
          this.initialize();
          this.isShow = this.node.active;
        }

        update(dt) {
          // 处理平滑动画
          if (this.isAnimating) {
            this.animationTimer += dt; // 计算动画进度

            const progress = Math.min(1.0, this.animationTimer / this.animationDuration); // 如果背景填充存在，平滑更新其填充范围

            if (this.backgroundFill) {
              // 计算当前应该显示的血量百分比（线性插值）
              const currentFillRange = this.currentHealthPercent - (this.currentHealthPercent - this.targetHealthPercent) * progress;
              this.backgroundFill.fillRange = currentFillRange; // 动画完成

              if (progress >= 1.0) {
                this.isAnimating = false;
                this.currentHealthPercent = this.targetHealthPercent;
              }
            } else {
              // 如果没有背景填充，直接结束动画
              this.isAnimating = false;
            }
          }
        }
        /**
         * 初始化血条
         */


        initialize() {
          // 检查必要的节点是否存在
          if (!this.fill) {
            //console.error('HealthBar_Cycle: 血条填充节点未设置');
            return;
          } // 确保使用的是圆形填充类型


          this.fill.type = Sprite.Type.FILLED;
          this.fill.fillType = Sprite.FillType.RADIAL;
          this.fill.fillRange = 1.0; // 初始化背景填充

          if (this.backgroundFill) {
            this.backgroundFill.type = Sprite.Type.FILLED;
            this.backgroundFill.fillType = Sprite.FillType.RADIAL;
            this.backgroundFill.fillRange = 1.0;
          } // 初始化血量百分比


          this.currentHealthPercent = 1.0;
          this.targetHealthPercent = 1.0;
        }
        /**
         * 更新血条显示
         * @param percentage 生命值百分比 (0-1)
         */


        updateHealth(percentage) {
          // 安全检查，确保血条组件已正确初始化
          if (!this.fill) {
            return;
          } // 限制百分比在0-1范围内


          const healthPercent = Math.max(0, Math.min(1, percentage)); // 更新填充区域范围（立即更新）

          this.fill.fillRange = healthPercent; // 处理平滑背景动画

          if (this.backgroundFill) {
            if (healthPercent < this.currentHealthPercent) {
              // 如果动画正在进行，保存当前背景填充范围对应的百分比作为新的起始点
              if (this.isAnimating) {
                this.currentHealthPercent = this.backgroundFill.fillRange;
              } // 更新目标值


              this.targetHealthPercent = healthPercent; // 重置动画

              this.isAnimating = true;
              this.animationTimer = 0;
            } else if (healthPercent > this.targetHealthPercent) {
              // 如果是血量恢复，直接更新两个值并立即显示
              this.currentHealthPercent = healthPercent;
              this.targetHealthPercent = healthPercent;
              this.isAnimating = false;
              this.backgroundFill.fillRange = healthPercent;
            } // 如果血量等于目标值，不需要特殊处理

          }
        }
        /**
         * 显示血条
         */


        show() {
          if (!this.isShow) {
            this.isShow = true;
            this.node.active = true;
            this.opacity.opacity = 255; // tween(this.opacity).to(0.3, { opacity: 255 }).start();
          }
        }
        /**
         * 隐藏血条
         */


        hide() {
          if (this.isShow) {
            this.isShow = false;
            tween(this.opacity).to(0.6, {
              opacity: 0
            }).call(() => {
              this.node.active = false;
            }).start();
          }
        }
        /**
         * 立即隐藏血条
         */


        hideImmediately() {
          this.isShow = false;
          this.node.active = false;
        }

        init() {
          this.initialize();
          this.isShow = this.node.active;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fill", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "backgroundFill", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "animationDuration", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.5;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "opacity", [_dec5], {
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
//# sourceMappingURL=6a344ee86d2d419d05960be5b0aac80e547c04ef.js.map