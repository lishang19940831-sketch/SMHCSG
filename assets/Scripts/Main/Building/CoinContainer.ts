import { _decorator, Collider, Component, ITriggerEvent, Node, Tween, v3, Vec3 } from 'cc';
import { ItemLayout } from '../Tools/ItemLayout';
import { PickupComponent } from '../Components/PickupComponent';
import { DropItemCom } from '../Drop/DropItemCom';
import { CommonEvent, ObjectType } from '../../Main/Common/CommonEnum';
import { Config } from '../../Main/Common/Config';
import { ComponentEvent } from '../../Main/Common/ComponentEvents';
const { ccclass, property } = _decorator;

@ccclass('CoinContainer')
export class CoinContainer extends Component {

    @property({type: ItemLayout, displayName: '金币布局'})
    private coinLayout: ItemLayout = null!;

    @property({displayName: '无限存储模式', tooltip: '开启后金币存储无上限，ItemLayout仅作显示用'})
    private unlimitedMode: boolean = false;

    @property({type: Collider, displayName: '金币容器触发器'})
    private coinContainerCollider: Collider = null!;

    private pickupComponents: Map<string, PickupComponent> = new Map(); // 存储在触发器内的PickupComponent
    private interactionTimers: Map<string, number> = new Map(); // 存储在触发器内的PickupComponent的交互时间
    private checkTimer: number = 0.1; // 用于在update中控制检查频率
    private _virtualCoinCount: number = 0; // 虚拟金币数量（仅在无限模式下使用）

    public get CoinLayout(): ItemLayout {
        return this.coinLayout;
    }

    protected onLoad(): void {
        this.coinContainerCollider.on('onTriggerEnter', this.onTriggerEnter, this);
        this.coinContainerCollider.on('onTriggerExit', this.onTriggerExit, this);
        
        // 监听金币数量变化事件
        if (this.coinLayout && this.coinLayout.node) {
            this.coinLayout.node.on(ComponentEvent.ITEM_COUNT_CHANGED, this.onCoinCountChanged, this);
        
    }
    }
    
    protected onDestroy(): void {
    }

    update(dt: number) {
        // 累加时间
        this.checkTimer += dt;
        
        // 当累加时间达到检查间隔时执行检查，确保低帧率时不会漏掉检查次数
        while (this.checkTimer >= Config.UNLOCK_CHECK_INTERVAL) {
            this._checkPickupComponents();
            this.checkTimer -= Config.UNLOCK_CHECK_INTERVAL; // 减去一个间隔时间而不是重置为0
        }
    }

    private _checkPickupComponents() {
        // 遍历所有触发器内的PickupComponent
        this.pickupComponents.forEach((pickupComponent, uuid) => {
            if(pickupComponent && pickupComponent.isValid){
                let duration = this.interactionTimers.get(uuid) || 0;
                duration += Config.UNLOCK_CHECK_INTERVAL;
                this.interactionTimers.set(uuid, duration);
                this.onPickup(pickupComponent, duration);
            } else {
                // 如果组件不再有效，从Map中移除
                this.pickupComponents.delete(uuid);
                this.interactionTimers.delete(uuid);
            }
        });
    }

    private onTriggerEnter(event: ITriggerEvent ) {
        const node = event.otherCollider.node;
        const pickupComponent = node.getComponent(PickupComponent);
        if(pickupComponent){
            // 添加到Map中跟踪
            this.pickupComponents.set(node.uuid, pickupComponent);
            this.interactionTimers.set(node.uuid, 0);
            // console.log('添加到Map中跟踪', node.uuid, pickupComponent);
            //踩上木板，heroY轴抬高0.5
            // manager.game.hero.node.getChildByName("ModelNode").setPosition(0,0.8,0);
        }
    }

    private onTriggerExit(event: ITriggerEvent ) {
        const node = event.otherCollider.node;
        if(node && this.pickupComponents.has(node.uuid)){
            // 从Map中移除
            this.pickupComponents.delete(node.uuid);
            this.interactionTimers.delete(node.uuid);
            
            //离开木板，heroY轴恢复为0
            // manager.game.hero.node.getChildByName("ModelNode").setPosition(0,0,0);
        }
    }

    onPickup(pickupComponent: PickupComponent, duration: number = 0) {
        const extraCount = Math.floor(duration / 0.1);
        let pickupCount = 1 + extraCount;
        pickupCount = Math.min(pickupCount, 20);
        
        let successCount = 0;
        for (let i = 0; i < pickupCount; i++) {
             if (this.doPickupOneCoin(pickupComponent)) {
                 successCount++;
             } else {
                 break;
             }
        }
        
        if (successCount > 0) {
             app.event.emit(CommonEvent.PickupCoin);
        }
    }

    private doPickupOneCoin(pickupComponent: PickupComponent): boolean {
        if (this.unlimitedMode) {
            // 无限模式逻辑
            if (this._virtualCoinCount <= 0) {
                return false; // 没有金币
            }

            // 检查接收方是否能接收金币
            if (!pickupComponent.isItemPickable(ObjectType.DropItemCoin)) {
                return false;
            }

            // 获取当前可视的最大容量（Layout中实际能放多少）
            const visualCount = this.coinLayout.getItemCount();
            
            let coinItem: Node | null = null;
            let shouldRemoveVisualItem = this._virtualCoinCount <= visualCount;

            if (shouldRemoveVisualItem) {
                // 正常移除可视金币
                const coinItems = this.coinLayout.getOuterItems(1);
                if (coinItems.length > 0) {
                    coinItem = coinItems[0];
                    this.coinLayout.removeItemByNode(coinItem);
                }
            } else {
                // 虚拟数量多于可视数量，不移除可视金币
                // 尝试从 Layout 最外层拿一个金币的位置作为参考，生成临时金币
                const outerItems = this.coinLayout.getOuterItems(1);
                if (outerItems.length > 0) {
                     const visualItem = outerItems[0];
                     // 生成临时金币
                     coinItem = manager.pool.getNode(ObjectType.DropItemCoin);
                     if (coinItem) {
                         coinItem.setWorldPosition(visualItem.getWorldPosition());
                         coinItem.setWorldRotation(visualItem.getWorldRotation());
                     }
                }
            }

            // 扣除虚拟数量
            this._virtualCoinCount--;
            this.onCoinCountChanged(this._virtualCoinCount); // 手动触发数量变化

            if (coinItem) {
                const dropItemCom = coinItem.getComponent(DropItemCom);
                if (dropItemCom) {
                     pickupComponent.pickupItem(dropItemCom);
                } else {
                     manager.pool.putNode(coinItem);
                }
            } else {
                 // 兜底
                 const tempCoin = manager.pool.getNode(ObjectType.DropItemCoin);
                 if (tempCoin) {
                     const dropItemCom = tempCoin.getComponent(DropItemCom);
                     if (dropItemCom) {
                         pickupComponent.pickupItem(dropItemCom);
                     }
                 }
            }
            return true;

        } else {
            // 原有逻辑
            const coinItems = this.coinLayout.getOuterItems(1);
            if (coinItems.length === 0) {
                return false; // 没有金币，无法拾取
            }
            
            if (!pickupComponent.isItemPickable(ObjectType.DropItemCoin)) {
                return false;
            }

            const coinItem = coinItems[0];
            const dropItemCom = coinItem.getComponent(DropItemCom);
            if(dropItemCom){
                this.coinLayout.removeItemByNode(coinItem);
                pickupComponent.pickupItem(dropItemCom);
                return true;
            }
            return false;
        }
    }

    /**
     * 接收金币并让其飞到容器中
     * @param fromPosition 金币的起始位置
     * @returns 是否成功接收金币
     */
    public receiveCoin(fromPosition: Vec3): boolean {
        // 获取金币对象
        const coin = manager.pool.getNode(ObjectType.DropItemCoin);
        if (!coin) {
       //console.warn('无法从对象池获取金币对象');
            return false;
        }

        // 检查金币容器是否有空位置
        const layoutPos = this.coinLayout.getCurrEmptyPosition();

        let targetPos: Vec3;
        let isContainerFull = false;

        if (!layoutPos) {
            // 容器满了，获取最后一个有效位置用于飞行动画
            const lastValidPos = this.coinLayout.getLastValidPosition();
            targetPos = this.coinLayout.getItemPosition(lastValidPos);
            isContainerFull = true;
            if (!this.unlimitedMode) {
           //console.log('金币容器已满，金币将飞到最后位置后回收');
            }
        } else {
            // 正常情况
            targetPos = this.coinLayout.getItemPosition(layoutPos);
            this.coinLayout.reserveItem(layoutPos);
        }

        if (this.unlimitedMode) {
            // 无限模式下，增加虚拟金币计数
            this._virtualCoinCount++;
            this.onCoinCountChanged(this._virtualCoinCount); // 手动触发数量变化
        }

        // 设置金币初始位置
        const startPos = fromPosition.clone();
        startPos.y += 1; // 稍微提高一点
        coin.setWorldPosition(startPos);

        // 将金币添加到效果层
        manager.effect.addToEffectLayer(coin);
        
        // 使用抛物线飞行到目标位置
        manager.effect.flyNodeInParabola({
            node: coin,
            target: targetPos,
            callback: () => {
                if(!coin.isValid) return;

                if (this.unlimitedMode && !isContainerFull && layoutPos) {
                    // 在无限模式下，如果逻辑数量已经小于等于当前可视数量
                    // 说明这个正在飞行的金币对应的逻辑份额已经被消耗掉了
                    const currentVisualCount = this.coinLayout.getItemCount();
                    if (this._virtualCoinCount <= currentVisualCount) {
                        manager.pool.putNode(coin);
                        // 必须释放之前预占的位置
                        this.coinLayout.removeItem(layoutPos);
                        return;
                    }
                }

                if (isContainerFull) {
                    // 容器满了，飞行动画完成后回收到对象池
                    manager.pool.putNode(coin);
                    if (!this.unlimitedMode) {
                   //console.log('金币容器已满，金币回收到对象池');
                    }
                } else {
                    // 将金币添加到容器布局中
                    this.coinLayout.addItemToReserve(coin, layoutPos);
                    coin.setRotationFromEuler(0, 0, 0);
                }
            }
        });

        return true;
    }
    
    /**
     * 处理金币数量变化事件
     * @param count 当前金币数量
     */
    private onCoinCountChanged(count: number): void {
        if (this.unlimitedMode) {
             // 无限模式下，使用虚拟数量，忽略ItemLayout传来的count（它只代表视觉上的数量）
            app.event.emit(CommonEvent.CoinContainerCountChanged, this._virtualCoinCount);
        } else {
            app.event.emit(CommonEvent.CoinContainerCountChanged, count);
        }
    }

    public getCount(): number {
        if (this.unlimitedMode) {
            return this._virtualCoinCount;
        }
        return this.coinLayout.getItemCount();
    }

    public reset(): void {
        this.coinLayout.reset();
        this.pickupComponents.clear();
        this._virtualCoinCount = 0;
        if (this.unlimitedMode) {
            this.onCoinCountChanged(0);
        }
    }
}


