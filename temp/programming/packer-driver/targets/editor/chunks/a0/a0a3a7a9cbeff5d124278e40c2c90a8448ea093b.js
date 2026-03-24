System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Vec3, Wall, BuildingType, BuildUnlockState, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, WallManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfWall(extras) {
    _reporterNs.report("Wall", "../Building/Wall", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildingType(extras) {
    _reporterNs.report("BuildingType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildUnlockState(extras) {
    _reporterNs.report("BuildUnlockState", "../Common/CommonEnum", _context.meta, extras);
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
      director = _cc.director;
      Node = _cc.Node;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      Wall = _unresolved_2.Wall;
    }, function (_unresolved_3) {
      BuildingType = _unresolved_3.BuildingType;
      BuildUnlockState = _unresolved_3.BuildUnlockState;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "13c17qByWVA+Kea/RitgDXf", "WallManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 墙管理器 - 管理场景中的所有墙体
       */

      _export("WallManager", WallManager = (_dec = ccclass('WallManager'), _dec2 = property({
        type: _crd && Wall === void 0 ? (_reportPossibleCrUseOfWall({
          error: Error()
        }), Wall) : Wall,
        displayName: '内墙体'
      }), _dec3 = property({
        type: _crd && Wall === void 0 ? (_reportPossibleCrUseOfWall({
          error: Error()
        }), Wall) : Wall,
        displayName: '外墙体'
      }), _dec4 = property({
        displayName: "范围检测节点",
        type: Node
      }), _dec(_class = (_class2 = class WallManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "wallInside", _descriptor, this);

          _initializerDefineProperty(this, "wallOutside", _descriptor2, this);

          _initializerDefineProperty(this, "rangeNode", _descriptor3, this);
        }

        /** 单例实例 */

        /** 获取单例实例 */
        static get instance() {
          if (!this._instance) {
            var _director$getScene;

            //console.log('WallManager 实例不存在 动态创建');
            // 动态创建节点并添加组件
            const node = new Node('WallManager');
            this._instance = node.addComponent(WallManager); // 添加到场景

            (_director$getScene = director.getScene()) == null || _director$getScene.addChild(node);
          }

          return this._instance;
        }

        get RangeNode() {
          return this.rangeNode;
        }

        onLoad() {
          // 单例检查
          if (WallManager._instance) {
            this.node.destroy();
            return;
          }

          WallManager._instance = this; // 初始化时查找场景中已有的墙体

          this.initWalls();
        }

        onDestroy() {
          if (WallManager._instance === this) {
            WallManager._instance = null;
          }
        }
        /**
         * 查找场景中已有的墙体
         */


        initWalls() {}
        /**
         * 获取攻击目标墙体
         * 如果外围墙解锁就返回外围墙，否则返回内围墙
         * @returns 攻击目标节点
         */


        getAttackTarget() {
          // 检查外围墙是否解锁
          const outsideWallUnlockItem = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).Wall1);
          const isOutsideWallUnlocked = outsideWallUnlockItem && outsideWallUnlockItem.UnlockState === (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).Unlocked;

          if (isOutsideWallUnlocked) {
            // 外围墙已解锁，返回外围墙
            if (!this.wallOutside || !this.wallOutside.node || !this.wallOutside.node.isValid) {
              //console.warn('[WallManager] 外围墙攻击目标无效或不存在');
              return null;
            }

            return this.wallOutside.node;
          } else {
            // 外围墙未解锁，返回内围墙
            if (!this.wallInside || !this.wallInside.node || !this.wallInside.node.isValid) {
              //console.warn('[WallManager] 内围墙攻击目标无效或不存在');
              return null;
            }

            return this.wallInside.node;
          }
        }
        /**
         * 检查目标是否在范围内
         * 如果外围墙已解锁，范围会额外增加5个单位
         * @param target 目标节点
         * @param offset 偏移量
         * @returns 是否在范围内
         */


        checkIsInRange(target, offset) {
          if (!this.rangeNode) {
            //console.warn('[WallManager] 范围检测节点无效');
            return false;
          }

          if (!target || !target.isValid) {
            //console.warn('[WallManager] 目标节点无效');
            return false;
          }

          try {
            const targetPos = target.getWorldPosition();
            this.rangeNode.forEach(node => {
              if (!node || !node.isValid) {
                //console.warn('[WallManager] 范围检测节点无效');
                return false;
              }

              const rangePos = node.getWorldPosition();
              const distance = Vec3.distance(targetPos, rangePos);
              const rangeRadius = Math.max(node.scale.x, node.scale.z) / 2; // 使用X和Z轴的最大值
              // 检查外围墙是否解锁，如果解锁则范围增加5

              const outsideWallUnlockItem = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
                error: Error()
              }), BuildingType) : BuildingType).Wall1);
              const isOutsideWallUnlocked = outsideWallUnlockItem && outsideWallUnlockItem.UnlockState === (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
                error: Error()
              }), BuildUnlockState) : BuildUnlockState).Unlocked;
              const extraRange = isOutsideWallUnlocked ? 5 : 0;
              const result = distance <= offset + rangeRadius + extraRange; // // 调试信息
              // if (result) {
              ////console.log(`[WallManager] 目标在范围内: distance=${distance.toFixed(2)}, range=${rangeRadius.toFixed(2)}, offset=${offset.toFixed(2)}, extraRange=${extraRange}, result=${result}`);
              // }

              return result;
            });
          } catch (error) {
            //console.error('[WallManager] 范围检测出错:', error);
            return false;
          }
        }

        reset() {
          this.wallInside.showLock();
          this.wallInside.reset();
          this.wallOutside.showLock();
          this.wallOutside.reset();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "wallInside", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "wallOutside", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rangeNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a0a3a7a9cbeff5d124278e40c2c90a8448ea093b.js.map