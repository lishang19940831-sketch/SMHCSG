System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, tween, Vec3, ObjectType, DropItemCom, _dec, _class, _crd, ccclass, property, DropManager;

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDropItemCom(extras) {
    _reporterNs.report("DropItemCom", "../Drop/DropItemCom", _context.meta, extras);
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
      director = _cc.director;
      Node = _cc.Node;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      ObjectType = _unresolved_2.ObjectType;
    }, function (_unresolved_3) {
      DropItemCom = _unresolved_3.DropItemCom;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "cdaa8gowepLRYTfFcx4Iya9", "DropManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("DropManager", DropManager = (_dec = ccclass('DropManager'), _dec(_class = class DropManager extends Component {
        constructor() {
          super(...arguments);
          this.itemList = [];

          /** 掉落物品数量上限配置 */
          this.dropLimits = new Map([[(_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemMeat, 80] // 肉类上限30个
          ]);
        }

        /** 单例实例 */

        /** 获取单例实例 */
        static get instance() {
          if (!this._instance) {
            var _director$getScene;

            //console.log('DropManager 实例不存在 动态创建');
            // 动态创建节点并添加组件
            var node = new Node('DropManager');
            this._instance = node.addComponent(DropManager); // 添加到场景

            (_director$getScene = director.getScene()) == null || _director$getScene.addChild(node);
          }

          return this._instance;
        }

        onLoad() {
          // 单例检查
          if (DropManager._instance) {
            this.node.destroy();
            return;
          }

          DropManager._instance = this; // 设置常驻节点，切换场景不销毁

          director.addPersistRootNode(this.node);
        }

        onDestroy() {
          if (DropManager._instance === this) {
            DropManager._instance = null;
          }
        }

        addItem(item) {
          if (!item || !item.isValid) return;
          var dropItemCom = item.getComponent(_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
            error: Error()
          }), DropItemCom) : DropItemCom);

          if (dropItemCom) {
            this.itemList.push(dropItemCom);
          } else {//console.warn('DropManager 添加物品失败，物品没有 DropItemCom 组件');
          }
        }

        removeItem(item) {
          if (!item || !item.isValid) return;
          var dropItemCom = item.getComponent(_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
            error: Error()
          }), DropItemCom) : DropItemCom);

          if (dropItemCom) {
            var index = this.itemList.indexOf(dropItemCom);

            if (index !== -1) {
              this.itemList.splice(index, 1);
            }
          }
        }
        /**
         * 统计指定类型物品的当前掉落数量
         * @param objectType 物品类型
         * @returns 当前掉落数量
         */


        getDropCount(objectType) {
          return this.itemList.filter(item => item.objectType === objectType).length;
        }
        /**
         * 获取指定类型物品的掉落上限
         * @param objectType 物品类型  
         * @returns 掉落上限，如果没有设置则返回-1（无限制）
         */


        getDropLimit(objectType) {
          var _this$dropLimits$get;

          return (_this$dropLimits$get = this.dropLimits.get(objectType)) != null ? _this$dropLimits$get : -1;
        }
        /**
         * 设置指定类型物品的掉落上限
         * @param objectType 物品类型
         * @param limit 掉落上限
         */


        setDropLimit(objectType, limit) {
          this.dropLimits.set(objectType, limit);
        }
        /**
         * 检查指定类型物品是否已达到掉落上限
         * @param objectType 物品类型
         * @returns 是否已达到上限
         */


        isDropLimitReached(objectType) {
          var limit = this.getDropLimit(objectType);
          if (limit < 0) return false; // 无限制

          var currentCount = this.getDropCount(objectType);
          return currentCount >= limit;
        }
        /**
         * 获取所有物品类型的掉落状态信息
         * @returns 掉落状态信息数组
         */


        getDropStatus() {
          var result = []; // 遍历所有已配置的掉落上限

          for (var [objectType, limit] of this.dropLimits) {
            var current = this.getDropCount(objectType);
            result.push({
              objectType,
              current,
              limit,
              limitReached: current >= limit
            });
          }

          return result;
        }
        /**
         * 清理超出上限的旧物品（按创建顺序，先创建的先清理）
         * @param objectType 物品类型
         * @param keepCount 要保留的数量，默认为上限数量
         */


        cleanupExcessItems(objectType, keepCount) {
          var limit = this.getDropLimit(objectType);
          if (limit < 0) return; // 无限制，不需要清理

          var targetKeepCount = keepCount != null ? keepCount : limit;
          var itemsOfType = this.itemList.filter(item => item.objectType === objectType);

          if (itemsOfType.length > targetKeepCount) {
            var excessCount = itemsOfType.length - targetKeepCount; //console.log(`清理多余的 ${objectType} 物品，数量: ${excessCount}`);
            // 清理最早创建的物品（假设itemList中的顺序就是创建顺序）

            for (var i = 0; i < excessCount; i++) {
              var itemToRemove = itemsOfType[i];
              this.removeItem(itemToRemove.node);
              manager.pool.putNode(itemToRemove.node);
            }
          }
        }

        getRangeItems(worldPosition, range) {
          var result = [];
          var rangeSquared = range * range; // 平方范围，避免开平方运算

          for (var item of this.itemList) {
            var itemPos = item.node.getWorldPosition(); // 计算距离的平方

            var distanceSquared = Vec3.squaredDistance(worldPosition, itemPos); // 如果距离平方小于等于范围平方，则在范围内

            if (distanceSquared <= rangeSquared && item.canPickup) {
              result.push(item);
            }
          }

          return result;
        }
        /**
         * 获取范围内的物品，同时返回距离信息（平方距离）
         * @param worldPosition 世界坐标位置
         * @param range 搜索范围
         * @returns 包含物品和平方距离的数组
         */


        getRangeItemsWithDistance(worldPosition, range) {
          var result = [];
          var rangeSquared = range * range;

          for (var item of this.itemList) {
            if (!item.canPickup) continue;
            var itemPos = item.node.getWorldPosition();
            var distanceSquared = Vec3.squaredDistance(worldPosition, itemPos);

            if (distanceSquared <= rangeSquared) {
              result.push({
                item,
                distanceSquared
              });
            }
          }

          return result;
        }
        /**
         * 生成单个掉落物品
         * @param objectType 物品类型
         * @param basePosition 基础位置
         * @param isAddDrop 是否添加到掉落管理器
         * @returns 掉落物品组件，如果达到上限则返回null
         */


        spawnItem(objectType, basePosition, isAddDrop) {
          if (isAddDrop === void 0) {
            isAddDrop = true;
          }

          // 检查是否达到掉落上限
          if (this.isDropLimitReached(objectType)) {
            // console.log(` ${objectType} 已达到掉落上限 ${this.getDropLimit(objectType)}，不再生成新的掉落物品`);
            return null;
          } // 实例化预制体


          var item = manager.pool.getNode(objectType); // 设置物品初始位置（在生成点上方一点）

          var startPosition = new Vec3(basePosition);
          startPosition.y += 0.5; // 从稍微高一点的位置开始

          item.setWorldPosition(startPosition); // 设置随机的y轴旋转

          var randomRotationY = Math.random() * 360;
          item.setRotationFromEuler(0, randomRotationY, 0); // 将物品添加到容器中

          if (manager.effect.node) {
            manager.effect.addToEffectLayer(item);
          } else {
            // 如果没有设置容器，则添加到场景中
            this.node.addChild(item);
          }

          if (isAddDrop) {
            // 添加到管理器中
            manager.drop.addItem(item);
          }

          var dropItemCom = item.getComponent(_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
            error: Error()
          }), DropItemCom) : DropItemCom);

          if (dropItemCom) {
            dropItemCom.canPickup = true;
          }

          return dropItemCom;
        }
        /**
         * 生成单个抛物线掉落物品
         * @param objectType 物品类型
         * @param basePosition 基础位置
         * @param dropRadius 掉落半径
         * @returns 是否成功生成物品
         */


        spawnParabolicItem(objectType, basePosition, dropRadius) {
          if (dropRadius === void 0) {
            dropRadius = 3;
          }

          // 检查是否达到掉落上限
          if (this.isDropLimitReached(objectType)) {
            // console.log(`物品类型 ${objectType} 已达到掉落上限 ${this.getDropLimit(objectType)}，不再生成新的掉落物品`);
            return false;
          }

          var item = manager.pool.getNode(objectType);

          if (!item || !item.isValid) {
            return false;
          }

          var targetPosition = new Vec3();
          var attempts = 0;
          var maxAttempts = 10;

          do {
            attempts++; // 计算随机掉落位置

            var randomOffset = new Vec3((Math.random() - 0.5) * 2 * dropRadius, 0, // 保持在同一高度
            (Math.random() - 0.5) * 2 * dropRadius);
            var targetX = basePosition.x + randomOffset.x;
            var targetZ = basePosition.z + randomOffset.z; // 使用GameManager的地面高度计算方法

            var checkPosition = new Vec3(targetX, basePosition.y, targetZ);
            var targetY = manager.game.calculateGroundHeight(checkPosition) + 0.1 + Math.random() * 0.1;

            if (targetY <= -100) {
              targetY = 0;
            }

            targetPosition.set(targetX, targetY, targetZ); // 特殊处理：掉落肉的时候不能掉在安全区范围内

            if (objectType === (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemMeat) {
              // isPositionSafeFromHome返回true表示不在家（安全区）范围内
              // 如果返回false（在安全区内），则继续循环尝试新的位置
              if (manager.enemy.isPositionSafeFromSafe(targetPosition)) {
                break;
              }
            } else {
              break;
            }
          } while (attempts < maxAttempts); // 设置物品初始位置（在生成点上方一点）


          var startPosition = new Vec3(basePosition);
          startPosition.y += 0.5; // 从稍微高一点的位置开始

          item.setWorldPosition(startPosition); // 设置随机的y轴旋转

          var randomRotationY = Math.random() * 360;
          item.setRotationFromEuler(0, randomRotationY, 0); // 将物品添加到容器中

          if (manager.effect.node) {
            manager.effect.addToEffectLayer(item);
          } else {
            // 如果没有设置容器，则添加到场景中
            this.node.addChild(item);
          } // 添加到管理器中


          manager.drop.addItem(item);
          this.createParabolicMotion(item, basePosition, targetPosition, item => {
            var dropItemCom = item.getComponent(_crd && DropItemCom === void 0 ? (_reportPossibleCrUseOfDropItemCom({
              error: Error()
            }), DropItemCom) : DropItemCom);

            if (dropItemCom) {
              dropItemCom.canPickup = true;
              dropItemCom.showRotate();
            }
          });
          return true;
        }
        /**
         * 创建抛物线动画
         * @param item 掉落物品节点
         * @param startPos 起始位置
         * @param endPos 目标位置
         */


        createParabolicMotion(item, startPos, endPos, callback) {
          // 随机生成最大高度变化量，使不同物品有不同的抛物线高度
          var heightVariation = Math.random() * 0.5 + 0.8; // 0.8-1.3范围内

          var duration = 0.5 * (Math.random() * 0.4 + 0.8); // 随机持续时间变化
          // 记录初始旋转角度

          var startRotationY = item.eulerAngles.y; // 随机生成飞行过程中的旋转速度（每秒转动的角度）

          var rotationSpeed = (Math.random() - 0.5) * 720; // -360到360度/秒的随机旋转速度
          // 使用tween实现抛物线动画

          tween(item).to(duration, {}, {
            onUpdate: (target, ratio) => {
              if (ratio === undefined) {
                return;
              } // 计算当前位置，使用抛物线公式


              var currentPos = new Vec3();
              Vec3.lerp(currentPos, startPos, endPos, ratio); // 线性插值x和z
              // 实现抛物线的y轴变化: y = 4 * h * t * (1 - t)
              // 其中h为最大高度，t为时间比例(0-1)

              var parabolicHeight = 4 * 3 * heightVariation * ratio * (1 - ratio); // 在起点和终点之间进行线性插值，再加上抛物线高度

              var baseY = startPos.y * (1 - ratio) + endPos.y * ratio;
              currentPos.y = baseY + parabolicHeight; // 应用位置

              item.setWorldPosition(currentPos); // 计算并应用旋转动画

              var currentRotationY = startRotationY + rotationSpeed * duration * ratio;
              item.setRotationFromEuler(0, currentRotationY, 0);
            }
          }).call(() => {
            callback(item);
          }).start();
        }

        reset() {
          this.itemList.forEach(item => {
            this.removeItem(item.node);
            manager.pool.putNode(item.node);
          });
          this.itemList = [];
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7b9a0e1d686d62fdee13199193062109dd4a4e9b.js.map