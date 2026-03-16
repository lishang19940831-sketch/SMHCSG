import { _decorator, Collider, Component, easing, ITriggerEvent, Node, Prefab, tween, Tween, v3, Vec3, instantiate, Enum, math, RigidBody, ERigidBodyType } from 'cc';
import { ItemLayout } from '../Tools/ItemLayout';
import { PickupComponent } from '../Components/PickupComponent';
import { Config } from '../Common/Config';
import { CommonEvent, ObjectType, PHY_GROUP } from '../Common/CommonEnum';
import { Customer } from './Customer';
import { CoinContainer } from './CoinContainer';
import { DropItemCom } from '../Drop/DropItemCom';
const { ccclass, property } = _decorator;


@ccclass('ShopCommon')
export class ShopCommon extends Component {

    @property({displayName: '仓库模式（禁用顾客系统，仅存储物品）'})
    public isWarehouseMode: boolean = false;

    @property({type: Enum(ObjectType), displayName: '商店商品类型'})
    public shopItemType: ObjectType = ObjectType.DropItemWood;

    @property({type: ItemLayout, displayName: '商品布局',})
    private itemLayout: ItemLayout = null!;

    @property({type: Node, displayName: '生成位置'})
    private spawnPos: Node = null!;

    @property({type: Node, displayName: '等待位置'})
    private waitPos: Node = null!;

    @property({type: [Node], displayName: '结束路径点数组（顺序移动）'})
    private endPosArray: Node[] = [];

    @property({type: Collider, displayName: '触发器'})
    private shopCollider: Collider = null!;

    @property({type: Node, displayName: '触发状态显示节点'})
    private triggerStateNode: Node = null!;

    @property({displayName: '实际上限', tooltip: '非仓库模式下，商店可存储的最大物品数量，-1表示无限', visible: function(this: ShopCommon) { return !this.isWarehouseMode; }})
    public maxStorageCount: number = -1;

    private hiddenItemCount: number = 0; // 存储在实际上限中但未显示的物品数量

    @property({displayName: '是否需要PickupComponent才能售货'})
    private needPickupToSell: boolean = true;

    @property({type: CoinContainer, displayName: '金币容器'})
    private coinContainer: CoinContainer = null!;

    @property({type: Node, displayName: '桌子节点'})
    private tableNode: Node = null!
    
    private _spawnPos: Vec3 = new Vec3(0, 0, 0);
    private _waitPos: Vec3 = new Vec3(0, 0, 0);
    private _endPosArray: Vec3[] = [];

    private pickupComponents: Map<string, PickupComponent> = new Map(); // 存储在 投放触发器内的PickupComponent
    private interactionTimers: Map<string, number> = new Map(); // 存储在 投放触发器内的PickupComponent的交互时间

    private checkTimer: number = 0.1; // 用于在update中控制检查频率
    private checkTimer2: number = 0.1; // 用于在update中控制检查频率

    private waitList: Customer[] = []; // 等待购买的顾客队列
    
    /** 最大等待顾客数量 */
    private readonly MAX_WAIT_CUSTOMERS: number = 12;
    
    /** 最小活跃顾客数（确保商店始终有顾客） */
    private readonly MIN_ACTIVE_CUSTOMERS: number = 1;
    
    /** 顾客生成间隔时间（秒） */
    private readonly SPAWN_INTERVAL: number = 2;
    
    /** 顾客生成计时器 */
    private spawnTimer: number = 0;
    
    /** 是否正在生成顾客 */
    private isSpawning: boolean = false;
    interactionDuration: number = 1;

    public get SellNode(): Node {
        return this.shopCollider.node;
    }

    public get CoinContainer(): CoinContainer {
        return this.coinContainer;
    }

    public get ShopCollider(): Collider {
        return this.shopCollider;
    }

    public get TriggerStateNode(): Node {
        return this.triggerStateNode;
    }
    /**
     * 获取仓库中的商品数量
     */
    public getWarehouseItemCount(): number {
        return this.itemLayout.getItemCount();
    }
    
    /**
     * 从仓库中取出一个商品（仓库模式专用）
     * @returns 商品节点，如果没有商品返回null
     */
    public takeItemFromWarehouse(): Node | null {
        if (!this.isWarehouseMode) {
       //console.warn('[ShopCommon] 非仓库模式不能使用 takeItemFromWarehouse');
            return null;
        }

        if (this.itemLayout.getItemCount() <= 0) {
            return null;
        }

        const items = this.itemLayout.getOuterItems(1);
        if (items.length > 0) {
            const item = items[0];
            this.itemLayout.removeItemByNode(item);
            return item;
        }

        return null;
    }
    
    protected onLoad(): void {
        
        // 仓库模式下不启动顾客生成系统
        if (!this.isWarehouseMode) {
            this._spawnPos = this.spawnPos.getWorldPosition();
            this._waitPos = this.waitPos.getWorldPosition();
            // 初始化结束路径点数组
            this._endPosArray = [];
            for (const endPos of this.endPosArray) {
                if (endPos) {
                    this._endPosArray.push(endPos.getWorldPosition());
                }
            }
            // 开始生成顾客
            this.startSpawningCustomers();
        } else {
       //console.log('[ShopCommon] 仓库模式启用，顾客系统已禁用');
        }
    }
    protected start(): void {
             // 🔍 添加详细的初始化日志
     
             if (!this.shopCollider) {
            //console.error('[ShopCommon] ❌ shopCollider 未设置！请在编辑器中配置');
                 return;
             } 
     
             if (!this.shopCollider.isTrigger) {
            //console.warn('[ShopCommon] ⚠️ shopCollider.isTrigger 未勾选！触发器事件不会触发');
             }
     
             // 延迟初始化物理配置，确保物理系统已经初始化
             this.scheduleOnce(() => {
                 this.initPhysicsConfig();
             }, 0);
             
             
        this.shopCollider.on('onTriggerEnter', (event: ITriggerEvent) =>{this.onPickupTriggerEnter(event);}, this);
        this.shopCollider.on('onTriggerExit', (event: ITriggerEvent) =>{this.onPickupTriggerExit(event);}, this);
        
     }
    /**
     * 初始化物理配置
     */
    private initPhysicsConfig(): void {
        if (!this.shopCollider) return;

        // 检查触发器节点是否有RigidBody
        const triggerRigidBody = this.shopCollider.node.getComponent(RigidBody);
        
   
        
        if (triggerRigidBody) {
            
        }
    }


    private onPickupTriggerEnter(event: ITriggerEvent ) {
        const node = event.otherCollider.node;
       
        
        const pickupComponent = node.getComponent(PickupComponent);
        if(pickupComponent){
            // 添加到Map中跟踪
            this.pickupComponents.set(node.uuid, pickupComponent);
            this.interactionTimers.set(node.uuid, 0);
          
        } else {
          
        }
    }

    private onPickupTriggerExit(event: ITriggerEvent ) {
        const node = event.otherCollider.node;
       
        
        if(node && this.pickupComponents.has(node.uuid)){
            // 从Map中移除
            this.pickupComponents.delete(node.uuid);
            this.interactionTimers.delete(node.uuid);
           
        }
    }

    private cherkCanSell(): boolean {
        const hasItem = this.itemLayout.getItemCount() > 0;
        const hasPickup = this.pickupComponents.size > 0;
        
        const canSell = this.needPickupToSell ? (hasItem && hasPickup) : hasItem;
        
        if(hasPickup || hasItem) {
           
        }
        
        // 如果需要PickupComponent才能售货，则需要同时满足有商品和有PickupComponent
        // 如果不需要PickupComponent，则只需要有商品即可
        return canSell;
    }

    private debugDistanceTimer: number = 0;
    
    update(dt: number) {
        // 累加时间
        this.checkTimer += dt;
        
        // 当累加时间达到检查间隔时执行检查，确保低帧率时不会漏掉检查次数
        while (this.checkTimer >= Config.UNLOCK_CHECK_INTERVAL) {
            this._checkPickupComponents();
            this.checkTimer -= Config.UNLOCK_CHECK_INTERVAL; // 减去一个间隔时间而不是重置为0
        }

        // 仓库模式下不执行顾客相关逻辑
        if (!this.isWarehouseMode) {
            this.checkTimer2 += dt;
            // 当累加时间达到检查间隔时不会漏掉检查次数
            while (this.checkTimer2 >= 0.03) {
                this.checkWaitSolder();
                this.checkTimer2 -= 0.03; // 减去一个间隔时间而不是重置为0
            }

            // 补充货架逻辑：如果有隐藏库存且有空位，补充货架
            this.refillShelfFromHidden();
            
            // 更新顾客生成逻辑
            this.updateCustomerSpawn(dt);
        }

        // 根据开关设置决定触发状态显示逻辑
        // 如果需要PickupComponent才能售货，则显示PickupComponent的使用状态
        // 如果不需要PickupComponent，则根据是否有肉来显示状态
        const isUsing = this.pickupComponents.size > 0 ;
        this.triggerStateNode&&(this.triggerStateNode.active = isUsing);
        // const isSalesclerkUsing = this.salesclerkComponents.size > 0;
        // this.salesclerkStateNode.active = isSalesclerkUsing;
        
       
    }

    private _checkPickupComponents() {
        if(this.pickupComponents.size > 0) {
            
        }
        
        // 遍历所有触发器内的PickupComponent
        this.pickupComponents.forEach((pickupComponent, uuid) => {
            if(pickupComponent && pickupComponent.isValid){
                // 更新交互时间
                let duration = this.interactionTimers.get(uuid) || 0;
                duration += Config.UNLOCK_CHECK_INTERVAL;
                this.interactionTimers.set(uuid, duration);
             
                this.onUse(pickupComponent, duration);
            } else {
                // 如果组件不再有效，从Map中移除
           //console.warn('[ShopCommon] PickupComponent无效，移除', uuid);
                this.pickupComponents.delete(uuid);
                this.interactionTimers.delete(uuid);
            }
        });
    }

    private onUse(pickupComponent: PickupComponent, duration: number = 0) {
        const itemCount = pickupComponent.getItemCount(this.shopItemType);
       
        
        if(itemCount > 0){
            // 计算消耗数量：基础1个 + 每0.5秒多1个，上限10个
            const extraCount = Math.floor(duration / 0.1);
            let consumeCount = 1 + extraCount;
            const maxConsumePerTick = 20;
            consumeCount = Math.min(consumeCount, maxConsumePerTick);
            
            // 限制不能超过实际持有数量
            consumeCount = Math.min(consumeCount, itemCount);
            
            const consumeList = pickupComponent.consumeItem(this.shopItemType, consumeCount);
           

            if(consumeList.length > 0){
                for(const item of consumeList){
                    this.handleConsumedItem(item);
                }
            } else {
              
            }
        } else {
           
        }
    }

    private handleConsumedItem(item: Node) {
        Tween.stopAllByTarget(item);
        const tarLayoutPos = this.itemLayout.getCurrEmptyPosition();

        let targetPos: Vec3;
        let isContainerFull = false;
    

        if (!tarLayoutPos) {
            // 容器显示满了
            if (!this.isWarehouseMode) {
                // 非仓库模式，检查实际上限
                const currentTotal = this.itemLayout.getItemCount() + this.hiddenItemCount;
                if (this.maxStorageCount === -1 || currentTotal < this.maxStorageCount) {
                    // 未达到实际上限，增加隐藏计数
                    this.hiddenItemCount++;
                    // 标记为未满（逻辑上），但在回调中需要销毁节点（因为它存储在隐藏区）
                } else {
                    // 达到实际上限
                    isContainerFull = true;
                }
            } else {
                // 仓库模式，直接标记为满
                isContainerFull = true;
            }

            // 获取最后一个有效位置用于飞行动画
            const lastValidPos = this.itemLayout.getLastValidPosition();
            targetPos = this.itemLayout.getItemPosition(lastValidPos);
        } else {
            // 正常情况
            targetPos = this.itemLayout.getItemPosition(tarLayoutPos);
            this.itemLayout.reserveItem(tarLayoutPos);
          
        }

        const tarWorldRot = this.itemLayout.node.getWorldRotation();

      

        // item.setWorldRotationFromEuler(0, 0, 0);
        manager.effect.flyNodeInParabola({
            node: item,
            target: targetPos,
            targetWorldRotation: tarWorldRot,
            callback: () => {

                app.audio.playEffect('resources/audio/投入资源', 0.6);
                
                if (isContainerFull) {
                    // 容器满了（实际上限已满或仓库模式满了），回收
                    manager.pool.putNode(item);
                } else if (!tarLayoutPos) {
                    // 显示满了但实际上限未满（存入隐藏区），回收显示节点
                    manager.pool.putNode(item);
                } else {
                    // 正常情况，添加到布局
                    this.itemLayout.addItemToReserve(item, tarLayoutPos!);
                    tween(item).to(0.1, {
                        scale: v3(1.2, 1.2, 1.2)
                    }, {
                        easing: easing.sineOut
                    }).to(0.1, {
                        scale: v3(1, 1, 1)
                    }, {
                        easing: easing.sineOut
                    }).start();
                }
            }
        });
    }

    private refillShelfFromHidden() {
        if (this.hiddenItemCount <= 0) return;
        
        // 尝试获取空位
        const emptyPos = this.itemLayout.getCurrEmptyPosition();
        
        if (emptyPos) {
            // 减少隐藏计数
            this.hiddenItemCount--;
            
            // 从对象池获取节点
            const itemNode = manager.pool.getNode(this.shopItemType, this.itemLayout.node);
            
            if (itemNode) {
                 // 占位
                 this.itemLayout.reserveItem(emptyPos);
                 // 添加
                 this.itemLayout.addItemToReserve(itemNode, emptyPos);
                 
                 // 播放出现动画
                 itemNode.setScale(0, 0, 0);
                 tween(itemNode).to(0.2, { scale: v3(1, 1, 1) }, { easing: easing.backOut }).start();
            } else {
                // 如果获取失败，回滚计数
                this.hiddenItemCount++;
            }
        }
    }

    /**
     * 让顾客沿着结束路径点依次移动，走完后回收
     */
    private moveCustomerAlongPath(customer: Customer, pathIndex: number = 0): void {
        if (!this._endPosArray || this._endPosArray.length === 0) {
            this.putCustomer(customer);
            return;
        }

        if (pathIndex >= this._endPosArray.length) {
            this.putCustomer(customer);
            return;
        }

        const targetPos = this._endPosArray[pathIndex];
        customer.MoveToWorldPos(targetPos, () => {
            this.moveCustomerAlongPath(customer, pathIndex + 1);
        });
    }

    private checkCustomerNeedItem(customer: Customer): boolean {
        // 根据商品类型检查顾客是否需要该商品
        return customer.CherkNeedObject();
    }

    private checkWaitSolder() {
        if(!this.cherkCanSell()) return;
        let itemCount = this.itemLayout.getItemCount()
        if(itemCount > 0 && this.waitList.length > 0){
            const customer = this.waitList[0];

            // 检查顾客是否需要当前商品类型
            if(!this.checkCustomerNeedItem(customer)) return;
            
            // 检查顾客是否已经站定并准备购买
            if (!customer.isReadyToBuy) {
                return; // 顾客还在移动或未准备好，不飞商品
            }
            
            const item = this.itemLayout.getOuterItems(1)[0];
            
            this.itemLayout.removeItemByNode(item);
            
            // 取出物品后，立即尝试从隐藏库存补充
            this.refillShelfFromHidden();

            const dropItemCom = item.getComponent(DropItemCom);
            if (dropItemCom) {
                customer.pickUpItem(dropItemCom, () => {
                    app.audio.playEffect('resources/audio/投入资源', 0.6);
                    let isFinish = customer.GetNeedObjectCount() <= 0;
                    if (isFinish) {
                        // 立即从等待队列中移除顾客，让队伍往前排
                        this.RemoveWaitSolder(customer.node);
                        customer.showHappy();
                        
                        // 顾客购买完成后，沿路径点依次移动后回收
                        this.moveCustomerAlongPath(customer);

                        // 将金币飞到金币容器中，根据商品需求数量支付相应金币
                        let coinCount = 0;
                        switch (this.shopItemType) {
                            case ObjectType.DropItemWood:
                                coinCount = customer.GetTotalObjectNeed();
                                break;
                            case ObjectType.DropItemMeat:
                                coinCount = 4 * customer.GetTotalObjectNeed();
                                break;
                            case ObjectType.DropItemFlatbread:
                                coinCount = 5 * customer.GetTotalObjectNeed();
                                break;
                            default:
                                break;
                        }

                        for (let i = 0; i < coinCount; i++) {
                            this.coinContainer.receiveCoin(customer.node.getWorldPosition());
                        }
                    }
                })
            }

        }
    }

    GetCurrWaitPosition(index?: number): Vec3 {
        index = index === undefined ? this.waitList.length - 1 : index;
        // return this.waitPos.getWorldPosition().add(v3(-2 * index, 0 , 2 * index));
        return v3(this._waitPos.x, this._waitPos.y, this._waitPos.z + (1.5 * index));
    }

    AddWaitSolder(node: Node, immediate: boolean = false) {
        const customer = node.getComponent(Customer);
        this.waitList.push(customer);
        
        // 移动到等待位置，并在到达后设置为准备购买状态
        const waitPosition = this.GetCurrWaitPosition(this.waitList.length - 1);

        if (immediate) {
            node.setWorldPosition(waitPosition);
            customer.setMoving(false);
            customer.setReadyToBuy(true);
        } else {
            customer.MoveToWorldPos(waitPosition, () => {
                // 确保顾客到达等待位置后准备购买
                customer.setReadyToBuy(true);
            });
        }
        
        // 更新需求节点显示：只有队列第一个顾客显示需求
        this.updateNeedDisplay();
    }

    RemoveWaitSolder(node: Node) {
        this.waitList = this.waitList.filter(customer => customer.node !== node);
        this.updateSolderPosition();
        
        // 更新需求节点显示：只有队列第一个顾客显示需求
        this.updateNeedDisplay();
        
        // 当有顾客离开等待队列时，立即检查是否需要生成新顾客
        if (this.waitList.length < this.MIN_ACTIVE_CUSTOMERS) {
            // 重置计时器，立即触发生成检查
            this.spawnTimer = this.SPAWN_INTERVAL;
        }
    }

    private updateSolderPosition() {
        for (let i = 0; i < this.waitList.length; i++) {
            const customer = this.waitList[i];
            customer.MoveToWorldPos(this.GetCurrWaitPosition(i), () => {
                // 确保顾客到达新位置后准备购买
                customer.setReadyToBuy(true);
            });
        }
    }
    
    /**
     * 更新需求节点显示：只有队列第一个顾客显示需求节点
     */
    private updateNeedDisplay(): void {
        //现在改为前2个显示需求节点
        let showCount = 2;
        for (let i = 0; i < this.waitList.length; i++) {
            const customer = this.waitList[i];
            if (i < showCount) {
                // 队列第一个顾客显示需求节点
                customer.showNeed();
            } else {
                // 其他顾客隐藏需求节点
                customer.showUnhappy();
            }
        }
    }
    
    /**
     * 开始生成顾客
     */
    private startSpawningCustomers(): void {
        this.isSpawning = true;
        
        // 初始直接生成5个顾客
        for (let i = 0; i < 10; i++) {
            this.spawnCustomer(true);
        }
        
        this.spawnTimer = 0;
    }
    
    /**
     * 停止生成顾客
     */
    private stopSpawningCustomers(): void {
        this.isSpawning = false;
    }
    
    /**
     * 更新顾客生成逻辑
     */
    private updateCustomerSpawn(dt: number): void {
        if (!this.isSpawning) return;
        
        // 累加生成计时器
        this.spawnTimer += dt;
        
        // 检查是否需要生成新顾客
        if (this.spawnTimer >= this.SPAWN_INTERVAL) {
            this.spawnTimer = 0;
            
            // 计算等待购买的顾客数
            const waitingCustomers = this.waitList.length;

            // 生成逻辑：
            // 1. 如果顾客少于最小数量，立即生成（保证商店始终有顾客）
            // 2. 如果顾客少于最大数量，正常生成
            if (waitingCustomers < this.MIN_ACTIVE_CUSTOMERS ||
                waitingCustomers < this.MAX_WAIT_CUSTOMERS) {
                this.spawnCustomer();
            }
        }
    }
    
    /**
     * 生成一个新顾客
     */
    private spawnCustomer(immediate: boolean = false): void {
        // 双重检查：生成前再次确认
        const waitingCustomers = this.waitList.length;
        
        // 检查是否超过上限
        if (waitingCustomers >= this.MIN_ACTIVE_CUSTOMERS) {
            // 如果是初始生成（immediate=true），只要不超过最大值就允许生成，忽略 MIN_ACTIVE_CUSTOMERS 限制
            // 否则（正常生成），需要遵守 MIN_ACTIVE_CUSTOMERS 逻辑（即只有少于MIN才强制生成，否则由updateCustomerSpawn控制频率）
            // 但这里 spawnCustomer 是被调用的执行者，逻辑控制应该在外层。
            // 原逻辑：if (waitingCustomers >= MIN) { if (waitingCustomers >= MAX) return; }
            // 这意味着只要不超过 MAX，就可以生成。
            // updateCustomerSpawn 里决定了何时调用。
            // 所以这里只需要检查 MAX。
            
            if (waitingCustomers >= this.MAX_WAIT_CUSTOMERS) {
                return;
            }
        }

        let customerNode: Node | null = null;
        
        // 首先尝试从对象池获取
        if (manager.pool) {
            customerNode = manager.pool.getNode(ObjectType.Customer, this.node);
        }
        
        if (customerNode) {
            // 在生成位置创建顾客
            customerNode.setWorldPosition(this._spawnPos);
            const customer = customerNode.getComponent(Customer);
            if (customer) {
                // 生成2到5之间的随机需求数量
                // const needCount = Math.floor(Math.random() * 2) + 3;
                const needCount = 2;
                // 初始化顾客
                customer.init(needCount, this.shopItemType);
                
                // 顾客直接移动到等待购买位置
                this.AddWaitSolder(customer.node, immediate);
            }
        } else {
       //console.warn('无法生成顾客: 预制体未设置或对象池异常');
        }
    }
    
    /**
     * 回收顾客到对象池
     */
    private putCustomer(customer: Customer): void {
        if (customer && customer.node) {
            // 回收到对象池
            if (manager.pool) {
                manager.pool.putNode(customer.node);
            } else {
                // 如果没有对象池，直接销毁
                customer.node.destroy();
            }
        }
    }

    public ShowUnlock(cb?:()=>void){
        this.node.active = true;
        this.tableNode.active = true;
        this.tableNode.setScale(0, 0, 0);
        tween(this.tableNode)
            .to(0.5, {scale: v3(0.669, 0.669, 0.669)}, {easing: easing.backOut})
            .call(() => {
                cb?.();
            })
            .start();
    }

    public reset(): void {
        if(this.shopItemType == ObjectType.DropItemMeat){
            this.node.active = false;
            this.tableNode.active = false;
            this.tableNode.setScale(0, 0, 0);
        }
        
        // 仓库模式下不清空顾客队列（因为没有顾客系统）
        if (!this.isWarehouseMode) {
            // 清空所有顾客队列
            this.waitList.forEach(customer => this.putCustomer(customer));
            this.waitList = [];
        }
        
        this.itemLayout.reset();
        
        // 仓库模式下不重置金币容器
        if (!this.isWarehouseMode && this.coinContainer) {
            this.coinContainer.reset();
        }
    }
}


