System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Node, Vec3, Enum, CharacterState, BuildingType, ObjectType, ComponentInitializer, ComponentEvent, PickupComponent, Character, Tree, TreeListType, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, Lumberjack;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCharacterState(extras) {
    _reporterNs.report("CharacterState", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildingType(extras) {
    _reporterNs.report("BuildingType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDamageData(extras) {
    _reporterNs.report("DamageData", "../Common/CommonInterface", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentInitializer(extras) {
    _reporterNs.report("ComponentInitializer", "../Common/ComponentInitializer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../Common/ComponentEvents", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPickupComponent(extras) {
    _reporterNs.report("PickupComponent", "../Components/PickupComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCharacter(extras) {
    _reporterNs.report("Character", "./Character", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTree(extras) {
    _reporterNs.report("Tree", "./Tree", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTreeListType(extras) {
    _reporterNs.report("TreeListType", "../Manager/TreeManager", _context.meta, extras);
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
      Vec3 = _cc.Vec3;
      Enum = _cc.Enum;
    }, function (_unresolved_2) {
      CharacterState = _unresolved_2.CharacterState;
      BuildingType = _unresolved_2.BuildingType;
      ObjectType = _unresolved_2.ObjectType;
    }, function (_unresolved_3) {
      ComponentInitializer = _unresolved_3.ComponentInitializer;
    }, function (_unresolved_4) {
      ComponentEvent = _unresolved_4.ComponentEvent;
    }, function (_unresolved_5) {
      PickupComponent = _unresolved_5.PickupComponent;
    }, function (_unresolved_6) {
      Character = _unresolved_6.Character;
    }, function (_unresolved_7) {
      Tree = _unresolved_7.Tree;
    }, function (_unresolved_8) {
      TreeListType = _unresolved_8.TreeListType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "226b5VNv5ZElozOjuA+dOqq", "Lumberjack", undefined);

      __checkObsolete__(['_decorator', 'Node', 'tween', 'Vec3', 'Animation', 'Quat', 'log', 'SkeletalAnimation', 'AnimationClip', 'ParticleSystem', 'Prefab', 'instantiate', 'ICollisionEvent', 'director', 'Enum']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 英雄组件 - 基于组件化设计的英雄类
       */

      _export("Lumberjack", Lumberjack = (_dec = ccclass('Lumberjack'), _dec2 = property({
        type: _crd && PickupComponent === void 0 ? (_reportPossibleCrUseOfPickupComponent({
          error: Error()
        }), PickupComponent) : PickupComponent,
        displayName: '拾取组件'
      }), _dec3 = property({
        displayName: '总体AI开关',
        tooltip: '控制所有AI行为的总开关，关闭后将禁用所有自动化行为'
      }), _dec4 = property({
        displayName: '启用自动砍树',
        tooltip: '是否自动攻击范围内的树木'
      }), _dec5 = property({
        displayName: '自动攻击检测间隔',
        tooltip: '自动攻击检测的时间间隔(秒)',
        range: [0.1, 2.0]
      }), _dec6 = property({
        type: Node,
        displayName: '矿镐'
      }), _dec7 = property({
        type: Enum(_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
          error: Error()
        }), BuildingType) : BuildingType),
        displayName: '伐木工人类型',
        tooltip: 'Lumberjack砍第一个列表，Lumberjack2砍第二个列表'
      }), _dec(_class = (_class2 = class Lumberjack extends (_crd && Character === void 0 ? (_reportPossibleCrUseOfCharacter({
        error: Error()
      }), Character) : Character) {
        constructor(...args) {
          super(...args);

          /** 拾取组件 */
          _initializerDefineProperty(this, "pickupComponent", _descriptor, this);

          _initializerDefineProperty(this, "enableAI", _descriptor2, this);

          _initializerDefineProperty(this, "enableAutoChopTrees", _descriptor3, this);

          _initializerDefineProperty(this, "autoAttackInterval", _descriptor4, this);

          _initializerDefineProperty(this, "pickaxe", _descriptor5, this);

          /** 自动攻击计时器 */
          this.autoAttackTimer = 0;

          /** 是否正在交付 */
          this.isDelivering = false;

          /** 木头交付阈值 */
          this.WOOD_DELIVER_THRESHOLD = 3;

          /** 是否已完成初始树木搜索 */
          this.hasSearchedForTrees = false;

          /** 搜索树木的范围 */
          this.TREE_SEARCH_RANGE = 100;

          /** 与树木保持的距离（攻击范围的百分比） */
          this.TREE_DISTANCE_RATIO = 0.6;

          // 85%的攻击范围距离，既不会太近也不会太远

          /** 伐木工人类型，决定砍哪个列表的树 */
          _initializerDefineProperty(this, "lumberjackType", _descriptor6, this);

          /** 砍树前先去的位置 */
          this.treePos = null;

          /** 商店位置（交付木头的目标位置） */
          this.shopPos = null;
        }

        /** 获取目标树木列表类型 */
        get targetTreeListType() {
          return this.lumberjackType === (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).Lumberjack2 ? (_crd && TreeListType === void 0 ? (_reportPossibleCrUseOfTreeListType({
            error: Error()
          }), TreeListType) : TreeListType).LIST_2 : (_crd && TreeListType === void 0 ? (_reportPossibleCrUseOfTreeListType({
            error: Error()
          }), TreeListType) : TreeListType).LIST_1;
        }
        /**
         * 初始化伐木工，设置砍树前的初始位置和商店位置
         * @param treePos 砍树前先去的位置
         * @param shopPos 商店位置（交付木头的目标位置）
         */


        init(treePos, shopPos) {
          this.treePos = treePos;
          this.shopPos = shopPos;
        }

        onLoad() {
          super.onLoad();
          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).UPDATE_ITEM_COUNT, this.onUpdateItemCount, this); // 监听物品数量变化事件

          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).TARGET_REACHED, this.onTargetReached, this); // 监听目标到达事件
        }

        onDestroy() {
          app.event.offAllByTarget(this);
        }

        initComponents() {
          super.initComponents();
          (_crd && ComponentInitializer === void 0 ? (_reportPossibleCrUseOfComponentInitializer({
            error: Error()
          }), ComponentInitializer) : ComponentInitializer).initComponents(this.node, {
            pickupComponent: _crd && PickupComponent === void 0 ? (_reportPossibleCrUseOfPickupComponent({
              error: Error()
            }), PickupComponent) : PickupComponent
          }, this);
        }

        update(dt) {
          super.update(dt); // 如果总体AI开关关闭，跳过所有AI逻辑

          if (!this.enableAI) {
            return;
          } // 初始树木搜索


          if (!this.hasSearchedForTrees) {
            this.searchForInitialTrees();
          } // 自动攻击逻辑


          this.updateAutoAttack(dt);
        }
        /**
         * 更新自动攻击逻辑
         * @param dt 帧时间差
         */


        updateAutoAttack(dt) {
          // 如果总体AI开关关闭、未启用自动砍树或正在交付，直接返回
          if (!this.enableAI || !this.enableAutoChopTrees || this.isDelivering) {
            return;
          } // 如果角色已死亡或正在释放技能，不执行自动攻击


          const currentState = this.stateComponent.getCurrentState();

          if (currentState === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Dead || currentState === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Skill) {
            return;
          } // 如果正在移动但不支持移动攻击，暂停自动攻击


          if (currentState === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Move) {
            this.autoAttackTimer = 0; // 重置计时器

            return;
          } // 如果正在攻击状态且攻击组件还在冷却中，不执行自动攻击


          if (currentState === (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Attack && !this.attackComponent.canAttack()) {
            return;
          } // 更新自动计时器


          this.autoAttackTimer += dt;

          if (this.autoAttackTimer < this.autoAttackInterval) {
            return;
          } // 重置计时器 


          this.autoAttackTimer -= this.autoAttackInterval; // 检测并执行自动攻击

          this.checkAndAutoAttack();
        }
        /**
         * 获取范围内可用的树木（包含回退逻辑）
         * @param center 中心位置
         * @param range 搜索范围
         * @returns 树木列表
         */


        getAvailableTrees(center, range) {
          // 1. 尝试搜索目标列表
          let trees = manager.tree.getRangeTrees(center, range, this.targetTreeListType).filter(tree => tree && tree.node && tree.node.isValid && !tree.isDead); // 2. 如果目标列表为空，尝试搜索备用列表

          if (trees.length === 0) {
            const fallbackListType = this.targetTreeListType === (_crd && TreeListType === void 0 ? (_reportPossibleCrUseOfTreeListType({
              error: Error()
            }), TreeListType) : TreeListType).LIST_1 ? (_crd && TreeListType === void 0 ? (_reportPossibleCrUseOfTreeListType({
              error: Error()
            }), TreeListType) : TreeListType).LIST_2 : (_crd && TreeListType === void 0 ? (_reportPossibleCrUseOfTreeListType({
              error: Error()
            }), TreeListType) : TreeListType).LIST_1; // 只有在搜索大范围时才打印日志，避免update中频繁打印

            if (range > this.attackComponent.attackRangeValue * 2) {// console.log(`[Lumberjack] 目标列表为空，尝试搜索备用列表: ${fallbackListType === TreeListType.LIST_1 ? '列表1' : '列表2'}`);
            }

            trees = manager.tree.getRangeTrees(center, range, fallbackListType).filter(tree => tree && tree.node && tree.node.isValid && !tree.isDead);
          }

          return trees;
        }
        /**
         * 检测并执行自动攻击
         */


        checkAndAutoAttack() {
          // 如果总体AI开关关闭或正在交付，不执行攻击
          if (!this.enableAI || this.isDelivering) {
            return;
          }

          const attackRange = this.attackComponent.attackRangeValue;
          const heroPosition = this.node.getWorldPosition(); // 获取范围内的目标列表的树木（支持回退机制）

          const trees = this.getAvailableTrees(heroPosition, attackRange); // 有任何有效目标就攻击

          if (trees.length > 0 && this.attackComponent.canAttack()) {
            if (this.attack()) {// this.pickaxe.active = true;
            }
          }
        }
        /**
         * 物品数量更新回调
         * @param type 物品类型
         * @param count 物品数量
         */


        onUpdateItemCount(type, count) {
          // 当总体AI开关开启、木头数量达到交付阈值且不在交付状态时，开始交付流程
          if (this.enableAI && type === (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemWood && count >= this.WOOD_DELIVER_THRESHOLD && !this.isDelivering) {
            this.startDelivery();
          }
        }

        onPerformAttack(damageData) {
          const primaryTargets = this.getAttackTargetList();
          const target = primaryTargets[0]; // 检查目标是否存在（防止多个伐木工同时攻击导致目标消失）

          if (!target || !target.isValid) {
            //console.warn("[Lumberjack] onPerformAttack: 目标不存在或已失效");
            return;
          }

          const tree = target.getComponent(_crd && Tree === void 0 ? (_reportPossibleCrUseOfTree({
            error: Error()
          }), Tree) : Tree);

          if (tree) {
            // 再次检查树是否已死亡（双重保险）
            if (!tree.isDead) {
              tree.takeDamage(damageData); // 播放砍树音效（如果树还没死亡）

              if (!tree.isDead && app.audio) {// app.audio.playEffect('resources/audio/砍树攻击');
              }
            } else {//console.warn("[Lumberjack] onPerformAttack: 树已经死亡，跳过攻击");
            }
          }
        }

        getAttackTargetList() {
          const attackComponent = this.attackComponent;
          const attackRange = attackComponent.attackRangeValue;
          const heroPosition = this.node.getWorldPosition(); // 收集目标及其距离信息

          const targetsWithDistance = []; // 获取范围内的目标列表的树木，只选择最近的一棵（支持回退机制）

          const trees = this.getAvailableTrees(heroPosition, attackRange);
          let closestTree = null;

          for (const tree of trees) {
            // 增强检查：确保树对象和节点都有效且未死亡
            if (tree && tree.node && tree.node.isValid && !tree.isDead) {
              const distanceSquared = Vec3.squaredDistance(heroPosition, tree.node.getWorldPosition());

              if (!closestTree || distanceSquared < closestTree.distanceSquared) {
                closestTree = {
                  node: tree.node,
                  distanceSquared: distanceSquared
                };
              }
            }
          } // 如果找到最近的树，再次验证节点有效性后添加到目标列表


          if (closestTree && closestTree.node && closestTree.node.isValid) {
            targetsWithDistance.push({
              node: closestTree.node,
              distanceSquared: closestTree.distanceSquared
            });
          } // 仅按距离排序


          targetsWithDistance.sort((a, b) => a.distanceSquared - b.distanceSquared); // 返回排序后的节点列表，再次过滤确保节点有效

          return targetsWithDistance.filter(target => target.node && target.node.isValid).map(target => target.node);
        }

        GetAttackTarget() {
          const targets = this.getAttackTargetList();
          const target = targets[0]; // 验证目标有效性

          if (target && target.isValid) {
            return target;
          }

          return null;
        }
        /**
         * 开始交付流程
         */


        startDelivery() {
          if (this.isDelivering) return; // 检查是否已设置商店位置

          if (!this.shopPos) {
            //console.warn('伐木工未设置商店位置，无法交付');
            return;
          }

          this.isDelivering = true; // 停止自动攻击

          this.enableAutoChopTrees = false; // 移动到商店交付位置

          this.moveToWorldPosition(this.shopPos); //console.log('[Lumberjack] 开始交付木头，目标位置:', this.shopPos);
          // 监听移动完成事件

          this.node.once((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).TARGET_REACHED, this.onReachShop, this);
        }
        /**
         * 完成交付
         */


        completeDelivery() {
          if (!this.isDelivering) return;
          const currentWoodCount = this.pickupComponent.getItemCount((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemWood); //console.log('[Lumberjack] 交付完成，当前木头数量:', currentWoodCount);
          // 等待商店处理交付（由于商店会自动检测PickupComponent，这里只需要等待）
          // 延迟重置状态，确保商店有足够时间处理

          this.scheduleOnce(() => {
            // 重置交付状态
            this.isDelivering = false; // ❌ 不要在这里设置 enableAutoChopTrees = true
            // 等到移动到树附近后再设置
            // 返回到最近的树继续砍树

            this.returnToChopping();
          }, 1.0); // 给商店1秒时间处理交付
        }
        /**
         * 获取最近的可用树木（包含回退逻辑）
         * @param center 中心位置
         * @returns 最近的树木
         */


        getNearestAvailableTree(center) {
          // 1. 尝试搜索目标列表
          let tree = manager.tree.getNearestTree(center, undefined, this.targetTreeListType); // 2. 如果目标列表为空，尝试搜索备用列表

          if (!tree) {
            const fallbackListType = this.targetTreeListType === (_crd && TreeListType === void 0 ? (_reportPossibleCrUseOfTreeListType({
              error: Error()
            }), TreeListType) : TreeListType).LIST_1 ? (_crd && TreeListType === void 0 ? (_reportPossibleCrUseOfTreeListType({
              error: Error()
            }), TreeListType) : TreeListType).LIST_2 : (_crd && TreeListType === void 0 ? (_reportPossibleCrUseOfTreeListType({
              error: Error()
            }), TreeListType) : TreeListType).LIST_1;
            tree = manager.tree.getNearestTree(center, undefined, fallbackListType);
          }

          return tree;
        }
        /**
         * 返回砍树状态
         */


        returnToChopping() {
          const heroPos = this.node.getWorldPosition(); // const listName = this.targetTreeListType === TreeListType.LIST_1 ? '第一个列表' : '第二个列表';
          // 查找最近的目标列表活树（支持回退机制）

          const nearestTree = this.getNearestAvailableTree(heroPos);

          if (nearestTree) {
            const treePos = nearestTree.getWorldPosition();
            const distance = Vec3.distance(heroPos, treePos); //console.log(`[Lumberjack] 交付完成，返回砍树，距离: ${distance.toFixed(2)}`);
            // 如果已经在攻击范围内，直接开始砍树

            if (distance <= this.attackComponent.attackRangeValue) {
              //console.log('[Lumberjack] 已在攻击范围内，直接开始砍树');
              this.enableAutoChopTrees = true;
              return;
            } // 使用新的距离计算方法移动到树木附近


            const targetPos = this.calculateTargetPosition(treePos, heroPos);
            this.moveToWorldPosition(targetPos); // 监听移动完成事件，重新开始砍树

            this.node.once((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
              error: Error()
            }), ComponentEvent) : ComponentEvent).TARGET_REACHED, this.onReturnToTrees, this);
          } else {
            // 如果没有找到树木，直接重新启用自动砍树
            // 这样伐木工会在原地等待新的树木生长或刷新
            //console.warn(`[Lumberjack] 交付完成后未找到任何可用树木，在原地等待新树木`);
            this.enableAutoChopTrees = true;
          }
        }
        /**
         * 到达商店回调
         */


        onReachShop() {
          // console.log('到达商店，准备交付木头');
          // 延迟一小段时间后完成交付，确保角色站稳
          this.scheduleOnce(() => {
            this.completeDelivery();
          }, 0.5);
        }
        /**
         * 目标到达回调
         */


        onTargetReached() {
          // 如果正在交付，检查是否到达商店
          if (this.isDelivering && this.shopPos) {
            const currentPos = this.node.getWorldPosition();
            const distance = Vec3.distance(currentPos, this.shopPos); // 如果到达商店附近，触发交付

            if (distance < 2.0) {
              // 2米范围内认为到达
              this.onReachShop();
            }
          }
        }
        /**
         * 返回到达树木回调
         */


        onReturnToTrees() {
          //console.log('[Lumberjack] 返回到达树木附近，重新开始砍树');
          // 重新开始自动攻击
          this.enableAutoChopTrees = true;
        }
        /**
         * 初始树木搜索
         */


        searchForInitialTrees() {
          this.hasSearchedForTrees = true;
          const listName = this.targetTreeListType === (_crd && TreeListType === void 0 ? (_reportPossibleCrUseOfTreeListType({
            error: Error()
          }), TreeListType) : TreeListType).LIST_1 ? '第一个列表' : '第二个列表'; //console.log(`[Lumberjack] 开始初始树木搜索，目标: ${listName}`);
          // 如果总体AI开关关闭，不执行初始搜索

          if (!this.enableAI) {
            //console.log('[Lumberjack] AI开关关闭，跳过初始搜索');
            return;
          } // 如果设置了 treePos，先移动到该位置


          if (this.treePos) {
            //console.log(`[Lumberjack] 先移动到指定的砍树位置: (${this.treePos.x.toFixed(2)}, ${this.treePos.y.toFixed(2)}, ${this.treePos.z.toFixed(2)})`);
            this.moveToWorldPosition(this.treePos); // 监听移动完成事件

            this.node.once((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
              error: Error()
            }), ComponentEvent) : ComponentEvent).TARGET_REACHED, this.onReachTreePos, this);
            return;
          } // 如果没有设置 treePos，使用原有逻辑
          //console.log('[Lumberjack] 未设置treePos，直接在当前位置搜索树木');


          this.performInitialTreeSearch();
        }
        /**
         * 到达指定砍树位置后的回调
         */


        onReachTreePos() {
          const listName = this.targetTreeListType === (_crd && TreeListType === void 0 ? (_reportPossibleCrUseOfTreeListType({
            error: Error()
          }), TreeListType) : TreeListType).LIST_1 ? '第一个列表' : '第二个列表'; //console.log(`[Lumberjack] 到达指定砍树位置，开始搜索${listName}的树木`);
          // 到达指定位置后，执行原有的树木搜索逻辑

          this.performInitialTreeSearch();
        }
        /**
         * 执行初始树木搜索的具体逻辑
         */


        performInitialTreeSearch() {
          const heroPosition = this.node.getWorldPosition();
          const attackRange = this.attackComponent.attackRangeValue;
          const listName = this.targetTreeListType === (_crd && TreeListType === void 0 ? (_reportPossibleCrUseOfTreeListType({
            error: Error()
          }), TreeListType) : TreeListType).LIST_1 ? '第一个列表' : '第二个列表'; //console.log(`[Lumberjack] 执行初始树木搜索，目标: ${listName} (如果为空将尝试搜索另一个列表)，攻击范围: ${attackRange}`);
          // 检查当前是否在目标列表树木攻击范围内

          const nearbyTrees = this.getAvailableTrees(heroPosition, attackRange); //console.log(`[Lumberjack] 攻击范围内找到 ${nearbyTrees.length} 棵可用树木`);
          // 如果已经在树木附近，不需要移动，直接开始砍树

          if (nearbyTrees.length > 0) {
            //console.log(`[Lumberjack] 当前位置附近已有可用树木，直接开始砍树`);
            this.enableAutoChopTrees = true;
            return;
          } // 搜索更大范围内的目标列表树木


          const searchRangeTrees = this.getAvailableTrees(heroPosition, this.TREE_SEARCH_RANGE); //console.log(`[Lumberjack] 搜索范围(${this.TREE_SEARCH_RANGE})内找到 ${searchRangeTrees.length} 棵可用树木`);

          if (searchRangeTrees.length > 0) {
            // 找到最近的树木并移动过去
            let nearestTree = searchRangeTrees[0];
            let nearestDistance = Vec3.distance(heroPosition, nearestTree.getWorldPosition());

            for (let i = 1; i < searchRangeTrees.length; i++) {
              const tree = searchRangeTrees[i];
              const distance = Vec3.distance(heroPosition, tree.getWorldPosition());

              if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestTree = tree;
              }
            } // 使用新的距离计算方法移动到树木附近


            const treePos = nearestTree.getWorldPosition();
            const targetPos = this.calculateTargetPosition(treePos, heroPosition); //console.log(`[Lumberjack] 移动到最近的${listName}树木，距离: ${nearestDistance.toFixed(2)}`);

            this.moveToWorldPosition(targetPos); // 监听移动完成事件

            this.node.once((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
              error: Error()
            }), ComponentEvent) : ComponentEvent).TARGET_REACHED, this.onInitialMoveComplete, this);
          } else {
            //console.warn(`[Lumberjack] ❌ 附近没有找到任何${listName}的树木！`);
            //console.warn(`[Lumberjack] 可能原因：1. TreeManager 中没有配置 ${this.targetTreeListType} 的树 2. 所有树都已死亡`);
            // 即使没有树，也启用自动砍树，等待树木刷新
            this.enableAutoChopTrees = true;
          }
        }
        /**
         * 计算与树木保持合适距离的目标位置
         * @param treePos 树木位置
         * @param heroPos 英雄当前位置
         * @returns 合适的目标位置
         */


        calculateTargetPosition(treePos, heroPos) {
          const attackRange = this.attackComponent.attackRangeValue;
          const desiredDistance = attackRange * this.TREE_DISTANCE_RATIO; // 计算从英雄到树木的方向向量

          const direction = new Vec3();
          Vec3.subtract(direction, treePos, heroPos);
          direction.y = 0; // 保持Y轴不变
          // 如果英雄已经在合适的距离内，返回当前位置

          const currentDistance = direction.length();

          if (currentDistance <= desiredDistance && currentDistance >= attackRange * 0.75) {
            return new Vec3(heroPos.x, heroPos.y, heroPos.z);
          } // 标准化方向向量


          if (currentDistance > 0) {
            direction.normalize();
          } else {
            // 如果英雄和树木在同一位置，使用随机方向
            direction.set(Math.random() - 0.5, 0, Math.random() - 0.5);
            direction.normalize();
          } // 计算目标位置（从树木位置向英雄方向移动desiredDistance距离）


          const targetPos = new Vec3();
          Vec3.subtract(targetPos, treePos, direction.multiplyScalar(desiredDistance));
          targetPos.y = heroPos.y; // 保持Y轴与英雄一致

          return targetPos;
        }
        /**
         * 初始移动完成回调
         */


        onInitialMoveComplete() {
          const listName = this.targetTreeListType === (_crd && TreeListType === void 0 ? (_reportPossibleCrUseOfTreeListType({
            error: Error()
          }), TreeListType) : TreeListType).LIST_1 ? '第一个列表' : '第二个列表'; //console.log(`[Lumberjack] 初始移动完成，开始砍${listName}（或备用列表）的树`);
          // 开始自动攻击

          this.enableAutoChopTrees = true; // 验证周围是否真的有树

          const heroPosition = this.node.getWorldPosition();
          const attackRange = this.attackComponent.attackRangeValue;
          const nearbyTrees = this.getAvailableTrees(heroPosition, attackRange); //console.log(`[Lumberjack] 当前位置攻击范围内有 ${nearbyTrees.length} 棵可用树木`);

          if (nearbyTrees.length === 0) {//console.warn(`[Lumberjack] ⚠️ 移动完成但范围内没有树，可能树已经被砍掉了`);
          }
        }
        /**
         * 移动状态进入回调
         */


        onMoveEnter() {
          this.animationComponent.playMove(1.5);
        }
        /**
         * 移动状态更新回调
         */


        onMoveUpdate(dt) {
          // 子类可重写
          if (!this.animationComponent.isPlayingAnimation() || this.animationComponent.getCurrentAnimationName() != this.animationComponent.MoveAnimName) {
            this.animationComponent.playMove(1.5);
          }
        }
        /**
         * 重置伐木工状态
         */


        reset() {
          super.reset();
          this.autoAttackTimer = 0;
          this.isDelivering = false;
          this.enableAutoChopTrees = true;
          this.hasSearchedForTrees = false; // 注意：不重置enableAI，保持用户设置
          // 注意：不重置shopPos和treePos，这些是初始化时设置的固定位置
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pickupComponent", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "enableAI", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "enableAutoChopTrees", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "autoAttackInterval", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.1;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "pickaxe", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "lumberjackType", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).Lumberjack;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6caec9b5def37cd1ef33e7544c84e0782b29b8a9.js.map