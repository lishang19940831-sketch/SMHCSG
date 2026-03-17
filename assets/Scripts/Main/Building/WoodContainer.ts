import { _decorator, Collider, Component, ITriggerEvent, Node, Vec3 } from 'cc';
import { ItemLayout } from '../Tools/ItemLayout';
import { PickupComponent } from '../Components/PickupComponent';
import { DropItemCom } from '../Drop/DropItemCom';
import { CommonEvent, ObjectType } from '../../Main/Common/CommonEnum';
import { Config } from '../../Main/Common/Config';
import { ComponentEvent } from '../../Main/Common/ComponentEvents';
const { ccclass, property } = _decorator;

@ccclass('WoodContainer')
export class WoodContainer extends Component {

    @property({ type: ItemLayout, displayName: '木头布局' })
    private woodLayout: ItemLayout = null!;

    @property({ displayName: '无限存储模式', tooltip: '开启后木头存储无上限，ItemLayout仅作显示用' })
    private unlimitedMode: boolean = false;

    @property({ type: Collider, displayName: '木头容器触发器' })
    private woodContainerCollider: Collider = null!;

    private pickupComponents: Map<string, PickupComponent> = new Map();
    private interactionTimers: Map<string, number> = new Map();
    private checkTimer: number = 0.1;
    private _virtualWoodCount: number = 0;

    public get WoodLayout(): ItemLayout {
        return this.woodLayout;
    }

    protected onLoad(): void {
        this.woodContainerCollider.on('onTriggerEnter', this.onTriggerEnter, this);
        this.woodContainerCollider.on('onTriggerExit', this.onTriggerExit, this);

        if (this.woodLayout && this.woodLayout.node) {
            this.woodLayout.node.on(ComponentEvent.ITEM_COUNT_CHANGED, this.onWoodCountChanged, this);
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
            //踩上木板，heroY轴抬高0.5
            manager.game.hero.node.getChildByName("ModelNode").setPosition(0,0.8,0);
        }
    }

    private onTriggerExit(event: ITriggerEvent) {
        const node = event.otherCollider.node;
        if (node && this.pickupComponents.has(node.uuid)) {
            this.pickupComponents.delete(node.uuid);
            this.interactionTimers.delete(node.uuid);
            //离开木板，heroY轴恢复为0
            manager.game.hero.node.getChildByName("ModelNode").setPosition(0,0,0);
        }
    }

    onPickup(pickupComponent: PickupComponent, duration: number = 0) {
        const extraCount = Math.floor(duration / 0.1);
        let pickupCount = 1 + extraCount;
        pickupCount = Math.min(pickupCount, 20);

        let successCount = 0;
        for (let i = 0; i < pickupCount; i++) {
            if (this.doPickupOneWood(pickupComponent)) {
                successCount++;
            } else {
                break;
            }
        }
    }

    private doPickupOneWood(pickupComponent: PickupComponent): boolean {
        if (this.unlimitedMode) {
            if (this._virtualWoodCount <= 0) {
                return false;
            }

            if (!pickupComponent.isItemPickable(ObjectType.DropItemWood)) {
                return false;
            }

            const visualCount = this.woodLayout.getItemCount();
            let woodItem: Node | null = null;
            let shouldRemoveVisualItem = this._virtualWoodCount <= visualCount;

            if (shouldRemoveVisualItem) {
                const items = this.woodLayout.getOuterItems(1);
                if (items.length > 0) {
                    woodItem = items[0];
                    this.woodLayout.removeItemByNode(woodItem);
                }
            } else {
                const outerItems = this.woodLayout.getOuterItems(1);
                if (outerItems.length > 0) {
                    const visualItem = outerItems[0];
                    woodItem = manager.pool.getNode(ObjectType.DropItemWood);
                    if (woodItem) {
                        woodItem.setWorldPosition(visualItem.getWorldPosition());
                        woodItem.setWorldRotation(visualItem.getWorldRotation());
                    }
                }
            }

            this._virtualWoodCount--;
            this.onWoodCountChanged(this._virtualWoodCount);

            if (woodItem) {
                const dropItemCom = woodItem.getComponent(DropItemCom);
                if (dropItemCom) {
                    pickupComponent.pickupItem(dropItemCom);
                } else {
                    manager.pool.putNode(woodItem);
                }
            } else {
                const tempWood = manager.pool.getNode(ObjectType.DropItemWood);
                if (tempWood) {
                    const dropItemCom = tempWood.getComponent(DropItemCom);
                    if (dropItemCom) {
                        pickupComponent.pickupItem(dropItemCom);
                    }
                }
            }
            return true;

        } else {
            const items = this.woodLayout.getOuterItems(1);
            if (items.length === 0) {
                return false;
            }

            if (!pickupComponent.isItemPickable(ObjectType.DropItemWood)) {
                return false;
            }

            const woodItem = items[0];
            const dropItemCom = woodItem.getComponent(DropItemCom);
            if (dropItemCom) {
                this.woodLayout.removeItemByNode(woodItem);
                pickupComponent.pickupItem(dropItemCom);
                return true;
            }
            return false;
        }
    }

    /**
     * 接收木头并让其飞到容器中
     * @param fromPosition 木头的起始位置
     * @returns 是否成功接收
     */
    public receive(fromPosition: Vec3, onArrived?: () => void): boolean {
        const wood = manager.pool.getNode(ObjectType.DropItemWood);
        if (!wood) {
            return false;
        }

        const layoutPos = this.woodLayout.getCurrEmptyPosition();
        let targetPos: Vec3;
        let isContainerFull = false;

        if (!layoutPos) {
            const lastValidPos = this.woodLayout.getLastValidPosition();
            targetPos = this.woodLayout.getItemPosition(lastValidPos);
            isContainerFull = true;
        } else {
            targetPos = this.woodLayout.getItemPosition(layoutPos);
            this.woodLayout.reserveItem(layoutPos);
        }

        if (this.unlimitedMode) {
            this._virtualWoodCount++;
            this.onWoodCountChanged(this._virtualWoodCount);
        }

        const startPos = fromPosition.clone();
        startPos.y += 1;
        wood.setWorldPosition(startPos);

        manager.effect.addToEffectLayer(wood);

        manager.effect.flyNodeInParabola({
            node: wood,
            target: targetPos,
            callback: () => {
                if (!wood.isValid) {
                    onArrived?.();
                    return;
                }

                if (this.unlimitedMode && !isContainerFull && layoutPos) {
                    const currentVisualCount = this.woodLayout.getItemCount();
                    if (this._virtualWoodCount <= currentVisualCount) {
                        manager.pool.putNode(wood);
                        this.woodLayout.removeItem(layoutPos);
                        onArrived?.();
                        return;
                    }
                }

                if (isContainerFull) {
                    manager.pool.putNode(wood);
                } else {
                    this.woodLayout.addItemToReserve(wood, layoutPos);
                    wood.setRotationFromEuler(0, 0, 0);
                }
                onArrived?.();
            }
        });

        return true;
    }

    private onWoodCountChanged(count: number): void {
        if (this.unlimitedMode) {
            app.event.emit(CommonEvent.WoodContainerCountChanged, this._virtualWoodCount);
        } else {
            app.event.emit(CommonEvent.WoodContainerCountChanged, count);
        }
    }

    public getCount(): number {
        if (this.unlimitedMode) {
            return this._virtualWoodCount;
        }
        return this.woodLayout.getItemCount();
    }

    /**
     * 瞬间放入一个木头（火车卸货时调用，不播放飞行动画）
     */
    public receiveInstant(): void {
        if (this.unlimitedMode) {
            this._virtualWoodCount++;
            this.onWoodCountChanged(this._virtualWoodCount);
        } else {
            const layoutPos = this.woodLayout.getCurrEmptyPosition();
            if (!layoutPos) return; // 已满则丢弃
            const wood = manager.pool.getNode(ObjectType.DropItemWood);
            if (!wood) return;
            this.woodLayout.addItem(wood, layoutPos);
            wood.setRotationFromEuler(0, 0, 0);
        }
    }

    public reset(): void {
        this.woodLayout.reset();
        this.pickupComponents.clear();
        this._virtualWoodCount = 0;
        if (this.unlimitedMode) {
            this.onWoodCountChanged(0);
        }
    }
}

