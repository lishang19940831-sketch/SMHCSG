System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, CCFloat, MeshRenderer, Material, utils, gfx, Color, Tween, tween, Quat, CommonEvent, ResourceFieldManager, TrainManager, Train, TrainState, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _crd, ccclass, property, Chainsaw;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResourceFieldManager(extras) {
    _reporterNs.report("ResourceFieldManager", "./ResourceFieldManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTrainManager(extras) {
    _reporterNs.report("TrainManager", "./TrainManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTrain(extras) {
    _reporterNs.report("Train", "./Train", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTrainState(extras) {
    _reporterNs.report("TrainState", "./Train", _context.meta, extras);
  }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTrainCar(extras) {
    _reporterNs.report("TrainCar", "./TrainCar", _context.meta, extras);
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
      MeshRenderer = _cc.MeshRenderer;
      Material = _cc.Material;
      utils = _cc.utils;
      gfx = _cc.gfx;
      Color = _cc.Color;
      Tween = _cc.Tween;
      tween = _cc.tween;
      Quat = _cc.Quat;
    }, function (_unresolved_2) {
      CommonEvent = _unresolved_2.CommonEvent;
    }, function (_unresolved_3) {
      ResourceFieldManager = _unresolved_3.ResourceFieldManager;
    }, function (_unresolved_4) {
      TrainManager = _unresolved_4.TrainManager;
    }, function (_unresolved_5) {
      Train = _unresolved_5.Train;
      TrainState = _unresolved_5.TrainState;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d95f1jwxn5DObgdjShvdh97", "Chainsaw", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'CCFloat', 'MeshRenderer', 'Material', 'utils', 'gfx', 'Color', 'Tween', 'tween', 'v3', 'Quat']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * Chainsaw —— 锯条收割控制器
       *
       * 设计说明：
       *  - 挂在 Train 节点（或其子节点）上，与火车头共享坐标
       *  - 每帧记录上一帧车头位置，与本帧位置构成移动线段
       *  - 调用 ResourceFieldManager.queryInStrip() 做数学条带检测
       *  - 命中未收割资源 → crop.harvest() → TrainManager.addResource()
       *  - 监听 TrainCarFull / TrainArrived 事件控制收割开关
       *  - 不依赖物理引擎，无碰撞体开销
       *
       * 调试可视化（debugVisual = true）：
       *  - 绿色矩形框：当前帧收割条带范围（prevPos→currPos + 左右宽度）
       *  - 黄色中心线：锯条运动轨迹（prevPos → currPos）
       *  - 红色点：本帧命中的资源位置
       *  使用 Cocos GeometryRenderer，无需额外节点，构建时自动剔除（EDITOR宏保护）
       *
       * 节点结构：
       *   TrainLv1（挂 Train 组件）
       *   └── Chainsaw（挂本组件）  ← 或直接挂在 TrainLv1 上
       *
       * 使用方法：
       *  1. 将本组件挂到火车头节点（或其直接子节点）
       *  2. 在 Inspector 中拖入 TrainManager 引用
       *  3. 调整 sawHalfWidth（锯条半宽，米）
       *  4. ResourceFieldManager 需在场景中存在并已初始化
       */

      _export("Chainsaw", Chainsaw = (_dec = ccclass('Chainsaw'), _dec2 = property({
        type: _crd && TrainManager === void 0 ? (_reportPossibleCrUseOfTrainManager({
          error: Error()
        }), TrainManager) : TrainManager,
        displayName: 'TrainManager',
        tooltip: '场景中的 TrainManager 节点，用于向车厢添加资源'
      }), _dec3 = property({
        type: _crd && Train === void 0 ? (_reportPossibleCrUseOfTrain({
          error: Error()
        }), Train) : Train,
        displayName: '当前 Train（可选）',
        tooltip: '如果 Chainsaw 挂在 Train 子节点上，留空；挂在独立节点上需要拖入对应 Train'
      }), _dec4 = property({
        type: Node,
        displayName: '锯条锚点节点',
        tooltip: '锯条所在位置的节点（通常是车头上的子节点），留空则使用本节点自身位置'
      }), _dec5 = property({
        type: CCFloat,
        displayName: '左侧收割宽度（米）',
        tooltip: '锯条中心向左侧延伸的收割范围（米）',
        min: 0
      }), _dec6 = property({
        type: CCFloat,
        displayName: '右侧收割宽度（米）',
        tooltip: '锯条中心向右侧延伸的收割范围（米）',
        min: 0
      }), _dec7 = property({
        type: CCFloat,
        displayName: '单帧最大收割数',
        tooltip: '每帧最多触发收割的资源数量上限，防止瞬间大量收割',
        min: 1
      }), _dec8 = property({
        type: CCFloat,
        displayName: '飞行弧线高度（米）',
        tooltip: '抛物线顶点额外叠加的高度，0 = 直线飞行',
        min: 0
      }), _dec9 = property({
        type: CCFloat,
        displayName: '飞行起点Y偏移（米）',
        tooltip: '起飞位置在麦子Y坐标基础上额外抬高的高度，解决起点贴地问题',
        min: 0
      }), _dec10 = property({
        type: CCFloat,
        displayName: '飞行时长（秒）',
        tooltip: '麦子从收割位置飞到车厢的总时长',
        min: 0.05
      }), _dec11 = property({
        displayName: '调试模式（Console）',
        tooltip: '开启后在 Console 打印每帧收割信息'
      }), _dec12 = property({
        displayName: '调试可视化',
        tooltip: ['开启后在场景中实时绘制收割检测区域：', '  绿色矩形 = 当前帧条带范围（左右宽度边界）', '  黄色线段 = 锯条运动轨迹（prevPos → currPos）', '  红色叉号 = 本帧命中的资源位置', '注意：依赖 Cocos GeometryRenderer，需在项目设置中启用 Gizmos'].join('\n')
      }), _dec(_class = (_class2 = class Chainsaw extends Component {
        constructor(...args) {
          super(...args);

          // ─────────────────────────────────────────────
          // Inspector 属性
          // ─────────────────────────────────────────────
          _initializerDefineProperty(this, "trainManager", _descriptor, this);

          _initializerDefineProperty(this, "train", _descriptor2, this);

          _initializerDefineProperty(this, "sawAnchor", _descriptor3, this);

          _initializerDefineProperty(this, "leftWidth", _descriptor4, this);

          _initializerDefineProperty(this, "rightWidth", _descriptor5, this);

          _initializerDefineProperty(this, "maxHarvestPerFrame", _descriptor6, this);

          _initializerDefineProperty(this, "flyArcHeight", _descriptor7, this);

          _initializerDefineProperty(this, "flyStartYOffset", _descriptor8, this);

          _initializerDefineProperty(this, "flyDuration", _descriptor9, this);

          _initializerDefineProperty(this, "debugMode", _descriptor10, this);

          _initializerDefineProperty(this, "debugVisual", _descriptor11, this);

          // ─────────────────────────────────────────────
          // 运行时数据
          // ─────────────────────────────────────────────

          /** 上一帧车头世界坐标 */
          this._prevPos = new Vec3();

          /** 本帧车头世界坐标 */
          this._currPos = new Vec3();

          /** 是否允许收割（车厢满或停在站台时暂停） */
          this._canHarvest = true;

          /** 是否已完成首帧初始化（避免第一帧条带从世界原点开始） */
          this._initialized = false;

          /** 正在飞行中的节点集合（到站时强制回收，防止节点泄漏） */
          this._flyingNodes = new Set();
          // ─────────────────────────────────────────────
          // 调试可视化（MeshRenderer 方案，兼容 WebPipeline）
          // ─────────────────────────────────────────────

          /** 条带面片节点（半透明绿色矩形） */
          this._stripNode = null;

          /** 条带面片 MeshRenderer */
          this._stripMR = null;

          /** 命中标记根节点 */
          this._hitRoot = null;

          /** 命中标记节点池（红色叉号面片） */
          this._hitNodes = [];

          /** 命中标记 MeshRenderer 池 */
          this._hitMRs = [];
        }

        // ─────────────────────────────────────────────
        // 生命周期
        // ─────────────────────────────────────────────
        onLoad() {
          // 如果没有手动指定 train，尝试从父节点或本节点获取
          if (!this.train) {
            var _ref, _this$node$getCompone, _this$node$parent;

            this.train = (_ref = (_this$node$getCompone = this.node.getComponent(_crd && Train === void 0 ? (_reportPossibleCrUseOfTrain({
              error: Error()
            }), Train) : Train)) != null ? _this$node$getCompone : (_this$node$parent = this.node.parent) == null ? void 0 : _this$node$parent.getComponent(_crd && Train === void 0 ? (_reportPossibleCrUseOfTrain({
              error: Error()
            }), Train) : Train)) != null ? _ref : null;
          } // 初始化调试可视化节点


          this._initDebugVisual();
        }

        onEnable() {
          // 车厢满：暂停收割
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).TrainCarFull, this._onCarFull, this); // 火车到站卸载完毕后恢复收割

          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).TrainArrived, this._onTrainArrived, this); // 火车出发（Idle → Moving）时确保收割开启

          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).TrainStarted, this._onTrainStarted, this); // 重置初始位置

          this._initialized = false;
        }

        onDisable() {
          app.event.off((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).TrainCarFull, this._onCarFull);
          app.event.off((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).TrainArrived, this._onTrainArrived);
          app.event.off((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).TrainStarted, this._onTrainStarted);
        }

        update(_dt) {
          // 取锚点节点位置（优先用 sawAnchor，没有则用本节点）
          const anchorNode = this.sawAnchor && this.sawAnchor.isValid ? this.sawAnchor : this.node; // 只在火车行驶时检测

          if (this.train && this.train.state !== (_crd && TrainState === void 0 ? (_reportPossibleCrUseOfTrainState({
            error: Error()
          }), TrainState) : TrainState).Moving) {
            // 火车停止时同步一下位置，保证下次启动时 prevPos 正确
            anchorNode.getWorldPosition(this._prevPos);
            this._initialized = true;
            return;
          } // 获取本帧位置


          anchorNode.getWorldPosition(this._currPos);

          if (!this._initialized) {
            // 首帧：只记录位置，不做检测
            this._prevPos.set(this._currPos);

            this._initialized = true;
            return;
          } // 执行收割检测


          if (this._canHarvest) {
            this._doHarvest();
          } else {
            if (this.debugVisual) {
              // 未收割时也绘制条带轮廓，方便观察区域
              this._drawStrip(this._prevPos, this._currPos, []);
            } else {
              this._hideDebugVisual();
            }
          } // 更新上一帧位置


          this._prevPos.set(this._currPos);
        } // ─────────────────────────────────────────────
        // 公开接口
        // ─────────────────────────────────────────────

        /** 手动开启收割（外部调用） */


        enableHarvest() {
          this._canHarvest = true;
        }
        /** 手动关闭收割（外部调用） */


        disableHarvest() {
          this._canHarvest = false;
        } // ─────────────────────────────────────────────
        // 内部逻辑
        // ─────────────────────────────────────────────


        _doHarvest() {
          const fieldMgr = (_crd && ResourceFieldManager === void 0 ? (_reportPossibleCrUseOfResourceFieldManager({
            error: Error()
          }), ResourceFieldManager) : ResourceFieldManager).instance;

          if (!fieldMgr) {
            console.warn('[Chainsaw] ❌ ResourceFieldManager.instance 为空，无法收割');
            return;
          }

          if (!this.trainManager) {
            console.warn('[Chainsaw] ❌ trainManager 未绑定');
            return;
          }

          const hits = fieldMgr.queryInStrip(this._prevPos, this._currPos, this.leftWidth, this.rightWidth); // 调试可视化：无论有无命中都绘制条带

          if (this.debugVisual) {
            this._drawStrip(this._prevPos, this._currPos, hits.map(h => h.crop.worldPos));
          } else {
            this._hideDebugVisual();
          }

          if (hits.length === 0) return;
          console.log(`[Chainsaw] 本帧条带命中 ${hits.length} 个资源，prevPos=(${this._prevPos.x.toFixed(2)},${this._prevPos.z.toFixed(2)}) currPos=(${this._currPos.x.toFixed(2)},${this._currPos.z.toFixed(2)}) left=${this.leftWidth} right=${this.rightWidth}`);
          let count = 0;

          for (const hit of hits) {
            if (count >= this.maxHarvestPerFrame) {
              console.log(`[Chainsaw] 达到单帧上限 maxHarvestPerFrame=${this.maxHarvestPerFrame}，剩余 ${hits.length - count} 个跳过`);
              break;
            } // ① 先查目标车厢，确认有空位才继续（避免先收割再发现满了导致资源丢失）


            const targetCar = this.trainManager.getCarForResource(hit.type);

            if (!targetCar) {
              // 所有车厢已满，立即停止本帧收割
              console.log(`[Chainsaw] 所有车厢已满，停止本帧收割`);
              break;
            } // ② 在收割前记录源物体世界旋转，用于保持飞行物初始角度


            const srcWorldRot = new Quat();
            hit.crop.node.getWorldRotation(srcWorldRot); // 确认有空位后，执行收割（WheatCrop 内部改变状态、播放视觉效果）

            const result = hit.crop.harvest();

            if (!result) {
              console.warn(`[Chainsaw] ⚠️ crop.harvest() 返回 null（已被收割？）`);
              continue;
            } // ③ 预留目标格子并获取初始世界坐标（后续按预留格实时更新）


            const reserve = targetCar.reserveSlot(); // ④ 向车厢注入资源计数

            const added = this.trainManager.addResource(result.type, result.amount);

            if (added > 0 && reserve) {
              // ⑤ 生成物品节点并播放飞行动画
              this._spawnAndFlyToCar(result.type, hit.crop.worldPos.clone(), targetCar, reserve.worldPos, srcWorldRot, reserve.lpos); // 发送收割事件（供 UI / 音效等系统监听）


              app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
                error: Error()
              }), CommonEvent) : CommonEvent).HarvestCrop, {
                type: result.type,
                amount: added,
                worldPos: hit.crop.worldPos.clone()
              });
            }

            count++;
          }
        } // ─────────────────────────────────────────────
        // 物品飞行动画
        // ─────────────────────────────────────────────

        /**
         * 从对象池取出物品节点，沿抛物线飞入目标车厢
         *
         * 复刻 EffectManager.flyNodeInParabola 方案：
         *   - tween 驱动 progressObj.progress 0→1
         *   - onUpdate 每帧回调中实时取目标坐标，计算抛物线位置后 setWorldPosition
         *   - XZ 线性插值，Y 叠加抛物线偏移：4 * height * t * (1-t)
         *   - target 为 TrainCar，每帧调用 getTargetWorldPos() 获取实时坐标
         */


        _spawnAndFlyToCar(type, fromWorldPos, targetCar, targetPos, initialWorldRot, reservedLpos) {
          const itemNode = manager.pool.getNode(type);
          if (!itemNode) return;
          itemNode.setParent(this.node.scene);
          itemNode.setWorldPosition(fromWorldPos);

          if (initialWorldRot) {
            itemNode.setWorldRotation(initialWorldRot);
          }

          if (!targetPos || !targetCar) {
            manager.pool.putNode(itemNode);
            return;
          }

          this._flyingNodes.add(itemNode); // 起点 Y 抬高，避免从地面贴地飞出


          const startPos = new Vec3(fromWorldPos.x, fromWorldPos.y + this.flyStartYOffset, fromWorldPos.z); // 每帧实时更新的目标坐标（Vec3 复用，减少 GC）

          const liveTarget = targetPos.clone();
          const progressObj = {
            progress: 0
          };
          tween(progressObj).to(this.flyDuration, {
            progress: 1
          }, {
            onUpdate: () => {
              if (!itemNode.isValid) return;
              const t = progressObj.progress; // 实时根据预留格子计算世界坐标（随车厢移动）

              if (reservedLpos && targetCar.itemLayout) {
                const pos = targetCar.itemLayout.getItemPosition(reservedLpos);
                if (pos) liveTarget.set(pos);
              } // XZ 线性插值


              const x = startPos.x + (liveTarget.x - startPos.x) * t;
              const z = startPos.z + (liveTarget.z - startPos.z) * t; // Y：线性插值 + 抛物线高度偏移

              const y = startPos.y + (liveTarget.y - startPos.y) * t + 4 * this.flyArcHeight * t * (1 - t);
              itemNode.setWorldPosition(x, y, z);
            }
          }).call(() => {
            this._flyingNodes.delete(itemNode);

            if (!itemNode.isValid) return;

            if (targetCar.itemLayout) {
              targetCar.addItemNode(itemNode, reservedLpos);
            } else {
              manager.pool.putNode(itemNode);
            }
          }).start();
        } // ─────────────────────────────────────────────
        // 调试可视化（MeshRenderer 方案，兼容所有渲染管线）
        // ─────────────────────────────────────────────

        /**
         * 创建调试可视化所需节点（条带面片 + 命中标记池）
         * 在 onLoad 中调用一次。
         */


        _initDebugVisual() {
          var _this$node$scene, _this$node$scene2;

          // ── 条带面片节点 ──
          this._stripNode = new Node('_DbgStrip');

          this._stripNode.setParent((_this$node$scene = this.node.scene) != null ? _this$node$scene : this.node);

          this._stripMR = this._stripNode.addComponent(MeshRenderer);
          this._stripMR.material = Chainsaw._makeDebugMat(new Color(255, 255, 255, 255)); // 半透明绿

          this._stripNode.active = false; // ── 命中标记根节点 ──

          this._hitRoot = new Node('_DbgHits');

          this._hitRoot.setParent((_this$node$scene2 = this.node.scene) != null ? _this$node$scene2 : this.node);

          this._hitRoot.active = false;
        }
        /**
         * 创建一个不受光照影响的半透明调试材质
         */


        static _makeDebugMat(color) {
          const mat = new Material();
          mat.initialize({
            effectName: 'builtin-unlit',
            defines: {
              USE_VERTEX_COLOR: true
            },
            states: {
              primitive: gfx.PrimitiveMode.TRIANGLE_LIST,
              rasterizerState: {
                cullMode: gfx.CullMode.NONE
              },
              blendState: {
                targets: [{
                  blend: true,
                  blendSrc: gfx.BlendFactor.SRC_ALPHA,
                  blendDst: gfx.BlendFactor.ONE_MINUS_SRC_ALPHA
                }]
              },
              depthStencilState: {
                depthTest: true,
                depthWrite: false
              }
            }
          }); // 将颜色存进去供后续 mesh 顶点使用（material 本身不传 color，颜色由顶点色携带）

          mat.__debugColor = color;
          return mat;
        }
        /**
         * 构建一个四边形面片（世界坐标四个顶点，同色）
         */


        static _makeQuadMesh(p0, p1, p2, p3, c) {
          const cr = c.r / 255,
                cg = c.g / 255,
                cb = c.b / 255,
                ca = c.a / 255;
          return utils.MeshUtils.createMesh({
            positions: [p0.x, p0.y, p0.z, p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z],
            colors: [cr, cg, cb, ca, cr, cg, cb, ca, cr, cg, cb, ca, cr, cg, cb, ca],
            indices: [0, 1, 2, 0, 2, 3],
            primitiveMode: gfx.PrimitiveMode.TRIANGLE_LIST
          });
        }
        /**
         * 构建一个小正方形叉号面片（XZ 平面内两个交叉四边形）
         */


        static _makeCrossMesh(center, armLen, c) {
          const x = center.x,
                y = center.y + 0.15,
                z = center.z;
          const H = armLen * 0.12; // 叉臂的半宽（截面厚度）

          const A = armLen;
          const cr = c.r / 255,
                cg = c.g / 255,
                cb = c.b / 255,
                ca = c.a / 255; // 两条叉臂各是一个倾斜矩形，用两个四边形近似
          // 斜45° ─ 第一臂 (x-z) 方向

          const positions = [x - A - H, y, z - A + H, x - A + H, y, z - A - H, x + A + H, y, z + A - H, x + A - H, y, z + A + H, // 第二臂 (x+z) 方向
          x - A - H, y, z + A - H, x - A + H, y, z + A + H, x + A + H, y, z - A + H, x + A - H, y, z - A - H];
          const colors = [];

          for (let i = 0; i < 8; i++) colors.push(cr, cg, cb, ca);

          return utils.MeshUtils.createMesh({
            positions,
            colors,
            indices: [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7],
            primitiveMode: gfx.PrimitiveMode.TRIANGLE_LIST
          });
        }
        /**
         * 获取或按需创建第 idx 个命中标记节点
         */


        _getOrCreateHitNode(idx) {
          if (idx < this._hitNodes.length) {
            return [this._hitNodes[idx], this._hitMRs[idx]];
          }

          const n = new Node(`_DbgHit${idx}`);
          n.setParent(this._hitRoot);
          const mr = n.addComponent(MeshRenderer);
          mr.material = Chainsaw._makeDebugMat(new Color(255, 0, 0, 220)); // 红色

          this._hitNodes.push(n);

          this._hitMRs.push(mr);

          return [n, mr];
        }
        /**
         * 绘制当前帧的收割条带可视化
         * @param prev     上一帧锯条世界坐标
         * @param curr     本帧锯条世界坐标
         * @param hitPoses 本帧命中的资源世界坐标列表
         */


        _drawStrip(prev, curr, hitPoses) {
          if (!this._stripNode || !this._stripMR) return; // ── 行驶方向单位向量 ──

          const abx = curr.x - prev.x;
          const abz = curr.z - prev.z;
          const abLen = Math.sqrt(abx * abx + abz * abz);

          if (abLen < 0.0001) {
            this._stripNode.active = false;
            return;
          }

          const dx = abx / abLen;
          const dz = abz / abLen;
          const nx = dz; // 单位法向量（右侧为正）

          const nz = -dx;
          const Y = Math.max(prev.y, curr.y) + 0.15; // 略高于地面
          // 条带四个角点（世界坐标，节点本身在世界原点不旋转）
          // p0=prevLeft, p1=prevRight, p2=currRight, p3=currLeft

          const p0 = new Vec3(prev.x - nx * this.leftWidth, Y, prev.z - nz * this.leftWidth);
          const p1 = new Vec3(prev.x + nx * this.rightWidth, Y, prev.z + nz * this.rightWidth);
          const p2 = new Vec3(curr.x + nx * this.rightWidth, Y, curr.z + nz * this.rightWidth);
          const p3 = new Vec3(curr.x - nx * this.leftWidth, Y, curr.z - nz * this.leftWidth); // 将 _stripNode 放到世界原点（scale=1, rot=identity），mesh 直接用世界坐标顶点

          this._stripNode.setWorldPosition(Vec3.ZERO);

          this._stripMR.mesh = Chainsaw._makeQuadMesh(p0, p1, p2, p3, new Color(0, 255, 0, 100));
          this._stripNode.active = true; // ── 命中标记 ──

          const ARM = 0.4;

          for (let i = 0; i < hitPoses.length; i++) {
            const [hn, hmr] = this._getOrCreateHitNode(i);

            hn.setWorldPosition(Vec3.ZERO);
            hmr.mesh = Chainsaw._makeCrossMesh(hitPoses[i], ARM, new Color(255, 0, 0, 220));
            hn.active = true;
          } // 隐藏超出本帧数量的旧标记


          for (let i = hitPoses.length; i < this._hitNodes.length; i++) {
            this._hitNodes[i].active = false;
          }

          if (this._hitRoot) this._hitRoot.active = hitPoses.length > 0;
        }
        /** 隐藏所有调试可视化节点 */


        _hideDebugVisual() {
          if (this._stripNode) this._stripNode.active = false;
          if (this._hitRoot) this._hitRoot.active = false;
        } // ─────────────────────────────────────────────
        // 事件回调
        // ─────────────────────────────────────────────


        _onCarFull() {
          // 车厢满：仅停止收割，火车继续行驶直到回到站台
          this._canHarvest = false;
          if (this.debugMode) console.log('[Chainsaw] 车厢满，停止收割，火车继续行驶');
        }

        _onTrainArrived() {
          // 强制回收所有还在飞行中的节点
          // 到站时车厢即将 unload + clearAllItems，飞行中节点落不进去，必须提前回收
          if (this._flyingNodes.size > 0) {
            if (this.debugMode) console.log(`[Chainsaw] 到站，强制回收 ${this._flyingNodes.size} 个飞行中节点`);

            for (const node of this._flyingNodes) {
              if (node && node.isValid) {
                Tween.stopAllByTarget(node);
                manager.pool.putNode(node);
              }
            }

            this._flyingNodes.clear();
          } // 到站后等卸载完成再恢复收割


          this.scheduleOnce(() => {
            this._canHarvest = true;
            if (this.debugMode) console.log('[Chainsaw] 卸载完毕，恢复收割');
          }, 0.5);
        }

        _onTrainStarted() {
          this._canHarvest = true;
          if (this.debugMode) console.log('[Chainsaw] 火车出发，开启收割');
        }

        onDestroy() {
          var _this$_stripNode, _this$_hitRoot;

          (_this$_stripNode = this._stripNode) == null || _this$_stripNode.destroy();
          (_this$_hitRoot = this._hitRoot) == null || _this$_hitRoot.destroy();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "trainManager", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "train", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sawAnchor", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "leftWidth", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1.5;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "rightWidth", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1.5;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "maxHarvestPerFrame", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 5;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "flyArcHeight", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 2.5;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "flyStartYOffset", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1.0;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "flyDuration", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.4;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "debugMode", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "debugVisual", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3ec75f3845d0229b8e345855f584eabea0b79dd2.js.map