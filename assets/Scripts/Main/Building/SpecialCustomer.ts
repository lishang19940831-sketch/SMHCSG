import { _decorator, Component, Node, Tween, tween, Vec3, v3, CCFloat } from 'cc';
import { ModelAnimationComponent } from '../Components/ModelAnimationComponent';
import { PoolObjectBase } from '../../Main/Common/PoolObjectBase';
import { ComponentEvent } from '../../Main/Common/ComponentEvents';
const { ccclass, property } = _decorator;

@ccclass('SpecialCustomer')
export class SpecialCustomer extends PoolObjectBase {
    @property({ type: ModelAnimationComponent, displayName: '动画组件' })
    private animationComponent: ModelAnimationComponent = null!;

    @property({ type: Node, displayName: '目标点' })
    public targetPoint: Node = null!;

    @property({ type: CCFloat, displayName: '移动速度(单位/秒)' })
    public moveSpeed: number = 8;

    @property({ displayName: '启用时自动出发' })
    public autoStart: boolean = true;

    @property({type: Node, displayName: 'UI节点', tooltip: '需要始终面向Z轴的UI节点'})
    public uiNode: Node = null!;
    private _isMoving: boolean = false;

    onEnable() {
        if (this.autoStart) {
            this.moveToTarget();
        }
    }

    protected update(dt: number): void {
        this.uiNode?.setWorldRotationFromEuler(0,0,0);
    }

    public moveToTarget(cb?: () => void): void {
        if (!this.targetPoint) return;
        const to = this.targetPoint.getWorldPosition();
        this.moveToWorldPos(to, cb);
    }

    public moveToWorldPos(pos: Vec3, cb?: () => void): void {
        Tween.stopAllByTarget(this.node);
        this._isMoving = true;

        const currentPos = this.node.getWorldPosition();
        const distance = Vec3.distance(currentPos, pos);
        if (distance < 0.01) {
            this._isMoving = false;
            if (this.animationComponent) {
                this.animationComponent.playIdle();
            }
            cb && cb();
            return;
        }
        const duration = this.moveSpeed > 0 ? distance / this.moveSpeed : 0.01;

        if (this.animationComponent) {
            this.animationComponent.playMove();
        }

        tween(this.node)
            .to(duration, { worldPosition: pos }, {
                onUpdate: (target, ratio) => {
                    if (ratio === undefined || ratio > 0.9) return;
                    const direction = new Vec3();
                    Vec3.subtract(direction, pos, currentPos);
                    direction.normalize();
                    this.node.emit(ComponentEvent.SET_FACE_DIRECTION_FROM_3D, direction);
                }
            })
            .call(() => {
                this._isMoving = false;
                if (this.animationComponent) {
                    this.animationComponent.playIdle();
                }
                cb && cb();
            })
            .start();
    }

    public get isMoving(): boolean {
        return this._isMoving;
    }

    public reset(): void {
        this._isMoving = false;
        Tween.stopAllByTarget(this.node);
        if (this.animationComponent) {
            this.animationComponent.playIdle();
        }
    }
}
