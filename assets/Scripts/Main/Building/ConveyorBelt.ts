import { _decorator, Component, Node, Vec3, CCFloat, tween, Material, Vec4, MeshRenderer } from 'cc';
import { ObjectType } from '../Common/CommonEnum';
import { WheatContainer } from './WheatContainer';
import { FlatbreadContainer } from './FlatbreadContainer';
import { ProductionBuilding } from './ProductionBuilding';
const { ccclass, property } = _decorator;

interface IResourceReceiver {
    receive(fromPosition: Vec3, onArrived?: () => void): boolean;
}

@ccclass('ConveyorBelt')
export class ConveyorBelt extends Component {
    @property({ type: ObjectType, displayName: '资源类型' })
    public itemType: ObjectType = ObjectType.DropItemCornKernel;

    @property({ displayName: '启用传送带' })
    public conveyorEnabled: boolean = false;

    @property({ displayName: '开局隐藏' })
    public hideOnStart: boolean = true;

    @property({ type: Node, displayName: 'A点' })
    public pointA: Node = null!;

    @property({ type: [Node], displayName: 'B点列表' })
    public midPoints: Node[] = [];

    @property({ type: Node, displayName: 'C点' })
    public pointC: Node = null!;

    @property({ type: Node, displayName: '供给容器' })
    public sourceNode: Node = null!;

    @property({ type: Node, displayName: '接收容器' })
    public sinkNode: Node = null!;

    @property({ type: CCFloat, displayName: '带速(m/s)' })
    public moveSpeed: number = 3;

    @property({ type: CCFloat, displayName: '拉取周期(秒)' })
    public pullInterval: number = 0.6;

    @property({ type: CCFloat, displayName: '在途上限' })
    public maxInFlight: number = 5;

    @property({ type: CCFloat, displayName: '可视Y偏移' })
    public visualYOffset: number = 0.3;

    @property({ type: MeshRenderer, displayName: '传送带mtl节点' })
    public conveyorMaterial: MeshRenderer = null!;
    private _timer: number = 0;
    private _inFlight: number = 0;
    @property({ type: CCFloat, displayName: 'UV速度' })
    public uvScrollSpeed: number = 1;
    private _uvZ: number = 0;

    onLoad() {
        if (this.hideOnStart) {
            this.node.active = false;
            this.conveyorEnabled = false;
            
                this.conveyorMaterial.materials[0].getProperty('tilingOffset');

           
        }

    }

    update(dt: number) {
        if (!this.conveyorEnabled) return;
        this._timer += dt;
        while (this._timer >= this.pullInterval) {
            this._timer -= this.pullInterval;
            this._trySpawnOne();
        }
        if (this.node.active && this.conveyorEnabled && this.conveyorMaterial) {
            this._uvZ += this.uvScrollSpeed * dt;
            const v = new Vec4(1, 1, this._uvZ, 0);
            this.conveyorMaterial.materials[0].setProperty('tilingOffset', v, 0);
        }
    }

    public startConveyor(): void {
        this.conveyorEnabled = true;
    }

    public stopConveyor(): void {
        this.conveyorEnabled = false;
    }

    public showAndEnable(): void {
        this.node.active = true;
        this.startConveyor();
    }

    public hideAndDisable(): void {
        this.stopConveyor();
        this.node.active = false;
    }

    private _trySpawnOne(): void {
        if (this._inFlight >= this.maxInFlight) return;
        const source = this._getSource();
        const sink = this._getSink();
        if (!source || !sink) return;
        const wp = this._buildWaypoints();
        if (wp.length < 2) return;
        const item = source.takeForConveyor?.();
        if (!item) return;
        this._inFlight++;
        item.setParent(manager.effect.node);
        const start = wp[0].clone();
        start.y += this.visualYOffset;
        item.setWorldPosition(start);
        let seq = tween(item);
        for (let i = 1; i < wp.length; i++) {
            const from = wp[i - 1];
            const to = wp[i];
            const dist = Vec3.distance(from, to);
            const dur = this.moveSpeed > 0 ? dist / this.moveSpeed : 0.01;
            const target = new Vec3(to.x, to.y + this.visualYOffset, to.z);
            seq = seq.to(dur, { worldPosition: target });
        }
        seq.call(() => {
            const pos = item.getWorldPosition().clone();
            manager.pool.putNode(item);
            const accepted = this._deliverToSink(sink, pos, () => {
                this._inFlight = Math.max(0, this._inFlight - 1);
            });
            if (!accepted) {
                this._inFlight = Math.max(0, this._inFlight - 1);
            }
        }).start();
    }

    private _buildWaypoints(): Vec3[] {
        const pts: Vec3[] = [];
        const aNode = this.pointA ?? this.sourceNode;
        if (aNode && aNode.isValid) pts.push(aNode.getWorldPosition().clone());
        for (const n of this.midPoints) {
            if (n && n.isValid) pts.push(n.getWorldPosition().clone());
        }
        if (this.pointC && this.pointC.isValid) pts.push(this.pointC.getWorldPosition().clone());
        return pts;
    }

    private _getSource(): any {
        if (!this.sourceNode || !this.sourceNode.isValid) return null;
        const wc = this.sourceNode.getComponent(WheatContainer);
        return wc ?? null;
    }

    private _getSink(): IResourceReceiver | ProductionBuilding | null {
        if (!this.sinkNode || !this.sinkNode.isValid) return null;
        const pb = this.sinkNode.getComponent(ProductionBuilding);
        if (pb) return pb;
        const wc = this.sinkNode.getComponent(WheatContainer);
        if (wc) return wc as unknown as IResourceReceiver;
        const fb = this.sinkNode.getComponent(FlatbreadContainer);
        if (fb) return fb as unknown as IResourceReceiver;
        return null;
    }

    private _deliverToSink(sink: IResourceReceiver | ProductionBuilding, from: Vec3, done: () => void): boolean {
        const pb = sink as ProductionBuilding;
        if (pb && pb.receiveRawMaterial) {
            const ok = pb.receiveRawMaterial(from, this.itemType);
            done();
            return ok;
        }
        const recv = sink as IResourceReceiver;
        if (recv && recv.receive) {
            return recv.receive(from, done);
        }
        done();
        return false;
    }
}
