System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, director, Vec3, Prefab, instantiate, NodePool, geometry, PhysicsSystem, BuildingType, BuildUnlockState, CommonEvent, PHY_GROUP, HealthComponent, Enemy, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _class3, _crd, ccclass, property, EnemyManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBuildingType(extras) {
    _reporterNs.report("BuildingType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildUnlockState(extras) {
    _reporterNs.report("BuildUnlockState", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPHY_GROUP(extras) {
    _reporterNs.report("PHY_GROUP", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHealthComponent(extras) {
    _reporterNs.report("HealthComponent", "../Components/HealthComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEnemy(extras) {
    _reporterNs.report("Enemy", "../Role/Enemy", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      director = _cc.director;
      Vec3 = _cc.Vec3;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      NodePool = _cc.NodePool;
      geometry = _cc.geometry;
      PhysicsSystem = _cc.PhysicsSystem;
    }, function (_unresolved_2) {
      BuildingType = _unresolved_2.BuildingType;
      BuildUnlockState = _unresolved_2.BuildUnlockState;
      CommonEvent = _unresolved_2.CommonEvent;
      PHY_GROUP = _unresolved_2.PHY_GROUP;
    }, function (_unresolved_3) {
      HealthComponent = _unresolved_3.HealthComponent;
    }, function (_unresolved_4) {
      Enemy = _unresolved_4.Enemy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "84778O+69VPFaGC625tSVew", "EnemyManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'director', 'Vec3', 'Prefab', 'instantiate', 'NodePool', 'geometry', 'PhysicsSystem']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("EnemyManager", EnemyManager = (_dec = ccclass('EnemyManager'), _dec2 = property({
        type: Prefab,
        displayName: 'Enemy预制体'
      }), _dec3 = property({
        type: Prefab,
        displayName: '大Enemy预制体'
      }), _dec4 = property({
        displayName: 'Enemy保持数量'
      }), _dec5 = property({
        type: Node,
        displayName: '敌人生成点Box'
      }), _dec6 = property({
        displayName: '游戏开始时自动生成'
      }), _dec7 = property({
        displayName: '是否保持敌人数量'
      }), _dec8 = property({
        displayName: '大Enemy生成概率(%)',
        range: [0, 100, 1]
      }), _dec9 = property({
        displayName: "enemytargethome",
        type: Node
      }), _dec10 = property({
        type: Node,
        displayName: 'C方向生成点Box'
      }), _dec11 = property({
        type: Node,
        displayName: 'D方向生成点Box'
      }), _dec12 = property({
        type: Node,
        displayName: 'A排墙目标节点',
        tooltip: 'C方向刷出的怪物只能攻击这些节点'
      }), _dec13 = property({
        type: Node,
        displayName: 'B排墙目标节点',
        tooltip: 'D方向刷出的怪物只能攻击这些节点'
      }), _dec(_class = (_class2 = (_class3 = class EnemyManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "enemyPrefab", _descriptor, this);

          _initializerDefineProperty(this, "bigEnemyPrefab", _descriptor2, this);

          _initializerDefineProperty(this, "maxEnemyCount", _descriptor3, this);

          _initializerDefineProperty(this, "spawnBoxNode", _descriptor4, this);

          _initializerDefineProperty(this, "autoSpawnOnStart", _descriptor5, this);

          _initializerDefineProperty(this, "isKeepEnemyNum", _descriptor6, this);

          _initializerDefineProperty(this, "bigEnemySpawnRate", _descriptor7, this);

          _initializerDefineProperty(this, "wallTargetHome", _descriptor8, this);

          // ========== 双向刷怪 & 双排墙绑定 ==========

          /** C方向生成点Box（对应A排墙） */
          _initializerDefineProperty(this, "spawnBoxNodeC", _descriptor9, this);

          /** D方向生成点Box（对应B排墙） */
          _initializerDefineProperty(this, "spawnBoxNodeD", _descriptor10, this);

          /** A排墙目标节点列表（C方向怪物攻击） */
          _initializerDefineProperty(this, "wallGroupA", _descriptor11, this);

          /** B排墙目标节点列表（D方向怪物攻击） */
          _initializerDefineProperty(this, "wallGroupB", _descriptor12, this);

          /** A排墙轮询索引（C方向敌人轮流分配） */
          this._wallGroupAIndex = 0;

          /** B排墙轮询索引（D方向敌人轮流分配） */
          this._wallGroupBIndex = 0;

          /** 所有敌人节点列表 */
          this._enemies = [];

          /**
           * 记录每个 enemy 节点对应的专属墙壁目标组（uuid → wallGroup）
           * 当 enemy.targetNode 失效时（墙段被打死），从对应组里重新挑最近目标
           */
          this._enemyWallGroupMap = new Map();

          /** Enemy对象池 */
          this._enemyPool = new NodePool();

          /** 大Enemy对象池 */
          this._bigEnemyPool = new NodePool();

          /** 是否开始管理enemies */
          this._isManagingEnemies = false;

          /** 游戏结束逻辑是否已执行（防止重复调用） */
          this._gameOverExecuted = false;

          /** 是否为单塔模式 */
          this._isSingleTowerMode = true;
          this._killedEnemyCount = 0;
        }

        /** 获取单例实例 */
        static get instance() {
          if (!this._instance) {
            var _director$getScene;

            //console.warn('EnemyManager 实例不存在 动态创建');
            // 动态创建节点并添加组件
            var node = new Node('EnemyManager');
            this._instance = node.addComponent(EnemyManager); // 添加到场景

            (_director$getScene = director.getScene()) == null || _director$getScene.addChild(node);
          }

          return this._instance;
        }

        onLoad() {
          // 单例检查
          if (EnemyManager._instance) {
            this.node.destroy();
            return;
          }

          EnemyManager._instance = this;
          this.registerEvents();
          this.initEnemyPool(); // 如果设置了自动开始，则延迟开始生成敌人

          if (this.autoSpawnOnStart) {
            this.scheduleOnce(() => {
              this.startEnemySpawn();
            }, 1); // 延迟1秒开始
          }
        }

        onDestroy() {
          if (EnemyManager._instance === this) {
            EnemyManager._instance = null;
          }

          this._enemies = [];
          this.clearEnemyPool();
          this.unregisterEvents();
        }
        /**
         * 初始化Enemy对象池
         */


        initEnemyPool() {
          if (!this.enemyPrefab) {
            //console.warn('Enemy预制体未设置，无法初始化对象池');
            return;
          } // 预先创建一些Enemy节点到对象池


          for (var i = 0; i < 5; i++) {
            var enemyNode = instantiate(this.enemyPrefab);
            enemyNode.active = false;

            this._enemyPool.put(enemyNode);
          } // 初始化大Enemy对象池


          if (this.bigEnemyPrefab) {
            for (var _i = 0; _i < 3; _i++) {
              var bigEnemyNode = instantiate(this.bigEnemyPrefab);
              bigEnemyNode.active = false;

              this._bigEnemyPool.put(bigEnemyNode);
            } //console.log('Enemy和大Enemy对象池初始化完成');

          } else {//console.warn('大Enemy预制体未设置，仅初始化普通Enemy对象池');
            //console.log('Enemy对象池初始化完成');
          }
        }
        /**
         * 清理Enemy对象池
         */


        clearEnemyPool() {
          this._enemyPool.clear();

          this._bigEnemyPool.clear();
        }
        /**
         * 从对象池获取Enemy节点
         */


        getEnemyFromPool() {
          var enemyNode = null;

          if (this._enemyPool.size() > 0) {
            enemyNode = this._enemyPool.get();
          } else if (this.enemyPrefab) {
            enemyNode = instantiate(this.enemyPrefab); //console.log('Enemy对象池已空，动态创建新Enemy');
          }

          if (enemyNode) {
            enemyNode.active = true; // 重置Enemy状态

            var enemy = enemyNode.getComponent(_crd && Enemy === void 0 ? (_reportPossibleCrUseOfEnemy({
              error: Error()
            }), Enemy) : Enemy);

            if (enemy) {
              enemy.reset();
            }
          }

          return enemyNode;
        }
        /**获取随机enmey */


        getRandomEnemy() {
          return this._enemies[Math.floor(Math.random() * this._enemies.length)];
        }
        /**统计击杀enemy数量 */


        getKilledEnemyCount() {
          return this._killedEnemyCount;
        }
        /**
         * 回收Enemy节点到对象池
         */


        putEnemyToPool(enemyNode) {
          if (!enemyNode || !enemyNode.isValid) {
            return;
          } // 停用节点


          enemyNode.active = false;
          enemyNode.removeFromParent(); // 放回对象池

          this._enemyPool.put(enemyNode);
        }
        /**
         * 从对象池获取大Enemy节点
         * @returns 大Enemy节点或null
         */


        getBigEnemyFromPool() {
          var bigEnemyNode = null;

          if (this._bigEnemyPool.size() > 0) {
            bigEnemyNode = this._bigEnemyPool.get();
          } else if (this.bigEnemyPrefab) {
            bigEnemyNode = instantiate(this.bigEnemyPrefab); //console.log('大Enemy对象池已空，动态创建新大Enemy');
          }

          if (bigEnemyNode) {
            bigEnemyNode.active = true; // 重置Enemy状态

            var enemy = bigEnemyNode.getComponent(_crd && Enemy === void 0 ? (_reportPossibleCrUseOfEnemy({
              error: Error()
            }), Enemy) : Enemy);

            if (enemy) {
              enemy.reset();
            }
          }

          return bigEnemyNode;
        }
        /**
         * 回收大Enemy节点到对象池
         * @param bigEnemyNode 大Enemy节点
         */


        putBigEnemyToPool(bigEnemyNode) {
          if (!bigEnemyNode || !bigEnemyNode.isValid) {
            return;
          } // 停用节点


          bigEnemyNode.active = false;
          bigEnemyNode.removeFromParent(); // 放回对象池

          this._bigEnemyPool.put(bigEnemyNode);
        }

        registerEvents() {
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).EnemyDeadFinish, this.onEnemyDead, this);
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).UnlockItem, this.onUnlockItem, this);
        }
        /**
         * 检测当前是否为单塔模式
         * 单塔模式：ArrowTower1和ArrowTower2都未解锁
         * 多塔模式：ArrowTower1或ArrowTower2任意一个已解锁
         */


        checkTowerMode() {
          var _manager$game$unlockI, _manager$game$unlockI2;

          var arrowTower1Unlocked = ((_manager$game$unlockI = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).ArrowTower)) == null ? void 0 : _manager$game$unlockI.unlockState) === (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).Unlocked;
          var arrowTower2Unlocked = ((_manager$game$unlockI2 = manager.game.unlockItemMap.get((_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).ArrowTower1)) == null ? void 0 : _manager$game$unlockI2.unlockState) === (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).Unlocked; // 如果两个箭塔都未解锁，则为单塔模式

          return false; //!arrowTower1Unlocked && !arrowTower2Unlocked;
        }

        unregisterEvents() {
          app.event.offAllByTarget(this);
        }
        /**
         * 开始敌人生成
         */


        startEnemySpawn() {
          // console.log('开始生成Enemy军队');
          this._isManagingEnemies = true; // 重置游戏结束标志，允许新一轮游戏触发结束逻辑

          this._gameOverExecuted = false; // 检测当前塔模式并设置相应参数

          this._isSingleTowerMode = this.checkTowerMode();

          if (this._isSingleTowerMode) {
            // 单塔模式：5只一波
            this.isKeepEnemyNum = true; //console.log('单塔模式：5只熊一波');
          } else {
            // 多塔模式：8只，持续补充
            this.isKeepEnemyNum = true; //console.log('多塔模式：持续保持数量');
          }

          this.spawnEnemyArmy();
        }
        /**
         * 智能回收Enemy节点到对应的对象池
         * @param enemyNode Enemy节点
         */


        putEnemyToCorrectPool(enemyNode) {
          if (!enemyNode || !enemyNode.isValid) {
            return;
          } // 通过预制体名称或其他标识判断是普通Enemy还是大Enemy
          // 这里假设大Enemy预制体名称包含"big"或者有特殊标识


          var nodeName = enemyNode.name.toLowerCase();
          var isBigEnemy = nodeName.includes('big') || nodeName.includes('大');

          if (isBigEnemy) {
            this.putBigEnemyToPool(enemyNode);
          } else {
            this.putEnemyToPool(enemyNode);
          }
        }
        /**
         * Enemy死亡回调
         */


        onEnemyDead(enemyNode) {
          if (!this._isManagingEnemies) return; // if(this._killedEnemyCount == 0){

          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).KillEnemy); // }

          this._killedEnemyCount++; // 从列表中移除

          this.removeEnemy(enemyNode); // 清除该 enemy 的墙壁目标组记录

          this._enemyWallGroupMap.delete(enemyNode.uuid); // 智能回收到对应的对应池


          this.putEnemyToCorrectPool(enemyNode);

          if (this.isKeepEnemyNum) {
            // 根据模式决定刷新逻辑
            if (this._isSingleTowerMode) {
              // 单塔模式：当所有敌人都死亡后，生成新一波
              // 不立即补充，等待一波结束
              var needCount = this.maxEnemyCount - this._enemies.length;

              if (needCount >= 5) {
                //console.log('单塔模式：一波结束，生成新一波');
                this.scheduleOnce(() => {
                  this.spawnEnemyArmy1();
                }); // 延迟1秒后生成下一波
              }
            } else {
              // 多塔模式：立即补充一个敌人维持数量
              this.spawnSingleEnemy();
            }
          }
        }
        /**
         * 生成Enemy军队（单塔模式补充一波5只）
         */


        spawnEnemyArmy1() {
          for (var i = 0; i < 5; i++) {
            this.spawnEnemyDirect();
          }
        }
        /**
         * 生成Enemy军队（初始批量生成）
         * 若配置了双向生成点则C/D方向各生成一半，否则走旧逻辑
         */


        spawnEnemyArmy() {
          var _this = this;

          var useDirectional = this._hasDirectionalSpawn();

          var _loop = function _loop(i) {
            _this.scheduleOnce(() => {
              if (useDirectional) {
                // 奇偶分流：偶数批次走C→A，奇数批次走D→B
                _this.spawnEnemyDirectional(i % 2 === 0 ? 'C' : 'D');
              } else {
                _this.spawnEnemyDirect();
              }
            }, i * 0.6);
          };

          for (var i = 0; i < this.maxEnemyCount; i++) {
            _loop(i);
          }
        }
        /**
         * 生成单个Enemy（用于多塔模式维持数量）
         * 若配置了双向生成点则C/D方向轮流补充
         */


        spawnSingleEnemy() {
          if (!this._isManagingEnemies || this._enemies.length >= this.maxEnemyCount) {
            return;
          }

          if (this._hasDirectionalSpawn()) {
            // 随机选择C或D方向补充
            this.spawnEnemyDirectional(Math.random() < 0.5 ? 'C' : 'D');
          } else {
            this.spawnEnemyDirect();
          }
        }
        /**
         * 判断是否已配置双向生成点
         */


        _hasDirectionalSpawn() {
          return !!(this.spawnBoxNodeC && this.spawnBoxNodeD);
        }
        /**
         * 按比例随机获取Enemy节点（普通Enemy或大Enemy）
         * @returns Enemy节点或null
         */


        getRandomEnemyFromPool() {
          var randomValue = Math.random() * 100;

          if (randomValue < this.bigEnemySpawnRate && this.bigEnemyPrefab) {
            var bigEnemyNode = this.getBigEnemyFromPool();

            if (bigEnemyNode) {
              return bigEnemyNode;
            }
          }

          return this.getEnemyFromPool();
        }
        /**
         * 方向性生成Enemy（核心新逻辑）
         * C方向生成 → 只攻击A排墙；D方向生成 → 只攻击B排墙。
         * 目标选取在 EnemyManager 内完成后直接写入 enemy.targetNode，Enemy 本身无需感知分组概念。
         * @param direction 'C' 对应A排墙，'D' 对应B排墙
         */


        spawnEnemyDirectional(direction) {
          if (!this._isManagingEnemies || this._enemies.length >= this.maxEnemyCount) {
            return;
          }

          var enemyNode = this.getRandomEnemyFromPool();

          if (!enemyNode) {
            return;
          } // 根据方向选择对应的生成Box和墙壁目标组


          var spawnBox = direction === 'C' ? this.spawnBoxNodeC : this.spawnBoxNodeD;
          var wallGroup = direction === 'C' ? this.wallGroupA : this.wallGroupB; // 从对应方向的Box内随机生成位置

          var spawnPos = this._generatePositionFromBox(spawnBox);

          enemyNode.setParent(this.node);
          enemyNode.setWorldPosition(spawnPos);
          this.addEnemy(enemyNode);
          var enemy = enemyNode.getComponent(_crd && Enemy === void 0 ? (_reportPossibleCrUseOfEnemy({
            error: Error()
          }), Enemy) : Enemy);

          if (enemy) {
            // 轮询分配：每个敌人依次分配不同的围栏目标，避免所有敌人扎堆打同一个围栏
            enemy.targetNode = this._pickRoundRobinNode(direction, wallGroup); // 记录该 enemy 对应的墙壁目标组，供 targetNode 失效时重新选取

            this._enemyWallGroupMap.set(enemyNode.uuid, wallGroup); // 出生演出：钻出 + 特效


            enemy.playSpawnIntro(spawnPos);
          }
        }
        /**
         * 轮询分配目标节点：跳过已死亡/失效的节点，保证每个围栏被均匀攻击
         * @param direction 'C' 使用A组索引，'D' 使用B组索引
         * @param nodes 候选节点列表
         * @returns 分配到的节点，全部失效时返回 null
         */


        _pickRoundRobinNode(direction, nodes) {
          if (!nodes || nodes.length === 0) return null;
          var isA = direction === 'C';
          var total = nodes.length; // 最多轮询一圈，找到第一个有效节点

          for (var i = 0; i < total; i++) {
            var idx = isA ? this._wallGroupAIndex % total : this._wallGroupBIndex % total; // 推进索引

            if (isA) {
              this._wallGroupAIndex = (this._wallGroupAIndex + 1) % total;
            } else {
              this._wallGroupBIndex = (this._wallGroupBIndex + 1) % total;
            }

            var node = nodes[idx];

            if (node && node.isValid) {
              return node;
            }
          }

          return null;
        }
        /**
         * 从节点列表中选出距离 origin 最近的节点（XZ平面距离）
         * @param origin 参考位置
         * @param nodes  候选节点列表
         * @returns 最近节点，列表为空时返回 null
         */


        _pickNearestNode(origin, nodes) {
          if (!nodes || nodes.length === 0) return null;
          var nearest = null;
          var nearestSqDist = Number.MAX_VALUE;

          for (var node of nodes) {
            if (!node || !node.isValid) continue;
            var p = node.getWorldPosition();
            var dx = p.x - origin.x;
            var dz = p.z - origin.z;
            var sqDist = dx * dx + dz * dz;

            if (sqDist < nearestSqDist) {
              nearestSqDist = sqDist;
              nearest = node;
            }
          }

          return nearest;
        }
        /**
         * 旧版直接生成（未配置双向生成点时的兜底逻辑）
         */


        spawnEnemyDirect() {
          if (!this._isManagingEnemies || this._enemies.length >= this.maxEnemyCount) {
            return;
          }

          var enemyNode = this.getRandomEnemyFromPool();

          if (!enemyNode) {
            //console.warn('无法从对象池获取Enemy节点');
            return;
          }

          var targetPos = this.generateSafeSpawnPosition();
          enemyNode.setParent(this.node);
          enemyNode.setWorldPosition(targetPos);
          this.addEnemy(enemyNode);
          var enemy = enemyNode.getComponent(_crd && Enemy === void 0 ? (_reportPossibleCrUseOfEnemy({
            error: Error()
          }), Enemy) : Enemy);

          if (enemy) {
            enemy.playSpawnIntro(targetPos);
          }
        }
        /**
         * 设置敌人随机缩放和对应生命值
         * @param enemyNode 敌人节点
         */


        setRandomScaleAndHealth(enemyNode) {
          if (!enemyNode || !enemyNode.isValid) return; // 随机缩放值：0.8到1.2

          var minScale = 0.9;
          var maxScale = 1;
          var randomScale = minScale + Math.random() * (maxScale - minScale); // 设置节点缩放

          enemyNode.setScale(randomScale, randomScale, randomScale); // 根据缩放值计算对应生命值：160到240

          var minHealth = 140;
          var maxHealth = 260; // 缩放值与生命值成正比

          var scaleRatio = (randomScale - minScale) / (maxScale - minScale); // 0到1的比例

          var calculatedHealth = Math.round(minHealth + scaleRatio * (maxHealth - minHealth)); // 设置生命值

          var healthComponent = enemyNode.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
            error: Error()
          }), HealthComponent) : HealthComponent);

          if (healthComponent) {
            healthComponent.setMaxHealth(calculatedHealth);
            healthComponent.setCurrentHealth(calculatedHealth);
          } // 调试日志
          // console.log(`敌人缩放: ${randomScale.toFixed(2)}, 生命值: ${calculatedHealth}`);

        }
        /**
         * 在指定Box节点范围内随机生成一个世界坐标位置（考虑Box旋转）
         * @param boxNode 生成区域Box节点
         */


        _generatePositionFromBox(boxNode) {
          var boxWorldPos = boxNode.getWorldPosition();
          var boxWorldScale = boxNode.getWorldScale();
          var boxWorldRotation = boxNode.getWorldRotation();
          var localX = (Math.random() - 0.5) * boxWorldScale.x;
          var localY = 0;
          var localZ = (Math.random() - 0.5) * boxWorldScale.z;
          var localPos = new Vec3(localX, localY, localZ);
          var rotatedPos = new Vec3();
          Vec3.transformQuat(rotatedPos, localPos, boxWorldRotation);
          var finalPos = new Vec3();
          Vec3.add(finalPos, boxWorldPos, rotatedPos);
          return finalPos;
        }
        /**
         * 在旧版生成点Box范围内随机生成位置（兜底，兼容旧配置）
         */


        generateSafeSpawnPosition() {
          if (!this.spawnBoxNode) {//console.warn('spawnBoxNode未设置，使用默认位置');
          }

          return this._generatePositionFromBox(this.spawnBoxNode);
        }
        /**
         * 检测位置是否安全（不在家触发器范围内）
         */


        isPositionSafeFromHome(position) {
          // 创建从上方向下的射线进行检测
          var ray = new geometry.Ray();
          var rayOrigin = new Vec3(position.x, position.y + 20, position.z); // 从高处向下射线

          var rayDir = new Vec3(0, -1, 0); // 向下的方向

          ray.o = rayOrigin;
          ray.d = rayDir; // 执行射线检测，检测HOME组

          var maxDistance = 30; // 最大检测距离

          var queryTrigger = true; // 检测触发器

          var hasHit = PhysicsSystem.instance.raycast(ray, (_crd && PHY_GROUP === void 0 ? (_reportPossibleCrUseOfPHY_GROUP({
            error: Error()
          }), PHY_GROUP) : PHY_GROUP).HOME, maxDistance, queryTrigger);

          if (hasHit) {
            var raycastResults = PhysicsSystem.instance.raycastResults;

            for (var result of raycastResults) {
              var collider = result.collider;

              if (collider.getGroup() === (_crd && PHY_GROUP === void 0 ? (_reportPossibleCrUseOfPHY_GROUP({
                error: Error()
              }), PHY_GROUP) : PHY_GROUP).HOME) {
                // console.log(`检测到家触发器，位置不安全: ${position}`);
                return false; // 检测到家触发器，位置不安全
              }
            }
          }

          return true; // 位置安全
        }
        /**
        * 检测位置是否安全（不在家触发器范围内）
        */


        isPositionSafeFromSafe(position) {
          // 创建从上方向下的射线进行检测
          var ray = new geometry.Ray();
          var rayOrigin = new Vec3(position.x, position.y + 20, position.z); // 从高处向下射线

          var rayDir = new Vec3(0, -1, 0); // 向下的方向

          ray.o = rayOrigin;
          ray.d = rayDir; // 执行射线检测，检测HOME组

          var maxDistance = 30; // 最大检测距离

          var queryTrigger = true; // 检测触发器

          var hasHit = PhysicsSystem.instance.raycast(ray, (_crd && PHY_GROUP === void 0 ? (_reportPossibleCrUseOfPHY_GROUP({
            error: Error()
          }), PHY_GROUP) : PHY_GROUP).Safe, maxDistance, queryTrigger);

          if (hasHit) {
            var raycastResults = PhysicsSystem.instance.raycastResults;

            for (var result of raycastResults) {
              var collider = result.collider;

              if (collider.getGroup() === (_crd && PHY_GROUP === void 0 ? (_reportPossibleCrUseOfPHY_GROUP({
                error: Error()
              }), PHY_GROUP) : PHY_GROUP).Safe) {
                // console.log(`检测到家触发器，位置不安全: ${position}`);
                return false; // 检测到家触发器，位置不安全
              }
            }
          }

          return true; // 位置安全
        }
        /**
         * 添加敌人到管理器
         * @param enemy 敌人节点
         */


        addEnemy(enemy) {
          // 替换 includes 检查以兼容旧的 TypeScript 配置
          var exists = false;

          for (var i = 0; i < this._enemies.length; i++) {
            if (this._enemies[i] === enemy) {
              exists = true;
              break;
            }
          }

          if (!exists) {
            this._enemies.push(enemy); // console.log(`添加Enemy到管理器，当前数量: ${this._enemies.length}`);

          }
        }
        /**
         * 从管理器移除敌人
         * @param enemy 敌人节点
         */


        removeEnemy(enemy) {
          var index = this._enemies.indexOf(enemy);

          if (index >= 0) {
            this._enemies.splice(index, 1); // console.log(`从管理器移除Enemy，当前数量: ${this._enemies.length}`);

          }
        }
        /**
         * 获取范围内的敌人
         * @param position 中心位置
         * @param range 范围半径
         * @returns 范围内的敌人组件数组
         */


        getRangeEnemies(position, range) {
          var rangeEnemies = []; // 使用平方距离来优化性能，避免开平方根运算

          var rangeSquared = range * range;

          for (var enemy of this._enemies) {
            var _enemy$getComponent;

            if (!enemy || !enemy.isValid || (_enemy$getComponent = enemy.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
              error: Error()
            }), HealthComponent) : HealthComponent)) != null && _enemy$getComponent.isDead) {
              continue;
            } // 计算平方距离


            var enemyPos = enemy.getWorldPosition();
            var squaredDistance = Vec3.squaredDistance(position, enemyPos);

            if (squaredDistance <= rangeSquared) {
              // 这里返回的对象应该包含node属性，以匹配BulletBase中的使用方式
              rangeEnemies.push({
                node: enemy,
                squaredDistance: squaredDistance // 注意：这里是平方距离，用于排序

              });
            }
          } // 按平方距离排序，最近的在前面


          rangeEnemies.sort((a, b) => a.squaredDistance - b.squaredDistance);
          return rangeEnemies;
        }

        getNearestEnemy(position, range) {
          if (range !== undefined) {
            var list = this.getRangeEnemies(position, range);
            return list.length > 0 ? list[0].node : null;
          }

          return this._pickNearestNode(position, this._enemies);
        }

        update(dt) {
          if (!this.isKeepEnemyNum) {// this.checkGameOver();
          } // 检查有分组绑定的 enemy，当其 targetNode 失效时（墙段被打死），从对应组里重新选最近目标


          if (this._enemyWallGroupMap.size > 0) {
            for (var enemyNode of this._enemies) {
              if (!enemyNode || !enemyNode.isValid) continue;

              var wallGroup = this._enemyWallGroupMap.get(enemyNode.uuid);

              if (!wallGroup) continue; // 没有分组绑定，走 Enemy 自身的旧逻辑

              var enemy = enemyNode.getComponent(_crd && Enemy === void 0 ? (_reportPossibleCrUseOfEnemy({
                error: Error()
              }), Enemy) : Enemy);
              if (!enemy) continue; // targetNode 失效时，从对应墙组重新选最近目标

              if (!enemy.targetNode || !enemy.targetNode.isValid) {
                enemy.targetNode = this._pickNearestNode(enemyNode.getWorldPosition(), wallGroup);
              }
            }
          }
        } // private checkGameOver(): void {
        //     if(this._enemies.length === 0 && !this._gameOverExecuted){
        //         this.onGameWin();
        //     }
        // }


        endGame() {
          this.scheduleOnce(() => {
            this.stopEnemySpawn();
          }, 2);
          this.scheduleOnce(() => {
            this.onGameWin();
          }, 0.5);
        }

        onGameWin() {
          // 标记游戏结束逻辑已执行，防止重复调用
          this._gameOverExecuted = true;
          manager.game.hero.pickupComponent.magnetPickup(9999).then(() => {
            // this.startEnemySpawn();
            this.scheduleOnce(() => {// app.event.emit(CommonEvent.UnlockItem, BuildingType.Wall1);
              // app.event.emit(CommonEvent.SetUnlockStatue, {type: BuildingType.Wall1, state: BuildUnlockState.Unlocked});
            }, 1);
            this.scheduleOnce(() => {
              app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
                error: Error()
              }), CommonEvent) : CommonEvent).GameWin);
            }, 3.5);
          });
        }

        onUnlockItem(type) {
          // 检测是否解锁了第二个箭塔，如果是则切换到多塔模式
          if (type === (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).ArrowTower || type === (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).ArrowTower1) {
            // 检查是否从单塔模式切换到多塔模式
            if (this._isSingleTowerMode && !this.checkTowerMode()) {
              this.switchToMultiTowerMode();
            }
          }

          if (type === (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).Turret) {
            this.scheduleOnce(() => {
              this.stopEnemySpawn();
            }, 2);
            this.scheduleOnce(() => {
              this.onGameWin();
            }, 0.5);
          }
        }
        /**
         * 切换到多塔模式
         */


        switchToMultiTowerMode() {
          //console.log('切换到多塔模式');
          this._isSingleTowerMode = false;
          this.isKeepEnemyNum = true; // 立即补充敌人至8个

          var needSpawn = this.maxEnemyCount - this._enemies.length;

          if (needSpawn > 0) {
            for (var i = 0; i < needSpawn; i++) {
              this.scheduleOnce(() => {
                this.spawnEnemyDirect();
              }, i * 0.3); // 每个敌人间隔0.3秒生成
            }
          }
        }
        /**
         * 停止生成敌人
         */


        stopEnemySpawn() {
          this.isKeepEnemyNum = false; //console.log('停止敌人生成');
        }

        reset() {
          // 停止敌人管理
          this._isManagingEnemies = false; // 重置轮询索引

          this._wallGroupAIndex = 0;
          this._wallGroupBIndex = 0; // 清除所有 enemy 的墙壁目标组记录

          this._enemyWallGroupMap.clear(); // 重置游戏结束标志，允许重新触发游戏结束逻辑


          this._gameOverExecuted = false; // 重置为单塔模式

          this._isSingleTowerMode = true; // 取消所有定时器任务

          this.unscheduleAllCallbacks(); // 销毁所有当前存在的敌人

          for (var enemyNode of this._enemies) {
            if (enemyNode && enemyNode.isValid) {
              enemyNode.destroy();
            }
          } // 清空敌人列表


          this._enemies = []; // 清理对象池

          this.clearEnemyPool(); // 重新初始化对象池

          this.initEnemyPool(); // 重置敌人保持数量状态为初始值

          this.isKeepEnemyNum = true; //console.log('EnemyManager 重置完成');
        }

      }, _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "enemyPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bigEnemyPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "maxEnemyCount", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 8;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "spawnBoxNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "autoSpawnOnStart", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "isKeepEnemyNum", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "bigEnemySpawnRate", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "wallTargetHome", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "spawnBoxNodeC", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "spawnBoxNodeD", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "wallGroupA", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "wallGroupB", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c7a483233cf991b1d7faa833c3ecc0041939575a.js.map