System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, v3, Vec3, BulletBase, HealthComponent, Character, EffectType, _dec, _class, _crd, ccclass, property, Arrow;

  function _reportPossibleCrUseOfBulletBase(extras) {
    _reporterNs.report("BulletBase", "./BulletBase", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHealthComponent(extras) {
    _reporterNs.report("HealthComponent", "../Components/HealthComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCharacter(extras) {
    _reporterNs.report("Character", "../Role/Character", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEffectType(extras) {
    _reporterNs.report("EffectType", "../Common/CommonEnum", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      v3 = _cc.v3;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      BulletBase = _unresolved_2.BulletBase;
    }, function (_unresolved_3) {
      HealthComponent = _unresolved_3.HealthComponent;
    }, function (_unresolved_4) {
      Character = _unresolved_4.Character;
    }, function (_unresolved_5) {
      EffectType = _unresolved_5.EffectType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d2226vAa1RKW7W0GXCnbGwD", "Arraw", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Node', 'v3', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 箭矢类
       */

      _export("Arrow", Arrow = (_dec = ccclass('Arrow'), _dec(_class = class Arrow extends (_crd && BulletBase === void 0 ? (_reportPossibleCrUseOfBulletBase({
        error: Error()
      }), BulletBase) : BulletBase) {
        fire(startPos, direction) {
          super.fire(startPos, direction); // app.audio.playEffect('resources/audio/弓箭手普攻', 0.2)
        }
        /**
         * 箭矢命中回调
         * @param event 碰撞事件
         */


        onHit(targetNode) {
          // 获取被击中对象的生命值组件并造成伤害
          if (targetNode) {
            var healthComp = targetNode.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
              error: Error()
            }), HealthComponent) : HealthComponent);

            if (healthComp) {
              healthComp.takeDamage({
                damage: this.damage,
                damageSource: this.node
              }); // 获取两个碰撞体的中心点

              var selfWpos = this.node.getWorldPosition();
              var targetWpos = targetNode.getWorldPosition();
              var hitPos = new Vec3((selfWpos.x + targetWpos.x) / 2, (selfWpos.y + targetWpos.y) / 2, (selfWpos.z + targetWpos.z) / 2); // 在碰撞点播放特效
              // manager.effect.playEffect(manager.effect.effectType.Bleeding, hitPos);

              manager.effect.playEffect((_crd && EffectType === void 0 ? (_reportPossibleCrUseOfEffectType({
                error: Error()
              }), EffectType) : EffectType).Hurt, v3(hitPos.x, hitPos.y + 1, hitPos.z));
              manager.effect.playEffect((_crd && EffectType === void 0 ? (_reportPossibleCrUseOfEffectType({
                error: Error()
              }), EffectType) : EffectType).Bleeding, v3(hitPos.x, hitPos.y + 1, hitPos.z));
              var character = targetNode.getComponent(_crd && Character === void 0 ? (_reportPossibleCrUseOfCharacter({
                error: Error()
              }), Character) : Character);

              if (character) {
                // 击退
                character.knockback(this.node.getWorldPosition(), 2);
              }
            }
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2d932da9f6b3d5ef448fb026571d8f605a4e7233.js.map