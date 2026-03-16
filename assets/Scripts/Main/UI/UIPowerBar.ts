import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIPowerBar')
export class UIPowerBar extends Component {
    @property({type: Node, displayName: '电量显示节点列表'})
    public powerNodes: Node = null;
    
    protected onLoad(): void {
        this.powerNodes.children.forEach(node => {
            node.active = false;
        });
    }

    /**
     * 按百分比更新电量显示
     * @param percentage 百分比值 (0-1范围，0表示0%，1表示100%)
     */
    public updatePower(percentage: number): void {
        // 确保百分比在有效范围内
        percentage = Math.max(0, Math.min(1, percentage));
        
        // 根据百分比计算要显示的节点数量
        const activeCount = Math.floor(percentage * this.powerNodes.children.length);
        
        // 更新节点显示状态
        for(let i = 0; i < this.powerNodes.children.length; i++){
            this.powerNodes.children[i].active = i < activeCount;
        }
    }
}


