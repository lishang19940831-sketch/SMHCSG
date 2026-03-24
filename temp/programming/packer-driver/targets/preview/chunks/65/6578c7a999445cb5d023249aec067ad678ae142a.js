System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, ComponentInitializer, _crd;

  _export("ComponentInitializer", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f461dQAJwJB8ZJfU6iLwg9k", "ComponentInitializer", undefined);

      /**
       * 组件初始化器 
       * 用于简化组件的获取或创建逻辑
       */
      __checkObsolete__(['Node', 'Component']);

      _export("ComponentInitializer", ComponentInitializer = class ComponentInitializer {
        /**
         * 获取或创建指定类型的组件
         * @param node 节点
         * @param componentType 组件类型
         * @returns 获取到的或新创建的组件实例
         */
        static getOrAddComponent(node, componentType) {
          var component = node.getComponent(componentType);

          if (!component) {
            component = node.addComponent(componentType);
          }

          return component;
        }
        /**
         * 安全地获取组件，如果不存在则返回null，不会自动创建
         * @param node 节点
         * @param componentType 组件类型
         * @returns 获取到的组件实例或null
         */


        static getComponent(node, componentType) {
          var component = node.getComponent(componentType);
          return component;
        }
        /**
         * 初始化一组组件引用
         * @param node 节点
         * @param componentMap 组件映射，键为属性名，值为组件类型
         * @param target 目标对象，用于存储组件引用
         * @param addIfMissing 是否在缺少组件时自动添加
         */


        static initComponents(node, componentMap, target, addIfMissing) {
          if (addIfMissing === void 0) {
            addIfMissing = true;
          }

          for (var [propName, compType] of Object.entries(componentMap)) {
            var prop = target[propName];

            if (!prop) {
              if (addIfMissing) {
                target[propName] = this.getOrAddComponent(node, compType);
              } else {
                target[propName] = this.getComponent(node, compType);
              }
            }
          }
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6578c7a999445cb5d023249aec067ad678ae142a.js.map