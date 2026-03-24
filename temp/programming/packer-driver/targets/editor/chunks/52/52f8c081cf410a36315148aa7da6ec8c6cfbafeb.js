System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, CCFloat, CCInteger, Component, Vec3, ComponentEvent, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, ItemLayout;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../../Main/Common/ComponentEvents", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      CCFloat = _cc.CCFloat;
      CCInteger = _cc.CCInteger;
      Component = _cc.Component;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      ComponentEvent = _unresolved_2.ComponentEvent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f89feCU8txOCITh5FeLHOlg", "ItemLayout", undefined);

      __checkObsolete__(['_decorator', 'CCFloat', 'CCInteger', 'Component', 'Node', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ItemLayout", ItemLayout = (_dec = ccclass('ItemLayout'), _dec2 = property({
        type: CCInteger,
        tooltip: '布局的列数'
      }), _dec3 = property({
        type: CCInteger,
        tooltip: '布局的行数'
      }), _dec4 = property({
        type: CCFloat,
        tooltip: '子物体的Y间距'
      }), _dec5 = property({
        type: CCFloat,
        tooltip: '子物体的X间距'
      }), _dec6 = property({
        type: CCFloat,
        tooltip: '子物体的Z间距'
      }), _dec7 = property({
        type: CCInteger,
        tooltip: '最大层数限制，超出此层数的物品将被销毁'
      }), _dec(_class = (_class2 = class ItemLayout extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "columns", _descriptor, this);

          _initializerDefineProperty(this, "rows", _descriptor2, this);

          _initializerDefineProperty(this, "spacingY", _descriptor3, this);

          _initializerDefineProperty(this, "spacingX", _descriptor4, this);

          _initializerDefineProperty(this, "spacingZ", _descriptor5, this);

          _initializerDefineProperty(this, "maxLayerLimit", _descriptor6, this);

          // 存储所有子物体  key: 位置 row_column_layer  value: 子物体数据
          this.items = new Map();
          this.maxLayer = 1;
        }

        // 修改初始值为1，确保至少有一层
        onLoad() {
          this.node.removeAllChildren();
          this.items.clear();
          this.maxLayer = 1; // 修改初始值为1
        }

        getKey(lpos) {
          return `${lpos.row}_${lpos.column}_${lpos.layer}`;
        }

        deserializationKey(key) {
          const arr = key.split('_');
          return {
            lpos: {
              row: parseInt(arr[0]),
              column: parseInt(arr[1]),
              layer: parseInt(arr[2])
            }
          };
        }
        /**
         * 检查位置是否在有效范围内
         */


        isValidPosition(lpos) {
          return lpos.row >= 0 && lpos.row < this.rows && lpos.column >= 0 && lpos.column < this.columns && lpos.layer >= 0;
        }
        /**
         * 添加物品到布局中
         */


        addItem(node, lpos) {
          if (!node) {
            //console.warn('添加的节点不能为空');
            return null;
          }

          let position;

          if (lpos) {
            // 使用指定位置
            if (!this.isValidPosition(lpos)) {
              //console.warn(`指定位置超出布局范围: row=${lpos.row}, column=${lpos.column}, layer=${lpos.layer}`);
              return null;
            }

            const key = this.getKey(lpos);
            const existingItem = this.items.get(key);

            if (existingItem && existingItem.isFull) {
              //console.warn(`位置 ${key} 已被占用`);
              return null;
            }

            position = lpos;
          } else {
            // 自动寻找空位置
            position = this.getCurrEmptyPosition();

            if (!position) {
              //console.warn('没有可用的空位置');
              return null;
            }
          } // 添加节点到布局


          const key = this.getKey(position);
          const worldPos = this.getItemPosition(position);
          node.setParent(this.node, true);
          node.setWorldPosition(worldPos);
          node.setRotationFromEuler(0, 0, 0);
          this.items.set(key, {
            node: node,
            isFull: true,
            isAdded: true
          });
          this.maxLayer = Math.max(this.maxLayer, position.layer + 1); // 触发物品数量变化事件

          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).ITEM_COUNT_CHANGED, this.getItemCount());
          return position;
        }
        /**
         * 占位
         */


        reserveItem(lpos) {
          if (!this.isValidPosition(lpos)) {
            //console.warn(`占位位置超出布局范围: row=${lpos.row}, column=${lpos.column}, layer=${lpos.layer}`);
            return false;
          }

          const key = this.getKey(lpos);
          let data = this.items.get(key);

          if (data) {
            if (data.isFull == false) {
              data.isFull = true;
              data.isAdded = false;
              return true;
            } else {
              //console.warn(`${key} 已经占位`);
              return false;
            }
          } else {
            this.items.set(key, {
              node: null,
              isAdded: false,
              isFull: true
            });
            this.maxLayer = Math.max(this.maxLayer, lpos.layer + 1);
            return true;
          }
        }
        /**
         * add已经占的位置  
         */


        addItemToReserve(node, lpos) {
          if (!node) {
            //console.warn('添加的节点不能为空');
            return false;
          }

          const key = this.getKey(lpos);
          let data = this.items.get(key);

          if (data) {
            if (data.isFull == true && data.isAdded == false) {
              // data.node = node; // 设置节点
              // data.isAdded = true;
              // // 设置节点位置
              // const worldPos = this._caculateItemPosition(lpos);
              // node.setParent(this.node);
              // node.setPosition(worldPos);
              this.items.delete(key);
              const result = this.addItem(node); // addItem 方法内部已经会触发事件，所以这里不需要重复触发

              return result !== null;
            } else {
              //console.warn(`${key} 存在数据但是未提前占位或者已经添加`);
              return false;
            }
          } else {
            //console.warn(`${key} 不存在 未提前占位`);
            return false;
          }
        }

        removeItem(lpos) {
          const key = this.getKey(lpos); // const item = this.items.get(key);
          // if (item && item.node) {
          //     item.node.removeFromParent();
          // }

          const result = this.items.delete(key);

          if (result) {
            // 触发物品数量变化事件
            this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
              error: Error()
            }), ComponentEvent) : ComponentEvent).ITEM_COUNT_CHANGED, this.getItemCount());
          }

          return result;
        }

        removeItemByNode(node) {
          for (const [key, item] of this.items) {
            if (item.node === node) {
              return this.removeItem(this.deserializationKey(key).lpos);
            }
          }

          return false;
        }

        getItem(lpos) {
          const key = this.getKey(lpos);
          return this.items.get(key);
        }

        getCurrEmptyPosition() {
          // 优先查找现有层中的空位置（包括已删除的物品位置）
          for (let layer = 0; layer < this.maxLayer; layer++) {
            for (let row = 0; row < this.rows; row++) {
              for (let column = 0; column < this.columns; column++) {
                const key = this.getKey({
                  row,
                  column,
                  layer
                });
                const item = this.items.get(key);

                if (!item || !item.isFull) {
                  return {
                    row,
                    column,
                    layer
                  };
                }
              }
            }
          } // 如果所有现有层都满了，检查是否还能新增层


          if (this.maxLayer < this.maxLayerLimit) {
            // 还可以新增层数，创建新层
            for (let row = 0; row < this.rows; row++) {
              for (let column = 0; column < this.columns; column++) {
                return {
                  row,
                  column,
                  layer: this.maxLayer
                };
              }
            }
          } // 层数超限且所有位置都满了，返回null


          return null;
        }
        /**
         * 检查是否层数超限且所有位置都满了
         */


        isLayerLimitExceeded() {
          // 检查是否达到最大层数限制且所有位置都满了
          if (this.maxLayer < this.maxLayerLimit) {
            return false; // 还可以新增层数，不算超限
          } // 达到层数限制，检查是否还有空位置


          for (let layer = 0; layer < this.maxLayer; layer++) {
            for (let row = 0; row < this.rows; row++) {
              for (let column = 0; column < this.columns; column++) {
                const key = this.getKey({
                  row,
                  column,
                  layer
                });
                const item = this.items.get(key);

                if (!item || !item.isFull) {
                  return false; // 还有空位置，不算超限
                }
              }
            }
          }

          return true; // 层数达到限制且所有位置都满了
        }
        /**
         * 获取最后一个有效位置（最大层的最后一个位置）
         * 用于物品飞行动画的目标位置，即使容器满了也要飞到这里
         */


        getLastValidPosition() {
          return {
            row: this.rows - 1,
            column: this.columns - 1,
            layer: Math.min(this.maxLayer - 1, this.maxLayerLimit - 1)
          };
        }
        /**
         * 获取最外层物品
         */


        getOuterItems(num) {
          const result = [];

          if (num <= 0) {
            return result;
          }

          for (let layer = this.maxLayer - 1; layer >= 0; layer--) {
            for (let row = this.rows - 1; row >= 0; row--) {
              for (let column = this.columns - 1; column >= 0; column--) {
                const key = this.getKey({
                  row,
                  column,
                  layer
                });
                const item = this.items.get(key);

                if (item && item.isFull && item.isAdded && item.node) {
                  result.push(item.node);

                  if (result.length >= num) {
                    return result;
                  }
                }
              }
            }
          }

          return result;
        }

        getItemCount() {
          let count = 0;

          for (const [key, item] of this.items) {
            if (item.isFull && item.isAdded) {
              count++;
            }
          }

          return count;
        }
        /**
         * 获取当前布局中所有已添加的物品节点（不清除，仅读取）
         * 用于卸货飞行动画：先取出所有节点，再调用 clearAllItems 重置布局
         */


        getAllItemNodes() {
          const result = [];

          for (const [, item] of this.items) {
            if (item.node && item.isAdded) {
              result.push(item.node);
            }
          }

          return result;
        }
        /**
         * 清空所有物品（同时调用 removeFromParent 解除节点挂载）
         */


        clearAllItems() {
          const hadItems = this.getItemCount() > 0;

          for (const [key, item] of this.items) {
            if (item.node) {
              item.node.removeFromParent();
            }
          }

          this.items.clear();
          this.maxLayer = 1; // 如果之前有物品，触发物品数量变化事件

          if (hadItems) {
            this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
              error: Error()
            }), ComponentEvent) : ComponentEvent).ITEM_COUNT_CHANGED, 0);
          }
        }
        /**
         * 卸货专用：清空布局记录但【不】调用 removeFromParent。
         * 调用方负责在此之前把节点挂到新的父节点（如 EffectManager.node），
         * 避免节点在无父节点状态下被 active=true，从而被 Cocos 帧末自动销毁。
         */


        detachAllItems() {
          const hadItems = this.getItemCount() > 0;
          this.items.clear();
          this.maxLayer = 1;

          if (hadItems) {
            this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
              error: Error()
            }), ComponentEvent) : ComponentEvent).ITEM_COUNT_CHANGED, 0);
          }
        }

        _caculateItemPosition(position) {
          return new Vec3(position.column * this.spacingX, position.layer * this.spacingY, position.row * this.spacingZ);
        }

        getItemPosition(position) {
          // 获取局部坐标偏移
          const localOffset = this._caculateItemPosition(position); // 创建临时结果向量


          const result = new Vec3(); // 使用节点的世界矩阵将局部坐标转换为世界坐标
          // 这会正确处理所有父节点的旋转、缩放和位移

          Vec3.transformMat4(result, localOffset, this.node.getWorldMatrix());
          return result;
        }

        reset() {
          this.items.clear();
          this.maxLayer = 1;
          this.node.removeAllChildren();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "columns", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 5;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rows", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 3;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spacingY", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "spacingX", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "spacingZ", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "maxLayerLimit", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=52f8c081cf410a36315148aa7da6ec8c6cfbafeb.js.map