import { _decorator, Component, Node } from 'cc';
import { ObjectType } from '../Common/CommonEnum';
import { WheatCrop } from './WheatCrop';
import { ResourceFieldManager } from './ResourceFieldManager';

const { ccclass, property } = _decorator;

/**
 * WheatFieldManager —— 麦田扫描管理器
 *
 * 设计说明：
 *  - 挂在场景中任意节点上
 *  - onLoad 时递归扫描 scanRoots 下所有节点
 *  - 节点 name 中包含关键字（默认"麦子"）的节点，自动 addComponent(WheatCrop)
 *  - 扫描完成后将结果批量注册到 ResourceFieldManager 单例
 *
 * 节点结构示例：
 *   WheatField_Root（拖入 scanRoots）
 *   ├── 麦子_001   ← 自动挂 WheatCrop
 *   ├── 石头_001   ← 名字不含关键字，跳过
 *   └── 麦子_002   ← 自动挂 WheatCrop
 */
@ccclass('WheatFieldManager')
export class WheatFieldManager extends Component {

    @property({
        type: [Node],
        displayName: '扫描根节点列表',
        tooltip: '将包含麦子节点的父节点拖入，管理器会递归扫描所有子孙节点'
    })
    public scanRoots: Node[] = [];

    @property({
        displayName: '节点名称关键字',
        tooltip: '节点 name 中包含此关键字时自动挂载 WheatCrop，默认：麦子'
    })
    public nameKeyword: string = '麦子';

    @property({
        type: ObjectType,
        displayName: '资源类型',
        tooltip: '扫描到的节点统一使用此资源类型'
    })
    public resourceType: ObjectType = ObjectType.DropItemCornKernel;

    @property({
        displayName: '单次收割数量',
        tooltip: '每个节点被收割时产出的资源数量',
        min: 1
    })
    public harvestAmount: number = 1;

    @property({
        displayName: '再生时间(秒, 0=不再生)',
        min: 0
    })
    public regrowTime: number = 0;

    // ─────────────────────────────────────────────
    // 运行时数据
    // ─────────────────────────────────────────────

    /** 本管理器扫描到的所有 WheatCrop */
    private _crops: WheatCrop[] = [];

    public get crops(): WheatCrop[] {
        return this._crops;
    }

    // ─────────────────────────────────────────────
    // 生命周期
    // ─────────────────────────────────────────────

    onLoad() {
        this._scan();
        // 注意：不在 onLoad 里注册，因为此时父节点的世界矩阵可能尚未刷新
        // （麦子节点有旋转时 getWorldPosition 会返回错误坐标）
        // 延迟到 start 之后再刷新坐标并注册，确保世界矩阵已稳定
    }

    start() {
        // 刷新所有 crop 的世界坐标（此时场景初始化完毕，父节点变换已稳定）
        for (const crop of this._crops) {
            crop.refreshWorldPos();
        }
        this._registerToCentral();
    }

    // ─────────────────────────────────────────────
    // 私有方法
    // ─────────────────────────────────────────────

    private _scan(): void {
        this._crops = [];
        for (const root of this.scanRoots) {
            if (root && root.isValid) {
                this._collectFromNode(root);
            }
        }
        console.log(`[WheatFieldManager] 关键字"${this.nameKeyword}"，共找到 ${this._crops.length} 个节点并挂载 WheatCrop`);
    }

    private _collectFromNode(node: Node): void {
        if (node.name.includes(this.nameKeyword)) {
            let crop = node.getComponent(WheatCrop);
            if (!crop) {
                crop = node.addComponent(WheatCrop);
            }
            crop.resourceType = this.resourceType;
            crop.harvestAmount = this.harvestAmount;
            crop.regrowTime = this.regrowTime;
            // 不在此处调用 refreshWorldPos()
            // 世界坐标统一在 start() 里刷新，确保父节点变换已完成
            this._crops.push(crop);
        }
        for (const child of node.children) {
            this._collectFromNode(child);
        }
    }

    private _registerToCentral(): void {
        const mgr = ResourceFieldManager.instance;
        if (mgr) {
            mgr.registerBatch(this._crops);
        } else {
            // ResourceFieldManager 可能还未 onLoad，延迟一帧注册
            this.scheduleOnce(() => {
                ResourceFieldManager.instance?.registerBatch(this._crops);
            }, 0);
        }
    }
}

