System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, easing, Enum, Label, Node, Tween, tween, v3, Vec3, ModelAnimationComponent, PoolObjectBase, ObjectType, ComponentEvent, PickupComponent, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class4, _class5, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _crd, ccclass, property, CustomerNeedIcon, Customer;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfModelAnimationComponent(extras) {
    _reporterNs.report("ModelAnimationComponent", "../Components/ModelAnimationComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPoolObjectBase(extras) {
    _reporterNs.report("PoolObjectBase", "../../Main/Common/PoolObjectBase", _context.meta, extras);
  }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../../Main/Common/ComponentEvents", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPickupComponent(extras) {
    _reporterNs.report("PickupComponent", "../Components/PickupComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDropItemCom(extras) {
    _reporterNs.report("DropItemCom", "../Drop/DropItemCom", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      easing = _cc.easing;
      Enum = _cc.Enum;
      Label = _cc.Label;
      Node = _cc.Node;
      Tween = _cc.Tween;
      tween = _cc.tween;
      v3 = _cc.v3;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      ModelAnimationComponent = _unresolved_2.ModelAnimationComponent;
    }, function (_unresolved_3) {
      PoolObjectBase = _unresolved_3.PoolObjectBase;
    }, function (_unresolved_4) {
      ObjectType = _unresolved_4.ObjectType;
    }, function (_unresolved_5) {
      ComponentEvent = _unresolved_5.ComponentEvent;
    }, function (_unresolved_6) {
      PickupComponent = _unresolved_6.PickupComponent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "523bfmelahMG6AMGaz7aIIg", "Customer", undefined);

      __checkObsolete__(['_decorator', 'Component', 'easing', 'Enum', 'Event', 'Label', 'Node', 'Tween', 'tween', 'v3', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("CustomerNeedIcon", CustomerNeedIcon = (_dec = ccclass('CustomerNeedIcon'), _dec2 = property({
        type: Enum(_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
          error: Error()
        }), ObjectType) : ObjectType),
        displayName: '需求类型'
      }), _dec3 = property({
        type: Node,
        displayName: '需求图标节点'
      }), _dec(_class = (_class2 = class CustomerNeedIcon {
        constructor() {
          _initializerDefineProperty(this, "needObjectType", _descriptor, this);

          _initializerDefineProperty(this, "iconNode", _descriptor2, this);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "needObjectType", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemWood;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "iconNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _export("Customer", Customer = (_dec4 = ccclass('Customer'), _dec5 = property({
        type: [CustomerNeedIcon],
        displayName: '需求图标'
      }), _dec6 = property({
        type: _crd && PickupComponent === void 0 ? (_reportPossibleCrUseOfPickupComponent({
          error: Error()
        }), PickupComponent) : PickupComponent,
        displayName: '拾取组件'
      }), _dec7 = property({
        type: Enum(_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
          error: Error()
        }), ObjectType) : ObjectType),
        displayName: '需求类型'
      }), _dec8 = property({
        type: _crd && ModelAnimationComponent === void 0 ? (_reportPossibleCrUseOfModelAnimationComponent({
          error: Error()
        }), ModelAnimationComponent) : ModelAnimationComponent,
        displayName: '动画组件'
      }), _dec9 = property({
        type: Node,
        displayName: 'UI节点',
        tooltip: '需要始终面向Z轴的UI节点'
      }), _dec10 = property({
        type: Node,
        displayName: '需求节点'
      }), _dec11 = property({
        type: Node,
        displayName: '快乐节点'
      }), _dec12 = property({
        type: Node,
        displayName: '不高兴节点'
      }), _dec13 = property({
        type: Node,
        displayName: '饥饿节点'
      }), _dec14 = property({
        type: Label,
        displayName: '剩余需要数量'
      }), _dec4(_class4 = (_class5 = class Customer extends (_crd && PoolObjectBase === void 0 ? (_reportPossibleCrUseOfPoolObjectBase({
        error: Error()
      }), PoolObjectBase) : PoolObjectBase) {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "customerNeedIcons", _descriptor3, this);

          _initializerDefineProperty(this, "pickupComponent", _descriptor4, this);

          _initializerDefineProperty(this, "needObjectType", _descriptor5, this);

          _initializerDefineProperty(this, "animationComponent", _descriptor6, this);

          _initializerDefineProperty(this, "uiNode", _descriptor7, this);

          _initializerDefineProperty(this, "angryNode", _descriptor8, this);

          _initializerDefineProperty(this, "happyNode", _descriptor9, this);

          _initializerDefineProperty(this, "unhappyNode", _descriptor10, this);

          _initializerDefineProperty(this, "hungryNode", _descriptor11, this);

          _initializerDefineProperty(this, "needObjectCountLabel", _descriptor12, this);

          this._needObjectCount = 0;
          this._isMoving = false;
          // 是否正在移动
          this._isReadyToBuy = false;
        }

        // 是否准备好购买（已站定）
        get isMoving() {
          return this._isMoving;
        }

        get isReadyToBuy() {
          return this._isReadyToBuy;
        }

        onLoad() {
          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).UPDATE_ITEM_COUNT, this.onUpdateItemCount, this);
        }

        update(dt) {
          var _this$uiNode;

          (_this$uiNode = this.uiNode) == null || _this$uiNode.setWorldRotationFromEuler(0, 0, 0);
        }

        CherkNeedObject() {
          return this.GetNeedObjectCount() - this.pickupComponent.getFlyingItemCount(this.needObjectType) > 0;
        }

        GetNeedObjectCount() {
          return this._needObjectCount - this.pickupComponent.getItemCount(this.needObjectType);
        }

        GetTotalObjectNeed() {
          return this._needObjectCount;
        }

        pickUpItem(item, cb) {
          this.pickupComponent.pickupItem(item, cb);
        }

        onUpdateItemCount(type, count) {
          if (type !== this.needObjectType) {
            return;
          }

          this.updateNeedCountDisplay();
        }
        /**
         * 更新需求数量显示
         */


        updateNeedCountDisplay() {
          if (this.needObjectCountLabel) {
            var remainingNeed = this.GetNeedObjectCount();
            this.needObjectCountLabel.string = remainingNeed.toString();
          }
        }

        setReadyToBuy(ready) {
          this._isReadyToBuy = ready;
        }

        MoveToWorldPos(pos, cb) {
          Tween.stopAllByTarget(this.node); // 设置移动状态

          this._isMoving = true;
          this._isReadyToBuy = false; // 计算移动距离来确定移动时间，实现匀速移动

          var currentPos = this.node.getWorldPosition();
          var distance = Vec3.distance(currentPos, pos);
          var speed = 8; // 移动速度：单位/秒

          var moveDuration = distance / speed; // 确保有最小移动时间

          tween(this.node).to(moveDuration, {
            worldPosition: pos
          }, {
            onUpdate: (target, ratio) => {
              if (ratio === undefined || ratio > 0.9) {
                return;
              } // 朝向目标


              var targetPos = pos;
              var direction = new Vec3();
              Vec3.subtract(direction, targetPos, currentPos); // const direction = new Vec3(1, 0, -1);

              direction.normalize();
              this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
                error: Error()
              }), ComponentEvent) : ComponentEvent).SET_FACE_DIRECTION_FROM_3D, direction);
            }
          }).call(() => {
            // 移动完成
            this._isMoving = false;
            this._isReadyToBuy = true; // 站定后准备购买
            // 移动完成后播放空闲动画

            if (this.animationComponent) {
              this.animationComponent.playIdle();
            }

            cb && cb();
          }).start(); // 移动时播放移动动画

          if (this.animationComponent) {
            this.animationComponent.playMove(2);
          }
        }
        /**显示不高兴节点 */


        showUnhappy() {
          if (this.unhappyNode.active) {
            return;
          }

          this.angryNode.active = false;
          this.happyNode.active = false;
          this.unhappyNode.active = true;
          this.unhappyNode.setScale(0, 0, 0);
          this.hungryNode.active = false;
          tween(this.unhappyNode).to(0.5, {
            scale: v3(0.004, 0.004, 0.004)
          }, {
            easing: easing.backOut
          }).start();
        }
        /**显示饥饿节点 */


        showHungry() {
          if (this.hungryNode.active) {
            return;
          }

          this.hungryNode.active = true;
          this.hungryNode.setScale(0, 0, 0);
          this.angryNode.active = false;
          this.happyNode.active = false;
          this.unhappyNode.active = false;
          tween(this.hungryNode).to(0.5, {
            scale: v3(0.004, 0.004, 0.004)
          }, {
            easing: easing.backOut
          }).start();
        }

        showNeed() {
          this.angryNode.active = true;
          this.happyNode.active = false;
          this.unhappyNode.active = false;
          this.hungryNode.active = false;
          this.happyNode.setScale(0, 0, 0);
          this.unhappyNode.setScale(0, 0, 0);
          this.hungryNode.setScale(0, 0, 0);
          tween(this.happyNode).to(0.5, {
            scale: v3(0.004, 0.004, 0.004)
          }, {
            easing: easing.backOut
          }).start();
        }

        showHappy() {
          this.angryNode.active = false;
          this.happyNode.active = true;
          this.unhappyNode.active = false;
          this.hungryNode.active = false;
          this.happyNode.setScale(0, 0, 0);
          tween(this.happyNode).to(0.5, {
            scale: v3(0.006, 0.006, 0.006)
          }, {
            easing: easing.backOut
          }).start();
        }

        hideNeed() {
          this.angryNode.active = false;
          this.happyNode.active = false;
          this.unhappyNode.active = false;
          this.hungryNode.active = false;
        }
        /**
         * 重置对象（对象池回收时调用）
         */


        reset() {
          this._needObjectCount = 5; // 默认需要5个

          this.pickupComponent.reset();
          this._isMoving = false;
          this._isReadyToBuy = false;
          Tween.stopAllByTarget(this.node); // 重置时隐藏所有需求节点，确保初始状态正确

          this.hideNeed();
        }
        /**
         * 初始化顾客（从对象池获取时调用）
         * @param needObjectCount 需要的商品数量
         */


        init(needObjectCount, shopItemType) {
          if (needObjectCount === void 0) {
            needObjectCount = 1;
          }

          if (shopItemType === void 0) {
            shopItemType = (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemWood;
          }

          this._needObjectCount = needObjectCount;
          this._isMoving = false;
          this._isReadyToBuy = false;
          this.needObjectType = shopItemType;
          this.customerNeedIcons.forEach(item => {
            if (item.needObjectType === shopItemType) {
              item.iconNode.active = true;
            } else {
              item.iconNode.active = false;
            }
          }); // 更新需求数量显示

          if (this.needObjectCountLabel) {
            this.needObjectCountLabel.string = this._needObjectCount.toString();
          } // 初始化时隐藏需求节点，由队列管理统一控制显示


          this.hideNeed();

          if (this.animationComponent) {
            this.animationComponent.playMove(); // 使用正确的方法播放移动动画
          }
        }
        /**
         * 设置顾客移动状态
         * @param moving 是否正在移动
         */


        setMoving(moving) {
          this._isMoving = moving;

          if (!moving && this.animationComponent) {
            this.animationComponent.playIdle();
          } else if (moving && this.animationComponent) {
            this.animationComponent.playMove();
          }
        }
        /**
         * 检查顾客是否处于空闲状态（未移动且未购买）
         */


        isIdle() {
          return !this._isMoving && !this._isReadyToBuy;
        }

      }, (_descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "customerNeedIcons", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "pickupComponent", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "needObjectType", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemWood;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "animationComponent", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "uiNode", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "angryNode", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "happyNode", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class5.prototype, "unhappyNode", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class5.prototype, "hungryNode", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class5.prototype, "needObjectCountLabel", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class5)) || _class4));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=1e91b66a9aaabe12e693d5c3f01ef71db4e4f0a2.js.map