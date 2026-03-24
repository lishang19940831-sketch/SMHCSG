System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Collider, Component, ItemLayout, PickupComponent, DropItemCom, CommonEvent, ObjectType, Config, ComponentEvent, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, FlatbreadContainer;

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

      _cclegacy._RF.push({}, "e49c7ZK8WRJ26WDEZFM/I1W", "FlatbreadContainer", undefined);

      __checkObsolete__(['_decorator', 'Collider', 'Component', 'ITriggerEvent', 'Node', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("FlatbreadContainer", FlatbreadContainer = (_dec = ccclass('FlatbreadContainer'), _dec2 = property({
        type: _crd && ItemLayout === void 0 ? (_reportPossibleCrUseOfItemLayout({
          error: Error()
        }), ItemLayout) : ItemLayout,
        displayName: '大饼布局'
      }), _dec3 = property({
        displayName: '无限存储模式',
        tooltip: '开启后大饼存储无上限，ItemLayout仅作显示用'
      }), _dec4 = property({
        type: Collider,
        displayName: '大饼容器触发器'
      }), _dec(_class = (_class2 = class FlatbreadContainer extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "flatbreadLayout", _descriptor, this);

          _initializerDefineProperty(this, "unlimitedMode", _descriptor2, this);

          _initializerDefineProperty(this, "flatbreadContainerCollider", _descriptor3, this);

          this.pickupComponents = new Map();
          this.interactionTimers = new Map();
          this.checkTimer = 0.1;
          this._virtualFlatbreadCount = 0;
        }

        get FlatbreadLayout() {
          return this.flatbreadLayout;
        }

        onLoad() {
          this.flatbreadContainerCollider.on('onTriggerEnter', this.onTriggerEnter, this);
          this.flatbreadContainerCollider.on('onTriggerExit', this.onTriggerExit, this);

          if (this.flatbreadLayout && this.flatbreadLayout.node) {
            this.flatbreadLayout.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
              error: Error()
            }), ComponentEvent) : ComponentEvent).ITEM_COUNT_CHANGED, this.onFlatbreadCountChanged, this);
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
            this.interactionTimers.set(node.uuid, 0);
          }
        }

        onTriggerExit(event) {
          var node = event.otherCollider.node;

          if (node && this.pickupComponents.has(node.uuid)) {
            this.pickupComponents.delete(node.uuid);
            this.interactionTimers.delete(node.uuid);
          }
        }

        onPickup(pickupComponent, duration) {
          if (duration === void 0) {
            duration = 0;
          }

          var extraCount = Math.floor(duration / 0.1);
          var pickupCount = 1 + extraCount;
          pickupCount = Math.min(pickupCount, 20);

          for (var i = 0; i < pickupCount; i++) {
            if (!this.doPickupOneFlatbread(pickupComponent)) {
              break;
            }
          }
        }

        doPickupOneFlatbread(pickupComponent) {
          if (this.unlimitedMode) {
            if (this._virtualFlatbreadCount <= 0) {
              return false;
            }

            if (!pickupComponent.isItemPickable((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemFlatbread)) {
              return false;
            }

            var visualCount = this.flatbreadLayout.getItemCount();
            var flatbreadItem = null;
            var shouldRemoveVisualItem = this._virtualFlatbreadCount <= visualCount;

            if (shouldRemoveVisualItem) {
              var items = this.flatbreadLayout.getOuterItems(1);

              if (items.length > 0) {
                flatbreadItem = items[0];
                this.flatbreadLayout.removeItemByNode(flatbreadItem);
              }
            } else {
              var outerItems = this.flatbreadLayout.getOuterItems(1);

              if (outerItems.length > 0) {
                var visualItem = outerItems[0];
                flatbreadItem = manager.pool.getNode((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                  error: Error()
                }), ObjectType) : ObjectType).DropItemFlatbread);

                if (flatbreadItem) {
                  flatbreadItem.setWorldPosition(visualItem.getWorldPosition());
                  flatbreadItem.setWorldRotation(visualItem.getWorldRotation());
                }
              }
            }

            this._virtualFlatbreadCount--;
            this.onFlatbreadCountChanged(this._virtualFlatbreadCount);

            if (flatbreadItem) {
              var dropItemCom = flatbreadItem.getComponent(_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
                error: Error()
              }), DropItemCom) : DropItemCom);

              if (dropItemCom) {
                pickupComponent.pickupItem(dropItemCom);
              } else {
                manager.pool.putNode(flatbreadItem);
              }
            } else {
              var tempFlatbread = manager.pool.getNode((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                error: Error()
              }), ObjectType) : ObjectType).DropItemFlatbread);

              if (tempFlatbread) {
                var _dropItemCom = tempFlatbread.getComponent(_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
                  error: Error()
                }), DropItemCom) : DropItemCom);

                if (_dropItemCom) {
                  pickupComponent.pickupItem(_dropItemCom);
                }
              }
            }

            return true;
          } else {
            var _items = this.flatbreadLayout.getOuterItems(1);

            if (_items.length === 0) {
              return false;
            }

            if (!pickupComponent.isItemPickable((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemFlatbread)) {
              return false;
            }

            var _flatbreadItem = _items[0];

            var _dropItemCom2 = _flatbreadItem.getComponent(_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
              error: Error()
            }), DropItemCom) : DropItemCom);

            if (_dropItemCom2) {
              this.flatbreadLayout.removeItemByNode(_flatbreadItem);
              pickupComponent.pickupItem(_dropItemCom2);
              return true;
            }

            return false;
          }
        }
        /**
         * 接收大饼并让其飞到容器中
         * @param fromPosition 大饼的起始位置
         * @returns 是否成功接收
         */


        receive(fromPosition, onArrived) {
          var flatbread = manager.pool.getNode((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemFlatbread);

          if (!flatbread) {
            return false;
          }

          var layoutPos = this.flatbreadLayout.getCurrEmptyPosition();
          var targetPos;
          var isContainerFull = false;

          if (!layoutPos) {
            var lastValidPos = this.flatbreadLayout.getLastValidPosition();
            targetPos = this.flatbreadLayout.getItemPosition(lastValidPos);
            isContainerFull = true;
          } else {
            targetPos = this.flatbreadLayout.getItemPosition(layoutPos);
            this.flatbreadLayout.reserveItem(layoutPos);
          }

          if (this.unlimitedMode) {
            this._virtualFlatbreadCount++;
            this.onFlatbreadCountChanged(this._virtualFlatbreadCount);
          }

          var startPos = fromPosition.clone();
          startPos.y += 1;
          flatbread.setWorldPosition(startPos);
          manager.effect.addToEffectLayer(flatbread);
          manager.effect.flyNodeInParabola({
            node: flatbread,
            target: targetPos,
            callback: () => {
              if (!flatbread.isValid) {
                onArrived == null || onArrived();
                return;
              }

              app.audio.playEffect('resources/audio/SetRes', 0.6);

              if (this.unlimitedMode && !isContainerFull && layoutPos) {
                var currentVisualCount = this.flatbreadLayout.getItemCount();

                if (this._virtualFlatbreadCount <= currentVisualCount) {
                  manager.pool.putNode(flatbread);
                  this.flatbreadLayout.removeItem(layoutPos);
                  onArrived == null || onArrived();
                  return;
                }
              }

              if (isContainerFull) {
                manager.pool.putNode(flatbread);
              } else {
                this.flatbreadLayout.addItemToReserve(flatbread, layoutPos);
                flatbread.setRotationFromEuler(0, 0, 0);
              }

              onArrived == null || onArrived();
            }
          });
          return true;
        }

        onFlatbreadCountChanged(count) {
          if (this.unlimitedMode) {
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).FlatbreadContainerCountChanged, this._virtualFlatbreadCount);
          } else {
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).FlatbreadContainerCountChanged, count);
          }
        }

        getCount() {
          if (this.unlimitedMode) {
            return this._virtualFlatbreadCount;
          }

          return this.flatbreadLayout.getItemCount();
        }
        /**
         * 瞬间放入一个大饼（火车卸货时调用，不播放飞行动画）
         */


        receiveInstant() {
          if (this.unlimitedMode) {
            this._virtualFlatbreadCount++;
            this.onFlatbreadCountChanged(this._virtualFlatbreadCount);
          } else {
            var layoutPos = this.flatbreadLayout.getCurrEmptyPosition();
            if (!layoutPos) return; // 已满则丢弃

            var flatbread = manager.pool.getNode((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemFlatbread);
            if (!flatbread) return;
            this.flatbreadLayout.addItem(flatbread, layoutPos);
            flatbread.setRotationFromEuler(0, 0, 0);
          }
        }

        reset() {
          this.flatbreadLayout.reset();
          this.pickupComponents.clear();
          this._virtualFlatbreadCount = 0;

          if (this.unlimitedMode) {
            this.onFlatbreadCountChanged(0);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "flatbreadLayout", [_dec2], {
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
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "flatbreadContainerCollider", [_dec4], {
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
//# sourceMappingURL=a4e12fa206c46189f7a9ad877637e36cae2235b8.js.map