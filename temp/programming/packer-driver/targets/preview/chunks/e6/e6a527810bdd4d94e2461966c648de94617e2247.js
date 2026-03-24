System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, GuideTest;

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
      Node = _cc.Node;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "17753r/gEdNHqVFEEgMCGC3", "GuideTest", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 引导系统测试组件
       * 演示如何使用新的节点引用方式的引导系统
       */

      _export("GuideTest", GuideTest = (_dec = ccclass('GuideTest'), _dec2 = property({
        type: Node,
        displayName: '摇杆节点'
      }), _dec3 = property({
        type: Node,
        displayName: '英雄节点'
      }), _dec4 = property({
        type: Node,
        displayName: '建造按钮节点'
      }), _dec5 = property({
        type: Node,
        displayName: '资源节点'
      }), _dec(_class = (_class2 = class GuideTest extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "joystickNode", _descriptor, this);

          _initializerDefineProperty(this, "heroNode", _descriptor2, this);

          _initializerDefineProperty(this, "buildButtonNode", _descriptor3, this);

          _initializerDefineProperty(this, "resourceNode", _descriptor4, this);
        }

        onLoad() {
          // 初始化引导节点缓存
          this.setupGuideNodes();
        }

        start() {
          // 延迟演示引导功能
          this.scheduleOnce(() => {
            this.demonstrateGuideFeatures();
          }, 1);
        }
        /**
         * 设置引导节点缓存
         */


        setupGuideNodes() {
          // 方式1：批量设置节点
          manager.guide.setupGameNodes({
            joystick: this.joystickNode,
            hero: this.heroNode,
            buildButton: this.buildButtonNode
          }); // 方式2：单独缓存节点

          manager.guide.cacheNode('resource', this.resourceNode); //console.log('引导节点缓存设置完成');
        }
        /**
         * 演示引导功能
         */


        demonstrateGuideFeatures() {
          //console.log('开始演示引导功能');
          // 演示1：完整引导（箭头+提示）
          this.scheduleOnce(() => {
            this.showMoveGuide();
          }, 0.5); // 演示2：只显示箭头

          this.scheduleOnce(() => {
            this.showArrowOnly();
          }, 4); // 演示3：只显示提示

          this.scheduleOnce(() => {
            this.showTipOnly();
          }, 7); // 演示4：快速引导

          this.scheduleOnce(() => {
            this.showQuickGuide();
          }, 10); // 演示5：回调功能

          this.scheduleOnce(() => {
            this.showGuideWithCallback();
          }, 13);
        }
        /**
         * 演示移动引导
         */


        showMoveGuide() {
          //console.log('演示：移动引导');
          var joystick = manager.guide.getCachedNode('joystick');
          var hero = manager.guide.getCachedNode('hero');

          if (joystick && hero) {
            manager.guide.showArrowGuide({
              startNode: joystick,
              endNode: hero,
              tipContent: '使用摇杆控制角色移动',
              duration: 3,
              onComplete: () => {//console.log('移动引导完成');
              }
            });
          }
        }
        /**
         * 演示只显示箭头
         */


        showArrowOnly() {
          //console.log('演示：只显示箭头');
          var hero = manager.guide.getCachedNode('hero');
          var resource = manager.guide.getCachedNode('resource');

          if (hero && resource) {
            manager.guide.showArrowOnly(hero, resource, 2);
          }
        }
        /**
         * 演示只显示提示
         */


        showTipOnly() {
          //console.log('演示：只显示提示');
          manager.guide.showTipOnly('收集资源可以建造建筑', 2);
        }
        /**
         * 演示快速引导
         */


        showQuickGuide() {
          //console.log('演示：快速引导');
          // 使用预设的快速引导
          manager.guide.quickGuide('build');
        }
        /**
         * 演示带回调的引导
         */


        showGuideWithCallback() {
          //console.log('演示：带回调的引导');
          var hero = manager.guide.getCachedNode('hero');
          var buildBtn = manager.guide.getCachedNode('buildButton');

          if (hero && buildBtn) {
            manager.guide.showArrowGuide({
              startNode: hero,
              endNode: buildBtn,
              tipContent: '点击这里开始建造',
              duration: 3,
              onComplete: () => {
                //console.log('建造引导完成 - 执行后续逻辑');
                // 这里可以触发其他游戏逻辑
                this.onGuideCompleted();
              },
              onSkip: () => {//console.log('用户跳过了建造引导');
              }
            });
          }
        }
        /**
         * 引导完成后的处理
         */


        onGuideCompleted() {//console.log('所有引导演示完成');
          // 可以在这里触发其他游戏逻辑
          // 比如解锁功能、发送事件等
        }
        /**
         * 测试手动控制
         */


        testManualControl() {
          //console.log('测试手动控制');
          // 显示引导
          var hero = manager.guide.getCachedNode('hero');
          var resource = manager.guide.getCachedNode('resource');

          if (hero && resource) {
            manager.guide.showArrowGuide({
              startNode: hero,
              endNode: resource,
              tipContent: '手动触发的引导' // 不设置duration，需要手动隐藏

            }); // 3秒后手动隐藏

            this.scheduleOnce(() => {
              //console.log('手动隐藏引导');
              manager.guide.hideArrowGuide();
            }, 3);
          }
        }
        /**
         * 测试向后兼容性
         */


        testBackwardCompatibility() {
          //console.log('测试向后兼容性');
          var hero = manager.guide.getCachedNode('hero');
          var resource = manager.guide.getCachedNode('resource');

          if (hero && resource) {
            // 使用旧的API方式
            manager.guide.showArrowBetween(hero, resource, 2);
            this.scheduleOnce(() => {
              manager.guide.hideArrowBetween(); //console.log('向后兼容性测试完成');
            }, 3);
          }
        }
        /**
         * 清理所有引导
         */


        cleanup() {
          //console.log('清理所有引导');
          manager.guide.hideAll();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "joystickNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "heroNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "buildButtonNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "resourceNode", [_dec5], {
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
//# sourceMappingURL=e6a527810bdd4d94e2461966c648de94617e2247.js.map