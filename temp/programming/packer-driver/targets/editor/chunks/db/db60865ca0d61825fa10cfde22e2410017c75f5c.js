System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, geometry, PhysicsSystem, Vec3, Node, instantiate, game, ParticleSystem, tween, Hero, BuildingType, BuildUnlockState, CommonEvent, GameResult, ObjectType, PHY_GROUP, ShopCommon, TrainManager, TrainLevel, ConveyorBelt, super_html_playable, SpecialCustomer, ProductionBuilding, BuildingSalesman, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _class3, _crd, ccclass, property, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfUnlockItem(extras) {
    _reporterNs.report("UnlockItem", "../Building/UnlockItem", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHero(extras) {
    _reporterNs.report("Hero", "../Role/Hero", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildingType(extras) {
    _reporterNs.report("BuildingType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildUnlockState(extras) {
    _reporterNs.report("BuildUnlockState", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameResult(extras) {
    _reporterNs.report("GameResult", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPHY_GROUP(extras) {
    _reporterNs.report("PHY_GROUP", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfShopCommon(extras) {
    _reporterNs.report("ShopCommon", "../Building/ShopCommon", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTrainManager(extras) {
    _reporterNs.report("TrainManager", "../Train/TrainManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTrainLevel(extras) {
    _reporterNs.report("TrainLevel", "../Train/TrainManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConveyorBelt(extras) {
    _reporterNs.report("ConveyorBelt", "../Building/ConveyorBelt", _context.meta, extras);
  }

  function _reportPossibleCrUseOfsuper_html_playable(extras) {
    _reporterNs.report("super_html_playable", "../../super_html_playable", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSpecialCustomer(extras) {
    _reporterNs.report("SpecialCustomer", "../Building/SpecialCustomer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfProductionBuilding(extras) {
    _reporterNs.report("ProductionBuilding", "../Building/ProductionBuilding", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildingSalesman(extras) {
    _reporterNs.report("BuildingSalesman", "../Building/BuildingSalesman", _context.meta, extras);
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
      geometry = _cc.geometry;
      PhysicsSystem = _cc.PhysicsSystem;
      Vec3 = _cc.Vec3;
      Node = _cc.Node;
      instantiate = _cc.instantiate;
      game = _cc.game;
      ParticleSystem = _cc.ParticleSystem;
      tween = _cc.tween;
    }, function (_unresolved_2) {
      Hero = _unresolved_2.Hero;
    }, function (_unresolved_3) {
      BuildingType = _unresolved_3.BuildingType;
      BuildUnlockState = _unresolved_3.BuildUnlockState;
      CommonEvent = _unresolved_3.CommonEvent;
      GameResult = _unresolved_3.GameResult;
      ObjectType = _unresolved_3.ObjectType;
      PHY_GROUP = _unresolved_3.PHY_GROUP;
    }, function (_unresolved_4) {
      ShopCommon = _unresolved_4.ShopCommon;
    }, function (_unresolved_5) {
      TrainManager = _unresolved_5.TrainManager;
      TrainLevel = _unresolved_5.TrainLevel;
    }, function (_unresolved_6) {
      ConveyorBelt = _unresolved_6.ConveyorBelt;
    }, function (_unresolved_7) {
      super_html_playable = _unresolved_7.default;
    }, function (_unresolved_8) {
      SpecialCustomer = _unresolved_8.SpecialCustomer;
    }, function (_unresolved_9) {
      ProductionBuilding = _unresolved_9.ProductionBuilding;
    }, function (_unresolved_10) {
      BuildingSalesman = _unresolved_10.BuildingSalesman;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "fa5bfCyByVNMpqvlNcMeMIy", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'geometry', 'PhysicsSystem', 'Vec2', 'Vec3', 'Node', 'Prefab', 'NodePool', 'instantiate', 'Collider', 'ITriggerEvent', 'game', 'EPhysicsDrawFlags', 'ParticleSystem', 'tween']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property({
        type: _crd && Hero === void 0 ? (_reportPossibleCrUseOfHero({
          error: Error()
        }), Hero) : Hero,
        displayName: '英雄'
      }), _dec3 = property({
        type: Node,
        displayName: '掉落层'
      }), _dec4 = property({
        type: Node,
        displayName: '地图层'
      }), _dec5 = property({
        type: _crd && ShopCommon === void 0 ? (_reportPossibleCrUseOfShopCommon({
          error: Error()
        }), ShopCommon) : ShopCommon,
        displayName: '木头商店'
      }), _dec6 = property({
        type: _crd && ShopCommon === void 0 ? (_reportPossibleCrUseOfShopCommon({
          error: Error()
        }), ShopCommon) : ShopCommon,
        displayName: '肉商店'
      }), _dec7 = property({
        type: _crd && ShopCommon === void 0 ? (_reportPossibleCrUseOfShopCommon({
          error: Error()
        }), ShopCommon) : ShopCommon,
        displayName: '木材仓库'
      }), _dec8 = property({
        type: Node,
        displayName: '主角最后移动位置点'
      }), _dec9 = property({
        type: Node,
        displayName: 'Boss位置点'
      }), _dec10 = property({
        type: Node,
        displayName: '摄像机开始目标点'
      }), _dec11 = property({
        type: Node,
        displayName: '结束节点'
      }), _dec12 = property({
        type: Node,
        displayName: '节点1'
      }), _dec13 = property({
        type: Node,
        displayName: '节点2'
      }), _dec14 = property({
        type: Node,
        displayName: '升级特效'
      }), _dec15 = property({
        type: Node,
        displayName: 'enemyEndPosNode'
      }), _dec16 = property({
        type: Node,
        displayName: 'targetWall'
      }), _dec17 = property({
        type: _crd && TrainManager === void 0 ? (_reportPossibleCrUseOfTrainManager({
          error: Error()
        }), TrainManager) : TrainManager,
        displayName: '火车管理器'
      }), _dec18 = property({
        type: _crd && ConveyorBelt === void 0 ? (_reportPossibleCrUseOfConveyorBelt({
          error: Error()
        }), ConveyorBelt) : ConveyorBelt,
        displayName: '传送带节点'
      }), _dec19 = property({
        type: _crd && SpecialCustomer === void 0 ? (_reportPossibleCrUseOfSpecialCustomer({
          error: Error()
        }), SpecialCustomer) : SpecialCustomer,
        displayName: '特殊客户节点'
      }), _dec20 = property({
        type: _crd && ProductionBuilding === void 0 ? (_reportPossibleCrUseOfProductionBuilding({
          error: Error()
        }), ProductionBuilding) : ProductionBuilding,
        displayName: 'ProductionBuilding'
      }), _dec21 = property({
        type: _crd && ShopCommon === void 0 ? (_reportPossibleCrUseOfShopCommon({
          error: Error()
        }), ShopCommon) : ShopCommon,
        displayName: '大饼商店'
      }), _dec22 = property({
        type: _crd && BuildingSalesman === void 0 ? (_reportPossibleCrUseOfBuildingSalesman({
          error: Error()
        }), BuildingSalesman) : BuildingSalesman,
        displayName: '售货员1'
      }), _dec23 = property({
        type: _crd && BuildingSalesman === void 0 ? (_reportPossibleCrUseOfBuildingSalesman({
          error: Error()
        }), BuildingSalesman) : BuildingSalesman,
        displayName: '售货员2'
      }), _dec24 = property({
        type: Node,
        displayName: '解锁节点 摄像机移动专用'
      }), _dec25 = property({
        type: Node,
        displayName: '特效层节点'
      }), _dec26 = property({
        type: [Node],
        displayName: 'TreeNode扩张数组'
      }), _dec27 = property({
        type: Node,
        displayName: '火车升级特效节点'
      }), _dec28 = property({
        type: Node,
        displayName: '扩张特效节点'
      }), _dec29 = property({
        type: Node,
        displayName: '箭塔1特效节点'
      }), _dec30 = property({
        type: Node,
        displayName: '箭塔2特效节点'
      }), _dec31 = property({
        type: Node,
        displayName: '箭塔3特效节点'
      }), _dec32 = property({
        type: Node,
        displayName: '箭塔4特效节点'
      }), _dec33 = property({
        type: Node,
        displayName: '售货员1特效节点'
      }), _dec34 = property({
        type: Node,
        displayName: '售货员2特效节点'
      }), _dec(_class = (_class2 = (_class3 = class GameManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "hero", _descriptor, this);

          _initializerDefineProperty(this, "dropLayer", _descriptor2, this);

          _initializerDefineProperty(this, "gamelayer", _descriptor3, this);

          _initializerDefineProperty(this, "woodShop", _descriptor4, this);

          _initializerDefineProperty(this, "meatShop", _descriptor5, this);

          _initializerDefineProperty(this, "woodStore", _descriptor6, this);

          _initializerDefineProperty(this, "heroLastMovePos", _descriptor7, this);

          _initializerDefineProperty(this, "bossPos", _descriptor8, this);

          _initializerDefineProperty(this, "cameraStartTargetPos", _descriptor9, this);

          _initializerDefineProperty(this, "endNode", _descriptor10, this);

          _initializerDefineProperty(this, "endNode1", _descriptor11, this);

          _initializerDefineProperty(this, "endNode2", _descriptor12, this);

          _initializerDefineProperty(this, "upgradeEffects", _descriptor13, this);

          _initializerDefineProperty(this, "enemyEndPosNode", _descriptor14, this);

          _initializerDefineProperty(this, "targetWallNodes", _descriptor15, this);

          _initializerDefineProperty(this, "trainManager", _descriptor16, this);

          _initializerDefineProperty(this, "conveyors", _descriptor17, this);

          _initializerDefineProperty(this, "specialCustomer", _descriptor18, this);

          _initializerDefineProperty(this, "productionBuilding", _descriptor19, this);

          _initializerDefineProperty(this, "flatbreadShop", _descriptor20, this);

          _initializerDefineProperty(this, "salesman1", _descriptor21, this);

          _initializerDefineProperty(this, "salesman2", _descriptor22, this);

          _initializerDefineProperty(this, "cameraUnlockTrainNode", _descriptor23, this);

          _initializerDefineProperty(this, "effectLayerNode", _descriptor24, this);

          _initializerDefineProperty(this, "treeNodeExpandNodes", _descriptor25, this);

          _initializerDefineProperty(this, "trainUpgradeEffectNodes", _descriptor26, this);

          _initializerDefineProperty(this, "expandEffectNodes", _descriptor27, this);

          _initializerDefineProperty(this, "arrowTower1EffectNodes", _descriptor28, this);

          _initializerDefineProperty(this, "arrowTower2EffectNodes", _descriptor29, this);

          _initializerDefineProperty(this, "arrowTower3EffectNodes", _descriptor30, this);

          _initializerDefineProperty(this, "arrowTower4EffectNodes", _descriptor31, this);

          _initializerDefineProperty(this, "salesman1EffectNodes", _descriptor32, this);

          _initializerDefineProperty(this, "salesman2EffectNodes", _descriptor33, this);

          this._interactionLocked = false;
          this._isGamePause = false;
          this._isGameStart = false;
          this._isEndGame = false;
          this._gameResult = (_crd && GameResult === void 0 ? (_reportPossibleCrUseOfGameResult({
            error: Error()
          }), GameResult) : GameResult).None;
          this._unlockItemMap = new Map();

          /** 失败次数计数器 */
          this._failCount = 0;

          /** 英雄是否在家中 */
          this._heroAtHome = false;
          this.isShowOver = false;
          this.isShowOut = false;
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

        get isGamePause() {
          return this._isGamePause;
        }

        get isInteractionLocked() {
          return this._interactionLocked;
        }

        set isGamePause(value) {
          this._isGamePause = value;
        }

        get isGameStart() {
          return this._isGameStart;
        }

        get isEndGame() {
          return this._isEndGame;
        }

        set isEndGame(value) {
          this._isEndGame = value;
        }

        set isGameStart(value) {
          if (this._isGameStart !== true && value === true) {
            //console.log("游戏开始");
            if (!app.audio.getMusicSwitch()) {
              app.audio.setMusicSwitch(true);
            }

            if (!app.audio.getEffectSwitch()) {
              app.audio.setEffectSwitch(true);
            }

            app.audio.playMusic('resources/audio/BGM');
          }

          this._isGameStart = value;
        }

        get gameResult() {
          return this._gameResult;
        }

        set gameResult(value) {
          this._gameResult = value;

          if (value === (_crd && GameResult === void 0 ? (_reportPossibleCrUseOfGameResult({
            error: Error()
          }), GameResult) : GameResult).Win) {
            this.isGamePause = true;
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).ShowWinUI);
          } else if (value === (_crd && GameResult === void 0 ? (_reportPossibleCrUseOfGameResult({
            error: Error()
          }), GameResult) : GameResult).Fail) {
            this.isGamePause = true;
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).ShowFailUI);
          }
        }

        get heroAtHome() {
          return this._heroAtHome;
        }

        get unlockItemMap() {
          return this._unlockItemMap;
        }
        /** 获取当前失败次数 */


        get failCount() {
          return this._failCount;
        }
        /** 重置失败次数 */


        resetFailCount() {
          this._failCount = 0; //console.log('失败次数已重置');
        }

        onLoad() {
          //@ts-ignore
          let androidUrl = "https://play.google.com/store/apps/details?id=com.miner.and.usc";
          let iosUrl = 'https://apps.apple.com/us/app/subsea-survival/id6751192772';

          (_crd && super_html_playable === void 0 ? (_reportPossibleCrUseOfsuper_html_playable({
            error: Error()
          }), super_html_playable) : super_html_playable).download = () => {
            try {
              const isIos = /iphone ipad|ipod macintosh/i.test(window.navigator.userAgent.toLowerCase()); //@ts-ignore

              const gameUrl = isIos ? (_crd && super_html_playable === void 0 ? (_reportPossibleCrUseOfsuper_html_playable({
                error: Error()
              }), super_html_playable) : super_html_playable).appstore_url : (_crd && super_html_playable === void 0 ? (_reportPossibleCrUseOfsuper_html_playable({
                error: Error()
              }), super_html_playable) : super_html_playable).google_play_url; //保证客户/制片在本地可以看到跳转链接是否正确
              // window.open(gameUrl)
            } finally {//调用插件的的download()
              // super_html_playable.download();
            }
          }; //@ts-ignore


          (_crd && super_html_playable === void 0 ? (_reportPossibleCrUseOfsuper_html_playable({
            error: Error()
          }), super_html_playable) : super_html_playable).set_google_play_url(androidUrl); //@ts-ignore

          (_crd && super_html_playable === void 0 ? (_reportPossibleCrUseOfsuper_html_playable({
            error: Error()
          }), super_html_playable) : super_html_playable).set_app_store_url(iosUrl);
          app.audio.setMusicSwitch(false);
          app.audio.setEffectSwitch(false); // 使用改进的单例初始化方法

          GameManager.initInstance(this);
          if (GameManager._instance !== this) return; // 注册事件监听

          this.registerEvents(); // this.conveyors.hideAndDisable();

          game.frameRate = 60; // PhysicsSystem.instance.debugDrawFlags = EPhysicsDrawFlags.WIRE_FRAME
        }

        start() {
          this.hero.setMovementEnabled(false);
          manager.cameraFollow.setTarget(null);
          manager.cameraFollow.moveToTarget(this.cameraStartTargetPos, 1, () => {
            manager.cameraFollow.moveToTarget(this.hero.node, 1, () => {
              manager.cameraFollow.setTarget(this.hero.node);
              this.hero.setMovementEnabled(true);
            });
          }, 1);
        }

        showConveyors() {
          this.conveyors.showAndEnable();
        }

        onDestroy() {
          if (GameManager._instance === this) {
            GameManager._instance = null;
          }

          this.unregisterEvents();
        } // 注册事件的独立方法


        registerEvents() {
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).joystickInput, this.onJoystickInput, this);
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).GameWin, this.onGameWin, this);
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).GameFail, this.onGameFail, this);
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).UnlockItem, this.onUnlockItem, this);
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).UpdateHeroItemCount, this.onUpdateHeroItemCount, this);
        }

        onUpdateHeroItemCount(data) {
          switch (data.type) {
            case (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemCoin:
              // if(this.unlockItemMap.get(BuildingType.Lumberjack)?.unlockState == BuildUnlockState.NoActive){
              //     app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.Lumberjack, state: BuildUnlockState.Active});
              // }
              break;

            default:
              break;
          }
        }

        onGameWin() {
          // 游戏胜利时重置失败计数
          this._failCount = 0; //console.log('游戏胜利，重置失败计数');

          this.gameResult = (_crd && GameResult === void 0 ? (_reportPossibleCrUseOfGameResult({
            error: Error()
          }), GameResult) : GameResult).Win;
        }

        onGameFail() {
          this._failCount++; //console.log(`游戏失败，当前失败次数: ${this._failCount}`);

          this.gameResult = (_crd && GameResult === void 0 ? (_reportPossibleCrUseOfGameResult({
            error: Error()
          }), GameResult) : GameResult).Fail;
        }

        playEffect(effectNode) {
          effectNode.getComponentsInChildren(ParticleSystem);
          effectNode.active = true; // 先停止所有粒子系统

          effectNode.getComponentsInChildren(ParticleSystem).forEach(particle => {
            if (particle && particle.isValid) {
              particle.stop();
              particle.clear();
            }
          });
          effectNode.getComponentsInChildren(ParticleSystem).forEach(particle => {
            particle.play();
          });
        }

        onUnlockItem(type) {
          //console.log("[GameManager] onUnlockItem", type);
          switch (type) {
            case (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).ArrowTower:
              app.audio.playEffect('resources/audio/ye', 0.6);
              this.playEffect(this.arrowTower1EffectNodes);
              break;

            case (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).ArrowTower1:
              app.audio.playEffect('resources/audio/ye', 0.6);
              this.playEffect(this.arrowTower2EffectNodes);
              break;

            case (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).ArrowTower2:
              app.audio.playEffect('resources/audio/ye', 0.6);
              this.playEffect(this.arrowTower3EffectNodes);
              break;

            case (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).ArrowTower3:
              app.audio.playEffect('resources/audio/ye', 0.6);
              this.playEffect(this.arrowTower4EffectNodes);
              break;

            case (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).Salesperson1:
              this.playEffect(this.salesman1EffectNodes);
              break;

            case (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).Salesperson2:
              this.playEffect(this.salesman2EffectNodes);
              break;

            case (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).EndGame:
              this.scheduleOnce(() => {
                app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
                  error: Error()
                }), CommonEvent) : CommonEvent).ShowOver);
              }, 1);
              this.isShowOver = true;
              manager.enemy.endGame();
              this.isEndGame = true; //镜头跟随特殊客户

              manager.cameraFollow.setTarget(null);
              manager.cameraFollow.moveToTarget(this.specialCustomer.node, 1, () => {
                manager.cameraFollow.setTarget(this.specialCustomer.node); //特殊客户移动到目标点

                this.specialCustomer.moveToTarget(); // manager.cameraFollow.moveToTarget(this.hero.node, 1, () => {
                //     manager.cameraFollow.setTarget(this.hero.node);
                // });
              }, 1);
              this.scheduleOnce(() => {
                //镜头平滑拉高
                manager.cameraFollow.bossSpawn(this.hero.node);
              }, 1);
              break;

            case (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).Train1:
              this.trainManager.upgradeTo((_crd && TrainLevel === void 0 ? (_reportPossibleCrUseOfTrainLevel({
                error: Error()
              }), TrainLevel) : TrainLevel).Lv2);
              this.playEffect(this.trainUpgradeEffectNodes);
              app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
                error: Error()
              }), CommonEvent) : CommonEvent).SetUnlockStatue, {
                type: (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
                  error: Error()
                }), BuildingType) : BuildingType).ArrowTower,
                state: (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
                  error: Error()
                }), BuildUnlockState) : BuildUnlockState).Active
              });
              app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
                error: Error()
              }), CommonEvent) : CommonEvent).SetUnlockStatue, {
                type: (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
                  error: Error()
                }), BuildingType) : BuildingType).ArrowTower1,
                state: (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
                  error: Error()
                }), BuildUnlockState) : BuildUnlockState).Active
              });
              app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
                error: Error()
              }), CommonEvent) : CommonEvent).SetUnlockStatue, {
                type: (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
                  error: Error()
                }), BuildingType) : BuildingType).ArrowTower2,
                state: (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
                  error: Error()
                }), BuildUnlockState) : BuildUnlockState).Active
              });
              app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
                error: Error()
              }), CommonEvent) : CommonEvent).SetUnlockStatue, {
                type: (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
                  error: Error()
                }), BuildingType) : BuildingType).ArrowTower3,
                state: (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
                  error: Error()
                }), BuildUnlockState) : BuildUnlockState).Active
              });
              manager.enemy.startEnemySpawn(); //当解锁第一个火车的时候 我们要打开闪红的特效节点 2秒后结束 

              app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
                error: Error()
              }), CommonEvent) : CommonEvent).ShowFlashRed); //此时要暂停用户操作

              this.lockInteraction(); //做一个标记，如果用户还在 交付 禁止交付，如果用户与 上车的碰撞 交互 禁止交互
              //平移到目标点并拉高摄像机

              const cam = manager.cameraFollow; // this.moveCameraAndZoom(this.cameraUnlockTrainNode, 3)

              cam.bossSpawn(this.cameraUnlockTrainNode);
              cam.moveToTarget(this.cameraUnlockTrainNode, 2, () => {
                cam.setTarget(null);
                this.playTreeNodeExpandAnim(1.2);
                this.playEffect(this.expandEffectNodes);
                app.audio.playEffect('resources/audio/ye', 0.6);
                this.trainManager.expandTrackPhase2(() => {
                  this.scheduleOnce(() => {
                    manager.cameraFollow.setTarget(null);
                    manager.cameraFollow.moveToTarget(this.hero.node, 1.5, () => {
                      cam.bossSpawn2(this.hero.node, 0.8);
                      manager.cameraFollow.setTarget(this.hero.node);
                      this.scheduleOnce(() => {
                        this.unlockInteraction();
                      }, 0.8);
                    }, 0);
                  }, 1);
                });
              }, 0);
              break;

            case (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).Train2:
              this.trainManager.upgradeTo((_crd && TrainLevel === void 0 ? (_reportPossibleCrUseOfTrainLevel({
                error: Error()
              }), TrainLevel) : TrainLevel).Lv3);
              this.playEffect(this.trainUpgradeEffectNodes); //如果火车等级到3并且4个箭塔全部解锁 则激活endGame类型的 unlockitem

              if (this.trainManager.getIsAllArrowTowersUnlocked()) {
                app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
                  error: Error()
                }), CommonEvent) : CommonEvent).SetUnlockStatue, {
                  type: (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
                    error: Error()
                  }), BuildingType) : BuildingType).EndGame,
                  state: (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
                    error: Error()
                  }), BuildUnlockState) : BuildUnlockState).Active
                });
              }

              break;

            default:
              break;
          }
        }

        onJoystickInput(inputVector) {
          if (this.isGamePause || this.isShowOver || this.isShowOut) {
            this.hero.move(Vec3.ZERO);
            return;
          }

          if (!this.isGameStart) {
            this.isGameStart = true;
          } // this.isGameStart = true;
          // 将2D输入转换为3D移动方向，Y轴映射到Z轴


          const moveDirection = new Vec3(inputVector.x, 0, -inputVector.y);
          this.hero.move(moveDirection);
        }

        playLevelUpEffect(effect, worldPosition, parent) {
          // app.audio.playEffect('resources/audio/ye', 0.6);
          let node = instantiate(effect);

          if (parent) {
            node.setParent(parent);
          } else {
            node.setParent(effect.parent);
          }

          if (worldPosition) {
            node.setWorldPosition(worldPosition);
          } else {
            node.setWorldPosition(effect.worldPosition);
          }

          node.setRotation(effect.rotation);
          node.setScale(effect.scale);
          node.active = true; // effect.active = true;

          const particles = node.getComponentsInChildren(ParticleSystem);
          particles.forEach(particle => {
            particle.play();
          }); // ⭐ 在销毁前先停止粒子系统，避免编辑器 Gizmo 访问已销毁对象

          this.scheduleOnce(() => {
            // 先停止所有粒子系统
            particles.forEach(particle => {
              if (particle && particle.isValid) {
                particle.stop();
                particle.clear();
              }
            }); // // 再禁用并销毁节点
            // node.active = false;
            // // 延迟一帧再销毁，确保编辑器 Gizmo 更新完成
            // this.scheduleOnce(() => {
            //     if (node && node.isValid) {
            //         node.destroy();
            //     }
            // }, 0.1);
          }, 2);
        } // 注销事件的独立方法


        unregisterEvents() {
          app.event.offAllByTarget(this);
        }

        lockInteraction() {
          this._interactionLocked = true;

          this.trainManager.trainBoardingTrigger._disablePlayerControl();
        }

        unlockInteraction() {
          this._interactionLocked = false;

          this.trainManager.trainBoardingTrigger._enablePlayerControl();
        }
        /** 平移到目标点并拉高摄像机 */


        moveCameraAndZoom(targetNode, duration = 1.2) {
          const cam = manager.cameraFollow;
          if (!cam) return; // cam.bossSpawn(targetNode);

          cam.moveToTarget(targetNode, duration, () => {
            cam.setTarget(targetNode);
          }, 0);
        }
        /** 平移到目标点并拉低摄像机（恢复到正常高度） */


        moveCameraAndRestore(targetNode, duration = 1.2) {
          const cam = manager.cameraFollow;
          if (!cam) return;
          cam.bossSpawn2(targetNode, duration);
          cam.moveToTarget(targetNode, duration);
        }

        playTreeNodeExpandAnim(duration = 1.2) {
          const nodes = this.treeNodeExpandNodes.filter(n => n && n.isValid);
          if (nodes.length === 0) return;
          const origScales = nodes.map(n => n.getScale().clone());
          nodes.forEach((n, i) => {
            n.active = true;
            n.setScale(0, 0, 0);
            tween(n).delay(i * Math.max(0.03, duration / nodes.length)).to(Math.max(0.08, duration / nodes.length), {
              scale: origScales[i]
            }, {
              easing: 'sineOut'
            }).start();
          });
        } // #region 公共接口方法

        /**
         * 获取范围内的士兵（排除在家中的士兵）
         * @param position 中心位置
         * @param searchRadius 搜索半径
         * @returns 范围内的士兵数组，按距离排序，不包含在家中的士兵
         */


        getRangeSolder(position, searchRadius) {
          const rangeSolders = []; // 使用平方距离来优化性能，避免开平方根运算

          const rangeSquared = searchRadius * searchRadius;

          if (this.hero && this.hero.node.isValid && !this.hero.healthComponent.isDead) {
            // 排除在家中的英雄
            if (!this._heroAtHome) {
              const squaredDistance = Vec3.squaredDistance(position, this.hero.node.getWorldPosition());

              if (squaredDistance <= rangeSquared) {
                rangeSolders.push({
                  node: this.hero.node,
                  squaredDistance: squaredDistance
                });
              }

              ;
            }
          }

          return rangeSolders;
        }
        /**
         * 使用射线检测计算地面高度
         * @param position 当前位置
         * @returns 计算后的地面高度
         */


        calculateGroundHeight(position) {
          // 创建从上方向下的射线进行地面检测
          const ray = new geometry.Ray();
          const rayOrigin = new Vec3(position.x, position.y + 20, position.z); // 从高处向下射线

          const rayDir = new Vec3(0, -1, 0); // 向下的方向

          ray.o = rayOrigin;
          ray.d = rayDir;
          let groundHeight = -100; // 默认地面高度
          // 执行射线检测

          if (PhysicsSystem.instance.raycast(ray)) {
            const raycastResults = PhysicsSystem.instance.raycastResults; // 如果检测到碰撞，使用碰撞点的高度

            if (raycastResults.length > 0) {
              for (const result of raycastResults) {
                // const result = raycastResults[0];
                const collider = result.collider;

                if (collider.getGroup() == (_crd && PHY_GROUP === void 0 ? (_reportPossibleCrUseOfPHY_GROUP({
                  error: Error()
                }), PHY_GROUP) : PHY_GROUP).GROUND) {
                  let h = result.hitPoint.y;

                  if (h > groundHeight) {
                    groundHeight = h;
                  }
                }
              }
            }
          }

          return groundHeight > -100 ? groundHeight : 5;
        }

        isCanHunted(node) {
          if (this.hero && this.hero.node === node) {
            // 英雄在家中或正在充电时都不能被攻击
            return !this._heroAtHome;
          }

          return true;
        }

        calculateSolderCount(origin, target, attackMask) {
          // 创建射线计算攻击位置
          const ray = new geometry.Ray();
          const rayOrigin = origin;
          const targetPos = target; // 计算射线方向（从Boss到目标）

          const direction = Vec3.subtract(new Vec3(), targetPos, rayOrigin);
          direction.normalize(); // 设置射线起点和方向

          ray.o.set(rayOrigin);
          ray.d.set(direction); // 执行射线检测

          const mask = attackMask.reduce((acc, curr) => acc | curr, 0);
          const maxDistance = Vec3.distance(rayOrigin, targetPos); // 设置最大检测距离为目标距离

          const queryTrigger = false; // 不检测触发器

          const hasHit = PhysicsSystem.instance.raycast(ray, mask, maxDistance, queryTrigger);

          if (hasHit) {
            const raycastResults = PhysicsSystem.instance.raycastResults;

            for (const result of raycastResults) {
              const collider = result.collider; // console.log('collider.getGroup()', collider.getGroup());

              if (attackMask.indexOf(collider.getGroup()) !== -1) {
                // console.log('射线碰撞到:', result.collider.node.name);
                return result.hitPoint;
              }
            }
          }

          return null;
        }

        onDownload() {
          // SuperPackage.Instance.Download();
          (_crd && super_html_playable === void 0 ? (_reportPossibleCrUseOfsuper_html_playable({
            error: Error()
          }), super_html_playable) : super_html_playable).download2();
        }

        onDownloadTCE() {
          // SuperPackage.Instance.DownloadTCE(); 
          (_crd && super_html_playable === void 0 ? (_reportPossibleCrUseOfsuper_html_playable({
            error: Error()
          }), super_html_playable) : super_html_playable).download2();
        }

        onRetry() {
          // 如果是第二次失败，则直接跳转下载
          if (this._failCount >= 2) {
            //console.log('第二次失败，跳转下载');
            this.onDownload();
            return;
          } //console.log(`重试游戏，当前失败次数: ${this._failCount}`);


          this.reset();
        }

        reset() {
          this.gameResult = (_crd && GameResult === void 0 ? (_reportPossibleCrUseOfGameResult({
            error: Error()
          }), GameResult) : GameResult).None;
          this.isGamePause = false;
          this.hero.node.setWorldPosition(0, 0, 0);
          this.hero.healthComponent.restoreAllHealth();
          this.hero.reset();
          this.unlockItemMap.forEach(item => {
            item.reset();
          });
          this.woodShop.reset();
          this.meatShop.reset();
          manager.wall.reset();
          manager.enemy.reset();
          manager.effect.reset();
          manager.drop.reset();
          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).SetUnlockStatue, {
            type: (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).Lumberjack,
            state: (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
              error: Error()
            }), BuildUnlockState) : BuildUnlockState).Active
          });
          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).OnReset);
        }

      }, _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "hero", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "dropLayer", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "gamelayer", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "woodShop", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "meatShop", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "woodStore", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "heroLastMovePos", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "bossPos", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "cameraStartTargetPos", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "endNode", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "endNode1", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "endNode2", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "upgradeEffects", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "enemyEndPosNode", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "targetWallNodes", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "trainManager", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "conveyors", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "specialCustomer", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "productionBuilding", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "flatbreadShop", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "salesman1", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "salesman2", [_dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "cameraUnlockTrainNode", [_dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "effectLayerNode", [_dec25], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "treeNodeExpandNodes", [_dec26], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "trainUpgradeEffectNodes", [_dec27], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "expandEffectNodes", [_dec28], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "arrowTower1EffectNodes", [_dec29], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "arrowTower2EffectNodes", [_dec30], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "arrowTower3EffectNodes", [_dec31], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, "arrowTower4EffectNodes", [_dec32], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor32 = _applyDecoratedDescriptor(_class2.prototype, "salesman1EffectNodes", [_dec33], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor33 = _applyDecoratedDescriptor(_class2.prototype, "salesman2EffectNodes", [_dec34], {
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
//# sourceMappingURL=db60865ca0d61825fa10cfde22e2410017c75f5c.js.map