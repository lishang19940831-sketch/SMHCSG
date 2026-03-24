System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Collider, Component, easing, Node, tween, Tween, v3, Vec3, Enum, RigidBody, ItemLayout, PickupComponent, Config, CommonEvent, ObjectType, Customer, CoinContainer, DropItemCom, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _crd, ccclass, property, ShopCommon;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfItemLayout(extras) {
    _reporterNs.report("ItemLayout", "../Tools/ItemLayout", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPickupComponent(extras) {
    _reporterNs.report("PickupComponent", "../Components/PickupComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConfig(extras) {
    _reporterNs.report("Config", "../Common/Config", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCustomer(extras) {
    _reporterNs.report("Customer", "./Customer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCoinContainer(extras) {
    _reporterNs.report("CoinContainer", "./CoinContainer", _context.meta, extras);
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
      Collider = _cc.Collider;
      Component = _cc.Component;
      easing = _cc.easing;
      Node = _cc.Node;
      tween = _cc.tween;
      Tween = _cc.Tween;
      v3 = _cc.v3;
      Vec3 = _cc.Vec3;
      Enum = _cc.Enum;
      RigidBody = _cc.RigidBody;
    }, function (_unresolved_2) {
      ItemLayout = _unresolved_2.ItemLayout;
    }, function (_unresolved_3) {
      PickupComponent = _unresolved_3.PickupComponent;
    }, function (_unresolved_4) {
      Config = _unresolved_4.Config;
    }, function (_unresolved_5) {
      CommonEvent = _unresolved_5.CommonEvent;
      ObjectType = _unresolved_5.ObjectType;
    }, function (_unresolved_6) {
      Customer = _unresolved_6.Customer;
    }, function (_unresolved_7) {
      CoinContainer = _unresolved_7.CoinContainer;
    }, function (_unresolved_8) {
      DropItemCom = _unresolved_8.DropItemCom;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c057cM9YnxDeJA+elTTbCFw", "ShopCommon", undefined);

      __checkObsolete__(['_decorator', 'Collider', 'Component', 'easing', 'ITriggerEvent', 'Node', 'Prefab', 'tween', 'Tween', 'v3', 'Vec2', 'Vec3', 'instantiate', 'Enum', 'math', 'RigidBody', 'ERigidBodyType']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ShopCommon", ShopCommon = (_dec = ccclass('ShopCommon'), _dec2 = property({
        displayName: '仓库模式（禁用顾客系统，仅存储物品）'
      }), _dec3 = property({
        type: Enum(_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
          error: Error()
        }), ObjectType) : ObjectType),
        displayName: '商店商品类型'
      }), _dec4 = property({
        type: _crd && ItemLayout === void 0 ? (_reportPossibleCrUseOfItemLayout({
          error: Error()
        }), ItemLayout) : ItemLayout,
        displayName: '商品布局'
      }), _dec5 = property({
        type: Node,
        displayName: '生成位置'
      }), _dec6 = property({
        type: Node,
        displayName: '等待位置'
      }), _dec7 = property({
        type: [Node],
        displayName: '结束路径点数组（顺序移动）'
      }), _dec8 = property({
        type: Collider,
        displayName: '触发器'
      }), _dec9 = property({
        type: Node,
        displayName: '触发状态显示节点'
      }), _dec10 = property({
        displayName: '实际上限',
        tooltip: '非仓库模式下，商店可存储的最大物品数量，-1表示无限',
        visible: function visible() {
          return !this.isWarehouseMode;
        }
      }), _dec11 = property({
        displayName: '是否需要PickupComponent才能售货'
      }), _dec12 = property({
        type: _crd && CoinContainer === void 0 ? (_reportPossibleCrUseOfCoinContainer({
          error: Error()
        }), CoinContainer) : CoinContainer,
        displayName: '金币容器'
      }), _dec13 = property({
        type: Node,
        displayName: '桌子节点'
      }), _dec(_class = (_class2 = class ShopCommon extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "isWarehouseMode", _descriptor, this);

          _initializerDefineProperty(this, "shopItemType", _descriptor2, this);

          _initializerDefineProperty(this, "itemLayout", _descriptor3, this);

          _initializerDefineProperty(this, "spawnPos", _descriptor4, this);

          _initializerDefineProperty(this, "waitPos", _descriptor5, this);

          _initializerDefineProperty(this, "endPosArray", _descriptor6, this);

          _initializerDefineProperty(this, "shopCollider", _descriptor7, this);

          _initializerDefineProperty(this, "triggerStateNode", _descriptor8, this);

          _initializerDefineProperty(this, "maxStorageCount", _descriptor9, this);

          this.hiddenItemCount = 0;

          // 存储在实际上限中但未显示的物品数量
          _initializerDefineProperty(this, "needPickupToSell", _descriptor10, this);

          _initializerDefineProperty(this, "coinContainer", _descriptor11, this);

          _initializerDefineProperty(this, "tableNode", _descriptor12, this);

          this._spawnPos = new Vec3(0, 0, 0);
          this._waitPos = new Vec3(0, 0, 0);
          this._endPosArray = [];
          this.pickupComponents = new Map();
          // 存储在 投放触发器内的PickupComponent
          this.interactionTimers = new Map();
          // 存储在 投放触发器内的PickupComponent的交互时间
          this.checkTimer = 0.1;
          // 用于在update中控制检查频率
          this.checkTimer2 = 0.1;
          // 用于在update中控制检查频率
          this.waitList = [];
          // 等待购买的顾客队列

          /** 最大等待顾客数量 */
          this.MAX_WAIT_CUSTOMERS = 12;

          /** 最小活跃顾客数（确保商店始终有顾客） */
          this.MIN_ACTIVE_CUSTOMERS = 1;

          /** 顾客生成间隔时间（秒） */
          this.SPAWN_INTERVAL = 2;

          /** 顾客生成计时器 */
          this.spawnTimer = 0;

          /** 是否正在生成顾客 */
          this.isSpawning = false;
          this.interactionDuration = 1;

          /** 玩家是否已经操作过（进入触发器），用于控制前2个顾客的图标切换 */
          this._playerHasInteracted = false;

          this._onJoystickInput = input => {
            if (this._playerHasInteracted) return; // 有效拨动（非零输入）才触发

            if (input.length() > 0) {
              this._playerHasInteracted = true;
              this.updateNeedDisplay(); // 只需响应一次，注销监听

              app.event.off((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
                error: Error()
              }), CommonEvent) : CommonEvent).joystickInput, this._onJoystickInput);
            }
          };

          this.debugDistanceTimer = 0;
        }

        get SellNode() {
          return this.shopCollider.node;
        }

        get CoinContainer() {
          return this.coinContainer;
        }

        get ShopCollider() {
          return this.shopCollider;
        }

        get TriggerStateNode() {
          return this.triggerStateNode;
        }
        /**
         * 获取仓库中的商品数量
         */


        getWarehouseItemCount() {
          return this.itemLayout.getItemCount();
        }
        /**
         * 从仓库中取出一个商品（仓库模式专用）
         * @returns 商品节点，如果没有商品返回null
         */


        takeItemFromWarehouse() {
          if (!this.isWarehouseMode) {
            //console.warn('[ShopCommon] 非仓库模式不能使用 takeItemFromWarehouse');
            return null;
          }

          if (this.itemLayout.getItemCount() <= 0) {
            return null;
          }

          var items = this.itemLayout.getOuterItems(1);

          if (items.length > 0) {
            var item = items[0];
            this.itemLayout.removeItemByNode(item);
            return item;
          }

          return null;
        }

        onLoad() {
          // 仓库模式下不启动顾客生成系统
          if (!this.isWarehouseMode) {
            this._spawnPos = this.spawnPos.getWorldPosition();
            this._waitPos = this.waitPos.getWorldPosition(); // 初始化结束路径点数组

            this._endPosArray = [];

            for (var endPos of this.endPosArray) {
              if (endPos) {
                this._endPosArray.push(endPos.getWorldPosition());
              }
            } // 开始生成顾客


            this.startSpawningCustomers(); // 监听摇杆输入：玩家首次拨动摇杆时，将前2个顾客从饥饿切换为需求

            app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).joystickInput, this._onJoystickInput, this);
          } else {//console.log('[ShopCommon] 仓库模式启用，顾客系统已禁用');
          }
        }

        onDestroy() {
          app.event.off((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).joystickInput, this._onJoystickInput);
        }

        start() {
          // 🔍 添加详细的初始化日志
          if (!this.shopCollider) {
            //console.error('[ShopCommon] ❌ shopCollider 未设置！请在编辑器中配置');
            return;
          }

          if (!this.shopCollider.isTrigger) {//console.warn('[ShopCommon] ⚠️ shopCollider.isTrigger 未勾选！触发器事件不会触发');
          } // 延迟初始化物理配置，确保物理系统已经初始化


          this.scheduleOnce(() => {
            this.initPhysicsConfig();
          }, 0);
          this.shopCollider.on('onTriggerEnter', event => {
            this.onPickupTriggerEnter(event);
          }, this);
          this.shopCollider.on('onTriggerExit', event => {
            this.onPickupTriggerExit(event);
          }, this);
        }
        /**
         * 初始化物理配置
         */


        initPhysicsConfig() {
          if (!this.shopCollider) return; // 检查触发器节点是否有RigidBody

          var triggerRigidBody = this.shopCollider.node.getComponent(RigidBody);

          if (triggerRigidBody) {}
        }

        onPickupTriggerEnter(event) {
          var node = event.otherCollider.node;
          var pickupComponent = node.getComponent(_crd && PickupComponent === void 0 ? (_reportPossibleCrUseOfPickupComponent({
            error: Error()
          }), PickupComponent) : PickupComponent);

          if (pickupComponent) {
            // 添加到Map中跟踪
            this.pickupComponents.set(node.uuid, pickupComponent);
            this.interactionTimers.set(node.uuid, 0);
          } else {}
        }

        onPickupTriggerExit(event) {
          var node = event.otherCollider.node;

          if (node && this.pickupComponents.has(node.uuid)) {
            // 从Map中移除
            this.pickupComponents.delete(node.uuid);
            this.interactionTimers.delete(node.uuid);
          }
        }

        cherkCanSell() {
          var hasItem = this.itemLayout.getItemCount() > 0;
          var hasPickup = this.pickupComponents.size > 0;
          var canSell = this.needPickupToSell ? hasItem && hasPickup : hasItem;

          if (hasPickup || hasItem) {} // 如果需要PickupComponent才能售货，则需要同时满足有商品和有PickupComponent
          // 如果不需要PickupComponent，则只需要有商品即可


          return canSell;
        }

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
          } // 仓库模式下不执行顾客相关逻辑


          if (!this.isWarehouseMode) {
            this.checkTimer2 += dt; // 当累加时间达到检查间隔时不会漏掉检查次数

            while (this.checkTimer2 >= 0.03) {
              this.checkWaitSolder();
              this.checkTimer2 -= 0.03; // 减去一个间隔时间而不是重置为0
            } // 补充货架逻辑：如果有隐藏库存且有空位，补充货架


            this.refillShelfFromHidden(); // 更新顾客生成逻辑

            this.updateCustomerSpawn(dt);
          } // 根据开关设置决定触发状态显示逻辑
          // 如果需要PickupComponent才能售货，则显示PickupComponent的使用状态
          // 如果不需要PickupComponent，则根据是否有肉来显示状态


          var isUsing = this.pickupComponents.size > 0;
          this.triggerStateNode && (this.triggerStateNode.active = isUsing); // const isSalesclerkUsing = this.salesclerkComponents.size > 0;
          // this.salesclerkStateNode.active = isSalesclerkUsing;
        }

        _checkPickupComponents() {
          if (this.pickupComponents.size > 0) {} // 遍历所有触发器内的PickupComponent


          this.pickupComponents.forEach((pickupComponent, uuid) => {
            if (pickupComponent && pickupComponent.isValid) {
              // 更新交互时间
              var duration = this.interactionTimers.get(uuid) || 0;
              duration += (_crd && Config === void 0 ? (_reportPossibleCrUseOfConfig({
                error: Error()
              }), Config) : Config).UNLOCK_CHECK_INTERVAL;
              this.interactionTimers.set(uuid, duration);
              this.onUse(pickupComponent, duration);
            } else {
              // 如果组件不再有效，从Map中移除
              //console.warn('[ShopCommon] PickupComponent无效，移除', uuid);
              this.pickupComponents.delete(uuid);
              this.interactionTimers.delete(uuid);
            }
          });
        }

        onUse(pickupComponent, duration) {
          if (duration === void 0) {
            duration = 0;
          }

          var itemCount = pickupComponent.getItemCount(this.shopItemType);

          if (itemCount > 0) {
            // 计算消耗数量：基础1个 + 每0.5秒多1个，上限10个
            var extraCount = Math.floor(duration / 0.1);
            var consumeCount = 1 + extraCount;
            var maxConsumePerTick = 20;
            consumeCount = Math.min(consumeCount, maxConsumePerTick); // 限制不能超过实际持有数量

            consumeCount = Math.min(consumeCount, itemCount);
            var consumeList = pickupComponent.consumeItem(this.shopItemType, consumeCount);

            if (consumeList.length > 0) {
              for (var item of consumeList) {
                this.handleConsumedItem(item);
              }
            } else {}
          } else {}
        }

        handleConsumedItem(item) {
          Tween.stopAllByTarget(item);
          var tarLayoutPos = this.itemLayout.getCurrEmptyPosition();
          var targetPos;
          var isContainerFull = false;

          if (!tarLayoutPos) {
            // 容器显示满了
            if (!this.isWarehouseMode) {
              // 非仓库模式，检查实际上限
              var currentTotal = this.itemLayout.getItemCount() + this.hiddenItemCount;

              if (this.maxStorageCount === -1 || currentTotal < this.maxStorageCount) {
                // 未达到实际上限，增加隐藏计数
                this.hiddenItemCount++; // 标记为未满（逻辑上），但在回调中需要销毁节点（因为它存储在隐藏区）
              } else {
                // 达到实际上限
                isContainerFull = true;
              }
            } else {
              // 仓库模式，直接标记为满
              isContainerFull = true;
            } // 获取最后一个有效位置用于飞行动画


            var lastValidPos = this.itemLayout.getLastValidPosition();
            targetPos = this.itemLayout.getItemPosition(lastValidPos);
          } else {
            // 正常情况
            targetPos = this.itemLayout.getItemPosition(tarLayoutPos);
            this.itemLayout.reserveItem(tarLayoutPos);
          }

          var tarWorldRot = this.itemLayout.node.getWorldRotation(); // item.setWorldRotationFromEuler(0, 0, 0);

          manager.effect.flyNodeInParabola({
            node: item,
            target: targetPos,
            targetWorldRotation: tarWorldRot,
            callback: () => {
              app.audio.playEffect('resources/audio/SetRes', 0.6);

              if (isContainerFull) {
                // 容器满了（实际上限已满或仓库模式满了），回收
                manager.pool.putNode(item);
              } else if (!tarLayoutPos) {
                // 显示满了但实际上限未满（存入隐藏区），回收显示节点
                manager.pool.putNode(item);
              } else {
                // 正常情况，添加到布局
                this.itemLayout.addItemToReserve(item, tarLayoutPos);
                tween(item).to(0.1, {
                  scale: v3(1.2, 1.2, 1.2)
                }, {
                  easing: easing.sineOut
                }).to(0.1, {
                  scale: v3(1, 1, 1)
                }, {
                  easing: easing.sineOut
                }).start();
              }
            }
          });
        }

        refillShelfFromHidden() {
          if (this.hiddenItemCount <= 0) return; // 尝试获取空位

          var emptyPos = this.itemLayout.getCurrEmptyPosition();

          if (emptyPos) {
            // 减少隐藏计数
            this.hiddenItemCount--; // 从对象池获取节点

            var itemNode = manager.pool.getNode(this.shopItemType, this.itemLayout.node);

            if (itemNode) {
              // 占位
              this.itemLayout.reserveItem(emptyPos); // 添加

              this.itemLayout.addItemToReserve(itemNode, emptyPos); // 播放出现动画

              itemNode.setScale(0, 0, 0);
              tween(itemNode).to(0.2, {
                scale: v3(1, 1, 1)
              }, {
                easing: easing.backOut
              }).start();
            } else {
              // 如果获取失败，回滚计数
              this.hiddenItemCount++;
            }
          }
        }
        /**
         * 让顾客沿着结束路径点依次移动，走完后回收
         */


        moveCustomerAlongPath(customer, pathIndex) {
          if (pathIndex === void 0) {
            pathIndex = 0;
          }

          if (!this._endPosArray || this._endPosArray.length === 0) {
            this.putCustomer(customer);
            return;
          }

          if (pathIndex >= this._endPosArray.length) {
            this.putCustomer(customer);
            return;
          }

          var targetPos = this._endPosArray[pathIndex];
          customer.MoveToWorldPos(targetPos, () => {
            this.moveCustomerAlongPath(customer, pathIndex + 1);
          });
        }

        checkCustomerNeedItem(customer) {
          // 根据商品类型检查顾客是否需要该商品
          return customer.CherkNeedObject();
        }

        checkWaitSolder() {
          if (!this.cherkCanSell()) return;
          var itemCount = this.itemLayout.getItemCount();

          if (itemCount > 0 && this.waitList.length > 0) {
            var customer = this.waitList[0]; // 检查顾客是否需要当前商品类型

            if (!this.checkCustomerNeedItem(customer)) return; // 检查顾客是否已经站定并准备购买

            if (!customer.isReadyToBuy) {
              return; // 顾客还在移动或未准备好，不飞商品
            }

            var item = this.itemLayout.getOuterItems(1)[0];
            this.itemLayout.removeItemByNode(item); // 取出物品后，立即尝试从隐藏库存补充

            this.refillShelfFromHidden();
            var dropItemCom = item.getComponent(_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
              error: Error()
            }), DropItemCom) : DropItemCom);

            if (dropItemCom) {
              customer.pickUpItem(dropItemCom, () => {
                app.audio.playEffect('resources/audio/SetRes', 0.6);
                var isFinish = customer.GetNeedObjectCount() <= 0;

                if (isFinish) {
                  // 立即从等待队列中移除顾客，让队伍往前排
                  this.RemoveWaitSolder(customer.node);
                  customer.showHappy(); // 顾客购买完成后，沿路径点依次移动后回收

                  this.moveCustomerAlongPath(customer); // 将金币飞到金币容器中，根据商品需求数量支付相应金币

                  var coinCount = 0;

                  switch (this.shopItemType) {
                    case (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                      error: Error()
                    }), ObjectType) : ObjectType).DropItemWood:
                      coinCount = customer.GetTotalObjectNeed();
                      break;

                    case (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                      error: Error()
                    }), ObjectType) : ObjectType).DropItemMeat:
                      coinCount = 4 * customer.GetTotalObjectNeed();
                      break;

                    case (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                      error: Error()
                    }), ObjectType) : ObjectType).DropItemFlatbread:
                      coinCount = 5 * customer.GetTotalObjectNeed();
                      break;

                    default:
                      break;
                  }

                  for (var i = 0; i < coinCount; i++) {
                    this.coinContainer.receiveCoin(customer.node.getWorldPosition());
                  }
                }
              });
            }
          }
        }

        GetCurrWaitPosition(index) {
          index = index === undefined ? this.waitList.length - 1 : index; // return this.waitPos.getWorldPosition().add(v3(-2 * index, 0 , 2 * index));

          return v3(this._waitPos.x, this._waitPos.y, this._waitPos.z + 1.5 * index);
        }

        AddWaitSolder(node, immediate) {
          if (immediate === void 0) {
            immediate = false;
          }

          var customer = node.getComponent(_crd && Customer === void 0 ? (_reportPossibleCrUseOfCustomer({
            error: Error()
          }), Customer) : Customer);
          this.waitList.push(customer); // 移动到等待位置，并在到达后设置为准备购买状态

          var waitPosition = this.GetCurrWaitPosition(this.waitList.length - 1);

          if (immediate) {
            node.setWorldPosition(waitPosition);
            customer.setMoving(false);
            customer.setReadyToBuy(true);
          } else {
            customer.MoveToWorldPos(waitPosition, () => {
              // 确保顾客到达等待位置后准备购买
              customer.setReadyToBuy(true);
            });
          } // 更新需求节点显示：只有队列第一个顾客显示需求


          this.updateNeedDisplay();
        }

        RemoveWaitSolder(node) {
          this.waitList = this.waitList.filter(customer => customer.node !== node);
          this.updateSolderPosition(); // 更新需求节点显示：只有队列第一个顾客显示需求

          this.updateNeedDisplay(); // 当有顾客离开等待队列时，立即检查是否需要生成新顾客

          if (this.waitList.length < this.MIN_ACTIVE_CUSTOMERS) {
            // 重置计时器，立即触发生成检查
            this.spawnTimer = this.SPAWN_INTERVAL;
          }
        }

        updateSolderPosition() {
          var _this = this;

          var _loop = function _loop() {
            var customer = _this.waitList[i];
            customer.MoveToWorldPos(_this.GetCurrWaitPosition(i), () => {
              // 确保顾客到达新位置后准备购买
              customer.setReadyToBuy(true);
            });
          };

          for (var i = 0; i < this.waitList.length; i++) {
            _loop();
          }
        }
        /**
         * 更新需求节点显示：
         * - 玩家未操作前：前2个顾客显示饥饿节点
         * - 玩家操作后：前2个顾客显示需求节点
         * - 其余顾客始终显示不高兴节点
         */


        updateNeedDisplay() {
          var showCount = 2;

          for (var i = 0; i < this.waitList.length; i++) {
            var customer = this.waitList[i];

            if (i < showCount) {
              if (this._playerHasInteracted) {
                customer.showNeed();
              } else {
                customer.showHungry();
              }
            } else {
              customer.showUnhappy();
            }
          }
        }
        /**
         * 开始生成顾客
         */


        startSpawningCustomers() {
          this.isSpawning = true; // 初始直接生成5个顾客

          for (var i = 0; i < 10; i++) {
            this.spawnCustomer(true);
          }

          this.spawnTimer = 0;
        }
        /**
         * 停止生成顾客
         */


        stopSpawningCustomers() {
          this.isSpawning = false;
        }
        /**
         * 更新顾客生成逻辑
         */


        updateCustomerSpawn(dt) {
          if (!this.isSpawning) return; // 累加生成计时器

          this.spawnTimer += dt; // 检查是否需要生成新顾客

          if (this.spawnTimer >= this.SPAWN_INTERVAL) {
            this.spawnTimer = 0; // 计算等待购买的顾客数

            var waitingCustomers = this.waitList.length; // 生成逻辑：
            // 1. 如果顾客少于最小数量，立即生成（保证商店始终有顾客）
            // 2. 如果顾客少于最大数量，正常生成

            if (waitingCustomers < this.MIN_ACTIVE_CUSTOMERS || waitingCustomers < this.MAX_WAIT_CUSTOMERS) {
              this.spawnCustomer();
            }
          }
        }
        /**
         * 生成一个新顾客
         */


        spawnCustomer(immediate) {
          if (immediate === void 0) {
            immediate = false;
          }

          // 双重检查：生成前再次确认
          var waitingCustomers = this.waitList.length; // 检查是否超过上限

          if (waitingCustomers >= this.MIN_ACTIVE_CUSTOMERS) {
            // 如果是初始生成（immediate=true），只要不超过最大值就允许生成，忽略 MIN_ACTIVE_CUSTOMERS 限制
            // 否则（正常生成），需要遵守 MIN_ACTIVE_CUSTOMERS 逻辑（即只有少于MIN才强制生成，否则由updateCustomerSpawn控制频率）
            // 但这里 spawnCustomer 是被调用的执行者，逻辑控制应该在外层。
            // 原逻辑：if (waitingCustomers >= MIN) { if (waitingCustomers >= MAX) return; }
            // 这意味着只要不超过 MAX，就可以生成。
            // updateCustomerSpawn 里决定了何时调用。
            // 所以这里只需要检查 MAX。
            if (waitingCustomers >= this.MAX_WAIT_CUSTOMERS) {
              return;
            }
          }

          var customerNode = null; // 首先尝试从对象池获取

          if (manager.pool) {
            customerNode = manager.pool.getNode((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).Customer, this.node);
          }

          if (customerNode) {
            // 在生成位置创建顾客
            customerNode.setWorldPosition(this._spawnPos);
            var customer = customerNode.getComponent(_crd && Customer === void 0 ? (_reportPossibleCrUseOfCustomer({
              error: Error()
            }), Customer) : Customer);

            if (customer) {
              // 生成2到5之间的随机需求数量
              // const needCount = Math.floor(Math.random() * 2) + 3;
              var needCount = 2; // 初始化顾客

              customer.init(needCount, this.shopItemType); // 顾客直接移动到等待购买位置

              this.AddWaitSolder(customer.node, immediate);
            }
          } else {//console.warn('无法生成顾客: 预制体未设置或对象池异常');
          }
        }
        /**
         * 回收顾客到对象池
         */


        putCustomer(customer) {
          if (customer && customer.node) {
            // 回收到对象池
            if (manager.pool) {
              manager.pool.putNode(customer.node);
            } else {
              // 如果没有对象池，直接销毁
              customer.node.destroy();
            }
          }
        }

        ShowUnlock(cb) {
          this.node.active = true;
          this.tableNode.active = true;
          this.tableNode.setScale(0, 0, 0);
          tween(this.tableNode).to(0.5, {
            scale: v3(0.669, 0.669, 0.669)
          }, {
            easing: easing.backOut
          }).call(() => {
            cb == null || cb();
          }).start();
        }

        reset() {
          if (this.shopItemType == (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemMeat) {
            this.node.active = false;
            this.tableNode.active = false;
            this.tableNode.setScale(0, 0, 0);
          } // 重置玩家交互标记，下局游戏前2个顾客重新显示饥饿状态


          this._playerHasInteracted = false; // 重新注册摇杆监听，确保下局能再次触发切换

          if (!this.isWarehouseMode) {
            app.event.off((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).joystickInput, this._onJoystickInput);
            app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).joystickInput, this._onJoystickInput, this);
          } // 仓库模式下不清空顾客队列（因为没有顾客系统）


          if (!this.isWarehouseMode) {
            // 清空所有顾客队列
            this.waitList.forEach(customer => this.putCustomer(customer));
            this.waitList = [];
          }

          this.itemLayout.reset(); // 仓库模式下不重置金币容器

          if (!this.isWarehouseMode && this.coinContainer) {
            this.coinContainer.reset();
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isWarehouseMode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "shopItemType", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemWood;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "itemLayout", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "spawnPos", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "waitPos", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "endPosArray", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "shopCollider", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "triggerStateNode", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "maxStorageCount", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -1;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "needPickupToSell", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "coinContainer", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "tableNode", [_dec13], {
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
//# sourceMappingURL=0da249607fb67d1acbea06f4135eb7b3dad046d4.js.map