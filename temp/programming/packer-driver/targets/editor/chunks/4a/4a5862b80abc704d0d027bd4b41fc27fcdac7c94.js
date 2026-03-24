System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Camera, Component, easing, Node, Tween, tween, Vec3, CommonEvent, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, MainCamera;

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
      Camera = _cc.Camera;
      Component = _cc.Component;
      easing = _cc.easing;
      Node = _cc.Node;
      Tween = _cc.Tween;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      CommonEvent = _unresolved_2.CommonEvent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "07d69fMJFhEB7tRu+LAGYs3", "MainCamera", undefined);

      __checkObsolete__(['_decorator', 'Camera', 'Component', 'easing', 'Node', 'Tween', 'tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MainCamera", MainCamera = (_dec = ccclass('MainCamera'), _dec2 = property({
        type: Node,
        displayName: '相机父节点'
      }), _dec3 = property(Camera), _dec4 = property({
        displayName: '平滑跟随时间'
      }), _dec(_class = (_class2 = class MainCamera extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "cameraParent", _descriptor, this);

          _initializerDefineProperty(this, "camera", _descriptor2, this);

          _initializerDefineProperty(this, "smoothTime", _descriptor3, this);

          this.isShaking = false;
          this.targetPosition = null;
          this.currentVelocity = new Vec3();
          this.isFollowing = false;
          this.pauseFollowing = false;
        }

        onLoad() {
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).HerMove, this.onHeroMove, this);
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).ShowOver, this.onShowOver, this);
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).ShakeCamera, this.onShakeCamera, this);
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).ShowOut, this.onShowOut, this);
        }

        onDestroy() {
          app.event.offAllByTarget(this);
        }

        onShakeCamera(data) {
          if (this.isSourceInCameraView(data.source)) {
            this.shake(data == null ? void 0 : data.intensity, data == null ? void 0 : data.duration);
          }
        }
        /**
         * 判断震动源是否在摄像机可见范围内
         * @param source 震动源节点
         * @returns 是否在可见范围内
         */


        isSourceInCameraView(source) {
          if (!source || !this.camera) return false; // 获取相机和震动源的世界坐标

          const cameraPos = this.camera.node.getWorldPosition();
          const sourcePos = source.getWorldPosition(); // 计算距离

          const distance = Vec3.distance(cameraPos, sourcePos); // 设置可见距离范围（可以根据需要调整）

          const maxDistance = 1000; // 最大震动距离

          if (distance > maxDistance) {
            return false;
          } // 使用相机的屏幕坐标转换来判断是否在视锥体内


          const screenPos = this.camera.worldToScreen(sourcePos); // 获取屏幕尺寸 - 使用更简单的固定值或相机的渲染范围

          const screenWidth = 720; // 可以根据项目设置调整

          const screenHeight = 1280; // 可以根据项目设置调整
          // 判断是否在屏幕范围内（包含一定的边界扩展）

          const margin = 200; // 边界扩展，允许稍微超出屏幕的物体也能触发震动

          return screenPos.x >= -margin && screenPos.x <= screenWidth + margin && screenPos.y >= -margin && screenPos.y <= screenHeight + margin;
        }

        onHeroMove(heroPos) {
          if (manager.game.isGamePause || this.pauseFollowing) return;
          this.targetPosition = heroPos.add(new Vec3(0, 33, 25));
          this.isFollowing = true;
        }

        lateUpdate(dt) {
          if (this.targetPosition && this.isFollowing) {
            const currentPos = this.cameraParent.getWorldPosition();
            const smoothedPos = new Vec3(); // 使用插值实现平滑跟随

            const t = Math.min(dt / this.smoothTime, 1.0);
            Vec3.lerp(smoothedPos, currentPos, this.targetPosition, t);
            this.cameraParent.setWorldPosition(smoothedPos);
            app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
              error: Error()
            }), CommonEvent) : CommonEvent).CameraMove, smoothedPos);
            this.targetPosition = null;
          }
        }

        onShowOver() {
          this.pauseFollowing = true;
          tween(this.node).to(1.2, {
            position: new Vec3(2, 30, 12)
          }, {
            easing: easing.quintOut
          }).start();
          tween(this.camera).to(1.2, {
            fov: 40
          }, {
            easing: easing.quintOut
          }).call(() => {// this.pauseFollowing = false;
          }).start();
        }

        onShowOut(data) {
          this.pauseFollowing = true;
          tween(this.node).to(1.2, {
            // position: new Vec3(2, 30, 12),
            x: 2
          }, {
            easing: easing.quintOut
          }).delay(1.5).to(0.5, {
            x: 0
          }, {
            easing: easing.quintOut
          }).call(() => {
            this.pauseFollowing = false;
            data.cb == null || data.cb();
          }).start();
          tween(this.camera.node).to(1.2, {
            eulerAngles: new Vec3(-43, 0, 0)
          }, {
            easing: easing.quintOut
          }).delay(1.5).to(0.5, {
            eulerAngles: new Vec3(-50, 0, 0)
          }, {
            easing: easing.quintOut
          }).start();
        }
        /**
         * 屏幕震动效果
         * @param intensity 震动强度 (默认: 5)
         * @param duration 震动持续时间 (默认: 0.5秒)
         * @param frequency 震动频率 (默认: 20次/秒)
         */


        shake(intensity = 5, duration = 0.08) {
          if (this.isShaking) {
            Tween.stopAllByTarget(this.camera.node);
            this.camera.node.setPosition(Vec3.ZERO);
          }

          ;
          this.isShaking = true;
          tween(this.camera.node).to(duration / 2, {
            position: new Vec3(0, intensity, 0)
          }, {
            easing: easing.cubicOut
          }).to(duration / 2, {
            position: new Vec3(0, 0, 0)
          }, {
            easing: easing.cubicIn
          }).call(() => {
            this.isShaking = false;
          }).start();
        }
        /**
         * 停止震动
         */


        stopShake() {
          this.isShaking = false;
          this.camera.node.setPosition(Vec3.ZERO);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cameraParent", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "smoothTime", [_dec4], {
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
//# sourceMappingURL=4a5862b80abc704d0d027bd4b41fc27fcdac7c94.js.map