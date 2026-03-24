System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, BuildingType, BuildUnlockState, CommonEvent, TrainTrack, TrackPhase, Train, TrainBoardingTrigger, TrainUnloadManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _class3, _crd, ccclass, property, TrainLevel, TrainManager;

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

  function _reportPossibleCrUseOfTrainTrack(extras) {
    _reporterNs.report("TrainTrack", "./TrainTrack", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTrackPhase(extras) {
    _reporterNs.report("TrackPhase", "./TrainTrack", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTrain(extras) {
    _reporterNs.report("Train", "./Train", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTrainCar(extras) {
    _reporterNs.report("TrainCar", "./TrainCar", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTrainBoardingTrigger(extras) {
    _reporterNs.report("TrainBoardingTrigger", "./TrainBoardingTrigger", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTrainUnloadManager(extras) {
    _reporterNs.report("TrainUnloadManager", "./TrainUnloadManager", _context.meta, extras);
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
    }, function (_unresolved_2) {
      BuildingType = _unresolved_2.BuildingType;
      BuildUnlockState = _unresolved_2.BuildUnlockState;
      CommonEvent = _unresolved_2.CommonEvent;
    }, function (_unresolved_3) {
      TrainTrack = _unresolved_3.TrainTrack;
      TrackPhase = _unresolved_3.TrackPhase;
    }, function (_unresolved_4) {
      Train = _unresolved_4.Train;
    }, function (_unresolved_5) {
      TrainBoardingTrigger = _unresolved_5.TrainBoardingTrigger;
    }, function (_unresolved_6) {
      TrainUnloadManager = _unresolved_6.TrainUnloadManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2cee06SBvtNRZpvump50B2u", "TrainManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 火车等级枚举
       */

      _export("TrainLevel", TrainLevel = /*#__PURE__*/function (TrainLevel) {
        TrainLevel[TrainLevel["Lv1"] = 1] = "Lv1";
        TrainLevel[TrainLevel["Lv2"] = 2] = "Lv2";
        TrainLevel[TrainLevel["Lv3"] = 3] = "Lv3";
        return TrainLevel;
      }({}));
      /**
       * TrainManager —— 3辆独立火车的切换管理器
       *
       * 设计说明：
       *  - 场景中存在3个独立的火车节点（TrainLv1 / TrainLv2 / TrainLv3），各自挂 Train 组件
       *  - 初始只激活 TrainLv1，其余隐藏
       *  - 升级时：
       *    1. 记录当前火车的行驶进度
       *    2. 隐藏旧火车节点（旧火车 onDisable 自动取消触摸监听）
       *    3. 激活新火车节点（新火车 onEnable 自动注册触摸监听）
       *    4. 调用新火车的 initAtProgress() 让其从旧火车位置继续行驶
       *  - 轨道扩张完成后统一调用所有火车的 syncStationProgress()
       *
       * 节点结构：
       *   TrainManager（挂本脚本）
       *   ├── TrainLv1  ← 挂 Train 组件，speed=6，1节车厢
       *   ├── TrainLv2  ← 挂 Train 组件，speed=9，3节车厢
       *   └── TrainLv3  ← 挂 Train 组件，speed=12，4节车厢
       */


      _export("TrainManager", TrainManager = (_dec = ccclass('TrainManager'), _dec2 = property({
        type: _crd && Train === void 0 ? (_reportPossibleCrUseOfTrain({
          error: Error()
        }), Train) : Train,
        displayName: 'Lv1 火车',
        tooltip: '棕黄色，1节车厢'
      }), _dec3 = property({
        type: _crd && Train === void 0 ? (_reportPossibleCrUseOfTrain({
          error: Error()
        }), Train) : Train,
        displayName: 'Lv2 火车',
        tooltip: '橙红色，3节车厢'
      }), _dec4 = property({
        type: _crd && Train === void 0 ? (_reportPossibleCrUseOfTrain({
          error: Error()
        }), Train) : Train,
        displayName: 'Lv3 火车',
        tooltip: '紫色，4节车厢'
      }), _dec5 = property({
        type: _crd && TrainTrack === void 0 ? (_reportPossibleCrUseOfTrainTrack({
          error: Error()
        }), TrainTrack) : TrainTrack,
        displayName: '轨道组件',
        tooltip: '场景中的 TrainTrack 节点（3辆火车共享）'
      }), _dec6 = property({
        type: _crd && TrainBoardingTrigger === void 0 ? (_reportPossibleCrUseOfTrainBoardingTrigger({
          error: Error()
        }), TrainBoardingTrigger) : TrainBoardingTrigger,
        displayName: '轨道上车触发组件',
        tooltip: '场景中的 TrainBoardingTrigger '
      }), _dec7 = property({
        type: _crd && TrainUnloadManager === void 0 ? (_reportPossibleCrUseOfTrainUnloadManager({
          error: Error()
        }), TrainUnloadManager) : TrainUnloadManager,
        displayName: '火车到站卸货管理器',
        tooltip: '场景中的 TrainUnloadManager '
      }), _dec8 = property({
        type: Node,
        displayName: 'hero拖拽移动',
        tooltip: '拖拽移动NodeUI '
      }), _dec9 = property({
        type: Node,
        displayName: '火车按住移动',
        tooltip: '按住移动NodeUI '
      }), _dec(_class = (_class2 = (_class3 = class TrainManager extends Component {
        constructor(...args) {
          super(...args);

          // ─────────────────────────────────────────────
          // Inspector 属性
          // ─────────────────────────────────────────────
          _initializerDefineProperty(this, "trainLv1", _descriptor, this);

          _initializerDefineProperty(this, "trainLv2", _descriptor2, this);

          _initializerDefineProperty(this, "trainLv3", _descriptor3, this);

          _initializerDefineProperty(this, "track", _descriptor4, this);

          _initializerDefineProperty(this, "trainBoardingTrigger", _descriptor5, this);

          _initializerDefineProperty(this, "trainUnloadManager", _descriptor6, this);

          _initializerDefineProperty(this, "heroDragMoveNode", _descriptor7, this);

          _initializerDefineProperty(this, "trainHoldMoveNode", _descriptor8, this);

          // ─────────────────────────────────────────────
          // 运行时数据
          // ─────────────────────────────────────────────

          /** 当前激活的火车 */
          this._activeTrain = null;

          /** 当前等级 */
          this._level = TrainLevel.Lv1;
          // ─────────────────────────────────────────────
          // 生命周期
          // ─────────────────────────────────────────────

          /** 是否已因第一次获得金币而升级到 Lv2 */
          this._hasUpgradedOnFirstCoin = false;

          /** 记录哪些售货员已解锁（用于判断两个都解锁后升级 Lv3） */
          this._unlockedSalesman = new Set();

          /** 记录已解锁的箭塔（4个全部解锁后开启全自动模式） */
          this._unlockedArrowTowers = new Set();
        }

        /** 检查箭塔是否全部解锁 */
        getIsAllArrowTowersUnlocked() {
          return this._unlockedArrowTowers.size >= TrainManager._ARROW_TOWER_TYPES.length;
        }

        getTrain() {
          return this._activeTrain;
        }

        onLoad() {
          // 初始只激活 Lv1，其余隐藏（含各自车厢）
          this._level = TrainLevel.Lv1; //根据等级显示对应的火车

          this._getTrainByLevel(this._level).setVisible(true);

          this._activeTrain = this._getTrainByLevel(this._level); // 监听玩家第一次拾取金币事件，触发后升级到 Lv2

          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).PickupCoin, this._onFirstPickupCoin, this); // 监听建筑解锁完成事件，两个售货员都解锁后升级到 Lv3

          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).UnlockFinished, this._onUnlockFinished, this);
        }

        onDestroy() {
          app.event.offAllByTarget(this);
        }

        getLevel() {
          return this._level;
        }

        start() {// 自动行驶由 Train.autoRun 属性控制，在 Inspector 勾选即可，无需在此手动调用
          // 若需要运行时动态切换模式，调用 activeTrain.startAutoRun() 或 activeTrain.startManualRun()
        }

        _onFirstPickupCoin() {
          var _manager$game$unlockI, _manager$game$unlockI2;

          if (this._hasUpgradedOnFirstCoin) return;
          this._hasUpgradedOnFirstCoin = true; //解锁unlockitem

          if (((_manager$game$unlockI = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).Salesperson1)) == null ? void 0 : _manager$game$unlockI.unlockState) == (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).NoActive) {
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).SetUnlockStatue, {
              type: (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
                error: Error()
              }), BuildingType) : BuildingType).Salesperson1,
              state: (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
                error: Error()
              }), BuildUnlockState) : BuildUnlockState).Active
            });
          } //解锁火车升级unlockitem


          if (((_manager$game$unlockI2 = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).Train1)) == null ? void 0 : _manager$game$unlockI2.unlockState) == (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).NoActive) {
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).SetUnlockStatue, {
              type: (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
                error: Error()
              }), BuildingType) : BuildingType).Train1,
              state: (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
                error: Error()
              }), BuildUnlockState) : BuildUnlockState).Active
            });
          }
        }

        _onUnlockFinished(type) {
          // ── 售货员：两个都解锁 → 升级 Lv3 ──
          // if (type === BuildingType.Salesperson1 || type === BuildingType.Salesperson2) {
          //     this._unlockedSalesman.add(type);
          //     if (
          //         this._unlockedSalesman.has(BuildingType.Salesperson1) &&
          //         this._unlockedSalesman.has(BuildingType.Salesperson2)
          //     ) {
          //         // this.upgradeTo(TrainLevel.Lv3);
          //     }
          //     return;
          // }
          // ── 箭塔：4个全部解锁 → 当前火车开启全自动 ──
          if (TrainManager._ARROW_TOWER_TYPES.includes(type)) {
            this._unlockedArrowTowers.add(type);
          }

          console.log("已解锁的箭塔数量:", this._unlockedArrowTowers.size, this._level); //检查列车等级是否为3

          if (this._unlockedArrowTowers.size >= TrainManager._ARROW_TOWER_TYPES.length && this._level == TrainLevel.Lv3) {
            this.startAutoRun(); // 传送带出现并启用

            manager.game.showConveyors();
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
        } // ─────────────────────────────────────────────
        // 公开接口
        // ─────────────────────────────────────────────

        /** 当前等级 */


        get level() {
          return this._level;
        }
        /** 当前激活的火车 */


        get activeTrain() {
          return this._activeTrain;
        }
        /**
         * 升级到目标等级
         * @param level 目标等级（只能升不能降）
         * @param onComplete 升级演出完成后的回调（轨道扩张动画结束后触发）
         */


        upgradeTo(level, onComplete) {
          if (level <= this._level) return;
          app.audio.playEffect('resources/audio/UPLV', 0.6);
          const prevTrain = this._activeTrain;
          const prevProgress = prevTrain.progress;
          this._level = level; // 发送升级事件（供特效系统处理光扫动画）

          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).TrainUpgraded, level); // 切换到新火车（含各自车厢同步显隐）

          const nextTrain = this._getTrainByLevel(level); // 先在未激活状态下吸附位置与朝向，避免激活瞬间移动/转头


          nextTrain.initAtProgress(prevProgress);
          nextTrain.alignFacingAtProgress(prevProgress); // 继承自动/手动标志（由 onEnable 决定是否启动行驶），避免重复 start

          nextTrain.autoRun = prevTrain.autoRun && level === TrainLevel.Lv3 ? true : nextTrain.autoRun;
          prevTrain.setVisible(false);
          nextTrain.setVisible(true);
          this._activeTrain = nextTrain; // Lv3 升级时扩张轨道到 Phase3，扩张完成后同步所有火车的站台进度

          if (level === TrainLevel.Lv3) {
            // this.track.expandToPhase(TrackPhase.Phase3, () => {
            //     this._syncAllStationProgress();
            // });
            onComplete && onComplete();
          } else {
            onComplete && onComplete();
          }
        }
        /**
         * 轨道扩张到 Phase2（Step3 丧尸出现时调用，与火车升级解耦）
         * @param onComplete 扩张完成后的回调
         */


        expandTrackPhase2(onComplete) {
          this.track.expandToPhase((_crd && TrackPhase === void 0 ? (_reportPossibleCrUseOfTrackPhase({
            error: Error()
          }), TrackPhase) : TrackPhase).Phase2, () => {
            this._syncAllStationProgress();

            onComplete && onComplete();
          });
        }
        /**
         * 向当前激活火车的车厢添加资源（由 Chainsaw 锯条收割时调用）
         */


        addResource(type, amount) {
          return this._activeTrain.addResource(type, amount);
        }
        /**
         * 找到第一个能接收该类型资源的车厢（用于 Chainsaw 获取飞行动画目标）
         */


        getCarForResource(type) {
          return this._activeTrain.getCarForResource(type);
        }
        /** 获取当前火车总载量 */


        getTotalLoad() {
          return this._activeTrain.getTotalLoad();
        }
        /** 获取当前火车总容量 */


        getTotalCapacity() {
          return this._activeTrain.getTotalCapacity();
        }
        /** 强制停止当前火车 */


        stopTrain() {
          this._activeTrain.stopTrain();
        }
        /** 切换当前火车为自动驾驶模式并立即出发（运行时动态切换用） */


        startAutoRun() {
          this._activeTrain.startAutoRun();
        }
        /** 切换当前火车为手动触摸模式（运行时动态切换用） */


        startManualRun() {
          this._activeTrain.startManualRun();
        }
        /** 重置当前火车到站台 */


        reset() {
          this._activeTrain.reset();
        }
        /**
         * 尝试让玩家上当前激活的火车
         * @returns true = 上车成功；false = 当前火车不允许上车（Lv3自动模式）
         */


        tryBoardTrain() {
          if (this._activeTrain.autoRun) {
            return false; // Lv3 不允许上车
          }

          this._activeTrain.onPlayerBoard(); //非自动模式下， 玩家上车 就显示 火车按住移动NodeUI


          this.trainHoldMoveNode.active = true;
          this.heroDragMoveNode.active = false;
          return true;
        }
        /**
         * 让玩家下当前激活的火车（强制，不等到站）
         * 通常由 Train 内部自动调用，外部特殊情况（如强制下车）可调用此方法
         */


        alightTrain() {
          this._activeTrain.onPlayerAlight(); //玩家下火车后， 就隐藏 火车按住移动NodeUI


          this.trainHoldMoveNode.active = false;
          this.heroDragMoveNode.active = true;
        }
        /** 当前火车是否有玩家乘坐 */


        get trainHasPlayer() {
          return this._activeTrain.hasPlayer;
        } // ─────────────────────────────────────────────
        // 私有方法
        // ─────────────────────────────────────────────

        /** 根据等级获取对应的 Train 实例 */


        _getTrainByLevel(level) {
          switch (level) {
            case TrainLevel.Lv1:
              return this.trainLv1;

            case TrainLevel.Lv2:
              return this.trainLv2;

            case TrainLevel.Lv3:
              return this.trainLv3;
          }
        }
        /**
         * 轨道扩张后同步所有火车的站台进度
         * 避免因 _halfX/_halfZ 变化导致 getStationProgress() 返回值漂移
         */


        _syncAllStationProgress() {
          this.trainLv1.syncStationProgress();
          this.trainLv2.syncStationProgress();
          this.trainLv3.syncStationProgress();
        }

      }, _class3._ARROW_TOWER_TYPES = [(_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
        error: Error()
      }), BuildingType) : BuildingType).ArrowTower, (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
        error: Error()
      }), BuildingType) : BuildingType).ArrowTower1, (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
        error: Error()
      }), BuildingType) : BuildingType).ArrowTower2, (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
        error: Error()
      }), BuildingType) : BuildingType).ArrowTower3], _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "trainLv1", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "trainLv2", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "trainLv3", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "track", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "trainBoardingTrigger", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "trainUnloadManager", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "heroDragMoveNode", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "trainHoldMoveNode", [_dec9], {
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
//# sourceMappingURL=b60107e0dc78682720eb1206584349d1bf8182b2.js.map