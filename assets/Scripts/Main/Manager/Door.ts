import { _decorator, Collider, Component, Node, tween, Tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Door')
export class Door extends Component {
    
    @property({type: Node, displayName: '门1'})
    leftDoor: Node = null!;
    @property({type: Node, displayName: '门2'})
    rightDoor: Node = null!;

    @property({type: Collider, displayName: '区域监听'})
    areaCollider: Collider = null!;
    

    private leftDoorTween: Tween<Node> = null!;
    private rightDoorTween: Tween<Node> = null!;

    private startLeftPos: Vec3 = null!;
    private startRightPos: Vec3 = null!;
    //是否处于开门状态
    public isOpen: boolean = false;
    //单例模式
    static instance: Door = null!;
    onLoad() {
        //单例模式
        Door.instance = this;
        this.areaCollider.on('onTriggerEnter', this.onTriggerEnter, this);
        this.areaCollider.on('onTriggerExit', this.onTriggerExit, this);

        this.startLeftPos = this.leftDoor.getPosition().clone();
        this.startRightPos = this.rightDoor.getPosition().clone();
    }

    private onTriggerEnter(selfCollider: Collider, otherCollider: Collider, event: any) {
        //停止ween动画 
        Tween.stopAllByTarget(this.leftDoor);
        Tween.stopAllByTarget(this.rightDoor);
        //开门动画 左门 x-=2.2  右门x+=2.2
        tween(this.leftDoor).to(0.3, { position: new Vec3(this.startLeftPos.x - 2.2, this.startLeftPos.y, this.startLeftPos.z) }).start();
        tween(this.rightDoor).to(0.3, { position: new Vec3(this.startRightPos.x + 2.2, this.startRightPos.y, this.startRightPos.z) }).start();
   //console.log('onTriggerEnter');
        //设置为开门状态
        this.isOpen = true;
    }

    private onTriggerExit(selfCollider: Collider, otherCollider: Collider, event: any) {
        //停止tween
        Tween.stopAllByTarget(this.leftDoor);
        Tween.stopAllByTarget(this.rightDoor);
        //关门动画 左门 x=0  右门x=0
        tween(this.leftDoor).to(0.3, { position: this.startLeftPos }).start();
        tween(this.rightDoor).to(0.3, { position: this.startRightPos }).start();
   //console.log('onTriggerExit');
        //设置为关门状态
        this.isOpen = false;
    }
}


