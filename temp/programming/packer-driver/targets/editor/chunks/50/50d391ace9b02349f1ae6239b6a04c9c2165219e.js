System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Node, Tween, tween, Vec3, CCFloat, ModelAnimationComponent, PoolObjectBase, ComponentEvent, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, SpecialCustomer;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfModelAnimationComponent(extras) {
    _reporterNs.report("ModelAnimationComponent", "../Components/ModelAnimationComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPoolObjectBase(extras) {
    _reporterNs.report("PoolObjectBase", "../../Main/Common/PoolObjectBase", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../../Main/Common/ComponentEvents", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Node = _cc.Node;
      Tween = _cc.Tween;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
      CCFloat = _cc.CCFloat;
    }, function (_unresolved_2) {
      ModelAnimationComponent = _unresolved_2.ModelAnimationComponent;
    }, function (_unresolved_3) {
      PoolObjectBase = _unresolved_3.PoolObjectBase;
    }, function (_unresolved_4) {
      ComponentEvent = _unresolved_4.ComponentEvent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3a7471ZtAJCoYfG4ze9oJwt", "SpecialCustomer", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Tween', 'tween', 'Vec3', 'v3', 'CCFloat']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("SpecialCustomer", SpecialCustomer = (_dec = ccclass('SpecialCustomer'), _dec2 = property({
        type: _crd && ModelAnimationComponent === void 0 ? (_reportPossibleCrUseOfModelAnimationComponent({
          error: Error()
        }), ModelAnimationComponent) : ModelAnimationComponent,
        displayName: '动画组件'
      }), _dec3 = property({
        type: Node,
        displayName: '目标点'
      }), _dec4 = property({
        type: CCFloat,
        displayName: '移动速度(单位/秒)'
      }), _dec5 = property({
        displayName: '启用时自动出发'
      }), _dec6 = property({
        type: Node,
        displayName: 'UI节点',
        tooltip: '需要始终面向Z轴的UI节点'
      }), _dec(_class = (_class2 = class SpecialCustomer extends (_crd && PoolObjectBase === void 0 ? (_reportPossibleCrUseOfPoolObjectBase({
        error: Error()
      }), PoolObjectBase) : PoolObjectBase) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "animationComponent", _descriptor, this);

          _initializerDefineProperty(this, "targetPoint", _descriptor2, this);

          _initializerDefineProperty(this, "moveSpeed", _descriptor3, this);

          _initializerDefineProperty(this, "autoStart", _descriptor4, this);

          _initializerDefineProperty(this, "uiNode", _descriptor5, this);

          this._isMoving = false;
        }

        onEnable() {
          if (this.autoStart) {
            this.moveToTarget();
          }
        }

        update(dt) {
          var _this$uiNode;

          (_this$uiNode = this.uiNode) == null || _this$uiNode.setWorldRotationFromEuler(0, 0, 0);
        }

        moveToTarget(cb) {
          if (!this.targetPoint) return;
          const to = this.targetPoint.getWorldPosition();
          this.moveToWorldPos(to, cb);
        }

        moveToWorldPos(pos, cb) {
          Tween.stopAllByTarget(this.node);
          this._isMoving = true;
          const currentPos = this.node.getWorldPosition();
          const distance = Vec3.distance(currentPos, pos);

          if (distance < 0.01) {
            this._isMoving = false;

            if (this.animationComponent) {
              this.animationComponent.playIdle();
            }

            cb && cb();
            return;
          }

          const duration = this.moveSpeed > 0 ? distance / this.moveSpeed : 0.01;

          if (this.animationComponent) {
            this.animationComponent.playMove();
          }

          tween(this.node).to(duration, {
            worldPosition: pos
          }, {
            onUpdate: (target, ratio) => {
              if (ratio === undefined || ratio > 0.9) return;
              const direction = new Vec3();
              Vec3.subtract(direction, pos, currentPos);
              direction.normalize();
              this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
                error: Error()
              }), ComponentEvent) : ComponentEvent).SET_FACE_DIRECTION_FROM_3D, direction);
            }
          }).call(() => {
            this._isMoving = false;

            if (this.animationComponent) {
              this.animationComponent.playIdle();
            }

            cb && cb();
          }).start();
        }

        get isMoving() {
          return this._isMoving;
        }

        reset() {
          this._isMoving = false;
          Tween.stopAllByTarget(this.node);

          if (this.animationComponent) {
            this.animationComponent.playIdle();
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "animationComponent", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "targetPoint", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 8;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "autoStart", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "uiNode", [_dec6], {
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
//# sourceMappingURL=50d391ace9b02349f1ae6239b6a04c9c2165219e.js.map