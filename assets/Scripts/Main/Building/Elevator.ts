import { _decorator, Component, easing, Node, Tween, tween, v3, Vec3 } from 'cc';

const { ccclass, property } = _decorator;

export interface MoveParams {
    upNode?: Node, // 要跟往上的节点
    downNode?:Node, // 要跟往下的节点
    callback?:()=>void
}

@ccclass('Elevator')
export class Elevator extends Component {
    @property({type: Node, displayName: '升降梯左站立板'})
    public standBoardLeft: Node = null!;

    @property({type: Node, displayName: '升降梯右站立板'})
    public standBoardRight: Node = null!;

    @property({type: Number, displayName: '电梯移动时间'})
    private moveTime: number = 0.3;

    @property({type: Number, displayName: '电梯返回时间'})
    private moveTimeBack: number = 0.1;

    bottomHeight: number = 0.06;
    topHeight: number = 1.29;

    private shopNode:Node = null!;
    
    /** 电梯状态枚举 */
    private elevatorState: 'idle' | 'moving' | 'returning' = 'idle';
    
    /** 当前载客节点 */
    private currentUpNode: Node | null = null;
    private currentDownNode: Node | null = null;

    protected onLoad(): void {
        this.init()
    }

    /**
     * 初始化电梯站立板位置
     */
    private init() {
        // 保持原有的x和z坐标，只修改y坐标
        const rightPos = this.standBoardRight.getPosition();
        const leftPos = this.standBoardLeft.getPosition();
        this.standBoardRight.setPosition(rightPos.x, this.bottomHeight, rightPos.z);
        this.standBoardLeft.setPosition(leftPos.x, this.topHeight, leftPos.z);
    }

    public setShopNode(node:Node){
        this.shopNode = node;
    }

    public ShowUnlock(){
        this.node.active = true;
        this.node.setScale(0, 0, 0);
        tween(this.node).to(0.5, {scale: v3(1, 1, 1)}, {easing: easing.backOut}).start();
    }

    public reset(): void {
        this.node.active = false;
        this.node.setScale(0, 0, 0);
    }

    /**
     * 电梯运输
     */
    move(params: MoveParams) {
        if (this.elevatorState !== 'idle') {
       //console.warn('电梯正在运行中，无法启动新的运输');
            return;
        }
        
        this.elevatorState = 'moving';
        
        // 停止所有现有动画
        Tween.stopAllByTarget(this.standBoardRight);
        Tween.stopAllByTarget(this.standBoardLeft);
        
        // 重置电梯位置，保持原有的x和z坐标
        const rightPos = this.standBoardRight.getPosition();
        const leftPos = this.standBoardLeft.getPosition();
        this.standBoardRight.setPosition(rightPos.x, this.bottomHeight, rightPos.z);
        this.standBoardLeft.setPosition(leftPos.x, this.topHeight, leftPos.z);
        
        // 保存当前载客节点
        this.currentUpNode = params.upNode || null;
        this.currentDownNode = params.downNode || null;
        
        // 将顾客节点设置为电梯子节点
        if(this.currentUpNode){
            this.currentUpNode.setParent(this.standBoardRight, true);
            this.currentUpNode.setPosition(0, 0, 0); // 相对于电梯板的位置
        }
        if(this.currentDownNode){
            this.currentDownNode.setParent(this.standBoardLeft, true);
            this.currentDownNode.setPosition(0, 0, 0); // 相对于电梯板的位置
        }

        // 用于跟踪两个电梯板是否都完成了运输
        let completedCount = 0;
        const totalTasks = (this.currentUpNode ? 1 : 0) + (this.currentDownNode ? 1 : 0);
        
        const onElevatorComplete = () => {
            completedCount++;
            if (completedCount >= totalTasks) {
                // 所有电梯板都完成运输，调用回调
                params.callback?.();
            }
        };

        // 右电梯板上升（载客上行）
        if (this.currentUpNode) {
            const rightCurrentPos = this.standBoardRight.getPosition();
            tween(this.standBoardRight)
                .to(this.moveTime, { position: new Vec3(rightCurrentPos.x, this.topHeight, rightCurrentPos.z) })
                .call(() => {
                    // 释放上行顾客
                    if (this.currentUpNode) {
                        this.currentUpNode.setParent(this.shopNode, true); // 设置回原来的父节点
                        this.currentUpNode.setScale(1, 1, 1);
                    }
                    onElevatorComplete();
                })
                .start();
        }

        // 左电梯板下降（载客下行）
        if (this.currentDownNode) {
            const leftCurrentPos = this.standBoardLeft.getPosition();
            tween(this.standBoardLeft)
                .to(this.moveTime, { position: new Vec3(leftCurrentPos.x, this.bottomHeight, leftCurrentPos.z) })
                .call(() => {
                    // 释放下行顾客
                    if (this.currentDownNode) {
                        this.currentDownNode.setParent(this.shopNode, true); // 设置回原来的父节点
                        this.currentDownNode.setScale(1, 1, 1);
                    }
                    onElevatorComplete();
                })
                .start();
        }
        
        // 如果没有顾客需要运输，直接调用回调
        if (totalTasks === 0) {
            params.callback?.();
        }
    }

    /**
     * 电梯返回等待位置
     */
    back() {
        if (this.elevatorState === 'returning') {
            return; // 已经在返回中
        }
        
        this.elevatorState = 'returning';
        
        // 停止所有现有动画
        Tween.stopAllByTarget(this.standBoardRight);
        Tween.stopAllByTarget(this.standBoardLeft);
        
        // 设置当前位置（运输完成后的位置），保持原有的x和z坐标
        const rightPos = this.standBoardRight.getPosition();
        const leftPos = this.standBoardLeft.getPosition();
        this.standBoardRight.setPosition(rightPos.x, this.topHeight, rightPos.z);
        this.standBoardLeft.setPosition(leftPos.x, this.bottomHeight, leftPos.z);
        
        // 清理载客节点引用
        this.currentUpNode = null;
        this.currentDownNode = null;

        // 右电梯板下降到底部
        const rightCurrentPos = this.standBoardRight.getPosition();
        tween(this.standBoardRight)
            .to(this.moveTimeBack, { position: new Vec3(rightCurrentPos.x, this.bottomHeight, rightCurrentPos.z) })
            .call(() => {
                // 右电梯板返回完成
            })
            .start();

        // 左电梯板上升到顶部
        const leftCurrentPos = this.standBoardLeft.getPosition();
        tween(this.standBoardLeft)
            .to(this.moveTimeBack, { position: new Vec3(leftCurrentPos.x, this.topHeight, leftCurrentPos.z) })
            .call(() => {
                // 左电梯板返回完成，电梯回到空闲状态
                this.elevatorState = 'idle';
            })
            .start();
    }
    
    /**
     * 获取电梯状态
     */
    public getState(): 'idle' | 'moving' | 'returning' {
        return this.elevatorState;
    }
    
    /**
     * 检查电梯是否空闲
     */
    public isIdle(): boolean {
        return this.elevatorState === 'idle';
    }
    
    /**
     * 获取电梯移动时间
     */
    public getMoveTime(): number {
        return this.moveTime;
    }
}
