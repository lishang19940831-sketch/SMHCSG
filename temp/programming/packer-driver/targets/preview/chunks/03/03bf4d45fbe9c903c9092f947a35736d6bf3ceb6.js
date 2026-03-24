System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Collider, Component, ItemLayout, PickupComponent, DropItemCom, CommonEvent, ObjectType, Config, ComponentEvent, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, WheatContainer;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfItemLayout(extras) {
    _reporterNs.report("ItemLayout", "../Tools/ItemLayout", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPickupComponent(extras) {
    _reporterNs.report("PickupComponent", "../Components/PickupComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDropItemCom(extras) {
    _reporterNs.report("DropItemCom", "../Drop/DropItemCom", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConfig(extras) {
    _reporterNs.report("Config", "../../Main/Common/Config", _context.meta, extras);
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
      Collider = _cc.Collider;
      Component = _cc.Component;
    }, function (_unresolved_2) {
      ItemLayout = _unresolved_2.ItemLayout;
    }, function (_unresolved_3) {
      PickupComponent = _unresolved_3.PickupComponent;
    }, function (_unresolved_4) {
      DropItemCom = _unresolved_4.DropItemCom;
    }, function (_unresolved_5) {
      CommonEvent = _unresolved_5.CommonEvent;
      ObjectType = _unresolved_5.ObjectType;
    }, function (_unresolved_6) {
      Config = _unresolved_6.Config;
    }, function (_unresolved_7) {
      ComponentEvent = _unresolved_7.ComponentEvent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3828d7ytihAO4qgxVThfZPA", "WheatContainer", undefined);

      __checkObsolete__(['_decorator', 'Collider', 'Component', 'ITriggerEvent', 'Node', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("WheatContainer", WheatContainer = (_dec = ccclass('WheatContainer'), _dec2 = property({
        type: _crd && ItemLayout === void 0 ? (_reportPossibleCrUseOfItemLayout({
          error: Error()
        }), ItemLayout) : ItemLayout,
        displayName: '麦子布局'
      }), _dec3 = property({
        displayName: '无限存储模式',
        tooltip: '开启后麦子存储无上限，ItemLayout仅作显示用'
      }), _dec4 = property({
        type: Collider,
        displayName: '麦子容器触发器'
      }), _dec(_class = (_class2 = class WheatContainer extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "wheatLayout", _descriptor, this);

          _initializerDefineProperty(this, "unlimitedMode", _descriptor2, this);

          _initializerDefineProperty(this, "wheatContainerCollider", _descriptor3, this);

          this.pickupComponents = new Map();
          this.interactionTimers = new Map();
          this.checkTimer = 0.1;
          this._virtualWheatCount = 0;
          this._busyItems = new Set();
        }

        get WheatLayout() {
          return this.wheatLayout;
        }

        onLoad() {
          this.wheatContainerCollider.on('onTriggerEnter', this.onTriggerEnter, this);
          this.wheatContainerCollider.on('onTriggerExit', this.onTriggerExit, this);

          if (this.wheatLayout && this.wheatLayout.node) {
            this.wheatLayout.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
              error: Error()
            }), ComponentEvent) : ComponentEvent).ITEM_COUNT_CHANGED, this.onWheatCountChanged, this);
          }
        }

        onDestroy() {}

        update(dt) {
          this.checkTimer += dt;

          while (this.checkTimer >= (_crd && Config === void 0 ? (_reportPossibleCrUseOfConfig({
            error: Error()
          }), Config) : Config).UNLOCK_CHECK_INTERVAL) {
            this._checkPickupComponents();

            this.checkTimer -= (_crd && Config === void 0 ? (_reportPossibleCrUseOfConfig({
              error: Error()
            }), Config) : Config).UNLOCK_CHECK_INTERVAL;
          }
        }

        _checkPickupComponents() {
          this.pickupComponents.forEach((pickupComponent, uuid) => {
            if (pickupComponent && pickupComponent.isValid) {
              var duration = this.interactionTimers.get(uuid) || 0;
              duration += (_crd && Config === void 0 ? (_reportPossibleCrUseOfConfig({
                error: Error()
              }), Config) : Config).UNLOCK_CHECK_INTERVAL;
              this.interactionTimers.set(uuid, duration);
              this.onPickup(pickupComponent, duration);
            } else {
              this.pickupComponents.delete(uuid);
              this.interactionTimers.delete(uuid);
            }
          });
        }

        onTriggerEnter(event) {
          var node = event.otherCollider.node;
          var pickupComponent = node.getComponent(_crd && PickupComponent === void 0 ? (_reportPossibleCrUseOfPickupComponent({
            error: Error()
          }), PickupComponent) : PickupComponent);

          if (pickupComponent) {
            this.pickupComponents.set(node.uuid, pickupComponent);
            this.interactionTimers.set(node.uuid, 0); //踩上麦子，heroY轴抬高0.5
            // manager.game.hero.node.getChildByName("ModelNode").setPosition(0,0.8,0);
          }
        }

        onTriggerExit(event) {
          var node = event.otherCollider.node;

          if (node && this.pickupComponents.has(node.uuid)) {
            this.pickupComponents.delete(node.uuid);
            this.interactionTimers.delete(node.uuid); //离开麦子，heroY轴恢复为0
            // manager.game.hero.node.getChildByName("ModelNode").setPosition(0,0,0);
          }
        }

        onPickup(pickupComponent, duration) {
          if (duration === void 0) {
            duration = 0;
          }

          var extraCount = Math.floor(duration / 0.1);
          var pickupCount = 1 + extraCount;
          pickupCount = Math.min(pickupCount, 20);
          var successCount = 0;

          for (var i = 0; i < pickupCount; i++) {
            if (this.doPickupOneWheat(pickupComponent)) {
              successCount++;
            } else {
              break;
            }
          }
        }

        doPickupOneWheat(pickupComponent) {
          if (this.unlimitedMode) {
            if (this._virtualWheatCount <= 0) {
              return false;
            }

            if (!pickupComponent.isItemPickable((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemCornKernel)) {
              return false;
            }

            var visualCount = this.wheatLayout.getItemCount();
            var wheatItem = null;
            var shouldRemoveVisualItem = this._virtualWheatCount <= visualCount;

            if (shouldRemoveVisualItem) {
              var items = this.wheatLayout.getOuterItems(1);

              if (items.length > 0) {
                wheatItem = items[0];
                this.wheatLayout.removeItemByNode(wheatItem);
              }
            } else {
              var outerItems = this.wheatLayout.getOuterItems(1);

              if (outerItems.length > 0) {
                var visualItem = outerItems[0];
                wheatItem = manager.pool.getNode((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                  error: Error()
                }), ObjectType) : ObjectType).DropItemCornKernel);

                if (wheatItem) {
                  wheatItem.setWorldPosition(visualItem.getWorldPosition());
                  wheatItem.setWorldRotation(visualItem.getWorldRotation());
                }
              }
            }

            this._virtualWheatCount--;
            this.onWheatCountChanged(this._virtualWheatCount);

            if (wheatItem) {
              var dropItemCom = wheatItem.getComponent(_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
                error: Error()
              }), DropItemCom) : DropItemCom);

              if (dropItemCom) {
                pickupComponent.pickupItem(dropItemCom);
              } else {
                manager.pool.putNode(wheatItem);
              }
            } else {
              var tempWheat = manager.pool.getNode((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                error: Error()
              }), ObjectType) : ObjectType).DropItemCornKernel);

              if (tempWheat) {
                var _dropItemCom = tempWheat.getComponent(_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
                  error: Error()
                }), DropItemCom) : DropItemCom);

                if (_dropItemCom) {
                  pickupComponent.pickupItem(_dropItemCom);
                }
              }
            }

            return true;
          } else {
            var item = this._chooseOuterItem();

            if (!item) {
              return false;
            }

            if (!pickupComponent.isItemPickable((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemCornKernel)) {
              return false;
            }

            var _dropItemCom2 = item.getComponent(_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
              error: Error()
            }), DropItemCom) : DropItemCom);

            if (_dropItemCom2) {
              this._busyItems.add(item);

              this.wheatLayout.removeItemByNode(item);

              this._busyItems.delete(item);

              pickupComponent.pickupItem(_dropItemCom2);
              return true;
            }

            return false;
          }
        }

        takeForConveyor() {
          if (this.unlimitedMode) {
            if (this._virtualWheatCount <= 0) {
              return null;
            }

            var visualCount = this.wheatLayout.getItemCount();
            var wheatItem = null;
            var shouldRemoveVisual = this._virtualWheatCount <= visualCount;

            if (shouldRemoveVisual) {
              var item = this._chooseOuterItem();

              if (item) {
                this._busyItems.add(item);

                this.wheatLayout.removeItemByNode(item);

                this._busyItems.delete(item);

                wheatItem = item;
              }
            }

            if (!wheatItem) {
              var outer = this.wheatLayout.getOuterItems(1);
              var spawnPos = outer.length > 0 ? outer[0].getWorldPosition() : this.node.getWorldPosition();
              wheatItem = manager.pool.getNode((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                error: Error()
              }), ObjectType) : ObjectType).DropItemCornKernel);

              if (!wheatItem) {
                return null;
              }

              wheatItem.setWorldPosition(spawnPos);
              wheatItem.setWorldRotation(outer.length > 0 ? outer[0].getWorldRotation() : this.node.getWorldRotation());
            }

            this._virtualWheatCount--;
            this.onWheatCountChanged(this._virtualWheatCount);
            return wheatItem;
          } else {
            var _item = this._chooseOuterItem();

            if (!_item) return null;

            var dropItemCom = _item.getComponent(_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
              error: Error()
            }), DropItemCom) : DropItemCom);

            if (!dropItemCom) return null;

            this._busyItems.add(_item);

            this.wheatLayout.removeItemByNode(_item);

            this._busyItems.delete(_item);

            return _item;
          }
        }

        _chooseOuterItem() {
          var items = this.wheatLayout.getOuterItems(1);

          for (var it of items) {
            if (it && it.isValid && !this._busyItems.has(it)) {
              return it;
            }
          }

          return null;
        }
        /**
         * 接收麦子并让其飞到容器中
         * @param fromPosition 麦子的起始位置
         * @returns 是否成功接收
         */


        receive(fromPosition, onArrived) {
          var wheat = manager.pool.getNode((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemCornKernel);

          if (!wheat) {
            return false;
          }

          var layoutPos = this.wheatLayout.getCurrEmptyPosition();
          var targetPos;
          var isContainerFull = false;

          if (!layoutPos) {
            var lastValidPos = this.wheatLayout.getLastValidPosition();
            targetPos = this.wheatLayout.getItemPosition(lastValidPos);
            isContainerFull = true;
          } else {
            targetPos = this.wheatLayout.getItemPosition(layoutPos);
            this.wheatLayout.reserveItem(layoutPos);
          }

          if (this.unlimitedMode) {
            this._virtualWheatCount++;
            this.onWheatCountChanged(this._virtualWheatCount);
          }

          var startPos = fromPosition.clone();
          startPos.y += 1;
          wheat.setWorldPosition(startPos);
          manager.effect.addToEffectLayer(wheat);
          manager.effect.flyNodeInParabola({
            node: wheat,
            target: targetPos,
            callback: () => {
              if (!wheat.isValid) {
                onArrived == null || onArrived();
                return;
              }

              if (this.unlimitedMode && !isContainerFull && layoutPos) {
                var currentVisualCount = this.wheatLayout.getItemCount();

                if (this._virtualWheatCount <= currentVisualCount) {
                  manager.pool.putNode(wheat);
                  this.wheatLayout.removeItem(layoutPos);
                  onArrived == null || onArrived();
                  return;
                }
              }

              if (isContainerFull) {
                manager.pool.putNode(wheat);
              } else {
                this.wheatLayout.removeItem(layoutPos);
                this.wheatLayout.addItem(wheat, layoutPos);
                wheat.setRotationFromEuler(0, 0, 0);
              }

              onArrived == null || onArrived();
            }
          });
          return true;
        }

        onWheatCountChanged(count) {
          if (this.unlimitedMode) {
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).WheatContainerCountChanged, this._virtualWheatCount);
          } else {
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).WheatContainerCountChanged, count);
          }
        }

        getCount() {
          if (this.unlimitedMode) {
            return this._virtualWheatCount;
          }

          return this.wheatLayout.getItemCount();
        }
        /**
         * 瞬间放入一个麦子（火车卸货时调用，不播放飞行动画）
         */


        receiveInstant() {
          if (this.unlimitedMode) {
            this._virtualWheatCount++;
            this.onWheatCountChanged(this._virtualWheatCount);
          } else {
            var layoutPos = this.wheatLayout.getCurrEmptyPosition();
            console.log('receiveInstant layoutPos', layoutPos);
            if (!layoutPos) return; // 已满则丢弃

            var wheat = manager.pool.getNode((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemCornKernel);
            console.log('receiveInstant wheat', wheat);
            if (!wheat) return;
            this.wheatLayout.addItem(wheat, layoutPos);
            wheat.setRotationFromEuler(0, 0, 0);
          }
        }

        reset() {
          this.wheatLayout.reset();
          this.pickupComponents.clear();
          this._virtualWheatCount = 0;

          this._busyItems.clear();

          if (this.unlimitedMode) {
            this.onWheatCountChanged(0);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "wheatLayout", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "unlimitedMode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "wheatContainerCollider", [_dec4], {
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
//# sourceMappingURL=03bf4d45fbe9c903c9092f947a35736d6bf3ceb6.js.map