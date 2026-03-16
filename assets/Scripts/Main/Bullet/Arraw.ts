import { _decorator, Color, Node, v3, Vec3 } from 'cc';
import { BulletBase } from './BulletBase';
import { HealthComponent } from '../Components/HealthComponent';
import { DamageNum } from '../UI/DamageNum';
import { Character } from '../Role/Character';
import { EffectType } from '../Common/CommonEnum';

const { ccclass, property } = _decorator;

/**
 * 箭矢类
 */
@ccclass('Arrow')
export class Arrow extends BulletBase {
    
    public fire(startPos: Vec3, direction: Vec3): void {
        super.fire(startPos, direction);
        // app.audio.playEffect('resources/audio/弓箭手普攻', 0.2)
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
                manager.effect.playEffect(EffectType.Hurt, v3(hitPos.x, hitPos.y + 1, hitPos.z));
                manager.effect.playEffect(EffectType.Bleeding, v3(hitPos.x, hitPos.y + 1, hitPos.z));

                const character = targetNode.getComponent(Character);
                if(character){
                    // 击退
                    character.knockback(this.node.getWorldPosition(), 2);
                }
            }
        }
    }
} 