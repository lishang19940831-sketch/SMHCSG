/**
 * 游戏中使用的通用事件类型
 */
export enum CommonEvent{
    /** 相机移动事件 */
    CameraMove = 'camera-move',
    /** 摇杆输入事件 */
    joystickInput = 'joystick-input',
    /** 英雄移动事件 */
    HerMove = 'hero-move',
    /** 吉普车移动事件 */
    JeepCarMove = 'jeep-car-move',
    /** 英雄受伤事件 */
    HeroHurt = 'hero-hurt',
    /** 英雄进入家事件 */
    HeroAtHome = 'hero-at-home',
    /** 回收敌人事件 */
    RecycleEnemy = 'recycle-enemy',
    /** 展示结束事件 */
    ShowOver = 'show-over',
    /** 更新英雄物品数量事件 */
    UpdateHeroItemCount = 'update-hero-item-count',
    /** 游戏胜利事件 */
    GameWin = 'game-win',
    /** 游戏失败事件 */
    GameFail = 'game-fail',
    /** 展示胜利UI事件 */
    ShowWinUI = 'show-win-ui',
    /** 展示失败UI事件 */
    ShowFailUI = 'show-fail-ui',
    /** 解锁物品事件 */
    UnlockItem = 'unlock-item',
    /** 解锁完成事件 */
    UnlockFinished = 'unlock-finished',
    /** 设置解锁状态事件 */
    SetUnlockStatue = 'set-unlock-statue',
    /** 更新引导物品位置事件 */
    UpdateGuideItemPosition = 'update-guide-item-position',
    /** 刷新难度事件 */
    RefreshDifficulty = 'refresh-difficulty',
    /** 怪物死亡事件 */
    BossDead = 'boss-dead',
    /** Boss出现事件 */
    BossComming = 'boss-comming',
    /** Boss提前出现事件 */
    BossEarlyComming = 'boss-early-comming',
    /** 波次出现事件 */
    WaveComming = 'wave-comming',
    /** 波次提前出现事件 */
    WaveEarlyComming = 'wave-early-comming',
    /** Boss倒计时更新事件 */
    BossTimerUpdate = 'boss-timer-update',
    /** Boss倒计时结束事件 */
    BossTimerEnd = 'boss-timer-end',
    /** 敌人死亡完成事件 */
    EnemyDeadFinish = 'enemy-dead-finish',
    /** 敌人死亡事件 */
    EnemyDead = 'enemy-dead',
    /** 停止所有敌人生成器 */
    StopAllEnemySpawners = 'stop-all-enemy-spawners',
    /** 家基地生命值变化事件 */
    HomeHealthChanged = 'home-health-changed',
    /** 游戏结束事件 */
    GameOver = 'game-over',
    /** 帧率更新事件 */
    FPSUpdate = 'fps-update',
    /** 选择英雄事件 */
    SelectHero = 'select-hero', 
    /** 显示选择英雄面板事件 */
    ShowSelectHeroPanel = 'show-select-hero-panel',
    /** 结束拾取事件 */
    EndPickOver = 'end-pick-over',
    /** 相机震动事件 */
    ShakeCamera = 'shake-camera',
    /** 拾取金币事件 */
    PickupCoin = "pickup-coin",
    /** 士兵受伤事件 */
    SolderHurt = "solder-hurt",
    /** 更新提示事件 */
    ShowTips = "show-tips",
    /** 隐藏提示事件 */
    HideTips = "hide-tips",
    /** 设置轮子事件 */
    SetWheel = "set-wheel",
    /** 吉普车出现事件 */
    OnJeepCar = "on-jeep-car",
    /** 金币容器数量变化事件 */
    CoinContainerCountChanged = 'coin-container-count-changed',
    /** 麦子容器数量变化事件 */
    WheatContainerCountChanged = 'wheat-container-count-changed',
    /** 木头容器数量变化事件 */
    WoodContainerCountChanged = 'wood-container-count-changed',
    /** 大饼容器数量变化事件 */
    FlatbreadContainerCountChanged = 'flatbread-container-count-changed',
    OnJeepCarCharging = "OnJeepCarCharging",
    shopUnlockFinished = "shopUnlockFinished",
    ShowOut /** 刷新难度事件 */ = "ShowOut",
    OnReset = "OnReset",
    /** 杀怪事件 */
    KillEnemy = "KillEnemy",
    /** 箭塔需要弹药事件 */
    ArrowTowerNeedAmmo = "ArrowTowerNeedAmmo",
    /** 火车启动事件 */
    TrainStarted = "TrainStarted",
    /** 火车到站事件 */
    TrainArrived = "TrainArrived",
    /** 火车开始卸货（资源飞出中，禁止上车） */
    TrainUnloading = "TrainUnloading",
    /** 火车卸货完毕，进入 Idle（可以上车） */
    TrainIdle = "TrainIdle",
    /** 车厢满载事件 */
    TrainCarFull = "TrainCarFull",
    /** ResourceContainer 注册事件（自动关联，无需手动拖节点） */
    ResourceContainerRegister = "ResourceContainerRegister",
    /** 火车升级完成事件 */
    TrainUpgraded = "TrainUpgraded",
    /** 丧尸潮开始事件 */
    ZombieWaveStart = "ZombieWaveStart",
    /** 所有箭塔建完事件 */
    AllTowersBuilt = "AllTowersBuilt",
    /** 开始终局演出事件 */
    EndingPerformanceStart = "EndingPerformanceStart",
    /** 锯条收割资源事件（payload: { type: ObjectType, amount: number, worldPos: Vec3 }） */
    HarvestCrop = "HarvestCrop",
    /** 玩家上车事件（payload: 无） */
    HeroBoarded = "HeroBoarded",
    /** 玩家下车事件（payload: 无） */
    HeroAlighted = "HeroAlighted",
}

/**
 * 角色状态枚举
 */
export enum CharacterState {
    /** 空闲状态 */
    Idle = 'Idle',
    /** 移动状态 */
    Move = 'Move',
    /** 攻击状态 */
    Attack = 'Attack',
    /** 技能状态 */
    Skill = 'Skill',
    /** 死亡状态 */
    Dead = 'Dead'
}

/**
 * 游戏对象类型枚举
 */
export enum ObjectType {
    /** 无类型 */
    None = 'None',
    /** 伤害数字类型 */
    DamageNum = 'DamageNum',
    /** 提示文字类型 */
    TipLabel = 'TipLabel',
    /** 掉落金币类型 */
    DropItemCoin = 'DropItemCoin',
    /** 掉落玉米粒类型 */
    DropItemCornKernel  = 'DropItemCornKernel',
    /** 掉落肉类型 */
    DropItemMeat = 'DropItemMeat',
    /** 掉落木头类型 */
    DropItemWood = 'DropItemWood',
    /** 掉落大饼类型 */
    DropItemFlatbread = 'DropItemFlatbread',
    /** 顾客类型 */
    Customer = 'Customer',
    /**箭矢 */
    Arrow = "Arrow",
    /** 炮弹 */
    Shell = "Shell",
}

/**
 * 建筑解锁状态枚举
 */
export enum BuildUnlockState {
    /** 未激活状态 */
    NoActive = 'NoActive',
    /** 已激活状态 */
    Active = 'Active',
    /** 解锁中状态 */
    Unlocking = 'Unlocking',
    /** 已解锁状态 */
    Unlocked = 'Unlocked'
}

/**
 * 物品类型枚举
 */
export enum BuildingType {
    /** 无类型 */
    None = 'None',
    /** 伐木工人 */
    Lumberjack = 'Lumberjack',
    /** 伐木工人2 */
    Lumberjack2 = 'Lumberjack2',
    /** 肉商店 */
    MeatShop = 'MeatShop',
    /** Wall */
    Wall = 'Wall',
    /** 箭塔 */
    ArrowTower = 'ArrowTower',
    /** 箭塔1 */
    ArrowTower1 = 'ArrowTower1',
    /** 箭塔2 */
    ArrowTower2 = 'ArrowTower2',
    ArrowTower3 = 'ArrowTower3',
    /** 炮塔 */
    Turret = 'Turret',
    /** Wall1 */
    Wall1 = 'Wall1',
    /** Other */
    Other = 'Other',
    /** 其他1 */
    Other1 = 'Other1',
    /** 其他2 */
    Other2 = 'Other2',
    /**售货员1 */
    Salesperson1 = 'Salesperson1',
    /** 售货员2 */
    Salesperson2 = 'Salesperson2',
}

/**
 * 英雄类型枚举
 */
export enum HeroType {
    /** 无类型 */
    None = 'None',
}


/**
 * 特效层级枚举
 */
export enum LayerType {
    /** 地图层级 */
    Map = 1,
    /** 特效层级 */
    Effect = 2
}

/**
 * 特效类型枚举
 */
export enum EffectType {
    /** 无类型 */
    None = 'None',
    /** Boss攻击特效 */
    Boss_Attack = 'Boss_Attack',
    /** 英雄升级特效 */
    Hero_Upgrade = 'Hero_Upgrade',
    /** 英雄传送特效 */
    Hero_Teleport = 'Hero_Teleport',
    /** 木头掉落特效 */
    Wood_Drop = 'Wood_Drop',
    /** 受击特效 */
    Hurt = 'Hurt',
    /** 飙血特效 */
    Bleeding = 'Bleeding',
    /** 爆炸特效 */
    Explosion = 'Explosion',
}



/**
 * 颜色效果类型及优先级(数字越大优先级越高)
 */
export enum ColorEffectType {
    NORMAL = 0,     // 正常颜色
    SLOW = 1,       // 减速效果(蓝色)
    HURT = 2,       // 受伤效果(红色)
    ELECTRIC_SHOCK = 3  // 电击效果(闪烁效果)
}

/** 
 * 物理组枚举
 */
export enum PHY_GROUP {
    DEFAULT = 1 << 0, // 默认 1
    HERO = 1 << 1, // 英雄 2
    ENEMY = 1 << 2, // 敌人 4
    BULLET = 1 << 3, // 子弹 8
    HOME = 1 << 4, // 家 16
    WALL = 1 << 5, // 墙 32
    GROUND = 1 << 6, // 地面 64
    SOLDER = 1 << 7, // 士兵 128
    BUILDING = 1 << 8, // 建筑 256
    HOME2 = 1 << 9, // 家2 512
    DOOR = 1 << 10, // 门 1024
    Safe = 1 << 11, // 安全区域 2048

};

/**
 * 排序方式枚举
 */
export enum CharacterSortType {
    /** 距离排序 */
    Distance = 'Distance',
    /** 反向距离排序 */
    ReverseDistance = 'ReverseDistance',
    /** 血量排序 */
    HP = 'HP',
    /** Boss精英怪优先排序 */
    BossElite = 'BossElite',
}

/**
 * 游戏结果枚举
 */
export enum GameResult {
    /** 无结果 */
    None = 'None',
    /** 胜利 */
    Win = 'Win',
    /** 失败 */
    Fail = 'Fail',
}

/**
 * 帧事件ID枚举
 */
export enum FrameEventId {
    /** 攻击伤害帧事件 */
    ATTACK_DAMAGE = 'attack_damage',
    /** 攻击音效帧事件 */
    ATTACK_SOUND = 'attack_sound',
    /** 攻击特效帧事件 */
    ATTACK_EFFECT = 'attack_effect',
    /** 移动攻击伤害帧事件 */
    RUN_ATTACK_DAMAGE = 'run_attack_damage',
    /** 移动攻击音效帧事件 */
    RUN_ATTACK_SOUND = 'run_attack_sound',
    /** 技能释放帧事件 */
    SKILL_CAST = 'skill_cast',
    /** 技能音效帧事件 */
    SKILL_SOUND = 'skill_sound',
    /** 技能特效帧事件 */
    SKILL_EFFECT = 'skill_effect',
    /** 死亡音效帧事件 */
    DEATH_SOUND = 'death_sound',
    /** 死亡特效帧事件 */
    DEATH_EFFECT = 'death_effect',
    /** 移动音效帧事件 */
    MOVE_SOUND = 'move_sound',
    /** 受击音效帧事件 */
    HURT_SOUND = 'hurt_sound',
    /** 受击特效帧事件 */
    HURT_EFFECT = 'hurt_effect',
    /** 自定义帧事件1 */
    CUSTOM_1 = 'custom_1',
    /** 自定义帧事件2 */
    CUSTOM_2 = 'custom_2',
    /** 自定义帧事件3 */
    CUSTOM_3 = 'custom_3',
}


/**
 * 移动类型枚举
 */
export enum MoveType {
    /** 停止 */
    Stop = 'Stop',
    /** 英雄 */
    Hero = 'Hero',
    /** 吉普车 */
    JeepCar = 'JeepCar',
}