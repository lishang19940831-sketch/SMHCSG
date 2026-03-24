System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, ComponentEvent, ColorEffectType, FrameEventId, BaseComponet, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, BaseAnimationComponent;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../../Main/Common/ComponentEvents", _context.meta, extras);
  }

  function _reportPossibleCrUseOfColorEffectType(extras) {
    _reporterNs.report("ColorEffectType", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfFrameEventId(extras) {
    _reporterNs.report("FrameEventId", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBaseComponet(extras) {
    _reporterNs.report("BaseComponet", "./BaseComponet", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Color = _cc.Color;
    }, function (_unresolved_2) {
      ComponentEvent = _unresolved_2.ComponentEvent;
    }, function (_unresolved_3) {
      ColorEffectType = _unresolved_3.ColorEffectType;
      FrameEventId = _unresolved_3.FrameEventId;
    }, function (_unresolved_4) {
      BaseComponet = _unresolved_4.BaseComponet;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "18185PQ9pdKC4bKcnttzfaU", "BaseAnimationComponent", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Component', 'Node', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 颜色效果数据
       */

      /**
       * 帧事件数据
       */

      /**
       * 基础动画组件 - 所有动画组件的父类，包含通用逻辑
       */
      _export("BaseAnimationComponent", BaseAnimationComponent = (_dec = ccclass('BaseAnimationComponent'), _dec2 = property({
        displayName: '空闲动画名称'
      }), _dec3 = property({
        displayName: '移动动画名称'
      }), _dec4 = property({
        displayName: '攻击动画名称'
      }), _dec5 = property({
        displayName: '死亡动画名称'
      }), _dec6 = property({
        displayName: '攻击动画名称'
      }), _dec(_class = (_class2 = class BaseAnimationComponent extends (_crd && BaseComponet === void 0 ? (_reportPossibleCrUseOfBaseComponet({
        error: Error()
      }), BaseComponet) : BaseComponet) {
        constructor() {
          super(...arguments);

          /** 空闲动画名称 */
          _initializerDefineProperty(this, "idleAnimName", _descriptor, this);

          /** 移动动画名称 */
          _initializerDefineProperty(this, "moveAnimName", _descriptor2, this);

          /** 攻击动画名称 */
          _initializerDefineProperty(this, "attackAnimName", _descriptor3, this);

          /** 死亡动画名称 */
          _initializerDefineProperty(this, "deadAnimName", _descriptor4, this);

          /** 攻击动画名称 */
          _initializerDefineProperty(this, "runAttackAnimName", _descriptor5, this);

          /** 默认时间缩放 */
          this.defaultTimeScale = 1.0;

          /** 默认骨骼颜色 */
          this.defaultColor = new Color(255, 255, 255, 255);

          /** 受伤效果颜色 (红色) */
          this.hurtColor = new Color(255, 0, 0, 255);

          /** a减速效果颜色 (蓝色) */
          this.slowColor = new Color(90, 155, 255, 255);

          /** 电击效果颜色 (蓝色) */
          this.electricShockColor = new Color(90, 255, 255, 255);

          /** 当前显示的颜色效果类型 */
          this.currentDisplayColorEffect = (_crd && ColorEffectType === void 0 ? (_reportPossibleCrUseOfColorEffectType({
            error: Error()
          }), ColorEffectType) : ColorEffectType).NORMAL;

          /** 所有活跃的颜色效果 */
          this.colorEffects = new Map();

          /** 帧事件列表 */
          this.frameEvents = [];

          /** 上一帧的动画进度，用于检测进度变化 */
          this.lastAnimationProgress = 0;
        }

        get IdleAnimName() {
          return this.idleAnimName;
        }

        set IdleAnimName(name) {
          this.idleAnimName = name;
        }

        get MoveAnimName() {
          return this.moveAnimName;
        }

        set MoveAnimName(name) {
          this.moveAnimName = name;
        }

        get AttackAnimName() {
          return this.attackAnimName;
        }

        set AttackAnimName(name) {
          this.attackAnimName = name;
        }

        get DeadAnimName() {
          return this.deadAnimName;
        }

        get RunAttackAnimName() {
          return this.runAttackAnimName;
        }

        set RunAttackAnimName(name) {
          this.runAttackAnimName = name;
        }

        onLoad() {
          super.onLoad();
          this.initAnimation();
          this.registerEvents();
        }

        onDestroy() {
          this.unregisterEvents();
        }
        /**
         * 初始化动画组件
         */


        /**
         * 注册事件监听
         */
        registerEvents() {
          // 监听应用颜色效果事件
          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).APPLY_COLOR_EFFECT, this.onApplyColorEffect, this); // 监听取消颜色效果事件

          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).CANCEL_COLOR_EFFECT, this.onCancelColorEffect, this); // 监听减速开始事件

          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).SLOW_START, this.onSlowStart, this); // 监听减速结束事件

          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).SLOW_END, this.onSlowEnd, this); // 监听设置朝向事件

          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).SET_FACE_DIRECTION, this.updateFaceDirection, this); // 监听设置朝向事件

          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).SET_FACE_DIRECTION_FROM_3D, this.updateFaceDirectionFrom3D, this);
        }
        /**
         * 注销事件监听
         */


        unregisterEvents() {
          this.node.off((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).APPLY_COLOR_EFFECT, this.onApplyColorEffect, this);
          this.node.off((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).CANCEL_COLOR_EFFECT, this.onCancelColorEffect, this);
          this.node.off((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).SLOW_START, this.onSlowStart, this);
          this.node.off((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).SLOW_END, this.onSlowEnd, this);
          this.node.off((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).SET_FACE_DIRECTION, this.updateFaceDirection, this);
          this.node.off((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).SET_FACE_DIRECTION_FROM_3D, this.updateFaceDirectionFrom3D, this);
        }
        /**
         * 处理应用颜色效果事件
         * @param eventData 事件数据
         */


        onApplyColorEffect(eventData) {
          if (!eventData || eventData.type === undefined || eventData.duration === undefined) {
            return;
          }

          this.applyColorEffect(eventData.type, eventData.duration);
        }
        /**
         * 处理取消颜色效果事件
         * @param type 颜色效果类型
         */


        onCancelColorEffect(type) {
          this.cancelColorEffect(type);
        }

        update(dt) {
          this.updateColorEffects(dt);
          this.updateFrameEvents();
        }
        /**
         * 更新所有颜色效果
         * @param dt 帧间隔时间
         */


        updateColorEffects(dt) {
          var needUpdateColor = false; // 更新所有效果的计时器

          for (var [_type, effectData] of this.colorEffects.entries()) {
            if (!effectData.active) continue;
            effectData.timer += dt;

            if (effectData.timer >= effectData.duration) {
              // 效果结束，标记为非活跃
              effectData.active = false;
              needUpdateColor = true;
            }
          } // 如果有效果状态变化，更新显示的颜色


          if (needUpdateColor) {
            this.updateDisplayColorEffect();
          }
        }
        /**
         * 更新帧事件
         */


        updateFrameEvents() {
          if (this.frameEvents.length === 0) {
            return;
          }

          var currentProgress = this.getCurrentAnimationProgress(); // 遍历所有帧事件

          for (var frameEvent of this.frameEvents) {
            // 如果是一次性事件且已经触发过，跳过
            if (frameEvent.once && frameEvent.triggered) {
              continue;
            } // 检查是否需要触发事件


            var shouldTrigger = this.shouldTriggerFrameEvent(frameEvent, currentProgress);

            if (shouldTrigger) {
              try {
                frameEvent.callback();
                frameEvent.triggered = true;
              } catch (error) {//console.error(`帧事件回调执行失败 (ID: ${frameEvent.id}):`, error);
              }
            }
          } // 更新上一帧进度


          this.lastAnimationProgress = currentProgress;
        }
        /**
         * 判断是否应该触发帧事件
         * @param frameEvent 帧事件
         * @param currentProgress 当前进度
         * @return 是否应该触发
         */


        shouldTriggerFrameEvent(frameEvent, currentProgress) {
          // 如果进度没有变化，不触发
          if (currentProgress === this.lastAnimationProgress) {
            return false;
          } // 检查是否跨越了触发点
          // 情况1：正常播放，从小进度到大进度


          if (this.lastAnimationProgress < frameEvent.progress && currentProgress >= frameEvent.progress) {
            return true;
          } // 情况2：循环动画重新开始，进度从接近1跳回到0附近


          if (this.lastAnimationProgress > 0.9 && currentProgress < 0.1) {
            // 如果事件进度很小，说明应该在循环开始时触发
            if (frameEvent.progress <= currentProgress) {
              // 重置非一次性事件的触发状态
              if (!frameEvent.once) {
                frameEvent.triggered = false;
              }

              return true;
            }
          }

          return false;
        }
        /**
         * 更新显示的颜色效果
         * 选择当前活跃的最高优先级效果
         */


        updateDisplayColorEffect() {
          // 默认为正常颜色
          var highestPriorityEffect = (_crd && ColorEffectType === void 0 ? (_reportPossibleCrUseOfColorEffectType({
            error: Error()
          }), ColorEffectType) : ColorEffectType).NORMAL; // 找出当前活跃的最高优先级效果

          for (var [_type2, effectData] of this.colorEffects.entries()) {
            if (effectData.active && _type2 > highestPriorityEffect) {
              highestPriorityEffect = _type2;
            }
          } // 如果最高优先级效果变化，应用新的颜色


          if (highestPriorityEffect !== this.currentDisplayColorEffect) {
            this.currentDisplayColorEffect = highestPriorityEffect;
            this.applyColorToAnimation(highestPriorityEffect);
          }
        }
        /**
         * 应用指定类型的颜色到动画
         * @param type 颜色效果类型
         */


        /**
         * 应用颜色效果
         * @param type 颜色效果类型
         * @param duration 持续时间(秒)
         */
        applyColorEffect(type, duration) {
          if (type === (_crd && ColorEffectType === void 0 ? (_reportPossibleCrUseOfColorEffectType({
            error: Error()
          }), ColorEffectType) : ColorEffectType).NORMAL) return; // 创建或更新效果数据

          var effectData = {
            type,
            duration,
            timer: 0,
            active: true
          }; // 保存/更新效果

          this.colorEffects.set(type, effectData); // 更新显示的颜色

          this.updateDisplayColorEffect();
        }
        /**
         * 取消指定类型的颜色效果
         * @param type 要取消的颜色效果类型
         */


        cancelColorEffect(type) {
          // 如果效果存在且活跃，将其标记为非活跃
          var effectData = this.colorEffects.get(type);

          if (effectData && effectData.active) {
            effectData.active = false;
            this.updateDisplayColorEffect();
          }
        }
        /**
         * 重置所有颜色效果
         */


        resetAllColorEffects() {
          this.colorEffects.clear();
          this.currentDisplayColorEffect = (_crd && ColorEffectType === void 0 ? (_reportPossibleCrUseOfColorEffectType({
            error: Error()
          }), ColorEffectType) : ColorEffectType).NORMAL;
          this.applyColorToAnimation((_crd && ColorEffectType === void 0 ? (_reportPossibleCrUseOfColorEffectType({
            error: Error()
          }), ColorEffectType) : ColorEffectType).NORMAL);
        }
        /**
         * 动画完成回调
         */

        /**
         * 根据X方向更新朝向
         */

        /**
         * 根据3D方向向量更新朝向
         */

        /**
         * 播放空闲动画
         */

        /**
         * 播放移动动画
         */

        /**
         * 播放攻击动画
         * @param timeScale 动画播放速度
         */

        /**
         * 播放死亡动画
         */

        /**
         * 播放移动攻击动画
         * @param timeScale 动画播放速度
         */

        /**
         * 播放指定动画
         * @param name 动画名称
         * @param loop 是否循环播放
         * @param timeScale 动画播放速度，默认为1
         */

        /**
         * 从指定进度开始播放动画
         * @param name 动画名称
         * @param loop 是否循环播放
         * @param timeScale 动画播放速度，默认为1
         * @param startProgress 起始进度(0-1)
         */

        /**
         * 设置动画播放速度
         * @param timeScale 时间缩放值，大于1加速，小于1减速
         */

        /**
         * 重置时间缩放为默认值
         */

        /**
         * 获取动画时长
         * @param animName 动画名称，不传则获取当前动画时长
         * @returns 动画时长(秒)
         */

        /**
         * 获取当前动画节点
         */

        /**
         * 获取当前动画帧事件进度
         * 用于在指定时间点触发攻击等效果
         * @returns 当前动画进度(0-1)
         */

        /**
         * 获取当前动画名称
         * @returns 当前动画名称
         */

        /**
         * 判断当前是否有动画正在播放
         * @returns 是否正在播放动画
         */


        /**
         * 播放溶解动画
         */
        playDissolve() {}
        /**
         * 添加帧事件
         * @param progress 触发进度 (0-1)，0表示动画开始，1表示动画结束
         * @param callback 回调函数
         * @param eventId 事件ID，必须使用枚举
         * @param once 是否只触发一次，默认为true
         * @returns 事件ID
         */


        addFrameEvent(progress, callback, eventId, once) {
          if (once === void 0) {
            once = true;
          }

          // 限制进度范围
          progress = Math.max(0, Math.min(1, progress)); // 检查ID是否已存在

          if (this.frameEvents.some(event => event.id === eventId)) {
            //console.warn(`帧事件ID "${eventId}" 已存在，将覆盖原事件`);
            this.removeFrameEvent(eventId);
          }

          var frameEvent = {
            progress,
            callback,
            once,
            triggered: false,
            id: eventId
          };
          this.frameEvents.push(frameEvent); // 按进度排序，便于调试和查看

          this.frameEvents.sort((a, b) => a.progress - b.progress);
          return eventId;
        }
        /**
         * 移除指定ID的帧事件
         * @param id 事件ID
         * @returns 是否成功移除
         */


        removeFrameEvent(id) {
          var index = this.frameEvents.findIndex(event => event.id === id);

          if (index !== -1) {
            this.frameEvents.splice(index, 1);
            return true;
          }

          return false;
        }
        /**
         * 清空所有帧事件
         * @param resetProgress 是否重置进度记录，默认为true。切换同类动画时(如run_attack <-> attack)应传false
         */


        clearFrameEvents(resetProgress) {
          if (resetProgress === void 0) {
            resetProgress = true;
          }

          this.frameEvents.length = 0;

          if (resetProgress) {
            this.lastAnimationProgress = 0;
          }
        }
        /**
         * 获取所有帧事件信息（用于调试）
         * @returns 帧事件信息数组
         */


        getFrameEventsInfo() {
          return this.frameEvents.map(event => ({
            id: event.id,
            progress: event.progress,
            once: event.once,
            triggered: event.triggered
          }));
        }
        /**
         * 重置所有帧事件的触发状态
         * 用于动画重新播放时重置事件状态
         */


        resetFrameEventStates() {
          for (var frameEvent of this.frameEvents) {
            frameEvent.triggered = false;
          }

          this.lastAnimationProgress = 0;
        }
        /**
         * 快捷方法：添加攻击帧事件
         * @param progress 攻击触发进度，默认0.5（动画中点）
         * @param callback 攻击回调
         * @param eventId 事件ID，默认使用攻击伤害枚举
         * @returns 事件ID
         */


        addAttackFrameEvent(progress, callback, eventId, once) {
          if (progress === void 0) {
            progress = 0.5;
          }

          if (eventId === void 0) {
            eventId = (_crd && FrameEventId === void 0 ? (_reportPossibleCrUseOfFrameEventId({
              error: Error()
            }), FrameEventId) : FrameEventId).ATTACK_DAMAGE;
          }

          if (once === void 0) {
            once = false;
          }

          return this.addFrameEvent(progress, callback, eventId, once);
        }
        /**
         * 快捷方法：添加音效帧事件
         * @param progress 音效触发进度
         * @param callback 音效回调
         * @param eventId 事件ID，默认使用攻击音效枚举
         * @returns 事件ID
         */


        addSoundFrameEvent(progress, callback, eventId) {
          if (eventId === void 0) {
            eventId = (_crd && FrameEventId === void 0 ? (_reportPossibleCrUseOfFrameEventId({
              error: Error()
            }), FrameEventId) : FrameEventId).ATTACK_SOUND;
          }

          return this.addFrameEvent(progress, callback, eventId, true);
        }
        /**
         * 重置组件状态
         */


        reset() {
          this.resetTimeScale();
          this.resetAllColorEffects();
          this.clearFrameEvents();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "idleAnimName", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'idle';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "moveAnimName", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'run';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "attackAnimName", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'attack';
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "deadAnimName", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'die';
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "runAttackAnimName", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'run_attack';
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e3665373b906870c557118c884721bf4a678db63.js.map