System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, director, Prefab, Enum, instantiate, Animation, NodePool, ParticleSystem, CCInteger, ObjectType, PoolObjectBase, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _dec5, _dec6, _class4, _class5, _descriptor4, _crd, ccclass, property, ObjectPoolItem, PoolManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPoolObjectBase(extras) {
    _reporterNs.report("PoolObjectBase", "../Common/PoolObjectBase", _context.meta, extras);
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
      Node = _cc.Node;
      director = _cc.director;
      Prefab = _cc.Prefab;
      Enum = _cc.Enum;
      instantiate = _cc.instantiate;
      Animation = _cc.Animation;
      NodePool = _cc.NodePool;
      ParticleSystem = _cc.ParticleSystem;
      CCInteger = _cc.CCInteger;
    }, function (_unresolved_2) {
      ObjectType = _unresolved_2.ObjectType;
    }, function (_unresolved_3) {
      PoolObjectBase = _unresolved_3.PoolObjectBase;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "983751DR4RINLJ8J+124vnF", "PoolManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'director', 'Prefab', 'Enum', 'Vec3', 'instantiate', 'Animation', 'Quat', 'NodePool', 'ParticleSystem', 'CCInteger', 'v3']);

      ({
        ccclass,
        property
      } = _decorator); // 对象池项类，用于在编辑器中配置

      ObjectPoolItem = (_dec = ccclass('ObjectPoolItem'), _dec2 = property({
        type: Enum(_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
          error: Error()
        }), ObjectType) : ObjectType),
        displayName: '对象类型'
      }), _dec3 = property({
        type: Prefab,
        displayName: '对象预制体'
      }), _dec4 = property({
        type: CCInteger,
        range: [0, 100],
        displayName: '对象池初始大小'
      }), _dec(_class = (_class2 = class ObjectPoolItem {
        constructor() {
          _initializerDefineProperty(this, "type", _descriptor, this);

          _initializerDefineProperty(this, "prefab", _descriptor2, this);

          _initializerDefineProperty(this, "poolInitSize", _descriptor3, this);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).None;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "poolInitSize", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class);

      _export("PoolManager", PoolManager = (_dec5 = ccclass('PoolManager'), _dec6 = property({
        type: [ObjectPoolItem],
        displayName: '对象池列表'
      }), _dec5(_class4 = (_class5 = class PoolManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "objectPoolItems", _descriptor4, this);

          /** 对象池映射表 */
          this._pools = new Map();

          /** 预制体映射表 */
          this._prefabMap = new Map();
        }

        /** 单例实例 */

        /** 获取单例实例 */
        static get instance() {
          if (!this._instance) {
            var _director$getScene;

            //console.log('PoolManager 实例不存在 动态创建');
            // 动态创建节点并添加组件
            var node = new Node('PoolManager');
            this._instance = node.addComponent(PoolManager); // 添加到场景

            (_director$getScene = director.getScene()) == null || _director$getScene.addChild(node);
          }

          return this._instance;
        }

        get objectType() {
          return _crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType;
        }

        onLoad() {
          // 单例检查
          if (PoolManager._instance) {
            this.node.destroy();
            return;
          }

          PoolManager._instance = this; // 初始化对象池

          this._initPools(); // 设置常驻节点，切换场景不销毁


          director.addPersistRootNode(this.node);
        }
        /**
         * 初始化所有对象池
         * @private
         */


        _initPools() {
          // 遍历配置项，初始化每个对象池
          for (var item of this.objectPoolItems) {
            if (item.type === (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).None || !item.prefab) {
              continue;
            } // 保存预制体引用


            this._prefabMap.set(item.type, item.prefab); // 创建对象池


            var pool = new NodePool(); // 预先创建指定数量的对象

            for (var i = 0; i < item.poolInitSize; i++) {
              var node = instantiate(item.prefab);
              var component = node.getComponent(_crd && PoolObjectBase === void 0 ? (_reportPossibleCrUseOfPoolObjectBase({
                error: Error()
              }), PoolObjectBase) : PoolObjectBase);

              if (component) {
                component.objectType = item.type;
              }

              pool.put(node);
            } // 保存对象池引用


            this._pools.set(item.type, pool); //console.log(`对象池 [${item.type}] 初始化完成，初始数量: ${item.poolInitSize}`);

          }
        }
        /**
         * 从对象池获取对象
         * @param type 对象类型
         * @param parent 父节点
         * @param position 位置
         * @param rotation 旋转
         * @returns 对象节点
         */


        getNode(type, parent, position, rotation) {
          if (type === (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).None) {
            //console.warn('获取对象时类型不能为None');
            return null;
          } // 获取对象池


          var pool = this._pools.get(type);

          var node = null;

          if (pool && pool.size() > 0) {
            // 对象池有可用对象
            node = pool.get();
          } else {
            // 对象池为空，创建新对象
            var prefab = this._prefabMap.get(type);

            if (prefab) {
              node = instantiate(prefab); //console.log(`对象池 [${type}] 已空，动态创建新对象`);

              var component = node.getComponent(_crd && PoolObjectBase === void 0 ? (_reportPossibleCrUseOfPoolObjectBase({
                error: Error()
              }), PoolObjectBase) : PoolObjectBase);

              if (component) {
                component.objectType = type;
              }
            } else {
              //console.error(`找不到类型 [${type}] 的预制体`);
              return null;
            }
          }

          if (node && node.isValid) {
            // 重置节点
            this._resetNodeStatus(node); // 设置父节点


            if (parent) {
              node.setParent(parent);
            } // 设置位置


            if (position) {
              node.setPosition(position);
            } // 设置旋转


            if (rotation) {
              node.setRotation(rotation);
            } // 激活节点


            node.active = true;
          } // app.log.debug(`获取对象 [${type}] 成功: ${node.name}`);


          return node;
        }
        /**
         * 回收对象到对象池
         * @param node 要回收的节点
         * @param type 对象类型
         */


        putNode(node) {
          if (!node || !node.isValid) {
            return;
          }

          var component = node.getComponent(_crd && PoolObjectBase === void 0 ? (_reportPossibleCrUseOfPoolObjectBase({
            error: Error()
          }), PoolObjectBase) : PoolObjectBase);

          if (!component) {
            //console.warn(`节点 [${node.name}] 没有 PoolObjectBase 组件 或 类型为None`);
            node.destroy();
            return;
          }

          var type = component.objectType;

          if (type === (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).None) {
            //console.warn(`节点 [${node.name}] 的类型为None`);
            node.destroy();
            return;
          } // 获取对象池


          var pool = this._pools.get(type);

          if (!pool) {
            //console.warn(`类型 [${type}] 的对象池不存在`);
            node.destroy();
            return;
          } // 停用节点


          node.active = false; // 清除父节点

          node.removeFromParent(); // 停止所有动作和动画

          var animation = node.getComponent(Animation);

          if (animation) {
            animation.stop();
          } // 停止粒子效果


          var particleSystem = node.getComponentInChildren(ParticleSystem);

          if (particleSystem) {
            particleSystem.stop();
            particleSystem.clear();
          } // 放回对象池


          pool.put(node);
        }
        /**
         * 重置节点状态
         * @param node 要重置的节点
         * @param type 对象类型
         * @private
         */


        _resetNodeStatus(node) {
          var poolObjectBase = node.getComponent(_crd && PoolObjectBase === void 0 ? (_reportPossibleCrUseOfPoolObjectBase({
            error: Error()
          }), PoolObjectBase) : PoolObjectBase);

          if (poolObjectBase) {
            poolObjectBase.reset();
          } else {//console.warn(`节点 [${node.name}] 没有 PoolObjectBase 组件`);
          }
        }
        /**
         * 清空指定类型的对象池
         * @param type 对象类型
         */


        clearPool(type) {
          var pool = this._pools.get(type);

          if (pool) {
            pool.clear(); //console.log(`对象池 [${type}] 已清空`);
          }
        }
        /**
         * 清空所有对象池
         */


        clearAllPools() {
          this._pools.forEach((pool, type) => {
            pool.clear(); //console.log(`对象池 [${type}] 已清空`);
          });
        }

        onDestroy() {
          // 清空所有对象池
          this.clearAllPools(); // 清空引用

          this._pools.clear();

          this._prefabMap.clear();

          if (PoolManager._instance === this) {
            PoolManager._instance = null;
          }
        }

        reset() {
          this.clearAllPools();

          this._pools.clear();

          this._prefabMap.clear(); // 初始化对象池


          this._initPools();
        }

      }, (_descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "objectPoolItems", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class5)) || _class4));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8a332e8c610bedf945dff7cb4ced0e4a6258db85.js.map