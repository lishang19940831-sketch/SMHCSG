System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Enum, Node, Vec3, Character, PickupComponent, ComponentInitializer, ComponentEvent, BuildingType, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, SalesmanState, Salesman;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCharacter(extras) {
    _reporterNs.report("Character", "./Character", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPickupComponent(extras) {
    _reporterNs.report("PickupComponent", "../Components/PickupComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentInitializer(extras) {
    _reporterNs.report("ComponentInitializer", "../Common/ComponentInitializer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../Common/ComponentEvents", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildingType(extras) {
    _reporterNs.report("BuildingType", "../Common/CommonEnum", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Enum = _cc.Enum;
      Node = _cc.Node;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      Character = _unresolved_2.Character;
    }, function (_unresolved_3) {
      PickupComponent = _unresolved_3.PickupComponent;
    }, function (_unresolved_4) {
      ComponentInitializer = _unresolved_4.ComponentInitializer;
    }, function (_unresolved_5) {
      ComponentEvent = _unresolved_5.ComponentEvent;
    }, function (_unresolved_6) {
      BuildingType = _unresolved_6.BuildingType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1a2622DF75IBofKy8QKmmMc", "Salesman", undefined);

      __checkObsolete__(['_decorator', 'Enum', 'Node', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 售货员状态枚举
       */

      _export("SalesmanState", SalesmanState = /*#__PURE__*/function (SalesmanState) {
        SalesmanState["Inactive"] = "Inactive";
        SalesmanState["MovingToStation"] = "MovingToStation";
        SalesmanState["Working"] = "Working";
        return SalesmanState;
      }({}));
      /**
       * Salesman —— 售货员
       *
       * 生命周期：
       *  1. 初始状态 Inactive：冰封，不执行任何逻辑
       *  2. 调用 activate() 后 → MovingToStation：自动走向工作岗位（shopCollider 区域），播放行走动画
       *  3. 到达工作岗位 → Working：播放在岗动画，站在 shopCollider 上
       *     ShopCommon / ProductionBuilding 的触发器会自动检测到身上的 PickupComponent 并处理背包逻辑
       *
       * 依赖组件（挂在同一节点或编辑器拖入）：
       *  - MovementComponent        移动
       *  - BaseAnimationComponent   动画
       *  - StateComponent           状态机
       *  - PickupComponent          背包（供 ShopCommon 触发器自动检测）
       */


      _export("Salesman", Salesman = (_dec = ccclass('Salesman'), _dec2 = property({
        type: _crd && PickupComponent === void 0 ? (_reportPossibleCrUseOfPickupComponent({
          error: Error()
        }), PickupComponent) : PickupComponent,
        displayName: '背包组件'
      }), _dec3 = property({
        type: Node,
        displayName: '工作岗位节点'
      }), _dec4 = property({
        displayName: '在岗动画名称',
        tooltip: '留空使用默认 idle'
      }), _dec5 = property({
        displayName: '到达判定距离'
      }), _dec6 = property({
        type: Enum(_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
          error: Error()
        }), BuildingType) : BuildingType),
        displayName: '售货员类型',
        tooltip: '售货员1和售货员2'
      }), _dec(_class = (_class2 = class Salesman extends (_crd && Character === void 0 ? (_reportPossibleCrUseOfCharacter({
        error: Error()
      }), Character) : Character) {
        constructor() {
          super(...arguments);

          // ──────────────────────────────────────────────
          // Inspector 属性
          // ──────────────────────────────────────────────

          /** 背包组件 */
          _initializerDefineProperty(this, "pickupComponent", _descriptor, this);

          /**
           * 工作岗位节点。
           * 把此节点放在 ShopCommon / ProductionBuilding 的 shopCollider 触发器范围内，
           * 售货员到达后站立，触发器自动检测 PickupComponent 完成后续逻辑。
           */
          _initializerDefineProperty(this, "workStationNode", _descriptor2, this);

          /**
           * 到达工作岗位后播放的动画名称。
           * 留空则播放默认 idle 动画。
           */
          _initializerDefineProperty(this, "workAnimName", _descriptor3, this);

          /** 判定"到达"工作岗位的距离阈值（米） */
          _initializerDefineProperty(this, "arriveThreshold", _descriptor4, this);

          /** 售货员类型 */
          _initializerDefineProperty(this, "salesmanType", _descriptor5, this);

          // ──────────────────────────────────────────────
          // 私有状态
          // ──────────────────────────────────────────────

          /** 当前售货员状态 */
          this._state = SalesmanState.Inactive;

          /** 缓存的工作岗位世界坐标 */
          this._workStationPos = null;

          /** 防止重复到达判定的标记 */
          this._arrivedHandled = false;
        }

        // ──────────────────────────────────────────────
        // 生命周期
        // ──────────────────────────────────────────────

        /**是否激活 */
        getIsActive() {
          return this._state !== SalesmanState.Inactive;
        }

        onLoad() {
          super.onLoad(); // 自动获取 / 初始化背包组件

          (_crd && ComponentInitializer === void 0 ? (_reportPossibleCrUseOfComponentInitializer({
            error: Error()
          }), ComponentInitializer) : ComponentInitializer).initComponents(this.node, {
            pickupComponent: _crd && PickupComponent === void 0 ? (_reportPossibleCrUseOfPickupComponent({
              error: Error()
            }), PickupComponent) : PickupComponent
          }, this); // 缓存工作岗位坐标

          if (this.workStationNode && this.workStationNode.isValid) {
            this._workStationPos = this.workStationNode.getWorldPosition().clone();
          } // 监听到达目标事件


          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).TARGET_REACHED, this._onTargetReached, this);
        }

        onDestroy() {
          super.onDestroy();
          this.node.off((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).TARGET_REACHED, this._onTargetReached, this);
        }

        update(dt) {
          super.update(dt); // 未激活时跳过所有逻辑

          if (this._state === SalesmanState.Inactive) return; // 前往工作岗位途中：若意外停止移动则重新出发

          if (this._state === SalesmanState.MovingToStation) {
            if (!this.movementComponent.isMoving && !this._arrivedHandled) {
              this._tryArrive();
            }
          } // 在岗：持续维持在岗动画（防止被状态机覆盖后卡帧）


          if (this._state === SalesmanState.Working) {
            this._maintainWorkAnim();
          }
        } // ──────────────────────────────────────────────
        // 公共接口
        // ──────────────────────────────────────────────

        /**
         * 激活售货员，通常由关卡管理器在解锁条件满足后调用。
         * @param workStationPos 工作岗位世界坐标（可选，优先使用 Inspector 中的 workStationNode）
         */


        activate(workStationPos) {
          if (this._state !== SalesmanState.Inactive) {
            console.warn('[Salesman] 已激活，忽略重复调用');
            return;
          } // 外部传入坐标优先


          if (workStationPos) {
            this._workStationPos = workStationPos.clone();
          } // 允许改变朝向


          if (this.movementComponent) {
            this.movementComponent.IsKeepFace = false;
          } // 切换状态并出发


          this._state = SalesmanState.MovingToStation;
          this._arrivedHandled = false;

          this._moveToWorkStation();
        }
        /** 获取当前状态 */


        getSalesmanState() {
          return this._state;
        }
        /** 获取背包组件 */


        getPickupComponent() {
          return this.pickupComponent;
        }
        /**
         * 重置售货员到初始未激活状态（关卡重置时调用）
         */


        reset() {
          this._state = SalesmanState.Inactive;
          this._arrivedHandled = false; // 锁定朝向（恢复初始朝向）

          if (this.movementComponent) {
            this.movementComponent.IsKeepFace = true;
          }

          super.reset();
        } // ──────────────────────────────────────────────
        // Character 抽象方法实现
        // ──────────────────────────────────────────────

        /** 售货员无攻击目标 */


        GetAttackTarget() {
          return null;
        } // ──────────────────────────────────────────────
        // 私有方法
        // ──────────────────────────────────────────────

        /** 移动到工作岗位 */


        _moveToWorkStation() {
          if (!this._workStationPos) {
            console.warn('[Salesman] 未设置工作岗位坐标，直接进入工作状态');

            this._startWorking();

            return;
          }

          this.moveToWorldPosition(this._workStationPos);
        }
        /** 尝试判断是否已到达工作岗位 */


        _tryArrive() {
          if (!this._workStationPos) return;
          var dist = Vec3.distance(this.node.getWorldPosition(), this._workStationPos);

          if (dist <= this.arriveThreshold) {
            this._arrivedHandled = true;

            this._startWorking();
          } else {
            // 距离不够，重新出发
            this._moveToWorkStation();
          }
        }
        /** MovementComponent 到达目标时的回调 */


        _onTargetReached() {
          if (this._state !== SalesmanState.MovingToStation) return;
          if (this._arrivedHandled) return;

          this._tryArrive();
        }
        /** 开始在岗工作 */


        _startWorking() {
          this._state = SalesmanState.Working; // 停止移动，站在 shopCollider 上
          // ShopCommon / ProductionBuilding 的触发器会自动检测 PickupComponent

          this.stopMoving(); // 播放在岗动画

          this._playWorkAnim();

          console.log('[Salesman] 到达工作岗位，开始工作');
        }
        /** 播放在岗动画 */


        _playWorkAnim() {
          if (!this.animationComponent) return; // workAnimName 有值时子类可扩展为自定义动作，当前统一播放 idle

          this.animationComponent.playIdle();
        }
        /** 每帧维持在岗动画（防止状态机将其覆盖） */


        _maintainWorkAnim() {
          if (!this.animationComponent) return;

          if (!this.animationComponent.isPlayingAnimation()) {
            this._playWorkAnim();
          }
        } // ──────────────────────────────────────────────
        // 动画状态机回调重写（在岗时屏蔽状态机动画切换）
        // ──────────────────────────────────────────────


        onMoveEnter() {
          if (this._state === SalesmanState.Working) return;
          super.onMoveEnter();
        }

        onMoveUpdate(dt) {
          if (this._state === SalesmanState.Working) return;
          super.onMoveUpdate(dt);
        }

        onIdleEnter() {
          if (this._state === SalesmanState.Working) {
            this._playWorkAnim();

            return;
          }

          super.onIdleEnter();
        }

        onIdleUpdate(dt) {
          if (this._state === SalesmanState.Working) return;
          super.onIdleUpdate(dt);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pickupComponent", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "workStationNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "workAnimName", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "arriveThreshold", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "salesmanType", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).Salesperson1;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=97823e66a313dd9cdf24921a930b9e053e2f4616.js.map