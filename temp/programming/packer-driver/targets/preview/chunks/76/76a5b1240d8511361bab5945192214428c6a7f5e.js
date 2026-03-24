System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, CommonEvent, ObjectType, WheatContainer, WoodContainer, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, TrainUnloadManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfWheatContainer(extras) {
    _reporterNs.report("WheatContainer", "../Building/WheatContainer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfWoodContainer(extras) {
    _reporterNs.report("WoodContainer", "../Building/WoodContainer", _context.meta, extras);
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
    }, function (_unresolved_2) {
      CommonEvent = _unresolved_2.CommonEvent;
      ObjectType = _unresolved_2.ObjectType;
    }, function (_unresolved_3) {
      WheatContainer = _unresolved_3.WheatContainer;
    }, function (_unresolved_4) {
      WoodContainer = _unresolved_4.WoodContainer;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1a768E0YJ5AaYB38SzNlTRx", "TrainUnloadManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 统一卸货容器接口（麦子/木头容器均实现此接口）
       */

      /**
       * TrainUnloadManager —— 火车到站卸货管理器
       *
       * 挂载位置：与 TrainManager 同节点
       *
       * 职责：
       *  1. 在 Inspector 中直接拖入 WheatContainer / WoodContainer
       *  2. 对外暴露 getContainer(type) 接口，供 Train._flushPendingItems() 按类型查询容器
       *  3. 玩家第一次上车时显示 wheatContainer / woodContainer 节点
       */
      _export("TrainUnloadManager", TrainUnloadManager = (_dec = ccclass('TrainUnloadManager'), _dec2 = property({
        type: _crd && WheatContainer === void 0 ? (_reportPossibleCrUseOfWheatContainer({
          error: Error()
        }), WheatContainer) : WheatContainer,
        displayName: '麦子容器'
      }), _dec3 = property({
        type: _crd && WoodContainer === void 0 ? (_reportPossibleCrUseOfWoodContainer({
          error: Error()
        }), WoodContainer) : WoodContainer,
        displayName: '木头容器'
      }), _dec(_class = (_class2 = class TrainUnloadManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "wheatContainer", _descriptor, this);

          _initializerDefineProperty(this, "woodContainer", _descriptor2, this);

          this.heroInTrain = false;

          /** 是否已经第一次上车（用于只触发一次显示逻辑） */
          this._hasFirstBoarded = false;
        }

        // ─────────────────────────────────────────────
        // 生命周期
        // ─────────────────────────────────────────────
        onLoad() {
          // 初始隐藏两个容器节点，等玩家第一次上车后再显示
          if (this.wheatContainer) this.wheatContainer.node.active = false;
          if (this.woodContainer) this.woodContainer.node.active = false;
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).HeroBoarded, this._onFirstBoard, this);
        }

        onDestroy() {
          app.event.off((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).HeroBoarded, this);
        } // ─────────────────────────────────────────────
        // 私有方法
        // ─────────────────────────────────────────────


        _onFirstBoard() {
          if (this._hasFirstBoarded) return;
          this._hasFirstBoarded = true;
          if (this.wheatContainer) this.wheatContainer.node.active = true;
          if (this.woodContainer) this.woodContainer.node.active = true; // 只需触发一次，注销监听

          app.event.off((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).HeroBoarded, this);
        } // ─────────────────────────────────────────────
        // 公开接口
        // ─────────────────────────────────────────────

        /**
         * 按资源类型获取对应的容器
         * 供 Train._flushPendingItems() 调用
         */


        getContainer(type) {
          var _this$wheatContainer, _this$woodContainer;

          switch (type) {
            case (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemCornKernel:
              return (_this$wheatContainer = this.wheatContainer) != null ? _this$wheatContainer : null;

            case (_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemWood:
              return (_this$woodContainer = this.woodContainer) != null ? _this$woodContainer : null;

            default:
              console.warn("[TrainUnloadManager] \u26A0\uFE0F \u672A\u77E5\u8D44\u6E90\u7C7B\u578B " + type + "\uFF0C\u65E0\u5BF9\u5E94\u5BB9\u5668");
              return null;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "wheatContainer", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "woodContainer", [_dec3], {
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
//# sourceMappingURL=76a5b1240d8511361bab5945192214428c6a7f5e.js.map