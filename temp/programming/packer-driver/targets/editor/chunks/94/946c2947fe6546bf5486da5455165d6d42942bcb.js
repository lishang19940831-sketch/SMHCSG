System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Animation, AnimationClip, Node, Sprite, BaseAnimationComponent, ColorEffectType, ComponentEvent, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, FrameAnimationComponent;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBaseAnimationComponent(extras) {
    _reporterNs.report("BaseAnimationComponent", "./BaseAnimationComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfColorEffectType(extras) {
    _reporterNs.report("ColorEffectType", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../../Main/Common/ComponentEvents", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Animation = _cc.Animation;
      AnimationClip = _cc.AnimationClip;
      Node = _cc.Node;
      Sprite = _cc.Sprite;
    }, function (_unresolved_2) {
      BaseAnimationComponent = _unresolved_2.BaseAnimationComponent;
    }, function (_unresolved_3) {
      ColorEffectType = _unresolved_3.ColorEffectType;
    }, function (_unresolved_4) {
      ComponentEvent = _unresolved_4.ComponentEvent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "21ad5mp4ctKnqva1hDeJtXS", "FrameAnimationComponent", undefined);

      __checkObsolete__(['_decorator', 'Animation', 'AnimationClip', 'AnimationState', 'Color', 'Component', 'math', 'Node', 'Sprite', 'SpriteFrame']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 帧动画组件 - 使用序列帧实现动画效果
       */

      _export("FrameAnimationComponent", FrameAnimationComponent = (_dec = ccclass('FrameAnimationComponent'), _dec2 = property({
        type: Animation,
        displayName: '动画组件',
        tooltip: '角色的Animation组件'
      }), _dec3 = property({
        type: Node,
        displayName: '动画节点',
        tooltip: '显示动画的节点'
      }), _dec(_class = (_class2 = class FrameAnimationComponent extends (_crd && BaseAnimationComponent === void 0 ? (_reportPossibleCrUseOfBaseAnimationComponent({
        error: Error()
      }), BaseAnimationComponent) : BaseAnimationComponent) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "animation", _descriptor, this);

          _initializerDefineProperty(this, "animationNode", _descriptor2, this);

          /** 当前播放的动画名称 */
          this.currentAnimName = '';
        }

        updateFaceDirection(directionX) {
          throw new Error('Method not implemented.');
        }

        updateFaceDirectionFrom3D(direction) {
          throw new Error('Method not implemented.');
        }

        /**
         * 初始化帧动画
         */
        initAnimation() {
          if (!this.animation) {
            this.animation = this.getComponent(Animation);
          }

          if (!this.animationNode) {
            this.animationNode = this.node;
          }

          if (this.animation) {
            this.animation.on(Animation.EventType.FINISHED, this.onAnimationComplete, this); // 确保动画组件已经加载了所有的动画剪辑

            if (!this.animation.clips.find(clip => clip && clip.name === this.idleAnimName)) {//console.warn(`动画剪辑 ${this.idleAnimName} 未找到，请检查Animation组件配置`);
            }
          }
        }

        onSlowStart(slowRatio, slowDuration) {
          if (this.animation) {
            // 对于帧动画，减速通过降低动画速度实现
            const state = this.animation.getState(this.currentAnimName);

            if (state) {
              state.speed = slowRatio ? Math.max(0.8 - slowRatio, 0.1) : 1;
            }
          }
        }

        onSlowEnd() {
          this.resetTimeScale();
        }
        /**
         * 应用指定类型的颜色到精灵
         * @param type 颜色效果类型
         */


        applyColorToAnimation(type) {
          if (!this.animationNode) return; // 获取渲染组件 (Sprite)

          const renderComp = this.animationNode.getComponent(Sprite);
          if (!renderComp) return;

          switch (type) {
            case (_crd && ColorEffectType === void 0 ? (_reportPossibleCrUseOfColorEffectType({
              error: Error()
            }), ColorEffectType) : ColorEffectType).HURT:
              renderComp.color = this.hurtColor.clone();
              break;

            case (_crd && ColorEffectType === void 0 ? (_reportPossibleCrUseOfColorEffectType({
              error: Error()
            }), ColorEffectType) : ColorEffectType).SLOW:
              renderComp.color = this.slowColor.clone();
              break;

            case (_crd && ColorEffectType === void 0 ? (_reportPossibleCrUseOfColorEffectType({
              error: Error()
            }), ColorEffectType) : ColorEffectType).ELECTRIC_SHOCK:
              renderComp.color = this.electricShockColor.clone();
              break;

            default:
              renderComp.color = this.defaultColor.clone();
              break;
          }
        }
        /**
         * 动画完成回调
         */


        onAnimationComplete() {
          // 发送动画完成事件
          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).ANIMATION_COMPLETE, this.currentAnimName);

          if (this.currentAnimName === this.attackAnimName || this.currentAnimName === this.runAttackAnimName) {
            this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
              error: Error()
            }), ComponentEvent) : ComponentEvent).ATTACK_ANI_COMPLETE, this.currentAnimName);
          }
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
          this.playAnimation(this.moveAnimName, true);
        }
        /**
         * 播放攻击动画
         * @param timeScale 动画播放速度
         */


        playAttack(timeScale = 1, isLoop = false) {
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
         */


        playRunAttack(timeScale = 1, isLoop = false) {
          this.playAnimation(this.runAttackAnimName, isLoop, timeScale);
        }
        /**
         * 播放指定动画
         * @param name 动画名称
         * @param loop 是否循环播放
         * @param timeScale 动画播放速度，默认为1
         */


        playAnimation(name, loop, timeScale = 1, isShowLight = false) {
          if (!this.animation) return; // 检查动画是否存在

          if (!this.animation.clips.find(clip => clip && clip.name === name)) {
            //console.warn(`动画 ${name} 未找到`);
            return;
          } // 如果正在播放相同的动画，不重复播放


          if (this.currentAnimName === name && this.animation.getState(name).isPlaying && loop) {
            return;
          }

          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).PLAY_ANIMATION_START, {
            name,
            loop,
            timeScale,
            crossFade: 0
          }); // 保存当前播放的动画名称

          this.currentAnimName = name; // 设置循环模式并播放动画

          const state = this.animation.getState(name);

          if (state) {
            state.wrapMode = loop ? AnimationClip.WrapMode.Loop : AnimationClip.WrapMode.Normal; // 播放动画

            this.animation.play(name); // 设置时间缩放

            if (timeScale !== undefined) {
              this.setTimeScale(timeScale);
            } else {
              this.resetTimeScale();
            }
          }
        }
        /**
         * 设置动画播放速度
         * @param timeScale 时间缩放值，大于1加速，小于1减速
         */


        setTimeScale(timeScale) {
          if (!this.animation) return; // 对于帧动画，修改当前动画状态的速度

          const state = this.animation.getState(this.currentAnimName);

          if (state) {
            state.speed = timeScale;
          }
        }
        /**
         * 重置时间缩放为默认值
         */


        resetTimeScale() {
          if (!this.animation) return;
          const state = this.animation.getState(this.currentAnimName);

          if (state) {
            state.speed = this.defaultTimeScale;
          }
        }
        /**
         * 获取动画时长
         * @param animName 动画名称，不传则获取当前动画时长
         * @returns 动画时长(秒)
         */


        getAnimationDuration(animName) {
          if (!this.animation) return 0;
          let duration = 0;
          const clipName = animName || this.currentAnimName;

          if (clipName) {
            const state = this.animation.getState(clipName);
            duration = state ? state.duration : 0;
          } else {
            const currentState = this.animation.getState(this.currentAnimName);
            duration = currentState ? currentState.duration : 0;
          }

          return duration;
        }
        /**
         * 获取当前动画节点
         */


        getAnimationNode() {
          return this.animationNode;
        }
        /**
         * 获取当前动画帧事件进度
         * @returns 当前动画进度(0-1)
         */


        getCurrentAnimationProgress() {
          if (!this.animation) return 0;
          const state = this.animation.getState(this.currentAnimName);
          if (!state) return 0;
          return state.time / state.duration;
        }
        /**
         * 获取当前动画名称
         * @returns 当前动画名称
         */


        getCurrentAnimationName() {
          return this.currentAnimName;
        }
        /**
         * 获取当前动画是否正在播放
         * @returns 是否正在播放
         */


        isPlayingAnimation() {
          var _this$animation$getSt;

          return ((_this$animation$getSt = this.animation.getState(this.currentAnimName)) == null ? void 0 : _this$animation$getSt.isPlaying) || false;
        }
        /**
         * 从指定进度开始播放动画
         * @param name 动画名称
         * @param loop 是否循环播放
         * @param timeScale 动画播放速度
         * @param startProgress 起始进度(0-1)
         */


        playAnimationFromProgress(name, loop, timeScale = 1, startProgress = 0) {
          if (!this.animation) return; // 检查动画是否存在

          if (!this.animation.clips.find(clip => clip && clip.name === name)) {
            //console.warn(`动画 ${name} 未找到`);
            return;
          }

          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).PLAY_ANIMATION_START, {
            name,
            loop,
            timeScale,
            crossFade: 0
          }); // 保存当前播放的动画名称

          this.currentAnimName = name; // 设置循环模式并播放动画

          const state = this.animation.getState(name);

          if (state) {
            state.wrapMode = loop ? AnimationClip.WrapMode.Loop : AnimationClip.WrapMode.Normal; // 播放动画

            this.animation.play(name); // 设置起始时间

            if (startProgress > 0) {
              state.time = state.duration * Math.max(0, Math.min(1, startProgress));
            } // 设置时间缩放


            if (timeScale !== undefined) {
              this.setTimeScale(timeScale);
            } else {
              this.resetTimeScale();
            }
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "animation", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "animationNode", [_dec3], {
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
//# sourceMappingURL=946c2947fe6546bf5486da5455165d6d42942bcb.js.map