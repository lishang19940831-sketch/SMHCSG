import { _decorator, Animation, Component, easing, Node, tween, v3, Vec3 } from 'cc';
import { BuildingBase } from './BuildingBase';
import { Lumberjack } from '../Role/Lumberjack';
import { BuildingType } from '../Common/CommonEnum';

const { ccclass, property } = _decorator;

@ccclass('BuildingLumberjack')
export class BuildingLumberjack extends BuildingBase {
    @property({ type: Node, displayName: '建筑模型' })
    protected model: Node = null!;

    @property({ type: Node, displayName: '解锁后伐木工移动道德位置点' })
    protected movePos: Node = null!;

    @property({ type: Node, displayName: '每次去砍树先去的位置' })
    protected treePos: Node = null!;

    @property({ type: Node, displayName: '商店位置（交付木头的目标位置）' })
    protected shopPos: Node = null!;

    @property({ type: Lumberjack, displayName: '伐木工人' })
    protected lumberjack: Lumberjack = null!

    protected onLoad(): void {
        super.onLoad();
        // 根据建筑类型设置伐木工人的目标列表类型
        this.setLumberjackType();
    }

    /**
     * 根据建筑类型设置伐木工人的目标列表类型
     */
    private setLumberjackType(): void {
        if (this.lumberjack) {
            // 根据建筑类型设置伐木工人类型
            this.lumberjack.lumberjackType = this.Type;
        }
    }

    protected async showUnlockAnim(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.model.active = true;
            this.model.setScale(new Vec3(0, 0, 0));
            this.lumberjack.node.active = true;
            this.lumberjack.node.setScale(0.1, 0.1, 0.1);
            this.lumberjack.enableAI = false;
            tween(this.model)
                .to(0.5, {scale: new Vec3(0.4, 0.4, 0.4)}, {easing: easing.backOut})
                .call(() => {
                    tween(this.lumberjack.node)
                        .to(0.5, {scale: v3(1,1,1)}, {easing: easing.backOut})
                        .start();
                    resolve();
                })
                .start();
        });
    }

    protected async showlock() {
        this.model.active = false;
        this.lumberjack.node.active = false;
        this.lumberjack.node.setScale(0.1, 0.1, 0.1);
        this.lumberjack.enableAI = false;
        this.lumberjack.node.setWorldPosition(this.node.getWorldPosition());
        this.lumberjack.reset();
    }
    
    protected onUnlockFinished(): void {
        // 确保伐木工人类型正确设置
        this.setLumberjackType();
        
        // 初始化伐木工，设置砍树前的位置和商店位置
        if (this.treePos && this.shopPos) {
            this.lumberjack.init(this.treePos.getWorldPosition(), this.shopPos.getWorldPosition());
        } else {
       //console.warn('BuildingLumberjack: treePos 或 shopPos 未设置');
        }
        
        // 子类重写
        this.lumberjack.movementComponent.moveToWorldPosition(this.movePos.getWorldPosition(), ()=>{
            this.scheduleOnce(()=>{
                this.lumberjack.enableAI = true;
            }, 0.3);
        });
    }
}
