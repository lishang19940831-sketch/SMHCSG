System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, CCInteger, Component, Enum, Label, Node, tween, v3, Sprite, Color, Collider, Tween, Quat, easing, BuildUnlockState, CommonEvent, ObjectType, BuildingType, Config, PickupComponent, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class4, _class5, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _crd, ccclass, property, UnlockStageConfig, UnlockItem;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBuildUnlockState(extras) {
    _reporterNs.report("BuildUnlockState", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildingType(extras) {
    _reporterNs.report("BuildingType", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConfig(extras) {
    _reporterNs.report("Config", "../../Main/Common/Config", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPickupComponent(extras) {
    _reporterNs.report("PickupComponent", "../Components/PickupComponent", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      CCInteger = _cc.CCInteger;
      Component = _cc.Component;
      Enum = _cc.Enum;
      Label = _cc.Label;
      Node = _cc.Node;
      tween = _cc.tween;
      v3 = _cc.v3;
      Sprite = _cc.Sprite;
      Color = _cc.Color;
      Collider = _cc.Collider;
      Tween = _cc.Tween;
      Quat = _cc.Quat;
      easing = _cc.easing;
    }, function (_unresolved_2) {
      BuildUnlockState = _unresolved_2.BuildUnlockState;
      CommonEvent = _unresolved_2.CommonEvent;
      ObjectType = _unresolved_2.ObjectType;
      BuildingType = _unresolved_2.BuildingType;
    }, function (_unresolved_3) {
      Config = _unresolved_3.Config;
    }, function (_unresolved_4) {
      PickupComponent = _unresolved_4.PickupComponent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c0109mPOwxFvoHMrAr3ENHE", "UnlockItem", undefined);

      __checkObsolete__(['_decorator', 'CCInteger', 'Component', 'Enum', 'Label', 'Node', 'tween', 'v3', 'Vec3', 'Sprite', 'Material', 'resources', 'Color', 'Collider', 'ITriggerEvent', 'Tween', 'Quat', 'easing']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 解锁阶段配置
       */

      _export("UnlockStageConfig", UnlockStageConfig = (_dec = ccclass('UnlockStageConfig'), _dec2 = property({
        type: Enum(_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
          error: Error()
        }), BuildingType) : BuildingType),
        displayName: '解锁建筑类型'
      }), _dec3 = property({
        type: Enum(_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
          error: Error()
        }), ObjectType) : ObjectType),
        displayName: '消耗资源类型'
      }), _dec4 = property({
        type: CCInteger,
        displayName: '解锁所需资源数量'
      }), _dec(_class = (_class2 = class UnlockStageConfig {
        constructor() {
          _initializerDefineProperty(this, "itemType", _descriptor, this);

          _initializerDefineProperty(this, "consumptionType", _descriptor2, this);

          _initializerDefineProperty(this, "cost", _descriptor3, this);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "itemType", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).None;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "consumptionType", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemCoin;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cost", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));

      _export("UnlockItem", UnlockItem = (_dec5 = ccclass('UnlockItem'), _dec6 = property({
        type: Enum(_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
          error: Error()
        }), BuildUnlockState) : BuildUnlockState),
        displayName: '初始解锁状态'
      }), _dec7 = property({
        type: Enum(_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
          error: Error()
        }), BuildingType) : BuildingType),
        displayName: '[已废弃]解锁建筑类型（使用多阶段配置）'
      }), _dec8 = property({
        type: Enum(_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
          error: Error()
        }), ObjectType) : ObjectType),
        displayName: '[已废弃]消耗资源类型（使用多阶段配置）'
      }), _dec9 = property({
        type: CCInteger,
        displayName: '[已废弃]解锁所需资源数量（使用多阶段配置）'
      }), _dec10 = property({
        type: [UnlockStageConfig],
        displayName: '多阶段解锁配置（优先使用）'
      }), _dec11 = property({
        type: Label,
        displayName: '剩余所需资源数'
      }), _dec12 = property({
        type: Collider,
        displayName: '触发器'
      }), _dec13 = property({
        type: Node,
        displayName: '资源Icon'
      }), _dec14 = property({
        type: Sprite,
        displayName: '百分比'
      }), _dec15 = property({
        type: Node,
        displayName: '额外解锁的Node 不需要缩放动画'
      }), _dec16 = property({
        type: Node,
        displayName: '额外解锁的Node 需要缩放动画'
      }), _dec5(_class4 = (_class5 = class UnlockItem extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "initUnlockState", _descriptor4, this);

          _initializerDefineProperty(this, "itemType", _descriptor5, this);

          _initializerDefineProperty(this, "consumptionType", _descriptor6, this);

          _initializerDefineProperty(this, "unlockCostValue", _descriptor7, this);

          _initializerDefineProperty(this, "unlockStages", _descriptor8, this);

          _initializerDefineProperty(this, "remainGoldLbl", _descriptor9, this);

          _initializerDefineProperty(this, "trigger", _descriptor10, this);

          _initializerDefineProperty(this, "goldIcon", _descriptor11, this);

          _initializerDefineProperty(this, "percent", _descriptor12, this);

          _initializerDefineProperty(this, "extraUnlockNode", _descriptor13, this);

          _initializerDefineProperty(this, "extraUnlockNodeNeedScale", _descriptor14, this);

          this._unlockState = (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).NoActive;
          this.reservedGold = 0;
          this.remainGold = 0;
          this.isShowUnlockTip = false;
          this.pickupComponents = new Map();
          // 存储在触发器内的PickupComponent
          this.interactionTimers = new Map();
          // 存储在触发器内的PickupComponent的交互时间
          this.checkTimer = 0;
          // 用于在update中控制检查频率
          this.currentStageIndex = 0;
          // 当前解锁阶段索引
          this.isLabelScaling = false;
          // 标记remainGoldLbl是否正在缩放
          this.isWorkerBreathing = false;
          // 标记解锁项是否正在呼吸
          this._canInteract = true;
          // 需要先离开再进入，避免连续阶段自动交付
          this.oldNodeScale = v3(1, 1, 1);
        }

        // 将在onLoad中保存实际的原始缩放值
        get ItemType() {
          return this.getCurrentStageConfig().itemType;
        }

        get UnlockState() {
          return this.unlockState;
        }

        get ConsumptionType() {
          return this.getCurrentStageConfig().consumptionType;
        }
        /**
         * 获取当前阶段配置
         */


        getCurrentStageConfig() {
          // 如果配置了多阶段，使用多阶段配置
          if (this.unlockStages.length > 0) {
            var index = Math.min(this.currentStageIndex, this.unlockStages.length - 1);
            return this.unlockStages[index];
          } // 否则使用旧的单阶段配置（向后兼容）


          var config = new UnlockStageConfig();
          config.itemType = this.itemType;
          config.consumptionType = this.consumptionType;
          config.cost = this.unlockCostValue;
          return config;
        }
        /**
         * 获取当前阶段的解锁成本
         */


        getCurrentStageCost() {
          return this.getCurrentStageConfig().cost;
        }
        /**
         * 检查当前解锁项是否是工人类型
         */


        isWorkerType() {
          var itemType = this.ItemType;
          return itemType === (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).Lumberjack || itemType === (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).Lumberjack2;
        }
        /**
         * 检查是否还有下一个阶段
         */


        hasNextStage() {
          return this.unlockStages.length > 0 && this.currentStageIndex < this.unlockStages.length - 1;
        }
        /**
         * 进入下一个解锁阶段
         */


        gotoNextStage() {
          if (!this.hasNextStage()) {
            return;
          }

          this.currentStageIndex++;
          var config = this.getCurrentStageConfig(); // 重置当前阶段的资源需求

          this.remainGold = config.cost;
          this.reservedGold = 0; // 若正处在触发器内，要求先离开再进入

          this._canInteract = false; // 更新UI

          this.remainGoldLbl.string = this.remainGold.toString();
          this.percent.fillRange = 0; // 触发UI动画

          var oldScale = this.node.getScale().clone();
          this.node.setScale(0, 0, 0);
          tween(this.node).to(0.5, {
            scale: oldScale
          }, {
            easing: easing.backOut
          }).start(); // 更新引导位置

          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).UpdateGuideItemPosition, {
            type: config.itemType,
            position: this.node.getWorldPosition(),
            consumptionType: config.consumptionType
          }); //console.log(`[UnlockItem] 进入第 ${this.currentStageIndex + 1} 阶段，解锁类型: ${config.itemType}, 需要资源: ${config.cost}`);
        }
        /**
         * 预留资源数量，在资源飞过来的过程中先减少所需资源
         * @param amount 预留的资源数量
         */


        reserveGold(amount) {
          if (this.unlockState !== (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).Active) return;
          this.reservedGold += amount; // 更新显示的剩余资源数量

          var displayRemainGold = this.getDisplayRemainGold(); // 如果预留的资源足够解锁，可以在这里触发相关事件

          if (displayRemainGold <= 0) {// 可以在这里添加预解锁的视觉效果或其他逻辑
          }
        }

        get unlockState() {
          return this._unlockState;
        }

        set unlockState(value) {
          // 如果状态发生变化，停止之前的呼吸动画
          if (this._unlockState !== value) {
            this.stopWorkerBreathing();
          }

          switch (value) {
            case (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
              error: Error()
            }), BuildUnlockState) : BuildUnlockState).Active:
              this.node.active = true; // 启动呼吸动画，延迟一帧启动，确保node已经激活

              this.scheduleOnce(() => {
                this.startWorkerBreathing();
              }, 0);
              break;

            case (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
              error: Error()
            }), BuildUnlockState) : BuildUnlockState).Unlocked:
              this.node.active = false;
              break;

            case (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
              error: Error()
            }), BuildUnlockState) : BuildUnlockState).NoActive:
              this.node.active = false;
              this.extraUnlockNode.forEach(node => {
                node.active = false;
              });
              this.extraUnlockNodeNeedScale.forEach(node => {
                node.active = false;
              });
              break;
          }

          this._unlockState = value;
        }

        onLoad() {
          // 保存节点的原始缩放值
          this.oldNodeScale = this.node.scale.clone();
          this.reset();

          if (this.initUnlockState === (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).Unlocked) {
            // 如果初始就是已解锁状态，触发所有阶段的解锁事件
            this.scheduleOnce(() => {
              if (this.unlockStages.length > 0) {
                this.unlockStages.forEach(stage => {
                  app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
                    error: Error()
                  }), CommonEvent) : CommonEvent).UnlockItem, stage.itemType);
                });
              } else {
                app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
                  error: Error()
                }), CommonEvent) : CommonEvent).UnlockItem, this.itemType);
              }
            });
          }

          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).SetUnlockStatue, this.onSetUnlockStatue, this);
          var currentConfig = this.getCurrentStageConfig();
          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).UpdateGuideItemPosition, {
            type: currentConfig.itemType,
            position: this.node.getWorldPosition(),
            consumptionType: currentConfig.consumptionType
          }); // 使用update方法替代schedule

          this.checkTimer = 0; // 注册所有阶段到unlockItemMap（多阶段的情况下，每个阶段都指向同一个UnlockItem）

          if (this.unlockStages.length > 0) {
            this.unlockStages.forEach(stage => {
              manager.game.unlockItemMap.set(stage.itemType, this);
            });
          } else {
            manager.game.unlockItemMap.set(this.itemType, this);
          }
        }

        start() {
          this.trigger.on('onTriggerEnter', this._onCollisionEnter, this);
          this.trigger.on('onTriggerExit', this._onCollisionExit, this);
        }

        onDestroy() {
          app.event.off((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).SetUnlockStatue, this.onSetUnlockStatue);
          this.trigger.off('onTriggerEnter', this._onCollisionEnter, this);
          this.trigger.off('onTriggerExit', this._onCollisionExit, this); // 清理node缩放动画

          tween(this.node).stop();
        }

        onSetUnlockStatue(data) {
          // 检查是否匹配当前阶段或者任意阶段
          var currentConfig = this.getCurrentStageConfig();
          var isCurrentStage = data.type === currentConfig.itemType;
          var isAnyStage = this.unlockStages.some(stage => stage.itemType === data.type) || data.type === this.itemType;

          if (isCurrentStage || isAnyStage) {
            var oldState = this.unlockState; // 如果指定了阶段索引，跳转到该阶段

            if (data.stageIndex !== undefined && this.unlockStages.length > 0) {
              this.currentStageIndex = Math.max(0, Math.min(data.stageIndex, this.unlockStages.length - 1));
            }

            this.unlockState = data.state; // 切到 Active 时，若玩家仍在触发器内，则需要先离开再进入

            if (data.state === (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
              error: Error()
            }), BuildUnlockState) : BuildUnlockState).Active) {
              this._canInteract = this.pickupComponents.size === 0;
            } // 获取当前阶段配置（可能已经改变）


            var config = this.getCurrentStageConfig(); // 只有当 cost 存在时才更新当前阶段的成本

            if (data.cost !== undefined) {
              if (this.unlockStages.length > 0) {
                // 更新当前阶段的cost
                this.unlockStages[this.currentStageIndex].cost = data.cost;
              } else {
                this.unlockCostValue = data.cost;
              }
            } // 只有当 isResetCost 为 true 且相关数据有效时才重置消耗


            if (data.isResetCost === true && config.cost > 0) {
              this.remainGold = config.cost;
              this.reservedGold = 0; // 根据消耗类型设置不同的前缀

              this.remainGoldLbl.string = this.remainGold.toString();
              this.percent.fillRange = config.cost > 0 ? 1 - this.remainGold / config.cost : 0;
            }

            if (oldState == (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
              error: Error()
            }), BuildUnlockState) : BuildUnlockState).NoActive && data.state == (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
              error: Error()
            }), BuildUnlockState) : BuildUnlockState).Active) {
              var oldScale = this.node.getScale().clone();
              this.node.setScale(0, 0, 0);
              tween(this.node).to(0.5, {
                scale: oldScale
              }, {
                easing: easing.backOut
              }).start();
              this.extraUnlockNode.forEach(node => {
                node.active = true;
              });
              this.extraUnlockNodeNeedScale.forEach(node => {
                node.active = true;
                var oldScale = node.getScale().clone();
                node.setScale(0, 0, 0);
                tween(node).to(0.5, {
                  scale: oldScale
                }, {
                  easing: easing.backOut
                }).start();
              });
            }
          }
        }

        reset() {
          this.unlockState = this.initUnlockState;
          this.currentStageIndex = 0; // 重置到第一阶段

          this._canInteract = true;
          var config = this.getCurrentStageConfig();
          this.remainGold = config.cost || 0;
          this.reservedGold = 0; // 停止并重置node缩放动画

          tween(this.node).stop();
          this.node.scale = this.oldNodeScale;
          this.isLabelScaling = false; // 根据消耗类型设置不同的前缀

          this.remainGoldLbl.string = this.remainGold.toString();
          this.percent.fillRange = config.cost > 0 ? 1 - this.remainGold / config.cost : 0;
          this.isShowUnlockTip = false;
          this.pickupComponents.clear();
          this.interactionTimers.clear(); //console.log(`[UnlockItem] 重置到第 1 阶段，解锁类型: ${config.itemType}, 需要资源: ${config.cost}`);
        }

        CostGold(cost) {
          if (this.unlockState !== (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).Active || manager.game.isInteractionLocked) {
            return;
          } // 从预留的资源中扣除实际到达的资源


          var actualCost = Math.min(cost, this.reservedGold);
          this.reservedGold -= actualCost;
          this.remainGold -= cost;
          var currentCost = this.getCurrentStageCost(); // 清除原本tween

          tween(this.goldIcon).stop();
          var oldScale = this.goldIcon.getScale().clone();
          this.goldIcon.scale = v3(1, 1, 1); // 播放图标动画

          tween(this.goldIcon).to(0.01, {
            scale: v3(1.2, 1.2, 1.2)
          }).call(() => {
            this.remainGoldLbl.string = this.remainGold.toString();
            this.percent.fillRange = currentCost > 0 ? 1 - this.remainGold / currentCost : 0; // 如果当前没有正在进行的缩放动画，则播放node缩放动画

            if (!this.isLabelScaling) {
              this.isLabelScaling = true; // 先停止呼吸动画

              var needRestartBreathing = this.isWorkerBreathing;

              if (needRestartBreathing) {
                this.stopWorkerBreathing();
              }

              var originalNodeScale = this.node.scale.clone();
              tween(this.node).to(0.1, {
                scale: v3(originalNodeScale.x * 1.3, originalNodeScale.y * 1.3, originalNodeScale.z * 1.3)
              }).to(0.1, {
                scale: originalNodeScale
              }).call(() => {
                this.isLabelScaling = false; // 如果之前在呼吸，恢复呼吸动画

                if (needRestartBreathing) {
                  this.startWorkerBreathing();
                }
              }).start();
            } // 检查是否已经解锁当前阶段


            if (this.remainGold <= 0 && this.unlockState === (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
              error: Error()
            }), BuildUnlockState) : BuildUnlockState).Active) {
              var currentItemType = this.ItemType; // 停止node缩放动画并恢复原始scale

              tween(this.node).stop();
              this.node.scale = this.oldNodeScale;
              this.isLabelScaling = false; // 发送解锁事件

              app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
                error: Error()
              }), CommonEvent) : CommonEvent).UnlockItem, currentItemType);
              app.audio.playEffect('resources/audio/ye'); // 检查是否还有下一个阶段

              if (this.hasNextStage()) {
                // 进入下一个阶段
                //console.log(`[UnlockItem] 第 ${this.currentStageIndex + 1} 阶段解锁完成: ${currentItemType}`);
                this.gotoNextStage();
              } else {
                // 所有阶段都解锁完成
                //console.log(`[UnlockItem] 所有阶段解锁完成，最后阶段: ${currentItemType}`);
                this.unlockState = (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
                  error: Error()
                }), BuildUnlockState) : BuildUnlockState).Unlocked;
              }
            }
          }).to(0.01, {
            scale: v3(1, 1, 1)
          }).start();
        }

        _onCollisionEnter(event) {
          var node = event.otherCollider.node;
          var pickupComponent = node.getComponent(_crd && PickupComponent === void 0 ? (_reportPossibleCrUseOfPickupComponent({
            error: Error()
          }), PickupComponent) : PickupComponent);

          if (pickupComponent) {
            // 添加到Map中跟踪
            this.pickupComponents.set(node.uuid, pickupComponent);
            this.interactionTimers.set(node.uuid, 0); // console.log('添加到Map中跟踪', node.uuid, pickupComponent);
          }
        }

        _onCollisionExit(event) {
          var node = event.otherCollider.node;

          if (node && this.pickupComponents.has(node.uuid)) {
            // 从Map中移除
            this.pickupComponents.delete(node.uuid);
            this.interactionTimers.delete(node.uuid); // console.log('从Map中移除', node.uuid);
            // 离开触发器后允许再次交互

            if (this.unlockState === (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
              error: Error()
            }), BuildUnlockState) : BuildUnlockState).Active) {
              this._canInteract = true;
            }
          }
        }

        _checkPickupComponents() {
          // 如果不是激活状态，直接返回
          if (this.unlockState !== (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).Active) return;
          if (manager.game.isInteractionLocked) return; // 遍历所有触发器内的PickupComponent

          this.pickupComponents.forEach((pickupComponent, uuid) => {
            if (pickupComponent && pickupComponent.isValid) {
              var duration = this.interactionTimers.get(uuid) || 0;
              duration += (_crd && Config === void 0 ? (_reportPossibleCrUseOfConfig({
                error: Error()
              }), Config) : Config).UNLOCK_CHECK_INTERVAL;
              this.interactionTimers.set(uuid, duration);
              this.OnCost(pickupComponent, pickupComponent.node.getWorldPosition(), duration);
            } else {
              // 如果组件不再有效，从Map中移除
              this.pickupComponents.delete(uuid);
              this.interactionTimers.delete(uuid);
            }
          });
        }

        OnCost(pickupComponent, wpos, duration) {
          var _this = this;

          if (duration === void 0) {
            duration = 0;
          }

          var currentConsumptionType = this.ConsumptionType; // 使用getter获取当前阶段的消耗类型

          if (this.unlockState === (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).Active && !manager.game.isInteractionLocked) {
            // 计算消耗数量：基础1个 + 每0.1秒多1个，上限10个 (参考ShopCommon.ts)
            var extraCount = Math.floor(duration / 0.1);
            var consumeCount = 1 + extraCount;
            consumeCount = Math.min(consumeCount, 10); // 限制不能超过剩余所需资源数

            var remainGold = this.getDisplayRemainGold();
            consumeCount = Math.min(consumeCount, remainGold); // 限制不能超过实际持有数量

            var hasCount = pickupComponent.getItemCount(currentConsumptionType);
            consumeCount = Math.min(consumeCount, hasCount);
            if (consumeCount <= 0) return;
            this.reserveGold(consumeCount);
            var consumeList = pickupComponent.consumeItem(currentConsumptionType, consumeCount);

            var _loop = function _loop() {
              var item;

              if (i < consumeList.length) {
                item = consumeList[i];
                Tween.stopAllByTarget(item);
              } else {
                var position = wpos;
                item = manager.pool.getNode(currentConsumptionType, manager.effect.node);
                item.setWorldPosition(position);
              }

              var parent = manager.effect.node;
              item.setParent(parent, true);
              manager.effect.flyNodeInParabola({
                node: item,
                target: _this.goldIcon,
                targetWorldRotation: new Quat(0, 0, 0, 0),
                callback: () => {
                  app.audio.playEffect('resources/audio/SetRes', 0.6);

                  _this.CostGold(1);

                  manager.pool.putNode(item);
                }
              });
            };

            for (var i = 0; i < consumeCount; i++) {
              _loop();
            }
          }
        }

        getRemainGold() {
          return this.remainGold;
        }
        /**
         * 获取显示的剩余资源数量（考虑预留资源）
         */


        getDisplayRemainGold() {
          return Math.max(0, this.remainGold - this.reservedGold);
        }

        get
        /**
         * 获取预留的资源数量
         */
        getReservedGold() {
          return this.reservedGold;
        }
        /**
         * 获取当前阶段索引（从0开始）
         */


        getCurrentStageIndex() {
          return this.currentStageIndex;
        }
        /**
         * 获取总阶段数
         */


        getTotalStages() {
          return this.unlockStages.length > 0 ? this.unlockStages.length : 1;
        }
        /**
         * 获取所有阶段的配置
         */


        getAllStages() {
          if (this.unlockStages.length > 0) {
            return this.unlockStages;
          } // 兼容旧配置


          var config = new UnlockStageConfig();
          config.itemType = this.itemType;
          config.consumptionType = this.consumptionType;
          config.cost = this.unlockCostValue;
          return [config];
        }
        /**
         * 启动解锁项的呼吸动画
         */


        startWorkerBreathing() {
          if (this.isWorkerBreathing) return;
          this.isWorkerBreathing = true; // 先恢复到原始缩放，确保呼吸动画基准正确

          this.node.scale = this.oldNodeScale.clone();
          tween(this.node).to(1.0, {
            scale: v3(this.oldNodeScale.x * 1.15, this.oldNodeScale.y * 1.15, this.oldNodeScale.z * 1.15)
          }, {
            easing: 'sineInOut'
          }).to(1.0, {
            scale: this.oldNodeScale.clone()
          }, {
            easing: 'sineInOut'
          }).union().repeatForever().tag(1001) // 使用tag标记呼吸动画
          .start();
        }
        /**
         * 停止解锁项的呼吸动画
         */


        stopWorkerBreathing() {
          if (!this.isWorkerBreathing) return;
          this.isWorkerBreathing = false; // 停止带有tag 1001的动画（呼吸动画）

          Tween.stopAllByTag(1001, this.node); // 恢复到原始缩放

          this.node.scale = this.oldNodeScale.clone();
        }
        /**
         * 显示解锁提示
         */


        ShowUnlockTip() {
          if (this.isShowUnlockTip) return;
          this.isShowUnlockTip = true;
          var iconNode = this.node.getChildByName('icon');
          var squareNode = this.node.getChildByName('square'); // 保存原始颜色和缩放

          var originalScale = squareNode.scale.clone(); // 设置呼吸动画 - 缩放效果

          tween(squareNode).to(0.5, {
            scale: v3(originalScale.x * 1.1, originalScale.y * 1.1, originalScale.z * 1.1)
          }, {
            easing: 'sineInOut'
          }).to(0.5, {
            scale: originalScale
          }, {
            easing: 'sineInOut'
          }).union().repeatForever().start(); // 呼吸变色效果 - 节点本身

          var nodeSprite = squareNode.getComponent(Sprite);

          if (nodeSprite) {
            // 使用颜色变化代替材质
            tween(nodeSprite).to(0.5, {
              color: new Color(100, 255, 100, 255)
            }, {
              easing: 'sineInOut'
            }).to(0.5, {
              color: new Color(255, 255, 255, 255)
            }, {
              easing: 'sineInOut'
            }).union().repeatForever().start();
          } // 呼吸变色效果 - icon子节点


          if (iconNode) {
            var iconSprite = iconNode.getComponent(Sprite);

            if (iconSprite) {
              // 使用颜色变化代替材质
              tween(iconSprite).to(0.5, {
                color: new Color(100, 255, 100, 255)
              }, {
                easing: 'sineInOut'
              }).to(0.5, {
                color: new Color(255, 255, 255, 255)
              }, {
                easing: 'sineInOut'
              }).union().repeatForever().start();
            }
          } // 呼吸变色效果 - 数字标签


          if (this.remainGoldLbl) {
            tween(this.remainGoldLbl).to(0.5, {
              color: new Color(100, 255, 100, 255)
            }, {
              easing: 'sineInOut'
            }).to(0.5, {
              color: new Color(255, 255, 255, 255)
            }, {
              easing: 'sineInOut'
            }).union().repeatForever().start();
          }
        }
        /**
         * 隐藏解锁提示
         */


        HideUnlockTip() {
          tween(this.node).stop(); // 获取icon子节点（假设goldIcon就是要变色的icon）

          var iconNode = this.node.getChildByName('icon');
          if (iconNode) tween(iconNode).stop(); // 停止数字标签动画

          if (this.remainGoldLbl) {
            tween(this.remainGoldLbl).stop();
            this.remainGoldLbl.color = new Color(255, 255, 255, 255);
          }

          this.node.scale = this.oldNodeScale;
          this.node.getComponent(Sprite).color = new Color(255, 255, 255, 255);
          this.node.getChildByName('icon').getComponent(Sprite).color = new Color(255, 255, 255, 255);
          this.isShowUnlockTip = false;
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
          }
        }

      }, (_descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "initUnlockState", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).NoActive;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "itemType", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).None;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "consumptionType", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemCoin;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "unlockCostValue", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "unlockStages", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "remainGoldLbl", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class5.prototype, "trigger", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class5.prototype, "goldIcon", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class5.prototype, "percent", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class5.prototype, "extraUnlockNode", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class5.prototype, "extraUnlockNodeNeedScale", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class5)) || _class4));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=475dc527c71c4d1759813e3906c4a8c6a90e68a2.js.map