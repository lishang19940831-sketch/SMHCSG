import { _decorator, Collider, Component, ITriggerEvent, Node, Vec3 } from 'cc';
import { ItemLayout } from '../Tools/ItemLayout';
import { PickupComponent } from '../Components/PickupComponent';
import { DropItemCom } from '../Drop/DropItemCom';
import { CommonEvent, ObjectType } from '../../Main/Common/CommonEnum';
import { Config } from '../../Main/Common/Config';
import { ComponentEvent } from '../../Main/Common/ComponentEvents';
const { ccclass, property } = _decorator;

@ccclass('WheatContainer')
export class WheatContainer extends Component {

    @property({ type: ItemLayout, displayName: '麦子布局' })
    private wheatLayout: ItemLayout = null!;

    @property({ displayName: '无限存储模式', tooltip: '开启后麦子存储无上限，ItemLayout仅作显示用' })
    private unlimitedMode: boolean = false;

    @property({ type: Collider, displayName: '麦子容器触发器' })
    private wheatContainerCollider: Collider = null!;

    private pickupComponents: Map<string, PickupComponent> = new Map();
    private interactionTimers: Map<string, number> = new Map();
    private checkTimer: number = 0.1;
    private _virtualWheatCount: number = 0;
    private _busyItems: Set<Node> = new Set();

    public get WheatLayout(): ItemLayout {
        return this.wheatLayout;
    }

    protected onLoad(): void {
        this.wheatContainerCollider.on('onTriggerEnter', this.onTriggerEnter, this);
        this.wheatContainerCollider.on('onTriggerExit', this.onTriggerExit, this);

        if (this.wheatLayout && this.wheatLayout.node) {
            this.wheatLayout.node.on(ComponentEvent.ITEM_COUNT_CHANGED, this.onWheatCountChanged, this);
        }
    }

    protected onDestroy(): void {
    }

    update(dt: number) {
        this.checkTimer += dt;
        while (this.checkTimer >= Config.UNLOCK_CHECK_INTERVAL) {
            this._checkPickupComponents();
            this.checkTimer -= Config.UNLOCK_CHECK_INTERVAL;
        }
    }

    private _checkPickupComponents() {
        this.pickupComponents.forEach((pickupComponent, uuid) => {
            if (pickupComponent && pickupComponent.isValid) {
                let duration = this.interactionTimers.get(uuid) || 0;
                duration += Config.UNLOCK_CHECK_INTERVAL;
                this.interactionTimers.set(uuid, duration);
                this.onPickup(pickupComponent, duration);
            } else {
                this.pickupComponents.delete(uuid);
                this.interactionTimers.delete(uuid);
            }
        });
    }

    private onTriggerEnter(event: ITriggerEvent) {
        const node = event.otherCollider.node;
        const pickupComponent = node.getComponent(PickupComponent);
        if (pickupComponent) {
            this.pickupComponents.set(node.uuid, pickupComponent);
            this.interactionTimers.set(node.uuid, 0);
            //踩上麦子，heroY轴抬高0.5
            // manager.game.hero.node.getChildByName("ModelNode").setPosition(0,0.8,0);
        }
    }

    private onTriggerExit(event: ITriggerEvent) {
        const node = event.otherCollider.node;
        if (node && this.pickupComponents.has(node.uuid)) {
            this.pickupComponents.delete(node.uuid);
            this.interactionTimers.delete(node.uuid);
            //离开麦子，heroY轴恢复为0
            // manager.game.hero.node.getChildByName("ModelNode").setPosition(0,0,0);
        }
    }

    onPickup(pickupComponent: PickupComponent, duration: number = 0) {
        const extraCount = Math.floor(duration / 0.1);
        let pickupCount = 1 + extraCount;
        pickupCount = Math.min(pickupCount, 20);

        let successCount = 0;
        for (let i = 0; i < pickupCount; i++) {
            if (this.doPickupOneWheat(pickupComponent)) {
                successCount++;
            } else {
                break;
            }
        }
    }

    private doPickupOneWheat(pickupComponent: PickupComponent): boolean {
        if (this.unlimitedMode) {
            if (this._virtualWheatCount <= 0) {
                return false;
            }

            if (!pickupComponent.isItemPickable(ObjectType.DropItemCornKernel)) {
                return false;
            }

            const visualCount = this.wheatLayout.getItemCount();
            let wheatItem: Node | null = null;
            let shouldRemoveVisualItem = this._virtualWheatCount <= visualCount;

            if (shouldRemoveVisualItem) {
                const items = this.wheatLayout.getOuterItems(1);
                if (items.length > 0) {
                    wheatItem = items[0];
                    this.wheatLayout.removeItemByNode(wheatItem);
                }
            } else {
                const outerItems = this.wheatLayout.getOuterItems(1);
                if (outerItems.length > 0) {
                    const visualItem = outerItems[0];
                    wheatItem = manager.pool.getNode(ObjectType.DropItemCornKernel);
                    if (wheatItem) {
                        wheatItem.setWorldPosition(visualItem.getWorldPosition());
                        wheatItem.setWorldRotation(visualItem.getWorldRotation());
                    }
                }
            }

            this._virtualWheatCount--;
            this.onWheatCountChanged(this._virtualWheatCount);

            if (wheatItem) {
                const dropItemCom = wheatItem.getComponent(DropItemCom);
                if (dropItemCom) {
                    pickupComponent.pickupItem(dropItemCom);
                } else {
                    manager.pool.putNode(wheatItem);
                }
            } else {
                const tempWheat = manager.pool.getNode(ObjectType.DropItemCornKernel);
                if (tempWheat) {
                    const dropItemCom = tempWheat.getComponent(DropItemCom);
                    if (dropItemCom) {
                        pickupComponent.pickupItem(dropItemCom);
                    }
                }
            }
            return true;

        } else {
            const item = this._chooseOuterItem();
            if (!item) {
                return false;
            }

            if (!pickupComponent.isItemPickable(ObjectType.DropItemCornKernel)) {
                return false;
            }

            const dropItemCom = item.getComponent(DropItemCom);
            if (dropItemCom) {
                this._busyItems.add(item);
                this.wheatLayout.removeItemByNode(item);
                this._busyItems.delete(item);
                pickupComponent.pickupItem(dropItemCom);
                return true;
            }
            return false;
        }
    }

    public takeForConveyor(): Node | null {
        if (this.unlimitedMode) {
            if (this._virtualWheatCount <= 0) {
                return null;
            }
            const visualCount = this.wheatLayout.getItemCount();
            let wheatItem: Node | null = null;
            const shouldRemoveVisual = this._virtualWheatCount <= visualCount;
            if (shouldRemoveVisual) {
                const item = this._chooseOuterItem();
                if (item) {
                    this._busyItems.add(item);
                    this.wheatLayout.removeItemByNode(item);
                    this._busyItems.delete(item);
                    wheatItem = item;
                }
            }
            if (!wheatItem) {
                const outer = this.wheatLayout.getOuterItems(1);
                const spawnPos = outer.length > 0 ? outer[0].getWorldPosition() : this.node.getWorldPosition();
                wheatItem = manager.pool.getNode(ObjectType.DropItemCornKernel);
                if (!wheatItem) {
                    return null;
                }
                wheatItem.setWorldPosition(spawnPos);
                wheatItem.setWorldRotation(outer.length > 0 ? outer[0].getWorldRotation() : this.node.getWorldRotation());
            }
            this._virtualWheatCount--;
            this.onWheatCountChanged(this._virtualWheatCount);
            return wheatItem;
        } else {
            const item = this._chooseOuterItem();
            if (!item) return null;
            const dropItemCom = item.getComponent(DropItemCom);
            if (!dropItemCom) return null;
            this._busyItems.add(item);
            this.wheatLayout.removeItemByNode(item);
            this._busyItems.delete(item);
            return item;
        }
    }

    private _chooseOuterItem(): Node | null {
        const items = this.wheatLayout.getOuterItems(1);
        for (const it of items) {
            if (it && it.isValid && !this._busyItems.has(it)) {
                return it;
            }
        }
        return null;
    }

    /**
     * 接收麦子并让其飞到容器中
     * @param fromPosition 麦子的起始位置
     * @returns 是否成功接收
     */
    public receive(fromPosition: Vec3, onArrived?: () => void): boolean {
        const wheat = manager.pool.getNode(ObjectType.DropItemCornKernel);
        if (!wheat) {
            return false;
        }

        const layoutPos = this.wheatLayout.getCurrEmptyPosition();
        let targetPos: Vec3;
        let isContainerFull = false;

        if (!layoutPos) {
            const lastValidPos = this.wheatLayout.getLastValidPosition();
            targetPos = this.wheatLayout.getItemPosition(lastValidPos);
            isContainerFull = true;
        } else {
            targetPos = this.wheatLayout.getItemPosition(layoutPos);
            this.wheatLayout.reserveItem(layoutPos);
        }

        if (this.unlimitedMode) {
            this._virtualWheatCount++;
            this.onWheatCountChanged(this._virtualWheatCount);
        }

        const startPos = fromPosition.clone();
        startPos.y += 1;
        wheat.setWorldPosition(startPos);

        manager.effect.addToEffectLayer(wheat);

        manager.effect.flyNodeInParabola({
            node: wheat,
            target: targetPos,
            callback: () => {
                if (!wheat.isValid) {
                    onArrived?.();
                    return;
                }

                if (this.unlimitedMode && !isContainerFull && layoutPos) {
                    const currentVisualCount = this.wheatLayout.getItemCount();
                    if (this._virtualWheatCount <= currentVisualCount) {
                        manager.pool.putNode(wheat);
                        this.wheatLayout.removeItem(layoutPos);
                        onArrived?.();
                        return;
                    }
                }

                if (isContainerFull) {
                    manager.pool.putNode(wheat);
                } else {
                    this.wheatLayout.removeItem(layoutPos);
                    this.wheatLayout.addItem(wheat, layoutPos);
                    wheat.setRotationFromEuler(0, 0, 0);
                }
                onArrived?.();
            }
        });

        return true;
    }

    private onWheatCountChanged(count: number): void {
        if (this.unlimitedMode) {
            app.event.emit(CommonEvent.WheatContainerCountChanged, this._virtualWheatCount);
        } else {
            app.event.emit(CommonEvent.WheatContainerCountChanged, count);
        }
    }

    public getCount(): number {
        if (this.unlimitedMode) {
            return this._virtualWheatCount;
        }
        return this.wheatLayout.getItemCount();
    }

    /**
     * 瞬间放入一个麦子（火车卸货时调用，不播放飞行动画）
     */
    public receiveInstant(): void {
        if (this.unlimitedMode) {
            this._virtualWheatCount++;
            this.onWheatCountChanged(this._virtualWheatCount);
        } else {
            const layoutPos = this.wheatLayout.getCurrEmptyPosition();
            console.log('receiveInstant layoutPos', layoutPos);
            if (!layoutPos) return; // 已满则丢弃
            const wheat = manager.pool.getNode(ObjectType.DropItemCornKernel);
            console.log('receiveInstant wheat', wheat);
            if (!wheat) return;
            this.wheatLayout.addItem(wheat, layoutPos);
            wheat.setRotationFromEuler(0, 0, 0);
        }
    }

    public reset(): void {
        this.wheatLayout.reset();
        this.pickupComponents.clear();
        this._virtualWheatCount = 0;
        this._busyItems.clear();
        if (this.unlimitedMode) {
            this.onWheatCountChanged(0);
        }
    }
}

