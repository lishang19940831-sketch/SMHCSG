System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, Label, BuildingType, BuildUnlockState, CommonEvent, ObjectType, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _class3, _crd, ccclass, property, GuideStep, GuideConfig, GuideManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBuildingType(extras) {
    _reporterNs.report("BuildingType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildUnlockState(extras) {
    _reporterNs.report("BuildUnlockState", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../Common/CommonEnum", _context.meta, extras);
  }

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
      Node = _cc.Node;
      Vec3 = _cc.Vec3;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      BuildingType = _unresolved_2.BuildingType;
      BuildUnlockState = _unresolved_2.BuildUnlockState;
      CommonEvent = _unresolved_2.CommonEvent;
      ObjectType = _unresolved_2.ObjectType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "dd1bfvNLYhPVrZS12WtOjjP", "GuideManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Sprite', 'UITransform', 'v3', 'Vec2', 'Vec3', 'Label', 'Color']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GuideStep", GuideStep = /*#__PURE__*/function (GuideStep) {
        GuideStep["None"] = "None";
        GuideStep["BoardTrain"] = "BoardTrain1";
        GuideStep["BoardTrain1"] = "BoardTrain2";
        GuideStep["GoToWarehouse"] = "GoToWarehouse";
        GuideStep["GoToWoodWarehouse"] = "GoToWoodWarehouse";
        GuideStep["GoToProductionBuilding"] = "GoToProductionBuilding";
        GuideStep["PickUpPie"] = "PickUpPie";
        GuideStep["GoToPieShop"] = "GoToPieShop";
        GuideStep["PickUpCoin"] = "PickUpCoin";
        GuideStep["UnlockSeller1"] = "UnlockSeller1";
        GuideStep["UnlockSeller2"] = "UnlockSeller2";
        GuideStep["UpgradeTrainToLv2"] = "UpgradeTrainToLv2";
        GuideStep["UpgradeTrainToLv3"] = "UpgradeTrainToLv3";
        GuideStep["UnlockArrowTower1"] = "UnlockArrowTower1";
        GuideStep["UnlockArrowTower2"] = "UnlockArrowTower2";
        GuideStep["UnlockArrowTower3"] = "UnlockArrowTower3";
        GuideStep["UnlockArrowTower4"] = "UnlockArrowTower4";
        GuideStep["ExpandField"] = "ExpandField";
        return GuideStep;
      }({}));

      GuideConfig = {
        [GuideStep.BoardTrain]: {
          endNode: () => {
            return manager.game.trainManager.trainBoardingTrigger.boardingTriggerNode;
          },
          arrowTopHeight: 1.5,
          condition: () => {
            // console.log(`[GuideManager] 检查是否在火车上: ${manager.game.trainManager.trainBoardingTrigger.getIsPlayerOnTrain()}`);
            return !manager.game.trainManager.trainBoardingTrigger.getIsPlayerOnTrain();
          }
        },
        [GuideStep.BoardTrain1]: {
          endNode: () => {
            return manager.game.trainManager.trainBoardingTrigger.boardingTriggerNode;
          },
          arrowTopHeight: 1.5,
          condition: () => {
            //如果火车已经进入了自动状态 则不提示
            return !manager.game.trainManager.trainBoardingTrigger.getIsPlayerOnTrain() && !manager.game.trainManager.getTrain().autoRun;
          }
        },

        /**指引去麦子仓库 */
        [GuideStep.GoToWarehouse]: {
          endNode: () => {
            return manager.game.trainManager.trainUnloadManager.wheatContainer.node;
          },
          // description: "去仓库",
          arrowTopHeight: 1.5,
          condition: () => {
            const hero = manager.game.hero;
            return hero && hero.GetItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemCornKernel) == 0;
          }
        },

        /** 指引去交付麦子 */
        [GuideStep.GoToProductionBuilding]: {
          endNode: () => {
            return manager.game.productionBuilding.productionCollider.node;
          },
          // description: "去仓库",
          arrowTopHeight: 1.5,
          condition: () => {
            const hero = manager.game.hero;
            return hero && hero.GetItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemCornKernel) > 0;
          }
        },
        [GuideStep.PickUpPie]: {
          // 若有专门的大饼容器节点，请在 GameManager 中加入引用并在此替换
          endNode: () => manager.game.productionBuilding.outputContainer.flatbreadContainerCollider.node,
          arrowTopHeight: 1.5,
          condition: () => {
            const hero = manager.game.hero;
            return hero && hero.GetItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemFlatbread) == 0;
          }
        },
        [GuideStep.GoToPieShop]: {
          endNode: () => manager.game.flatbreadShop.ShopCollider.node,
          arrowTopHeight: 1.5,
          condition: () => {
            const hero = manager.game.hero;
            return hero && hero.GetItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemFlatbread) > 0;
          }
        },
        [GuideStep.PickUpCoin]: {
          endNode: () => manager.game.flatbreadShop.CoinContainer.node,
          // description: "拾取商店产出的金币",
          arrowTopHeight: 1.5,
          condition: () => {
            const coinContainer = manager.game.flatbreadShop.CoinContainer;
            return coinContainer && coinContainer.node && coinContainer.node.children.length > 0;
          }
        },
        [GuideStep.UnlockSeller1]: {
          endNode: () => GuideManager.getEndNode((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).Salesperson1),
          arrowTopHeight: 0.35,
          condition: () => {
            const unlockItem = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).Salesperson1);
            return unlockItem && unlockItem.UnlockState == (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
              error: Error()
            }), BuildUnlockState) : BuildUnlockState).Active;
          }
        },
        // [GuideStep.UnlockSeller2]: {
        //     endNode: () => GuideManager.getEndNode(BuildingType.Salesperson2),
        //     arrowTopHeight: 1.5,
        // },
        [GuideStep.UpgradeTrainToLv2]: {
          endNode: () => GuideManager.getEndNode((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).Train1),
          arrowTopHeight: 1.5,
          condition: () => {
            //检查当前火车等级
            const trainLv = manager.game.trainManager.getLevel();

            if (trainLv >= 2) {
              return false;
            }

            return true;
          }
        },
        [GuideStep.UnlockArrowTower1]: {
          endNode: () => {
            return GuideManager.getEndNode((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).ArrowTower);
          },
          // description: "解锁箭塔1，攻击敌人",
          arrowTopHeight: 1.5,
          condition: () => {
            const unlockItem = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).ArrowTower);
            return unlockItem && unlockItem.UnlockState == (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
              error: Error()
            }), BuildUnlockState) : BuildUnlockState).Active;
          }
        },
        [GuideStep.GoToWoodWarehouse]: {
          endNode: () => {
            return manager.game.trainManager.trainUnloadManager.woodContainer.node;
          },
          // description: "去仓库",
          arrowTopHeight: 1.5,
          condition: () => {
            const hero = manager.game.hero;
            return hero && hero.GetItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemWood) == 0;
          }
        },
        [GuideStep.UnlockArrowTower2]: {
          endNode: () => GuideManager.getEndNode((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).ArrowTower1),
          arrowTopHeight: 1.5,
          condition: () => {
            const unlockItem = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).ArrowTower1);
            return unlockItem && unlockItem.UnlockState == (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
              error: Error()
            }), BuildUnlockState) : BuildUnlockState).Active;
          }
        },
        [GuideStep.UpgradeTrainToLv3]: {
          endNode: () => GuideManager.getEndNode((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).Train2),
          arrowTopHeight: 1.5,
          condition: () => {
            //检查当前火车等级
            const trainLv = manager.game.trainManager.getLevel();

            if (trainLv >= 3) {
              return false;
            }

            return true;
          }
        },
        [GuideStep.UnlockArrowTower3]: {
          endNode: () => GuideManager.getEndNode((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).ArrowTower2),
          arrowTopHeight: 1.5,
          condition: () => {
            const unlockItem = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).ArrowTower2);
            return unlockItem && unlockItem.UnlockState == (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
              error: Error()
            }), BuildUnlockState) : BuildUnlockState).Active;
          }
        },
        [GuideStep.UnlockArrowTower4]: {
          // 如需第四座箭塔，请在 BuildingType 中新增并在此替换
          endNode: () => GuideManager.getEndNode((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).ArrowTower3),
          arrowTopHeight: 1.5,
          condition: () => {
            const unlockItem = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).ArrowTower3);
            return unlockItem && unlockItem.UnlockState == (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
              error: Error()
            }), BuildUnlockState) : BuildUnlockState).Active;
          }
        },
        [GuideStep.ExpandField]: {
          endNode: () => GuideManager.getEndNode((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).EndGame),
          arrowTopHeight: 1.5,
          condition: () => {
            const unlockItem = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).EndGame);
            return unlockItem && unlockItem.UnlockState == (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
              error: Error()
            }), BuildUnlockState) : BuildUnlockState).Active;
          }
        }
      };

      _export("GuideManager", GuideManager = (_dec = ccclass('GuideManager'), _dec2 = property({
        type: Node,
        displayName: '顶部箭头'
      }), _dec3 = property({
        type: Node,
        displayName: '箭头'
      }), _dec4 = property({
        type: Node,
        displayName: '箭头1'
      }), _dec5 = property({
        type: Node,
        displayName: 'NavLine根节点',
        tooltip: '可选：挂有 NavLineComp 的节点'
      }), _dec6 = property({
        type: Node,
        displayName: '引导文字节点'
      }), _dec7 = property({
        type: Label,
        displayName: '引导文字'
      }), _dec8 = property({
        type: Node,
        displayName: '快速引导节点'
      }), _dec(_class = (_class2 = (_class3 = class GuideManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "arrowTop", _descriptor, this);

          _initializerDefineProperty(this, "arrow", _descriptor2, this);

          _initializerDefineProperty(this, "arrow1", _descriptor3, this);

          _initializerDefineProperty(this, "navLineRoot", _descriptor4, this);

          _initializerDefineProperty(this, "guideTextNode", _descriptor5, this);

          _initializerDefineProperty(this, "guideLabel", _descriptor6, this);

          _initializerDefineProperty(this, "quickGuideNode", _descriptor7, this);

          this._isShowArrow = false;
          this._isShowGuide = false;
          this._startNode = null;
          this._endNode = null;

          /** 当前引导步骤 */
          this._currentStep = GuideStep.None;

          /** 当前引导配置 */
          this._currentConfig = null;

          /** 引导开始时间 */
          this._guideStartTime = 0;

          /** 引导超时时间（毫秒） */
          this.GUIDE_TIMEOUT = 30000;

          /** 检查间隔（毫秒） */
          this.CHECK_INTERVAL = 100;

          /** 上次检查时间 */
          this._lastCheckTime = 0;

          /** 无操作计时器 */
          this._noActionTimer = 0;

          /** 无操作超时时间（秒） */
          this.NO_ACTION_TIMEOUT = 5;
          // 5秒无操作后触发引导

          /** 箭头目标刷新间隔（毫秒） */
          this.ARROW_TARGET_REFRESH_INTERVAL = 500;
          // 每0.5秒刷新一次箭头目标

          /** 上次箭头目标刷新时间 */
          this._lastArrowRefreshTime = 0;
        }

        /** 获取单例实例 */
        static get instance() {
          return this._instance;
        }

        /** 初始化单例，提供更安全的初始化方式 */
        static initInstance(instance) {
          if (this._instance) {
            instance.node.destroy();
            return;
          }

          this._instance = instance;
        }

        onLoad() {
          // 使用改进的单例初始化方法
          GuideManager.initInstance(this);
          if (GuideManager._instance !== this) return;
          this.hideArrow();
          this.hideGuideText();
          this.hideQuickGuide(); // 确保顶部箭头初始状态为隐藏

          if (this.arrowTop) {
            this.arrowTop.active = false;
          } // 延迟注册事件，确保其他管理器已初始化


          this.scheduleOnce(() => {
            this.registerEvents();
            console.log('[GuideManager] 引导管理器初始化完成');
          }, 0.1);
        }

        onDestroy() {
          if (GuideManager._instance === this) {
            GuideManager._instance = null;
          }

          app.event.offAllByTarget(this);
        }

        update(dt) {
          const currentTime = Date.now();

          if (this._isShowArrow) {
            // 定期刷新箭头目标（endNode），确保箭头始终指向正确的目标
            if (currentTime - this._lastArrowRefreshTime >= this.ARROW_TARGET_REFRESH_INTERVAL) {
              this.refreshArrowTarget();
              this._lastArrowRefreshTime = currentTime;
            }

            this.updateArrowPosition();
          } // 更新无操作计时器


          this._noActionTimer += dt; // 定期检查引导状态（降低检查频率以优化性能）

          if (currentTime - this._lastCheckTime >= this.CHECK_INTERVAL) {
            this.checkGuideState();
            this._lastCheckTime = currentTime;
          } // 检查引导超时


          if (this._isShowGuide && currentTime - this._guideStartTime >= this.GUIDE_TIMEOUT) {
            this.completeCurrentGuide();
          }
        }
        /** 刷新箭头目标节点 */


        refreshArrowTarget() {
          if (!this._currentConfig) return;

          try {
            // 重新获取endNode
            const newEndNode = typeof this._currentConfig.endNode === 'function' ? this._currentConfig.endNode() : this._currentConfig.endNode; // 如果endNode发生了变化，更新引用

            if (newEndNode && newEndNode !== this._endNode) {
              this._endNode = newEndNode; //console.log(`[GuideManager] 箭头目标已刷新: ${this._currentStep}`);
            } else if (!newEndNode && this._endNode) {// 如果新的endNode为null，但之前有endNode，说明目标消失了
              //console.warn(`[GuideManager] 箭头目标节点消失: ${this._currentStep}`);
            }
          } catch (error) {//console.error('[GuideManager] 刷新箭头目标时出错:', error);
          }
        }

        updateArrowPosition() {
          if (!this._startNode || !this._endNode) return;
          const startWPosY = manager.game.calculateGroundHeight(this._startNode.getWorldPosition());

          const startWPos = this._startNode.getWorldPosition();

          startWPos.y = startWPosY + 0.05;
          const endWPosY = manager.game.calculateGroundHeight(this._endNode.getWorldPosition());

          const endWPos = this._endNode.getWorldPosition();

          endWPos.y = endWPosY + 0.05;
          this.updateArrow(startWPos, endWPos);
        }

        updateArrow(startWPos, endWPos) {
          var _this$_currentConfig;

          if (!this._isShowArrow) return;
          const distance = Vec3.distance(startWPos, endWPos);
          this.arrow.active = true;
          this.arrow1.active = false;
          this.arrowTop.active = true;
          const topArrowPos = endWPos.clone();
          let arrowHeight = ((_this$_currentConfig = this._currentConfig) == null ? void 0 : _this$_currentConfig.arrowTopHeight) || 2;
          topArrowPos.y += arrowHeight;
          this.arrowTop.setWorldPosition(topArrowPos);
          this.arrow.setWorldPosition(startWPos);
          this.arrow.lookAt(endWPos);
          this.arrow1.setWorldPosition(startWPos);
          this.arrow1.lookAt(endWPos); // if (this.arrowSprite && this.arrowSprite.node && this.arrowSprite.node.isValid) {
          //     const scale = this.arrowSprite.node.scale.y;
          //     const ui = this.arrowSprite.node.getComponent(UITransform);
          //     ui && (ui.height = distance / scale);
          // }

          if (this.navLineRoot && this.navLineRoot.isValid) {
            const navComp = this.navLineRoot.getComponent('NavLineComp');

            if (navComp && typeof navComp.setDistance === 'function') {
              navComp.setDistance(distance);
            }
          }
        }

        showArrow(startNode, endNode) {
          if (!startNode || !endNode) {
            //console.error('startNode or endNode is null');
            return;
          }

          this._isShowArrow = true;
          this._startNode = startNode;
          this._endNode = endNode; // 重置箭头目标刷新计时器

          this._lastArrowRefreshTime = Date.now(); // 初始状态下隐藏两个箭头，让updateArrow根据距离决定显示哪个

          this.arrow.active = false;
          this.arrow1.active = false;
          this.arrowTop.active = false;

          if (this.navLineRoot && this.navLineRoot.isValid) {
            const navComp = this.navLineRoot.getComponent('NavLineComp');

            if (navComp && typeof navComp.show === 'function') {
              navComp.show();
            }
          }
        }

        hideArrow() {
          this._isShowArrow = false;
          this._startNode = null;
          this._endNode = null; // 重置箭头目标刷新计时器

          this._lastArrowRefreshTime = 0;
          this.arrow.active = false;
          this.arrow1.active = false;
          this.arrowTop.active = false;

          if (this.navLineRoot && this.navLineRoot.isValid) {
            const navComp = this.navLineRoot.getComponent('NavLineComp');

            if (navComp && typeof navComp.stop === 'function') {
              navComp.stop();
            }
          }
        }

        showGuideText(text) {
          if (!this.guideTextNode || !this.guideLabel) return;
          this.guideLabel.string = text;
          this.guideTextNode.active = true;
          this._isShowGuide = true;
          this._guideStartTime = Date.now();
        }

        hideGuideText() {
          if (this.guideTextNode) {
            this.guideTextNode.active = false;
          }

          this._isShowGuide = false;
        }

        showQuickGuide() {
          if (this.quickGuideNode) {
            this.quickGuideNode.active = true;
          }
        }

        hideQuickGuide() {
          if (this.quickGuideNode) {
            this.quickGuideNode.active = false;
          }
        }
        /** 注册事件监听 */


        registerEvents() {
          // 监听游戏开始事件（第一次玩家输入）
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).joystickInput, this.onGameStart, this); // 监听英雄移动事件，重置无操作计时器

          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).HerMove, this.onHeroMove, this); // 监听英雄受伤事件

          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).HeroHurt, this.onHeroHurt, this); // 监听敌人死亡事件

          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).EnemyDeadFinish, this.onEnemyDead, this); // 监听拾取金币事件

          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).PickupCoin, this.onPickupCoin, this); // 监听解锁完成事件

          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).UnlockItem, this.onUnlockItem, this); // 监听引导物品位置更新事件

          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).UpdateGuideItemPosition, this.onUpdateGuideItemPosition, this); // 监听商店交付事件

          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).UpdateHeroItemCount, this.onHeroItemCountUpdate, this); // 监听kill enemy事件

          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).KillEnemy, this.onKillEnemy, this);
        }
        /** 杀怪事件处理 */


        onKillEnemy() {
          this._noActionTimer = 0; // if (this._currentStep === GuideStep.KillEnemy) {
          //     this.completeCurrentGuide();
          // }
        }
        /** 游戏开始事件处理（第一次玩家输入） */


        onGameStart() {
          // console.log('[GuideManager] 检测到游戏开始，检查引导触发');
          // 立即检查一次引导，不需要等待无操作超时
          this.scheduleOnce(() => {
            this._noActionTimer = this.NO_ACTION_TIMEOUT; // 设置为超时状态

            this.checkGuideState();
          }, 0.1);
        }
        /** 英雄移动事件处理 */


        onHeroMove() {
          this._noActionTimer = 0;
        }
        /** 英雄受伤事件处理 */


        onHeroHurt() {
          this._noActionTimer = 0;
        }
        /** 敌人死亡事件处理 */


        onEnemyDead() {
          this._noActionTimer = 0;
        }
        /** 拾取金币事件处理 */


        onPickupCoin() {
          this._noActionTimer = 0;

          if (this._currentStep === GuideStep.PickUpCoin) {
            this.completeCurrentGuide();
          }
        }
        /** 解锁完成事件处理 */


        onUnlockItem(buildingType) {
          this._noActionTimer = 0; // 映射建筑类型到引导步骤

          const buildingToGuideMap = {
            [(_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).ArrowTower]: GuideStep.UnlockArrowTower1,
            [(_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).ArrowTower1]: GuideStep.UnlockArrowTower2,
            [(_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).ArrowTower2]: GuideStep.UnlockArrowTower3,
            [(_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).ArrowTower3]: GuideStep.UnlockArrowTower4,
            [(_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).Salesperson1]: GuideStep.UnlockSeller1,
            [(_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).Salesperson2]: GuideStep.UnlockSeller2,
            [(_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).Train1]: GuideStep.UpgradeTrainToLv2,
            [(_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).Train2]: GuideStep.UpgradeTrainToLv2,
            [(_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).EndGame]: GuideStep.ExpandField
          };
          const expectedStep = buildingToGuideMap[buildingType];

          if (expectedStep && this._currentStep === expectedStep) {
            //console.log(`[GuideManager] 解锁完成，自动完成引导: ${expectedStep}`);
            this.completeCurrentGuide();
          }
        }
        /** 引导物品位置更新事件处理 */


        onUpdateGuideItemPosition() {
          if (this._isShowArrow && this._currentConfig) {
            this.updateGuideArrow();
          }
        }
        /** 英雄物品数量更新事件处理 */


        onHeroItemCountUpdate(data) {
          this._noActionTimer = 0; // if (data.type === ObjectType.DropItemCornKernel && this._currentStep === GuideStep.GoToWarehouse) {
          //     if (data.count >= 5) {
          //         this.completeCurrentGuide();
          //     }
          // }
          // if (data.type === ObjectType.DropItemMeat && this._currentStep === GuideStep.GoToShop) {
          //     // 这里可以添加更精确的逻辑来判断是否是交付行为
          //     // 暂时通过数量变化来触发检查
          //     this.checkCurrentGuideComplete();
          // }
        }
        /** 检查引导状态 */


        checkGuideState() {
          if (this._currentStep !== GuideStep.None) {
            // 检查当前引导是否完成
            if (this.checkCurrentGuideComplete()) {
              this.completeCurrentGuide();
              return;
            }
          } // 检查是否需要触发新的引导


          if (this._noActionTimer >= this.NO_ACTION_TIMEOUT) {
            this.tryTriggerGuide();
          }
        }
        /** 检查当前引导是否完成 */


        checkCurrentGuideComplete() {
          if (!this._currentConfig) return false;
          const hero = manager.game.hero;
          if (!hero) return false;

          switch (this._currentStep) {
            case GuideStep.BoardTrain:
              // hero 进入火车完成
              return manager.game.trainManager.trainBoardingTrigger.getIsPlayerOnTrain();

            case GuideStep.BoardTrain1:
              // hero 进入火车完成
              return manager.game.trainManager.trainBoardingTrigger.getIsPlayerOnTrain();

            case GuideStep.GoToProductionBuilding:
              // 生产建筑交付引导：麦子数量减少（从有到无）
              const currentCornCount = hero.GetItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                error: Error()
              }), ObjectType) : ObjectType).DropItemCornKernel);
              return currentCornCount === 0;
            // 麦子已交付

            case GuideStep.PickUpCoin:
              // 拾取金币引导：通过事件触发，这里作为备用检查
              return hero.GetItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                error: Error()
              }), ObjectType) : ObjectType).DropItemCoin) > 0;

            case GuideStep.GoToWarehouse:
              // 去仓库引导：通过事件触发，这里作为备用检查
              return hero.GetItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                error: Error()
              }), ObjectType) : ObjectType).DropItemCornKernel) > 0;

            case GuideStep.PickUpPie:
              // 拾取大饼引导：通过事件触发，这里作为备用检查
              return hero.GetItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                error: Error()
              }), ObjectType) : ObjectType).DropItemFlatbread) > 0;

            case GuideStep.GoToPieShop:
              // 生产建筑交付引导：麦子数量减少（从有到无）
              const currentFlatbreadCount = hero.GetItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                error: Error()
              }), ObjectType) : ObjectType).DropItemFlatbread);
              return currentFlatbreadCount === 0;
            // 大饼已交付

            case GuideStep.UnlockSeller1:
              //检查是否激活对应的售货员
              return manager.game.salesman1.salesman.getIsActive();

            case GuideStep.UnlockSeller2:
              //检查是否激活对应的售货员
              return manager.game.salesman1.salesman.getIsActive();

            case GuideStep.GoToWoodWarehouse:
              return hero.GetItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                error: Error()
              }), ObjectType) : ObjectType).DropItemWood) > 0;

            case GuideStep.UpgradeTrainToLv2:
              //检查是否升级到火车Lv2
              return manager.game.trainManager.getLevel() === 2;

            case GuideStep.UpgradeTrainToLv3:
              //检查是否升级到火车Lv3
              return manager.game.trainManager.getLevel() === 3;

            case GuideStep.UnlockArrowTower1:
              //检查 箭塔1是否已解锁
              const ufoUnlockItem1 = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
                error: Error()
              }), BuildingType) : BuildingType).ArrowTower);
              return (ufoUnlockItem1 == null ? void 0 : ufoUnlockItem1.unlockState) === "Unlocked";

            case GuideStep.UnlockArrowTower2:
              //检查 箭塔2是否已解锁
              const ufoUnlockItem2 = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
                error: Error()
              }), BuildingType) : BuildingType).ArrowTower1);
              return (ufoUnlockItem2 == null ? void 0 : ufoUnlockItem2.unlockState) === "Unlocked";

            case GuideStep.UnlockArrowTower3:
              //检查 箭塔3是否已解锁
              const ufoUnlockItem3 = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
                error: Error()
              }), BuildingType) : BuildingType).ArrowTower2);
              return (ufoUnlockItem3 == null ? void 0 : ufoUnlockItem3.unlockState) === "Unlocked";

            case GuideStep.UnlockArrowTower4:
              //检查 箭塔4是否已解锁
              const ufoUnlockItem4 = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
                error: Error()
              }), BuildingType) : BuildingType).ArrowTower3);
              return (ufoUnlockItem4 == null ? void 0 : ufoUnlockItem4.unlockState) === "Unlocked";

            case GuideStep.ExpandField:
              const ufoUnlockItem = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
                error: Error()
              }), BuildingType) : BuildingType).EndGame);
              return (ufoUnlockItem == null ? void 0 : ufoUnlockItem.unlockState) === "Unlocked";

            default:
              return false;
          }
        }
        /** 主动检查并触发引导（供外部调用） */


        checkAndTriggerGuide() {
          //console.log('[GuideManager] 主动检查引导触发');
          this.tryTriggerGuide();
        }
        /** 手动刷新箭头目标（供外部调用） */


        refreshArrowTargetManually() {
          if (this._isShowArrow && this._currentConfig) {
            //console.log('[GuideManager] 手动刷新箭头目标');
            this.refreshArrowTarget();
          }
        }
        /** 尝试触发引导 */


        tryTriggerGuide() {
          try {
            // 检查游戏状态，确保游戏已经开始
            if (!manager.game || !manager.game.hero) {
              console.log('[GuideManager] 游戏尚未准备好，跳过引导触发');
              return;
            } // 按优先级检查每个引导步骤


            const guideSteps = [GuideStep.BoardTrain, GuideStep.GoToWarehouse, GuideStep.GoToProductionBuilding, GuideStep.PickUpPie, GuideStep.GoToPieShop, GuideStep.PickUpCoin, GuideStep.UnlockSeller1, // GuideStep.UnlockSeller2,
            GuideStep.UpgradeTrainToLv2, GuideStep.BoardTrain1, GuideStep.GoToWoodWarehouse, GuideStep.UnlockArrowTower1, GuideStep.UnlockArrowTower2, GuideStep.UpgradeTrainToLv3, GuideStep.UnlockArrowTower3, GuideStep.UnlockArrowTower4, GuideStep.ExpandField];

            for (const step of guideSteps) {
              if (this.canTriggerGuide(step)) {
                // console.log(`[GuideManager] 触发引导: ${step}`);
                this.startGuide(step);
                break;
              }
            }
          } catch (error) {//console.error('[GuideManager] 尝试触发引导时出错:', error);
          }
        }
        /** 检查是否可以触发指定引导 */


        canTriggerGuide(step) {
          if (GuideManager.isGuideFinished(step)) {
            // console.log(`[GuideManager] 引导步骤 ${step} 已完成，跳过`);
            return false;
          }

          const config = GuideConfig[step];

          if (!config) {
            // console.log(`[GuideManager] 引导步骤 ${step} 配置不存在`);
            return false;
          } // 检查条件


          if (config.condition) {
            const conditionResult = config.condition(); // console.log(`[GuideManager] 引导步骤 ${step} 条件检查结果: ${conditionResult}`);

            if (!conditionResult) return false;
          } // console.log(`[GuideManager] 引导步骤 ${step} 可以触发`);


          return true;
        }
        /** 开始指定引导 */


        startGuide(step) {
          if (this._currentStep !== GuideStep.None) return;
          const config = GuideConfig[step];
          if (!config) return; // 检查目标节点是否存在

          const endNode = typeof config.endNode === 'function' ? config.endNode() : config.endNode;

          if (!endNode) {
            //    console.warn(`[GuideManager] 引导步骤 ${step} 的目标节点不存在`);
            return;
          }

          this._currentStep = step;
          this._currentConfig = config;
          this._noActionTimer = 0; // 显示引导文字

          if (config.description) {
            this.showGuideText(config.description);
          } // 显示引导箭头


          this.updateGuideArrow(); // 显示快速引导

          this.showQuickGuide(); // console.log(`[GuideManager] 开始引导: ${step}`);
        }
        /** 更新引导箭头 */


        updateGuideArrow() {
          if (!this._currentConfig) return;
          const startNode = manager.game.hero.node;
          const endNode = typeof this._currentConfig.endNode === 'function' ? this._currentConfig.endNode() : this._currentConfig.endNode;

          if (startNode && endNode) {
            this.showArrow(startNode, endNode); // 立即执行一次箭头目标刷新，确保获取最新目标

            this.refreshArrowTarget();
          }
        }
        /** 完成当前引导 */


        completeCurrentGuide() {
          var _this$_currentConfig2;

          if (this._currentStep === GuideStep.None) return; //console.log(`[GuideManager] 完成引导: ${this._currentStep}`);
          // 标记引导完成

          GuideManager.finishMap.set(this._currentStep, true); // 执行完成回调

          if ((_this$_currentConfig2 = this._currentConfig) != null && _this$_currentConfig2.onComplete) {
            this._currentConfig.onComplete();
          } // 隐藏引导元素


          this.hideArrow();
          this.hideGuideText();
          this.hideQuickGuide(); // 重置状态

          this._currentStep = GuideStep.None;
          this._currentConfig = null;
          this._noActionTimer = 0;
        }
        /** 强制完成当前引导 */


        forceCompleteGuide() {
          this.completeCurrentGuide();
        }
        /** 跳过所有引导 */


        skipAllGuides() {
          // 标记所有引导为已完成
          Object.values(GuideStep).forEach(step => {
            if (step !== GuideStep.None) {
              GuideManager.finishMap.set(step, true);
            }
          }); // 隐藏所有引导元素

          this.hideArrow();
          this.hideGuideText();
          this.hideQuickGuide(); // 重置状态

          this._currentStep = GuideStep.None;
          this._currentConfig = null;
        }
        /**
         * 获取当前砍树目标
         * @returns 当前砍树目标的节点
         */


        static getCurrTree() {
          try {
            if (!manager.game || !manager.game.hero || !manager.tree) {
              //console.warn('[GuideManager] 无法获取砍树目标：游戏组件未准备好');
              return null;
            }

            const heroNode = manager.game.hero.node;

            if (!heroNode) {
              //console.warn('[GuideManager] 无法获取砍树目标：英雄节点不存在');
              return null;
            }

            const nearestTree = manager.tree.getNearestTree(heroNode.getWorldPosition());
            return nearestTree ? nearestTree.node : null;
          } catch (error) {
            //console.error('[GuideManager] 获取砍树目标时出错:', error);
            return null;
          }
        }
        /** 检查引导是否已完成 */


        static isGuideFinished(step) {
          return GuideManager.finishMap.get(step) || false;
        }
        /** 获取当前引导步骤 */


        get currentStep() {
          return this._currentStep;
        }
        /** 获取当前引导配置 */


        get currentConfig() {
          return this._currentConfig;
        }
        /** 获取引导完成状态（深拷贝） */


        static getGuideFinishState() {
          return new Map(GuideManager.finishMap);
        }
        /** 重置引导状态 */


        static resetGuideState() {
          GuideManager.finishMap.clear();
        }
        /** 设置引导完成状态 */


        static setGuideFinished(step, finished) {
          if (finished) {
            GuideManager.finishMap.set(step, true);
          } else {
            GuideManager.finishMap.delete(step);
          }
        }
        /** 检查金币是否足够解锁 */


        static checkGoldEnoughForUnlock(buildingType) {
          var _manager$game$unlockI;

          const hero = manager.game.hero;
          const coinCount = hero ? hero.GetItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemCoin) : 0;
          const unlockItem = ((_manager$game$unlockI = manager.game.unlockItemMap.get(buildingType)) == null ? void 0 : _manager$game$unlockI.getDisplayRemainGold()) || 0;
          return coinCount >= unlockItem;
        }
        /** 检查木头足够解锁 */


        static checkWoodEnoughForUnlock(buildingType) {
          var _manager$game$unlockI2;

          const hero = manager.game.hero;
          const woodCount = hero ? hero.GetItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemWood) : 0;
          const unlockItem = ((_manager$game$unlockI2 = manager.game.unlockItemMap.get(buildingType)) == null ? void 0 : _manager$game$unlockI2.getDisplayRemainGold()) || 0;
          return woodCount >= unlockItem;
        }

        static getEndNode(buildingType) {
          const unlockItem = manager.game.unlockItemMap.get(buildingType);

          if (unlockItem) {
            const hero = manager.game.hero;
            const coinCount = hero ? hero.GetItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemCoin) : 0;

            if (coinCount > 0 || GuideManager.checkGoldEnoughForUnlock(buildingType)) {
              return unlockItem.node;
            } else {
              const woodCount = hero ? hero.GetItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                error: Error()
              }), ObjectType) : ObjectType).DropItemWood) : 0;

              if (woodCount > 0 || GuideManager.checkWoodEnoughForUnlock(buildingType)) {
                return unlockItem.node;
              }

              return null;

              if (manager.game.hero.GetItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                error: Error()
              }), ObjectType) : ObjectType).DropItemWood) > 0) {
                return manager.game.woodStore.TriggerStateNode;
              } else {
                if (manager.game.meatShop.CoinContainer.getCount() > 0) {
                  return manager.game.meatShop.CoinContainer.node;
                } else {
                  const meatCount = hero ? hero.GetItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
                    error: Error()
                  }), ObjectType) : ObjectType).DropItemMeat) : 0;

                  if (meatCount > 0) {
                    const unlockItem = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
                      error: Error()
                    }), BuildingType) : BuildingType).ArrowTower);

                    if (unlockItem.UnlockState == (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
                      error: Error()
                    }), BuildUnlockState) : BuildUnlockState).Unlocked) {
                      return unlockItem.node;
                    } else {
                      return GuideManager.getCurrTree();
                    }
                  } else {
                    return manager.enemy.getRandomEnemy();
                  }
                }
              }
            }
          }

          return null;
        }

      }, _class3._instance = null, _class3.finishMap = new Map(), _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "arrowTop", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "arrow", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "arrow1", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "navLineRoot", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "guideTextNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "guideLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "quickGuideNode", [_dec8], {
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
//# sourceMappingURL=760c4c93594269d1c3ef7e103675967314b74627.js.map