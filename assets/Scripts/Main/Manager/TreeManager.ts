import { _decorator, Component, director, Node, Vec3 } from 'cc';
import { Tree } from '../Role/Tree';

const { ccclass, property } = _decorator;

/**
 * 树木列表类型枚举
 */
export enum TreeListType {
    /** 第一个列表 */
    LIST_1 = 0,
    /** 第二个列表 */
    LIST_2 = 1
}

/**
 * 树管理器 - 管理场景中的所有树木
 */
@ccclass('TreeManager')
export class TreeManager extends Component {
    /** 单例实例 */
    private static declare _instance: TreeManager | null;
    
    /** 获取单例实例 */
    public static get instance(): TreeManager {
        if (!this._instance) {
       //console.log('TreeManager 实例不存在 动态创建');
            // 动态创建节点并添加组件
            const node = new Node('TreeManager');
            this._instance = node.addComponent(TreeManager);
            // 添加到场景
            director.getScene()?.addChild(node);
        }
        return this._instance as TreeManager;
    }

    @property({
        type: Node,
        displayName: '树木父节点1',
    })
    private treeParent1: Node = null!;

    @property({
        type: Node,
        displayName: '树木父节点2',
    })
    private treeParent2: Node = null!;

    /** 第一个树木列表 */
    private treeList1: Tree[] = [];
    
    /** 第二个树木列表 */
    private treeList2: Tree[] = [];

    onLoad() {
        // 单例检查
        if (TreeManager._instance) {
            this.node.destroy();
            return;
        }
        TreeManager._instance = this;
        
        // 设置常驻节点，切换场景不销毁
        director.addPersistRootNode(this.node);
        
        // 初始化时查找场景中已有的树木
        this.findExistingTrees();
    }
    
    onDestroy() {
        if (TreeManager._instance === this) {
            TreeManager._instance = null;
        }
    }

    /**
     * 查找场景中已有的树木
     */
    private findExistingTrees() {
        // 扫描第一个父节点
        if (this.treeParent1) {
            this.findTreesInNode(this.treeParent1, TreeListType.LIST_1);
        }
        
        // 扫描第二个父节点
        if (this.treeParent2) {
            this.findTreesInNode(this.treeParent2, TreeListType.LIST_2);
        }
    }

    /**
     * 递归查找节点中的树木
     * @param node 要查找的节点
     * @param listType 要添加到的列表类型
     */
    private findTreesInNode(node: Node, listType: TreeListType) {
        // 检查当前节点是否有Tree组件
        const treeComponent = node.getComponent(Tree);
        if (treeComponent && !this.getTreeList(listType).includes(treeComponent)) {
            this.addTree(treeComponent, listType);
        }
        
        // 递归查找子节点
        for (const child of node.children) {
            this.findTreesInNode(child, listType);
        }
    }

    /**
     * 获取指定类型的树木列表
     * @param listType 列表类型
     * @returns 对应的树木列表
     */
    private getTreeList(listType: TreeListType): Tree[] {
        return listType === TreeListType.LIST_1 ? this.treeList1 : this.treeList2;
    }

    /**
     * 添加树到管理器中
     * @param tree 树组件
     * @param listType 要添加到的列表类型，默认为LIST_1
     */
    public addTree(tree: Tree, listType: TreeListType = TreeListType.LIST_1) {
        // 全局去重检查：确保树木不会同时存在于两个列表中
        if (this.treeList1.includes(tree) || this.treeList2.includes(tree)) {
            // console.warn(`TreeManager: 树木 ${tree.node.name} 已存在于管理器中，跳过添加`);
            return;
        }

        const targetList = this.getTreeList(listType);
        targetList.push(tree);
        const listName = listType === TreeListType.LIST_1 ? '列表1' : '列表2';
   //console.log(`TreeManager: 添加树木 ${tree.node.name} 到${listName}, 该列表总数: ${targetList.length}`);
    }

    /**
     * 获取指定范围内的树木
     * @param centerPos 中心位置
     * @param range 范围半径
     * @param listType 要查询的列表类型，默认为LIST_1
     * @returns 范围内的树木数组
     */
    public getRangeTrees(centerPos: Vec3, range: number, listType: TreeListType = TreeListType.LIST_1): Tree[] {
        const treesInRange: Tree[] = [];
        const rangeSquared = range * range;
        const targetList = this.getTreeList(listType);
        
        for (const tree of targetList) {
            if (!tree || !tree.node || !tree.node.isValid || tree.isDead) {
                continue;
            }
            
            const treePos = tree.getWorldPosition();
            const distanceSquared = Vec3.squaredDistance(centerPos, treePos);
            
            if (distanceSquared <= rangeSquared) {
                treesInRange.push(tree);
            }
        }
        
        return treesInRange;
    }

    /**
     * 获取指定范围内的树木（带距离信息）
     * @param centerPos 中心位置
     * @param range 范围半径
     * @param listType 要查询的列表类型，默认为LIST_1
     * @returns 带距离信息的树木数据数组
     */
    public getRangeTreesWithDistance(centerPos: Vec3, range: number, listType: TreeListType = TreeListType.LIST_1): Array<{tree: Tree, distanceSquared: number}> {
        const treesWithDistance: Array<{tree: Tree, distanceSquared: number}> = [];
        const rangeSquared = range * range;
        const targetList = this.getTreeList(listType);
        
        for (const tree of targetList) {
            if (!tree || !tree.node || !tree.node.isValid || tree.isDead) {
                continue;
            }
            
            const treePos = tree.getWorldPosition();
            const distanceSquared = Vec3.squaredDistance(centerPos, treePos);
            
            if (distanceSquared <= rangeSquared) {
                treesWithDistance.push({
                    tree: tree,
                    distanceSquared: distanceSquared
                });
            }
        }
        
        // 按距离排序，最近的在前面
        treesWithDistance.sort((a, b) => a.distanceSquared - b.distanceSquared);
        
        return treesWithDistance;
    }

    /**
     * 获取最近的树木
     * @param centerPos 中心位置
     * @param maxRange 最大搜索范围（可选）
     * @param listType 要查询的列表类型，默认为LIST_1
     * @returns 最近的树木，没找到返回null
     */
    public getNearestTree(centerPos: Vec3, maxRange?: number, listType: TreeListType = TreeListType.LIST_1): Tree | null {
        let nearestTree: Tree | null = null;
        let nearestDistanceSquared = maxRange ? maxRange * maxRange : Infinity;
        const targetList = this.getTreeList(listType);
        
        for (const tree of targetList) {
            if (!tree || !tree.node || !tree.node.isValid || tree.isDead) {
                continue;
            }
            
            const treePos = tree.getWorldPosition();
            const distanceSquared = Vec3.squaredDistance(centerPos, treePos);
            
            if (distanceSquared < nearestDistanceSquared) {
                nearestDistanceSquared = distanceSquared;
                nearestTree = tree;
            }
        }
        
        return nearestTree;
    }

    /**
     * 获取所有活跃的树木
     * @param listType 要查询的列表类型，不传则返回两个列表的合并结果
     * @returns 活跃树木数组
     */
    public getAllActiveTrees(listType?: TreeListType): Tree[] {
        if (listType !== undefined) {
            const targetList = this.getTreeList(listType);
            return targetList.filter(tree => 
                tree && tree.node && tree.node.isValid && !tree.isDead
            );
        }
        
        // 返回两个列表的合并结果，并确保唯一性
        const allTrees = [...this.treeList1, ...this.treeList2];
        const uniqueTrees = Array.from(new Set(allTrees));
        return uniqueTrees.filter(tree => 
            tree && tree.node && tree.node.isValid && !tree.isDead
        );
    }

    /**
     * 获取树木总数
     * @param listType 要查询的列表类型，不传则返回两个列表的总和
     * @returns 树木总数
     */
    public getTreeCount(listType?: TreeListType): number {
        if (listType !== undefined) {
            return this.getTreeList(listType).length;
        }
        return this.treeList1.length + this.treeList2.length;
    }

    /**
     * 获取活跃树木数量
     * @param listType 要查询的列表类型，不传则返回两个列表的总和
     * @returns 活跃树木数量
     */
    public getActiveTreeCount(listType?: TreeListType): number {
        return this.getAllActiveTrees(listType).length;
    }

    /**
     * 清理无效的树木引用
     * @param listType 要清理的列表类型，不传则清理两个列表
     */
    public cleanupInvalidTrees(listType?: TreeListType) {
        if (listType !== undefined) {
            const targetList = this.getTreeList(listType);
            if (listType === TreeListType.LIST_1) {
                this.treeList1 = targetList.filter(tree => 
                    tree && tree.node && tree.node.isValid
                );
            } else {
                this.treeList2 = targetList.filter(tree => 
                    tree && tree.node && tree.node.isValid
                );
            }
        } else {
            // 清理两个列表
            this.treeList1 = this.treeList1.filter(tree => 
                tree && tree.node && tree.node.isValid
            );
            this.treeList2 = this.treeList2.filter(tree => 
                tree && tree.node && tree.node.isValid
            );
        }
    }

    /**
     * 重置所有树木
     * @param listType 要重置的列表类型，不传则重置两个列表
     */
    public resetAllTrees(listType?: TreeListType) {
        if (listType !== undefined) {
            const targetList = this.getTreeList(listType);
            for (const tree of targetList) {
                if (tree && tree.node && tree.node.isValid) {
                    tree.reset();
                }
            }
        } else {
            // 重置两个列表
            for (const tree of this.treeList1) {
                if (tree && tree.node && tree.node.isValid) {
                    tree.reset();
                }
            }
            for (const tree of this.treeList2) {
                if (tree && tree.node && tree.node.isValid) {
                    tree.reset();
                }
            }
        }
    }

    /**
     * 清除所有树木
     * @param listType 要清除的列表类型，不传则清除两个列表
     */
    public clearAllTrees(listType?: TreeListType) {
        if (listType !== undefined) {
            const targetList = this.getTreeList(listType);
            for (const tree of targetList) {
                if (tree && tree.node && tree.node.isValid) {
                    tree.node.destroy();
                }
            }
            if (listType === TreeListType.LIST_1) {
                this.treeList1 = [];
            } else {
                this.treeList2 = [];
            }
        } else {
            // 清除两个列表
            for (const tree of this.treeList1) {
                if (tree && tree.node && tree.node.isValid) {
                    tree.node.destroy();
                }
            }
            for (const tree of this.treeList2) {
                if (tree && tree.node && tree.node.isValid) {
                    tree.node.destroy();
                }
            }
            this.treeList1 = [];
            this.treeList2 = [];
        }
    }

    /**
     * 刷新树木列表（重新扫描场景）
     * @param listType 要刷新的列表类型，不传则刷新两个列表
     */
    public refreshTreeList(listType?: TreeListType) {
        // 清理无效引用
        this.cleanupInvalidTrees(listType);
        
        // 重新扫描场景
        if (listType !== undefined) {
            if (listType === TreeListType.LIST_1 && this.treeParent1) {
                this.findTreesInNode(this.treeParent1, TreeListType.LIST_1);
            } else if (listType === TreeListType.LIST_2 && this.treeParent2) {
                this.findTreesInNode(this.treeParent2, TreeListType.LIST_2);
            }
        } else {
            this.findExistingTrees();
        }
    }
}
