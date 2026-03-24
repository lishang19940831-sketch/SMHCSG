import { _decorator, Collider, Component, easing, Enum, ITriggerEvent, Node, tween, Tween, v3, Vec3 } from 'cc';
import { ItemLayout, ItemLayoutPosition } from '../Tools/ItemLayout';
import { PickupComponent } from '../Components/PickupComponent';
import { DropItemCom } from '../Drop/DropItemCom';
import { ObjectType } from '../Common/CommonEnum';
import { Config } from '../Common/Config';
import { FlatbreadContainer } from './FlatbreadContainer';
const { ccclass, property } = _decorator;

/**
 * ProductionBuilding —— 生产建筑
 *
 * 职责：
 *  1. 玩家将原料a投入触发器区域，原料飞入内置原料槽（itemLayout）
 *  2. 只要触发器内有 PickupComponent（玩家），生产计时器持续累加
 *  3. 每隔 productionInterval 秒，消耗 consumePerProduction 个原料a，
 *     产出 outputPerProduction 个物品b，飞向 outputContainer（FlatbreadContainer）
 *  4. 玩家离开或原料不足时，生产计时器重置归零
 *
 * 挂载：独立节点，不依赖 ShopCommon
 */
@ccclass('ProductionBuilding')
export class ProductionBuilding extends Component {

    // ──────────────────────────────────────────────
    // Inspector 属性
    // ──────────────────────────────────────────────

    @property({ type: Enum(ObjectType), displayName: '原料类型（玩家投入）' })
    public rawMaterialType: ObjectType = ObjectType.DropItemCornKernel;

    @property({ type: ItemLayout, displayName: '原料槽布局' })
    private itemLayout: ItemLayout = null!;

    @property({ type: Collider, displayName: '触发器' })
    public productionCollider: Collider = null!;

    @property({ type: Node, displayName: '触发状态显示节点' })
    private triggerStateNode: Node = null!;

    @property({ displayName: '生产间隔（秒）', tooltip: '每隔x秒消耗一次原料并产出成品' })
    public productionInterval: number = 3;

    @property({ displayName: '每次消耗原料数量（y）' })
    public consumePerProduction: number = 2;

    @property({ displayName: '每次产出成品数量（z）' })
    public outputPerProduction: number = 1;

    @property({ type: Enum(ObjectType), displayName: '产出物类型' })
    public outputType: ObjectType = ObjectType.DropItemFlatbread;

    @property({ type: FlatbreadContainer, displayName: '成品目标容器' })
    public outputContainer: FlatbreadContainer = null!;

    // ──────────────────────────────────────────────
    // 私有状态
    // ──────────────────────────────────────────────

    /** 当前在触发器内的 PickupComponent（玩家） */
    private pickupComponents: Map<string, PickupComponent> = new Map();
    /** 各玩家在触发器内的持续时间（用于加速投料） */
    private interactionTimers: Map<string, number> = new Map();

    /** 投料检查定时器（复用 Config.UNLOCK_CHECK_INTERVAL） */
    private checkTimer: number = 0;

    /** 生产计时器：有玩家在且有原料时累加，否则重置 */
    private productionTimer: number = 0;
    private _bakeLooping: boolean = false;
    private _playBakeSound = (): void => {
        if(manager.game.isEndGame){
            return;
        }
        app.audio.playEffect('resources/audio/烘烤', 0.6);
    };
    private _refillPositions: ItemLayoutPosition[] = [];

    // ──────────────────────────────────────────────
    // 生命周期
    // ──────────────────────────────────────────────

    protected onLoad(): void {
        this.productionCollider.on('onTriggerEnter', this.onTriggerEnter, this);
        this.productionCollider.on('onTriggerExit', this.onTriggerExit, this);
    }

    protected onDestroy(): void {
        this.productionCollider.off('onTriggerEnter', this.onTriggerEnter, this);
        this.productionCollider.off('onTriggerExit', this.onTriggerExit, this);
    }

    update(dt: number): void {
        // ── 1. 投料检查：玩家站在触发器内时，定期从背包取出原料飞入原料槽 ──
        this.checkTimer += dt;
        while (this.checkTimer >= Config.UNLOCK_CHECK_INTERVAL) {
            this._checkPickupComponents();
            this.checkTimer -= Config.UNLOCK_CHECK_INTERVAL;
        }

        // ── 2. 生产计时：有玩家在场 且 原料充足 才累加 ──
        const hasWorker = this.pickupComponents.size > 0;
        const hasEnoughMaterial = this.itemLayout.getItemCount() >= this.consumePerProduction;

        if (hasWorker && hasEnoughMaterial) {
            if (!this._bakeLooping) {
                
                this._startBakeLoop();
            }
            this.productionTimer += dt;
            if (this.productionTimer >= this.productionInterval) {
                this.productionTimer = 0;
                this._produce();
            }
        } else {
            if (this._bakeLooping) {
                this._stopBakeLoop();
            }
            // 玩家离开或原料不足，计时器重置
            this.productionTimer = 0;
        }

        // ── 3. 触发状态显示 ──
        if (this.triggerStateNode) {
            this.triggerStateNode.active = this.pickupComponents.size > 0;
        }
    }

    // ──────────────────────────────────────────────
    // 触发器事件
    // ──────────────────────────────────────────────

    private onTriggerEnter(event: ITriggerEvent): void {
        const node = event.otherCollider.node;
        const pickupComponent = node.getComponent(PickupComponent);
        if (pickupComponent) {
            this.pickupComponents.set(node.uuid, pickupComponent);
            this.interactionTimers.set(node.uuid, 0);
        }
    }

    private onTriggerExit(event: ITriggerEvent): void {
        const node = event.otherCollider.node;
        if (node && this.pickupComponents.has(node.uuid)) {
            this.pickupComponents.delete(node.uuid);
            this.interactionTimers.delete(node.uuid);
        }
    }

    // ──────────────────────────────────────────────
    // 投料逻辑（玩家背包 → 原料槽）
    // ──────────────────────────────────────────────

    private _checkPickupComponents(): void {
        this.pickupComponents.forEach((pickupComponent, uuid) => {
            if (pickupComponent && pickupComponent.isValid) {
                let duration = this.interactionTimers.get(uuid) || 0;
                duration += Config.UNLOCK_CHECK_INTERVAL;
                this.interactionTimers.set(uuid, duration);
                this._tryReceiveMaterial(pickupComponent, duration);
            } else {
                this.pickupComponents.delete(uuid);
                this.interactionTimers.delete(uuid);
            }
        });
    }

    /**
     * 从玩家背包取出原料，飞入原料槽
     * 加速逻辑与 ShopCommon.onUse 一致：持续站立时每 tick 多取
     */
    private _tryReceiveMaterial(pickupComponent: PickupComponent, duration: number): void {
        const itemCount = pickupComponent.getItemCount(this.rawMaterialType);
        if (itemCount <= 0) return;

        const extraCount = Math.floor(duration / 0.1);
        let consumeCount = Math.min(1 + extraCount, 20);
        consumeCount = Math.min(consumeCount, itemCount);

        const consumedList = pickupComponent.consumeItem(this.rawMaterialType, consumeCount);
        for (const item of consumedList) {
            this._flyMaterialToLayout(item);
        }
    }

    /**
     * 将原料节点以抛物线动画飞入原料槽
     */
    private _flyMaterialToLayout(item: Node): void {
        Tween.stopAllByTarget(item);

        let layoutPos: ItemLayoutPosition | null = this._takeRefillPosition();
        if (!layoutPos) {
            layoutPos = this.itemLayout.getCurrEmptyPosition();
        }
        let targetPos: Vec3;
        let isFull = false;

        if (!layoutPos) {
            // 原料槽已满：飞到最后一个有效位置后回收
            const lastPos = this.itemLayout.getLastValidPosition();
            targetPos = this.itemLayout.getItemPosition(lastPos);
            isFull = true;
        } else {
            targetPos = this.itemLayout.getItemPosition(layoutPos);
            this.itemLayout.reserveItem(layoutPos);
        }

        manager.effect.addToEffectLayer(item);
        const start = item.getWorldPosition().clone();
        start.y += 1;
        const progressObj = { t: 0 };
        const arcH = 0.8;
        tween(progressObj)
            .to(0.4, { t: 1 }, {
                onUpdate: () => {
                    if (!item.isValid) return;
                    const liveTarget = (layoutPos && !isFull) ? this.itemLayout.getItemPosition(layoutPos) : targetPos;
                    const x = start.x + (liveTarget.x - start.x) * progressObj.t;
                    const z = start.z + (liveTarget.z - start.z) * progressObj.t;
                    const y = start.y + (liveTarget.y - start.y) * progressObj.t + 4 * arcH * progressObj.t * (1 - progressObj.t);
                    item.setWorldPosition(x, y, z);
                }
            })
            .call(() => {
                if (!item.isValid) {
                    if (!isFull && layoutPos) {
                        this.itemLayout.removeItem(layoutPos);
                        this._pushRefillPosition(layoutPos);
                    }
                    return;
                }
                app.audio.playEffect('resources/audio/SetRes', 0.6);
                if (isFull) {
                    if (layoutPos) {
                        this.itemLayout.removeItem(layoutPos);
                        this._pushRefillPosition(layoutPos);
                    }
                    manager.pool.putNode(item);
                } else if (layoutPos) {
                    // 使用 addItemToReserve 落位，内部会处理占位并抛出事件
                    const success = this.itemLayout.addItemToReserve(item, layoutPos);
                    if (!success) {
                        // 兜底：如果落位失败，回收节点并释放位置
                        this.itemLayout.removeItem(layoutPos);
                        this._pushRefillPosition(layoutPos);
                        manager.pool.putNode(item);
                        return;
                    }
                    item.setRotationFromEuler(0, 0, 0);
                    tween(item)
                        .to(0.1, { scale: v3(1.2, 1.2, 1.2) }, { easing: easing.sineOut })
                        .to(0.1, { scale: v3(1, 1, 1) }, { easing: easing.sineOut })
                        .start();
                }
            })
            .start();
    }

    // ──────────────────────────────────────────────
    // 生产逻辑（原料槽 → 成品飞出）
    // ──────────────────────────────────────────────

    /**
     * 执行一次生产：
     *  1. 从原料槽移除 consumePerProduction 个原料节点并回收
     *  2. 产出 outputPerProduction 个成品，逐个飞向 outputContainer
     */
    private _produce(): void {
        const rawCount = this.itemLayout.getItemCount();
        if (rawCount < this.consumePerProduction) return;

        // 消耗原料，同时记录每个被消耗原料的世界坐标
        const consumedPositions: Vec3[] = [];
        for (let i = 0; i < this.consumePerProduction; i++) {
            // 注意：这里取出的可能是最近刚落位（但还在顶层）的节点，也可能是正在飞行动画中的预留位
            const items = this.itemLayout.getOuterItems(1);
            if (items.length === 0) break;
            const node = items[0];
            consumedPositions.push(node.getWorldPosition());
            const lpos = this._findItemPosition(node);
            if (lpos) {
                // 如果找到位置，说明这是一个真实在布局里的节点
                this.itemLayout.removeItem(lpos);
                this._pushRefillPosition(lpos);
            } else {
                // 兜底：如果不在常规布局里，强制从 ItemLayout 的预留项里找
                let foundReserve = false;
                for (let layer = this.itemLayout.maxLayerLimit - 1; layer >= 0; layer--) {
                    for (let row = this.itemLayout.rows - 1; row >= 0; row--) {
                        for (let column = this.itemLayout.columns - 1; column >= 0; column--) {
                            const rpos = { row, column, layer };
                            const item = this.itemLayout.getItem(rpos);
                            if (item && item.node === node) {
                                this.itemLayout.removeItem(rpos);
                                this._pushRefillPosition(rpos);
                                foundReserve = true;
                                break;
                            }
                        }
                        if (foundReserve) break;
                    }
                    if (foundReserve) break;
                }
                if (!foundReserve) {
                    this.itemLayout.removeItemByNode(node);
                }
            }
            manager.pool.putNode(items[0]);
        }

        // 产出成品：
        for (let i = 0; i < this.outputPerProduction; i++) {
            const posIndex = Math.min(i, consumedPositions.length - 1);
            const fromPos = consumedPositions[posIndex].clone();
            this.scheduleOnce(() => {
                this.outputContainer?.receive(fromPos);
            }, i * 0.05);
        }
    }

    // ──────────────────────────────────────────────
    // 公开接口
    // ──────────────────────────────────────────────

    /** 获取当前原料槽存量 */
    public getMaterialCount(): number {
        return this.itemLayout.getItemCount();
    }

    public receiveRawMaterial(fromPosition: Vec3, type: ObjectType): boolean {
        if (type !== this.rawMaterialType) {
            return false;
        }
        const item = manager.pool.getNode(type);
        if (!item) return false;
        Tween.stopAllByTarget(item);
        let layoutPos: ItemLayoutPosition | null = this._takeRefillPosition();
        if (!layoutPos) {
            layoutPos = this.itemLayout.getCurrEmptyPosition();
        }
        let targetPos: Vec3;
        let isFull = false;
        if (!layoutPos) {
            const lastPos = this.itemLayout.getLastValidPosition();
            targetPos = this.itemLayout.getItemPosition(lastPos);
            isFull = true;
        } else {
            targetPos = this.itemLayout.getItemPosition(layoutPos);
            this.itemLayout.reserveItem(layoutPos);
        }
        const startPos = fromPosition.clone();
        startPos.y += 1;
        item.setWorldPosition(startPos);
        manager.effect.addToEffectLayer(item);
        const progressObj2 = { t: 0 };
        const arcH2 = 0.8;
        tween(progressObj2)
            .to(0.4, { t: 1 }, {
                onUpdate: () => {
                    if (!item.isValid) return;
                    const liveTarget = (layoutPos && !isFull) ? this.itemLayout.getItemPosition(layoutPos) : targetPos;
                    const x = startPos.x + (liveTarget.x - startPos.x) * progressObj2.t;
                    const z = startPos.z + (liveTarget.z - startPos.z) * progressObj2.t;
                    const y = startPos.y + (liveTarget.y - startPos.y) * progressObj2.t + 4 * arcH2 * progressObj2.t * (1 - progressObj2.t);
                    item.setWorldPosition(x, y, z);
                }
            })
            .call(() => {
                if (!item.isValid) {
                    if (!isFull && layoutPos) {
                        this.itemLayout.removeItem(layoutPos);
                        this._pushRefillPosition(layoutPos);
                    }
                    return;
                }
                app.audio.playEffect('resources/audio/SetRes', 0.6);
                if (isFull) {
                    if (layoutPos) {
                        this.itemLayout.removeItem(layoutPos);
                        this._pushRefillPosition(layoutPos);
                    }
                    manager.pool.putNode(item);
                } else if (layoutPos) {
                    const success = this.itemLayout.addItemToReserve(item, layoutPos);
                    if (!success) {
                        this.itemLayout.removeItem(layoutPos);
                        this._pushRefillPosition(layoutPos);
                        manager.pool.putNode(item);
                        return;
                    }
                    item.setRotationFromEuler(0, 0, 0);
                    tween(item)
                        .to(0.1, { scale: v3(1.2, 1.2, 1.2) }, { easing: easing.sineOut })
                        .to(0.1, { scale: v3(1, 1, 1) }, { easing: easing.sineOut })
                        .start();
                }
            })
            .start();
        return true;
    }

    /** 重置（关卡重置时调用） */
    public reset(): void {
        this.itemLayout.reset();
        this.pickupComponents.clear();
        this.interactionTimers.clear();
        this.productionTimer = 0;
        this.checkTimer = 0;
        this._stopBakeLoop();
        this._refillPositions = [];
    }

    private _startBakeLoop(): void {
        if (this._bakeLooping) return;
        this.unschedule(this._playBakeSound);
        this._playBakeSound();
        this.schedule(this._playBakeSound, 2);
        this._bakeLooping = true;
    }

    private _stopBakeLoop(): void {
        if (!this._bakeLooping) return;
        this.unschedule(this._playBakeSound);
        this._bakeLooping = false;
    }

    private _findItemPosition(node: Node): ItemLayoutPosition | null {
        for (let layer = 0; layer < this.itemLayout.maxLayerLimit; layer++) {
            for (let row = 0; row < this.itemLayout.rows; row++) {
                for (let column = 0; column < this.itemLayout.columns; column++) {
                    const lpos = { row, column, layer };
                    const it = this.itemLayout.getItem(lpos);
                    // 放宽条件：只要节点匹配，不管是不是 isAdded，都认为是它的位置（兼容飞行中的节点）
                    if (it && it.node === node) {
                        return lpos;
                    }
                }
            }
        }
        return null;
    }

    private _takeRefillPosition(): ItemLayoutPosition | null {
        for (let i = 0; i < this._refillPositions.length; i++) {
            const candidate = this._refillPositions[i];
            const it = this.itemLayout.getItem(candidate);
            if (!it || !it.isFull) {
                this._refillPositions.splice(i, 1);
                return candidate;
            }
        }
        return null;
    }

    private _pushRefillPosition(lpos: ItemLayoutPosition): void {
        const exists = this._refillPositions.some(p => p.row === lpos.row && p.column === lpos.column && p.layer === lpos.layer);
        if (!exists) {
            this._refillPositions.push(lpos);
            // 排序保证回填时从底层优先
            this._refillPositions.sort((a, b) => {
                if (a.layer !== b.layer) return a.layer - b.layer;
                if (a.row !== b.row) return a.row - b.row;
                return a.column - b.column;
            });
        }
    }
}
