import { _decorator, Component, Node, Sprite, UITransform, v3, Vec2, Vec3, Label, Color } from 'cc';
import { BuildingType, BuildUnlockState, CommonEvent, ObjectType } from '../Common/CommonEnum';
import { ComponentEvent } from '../Common/ComponentEvents';
const { ccclass, property } = _decorator;

export enum GuideStep {
    /** 无 */
    None = 'None',
    /** 上车 */
    BoardTrain = 'BoardTrain1',
    /** 上车2 */
    BoardTrain1 = 'BoardTrain2',
    /** 麦子仓库 */
    GoToWarehouse = 'GoToWarehouse',
    /** 木头仓库 */
    GoToWoodWarehouse = 'GoToWoodWarehouse',
    /** 去ProductionBuilding交付  */
    GoToProductionBuilding = 'GoToProductionBuilding',
    /** 拿大饼 */
    PickUpPie = 'PickUpPie',
    /** 去大饼商店交付 */
    GoToPieShop = 'GoToPieShop',

    /** 拾取金币 */
    PickUpCoin = 'PickUpCoin',
    /**解锁 售货员1 */
    UnlockSeller1 = 'UnlockSeller1',
    /** 解锁 售货员2 */
    UnlockSeller2 = 'UnlockSeller2',
    /** 升级火车到二级 */
    UpgradeTrainToLv2 = 'UpgradeTrainToLv2',
    /** 升级火车到3级 */
    UpgradeTrainToLv3 = 'UpgradeTrainToLv3',

    /** 解锁箭塔1 */
    UnlockArrowTower1 = 'UnlockArrowTower1',
    /** 解锁箭塔2 */
    UnlockArrowTower2 = 'UnlockArrowTower2',
    /** 解锁箭塔3 */
    UnlockArrowTower3 = 'UnlockArrowTower3',
    /**解锁箭塔4 */
    UnlockArrowTower4 = 'UnlockArrowTower4',
    /** 扩张场地 */
    ExpandField = 'ExpandField',
}

interface GuideStepConfig {
    endNode: Node | (() => Node);
    startNode?: Node | (() => Node);
    description?: string;
    /** 条件 */
    condition?: () => boolean;
    /** 完成回调 */
    onComplete?: () => void;
    /** 顶部箭头高度偏移，默认为2 */
    arrowTopHeight?: number;
}

const GuideConfig: Partial<Record<GuideStep, GuideStepConfig>> = {

  

    [GuideStep.BoardTrain]: {
        endNode: () => {
            return manager.game.trainManager.trainBoardingTrigger.boardingTriggerNode
        },
        arrowTopHeight: 1.5,
        condition: () => {
            console.log(`[GuideManager] 检查是否在火车上: ${manager.game.trainManager.trainBoardingTrigger.getIsPlayerOnTrain()}`);
            return !manager.game.trainManager.trainBoardingTrigger.getIsPlayerOnTrain();
        }

    },
    [GuideStep.BoardTrain1]: {
        endNode: () => {
            return manager.game.trainManager.trainBoardingTrigger.boardingTriggerNode
        },
        arrowTopHeight: 1.5,
        condition: () => {
            //如果火车已经进入了自动状态 则不提示
            return !manager.game.trainManager.trainBoardingTrigger.getIsPlayerOnTrain() && manager.game.trainManager.getTrain().autoRun;
        }
    },
    /**指引去麦子仓库 */
    [GuideStep.GoToWarehouse]: {
        endNode: () => {
            return manager.game.trainManager.trainUnloadManager.wheatContainer.node;
        },
        // description: "去仓库",
        arrowTopHeight: 1.5,
        condition: () => {
            const hero = manager.game.hero;
            return hero && hero.GetItemCount(ObjectType.DropItemCornKernel) == 0;
        }
    },
    /** 指引去交付麦子 */
 [GuideStep.GoToProductionBuilding]: {
        endNode: () => {
            return manager.game.productionBuilding.productionCollider.node;
        },
        // description: "去仓库",
        arrowTopHeight: 1.5,
        condition: () => {
            const hero = manager.game.hero;
            return hero && hero.GetItemCount(ObjectType.DropItemCornKernel) > 0;
        }
    },
  [GuideStep.PickUpPie]: {
        // 若有专门的大饼容器节点，请在 GameManager 中加入引用并在此替换
        endNode: () => manager.game.productionBuilding.outputContainer.flatbreadContainerCollider.node,
        arrowTopHeight: 1.5,
        condition: () => {
            const hero = manager.game.hero;
            return hero && hero.GetItemCount(ObjectType.DropItemFlatbread) == 0;
        }
    },
    [GuideStep.GoToPieShop]: {
        endNode: () => manager.game.flatbreadShop.ShopCollider.node,
        arrowTopHeight: 1.5,
        condition: () => {
            const hero = manager.game.hero;
            return hero && hero.GetItemCount(ObjectType.DropItemFlatbread) > 0;
        }
    },
  [GuideStep.PickUpCoin]: {
        endNode: () => manager.game.flatbreadShop.CoinContainer.node,
        // description: "拾取商店产出的金币",
        arrowTopHeight: 1.5,
        condition: () => {
            const coinContainer = manager.game.flatbreadShop.CoinContainer;
            return coinContainer && coinContainer.node && coinContainer.node.children.length > 0;
        }
    },
    
  

    [GuideStep.UnlockSeller1]: {
        endNode: () => GuideManager.getEndNode(BuildingType.Salesperson1),
        arrowTopHeight: 1.5,
        condition: () => {
            const unlockItem = manager.game.unlockItemMap.get(BuildingType.Salesperson1);
            return unlockItem && unlockItem.UnlockState == BuildUnlockState.Active;
        }
    },
    // [GuideStep.UnlockSeller2]: {
    //     endNode: () => GuideManager.getEndNode(BuildingType.Salesperson2),
    //     arrowTopHeight: 1.5,
    // },
    [GuideStep.UpgradeTrainToLv2]: {
    endNode: () => GuideManager.getEndNode(BuildingType.Train1),
    arrowTopHeight: 1.5,
    condition: () => {
            //检查当前火车等级
            const trainLv = manager.game.trainManager.getLevel();
            if(trainLv >= 2){
                return false;
            }
            return true;
        }
    },

    [GuideStep.UnlockArrowTower1]: {
        endNode: () => {
            return GuideManager.getEndNode(BuildingType.ArrowTower);
        },
        // description: "解锁箭塔1，攻击敌人",
        arrowTopHeight: 1.5,
        condition: () => {
            const unlockItem = manager.game.unlockItemMap.get(BuildingType.ArrowTower);
            return unlockItem && unlockItem.UnlockState == BuildUnlockState.Active;
        }
    },

    [GuideStep.GoToWoodWarehouse]: {
        endNode: () => {
            return manager.game.trainManager.trainUnloadManager.woodContainer.node;
        },
        // description: "去仓库",
        arrowTopHeight: 1.5,
        condition: () => {
            const hero = manager.game.hero;
            return hero && hero.GetItemCount(ObjectType.DropItemWood) == 0;
        }
    },
    // [GuideStep.UnlockArrowTower2]: {
    //     endNode: () => GuideManager.getEndNode(BuildingType.ArrowTower2),
    //     arrowTopHeight: 1.5,
    // },
    [GuideStep.UpgradeTrainToLv3]: {
        endNode: () => GuideManager.getEndNode(BuildingType.Train2),
        arrowTopHeight: 1.5,
        condition: () => {
           //检查当前火车等级
            const trainLv = manager.game.trainManager.getLevel();
            if(trainLv >= 3){
                return false;
            }
            return true;
        }
    },
    [GuideStep.UnlockArrowTower3]: {
        endNode: () => GuideManager.getEndNode(BuildingType.ArrowTower3),
        arrowTopHeight: 1.5,
    },
    [GuideStep.UnlockArrowTower4]: {
        // 如需第四座箭塔，请在 BuildingType 中新增并在此替换
        endNode: () => GuideManager.getEndNode(BuildingType.ArrowTower3),
        arrowTopHeight: 1.5,
    },
    [GuideStep.ExpandField]: {
        endNode: () => GuideManager.getEndNode(BuildingType.EndGame),
        arrowTopHeight: 1.5,
        condition: () => {
          
            const unlockItem = manager.game.unlockItemMap.get(BuildingType.EndGame);
            return unlockItem && unlockItem.UnlockState == BuildUnlockState.Active;
        }
    },
}

@ccclass('GuideManager')
export class GuideManager extends Component {
    /** 单例实例 */
    private static _instance: GuideManager | null = null;
    /** 获取单例实例 */
    public static get instance(): GuideManager {
        return this._instance as GuideManager;
    }

    @property({ type: Node, displayName: '顶部箭头' })
    public arrowTop: Node = null!;

    @property({ type: Node, displayName: '箭头' })
    public arrow: Node = null!;

    @property({ type: Node, displayName: '箭头1' })
    public arrow1: Node = null!;

    @property({ type: Node, displayName: 'NavLine根节点', tooltip: '可选：挂有 NavLineComp 的节点' })
    public navLineRoot: Node = null!;



    @property({ type: Node, displayName: '引导文字节点' })
    public guideTextNode: Node = null!;

    @property({ type: Label, displayName: '引导文字' })
    public guideLabel: Label = null!;

    @property({ type: Node, displayName: '快速引导节点' })
    public quickGuideNode: Node = null!;

    private _isShowArrow: boolean = false;
    private _isShowGuide: boolean = false;

    private _startNode: Node = null!;
    private _endNode: Node = null!;

    /** 当前引导步骤 */
    private _currentStep: GuideStep = GuideStep.None;
    /** 当前引导配置 */
    private _currentConfig: GuideStepConfig | null = null;
    /** 引导开始时间 */
    private _guideStartTime: number = 0;
    /** 引导超时时间（毫秒） */
    private readonly GUIDE_TIMEOUT: number = 30000;
    /** 检查间隔（毫秒） */
    private readonly CHECK_INTERVAL: number = 100;
    /** 上次检查时间 */
    private _lastCheckTime: number = 0;
    /** 无操作计时器 */
    private _noActionTimer: number = 0;
    /** 无操作超时时间（秒） */
    private readonly NO_ACTION_TIMEOUT: number = 5; // 5秒无操作后触发引导
    /** 箭头目标刷新间隔（毫秒） */
    private readonly ARROW_TARGET_REFRESH_INTERVAL: number = 500; // 每0.5秒刷新一次箭头目标
    /** 上次箭头目标刷新时间 */
    private _lastArrowRefreshTime: number = 0;

    private static finishMap: Map<GuideStep, boolean> = new Map();

    /** 初始化单例，提供更安全的初始化方式 */
    public static initInstance(instance: GuideManager): void {
        if (this._instance) {
            instance.node.destroy();
            return;
        }
        this._instance = instance;
    }

    protected onLoad(): void {
        // 使用改进的单例初始化方法
        GuideManager.initInstance(this);
        if (GuideManager._instance !== this) return;

        this.hideArrow();
        this.hideGuideText();
        this.hideQuickGuide();

        // 确保顶部箭头初始状态为隐藏
        if (this.arrowTop) {
            this.arrowTop.active = false;
        }

        // 延迟注册事件，确保其他管理器已初始化
        this.scheduleOnce(() => {
            this.registerEvents();
            console.log('[GuideManager] 引导管理器初始化完成');
        }, 0.1);
    }

    protected onDestroy(): void {
        if (GuideManager._instance === this) {
            GuideManager._instance = null;
        }

        app.event.offAllByTarget(this);
    }

    update(dt: number): void {
        const currentTime = Date.now();

        if (this._isShowArrow) {
            // 定期刷新箭头目标（endNode），确保箭头始终指向正确的目标
            if (currentTime - this._lastArrowRefreshTime >= this.ARROW_TARGET_REFRESH_INTERVAL) {
                this.refreshArrowTarget();
                this._lastArrowRefreshTime = currentTime;
            }

            this.updateArrowPosition();
        }

        // 更新无操作计时器
        this._noActionTimer += dt;

        // 定期检查引导状态（降低检查频率以优化性能）
        if (currentTime - this._lastCheckTime >= this.CHECK_INTERVAL) {
            this.checkGuideState();
            this._lastCheckTime = currentTime;
        }

        // 检查引导超时
        if (this._isShowGuide && currentTime - this._guideStartTime >= this.GUIDE_TIMEOUT) {
            this.completeCurrentGuide();
        }
    }

    /** 刷新箭头目标节点 */
    private refreshArrowTarget(): void {
        if (!this._currentConfig) return;

        try {
            // 重新获取endNode
            const newEndNode = typeof this._currentConfig.endNode === 'function'
                ? this._currentConfig.endNode()
                : this._currentConfig.endNode;

            // 如果endNode发生了变化，更新引用
            if (newEndNode && newEndNode !== this._endNode) {
                this._endNode = newEndNode;
                //console.log(`[GuideManager] 箭头目标已刷新: ${this._currentStep}`);
            } else if (!newEndNode && this._endNode) {
                // 如果新的endNode为null，但之前有endNode，说明目标消失了
                //console.warn(`[GuideManager] 箭头目标节点消失: ${this._currentStep}`);
            }
        } catch (error) {
            //console.error('[GuideManager] 刷新箭头目标时出错:', error);
        }
    }

    private updateArrowPosition(): void {
        if (!this._startNode || !this._endNode) return;

        const startWPosY = manager.game.calculateGroundHeight(this._startNode.getWorldPosition());
        const startWPos = this._startNode.getWorldPosition();
        startWPos.y = startWPosY + 0.05;
        const endWPosY = manager.game.calculateGroundHeight(this._endNode.getWorldPosition());
        const endWPos = this._endNode.getWorldPosition();
        endWPos.y = endWPosY + 0.05;

        this.updateArrow(startWPos, endWPos);
    }



    private updateArrow(startWPos: Vec3, endWPos: Vec3): void {
        if (!this._isShowArrow) return;

        const distance = Vec3.distance(startWPos, endWPos);
        this.arrow.active = true;
        this.arrow1.active = false;
        this.arrowTop.active = true;

        const topArrowPos = endWPos.clone();
        let arrowHeight = this._currentConfig?.arrowTopHeight || 2;

        topArrowPos.y += arrowHeight;
        this.arrowTop.setWorldPosition(topArrowPos);

        this.arrow.setWorldPosition(startWPos);
        this.arrow.lookAt(endWPos);

        this.arrow1.setWorldPosition(startWPos);
        this.arrow1.lookAt(endWPos);

        // if (this.arrowSprite && this.arrowSprite.node && this.arrowSprite.node.isValid) {
        //     const scale = this.arrowSprite.node.scale.y;
        //     const ui = this.arrowSprite.node.getComponent(UITransform);
        //     ui && (ui.height = distance / scale);
        // }
        if (this.navLineRoot && this.navLineRoot.isValid) {
            const navComp: any = this.navLineRoot.getComponent('NavLineComp' as any);
            if (navComp && typeof navComp.setDistance === 'function') {
                navComp.setDistance(distance);
            }
        }
    }

    private showArrow(startNode: Node, endNode: Node): void {
        if (!startNode || !endNode) {
            //console.error('startNode or endNode is null');
            return;
        }
        this._isShowArrow = true;
        this._startNode = startNode;
        this._endNode = endNode;
        // 重置箭头目标刷新计时器
        this._lastArrowRefreshTime = Date.now();
        // 初始状态下隐藏两个箭头，让updateArrow根据距离决定显示哪个
        this.arrow.active = false;
        this.arrow1.active = false;

        this.arrowTop.active = false;
        if (this.navLineRoot && this.navLineRoot.isValid) {
            const navComp: any = this.navLineRoot.getComponent('NavLineComp' as any);
            if (navComp && typeof navComp.show === 'function') {
                navComp.show();
            }
        }
    }

    private hideArrow(): void {
        this._isShowArrow = false;
        this._startNode = null!;
        this._endNode = null!;
        // 重置箭头目标刷新计时器
        this._lastArrowRefreshTime = 0;
        this.arrow.active = false;
        this.arrow1.active = false;
        this.arrowTop.active = false;
        if (this.navLineRoot && this.navLineRoot.isValid) {
            const navComp: any = this.navLineRoot.getComponent('NavLineComp' as any);
            if (navComp && typeof navComp.stop === 'function') {
                navComp.stop();
            }
        }
    }

    private showGuideText(text: string): void {
        if (!this.guideTextNode || !this.guideLabel) return;

        this.guideLabel.string = text;
        this.guideTextNode.active = true;
        this._isShowGuide = true;
        this._guideStartTime = Date.now();
    }

    private hideGuideText(): void {
        if (this.guideTextNode) {
            this.guideTextNode.active = false;
        }
        this._isShowGuide = false;
    }

    private showQuickGuide(): void {
        if (this.quickGuideNode) {
            this.quickGuideNode.active = true;
        }
    }

    private hideQuickGuide(): void {
        if (this.quickGuideNode) {
            this.quickGuideNode.active = false;
        }
    }

    /** 注册事件监听 */
    private registerEvents(): void {
        // 监听游戏开始事件（第一次玩家输入）
        app.event.on(CommonEvent.joystickInput, this.onGameStart, this);
        // 监听英雄移动事件，重置无操作计时器
        app.event.on(CommonEvent.HerMove, this.onHeroMove, this);
        // 监听英雄受伤事件
        app.event.on(CommonEvent.HeroHurt, this.onHeroHurt, this);
        // 监听敌人死亡事件
        app.event.on(CommonEvent.EnemyDeadFinish, this.onEnemyDead, this);
        // 监听拾取金币事件
        app.event.on(CommonEvent.PickupCoin, this.onPickupCoin, this);
        // 监听解锁完成事件
        app.event.on(CommonEvent.UnlockItem, this.onUnlockItem, this);
        // 监听引导物品位置更新事件
        app.event.on(CommonEvent.UpdateGuideItemPosition, this.onUpdateGuideItemPosition, this);
        // 监听商店交付事件
        app.event.on(CommonEvent.UpdateHeroItemCount, this.onHeroItemCountUpdate, this);
        // 监听kill enemy事件
        app.event.on(CommonEvent.KillEnemy, this.onKillEnemy, this);
    }

    /** 杀怪事件处理 */
    private onKillEnemy(): void {
        this._noActionTimer = 0;
        // if (this._currentStep === GuideStep.KillEnemy) {
        //     this.completeCurrentGuide();
        // }
    }

    /** 游戏开始事件处理（第一次玩家输入） */
    private onGameStart(): void {
        // console.log('[GuideManager] 检测到游戏开始，检查引导触发');
        // 立即检查一次引导，不需要等待无操作超时
        this.scheduleOnce(() => {
            this._noActionTimer = this.NO_ACTION_TIMEOUT; // 设置为超时状态
            this.checkGuideState();
        }, 0.1)
    }

    /** 英雄移动事件处理 */
    private onHeroMove(): void {
        this._noActionTimer = 0;
    }

    /** 英雄受伤事件处理 */
    private onHeroHurt(): void {
        this._noActionTimer = 0;
    }

    /** 敌人死亡事件处理 */
    private onEnemyDead(): void {
        this._noActionTimer = 0;
    }

    /** 拾取金币事件处理 */
    private onPickupCoin(): void {
        this._noActionTimer = 0;
        if (this._currentStep === GuideStep.PickUpCoin) {
            this.completeCurrentGuide();
        }
    }

    /** 解锁完成事件处理 */
    private onUnlockItem(buildingType: BuildingType): void {
        this._noActionTimer = 0;

        // 映射建筑类型到引导步骤
        const buildingToGuideMap: Partial<Record<BuildingType, GuideStep>> = {
            [BuildingType.ArrowTower]: GuideStep.UnlockArrowTower1,
            [BuildingType.ArrowTower1]: GuideStep.UnlockArrowTower2,
            [BuildingType.ArrowTower2]: GuideStep.UnlockArrowTower3,
            [BuildingType.ArrowTower3]: GuideStep.UnlockArrowTower4,

            [BuildingType.Salesperson1]: GuideStep.UnlockSeller1,
            [BuildingType.Salesperson2]: GuideStep.UnlockSeller2,
            [BuildingType.Train1]: GuideStep.UpgradeTrainToLv2,
            [BuildingType.Train2]: GuideStep.UpgradeTrainToLv2,
            [BuildingType.EndGame]: GuideStep.ExpandField,


        };

        const expectedStep = buildingToGuideMap[buildingType];
        if (expectedStep && this._currentStep === expectedStep) {
            //console.log(`[GuideManager] 解锁完成，自动完成引导: ${expectedStep}`);
            this.completeCurrentGuide();
        }
    }

    /** 引导物品位置更新事件处理 */
    private onUpdateGuideItemPosition(): void {
        if (this._isShowArrow && this._currentConfig) {
            this.updateGuideArrow();
        }
    }

    /** 英雄物品数量更新事件处理 */
    private onHeroItemCountUpdate(data: { type: ObjectType, count: number }): void {
        this._noActionTimer = 0;

        // if (data.type === ObjectType.DropItemCornKernel && this._currentStep === GuideStep.GoToWarehouse) {
        //     if (data.count >= 5) {
        //         this.completeCurrentGuide();
        //     }
        // }

        // if (data.type === ObjectType.DropItemMeat && this._currentStep === GuideStep.GoToShop) {
        //     // 这里可以添加更精确的逻辑来判断是否是交付行为
        //     // 暂时通过数量变化来触发检查
        //     this.checkCurrentGuideComplete();
        // }
    }

    /** 检查引导状态 */
    private checkGuideState(): void {
        if (this._currentStep !== GuideStep.None) {
            // 检查当前引导是否完成
            if (this.checkCurrentGuideComplete()) {
                this.completeCurrentGuide();
                return;
            }
        }

        // 检查是否需要触发新的引导
        if (this._noActionTimer >= this.NO_ACTION_TIMEOUT) {
            this.tryTriggerGuide();
        }
    }

    /** 检查当前引导是否完成 */
    private checkCurrentGuideComplete(): boolean {
        if (!this._currentConfig) return false;

        const hero = manager.game.hero;
        if (!hero) return false;

        switch (this._currentStep) {
            case GuideStep.BoardTrain:
                // hero 进入火车完成
                return manager.game.trainManager.trainBoardingTrigger.getIsPlayerOnTrain();

            case GuideStep.BoardTrain1:
                // hero 进入火车完成
                return manager.game.trainManager.trainBoardingTrigger.getIsPlayerOnTrain();

            case GuideStep.GoToProductionBuilding:
                // 生产建筑交付引导：麦子数量减少（从有到无）
                const currentCornCount = hero.GetItemCount(ObjectType.DropItemCornKernel);
                return currentCornCount === 0; // 麦子已交付
            case GuideStep.PickUpCoin:
                // 拾取金币引导：通过事件触发，这里作为备用检查
                return hero.GetItemCount(ObjectType.DropItemCoin) > 0;
            case GuideStep.GoToWarehouse:
                // 去仓库引导：通过事件触发，这里作为备用检查
                return hero.GetItemCount(ObjectType.DropItemCornKernel) > 0;
            case GuideStep.PickUpPie:
                // 拾取大饼引导：通过事件触发，这里作为备用检查
                return hero.GetItemCount(ObjectType.DropItemFlatbread) > 0;
            case GuideStep.GoToPieShop:
                // 生产建筑交付引导：麦子数量减少（从有到无）
                const currentFlatbreadCount = hero.GetItemCount(ObjectType.DropItemFlatbread);
                return currentFlatbreadCount === 0; // 大饼已交付
            case GuideStep.UnlockSeller1:
                //检查是否激活对应的售货员
                
                return manager.game.salesman1.salesman.getIsActive();
            case GuideStep.UnlockSeller2:
                //检查是否激活对应的售货员
                return manager.game.salesman1.salesman.getIsActive();
            case GuideStep.GoToWoodWarehouse:
              
                return hero.GetItemCount(ObjectType.DropItemWood) > 0;
            case GuideStep.UpgradeTrainToLv2:
                //检查是否升级到火车Lv2
                return manager.game.trainManager.getLevel() === 2;
            case GuideStep.UpgradeTrainToLv3:
                //检查是否升级到火车Lv3
                return manager.game.trainManager.getLevel() === 3;
            case GuideStep.UnlockArrowTower1:
                //检查 箭塔1是否已解锁
                const ufoUnlockItem1 = manager.game.unlockItemMap.get(BuildingType.ArrowTower);
                // return manager.game.arrowTower1.State === "Unlocked";
                return ufoUnlockItem1?.unlockState === "Unlocked";
            case GuideStep.ExpandField:
                  const ufoUnlockItem = manager.game.unlockItemMap.get(BuildingType.EndGame);
                return ufoUnlockItem?.unlockState === "Unlocked";
            default:
                return false;
        }
    }

    /** 主动检查并触发引导（供外部调用） */
    public checkAndTriggerGuide(): void {
        //console.log('[GuideManager] 主动检查引导触发');
        this.tryTriggerGuide();
    }

    /** 手动刷新箭头目标（供外部调用） */
    public refreshArrowTargetManually(): void {
        if (this._isShowArrow && this._currentConfig) {
            //console.log('[GuideManager] 手动刷新箭头目标');
            this.refreshArrowTarget();
        }
    }

    /** 尝试触发引导 */
    private tryTriggerGuide(): void {
        try {
            // 检查游戏状态，确保游戏已经开始
            if (!manager.game || !manager.game.hero) {
                console.log('[GuideManager] 游戏尚未准备好，跳过引导触发');
                return;
            }

            // 按优先级检查每个引导步骤
            const guideSteps = [
                GuideStep.BoardTrain,
                GuideStep.GoToWarehouse,
                GuideStep.GoToProductionBuilding,
                GuideStep.PickUpPie,
                GuideStep.GoToPieShop,
                GuideStep.PickUpCoin,
                GuideStep.UnlockSeller1,
                // GuideStep.UnlockSeller2,
                GuideStep.UpgradeTrainToLv2,
                GuideStep.BoardTrain1,
                GuideStep.GoToWoodWarehouse,
                GuideStep.UnlockArrowTower1,
                // GuideStep.UnlockArrowTower2,
                GuideStep.UpgradeTrainToLv3,
                // GuideStep.UnlockArrowTower3,
                // GuideStep.UnlockArrowTower4,
                GuideStep.ExpandField,

            ];

            for (const step of guideSteps) {
                if (this.canTriggerGuide(step)) {
                    console.log(`[GuideManager] 触发引导: ${step}`);
                    this.startGuide(step);
                    break;
                }
            }
        } catch (error) {
            //console.error('[GuideManager] 尝试触发引导时出错:', error);
        }
    }

    /** 检查是否可以触发指定引导 */
    private canTriggerGuide(step: GuideStep): boolean {
        if (GuideManager.isGuideFinished(step)) {
            console.log(`[GuideManager] 引导步骤 ${step} 已完成，跳过`);
            return false;
        }

        const config = GuideConfig[step];
        if (!config) {
            console.log(`[GuideManager] 引导步骤 ${step} 配置不存在`);
            return false;
        }

        // 检查条件
        if (config.condition) {
            const conditionResult = config.condition();
            console.log(`[GuideManager] 引导步骤 ${step} 条件检查结果: ${conditionResult}`);
            if (!conditionResult) return false;
        }

        console.log(`[GuideManager] 引导步骤 ${step} 可以触发`);
        return true;
    }

    /** 开始指定引导 */
    public startGuide(step: GuideStep): void {
        if (this._currentStep !== GuideStep.None) return;

        const config = GuideConfig[step];
        if (!config) return;

        // 检查目标节点是否存在
        const endNode = typeof config.endNode === 'function' ? config.endNode() : config.endNode;
        if (!endNode) {
            //    console.warn(`[GuideManager] 引导步骤 ${step} 的目标节点不存在`);
            return;
        }

        this._currentStep = step;
        this._currentConfig = config;
        this._noActionTimer = 0;

        // 显示引导文字
        if (config.description) {
            this.showGuideText(config.description);
        }

        // 显示引导箭头
        this.updateGuideArrow();

        // 显示快速引导
        this.showQuickGuide();

        console.log(`[GuideManager] 开始引导: ${step}`);
    }

    /** 更新引导箭头 */
    private updateGuideArrow(): void {
        if (!this._currentConfig) return;

        const startNode = manager.game.hero.node;
        const endNode = typeof this._currentConfig.endNode === 'function'
            ? this._currentConfig.endNode()
            : this._currentConfig.endNode;

        if (startNode && endNode) {
            this.showArrow(startNode, endNode);
            // 立即执行一次箭头目标刷新，确保获取最新目标
            this.refreshArrowTarget();
        }
    }

    /** 完成当前引导 */
    private completeCurrentGuide(): void {
        if (this._currentStep === GuideStep.None) return;

        //console.log(`[GuideManager] 完成引导: ${this._currentStep}`);

        // 标记引导完成
        GuideManager.finishMap.set(this._currentStep, true);

        // 执行完成回调
        if (this._currentConfig?.onComplete) {
            this._currentConfig.onComplete();
        }

        // 隐藏引导元素
        this.hideArrow();
        this.hideGuideText();
        this.hideQuickGuide();

        // 重置状态
        this._currentStep = GuideStep.None;
        this._currentConfig = null;
        this._noActionTimer = 0;
    }

    /** 强制完成当前引导 */
    public forceCompleteGuide(): void {
        this.completeCurrentGuide();
    }

    /** 跳过所有引导 */
    public skipAllGuides(): void {
        // 标记所有引导为已完成
        Object.values(GuideStep).forEach(step => {
            if (step !== GuideStep.None) {
                GuideManager.finishMap.set(step, true);
            }
        });

        // 隐藏所有引导元素
        this.hideArrow();
        this.hideGuideText();
        this.hideQuickGuide();

        // 重置状态
        this._currentStep = GuideStep.None;
        this._currentConfig = null;
    }

    /**
     * 获取当前砍树目标
     * @returns 当前砍树目标的节点
     */
    public static getCurrTree(): Node | null {
        try {
            if (!manager.game || !manager.game.hero || !manager.tree) {
                //console.warn('[GuideManager] 无法获取砍树目标：游戏组件未准备好');
                return null;
            }
            const heroNode = manager.game.hero.node;
            if (!heroNode) {
                //console.warn('[GuideManager] 无法获取砍树目标：英雄节点不存在');
                return null;
            }
            const nearestTree = manager.tree.getNearestTree(heroNode.getWorldPosition());
            return nearestTree ? nearestTree.node : null;
        } catch (error) {
            //console.error('[GuideManager] 获取砍树目标时出错:', error);
            return null;
        }
    }

    /** 检查引导是否已完成 */
    public static isGuideFinished(step: GuideStep): boolean {
        return GuideManager.finishMap.get(step) || false;
    }

    /** 获取当前引导步骤 */
    public get currentStep(): GuideStep {
        return this._currentStep;
    }

    /** 获取当前引导配置 */
    public get currentConfig(): GuideStepConfig | null {
        return this._currentConfig;
    }

    /** 获取引导完成状态（深拷贝） */
    public static getGuideFinishState(): Map<GuideStep, boolean> {
        return new Map(GuideManager.finishMap);
    }

    /** 重置引导状态 */
    public static resetGuideState(): void {
        GuideManager.finishMap.clear();
    }

    /** 设置引导完成状态 */
    public static setGuideFinished(step: GuideStep, finished: boolean): void {
        if (finished) {
            GuideManager.finishMap.set(step, true);
        } else {
            GuideManager.finishMap.delete(step);
        }
    }

    /** 检查金币是否足够解锁 */
    public static checkGoldEnoughForUnlock(buildingType: BuildingType): boolean {
        const hero = manager.game.hero;
        const coinCount = hero ? hero.GetItemCount(ObjectType.DropItemCoin) : 0;
        const unlockItem = manager.game.unlockItemMap.get(buildingType)?.getDisplayRemainGold() || 0
        return coinCount >= unlockItem;
    }
    /** 检查木头足够解锁 */
    public static checkWoodEnoughForUnlock(buildingType: BuildingType): boolean {
        const hero = manager.game.hero;
        const woodCount = hero ? hero.GetItemCount(ObjectType.DropItemWood) : 0;
        const unlockItem = manager.game.unlockItemMap.get(buildingType)?.getDisplayRemainGold() || 0
        return woodCount >= unlockItem;
    }
    public static getEndNode(buildingType: BuildingType): Node | null {
        const unlockItem = manager.game.unlockItemMap.get(buildingType);
        if (unlockItem) {
            const hero = manager.game.hero;
            const coinCount = hero ? hero.GetItemCount(ObjectType.DropItemCoin) : 0;

            if (coinCount > 0 || GuideManager.checkGoldEnoughForUnlock(buildingType)) {
                return unlockItem.node;
            } else {
                const woodCount = hero ? hero.GetItemCount(ObjectType.DropItemWood) : 0
                 if (woodCount > 0 || GuideManager.checkWoodEnoughForUnlock(buildingType)) {
                    return unlockItem.node;
                }
                return null;
               if (manager.game.hero.GetItemCount(ObjectType.DropItemWood) > 0) {
                    return manager.game.woodStore.TriggerStateNode;
                } else {
                    if (manager.game.meatShop.CoinContainer.getCount() > 0) {
                        return manager.game.meatShop.CoinContainer.node;
                    }
                  
                    else {
                        const meatCount = hero ? hero.GetItemCount(ObjectType.DropItemMeat) : 0;
                        if (meatCount > 0) {
                            const unlockItem = manager.game.unlockItemMap.get(BuildingType.ArrowTower);
                            if (unlockItem.UnlockState == BuildUnlockState.Unlocked) {
                                return unlockItem.node;
                            } else {
                                return GuideManager.getCurrTree();
                            }
                        } else {

                            return manager.enemy.getRandomEnemy();
                        }

                    }
                }
            }
        }
        return null;
    }
}

