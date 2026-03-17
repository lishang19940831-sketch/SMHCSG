import { _decorator, Component, Vec3 } from 'cc';
import { CommonEvent, ObjectType } from '../Common/CommonEnum';
import { WheatContainer } from '../Building/WheatContainer';
import { WoodContainer } from '../Building/WoodContainer';

const { ccclass, property } = _decorator;

/**
 * 统一卸货容器接口（麦子/木头容器均实现此接口）
 */
export interface IResourceContainer {
    receive(fromPosition: Vec3, onArrived?: () => void): boolean;
}

/**
 * TrainUnloadManager —— 火车到站卸货管理器
 *
 * 挂载位置：与 TrainManager 同节点
 *
 * 职责：
 *  1. 在 Inspector 中直接拖入 WheatContainer / WoodContainer
 *  2. 对外暴露 getContainer(type) 接口，供 Train._flushPendingItems() 按类型查询容器
 *  3. 玩家第一次上车时显示 wheatContainer / woodContainer 节点
 */
@ccclass('TrainUnloadManager')
export class TrainUnloadManager extends Component {

    @property({ type: WheatContainer, displayName: '麦子容器' })
    public wheatContainer: WheatContainer = null!;

    @property({ type: WoodContainer, displayName: '木头容器' })
    public woodContainer: WoodContainer = null!;

    /** 是否已经第一次上车（用于只触发一次显示逻辑） */
    private _hasFirstBoarded: boolean = false;

    // ─────────────────────────────────────────────
    // 生命周期
    // ─────────────────────────────────────────────

    onLoad() {
        // 初始隐藏两个容器节点，等玩家第一次上车后再显示
        if (this.wheatContainer) this.wheatContainer.node.active = false;
        if (this.woodContainer) this.woodContainer.node.active = false;

        app.event.on(CommonEvent.HeroBoarded, this._onFirstBoard, this);
    }

    onDestroy() {
        app.event.off(CommonEvent.HeroBoarded, this);
    }

    // ─────────────────────────────────────────────
    // 私有方法
    // ─────────────────────────────────────────────

    private _onFirstBoard(): void {
        if (this._hasFirstBoarded) return;
        this._hasFirstBoarded = true;

        if (this.wheatContainer) this.wheatContainer.node.active = true;
        if (this.woodContainer) this.woodContainer.node.active = true;

        // 只需触发一次，注销监听
        app.event.off(CommonEvent.HeroBoarded, this);
    }

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
