import { _decorator, CCFloat, Component, Enum, Node, tween, v3, Vec3, UITransform } from 'cc';
import { CommonEvent, ObjectType } from '../../Main/Common/CommonEnum';
import { DropItemCom } from '../Drop/DropItemCom';
import { ComponentEvent } from '../../Main/Common/ComponentEvents';
import { BaseComponet } from './BaseComponet';
import { EffectManager } from '../Manager/EffectManager';

const { ccclass, property } = _decorator;

@ccclass('ContainerItem')
export class ContainerItem{
    @property({
        type: Node,
        displayName: '容器节点'
    })
    public itemNode: Node = null!;

    @property({
        type: Enum(ObjectType),
        displayName: '物品类型'
    })
    public itemType: ObjectType = ObjectType.DropItemCoin;

    @property({
        displayName: '物品间距'
    })
    public itemSpacing: number = 0;

    @property({
        displayName: '物品堆叠上限'
    })
    public itemMaxCount: number = 50;

    @property({
        displayName: '是否可以拾取'
    })
    public canPickup: boolean = true;
}

@ccclass('PickupComponent')
export class PickupComponent extends BaseComponet {
    @property({
        type: CCFloat,
        displayName: '拾取范围',
        tooltip: '角色可以拾取物品的范围'
    })
    public pickupRange: number = 3;

    @property({
        displayName: '自动拾取',
        tooltip: '是否自动拾取范围内的物品'
    })
    public autoPickup: boolean = true; 

    @property({
        type: CCFloat,
        displayName: '自动拾取间隔',
        tooltip: '自动拾取的检测间隔(秒)'
    })
    public pickupInterval: number = 0.01;

    @property({
        type: [ContainerItem],
        displayName: '物品容器'
    })
    public itemContainer: ContainerItem[] = [];

    @property({
        displayName: '超出上限是否增加计数'
    })
    public increaseCountWhenFull: boolean = true;

    @property({
        displayName: '超限后是否继续自动拾取',
        tooltip: '当容器已满时，是否继续自动拾取物品（仅增加计数）'
    })
    public autoPickupWhenFull: boolean = true;

    @property({
        displayName: '最大逻辑计数上限',
        tooltip: '开启超限拾取后，逻辑计数的最大值（-1表示无上限）',
        visible: function(this: PickupComponent) { return this.autoPickupWhenFull; }
    })
    public maxTotalCount: number = -1;

    private pickupTimer: number = 0;
    private _offset: number = 0;

    private itemMap: Map<ObjectType, number> = new Map();
    
    // 存储容器中的物品节点
    private containerItems: Map<ObjectType, Node[]> = new Map();
    
    // 存储正在飞行中的物品数量
    private flyingItemsCount: Map<ObjectType, number> = new Map();
    public get offset(): number {
        return this._offset;
    }
    public set offset(value:number){
        this._offset = value;
        this.arrangeContainers();
    }

    start() {
        
        // 初始化容器排列
        this.arrangeContainers();

        // this.node.on(ComponentEvent.FACE_DIRECTION_CHANGED, this.onFaceDirectionChanged, this);
    }

    onDestroy() {
        // this.node.off(ComponentEvent.FACE_DIRECTION_CHANGED, this.onFaceDirectionChanged, this);
    }

    // onFaceDirectionChanged(directionX: number) {
    //     for(const item of this.itemContainer){
    //         let xabs = Math.abs(item.itemNode.position.x);
    //         const x = directionX > 0 ? -xabs : xabs;
    //         item.itemNode.setPosition(x, item.itemNode.position.y, item.itemNode.position.z);
    //     }
    // }

    update(deltaTime: number) {
        if (this.autoPickup) {
            this.pickupTimer += deltaTime;
            while (this.pickupTimer >= this.pickupInterval) {
                this.pickupTimer -= this.pickupInterval;
                this.checkAndPickupItems();
            }
        }
    }

    reset(){
        this.itemMap.forEach((value, key) => {
            this.itemMap.set(key, 0);
        });
        this.flyingItemsCount.forEach((value, key) => {
            this.flyingItemsCount.set(key, 0);
        });
        this.containerItems.forEach((value, key) => {
            value.forEach(item => {
                manager.pool.putNode(item)
            });

        });
        this.containerItems.forEach((value, key) => {
            this.containerItems.set(key, []);
        });
    }

    /**
     * 检查指定类型的物品是否可以拾取
     * @param itemType 物品类型
     * @returns 是否可以拾取
     */
    public isItemPickable(itemType: ObjectType): boolean {
        //特殊处理 主角在安全区不会拾取肉
        if(itemType === ObjectType.DropItemMeat && manager.game.hero && manager.game.hero.isSafeArea && manager.game.hero.node == this.node){
            return false;
        }
        console.log('isItemPickable itemType', itemType);
        const container = this.findMatchingContainer(itemType);
        console.log('isItemPickable container', container);
        // 必须有对应容器且容器允许拾取
        if (!container || !container.canPickup) {
            return false;
        }
        console.log('isItemPickable container.canPickup', container.canPickup);
        // 如果允许超限拾取，检查是否达到最大逻辑计数上限（包含正在飞行的物品）
        if (this.autoPickupWhenFull && this.maxTotalCount !== -1) {
            const currentCount = this.itemMap.get(itemType) || 0;
            // const flyingCount = this.flyingItemsCount.get(itemType) || 0;
            if (currentCount >= this.maxTotalCount) {
                this.node.emit(ComponentEvent.PICKUP_ITEM_FULL, itemType);
                return false;
            }
        }
        console.log('isItemPickable autoPickupWhenFull', this.autoPickupWhenFull);
        // 检查容器是否已满
        const isFull = this.checkIsFull(itemType);
        
        // 如果容器已满，检查是否允许超限后继续自动拾取
        if (isFull) {
            if (!this.autoPickupWhenFull) {
                this.node.emit(ComponentEvent.PICKUP_ITEM_FULL, itemType);
                return false;
            }
        }
        console.log('isItemPickable isFull', isFull);
        return true;
    }

    /**
     * 检查并拾取范围内的物品
     * 会根据容器状态和超限拾取设置来决定是否拾取物品
     */
    private checkAndPickupItems() {
        // 获取角色位置
        const position = this.node.getWorldPosition();
        
        // 从DropManager获取范围内的物品（带距离信息）
        const nearbyItemsWithDistance = manager.drop.getRangeItemsWithDistance(position, this.pickupRange);
        
        // 检查是否有物品
        if (nearbyItemsWithDistance.length === 0) {
            return;
        }
        
        // 过滤出可以拾取的物品（检查对应容器的 canPickup 状态和超限拾取设置）
        const pickableItems = nearbyItemsWithDistance.filter(itemData => {
            return this.isItemPickable(itemData.item.objectType);
        });
        
        // 如果没有可拾取的物品，返回
        if (pickableItems.length === 0) {
            return;
        }
        
        // 获取最近的物品（使用已计算的平方距离）
        const nearestItemData = pickableItems.reduce((prev, current) => {
            return prev.distanceSquared < current.distanceSquared ? prev : current;
        });

        this.pickupItem(nearestItemData.item);
    }

    /**
     * 手动触发拾取范围内的物品
     */
    public triggerPickup() {
        this.checkAndPickupItems();
    }

    /**
     * 拾取指定物品
     * @param item 要拾取的物品组件
     */
    public pickupItem(item: DropItemCom, cb?:()=>void) {
        // 查找匹配的容器
        const matchingContainer = this.findMatchingContainer(item.objectType);
        
        // 必须有容器且容器允许拾取
        if (!matchingContainer || !matchingContainer.canPickup) {
            return;
        }
        
        item.canPickup = false;
        const itemNode = item.node;

        // 立即增加计数和播放音效
        this.handlePickupEffect(item);

        const isFull = this.checkIsFull(item.objectType)
        if(isFull){
            // 创建飞向角色的动画
            this.createFlyAnimation(item.node, () => {
                cb?.();
                
                // 将物品添加到容器中
                this.addItemToContainer(item, matchingContainer);
                tween(itemNode)
                    .to(0.1, {
                        scale: v3(1.2, 1.2, 1.2),
                    }, { easing: 'cubicOut' })
                    .to(0.1, {
                        scale: v3(1, 1, 1),
                    }, { easing: 'cubicOut' })
                    .call(() => {
                        manager.pool.putNode(itemNode);
                    })
                    .start();
            }, false);
        }else{
            // 创建飞向角色的动画
            this.createFlyAnimation(item.node, () => {
                
                // 将物品添加到容器中
                this.addItemToContainer(item, matchingContainer);
                cb?.();
                tween(item.node)
                    .to(0.1, {
                        scale: v3(1.2, 1.2, 1.2),
                    }, { easing: 'cubicOut' })
                    .to(0.1, {
                        scale: v3(1, 1, 1),
                    }, { easing: 'cubicOut' })
                    .start();
            });
        }
    }

    /**
     * 查找匹配物品类型的容器
     * @param itemType 物品类型
     * @returns 匹配的容器或null
     */
    private findMatchingContainer(itemType: ObjectType): ContainerItem | null {
        for (const container of this.itemContainer) {
            if (container && container.itemNode && container.itemType === itemType) {
                return container;
            }
        }
        return null;
    }

    /**
     * 排列容器位置
     * 按照z值0.75+（i*0.9）排列，只有数量不为0的容器才参与排列
     */
    private arrangeContainers() {
        let arrangeIndex = 0;
        
        for (const container of this.itemContainer) {
            if (!container || !container.itemNode) continue;
            
            // 获取当前容器的物品数量
            const itemCount = this.getContainerItemCount(container.itemType);
            
            if (itemCount > 0) {
                // 只有数量大于0的容器才参与排列
                const zPosition = 0.35 + (arrangeIndex * 0.35) + this.offset;
                const currentPos = container.itemNode.position;
                const targetPos = new Vec3(currentPos.x, currentPos.y, zPosition);
                
                // 添加缓动动画
                tween(container.itemNode)
                    .to(0.3, { position: targetPos }, { easing: 'cubicOut' })
                    .start();
                
                arrangeIndex++;
            }
        }
    }

    /**
     * 获取指定容器的物品数量（包括总数量统计）
     * @param itemType 物品类型
     * @returns 物品数量
     */
    private getContainerItemCount(itemType: ObjectType): number {
        return this.getItemCount(itemType);
    }

    /**
     * 将物品添加到容器中并堆叠
     * @param item 要添加的物品
     * @param container 目标容器
     */
    private addItemToContainer(item: DropItemCom, container: ContainerItem) {
        if (!container || !container.itemNode || !item.node || !item.node.isValid) return;
        
        // 获取当前物品类型的物品节点数组
        let items = this.containerItems.get(item.objectType);
        if (!items) {
            items = [];
            this.containerItems.set(item.objectType, items);
        }

        // 检查容器内物品数量是否已经达到或超过逻辑总数
        // 这种情况通常发生在物品飞行过程中被消耗（例如商店出售）
        // 此时不应再添加到容器中，而是直接回收
        const totalCount = this.itemMap.get(item.objectType) || 0;
        if (items.length >= totalCount) {
            manager.drop.removeItem(item.node);
            manager.pool.putNode(item.node);
            return;
        }
        
        // 检查是否达到堆叠上限
        if (items.length >= container.itemMaxCount) {
            // 只更新物品数量统计，不实际添加到容器
            // 从管理器中移除物品
            manager.drop.removeItem(item.node);
            item.node.setParent(container.itemNode, true);
            
            // // 等待缩放动画结束
            // this.scheduleOnce(() => {
            //     // 回收物品节点
            //     if(item.node && item.node.parent){
            //         manager.pool.putNode(item.node);
            //     }
            // }, 0.3);
            return;
        }
        
        // 计算新位置 (从0点开始往上堆叠)
        const yOffset = items.length * container.itemSpacing;
        
        // 从管理器中移除物品
        manager.drop.removeItem(item.node);
        
        // 将物品添加到容器中
        // container.itemNode.addChild();
        item.node.setParent(container.itemNode, true);
        
        // 重置物品位置、旋转和缩放
        item.node.setPosition(0, yOffset, 0);
        item.node.setRotationFromEuler(new Vec3(0, 0, 0));  // 重置旋转，确保物品排列整齐
        item.node.setScale(1, 1, 1);
        
        // 更新物品节点数组
        items.push(item.node);
        
        // 重新排列容器
        this.arrangeContainers();
    }

    /**
     * 创建物品飞向角色的动画
     * @param itemNode 物品节点
     * @param onComplete 动画完成回调
     */
    private createFlyAnimation(itemNode: Node, onComplete: () => void, isAddFlyingCount: boolean = true) {
        // 获取物品类型
        const itemType = this.getItemObjectType(itemNode);
        
        // 查找匹配的容器（必须存在）
        const matchingContainer = this.findMatchingContainer(itemType)!;
        
        // 判断容器是否已满
        const items = this.containerItems.get(itemType) || [];
        const flyingCount = this.flyingItemsCount.get(itemType) || 0;
        const totalCount = items.length + flyingCount;
        const isContainerFull = totalCount >= matchingContainer.itemMaxCount;
        
        // 增加飞行中的物品计数
        if(isAddFlyingCount){
            this.flyingItemsCount.set(itemType, flyingCount + 1);
        }
        
        // 计算顶部位置
        let topYOffset = 0;
        if (isContainerFull) {
            // 如果容器已满，飞向容器顶部的最上层
            topYOffset = (matchingContainer.itemMaxCount - 1) * matchingContainer.itemSpacing;
        } else {
            // 否则飞向当前堆叠高度（包括正在飞行中的物品）
            topYOffset = totalCount * matchingContainer.itemSpacing;
        }

        const trackNode = new Node('TrackNode');
        matchingContainer.itemNode.addChild(trackNode);
        trackNode.setPosition(v3(0, topYOffset, 0));
        trackNode.setScale(v3(1, 1, 1));
        trackNode.setRotationFromEuler(v3(0, 0, 0));
        
        // 使用EffectManager的flyNodeInParabola方法
        manager.effect.flyNodeInParabola({
            node: itemNode,
            target: trackNode,
            targetWorldScale: v3(1, 1, 1),
            callback: () => {
                trackNode.removeFromParent();
                
                // 减少飞行中的物品计数
                const currentFlyingCount = this.flyingItemsCount.get(itemType) || 0;
                if(isAddFlyingCount){
                    this.flyingItemsCount.set(itemType, Math.max(0, currentFlyingCount - 1));
                }

                if (onComplete) {
                    onComplete();
                }
            }
        });
    }

    /**
     * 获取物品节点的对象类型
     * @param itemNode 物品节点
     * @returns 物品类型
     */
    private getItemObjectType(itemNode: Node): ObjectType {
        const itemCom = itemNode.getComponent(DropItemCom);
        return itemCom ? itemCom.objectType : ObjectType.None;
    }

    /**
     * 处理物品拾取后的效果
     * @param item 拾取的物品组件
     */
    private handlePickupEffect(item: DropItemCom) {
        this.addItem(item);
    }

    /**
     * 检查容器是否已满
     * @param type 物品类型
     * @returns 是否已满
     */
    private checkIsFull(type: ObjectType): boolean {
        const matchingContainer = this.findMatchingContainer(type);
        if(!matchingContainer){
            return false;
        }
        const items = this.containerItems.get(type) || [];
        const flyingCount = this.flyingItemsCount.get(type) || 0;
        const totalCount = items.length + flyingCount;
        return totalCount >= matchingContainer.itemMaxCount;
    }

    /**
     * 增加物品
     * @param item 物品组件
     */
    private addItem(item: DropItemCom, count: number = 1) {
        const type = item.objectType;
        
        // 获取当前物品类型的数量，如果不存在则初始化为0
        const currentCount = this.itemMap.get(type) || 0;
        const totalCount = currentCount + count;
        
        // 更新物品数量
        this.itemMap.set(type, totalCount);
        if(type === ObjectType.DropItemCoin){
            app.audio.playEffect('resources/audio/收取金币');
        }else{
            app.audio.playEffect('resources/audio/收取肉');
        }
        
        this.node.emit(ComponentEvent.UPDATE_ITEM_COUNT, type, totalCount);
        
        // 重新排列容器
        this.arrangeContainers();
    }

    /**
     * 消耗指定物品类型的数量
     * @param type 物品类型
     * @param count 数量
     */
    public consumeItem(type: ObjectType, count: number): Node[] {
        // app.log.debug(`消耗物品类型: ${type}, 数量: ${count}`);
        // 获取当前物品总数
        const totalCount = this.getItemCount(type);
        
        // 找到匹配的容器
        const matchingContainer = this.findMatchingContainer(type);
        
        // 更新数量统计
        this.setItemCount(type, totalCount - count);

        this.node.emit(ComponentEvent.UPDATE_ITEM_COUNT, type, this.getItemCount(type));
        
        // 重新排列容器
        this.arrangeContainers();
        
        // 创建消耗物品的列表
        const consumedItems: Node[] = [];
        
        // 如果有匹配的容器，处理物品显示
        if (matchingContainer && matchingContainer.itemNode) {
            // 获取容器中当前堆叠的物品数量
            const containerCount = this.containerItems.get(type) || [];
            
            // 计算容器外的物品数量
            const outsideCount = totalCount - containerCount.length;
            
            if (count <= outsideCount) {
                // 如果消耗数量小于或等于容器外数量，只需消耗容器外的部分
                // 从对象池取出虚拟物品添加到消耗列表
                for (let i = 0; i < count; i++) {
                    const virtualItem = this.createVirtualItemForConsume(type, matchingContainer);
                    if (virtualItem) {
                        consumedItems.push(virtualItem);
                    }
                }
            } else {
                // 消耗容器外的全部物品
                for (let i = 0; i < outsideCount; i++) {
                    const virtualItem = this.createVirtualItemForConsume(type, matchingContainer);
                    if (virtualItem) {
                        consumedItems.push(virtualItem);
                    }
                }
                
                // 消耗容器内的物品
                const containerConsumeCount = count - outsideCount;
                const containerItems = this.removeItemsFromContainer(type, containerConsumeCount);
                consumedItems.push(...containerItems);
            }
        }
        // app.log.debug(`消耗物品数量: ${consumedItems.length}`);
        return consumedItems;
    }
    
    /**
     * 为消耗创建一个虚拟物品（从对象池取出并放在容器顶部）
     * @param type 物品类型
     * @param container 物品容器
     * @returns 创建的虚拟物品节点
     */
    private createVirtualItemForConsume(type: ObjectType, container: ContainerItem): Node|null {
        // 从对象池获取一个物品节点
        const virtualItem = manager.pool.getNode(type);
        if (!virtualItem) return null;
        
        // 获取容器当前的堆叠数量
        const containerCount = this.containerItems.get(type) || [];
        
        // 计算顶部位置
        const topYOffset = containerCount.length * container.itemSpacing;
        
        // 设置位置到容器顶部
        virtualItem.setParent(container.itemNode);
        virtualItem.setPosition(0, topYOffset, 0);
        virtualItem.setRotationFromEuler(new Vec3(0, 0, 0));
        
        return virtualItem;
    }
    
    /**
     * 从容器中移除指定数量的物品
     * @param type 物品类型
     * @param count 移除数量
     */
    private removeItemsFromContainer(type: ObjectType, count: number): Node[] {
        // 查找匹配的容器
        const matchingContainer = this.findMatchingContainer(type);
        if (!matchingContainer || !matchingContainer.itemNode) return [];
        
        const items = this.containerItems.get(type) || [];
        const removeCount = Math.min(items.length, count);
        
        if (removeCount <= 0) return [];
        
        const removeList = items.splice(items.length - removeCount, removeCount);
        
        // 重新排列剩余物品
        this.rearrangeContainerItems(type);
        
        return removeList;
    }
    
    /**
     * 重新排列容器中的物品
     * @param type 物品类型
     */
    private rearrangeContainerItems(type: ObjectType): void {
        // 查找匹配的容器
        const matchingContainer = this.findMatchingContainer(type);
        if (!matchingContainer || !matchingContainer.itemNode) return;
        
        const items = this.containerItems.get(type) || [];
        for (let i = 0; i < items.length; i++) {
            const yPos = i * matchingContainer.itemSpacing;
            if(items[i] && items[i].isValid){
                items[i].setPosition(0, yPos, 0);
                items[i].setRotationFromEuler(new Vec3(0, 0, 0));  // 确保旋转正确
            }else{
                items.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * 获取指定物品类型的数量
     * @param type 物品类型
     * @returns 指定物品类型的数量
     */
    public getItemCount(type: ObjectType): number {
        return this.itemMap.get(type) || 0;
    }

    /**
     * 获取指定物品类型正在飞行的数量
     * @param type 物品类型
     * @returns 指定物品类型的数量
     */
    public getFlyingItemCount(type: ObjectType): number {
        return this.flyingItemsCount.get(type) || 0;
    }
    
    /**
     * 设定指定物品类型的数量
     * @param type 物品类型
     * @param count 数量
     */
    public setItemCount(type: ObjectType, count: number): void {
        this.itemMap.set(type, count);
        this.node.emit(ComponentEvent.UPDATE_ITEM_COUNT, type, count);
        
        // 重新排列容器
        this.arrangeContainers();
    }

    /**
     * 磁力拾取范围内所有物品
     * @param magnetRange 磁力拾取范围，默认使用拾取范围的2倍
     * @returns Promise 在所有拾取动画完成后解析
     */
    public async magnetPickup(magnetRange?: number): Promise<void> {
        const range = magnetRange || this.pickupRange * 2;
        const position = this.node.getWorldPosition();
        
        // 获取扩大范围内的物品（带距离信息）
        const itemsWithDistance = manager.drop.getRangeItemsWithDistance(position, range);
        
        // 如果没有物品，直接返回
        if (itemsWithDistance.length === 0) {
            return Promise.resolve();
        }
        
        // 过滤出可以拾取的物品（检查对应容器的 canPickup 状态）
        const pickableItems = itemsWithDistance.filter(itemData => {
            const container = this.findMatchingContainer(itemData.item.objectType);
            // 必须有对应容器且容器允许拾取
            return container && container.canPickup;
        });
        
        // 如果没有可拾取的物品，直接返回
        if (pickableItems.length === 0) {
            return Promise.resolve();
        }
        
        // 为每个物品创建一个Promise
        const pickupPromises: Promise<void>[] = [];
        
        // 拾取所有物品
        for (const itemData of pickableItems) {
            const item = itemData.item;
            const distanceSquared = itemData.distanceSquared;
            
            item.canPickup = false;
            item.reset();
            item.node.setRotationFromEuler(new Vec3(0, 0, 0));

            // 使用平方根计算实际距离（只在需要时计算一次）
            const distance = Math.sqrt(distanceSquared);
            let speed = 50;
            let time = distance / speed;
            const delay = Math.random() * 0.2;
            
            // 为每个物品创建Promise
            const itemPromise = new Promise<void>((resolve) => {
                tween(item.node)
                    .delay(delay)
                    .to(time, {
                        worldPosition: position
                    }).call(() => {
                        // 处理物品拾取效果（更新统计）
                        this.handlePickupEffect(item);
                        
                        const matchingContainer = this.findMatchingContainer(item.objectType);
                        // 将物品添加到容器中（已经在过滤时确保了容器存在）
                        this.addItemToContainer(item, matchingContainer!);
                        manager.pool.putNode(item.node);
                        
                        // 动画完成后解析Promise
                        resolve();
                    })
                    .start();
            });
            
            pickupPromises.push(itemPromise);
        }
        
        // 等待所有拾取动画完成
        await Promise.all(pickupPromises);

   //console.log('拾取完成');
    }

    /**
     * 设置指定类型容器的拾取状态
     * @param itemType 物品类型
     * @param canPickup 是否可以拾取
     */
    public setContainerPickupState(itemType: ObjectType, canPickup: boolean): void {
        const container = this.findMatchingContainer(itemType);
        if (container) {
            container.canPickup = canPickup;
        }
    }
}