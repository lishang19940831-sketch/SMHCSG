System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, tween, v3, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, ItemContainer;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Vec3 = _cc.Vec3;
      tween = _cc.tween;
      v3 = _cc.v3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c36eeiYCUZHcoX6LfK+hPnS", "ItemContainer", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'tween', 'v3', 'EventTarget']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ItemContainer", ItemContainer = (_dec = ccclass('ItemContainer'), _dec2 = property({
        tooltip: '容器的行数',
        displayName: '行数'
      }), _dec3 = property({
        tooltip: '容器的列数',
        displayName: '列数'
      }), _dec4 = property({
        tooltip: '物品之间的间距（像素）',
        displayName: '间距'
      }), _dec5 = property({
        tooltip: '不同层级之间的高度差（像素）',
        displayName: '层级高度'
      }), _dec6 = property({
        tooltip: '最大层数，超过后新层将与最高层保持相同高度',
        displayName: '最大层数'
      }), _dec7 = property({
        tooltip: '45度视角下的X轴缩放比例 cos(45°) ≈ 0.866',
        displayName: 'X轴缩放'
      }), _dec(_class = (_class2 = class ItemContainer extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "rows", _descriptor, this);

          _initializerDefineProperty(this, "columns", _descriptor2, this);

          _initializerDefineProperty(this, "spacing", _descriptor3, this);

          _initializerDefineProperty(this, "layerHeight", _descriptor4, this);

          _initializerDefineProperty(this, "maxLayers", _descriptor5, this);

          _initializerDefineProperty(this, "scaleX", _descriptor6, this);

          // cos(45°) ≈ 0.866
          this.items = [];
          this.currentLayer = 0;
          this._cachedEmptyPosition = new Vec3();
          // 预创建可重用的Vec3对象
          this._reusableVec3 = new Vec3();
          // 预创建缩放值
          this._scaleUp = v3(1.2, 1.2, 1.2);
          this._scaleNormal = v3(1, 1, 1);
          // 缓存物品到层和索引的映射，用于快速查找
          this._itemToLayerMap = new Map();
          // 容器状态是否已更改的标志
          this._containerStateChanged = true;
          // 缓存返回对象，避免重复创建
          this._cachedEmptyPositionResult = {
            items: [],
            targetPos: this._cachedEmptyPosition
          };
        }

        get itemNum() {
          var count = 0;

          for (var i = 0; i < this.items.length; i++) {
            if (this.items[i]) {
              count += this.items[i].length;
            }
          }

          return count;
        }

        get currEmptyPosition() {
          this.updateCachedEmptyPosition();
          return this._cachedEmptyPosition;
        }

        updateCachedEmptyPosition() {
          // 确保当前层的数组已初始化
          if (!this.items[this.currentLayer]) {
            this.items[this.currentLayer] = [];
          } // 获取当前层的物品数组


          var items = this.items[this.currentLayer]; // 计算物品在当前层的位置

          var index = items.length;
          var row = Math.floor(index / this.columns);
          var col = index % this.columns; // 计算45度视角下的目标位置

          var baseX = (col - row) * this.spacing * this.scaleX;
          var baseY = (col + row) * this.spacing * 0.5; // 如果当前层超过最大层数，则使用最大层数的高度

          var layerOffset = Math.min(this.currentLayer, this.maxLayers - 1) * this.layerHeight;

          this._cachedEmptyPosition.set(baseX, baseY + layerOffset, 0);
        }
        /**
         * 更新容器状态，确保层级管理的一致性
         * 在添加或删除物品后调用此方法
         */


        updateContainerState() {
          // 如果状态没有变化，直接返回
          if (!this._containerStateChanged) {
            return;
          } // 计算当前应该在哪一层


          var validLayer = 0;

          for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] && this.items[i].length > 0) {
              if (this.items[i].length < this.rows * this.columns) {
                validLayer = i;
                break;
              }

              validLayer = i + 1;
            }
          } // 确保该层存在


          if (!this.items[validLayer]) {
            this.items[validLayer] = [];
          }

          this.currentLayer = validLayer; // 更新空位置缓存

          this.updateCachedEmptyPosition(); // 重置状态变化标志

          this._containerStateChanged = false; // 更新缓存结果中的引用

          this._cachedEmptyPositionResult.items = this.items[this.currentLayer];
        }

        onLoad() {
          // 初始化物品数组
          this.items[0] = []; // 初始化缓存的空位置

          this.updateCachedEmptyPosition();
        }
        /**
         * 添加一个物品到容器中
         * @param item 物品节点
         * @returns 是否添加成功
         */


        addItem(item) {
          // 获取当前空位置
          var targetPos = this.currEmptyPosition; // 确保当前层的数组已初始化

          if (!this.items[this.currentLayer]) {
            this.items[this.currentLayer] = [];
          } // 获取当前层的物品数组


          var items = this.items[this.currentLayer]; // 将物品添加到容器节点下

          item.parent = this.node;
          item.setPosition(targetPos.x, targetPos.y, targetPos.z); // 使用缓存的缩放值

          tween(item).to(0.05, {
            scale: this._scaleUp
          }).to(0.05, {
            scale: this._scaleNormal
          }).start(); // 将物品添加到数组中

          var itemIndex = items.length;
          items.push(item); // 更新映射表

          this._itemToLayerMap.set(item, {
            layer: this.currentLayer,
            index: itemIndex
          }); // 标记容器状态已更改


          this._containerStateChanged = true; // 更新容器状态

          this.updateContainerState();
          return true;
        }
        /**
         * 移除指定的物品
         * @param item 要移除的物品节点
         * @returns 是否成功移除
         */


        removeItem(item) {
          // 使用映射表快速查找物品位置
          var itemInfo = this._itemToLayerMap.get(item);

          if (itemInfo) {
            var {
              layer,
              index
            } = itemInfo;
            var items = this.items[layer]; // 从数组中移除

            items.splice(index, 1); // 从映射表中移除

            this._itemToLayerMap.delete(item); // 更新映射表中后续物品的索引


            for (var i = index; i < items.length; i++) {
              var currentItem = items[i];

              var currentInfo = this._itemToLayerMap.get(currentItem);

              if (currentInfo) {
                currentInfo.index = i;
              }
            } // 重新排列该层后面的物品


            this.rearrangeItems(layer, index); // 标记容器状态已更改

            this._containerStateChanged = true; // 更新容器状态

            this.updateContainerState(); // 发送物品移除事件

            this.node.emit('itemRemoved', this.node.uuid);
            return true;
          }

          return false;
        }
        /**
         * 重新排列指定层中从指定索引开始的物品
         * @param layer 层级
         * @param startIndex 开始索引
         */


        rearrangeItems(layer, startIndex) {
          var items = this.items[layer];
          var layerOffset = Math.min(layer, this.maxLayers - 1) * this.layerHeight;

          for (var i = startIndex; i < items.length; i++) {
            var row = Math.floor(i / this.columns);
            var col = i % this.columns;
            var baseX = (col - row) * this.spacing * this.scaleX;
            var baseY = (col + row) * this.spacing * 0.5; // 复用Vec3对象

            this._reusableVec3.set(baseX, baseY + layerOffset, 0); // 使用缓动动画移动物品


            tween(items[i]).to(0.3, {
              position: this._reusableVec3.clone()
            }).start();
          }
        }
        /**
         * 清空所有物品
         */


        clear() {
          for (var layer of this.items) {
            for (var item of layer) {
              item.destroy();
            }
          }

          this.items = [[]];
          this.currentLayer = 0;

          this._itemToLayerMap.clear(); // 标记容器状态已更改


          this._containerStateChanged = true; // 更新缓存的空位置

          this.updateCachedEmptyPosition();
        }
        /**
         * 获取当前第一个空位的位置和对应的物品数组
         * @returns 包含物品数组和目标位置的对象
         */


        getCurrEmptyPosition() {
          // 仅当容器状态发生变化时更新
          if (this._containerStateChanged) {
            this.updateContainerState();
          }

          return this._cachedEmptyPositionResult;
        }
        /**
         * 获取容器中最外层的物体
         * @returns 最外层的物体节点，如果容器为空则返回null
         */


        getOutermostItem() {
          // 如果容器为空，返回null
          if (this.itemNum === 0) {
            return null;
          } // 从最高层开始查找


          for (var layer = this.currentLayer; layer >= 0; layer--) {
            // 确保该层存在
            if (this.items[layer] && this.items[layer].length > 0) {
              // 返回该层最后一个物体（最外层的物体）
              return this.items[layer][this.items[layer].length - 1];
            }
          }

          return null;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rows", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "columns", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spacing", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "layerHeight", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 20;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "maxLayers", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "scaleX", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.866;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=61a99869d44a83fd32da11681551eb7763d85eb7.js.map