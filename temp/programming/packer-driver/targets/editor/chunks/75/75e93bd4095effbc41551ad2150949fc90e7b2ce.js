System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, Config;

  _export("Config", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1d22dIO4z9GKoFdylaN67Qn", "Config", undefined);

      (function (_Config) {
        const UNLOCK_CHECK_INTERVAL = _Config.UNLOCK_CHECK_INTERVAL = 0.03;
        const PLAYER_DAMAGE_COLOR = _Config.PLAYER_DAMAGE_COLOR = '#FFD700';
        const PLAYER_CRITICAL_DAMAGE_COLOR = _Config.PLAYER_CRITICAL_DAMAGE_COLOR = '#FF4500';
        const PLAYER_SKILL_DAMAGE_COLOR = _Config.PLAYER_SKILL_DAMAGE_COLOR = '#00BFFF';
        const ENEMY_DAMAGE_COLOR = _Config.ENEMY_DAMAGE_COLOR = '#FF6347';
        const ENEMY_CRITICAL_DAMAGE_COLOR = _Config.ENEMY_CRITICAL_DAMAGE_COLOR = '#DC143C';
        const ENEMY_SKILL_DAMAGE_COLOR = _Config.ENEMY_SKILL_DAMAGE_COLOR = '#8A2BE2';
        const HEAL_EFFECT_COLOR = _Config.HEAL_EFFECT_COLOR = '#32CD32';
        const DEBUFF_EFFECT_COLOR = _Config.DEBUFF_EFFECT_COLOR = '#708090';
        const BUFF_EFFECT_COLOR = _Config.BUFF_EFFECT_COLOR = '#1E90FF';

        class EnemyConfig {}

        // 当前敌人血量配置
        EnemyConfig.diffCfg = {
          1: {
            spawnBatchSize: 3,
            spawnEliteBatchSize: 0,
            batchInterval: 2,
            enemyInterval: 0.5,
            enemyHP: 140,
            eliteEnemyHP: 0
          },
          2: {
            spawnBatchSize: 4,
            spawnEliteBatchSize: 0,
            batchInterval: 2,
            enemyInterval: 0.5,
            enemyHP: 120,
            eliteEnemyHP: 0
          },
          3: {
            spawnBatchSize: 5,
            spawnEliteBatchSize: 0,
            batchInterval: 2,
            enemyInterval: 0.5,
            enemyHP: 190,
            eliteEnemyHP: 0
          },
          4: {
            spawnBatchSize: 5,
            spawnEliteBatchSize: 0,
            batchInterval: 2,
            enemyInterval: 0.5,
            enemyHP: 200,
            eliteEnemyHP: 0
          }
        };
        // 次要敌人生成器波次配置
        EnemyConfig.subSpawnerCfg = {
          1: {
            spawnBatchSize: 10,
            spawnEliteBatchSize: 1,
            batchInterval: 4,
            enemyInterval: 0.3,
            enemyHP: 250,
            eliteEnemyHP: 2500,
            wave: 2
          },
          2: {
            spawnBatchSize: 10,
            spawnEliteBatchSize: 1,
            batchInterval: 4,
            enemyInterval: 0.3,
            enemyHP: 270,
            eliteEnemyHP: 2500,
            wave: 3
          },
          3: {
            spawnBatchSize: 15,
            spawnEliteBatchSize: 1,
            batchInterval: 6,
            enemyInterval: 0.3,
            enemyHP: 340,
            eliteEnemyHP: 3500,
            wave: 3
          }
        };
        _Config.EnemyConfig = EnemyConfig;
      })(Config || _export("Config", Config = {}));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=75e93bd4095effbc41551ad2150949fc90e7b2ce.js.map