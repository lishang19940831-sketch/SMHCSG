System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, UIPowerBar;

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

      _cclegacy._RF.push({}, "0bf9ah+pX5FOZ+wofTpCxGh", "UIPowerBar", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("UIPowerBar", UIPowerBar = (_dec = ccclass('UIPowerBar'), _dec2 = property({
        type: Node,
        displayName: '电量显示节点列表'
      }), _dec(_class = (_class2 = class UIPowerBar extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "powerNodes", _descriptor, this);
        }

        onLoad() {
          this.powerNodes.children.forEach(node => {
            node.active = false;
          });
        }
        /**
         * 按百分比更新电量显示
         * @param percentage 百分比值 (0-1范围，0表示0%，1表示100%)
         */


        updatePower(percentage) {
          // 确保百分比在有效范围内
          percentage = Math.max(0, Math.min(1, percentage)); // 根据百分比计算要显示的节点数量

          const activeCount = Math.floor(percentage * this.powerNodes.children.length); // 更新节点显示状态

          for (let i = 0; i < this.powerNodes.children.length; i++) {
            this.powerNodes.children[i].active = i < activeCount;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "powerNodes", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=01788f3fd535d30615851d7fda27c404fd0c5dcd.js.map