System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Node, tween, v3, Vec3, instantiate, ParticleSystem, SkeletalAnimation, CharacterState, CommonEvent, ComponentEvent, HealthComponent, Character, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, EnemyAIState, Enemy;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCharacterState(extras) {
    _reporterNs.report("CharacterState", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDamageData(extras) {
    _reporterNs.report("DamageData", "../../Main/Common/CommonInterface", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../../Main/Common/ComponentEvents", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHealthComponent(extras) {
    _reporterNs.report("HealthComponent", "../Components/HealthComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCharacter(extras) {
    _reporterNs.report("Character", "./Character", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Node = _cc.Node;
      tween = _cc.tween;
      v3 = _cc.v3;
      Vec3 = _cc.Vec3;
      instantiate = _cc.instantiate;
      ParticleSystem = _cc.ParticleSystem;
      SkeletalAnimation = _cc.SkeletalAnimation;
    }, function (_unresolved_2) {
      CharacterState = _unresolved_2.CharacterState;
      CommonEvent = _unresolved_2.CommonEvent;
    }, function (_unresolved_3) {
      ComponentEvent = _unresolved_3.ComponentEvent;
    }, function (_unresolved_4) {
      HealthComponent = _unresolved_4.HealthComponent;
    }, function (_unresolved_5) {
      Character = _unresolved_5.Character;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "37166EjM4lEKZWyyUL6RZaF", "Enemy", undefined);

      __checkObsolete__(['_decorator', 'Node', 'random', 'tween', 'v3', 'Vec3', 'geometry', 'PhysicsSystem', 'AnimationClip', 'instantiate', 'ParticleSystem', 'SkeletalAnimation']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("EnemyAIState", EnemyAIState = /*#__PURE__*/function (EnemyAIState) {
        EnemyAIState[EnemyAIState["Idle"] = 0] = "Idle";
        EnemyAIState[EnemyAIState["Run"] = 1] = "Run";
        EnemyAIState[EnemyAIState["Attack"] = 2] = "Attack";
        EnemyAIState[EnemyAIState["Dead"] = 3] = "Dead";
        EnemyAIState[EnemyAIState["ChaseHero"] = 4] = "ChaseHero";
        EnemyAIState[EnemyAIState["ReturnToOriginal"] = 5] = "ReturnToOriginal";
        return EnemyAIState;
      }({}));
      /**
       * 敌人角色类 - 展示重构后的事件系统使用
       */


      _export("Enemy", Enemy = (_dec = ccclass('Enemy'), _dec2 = property({
        type: Number,
        displayName: '攻击偏移'
      }), _dec3 = property({
        type: Number,
        displayName: '追踪英雄检测范围',
        tooltip: '当英雄在此范围内且不在安全区时，敌人会追踪英雄'
      }), _dec4 = property({
        type: Number,
        displayName: '追踪英雄攻击距离',
        tooltip: '追踪英雄时的攻击距离'
      }), _dec5 = property({
        type: SkeletalAnimation,
        displayName: '钻出动画',
        tooltip: '敌人钻出时的动画'
      }), _dec6 = property({
        type: Number,
        displayName: '出生演出时长(秒)'
      }), _dec7 = property({
        type: Node,
        displayName: '出生特效Prefab(可选)',
        tooltip: '实例化为一次性出生特效；留空则不播放'
      }), _dec(_class = (_class2 = class Enemy extends (_crd && Character === void 0 ? (_reportPossibleCrUseOfCharacter({
        error: Error()
      }), Character) : Character) {
        constructor() {
          super(...arguments);
          this.aiState = EnemyAIState.Idle;
          this.aiStateTimer = 0;
          this.aiStateTimerMax = 0.05;
          this._isSpawning = false;
          this.stopOnReachTarget = false;

          _initializerDefineProperty(this, "attackOffset", _descriptor, this);

          _initializerDefineProperty(this, "heroDetectionRange", _descriptor2, this);

          _initializerDefineProperty(this, "heroAttackRange", _descriptor3, this);

          _initializerDefineProperty(this, "explodeClip", _descriptor4, this);

          _initializerDefineProperty(this, "spawnIntroDuration", _descriptor5, this);

          _initializerDefineProperty(this, "spawnEffectPrefab", _descriptor6, this);

          /** 追踪英雄前的原始目标节点 */
          this.originalTargetNode = null;

          /** 追踪英雄前的原始位置 */
          this.originalPosition = null;

          /** 是否正在追踪英雄 */
          this.isChasingHero = false;

          /** 当前移动目标节点 */
          this.targetNode = null;
        }

        get AiState() {
          return this.aiState;
        }

        set AiState(value) {
          this.aiState = value;
        }

        onLoad() {
          super.onLoad();
        }

        TEST(state) {//console.warn('TEST', state);
        }

        update(dt) {
          if (!manager.game.isGameStart) return;
          super.update(dt);
          if (this._isSpawning) return; // 检查是否需要追踪或停止追踪英雄
          // this.updateHeroTracking();

          this.handleAIState(dt);
          this.aiStateTimer += dt;

          while (this.aiStateTimer >= this.aiStateTimerMax) {
            this.aiStateTimer -= this.aiStateTimerMax;

            switch (this.aiState) {
              case EnemyAIState.Idle:
                break;

              case EnemyAIState.Run:
                if (this.checkIsNearTarget(this.attackOffset)) {
                  if (this.stopOnReachTarget) {
                    this.aiState = EnemyAIState.Idle;
                  } else {
                    //console.log(`[Enemy攻击] AI状态切换: Run -> Attack, 距离目标: ${this.getDistanceToTarget().toFixed(2)}m`);
                    this.aiState = EnemyAIState.Attack;
                  }
                }

                break;

              case EnemyAIState.Attack:
                // 如果正在追踪英雄，检查与英雄的距离
                if (this.isChasingHero) {
                  if (!this.checkIsNearHero(this.heroAttackRange)) {
                    //console.log(`[Enemy攻击] AI状态切换: Attack -> ChaseHero, 距离英雄过远`);
                    this.aiState = EnemyAIState.ChaseHero;
                  }
                } else {
                  // 原有逻辑：检查与目标的距离
                  if (!this.checkIsNearTarget(this.attackOffset)) {
                    //console.log(`[Enemy攻击] AI状态切换: Attack -> Run, 距离目标: ${this.getDistanceToTarget().toFixed(2)}m`);
                    this.aiState = EnemyAIState.Run;
                  }
                }

                break;

              case EnemyAIState.ChaseHero:
                // 追英雄功能已禁用（updateHeroTracking已注释），
                // 若意外进入此状态，直接回到 Run 继续打墙，不切换 targetNode
                this.aiState = EnemyAIState.Run;
                break;

              case EnemyAIState.ReturnToOriginal:
                // 追英雄功能已禁用，若意外进入此状态，
                // 直接回到 Run 继续打墙，不恢复 originalTargetNode（防止目标错乱）
                this.originalTargetNode = null;
                this.originalPosition = null;
                this.aiState = EnemyAIState.Run;
                break;

              case EnemyAIState.Dead:
                break;
            }
          }
        }

        initComponents() {
          super.initComponents();
        }

        registerComponentEvents() {
          super.registerComponentEvents(); // 注册目标追踪组件事件（无需设置回调函数）
        }

        registerEvents() {
          super.registerEvents(); // 监听组件初始化完成事件

          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).COMPONENT_INITIALIZED, this.onComponentInitialized, this);
        }

        unregisterEvents() {
          super.unregisterEvents();
        }
        /**
         * 组件初始化完成回调
         */


        onComponentInitialized() {// 所有组件都已初始化并注册了事件监听
          // 可以开始使用事件系统进行组件间通信
          //console.log('敌人组件初始化完成，事件系统已准备就绪');
        }

        /**
         * 选择X轴最近的目标节点
         */
        selectNearestTarget() {
          var targets = manager.wall.RangeNode;

          if (!targets || targets.length === 0) {
            this.targetNode = null;
            return;
          }

          var enemyPos = this.node.getWorldPosition();
          var nearestTarget = null;
          var nearestXDistance = Number.MAX_VALUE;

          for (var target of targets) {
            if (!target || !target.isValid) continue;
            var targetPos = target.getWorldPosition();
            var xDistance = Math.abs(targetPos.x - enemyPos.x);

            if (xDistance < nearestXDistance) {
              nearestXDistance = xDistance;
              nearestTarget = target;
            }
          }

          this.targetNode = nearestTarget;
        }
        /**
         * 计算朝向目标节点的方向向量
         * @returns 标准化的方向向量
         */


        getDirectionToTarget() {
          // targetNode 由 EnemyManager 统一维护（含分组重选逻辑），此处不再主动重选
          // 无效时使用默认方向保持原地等待，下一帧 EnemyManager 会补上正确目标
          if (!this.targetNode || !this.targetNode.isValid) {
            return v3(Math.SQRT1_2, 0, Math.SQRT1_2);
          }

          var enemyPos = this.node.getWorldPosition();
          var targetPos = this.targetNode.getWorldPosition(); // 计算方向向量

          var direction = new Vec3();
          Vec3.subtract(direction, targetPos, enemyPos); // 只保留x和z轴的移动，忽略y轴

          direction.y = 0; // 标准化方向向量

          direction.normalize();
          return direction;
        }
        /**
         * 检查是否接近目标节点
         * @param offset 攻击距离偏移
         * @returns 是否在攻击范围内
         */


        checkIsNearTarget(offset) {
          if (!this.targetNode || !this.targetNode.isValid) {
            return false;
          }

          var enemyPos = this.node.getWorldPosition();
          var targetPos = this.targetNode.getWorldPosition(); // 只计算 XZ 平面距离，忽略 Y 轴高度差，避免因地形高度差导致永远不触发攻击

          var dx = enemyPos.x - targetPos.x;
          var dz = enemyPos.z - targetPos.z;
          var distance = Math.sqrt(dx * dx + dz * dz);
          return distance <= offset;
        }
        /**
         * 获取到目标的距离
         * @returns 距离值
         */


        getDistanceToTarget() {
          if (!this.targetNode || !this.targetNode.isValid) {
            return Infinity;
          }

          var enemyPos = this.node.getWorldPosition();
          var targetPos = this.targetNode.getWorldPosition(); // 只计算 XZ 平面距离，忽略 Y 轴高度差

          var dx = enemyPos.x - targetPos.x;
          var dz = enemyPos.z - targetPos.z;
          return Math.sqrt(dx * dx + dz * dz);
        }
        /**
         * 更新英雄追踪逻辑
         */


        updateHeroTracking() {
          var heroComponent = manager.game.hero;
          if (!heroComponent) return;
          var hero = heroComponent.node;
          var enemyPos = this.node.getWorldPosition();
          var heroPos = hero.getWorldPosition();
          var distanceToHero = Vec3.distance(enemyPos, heroPos); // 英雄不在安全区且在检测范围内

          if (!heroComponent.isSafeArea && distanceToHero <= this.heroDetectionRange) {
            if (!this.isChasingHero) {
              // 开始追踪英雄，保存原始状态
              this.startChasingHero();
            }
          } // 英雄在安全区或超出检测范围
          else if (this.isChasingHero) {
            // 停止追踪，返回原位置
            this.stopChasingHero();
          }
        }
        /**
         * 开始追踪英雄
         */


        startChasingHero() {
          //console.log(`[Enemy] 开始追踪英雄`);
          // 保存当前目标和位置
          this.originalTargetNode = this.targetNode;
          this.originalPosition = this.node.getWorldPosition().clone(); // 设置英雄为目标

          var heroComponent = manager.game.hero;

          if (heroComponent) {
            this.targetNode = heroComponent.node;
          }

          this.isChasingHero = true;
          this.aiState = EnemyAIState.ChaseHero;
        }
        /**
         * 停止追踪英雄，返回原位置
         */


        stopChasingHero() {
          //console.log(`[Enemy] 停止追踪英雄，返回原位置`);
          this.isChasingHero = false;
          this.aiState = EnemyAIState.ReturnToOriginal;
        }
        /**
         * 检查是否接近英雄
         * @param range 检测范围
         * @returns 是否在范围内
         */


        checkIsNearHero(range) {
          var heroComponent = manager.game.hero;
          if (!heroComponent) return false;
          var enemyPos = this.node.getWorldPosition();
          var heroPos = heroComponent.node.getWorldPosition();
          var distance = Vec3.distance(enemyPos, heroPos);
          return distance <= range;
        }
        /**
         * 检查是否到达原始位置
         * @returns 是否到达
         */


        checkReachedOriginalPosition() {
          if (!this.originalPosition) return true;
          var currentPos = this.node.getWorldPosition();
          var distance = Vec3.distance(currentPos, this.originalPosition); // 距离小于0.5认为已到达

          return distance <= 0.5;
        }
        /**
         * 恢复原始目标
         */


        restoreOriginalTarget() {
          this.targetNode = this.originalTargetNode;
          this.originalTargetNode = null;
          this.originalPosition = null;
        }
        /**
         * 计算朝向英雄的方向向量
         * @returns 标准化的方向向量
         */


        getDirectionToHero() {
          var heroComponent = manager.game.hero;

          if (!heroComponent) {
            return v3(Math.SQRT1_2, 0, Math.SQRT1_2);
          }

          var enemyPos = this.node.getWorldPosition();
          var heroPos = heroComponent.node.getWorldPosition();
          var direction = new Vec3();
          Vec3.subtract(direction, heroPos, enemyPos);
          direction.y = 0;
          direction.normalize();
          return direction;
        }
        /**
         * 计算朝向原始位置的方向向量
         * @returns 标准化的方向向量
         */


        getDirectionToOriginalPosition() {
          if (!this.originalPosition) {
            return v3(Math.SQRT1_2, 0, Math.SQRT1_2);
          }

          var enemyPos = this.node.getWorldPosition();
          var direction = new Vec3();
          Vec3.subtract(direction, this.originalPosition, enemyPos);
          direction.y = 0;
          direction.normalize();
          return direction;
        }

        handleAIState(dt) {
          switch (this.aiState) {
            case EnemyAIState.Idle:
              this.moveWorld(Vec3.ZERO);
              break;

            case EnemyAIState.Run:
              // 朝向目标节点移动（使用世界坐标方向，不做摄像机变换）
              var direction = this.getDirectionToTarget();
              this.moveWorld(direction);
              break;

            case EnemyAIState.Attack:
              this.moveWorld(Vec3.ZERO); // 尝试攻击

              if (this.attackComponent.canAttack()) {
                var target = this.GetAttackTarget(); //console.log(`[Enemy攻击] 尝试发起攻击`, {
                //     '敌人': this.node.name,
                //     '目标': target ? target.name : 'null',
                //     '攻击距离': this.getDistanceToTarget().toFixed(2),
                //     '冷却状态': this.attackComponent.isCooling ? '冷却中' : '可攻击'
                // });

                this.attack();
              }

              break;

            case EnemyAIState.ChaseHero:
            case EnemyAIState.ReturnToOriginal:
              // 追英雄功能已禁用，这两个状态降级为 Run 处理（状态机会在下一tick修正）
              var fallbackDir = this.getDirectionToTarget();
              this.moveWorld(fallbackDir);
              break;

            case EnemyAIState.Dead:
              break;
          }
        }

        GetAttackTarget() {
          // targetNode 由 EnemyManager 统一维护（含分组重选逻辑），直接使用
          // 无效时返回 null，等待下一帧 EnemyManager 补上正确目标
          if (this.targetNode && this.targetNode.isValid) {
            return this.targetNode;
          }

          return null;
        }

        onAttackStart() {//console.log(`[Enemy攻击] 📍 攻击开始 - 触发攻击动画`, {
          //     '敌人': this.node.name,
          //     '当前状态': this.stateComponent.getCurrentState(),
          //     '攻击冷却时间': this.attackComponent.attackCooldownTime.toFixed(2) + 's',
          //     '动画名称': this.animationComponent.AttackAnimName,
          //     '是否正在播放动画': this.animationComponent.isPlayingAnimation()
          // });
        }

        onAttackEnd() {//console.log(`[Enemy攻击] 🏁 攻击动画结束`, {
          //     '敌人': this.node.name,
          //     '是否还在冷却': this.attackComponent.isCooling,
          //     '剩余冷却时间': this.attackComponent.currentAttackTime.toFixed(2) + 's'
          // });
        }

        onPerformAttack(damageData) {
          //console.log(`[Enemy攻击] ============== 执行攻击伤害 ==============`);
          //console.log(`[Enemy攻击] 攻击者: ${this.node.name}`, {
          //     '伤害值': damageData.damage.toFixed(2),
          //     '攻击来源': damageData.damageSource?.name || 'unknown'
          // });
          var target = this.GetAttackTarget();

          if (target) {
            var healthComponent = target.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
              error: Error()
            }), HealthComponent) : HealthComponent);

            if (healthComponent) {
              var beforeHp = healthComponent.health;
              var beforeHpPercent = healthComponent.healthPercentage; //console.log(`[Enemy攻击] 攻击目标: ${target.name}`, {
              //     '目标当前血量': beforeHp.toFixed(2),
              //     '血量百分比': (beforeHpPercent * 100).toFixed(1) + '%',
              //     '即将造成伤害': damageData.damage.toFixed(2)
              // });

              healthComponent.takeDamage(damageData);
              var afterHp = healthComponent.health;
              var afterHpPercent = healthComponent.healthPercentage;
              var actualDamage = beforeHp - afterHp; //console.log(`[Enemy攻击] 伤害结果`, {
              //     '实际伤害': actualDamage.toFixed(2),
              //     '剩余血量': afterHp.toFixed(2),
              //     '血量百分比': (afterHpPercent * 100).toFixed(1) + '%'
              // });

              if (healthComponent.isDead) {//console.log(`[Enemy攻击] ⚠️ 目标已死亡: ${target.name}`);
              }
            } else {//console.warn(`[Enemy攻击] 目标没有HealthComponent: ${target.name}`);
            } // 十分之一的概率播放熊攻击音效


            if (Math.random() < 0.3) {
              app.audio.playEffect('resources/audio/hit', 0.4);
            } // app.event.emit(CommonEvent.ShakeCamera, {
            //     intensity: 0.1, // 减少震动强度
            //     duration: 0.05,  // 减少震动时间
            //     source: this.node
            // });

          } else {//console.warn(`[Enemy攻击] ⚠️ 攻击失败: 没有找到有效目标`);
          } //console.log(`[Enemy攻击] ============== 攻击结束 ==============\n`);

        }
        /**
         * 搜索敌人
         */


        searchForAttackTarget(searchRadius) {
          return [];
        }

        onHurt(damageData) {
          super.onHurt(damageData); // 十分之一的概率播放熊受击音效

          if (Math.random() < 0.3) {// app.audio.playEffect('resources/audio/hit', 0.4);
          }
        }

        onDead() {
          super.onDead();
          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).EnemyDead, this.node);
          tween(this.node).by(0.2, {
            eulerAngles: v3(0, Math.random() * 120, 0)
          }).start();
          this.scheduleOnce(() => {
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).EnemyDeadFinish, this.node);
          }, 2); // app.audio.playEffect('resources/audio/熊死亡', 0.4);
          // 直接将金币掉落在地上

          this.schedule(() => {
            if (Math.random() < 0.8) {// 使用DropManager的spawnParabolicItem方法让金币掉落在地上
              // manager.drop.spawnParabolicItem(ObjectType.DropItemCoin, this.node.getWorldPosition(), 2);
            }
          }, 0.05, 2);
        }
        /**
         * 出生演出：从地底钻出 + 特效
         */


        playSpawnIntro(wpos) {
          // 直接设置到生成位置，使用已有钻出动画即可
          this.node.setWorldPosition(wpos);
          this._isSpawning = true;
          this.stateComponent.changeState((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Skill);
          this.aiState = EnemyAIState.Idle;
          var animName = '钻出';
          var clipDur = this.animationComponent ? this.animationComponent.getAnimationDuration(animName) : 0;
          var introDur = Math.max(this.spawnIntroDuration, clipDur || 0); // 钻出动画（若配置了对应剪辑名）

          if (this.animationComponent && this.animationComponent.hasAnimation && this.animationComponent.hasAnimation(animName)) {
            this.animationComponent.playAnimation(animName, false);
          } // 出生特效（可选）


          if (this.spawnEffectPrefab) {
            var fx = instantiate(this.spawnEffectPrefab);
            var parent = manager.game.effectLayerNode || this.node;
            fx.setParent(parent);
            fx.setWorldPosition(wpos);
            var particles = fx.getComponentsInChildren(ParticleSystem);
            particles.forEach(p => {
              try {
                p.play();
              } catch (_unused) {}
            }); // 简单的自动清理

            this.scheduleOnce(() => {
              particles.forEach(p => {
                try {
                  p.stop();
                  p.clear();
                } catch (_unused2) {}
              });
              if (fx && fx.isValid) fx.destroy();
            }, Math.max(0.8, introDur + 0.2));
          } // 动画时长结束后进入正常逻辑


          this.scheduleOnce(() => {
            this.onSpawnComplete(wpos);
          }, Math.max(0.1, introDur));
        }
        /**
         * 生成完成后的回调（抛物线动画结束后调用）
         * 注意：若外部（EnemyManager）已提前赋值 targetNode，则不覆盖，直接使用；
         * 否则从全局 RangeNode 中自动选最近目标（兼容旧逻辑）。
         */


        onSpawnComplete(wpos) {
          this._isSpawning = false; // 仅在未被外部指定目标时才自动选取

          if (!this.targetNode || !this.targetNode.isValid) {
            this.selectNearestTarget();
          } // 设置为闲置状态


          this.stateComponent.changeState((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Idle);
          this.aiState = EnemyAIState.Run;
          this.animationComponent.reset();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "attackOffset", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "heroDetectionRange", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 15;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "heroAttackRange", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "explodeClip", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "spawnIntroDuration", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.8;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "spawnEffectPrefab", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a79e0fc0582fd14ca6c1b671ac64d5d9a5a71a2c.js.map