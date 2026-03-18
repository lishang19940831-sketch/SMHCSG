import { _decorator, Component, geometry, PhysicsSystem, Vec2, Vec3, Node, Prefab, NodePool, instantiate, Collider, ITriggerEvent, game, EPhysicsDrawFlags, ParticleSystem, tween } from 'cc';
import { UnlockItem } from '../Building/UnlockItem';
import { Hero } from '../Role/Hero';
import { Enemy, EnemyAIState } from '../Role/Enemy';
import { BuildingType, BuildUnlockState, CommonEvent, GameResult, ObjectType, PHY_GROUP, CharacterState } from '../Common/CommonEnum';
import { ShopCommon } from '../Building/ShopCommon';
import { TrainManager, TrainLevel } from '../Train/TrainManager';
import { ConveyorBelt } from '../Building/ConveyorBelt';
import super_html_playable from '../../super_html_playable';
import { SpecialCustomer } from '../Building/SpecialCustomer';
import { ProductionBuilding } from '../Building/ProductionBuilding';
import { BuildingSalesman } from '../Building/BuildingSalesman';
import { ArrowTower } from '../Building/ArrowTower';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    /** 单例实例 */
    private static _instance: GameManager | null = null;
    /** 获取单例实例 */
    public static get instance(): GameManager {
        return this._instance as GameManager;
    }
    
    /** 初始化单例，提供更安全的初始化方式 */
    public static initInstance(instance: GameManager): void {
        if (this._instance) {
            instance.node.destroy();
            return;
        }
        this._instance = instance;
    }

    @property({
        type: Hero,
        displayName: '英雄'
    })
    public hero: Hero = null!;

    @property({
        type: Node,
        displayName: '掉落层'
    })
    public dropLayer: Node = null!;

    @property({
        type: Node,
        displayName: '地图层'
    })
    public gamelayer: Node = null!;

    @property({
        type: ShopCommon,
        displayName: '木头商店'
    })
    public woodShop: ShopCommon = null!;

    @property({
        type: ShopCommon,
        displayName: '肉商店'
    })
    public meatShop: ShopCommon = null!;

    @property({
        type: ShopCommon,
        displayName: '木材仓库'
    })
    public woodStore: ShopCommon = null!;
  

    @property({
        type: Node,
        displayName: '主角最后移动位置点'
    })
    public heroLastMovePos: Node = null!;

    @property({
        type: Node,
        displayName: 'Boss位置点'
    })
    public bossPos: Node = null!;
    @property({
        type: Node,
        displayName: '摄像机开始目标点'
    })
    public cameraStartTargetPos: Node = null!;
    
        @property({
            type: Node,
            displayName: '结束节点'
        })
        public endNode: Node = null!;

    @property({type: Node, displayName: '节点1'})
    public endNode1: Node = null!;

    @property({type: Node, displayName: '节点2'})
    public endNode2: Node = null!;


    @property({type: Node, displayName: '升级特效'})
    public upgradeEffects: Node[] = [];
    
    
    @property({type: Node, displayName: 'enemyEndPosNode'})
    public enemyEndPosNode: Node = null!;

    @property({type: Node, displayName: 'targetWall'})
    public targetWallNodes: Node[] = [];

    @property({ type: TrainManager, displayName: '火车管理器' })
    public trainManager: TrainManager = null!;
    @property({ type: ConveyorBelt, displayName: '传送带节点' })
    public conveyors: ConveyorBelt = null!;


    @property({ type: SpecialCustomer, displayName: '特殊客户节点' })
    public specialCustomer: SpecialCustomer = null!;
    
    @property({ type: ProductionBuilding, displayName: 'ProductionBuilding' })
    public productionBuilding: ProductionBuilding = null!;
    
    @property({ type: ShopCommon, displayName: '大饼商店' })
    public flatbreadShop: ShopCommon = null!;

    @property({ type: BuildingSalesman, displayName: '售货员1' })
    public salesman1: BuildingSalesman = null!;
    @property({ type: BuildingSalesman, displayName: '售货员2' })
    public salesman2: BuildingSalesman = null!;
    
    @property({ type: ArrowTower, displayName: '箭塔1' })
    public arrowTower1: ArrowTower = null!;

    private _isGamePause: boolean = false;
    private _isGameStart: boolean = false;
    private _gameResult: GameResult = GameResult.None;

    public get isGamePause(): boolean {
        return this._isGamePause;
    }

    public set isGamePause(value: boolean) {
        this._isGamePause = value;
    }

    public get isGameStart(): boolean {
        return this._isGameStart;
    }

    public set isGameStart(value: boolean) {
        if(this._isGameStart !== true && value === true) {
       //console.log("游戏开始");
            if(!app.audio.getMusicSwitch()){
                app.audio.setMusicSwitch(true);
            }
            if(!app.audio.getEffectSwitch()){
                app.audio.setEffectSwitch(true);
            }
            app.audio.playMusic('resources/audio/休闲BGM');
         
         
            
        }
        this._isGameStart = value;
    }

    public get gameResult(): GameResult {
        return this._gameResult;
    }

    public set gameResult(value: GameResult) {
        this._gameResult = value;
        if(value === GameResult.Win){
            this.isGamePause = true;
            app.event.emit(CommonEvent.ShowWinUI);
        }else if(value === GameResult.Fail){
            this.isGamePause = true;
            app.event.emit(CommonEvent.ShowFailUI);
        }
    }

    private _unlockItemMap: Map<string, UnlockItem> = new Map();

    /** 失败次数计数器 */
    private _failCount: number = 0;

    /** 英雄是否在家中 */
    private _heroAtHome: boolean = false;
    public get heroAtHome(): boolean {
        return this._heroAtHome;
    }

    public get unlockItemMap() {
        return this._unlockItemMap;
    }

    /** 获取当前失败次数 */
    public get failCount(): number {
        return this._failCount;
    }

    /** 重置失败次数 */
    public resetFailCount(): void {
        this._failCount = 0;
   //console.log('失败次数已重置');
    }

    protected onLoad(): void {


        //@ts-ignore
        let androidUrl = "https://play.google.com/store/apps/details?id=com.miner.and.usc";
        let iosUrl = 'https://apps.apple.com/us/app/subsea-survival/id6751192772';
        super_html_playable.download = ()=>{
        try {
            const isIos = /iphone ipad|ipod macintosh/i.test(window.navigator.userAgent.toLowerCase());
            //@ts-ignore
            const gameUrl = isIos ? super_html_playable.appstore_url : super_html_playable.google_play_url;
            //保证客户/制片在本地可以看到跳转链接是否正确
            // window.open(gameUrl)
        } finally {
        //调用插件的的download()
            // super_html_playable.download();
        }
    }
        //@ts-ignore
        super_html_playable.set_google_play_url(androidUrl)
        //@ts-ignore
        super_html_playable.set_app_store_url(iosUrl);
        app.audio.setMusicSwitch(false)
        app.audio.setEffectSwitch(false)
        // 使用改进的单例初始化方法
        GameManager.initInstance(this);
        if (GameManager._instance !== this) return;
        
        // 注册事件监听
        this.registerEvents();

        // this.conveyors.hideAndDisable();
       

        game.frameRate = 60;

        // PhysicsSystem.instance.debugDrawFlags = EPhysicsDrawFlags.WIRE_FRAME
    }

    protected start(): void {
        this.hero.setMovementEnabled(false);
        manager.cameraFollow.setTarget(null);
        manager.cameraFollow.moveToTarget(this.cameraStartTargetPos,1,()=>{
            manager.cameraFollow.moveToTarget(this.hero.node,1,()=>{
                manager.cameraFollow.setTarget(this.hero.node);
                this.hero.setMovementEnabled(true);
            });
        },1);
    }

    public showConveyors(): void {
        
        this.conveyors.showAndEnable();
    
    }

    protected onDestroy(): void {
        if (GameManager._instance === this) {
            GameManager._instance = null;
        }

        this.unregisterEvents();
    }
    
    // 注册事件的独立方法
    private registerEvents(): void {
        app.event.on(CommonEvent.joystickInput, this.onJoystickInput, this);
        app.event.on(CommonEvent.GameWin, this.onGameWin, this);
        app.event.on(CommonEvent.GameFail, this.onGameFail, this);
        app.event.on(CommonEvent.UnlockItem, this.onUnlockItem, this);
        app.event.on(CommonEvent.UpdateHeroItemCount, this.onUpdateHeroItemCount, this);
    }

    private onUpdateHeroItemCount(data: {type: ObjectType, count: number}): void {
        switch(data.type){
            case ObjectType.DropItemCoin:
                // if(this.unlockItemMap.get(BuildingType.Lumberjack)?.unlockState == BuildUnlockState.NoActive){
                //     app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.Lumberjack, state: BuildUnlockState.Active});
                // }
                break;
            default:
                break;
        }
    }

    private onGameWin(): void {
        // 游戏胜利时重置失败计数
        this._failCount = 0;
   //console.log('游戏胜利，重置失败计数');
        this.gameResult = GameResult.Win;
    }

    private onGameFail(): void {
        this._failCount++;
   //console.log(`游戏失败，当前失败次数: ${this._failCount}`);
        this.gameResult = GameResult.Fail;
    }

    private onUnlockItem(type: BuildingType): void {
   //console.log("[GameManager] onUnlockItem", type);
        switch (type) {
            case BuildingType.Lumberjack:
                this.upgradeEffects[3].getComponentsInChildren(ParticleSystem).forEach(particle => {
                    particle.play();
                });
                app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.Turret, state: BuildUnlockState.Active});
                break;
            case BuildingType.Lumberjack2:
                this.upgradeEffects[4].getComponentsInChildren(ParticleSystem).forEach(particle => {
                    particle.play();
                });
                // app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.MeatShop, state: BuildUnlockState.Active});
                break;
            case BuildingType.MeatShop:
                // this.isShowOut = true;
                // this.meatShop.ShowUnlock(()=>{
                //     // this.scheduleOnce(()=>{
                //     //     app.event.emit(CommonEvent.UnlockItem, BuildingType.Wall);
                //     // }, 0.4);
                //     app.event.emit(CommonEvent.ShowOut, {cb: ()=>{
                //         this.isShowOut = false;
                //     }});

                //     manager.enemy.startEnemySpawn();
                //     app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.ArrowTower, state: BuildUnlockState.Active});
                // });
                break;
            case BuildingType.ArrowTower:
                
                // app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.ArrowTower1, state: BuildUnlockState.Active});
                // //hero解锁 自动砍树s
                // // this.hero.enableAutoChopTrees = true;
                // this.upgradeEffects[0].getComponentsInChildren(ParticleSystem).forEach(particle => {
                //     particle.play();
                // });
                // this.upgradeEffects[1].getComponentsInChildren(ParticleSystem).forEach(particle => {
                //     particle.play();
                // });
                // this.scheduleOnce(() => {
                //     this.upgradeEffects[0].active = false;
                //     this.upgradeEffects[1].active = false;
                // }, 2);

                // app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.ArrowTower2, state: BuildUnlockState.Active});
                break;
            case BuildingType.ArrowTower1:
                // this.upgradeEffects[2].getComponentsInChildren(ParticleSystem).forEach(particle => {
                //     particle.play();
                // });
                // this.scheduleOnce(() => {
                //     this.upgradeEffects[2].active = false;
                // }, 2);
                // app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.Lumberjack, state: BuildUnlockState.Active});
                // break;
            case BuildingType.ArrowTower2:
                // let ArrowTowerUnlock =this.unlockItemMap.get(BuildingType.ArrowTower)?.unlockState == BuildUnlockState.Unlocked;
                // let ArrowTower1Unlock =this.unlockItemMap.get(BuildingType.ArrowTower1)?.unlockState == BuildUnlockState.Unlocked;
                // let ArrowTower2Unlock =this.unlockItemMap.get(BuildingType.ArrowTower2)?.unlockState == BuildUnlockState.Unlocked;
                // if(ArrowTower1Unlock && ArrowTower2Unlock){
                //     app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.Turret, state: BuildUnlockState.Active});
                // }
                break;
            case BuildingType.ArrowTower3:
                break;
            case BuildingType.EndGame:
                app.event.emit(CommonEvent.ShowOver);
                this.isShowOver = true;
                manager.enemy.endGame();
                //镜头平滑拉高
                manager.cameraFollow.bossSpawn(this.hero.node);
                //特殊客户移动到目标点
                this.specialCustomer.moveToTarget();
                break;
            case BuildingType.Turret:
                app.event.emit(CommonEvent.ShowOver);
                this.isShowOver = true;
                this.bossPos.active = true;
                this.endNode.active = true;
                this.endNode1.active = false;
                this.endNode2.active = true;

                this.endNode.children.forEach((e,i)=>{
                    if(e && this.targetWallNodes[i]){
                        // 获取目标位置 
                        let targetPos = this.targetWallNodes[i].getWorldPosition().clone();
                        let startPos = e.getWorldPosition().clone();
                        
                        // 目标位置 Z 轴随机偏移 (-1.5 到 1.5)
                        targetPos.z += (Math.random() - 0.5) * 3;
                        
                        // 计算朝向
                        let direction = new Vec3();
                        Vec3.subtract(direction, targetPos, startPos);
                        direction.y = 0; // 只考虑水平方向
                        direction.normalize();
                        
                        // 计算 Y 轴旋转角度（弧度转角度）
                        let angle = Math.atan2(direction.x, direction.z) * (180 / Math.PI);
                        angle+=180;
                        // 设置朝向
                        e.setWorldRotationFromEuler(0, angle, 0);
                        
                        // 使用 tween 移动到目标点
                        tween(e)
                            .to(5, { 
                                worldPosition: targetPos 
                            }, {
                                easing: 'linear'
                            })
                            .call(() => {
                                // 移动完成
                            })
                            .start();
                    }
                })
                manager.cameraFollow.setTarget(null)
                //平滑移动到目标点
                manager.cameraFollow.moveToTarget(this.bossPos,1,()=>{
                    //平滑移动镜头到目标点
                    manager.cameraFollow.moveToTarget(this.hero.node,1,()=>{
                       //平滑拉高镜头
                       manager.cameraFollow.bossSpawn(this.hero.node);
                     
                    },0.3);
                },1.5);
                // 让hero移动到heroLastMovePos
                // if (this.heroLastMovePos) {
                //     this.hero.movementComponent.moveToWorldPosition(this.heroLastMovePos.getWorldPosition(),()=>{
                //         this.hero.node.setRotationFromEuler(0,0,0);
                //     });
                // }

                break;
                
            case BuildingType.Train1:   

                
                this.trainManager.upgradeTo(TrainLevel.Lv2);
                this.trainManager.expandTrackPhase2();
                
                app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.ArrowTower, state: BuildUnlockState.Active});
                app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.ArrowTower1, state: BuildUnlockState.Active});
                app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.ArrowTower2, state: BuildUnlockState.Active});
                app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.ArrowTower3, state: BuildUnlockState.Active});
                manager.enemy.startEnemySpawn();
                break;
            case BuildingType.Train2:   
                this.trainManager.upgradeTo(TrainLevel.Lv3);
                //如果火车等级到3并且4个箭塔全部解锁 则激活endGame类型的 unlockitem
                if(this.trainManager.getIsAllArrowTowersUnlocked()){
                    app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.EndGame, state: BuildUnlockState.Active});
                }
                break;
            default:
                break;
        }
    }

    private isShowOver: boolean = false;
    private isShowOut: boolean = false;

    private onJoystickInput(inputVector: Vec2): void {
        if(this.isGamePause || this.isShowOver || this.isShowOut){
            this.hero.move(Vec3.ZERO);
            return;
        }
        if(!this.isGameStart){
            this.isGameStart = true;
        }

        // this.isGameStart = true;
        // 将2D输入转换为3D移动方向，Y轴映射到Z轴
        const moveDirection = new Vec3(inputVector.x, 0, -inputVector.y);
        this.hero.move(moveDirection);
    }
    
    // 注销事件的独立方法
    private unregisterEvents(): void {
        app.event.offAllByTarget(this);
    }


    // #region 公共接口方法

    /**
     * 获取范围内的士兵（排除在家中的士兵）
     * @param position 中心位置
     * @param searchRadius 搜索半径
     * @returns 范围内的士兵数组，按距离排序，不包含在家中的士兵
     */
    public getRangeSolder(position: Vec3, searchRadius: number): { node: Node; squaredDistance: number }[] {
        const rangeSolders: { node: Node; squaredDistance: number }[] = [];
        // 使用平方距离来优化性能，避免开平方根运算
        const rangeSquared = searchRadius * searchRadius;

        if(this.hero && this.hero.node.isValid && !this.hero.healthComponent.isDead){
            // 排除在家中的英雄
            if (!this._heroAtHome) {
                const squaredDistance = Vec3.squaredDistance(position, this.hero.node.getWorldPosition());
                if(squaredDistance <= rangeSquared){
                    rangeSolders.push({
                        node: this.hero.node,
                        squaredDistance: squaredDistance
                    });
                };
            }
        }
        
        return rangeSolders;
    }
    
    /**
     * 使用射线检测计算地面高度
     * @param position 当前位置
     * @returns 计算后的地面高度
     */
    public calculateGroundHeight(position: Vec3): number {
        // 创建从上方向下的射线进行地面检测
        const ray = new geometry.Ray();
        const rayOrigin = new Vec3(position.x, position.y + 20, position.z); // 从高处向下射线
        const rayDir = new Vec3(0, -1, 0); // 向下的方向
        ray.o = rayOrigin;
        ray.d = rayDir;
        
        let groundHeight = -100; // 默认地面高度
        
        // 执行射线检测
        if (PhysicsSystem.instance.raycast(ray)) {
            const raycastResults = PhysicsSystem.instance.raycastResults;
            // 如果检测到碰撞，使用碰撞点的高度
            if (raycastResults.length > 0) {
                for (const result of raycastResults) {
                    // const result = raycastResults[0];
                    const collider = result.collider;
                    if (collider.getGroup() == PHY_GROUP.GROUND) {
                        let h = result.hitPoint.y;
                        if(h > groundHeight){
                            groundHeight = h;
                        }
                    }
                }
            }
        }
        
        return groundHeight > -100 ? groundHeight : 5;
    }

    public isCanHunted(node: Node): boolean {
        if(this.hero && this.hero.node === node){
            // 英雄在家中或正在充电时都不能被攻击
            return !this._heroAtHome;
        }

        return true;
    }


    public calculateSolderCount(origin: Vec3, target: Vec3, attackMask: PHY_GROUP[]): Vec3 | null {
        // 创建射线计算攻击位置
        const ray = new geometry.Ray();
        const rayOrigin = origin;
        const targetPos = target;
        
        // 计算射线方向（从Boss到目标）
        const direction = Vec3.subtract(new Vec3(), targetPos, rayOrigin);
        direction.normalize();
        
        // 设置射线起点和方向
        ray.o.set(rayOrigin);
        ray.d.set(direction);
        
        // 执行射线检测
        const mask = attackMask.reduce((acc, curr) => acc | curr, 0);
        const maxDistance = Vec3.distance(rayOrigin, targetPos);  // 设置最大检测距离为目标距离
        const queryTrigger = false;  // 不检测触发器
        
        const hasHit = PhysicsSystem.instance.raycast(ray, mask, maxDistance, queryTrigger);
        if (hasHit) {
            const raycastResults = PhysicsSystem.instance.raycastResults;
            for (const result of raycastResults) {
                const collider = result.collider;
                // console.log('collider.getGroup()', collider.getGroup());
                if (attackMask.indexOf(collider.getGroup()) !== -1) {
                    // console.log('射线碰撞到:', result.collider.node.name);
                    return result.hitPoint;
                }
            }
        }
        return null;
    }

    public onDownload(): void {
        // SuperPackage.Instance.Download();
        super_html_playable.download2();
    }

    public onDownloadTCE(): void {
        // SuperPackage.Instance.DownloadTCE(); 
        super_html_playable.download2();
    }

    public onRetry(): void {
        // 如果是第二次失败，则直接跳转下载
        if (this._failCount >= 2) {
       //console.log('第二次失败，跳转下载');
            this.onDownload();
            return;
        }
   //console.log(`重试游戏，当前失败次数: ${this._failCount}`);
        this.reset();
    }

    private reset(): void {
        this.gameResult = GameResult.None;
        this.isGamePause = false;
        this.hero.node.setWorldPosition(0,0,0);
        this.hero.healthComponent.restoreAllHealth();
        this.hero.reset();

        this.unlockItemMap.forEach(item => {
            item.reset();
        });

        this.woodShop.reset();
        this.meatShop.reset();
        manager.wall.reset();
        manager.enemy.reset();
        manager.effect.reset();
        manager.drop.reset();

        app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.Lumberjack, state: BuildUnlockState.Active});

        app.event.emit(CommonEvent.OnReset);
    }
}


