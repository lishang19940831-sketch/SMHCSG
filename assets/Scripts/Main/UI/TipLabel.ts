import { _decorator, Color, Component, Label, Node, tween, UIOpacity, Vec3 } from 'cc';
import { PoolObjectBase } from '../Common/PoolObjectBase';
const { ccclass, property } = _decorator;

@ccclass('TipLabel')
export class TipLabel extends PoolObjectBase {
    @property(Label)
    private label: Label = null!;

    @property(UIOpacity)
    private opacity: UIOpacity = null!;

    public showTip(Tip: string, worldPos: Vec3, color?: Color) {
        this.label.string = Tip;
        this.node.active = true;
        
        // 设置位置
        this.node.setWorldPosition(worldPos);
        // 设置颜色
        if(color){
            this.label.color = color;
        }
        this.opacity.opacity = 255;

        const pos = this.node.getPosition().add(new Vec3(0, 3, 0));

        // 设置动画
        tween(this.node)
            .delay(0.3)
            .to(0.3, { 
                position: pos
            })
            .start();

        tween(this.opacity)
            .delay(0.3)
            .to(0.3, { opacity: 0 })
            .call(() => {
                this.node.active = false;
                manager.pool.putNode(this.node);
            })
            .start();
    }
    
    public reset(): void {
        this.label.string = '';
        this.opacity.opacity = 0;
        this.node.active = false;
    }
}


