import { _decorator, Collider, Component, Node, Tween, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SAFE')
export class SAFE extends Component {
    
    @property({type: Collider, displayName: '区域监听'})
    areaCollider: Collider = null!;
    start() {
        this.areaCollider.on('onTriggerEnter', this.onTriggerEnter, this);
        this.areaCollider.on('onTriggerExit', this.onTriggerExit, this);
    }

    update(deltaTime: number) {
        
    }
    private onTriggerEnter(selfCollider: Collider, otherCollider: Collider, event: any) {
        manager.game.hero.isSafeArea = true;
    }

    private onTriggerExit(selfCollider: Collider, otherCollider: Collider, event: any) {
        manager.game.hero.isSafeArea = false;
        manager.game.hero.healEffect.active = false;
    }
}


