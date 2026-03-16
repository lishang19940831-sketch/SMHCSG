import { _decorator, Component, Vec3 } from 'cc';
import { ObjectType } from '../Common/CommonEnum';
import { WheatContainer } from '../Building/WheatContainer';
import { WoodContainer } from '../Building/WoodContainer';

const { ccclass, property } = _decorator;

/**
 * 统一卸货容器接口（麦子/木头容器均实现此接口）
 */
export interface IResourceContainer {
    receive(fromPosition: Vec3): boolean;
}

/**
 * TrainUnloadManager —— 火车到站卸货管理器
 *
 * 挂载位置：与 TrainManager 同节点
 *
 * 职责：
 *  1. 在 Inspector 中直接拖入 WheatContainer / WoodContainer
 *  2. 对外暴露 getContainer(type) 接口，供 Train._flushPendingItems() 按类型查询容器
 */
@ccclass('TrainUnloadManager')
export class TrainUnloadManager extends Component {

    @property({ type: WheatContainer, displayName: '麦子容器' })
    public wheatContainer: WheatContainer = null!;

    @property({ type: WoodContainer, displayName: '木头容器' })
    public woodContainer: WoodContainer = null!;

    // ─────────────────────────────────────────────
    // 公开接口
    // ─────────────────────────────────────────────

    /**
     * 按资源类型获取对应的容器
     * 供 Train._flushPendingItems() 调用
     */
    public getContainer(type: ObjectType): IResourceContainer | null {
        switch (type) {
            case ObjectType.DropItemCornKernel:
                return this.wheatContainer ?? null;
            case ObjectType.DropItemWood:
                return this.woodContainer ?? null;
            default:
                console.warn(`[TrainUnloadManager] ⚠️ 未知资源类型 ${type}，无对应容器`);
                return null;
        }
    }
}
