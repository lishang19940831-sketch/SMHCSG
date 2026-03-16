import { _decorator } from "cc";
import { DropItemCom } from "./DropItemCom";
import { ObjectType } from "../../Main/Common/CommonEnum";
const { ccclass } = _decorator;

/**
 * 大饼掉落物品类
 */
@ccclass('DropItemFlatbread')
export class DropItemFlatbread extends DropItemCom {
    onLoad() {
        this.objectType = ObjectType.DropItemFlatbread;
    }

    reset() {
        super.reset();
    }
}

