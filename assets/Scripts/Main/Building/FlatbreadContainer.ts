import { _decorator, Collider, Component, ITriggerEvent, Node, Vec3 } from 'cc';
import { ItemLayout } from '../Tools/ItemLayout';
import { PickupComponent } from '../Components/PickupComponent';
import { DropItemCom } from '../Drop/DropItemCom';
import { CommonEvent, ObjectType } from '../../Main/Common/CommonEnum';
import { Config } from '../../Main/Common/Config';
import { ComponentEvent } from '../../Main/Common/ComponentEvents';
const { ccclass, property } = _decorator;

@ccclass('FlatbreadContainer')
export class FlatbreadContainer extends Component {

    @property({ type: ItemLayout, displayName: '大饼布局' })
    private flatbreadLayout: ItemLayout = null!;

    @property({ displayName: '无限存储模式', tooltip: '开启后大饼存储无上限，ItemLayout仅作显示用' })
    private unlimitedMode: boolean = false;

    @property({ type: Collider, displayName: '大饼容器触发器' })
    public flatbreadContainerCollider: Collider = null!;

    private pickupComponents: Map<string, PickupComponent> = new Map();
    private interactionTimers: Map<string, number> = new Map();
    private checkTimer: number = 0.1;
    private _virtualFlatbreadCount: number = 0;

    public get FlatbreadLayout(): ItemLayout {
        return this.flatbreadLayout;
    }

    protected onLoad(): void {
        this.flatbreadContainerCollider.on('onTriggerEnter', this.onTriggerEnter, this);
        this.flatbreadContainerCollider.on('onTriggerExit', this.onTriggerExit, this);

        if (this.flatbreadLayout && this.flatbreadLayout.node) {
            this.flatbreadLayout.node.on(ComponentEvent.ITEM_COUNT_CHANGED, this.onFlatbreadCountChanged, this);
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
        }
    }

    private onTriggerExit(event: ITriggerEvent) {
        const node = event.otherCollider.node;
        if (node && this.pickupComponents.has(node.uuid)) {
            this.pickupComponents.delete(node.uuid);
            this.interactionTimers.delete(node.uuid);
        }
    }

    onPickup(pickupComponent: PickupComponent, duration: number = 0) {
        const extraCount = Math.floor(duration / 0.1);
        let pickupCount = 1 + extraCount;
        pickupCount = Math.min(pickupCount, 20);

        for (let i = 0; i < pickupCount; i++) {
            if (!this.doPickupOneFlatbread(pickupComponent)) {
                break;
            }
        }
    }

    private doPickupOneFlatbread(pickupComponent: PickupComponent): boolean {
        if (this.unlimitedMode) {
            if (this._virtualFlatbreadCount <= 0) {
                return false;
            }

            if (!pickupComponent.isItemPickable(ObjectType.DropItemFlatbread)) {
                return false;
            }

            const visualCount = this.flatbreadLayout.getItemCount();
            let flatbreadItem: Node | null = null;
            let shouldRemoveVisualItem = this._virtualFlatbreadCount <= visualCount;

            if (shouldRemoveVisualItem) {
                const items = this.flatbreadLayout.getOuterItems(1);
                if (items.length > 0) {
                    flatbreadItem = items[0];
                    this.flatbreadLayout.removeItemByNode(flatbreadItem);
                }
            } else {
                const outerItems = this.flatbreadLayout.getOuterItems(1);
                if (outerItems.length > 0) {
                    const visualItem = outerItems[0];
                    flatbreadItem = manager.pool.getNode(ObjectType.DropItemFlatbread);
                    if (flatbreadItem) {
                        flatbreadItem.setWorldPosition(visualItem.getWorldPosition());
                        flatbreadItem.setWorldRotation(visualItem.getWorldRotation());
                    }
                }
            }

            this._virtualFlatbreadCount--;
            this.onFlatbreadCountChanged(this._virtualFlatbreadCount);

            if (flatbreadItem) {
                const dropItemCom = flatbreadItem.getComponent(DropItemCom);
                if (dropItemCom) {
                    pickupComponent.pickupItem(dropItemCom);
                } else {
                    manager.pool.putNode(flatbreadItem);
                }
            } else {
                const tempFlatbread = manager.pool.getNode(ObjectType.DropItemFlatbread);
                if (tempFlatbread) {
                    const dropItemCom = tempFlatbread.getComponent(DropItemCom);
                    if (dropItemCom) {
                        pickupComponent.pickupItem(dropItemCom);
                    }
                }
            }
            return true;

        } else {
            const items = this.flatbreadLayout.getOuterItems(1);
            if (items.length === 0) {
                return false;
            }

            if (!pickupComponent.isItemPickable(ObjectType.DropItemFlatbread)) {
                return false;
            }

            const flatbreadItem = items[0];
            const dropItemCom = flatbreadItem.getComponent(DropItemCom);
            if (dropItemCom) {
                this.flatbreadLayout.removeItemByNode(flatbreadItem);
                pickupComponent.pickupItem(dropItemCom);
                return true;
            }
            return false;
        }
    }

    /**
     * 接收大饼并让其飞到容器中
     * @param fromPosition 大饼的起始位置
     * @returns 是否成功接收
     */
    public receive(fromPosition: Vec3, onArrived?: () => void): boolean {
        const flatbread = manager.pool.getNode(ObjectType.DropItemFlatbread);
        if (!flatbread) {
            return false;
        }

        const layoutPos = this.flatbreadLayout.getCurrEmptyPosition();
        let targetPos: Vec3;
        let isContainerFull = false;

        if (!layoutPos) {
            const lastValidPos = this.flatbreadLayout.getLastValidPosition();
            targetPos = this.flatbreadLayout.getItemPosition(lastValidPos);
            isContainerFull = true;
        } else {
            targetPos = this.flatbreadLayout.getItemPosition(layoutPos);
            this.flatbreadLayout.reserveItem(layoutPos);
        }

        if (this.unlimitedMode) {
            this._virtualFlatbreadCount++;
            this.onFlatbreadCountChanged(this._virtualFlatbreadCount);
        }

        const startPos = fromPosition.clone();
        startPos.y += 1;
        flatbread.setWorldPosition(startPos);

        manager.effect.addToEffectLayer(flatbread);

        manager.effect.flyNodeInParabola({
            node: flatbread,
            target: targetPos,
            callback: () => {
                if (!flatbread.isValid) {
                    onArrived?.();
                    return;
                }

                if (this.unlimitedMode && !isContainerFull && layoutPos) {
                    const currentVisualCount = this.flatbreadLayout.getItemCount();
                    if (this._virtualFlatbreadCount <= currentVisualCount) {
                        manager.pool.putNode(flatbread);
                        this.flatbreadLayout.removeItem(layoutPos);
                        onArrived?.();
                        return;
                    }
                }

                if (isContainerFull) {
                    manager.pool.putNode(flatbread);
                } else {
                    this.flatbreadLayout.addItemToReserve(flatbread, layoutPos);
                    flatbread.setRotationFromEuler(0, 0, 0);
                }
                onArrived?.();
            }
        });

        return true;
    }

    private onFlatbreadCountChanged(count: number): void {
        if (this.unlimitedMode) {
            app.event.emit(CommonEvent.FlatbreadContainerCountChanged, this._virtualFlatbreadCount);
        } else {
            app.event.emit(CommonEvent.FlatbreadContainerCountChanged, count);
        }
    }

    public getCount(): number {
        if (this.unlimitedMode) {
            return this._virtualFlatbreadCount;
        }
        return this.flatbreadLayout.getItemCount();
    }

    /**
     * 瞬间放入一个大饼（火车卸货时调用，不播放飞行动画）
     */
    public receiveInstant(): void {
        if (this.unlimitedMode) {
            this._virtualFlatbreadCount++;
            this.onFlatbreadCountChanged(this._virtualFlatbreadCount);
        } else {
            const layoutPos = this.flatbreadLayout.getCurrEmptyPosition();
            if (!layoutPos) return; // 已满则丢弃
            const flatbread = manager.pool.getNode(ObjectType.DropItemFlatbread);
            if (!flatbread) return;
            this.flatbreadLayout.addItem(flatbread, layoutPos);
            flatbread.setRotationFromEuler(0, 0, 0);
        }
    }

    public reset(): void {
        this.flatbreadLayout.reset();
        this.pickupComponents.clear();
        this._virtualFlatbreadCount = 0;
        if (this.unlimitedMode) {
            this.onFlatbreadCountChanged(0);
        }
    }
}

