import { _decorator, Color, Node, Vec3 } from 'cc';
import { BulletBase } from './BulletBase';
import { HealthComponent } from '../Components/HealthComponent';
import { DamageNum } from '../UI/DamageNum';
import { Character } from '../Role/Character';
import { CommonEvent, EffectType } from '../Common/CommonEnum';
import { MovementComponent } from '../Components/MovementComponent';

const { ccclass, property } = _decorator;

/**
 * 箭矢类
 */
@ccclass('Shell')
export class Shell extends BulletBase {
    
    public fire(startPos: Vec3, direction: Vec3): void {
        super.fire(startPos, direction);
        app.audio.playEffect('resources/audio/发射')
    }

    /**
     * 箭矢命中回调
     * @param event 碰撞事件
     */
    protected onHit(targetNode: Node): void {
        // 获取被击中对象的生命值组件并造成伤害
        if (targetNode) {
            const healthComp = targetNode.getComponent(HealthComponent);
            if (healthComp) {

                healthComp.takeDamage({
                    damage: this.damage,
                    damageSource: this.node,
                });

                // 获取两个碰撞体的中心点
                const selfWpos = this.node.getWorldPosition();
                const targetWpos = targetNode.getWorldPosition();
                const hitPos = new Vec3((selfWpos.x + targetWpos.x) / 2, (selfWpos.y + targetWpos.y) / 2, (selfWpos.z + targetWpos.z) / 2);
                // 在碰撞点播放特效
                // manager.effect.playEffect(manager.effect.effectType.Archer_Attack, hitPos);
                const moveComp = targetNode.getComponent(MovementComponent);
                if(moveComp){
                    moveComp.knockup(4, Vec3.subtract(new Vec3(), targetNode.getWorldPosition(), this.node.getWorldPosition()));
                }

                // aoe
                const aoeNodes = manager.enemy.getRangeEnemies(hitPos, 4)
                for(let item of aoeNodes){
                    const healthComp = item.node.getComponent(HealthComponent);
                    if (healthComp) {
                        healthComp.takeDamage({
                            damage: this.damage,
                            damageSource: this.node,
                        });
                    }

                    const moveComp = item.node.getComponent(MovementComponent);
                    if(moveComp){
                        moveComp.knockup(4, Vec3.subtract(new Vec3(), item.node.getWorldPosition(), this.node.getWorldPosition()));
                    }
                }

                // 播放受击特效
                manager.effect.playEffect(EffectType.Explosion, hitPos);
                app.audio.playEffect('resources/audio/爆炸')

                app.event.emit(CommonEvent.ShakeCamera, {
                    intensity: 0.2, 
                    duration: 0.1,
                    source: this.node
                });

                // const character = targetNode.getComponent(Character);
                // if(character){
                //     // 击退
                //     character.knockback(this.node.getWorldPosition(), 3);
                // }
            }
        }
    }

    /**
     * 地面碰撞回调 - 落地爆炸效果
     * @param hitPosition 碰撞位置
     * @param groundHeight 地面高度
     */
    protected onGroundHit(hitPosition: Vec3, groundHeight: number): void {
        // 在落地点播放爆炸特效
        const explosionPos = new Vec3(hitPosition.x, groundHeight, hitPosition.z);
        manager.effect.playEffect(EffectType.Explosion, explosionPos);
        app.audio.playEffect('resources/audio/爆炸')

        // AOE范围伤害
        const aoeNodes = manager.enemy.getRangeEnemies(explosionPos, 4);
        
        for (let item of aoeNodes) {
            const healthComp = item.node.getComponent(HealthComponent);
            if (healthComp) {
                healthComp.takeDamage({
                    damage: this.damage,
                    damageSource: this.node,
                });
            }

            // 击退效果
            const moveComp = item.node.getComponent(MovementComponent);
            if (moveComp) {
                moveComp.knockup(4, Vec3.subtract(new Vec3(), item.node.getWorldPosition(), explosionPos));
            }
        }

        // 摄像机震动效果
        app.event.emit(CommonEvent.ShakeCamera, {
            intensity: 0.3, 
            duration: 0.2,
            source: this.node
        });

        // 落地后回收子弹
        this.recycleBullet();
    }
}