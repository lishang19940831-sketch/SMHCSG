System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, CCFloat, CCInteger, ObjectType, ItemLayout, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, TrainCar;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTrainTrack(extras) {
    _reporterNs.report("TrainTrack", "./TrainTrack", _context.meta, extras);
  }

  function _reportPossibleCrUseOfItemLayout(extras) {
    _reporterNs.report("ItemLayout", "../Tools/ItemLayout", _context.meta, extras);
  }

  function _reportPossibleCrUseOfItemLayoutPosition(extras) {
    _reporterNs.report("ItemLayoutPosition", "../Tools/ItemLayout", _context.meta, extras);
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
      Vec3 = _cc.Vec3;
      CCFloat = _cc.CCFloat;
      CCInteger = _cc.CCInteger;
    }, function (_unresolved_2) {
      ObjectType = _unresolved_2.ObjectType;
    }, function (_unresolved_3) {
      ItemLayout = _unresolved_3.ItemLayout;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8e2cfb5bEJCUaO7EviehuAy", "TrainCar", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'CCFloat', 'CCInteger']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * TrainCar —— 单节车厢（也可挂在车头节点上作为车头仓）
       *
       * 设计说明：
       *  - 车厢节点与车头平级，位置完全由代码每帧计算
       *  - 每节车厢持有轨道引用和自己的独立进度
       *  - 车厢进度 = 车头进度 - 累计间距 / 轨道总长
       *  - spacing 为本节车厢与前一节（或车头）的间距（米），可在 Inspector 中调试
       *  - 由 Train 主体在 onLoad 时调用 initOnTrack() 完成初始化
       *  - 每帧由 Train 调用 updateOnTrack(headProgress) 更新位置和朝向
       *  - 若 isHeadCar = true，表示本组件挂在车头节点上，updateOnTrack 不更新位置/朝向
       *    （车头位置由 Train 自身控制），仅作为车头资源仓参与 addResource / unload 等逻辑
       */

      _export("TrainCar", TrainCar = (_dec = ccclass('TrainCar'), _dec2 = property({
        type: CCInteger,
        displayName: '车厢容量',
        tooltip: '本节车厢最多能装载的资源单位数',
        min: 1
      }), _dec3 = property({
        type: CCFloat,
        displayName: '与前节间距(米)',
        tooltip: '本节车厢与前一节车厢（或车头）的间距，单位米。可在面板中实时调试',
        min: 0.1
      }), _dec4 = property({
        type: CCFloat,
        displayName: 'Y轴朝向偏移(度)',
        tooltip: '补偿轨道方向与模型朝向的差值，使静止时模型朝向与编辑器一致'
      }), _dec5 = property({
        displayName: '是否为车头仓',
        tooltip: '勾选后本组件挂在车头节点上，仅作为车头资源仓使用，不参与位置/朝向更新（车头位置由 Train 控制）'
      }), _dec6 = property({
        type: _crd && ItemLayout === void 0 ? (_reportPossibleCrUseOfItemLayout({
          error: Error()
        }), ItemLayout) : ItemLayout,
        displayName: '物品布局',
        tooltip: '车厢内的物品 3D 摆放布局，将车厢内挂有 ItemLayout 组件的子节点拖入'
      }), _dec(_class = (_class2 = class TrainCar extends Component {
        constructor(...args) {
          super(...args);

          // ─────────────────────────────────────────────
          // Inspector 属性
          // ─────────────────────────────────────────────
          _initializerDefineProperty(this, "capacity", _descriptor, this);

          _initializerDefineProperty(this, "spacing", _descriptor2, this);

          _initializerDefineProperty(this, "yawOffset", _descriptor3, this);

          _initializerDefineProperty(this, "isHeadCar", _descriptor4, this);

          _initializerDefineProperty(this, "itemLayout", _descriptor5, this);

          // ─────────────────────────────────────────────
          // 运行时数据
          // ─────────────────────────────────────────────

          /** 当前存储的资源类型 */
          this._resourceType = (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).None;

          /** 当前存储的资源数量 */
          this._currentLoad = 0;

          /** 轨道引用（由 Train 在 onLoad 时通过 initOnTrack 注入） */
          this._track = null;

          /**
           * 本节车厢距离车头的累计间距（米）
           * 由 Train 在 initOnTrack 时计算并注入：
           *   车厢0：spacing0
           *   车厢1：spacing0 + spacing1
           *   车厢N：sum(spacing0..spacingN)
           */
          this._distanceBehindHead = 0;
          this._reservedQueue = [];
        }

        // ─────────────────────────────────────────────
        // 生命周期
        // ─────────────────────────────────────────────
        onLoad() {
          // 若配置了 itemLayout，以其实际格子数作为真实容量上限
          // Inspector 中的 capacity 仅作为无布局时的回退值
          if (this.itemLayout) {
            const layoutCapacity = this.itemLayout.maxLayerLimit * this.itemLayout.rows * this.itemLayout.columns;

            if (layoutCapacity > 0) {
              if (layoutCapacity !== this.capacity) {
                console.log(`[TrainCar] 容量由 Inspector(${this.capacity}) 同步为 ItemLayout 实际格子数(${layoutCapacity})`);
                this.capacity = layoutCapacity;
              }
            } else {
              console.warn(`[TrainCar] ItemLayout 格子数计算结果为 ${layoutCapacity}（rows=${this.itemLayout.rows} cols=${this.itemLayout.columns} maxLayer=${this.itemLayout.maxLayerLimit}），保留 Inspector 容量=${this.capacity}`);
            }
          }
        }

        // ─────────────────────────────────────────────
        // 公开接口 —— 初始化
        // ─────────────────────────────────────────────

        /**
         * 由 Train 在 onLoad 时调用，注入轨道引用和累计间距
         * @param track 轨道组件
         * @param distanceBehindHead 本节车厢距车头的累计间距（米）
         */
        initOnTrack(track, distanceBehindHead) {
          this._track = track;
          this._distanceBehindHead = distanceBehindHead;
        } // ─────────────────────────────────────────────
        // 公开接口 —— 每帧更新
        // ─────────────────────────────────────────────

        /**
         * 由 Train 每帧调用，根据车头进度计算本节车厢的位置和朝向
         * @param headProgress 车头当前归一化进度 [0,1)
         * @param updateFacing 是否同时更新朝向，初始化/重置时传 false 保持编辑器设定角度
         */


        updateOnTrack(headProgress, updateFacing = true) {
          // 车头仓：位置和朝向均由 Train 自身控制，这里不做任何移动
          if (this.isHeadCar) return;
          if (!this._track) return;

          const totalLength = this._track.getTotalLength();

          if (totalLength <= 0) return; // 本节车厢的归一化进度（落后车头一段距离）

          const delta = this._distanceBehindHead / totalLength;
          const myProgress = ((headProgress - delta) % 1 + 1) % 1; // 设置世界坐标

          const pos = this._track.getPositionAt(myProgress);

          this.node.setWorldPosition(pos); // 设置朝向（仅行驶时更新）

          if (updateFacing) {
            const dir = this._track.getDirectionAt(myProgress);

            this._updateFacing(dir);
          }
        } // ─────────────────────────────────────────────
        // 公开接口 —— 资源管理
        // ─────────────────────────────────────────────

        /** 当前载量 */


        get currentLoad() {
          return this._currentLoad;
        }
        /** 是否已满 */


        get isFull() {
          return this._currentLoad >= this.capacity;
        }
        /** 是否为空 */


        get isEmpty() {
          return this._currentLoad <= 0;
        }
        /** 当前存储的资源类型 */


        get resourceType() {
          return this._resourceType;
        }
        /**
         * 向车厢内添加资源（数量计数 + ItemLayout 占位）
         *
         * 调用方拿到返回值后，应为每个成功计入的资源单位：
         *   1. 从对象池取出物品节点
         *   2. 播放飞行动画到 reservedPositions[i] 对应的世界坐标
         *   3. 动画结束后调用 addItemNode(node, reservedPositions[i]) 正式放入布局
         *
         * @param type   资源类型
         * @param amount 请求数量
         * @returns 实际添加的数量（受容量限制）；同时通过 out 参数返回每个占位的布局坐标
         */


        addResource(type, amount) {
          if (this._currentLoad > 0 && this._resourceType !== type) {
            console.log(`[TrainCar] 类型不匹配 已有=${this._resourceType} 传入=${type}，跳过`);
            return 0;
          }

          const canAdd = Math.min(amount, this.capacity - this._currentLoad);

          if (canAdd <= 0) {
            console.log(`[TrainCar] 容量已满 load=${this._currentLoad}/${this.capacity}，无法加入`);
            return 0;
          }

          this._resourceType = type;
          this._currentLoad += canAdd;
          console.log(`[TrainCar] 加入 ${canAdd}（请求=${amount}）load=${this._currentLoad}/${this.capacity}`); // 物品节点由 Chainsaw 飞行动画结束后调用 addItemNode() 放入 ItemLayout
          // 这里只做数量计数，不提前占位

          return canAdd;
        }
        /**
         * 将物品节点正式放入布局（飞行动画结束后调用）
         * @param node 物品节点
         * @returns 是否放入成功
         */


        addItemNode(node, lpos) {
          if (!this.itemLayout) return false;

          if (lpos) {
            this.itemLayout.removeItem(lpos);
            const placed = this.itemLayout.addItem(node, lpos);

            if (!placed) {
              manager.pool.putNode(node);
              return false;
            }

            return true;
          }

          const reserved = this._reservedQueue.shift();

          if (reserved) {
            this.itemLayout.removeItem(reserved);
            const placed = this.itemLayout.addItem(node, reserved);

            if (!placed) {
              manager.pool.putNode(node);
              return false;
            }

            return true;
          }

          const result = this.itemLayout.addItem(node);

          if (!result) {
            manager.pool.putNode(node);
            return false;
          }

          return true;
        }
        /**
         * 获取车厢内指定数量的目标世界坐标（供飞行动画使用）
         * 如果车厢已满，返回最后一个有效位置（视觉上飞到堆顶）
         */


        getTargetWorldPos() {
          if (!this.itemLayout) return null;

          if (this.itemLayout.isLayerLimitExceeded()) {
            const last = this.itemLayout.getLastValidPosition();
            return this.itemLayout.getItemPosition(last);
          }

          const pos = this.itemLayout.getCurrEmptyPosition();
          if (!pos) return null;
          return this.itemLayout.getItemPosition(pos);
        }

        reserveSlot() {
          if (!this.itemLayout) return null;
          const pos = this.itemLayout.getCurrEmptyPosition();
          if (!pos) return null;
          this.itemLayout.reserveItem(pos);

          this._reservedQueue.push(pos);

          return {
            lpos: pos,
            worldPos: this.itemLayout.getItemPosition(pos)
          };
        }
        /**
         * 卸载车厢内所有资源（同时清空 ItemLayout 物品节点）
         * @returns 卸载的资源类型和数量
         */


        unload() {
          const result = {
            type: this._resourceType,
            amount: this._currentLoad
          };
          this._currentLoad = 0;
          this._resourceType = (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).None;
          this._reservedQueue = []; // 注意：ItemLayout 的节点清理由 Train._arriveStation 统一负责
          // （先 getAllItemNodes → putNode 回收 → clearAllItems），此处不重复操作

          return result;
        }
        /**
         * 重置车厢状态（同时清空 ItemLayout 物品节点）
         */


        reset() {
          this._currentLoad = 0;
          this._resourceType = (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).None;
          this._reservedQueue = [];

          if (this.itemLayout) {
            this.itemLayout.clearAllItems();
          }
        } // ─────────────────────────────────────────────
        // 私有方法
        // ─────────────────────────────────────────────

        /** 根据行驶方向更新 this.node 的 Y 轴朝向，ModelNode 子节点随父节点一起转，自身姿态不动 */


        _updateFacing(direction) {
          if (Vec3.equals(direction, Vec3.ZERO)) return;
          const yaw = Math.atan2(direction.x, direction.z) * (180 / Math.PI) + this.yawOffset;
          this.node.setRotationFromEuler(0, yaw, 0);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "capacity", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spacing", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 2.0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "yawOffset", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 90;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "isHeadCar", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "itemLayout", [_dec6], {
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
//# sourceMappingURL=74aa25f08f02998d6ac1207b22fbdac9ef9c2887.js.map