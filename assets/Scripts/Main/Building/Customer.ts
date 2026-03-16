import { _decorator, Component, easing, Enum, Event, Label, Node, Tween, tween, v3, Vec3 } from 'cc';
import { ModelAnimationComponent } from '../Components/ModelAnimationComponent';
import { PoolObjectBase } from '../../Main/Common/PoolObjectBase';
import { ObjectType } from '../../Main/Common/CommonEnum';
import { ComponentEvent } from '../../Main/Common/ComponentEvents';
import { PickupComponent } from '../Components/PickupComponent';
import { DropItemCom } from '../Drop/DropItemCom';

const { ccclass, property } = _decorator;

@ccclass('CustomerNeedIcon')
export class CustomerNeedIcon {
    @property({type:Enum(ObjectType), displayName: '需求类型', })
    public needObjectType: ObjectType = ObjectType.DropItemWood;
    @property({type: Node, displayName: '需求图标节点'})
    public iconNode: Node = null!;
}

@ccclass('Customer')
export class Customer extends PoolObjectBase {
    @property({type: [CustomerNeedIcon], displayName: '需求图标'})
    private customerNeedIcons: CustomerNeedIcon[] = [];

    @property({type: PickupComponent, displayName: '拾取组件'})
    private pickupComponent: PickupComponent = null!;

    @property({type:Enum(ObjectType), displayName: '需求类型', })
    public needObjectType: ObjectType = ObjectType.DropItemWood;

    @property({type: ModelAnimationComponent, displayName: '动画组件'})
    private animationComponent: ModelAnimationComponent = null!;

    @property({type: Node, displayName: 'UI节点', tooltip: '需要始终面向Z轴的UI节点'})
    public uiNode: Node = null!;

    @property({type: Node, displayName: '需求节点'})
    private angryNode: Node = null!;

    @property({type: Node, displayName: '快乐节点'})
    private happyNode: Node = null!;
    
    @property({type: Node, displayName: '不高兴节点'})
    private unhappyNode: Node = null!;

    @property({type: Label, displayName: '剩余需要数量'})
    private needObjectCountLabel: Label = null!;

    private _needObjectCount: number = 0;
    private _isMoving: boolean = false; // 是否正在移动
    private _isReadyToBuy: boolean = false; // 是否准备好购买（已站定）
    
    public get isMoving(): boolean {
        return this._isMoving;
    }
    
    public get isReadyToBuy(): boolean {
        return this._isReadyToBuy;
    }

    protected onLoad(): void {
        this.node.on(ComponentEvent.UPDATE_ITEM_COUNT, this.onUpdateItemCount, this);
    }

    protected update(dt: number): void {
        this.uiNode?.setWorldRotationFromEuler(0,0,0);
    }

    public CherkNeedObject(): boolean {
        return this.GetNeedObjectCount() - this.pickupComponent.getFlyingItemCount(this.needObjectType) > 0;
    }

    public GetNeedObjectCount(): number {
        return this._needObjectCount - this.pickupComponent.getItemCount(this.needObjectType);
    }
    
    public GetTotalObjectNeed(): number {
        return this._needObjectCount;
    }

    public pickUpItem(item:DropItemCom, cb?:()=>void){
        this.pickupComponent.pickupItem(item, cb);
    }

    private onUpdateItemCount(type:ObjectType,  count:number): void {
        if(type !== this.needObjectType){
            return;
        }
        this.updateNeedCountDisplay();
    }
    
    /**
     * 更新需求数量显示
     */
    private updateNeedCountDisplay(): void {
        if (this.needObjectCountLabel) {
            const remainingNeed = this.GetNeedObjectCount();
            this.needObjectCountLabel.string = remainingNeed.toString();
        }
    }
    
    public setReadyToBuy(ready: boolean): void {
        this._isReadyToBuy = ready;
    }
    
    public MoveToWorldPos(pos: Vec3, cb?: () => void) {
        Tween.stopAllByTarget(this.node);
        
        // 设置移动状态
        this._isMoving = true;
        this._isReadyToBuy = false;
        
        // 计算移动距离来确定移动时间，实现匀速移动
        const currentPos = this.node.getWorldPosition();
        const distance = Vec3.distance(currentPos, pos);
        const speed = 8; // 移动速度：单位/秒
        const moveDuration = distance / speed; // 确保有最小移动时间
        
        tween(this.node).to(moveDuration, {
            worldPosition: pos
        }, {
            onUpdate: (target, ratio) => {
                if(ratio === undefined || ratio > 0.9){
                    return;
                }
                // 朝向目标
                const targetPos = pos;
                const direction = new Vec3();
                Vec3.subtract(direction, targetPos, currentPos);
                // const direction = new Vec3(1, 0, -1);
                direction.normalize();
                
                this.node.emit(ComponentEvent.SET_FACE_DIRECTION_FROM_3D, direction);
            }
        })
        .call(()=>{
            // 移动完成
            this._isMoving = false;
            this._isReadyToBuy = true; // 站定后准备购买
            
            // 移动完成后播放空闲动画
            if (this.animationComponent) {
                this.animationComponent.playIdle();
            }
            
            cb && cb();
        })
        .start();
        
        // 移动时播放移动动画
        if (this.animationComponent) {
            this.animationComponent.playMove(2);
        }
    }
    /**显示不高兴节点 */
    public showUnhappy(): void {
        if(this.unhappyNode.active){
            return;
        }
        this.angryNode.active = false;
        this.happyNode.active = false;
        this.unhappyNode.active = true;
        this.unhappyNode.setScale(0,0,0)
        tween(this.unhappyNode).to(0.5, {
            scale: v3(0.006,0.006,0.006)
        }, {
            easing: easing.backOut
        }).start();
    }
    public showNeed(){
        this.angryNode.active = true;
        this.happyNode.active = false;
        this.unhappyNode.active = false;
        this.happyNode.setScale(0,0,0)
        this.unhappyNode.setScale(0,0,0)

        tween(this.happyNode).to(0.5, {
            scale: v3(0.006,0.006,0.006)
        }, {
            easing: easing.backOut
        }).start();
       
    }

    public showHappy(): void {
        this.angryNode.active = false;
        this.happyNode.active = true;
        this.unhappyNode.active = false;
        this.happyNode.setScale(0,0,0)

        tween(this.happyNode).to(0.5, {
            scale: v3(0.006,0.006,0.006)
        }, {
            easing: easing.backOut
        }).start();
    }

    public hideNeed(): void {
        this.angryNode.active = false;
        this.happyNode.active = false;
        this.unhappyNode.active = false;
    }

    /**
     * 重置对象（对象池回收时调用）
     */
    public reset(): void {
        this._needObjectCount = 5; // 默认需要5个
        this.pickupComponent.reset();
        this._isMoving = false;
        this._isReadyToBuy = false;
        Tween.stopAllByTarget(this.node);
        // 重置时隐藏所有需求节点，确保初始状态正确
        this.hideNeed();
    }

    /**
     * 初始化顾客（从对象池获取时调用）
     * @param needObjectCount 需要的商品数量
     */
    public init(needObjectCount: number = 1, shopItemType: ObjectType = ObjectType.DropItemWood): void {
        this._needObjectCount = needObjectCount;
        this._isMoving = false;
        this._isReadyToBuy = false;
        this.needObjectType = shopItemType;

        this.customerNeedIcons.forEach((item) => {
            if(item.needObjectType === shopItemType){
                item.iconNode.active = true;
            }else{
                item.iconNode.active = false;
            }
        })
        
        // 更新需求数量显示
        if (this.needObjectCountLabel) {
            this.needObjectCountLabel.string = this._needObjectCount.toString();
        }
        
        // 初始化时隐藏需求节点，由队列管理统一控制显示
        this.hideNeed();
        
        if (this.animationComponent) {
            this.animationComponent.playMove(); // 使用正确的方法播放移动动画
        }
    }
    
    /**
     * 设置顾客移动状态
     * @param moving 是否正在移动
     */
    public setMoving(moving: boolean): void {
        this._isMoving = moving;
        if (!moving && this.animationComponent) {
            this.animationComponent.playIdle();
        } else if (moving && this.animationComponent) {
            this.animationComponent.playMove();
        }
    }
    
    /**
     * 检查顾客是否处于空闲状态（未移动且未购买）
     */
    public isIdle(): boolean {
        return !this._isMoving && !this._isReadyToBuy;
    }
}