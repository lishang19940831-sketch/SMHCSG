System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _class2, _crd, ccclass, ResourceFieldManager;

  function _reportPossibleCrUseOfWheatCrop(extras) {
    _reporterNs.report("WheatCrop", "./WheatCrop", _context.meta, extras);
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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "95bd4LZpwJIGK6wpLTbSjy0", "ResourceFieldManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Vec3']);

      ({
        ccclass
      } = _decorator);
      /**
       * 条带查询结果
       */

      /**
       * ResourceFieldManager —— 资源聚合查询器（单例）
       *
       * 设计说明：
       *  - 本身不扫描任何节点，只作为全局注册中心
       *  - WheatFieldManager / TreeFieldManager 扫描完节点后，
       *    将收集到的 WheatCrop 列表注册到本单例
       *  - Chainsaw 只需引用本单例，调用 queryInStrip() 即可
       *  - 支持运行时动态注册/注销（如动态生成的资源节点）
       */
      _export("ResourceFieldManager", ResourceFieldManager = (_dec = ccclass('ResourceFieldManager'), _dec(_class = (_class2 = class ResourceFieldManager extends Component {
        constructor(...args) {
          super(...args);

          /** 全部已注册的 WheatCrop */
          this._allCrops = [];
        }

        static get instance() {
          return ResourceFieldManager._instance;
        }

        onLoad() {
          ResourceFieldManager._instance = this;
        }

        onDestroy() {
          if (ResourceFieldManager._instance === this) {
            ResourceFieldManager._instance = null;
          }
        } // ─────────────────────────────────────────────
        // 注册 / 注销
        // ─────────────────────────────────────────────

        /** 批量注册（WheatFieldManager / TreeFieldManager 在扫描完后调用） */


        registerBatch(crops) {
          for (const c of crops) {
            if (!this._allCrops.includes(c)) {
              this._allCrops.push(c);
            }
          }

          console.log(`[ResourceFieldManager] 当前共注册 ${this._allCrops.length} 个资源节点`);
        }
        /** 单个注册（动态生成资源时调用） */


        register(crop) {
          if (!this._allCrops.includes(crop)) {
            this._allCrops.push(crop);
          }
        }
        /** 单个注销 */


        unregister(crop) {
          const idx = this._allCrops.indexOf(crop);

          if (idx !== -1) this._allCrops.splice(idx, 1);
        } // ─────────────────────────────────────────────
        // 查询
        // ─────────────────────────────────────────────

        /**
         * 条带查询：返回上帧→本帧车头移动扫过的非对称条带内所有未收割的资源
         *
         * 左右定义：站在行驶方向上，左侧为负法向，右侧为正法向（XZ平面右手坐标系）
         *   法向量 = 行驶方向顺时针旋转90°：normal = (dirZ, 0, -dirX)
         *   signed = dot(AP_perp, normal)
         *   signed > 0 → 右侧，signed < 0 → 左侧
         *
         * 修复说明（转弯大面积误收割）：
         *  原算法将 t 夹紧到 [0,1]，导致线段两端各形成半圆形吸附区域；
         *  转弯时弦的法向与弧线实际切向偏差大，矩形条带会覆盖弯道内侧大片区域。
         *  修复方案：
         *   1. t 超出 [0,1] 范围时直接排除（不夹紧），消除端点半圆吸附。
         *   2. 有符号距离从弦法向改为"资源相对线段的真实垂直偏移"，即点到直线（而非端点）
         *      的带符号距离，且仅对投影落在线段内 [0,1] 的资源判定。
         *   这样条带形状严格为平行四边形（矩形）裁剪，与帧内实际位移贴合，
         *   不再因端点吸附或弦方向偏差产生额外的收割面积。
         *
         * @param prevPos    上一帧锯条锚点世界坐标
         * @param currPos    本帧锯条锚点世界坐标
         * @param leftWidth  左侧收割宽度（米，≥0）
         * @param rightWidth 右侧收割宽度（米，≥0）
         */


        queryInStrip(prevPos, currPos, leftWidth, rightWidth) {
          const results = []; // 行驶方向向量（XZ）

          const abx = currPos.x - prevPos.x;
          const abz = currPos.z - prevPos.z;
          const abLen2 = abx * abx + abz * abz;
          if (abLen2 < 0.0001) return results;
          const abLen = Math.sqrt(abLen2); // 单位行驶方向

          const dx = abx / abLen;
          const dz = abz / abLen; // 单位法向量（右侧为正）：行驶方向顺时针90° → (dirZ, 0, -dirX)

          const nx = dz;
          const nz = -dx;
          const totalRegistered = this._allCrops.length;

          const unharvested = this._allCrops.filter(c => {
            var _c$node;

            return !c.harvested && ((_c$node = c.node) == null ? void 0 : _c$node.isValid);
          }).length;

          console.log(`[ResourceFieldManager] queryInStrip 注册总数=${totalRegistered} 未收割=${unharvested} 帧位移=${abLen.toFixed(4)}m left=${leftWidth} right=${rightWidth}`);

          for (const crop of this._allCrops) {
            if (crop.harvested) continue;
            if (!crop.node || !crop.node.isValid) continue;
            const pos = crop.worldPos;
            const apx = pos.x - prevPos.x;
            const apz = pos.z - prevPos.z; // 沿行驶方向的投影参数 t（归一化到 [0,1]）
            // t=0 对应 prevPos，t=1 对应 currPos

            const t = (apx * dx + apz * dz) / abLen;
            if (t < 0 || t > 1) continue; // 有符号垂直距离（点到直线，正=右侧，负=左侧）

            const signed = apx * nx + apz * nz; // 判断是否在左右宽度范围内

            const inRange = signed >= 0 ? signed <= rightWidth : -signed <= leftWidth;

            if (inRange) {
              console.log(`[ResourceFieldManager]   命中 crop pos=(${pos.x.toFixed(2)},${pos.z.toFixed(2)}) t=${t.toFixed(3)} signed=${signed.toFixed(3)}`);
              results.push({
                crop,
                type: crop.resourceType,
                amount: crop.harvestAmount
              });
            }
          }

          return results;
        }
        /** 未收割数量 */


        get unharvestedCount() {
          return this._allCrops.filter(c => !c.harvested).length;
        }
        /** 重置所有资源 */


        resetAll() {
          for (const crop of this._allCrops) {
            var _crop$node;

            if (crop != null && (_crop$node = crop.node) != null && _crop$node.isValid) crop.reset();
          }
        } // ─────────────────────────────────────────────
        // 分帧再生
        // ─────────────────────────────────────────────

        /**
         * 收集当前所有已被收割的作物列表（快照）
         * 供 Train 在停靠/下车时记录需要再生的作物
         */


        collectHarvestedCrops() {
          const all = this._allCrops.length;

          const harvested = this._allCrops.filter(c => {
            var _c$node2;

            return c.harvested && ((_c$node2 = c.node) == null ? void 0 : _c$node2.isValid);
          });

          console.log(`[RFM] collectHarvestedCrops: 注册总数=${all}, 已收割有效=${harvested.length}`);
          harvested.forEach((c, i) => {
            console.log(`[RFM]   [${i}] node=${c.node.name} regrowTime=${c.regrowTime} nodeActive=${c.node.active}`);
          });
          return harvested;
        }
        /**
         * 对指定作物列表执行分帧再生
         *
         * 核心设计：WheatCrop 收割后 node.active = false，
         * 导致其组件上的 scheduleOnce 停止计时，无法自行恢复。
         * 因此所有再生计时器统一由 ResourceFieldManager（始终激活）持有和调度，
         * 通过 crop.buildRegrowCallback() 取得回调后在此节点上 scheduleOnce。
         *
         * 分帧机制：每帧仅注册 perFrameCount 棵作物的计时器，
         * 避免同一帧内批量调用 scheduleOnce 产生峰值开销。
         *
         * @param crops         需要再生的作物列表（由 collectHarvestedCrops 返回）
         * @param perFrameCount 每帧注册的作物数量，默认 3
         */


        startBatchRegrow(crops, perFrameCount = 3) {
          if (crops.length === 0) return;
          const pending = crops.filter(c => {
            var _c$node3;

            return c.harvested && ((_c$node3 = c.node) == null ? void 0 : _c$node3.isValid);
          });
          if (pending.length === 0) return;
          console.log(`[ResourceFieldManager] startBatchRegrow: 共 ${pending.length} 棵作物待再生，每帧 ${perFrameCount} 棵`); // 用 schedule 间隔=0 逐帧推进，避免 scheduleOnce 同一函数引用被覆盖的问题

          let index = 0;
          let frameToken = 0; // 每次 startBatchRegrow 生成唯一 token，防止多次调用互相干扰

          const tick = () => {
            var _this$node;

            if (!((_this$node = this.node) != null && _this$node.isValid)) return;
            console.log(`[RFM] tick: index=${index}/${pending.length}`);
            const end = Math.min(index + perFrameCount, pending.length);

            for (; index < end; index++) {
              var _crop$node2;

              const crop = pending[index];

              if (!(crop != null && (_crop$node2 = crop.node) != null && _crop$node2.isValid) || !crop.harvested) {
                console.log(`[RFM]   [${index}] 跳过`);
                continue;
              }

              const {
                delay,
                callback
              } = crop.buildRegrowCallback();
              console.log(`[RFM]   [${index}] 注册再生: node=${crop.node.name} delay=${delay}s`); // callback 本身是不同的闭包，不会触发 scheduler 覆盖

              this.scheduleOnce(callback, delay);
            }

            if (index >= pending.length) {
              console.log('[RFM] startBatchRegrow: 全部注册完毕');
              this.unschedule(tick);
            }
          };

          console.log(`[RFM] startBatchRegrow: 开始分帧注册，RFM节点active=${this.node.active}`); // 用 schedule(interval=0) 每帧执行 tick，直到 tick 内部 unschedule 自身

          this.schedule(tick, 0);
        }

      }, _class2._instance = null, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2a9d96c278ad925b8757d26c78fcb71abb00418b.js.map