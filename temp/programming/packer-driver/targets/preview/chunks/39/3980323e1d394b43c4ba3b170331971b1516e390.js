System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, tween, MeshRenderer, CCFloat, CCInteger, instantiate, Vec3Type, ObjectType, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _crd, ccclass, property, WheatCrop;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../Common/CommonEnum", _context.meta, extras);
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
      Vec3 = _cc.Vec3;
      tween = _cc.tween;
      MeshRenderer = _cc.MeshRenderer;
      CCFloat = _cc.CCFloat;
      CCInteger = _cc.CCInteger;
      instantiate = _cc.instantiate;
      Vec3Type = _cc.Vec3;
    }, function (_unresolved_2) {
      ObjectType = _unresolved_2.ObjectType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "98a80csaDxLZ5jlIvyi5lI1", "WheatCrop", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'tween', 'MeshRenderer', 'CCFloat', 'CCInteger', 'instantiate', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * WheatCrop —— 挂在场景中每个可收割资源节点（麦子、树木等）上
       *
       * 设计说明：
       *  - 纯数据组件，不做任何物理碰撞
       *  - ResourceFieldManager 在 onLoad 时扫描场景中所有 WheatCrop 并缓存
       *  - Chainsaw 每帧通过 ResourceFieldManager 查询条带内未收割的资源
       *  - 收割后调用 harvest()，视觉隐藏由外部（Chainsaw）决定策略
       */

      _export("WheatCrop", WheatCrop = (_dec = ccclass('WheatCrop'), _dec2 = property({
        type: _crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
          error: Error()
        }), ObjectType) : ObjectType,
        displayName: '资源类型',
        tooltip: '该节点代表的资源类型，例如 DropItemCornKernel（麦子）/ DropItemWood（木头）'
      }), _dec3 = property({
        displayName: '单次收割数量',
        tooltip: '锯条扫过时，本节点产出的资源数量',
        min: 1
      }), _dec4 = property({
        displayName: '再生时间(秒, 0=不再生)',
        tooltip: '收割后多少秒重新长出，0 表示永久消失',
        min: 0
      }), _dec5 = property({
        displayName: '砍伐晃动'
      }), _dec6 = property({
        type: CCFloat,
        displayName: '晃动角度',
        min: 0
      }), _dec7 = property({
        type: CCFloat,
        displayName: '晃动总时长',
        min: 0
      }), _dec8 = property({
        type: CCInteger,
        displayName: '碎片数量',
        min: 0
      }), _dec9 = property({
        type: CCFloat,
        displayName: '碎片缩放最小值',
        min: 0.01
      }), _dec10 = property({
        type: CCFloat,
        displayName: '碎片缩放最大值',
        min: 0.01
      }), _dec11 = property({
        type: CCFloat,
        displayName: '碎片飞散距离(米)',
        min: 0
      }), _dec12 = property({
        type: CCFloat,
        displayName: '碎片上升高度(米)',
        min: 0
      }), _dec13 = property({
        type: CCFloat,
        displayName: '碎片飞散时长(秒)',
        min: 0.05
      }), _dec(_class = (_class2 = class WheatCrop extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "resourceType", _descriptor, this);

          _initializerDefineProperty(this, "harvestAmount", _descriptor2, this);

          _initializerDefineProperty(this, "regrowTime", _descriptor3, this);

          _initializerDefineProperty(this, "enableShakeOnHarvest", _descriptor4, this);

          _initializerDefineProperty(this, "shakeAngleDeg", _descriptor5, this);

          _initializerDefineProperty(this, "shakeDuration", _descriptor6, this);

          // ─────────────────────────────────────────────
          // 碎片效果配置
          // ─────────────────────────────────────────────
          _initializerDefineProperty(this, "fragmentCount", _descriptor7, this);

          _initializerDefineProperty(this, "fragmentScaleMin", _descriptor8, this);

          _initializerDefineProperty(this, "fragmentScaleMax", _descriptor9, this);

          _initializerDefineProperty(this, "fragmentScatterDistance", _descriptor10, this);

          _initializerDefineProperty(this, "fragmentUpHeight", _descriptor11, this);

          _initializerDefineProperty(this, "fragmentDuration", _descriptor12, this);

          // ─────────────────────────────────────────────
          // 运行时数据
          // ─────────────────────────────────────────────

          /** 是否已被收割 */
          this._harvested = false;

          /** 世界坐标缓存（onLoad 时记录，避免每帧 getWorldPosition） */
          this._worldPos = new Vec3();
        }

        // ─────────────────────────────────────────────
        // 生命周期
        // ─────────────────────────────────────────────
        onLoad() {
          // 缓存世界坐标（假设麦子不会移动）
          this.node.getWorldPosition(this._worldPos);
        } // ─────────────────────────────────────────────
        // 公开接口
        // ─────────────────────────────────────────────

        /** 是否已被收割 */


        get harvested() {
          return this._harvested;
        }
        /** 缓存的世界坐标（XZ平面，Y忽略） */


        get worldPos() {
          return this._worldPos;
        }
        /**
         * 主动刷新世界坐标缓存
         * 由 WheatFieldManager / TreeFieldManager 在挂载完成后调用
         */


        refreshWorldPos() {
          this.node.getWorldPosition(this._worldPos);
        }
        /**
         * 执行收割
         * 收割后不自动启动再生计时，由外部（火车到站/玩家下车时）
         * 通过 ResourceFieldManager.startBatchRegrow() 分帧统一触发。
         * @returns 产出的资源类型和数量，已收割则返回 null
         */


        harvest() {
          var _this$node$parent, _this$node$parent2;

          if (this._harvested) return null;
          this._harvested = true; // 播放碎片飞散效果（在隐藏节点之前，碎片从当前位置飞出）

          this._playFragmentEffect();

          if (this.enableShakeOnHarvest && this.resourceType === (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemWood) {
            var orig = this.node.eulerAngles.clone();
            var a = this.shakeAngleDeg;
            var up = new Vec3Type(orig.x, orig.y, orig.z + a);
            var down = new Vec3Type(orig.x, orig.y, orig.z - a);
            var t = Math.max(0.1, this.shakeDuration);
            tween(this.node).to(t * 0.25, {
              eulerAngles: up
            }).to(t * 0.5, {
              eulerAngles: down
            }).to(t * 0.25, {
              eulerAngles: orig
            }).call(() => {
              this.node.setRotationFromEuler(orig.x, orig.y, orig.z);
              this.node.active = false;
            }).start();
          } else {
            this.node.active = false;
          }

          console.log("[WheatCrop] harvest: node=" + this.node.name + " active=false parent=" + ((_this$node$parent = this.node.parent) == null ? void 0 : _this$node$parent.name) + " parentActive=" + ((_this$node$parent2 = this.node.parent) == null ? void 0 : _this$node$parent2.active));
          return {
            type: this.resourceType,
            amount: this.harvestAmount
          };
        }
        /**
         * 外部触发再生（由 ResourceFieldManager.startBatchRegrow 分帧调用）
         *
         * 注意：不能用 this.scheduleOnce，因为 harvest() 执行了 node.active = false，
         * 节点非激活时组件的 schedule 会停止计时，导致再生回调永远不触发。
         * 因此计时器必须交给外部始终激活的节点（ResourceFieldManager）来驱动，
         * 本方法只暴露再生所需的回调，由 ResourceFieldManager 持有并调度。
         *
         * @returns 再生回调函数和延迟时间，供 ResourceFieldManager 调度
         */


        buildRegrowCallback() {
          var _this$node$parent3;

          var delay = this.regrowTime > 0 ? this.regrowTime : 0;
          var nodeName = this.node.name;
          console.log("[WheatCrop] buildRegrowCallback node=" + nodeName + " delay=" + delay + " nodeActive=" + this.node.active + " parentActive=" + ((_this$node$parent3 = this.node.parent) == null ? void 0 : _this$node$parent3.active));
          return {
            delay,
            callback: () => {
              var _this$node, _this$node2;

              console.log("[WheatCrop] callback\u89E6\u53D1 node=" + nodeName + " isValid=" + ((_this$node = this.node) == null ? void 0 : _this$node.isValid) + " harvested=" + this._harvested);
              if (!((_this$node2 = this.node) != null && _this$node2.isValid)) return;
              this._harvested = false;
              this.node.active = true;
              this.node.getWorldPosition(this._worldPos);
              console.log("[WheatCrop] \u5DF2\u518D\u751F node=" + nodeName + " active=" + this.node.active);
            }
          };
        }
        /** @deprecated 请使用 buildRegrowCallback() 代替，直接调用此方法无效（节点非激活时 schedule 停止） */


        triggerRegrow() {// 保留空实现兼容旧调用，实际由 ResourceFieldManager 通过 buildRegrowCallback 调度
        }
        /**
         * 碎片飞散效果
         * 克隆自身模型节点，脱离父节点独立运动，tween 模拟抛物线后销毁
         */


        _playFragmentEffect() {
          var _this = this;

          if (this.fragmentCount <= 0) return; // 找所有带 MeshRenderer 的子节点（麦穗模型）

          var meshNodes = [];

          this._findMeshNodes(this.node, meshNodes);

          if (meshNodes.length === 0) return;
          var centerPos = this.node.getWorldPosition();

          var _loop = function _loop() {
            var fragment = instantiate(meshNodes[0]); // 脱离原节点树，挂到同一父节点下独立运动

            fragment.setParent(_this.node.parent);
            fragment.setWorldPosition(centerPos); // 随机缩放

            var s = _this.fragmentScaleMin + Math.random() * (_this.fragmentScaleMax - _this.fragmentScaleMin);

            var os = fragment.scale.clone();
            fragment.setScale(os.x * s, os.y * s, os.z * s); // 均匀分布飞散方向 + 随机扰动

            var angle = Math.PI * 2 * i / _this.fragmentCount + (Math.random() - 0.5) * 0.8;
            var dist = _this.fragmentScatterDistance * (0.7 + Math.random() * 0.6);
            var targetPos = new Vec3(centerPos.x + Math.cos(angle) * dist, centerPos.y + _this.fragmentUpHeight * (0.8 + Math.random() * 0.4), centerPos.z + Math.sin(angle) * dist); // 第1段：飞散 + 上升（抛物线感）

            tween(fragment).to(_this.fragmentDuration, {
              worldPosition: targetPos
            }, {
              easing: 'quadOut'
            }) // 第2段：缩小消失
            .to(_this.fragmentDuration * 0.4, {
              scale: new Vec3(0, 0, 0)
            }).call(() => {
              fragment.destroy();
            }).start(); // 单独控制 Y 轴下落（到达顶点后重力感下坠）

            var fallDelay = _this.fragmentDuration * 0.55;

            _this.scheduleOnce(() => {
              if (fragment && fragment.isValid) {
                var fallTarget = new Vec3(targetPos.x, centerPos.y - 0.3, targetPos.z);
                tween(fragment).to(_this.fragmentDuration * 0.45, {
                  worldPosition: fallTarget
                }, {
                  easing: 'quadIn'
                }).start();
              }
            }, fallDelay);
          };

          for (var i = 0; i < this.fragmentCount; i++) {
            _loop();
          }
        }
        /**
         * 递归查找包含 MeshRenderer 的节点
         */


        _findMeshNodes(node, results) {
          if (node.getComponent(MeshRenderer)) {
            results.push(node);
          }

          for (var child of node.children) {
            this._findMeshNodes(child, results);
          }
        }
        /**
         * 强制重置为未收割状态（游戏重置时调用）
         */


        reset() {
          this._harvested = false;
          this.node.active = true;
          this.node.getWorldPosition(this._worldPos);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "resourceType", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemCornKernel;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "harvestAmount", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "regrowTime", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "enableShakeOnHarvest", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "shakeAngleDeg", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 8;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "shakeDuration", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.4;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "fragmentCount", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 4;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "fragmentScaleMin", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.2;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "fragmentScaleMax", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.45;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "fragmentScatterDistance", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.6;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "fragmentUpHeight", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "fragmentDuration", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.35;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3980323e1d394b43c4ba3b170331971b1516e390.js.map