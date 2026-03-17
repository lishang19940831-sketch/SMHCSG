import { _decorator, Color, Component, director, easing, Enum, MeshRenderer, Node, tween, v3, Vec3 } from 'cc';
import { HealthComponent } from '../Components/HealthComponent';
import { ComponentEvent } from '../Common/ComponentEvents';
import { DamageData } from '../Common/CommonInterface';
import { BuildingType, BuildUnlockState, CommonEvent } from '../Common/CommonEnum';

const { ccclass, property } = _decorator;

@ccclass('Wall')
export class Wall extends Component {
    @property({
        displayName: '是否解锁',
    })
    private isUnlock: boolean = false;

    @property({displayName: "墙体父节点", type: Node})
    public  wallParent: Node[] = [];
    @property({
        type: Enum(BuildingType),
        displayName: '墙体类型',
    })
    private wallType: BuildingType = BuildingType.Wall;


    @property({
        type: Node,
        displayName: '墙体地面',
    })
    private wallGround: Node = null;

    /** 场景中的所有墙体段信息 */
    private wallMap: Map<Node, {initWPos:Vec3, initEul:Vec3, initScale:Vec3, health: HealthComponent}> = new Map();

    /** 每个墙段节点树中所有 MeshRenderer 的初始颜色（节点uuid → Color[]） */
    private _initColorMap: Map<string, Color[]> = new Map();

    onLoad(): void {
        // 遍历所有 wallParent 元素（每个都带有 HealthComponent）
        this.wallParent.forEach((wallSegment) => {
            const initEul = new Vec3();
            const initWPos = new Vec3();
            const initScale = new Vec3();
            wallSegment.getScale(initScale);
            wallSegment.getWorldPosition(initWPos);
            wallSegment.getRotation().getEulerAngles(initEul);
            
            // 获取该墙段的健康组件
            const health = wallSegment.getComponent(HealthComponent);
            this.wallMap.set(wallSegment, {initWPos, initEul, initScale, health});

            if(this.isUnlock){
                wallSegment.setScale(initScale.x, initScale.y, initScale.z);
                wallSegment.setWorldPosition(initWPos.x, initWPos.y, initWPos.z);
            }else{
                wallSegment.setScale(0, 0, 0);
                wallSegment.setWorldPosition(initWPos.x, initWPos.y + 3, initWPos.z);
            }

            // 收集并缓存该墙段节点树中所有 MeshRenderer 的初始颜色
            this._cacheInitColors(wallSegment);

            // 为每个墙段注册事件
            if (health) {
                wallSegment.on(ComponentEvent.HURT, (damageData: DamageData) => this.onHurt(damageData, wallSegment), this);
                wallSegment.on(ComponentEvent.DEAD, () => this.onSegmentDead(wallSegment), this);
            }
        });

        app.event.on(CommonEvent.UnlockItem, this.onUnlockItem, this);
    }

    public showLock(): void {
        this.wallParent.forEach((wallSegment) => {
            const data = this.wallMap.get(wallSegment);
            if (!data) return;

            wallSegment.setScale(0, 0, 0);
            wallSegment.setRotationFromEuler(data.initEul);
            wallSegment.setWorldPosition(data.initWPos.x, data.initWPos.y + 3, data.initWPos.z);
        });
        this.isUnlock = false;
    }

    reset(){
        // 重置所有墙段的健康组件
        this.wallMap.forEach((data) => {
            if (data.health) {
                data.health.reset();
            }
        });
    }

    public showUnlock(cb?: () => void): void {
        let callbackExecuted = false;
        this.wallParent.forEach((wallSegment) => {
            const data = this.wallMap.get(wallSegment);
            if (!data) return;
            
            tween(wallSegment)
                .to(0.3, { scale: data.initScale }, {easing: easing.backOut})
                .to(0.3, { worldPosition: data.initWPos }, {easing: easing.backOut})
                .call(() => {
                    wallSegment.setScale(data.initScale.x, data.initScale.y, data.initScale.z);
                    wallSegment.setWorldPosition(data.initWPos.x, data.initWPos.y, data.initWPos.z);

                    this.isUnlock = true;

                    // 只执行一次回调
                    if (!callbackExecuted) {
                        callbackExecuted = true;
                        cb?.();
                    }
                })
                .start();
        });
    }

    private onUnlockItem(type: BuildingType): void {
        if (type === this.wallType) {
            this.showUnlock(() => {
                if(type === BuildingType.Wall1 && this.wallGround){
                    this.wallGround.active = true;
                }
            })
        }

        if(type === BuildingType.Wall1 && this.wallType == BuildingType.Wall){
            this.wallParent.forEach((wallSegment) => {
                tween(wallSegment)
                    .to(0.3, { scale: Vec3.ZERO }, {easing: easing.backOut})
                    .start();
            });
            this.showLock();
            this.reset();
        }
    }


    private onHurt(damageData: DamageData, wallSegment: Node): void {
        const data = this.wallMap.get(wallSegment);
        if (!data) return;
        
        // 对该墙段进行治疗（恢复伤害）
        if (data.health) {
            let healNum = (1 - data.health.healthPercentage) * damageData.damage + 0.1;
            data.health.heal(healNum);
        }
        
        // 墙体受击震动
        tween(wallSegment)
            .to(0.1, { eulerAngles: new Vec3(data.initEul.x - 10, data.initEul.y, data.initEul.z) })
            .to(0.1, { eulerAngles: data.initEul })
            .start();

        // 闪红逻辑
        tween(wallSegment)
            .call(() => {
                this.setWallColor(wallSegment, Color.RED);
            })
            .delay(0.1)
            .call(() => {
                this.restoreWallColor(wallSegment);
            })
            .start();
    }

    /**
     * 单个墙段死亡回调
     */
    private onSegmentDead(wallSegment: Node): void {
        // 检查是否所有墙段都死亡
        let allDead = true;
        this.wallMap.forEach((data) => {
            if (data.health && !data.health.isDead) {
                allDead = false;
            }
        });
        
        if (allDead) {
            this.onDead();
        }
    }

    /**
     * 递归收集节点树中所有 MeshRenderer 的初始颜色，存入 _initColorMap
     */
    private _cacheInitColors(node: Node): void {
        const meshRenderer = node.getComponent(MeshRenderer);
        if (meshRenderer) {
            const colors: Color[] = [];
            const count = meshRenderer.sharedMaterials.length;
            for (let i = 0; i < count; i++) {
                const mat = meshRenderer.getMaterialInstance(i);
                // mainColor 可能不存在（材质未暴露该属性），默认存 WHITE 作为兜底
                const raw = mat?.getProperty('mainColor');
                const color = (raw instanceof Color) ? raw.clone() : new Color(255, 255, 255, 255);
                colors.push(color);
            }
            this._initColorMap.set(node.uuid, colors);
        }
        for (const child of node.children) {
            this._cacheInitColors(child);
        }
    }

    /**
     * 递归设置节点及其子节点 MeshRenderer 的颜色（使用专属材质实例）
     */
    private setWallColor(node: Node, color: Color): void {
        const meshRenderer = node.getComponent(MeshRenderer);
        if (meshRenderer) {
            const count = meshRenderer.sharedMaterials.length;
            for (let i = 0; i < count; i++) {
                meshRenderer.getMaterialInstance(i)?.setProperty('mainColor', color);
            }
        }
        for (const child of node.children) {
            this.setWallColor(child, color);
        }
    }

    /**
     * 恢复节点树中所有 MeshRenderer 的初始颜色
     */
    private restoreWallColor(node: Node): void {
        const meshRenderer = node.getComponent(MeshRenderer);
        if (meshRenderer) {
            const colors = this._initColorMap.get(node.uuid);
            const count = meshRenderer.sharedMaterials.length;
            for (let i = 0; i < count; i++) {
                const initColor = colors?.[i] ?? Color.WHITE;
                meshRenderer.getMaterialInstance(i)?.setProperty('mainColor', initColor);
            }
        }
        for (const child of node.children) {
            this.restoreWallColor(child);
        }
    }

    private onDead(): void {
        this.node.removeFromParent();
        app.event.emit(CommonEvent.GameFail);
    }
}
