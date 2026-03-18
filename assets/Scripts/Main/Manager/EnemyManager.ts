import { _decorator, Component, Node, director, Vec3, Prefab, instantiate, NodePool, geometry, PhysicsSystem } from 'cc';
import { BuildingType, BuildUnlockState, CommonEvent, PHY_GROUP } from '../Common/CommonEnum';
import { HealthComponent } from '../Components/HealthComponent';
import { Enemy } from '../Role/Enemy';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
    /** 单例实例 */
    private static _instance: EnemyManager | null = null;
    
    /** 获取单例实例 */
    public static get instance(): EnemyManager {
        if (!this._instance) {
       //console.warn('EnemyManager 实例不存在 动态创建');
            // 动态创建节点并添加组件
            const node = new Node('EnemyManager');
            this._instance = node.addComponent(EnemyManager);
            // 添加到场景
            director.getScene()?.addChild(node);
        }
        return this._instance as EnemyManager;
    }

    @property({type: Prefab, displayName: 'Enemy预制体'})
    private enemyPrefab: Prefab = null!;

    @property({type: Prefab, displayName: '大Enemy预制体'})
    private bigEnemyPrefab: Prefab = null!;

    @property({displayName: 'Enemy保持数量'})
    private maxEnemyCount: number = 8;

    @property({type: Node, displayName: '敌人生成点Box'})
    private spawnBoxNode: Node = null!;
    
    @property({displayName: '游戏开始时自动生成'})
    private autoSpawnOnStart: boolean = true;

    @property({displayName: '是否保持敌人数量'})
    public isKeepEnemyNum: boolean = true;

    @property({displayName: '大Enemy生成概率(%)', range: [0, 100, 1]})
    private bigEnemySpawnRate: number = 10;

    @property({displayName: "enemytargethome", type: Node})
    public  wallTargetHome: Node[] = [];

    // ========== 双向刷怪 & 双排墙绑定 ==========

    /** C方向生成点Box（对应A排墙） */
    @property({ type: Node, displayName: 'C方向生成点Box' })
    private spawnBoxNodeC: Node = null!;

    /** D方向生成点Box（对应B排墙） */
    @property({ type: Node, displayName: 'D方向生成点Box' })
    private spawnBoxNodeD: Node = null!;

    /** A排墙目标节点列表（C方向怪物攻击） */
    @property({ type: Node, displayName: 'A排墙目标节点', tooltip: 'C方向刷出的怪物只能攻击这些节点' })
    private wallGroupA: Node[] = [];

    /** B排墙目标节点列表（D方向怪物攻击） */
    @property({ type: Node, displayName: 'B排墙目标节点', tooltip: 'D方向刷出的怪物只能攻击这些节点' })
    private wallGroupB: Node[] = [];

    /** A排墙轮询索引（C方向敌人轮流分配） */
    private _wallGroupAIndex: number = 0;
    /** B排墙轮询索引（D方向敌人轮流分配） */
    private _wallGroupBIndex: number = 0;

    /** 所有敌人节点列表 */
    private _enemies: Node[] = [];

    /**
     * 记录每个 enemy 节点对应的专属墙壁目标组（uuid → wallGroup）
     * 当 enemy.targetNode 失效时（墙段被打死），从对应组里重新挑最近目标
     */
    private _enemyWallGroupMap: Map<string, Node[]> = new Map();

    /** Enemy对象池 */
    private _enemyPool: NodePool = new NodePool();

    /** 大Enemy对象池 */
    private _bigEnemyPool: NodePool = new NodePool();

    /** 是否开始管理enemies */
    private _isManagingEnemies: boolean = false;

    /** 游戏结束逻辑是否已执行（防止重复调用） */
    private _gameOverExecuted: boolean = false;

    /** 是否为单塔模式 */
    private _isSingleTowerMode: boolean = true;

    private _killedEnemyCount: number = 0;
    onLoad() {
        // 单例检查
        if (EnemyManager._instance) {
            this.node.destroy();
            return;
        }
        EnemyManager._instance = this;

        this.registerEvents();
        this.initEnemyPool();
        
        // 如果设置了自动开始，则延迟开始生成敌人
        if (this.autoSpawnOnStart) {
            this.scheduleOnce(() => {
                this.startEnemySpawn();
            }, 1); // 延迟1秒开始
        }
    }

    protected onDestroy(): void {
        if (EnemyManager._instance === this) {
            EnemyManager._instance = null;
        }
        
        this._enemies = [];
        this.clearEnemyPool();
        this.unregisterEvents();
    }

    /**
     * 初始化Enemy对象池
     */
    private initEnemyPool(): void {
        if (!this.enemyPrefab) {
       //console.warn('Enemy预制体未设置，无法初始化对象池');
            return;
        }

        // 预先创建一些Enemy节点到对象池
        for (let i = 0; i < 5; i++) {
            const enemyNode = instantiate(this.enemyPrefab);
            enemyNode.active = false;
            this._enemyPool.put(enemyNode);
        }
        
        // 初始化大Enemy对象池
        if (this.bigEnemyPrefab) {
            for (let i = 0; i < 3; i++) {
                const bigEnemyNode = instantiate(this.bigEnemyPrefab);
                bigEnemyNode.active = false;
                this._bigEnemyPool.put(bigEnemyNode);
            }
       //console.log('Enemy和大Enemy对象池初始化完成');
        } else {
       //console.warn('大Enemy预制体未设置，仅初始化普通Enemy对象池');
       //console.log('Enemy对象池初始化完成');
        }
    }

    /**
     * 清理Enemy对象池
     */
    private clearEnemyPool(): void {
        this._enemyPool.clear();
        this._bigEnemyPool.clear();
    }

    /**
     * 从对象池获取Enemy节点
     */
    private getEnemyFromPool(): Node | null {
        let enemyNode: Node | null = null;
        
        if (this._enemyPool.size() > 0) {
            enemyNode = this._enemyPool.get();
        } else if (this.enemyPrefab) {
            enemyNode = instantiate(this.enemyPrefab);
       //console.log('Enemy对象池已空，动态创建新Enemy');
        }
        
        if (enemyNode) {
            enemyNode.active = true;
            // 重置Enemy状态
            const enemy = enemyNode.getComponent(Enemy);
            if (enemy) {
                enemy.reset();
            }
        }
        
        return enemyNode;
    }
    /**获取随机enmey */
    public getRandomEnemy(): Node {

        return this._enemies[Math.floor(Math.random() * this._enemies.length)];
    }
    /**统计击杀enemy数量 */
    public getKilledEnemyCount(): number {
        return this._killedEnemyCount;
    }
    /**
     * 回收Enemy节点到对象池
     */
    private putEnemyToPool(enemyNode: Node): void {
        if (!enemyNode || !enemyNode.isValid) {
            return;
        }

        // 停用节点
        enemyNode.active = false;
        enemyNode.removeFromParent();
        
        // 放回对象池
        this._enemyPool.put(enemyNode);
    }

    /**
     * 从对象池获取大Enemy节点
     * @returns 大Enemy节点或null
     */
    private getBigEnemyFromPool(): Node | null {
        let bigEnemyNode: Node | null = null;
        
        if (this._bigEnemyPool.size() > 0) {
            bigEnemyNode = this._bigEnemyPool.get();
        } else if (this.bigEnemyPrefab) {
            bigEnemyNode = instantiate(this.bigEnemyPrefab);
       //console.log('大Enemy对象池已空，动态创建新大Enemy');
        }
        
        if (bigEnemyNode) {
            bigEnemyNode.active = true;
            // 重置Enemy状态
            const enemy = bigEnemyNode.getComponent(Enemy);
            if (enemy) {
                enemy.reset();
            }
        }
        
        return bigEnemyNode;
    }

    /**
     * 回收大Enemy节点到对象池
     * @param bigEnemyNode 大Enemy节点
     */
    private putBigEnemyToPool(bigEnemyNode: Node): void {
        if (!bigEnemyNode || !bigEnemyNode.isValid) {
            return;
        }

        // 停用节点
        bigEnemyNode.active = false;
        bigEnemyNode.removeFromParent();
        
        // 放回对象池
        this._bigEnemyPool.put(bigEnemyNode);
    }

    private registerEvents(): void {
        app.event.on(CommonEvent.EnemyDeadFinish, this.onEnemyDead, this);
        app.event.on(CommonEvent.UnlockItem, this.onUnlockItem, this);
    }

    /**
     * 检测当前是否为单塔模式
     * 单塔模式：ArrowTower1和ArrowTower2都未解锁
     * 多塔模式：ArrowTower1或ArrowTower2任意一个已解锁
     */
    private checkTowerMode(): boolean {
        const arrowTower1Unlocked = manager.game.unlockItemMap.get(BuildingType.ArrowTower)?.unlockState === BuildUnlockState.Unlocked;
        const arrowTower2Unlocked = manager.game.unlockItemMap.get(BuildingType.ArrowTower1)?.unlockState === BuildUnlockState.Unlocked;
        
        // 如果两个箭塔都未解锁，则为单塔模式
        return false;//!arrowTower1Unlocked && !arrowTower2Unlocked;
    }

    private unregisterEvents(): void {
        app.event.offAllByTarget(this);
    }

    /**
     * 开始敌人生成
     */
    public startEnemySpawn(): void {
        // console.log('开始生成Enemy军队');
        this._isManagingEnemies = true;
        
        // 重置游戏结束标志，允许新一轮游戏触发结束逻辑
        this._gameOverExecuted = false;
        
        // 检测当前塔模式并设置相应参数
        this._isSingleTowerMode = this.checkTowerMode();
        if (this._isSingleTowerMode) {
            // 单塔模式：5只一波
            this.isKeepEnemyNum = true;
       //console.log('单塔模式：5只熊一波');
        } else {
            // 多塔模式：8只，持续补充
            this.isKeepEnemyNum = true;
       //console.log('多塔模式：持续保持数量');
        }
        
        this.spawnEnemyArmy();
    }

    /**
     * 智能回收Enemy节点到对应的对象池
     * @param enemyNode Enemy节点
     */
    private putEnemyToCorrectPool(enemyNode: Node): void {
        if (!enemyNode || !enemyNode.isValid) {
            return;
        }

        // 通过预制体名称或其他标识判断是普通Enemy还是大Enemy
        // 这里假设大Enemy预制体名称包含"big"或者有特殊标识
        const nodeName = enemyNode.name.toLowerCase();
        const isBigEnemy = nodeName.includes('big') || nodeName.includes('大');
        
        if (isBigEnemy) {
            this.putBigEnemyToPool(enemyNode);
        } else {
            this.putEnemyToPool(enemyNode);
        }
    }

    /**
     * Enemy死亡回调
     */
    private onEnemyDead(enemyNode: Node): void {
        if (!this._isManagingEnemies) return;
        // if(this._killedEnemyCount == 0){
            app.event.emit(CommonEvent.KillEnemy);
        // }
        this._killedEnemyCount++;

        // 从列表中移除
        this.removeEnemy(enemyNode);

        // 清除该 enemy 的墙壁目标组记录
        this._enemyWallGroupMap.delete(enemyNode.uuid);
        
        // 智能回收到对应的对应池
        this.putEnemyToCorrectPool(enemyNode);
        
        if(this.isKeepEnemyNum){
            // 根据模式决定刷新逻辑
            if (this._isSingleTowerMode) {
                // 单塔模式：当所有敌人都死亡后，生成新一波
                // 不立即补充，等待一波结束
                let needCount = this.maxEnemyCount - this._enemies.length;
                if (needCount >= 5) {
               //console.log('单塔模式：一波结束，生成新一波');
                    this.scheduleOnce(() => {
                        this.spawnEnemyArmy1();
                    }); // 延迟1秒后生成下一波
                }
            } else {
                // 多塔模式：立即补充一个敌人维持数量
                this.spawnSingleEnemy();
            }
        }
    }

    /**
     * 生成Enemy军队（单塔模式补充一波5只）
     */
    private spawnEnemyArmy1(): void {
        for (let i = 0; i < 5; i++) {
            this.spawnEnemyDirect();
        }
    }

    /**
     * 生成Enemy军队（初始批量生成）
     * 若配置了双向生成点则C/D方向各生成一半，否则走旧逻辑
     */
    private spawnEnemyArmy(): void {
        const useDirectional = this._hasDirectionalSpawn();
        for (let i = 0; i < this.maxEnemyCount; i++) {
            this.scheduleOnce(() => {
                if (useDirectional) {
                    // 奇偶分流：偶数批次走C→A，奇数批次走D→B
                    this.spawnEnemyDirectional(i % 2 === 0 ? 'C' : 'D');
                } else {
                    this.spawnEnemyDirect();
                }
            }, i * 0.6);
        }
    }

    /**
     * 生成单个Enemy（用于多塔模式维持数量）
     * 若配置了双向生成点则C/D方向轮流补充
     */
    private spawnSingleEnemy(): void {
        if (!this._isManagingEnemies || this._enemies.length >= this.maxEnemyCount) {
            return;
        }
        if (this._hasDirectionalSpawn()) {
            // 随机选择C或D方向补充
            this.spawnEnemyDirectional(Math.random() < 0.5 ? 'C' : 'D');
        } else {
            this.spawnEnemyDirect();
        }
    }

    /**
     * 判断是否已配置双向生成点
     */
    private _hasDirectionalSpawn(): boolean {
        return !!(this.spawnBoxNodeC && this.spawnBoxNodeD);
    }

    /**
     * 按比例随机获取Enemy节点（普通Enemy或大Enemy）
     * @returns Enemy节点或null
     */
    private getRandomEnemyFromPool(): Node | null {
        const randomValue = Math.random() * 100;
        if (randomValue < this.bigEnemySpawnRate && this.bigEnemyPrefab) {
            const bigEnemyNode = this.getBigEnemyFromPool();
            if (bigEnemyNode) {
                return bigEnemyNode;
            }
        }
        return this.getEnemyFromPool();
    }

    /**
     * 方向性生成Enemy（核心新逻辑）
     * C方向生成 → 只攻击A排墙；D方向生成 → 只攻击B排墙。
     * 目标选取在 EnemyManager 内完成后直接写入 enemy.targetNode，Enemy 本身无需感知分组概念。
     * @param direction 'C' 对应A排墙，'D' 对应B排墙
     */
    private spawnEnemyDirectional(direction: 'C' | 'D'): void {
        if (!this._isManagingEnemies || this._enemies.length >= this.maxEnemyCount) {
            return;
        }

        const enemyNode = this.getRandomEnemyFromPool();
        if (!enemyNode) {
            return;
        }

        // 根据方向选择对应的生成Box和墙壁目标组
        const spawnBox  = direction === 'C' ? this.spawnBoxNodeC : this.spawnBoxNodeD;
        const wallGroup = direction === 'C' ? this.wallGroupA     : this.wallGroupB;

        // 从对应方向的Box内随机生成位置
        const spawnPos = this._generatePositionFromBox(spawnBox);

        enemyNode.setParent(this.node);
        enemyNode.setWorldPosition(spawnPos);
        this.addEnemy(enemyNode);

        const enemy = enemyNode.getComponent(Enemy);
        if (enemy) {
            // 轮询分配：每个敌人依次分配不同的围栏目标，避免所有敌人扎堆打同一个围栏
            enemy.targetNode = this._pickRoundRobinNode(direction, wallGroup);

            // 记录该 enemy 对应的墙壁目标组，供 targetNode 失效时重新选取
            this._enemyWallGroupMap.set(enemyNode.uuid, wallGroup);

            const randomTime = Math.random() * 0.3;
            this.scheduleOnce(() => {
                enemy.onSpawnComplete(spawnPos);
            }, randomTime);
        }
    }

    /**
     * 轮询分配目标节点：跳过已死亡/失效的节点，保证每个围栏被均匀攻击
     * @param direction 'C' 使用A组索引，'D' 使用B组索引
     * @param nodes 候选节点列表
     * @returns 分配到的节点，全部失效时返回 null
     */
    private _pickRoundRobinNode(direction: 'C' | 'D', nodes: Node[]): Node | null {
        if (!nodes || nodes.length === 0) return null;

        const isA = direction === 'C';
        const total = nodes.length;

        // 最多轮询一圈，找到第一个有效节点
        for (let i = 0; i < total; i++) {
            const idx = isA
                ? this._wallGroupAIndex % total
                : this._wallGroupBIndex % total;

            // 推进索引
            if (isA) { this._wallGroupAIndex = (this._wallGroupAIndex + 1) % total; }
            else      { this._wallGroupBIndex = (this._wallGroupBIndex + 1) % total; }

            const node = nodes[idx];
            if (node && node.isValid) {
                return node;
            }
        }
        return null;
    }

    /**
     * 从节点列表中选出距离 origin 最近的节点（XZ平面距离）
     * @param origin 参考位置
     * @param nodes  候选节点列表
     * @returns 最近节点，列表为空时返回 null
     */
    private _pickNearestNode(origin: Vec3, nodes: Node[]): Node | null {
        if (!nodes || nodes.length === 0) return null;

        let nearest: Node | null = null;
        let nearestSqDist = Number.MAX_VALUE;

        for (const node of nodes) {
            if (!node || !node.isValid) continue;
            const p = node.getWorldPosition();
            const dx = p.x - origin.x;
            const dz = p.z - origin.z;
            const sqDist = dx * dx + dz * dz;
            if (sqDist < nearestSqDist) {
                nearestSqDist = sqDist;
                nearest = node;
            }
        }
        return nearest;
    }

    /**
     * 旧版直接生成（未配置双向生成点时的兜底逻辑）
     */
    private spawnEnemyDirect(): void {
        if (!this._isManagingEnemies || this._enemies.length >= this.maxEnemyCount) {
            return;
        }

        const enemyNode = this.getRandomEnemyFromPool();
        if (!enemyNode) {
       //console.warn('无法从对象池获取Enemy节点');
            return;
        }

        const targetPos = this.generateSafeSpawnPosition();

        enemyNode.setParent(this.node);
        enemyNode.setWorldPosition(targetPos);
        this.addEnemy(enemyNode);

        const enemy = enemyNode.getComponent(Enemy);
        if (enemy) {
            const randomTime = Math.random() * 0.3;
            this.scheduleOnce(() => {
                enemy.onSpawnComplete(targetPos);
            }, randomTime);
        }
    }

    /**
     * 设置敌人随机缩放和对应生命值
     * @param enemyNode 敌人节点
     */
    private setRandomScaleAndHealth(enemyNode: Node): void {
        if (!enemyNode || !enemyNode.isValid) return;
        
        // 随机缩放值：0.8到1.2
        const minScale = 0.9;
        const maxScale = 1;
        const randomScale = minScale + Math.random() * (maxScale - minScale);
        
        // 设置节点缩放
        enemyNode.setScale(randomScale, randomScale, randomScale);
        
        // 根据缩放值计算对应生命值：160到240
        const minHealth = 140;
        const maxHealth = 260;
        // 缩放值与生命值成正比
        const scaleRatio = (randomScale - minScale) / (maxScale - minScale); // 0到1的比例
        const calculatedHealth = Math.round(minHealth + scaleRatio * (maxHealth - minHealth));
        
        // 设置生命值
        const healthComponent = enemyNode.getComponent(HealthComponent);
        if (healthComponent) {
            healthComponent.setMaxHealth(calculatedHealth);
            healthComponent.setCurrentHealth(calculatedHealth);
        }
        
        // 调试日志
        // console.log(`敌人缩放: ${randomScale.toFixed(2)}, 生命值: ${calculatedHealth}`);
    }

    /**
     * 在指定Box节点范围内随机生成一个世界坐标位置（考虑Box旋转）
     * @param boxNode 生成区域Box节点
     */
    private _generatePositionFromBox(boxNode: Node): Vec3 {
        const boxWorldPos = boxNode.getWorldPosition();
        const boxWorldScale = boxNode.getWorldScale();
        const boxWorldRotation = boxNode.getWorldRotation();

        const localX = (Math.random() - 0.5) * boxWorldScale.x;
        const localY = 0;
        const localZ = (Math.random() - 0.5) * boxWorldScale.z;
        const localPos = new Vec3(localX, localY, localZ);

        const rotatedPos = new Vec3();
        Vec3.transformQuat(rotatedPos, localPos, boxWorldRotation);

        const finalPos = new Vec3();
        Vec3.add(finalPos, boxWorldPos, rotatedPos);
        return finalPos;
    }

    /**
     * 在旧版生成点Box范围内随机生成位置（兜底，兼容旧配置）
     */
    private generateSafeSpawnPosition(): Vec3 {
        if (!this.spawnBoxNode) {
       //console.warn('spawnBoxNode未设置，使用默认位置');
        }
        return this._generatePositionFromBox(this.spawnBoxNode);
    }

    /**
     * 检测位置是否安全（不在家触发器范围内）
     */
    public isPositionSafeFromHome(position: Vec3): boolean {
        // 创建从上方向下的射线进行检测
        const ray = new geometry.Ray();
        const rayOrigin = new Vec3(position.x, position.y + 20, position.z); // 从高处向下射线
        const rayDir = new Vec3(0, -1, 0); // 向下的方向
        ray.o = rayOrigin;
        ray.d = rayDir;
        
        // 执行射线检测，检测HOME组
        const maxDistance = 30; // 最大检测距离
        const queryTrigger = true; // 检测触发器
        
        const hasHit = PhysicsSystem.instance.raycast(ray, PHY_GROUP.HOME, maxDistance, queryTrigger);
        if (hasHit) {
            const raycastResults = PhysicsSystem.instance.raycastResults;
            for (const result of raycastResults) {
                const collider = result.collider;
                if (collider.getGroup() === PHY_GROUP.HOME) {
                    // console.log(`检测到家触发器，位置不安全: ${position}`);
                    return false; // 检测到家触发器，位置不安全
                }
            }
        }
        
        return true; // 位置安全
    }

     /**
     * 检测位置是否安全（不在家触发器范围内）
     */
    public isPositionSafeFromSafe(position: Vec3): boolean {
        // 创建从上方向下的射线进行检测
        const ray = new geometry.Ray();
        const rayOrigin = new Vec3(position.x, position.y + 20, position.z); // 从高处向下射线
        const rayDir = new Vec3(0, -1, 0); // 向下的方向
        ray.o = rayOrigin;
        ray.d = rayDir;
        
        // 执行射线检测，检测HOME组
        const maxDistance = 30; // 最大检测距离
        const queryTrigger = true; // 检测触发器
        
        const hasHit = PhysicsSystem.instance.raycast(ray, PHY_GROUP.Safe, maxDistance, queryTrigger);
        if (hasHit) {
            const raycastResults = PhysicsSystem.instance.raycastResults;
            for (const result of raycastResults) {
                const collider = result.collider;
                if (collider.getGroup() === PHY_GROUP.Safe) {
                    // console.log(`检测到家触发器，位置不安全: ${position}`);
                    return false; // 检测到家触发器，位置不安全
                }
            }
        }
        
        return true; // 位置安全
    }
    /**
     * 添加敌人到管理器
     * @param enemy 敌人节点
     */
    public addEnemy(enemy: Node): void {
        // 替换 includes 检查以兼容旧的 TypeScript 配置
        let exists = false;
        for (let i = 0; i < this._enemies.length; i++) {
            if (this._enemies[i] === enemy) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            this._enemies.push(enemy);
            // console.log(`添加Enemy到管理器，当前数量: ${this._enemies.length}`);
        }
    }

    /**
     * 从管理器移除敌人
     * @param enemy 敌人节点
     */
    public removeEnemy(enemy: Node): void {
        const index = this._enemies.indexOf(enemy);
        if (index >= 0) {
            this._enemies.splice(index, 1);
            // console.log(`从管理器移除Enemy，当前数量: ${this._enemies.length}`);
        }
    }

    /**
     * 获取范围内的敌人
     * @param position 中心位置
     * @param range 范围半径
     * @returns 范围内的敌人组件数组
     */
    public getRangeEnemies(position: Vec3, range: number): {node: Node, squaredDistance: number}[] {
        const rangeEnemies: {node: Node, squaredDistance: number}[] = [];
        // 使用平方距离来优化性能，避免开平方根运算
        const rangeSquared = range * range;
        
        for (const enemy of this._enemies) {
            if (!enemy || !enemy.isValid || enemy.getComponent(HealthComponent)?.isDead) {
                continue;
            }
            
            // 计算平方距离
            const enemyPos = enemy.getWorldPosition();
            const squaredDistance = Vec3.squaredDistance(position, enemyPos);
            
            if (squaredDistance <= rangeSquared) {
                // 这里返回的对象应该包含node属性，以匹配BulletBase中的使用方式
                rangeEnemies.push({
                    node: enemy,
                    squaredDistance: squaredDistance // 注意：这里是平方距离，用于排序
                });
            }
        }
        
        // 按平方距离排序，最近的在前面
        rangeEnemies.sort((a, b) => a.squaredDistance - b.squaredDistance);
        
        return rangeEnemies;
    }

    protected update(dt: number): void {
        if(!this.isKeepEnemyNum){
            // this.checkGameOver();
        }

        // 检查有分组绑定的 enemy，当其 targetNode 失效时（墙段被打死），从对应组里重新选最近目标
        if (this._enemyWallGroupMap.size > 0) {
            for (const enemyNode of this._enemies) {
                if (!enemyNode || !enemyNode.isValid) continue;
                const wallGroup = this._enemyWallGroupMap.get(enemyNode.uuid);
                if (!wallGroup) continue; // 没有分组绑定，走 Enemy 自身的旧逻辑

                const enemy = enemyNode.getComponent(Enemy);
                if (!enemy) continue;

                // targetNode 失效时，从对应墙组重新选最近目标
                if (!enemy.targetNode || !enemy.targetNode.isValid) {
                    enemy.targetNode = this._pickNearestNode(
                        enemyNode.getWorldPosition(),
                        wallGroup
                    );
                }
            }
        }
    }

    // private checkGameOver(): void {
    //     if(this._enemies.length === 0 && !this._gameOverExecuted){
    //         this.onGameWin();
    //     }
    // }
    public endGame(){
        this.scheduleOnce(() => {
                this.stopEnemySpawn();
            }, 2);

            this.scheduleOnce(() => {
                this.onGameWin();
            }, 0.5);
    }
    private onGameWin(): void {
        // 标记游戏结束逻辑已执行，防止重复调用
        this._gameOverExecuted = true;
        
        manager.game.hero.pickupComponent.magnetPickup(9999).then(() => {
            // this.startEnemySpawn();
            this.scheduleOnce(() => {
                // app.event.emit(CommonEvent.UnlockItem, BuildingType.Wall1);
                // app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.Wall1, state: BuildUnlockState.Unlocked});
            }, 1);
            this.scheduleOnce(() => {
                app.event.emit(CommonEvent.GameWin);
            }, 3.5);
        });
    }

    private onUnlockItem(type: BuildingType): void {
        // 检测是否解锁了第二个箭塔，如果是则切换到多塔模式
        if (type === BuildingType.ArrowTower || type === BuildingType.ArrowTower1) {
            // 检查是否从单塔模式切换到多塔模式
            if (this._isSingleTowerMode && !this.checkTowerMode()) {
                this.switchToMultiTowerMode();
            }
        }
        
        if (type === BuildingType.Turret) {
            this.scheduleOnce(() => {
                this.stopEnemySpawn();
            }, 2);

            this.scheduleOnce(() => {
                this.onGameWin();
            }, 0.5);
        }
    }

    /**
     * 切换到多塔模式
     */
    private switchToMultiTowerMode(): void {
   //console.log('切换到多塔模式');
        this._isSingleTowerMode = false;
        this.isKeepEnemyNum = true;
        
        // 立即补充敌人至8个
        const needSpawn = this.maxEnemyCount - this._enemies.length;
        if (needSpawn > 0) {
            for (let i = 0; i < needSpawn; i++) {
                this.scheduleOnce(() => {
                    this.spawnEnemyDirect();
                }, i * 0.3); // 每个敌人间隔0.3秒生成
            }
        }
    }

    /**
     * 停止生成敌人
     */
    public stopEnemySpawn(): void {
        this.isKeepEnemyNum = false;
   //console.log('停止敌人生成');
    }

    public reset(): void {
        // 停止敌人管理
        this._isManagingEnemies = false;

        // 重置轮询索引
        this._wallGroupAIndex = 0;
        this._wallGroupBIndex = 0;

        // 清除所有 enemy 的墙壁目标组记录
        this._enemyWallGroupMap.clear();
        
        // 重置游戏结束标志，允许重新触发游戏结束逻辑
        this._gameOverExecuted = false;
        
        // 重置为单塔模式
        this._isSingleTowerMode = true;
        
        // 取消所有定时器任务
        this.unscheduleAllCallbacks();
        
        // 销毁所有当前存在的敌人
        for (const enemyNode of this._enemies) {
            if (enemyNode && enemyNode.isValid) {
                enemyNode.destroy();
            }
        }
        
        // 清空敌人列表
        this._enemies = [];
        
        // 清理对象池
        this.clearEnemyPool();
        
        // 重新初始化对象池
        this.initEnemyPool();
        
        // 重置敌人保持数量状态为初始值
        this.isKeepEnemyNum = true;
        
   //console.log('EnemyManager 重置完成');
    }
}
