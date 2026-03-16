import { _decorator, Component, Node, Vec3, tween, CCFloat, Tween, director, random, Quat, instantiate, MeshRenderer, Material, Color } from 'cc';
import { HealthComponent } from '../Components/HealthComponent';
import { ComponentEvent } from '../../Main/Common/ComponentEvents';
import { ComponentInitializer } from '../../Main/Common/ComponentInitializer';
import { DamageData } from '../../Main/Common/CommonInterface';
import { EffectType, ObjectType } from '../../Main/Common/CommonEnum';
import { DropItemWood } from '../Drop/DropItemWood';
import { Hero } from './Hero';
import { Lumberjack } from './Lumberjack';

const { ccclass, property } = _decorator;

/**
 * 树类 - 可被砍伐的树木
 */
@ccclass('Tree')
export class Tree extends Component {
    @property({ type: HealthComponent, displayName: '健康组件' })
    public healthComponent: HealthComponent = null!;

    @property({
        type: CCFloat,
        displayName: '木头掉落数量',
        tooltip: '树被砍倒后掉落的木头数量'
    })
    public woodDropCount: number = 2;

    @property({
        type: CCFloat,
        displayName: '掉落范围',
        tooltip: '木头掉落的范围半径'
    })
    public dropRange: number = 1.5;

    /** 树是否已经死亡 */
    private _isDead: boolean = false;

    // === 碎片散开效果配置 ===
    @property({
        tooltip: '碎片数量'
    })
    public fragmentCount: number = 4;

    @property({
        tooltip: '碎片缩放最小值（相对原模型）'
    })
    public fragmentScaleMin: number = 0.3;

    @property({
        tooltip: '碎片缩放最大值（相对原模型）'
    })
    public fragmentScaleMax: number = 0.5;

    @property({
        tooltip: '碎片飞散距离（米）'
    })
    public fragmentScatterDistance: number = 1.0;

    @property({
        tooltip: '碎片飞散时间（秒）'
    })
    public fragmentDuration: number = 0.5;

    @property({
        tooltip: '碎片上升高度（米）'
    })
    public fragmentUpHeight: number = 0.8;

    public get isDead(): boolean {
        return this._isDead;
    }

    onLoad() {
        this.initComponents();
        this.registerComponentEvents();
    }

    onDestroy() {
        this.unregisterEvents();
    }

    /**
     * 初始化组件引用
     */
    protected initComponents() {
        // 使用组件初始化器获取或创建HealthComponent
        ComponentInitializer.initComponents(this.node, {
            healthComponent: HealthComponent,
        }, this);
    }

    /**
     * 注册组件事件监听
     */
    protected registerComponentEvents() {
        // 监听死亡事件
        this.healthComponent.node.on(ComponentEvent.DEAD, this.onDead, this);
        this.healthComponent.node.on(ComponentEvent.HURT, this.onHurt, this);
    }

    /**
     * 注销事件监听
     */
    protected unregisterEvents() {
    }

    /**
     * 受伤回调
     * @param damageData 伤害数据
     */
    protected onHurt(damageData: DamageData) {
        // 播放树摇晃效果
        //console.log("[Tree] onHurt", damageData);
        this.playShakeEffect(damageData);
        this.createFragments()
        //材质闪白
        this.flashWhite();
        app.audio.playEffect('resources/audio/挖矿')
    }
    /** 闪白标记 */
    private flashWhiteMark: boolean = false;
    /** 是否正在震动 */
    private isShaking: boolean = false;

    /**
     * 材质闪白
     */
    private flashWhite(): void {
        if(this.flashWhiteMark) return;
        this.flashWhiteMark = true;

        const meshNodes: Node[] = [];
        this.findMeshNodes(this.node, meshNodes);
        if (meshNodes.length === 0) {
       //console.warn(`[${this.node.name}] 未找到 MeshRenderer，跳过闪白效果`);
            this.flashWhiteMark = false;
            return;
        }
        meshNodes.forEach(node => {
            // 记录原始emissive颜色，以便恢复
            // const originalEmissive = node.getComponent(MeshRenderer).material.getProperty('emissive');
            
            node.getComponent(MeshRenderer).material.setProperty('emissive', new Color(0, 0, 0, 255));
            
            let color = new Color(0, 0, 0);
            tween(color)
                .to(0.1, { r: 255, g: 255, b: 255 },{onUpdate: (target, ratio) => {
                    node.getComponent(MeshRenderer).material.setProperty('emissive', target);
                }})
                .to(0.1, { r: 0, g: 0, b: 0 },{onUpdate: (target, ratio) => {
                    node.getComponent(MeshRenderer).material.setProperty('emissive', target);
                }}).call(()=>{
                    node.getComponent(MeshRenderer).material.setProperty('emissive', new Color(0, 0, 0, 255));
                    this.flashWhiteMark = false; // 闪白结束后重置标记
                })
                .start();
        });
        
        // 移除 scheduleOnce 重置标记，改为在 tween 回调中重置，更精准
        // this.scheduleOnce(() => {
        //     this.flashWhiteMark = false;
        // }, 0.3);
       
    } 
    /**
  * 创建碎片效果
  */
    private createFragments(): void {
        // 查找包含 MeshRenderer 的子节点（草的模型）
        const meshNodes: Node[] = [];
        this.findMeshNodes(this.node, meshNodes);

        if (meshNodes.length === 0) {
       //console.warn(`[${this.node.name}] 未找到 MeshRenderer，跳过碎片效果`);
            return;
        }

        // 获取草的世界坐标
        const centerPos = this.node.worldPosition.clone();
        // this.node.getChildByName("eff").active = true;
        // 生成多个碎片
        for (let i = 0; i < this.fragmentCount; i++) {
            // 克隆第一个有 MeshRenderer 的节点
            const fragment = instantiate(meshNodes[0]);

            // 设置为场景根节点的子节点（独立于草节点）
            fragment.setParent(this.node.parent);
            fragment.setWorldPosition(centerPos);

            // 缩小碎片（在区间内随机）
            const randomScale = this.fragmentScaleMin + Math.random() * (this.fragmentScaleMax - this.fragmentScaleMin);
            const originalFragmentScale = fragment.scale.clone();
            fragment.setScale(
                originalFragmentScale.x * randomScale,
                originalFragmentScale.y * randomScale,
                originalFragmentScale.z * randomScale
            );

            // 计算随机飞散方向（XZ平面）
            const angle = (Math.PI * 2 * i) / this.fragmentCount + (Math.random() - 0.5) * 0.5;
            const distance = this.fragmentScatterDistance * (0.7 + Math.random() * 0.6);

            const targetPos = new Vec3(
                centerPos.x + Math.cos(angle) * distance,
                centerPos.y + this.fragmentUpHeight * (0.8 + Math.random() * 0.4), // 随机上升高度
                centerPos.z + Math.sin(angle) * distance
            );

            // 随机旋转
            const randomRotation = new Vec3(
                Math.random() * 360,
                Math.random() * 360,
                Math.random() * 360
            );

            // 碎片飞散动画（抛物线 + 旋转 + 缩小消失）
            tween(fragment)
                // 飞散阶段
                .to(this.fragmentDuration,
                    {
                        worldPosition: targetPos,
                        // eulerAngles: randomRotation
                    },
                    { easing: 'quadOut' }
                )
                // 同时缩小消失
                .to(this.fragmentDuration * 0.5,
                    {
                        scale: new Vec3(0, 0, 0)
                    }
                )
                .call(() => {
                    // 销毁碎片
                    fragment.destroy();
                })
                .start();

            // 让碎片有下落效果（分离的tween控制Y轴）
            const fallStartTime = this.fragmentDuration * 0.5; // 到达顶点后开始下落
            this.scheduleOnce(() => {
                if (fragment && fragment.isValid) {
                    const fallTargetPos = new Vec3(targetPos.x, centerPos.y - 0.5, targetPos.z);
                    tween(fragment)
                        .to(this.fragmentDuration * 0.5,
                            { worldPosition: fallTargetPos },
                            { easing: 'quadIn' }
                        )
                        .start();
                }
            }, fallStartTime);
        }

        //console.log(`[${this.node.name}] 生成了 ${this.fragmentCount} 个碎片`);
    }

    /**
     * 递归查找包含 MeshRenderer 的节点
     */
    private findMeshNodes(node: Node, results: Node[]): void {
        const meshRenderer = node.getComponent(MeshRenderer);
        if (meshRenderer) {
            results.push(node);
        }

        for (const child of node.children) {
            this.findMeshNodes(child, results);
        }
    }
    /**
     * 播放树摇晃效果
     */
    protected playShakeEffect(damageData: DamageData) {
        if(this.isShaking) return;
        this.isShaking = true;

        // 停止之前的摇晃动画
        Tween.stopAllByTarget(this.node);

        // 创建摇晃动画
        tween(this.node)
            .to(0.05, { eulerAngles: new Vec3(0, 0, 5) })
            .to(0.1, { eulerAngles: new Vec3(0, 0, -5) })
            .to(0.05, { eulerAngles: Vec3.ZERO })
            .call(() => {
                this.isShaking = false;
            })
            .start();

        // 树可不能死！
        this.healthComponent.heal(damageData.damage);

        // 受伤时掉落木头
        this.dropWood(damageData);
    }

    /**
     * 死亡回调 - 树被砍倒
     */
    protected onDead() {
        if (this._isDead) return;

        this._isDead = true;

        // 树死亡时不掉落任何物品
    }

    /**
     * 掉落木头
     */
    protected dropWood(damageData: DamageData) {
        const treePosition = this.node.getWorldPosition();
        const dropPosition = new Vec3(
            treePosition.x,
            treePosition.y + 2, // 稍微抬高，让木头有掉落效果
            treePosition.z
        );
        this.schedule(() => {
            const rotation = new Quat()
            Quat.fromEuler(rotation, 0, Math.random() * 360, 0);
            // 从对象池获取木头节点
            const woodNode = manager.pool.getNode(ObjectType.DropItemWood, undefined, dropPosition, rotation);
            if (!woodNode) {
           //console.warn('无法从对象池获取木头节点');
                return;
            }

            // 将木头添加到掉落层
            if (manager.game && manager.game.dropLayer) {
                manager.game.dropLayer.addChild(woodNode);
            } else {
           //console.warn('无法找到掉落层 (manager.game.dropLayer)，将添加到场景根节点');
                return;
            }

            // 获取木头组件
            const woodComponent = woodNode.getComponent(DropItemWood);

            // 计算随机掉落位置
            // 将木头添加到掉落管理器中
            // manager.drop.addItem(woodNode);

            // 直接设置为可拾取状态
            if (woodComponent) {
                woodComponent.canPickup = true;
                // woodComponent.showRotate();
            }

            let Character = damageData.damageSource.getComponent(Hero) || damageData.damageSource.getComponent(Lumberjack);
            if (Character) {
                Character.pickupComponent.pickupItem(woodComponent)
            }
        }, 0.05, this.woodDropCount - 1, 0);

        // 播放砍树音效
        // if (app && app.audio) {
        //     app.audio.playEffect('resources/audio/砍树');
        // }

        manager.effect.playEffect(EffectType.Wood_Drop, treePosition.add(new Vec3(0, 3.5, 0)));
    }



    /**
     * 受到伤害
     * @param damageData 伤害数据
     * @returns 是否死亡
     */
    public takeDamage(damageData: DamageData): boolean {
        if (this._isDead) return false;

        return this.healthComponent.takeDamage(damageData);
    }

    /**
     * 重置树的状态
     */
    public reset() {
        this._isDead = false;
        this.healthComponent.reset();

        // 重置变换
        this.node.setScale(1, 1, 1);
        this.node.setRotationFromEuler(0, 0, 0);

        // 停止所有动画
        tween(this.node).stop();
    }

    /**
     * 获取树的世界位置
     */
    public getWorldPosition(): Vec3 {
        return this.node.getWorldPosition();
    }
}
