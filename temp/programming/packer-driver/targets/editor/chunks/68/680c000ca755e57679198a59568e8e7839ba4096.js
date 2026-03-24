System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, CCFloat, tween, Vec4, MeshRenderer, ObjectType, WheatContainer, FlatbreadContainer, ProductionBuilding, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _crd, ccclass, property, ConveyorBelt;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfWheatContainer(extras) {
    _reporterNs.report("WheatContainer", "./WheatContainer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfFlatbreadContainer(extras) {
    _reporterNs.report("FlatbreadContainer", "./FlatbreadContainer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfProductionBuilding(extras) {
    _reporterNs.report("ProductionBuilding", "./ProductionBuilding", _context.meta, extras);
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
      Node = _cc.Node;
      Vec3 = _cc.Vec3;
      CCFloat = _cc.CCFloat;
      tween = _cc.tween;
      Vec4 = _cc.Vec4;
      MeshRenderer = _cc.MeshRenderer;
    }, function (_unresolved_2) {
      ObjectType = _unresolved_2.ObjectType;
    }, function (_unresolved_3) {
      WheatContainer = _unresolved_3.WheatContainer;
    }, function (_unresolved_4) {
      FlatbreadContainer = _unresolved_4.FlatbreadContainer;
    }, function (_unresolved_5) {
      ProductionBuilding = _unresolved_5.ProductionBuilding;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "70788XHcGBDx5f9Z7DyQgky", "ConveyorBelt", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'CCFloat', 'tween', 'Material', 'Vec4', 'MeshRenderer']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ConveyorBelt", ConveyorBelt = (_dec = ccclass('ConveyorBelt'), _dec2 = property({
        type: _crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
          error: Error()
        }), ObjectType) : ObjectType,
        displayName: '资源类型'
      }), _dec3 = property({
        displayName: '启用传送带'
      }), _dec4 = property({
        displayName: '开局隐藏'
      }), _dec5 = property({
        type: Node,
        displayName: 'A点'
      }), _dec6 = property({
        type: [Node],
        displayName: 'B点列表'
      }), _dec7 = property({
        type: Node,
        displayName: 'C点'
      }), _dec8 = property({
        type: Node,
        displayName: '供给容器'
      }), _dec9 = property({
        type: Node,
        displayName: '接收容器'
      }), _dec10 = property({
        type: CCFloat,
        displayName: '带速(m/s)'
      }), _dec11 = property({
        type: CCFloat,
        displayName: '拉取周期(秒)'
      }), _dec12 = property({
        type: CCFloat,
        displayName: '在途上限'
      }), _dec13 = property({
        type: CCFloat,
        displayName: '可视Y偏移'
      }), _dec14 = property({
        type: MeshRenderer,
        displayName: '传送带mtl节点'
      }), _dec15 = property({
        type: CCFloat,
        displayName: 'UV速度'
      }), _dec(_class = (_class2 = class ConveyorBelt extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "itemType", _descriptor, this);

          _initializerDefineProperty(this, "conveyorEnabled", _descriptor2, this);

          _initializerDefineProperty(this, "hideOnStart", _descriptor3, this);

          _initializerDefineProperty(this, "pointA", _descriptor4, this);

          _initializerDefineProperty(this, "midPoints", _descriptor5, this);

          _initializerDefineProperty(this, "pointC", _descriptor6, this);

          _initializerDefineProperty(this, "sourceNode", _descriptor7, this);

          _initializerDefineProperty(this, "sinkNode", _descriptor8, this);

          _initializerDefineProperty(this, "moveSpeed", _descriptor9, this);

          _initializerDefineProperty(this, "pullInterval", _descriptor10, this);

          _initializerDefineProperty(this, "maxInFlight", _descriptor11, this);

          _initializerDefineProperty(this, "visualYOffset", _descriptor12, this);

          _initializerDefineProperty(this, "conveyorMaterial", _descriptor13, this);

          this._timer = 0;
          this._inFlight = 0;

          _initializerDefineProperty(this, "uvScrollSpeed", _descriptor14, this);

          this._uvZ = 0;
        }

        onLoad() {
          if (this.hideOnStart) {
            this.node.active = false;
            this.conveyorEnabled = false;
            this.conveyorMaterial.materials[0].getProperty('tilingOffset');
          }
        }

        update(dt) {
          if (!this.conveyorEnabled) return;
          this._timer += dt;

          while (this._timer >= this.pullInterval) {
            this._timer -= this.pullInterval;

            this._trySpawnOne();
          }

          if (this.node.active && this.conveyorEnabled && this.conveyorMaterial) {
            this._uvZ += this.uvScrollSpeed * dt;
            const v = new Vec4(1, 1, this._uvZ, 0);
            this.conveyorMaterial.materials[0].setProperty('tilingOffset', v, 0);
          }
        }

        startConveyor() {
          this.conveyorEnabled = true;
        }

        stopConveyor() {
          this.conveyorEnabled = false;
        }

        showAndEnable() {
          this.node.active = true;
          this.startConveyor();
        }

        hideAndDisable() {
          this.stopConveyor();
          this.node.active = false;
        }

        _trySpawnOne() {
          if (this._inFlight >= this.maxInFlight) return;

          const source = this._getSource();

          const sink = this._getSink();

          if (!source || !sink) return;

          const wp = this._buildWaypoints();

          if (wp.length < 2) return;
          const item = source.takeForConveyor == null ? void 0 : source.takeForConveyor();
          if (!item) return;
          this._inFlight++;
          item.setParent(manager.effect.node);
          const start = wp[0].clone();
          start.y += this.visualYOffset;
          item.setWorldPosition(start);
          let seq = tween(item);

          for (let i = 1; i < wp.length; i++) {
            const from = wp[i - 1];
            const to = wp[i];
            const dist = Vec3.distance(from, to);
            const dur = this.moveSpeed > 0 ? dist / this.moveSpeed : 0.01;
            const target = new Vec3(to.x, to.y + this.visualYOffset, to.z);
            seq = seq.to(dur, {
              worldPosition: target
            });
          }

          seq.call(() => {
            const pos = item.getWorldPosition().clone();
            manager.pool.putNode(item);

            const accepted = this._deliverToSink(sink, pos, () => {
              this._inFlight = Math.max(0, this._inFlight - 1);
            });

            if (!accepted) {
              this._inFlight = Math.max(0, this._inFlight - 1);
            }
          }).start();
        }

        _buildWaypoints() {
          var _this$pointA;

          const pts = [];
          const aNode = (_this$pointA = this.pointA) != null ? _this$pointA : this.sourceNode;
          if (aNode && aNode.isValid) pts.push(aNode.getWorldPosition().clone());

          for (const n of this.midPoints) {
            if (n && n.isValid) pts.push(n.getWorldPosition().clone());
          }

          if (this.pointC && this.pointC.isValid) pts.push(this.pointC.getWorldPosition().clone());
          return pts;
        }

        _getSource() {
          if (!this.sourceNode || !this.sourceNode.isValid) return null;
          const wc = this.sourceNode.getComponent(_crd && WheatContainer === void 0 ? (_reportPossibleCrUseOfWheatContainer({
            error: Error()
          }), WheatContainer) : WheatContainer);
          return wc != null ? wc : null;
        }

        _getSink() {
          if (!this.sinkNode || !this.sinkNode.isValid) return null;
          const pb = this.sinkNode.getComponent(_crd && ProductionBuilding === void 0 ? (_reportPossibleCrUseOfProductionBuilding({
            error: Error()
          }), ProductionBuilding) : ProductionBuilding);
          if (pb) return pb;
          const wc = this.sinkNode.getComponent(_crd && WheatContainer === void 0 ? (_reportPossibleCrUseOfWheatContainer({
            error: Error()
          }), WheatContainer) : WheatContainer);
          if (wc) return wc;
          const fb = this.sinkNode.getComponent(_crd && FlatbreadContainer === void 0 ? (_reportPossibleCrUseOfFlatbreadContainer({
            error: Error()
          }), FlatbreadContainer) : FlatbreadContainer);
          if (fb) return fb;
          return null;
        }

        _deliverToSink(sink, from, done) {
          const pb = sink;

          if (pb && pb.receiveRawMaterial) {
            const ok = pb.receiveRawMaterial(from, this.itemType);
            done();
            return ok;
          }

          const recv = sink;

          if (recv && recv.receive) {
            return recv.receive(from, done);
          }

          done();
          return false;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "itemType", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemCornKernel;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "conveyorEnabled", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "hideOnStart", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "pointA", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "midPoints", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "pointC", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "sourceNode", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "sinkNode", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 3;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "pullInterval", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.6;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "maxInFlight", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 5;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "visualYOffset", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.3;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "conveyorMaterial", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "uvScrollSpeed", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=680c000ca755e57679198a59568e8e7839ba4096.js.map