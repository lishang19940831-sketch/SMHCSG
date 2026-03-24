System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, MeshRenderer, tween, Vec4, Color, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, GlowController;

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
      MeshRenderer = _cc.MeshRenderer;
      tween = _cc.tween;
      Vec4 = _cc.Vec4;
      Color = _cc.Color;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a9259UAtiBCSoMrOXhz4wkA", "GlowController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'MeshRenderer', 'Material', 'tween', 'Vec4', 'Color']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 外发光控制器
       * 用于控制使用 standard-outline-001 材质的模型的外发光效果
       * 
       * 使用场景：电塔
       * - 常态：不发光（glowIntensity = 0）
       * - 准备攻击：发蓝光（glowIntensity = 3.0, 蓝色）
       * - 攻击后：发光消失，恢复常态
       */

      _export("GlowController", GlowController = (_dec = ccclass('GlowController'), _dec2 = property({
        type: MeshRenderer,
        displayName: '网格渲染器列表'
      }), _dec3 = property({
        displayName: '常态发光强度',
        slide: true,
        range: [0, 5.0],
        step: 0.01
      }), _dec4 = property({
        type: Color,
        displayName: '发光颜色（蓝色=电塔）'
      }), _dec5 = property({
        displayName: '准备攻击时的发光强度',
        slide: true,
        range: [0, 5.0],
        step: 0.01
      }), _dec6 = property({
        displayName: '发光动画时长(秒)'
      }), _dec(_class = (_class2 = class GlowController extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "meshRenderers", _descriptor, this);

          _initializerDefineProperty(this, "glowIntensity", _descriptor2, this);

          _initializerDefineProperty(this, "glowColor", _descriptor3, this);

          _initializerDefineProperty(this, "readyGlowIntensity", _descriptor4, this);

          _initializerDefineProperty(this, "glowDuration", _descriptor5, this);

          this.materials = [];
          this.currentGlowIntensity = 0;
          this.isGlowing = false;
        }

        onLoad() {
          this.initMaterial();
          this.setGlowColor(this.glowColor); // 先设置颜色

          this.setGlowIntensity(this.glowIntensity); // 再设置强度
        }
        /**
         * 初始化材质
         */


        initMaterial() {
          if (this.meshRenderers.length === 0) {
            // this.meshRenderers = this.getComponent(MeshRenderer);
            this.meshRenderers.push(this.getComponent(MeshRenderer));
          }

          if (this.meshRenderers.length > 0) {
            // 获取材质实例（如果是共享材质，会自动创建实例）
            for (let i = 0; i < this.meshRenderers.length; i++) {
              this.materials.push(this.meshRenderers[i].getMaterialInstance(0));
              this.meshRenderers[i].getMaterialInstance(0).getProperty('glowIntensity');
            }
          } else {//console.warn('[GlowController] 未找到 MeshRenderer 或材质');
          }
        }
        /**
         * 设置发光强度
         */


        setGlowIntensity(intensity) {
          if (this.materials.length === 0) return;
          this.currentGlowIntensity = intensity; // 设置 glowIntensity 参数 (glowParams.x)

          for (let i = 0; i < this.materials.length; i++) {
            this.materials[i].setProperty('glowIntensity', intensity);
          }
        }
        /**
         * 设置发光颜色
         */


        setGlowColor(color) {
          if (this.materials.length === 0) return;
          this.glowColor = color; // 设置 glowColor 参数（独立的 vec4）

          const colorVec4 = new Vec4(this.glowColor.r / 255, this.glowColor.g / 255, this.glowColor.b / 255, 1.0);

          for (let i = 0; i < this.materials.length; i++) {
            this.materials[i].setProperty('glowColor', colorVec4);
          }
        }
        /**
         * 开始外发光（准备点击）
         */


        startGlow() {
          if (this.isGlowing) return;
          this.isGlowing = true; // 使用 tween 动画从当前强度渐变到目标强度

          const tempObj = {
            intensity: this.currentGlowIntensity
          };
          tween(tempObj).to(this.glowDuration, {
            intensity: this.readyGlowIntensity
          }, {
            onUpdate: () => {
              this.setGlowIntensity(tempObj.intensity);
            }
          }).call(() => {
            this.stopGlow();
          }).start();
        }
        /**
         * 停止外发光（电击后恢复）
         */


        stopGlow() {
          if (!this.isGlowing) return;
          this.isGlowing = false; // 使用 tween 动画从当前强度渐变回初始强度

          const tempObj = {
            intensity: this.currentGlowIntensity
          };
          tween(tempObj).to(this.glowDuration, {
            intensity: this.glowIntensity
          }, {
            onUpdate: () => {
              this.setGlowIntensity(tempObj.intensity);
            }
          }).start();
        }
        /**
         * 切换发光状态
         */


        toggleGlow() {
          if (this.isGlowing) {
            this.stopGlow();
          } else {
            this.startGlow();
          }
        }
        /**
         * 立即设置发光状态（无动画）
         */


        setGlowImmediate(isGlow) {
          this.isGlowing = isGlow;
          const targetIntensity = isGlow ? this.readyGlowIntensity : this.glowIntensity;
          this.setGlowIntensity(targetIntensity);
        }
        /**
         * 获取当前是否正在发光
         */


        get IsGlowing() {
          return this.isGlowing;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "meshRenderers", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "glowIntensity", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "glowColor", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Color(100, 150, 255, 255);
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "readyGlowIntensity", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 3.0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "glowDuration", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.3;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d6ad7affdf44c6e8062af4c54cd12b75781feeca.js.map