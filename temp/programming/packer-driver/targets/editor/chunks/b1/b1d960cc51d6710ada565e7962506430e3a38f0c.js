System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Vec3, BulletBase, HealthComponent, CommonEvent, EffectType, MovementComponent, _dec, _class, _crd, ccclass, property, Shell;

  function _reportPossibleCrUseOfBulletBase(extras) {
    _reporterNs.report("BulletBase", "./BulletBase", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHealthComponent(extras) {
    _reporterNs.report("HealthComponent", "../Components/HealthComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEffectType(extras) {
    _reporterNs.report("EffectType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMovementComponent(extras) {
    _reporterNs.report("MovementComponent", "../Components/MovementComponent", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      BulletBase = _unresolved_2.BulletBase;
    }, function (_unresolved_3) {
      HealthComponent = _unresolved_3.HealthComponent;
    }, function (_unresolved_4) {
      CommonEvent = _unresolved_4.CommonEvent;
      EffectType = _unresolved_4.EffectType;
    }, function (_unresolved_5) {
      MovementComponent = _unresolved_5.MovementComponent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9e6b19vtzNCkJh2kzQaQRmC", "Shell", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Node', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 箭矢类
       */

      _export("Shell", Shell = (_dec = ccclass('Shell'), _dec(_class = class Shell extends (_crd && BulletBase === void 0 ? (_reportPossibleCrUseOfBulletBase({
        error: Error()
      }), BulletBase) : BulletBase) {
        fire(startPos, direction) {
          super.fire(startPos, direction);
          app.audio.playEffect('resources/audio/发射');
        }
        /**
         * 箭矢命中回调
         * @param event 碰撞事件
         */


        onHit(targetNode) {
          // 获取被击中对象的生命值组件并造成伤害
          if (targetNode) {
            const healthComp = targetNode.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
              error: Error()
            }), HealthComponent) : HealthComponent);

            if (healthComp) {
              healthComp.takeDamage({
                damage: this.damage,
                damageSource: this.node
              }); // 获取两个碰撞体的中心点

              const selfWpos = this.node.getWorldPosition();
              const targetWpos = targetNode.getWorldPosition();
              const hitPos = new Vec3((selfWpos.x + targetWpos.x) / 2, (selfWpos.y + targetWpos.y) / 2, (selfWpos.z + targetWpos.z) / 2); // 在碰撞点播放特效
              // manager.effect.playEffect(manager.effect.effectType.Archer_Attack, hitPos);

              const moveComp = targetNode.getComponent(_crd && MovementComponent === void 0 ? (_reportPossibleCrUseOfMovementComponent({
                error: Error()
              }), MovementComponent) : MovementComponent);

              if (moveComp) {
                moveComp.knockup(4, Vec3.subtract(new Vec3(), targetNode.getWorldPosition(), this.node.getWorldPosition()));
              } // aoe


              const aoeNodes = manager.enemy.getRangeEnemies(hitPos, 4);

              for (let item of aoeNodes) {
                const healthComp = item.node.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
                  error: Error()
                }), HealthComponent) : HealthComponent);

                if (healthComp) {
                  healthComp.takeDamage({
                    damage: this.damage,
                    damageSource: this.node
                  });
                }

                const moveComp = item.node.getComponent(_crd && MovementComponent === void 0 ? (_reportPossibleCrUseOfMovementComponent({
                  error: Error()
                }), MovementComponent) : MovementComponent);

                if (moveComp) {
                  moveComp.knockup(4, Vec3.subtract(new Vec3(), item.node.getWorldPosition(), this.node.getWorldPosition()));
                }
              } // 播放受击特效


              manager.effect.playEffect((_crd && EffectType === void 0 ? (_reportPossibleCrUseOfEffectType({
                error: Error()
              }), EffectType) : EffectType).Explosion, hitPos);
              app.audio.playEffect('resources/audio/爆炸');
              app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
                error: Error()
              }), CommonEvent) : CommonEvent).ShakeCamera, {
                intensity: 0.2,
                duration: 0.1,
                source: this.node
              }); // const character = targetNode.getComponent(Character);
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


        onGroundHit(hitPosition, groundHeight) {
          // 在落地点播放爆炸特效
          const explosionPos = new Vec3(hitPosition.x, groundHeight, hitPosition.z);
          manager.effect.playEffect((_crd && EffectType === void 0 ? (_reportPossibleCrUseOfEffectType({
            error: Error()
          }), EffectType) : EffectType).Explosion, explosionPos);
          app.audio.playEffect('resources/audio/爆炸'); // AOE范围伤害

          const aoeNodes = manager.enemy.getRangeEnemies(explosionPos, 4);

          for (let item of aoeNodes) {
            const healthComp = item.node.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
              error: Error()
            }), HealthComponent) : HealthComponent);

            if (healthComp) {
              healthComp.takeDamage({
                damage: this.damage,
                damageSource: this.node
              });
            } // 击退效果


            const moveComp = item.node.getComponent(_crd && MovementComponent === void 0 ? (_reportPossibleCrUseOfMovementComponent({
              error: Error()
            }), MovementComponent) : MovementComponent);

            if (moveComp) {
              moveComp.knockup(4, Vec3.subtract(new Vec3(), item.node.getWorldPosition(), explosionPos));
            }
          } // 摄像机震动效果


          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).ShakeCamera, {
            intensity: 0.3,
            duration: 0.2,
            source: this.node
          }); // 落地后回收子弹

          this.recycleBullet();
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b1d960cc51d6710ada565e7962506430e3a38f0c.js.map