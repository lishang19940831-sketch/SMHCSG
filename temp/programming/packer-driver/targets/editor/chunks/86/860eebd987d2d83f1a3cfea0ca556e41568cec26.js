System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, CCFloat, input, Input, Animation, CommonEvent, TrainTrack, TrainCar, TrainUnloadManager, ResourceFieldManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _crd, ccclass, property, TrainState, Train;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTrainTrack(extras) {
    _reporterNs.report("TrainTrack", "./TrainTrack", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTrainCar(extras) {
    _reporterNs.report("TrainCar", "./TrainCar", _context.meta, extras);
  }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTrainUnloadManager(extras) {
    _reporterNs.report("TrainUnloadManager", "./TrainUnloadManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIResourceContainer(extras) {
    _reporterNs.report("IResourceContainer", "./TrainUnloadManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResourceFieldManager(extras) {
    _reporterNs.report("ResourceFieldManager", "./ResourceFieldManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfWheatCrop(extras) {
    _reporterNs.report("WheatCrop", "./WheatCrop", _context.meta, extras);
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
      CCFloat = _cc.CCFloat;
      input = _cc.input;
      Input = _cc.Input;
      Animation = _cc.Animation;
    }, function (_unresolved_2) {
      CommonEvent = _unresolved_2.CommonEvent;
    }, function (_unresolved_3) {
      TrainTrack = _unresolved_3.TrainTrack;
    }, function (_unresolved_4) {
      TrainCar = _unresolved_4.TrainCar;
    }, function (_unresolved_5) {
      TrainUnloadManager = _unresolved_5.TrainUnloadManager;
    }, function (_unresolved_6) {
      ResourceFieldManager = _unresolved_6.ResourceFieldManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "36417F+lcpB0IeGlvSaQ3NF", "Train", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'CCFloat', 'CCInteger', 'input', 'Input', 'EventTouch', 'Animation']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 火车状态枚举
       */

      _export("TrainState", TrainState = /*#__PURE__*/function (TrainState) {
        TrainState["Idle"] = "Idle";
        TrainState["Moving"] = "Moving";
        TrainState["StopAtStation"] = "StopAtStation";
        TrainState["Unloading"] = "Unloading";
        return TrainState;
      }({}));
      /**
       * Train —— 单辆火车控制器
       *
       * 设计说明：
       *  - 每辆火车对应一个独立节点，挂载本组件
       *  - 车厢节点通过 Inspector 拖入 trainCars 数组（每辆火车固定自己的车厢数）
       *  - 由 TrainManager 负责3辆火车的切换（隐藏旧火车、激活新火车）
       *  - 升级切换时，TrainManager 调用 initAtProgress() 让新火车从旧火车位置继续行驶
       *  - autoRun = true（默认）：自动持续行驶，到站卸货后自动重新出发
       *  - autoRun = false：长按屏幕行驶，松手暂停；可在运行时通过 startAutoRun()/startManualRun() 动态切换
       *  - 轨道扩张后需调用 syncStationProgress() 同步站台进度，避免到站判定漂移
       *
       * 节点结构建议：
       *   TrainLv1（挂本脚本 + 可选 TrainCar 作为车头仓，isHeadCar=true）
       *   ├── HeadModel       ← 火车头模型
       *   └── TrainCar_1      ← 挂 TrainCar 组件（共1节）
       *
       *   TrainLv2（挂本脚本 + 可选 TrainCar 作为车头仓，isHeadCar=true）
       *   ├── HeadModel
       *   ├── TrainCar_1
       *   ├── TrainCar_2
       *   └── TrainCar_3      ← 共3节
       *
       *   TrainLv3（挂本脚本 + 可选 TrainCar 作为车头仓，isHeadCar=true）
       *   ├── HeadModel
       *   ├── TrainCar_1
       *   ├── TrainCar_2
       *   ├── TrainCar_3
       *   └── TrainCar_4      ← 共4节
       *
       * 车头仓使用说明：
       *   若车头也需要存放材料，在 Train 节点上额外挂一个 TrainCar 组件，
       *   勾选 isHeadCar = true，并将其拖入本脚本的 headCar 属性。
       *   车头仓不参与轨道位置更新，资源收集顺序：车头仓 → 车厢0 → 车厢1 → …
       */


      _export("Train", Train = (_dec = ccclass('Train'), _dec2 = property({
        type: _crd && TrainTrack === void 0 ? (_reportPossibleCrUseOfTrainTrack({
          error: Error()
        }), TrainTrack) : TrainTrack,
        displayName: '轨道组件',
        tooltip: '场景中的 TrainTrack 节点'
      }), _dec3 = property({
        type: _crd && TrainCar === void 0 ? (_reportPossibleCrUseOfTrainCar({
          error: Error()
        }), TrainCar) : TrainCar,
        displayName: '车头仓',
        tooltip: '（可选）挂在车头节点上的 TrainCar 组件，作为车头自身的资源仓；为空则车头不存放资源'
      }), _dec4 = property({
        type: [_crd && TrainCar === void 0 ? (_reportPossibleCrUseOfTrainCar({
          error: Error()
        }), TrainCar) : TrainCar],
        displayName: '车厢列表',
        tooltip: '按顺序拖入本辆火车的所有车厢节点（TrainCar组件），第0个紧跟火车头'
      }), _dec5 = property({
        type: CCFloat,
        displayName: '行驶速度（米/秒）',
        tooltip: '本辆火车的行驶速度',
        min: 0.1
      }), _dec6 = property({
        type: CCFloat,
        displayName: 'Y轴朝向偏移(度)',
        tooltip: '补偿轨道方向与模型朝向的差值，使静止时模型朝向与编辑器一致'
      }), _dec7 = property({
        type: CCFloat,
        displayName: '到站判定距离',
        tooltip: '距离站台多近时判定为到站（米）',
        min: 0.1
      }), _dec8 = property({
        type: CCFloat,
        displayName: '卸载动画时长(秒)',
        tooltip: '到站后资源飞出的动画时长，期间火车保持停止',
        min: 0
      }), _dec9 = property({
        displayName: '自动行驶',
        tooltip: '勾选：火车自动持续行驶（无需按屏幕）；取消勾选：长按屏幕才行驶，松手暂停'
      }), _dec10 = property({
        type: _crd && TrainUnloadManager === void 0 ? (_reportPossibleCrUseOfTrainUnloadManager({
          error: Error()
        }), TrainUnloadManager) : TrainUnloadManager,
        displayName: '卸货管理器',
        tooltip: '与 TrainManager 同节点的 TrainUnloadManager，用于按类型查找资源仓库'
      }), _dec11 = property({
        type: [Node],
        displayName: '特效节点',
        tooltip: '用于播放火车运行时的特效'
      }), _dec12 = property({
        displayName: '是否Lv1'
      }), _dec13 = property({
        type: Animation,
        displayName: 'Lv1动画'
      }), _dec(_class = (_class2 = class Train extends Component {
        constructor(...args) {
          super(...args);

          // ─────────────────────────────────────────────
          // Inspector 属性
          // ─────────────────────────────────────────────
          _initializerDefineProperty(this, "track", _descriptor, this);

          _initializerDefineProperty(this, "headCar", _descriptor2, this);

          _initializerDefineProperty(this, "trainCars", _descriptor3, this);

          _initializerDefineProperty(this, "speed", _descriptor4, this);

          _initializerDefineProperty(this, "yawOffset", _descriptor5, this);

          _initializerDefineProperty(this, "stationArriveDistance", _descriptor6, this);

          _initializerDefineProperty(this, "unloadDuration", _descriptor7, this);

          _initializerDefineProperty(this, "autoRun", _descriptor8, this);

          _initializerDefineProperty(this, "unloadManager", _descriptor9, this);

          _initializerDefineProperty(this, "effectNodes", _descriptor10, this);

          _initializerDefineProperty(this, "isLv1", _descriptor11, this);

          _initializerDefineProperty(this, "lv1Animation", _descriptor12, this);

          // ─────────────────────────────────────────────
          // 运行时数据
          // ─────────────────────────────────────────────

          /** 当前状态 */
          this._state = TrainState.Idle;

          /** 火车头在轨道上的归一化进度 [0,1) */
          this._progress = 0;

          /** 玩家是否正在长按屏幕 */
          this._isTouching = false;

          /** 站台进度（需在轨道扩张后调用 syncStationProgress() 更新） */
          this._stationProgress = 0;

          /** 是否已离开站台（用于判断回站检测时机） */
          this._hasLeftStation = false;
          this._arrivalGraceTime = 0;

          /** 车厢满事件是否已发送（防止每帧重复发送） */
          this._fullEventFired = false;

          /** 是否有玩家正在乘车 */
          this._hasPlayer = false;

          /**
           * 本次到站/停车后是否已经触发过卸货
           * 防止「到站自动卸货」与「玩家下车卸货」同时触发两次
           * 每次火车出发（Moving）时重置
           */
          this._unloadFired = false;

          /**
           * 卸货缓冲容器：按顺序存放所有车厢（车头仓→车厢0→车厢1→…）的卸货记录
           * 收集阶段：统计每节车厢的资源类型和数量，将车厢物品节点直接 putNode 回收
           * 发送阶段：按 count 次调用 container.receive()，播放飞行动画放入仓库
           */
          this._pendingItems = [];

          /** 所有车厢的总容量（由 _refreshTotalCapacity 计算） */
          this._totalCapacity = 0;
          this._sawLoopRunning = false;

          this._playSawSound = () => {
            if (!this.node.active) {
              this._stopSawLoop();

              return;
            }

            app.audio.playEffect('resources/audio/电锯', 0.6);
          };

          this._onGameOverStop = () => {
            this._stopSawLoop();
          };
        }

        /** 所有仓（车头仓 + 车厢）的当前总载量 */
        get _totalLoad() {
          return this._allCars.reduce((sum, car) => sum + car.currentLoad, 0);
        }
        /** 返回所有资源仓：车头仓（若存在）+ 车厢列表 */


        get _allCars() {
          return this.headCar ? [this.headCar, ...this.trainCars] : this.trainCars;
        }

        _startSawLoop() {
          if (this._sawLoopRunning) return;
          this.unschedule(this._playSawSound);

          this._playSawSound();

          this.schedule(this._playSawSound, 3);
          this._sawLoopRunning = true;
        }

        _stopSawLoop() {
          if (!this._sawLoopRunning) return;
          this.unschedule(this._playSawSound);
          this._sawLoopRunning = false;
        }

        // ─────────────────────────────────────────────
        // 生命周期
        // ─────────────────────────────────────────────
        onLoad() {
          // 同步站台进度并将火车放到站台位置
          this.syncStationProgress();
          this._progress = this._stationProgress;

          this._refreshTotalCapacity(); // 初始化每节车厢的轨道引用和累计间距


          this._initCarsOnTrack();

          this._snapToProgress(this._progress);
        }

        onEnable() {
          if (this.autoRun) {
            // 自动模式：激活时立即开始行驶
            this._startAutoRun();

            this._startSawLoop();
          } // 手动模式：不在这里注册触摸，等玩家上车后由 onPlayerBoard() 注册


          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).ShowOver, this._onGameOverStop, this);
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).GameWin, this._onGameOverStop, this);
        }

        onDisable() {
          // 无论哪种模式，禁用时都注销触摸并重置状态
          input.off(Input.EventType.TOUCH_START, this._onTouchStart, this);
          input.off(Input.EventType.TOUCH_END, this._onTouchEnd, this);
          input.off(Input.EventType.TOUCH_CANCEL, this._onTouchEnd, this);
          this._isTouching = false;
          this._hasPlayer = false;

          this._stopSawLoop();

          app.event.off((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).ShowOver, this._onGameOverStop);
          app.event.off((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).GameWin, this._onGameOverStop);
        }

        onDestroy() {
          this._stopSawLoop();

          app.event.off((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).ShowOver, this._onGameOverStop);
          app.event.off((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).GameWin, this._onGameOverStop);
        }

        update(dt) {
          if (this._state !== TrainState.Moving) return; // 手动模式：松手则暂停；自动模式：不受 _isTouching 影响

          if (!this.autoRun && !this._isTouching) {
            this._stopTrain();

            return;
          }

          if (this._arrivalGraceTime > 0) {
            this._arrivalGraceTime -= dt;
            if (this._arrivalGraceTime < 0) this._arrivalGraceTime = 0;
          } // 推进进度


          const distance = this.speed * dt;
          this._progress = this.track.advanceDistance(this._progress, distance); // 更新火车头位置和朝向

          const headPos = this.track.getPositionAt(this._progress);
          const headDir = this.track.getDirectionAt(this._progress);
          this.node.setWorldPosition(headPos);

          this._updateHeadFacing(headDir); // 更新所有车厢


          this._updateCars(); // 发送移动事件（供摄像机跟随等使用）


          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).JeepCarMove, headPos); // 判断是否回到站台

          const stationPos = this.track.getPositionAt(this._stationProgress);
          const distToStation = Vec3.distance(headPos, stationPos);

          if (this._arrivalGraceTime <= 0 && this._hasLeftStation) {
            if (distToStation <= this.stationArriveDistance) {
              this._arriveStation();

              return;
            }
          } else {
            // 离开站台足够远后才开始检测回站
            if (distToStation > this.stationArriveDistance * 3) {
              this._hasLeftStation = true;
            }
          } // 判断车厢是否全满：只发事件（通知 Chainsaw 停止收割），火车继续行驶


          if (this._isFull()) {
            if (!this._fullEventFired) {
              this._fullEventFired = true;
              app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
                error: Error()
              }), CommonEvent) : CommonEvent).TrainCarFull);
            }
          } else {
            this._fullEventFired = false;
          }
        } // ─────────────────────────────────────────────
        // 公开接口
        // ─────────────────────────────────────────────

        /** 当前状态 */


        get state() {
          return this._state;
        }
        /** 当前行驶进度 [0,1) */


        get progress() {
          return this._progress;
        }
        /** 在指定进度对齐朝向（升级吸附时同步方向用） */


        alignFacingAtProgress(progress) {
          if (!this.track) return;
          const dir = this.track.getDirectionAt(progress);

          this._updateHeadFacing(dir);
        }
        /**
         * 在指定进度位置初始化火车（升级切换时由 TrainManager 调用）
         * 新火车从旧火车当前位置继续行驶，避免瞬移
         * @param progress 继承自旧火车的轨道进度
         */


        initAtProgress(progress) {
          this._progress = progress;
          this._hasLeftStation = false; // 若已离开站台则直接标记，避免新火车出现后立刻触发到站

          const stationPos = this.track.getPositionAt(this._stationProgress);
          const headPos = this.track.getPositionAt(progress);

          if (Vec3.distance(headPos, stationPos) > this.stationArriveDistance * 3) {
            this._hasLeftStation = true;
          }

          this._snapToProgress(this._progress);

          this._arrivalGraceTime = 0.3;
        }
        /**
         * 同步站台进度（轨道扩张后必须调用，否则到站判定位置会漂移）
         * TrainManager 在每次轨道扩张完成的回调中统一调用
         */


        syncStationProgress() {
          this._stationProgress = this.track ? this.track.getStationProgress() : 0;
        }
        /**
         * 向车厢添加资源（由 Chainsaw 锯条收割时调用）
         * 优先填充车头仓，再依次填充各节车厢
         * @param type 资源类型
         * @param amount 数量
         * @returns 实际添加的数量
         */


        addResource(type, amount) {
          console.log(`[Train] addResource type=${type} amount=${amount} 总车厢数=${this._allCars.length}`);

          for (let i = 0; i < this._allCars.length; i++) {
            const car = this._allCars[i];
            console.log(`[Train]   车厢[${i}] load=${car.currentLoad}/${car.capacity} resType=${car.resourceType} isFull=${car.isFull}`);
            const added = car.addResource(type, amount);
            console.log(`[Train]   车厢[${i}] addResource → added=${added}`);
            if (added > 0) return added;
          }

          console.warn(`[Train] ⚠️ 所有车厢均无法接收 type=${type} amount=${amount}`);
          return 0;
        }
        /**
         * 找到第一个能接收该类型资源的车厢（addResource 成功前的预查询）
         * 用于 Chainsaw 获取飞行动画目标车厢
         */


        getCarForResource(type) {
          for (const car of this._allCars) {
            if (!car.isFull && (car.currentLoad === 0 || car.resourceType === type)) {
              return car;
            }
          }

          return null;
        }
        /** 获取所有车厢的当前总载量 */


        getTotalLoad() {
          return this._totalLoad;
        }
        /** 获取所有车厢的总容量 */


        getTotalCapacity() {
          return this._totalCapacity;
        }
        /**
         * 玩家上车（由 TrainBoardingTrigger 触发）
         * 仅在非自动模式（autoRun = false）时生效。
         * 切换到手动模式，注册触摸监听，等待玩家按屏幕启动火车。
         */


        onPlayerBoard() {
          if (this.autoRun) return; // Lv3 自动模式不允许上车

          this._hasPlayer = true;
          this._arrivalGraceTime = 0.3;
          input.on(Input.EventType.TOUCH_START, this._onTouchStart, this);
          input.on(Input.EventType.TOUCH_END, this._onTouchEnd, this);
          input.on(Input.EventType.TOUCH_CANCEL, this._onTouchEnd, this);

          this._applyBoardEffects(true);

          if (this.node.active) this._startSawLoop();
        }
        /**
         * 玩家下车（到站时由 _arriveStation 内部调用，或外部强制下车）
         * 注销触摸监听，重置触摸状态，广播下车事件。
         *
         * 若玩家在站外中途下车（State = Moving / Idle），
         * 且车厢有货，则触发卸货（_doUnload 内部有 _unloadFired 防重复）。
         * 若是到站后由 _arriveStation 调用此方法，_arriveStation 自己会调用 _doUnload，
         * 此处因 _unloadFired 已被置 true 而跳过，不会重复卸货。
         */


        onPlayerAlight() {
          this._hasPlayer = false;
          this._isTouching = false;

          this._applyBoardEffects(false);

          input.off(Input.EventType.TOUCH_START, this._onTouchStart, this);
          input.off(Input.EventType.TOUCH_END, this._onTouchEnd, this);
          input.off(Input.EventType.TOUCH_CANCEL, this._onTouchEnd, this);
          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).HeroAlighted);

          this._stopSawLoop(); // 站外下车：若有货则触发卸货
          // 到站时 _arriveStation 先调用本函数，此时 _unloadFired 尚为 false，
          // 但 _arriveStation 随后会立即调用 _doUnload(0.1)，
          // 所以这里统一用 _doUnload(0) 尝试触发，内部防重复保证不会执行两次。
          // 注意：到站流程中 _arriveStation 在调用 onPlayerAlight 之后才调用 _doUnload，
          // 因此此处调用时 _unloadFired 仍为 false —— 为避免抢先触发导致状态不一致，
          // 仅在「非到站停车」状态下才在此发起卸货。


          if (this._state !== TrainState.StopAtStation) {
            // 停车再卸货：先让火车停下，再触发卸货流程
            this._stopTrain();

            this._doUnload(0);
          }
        }
        /** 是否有玩家正在乘车 */


        get hasPlayer() {
          return this._hasPlayer;
        }
        /**
         * 强制停止火车（外部调用，如玩家下车）
         */


        stopTrain() {
          this._isTouching = false;

          this._stopTrain();
        }
        /**
         * 外部强制切换为自动驾驶模式并立即出发（运行时动态切换用）
         * 若只是初始化，在 Inspector 勾选 autoRun 即可，无需手动调用
         */


        startAutoRun() {
          this.autoRun = true; // 若当前有触摸监听则先注销，避免重复

          input.off(Input.EventType.TOUCH_START, this._onTouchStart, this);
          input.off(Input.EventType.TOUCH_END, this._onTouchEnd, this);
          input.off(Input.EventType.TOUCH_CANCEL, this._onTouchEnd, this);

          this._startAutoRun();

          this._startSawLoop();
        }
        /**
         * 外部切换为手动触摸模式（运行时动态切换用）
         */


        startManualRun() {
          this.autoRun = false;
          this._isTouching = false;
          input.on(Input.EventType.TOUCH_START, this._onTouchStart, this);
          input.on(Input.EventType.TOUCH_END, this._onTouchEnd, this);
          input.on(Input.EventType.TOUCH_CANCEL, this._onTouchEnd, this); // 切换到手动后停止，等待玩家按屏幕

          this._stopTrain();
        }
        /**
         * 统一显示/隐藏火车头及所有关联车厢节点
         * TrainManager 切换火车时应调用此方法，而非直接操作 node.active，
         * 确保车厢节点（独立于火车头节点树之外）同步跟随。
         */


        setVisible(visible) {
          // 显示时：先激活车厢，再激活火车头（触发 onEnable 时车厢已就绪）
          // 隐藏时：先隐藏火车头（触发 onDisable），再隐藏车厢
          if (visible) {
            var _this$headCar;

            if ((_this$headCar = this.headCar) != null && (_this$headCar = _this$headCar.node) != null && _this$headCar.isValid) this.headCar.node.active = true;

            for (const car of this.trainCars) {
              var _car$node;

              if (car != null && (_car$node = car.node) != null && _car$node.isValid) car.node.active = true;
            }

            this.node.active = true;
          } else {
            var _this$headCar2;

            this._applyBoardEffects(false);

            this.node.active = false;

            for (const car of this.trainCars) {
              var _car$node2;

              if (car != null && (_car$node2 = car.node) != null && _car$node2.isValid) car.node.active = false;
            }

            if ((_this$headCar2 = this.headCar) != null && (_this$headCar2 = _this$headCar2.node) != null && _this$headCar2.isValid) this.headCar.node.active = false;
          }
        }
        /**
         * 重置火车到站台初始状态
         */


        reset() {
          this._state = TrainState.Idle;
          this._isTouching = false;
          this._hasLeftStation = false;
          this._progress = this._stationProgress;

          this._snapToProgress(this._progress);

          for (const car of this._allCars) {
            car.reset();
          }
        } // ─────────────────────────────────────────────
        // 触摸事件
        // ─────────────────────────────────────────────


        _onTouchStart(_evt) {
          if (this._state === TrainState.StopAtStation) return;
          this._isTouching = true;

          if (this._state === TrainState.Idle) {
            this._unloadFired = false; // 新一圈出发，重置卸货标志

            this._state = TrainState.Moving;
            this._hasLeftStation = false;
            this._arrivalGraceTime = 0.3;
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).TrainStarted);
          }
        }

        _onTouchEnd(_evt) {
          this._isTouching = false;
        } // ─────────────────────────────────────────────
        // 内部逻辑
        // ─────────────────────────────────────────────

        /** 内部启动自动行驶（autoRun 模式专用） */


        _startAutoRun() {
          if (this._state === TrainState.StopAtStation) return;
          this._hasLeftStation = false;
          this._unloadFired = false; // 新一圈出发，重置卸货标志

          this._state = TrainState.Moving;
          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).TrainStarted);
        }
        /** 停止火车（非到站，仅暂停） */


        _stopTrain() {
          if (this._state !== TrainState.Moving) return;
          this._state = TrainState.Idle;
        }

        _applyBoardEffects(active) {
          if (this.isLv1) {
            if (this.lv1Animation) {
              if (active) this.lv1Animation.play();else this.lv1Animation.stop();
            }

            return;
          }

          for (const n of this.effectNodes) {
            if (n && n.isValid) n.active = active;
          }
        }
        /** 到达站台处理 */


        _arriveStation() {
          this._state = TrainState.StopAtStation;
          this._isTouching = false;
          this._hasLeftStation = false;
          this._fullEventFired = false; // 对齐到站台精确位置

          this._progress = this._stationProgress;

          this._snapToProgress(this._progress);

          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).TrainArrived); // 如果有玩家在车上，到站时触发下车
          // 注意：onPlayerAlight 内部会检测 _unloadFired，此处到站卸货尚未触发，
          // 下车逻辑里不会重复触发卸货，顺序：先下车广播 → 再执行卸货

          if (this._hasPlayer) {
            this.onPlayerAlight();
          } // 到站卸货（延迟 0.1s 等对齐动画）


          this._doUnload(0.1);
        }
        /**
         * 执行卸货流程（防止重复触发）
         *
         * 触发时机：
         *  - 非自动模式（autoRun=false）：玩家下车时（onPlayerAlight）
         *  - 自动模式（autoRun=true）：到站时（_arriveStation）
         *
         * 新流程（两阶段）：
         *  1. 收集阶段（_collectPendingItems）：
         *     按 _allCars 顺序（车头仓→车厢0→车厢1→…）遍历所有车厢，
         *     将每节车厢 itemLayout 内的资源节点逐一转移到 effect.node，
         *     记录 { node, type, fromPos } 到 _pendingItems 容器，
         *     然后清空布局记录（detachAllItems）并重置车厢计数（unload）。
         *  2. 发送阶段（_flushPendingItems）：
         *     遍历 _pendingItems，按 type 查找对应容器（WheatContainer / WoodContainer），
         *     调用 container.receive() 播放飞行动画放入仓库。
         *
         * @param delay 延迟秒数，到站时给 0.1s 等对齐，站外下车直接用 0
         */


        _doUnload(delay = 0) {
          // 防止同一次停车触发两次（到站 + 玩家下车）
          if (this._unloadFired) {
            console.log('[Train] _doUnload: 已触发过，跳过重复卸货');
            return;
          }

          this._unloadFired = true;

          const execute = () => {
            this._state = TrainState.Unloading; // ── 在卸货前快照所有已被收割的作物，用于后续分帧再生 ──

            const rfm = (_crd && ResourceFieldManager === void 0 ? (_reportPossibleCrUseOfResourceFieldManager({
              error: Error()
            }), ResourceFieldManager) : ResourceFieldManager).instance;
            console.log(`[Train] _doUnload execute: autoRun=${this.autoRun}, RFM存在=${!!rfm}`);
            const harvestedCrops = rfm ? rfm.collectHarvestedCrops() : [];
            console.log(`[Train] _doUnload: 快照已收割作物 ${harvestedCrops.length} 棵`); // ── 阶段1：收集所有车厢资源节点到 _pendingItems ──

            this._collectPendingItems(); // ── 阶段2：将 _pendingItems 内节点按类型送入对应仓库，等所有飞行动画落地后再继续 ──


            this._flushPendingItems(() => {
              // ── 阶段3：分帧触发已收割作物的再生计时器 ──
              if (harvestedCrops.length > 0) {
                var _instance;

                (_instance = (_crd && ResourceFieldManager === void 0 ? (_reportPossibleCrUseOfResourceFieldManager({
                  error: Error()
                }), ResourceFieldManager) : ResourceFieldManager).instance) == null || _instance.startBatchRegrow(harvestedCrops);
              } // 所有飞行动画完成，切回 Idle 并（自动模式下）重新出发


              this.finishUnload();
            });
          };

          if (delay > 0) {
            this.scheduleOnce(execute, delay);
          } else {
            execute();
          }
        }
        /**
         * 阶段1：收集阶段
         * 按 _allCars 顺序（车头仓→车厢0→车厢1→…）遍历每节车厢：
         *  1. 读取 itemLayout 实际节点数作为 count（比 currentLoad 更准确）
         *  2. 将车厢内所有物品节点直接 putNode 回收到对象池（安全、无父节点迁移风险）
         *  3. 清空布局记录（clearAllItems）并重置车厢计数（unload）
         *  4. 将 { type, count } 推入 _pendingItems
         *
         * 发送阶段（_flushPendingItems）按 count 次调用 container.receive()，
         * 播放飞行动画放入仓库。
         */


        _collectPendingItems() {
          this._pendingItems = [];
          console.log('[Train] _collectPendingItems 开始，车厢数=', this._allCars.length);

          for (const car of this._allCars) {
            if (!car.itemLayout) {
              // 无布局：仅重置计数
              car.unload();
              continue;
            } // 取出所有有效的资源节点（仅读取，用于计数 + 回收）


            const itemNodes = car.itemLayout.getAllItemNodes().filter(n => n && n.isValid);
            const count = itemNodes.length;
            console.log(`[Train]   car=${car.node.name} count=${count} type=${car.resourceType}`);

            if (count === 0) {
              car.unload();
              car.itemLayout.clearAllItems();
              continue;
            } // 提前保存资源类型（unload() 会将其重置为 None）


            const resourceType = car.resourceType; // 将车厢内所有物品节点安全回收到对象池
            // 不做节点迁移，直接 putNode，由发送阶段让仓库从对象池取新节点飞入

            for (const n of itemNodes) {
              manager.pool.putNode(n);
            } // 清空布局记录（节点已回收，使用 clearAllItems 彻底清理 Map）


            car.itemLayout.clearAllItems(); // 清空车厢计数（同时重置 _resourceType = None）

            car.unload(); // 记录本节车厢的卸货信息（只需 type 和数量，瞬间放入不需要坐标）

            this._pendingItems.push({
              type: resourceType,
              count
            });
          }

          const totalCount = this._pendingItems.reduce((s, it) => s + it.count, 0);

          console.log(`[Train] _collectPendingItems 完成，共 ${this._pendingItems.length} 节车厢，待发送 ${totalCount} 个资源`);
        }
        /**
         * 阶段2：发送阶段
         * 遍历 _pendingItems，按 type 查找对应容器（WheatContainer / WoodContainer），
         * 按 count 次调用 container.receive()，播放飞行动画放入仓库。
         * 所有飞行动画完成后调用 onAllArrived；若没有任何资源则立即调用。
         * @param onAllArrived 所有飞行动画落地后的回调
         */


        _flushPendingItems(onAllArrived) {
          const totalCount = this._pendingItems.reduce((s, it) => s + it.count, 0);

          console.log(`[Train] _flushPendingItems 开始，共 ${totalCount} 个资源待发送`);

          if (totalCount === 0) {
            this._pendingItems = [];
            console.log('[Train] _flushPendingItems 无资源，直接完成');
            onAllArrived();
            return;
          }

          const fromPosition = this.node.getWorldPosition();
          let remaining = 0;

          for (const item of this._pendingItems) {
            var _this$unloadManager$g, _this$unloadManager;

            const container = (_this$unloadManager$g = (_this$unloadManager = this.unloadManager) == null ? void 0 : _this$unloadManager.getContainer(item.type)) != null ? _this$unloadManager$g : null;

            if (!container) {
              console.warn(`[Train] ⚠️ 未找到类型 ${item.type} 的容器（WheatContainer/WoodContainer），跳过 ${item.count} 个资源`);
              continue;
            }

            for (let i = 0; i < item.count; i++) {
              const accepted = container.receive(fromPosition, () => {
                remaining--;

                if (remaining <= 0) {
                  console.log('[Train] _flushPendingItems 所有飞行动画完成');
                  onAllArrived();
                }
              });

              if (accepted) {
                remaining++;
              }
            }
          } // 清空容器，释放引用


          this._pendingItems = []; // 若所有 receive 均返回 false（对象池耗尽），直接完成

          if (remaining <= 0) {
            console.log('[Train] _flushPendingItems 所有 receive 未成功，直接完成');
            onAllArrived();
            return;
          }

          console.log(`[Train] _flushPendingItems 等待 ${remaining} 个飞行动画完成`);
        }
        /**
         * 卸货完成后恢复 Idle 并（自动模式下）重新出发
         * 由 _doUnload 执行完毕后内部调用
         */


        finishUnload() {
          this._state = TrainState.Idle;
          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).TrainIdle);

          if (this.autoRun) {
            this._startAutoRun();
          }
        }
        /**
         * 初始化所有车厢的轨道引用和累计间距
         * 在 onLoad 时调用一次
         */


        _initCarsOnTrack() {
          if (!this.track) return;
          let accumulated = 0;

          for (const car of this.trainCars) {
            accumulated += car.spacing;
            car.initOnTrack(this.track, accumulated);
          }
        }
        /**
         * 更新所有车厢的位置和朝向
         * 每节车厢根据车头进度减去累计间距，独立计算自己在轨道上的位置
         * @param updateFacing 是否同时更新朝向，初始化/重置时传 false
         */


        _updateCars(updateFacing = true) {
          for (const car of this.trainCars) {
            car.updateOnTrack(this._progress, updateFacing);
          }
        }
        /** 将火车头和车厢直接吸附到指定进度（不播放动画，用于初始化/重置） */


        _snapToProgress(progress) {
          if (!this.track) return;
          const headPos = this.track.getPositionAt(progress);
          this.node.setWorldPosition(headPos);

          this._updateCars(false); // 仅更新位置，保持编辑器设定的初始朝向

        }
        /** 更新火车头朝向，只旋转 this.node 的 Y 轴，子模型节点随父节点一起转 */


        _updateHeadFacing(direction) {
          if (Vec3.equals(direction, Vec3.ZERO)) return;
          const yaw = Math.atan2(direction.x, direction.z) * (180 / Math.PI) + this.yawOffset;
          this.node.setRotationFromEuler(0, yaw, 0);
        }
        /**
         * 判断所有仓（车头仓 + 车厢）是否全满
         * 注意：无任何仓时返回 false（不触发满载停车）
         */


        _isFull() {
          const all = this._allCars;
          if (all.length === 0) return false;

          for (const car of all) {
            if (!car.isFull) return false;
          }

          return true;
        }
        /** 重新计算总容量（包括车头仓） */


        _refreshTotalCapacity() {
          this._totalCapacity = this._allCars.reduce((sum, car) => sum + car.capacity, 0);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "track", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "headCar", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "trainCars", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "speed", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 6;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "yawOffset", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 90;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "stationArriveDistance", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.8;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "unloadDuration", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 2.0;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "autoRun", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "unloadManager", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "effectNodes", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "isLv1", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "lv1Animation", [_dec13], {
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
//# sourceMappingURL=860eebd987d2d83f1a3cfea0ca556e41568cec26.js.map