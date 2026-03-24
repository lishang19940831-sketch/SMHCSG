System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, MeshRenderer, Vec3, Vec2, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, tempV2, tOffset, NavLineComp;

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
      Vec3 = _cc.Vec3;
      Vec2 = _cc.Vec2;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "65d0cqP3lxCpIiCeA/nWZCU", "NavLineComp", undefined);

      __checkObsolete__(['_decorator', 'Component', 'MeshRenderer', 'Material', 'Vec3', 'Vec2']);

      ({
        ccclass,
        property
      } = _decorator);
      tempV2 = new Vec3(1, 1, 1);
      tOffset = new Vec2(1, 1);
      /**
       * 导航线组件 - 3D Mesh箭头引导线
       * 用于在3D场景中显示从起点到终点的箭头引导
       */

      _export("NavLineComp", NavLineComp = (_dec = ccclass('NavLineComp'), _dec2 = property({
        type: MeshRenderer,
        displayName: "箭头Mesh",
        tooltip: "拖MeshRenderer组件到这里"
      }), _dec3 = property({
        displayName: "箭头速度",
        tooltip: "控制材质texture位移,在代码里设置x轴向或者y轴移动",
        min: 0.1
      }), _dec4 = property({
        displayName: "箭头密度",
        tooltip: "控制箭头的密度",
        min: 0.1
      }), _dec5 = property({
        displayName: "长度缩放倍数",
        tooltip: "调整箭头线的实际长度，值越大越长",
        min: 0.1,
        max: 10
      }), _dec6 = property({
        displayName: "Y轴旋转偏移",
        tooltip: "调整箭头朝向，通常为0或180",
        min: 0,
        max: 360
      }), _dec(_class = (_class2 = class NavLineComp extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "lineMesh", _descriptor, this);

          _initializerDefineProperty(this, "moveSpeed", _descriptor2, this);

          _initializerDefineProperty(this, "density", _descriptor3, this);

          _initializerDefineProperty(this, "lengthScale", _descriptor4, this);

          _initializerDefineProperty(this, "yRotationOffset", _descriptor5, this);

          /** 材质实例（改为public以便外部访问） */
          this.mat = null;

          /** 当前距离长度 */
          this.desLen = 0;

          /** 上一次的缩放长度（用于优化，避免重复设置相同值） */
          this.lastScaledLength = -1;

          /** 是否已初始化 */
          this.inited = false;
        }

        onLoad() {
          if (this.lineMesh) {
            this.mat = this.lineMesh.material;
          }
        }

        start() {
          var textureSpeed = new Vec2(0, 0); // 根据需求设置移动方向（Y轴）

          textureSpeed.y = this.moveSpeed;

          if (this.mat) {
            this.mat.setProperty("textureMoveSpeed", textureSpeed);
          }
        }
        /**
         * 停止显示导航线（仅重置状态，不控制显示）
         */


        stop() {
          // 重置状态，以便下次显示时可以重新初始化
          this.lastScaledLength = -1;
          this.inited = false;
        }
        /**
         * 显示导航线（空方法，保留接口兼容性）
         */


        show() {// 不再控制显示，由外部 arrow 节点控制
        }
        /**
         * 设置导航线的长度（父节点负责位置和旋转，本组件只负责拉伸）
         * @param distance 起点到终点的距离
         */


        setDistance(distance) {
          // 保存距离
          this.desLen = distance; // 应用长度缩放倍数

          var scaledLength = this.desLen * this.lengthScale; // 优化：只在长度变化时才更新（避免每帧重复设置相同值）

          var lengthDiff = Math.abs(scaledLength - this.lastScaledLength);

          if (lengthDiff < 0.01) {
            return; // 长度几乎没变化，跳过更新
          }

          this.lastScaledLength = scaledLength; // 根据距离缩放节点（Z轴方向拉伸）- 只设置局部缩放

          tempV2.set(1, 1, scaledLength);
          this.node.setScale(tempV2); // 设置局部Y轴旋转偏移（用于调整箭头朝向）- 只需设置一次

          if (this.yRotationOffset !== 0 && !this.inited) {
            var euler = new Vec3(0, this.yRotationOffset, 0);
            this.node.setRotationFromEuler(euler);
          } // 根据距离和密度设置纹理平铺（使用缩放后的长度）


          tOffset.y = scaledLength * this.density;

          if (this.mat) {
            this.mat.setProperty("tilingOffset", tOffset); // ⭐ 设置 tileCount 用于渐变计算（应与纹理平铺数量一致）
            // ⚠️ 注释掉：shader中未定义此属性，会产生警告
            // const tileCount = scaledLength * this.density;
            // this.mat.setProperty("tileCount", tileCount);
          }

          this.inited = true;
        }
        /**
         * 设置导航线的起点和终点（兼容旧接口，内部只使用距离）
         * @param startPos 起点世界坐标
         * @param desPos 终点世界坐标
         */


        setDis(startPos, desPos) {
          var distance = Vec3.distance(startPos, desPos);
          this.setDistance(distance);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lineMesh", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "density", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lengthScale", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "yRotationOffset", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e1b888dc435fe41bf888a8687ee7b3f8bbb137a2.js.map