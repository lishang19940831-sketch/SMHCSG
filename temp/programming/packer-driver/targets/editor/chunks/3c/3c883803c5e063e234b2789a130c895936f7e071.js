System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, easing, Node, Tween, tween, v3, Vec3, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, Elevator;

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
      easing = _cc.easing;
      Node = _cc.Node;
      Tween = _cc.Tween;
      tween = _cc.tween;
      v3 = _cc.v3;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c25d9uDPDlKbZJ54a8zeqos", "Elevator", undefined);

      __checkObsolete__(['_decorator', 'Component', 'easing', 'Node', 'Tween', 'tween', 'v3', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Elevator", Elevator = (_dec = ccclass('Elevator'), _dec2 = property({
        type: Node,
        displayName: '升降梯左站立板'
      }), _dec3 = property({
        type: Node,
        displayName: '升降梯右站立板'
      }), _dec4 = property({
        type: Number,
        displayName: '电梯移动时间'
      }), _dec5 = property({
        type: Number,
        displayName: '电梯返回时间'
      }), _dec(_class = (_class2 = class Elevator extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "standBoardLeft", _descriptor, this);

          _initializerDefineProperty(this, "standBoardRight", _descriptor2, this);

          _initializerDefineProperty(this, "moveTime", _descriptor3, this);

          _initializerDefineProperty(this, "moveTimeBack", _descriptor4, this);

          this.bottomHeight = 0.06;
          this.topHeight = 1.29;
          this.shopNode = null;

          /** 电梯状态枚举 */
          this.elevatorState = 'idle';

          /** 当前载客节点 */
          this.currentUpNode = null;
          this.currentDownNode = null;
        }

        onLoad() {
          this.init();
        }
        /**
         * 初始化电梯站立板位置
         */


        init() {
          // 保持原有的x和z坐标，只修改y坐标
          const rightPos = this.standBoardRight.getPosition();
          const leftPos = this.standBoardLeft.getPosition();
          this.standBoardRight.setPosition(rightPos.x, this.bottomHeight, rightPos.z);
          this.standBoardLeft.setPosition(leftPos.x, this.topHeight, leftPos.z);
        }

        setShopNode(node) {
          this.shopNode = node;
        }

        ShowUnlock() {
          this.node.active = true;
          this.node.setScale(0, 0, 0);
          tween(this.node).to(0.5, {
            scale: v3(1, 1, 1)
          }, {
            easing: easing.backOut
          }).start();
        }

        reset() {
          this.node.active = false;
          this.node.setScale(0, 0, 0);
        }
        /**
         * 电梯运输
         */


        move(params) {
          if (this.elevatorState !== 'idle') {
            //console.warn('电梯正在运行中，无法启动新的运输');
            return;
          }

          this.elevatorState = 'moving'; // 停止所有现有动画

          Tween.stopAllByTarget(this.standBoardRight);
          Tween.stopAllByTarget(this.standBoardLeft); // 重置电梯位置，保持原有的x和z坐标

          const rightPos = this.standBoardRight.getPosition();
          const leftPos = this.standBoardLeft.getPosition();
          this.standBoardRight.setPosition(rightPos.x, this.bottomHeight, rightPos.z);
          this.standBoardLeft.setPosition(leftPos.x, this.topHeight, leftPos.z); // 保存当前载客节点

          this.currentUpNode = params.upNode || null;
          this.currentDownNode = params.downNode || null; // 将顾客节点设置为电梯子节点

          if (this.currentUpNode) {
            this.currentUpNode.setParent(this.standBoardRight, true);
            this.currentUpNode.setPosition(0, 0, 0); // 相对于电梯板的位置
          }

          if (this.currentDownNode) {
            this.currentDownNode.setParent(this.standBoardLeft, true);
            this.currentDownNode.setPosition(0, 0, 0); // 相对于电梯板的位置
          } // 用于跟踪两个电梯板是否都完成了运输


          let completedCount = 0;
          const totalTasks = (this.currentUpNode ? 1 : 0) + (this.currentDownNode ? 1 : 0);

          const onElevatorComplete = () => {
            completedCount++;

            if (completedCount >= totalTasks) {
              // 所有电梯板都完成运输，调用回调
              params.callback == null || params.callback();
            }
          }; // 右电梯板上升（载客上行）


          if (this.currentUpNode) {
            const rightCurrentPos = this.standBoardRight.getPosition();
            tween(this.standBoardRight).to(this.moveTime, {
              position: new Vec3(rightCurrentPos.x, this.topHeight, rightCurrentPos.z)
            }).call(() => {
              // 释放上行顾客
              if (this.currentUpNode) {
                this.currentUpNode.setParent(this.shopNode, true); // 设置回原来的父节点

                this.currentUpNode.setScale(1, 1, 1);
              }

              onElevatorComplete();
            }).start();
          } // 左电梯板下降（载客下行）


          if (this.currentDownNode) {
            const leftCurrentPos = this.standBoardLeft.getPosition();
            tween(this.standBoardLeft).to(this.moveTime, {
              position: new Vec3(leftCurrentPos.x, this.bottomHeight, leftCurrentPos.z)
            }).call(() => {
              // 释放下行顾客
              if (this.currentDownNode) {
                this.currentDownNode.setParent(this.shopNode, true); // 设置回原来的父节点

                this.currentDownNode.setScale(1, 1, 1);
              }

              onElevatorComplete();
            }).start();
          } // 如果没有顾客需要运输，直接调用回调


          if (totalTasks === 0) {
            params.callback == null || params.callback();
          }
        }
        /**
         * 电梯返回等待位置
         */


        back() {
          if (this.elevatorState === 'returning') {
            return; // 已经在返回中
          }

          this.elevatorState = 'returning'; // 停止所有现有动画

          Tween.stopAllByTarget(this.standBoardRight);
          Tween.stopAllByTarget(this.standBoardLeft); // 设置当前位置（运输完成后的位置），保持原有的x和z坐标

          const rightPos = this.standBoardRight.getPosition();
          const leftPos = this.standBoardLeft.getPosition();
          this.standBoardRight.setPosition(rightPos.x, this.topHeight, rightPos.z);
          this.standBoardLeft.setPosition(leftPos.x, this.bottomHeight, leftPos.z); // 清理载客节点引用

          this.currentUpNode = null;
          this.currentDownNode = null; // 右电梯板下降到底部

          const rightCurrentPos = this.standBoardRight.getPosition();
          tween(this.standBoardRight).to(this.moveTimeBack, {
            position: new Vec3(rightCurrentPos.x, this.bottomHeight, rightCurrentPos.z)
          }).call(() => {// 右电梯板返回完成
          }).start(); // 左电梯板上升到顶部

          const leftCurrentPos = this.standBoardLeft.getPosition();
          tween(this.standBoardLeft).to(this.moveTimeBack, {
            position: new Vec3(leftCurrentPos.x, this.topHeight, leftCurrentPos.z)
          }).call(() => {
            // 左电梯板返回完成，电梯回到空闲状态
            this.elevatorState = 'idle';
          }).start();
        }
        /**
         * 获取电梯状态
         */


        getState() {
          return this.elevatorState;
        }
        /**
         * 检查电梯是否空闲
         */


        isIdle() {
          return this.elevatorState === 'idle';
        }
        /**
         * 获取电梯移动时间
         */


        getMoveTime() {
          return this.moveTime;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "standBoardLeft", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "standBoardRight", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "moveTime", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.3;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "moveTimeBack", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.1;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3c883803c5e063e234b2789a130c895936f7e071.js.map