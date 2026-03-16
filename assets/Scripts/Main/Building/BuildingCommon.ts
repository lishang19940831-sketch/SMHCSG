import { _decorator, Animation, Component, Node } from 'cc';
import { BuildingType, BuildUnlockState, CommonEvent } from '../../Main/Common/CommonEnum';
import { BuildingBase } from './BuildingBase';

const { ccclass, property } = _decorator;

@ccclass('BuildingCommon')
export class BuildingCommon extends BuildingBase {
    @property({ type: Animation, displayName: '建筑解锁动画' })
    protected anim: Animation = null!;

    protected onLoad(): void {
        super.onLoad();
    }

    protected async showUnlockAnim(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.anim.node.active = true;
            this.anim.on(Animation.EventType.FINISHED, () => {
                resolve();
            });
            this.anim.play();
        });
    }

    protected async showlock() {
        this.anim.node.active = false;
    }
    
}
