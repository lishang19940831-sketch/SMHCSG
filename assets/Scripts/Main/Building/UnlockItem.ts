import { _decorator, CCInteger, Component, Enum, Label, Node, tween, v3, Vec3, Sprite, Material, resources, Color, Collider, ITriggerEvent, Tween, Quat, easing } from 'cc';
import { BuildUnlockState, CommonEvent, ObjectType, BuildingType } from '../../Main/Common/CommonEnum';
import { DropItemCom } from '../Drop/DropItemCom';
import { Config } from '../../Main/Common/Config';
import { PickupComponent } from '../Components/PickupComponent';
const { ccclass, property } = _decorator;

/**
 * 解锁阶段配置
 */
@ccclass('UnlockStageConfig')
export class UnlockStageConfig {
    @property({type: Enum(BuildingType), displayName: '解锁建筑类型'})
    itemType: BuildingType = BuildingType.None;
    
    @property({type: Enum(ObjectType), displayName: '消耗资源类型'})
    consumptionType: ObjectType = ObjectType.DropItemCoin;
    
    @property({type: CCInteger, displayName: '解锁所需资源数量'})
    cost: number = 0;
}

@ccclass('UnlockItem')
export class UnlockItem extends Component {

    @property({type: Enum(BuildUnlockState), displayName: '初始解锁状态'})
    private initUnlockState: BuildUnlockState = BuildUnlockState.NoActive;

    @property({type: Enum(BuildingType), displayName: '[已废弃]解锁建筑类型（使用多阶段配置）'})
    private itemType: BuildingType = BuildingType.None;
    
    @property({type: Enum(ObjectType), displayName: '[已废弃]消耗资源类型（使用多阶段配置）'})
    private consumptionType: ObjectType = ObjectType.DropItemCoin;

    @property({type: CCInteger, displayName: '[已废弃]解锁所需资源数量（使用多阶段配置）'})
    private unlockCostValue: number = 0;

    @property({type: [UnlockStageConfig], displayName: '多阶段解锁配置（优先使用）'})
    private unlockStages: UnlockStageConfig[] = [];

    @property({type: Label, displayName: '剩余所需资源数'})
    private remainGoldLbl: Label = null!;

    @property({type: Collider, displayName: '触发器'})
    private trigger: Collider = null!;

    @property({type: Node, displayName: '资源Icon'})
    private goldIcon: Node = null!;

    @property({type: Sprite, displayName: '百分比'})
    private percent: Sprite = null!;

    @property({type: Node, displayName: '额外解锁的Node 不需要缩放动画'})
    private extraUnlockNode: Node[] = [];
    
    @property({type: Node, displayName: '额外解锁的Node 需要缩放动画'})
    private extraUnlockNodeNeedScale: Node[] = [];

    private _unlockState: BuildUnlockState = BuildUnlockState.NoActive;
    private reservedGold: number = 0;
    private remainGold: number = 0;
    private isShowUnlockTip: boolean = false;
    private pickupComponents: Map<string, PickupComponent> = new Map(); // 存储在触发器内的PickupComponent
    private interactionTimers: Map<string, number> = new Map(); // 存储在触发器内的PickupComponent的交互时间
    private checkTimer: number = 0; // 用于在update中控制检查频率
    private currentStageIndex: number = 0; // 当前解锁阶段索引
    private isLabelScaling: boolean = false; // 标记remainGoldLbl是否正在缩放
    private isWorkerBreathing: boolean = false; // 标记解锁项是否正在呼吸
    
    private oldNodeScale: Vec3 = v3(1, 1, 1); // 将在onLoad中保存实际的原始缩放值
    public get ItemType(): BuildingType {
        return this.getCurrentStageConfig().itemType;
    }

    public get UnlockState(): BuildUnlockState {
        return this.unlockState;
    }
    
    public get ConsumptionType(): ObjectType {
        return this.getCurrentStageConfig().consumptionType;
    }

    /**
     * 获取当前阶段配置
     */
    private getCurrentStageConfig(): UnlockStageConfig {
        // 如果配置了多阶段，使用多阶段配置
        if (this.unlockStages.length > 0) {
            const index = Math.min(this.currentStageIndex, this.unlockStages.length - 1);
            return this.unlockStages[index];
        }
        
        // 否则使用旧的单阶段配置（向后兼容）
        const config = new UnlockStageConfig();
        config.itemType = this.itemType;
        config.consumptionType = this.consumptionType;
        config.cost = this.unlockCostValue;
        return config;
    }

    /**
     * 获取当前阶段的解锁成本
     */
    private getCurrentStageCost(): number {
        return this.getCurrentStageConfig().cost;
    }

    /**
     * 检查当前解锁项是否是工人类型
     */
    private isWorkerType(): boolean {
        const itemType = this.ItemType;
        return itemType === BuildingType.Lumberjack || itemType === BuildingType.Lumberjack2;
    }

    /**
     * 检查是否还有下一个阶段
     */
    private hasNextStage(): boolean {
        return this.unlockStages.length > 0 && this.currentStageIndex < this.unlockStages.length - 1;
    }

    /**
     * 进入下一个解锁阶段
     */
    private gotoNextStage() {
        if (!this.hasNextStage()) {
            return;
        }

        this.currentStageIndex++;
        const config = this.getCurrentStageConfig();
        
        // 重置当前阶段的资源需求
        this.remainGold = config.cost;
        this.reservedGold = 0;
        
        // 更新UI
        this.remainGoldLbl.string = this.remainGold.toString();
        this.percent.fillRange = 0;
        
        // 触发UI动画
        let oldScale = this.node.getScale().clone();
        this.node.setScale(0, 0, 0);
        tween(this.node).to(0.5, {scale: oldScale}, {easing: easing.backOut}).start();
        
        // 更新引导位置
        app.event.emit(CommonEvent.UpdateGuideItemPosition, {
            type: config.itemType, 
            position: this.node.getWorldPosition(),
            consumptionType: config.consumptionType
        });
        
   //console.log(`[UnlockItem] 进入第 ${this.currentStageIndex + 1} 阶段，解锁类型: ${config.itemType}, 需要资源: ${config.cost}`);
    }


    /**
     * 预留资源数量，在资源飞过来的过程中先减少所需资源
     * @param amount 预留的资源数量
     */
    reserveGold(amount: number) {
        if (this.unlockState !== BuildUnlockState.Active) return;
        
        this.reservedGold += amount;
        // 更新显示的剩余资源数量
        const displayRemainGold = this.getDisplayRemainGold();
        
        // 如果预留的资源足够解锁，可以在这里触发相关事件
        if (displayRemainGold <= 0) {
            // 可以在这里添加预解锁的视觉效果或其他逻辑
        }
    }
    
    get unlockState(): BuildUnlockState {
        return this._unlockState;
    }

    set unlockState(value: BuildUnlockState) {
        // 如果状态发生变化，停止之前的呼吸动画
        if (this._unlockState !== value) {
            this.stopWorkerBreathing();
        }
        
        switch (value) {
            case BuildUnlockState.Active:
                this.node.active = true;
                // 启动呼吸动画，延迟一帧启动，确保node已经激活
                this.scheduleOnce(() => {
                    this.startWorkerBreathing();
                }, 0);
                break;
            case BuildUnlockState.Unlocked:
                this.node.active = false;
                break;
            case BuildUnlockState.NoActive:
                this.node.active = false;
                this.extraUnlockNode.forEach(node => {
                    node.active = false;
                });
                this.extraUnlockNodeNeedScale.forEach(node => {
                    node.active = false;
                });
                break;
        }
        this._unlockState = value;
    }
    
    onLoad() {
        // 保存节点的原始缩放值
        this.oldNodeScale = this.node.scale.clone();
        
        this.reset();
        
        if(this.initUnlockState === BuildUnlockState.Unlocked){
            // 如果初始就是已解锁状态，触发所有阶段的解锁事件
            this.scheduleOnce(() => {
                if (this.unlockStages.length > 0) {
                    this.unlockStages.forEach(stage => {
                        app.event.emit(CommonEvent.UnlockItem, stage.itemType);
                    });
                } else {
                    app.event.emit(CommonEvent.UnlockItem, this.itemType);
                }
            });
        }

        app.event.on(CommonEvent.SetUnlockStatue, this.onSetUnlockStatue, this);

        const currentConfig = this.getCurrentStageConfig();
        app.event.emit(CommonEvent.UpdateGuideItemPosition, {
            type: currentConfig.itemType, 
            position: this.node.getWorldPosition(),
            consumptionType: currentConfig.consumptionType
        });
        
        // 使用update方法替代schedule
        this.checkTimer = 0;

        // 注册所有阶段到unlockItemMap（多阶段的情况下，每个阶段都指向同一个UnlockItem）
        if (this.unlockStages.length > 0) {
            this.unlockStages.forEach(stage => {
                manager.game.unlockItemMap.set(stage.itemType, this);
            });
        } else {
            manager.game.unlockItemMap.set(this.itemType, this);
        }
    }
    protected start(): void {
        this.trigger.on('onTriggerEnter', this._onCollisionEnter, this);
        this.trigger.on('onTriggerExit', this._onCollisionExit, this);
    }

    onDestroy() {
        app.event.off(CommonEvent.SetUnlockStatue, this.onSetUnlockStatue);
        this.trigger.off('onTriggerEnter', this._onCollisionEnter, this);
        this.trigger.off('onTriggerExit', this._onCollisionExit, this);
        
        // 清理node缩放动画
        tween(this.node).stop();
    }

    onSetUnlockStatue(data: {type: BuildingType, state: BuildUnlockState, cost?: number, isResetCost?: boolean, stageIndex?: number}) {
        // 检查是否匹配当前阶段或者任意阶段
        const currentConfig = this.getCurrentStageConfig();
        const isCurrentStage = data.type === currentConfig.itemType;
        const isAnyStage = this.unlockStages.some(stage => stage.itemType === data.type) || data.type === this.itemType;
        
        if(isCurrentStage || isAnyStage){
            let oldState = this.unlockState;
            
            // 如果指定了阶段索引，跳转到该阶段
            if(data.stageIndex !== undefined && this.unlockStages.length > 0) {
                this.currentStageIndex = Math.max(0, Math.min(data.stageIndex, this.unlockStages.length - 1));
            }
            
            this.unlockState = data.state;
            
            // 获取当前阶段配置（可能已经改变）
            const config = this.getCurrentStageConfig();
            
            // 只有当 cost 存在时才更新当前阶段的成本
            if(data.cost !== undefined){
                if (this.unlockStages.length > 0) {
                    // 更新当前阶段的cost
                    this.unlockStages[this.currentStageIndex].cost = data.cost;
                } else {
                    this.unlockCostValue = data.cost;
                }
            }
            
            // 只有当 isResetCost 为 true 且相关数据有效时才重置消耗
            if(data.isResetCost === true && config.cost > 0){
                this.remainGold = config.cost;
                this.reservedGold = 0;
        
                // 根据消耗类型设置不同的前缀
                this.remainGoldLbl.string = this.remainGold.toString();
                this.percent.fillRange = config.cost > 0 ? 1 - (this.remainGold / config.cost) : 0;
            }

            if(oldState == BuildUnlockState.NoActive && data.state == BuildUnlockState.Active){
                let oldScale = this.node.getScale().clone();
                this.node.setScale(0, 0, 0);
                tween(this.node).to(0.5, {scale: oldScale}, {easing: easing.backOut}).start();
                this.extraUnlockNode.forEach(node => {
                    node.active = true;
                });
                this.extraUnlockNodeNeedScale.forEach(node => {
                    node.active = true;
                    let oldScale = node.getScale().clone();
                    node.setScale(0, 0, 0);
                    tween(node).to(0.5, {scale: oldScale}, {easing: easing.backOut}).start();
                });
            }
        }
    }

    reset() {
        this.unlockState = this.initUnlockState;
        this.currentStageIndex = 0; // 重置到第一阶段
        
        const config = this.getCurrentStageConfig();
        this.remainGold = config.cost || 0;
        this.reservedGold = 0;
        
        // 停止并重置node缩放动画
        tween(this.node).stop();
        this.node.scale = this.oldNodeScale;
        this.isLabelScaling = false;
        
        // 根据消耗类型设置不同的前缀
        this.remainGoldLbl.string = this.remainGold.toString();
        this.percent.fillRange = config.cost > 0 ? 1 - (this.remainGold / config.cost) : 0;

        this.isShowUnlockTip = false;
        this.pickupComponents.clear();
        
   //console.log(`[UnlockItem] 重置到第 1 阶段，解锁类型: ${config.itemType}, 需要资源: ${config.cost}`);
    }

    CostGold(cost: number) {
        // 从预留的资源中扣除实际到达的资源
        const actualCost = Math.min(cost, this.reservedGold);
        this.reservedGold -= actualCost;
        this.remainGold -= cost;

        const currentCost = this.getCurrentStageCost();

        // 清除原本tween
        tween(this.goldIcon).stop();
        let oldScale = this.goldIcon.getScale().clone();
        this.goldIcon.scale = v3(1, 1, 1);
        // 播放图标动画
        tween(this.goldIcon)
            .to(0.01, {scale: v3(1.2, 1.2, 1.2)})
            .call(() => {
                this.remainGoldLbl.string = this.remainGold.toString();
                this.percent.fillRange = currentCost > 0 ? 1 - (this.remainGold / currentCost) : 0;
                
                // 如果当前没有正在进行的缩放动画，则播放node缩放动画
                if (!this.isLabelScaling) {
                    this.isLabelScaling = true;
                    
                    // 先停止呼吸动画
                    const needRestartBreathing = this.isWorkerBreathing;
                    if (needRestartBreathing) {
                        this.stopWorkerBreathing();
                    }
                    
                    const originalNodeScale = this.node.scale.clone();
                    tween(this.node)
                        .to(0.1, {scale: v3(originalNodeScale.x * 1.3, originalNodeScale.y * 1.3, originalNodeScale.z*1.3)})
                        .to(0.1, {scale: originalNodeScale})
                        .call(() => {
                            this.isLabelScaling = false;
                            
                            // 如果之前在呼吸，恢复呼吸动画
                            if (needRestartBreathing) {
                                this.startWorkerBreathing();
                            }
                        })
                        .start();
                }
                
                // 检查是否已经解锁当前阶段
                if (this.remainGold <= 0 && this.unlockState === BuildUnlockState.Active) {
                    const currentItemType = this.ItemType;
                    
                    // 停止node缩放动画并恢复原始scale
                    tween(this.node).stop();
                    this.node.scale = this.oldNodeScale;
                    this.isLabelScaling = false;
                    
                    // 发送解锁事件
                    app.event.emit(CommonEvent.UnlockItem, currentItemType);
                    app.audio.playEffect('resources/audio/房屋和箭弩升级');
                    
                    // 检查是否还有下一个阶段
                    if (this.hasNextStage()) {
                        // 进入下一个阶段
                   //console.log(`[UnlockItem] 第 ${this.currentStageIndex + 1} 阶段解锁完成: ${currentItemType}`);
                        this.gotoNextStage();
                    } else {
                        // 所有阶段都解锁完成
                   //console.log(`[UnlockItem] 所有阶段解锁完成，最后阶段: ${currentItemType}`);
                        this.unlockState = BuildUnlockState.Unlocked;
                    }
                }
            })
            .to(0.01, {scale: v3(1, 1, 1)})
            .start();
    }

    private _onCollisionEnter(event: ITriggerEvent) {
        const node = event.otherCollider.node;
        const pickupComponent = node.getComponent(PickupComponent);
        if(pickupComponent){
            // 添加到Map中跟踪
            this.pickupComponents.set(node.uuid, pickupComponent);
            this.interactionTimers.set(node.uuid, 0);
            // console.log('添加到Map中跟踪', node.uuid, pickupComponent);
        }
    }
    
    private _onCollisionExit(event: ITriggerEvent) {
        const node = event.otherCollider.node;
        if(node && this.pickupComponents.has(node.uuid)){
            // 从Map中移除
            this.pickupComponents.delete(node.uuid);
            this.interactionTimers.delete(node.uuid);
            // console.log('从Map中移除', node.uuid);
        }
    }
    
    private _checkPickupComponents() {
        // 如果不是激活状态，直接返回
        if(this.unlockState !== BuildUnlockState.Active) return;
        
        // 遍历所有触发器内的PickupComponent
        this.pickupComponents.forEach((pickupComponent, uuid) => {
            if(pickupComponent && pickupComponent.isValid){
                let duration = this.interactionTimers.get(uuid) || 0;
                duration += Config.UNLOCK_CHECK_INTERVAL;
                this.interactionTimers.set(uuid, duration);
                this.OnCost(pickupComponent, pickupComponent.node.getWorldPosition(), duration);
            } else {
                // 如果组件不再有效，从Map中移除
                this.pickupComponents.delete(uuid);
                this.interactionTimers.delete(uuid);
            }
        });
    }

    public OnCost(pickupComponent: PickupComponent, wpos: Vec3, duration: number = 0){
        const currentConsumptionType = this.ConsumptionType; // 使用getter获取当前阶段的消耗类型
        
        if(this.unlockState === BuildUnlockState.Active){
            // 计算消耗数量：基础1个 + 每0.1秒多1个，上限10个 (参考ShopCommon.ts)
            const extraCount = Math.floor(duration / 0.1);
            let consumeCount = 1 + extraCount;
            consumeCount = Math.min(consumeCount, 10);
            
            // 限制不能超过剩余所需资源数
            const remainGold = this.getDisplayRemainGold();
            consumeCount = Math.min(consumeCount, remainGold);
            
            // 限制不能超过实际持有数量
            const hasCount = pickupComponent.getItemCount(currentConsumptionType);
            consumeCount = Math.min(consumeCount, hasCount);
            
            if (consumeCount <= 0) return;
            
            this.reserveGold(consumeCount);
            const consumeList = pickupComponent.consumeItem(currentConsumptionType, consumeCount);

            for (let i = 0; i < consumeCount; i++) {
                let item: Node;
                if(i < consumeList.length){
                    item = consumeList[i];
                    Tween.stopAllByTarget(item);
                }else{
                    const position = wpos;
                    item = manager.pool.getNode(currentConsumptionType, manager.effect.node)!;
                    item.setWorldPosition(position);
                }

                const parent = manager.effect.node;
                item.setParent(parent, true);

                manager.effect.flyNodeInParabola({
                    node: item,
                    target: this.goldIcon,
                    targetWorldRotation: new Quat(0,0,0,0),
                    callback: () => {
                        app.audio.playEffect('resources/audio/投入资源', 0.6);
                        this.CostGold(1);
                        manager.pool.putNode(item);
                    }
                });
            }
        }
    }
    
    getRemainGold() {
        return this.remainGold;
    }
    
    /**
     * 获取显示的剩余资源数量（考虑预留资源）
     */
    getDisplayRemainGold() {
        return Math.max(0, this.remainGold - this.reservedGold);
    }
    
    /**
     * 获取预留的资源数量
     */
    getReservedGold() {
        return this.reservedGold;
    }

    /**
     * 获取当前阶段索引（从0开始）
     */
    getCurrentStageIndex(): number {
        return this.currentStageIndex;
    }

    /**
     * 获取总阶段数
     */
    getTotalStages(): number {
        return this.unlockStages.length > 0 ? this.unlockStages.length : 1;
    }

    /**
     * 获取所有阶段的配置
     */
    getAllStages(): UnlockStageConfig[] {
        if (this.unlockStages.length > 0) {
            return this.unlockStages;
        }
        
        // 兼容旧配置
        const config = new UnlockStageConfig();
        config.itemType = this.itemType;
        config.consumptionType = this.consumptionType;
        config.cost = this.unlockCostValue;
        return [config];
    }

    /**
     * 启动解锁项的呼吸动画
     */
    private startWorkerBreathing() {
        if (this.isWorkerBreathing) return;
        
        this.isWorkerBreathing = true;
        
        // 先恢复到原始缩放，确保呼吸动画基准正确
        this.node.scale = this.oldNodeScale.clone();
        
        tween(this.node)
            .to(1.0, { scale: v3(this.oldNodeScale.x * 1.15, this.oldNodeScale.y * 1.15, this.oldNodeScale.z * 1.15) }, { easing: 'sineInOut' })
            .to(1.0, { scale: this.oldNodeScale.clone() }, { easing: 'sineInOut' })
            .union()
            .repeatForever()
            .tag(1001) // 使用tag标记呼吸动画
            .start();
    }

    /**
     * 停止解锁项的呼吸动画
     */
    private stopWorkerBreathing() {
        if (!this.isWorkerBreathing) return;
        
        this.isWorkerBreathing = false;
        // 停止带有tag 1001的动画（呼吸动画）
        Tween.stopAllByTag(1001, this.node);
        
        // 恢复到原始缩放
        this.node.scale = this.oldNodeScale.clone();
    }

    /**
     * 显示解锁提示
     */
    ShowUnlockTip() {
        if(this.isShowUnlockTip) return;
        this.isShowUnlockTip = true;
        
        const iconNode = this.node.getChildByName('icon');
        const squareNode = this.node.getChildByName('square')!;
        
        // 保存原始颜色和缩放
        const originalScale = squareNode.scale.clone();
        
        // 设置呼吸动画 - 缩放效果
        tween(squareNode)
            .to(0.5, { scale: v3(originalScale.x * 1.1, originalScale.y * 1.1, originalScale.z * 1.1) }, { easing: 'sineInOut' })
            .to(0.5, { scale: originalScale }, { easing: 'sineInOut' })
            .union()
            .repeatForever()
            .start();
            
        // 呼吸变色效果 - 节点本身
        const nodeSprite = squareNode.getComponent(Sprite);
        if (nodeSprite) {
            // 使用颜色变化代替材质
            tween(nodeSprite)
                .to(0.5, { color: new Color(100, 255, 100, 255) }, { easing: 'sineInOut' })
                .to(0.5, { color: new Color(255, 255, 255, 255) }, { easing: 'sineInOut' })
                .union()
                .repeatForever()
                .start();
        }
        
        // 呼吸变色效果 - icon子节点
        if (iconNode) {
            const iconSprite = iconNode.getComponent(Sprite);
            if (iconSprite) {
                // 使用颜色变化代替材质
                tween(iconSprite)
                    .to(0.5, { color: new Color(100, 255, 100, 255) }, { easing: 'sineInOut' })
                    .to(0.5, { color: new Color(255, 255, 255, 255) }, { easing: 'sineInOut' })
                    .union()
                    .repeatForever()
                    .start();
            }
        }
        
        // 呼吸变色效果 - 数字标签
        if (this.remainGoldLbl) {
            tween(this.remainGoldLbl)
                .to(0.5, { color: new Color(100, 255, 100, 255) }, { easing: 'sineInOut' })
                .to(0.5, { color: new Color(255, 255, 255, 255) }, { easing: 'sineInOut' })
                .union()
                .repeatForever()
                .start();
        }
    }

    /**
     * 隐藏解锁提示
     */
    HideUnlockTip() {
        tween(this.node).stop();
        // 获取icon子节点（假设goldIcon就是要变色的icon）
        const iconNode = this.node.getChildByName('icon');
        if (iconNode) tween(iconNode).stop();

        // 停止数字标签动画
        if (this.remainGoldLbl) {
            tween(this.remainGoldLbl).stop();
            this.remainGoldLbl.color = new Color(255, 255, 255, 255);
        }

        this.node.scale = this.oldNodeScale;
        this.node.getComponent(Sprite)!.color = new Color(255, 255, 255, 255);
        this.node.getChildByName('icon')!.getComponent(Sprite)!.color = new Color(255, 255, 255, 255);
        
        this.isShowUnlockTip = false;
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
}
