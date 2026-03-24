System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Enum, BuildingType, BuildUnlockState, CommonEvent, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, BuildingBase;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBuildingType(extras) {
    _reporterNs.report("BuildingType", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildUnlockState(extras) {
    _reporterNs.report("BuildUnlockState", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../../Main/Common/CommonEnum", _context.meta, extras);
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
      Enum = _cc.Enum;
    }, function (_unresolved_2) {
      BuildingType = _unresolved_2.BuildingType;
      BuildUnlockState = _unresolved_2.BuildUnlockState;
      CommonEvent = _unresolved_2.CommonEvent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "48675sHL/xBQqqQzzQepSw+", "BuildingBase", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Enum', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BuildingBase", BuildingBase = (_dec = ccclass('BuildingBase'), _dec2 = property({
        type: Enum(_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
          error: Error()
        }), BuildingType) : BuildingType),
        displayName: '建筑类型'
      }), _dec3 = property({
        type: Enum(_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
          error: Error()
        }), BuildUnlockState) : BuildUnlockState),
        displayName: '建筑状态'
      }), _dec(_class = (_class2 = class BuildingBase extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "type", _descriptor, this);

          _initializerDefineProperty(this, "state", _descriptor2, this);
        }

        /**
         * 建筑类型
         */
        get Type() {
          return this.type;
        }
        /**
         * 建筑状态
         */


        get State() {
          return this.state;
        }

        init() {
          switch (this.state) {
            case (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
              error: Error()
            }), BuildUnlockState) : BuildUnlockState).Unlocked:
              this.showUnlockAnim();
              break;

            default:
              this.showlock();
              break;
          }
        }

        onLoad() {
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).OnReset, this.onReset, this);
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).UnlockItem, this.onUnlockItem, this);
          this.init();
        }

        start() {}

        onReset() {
          this.state = (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).Active;
          this.showlock();
        }

        onUnlockItem(type) {
          if (type === this.type && this.state === (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).Active) {
            this.UnlockBuilding();
          }
        }

        UnlockBuilding() {
          this.state = (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).Unlocking;
          this.showUnlockAnim().then(() => {
            this.state = (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
              error: Error()
            }), BuildUnlockState) : BuildUnlockState).Unlocked;
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).UnlockFinished, this.type);
            this.onUnlockFinished();
          }).catch(e => {//console.error(e);
          });
        }

        onUnlockFinished() {// 子类重写
        }

        ResetBuilding() {
          this.state = (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).NoActive;
          this.showlock();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).None;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "state", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return (_crd && BuildUnlockState === void 0 ? (_reportPossibleCrUseOfBuildUnlockState({
            error: Error()
          }), BuildUnlockState) : BuildUnlockState).Active;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8b8f25d46d96dcd79db69299b9ccc7d7b6282060.js.map