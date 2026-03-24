System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Collider, Component, Node, tween, Tween, Vec3, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _crd, ccclass, property, Door;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Collider = _cc.Collider;
      Component = _cc.Component;
      Node = _cc.Node;
      tween = _cc.tween;
      Tween = _cc.Tween;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e2b6adCHr9EZbhz/qXmV/CL", "Door", undefined);

      __checkObsolete__(['_decorator', 'Collider', 'Component', 'Node', 'tween', 'Tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Door", Door = (_dec = ccclass('Door'), _dec2 = property({
        type: Node,
        displayName: '门1'
      }), _dec3 = property({
        type: Node,
        displayName: '门2'
      }), _dec4 = property({
        type: Collider,
        displayName: '区域监听'
      }), _dec(_class = (_class2 = (_class3 = class Door extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "leftDoor", _descriptor, this);

          _initializerDefineProperty(this, "rightDoor", _descriptor2, this);

          _initializerDefineProperty(this, "areaCollider", _descriptor3, this);

          this.leftDoorTween = null;
          this.rightDoorTween = null;
          this.startLeftPos = null;
          this.startRightPos = null;
          //是否处于开门状态
          this.isOpen = false;
        }

        onLoad() {
          //单例模式
          Door.instance = this;
          this.areaCollider.on('onTriggerEnter', this.onTriggerEnter, this);
          this.areaCollider.on('onTriggerExit', this.onTriggerExit, this);
          this.startLeftPos = this.leftDoor.getPosition().clone();
          this.startRightPos = this.rightDoor.getPosition().clone();
        }

        onTriggerEnter(selfCollider, otherCollider, event) {
          //停止ween动画 
          Tween.stopAllByTarget(this.leftDoor);
          Tween.stopAllByTarget(this.rightDoor); //开门动画 左门 x-=2.2  右门x+=2.2

          tween(this.leftDoor).to(0.3, {
            position: new Vec3(this.startLeftPos.x - 2.2, this.startLeftPos.y, this.startLeftPos.z)
          }).start();
          tween(this.rightDoor).to(0.3, {
            position: new Vec3(this.startRightPos.x + 2.2, this.startRightPos.y, this.startRightPos.z)
          }).start(); //console.log('onTriggerEnter');
          //设置为开门状态

          this.isOpen = true;
        }

        onTriggerExit(selfCollider, otherCollider, event) {
          //停止tween
          Tween.stopAllByTarget(this.leftDoor);
          Tween.stopAllByTarget(this.rightDoor); //关门动画 左门 x=0  右门x=0

          tween(this.leftDoor).to(0.3, {
            position: this.startLeftPos
          }).start();
          tween(this.rightDoor).to(0.3, {
            position: this.startRightPos
          }).start(); //console.log('onTriggerExit');
          //设置为关门状态

          this.isOpen = false;
        }

      }, _class3.instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "leftDoor", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rightDoor", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "areaCollider", [_dec4], {
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
//# sourceMappingURL=ba29c56f245a3f281e74fc92eaa408c7421f6209.js.map