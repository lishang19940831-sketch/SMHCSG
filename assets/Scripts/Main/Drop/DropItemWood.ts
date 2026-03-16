import { _decorator, Tween, tween, Vec3, Node } from "cc";
import { DropItemCom } from "./DropItemCom";
import { ObjectType } from "../../Main/Common/CommonEnum";
const { ccclass, property } = _decorator;

/**
 * 木头掉落物品类
 */
@ccclass('DropItemWood')
export class DropItemWood extends DropItemCom {
    onLoad() {
        // 设置物品类型为木头
        this.objectType = ObjectType.DropItemWood;
    }

    /**
     * 播放掉落后的旋转动画
     */
    public showRotate() {
        // 可以在这里添加木头特有的掉落动画
        // 例如轻微的摇摆效果
        Tween.stopAllByTarget(this.node);
        
        // 轻微的左右摇摆动画
        tween(this.node)
            .by(0.5, { eulerAngles: new Vec3(0, 0, 5) })
            .by(1, { eulerAngles: new Vec3(0, 0, -10) })
            .by(1, { eulerAngles: new Vec3(0, 0, 10) })
            .by(0.5, { eulerAngles: new Vec3(0, 0, -5) })
            .repeatForever()
            .start();
    }

    reset() {
        super.reset();
        // 木头特有的重置逻辑可以在这里添加
    }
}
