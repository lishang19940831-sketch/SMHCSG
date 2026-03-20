import { _decorator, Node, random, tween, v3, Vec3, geometry, PhysicsSystem } from 'cc';
import { BuildingType, CharacterState, CommonEvent, ObjectType } from '../../Main/Common/CommonEnum';
import { DamageData } from '../../Main/Common/CommonInterface';
import { ComponentEvent } from '../../Main/Common/ComponentEvents';
import { ComponentInitializer } from '../../Main/Common/ComponentInitializer';
import { HealthComponent } from '../Components/HealthComponent';
import { Character } from './Character';

const { ccclass, property } = _decorator;

export enum EnemyAIState {
    Idle,
    Run,
    Attack,
    Dead,
    ChaseHero, // 追踪英雄状态
    ReturnToOriginal, // 返回原位置状态
}

/**
 * 敌人角色类 - 展示重构后的事件系统使用
 */
@ccclass('Enemy')
export class Enemy extends Character {
    private aiState: EnemyAIState = EnemyAIState.Idle;
    private aiStateTimer: number = 0;
    private aiStateTimerMax: number = 0.05;

    public stopOnReachTarget: boolean = false;

    @property({
        type: Number,
        displayName: '攻击偏移',
    })
    private attackOffset: number = 3;

    @property({
        type: Number,
        displayName: '追踪英雄检测范围',
        tooltip: '当英雄在此范围内且不在安全区时，敌人会追踪英雄',
    })
    private heroDetectionRange: number = 15;

    @property({
        type: Number,
        displayName: '追踪英雄攻击距离',
        tooltip: '追踪英雄时的攻击距离',
    })
    private heroAttackRange: number = 3;

    /** 追踪英雄前的原始目标节点 */
    private originalTargetNode: Node | null = null;
    
    /** 追踪英雄前的原始位置 */
    private originalPosition: Vec3 | null = null;
    
    /** 是否正在追踪英雄 */
    private isChasingHero: boolean = false;


    get AiState(){
        return this.aiState;
    }

    set AiState(value: EnemyAIState){
        this.aiState = value;
    }

    onLoad(): void {
        super.onLoad();
    }

    private TEST(state: CharacterState){
        //console.warn('TEST', state);
    }

    update(dt: number): void {
        if(!manager.game.isGameStart) return;
        super.update(dt);

        // 检查是否需要追踪或停止追踪英雄
        // this.updateHeroTracking();

        this.handleAIState(dt);

        this.aiStateTimer += dt;
        while(this.aiStateTimer >= this.aiStateTimerMax){
            this.aiStateTimer -= this.aiStateTimerMax;
            switch(this.aiState){
                case EnemyAIState.Idle:
                    break;
                case EnemyAIState.Run:
                    if(this.checkIsNearTarget(this.attackOffset)){
                        if(this.stopOnReachTarget){
                            this.aiState = EnemyAIState.Idle;
                        }else{
                            //console.log(`[Enemy攻击] AI状态切换: Run -> Attack, 距离目标: ${this.getDistanceToTarget().toFixed(2)}m`);
                            this.aiState = EnemyAIState.Attack;
                        }
                    }
                    break;
                case EnemyAIState.Attack:
                    // 如果正在追踪英雄，检查与英雄的距离
                    if (this.isChasingHero) {
                        if (!this.checkIsNearHero(this.heroAttackRange)) {
                            //console.log(`[Enemy攻击] AI状态切换: Attack -> ChaseHero, 距离英雄过远`);
                            this.aiState = EnemyAIState.ChaseHero;
                        }
                    } else {
                        // 原有逻辑：检查与目标的距离
                        if(!this.checkIsNearTarget(this.attackOffset)){
                            //console.log(`[Enemy攻击] AI状态切换: Attack -> Run, 距离目标: ${this.getDistanceToTarget().toFixed(2)}m`);
                            this.aiState = EnemyAIState.Run;
                        }
                    }
                    break;
                case EnemyAIState.ChaseHero:
                    // 追英雄功能已禁用（updateHeroTracking已注释），
                    // 若意外进入此状态，直接回到 Run 继续打墙，不切换 targetNode
                    this.aiState = EnemyAIState.Run;
                    break;
                case EnemyAIState.ReturnToOriginal:
                    // 追英雄功能已禁用，若意外进入此状态，
                    // 直接回到 Run 继续打墙，不恢复 originalTargetNode（防止目标错乱）
                    this.originalTargetNode = null;
                    this.originalPosition = null;
                    this.aiState = EnemyAIState.Run;
                    break;
                case EnemyAIState.Dead:
                    break;
            }
        }
    }

    protected initComponents() {
        super.initComponents();
    }
    

    protected registerComponentEvents() {
        super.registerComponentEvents();
        
        // 注册目标追踪组件事件（无需设置回调函数）
    }

    protected registerEvents() {
        super.registerEvents();
        
        // 监听组件初始化完成事件
        this.node.on(ComponentEvent.COMPONENT_INITIALIZED, this.onComponentInitialized, this);
    }

    protected unregisterEvents() {
        super.unregisterEvents();
    }

    /**
     * 组件初始化完成回调
     */
    private onComponentInitialized() {
        // 所有组件都已初始化并注册了事件监听
        // 可以开始使用事件系统进行组件间通信
        //console.log('敌人组件初始化完成，事件系统已准备就绪');
    }

    /** 当前移动目标节点 */
    public targetNode: Node | null = null;

    /**
     * 选择X轴最近的目标节点
     */
    private selectNearestTarget(): void {
        const targets = manager.wall.RangeNode;
        if (!targets || targets.length === 0) {
            this.targetNode = null;
            return;
        }
        
        const enemyPos = this.node.getWorldPosition();
        let nearestTarget: Node | null = null;
        let nearestXDistance = Number.MAX_VALUE;
        
        for (const target of targets) {
            if (!target || !target.isValid) continue;
            
            const targetPos = target.getWorldPosition();
            const xDistance = Math.abs(targetPos.x - enemyPos.x);
            
            if (xDistance < nearestXDistance) {
                nearestXDistance = xDistance;
                nearestTarget = target;
            }
        }
        
        this.targetNode = nearestTarget;
    }

    /**
     * 计算朝向目标节点的方向向量
     * @returns 标准化的方向向量
     */
    private getDirectionToTarget(): Vec3 {
        // targetNode 由 EnemyManager 统一维护（含分组重选逻辑），此处不再主动重选
        // 无效时使用默认方向保持原地等待，下一帧 EnemyManager 会补上正确目标
        if (!this.targetNode || !this.targetNode.isValid) {
            return v3(Math.SQRT1_2, 0, Math.SQRT1_2);
        }

        const enemyPos = this.node.getWorldPosition();
        const targetPos = this.targetNode.getWorldPosition();
        
        // 计算方向向量
        const direction = new Vec3();
        Vec3.subtract(direction, targetPos, enemyPos);
        
        // 只保留x和z轴的移动，忽略y轴
        direction.y = 0;
        
        // 标准化方向向量
        direction.normalize();
        
        return direction;
    }

    /**
     * 检查是否接近目标节点
     * @param offset 攻击距离偏移
     * @returns 是否在攻击范围内
     */
    private checkIsNearTarget(offset: number): boolean {
        if (!this.targetNode || !this.targetNode.isValid) {
            return false;
        }
        
        const enemyPos = this.node.getWorldPosition();
        const targetPos = this.targetNode.getWorldPosition();
        // 只计算 XZ 平面距离，忽略 Y 轴高度差，避免因地形高度差导致永远不触发攻击
        const dx = enemyPos.x - targetPos.x;
        const dz = enemyPos.z - targetPos.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        
        return distance <= offset;
    }

    /**
     * 获取到目标的距离
     * @returns 距离值
     */
    private getDistanceToTarget(): number {
        if (!this.targetNode || !this.targetNode.isValid) {
            return Infinity;
        }
        
        const enemyPos = this.node.getWorldPosition();
        const targetPos = this.targetNode.getWorldPosition();
        // 只计算 XZ 平面距离，忽略 Y 轴高度差
        const dx = enemyPos.x - targetPos.x;
        const dz = enemyPos.z - targetPos.z;
        return Math.sqrt(dx * dx + dz * dz);
    }

    /**
     * 更新英雄追踪逻辑
     */
    private updateHeroTracking(): void {
        const heroComponent = manager.game.hero;
        if (!heroComponent) return;

        const hero = heroComponent.node;

        const enemyPos = this.node.getWorldPosition();
        const heroPos = hero.getWorldPosition();
        const distanceToHero = Vec3.distance(enemyPos, heroPos);

        // 英雄不在安全区且在检测范围内
        if (!heroComponent.isSafeArea && distanceToHero <= this.heroDetectionRange) {
            if (!this.isChasingHero) {
                // 开始追踪英雄，保存原始状态
                this.startChasingHero();
            }
        } 
        // 英雄在安全区或超出检测范围
        else if (this.isChasingHero) {
            // 停止追踪，返回原位置
            this.stopChasingHero();
        }
    }

    /**
     * 开始追踪英雄
     */
    private startChasingHero(): void {
        //console.log(`[Enemy] 开始追踪英雄`);
        
        // 保存当前目标和位置
        this.originalTargetNode = this.targetNode;
        this.originalPosition = this.node.getWorldPosition().clone();
        
        // 设置英雄为目标
        const heroComponent = manager.game.hero;
        if (heroComponent) {
            this.targetNode = heroComponent.node;
        }
        
        this.isChasingHero = true;
        this.aiState = EnemyAIState.ChaseHero;
    }

    /**
     * 停止追踪英雄，返回原位置
     */
    private stopChasingHero(): void {
        //console.log(`[Enemy] 停止追踪英雄，返回原位置`);
        
        this.isChasingHero = false;
        this.aiState = EnemyAIState.ReturnToOriginal;
    }

    /**
     * 检查是否接近英雄
     * @param range 检测范围
     * @returns 是否在范围内
     */
    private checkIsNearHero(range: number): boolean {
        const heroComponent = manager.game.hero;
        if (!heroComponent) return false;

        const enemyPos = this.node.getWorldPosition();
        const heroPos = heroComponent.node.getWorldPosition();
        const distance = Vec3.distance(enemyPos, heroPos);
        
        return distance <= range;
    }

    /**
     * 检查是否到达原始位置
     * @returns 是否到达
     */
    private checkReachedOriginalPosition(): boolean {
        if (!this.originalPosition) return true;

        const currentPos = this.node.getWorldPosition();
        const distance = Vec3.distance(currentPos, this.originalPosition);
        
        // 距离小于0.5认为已到达
        return distance <= 0.5;
    }

    /**
     * 恢复原始目标
     */
    private restoreOriginalTarget(): void {
        this.targetNode = this.originalTargetNode;
        this.originalTargetNode = null;
        this.originalPosition = null;
    }

    /**
     * 计算朝向英雄的方向向量
     * @returns 标准化的方向向量
     */
    private getDirectionToHero(): Vec3 {
        const heroComponent = manager.game.hero;
        if (!heroComponent) {
            return v3(Math.SQRT1_2, 0, Math.SQRT1_2);
        }

        const enemyPos = this.node.getWorldPosition();
        const heroPos = heroComponent.node.getWorldPosition();
        
        const direction = new Vec3();
        Vec3.subtract(direction, heroPos, enemyPos);
        direction.y = 0;
        direction.normalize();
        
        return direction;
    }

    /**
     * 计算朝向原始位置的方向向量
     * @returns 标准化的方向向量
     */
    private getDirectionToOriginalPosition(): Vec3 {
        if (!this.originalPosition) {
            return v3(Math.SQRT1_2, 0, Math.SQRT1_2);
        }

        const enemyPos = this.node.getWorldPosition();
        
        const direction = new Vec3();
        Vec3.subtract(direction, this.originalPosition, enemyPos);
        direction.y = 0;
        direction.normalize();
        
        return direction;
    }

    private handleAIState(dt: number){
        switch(this.aiState){
            case EnemyAIState.Idle:
                this.moveWorld(Vec3.ZERO);
                break;
            case EnemyAIState.Run:
                // 朝向目标节点移动（使用世界坐标方向，不做摄像机变换）
                const direction = this.getDirectionToTarget();
                this.moveWorld(direction);
                break;
            case EnemyAIState.Attack:
                this.moveWorld(Vec3.ZERO);
                // 尝试攻击
                if (this.attackComponent.canAttack()) {
                    const target = this.GetAttackTarget();
                    //console.log(`[Enemy攻击] 尝试发起攻击`, {
                    //     '敌人': this.node.name,
                    //     '目标': target ? target.name : 'null',
                    //     '攻击距离': this.getDistanceToTarget().toFixed(2),
                    //     '冷却状态': this.attackComponent.isCooling ? '冷却中' : '可攻击'
                    // });
                    this.attack();
                }
                break;
            case EnemyAIState.ChaseHero:
            case EnemyAIState.ReturnToOriginal:
                // 追英雄功能已禁用，这两个状态降级为 Run 处理（状态机会在下一tick修正）
                const fallbackDir = this.getDirectionToTarget();
                this.moveWorld(fallbackDir);
                break;
            case EnemyAIState.Dead:
                break;
        }
    }
    
    public GetAttackTarget(): Node | null {
        // targetNode 由 EnemyManager 统一维护（含分组重选逻辑），直接使用
        // 无效时返回 null，等待下一帧 EnemyManager 补上正确目标
        if (this.targetNode && this.targetNode.isValid) {
            return this.targetNode;
        }
        return null;
    }

    protected onAttackStart() {
        //console.log(`[Enemy攻击] 📍 攻击开始 - 触发攻击动画`, {
        //     '敌人': this.node.name,
        //     '当前状态': this.stateComponent.getCurrentState(),
        //     '攻击冷却时间': this.attackComponent.attackCooldownTime.toFixed(2) + 's',
        //     '动画名称': this.animationComponent.AttackAnimName,
        //     '是否正在播放动画': this.animationComponent.isPlayingAnimation()
        // });
    }

    protected onAttackEnd() {
        //console.log(`[Enemy攻击] 🏁 攻击动画结束`, {
        //     '敌人': this.node.name,
        //     '是否还在冷却': this.attackComponent.isCooling,
        //     '剩余冷却时间': this.attackComponent.currentAttackTime.toFixed(2) + 's'
        // });
    }

    protected onPerformAttack(damageData: DamageData): void {
        //console.log(`[Enemy攻击] ============== 执行攻击伤害 ==============`);
        //console.log(`[Enemy攻击] 攻击者: ${this.node.name}`, {
        //     '伤害值': damageData.damage.toFixed(2),
        //     '攻击来源': damageData.damageSource?.name || 'unknown'
        // });
        
        const target = this.GetAttackTarget();
        if(target){
            const healthComponent = target.getComponent(HealthComponent);
            if(healthComponent){
                const beforeHp = healthComponent.health;
                const beforeHpPercent = healthComponent.healthPercentage;
                //console.log(`[Enemy攻击] 攻击目标: ${target.name}`, {
                //     '目标当前血量': beforeHp.toFixed(2),
                //     '血量百分比': (beforeHpPercent * 100).toFixed(1) + '%',
                //     '即将造成伤害': damageData.damage.toFixed(2)
                // });
                
                healthComponent.takeDamage(damageData);
                
                const afterHp = healthComponent.health;
                const afterHpPercent = healthComponent.healthPercentage;
                const actualDamage = beforeHp - afterHp;
                //console.log(`[Enemy攻击] 伤害结果`, {
                //     '实际伤害': actualDamage.toFixed(2),
                //     '剩余血量': afterHp.toFixed(2),
                //     '血量百分比': (afterHpPercent * 100).toFixed(1) + '%'
                // });

                if (healthComponent.isDead) {
                    //console.log(`[Enemy攻击] ⚠️ 目标已死亡: ${target.name}`);
                }
            } else {
                //console.warn(`[Enemy攻击] 目标没有HealthComponent: ${target.name}`);
            }

            // 十分之一的概率播放熊攻击音效
            if (Math.random() < 0.3) {
                app.audio.playEffect('resources/audio/hit', 0.4);
            }

            // app.event.emit(CommonEvent.ShakeCamera, {
            //     intensity: 0.1, // 减少震动强度
            //     duration: 0.05,  // 减少震动时间
            //     source: this.node
            // });
        } else {
            //console.warn(`[Enemy攻击] ⚠️ 攻击失败: 没有找到有效目标`);
        }
        //console.log(`[Enemy攻击] ============== 攻击结束 ==============\n`);
    }
    
    /**
     * 搜索敌人
     */
    public searchForAttackTarget(searchRadius: number): { node: Node; squaredDistance: number }[] {
        return [];
    }

    protected onHurt(damageData: DamageData): void {
        super.onHurt(damageData);
        // 十分之一的概率播放熊受击音效
        if (Math.random() < 0.3) {
            // app.audio.playEffect('resources/audio/hit', 0.4);
        }
    }

    protected onDead(): void {
        super.onDead();
        app.event.emit(CommonEvent.EnemyDead, this.node)

        tween(this.node).by(0.2, { eulerAngles: v3(0, Math.random() * 120, 0) }).start();

        this.scheduleOnce(() => {
            app.event.emit(CommonEvent.EnemyDeadFinish, this.node)
        }, 2);
        // app.audio.playEffect('resources/audio/熊死亡', 0.4);

        // 直接将金币掉落在地上
        this.schedule(()=>{
            if(Math.random() < 0.8) {
                // 使用DropManager的spawnParabolicItem方法让金币掉落在地上
                manager.drop.spawnParabolicItem(ObjectType.DropItemCoin, this.node.getWorldPosition(), 2);
            }
        }, 0.05, 2)
    }

    /**
     * 生成完成后的回调（抛物线动画结束后调用）
     * 注意：若外部（EnemyManager）已提前赋值 targetNode，则不覆盖，直接使用；
     * 否则从全局 RangeNode 中自动选最近目标（兼容旧逻辑）。
     */
    public onSpawnComplete(wpos: Vec3): void {
        // 仅在未被外部指定目标时才自动选取
        if (!this.targetNode || !this.targetNode.isValid) {
            this.selectNearestTarget();
        }
        
        // 设置为闲置状态
        this.stateComponent.changeState(CharacterState.Idle);
        this.aiState = EnemyAIState.Run;

        this.animationComponent.reset();
    }
}