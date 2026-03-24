System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Node, Vec3, Tree, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, TreeListType, TreeManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfTree(extras) {
    _reporterNs.report("Tree", "../Role/Tree", _context.meta, extras);
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
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      Tree = _unresolved_2.Tree;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e290fl5T0hIu5FEx3OmQCHB", "TreeManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Node', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 树木列表类型枚举
       */

      _export("TreeListType", TreeListType = /*#__PURE__*/function (TreeListType) {
        TreeListType[TreeListType["LIST_1"] = 0] = "LIST_1";
        TreeListType[TreeListType["LIST_2"] = 1] = "LIST_2";
        return TreeListType;
      }({}));
      /**
       * 树管理器 - 管理场景中的所有树木
       */


      _export("TreeManager", TreeManager = (_dec = ccclass('TreeManager'), _dec2 = property({
        type: Node,
        displayName: '树木父节点1'
      }), _dec3 = property({
        type: Node,
        displayName: '树木父节点2'
      }), _dec(_class = (_class2 = class TreeManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "treeParent1", _descriptor, this);

          _initializerDefineProperty(this, "treeParent2", _descriptor2, this);

          /** 第一个树木列表 */
          this.treeList1 = [];

          /** 第二个树木列表 */
          this.treeList2 = [];
        }

        /** 单例实例 */

        /** 获取单例实例 */
        static get instance() {
          if (!this._instance) {
            var _director$getScene;

            //console.log('TreeManager 实例不存在 动态创建');
            // 动态创建节点并添加组件
            var node = new Node('TreeManager');
            this._instance = node.addComponent(TreeManager); // 添加到场景

            (_director$getScene = director.getScene()) == null || _director$getScene.addChild(node);
          }

          return this._instance;
        }

        onLoad() {
          // 单例检查
          if (TreeManager._instance) {
            this.node.destroy();
            return;
          }

          TreeManager._instance = this; // 设置常驻节点，切换场景不销毁

          director.addPersistRootNode(this.node); // 初始化时查找场景中已有的树木

          this.findExistingTrees();
        }

        onDestroy() {
          if (TreeManager._instance === this) {
            TreeManager._instance = null;
          }
        }
        /**
         * 查找场景中已有的树木
         */


        findExistingTrees() {
          // 扫描第一个父节点
          if (this.treeParent1) {
            this.findTreesInNode(this.treeParent1, TreeListType.LIST_1);
          } // 扫描第二个父节点


          if (this.treeParent2) {
            this.findTreesInNode(this.treeParent2, TreeListType.LIST_2);
          }
        }
        /**
         * 递归查找节点中的树木
         * @param node 要查找的节点
         * @param listType 要添加到的列表类型
         */


        findTreesInNode(node, listType) {
          // 检查当前节点是否有Tree组件
          var treeComponent = node.getComponent(_crd && Tree === void 0 ? (_reportPossibleCrUseOfTree({
            error: Error()
          }), Tree) : Tree);

          if (treeComponent && !this.getTreeList(listType).includes(treeComponent)) {
            this.addTree(treeComponent, listType);
          } // 递归查找子节点


          for (var child of node.children) {
            this.findTreesInNode(child, listType);
          }
        }
        /**
         * 获取指定类型的树木列表
         * @param listType 列表类型
         * @returns 对应的树木列表
         */


        getTreeList(listType) {
          return listType === TreeListType.LIST_1 ? this.treeList1 : this.treeList2;
        }
        /**
         * 添加树到管理器中
         * @param tree 树组件
         * @param listType 要添加到的列表类型，默认为LIST_1
         */


        addTree(tree, listType) {
          if (listType === void 0) {
            listType = TreeListType.LIST_1;
          }

          // 全局去重检查：确保树木不会同时存在于两个列表中
          if (this.treeList1.includes(tree) || this.treeList2.includes(tree)) {
            // console.warn(`TreeManager: 树木 ${tree.node.name} 已存在于管理器中，跳过添加`);
            return;
          }

          var targetList = this.getTreeList(listType);
          targetList.push(tree);
          var listName = listType === TreeListType.LIST_1 ? '列表1' : '列表2'; //console.log(`TreeManager: 添加树木 ${tree.node.name} 到${listName}, 该列表总数: ${targetList.length}`);
        }
        /**
         * 获取指定范围内的树木
         * @param centerPos 中心位置
         * @param range 范围半径
         * @param listType 要查询的列表类型，默认为LIST_1
         * @returns 范围内的树木数组
         */


        getRangeTrees(centerPos, range, listType) {
          if (listType === void 0) {
            listType = TreeListType.LIST_1;
          }

          var treesInRange = [];
          var rangeSquared = range * range;
          var targetList = this.getTreeList(listType);

          for (var tree of targetList) {
            if (!tree || !tree.node || !tree.node.isValid || tree.isDead) {
              continue;
            }

            var treePos = tree.getWorldPosition();
            var distanceSquared = Vec3.squaredDistance(centerPos, treePos);

            if (distanceSquared <= rangeSquared) {
              treesInRange.push(tree);
            }
          }

          return treesInRange;
        }
        /**
         * 获取指定范围内的树木（带距离信息）
         * @param centerPos 中心位置
         * @param range 范围半径
         * @param listType 要查询的列表类型，默认为LIST_1
         * @returns 带距离信息的树木数据数组
         */


        getRangeTreesWithDistance(centerPos, range, listType) {
          if (listType === void 0) {
            listType = TreeListType.LIST_1;
          }

          var treesWithDistance = [];
          var rangeSquared = range * range;
          var targetList = this.getTreeList(listType);

          for (var tree of targetList) {
            if (!tree || !tree.node || !tree.node.isValid || tree.isDead) {
              continue;
            }

            var treePos = tree.getWorldPosition();
            var distanceSquared = Vec3.squaredDistance(centerPos, treePos);

            if (distanceSquared <= rangeSquared) {
              treesWithDistance.push({
                tree: tree,
                distanceSquared: distanceSquared
              });
            }
          } // 按距离排序，最近的在前面


          treesWithDistance.sort((a, b) => a.distanceSquared - b.distanceSquared);
          return treesWithDistance;
        }
        /**
         * 获取最近的树木
         * @param centerPos 中心位置
         * @param maxRange 最大搜索范围（可选）
         * @param listType 要查询的列表类型，默认为LIST_1
         * @returns 最近的树木，没找到返回null
         */


        getNearestTree(centerPos, maxRange, listType) {
          if (listType === void 0) {
            listType = TreeListType.LIST_1;
          }

          var nearestTree = null;
          var nearestDistanceSquared = maxRange ? maxRange * maxRange : Infinity;
          var targetList = this.getTreeList(listType);

          for (var tree of targetList) {
            if (!tree || !tree.node || !tree.node.isValid || tree.isDead) {
              continue;
            }

            var treePos = tree.getWorldPosition();
            var distanceSquared = Vec3.squaredDistance(centerPos, treePos);

            if (distanceSquared < nearestDistanceSquared) {
              nearestDistanceSquared = distanceSquared;
              nearestTree = tree;
            }
          }

          return nearestTree;
        }
        /**
         * 获取所有活跃的树木
         * @param listType 要查询的列表类型，不传则返回两个列表的合并结果
         * @returns 活跃树木数组
         */


        getAllActiveTrees(listType) {
          if (listType !== undefined) {
            var targetList = this.getTreeList(listType);
            return targetList.filter(tree => tree && tree.node && tree.node.isValid && !tree.isDead);
          } // 返回两个列表的合并结果，并确保唯一性


          var allTrees = [...this.treeList1, ...this.treeList2];
          var uniqueTrees = Array.from(new Set(allTrees));
          return uniqueTrees.filter(tree => tree && tree.node && tree.node.isValid && !tree.isDead);
        }
        /**
         * 获取树木总数
         * @param listType 要查询的列表类型，不传则返回两个列表的总和
         * @returns 树木总数
         */


        getTreeCount(listType) {
          if (listType !== undefined) {
            return this.getTreeList(listType).length;
          }

          return this.treeList1.length + this.treeList2.length;
        }
        /**
         * 获取活跃树木数量
         * @param listType 要查询的列表类型，不传则返回两个列表的总和
         * @returns 活跃树木数量
         */


        getActiveTreeCount(listType) {
          return this.getAllActiveTrees(listType).length;
        }
        /**
         * 清理无效的树木引用
         * @param listType 要清理的列表类型，不传则清理两个列表
         */


        cleanupInvalidTrees(listType) {
          if (listType !== undefined) {
            var targetList = this.getTreeList(listType);

            if (listType === TreeListType.LIST_1) {
              this.treeList1 = targetList.filter(tree => tree && tree.node && tree.node.isValid);
            } else {
              this.treeList2 = targetList.filter(tree => tree && tree.node && tree.node.isValid);
            }
          } else {
            // 清理两个列表
            this.treeList1 = this.treeList1.filter(tree => tree && tree.node && tree.node.isValid);
            this.treeList2 = this.treeList2.filter(tree => tree && tree.node && tree.node.isValid);
          }
        }
        /**
         * 重置所有树木
         * @param listType 要重置的列表类型，不传则重置两个列表
         */


        resetAllTrees(listType) {
          if (listType !== undefined) {
            var targetList = this.getTreeList(listType);

            for (var tree of targetList) {
              if (tree && tree.node && tree.node.isValid) {
                tree.reset();
              }
            }
          } else {
            // 重置两个列表
            for (var _tree of this.treeList1) {
              if (_tree && _tree.node && _tree.node.isValid) {
                _tree.reset();
              }
            }

            for (var _tree2 of this.treeList2) {
              if (_tree2 && _tree2.node && _tree2.node.isValid) {
                _tree2.reset();
              }
            }
          }
        }
        /**
         * 清除所有树木
         * @param listType 要清除的列表类型，不传则清除两个列表
         */


        clearAllTrees(listType) {
          if (listType !== undefined) {
            var targetList = this.getTreeList(listType);

            for (var tree of targetList) {
              if (tree && tree.node && tree.node.isValid) {
                tree.node.destroy();
              }
            }

            if (listType === TreeListType.LIST_1) {
              this.treeList1 = [];
            } else {
              this.treeList2 = [];
            }
          } else {
            // 清除两个列表
            for (var _tree3 of this.treeList1) {
              if (_tree3 && _tree3.node && _tree3.node.isValid) {
                _tree3.node.destroy();
              }
            }

            for (var _tree4 of this.treeList2) {
              if (_tree4 && _tree4.node && _tree4.node.isValid) {
                _tree4.node.destroy();
              }
            }

            this.treeList1 = [];
            this.treeList2 = [];
          }
        }
        /**
         * 刷新树木列表（重新扫描场景）
         * @param listType 要刷新的列表类型，不传则刷新两个列表
         */


        refreshTreeList(listType) {
          // 清理无效引用
          this.cleanupInvalidTrees(listType); // 重新扫描场景

          if (listType !== undefined) {
            if (listType === TreeListType.LIST_1 && this.treeParent1) {
              this.findTreesInNode(this.treeParent1, TreeListType.LIST_1);
            } else if (listType === TreeListType.LIST_2 && this.treeParent2) {
              this.findTreesInNode(this.treeParent2, TreeListType.LIST_2);
            }
          } else {
            this.findExistingTrees();
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "treeParent1", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "treeParent2", [_dec3], {
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
//# sourceMappingURL=1ecf33dc2d4cb19df660ebc5bed4b352082f43d6.js.map