import { _decorator, Component, Vec3 } from 'cc';
import { WheatCrop } from './WheatCrop';
import { ObjectType } from '../Common/CommonEnum';

const { ccclass } = _decorator;

/**
 * 条带查询结果
 */
export interface StripQueryResult {
    crop: WheatCrop;
    type: ObjectType;
    amount: number;
}

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
@ccclass('ResourceFieldManager')
export class ResourceFieldManager extends Component {

    private static _instance: ResourceFieldManager = null!;

    public static get instance(): ResourceFieldManager {
        return ResourceFieldManager._instance;
    }

    /** 全部已注册的 WheatCrop */
    private _allCrops: WheatCrop[] = [];

    onLoad() {
        ResourceFieldManager._instance = this;
    }

    onDestroy() {
        if (ResourceFieldManager._instance === this) {
            ResourceFieldManager._instance = null!;
        }
    }

    // ─────────────────────────────────────────────
    // 注册 / 注销
    // ─────────────────────────────────────────────

    /** 批量注册（WheatFieldManager / TreeFieldManager 在扫描完后调用） */
    public registerBatch(crops: WheatCrop[]): void {
        for (const c of crops) {
            if (!this._allCrops.includes(c)) {
                this._allCrops.push(c);
            }
        }
        console.log(`[ResourceFieldManager] 当前共注册 ${this._allCrops.length} 个资源节点`);
    }

    /** 单个注册（动态生成资源时调用） */
    public register(crop: WheatCrop): void {
        if (!this._allCrops.includes(crop)) {
            this._allCrops.push(crop);
        }
    }

    /** 单个注销 */
    public unregister(crop: WheatCrop): void {
        const idx = this._allCrops.indexOf(crop);
        if (idx !== -1) this._allCrops.splice(idx, 1);
    }

    // ─────────────────────────────────────────────
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
    public queryInStrip(
        prevPos: Vec3,
        currPos: Vec3,
        leftWidth: number,
        rightWidth: number
    ): StripQueryResult[] {
        const results: StripQueryResult[] = [];

        // 行驶方向向量（XZ）
        const abx = currPos.x - prevPos.x;
        const abz = currPos.z - prevPos.z;
        const abLen2 = abx * abx + abz * abz;
        if (abLen2 < 0.0001) return results;

        const abLen = Math.sqrt(abLen2);
        // 单位行驶方向
        const dx = abx / abLen;
        const dz = abz / abLen;
        // 单位法向量（右侧为正）：行驶方向顺时针90° → (dirZ, 0, -dirX)
        const nx = dz;
        const nz = -dx;

        const totalRegistered = this._allCrops.length;
        const unharvested = this._allCrops.filter(c => !c.harvested && c.node?.isValid).length;
        console.log(`[ResourceFieldManager] queryInStrip 注册总数=${totalRegistered} 未收割=${unharvested} 帧位移=${abLen.toFixed(4)}m left=${leftWidth} right=${rightWidth}`);

        for (const crop of this._allCrops) {
            if (crop.harvested) continue;
            if (!crop.node || !crop.node.isValid) continue;

            const pos = crop.worldPos;
            const apx = pos.x - prevPos.x;
            const apz = pos.z - prevPos.z;

            // 沿行驶方向的投影参数 t（归一化到 [0,1]）
            // t=0 对应 prevPos，t=1 对应 currPos
            const t = (apx * dx + apz * dz) / abLen;
            if (t < 0 || t > 1) continue;

            // 有符号垂直距离（点到直线，正=右侧，负=左侧）
            const signed = apx * nx + apz * nz;

            // 判断是否在左右宽度范围内
            const inRange = signed >= 0
                ? signed <= rightWidth
                : (-signed) <= leftWidth;

            if (inRange) {
                console.log(`[ResourceFieldManager]   命中 crop pos=(${pos.x.toFixed(2)},${pos.z.toFixed(2)}) t=${t.toFixed(3)} signed=${signed.toFixed(3)}`);
                results.push({ crop, type: crop.resourceType, amount: crop.harvestAmount });
            }
        }

        return results;
    }

    /** 未收割数量 */
    public get unharvestedCount(): number {
        return this._allCrops.filter(c => !c.harvested).length;
    }

    /** 重置所有资源 */
    public resetAll(): void {
        for (const crop of this._allCrops) {
            if (crop?.node?.isValid) crop.reset();
        }
    }
}

