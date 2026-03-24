System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, ObjectType, WheatCrop, ResourceFieldManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, WheatFieldManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfWheatCrop(extras) {
    _reporterNs.report("WheatCrop", "./WheatCrop", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResourceFieldManager(extras) {
    _reporterNs.report("ResourceFieldManager", "./ResourceFieldManager", _context.meta, extras);
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
    }, function (_unresolved_2) {
      ObjectType = _unresolved_2.ObjectType;
    }, function (_unresolved_3) {
      WheatCrop = _unresolved_3.WheatCrop;
    }, function (_unresolved_4) {
      ResourceFieldManager = _unresolved_4.ResourceFieldManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0fa91ZjTylGg5mGjpmuaq8N", "WheatFieldManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * WheatFieldManager —— 麦田扫描管理器
       *
       * 设计说明：
       *  - 挂在场景中任意节点上
       *  - onLoad 时递归扫描 scanRoots 下所有节点
       *  - 节点 name 中包含关键字（默认"麦子"）的节点，自动 addComponent(WheatCrop)
       *  - 扫描完成后将结果批量注册到 ResourceFieldManager 单例
       *
       * 节点结构示例：
       *   WheatField_Root（拖入 scanRoots）
       *   ├── 麦子_001   ← 自动挂 WheatCrop
       *   ├── 石头_001   ← 名字不含关键字，跳过
       *   └── 麦子_002   ← 自动挂 WheatCrop
       */

      _export("WheatFieldManager", WheatFieldManager = (_dec = ccclass('WheatFieldManager'), _dec2 = property({
        type: [Node],
        displayName: '扫描根节点列表',
        tooltip: '将包含麦子节点的父节点拖入，管理器会递归扫描所有子孙节点'
      }), _dec3 = property({
        displayName: '节点名称关键字',
        tooltip: '节点 name 中包含此关键字时自动挂载 WheatCrop，默认：麦子'
      }), _dec4 = property({
        type: _crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
          error: Error()
        }), ObjectType) : ObjectType,
        displayName: '资源类型',
        tooltip: '扫描到的节点统一使用此资源类型'
      }), _dec5 = property({
        displayName: '单次收割数量',
        tooltip: '每个节点被收割时产出的资源数量',
        min: 1
      }), _dec6 = property({
        displayName: '再生时间(秒, 0=不再生)',
        min: 0
      }), _dec(_class = (_class2 = class WheatFieldManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "scanRoots", _descriptor, this);

          _initializerDefineProperty(this, "nameKeyword", _descriptor2, this);

          _initializerDefineProperty(this, "resourceType", _descriptor3, this);

          _initializerDefineProperty(this, "harvestAmount", _descriptor4, this);

          _initializerDefineProperty(this, "regrowTime", _descriptor5, this);

          // ─────────────────────────────────────────────
          // 运行时数据
          // ─────────────────────────────────────────────

          /** 本管理器扫描到的所有 WheatCrop */
          this._crops = [];
        }

        get crops() {
          return this._crops;
        } // ─────────────────────────────────────────────
        // 生命周期
        // ─────────────────────────────────────────────


        onLoad() {
          this._scan(); // 注意：不在 onLoad 里注册，因为此时父节点的世界矩阵可能尚未刷新
          // （麦子节点有旋转时 getWorldPosition 会返回错误坐标）
          // 延迟到 start 之后再刷新坐标并注册，确保世界矩阵已稳定

        }

        start() {
          // 刷新所有 crop 的世界坐标（此时场景初始化完毕，父节点变换已稳定）
          for (var crop of this._crops) {
            crop.refreshWorldPos();
          }

          this._registerToCentral();
        } // ─────────────────────────────────────────────
        // 私有方法
        // ─────────────────────────────────────────────


        _scan() {
          this._crops = [];

          for (var root of this.scanRoots) {
            if (root && root.isValid) {
              this._collectFromNode(root);
            }
          }

          console.log("[WheatFieldManager] \u5173\u952E\u5B57\"" + this.nameKeyword + "\"\uFF0C\u5171\u627E\u5230 " + this._crops.length + " \u4E2A\u8282\u70B9\u5E76\u6302\u8F7D WheatCrop");
        }

        _collectFromNode(node) {
          if (node.name.includes(this.nameKeyword)) {
            var crop = node.getComponent(_crd && WheatCrop === void 0 ? (_reportPossibleCrUseOfWheatCrop({
              error: Error()
            }), WheatCrop) : WheatCrop);

            if (!crop) {
              crop = node.addComponent(_crd && WheatCrop === void 0 ? (_reportPossibleCrUseOfWheatCrop({
                error: Error()
              }), WheatCrop) : WheatCrop);
            }

            crop.resourceType = this.resourceType;
            crop.harvestAmount = this.harvestAmount;
            crop.regrowTime = this.regrowTime; // 不在此处调用 refreshWorldPos()
            // 世界坐标统一在 start() 里刷新，确保父节点变换已完成

            this._crops.push(crop);
          }

          for (var child of node.children) {
            this._collectFromNode(child);
          }
        }

        _registerToCentral() {
          var mgr = (_crd && ResourceFieldManager === void 0 ? (_reportPossibleCrUseOfResourceFieldManager({
            error: Error()
          }), ResourceFieldManager) : ResourceFieldManager).instance;

          if (mgr) {
            mgr.registerBatch(this._crops);
          } else {
            // ResourceFieldManager 可能还未 onLoad，延迟一帧注册
            this.scheduleOnce(() => {
              var _instance;

              (_instance = (_crd && ResourceFieldManager === void 0 ? (_reportPossibleCrUseOfResourceFieldManager({
                error: Error()
              }), ResourceFieldManager) : ResourceFieldManager).instance) == null || _instance.registerBatch(this._crops);
            }, 0);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scanRoots", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nameKeyword", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '麦子';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "resourceType", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
            error: Error()
          }), ObjectType) : ObjectType).DropItemCornKernel;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "harvestAmount", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "regrowTime", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d0279f022df3590b037e2184110e137a25e7c069.js.map