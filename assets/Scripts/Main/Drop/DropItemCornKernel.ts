import { _decorator, Tween } from "cc";
import { DropItemCom } from "./DropItemCom";
import { ObjectType } from "../../Main/Common/CommonEnum";
const { ccclass } = _decorator;

/**
 * 麦子（玉米粒）掉落物品类
 */
@ccclass('DropItemCornKernel')
export class DropItemCornKernel extends DropItemCom {
    onLoad() {
        this.objectType = ObjectType.DropItemCornKernel;
    }

    reset() {
        super.reset();
    }
}

