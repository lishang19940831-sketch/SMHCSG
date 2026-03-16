import { _decorator, Component, Node, Vec3, tween, MeshRenderer, CCFloat, CCInteger, instantiate } from 'cc';
import { ObjectType } from '../Common/CommonEnum';

const { ccclass, property } = _decorator;

/**
 * WheatCrop —— 挂在场景中每个可收割资源节点（麦子、树木等）上
 *
 * 设计说明：
 *  - 纯数据组件，不做任何物理碰撞
 *  - ResourceFieldManager 在 onLoad 时扫描场景中所有 WheatCrop 并缓存
 *  - Chainsaw 每帧通过 ResourceFieldManager 查询条带内未收割的资源
 *  - 收割后调用 harvest()，视觉隐藏由外部（Chainsaw）决定策略
 */
@ccclass('WheatCrop')
export class WheatCrop extends Component {

    @property({
        type: ObjectType,
        displayName: '资源类型',
        tooltip: '该节点代表的资源类型，例如 DropItemCornKernel（麦子）/ DropItemWood（木头）'
    })
    public resourceType: ObjectType = ObjectType.DropItemCornKernel;

    @property({
        displayName: '单次收割数量',
        tooltip: '锯条扫过时，本节点产出的资源数量',
        min: 1
    })
    public harvestAmount: number = 1;

    @property({
        displayName: '再生时间(秒, 0=不再生)',
        tooltip: '收割后多少秒重新长出，0 表示永久消失',
        min: 0
    })
    public regrowTime: number = 0;

    // ─────────────────────────────────────────────
    // 碎片效果配置
    // ─────────────────────────────────────────────

    @property({
        type: CCInteger,
        displayName: '碎片数量',
        min: 0
    })
    public fragmentCount: number = 4;

    @property({
        type: CCFloat,
        displayName: '碎片缩放最小值',
        min: 0.01
    })
    public fragmentScaleMin: number = 0.2;

    @property({
        type: CCFloat,
        displayName: '碎片缩放最大值',
        min: 0.01
    })
    public fragmentScaleMax: number = 0.45;

    @property({
        type: CCFloat,
        displayName: '碎片飞散距离(米)',
        min: 0
    })
    public fragmentScatterDistance: number = 0.6;

    @property({
        type: CCFloat,
        displayName: '碎片上升高度(米)',
        min: 0
    })
    public fragmentUpHeight: number = 0.5;

    @property({
        type: CCFloat,
        displayName: '碎片飞散时长(秒)',
        min: 0.05
    })
    public fragmentDuration: number = 0.35;

    // ─────────────────────────────────────────────
    // 运行时数据
    // ─────────────────────────────────────────────

    /** 是否已被收割 */
    private _harvested: boolean = false;

    /** 世界坐标缓存（onLoad 时记录，避免每帧 getWorldPosition） */
    private _worldPos: Vec3 = new Vec3();

    // ─────────────────────────────────────────────
    // 生命周期
    // ─────────────────────────────────────────────

    onLoad() {
        // 缓存世界坐标（假设麦子不会移动）
        this.node.getWorldPosition(this._worldPos);
    }

    // ─────────────────────────────────────────────
    // 公开接口
    // ─────────────────────────────────────────────

    /** 是否已被收割 */
    public get harvested(): boolean {
        return this._harvested;
    }

    /** 缓存的世界坐标（XZ平面，Y忽略） */
    public get worldPos(): Vec3 {
        return this._worldPos;
    }

    /**
     * 主动刷新世界坐标缓存
     * 由 WheatFieldManager / TreeFieldManager 在挂载完成后调用
     */
    public refreshWorldPos(): void {
        this.node.getWorldPosition(this._worldPos);
    }

    /**
     * 执行收割
     * @returns 产出的资源类型和数量，已收割则返回 null
     */
    public harvest(): { type: ObjectType; amount: number } | null {
        if (this._harvested) return null;
        this._harvested = true;

        // 播放碎片飞散效果（在隐藏节点之前，碎片从当前位置飞出）
        this._playFragmentEffect();

        // 隐藏节点视觉
        this.node.active = false;

        // 若设置了再生时间，则定时恢复
        if (this.regrowTime > 0) {
            this.scheduleOnce(() => {
                this._harvested = false;
                this.node.active = true;
                // 更新世界坐标（防止父节点移动过）
                this.node.getWorldPosition(this._worldPos);
            }, this.regrowTime);
        }

        return { type: this.resourceType, amount: this.harvestAmount };
    }

    /**
     * 碎片飞散效果
     * 克隆自身模型节点，脱离父节点独立运动，tween 模拟抛物线后销毁
     */
    private _playFragmentEffect(): void {
        if (this.fragmentCount <= 0) return;

        // 找所有带 MeshRenderer 的子节点（麦穗模型）
        const meshNodes: Node[] = [];
        this._findMeshNodes(this.node, meshNodes);
        if (meshNodes.length === 0) return;

        const centerPos = this.node.getWorldPosition();

        for (let i = 0; i < this.fragmentCount; i++) {
            const fragment = instantiate(meshNodes[0]);
            // 脱离原节点树，挂到同一父节点下独立运动
            fragment.setParent(this.node.parent);
            fragment.setWorldPosition(centerPos);

            // 随机缩放
            const s = this.fragmentScaleMin + Math.random() * (this.fragmentScaleMax - this.fragmentScaleMin);
            const os = fragment.scale.clone();
            fragment.setScale(os.x * s, os.y * s, os.z * s);

            // 均匀分布飞散方向 + 随机扰动
            const angle = (Math.PI * 2 * i) / this.fragmentCount + (Math.random() - 0.5) * 0.8;
            const dist  = this.fragmentScatterDistance * (0.7 + Math.random() * 0.6);

            const targetPos = new Vec3(
                centerPos.x + Math.cos(angle) * dist,
                centerPos.y + this.fragmentUpHeight * (0.8 + Math.random() * 0.4),
                centerPos.z + Math.sin(angle) * dist
            );

            // 第1段：飞散 + 上升（抛物线感）
            tween(fragment)
                .to(this.fragmentDuration, { worldPosition: targetPos }, { easing: 'quadOut' })
                // 第2段：缩小消失
                .to(this.fragmentDuration * 0.4, { scale: new Vec3(0, 0, 0) })
                .call(() => { fragment.destroy(); })
                .start();

            // 单独控制 Y 轴下落（到达顶点后重力感下坠）
            const fallDelay = this.fragmentDuration * 0.55;
            this.scheduleOnce(() => {
                if (fragment && fragment.isValid) {
                    const fallTarget = new Vec3(targetPos.x, centerPos.y - 0.3, targetPos.z);
                    tween(fragment)
                        .to(this.fragmentDuration * 0.45, { worldPosition: fallTarget }, { easing: 'quadIn' })
                        .start();
                }
            }, fallDelay);
        }
    }

    /**
     * 递归查找包含 MeshRenderer 的节点
     */
    private _findMeshNodes(node: Node, results: Node[]): void {
        if (node.getComponent(MeshRenderer)) {
            results.push(node);
        }
        for (const child of node.children) {
            this._findMeshNodes(child, results);
        }
    }

    /**
     * 强制重置为未收割状态（游戏重置时调用）
     */
    public reset(): void {
        this._harvested = false;
        this.node.active = true;
        this.node.getWorldPosition(this._worldPos);
    }
}

