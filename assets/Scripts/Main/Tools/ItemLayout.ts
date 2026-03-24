import { _decorator, CCFloat, CCInteger, Component, Node, Vec3 } from 'cc';
import { ComponentEvent } from '../../Main/Common/ComponentEvents';
const { ccclass, property } = _decorator;

export interface LayoutItem {
    isFull: boolean; // 是否已经占位
    node: Node | null; // 修改为可为null
    isAdded: boolean; // 是否已经添加
}

export interface ItemLayoutPosition {
    row: number;
    column: number;
    layer: number;
}

@ccclass('ItemLayout')
export class ItemLayout extends Component {
    @property({
        type: CCInteger,
        tooltip: '布局的列数'
    })
    public columns: number = 5;

    @property({
        type: CCInteger,
        tooltip: '布局的行数'
    })
    public rows: number = 3;

    @property({
        type: CCFloat,
        tooltip: '子物体的Y间距'
    })
    public spacingY: number = 1;

    @property({
        type: CCFloat,
        tooltip: '子物体的X间距'
    })
    public spacingX: number = 1;

    @property({
        type: CCFloat,
        tooltip: '子物体的Z间距'
    })
    public spacingZ: number = 1;

    @property({
        type: CCInteger,
        tooltip: '最大层数限制，超出此层数的物品将被销毁'
    })
    public maxLayerLimit: number = 10;

    

    // 存储所有子物体  key: 位置 row_column_layer  value: 子物体数据
    private items: Map<string, LayoutItem> = new Map();
    private maxLayer: number = 1; // 修改初始值为1，确保至少有一层

    protected onLoad(): void {
        this.node.removeAllChildren();
        this.items.clear();
        this.maxLayer = 1; // 修改初始值为1
    }

    private getKey(lpos: ItemLayoutPosition): string {
        return `${lpos.row}_${lpos.column}_${lpos.layer}`;
    }

    private deserializationKey(key: string): {lpos: ItemLayoutPosition} {
        const arr = key.split('_');
        return {
            lpos: {
                row: parseInt(arr[0]),
                column: parseInt(arr[1]),
                layer: parseInt(arr[2])
            }
        }
    }

    /**
     * 检查位置是否在有效范围内
     */
    private isValidPosition(lpos: ItemLayoutPosition): boolean {
        return lpos.row >= 0 && lpos.row < this.rows &&
               lpos.column >= 0 && lpos.column < this.columns &&
               lpos.layer >= 0;
    }

    /**
     * 添加物品到布局中
     */
    public addItem(node: Node, lpos?: ItemLayoutPosition): ItemLayoutPosition | null {
        if (!node) {
       //console.warn('添加的节点不能为空');
            return null;
        }

        let position: ItemLayoutPosition;
        
        if (lpos) {
            // 使用指定位置
            if (!this.isValidPosition(lpos)) {
           //console.warn(`指定位置超出布局范围: row=${lpos.row}, column=${lpos.column}, layer=${lpos.layer}`);
                return null;
            }
            
            const key = this.getKey(lpos);
            const existingItem = this.items.get(key);
            if (existingItem && existingItem.isFull) {
           //console.warn(`位置 ${key} 已被占用`);
                return null;
            }
            position = lpos;
        } else {
            // 自动寻找空位置
            position = this.getCurrEmptyPosition();
            if (!position) {
           //console.warn('没有可用的空位置');
                return null;
            }
        }

        // 添加节点到布局
        const key = this.getKey(position);
        const worldPos = this.getItemPosition(position);
        
        node.setParent(this.node, true);
        node.setWorldPosition(worldPos);
        node.setRotationFromEuler(0, 0, 0);
        
        this.items.set(key, {
            node: node,
            isFull: true,
            isAdded: true
        });
        
        this.maxLayer = Math.max(this.maxLayer, position.layer + 1);
        
        // 触发物品数量变化事件
        this.node.emit(ComponentEvent.ITEM_COUNT_CHANGED, this.getItemCount());
        
        return position;
    }

    /**
     * 占位
     */
    public reserveItem(lpos: ItemLayoutPosition): boolean {
        if (!this.isValidPosition(lpos)) {
       //console.warn(`占位位置超出布局范围: row=${lpos.row}, column=${lpos.column}, layer=${lpos.layer}`);
            return false;
        }

        const key = this.getKey(lpos);
        let data = this.items.get(key);
        if (data) {
            if (data.isFull == false) {
                data.isFull = true;
                data.isAdded = false;
                return true;
            }else{
           //console.warn(`${key} 已经占位`);
                return false;
            }
        }else{
            this.items.set(key, { node: null, isAdded: false, isFull: true });
            this.maxLayer = Math.max(this.maxLayer, lpos.layer + 1);
            return true;
        }
    }

    /**
     * add已经占的位置  
     */
    public addItemToReserve(node: Node, lpos: ItemLayoutPosition): boolean {
        if (!node) {
       //console.warn('添加的节点不能为空');
            return false;
        }

        const key = this.getKey(lpos);
        let data = this.items.get(key);
        if (data) {
            if (data.isFull == true && data.isAdded == false) {
                // data.node = node; // 设置节点
                // data.isAdded = true;
                
                // // 设置节点位置
                // const worldPos = this._caculateItemPosition(lpos);
                // node.setParent(this.node);
                // node.setPosition(worldPos);
                this.items.delete(key);

                const result = this.addItem(node);
                // addItem 方法内部已经会触发事件，所以这里不需要重复触发
                
                return result !== null;
            }else{
           //console.warn(`${key} 存在数据但是未提前占位或者已经添加`);
                return false;
            }
        }else{
       //console.warn(`${key} 不存在 未提前占位`);
            return false;
        }
    }

    public removeItem(lpos: ItemLayoutPosition): boolean {
        const key = this.getKey(lpos);
        // const item = this.items.get(key);
        // if (item && item.node) {
        //     item.node.removeFromParent();
        // }
        const result = this.items.delete(key);
        if (result) {
            // 触发物品数量变化事件
            this.node.emit(ComponentEvent.ITEM_COUNT_CHANGED, this.getItemCount());
        }
        return result;
    }

    public removeItemByNode(node: Node): boolean {
        for (const [key, item] of this.items) {
            if (item.node === node) {
                return this.removeItem(this.deserializationKey(key).lpos);
            }
        }
        return false;
    }

    public getItem(lpos: ItemLayoutPosition): LayoutItem | undefined {
        const key = this.getKey(lpos);
        return this.items.get(key);
    }
    
    public getCurrEmptyPosition(): ItemLayoutPosition | null {
        // 优先查找现有层中的空位置（包括已删除的物品位置）
        for (let layer = 0; layer < this.maxLayer; layer++) {
            for (let row = 0; row < this.rows; row++) {
                for (let column = 0; column < this.columns; column++) {
                    const key = this.getKey({row, column, layer});
                    const item = this.items.get(key);
                    if (!item || !item.isFull) {
                        return {row, column, layer};
                    }
                }
            }
        }

        // 如果所有现有层都满了，检查是否还能新增层
        if (this.maxLayer < this.maxLayerLimit) {
            // 还可以新增层数，创建新层
            for (let row = 0; row < this.rows; row++) {
                for (let column = 0; column < this.columns; column++) {
                    return {row, column, layer: this.maxLayer};
                }
            }
        }

        // 层数超限且所有位置都满了，返回null
        return null;
    }

    /**
     * 检查是否层数超限且所有位置都满了
     */
    public isLayerLimitExceeded(): boolean {
        // 检查是否达到最大层数限制且所有位置都满了
        if (this.maxLayer < this.maxLayerLimit) {
            return false; // 还可以新增层数，不算超限
        }

        // 达到层数限制，检查是否还有空位置
        for (let layer = 0; layer < this.maxLayer; layer++) {
            for (let row = 0; row < this.rows; row++) {
                for (let column = 0; column < this.columns; column++) {
                    const key = this.getKey({row, column, layer});
                    const item = this.items.get(key);
                    if (!item || !item.isFull) {
                        return false; // 还有空位置，不算超限
                    }
                }
            }
        }

        return true; // 层数达到限制且所有位置都满了
    }

    /**
     * 获取最后一个有效位置（最大层的最后一个位置）
     * 用于物品飞行动画的目标位置，即使容器满了也要飞到这里
     */
    public getLastValidPosition(): ItemLayoutPosition {
        return {
            row: this.rows - 1,
            column: this.columns - 1,
            layer: Math.min(this.maxLayer - 1, this.maxLayerLimit - 1)
        };
    }

    /**
     * 获取最外层物品
     */
    public getOuterItems(num: number): Node[] {
        const result: Node[] = [];
        if (num <= 0) {
            return result;
        }
        for (let layer = this.maxLayer - 1; layer >= 0; layer--) {
            for (let row = this.rows - 1; row >= 0; row--) {
                for (let column = this.columns - 1; column >= 0; column--) {
                    const key = this.getKey({ row, column, layer });
                    const item = this.items.get(key);
                    if (item && item.isFull && item.isAdded && item.node) {
                        result.push(item.node);
                        if (result.length >= num) {
                            return result;
                        }
                    }
                }
            }
        }
        return result;
    }

    public getItemCount(): number {
        let count = 0;
        for (const [key, item] of this.items) {
            if (item.isFull && item.isAdded) {
                count++;
            }
        }
        return count;
    }

    /**
     * 获取当前布局中所有已添加的物品节点（不清除，仅读取）
     * 用于卸货飞行动画：先取出所有节点，再调用 clearAllItems 重置布局
     */
    public getAllItemNodes(): Node[] {
        const result: Node[] = [];
        for (const [, item] of this.items) {
            if (item.node && item.isAdded) {
                result.push(item.node);
            }
        }
        return result;
    }

    /**
     * 清空所有物品（同时调用 removeFromParent 解除节点挂载）
     */
    public clearAllItems(): void {
        const hadItems = this.getItemCount() > 0;
        for (const [key, item] of this.items) {
            if (item.node) {
                item.node.removeFromParent();
            }
        }
        this.items.clear();
        this.maxLayer = 1;
        
        // 如果之前有物品，触发物品数量变化事件
        if (hadItems) {
            this.node.emit(ComponentEvent.ITEM_COUNT_CHANGED, 0);
        }
    }

    /**
     * 卸货专用：清空布局记录但【不】调用 removeFromParent。
     * 调用方负责在此之前把节点挂到新的父节点（如 EffectManager.node），
     * 避免节点在无父节点状态下被 active=true，从而被 Cocos 帧末自动销毁。
     */
    public detachAllItems(): void {
        const hadItems = this.getItemCount() > 0;
        this.items.clear();
        this.maxLayer = 1;
        if (hadItems) {
            this.node.emit(ComponentEvent.ITEM_COUNT_CHANGED, 0);
        }
    }

    private _caculateItemPosition(position: ItemLayoutPosition): Vec3 {
        return new Vec3(
            position.column * this.spacingX,
            position.layer * this.spacingY,
            position.row * this.spacingZ
        );
    }

    public getItemPosition(position: ItemLayoutPosition): Vec3 {
        // 获取局部坐标偏移
        const localOffset = this._caculateItemPosition(position);
        
        // 创建临时结果向量
        const result = new Vec3();
        
        // 使用节点的世界矩阵将局部坐标转换为世界坐标
        // 这会正确处理所有父节点的旋转、缩放和位移
        Vec3.transformMat4(result, localOffset, this.node.getWorldMatrix());
        
        return result;
    }

    public reset(): void {
        this.items.clear();
        this.maxLayer = 1;
        this.node.removeAllChildren();
    }

}



