import { _decorator, Tween, tween, Vec3, Node, MeshRenderer, Color } from "cc";
import { PoolObjectBase } from "../../Main/Common/PoolObjectBase";
import { ComponentEvent } from "../Common/ComponentEvents";
import { ObjectType } from "../Common/CommonEnum";
const { ccclass, property } = _decorator;

@ccclass('DropItemCom')
export class DropItemCom extends PoolObjectBase {
    public canPickup: boolean = false;

    private tween: Tween<Node> = null!;

    /**
     * 播放掉落后的旋转动画
     */
    public showRotate(){
        // Tween.stopAllByTarget(this.node);
        // this.node.setRotationFromEuler(-90, 0, 0);
        // this.tween = tween(this.node)
        //     .by(1, { eulerAngles: new Vec3(0, 360, 0) })
        //     .repeatForever()
        //     .start();
    }

    OnPickUpFinish(){
        this.node.emit(ComponentEvent.PICKUP_ITEM_FINISH, this.objectType);
    }

    reset(){
        this.canPickup = false;
        this.node.setRotationFromEuler(0, 0, 0);
        Tween.stopAllByTarget(this.node);
        this.node.setScale(1, 1, 1);
        this.resetColor(this.node);
    }

    onDestroy(){
        console.warn(`[DropItemCom] onDestroy! name=${this.node?.name}`, new Error().stack);
    }

    private resetColor(node: Node) {
        //只有肉这么做，其他物品不需要
        return;
        const meshRenderer = node.getComponent(MeshRenderer);
        if (meshRenderer && meshRenderer.material) {
            meshRenderer.material.setProperty('emissive', new Color(0, 0, 0, 255));
        }
        node.children.forEach(child => this.resetColor(child));
    }
}