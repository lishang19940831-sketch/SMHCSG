System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Collider, Component, ItemLayout, PickupComponent, DropItemCom, CommonEvent, ObjectType, Config, ComponentEvent, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, CoinContainer;

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

      _cclegacy._RF.push({}, "01705i00IBDAZOCbS+1qO5V", "CoinContainer", undefined);

      __checkObsolete__(['_decorator', 'Collider', 'Component', 'ITriggerEvent', 'Node', 'Tween', 'v3', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("CoinContainer", CoinContainer = (_dec = ccclass('CoinContainer'), _dec2 = property({
        type: _crd && ItemLayout === void 0 ? (_reportPossibleCrUseOfItemLayout({
          error: Error()
        }), ItemLayout) : ItemLayout,
        displayName: '金币布局'
      }), _dec3 = property({
        displayName: '无限存储模式',
        tooltip: '开启后金币存储无上限，ItemLayout仅作显示用'
      }), _dec4 = property({
        type: Collider,
        displayName: '金币容器触发器'
      }), _dec(_class = (_class2 = class CoinContainer extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "coinLayout", _descriptor, this);

          _initializerDefineProperty(this, "unlimitedMode", _descriptor2, this);

          _initializerDefineProperty(this, "coinContainerCollider", _descriptor3, this);

          this.pickupComponents = new Map();
          // 存储在触发器内的PickupComponent
          this.interactionTimers = new Map();
          // 存储在触发器内的PickupComponent的交互时间
          this.checkTimer = 0.1;
          // 用于在update中控制检查频率
          this._virtualCoinCount = 0;
        }

        // 虚拟金币数量（仅在无限模式下使用）
        get CoinLayout() {
          return this.coinLayout;
        }

        onLoad() {
          this.coinContainerCollider.on('onTriggerEnter', this.onTriggerEnter, this);
          this.coinContainerCollider.on('onTriggerExit', this.onTriggerExit, this); // 监听金币数量变化事件

          if (this.coinLayout && this.coinLayout.node) {
            this.coinLayout.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
              error: Error()
            }), ComponentEvent) : ComponentEvent).ITEM_COUNT_CHANGED, this.onCoinCountChanged, this);
          }
        }

        onDestroy() {}

        update(dt) {
          // 累加时间
          this.checkTimer += dt; // 当累加时间达到检查间隔时执行检查，确保低帧率时不会漏掉检查次数

          while (this.checkTimer >= (_crd && Config === void 0 ? (_reportPossibleCrUseOfConfig({
            error: Error()
          }), Config) : Config).UNLOCK_CHECK_INTERVAL) {
            this._checkPickupComponents();

            this.checkTimer -= (_crd && Config === void 0 ? (_reportPossibleCrUseOfConfig({
              error: Error()
            }), Config) : Config).UNLOCK_CHECK_INTERVAL; // 减去一个间隔时间而不是重置为0
          }
        }

        _checkPickupComponents() {
          // 遍历所有触发器内的PickupComponent
          this.pickupComponents.forEach((pickupComponent, uuid) => {
            if (pickupComponent && pickupComponent.isValid) {
              var duration = this.interactionTimers.get(uuid) || 0;
              duration += (_crd && Config === void 0 ? (_reportPossibleCrUseOfConfig({
                error: Error()
              }), Config) : Config).UNLOCK_CHECK_INTERVAL;
              this.interactionTimers.set(uuid, duration);
              this.onPickup(pickupComponent, duration);
            } else {
              // 如果组件不再有效，从Map中移除
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
            // 添加到Map中跟踪
            this.pickupComponents.set(node.uuid, pickupComponent);
            this.interactionTimers.set(node.uuid, 0); // console.log('添加到Map中跟踪', node.uuid, pickupComponent);
            //踩上木板，heroY轴抬高0.5
            // manager.game.hero.node.getChildByName("ModelNode").setPosition(0,0.8,0);
          }
        }

        onTriggerExit(event) {
          var node = event.otherCollider.node;

          if (node && this.pickupComponents.has(node.uuid)) {
            // 从Map中移除
            this.pickupComponents.delete(node.uuid);
            this.interactionTimers.delete(node.uuid); //离开木板，heroY轴恢复为0
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
            if (this.doPickupOneCoin(pickupComponent)) {
              successCount++;
            } else {
              break;
            }
          }

          if (successCount > 0) {
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).PickupCoin);
          }
        }

        doPickupOneCoin(pickupComponent) {
          if (this.unlimitedMode) {
            // 无限模式逻辑
            if (this._virtualCoinCount <= 0) {
              return false; // 没有金币
            } // 检查接收方是否能接收金币


            if (!pickupComponent.isItemPickable((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemCoin)) {
              return false;
            } // 获取当前可视的最大容量（Layout中实际能放多少）


            var visualCount = this.coinLayout.getItemCount();
            var coinItem = null;
            var shouldRemoveVisualItem = this._virtualCoinCount <= visualCount;

            if (shouldRemoveVisualItem) {
              // 正常移除可视金币
              var coinItems = this.coinLayout.getOuterItems(1);

              if (coinItems.length > 0) {
                coinItem = coinItems[0];
                this.coinLayout.removeItemByNode(coinItem);
              }
            } else {
              // 虚拟数量多于可视数量，不移除可视金币
              // 尝试从 Layout 最外层拿一个金币的位置作为参考，生成临时金币
              var outerItems = this.coinLayout.getOuterItems(1);

              if (outerItems.length > 0) {
                var visualItem = outerItems[0]; // 生成临时金币

                coinItem = manager.pool.getNode((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                  error: Error()
                }), ObjectType) : ObjectType).DropItemCoin);

                if (coinItem) {
                  coinItem.setWorldPosition(visualItem.getWorldPosition());
                  coinItem.setWorldRotation(visualItem.getWorldRotation());
                }
              }
            } // 扣除虚拟数量


            this._virtualCoinCount--;
            this.onCoinCountChanged(this._virtualCoinCount); // 手动触发数量变化

            if (coinItem) {
              var dropItemCom = coinItem.getComponent(_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
                error: Error()
              }), DropItemCom) : DropItemCom);

              if (dropItemCom) {
                pickupComponent.pickupItem(dropItemCom);
              } else {
                manager.pool.putNode(coinItem);
              }
            } else {
              // 兜底
              var tempCoin = manager.pool.getNode((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                error: Error()
              }), ObjectType) : ObjectType).DropItemCoin);

              if (tempCoin) {
                var _dropItemCom = tempCoin.getComponent(_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
                  error: Error()
                }), DropItemCom) : DropItemCom);

                if (_dropItemCom) {
                  pickupComponent.pickupItem(_dropItemCom);
                }
              }
            }

            return true;
          } else {
            // 原有逻辑
            var _coinItems = this.coinLayout.getOuterItems(1);

            if (_coinItems.length === 0) {
              return false; // 没有金币，无法拾取
            }

            if (!pickupComponent.isItemPickable((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemCoin)) {
              return false;
            }

            var _coinItem = _coinItems[0];

            var _dropItemCom2 = _coinItem.getComponent(_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
              error: Error()
            }), DropItemCom) : DropItemCom);

            if (_dropItemCom2) {
              this.coinLayout.removeItemByNode(_coinItem);
              pickupComponent.pickupItem(_dropItemCom2);
              return true;
            }

            return false;
          }
        }
        /**
         * 接收金币并让其飞到容器中
         * @param fromPosition 金币的起始位置
         * @returns 是否成功接收金币
         */


        receiveCoin(fromPosition) {
          // 获取金币对象
          var coin = manager.pool.getNode((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemCoin);

          if (!coin) {
            //console.warn('无法从对象池获取金币对象');
            return false;
          } // 检查金币容器是否有空位置


          var layoutPos = this.coinLayout.getCurrEmptyPosition();
          var targetPos;
          var isContainerFull = false;

          if (!layoutPos) {
            // 容器满了，获取最后一个有效位置用于飞行动画
            var lastValidPos = this.coinLayout.getLastValidPosition();
            targetPos = this.coinLayout.getItemPosition(lastValidPos);
            isContainerFull = true;

            if (!this.unlimitedMode) {//console.log('金币容器已满，金币将飞到最后位置后回收');
            }
          } else {
            // 正常情况
            targetPos = this.coinLayout.getItemPosition(layoutPos);
            this.coinLayout.reserveItem(layoutPos);
          }

          if (this.unlimitedMode) {
            // 无限模式下，增加虚拟金币计数
            this._virtualCoinCount++;
            this.onCoinCountChanged(this._virtualCoinCount); // 手动触发数量变化
          } // 设置金币初始位置


          var startPos = fromPosition.clone();
          startPos.y += 1; // 稍微提高一点

          coin.setWorldPosition(startPos); // 将金币添加到效果层

          manager.effect.addToEffectLayer(coin); // 使用抛物线飞行到目标位置

          manager.effect.flyNodeInParabola({
            node: coin,
            target: targetPos,
            callback: () => {
              if (!coin.isValid) return;

              if (this.unlimitedMode && !isContainerFull && layoutPos) {
                // 在无限模式下，如果逻辑数量已经小于等于当前可视数量
                // 说明这个正在飞行的金币对应的逻辑份额已经被消耗掉了
                var currentVisualCount = this.coinLayout.getItemCount();

                if (this._virtualCoinCount <= currentVisualCount) {
                  manager.pool.putNode(coin); // 必须释放之前预占的位置

                  this.coinLayout.removeItem(layoutPos);
                  return;
                }
              }

              if (isContainerFull) {
                // 容器满了，飞行动画完成后回收到对象池
                manager.pool.putNode(coin);

                if (!this.unlimitedMode) {//console.log('金币容器已满，金币回收到对象池');
                }
              } else {
                // 将金币添加到容器布局中
                this.coinLayout.addItemToReserve(coin, layoutPos);
                coin.setRotationFromEuler(0, 0, 0);
              }
            }
          });
          return true;
        }
        /**
         * 处理金币数量变化事件
         * @param count 当前金币数量
         */


        onCoinCountChanged(count) {
          if (this.unlimitedMode) {
            // 无限模式下，使用虚拟数量，忽略ItemLayout传来的count（它只代表视觉上的数量）
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).CoinContainerCountChanged, this._virtualCoinCount);
          } else {
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).CoinContainerCountChanged, count);
          }
        }

        getCount() {
          if (this.unlimitedMode) {
            return this._virtualCoinCount;
          }

          return this.coinLayout.getItemCount();
        }

        reset() {
          this.coinLayout.reset();
          this.pickupComponents.clear();
          this._virtualCoinCount = 0;

          if (this.unlimitedMode) {
            this.onCoinCountChanged(0);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "coinLayout", [_dec2], {
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
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "coinContainerCollider", [_dec4], {
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
//# sourceMappingURL=bcda4de6e08cf34b0922bb63a3ae0651f7fdc2fd.js.map