System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, tween, Camera, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _class3, _crd, ccclass, property, CameraFollow;

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
      Vec3 = _cc.Vec3;
      tween = _cc.tween;
      Camera = _cc.Camera;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a5720MydXFHVYEOgd9VWM5u", "CameraFollow", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'tween', 'Camera']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 相机跟随脚本
       * 跟随目标移动，但保持固定的角度和距离
       */

      _export("CameraFollow", CameraFollow = (_dec = ccclass('CameraFollow'), _dec2 = property({
        type: Node,
        tooltip: '跟随目标（通常是Player节点）'
      }), _dec3 = property({
        type: Node,
        tooltip: '粒子摄像机节点（用于显示粒子效果）'
      }), _dec4 = property({
        tooltip: '跟随速度（0-1，越大越快，1=瞬间跟随）'
      }), _dec5 = property({
        tooltip: '是否启用平滑跟随（关闭则瞬间跟随）'
      }), _dec6 = property({
        tooltip: '相机相对目标的偏移（X, Y, Z）'
      }), _dec7 = property({
        tooltip: '是否自动计算初始偏移（从当前位置）'
      }), _dec8 = property({
        tooltip: 'Boss出现时正交高度增加量（拉高镜头）'
      }), _dec9 = property({
        tooltip: '镜头缩放的缓动时间（秒）'
      }), _dec10 = property({
        tooltip: 'Boss攻击时摄像机抖动强度'
      }), _dec11 = property({
        tooltip: '摄像机抖动持续时间（秒）'
      }), _dec12 = property({
        tooltip: '摄像机抖动频率（次/秒）'
      }), _dec(_class = (_class2 = (_class3 = class CameraFollow extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "target", _descriptor, this);

          _initializerDefineProperty(this, "cameraParticleNode", _descriptor2, this);

          _initializerDefineProperty(this, "followSpeed", _descriptor3, this);

          _initializerDefineProperty(this, "smoothFollow", _descriptor4, this);

          _initializerDefineProperty(this, "offset", _descriptor5, this);

          _initializerDefineProperty(this, "autoCalculateOffset", _descriptor6, this);

          _initializerDefineProperty(this, "bossOrthoHeightIncrease", _descriptor7, this);

          _initializerDefineProperty(this, "zoomDuration", _descriptor8, this);

          _initializerDefineProperty(this, "bossAttackShakeStrength", _descriptor9, this);

          _initializerDefineProperty(this, "shakeDuration", _descriptor10, this);

          _initializerDefineProperty(this, "shakeFrequency", _descriptor11, this);

          this.initialOffset = new Vec3();
          this.camera = null;
          // 相机组件
          this.cameraParticle = null;
          // 粒子摄像机组件
          this.normalOrthoHeight = 0;
          // 正常状态的正交高度
          this.isBossMode = false;
          // 是否处于Boss模式
          this.isShaking = false;
          // 是否正在抖动
          this.shakeTimer = 0;
          // 抖动计时器
          this.shakeOffset = new Vec3();
        }

        start() {
          CameraFollow.instance = this; // 获取相机组件

          this.camera = this.node.getComponent(Camera);

          if (!this.camera) {
            //console.error(' CameraFollow: 未找到 Camera 组件！');
            return;
          }

          this.cameraParticleNode && (this.cameraParticle = this.cameraParticleNode.getComponent(Camera)); // 保存正常状态的正交高度

          this.normalOrthoHeight = this.camera.orthoHeight; // 自动计算初始偏移量（使用世界坐标）

          if (this.autoCalculateOffset) {
            if (this.target) {
              var targetWorld = this.target.worldPosition;
              var cameraWorld = this.node.worldPosition;
              this.initialOffset.set(cameraWorld.x - targetWorld.x, cameraWorld.y - targetWorld.y, cameraWorld.z - targetWorld.z);
            } else {
              // target 未绑定时，用固定 offset 作为初始值，等 setTarget 时再重算
              this.initialOffset.set(this.offset);
            }
          } else {
            this.initialOffset.set(this.offset);
          }
        }

        lateUpdate(deltaTime) {
          if (!this.target) {
            return;
          } // 更新抖动效果


          this.updateShake(deltaTime); // 使用世界坐标计算目标位置（加上抖动偏移）

          var targetWorld = this.target.worldPosition;
          var targetPosition = new Vec3(targetWorld.x + this.initialOffset.x + this.shakeOffset.x, targetWorld.y + this.initialOffset.y + this.shakeOffset.y, targetWorld.z + this.initialOffset.z + this.shakeOffset.z);

          if (this.smoothFollow) {
            // 平滑跟随（线性插值）
            var currentPos = this.node.worldPosition;
            var newPos = new Vec3(currentPos.x + (targetPosition.x - currentPos.x) * this.followSpeed, currentPos.y + (targetPosition.y - currentPos.y) * this.followSpeed, currentPos.z + (targetPosition.z - currentPos.z) * this.followSpeed);
            this.node.setWorldPosition(newPos);
            this.cameraParticleNode && this.cameraParticleNode.setWorldPosition(newPos);
          } else {
            // 瞬间跟随
            this.node.setWorldPosition(targetPosition);
            this.cameraParticleNode && this.cameraParticleNode.setWorldPosition(targetPosition);
          }
        }
        /**
         * 设置跟随目标
         */


        setTarget(target) {
          this.target = target;

          if (this.autoCalculateOffset && target) {
            var targetWorld = target.worldPosition;
            var cameraWorld = this.node.worldPosition;
            this.initialOffset.set(cameraWorld.x - targetWorld.x, cameraWorld.y - targetWorld.y, cameraWorld.z - targetWorld.z);
          }
        }
        /**
         * 设置偏移量
         */


        setOffset(offset) {
          this.initialOffset.set(offset);
        }
        /**
         * 瞬间移动到目标位置（不平滑）
         */


        snapToTarget() {
          if (!this.target) return;
          var targetWorld = this.target.worldPosition;
          var targetPosition = new Vec3(targetWorld.x + this.initialOffset.x, targetWorld.y + this.initialOffset.y, targetWorld.z + this.initialOffset.z);
          this.node.setWorldPosition(targetPosition);
          this.cameraParticleNode && this.cameraParticleNode.setWorldPosition(targetPosition);
        }
        /**
         * Boss出现回调 - 平滑拉高镜头（调整正交高度）
         */


        onBossSpawn(target) {
          if (target === void 0) {
            target = null;
          }

          if (this.isBossMode || !this.camera) return;
          this.isBossMode = true; //console.log(`[CameraFollow]  Boss出现，正交高度 ${this.normalOrthoHeight} → ${this.normalOrthoHeight + this.bossOrthoHeightIncrease}`);
          // 计算目标正交高度

          var targetHeight = this.normalOrthoHeight + this.bossOrthoHeightIncrease; // 创建缓动对象

          var tweenTarget = {
            height: this.camera.orthoHeight
          }; // 使用缓动平滑过渡

          tween(tweenTarget).to(this.zoomDuration, {
            height: targetHeight
          }, {
            easing: 'sineInOut',
            onUpdate: () => {
              if (this.camera) {
                this.camera.orthoHeight = tweenTarget.height;
              }

              if (this.cameraParticle) {
                this.cameraParticle.orthoHeight = tweenTarget.height;
              }
            }
          }).call(() => {//console.log('[CameraFollow]  镜头拉高完成');
          }).start();
        }

        onBossSpawn2(target, duration) {
          if (target === void 0) {
            target = null;
          }

          if (duration === void 0) {
            duration = 1.2;
          }

          // 计算目标正交高度
          var targetHeight = this.normalOrthoHeight; // 创建缓动对象

          var tweenTarget = {
            height: this.camera.orthoHeight
          }; // 使用缓动平滑过渡

          tween(tweenTarget).to(duration, {
            height: targetHeight
          }, {
            easing: 'sineInOut',
            onUpdate: () => {
              if (this.camera) {
                this.camera.orthoHeight = tweenTarget.height;
              }

              if (this.cameraParticle) {
                this.cameraParticle.orthoHeight = tweenTarget.height;
              }
            }
          }).call(() => {//console.log('[CameraFollow]  镜头拉高完成');
          }).start();
        }
        /**
         * 平滑移动镜头到指定世界坐标（带缓动）
         * @param worldPos 目标世界坐标
         * @param duration 缓动时长（秒）
         * @param onComplete 完成回调
         * @param delay 延迟时间（秒）
         */


        moveTo(worldPos, duration, onComplete, delay) {
          if (duration === void 0) {
            duration = 1.0;
          }

          if (delay === void 0) {
            delay = 0;
          }

          var startPos = this.node.worldPosition.clone();
          var tweenTarget = {
            x: startPos.x,
            y: startPos.y,
            z: startPos.z
          };
          tween(tweenTarget).to(duration, {
            x: worldPos.x,
            y: worldPos.y,
            z: worldPos.z
          }, {
            easing: 'sineInOut',
            "onUpdate": () => {
              this.node.setWorldPosition(tweenTarget.x, tweenTarget.y, tweenTarget.z);
              this.cameraParticleNode && this.cameraParticleNode.setWorldPosition(tweenTarget.x, tweenTarget.y, tweenTarget.z);
            }
          }).delay(delay).call(() => {
            if (onComplete) onComplete();
          }).start();
        }
        /**
         * 平滑移动镜头到指定目标节点（带缓动）
         * @param targetNode 目标节点
         * @param duration 缓动时长（秒）
         * @param onComplete 完成回调
         * @param delay 延迟时间（秒）
         */


        moveToTarget(targetNode, duration, onComplete, delay) {
          if (duration === void 0) {
            duration = 1.0;
          }

          if (delay === void 0) {
            delay = 0;
          }

          if (!targetNode || !targetNode.isValid) {
            if (onComplete) onComplete();
            return;
          }

          var targetWorld = targetNode.worldPosition;
          var offsetPos = new Vec3(targetWorld.x + this.initialOffset.x, targetWorld.y + this.initialOffset.y, targetWorld.z + this.initialOffset.z);
          this.moveTo(offsetPos, duration, onComplete, delay);
        }
        /**
         * 平滑偏移镜头（在当前位置基础上偏移）
         * @param deltaOffset 偏移量
         * @param duration 缓动时长（秒）
         * @param onComplete 完成回调
         */


        moveBy(deltaOffset, duration, onComplete) {
          if (duration === void 0) {
            duration = 1.0;
          }

          var currentPos = this.node.worldPosition;
          var targetPos = currentPos.add(deltaOffset);
          this.moveTo(targetPos, duration, onComplete);
        }

        bossSpawn(target) {
          if (target === void 0) {
            target = null;
          }

          this.onBossSpawn(target);
        }
        /**
         * 镜像方法：平滑拉低镜头（恢复到正常高度），可同时设置跟随目标
         */


        bossSpawn2(target, duration) {
          if (target === void 0) {
            target = null;
          }

          if (duration === void 0) {
            duration = this.zoomDuration;
          }

          if (!this.camera) return; // 使用当前相机高度作为起点，缓动到 normalOrthoHeight

          var tweenTarget = {
            height: this.camera.orthoHeight
          };
          var targetHeight = this.normalOrthoHeight;
          tween(tweenTarget).to(duration, {
            height: targetHeight
          }, {
            easing: 'sineInOut',
            onUpdate: () => {
              if (this.camera) {
                this.camera.orthoHeight = tweenTarget.height;
              }

              if (this.cameraParticle) {
                this.cameraParticle.orthoHeight = tweenTarget.height;
              }
            }
          }).call(() => {
            // 归位后关闭Boss模式标记
            this.isBossMode = false;
          }).start();
        }
        /**
         * 手动恢复镜头（由外部调用）
         */


        restoreCamera() {
          if (!this.isBossMode || !this.camera) {
            //console.warn('[CameraFollow] ️ 镜头不在Boss模式，无需恢复');
            return;
          }

          this.isBossMode = false; //console.log(`[CameraFollow]  手动恢复镜头，正交高度 ${this.camera.orthoHeight} → ${this.normalOrthoHeight}`);
          // 创建缓动对象

          var tweenTarget = {
            height: this.camera.orthoHeight
          }; // 使用缓动平滑恢复

          tween(tweenTarget).to(this.zoomDuration, {
            height: this.normalOrthoHeight
          }, {
            easing: 'sineInOut',
            onUpdate: () => {
              if (this.camera) {
                this.camera.orthoHeight = tweenTarget.height;
              }

              if (this.cameraParticle) {
                this.cameraParticle.orthoHeight = tweenTarget.height;
              }
            }
          }).call(() => {//console.log('[CameraFollow]  镜头恢复完成');
          }).start();
        }
        /**
         * 立即恢复镜头（不使用缓动）
         */


        restoreCameraInstant() {
          if (!this.isBossMode || !this.camera) return;
          this.isBossMode = false; //console.log('[CameraFollow]  立即恢复镜头');
          // 直接设置正交高度

          this.camera.orthoHeight = this.normalOrthoHeight;
          this.cameraParticle && (this.cameraParticle.orthoHeight = this.normalOrthoHeight);
        }
        /**
         * 检查是否处于Boss模式
         */


        isBossCamera() {
          return this.isBossMode;
        }
        /**
         * 玩家受伤回调 - Boss攻击时触发抖动
         */


        onPlayerHurt(damage, isBoss) {
          if (isBoss) {
            this.startShake();
          }
        }
        /**
         * 开始摄像机抖动
         */


        startShake(strength) {
          this.isShaking = true;
          this.shakeTimer = 0;
          var shakeStr = strength !== undefined ? strength : this.bossAttackShakeStrength; //console.log(`[CameraFollow]  摄像机抖动开始，强度: ${shakeStr}`);
        }
        /**
         * 更新抖动效果
         */


        updateShake(deltaTime) {
          if (!this.isShaking) {
            // 如果不在抖动，确保偏移为0
            this.shakeOffset.set(0, 0, 0);
            return;
          }

          this.shakeTimer += deltaTime;

          if (this.shakeTimer >= this.shakeDuration) {
            // 抖动结束
            this.isShaking = false;
            this.shakeOffset.set(0, 0, 0); //console.log('[CameraFollow]  摄像机抖动结束');

            return;
          } // 计算衰减强度（从100%衰减到0%）


          var progress = this.shakeTimer / this.shakeDuration;
          var decay = 1 - progress;
          var currentStrength = this.bossAttackShakeStrength * decay; // 生成随机抖动偏移（使用高频随机）

          this.shakeOffset.set((Math.random() - 0.5) * 2 * currentStrength, (Math.random() - 0.5) * 2 * currentStrength, 0 // Z轴不抖动
          );
        }
        /**
         * 停止摄像机抖动
         */


        stopShake() {
          this.isShaking = false;
          this.shakeTimer = 0;
          this.shakeOffset.set(0, 0, 0);
        }

        onDestroy() {// 清理事件监听
        }

      }, _class3.instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "cameraParticleNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "followSpeed", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "smoothFollow", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "offset", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(0, 800, -800);
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "autoCalculateOffset", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "bossOrthoHeightIncrease", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "zoomDuration", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2.0;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "bossAttackShakeStrength", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 20;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "shakeDuration", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.3;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "shakeFrequency", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 30;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7282f0e2467b33c88b615d924cf6f30d41cf1d46.js.map