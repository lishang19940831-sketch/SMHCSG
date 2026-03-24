System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, CommonEvent, CharacterState, ObjectType, BuildUnlockState, BuildingType, HeroType, LayerType, EffectType, ColorEffectType, PHY_GROUP, CharacterSortType, GameResult, FrameEventId, MoveType;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "89182i7iChMb6IWLQKNOevL", "CommonEnum", undefined);

      /**
       * 游戏中使用的通用事件类型
       */
      _export("CommonEvent", CommonEvent = /*#__PURE__*/function (CommonEvent) {
        CommonEvent["CameraMove"] = "camera-move";
        CommonEvent["joystickInput"] = "joystick-input";
        CommonEvent["HerMove"] = "hero-move";
        CommonEvent["JeepCarMove"] = "jeep-car-move";
        CommonEvent["HeroHurt"] = "hero-hurt";
        CommonEvent["HeroAtHome"] = "hero-at-home";
        CommonEvent["RecycleEnemy"] = "recycle-enemy";
        CommonEvent["ShowOver"] = "show-over";
        CommonEvent["UpdateHeroItemCount"] = "update-hero-item-count";
        CommonEvent["GameWin"] = "game-win";
        CommonEvent["GameFail"] = "game-fail";
        CommonEvent["ShowWinUI"] = "show-win-ui";
        CommonEvent["ShowFailUI"] = "show-fail-ui";
        CommonEvent["UnlockItem"] = "unlock-item";
        CommonEvent["UnlockFinished"] = "unlock-finished";
        CommonEvent["SetUnlockStatue"] = "set-unlock-statue";
        CommonEvent["UpdateGuideItemPosition"] = "update-guide-item-position";
        CommonEvent["RefreshDifficulty"] = "refresh-difficulty";
        CommonEvent["BossDead"] = "boss-dead";
        CommonEvent["BossComming"] = "boss-comming";
        CommonEvent["BossEarlyComming"] = "boss-early-comming";
        CommonEvent["WaveComming"] = "wave-comming";
        CommonEvent["WaveEarlyComming"] = "wave-early-comming";
        CommonEvent["BossTimerUpdate"] = "boss-timer-update";
        CommonEvent["BossTimerEnd"] = "boss-timer-end";
        CommonEvent["EnemyDeadFinish"] = "enemy-dead-finish";
        CommonEvent["EnemyDead"] = "enemy-dead";
        CommonEvent["StopAllEnemySpawners"] = "stop-all-enemy-spawners";
        CommonEvent["HomeHealthChanged"] = "home-health-changed";
        CommonEvent["GameOver"] = "game-over";
        CommonEvent["FPSUpdate"] = "fps-update";
        CommonEvent["SelectHero"] = "select-hero";
        CommonEvent["ShowSelectHeroPanel"] = "show-select-hero-panel";
        CommonEvent["EndPickOver"] = "end-pick-over";
        CommonEvent["ShakeCamera"] = "shake-camera";
        CommonEvent["PickupCoin"] = "pickup-coin";
        CommonEvent["SolderHurt"] = "solder-hurt";
        CommonEvent["ShowTips"] = "show-tips";
        CommonEvent["HideTips"] = "hide-tips";
        CommonEvent["SetWheel"] = "set-wheel";
        CommonEvent["OnJeepCar"] = "on-jeep-car";
        CommonEvent["CoinContainerCountChanged"] = "coin-container-count-changed";
        CommonEvent["WheatContainerCountChanged"] = "wheat-container-count-changed";
        CommonEvent["WoodContainerCountChanged"] = "wood-container-count-changed";
        CommonEvent["FlatbreadContainerCountChanged"] = "flatbread-container-count-changed";
        CommonEvent["OnJeepCarCharging"] = "OnJeepCarCharging";
        CommonEvent["shopUnlockFinished"] = "shopUnlockFinished";
        CommonEvent["ShowOut"] = "ShowOut";
        CommonEvent["OnReset"] = "OnReset";
        CommonEvent["KillEnemy"] = "KillEnemy";
        CommonEvent["ArrowTowerNeedAmmo"] = "ArrowTowerNeedAmmo";
        CommonEvent["TrainStarted"] = "TrainStarted";
        CommonEvent["TrainArrived"] = "TrainArrived";
        CommonEvent["TrainUnloading"] = "TrainUnloading";
        CommonEvent["TrainIdle"] = "TrainIdle";
        CommonEvent["TrainCarFull"] = "TrainCarFull";
        CommonEvent["ResourceContainerRegister"] = "ResourceContainerRegister";
        CommonEvent["TrainUpgraded"] = "TrainUpgraded";
        CommonEvent["ZombieWaveStart"] = "ZombieWaveStart";
        CommonEvent["AllTowersBuilt"] = "AllTowersBuilt";
        CommonEvent["EndingPerformanceStart"] = "EndingPerformanceStart";
        CommonEvent["HarvestCrop"] = "HarvestCrop";
        CommonEvent["HeroBoarded"] = "HeroBoarded";
        CommonEvent["HeroAlighted"] = "HeroAlighted";
        CommonEvent["ShowFlashRed"] = "ShowFlashRed";
        return CommonEvent;
      }({}));
      /**
       * 角色状态枚举
       */


      _export("CharacterState", CharacterState = /*#__PURE__*/function (CharacterState) {
        CharacterState["Idle"] = "Idle";
        CharacterState["Move"] = "Move";
        CharacterState["Attack"] = "Attack";
        CharacterState["Skill"] = "Skill";
        CharacterState["Dead"] = "Dead";
        return CharacterState;
      }({}));
      /**
       * 游戏对象类型枚举
       */


      _export("ObjectType", ObjectType = /*#__PURE__*/function (ObjectType) {
        ObjectType["None"] = "None";
        ObjectType["DamageNum"] = "DamageNum";
        ObjectType["TipLabel"] = "TipLabel";
        ObjectType["DropItemCoin"] = "DropItemCoin";
        ObjectType["DropItemCornKernel"] = "DropItemCornKernel";
        ObjectType["DropItemMeat"] = "DropItemMeat";
        ObjectType["DropItemWood"] = "DropItemWood";
        ObjectType["DropItemFlatbread"] = "DropItemFlatbread";
        ObjectType["Customer"] = "Customer";
        ObjectType["Arrow"] = "Arrow";
        ObjectType["Shell"] = "Shell";
        return ObjectType;
      }({}));
      /**
       * 建筑解锁状态枚举
       */


      _export("BuildUnlockState", BuildUnlockState = /*#__PURE__*/function (BuildUnlockState) {
        BuildUnlockState["NoActive"] = "NoActive";
        BuildUnlockState["Active"] = "Active";
        BuildUnlockState["Unlocking"] = "Unlocking";
        BuildUnlockState["Unlocked"] = "Unlocked";
        return BuildUnlockState;
      }({}));
      /**
       * 物品类型枚举
       */


      _export("BuildingType", BuildingType = /*#__PURE__*/function (BuildingType) {
        BuildingType["None"] = "None";
        BuildingType["Lumberjack"] = "Lumberjack";
        BuildingType["Lumberjack2"] = "Lumberjack2";
        BuildingType["MeatShop"] = "MeatShop";
        BuildingType["Wall"] = "Wall";
        BuildingType["ArrowTower"] = "ArrowTower";
        BuildingType["ArrowTower1"] = "ArrowTower1";
        BuildingType["ArrowTower2"] = "ArrowTower2";
        BuildingType["ArrowTower3"] = "ArrowTower3";
        BuildingType["Turret"] = "Turret";
        BuildingType["Wall1"] = "Wall1";
        BuildingType["Other"] = "Other";
        BuildingType["Other1"] = "Other1";
        BuildingType["Other2"] = "Other2";
        BuildingType["Salesperson1"] = "Salesperson1";
        BuildingType["Salesperson2"] = "Salesperson2";
        BuildingType["Train1"] = "Train1";
        BuildingType["Train2"] = "Train2";
        BuildingType["EndGame"] = "EndGame";
        return BuildingType;
      }({}));
      /**
       * 英雄类型枚举
       */


      _export("HeroType", HeroType = /*#__PURE__*/function (HeroType) {
        HeroType["None"] = "None";
        return HeroType;
      }({}));
      /**
       * 特效层级枚举
       */


      _export("LayerType", LayerType = /*#__PURE__*/function (LayerType) {
        LayerType[LayerType["Map"] = 1] = "Map";
        LayerType[LayerType["Effect"] = 2] = "Effect";
        return LayerType;
      }({}));
      /**
       * 特效类型枚举
       */


      _export("EffectType", EffectType = /*#__PURE__*/function (EffectType) {
        EffectType["None"] = "None";
        EffectType["Boss_Attack"] = "Boss_Attack";
        EffectType["Hero_Upgrade"] = "Hero_Upgrade";
        EffectType["Hero_Teleport"] = "Hero_Teleport";
        EffectType["Wood_Drop"] = "Wood_Drop";
        EffectType["Hurt"] = "Hurt";
        EffectType["Bleeding"] = "Bleeding";
        EffectType["Explosion"] = "Explosion";
        return EffectType;
      }({}));
      /**
       * 颜色效果类型及优先级(数字越大优先级越高)
       */


      _export("ColorEffectType", ColorEffectType = /*#__PURE__*/function (ColorEffectType) {
        ColorEffectType[ColorEffectType["NORMAL"] = 0] = "NORMAL";
        ColorEffectType[ColorEffectType["SLOW"] = 1] = "SLOW";
        ColorEffectType[ColorEffectType["HURT"] = 2] = "HURT";
        ColorEffectType[ColorEffectType["ELECTRIC_SHOCK"] = 3] = "ELECTRIC_SHOCK";
        return ColorEffectType;
      }({}));
      /** 
       * 物理组枚举
       */


      _export("PHY_GROUP", PHY_GROUP = /*#__PURE__*/function (PHY_GROUP) {
        PHY_GROUP[PHY_GROUP["DEFAULT"] = 1] = "DEFAULT";
        PHY_GROUP[PHY_GROUP["HERO"] = 2] = "HERO";
        PHY_GROUP[PHY_GROUP["ENEMY"] = 4] = "ENEMY";
        PHY_GROUP[PHY_GROUP["BULLET"] = 8] = "BULLET";
        PHY_GROUP[PHY_GROUP["HOME"] = 16] = "HOME";
        PHY_GROUP[PHY_GROUP["WALL"] = 32] = "WALL";
        PHY_GROUP[PHY_GROUP["GROUND"] = 64] = "GROUND";
        PHY_GROUP[PHY_GROUP["SOLDER"] = 128] = "SOLDER";
        PHY_GROUP[PHY_GROUP["BUILDING"] = 256] = "BUILDING";
        PHY_GROUP[PHY_GROUP["HOME2"] = 512] = "HOME2";
        PHY_GROUP[PHY_GROUP["DOOR"] = 1024] = "DOOR";
        PHY_GROUP[PHY_GROUP["Safe"] = 2048] = "Safe";
        return PHY_GROUP;
      }({}));

      ;
      /**
       * 排序方式枚举
       */

      _export("CharacterSortType", CharacterSortType = /*#__PURE__*/function (CharacterSortType) {
        CharacterSortType["Distance"] = "Distance";
        CharacterSortType["ReverseDistance"] = "ReverseDistance";
        CharacterSortType["HP"] = "HP";
        CharacterSortType["BossElite"] = "BossElite";
        return CharacterSortType;
      }({}));
      /**
       * 游戏结果枚举
       */


      _export("GameResult", GameResult = /*#__PURE__*/function (GameResult) {
        GameResult["None"] = "None";
        GameResult["Win"] = "Win";
        GameResult["Fail"] = "Fail";
        return GameResult;
      }({}));
      /**
       * 帧事件ID枚举
       */


      _export("FrameEventId", FrameEventId = /*#__PURE__*/function (FrameEventId) {
        FrameEventId["ATTACK_DAMAGE"] = "attack_damage";
        FrameEventId["ATTACK_SOUND"] = "attack_sound";
        FrameEventId["ATTACK_EFFECT"] = "attack_effect";
        FrameEventId["RUN_ATTACK_DAMAGE"] = "run_attack_damage";
        FrameEventId["RUN_ATTACK_SOUND"] = "run_attack_sound";
        FrameEventId["SKILL_CAST"] = "skill_cast";
        FrameEventId["SKILL_SOUND"] = "skill_sound";
        FrameEventId["SKILL_EFFECT"] = "skill_effect";
        FrameEventId["DEATH_SOUND"] = "death_sound";
        FrameEventId["DEATH_EFFECT"] = "death_effect";
        FrameEventId["MOVE_SOUND"] = "move_sound";
        FrameEventId["HURT_SOUND"] = "hurt_sound";
        FrameEventId["HURT_EFFECT"] = "hurt_effect";
        FrameEventId["CUSTOM_1"] = "custom_1";
        FrameEventId["CUSTOM_2"] = "custom_2";
        FrameEventId["CUSTOM_3"] = "custom_3";
        return FrameEventId;
      }({}));
      /**
       * 移动类型枚举
       */


      _export("MoveType", MoveType = /*#__PURE__*/function (MoveType) {
        MoveType["Stop"] = "Stop";
        MoveType["Hero"] = "Hero";
        MoveType["JeepCar"] = "JeepCar";
        return MoveType;
      }({}));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7d4af5e515539aac2bb59670b2a77d6238a3deb4.js.map