import { _decorator, Component, director, Node, Vec3 } from 'cc';
import { Wall } from '../Building/Wall';
import { BuildingType, BuildUnlockState } from '../Common/CommonEnum';

const { ccclass, property } = _decorator;

/**
 * 墙管理器 - 管理场景中的所有墙体
 */
@ccclass('WallManager')
export class WallManager extends Component {
    /** 单例实例 */
    private static declare _instance: WallManager | null;
    
    /** 获取单例实例 */
    public static get instance(): WallManager {
        if (!this._instance) {
       //console.log('WallManager 实例不存在 动态创建');
            // 动态创建节点并添加组件
            const node = new Node('WallManager');
            this._instance = node.addComponent(WallManager);
            // 添加到场景
            director.getScene()?.addChild(node);
        }
        return this._instance as WallManager;
    }

    @property({
        type: Wall,
        displayName: '内墙体',
    })
    private wallInside: Wall = null;

    @property({
        type: Wall,
        displayName: '外墙体',
    })
    private wallOutside: Wall = null;



    @property({displayName: "范围检测节点", type: Node})
    public  rangeNode: Node[] = [];

    public get RangeNode(): Node[] {
        return this.rangeNode;
    }

    onLoad() {
        // 单例检查
        if (WallManager._instance) {
            this.node.destroy();
            return;
        }
        WallManager._instance = this;
        
        // 初始化时查找场景中已有的墙体
        this.initWalls();
    }
    
    onDestroy() {
        if (WallManager._instance === this) {
            WallManager._instance = null;
        }
    }

    /**
     * 查找场景中已有的墙体
     */
    private initWalls() {
    }

    /**
     * 获取攻击目标墙体
     * 如果外围墙解锁就返回外围墙，否则返回内围墙
     * @returns 攻击目标节点
     */
    public getAttackTarget(): Node | null {
        // 检查外围墙是否解锁
        const outsideWallUnlockItem = manager.game.unlockItemMap.get(BuildingType.Wall1);
        const isOutsideWallUnlocked = outsideWallUnlockItem && outsideWallUnlockItem.UnlockState === BuildUnlockState.Unlocked;
        
        if (isOutsideWallUnlocked) {
            // 外围墙已解锁，返回外围墙
            if (!this.wallOutside || !this.wallOutside.node || !this.wallOutside.node.isValid) {
           //console.warn('[WallManager] 外围墙攻击目标无效或不存在');
                return null;
            }
            return this.wallOutside.node;
        } else {
            // 外围墙未解锁，返回内围墙
            if (!this.wallInside || !this.wallInside.node || !this.wallInside.node.isValid) {
           //console.warn('[WallManager] 内围墙攻击目标无效或不存在');
                return null;
            }
            return this.wallInside.node;
        }
    }

    /**
     * 检查目标是否在范围内
     * 如果外围墙已解锁，范围会额外增加5个单位
     * @param target 目标节点
     * @param offset 偏移量
     * @returns 是否在范围内
     */
    public checkIsInRange(target:Node, offset: number): boolean {
        if(!this.rangeNode ) {
       //console.warn('[WallManager] 范围检测节点无效');
            return false;
        }
        if(!target || !target.isValid) {
       //console.warn('[WallManager] 目标节点无效');
            return false;
        }
        
        try {
            const targetPos = target.getWorldPosition();
            this.rangeNode.forEach(node => {
                if(!node || !node.isValid) {
               //console.warn('[WallManager] 范围检测节点无效');
                    return false;
                }
                const rangePos = node.getWorldPosition();
                const distance = Vec3.distance(targetPos, rangePos);
                const rangeRadius = Math.max(node.scale.x, node.scale.z) / 2; // 使用X和Z轴的最大值

                // 检查外围墙是否解锁，如果解锁则范围增加5
                const outsideWallUnlockItem = manager.game.unlockItemMap.get(BuildingType.Wall1);
                const isOutsideWallUnlocked = outsideWallUnlockItem && outsideWallUnlockItem.UnlockState === BuildUnlockState.Unlocked;
                const extraRange = isOutsideWallUnlocked ? 5 : 0;
                
                const result = distance <= offset + rangeRadius + extraRange;
                
                // // 调试信息
                // if (result) {
                ////console.log(`[WallManager] 目标在范围内: distance=${distance.toFixed(2)}, range=${rangeRadius.toFixed(2)}, offset=${offset.toFixed(2)}, extraRange=${extraRange}, result=${result}`);
                // }
                
                return result;
            });
            
        
            
        } catch (error) {
       //console.error('[WallManager] 范围检测出错:', error);
            return false;
        }
    }

    public reset(): void {
        this.wallInside.showLock();
        this.wallInside.reset();
        this.wallOutside.showLock();
        this.wallOutside.reset();
    }
}