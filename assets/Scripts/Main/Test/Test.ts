import { _decorator, CCFloat, Collider, Component, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Test')
export class Test extends Component {
    protected onLoad(): void {
        let coll = this.node.getComponent(Collider);

        coll.on("onTriggerEnter", this.onTriggerEnter, this);
        coll.on("onTriggerExit", this.onTriggerExit, this);
        coll.on("onTriggerStay", this.onTriggerStay, this);
    }

    private onTriggerEnter(selfCollider: Collider, otherCollider: Collider, event: any) {
   //console.log("onTriggerEnter");
    }

    private onTriggerExit(selfCollider: Collider, otherCollider: Collider, event: any) {
   //console.log("onTriggerExit");
    }

    private onTriggerStay(selfCollider: Collider, otherCollider: Collider, event: any) {
   //console.log("onTriggerStay");
    }
}


