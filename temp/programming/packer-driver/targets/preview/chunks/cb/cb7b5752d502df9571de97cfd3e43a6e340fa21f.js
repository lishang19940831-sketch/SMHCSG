System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, SkeletalAnimation, Color, Node, AnimationClip, MeshRenderer, game, Vec3, CCFloat, BaseAnimationComponent, ComponentEvent, ColorEffectType, Rotation3DUtils, Dissolve, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, ModelAnimationComponent;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBaseAnimationComponent(extras) {
    _reporterNs.report("BaseAnimationComponent", "./BaseAnimationComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../../Main/Common/ComponentEvents", _context.meta, extras);
  }

  function _reportPossibleCrUseOfColorEffectType(extras) {
    _reporterNs.report("ColorEffectType", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRotation3DUtils(extras) {
    _reporterNs.report("Rotation3DUtils", "../../Main/Common/Rotation3DUtils", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDissolve(extras) {
    _reporterNs.report("Dissolve", "../Tools/Dissolve", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      SkeletalAnimation = _cc.SkeletalAnimation;
      Color = _cc.Color;
      Node = _cc.Node;
      AnimationClip = _cc.AnimationClip;
      MeshRenderer = _cc.MeshRenderer;
      game = _cc.game;
      Vec3 = _cc.Vec3;
      CCFloat = _cc.CCFloat;
    }, function (_unresolved_2) {
      BaseAnimationComponent = _unresolved_2.BaseAnimationComponent;
    }, function (_unresolved_3) {
      ComponentEvent = _unresolved_3.ComponentEvent;
    }, function (_unresolved_4) {
      ColorEffectType = _unresolved_4.ColorEffectType;
    }, function (_unresolved_5) {
      Rotation3DUtils = _unresolved_5.Rotation3DUtils;
    }, function (_unresolved_6) {
      Dissolve = _unresolved_6.Dissolve;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "962d6v+G1RK84Ut4tOdCsTf", "ModelAnimationComponent", undefined);

      __checkObsolete__(['_decorator', 'SkeletalAnimation', 'AnimationState', 'Color', 'Component', 'Node', 'AnimationClip', 'MeshRenderer', 'game', 'Vec3', 'CCFloat']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 当前播放动画数据
       */

      /**
       * 模型动画组件 - 3D模型动画实现
       */
      _export("ModelAnimationComponent", ModelAnimationComponent = (_dec = ccclass('ModelAnimationComponent'), _dec2 = property({
        type: SkeletalAnimation,
        displayName: '动画组件',
        tooltip: '角色的SkeletalAnimation动画组件'
      }), _dec3 = property({
        type: Node,
        displayName: '模型节点',
        tooltip: '需要控制颜色的模型节点'
      }), _dec4 = property({
        type: CCFloat,
        displayName: '朝向平滑度',
        range: [0.1, 10.0],
        tooltip: '3D朝向旋转的平滑度，值越大旋转越快'
      }), _dec(_class = (_class2 = class ModelAnimationComponent extends (_crd && BaseAnimationComponent === void 0 ? (_reportPossibleCrUseOfBaseAnimationComponent({
        error: Error()
      }), BaseAnimationComponent) : BaseAnimationComponent) {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "animation", _descriptor, this);

          _initializerDefineProperty(this, "modelNode", _descriptor2, this);

          _initializerDefineProperty(this, "rotationSmoothness", _descriptor3, this);

          /** 默认骨骼颜色 */
          this.defaultColor = new Color(0, 0, 0, 255);

          /** 受伤效果颜色 (红色) */
          this.hurtColor = new Color(200, 0, 0, 255);

          /** 当前播放的动画数据 */
          this.currentAnimationData = null;

          /** 当前播放的动画状态 */
          this.currentAnimationState = null;
        }

        /**
         * 初始化动画组件
         */
        initAnimation() {
          if (!this.animation) {
            this.animation = this.getComponent(SkeletalAnimation);
          }

          if (!this.modelNode) {
            this.modelNode = this.node;
          } // 确保动画组件存在


          if (!this.animation) {
            //console.error('SkeletalAnimation 组件未找到，请检查节点配置');
            return;
          } // 不再监听引擎动画事件，改为自己计算
          // this.animation.on(SkeletalAnimation.EventType.FINISHED, this.onAnimationFinished, this);
          // this.animation.on(SkeletalAnimation.EventType.PLAY, this.onAnimationPlay, this);
          // this.animation.on(SkeletalAnimation.EventType.PAUSE, this.onAnimationPause, this);
          // this.animation.on(SkeletalAnimation.EventType.STOP, this.onAnimationStop, this);

        }

        onDestroy() {
          super.onDestroy(); // 移除事件监听器清理代码
          // if (this.animation) {
          //     this.animation.off(SkeletalAnimation.EventType.FINISHED, this.onAnimationFinished, this);
          //     this.animation.off(SkeletalAnimation.EventType.PLAY, this.onAnimationPlay, this);
          //     this.animation.off(SkeletalAnimation.EventType.PAUSE, this.onAnimationPause, this);
          //     this.animation.off(SkeletalAnimation.EventType.STOP, this.onAnimationStop, this);
          // }
        }
        /**
         * 更新函数
         */


        update(dt) {
          // 调用父类的update
          super.update(dt); // 更新动画时间

          this.updateAnimationTime(dt);
        }
        /**
         * 更新动画时间
         * @param dt 帧间隔时间
         */


        updateAnimationTime(dt) {
          if (!this.currentAnimationData || !this.currentAnimationData.isPlaying) {
            return;
          } // 根据时间缩放更新当前时间


          this.currentAnimationData.currentTime += dt * this.currentAnimationData.timeScale; // 检查动画是否完成

          if (this.currentAnimationData.currentTime >= this.currentAnimationData.duration) {
            if (this.currentAnimationData.isLoop) {
              // 循环动画，重置时间
              this.currentAnimationData.currentTime = this.currentAnimationData.currentTime % this.currentAnimationData.duration;
            } else {
              // 非循环动画，标记为完成
              this.currentAnimationData.currentTime = this.currentAnimationData.duration;
              this.currentAnimationData.isPlaying = false; // 触发动画完成回调

              this.onAnimationComplete();
            }
          }
        }

        onSlowStart(slowRatio, slowDuration) {
          var timeScale = slowRatio ? Math.max(0.6 - slowRatio, 0.1) : 1;
          this.setTimeScale(timeScale);
        }

        onSlowEnd() {
          this.resetTimeScale();
        }

        reset() {
          var _this$modelNode$getCo;

          super.reset();
          (_this$modelNode$getCo = this.modelNode.getComponent(_crd && Dissolve === void 0 ? (_reportPossibleCrUseOfDissolve({
            error: Error()
          }), Dissolve) : Dissolve)) == null || _this$modelNode$getCo.reset();
        }
        /**
         * 应用指定类型的颜色到模型
         * @param type 颜色效果类型
         */


        applyColorToAnimation(type) {
          if (!this.modelNode) return;
          var targetColor;

          switch (type) {
            case (_crd && ColorEffectType === void 0 ? (_reportPossibleCrUseOfColorEffectType({
              error: Error()
            }), ColorEffectType) : ColorEffectType).HURT:
              targetColor = this.hurtColor.clone();
              break;

            case (_crd && ColorEffectType === void 0 ? (_reportPossibleCrUseOfColorEffectType({
              error: Error()
            }), ColorEffectType) : ColorEffectType).SLOW:
              targetColor = this.slowColor.clone();
              break;

            case (_crd && ColorEffectType === void 0 ? (_reportPossibleCrUseOfColorEffectType({
              error: Error()
            }), ColorEffectType) : ColorEffectType).ELECTRIC_SHOCK:
              targetColor = this.electricShockColor.clone();
              break;

            default:
              targetColor = this.defaultColor.clone();
              break;
          } // 递归设置所有子节点的颜色


          this.setNodeColor(this.modelNode, targetColor);
        }
        /**
         * 递归设置节点及其子节点的颜色
         */


        setNodeColor(node, color) {
          if (node.name.startsWith('e_')) {
            return;
          } // 获取节点的渲染组件并设置颜色


          var meshRenderer = node.getComponent(MeshRenderer);

          if (meshRenderer) {
            // 通过材质设置颜色
            var material = meshRenderer.material;

            if (material) {
              material.setProperty('emissive', color);
            }
          } // 递归处理子节点


          for (var child of node.children) {
            this.setNodeColor(child, color);
          }
        }
        /**
         * 动画完成回调
         */


        onAnimationComplete() {
          var _this$currentAnimatio;

          var currentAnimName = ((_this$currentAnimatio = this.currentAnimationData) == null ? void 0 : _this$currentAnimatio.name) || ''; // 发送动画完成事件

          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).ANIMATION_COMPLETE, currentAnimName);

          if (currentAnimName === this.attackAnimName || currentAnimName === this.runAttackAnimName) {
            this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
              error: Error()
            }), ComponentEvent) : ComponentEvent).ATTACK_ANI_COMPLETE, currentAnimName);
          }
        }
        /**
         * 更新角色朝向（从X方向值）
         */


        updateFaceDirection(directionX, rotationSmoothness) {
          if (rotationSmoothness === void 0) {
            rotationSmoothness = -1;
          }

          if (directionX === 0) return; // 使用3D旋转工具类来处理朝向，传入当前的帧时间

          var deltaTime = game.deltaTime;
          (_crd && Rotation3DUtils === void 0 ? (_reportPossibleCrUseOfRotation3DUtils({
            error: Error()
          }), Rotation3DUtils) : Rotation3DUtils).updateYRotationFromX(this.node, directionX, rotationSmoothness > 0 ? rotationSmoothness : this.rotationSmoothness, deltaTime);
          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).FACE_DIRECTION_CHANGED, directionX);
        }
        /**
         * 根据3D方向向量更新朝向
         */


        updateFaceDirectionFrom3D(direction, rotationSmoothness) {
          if (rotationSmoothness === void 0) {
            rotationSmoothness = -1;
          }

          if (Vec3.equals(direction, Vec3.ZERO)) return; // 使用3D旋转工具类来处理朝向，传入当前的帧时间

          var deltaTime = game.deltaTime;
          var horizontalDirection = (_crd && Rotation3DUtils === void 0 ? (_reportPossibleCrUseOfRotation3DUtils({
            error: Error()
          }), Rotation3DUtils) : Rotation3DUtils).toHorizontalDirection(direction);
          (_crd && Rotation3DUtils === void 0 ? (_reportPossibleCrUseOfRotation3DUtils({
            error: Error()
          }), Rotation3DUtils) : Rotation3DUtils).faceDirection(this.node, horizontalDirection, rotationSmoothness > 0 ? rotationSmoothness : this.rotationSmoothness, deltaTime); // 发送朝向改变事件

          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).FACE_DIRECTION_CHANGED, direction.x);
        }
        /**
         * 播放空闲动画
         */


        playIdle() {
          this.playAnimation(this.idleAnimName, true);
        }
        /**
         * 播放移动动画
         */


        playMove(timeScale) {
          this.playAnimation(this.moveAnimName, true, timeScale ? timeScale : 1, 0.1);
        }
        /**
         * 播放攻击动画
         * @param timeScale 动画播放速度
         * @param isLoop 是否循环
         */


        playAttack(timeScale, isLoop) {
          if (isLoop === void 0) {
            isLoop = false;
          }

          this.playAnimation(this.attackAnimName, isLoop, timeScale);
        }
        /**
         * 播放死亡动画
         */


        playDead() {
          this.playAnimation(this.deadAnimName, false);
        }
        /**
         * 播放移动攻击动画
         * @param timeScale 动画播放速度
         * @param isLoop 是否循环
         */


        playRunAttack(timeScale, isLoop) {
          if (isLoop === void 0) {
            isLoop = false;
          }

          this.playAnimation(this.runAttackAnimName, isLoop, timeScale);
        }

        playDissolve() {
          var _this$modelNode$getCo2;

          (_this$modelNode$getCo2 = this.modelNode.getComponent(_crd && Dissolve === void 0 ? (_reportPossibleCrUseOfDissolve({
            error: Error()
          }), Dissolve) : Dissolve)) == null || _this$modelNode$getCo2.Dissolve(); // this.modelNode.getComponent(Dissolve)?.DissolveUp();
          // this.modelNode.getComponent(Dissolve)?.DissolveExpand();
        }
        /**
         * 播放指定动画
         * @param name 动画名称
         * @param loop 是否循环播放
         * @param timeScale 动画播放速度，默认为1
         */


        playAnimation(name, loop, timeScale, crossFade) {
          if (timeScale === void 0) {
            timeScale = 1;
          }

          if (crossFade === void 0) {
            crossFade = 0.1;
          }

          if (!this.animation) {
            //console.error('SkeletalAnimation 组件未找到');
            return;
          } // 检查动画剪辑是否存在


          var clips = this.animation.clips;
          var clip = clips.find(clip => clip && clip.name === name);

          if (!clip) {
            //console.warn(`动画剪辑 ${name} 未找到`);
            return;
          } // 检查是否已经在播放相同动画


          if (this.currentAnimationData && this.currentAnimationData.name === name && this.currentAnimationData.isPlaying && this.currentAnimationData.isLoop === loop && loop) {
            return;
          }

          var isNoAni = false; // 创建或获取动画状态

          var state = this.animation.getState(name);

          if (!state) {
            state = this.animation.createState(clip, name);
            isNoAni = true;
          }

          if (!state) {
            //console.error(`无法创建动画状态: ${name}`);
            return;
          } // 设置循环模式


          state.wrapMode = loop ? AnimationClip.WrapMode.Loop : AnimationClip.WrapMode.Normal; // 设置播放速度

          state.speed = timeScale; // 播放动画

          if (crossFade > 0 && !isNoAni) {
            this.animation.crossFade(name, crossFade);
          } else {
            this.animation.play(name);
          }

          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).PLAY_ANIMATION_START, {
            name,
            loop,
            timeScale,
            crossFade
          }); // 更新当前动画数据

          this.currentAnimationData = {
            name,
            duration: state.duration,
            frameRate: state.frameRate,
            isLoop: loop,
            currentTime: 0,
            timeScale: timeScale,
            isPlaying: true
          }; // 保存当前动画状态引用

          this.currentAnimationState = state; // console.log(`开始播放动画: ${name}, 时长: ${state.duration}秒, 循环: ${loop}, 时间缩放: ${timeScale}`);
        }
        /**
         * 设置动画播放速度
         * @param timeScale 时间缩放值，大于1加速，小于1减速
         */


        setTimeScale(timeScale) {
          if (!this.animation) return; // 如果有当前播放的动画状态，设置其速度

          if (this.currentAnimationState) {
            this.currentAnimationState.speed = timeScale;
          } // 更新当前动画数据的时间缩放


          if (this.currentAnimationData) {
            this.currentAnimationData.timeScale = timeScale;
          }
        }
        /**
         * 重置时间缩放为默认值
         */


        resetTimeScale() {
          this.setTimeScale(this.defaultTimeScale);
        }
        /**
         * 获取动画时长
         * @param animName 动画名称，不传则获取当前动画时长
         * @returns 动画时长(秒)
         */


        getAnimationDuration(animName) {
          if (!this.animation) return 0;

          if (animName) {
            var state = this.animation.getState(animName); // state.duration 已经是秒为单位的实际时长

            return state ? state.duration : 0;
          } else if (this.currentAnimationData) {
            // currentAnimationData.duration 也是秒为单位
            return this.currentAnimationData.duration;
          }

          return 0;
        }
        /**
         * 获取当前动画节点
         */


        getAnimationNode() {
          return this.modelNode;
        }
        /**
         * 获取当前动画帧事件进度
         * 用于在指定时间点触发攻击等效果
         * @returns 当前动画进度(0-1)
         */


        getCurrentAnimationProgress() {
          if (!this.currentAnimationData || !this.currentAnimationData.isPlaying) {
            return 0;
          }

          if (this.currentAnimationData.duration <= 0) {
            return 0;
          }

          return Math.min(1, this.currentAnimationData.currentTime / this.currentAnimationData.duration);
        }
        /**
         * 获取当前动画名称
         * @returns 当前动画名称
         */


        getCurrentAnimationName() {
          var _this$currentAnimatio2;

          return ((_this$currentAnimatio2 = this.currentAnimationData) == null ? void 0 : _this$currentAnimatio2.name) || '';
        }
        /**
         * 停止当前动画
         */


        stopAnimation() {
          if (this.animation) {
            this.animation.stop();
          }

          if (this.currentAnimationData) {
            this.currentAnimationData.isPlaying = false;
          }

          this.currentAnimationState = null;
        }
        /**
         * 暂停当前动画
         */


        pauseAnimation() {
          if (this.animation) {
            this.animation.pause();
          }

          if (this.currentAnimationData) {
            this.currentAnimationData.isPlaying = false;
          }
        }
        /**
         * 恢复当前动画
         */


        resumeAnimation() {
          if (this.animation && this.currentAnimationData) {
            this.animation.resume();
            this.currentAnimationData.isPlaying = true;
          }
        }
        /**
         * 判断当前是否有动画正在播放
         * @returns 是否正在播放动画
         */


        isPlayingAnimation() {
          var _this$currentAnimatio3;

          return ((_this$currentAnimatio3 = this.currentAnimationData) == null ? void 0 : _this$currentAnimatio3.isPlaying) || false;
        }
        /**
         * 获取所有动画名称
         * @returns 动画名称数组
         */


        getAllAnimationNames() {
          if (!this.animation || !this.animation.clips) {
            return [];
          }

          return this.animation.clips.filter(clip => clip && clip.name).map(clip => clip.name);
        }
        /**
         * 获取动画组件
         */


        getAnimationComponent() {
          return this.animation;
        }
        /**
         * 交叉淡入淡出播放动画
         * @param name 动画名称
         * @param fadeTime 淡入淡出时间
         * @param loop 是否循环播放
         * @param timeScale 动画播放速度
         */


        crossFadeAnimation(name, fadeTime, loop, timeScale) {
          if (fadeTime === void 0) {
            fadeTime = 0.3;
          }

          if (loop === void 0) {
            loop = false;
          }

          if (timeScale === void 0) {
            timeScale = 1;
          }

          if (!this.animation) {
            //console.error('SkeletalAnimation 组件未找到');
            return;
          } // 检查动画剪辑是否存在


          var clips = this.animation.clips;
          var clip = clips.find(clip => clip && clip.name === name);

          if (!clip) {
            //console.warn(`动画剪辑 ${name} 未找到`);
            return;
          } // 创建或获取动画状态


          var state = this.animation.getState(name);

          if (!state) {
            state = this.animation.createState(clip, name);
          }

          if (!state) {
            //console.error(`无法创建动画状态: ${name}`);
            return;
          } // 设置循环模式和播放速度


          state.wrapMode = loop ? AnimationClip.WrapMode.Loop : AnimationClip.WrapMode.Normal;
          state.speed = timeScale; // 使用交叉淡入淡出播放

          this.animation.crossFade(name, fadeTime); // 更新当前动画数据

          this.currentAnimationData = {
            name,
            duration: state.duration,
            frameRate: state.frameRate,
            isLoop: loop,
            currentTime: 0,
            timeScale: timeScale,
            isPlaying: true
          }; // 保存当前动画状态引用

          this.currentAnimationState = state; // console.log(`交叉淡入淡出播放动画: ${name}, 淡入淡出时间: ${fadeTime}秒`);
        }
        /**
         * 检查动画剪辑是否存在
         * @param name 动画名称
         * @returns 是否存在
         */


        hasAnimation(name) {
          if (!this.animation || !this.animation.clips) {
            return false;
          }

          return this.animation.clips.some(clip => clip && clip.name === name);
        }
        /**
         * 获取动画状态
         * @param name 动画名称
         * @returns 动画状态
         */


        getAnimationState(name) {
          if (!this.animation) {
            return null;
          }

          return this.animation.getState(name) || null;
        }
        /**
         * 从指定进度开始播放动画
         * @param name 动画名称
         * @param loop 是否循环播放
         * @param timeScale 动画播放速度
         * @param startProgress 起始进度(0-1)
         * @param crossFade 淡入淡出时间
         */


        playAnimationFromProgress(name, loop, timeScale, startProgress, crossFade) {
          if (timeScale === void 0) {
            timeScale = 1;
          }

          if (startProgress === void 0) {
            startProgress = 0;
          }

          if (crossFade === void 0) {
            crossFade = 0.1;
          }

          if (!this.animation) return; // 检查动画是否存在

          var clip = this.animation.clips.find(clip => clip && clip.name === name);

          if (!clip) {
            //console.warn(`动画 ${name} 未找到`);
            return;
          } // 获取动画状态


          var state = this.animation.getState(name);

          if (!state) {
            //console.warn(`无法获取动画状态: ${name}`);
            return;
          } // 设置循环模式


          state.wrapMode = loop ? AnimationClip.WrapMode.Loop : AnimationClip.WrapMode.Normal; // 设置播放速度

          state.speed = timeScale; // 播放动画

          if (crossFade > 0) {
            this.animation.crossFade(name, crossFade);
          } else {
            this.animation.play(name);
          } // 设置起始时间


          if (startProgress > 0) {
            state.time = state.duration * Math.max(0, Math.min(1, startProgress));
          }

          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).PLAY_ANIMATION_START, {
            name,
            loop,
            timeScale,
            crossFade
          }); // 更新当前动画数据

          this.currentAnimationData = {
            name,
            duration: state.duration,
            frameRate: state.frameRate,
            isLoop: loop,
            currentTime: state.time,
            timeScale: timeScale,
            isPlaying: true
          }; // 保存当前动画状态引用

          this.currentAnimationState = state;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "animation", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "modelNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rotationSmoothness", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=cb7b5752d502df9571de97cfd3e43a6e340fa21f.js.map