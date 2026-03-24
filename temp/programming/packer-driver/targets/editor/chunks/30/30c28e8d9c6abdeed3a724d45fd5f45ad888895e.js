System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec2, v2, v3, CommonEvent, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, JoystickControl;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCommonEvent(extras) {
    _reporterNs.report("CommonEvent", "../Common/CommonEnum", _context.meta, extras);
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
      Vec2 = _cc.Vec2;
      v2 = _cc.v2;
      v3 = _cc.v3;
    }, function (_unresolved_2) {
      CommonEvent = _unresolved_2.CommonEvent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3d55dSbmPxFoL41oJ1jtLx3", "JoystickControl", undefined); // JoystickControl.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'EventTouch', 'Vec2', 'v2', 'v3', 'UITransform']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("JoystickControl", JoystickControl = (_dec = ccclass('JoystickControl'), _dec2 = property({
        type: Node,
        displayName: '摇杆底座节点'
      }), _dec3 = property({
        type: Node,
        displayName: '摇杆节点'
      }), _dec4 = property({
        displayName: '摇杆移动限制'
      }), _dec5 = property({
        displayName: '摇杆死区'
      }), _dec6 = property({
        displayName: '触摸结束时是否重置摇杆位置'
      }), _dec7 = property({
        type: Node,
        displayName: '引导节点'
      }), _dec8 = property({
        displayName: '无操作多长时间显示引导(秒)'
      }), _dec(_class = (_class2 = class JoystickControl extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "baseNode", _descriptor, this);

          _initializerDefineProperty(this, "stick", _descriptor2, this);

          _initializerDefineProperty(this, "stickLimit", _descriptor3, this);

          _initializerDefineProperty(this, "deadZone", _descriptor4, this);

          // 添加死区配置
          _initializerDefineProperty(this, "resetStickOnEnd", _descriptor5, this);

          // 控制触摸结束时是否重置摇杆位置
          _initializerDefineProperty(this, "guideNode", _descriptor6, this);

          _initializerDefineProperty(this, "inactivityTimeToShowGuide", _descriptor7, this);

          // 无操作多长时间显示引导(秒)
          this._originPos = v3();
          this._tempOffset = v2();
          // 复用 Vec2 对象
          this._inputVector = v2();
          this.inactivityTimer = 0;
        }

        // 无操作计时器
        onLoad() {
          this.initializeJoystick();
          this.registerTouchEvents();
        }

        onDestroy() {
          this.unregisterTouchEvents();
        }

        initializeJoystick() {
          this.baseNode.active = false;
          this.stick.setPosition(0, 0, 0); // 初始化引导节点

          if (this.guideNode) {
            this.guideNode.active = true;
          }
        }

        registerTouchEvents() {
          this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this); //console.log('onTouchStart');
        }

        unregisterTouchEvents() {
          this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
          this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this); //console.log('onTouchStart');
        }

        onTouchStart(event) {
          const touchPos = event.getUIStartLocation();

          this._originPos.set(touchPos.x, touchPos.y);

          this.baseNode.active = true;
          this.baseNode.setWorldPosition(this._originPos);
          this.updateJoystickPosition(event.getUILocation()); // 重置无操作计时器并隐藏引导

          this.resetInactivityTimer();
          this.hideGuide();
        }

        onTouchMove(event) {
          this.updateJoystickPosition(event.getUILocation()); // 重置无操作计时器

          this.resetInactivityTimer();
        }

        updateJoystickPosition(currentPos) {
          this._tempOffset.set(currentPos.x - this._originPos.x, currentPos.y - this._originPos.y);

          const distance = this._tempOffset.length(); // 应用死区


          if (distance < this.deadZone) {
            this._inputVector.set(Vec2.ZERO);

            this.stick.setPosition(0, 0);
            return;
          } // 限制摇杆移动范围


          const clampedDistance = Math.min(distance, this.stickLimit);

          const normalizedOffset = this._tempOffset.normalize();

          const stickX = normalizedOffset.x * clampedDistance;
          const stickY = normalizedOffset.y * clampedDistance;
          this.stick.setPosition(stickX, stickY);

          this._inputVector.set(normalizedOffset);

          this.emitJoystickInput();
        }

        onTouchEnd() {
          this.baseNode.active = false;

          if (this.resetStickOnEnd) {
            this.stick.setPosition(0, 0);
          }

          this._inputVector.set(Vec2.ZERO);

          this.emitJoystickInput(); // 重置无操作计时器

          this.resetInactivityTimer();
        }

        emitJoystickInput() {
          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).joystickInput, this._inputVector);
        }

        resetInactivityTimer() {
          this.inactivityTimer = 0;
        }

        hideGuide() {
          if (this.guideNode) {
            this.guideNode.active = false;
          }
        }

        showGuide() {
          if (this.guideNode) {
            this.guideNode.active = true;
          }
        }

        update(dt) {
          if (this.isActive) {
            this.emitJoystickInput();
          } // 更新无操作计时器


          if (!this.isActive) {
            this.inactivityTimer += dt; // 如果无操作时间达到阈值，显示引导

            if (this.inactivityTimer >= this.inactivityTimeToShowGuide) {
              this.showGuide();
            }
          }
        } // 公共访问器


        get inputVector() {
          return this._inputVector;
        }

        get isActive() {
          return this.baseNode.active;
        }
        /**
         * 启用或禁用摇杆的触摸响应
         * @param enabled true = 正常使用摇杆；false = 禁用（同时强制触发 onTouchEnd 清理状态）
         */


        setEnabled(enabled) {
          if (enabled) {
            this.registerTouchEvents();
          } else {
            // 先强制结束当前触摸，重置摇杆显示和输入向量
            this.onTouchEnd();
            this.unregisterTouchEvents();
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "baseNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "stick", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "stickLimit", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 80;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "deadZone", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "resetStickOnEnd", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "guideNode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "inactivityTimeToShowGuide", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 5;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=30c28e8d9c6abdeed3a724d45fd5f45ad888895e.js.map