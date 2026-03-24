System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Component, easing, Enum, Node, Prefab, tween, Vec3, BuildingType, CommonEvent, HeroType, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _dec5, _dec6, _dec7, _class4, _class5, _descriptor4, _descriptor5, _crd, ccclass, property, HeroData, SelectHeroPanel;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBuildingType(extras) {
    _reporterNs.report("BuildingType", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHeroType(extras) {
    _reporterNs.report("HeroType", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildingHe(extras) {
    _reporterNs.report("BuildingHe", "../Building/BuildingHe", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Button = _cc.Button;
      Component = _cc.Component;
      easing = _cc.easing;
      Enum = _cc.Enum;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      BuildingType = _unresolved_2.BuildingType;
      CommonEvent = _unresolved_2.CommonEvent;
      HeroType = _unresolved_2.HeroType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4ed21YrQ2xD0rp4CGX1Xs1x", "SelectHeroPanel", undefined);

      __checkObsolete__(['_decorator', 'Button', 'CCFloat', 'CCInteger', 'Component', 'easing', 'Enum', 'Node', 'Prefab', 'sp', 'tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);
      HeroData = (_dec = ccclass('HeroData'), _dec2 = property({
        type: Enum(_crd && HeroType === void 0 ? (_reportPossibleCrUseOfHeroType({
          error: Error()
        }), HeroType) : HeroType),
        displayName: "英雄类型"
      }), _dec3 = property({
        type: Prefab,
        displayName: "英雄预制体"
      }), _dec4 = property({
        type: Node,
        displayName: "英雄卡节点"
      }), _dec(_class = (_class2 = class HeroData {
        constructor() {
          _initializerDefineProperty(this, "type", _descriptor, this);

          _initializerDefineProperty(this, "heroPrefab", _descriptor2, this);

          _initializerDefineProperty(this, "heroCard", _descriptor3, this);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && HeroType === void 0 ? (_reportPossibleCrUseOfHeroType({
            error: Error()
          }), HeroType) : HeroType).None;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "heroPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "heroCard", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class);

      _export("SelectHeroPanel", SelectHeroPanel = (_dec5 = ccclass('SelectHeroPanel'), _dec6 = property({
        type: [HeroData],
        displayName: "英雄数据"
      }), _dec7 = property({
        type: Node,
        displayName: "layer"
      }), _dec5(_class4 = (_class5 = class SelectHeroPanel extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "heroData", _descriptor4, this);

          _initializerDefineProperty(this, "layer", _descriptor5, this);

          this.heroDataMap = new Map();
          this.showList = [];
          this.currentBuildingType = (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).None;
        }

        onLoad() {
          this.heroData.forEach(data => {
            data.heroCard.on(Button.EventType.CLICK, () => this.onHeroCardClick(data), this);
            this.heroDataMap.set(data.type, data);
          });
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).UnlockItem, this.onUnlockItem, this);
        }

        onDestroy() {
          this.heroData.forEach(data => {
            data.heroCard.off(Button.EventType.CLICK, () => this.onHeroCardClick(data), this);
          });
        }

        onEnable() {
          manager.game.isGamePause = true;
          this.updateHeroData();

          if (this.showList.length > 1) {
            this.layer.setScale(0, 0, 1);
            tween(this.layer).to(0.4, {
              scale: Vec3.ONE
            }, {
              easing: easing.backOut
            }).start();
          } else {
            this.node.active = false;

            if (this.showList[0]) {
              this.scheduleOnce(() => {
                this.onSelectHero(this.showList[0].type, this.currentBuildingType, this.showList[0].heroPrefab);
              }, 0.4);
            }

            manager.game.isGamePause = false;
          }
        }

        onDisable() {
          manager.game.isGamePause = false;
        }

        updateHeroData() {
          this.showList = [];
          this.heroData.forEach(data => {
            this.showList.push(data);
          });
          manager.game.buildingMap.forEach((building, key) => {
            if (key === (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).HeroTower1 || key === (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).HeroTower2 || key === (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).HeroTower3 || key === (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).HeroTower4 || key === (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).HeroTower5 || key === (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
              error: Error()
            }), BuildingType) : BuildingType).HeroTower6) {
              var buildingHe = building;
              var heroType = buildingHe.HeroType;

              if (buildingHe.isUnlock) {
                var index = this.showList.findIndex(item => item.type === heroType);

                if (index !== -1) {
                  this.showList.splice(index, 1);
                }
              }
            }
          });
          this.updateHeroCard();
        }

        updateHeroCard() {
          // 隐藏所有英雄卡
          this.heroData.forEach(data => {
            data.heroCard.active = false;
          }); // 只显示前两个可用的英雄卡

          for (var i = 0; i < Math.min(2, this.showList.length); i++) {
            this.showList[i].heroCard.active = true;
          }
        }

        onSelectHero(heroType, buildingType, heroPrefab) {
          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).SelectHero, {
            heroType,
            buildingType,
            heroPrefab
          });
        }

        onHeroCardClick(heroData) {
          tween(this.layer).to(0.4, {
            scale: new Vec3(0, 0, 1)
          }, {
            easing: easing.quintOut
          }).call(() => {
            this.onSelectHero(heroData.type, this.currentBuildingType, heroData.heroPrefab);
            this.node.active = false;
          }).start();
        }

        onUnlockItem(buildingType) {
          this.currentBuildingType = buildingType;
          this.updateHeroData();
        }

        onShowSelectHeroPanel(buildingType) {
          this.currentBuildingType = buildingType;
          this.updateHeroData();
        }

      }, (_descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "heroData", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "layer", [_dec7], {
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
//# sourceMappingURL=ec0a796520f707bb933fa2d259a198f957ba6536.js.map