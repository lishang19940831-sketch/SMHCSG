System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Collider, Component, Node, Sprite, tween, CommonEvent, TrainManager, TrainState, Hero, JoystickControl, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, TrainBoardingTrigger;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTrainManager(extras) {
    _reporterNs.report("TrainManager", "../Train/TrainManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTrainState(extras) {
    _reporterNs.report("TrainState", "../Train/Train", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHero(extras) {
    _reporterNs.report("Hero", "../Role/Hero", _context.meta, extras);
  }

  function _reportPossibleCrUseOfJoystickControl(extras) {
    _reporterNs.report("JoystickControl", "../Joystick/JoystickControl", _context.meta, extras);
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
      Node = _cc.Node;
      Sprite = _cc.Sprite;
      tween = _cc.tween;
    }, function (_unresolved_2) {
      CommonEvent = _unresolved_2.CommonEvent;
    }, function (_unresolved_3) {
      TrainManager = _unresolved_3.TrainManager;
    }, function (_unresolved_4) {
      TrainState = _unresolved_4.TrainState;
    }, function (_unresolved_5) {
      Hero = _unresolved_5.Hero;
    }, function (_unresolved_6) {
      JoystickControl = _unresolved_6.JoystickControl;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f8ed9cvjRlMN5hBk55k6LNh", "TrainBoardingTrigger", undefined);

      __checkObsolete__(['_decorator', 'Collider', 'Component', 'ITriggerEvent', 'Node', 'Sprite', 'tween', 'Tween']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * TrainBoardingTrigger —— 火车乘车系统协调器
       *
       * 挂载位置：TrainManager 节点
       *
       * 节点结构：
       *  TrainManager（挂 TrainManager + TrainBoardingTrigger）
       *  ├── BoardingTrigger  ← 固定在站台，挂 BoxCollider(isTrigger=true)，与火车同级
       *  ├── TrainLv1
       *  ├── TrainLv2
       *  └── TrainLv3
       *
       * 职责：
       *  1. onLoad 时注册 BoardingTrigger 节点的碰撞事件
       *  2. 检测到玩家进入触发区，且火车处于 Idle 停站状态时，执行上车
       *  3. 上车：隐藏Hero模型 / 禁用摇杆 / 锁定Hero移动 / 通知Train玩家上车
       *  4. 每帧：玩家在车时，同步Hero位置到当前激活火车头位置
       *  5. 下车：监听 HeroAlighted 事件 → Hero传送到下车点 → 恢复模型/摇杆/移动
       *
       * Inspector 属性：
       *  - boardingTriggerNode : 站台固定碰撞触发器节点（BoardingTrigger）
       *  - joystickNode        : JoystickControl 所在节点
       *  - heroNode            : Hero 节点
       *  - alightPoint         : 下车点空节点（场景中固定位置）
       */

      _export("TrainBoardingTrigger", TrainBoardingTrigger = (_dec = ccclass('TrainBoardingTrigger'), _dec2 = property({
        type: Node,
        displayName: '上车触发器节点'
      }), _dec3 = property({
        type: Node,
        displayName: 'JoystickControl节点'
      }), _dec4 = property({
        type: Node,
        displayName: 'Hero节点'
      }), _dec5 = property({
        type: Node,
        displayName: '下车点节点'
      }), _dec6 = property({
        type: Node,
        displayName: '上车Sprite节点'
      }), _dec7 = property({
        type: Node,
        displayName: '上车进度节点'
      }), _dec(_class = (_class2 = class TrainBoardingTrigger extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "boardingTriggerNode", _descriptor, this);

          _initializerDefineProperty(this, "joystickNode", _descriptor2, this);

          _initializerDefineProperty(this, "heroNode", _descriptor3, this);

          _initializerDefineProperty(this, "alightPoint", _descriptor4, this);

          _initializerDefineProperty(this, "boardingSpriteNode", _descriptor5, this);

          _initializerDefineProperty(this, "fillSprite", _descriptor6, this);

          // ── 运行时 ──

          /** 是否玩家在车上 */
          this._isPlayerOnTrain = false;

          /** 玩家当前是否处于站台触发区域内（用于卸货结束后补触发上车） */
          this._isInTriggerZone = false;
          this._joystick = null;
          this._hero = null;
          this._trainManager = null;
          this._fillSprite = null;
          this._fillObj = {
            v: 0
          };
          this._fillTween = null;
          this._decayTween = null;
        }

        onLoad() {
          this._joystick = this.joystickNode.getComponent(_crd && JoystickControl === void 0 ? (_reportPossibleCrUseOfJoystickControl({
            error: Error()
          }), JoystickControl) : JoystickControl);
          this._hero = this.heroNode.getComponent(_crd && Hero === void 0 ? (_reportPossibleCrUseOfHero({
            error: Error()
          }), Hero) : Hero);
          this._trainManager = this.getComponent(_crd && TrainManager === void 0 ? (_reportPossibleCrUseOfTrainManager({
            error: Error()
          }), TrainManager) : TrainManager);
          this._fillSprite = this.fillSprite.getComponent(Sprite);
          if (this._fillSprite) this._fillSprite.fillRange = 0;
          if (this.fillSprite) this.fillSprite.active = false; // 注册站台固定碰撞触发器的事件

          const collider = this.boardingTriggerNode.getComponent(Collider);
          collider.on('onTriggerEnter', this._onTriggerEnter, this);
          collider.on('onTriggerExit', this._onTriggerExit, this); // 监听 Train 内部触发的下车事件

          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).HeroAlighted, this._onHeroAlighted, this); // 监听火车升级事件，升级时强制下车（防止状态残留）

          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).TrainUpgraded, this._forceAlight, this); // 监听卸货完毕事件：若玩家仍在触发区内则补触发上车

          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).TrainIdle, this._onTrainIdle, this);
        }

        onDestroy() {
          if (this.boardingTriggerNode && this.boardingTriggerNode.isValid) {
            const collider = this.boardingTriggerNode.getComponent(Collider);
            collider == null || collider.off('onTriggerEnter', this._onTriggerEnter, this);
            collider == null || collider.off('onTriggerExit', this._onTriggerExit, this);
          }

          if (this._fillTween) {
            this._fillTween.stop();

            this._fillTween = null;
          }

          if (this._decayTween) {
            this._decayTween.stop();

            this._decayTween = null;
          }

          app.event.offAllByTarget(this);
        }
        /**禁用玩家操作 */


        _disablePlayerControl() {
          this._joystick.setEnabled(false);
        }
        /**启用玩家操作 */


        _enablePlayerControl() {
          this._joystick.setEnabled(true);
        }

        update(_dt) {
          if (!this._isPlayerOnTrain) return; // 每帧：Hero 位置跟随当前激活的火车头

          const trainHeadPos = this._trainManager.activeTrain.node.getWorldPosition();

          this.heroNode.setWorldPosition(trainHeadPos);
        }

        getIsPlayerOnTrain() {
          return this._isPlayerOnTrain;
        } // ────────────────────────────────────────────
        // 私有方法
        // ────────────────────────────────────────────

        /** 站台碰撞触发器：进入 */


        _onTriggerEnter(event) {
          if (manager.game.isInteractionLocked) return;
          this._isInTriggerZone = true;

          if (this._decayTween) {
            this._decayTween.stop();

            this._decayTween = null;
          }

          if (this._fillTween) {
            this._fillTween.stop();

            this._fillTween = null;
          }

          this._fillObj.v = 0;
          if (this._fillSprite) this._fillSprite.fillRange = 0;
          if (this.boardingSpriteNode) this.boardingSpriteNode.active = true;
          if (this._isPlayerOnTrain) return;
          if (this._trainManager.activeTrain.state !== (_crd && TrainState === void 0 ? (_reportPossibleCrUseOfTrainState({
            error: Error()
          }), TrainState) : TrainState).Idle) return;
          this._fillTween = tween(this._fillObj).to(1.0, {
            v: 1
          }, {
            onUpdate: () => {
              if (this._fillSprite) this._fillSprite.fillRange = this._fillObj.v;
            }
          }).call(() => {
            if (!this._isInTriggerZone) return;
            if (this._isPlayerOnTrain) return;
            if (this._trainManager.activeTrain.state !== (_crd && TrainState === void 0 ? (_reportPossibleCrUseOfTrainState({
              error: Error()
            }), TrainState) : TrainState).Idle) return;

            const success = this._trainManager.tryBoardTrain();

            if (!success) {
              if (this._fillSprite) this._fillSprite.fillRange = 0;
              return;
            }

            this.boardingSpriteNode.active = true;

            this._boardTrain();

            if (this._fillSprite) this._fillSprite.fillRange = 0;
            this.boardingSpriteNode.active = false;
          }).start();
        }
        /** 站台碰撞触发器：离开 */


        _onTriggerExit(event) {
          this._isInTriggerZone = false;

          if (this._fillTween) {
            this._fillTween.stop();

            this._fillTween = null;
          }

          if (!this._fillSprite) {
            if (this.boardingSpriteNode) this.boardingSpriteNode.active = false;
            return;
          }

          const from = this._fillObj.v;
          this._decayTween = tween(this._fillObj).to(0.1, {
            v: 0
          }, {
            onUpdate: () => {
              this._fillSprite.fillRange = this._fillObj.v;
            }
          }).call(() => {
            this._decayTween = null;
            this.boardingSpriteNode.active = false;
          }).start();
        }
        /**
         * 卸货完毕、火车切换到 Idle 时回调。
         * 若玩家此时仍在触发区内且不在车上，补触发一次上车。
         */


        _onTrainIdle() {
          if (this._isPlayerOnTrain) return;
          if (!this._isInTriggerZone) return;

          if (this._decayTween) {
            this._decayTween.stop();

            this._decayTween = null;
          }

          if (this._fillTween) {
            this._fillTween.stop();

            this._fillTween = null;
          }

          this._fillObj.v = 0;
          if (this._fillSprite) this._fillSprite.fillRange = 0;
          if (this.boardingSpriteNode) this.boardingSpriteNode.active = true;
          this._fillTween = tween(this._fillObj).to(1.0, {
            v: 1
          }, {
            onUpdate: () => {
              if (this._fillSprite) this._fillSprite.fillRange = this._fillObj.v;
            }
          }).call(() => {
            if (!this._isInTriggerZone) return;
            if (this._isPlayerOnTrain) return;
            if (this._trainManager.activeTrain.state !== (_crd && TrainState === void 0 ? (_reportPossibleCrUseOfTrainState({
              error: Error()
            }), TrainState) : TrainState).Idle) return;

            const success = this._trainManager.tryBoardTrain();

            if (!success) {
              if (this._fillSprite) this._fillSprite.fillRange = 0;
              return;
            }

            this.boardingSpriteNode.active = true;

            this._boardTrain();

            if (this._fillSprite) this._fillSprite.fillRange = 0;
            this.boardingSpriteNode.active = false;
          }).start();
        }
        /** 执行上车逻辑 */


        _boardTrain() {
          this._isPlayerOnTrain = true; // 1. 隐藏 Hero 模型

          this._hero.setModelVisible(false); // 2. 禁用 Hero 移动组件


          this._hero.setMovementEnabled(false); // 3. 禁用摇杆（同时强制松手，清理摇杆状态）


          this._joystick.setEnabled(false); // 4. 发送上车事件（供其他系统监听，如 UI 提示）


          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).HeroBoarded);
        }
        /** 下车回调（由 Train 到站后触发 HeroAlighted 事件 → 此处响应） */


        _onHeroAlighted() {
          if (!this._isPlayerOnTrain) return;
          this._isPlayerOnTrain = false; // 1. 将 Hero 传送到下车点

          if (this.alightPoint) {
            this.heroNode.setWorldPosition(this.alightPoint.getWorldPosition());
          } // 2. 恢复 Hero 模型


          this._hero.setModelVisible(true); // 3. 恢复 Hero 移动组件


          this._hero.setMovementEnabled(true); // 4. 恢复摇杆


          this._joystick.setEnabled(true);
        }
        /**
         * 强制下车（火车升级时调用）
         * Train.onDisable 已清理触摸监听，此处补充恢复 Hero 状态
         */


        _forceAlight() {
          if (!this._isPlayerOnTrain) return;

          this._onHeroAlighted();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "boardingTriggerNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "joystickNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "heroNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "alightPoint", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "boardingSpriteNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "fillSprite", [_dec7], {
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
//# sourceMappingURL=c6c9637b5c31c42a01bc1489167ccf0e1aeaca8b.js.map