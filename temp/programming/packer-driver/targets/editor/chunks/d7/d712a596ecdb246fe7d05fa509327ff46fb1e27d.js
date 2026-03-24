System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, director, Prefab, Enum, Vec3, instantiate, Animation, Quat, NodePool, ParticleSystem, tween, EffectType, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _dec6, _dec7, _class4, _class5, _descriptor5, _crd, ccclass, property, EffectPlayType, EffectItem, EffectManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfEffectType(extras) {
    _reporterNs.report("EffectType", "../Common/CommonEnum", _context.meta, extras);
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
      director = _cc.director;
      Prefab = _cc.Prefab;
      Enum = _cc.Enum;
      Vec3 = _cc.Vec3;
      instantiate = _cc.instantiate;
      Animation = _cc.Animation;
      Quat = _cc.Quat;
      NodePool = _cc.NodePool;
      ParticleSystem = _cc.ParticleSystem;
      tween = _cc.tween;
    }, function (_unresolved_2) {
      EffectType = _unresolved_2.EffectType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ea24bVDwHZPV5h2FtvtF8tB", "EffectManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'director', 'Prefab', 'Enum', 'Vec3', 'instantiate', 'Animation', 'Quat', 'NodePool', 'ParticleSystem', 'tween', 'clamp']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 抛物线飞行参数接口
       */

      /**
       * 特效播放类型
       */
      EffectPlayType = /*#__PURE__*/function (EffectPlayType) {
        EffectPlayType["Normal"] = "Normal";
        EffectPlayType["Animation"] = "Animation";
        EffectPlayType["Particle"] = "Particle";
        return EffectPlayType;
      }(EffectPlayType || {}); // 特效项类，用于在编辑器中配置


      EffectItem = (_dec = ccclass('EffectItem'), _dec2 = property({
        type: Enum(_crd && EffectType === void 0 ? (_reportPossibleCrUseOfEffectType({
          error: Error()
        }), EffectType) : EffectType),
        displayName: '特效类型'
      }), _dec3 = property({
        type: Prefab
      }), _dec4 = property({
        type: Enum(EffectPlayType),
        displayName: '播放类型'
      }), _dec5 = property({
        displayName: '持续时间(秒)',
        tooltip: '0表示不自动回收, 粒子特效必须设置'
      }), _dec(_class = (_class2 = class EffectItem {
        constructor() {
          _initializerDefineProperty(this, "type", _descriptor, this);

          _initializerDefineProperty(this, "prefab", _descriptor2, this);

          _initializerDefineProperty(this, "playType", _descriptor3, this);

          _initializerDefineProperty(this, "duration", _descriptor4, this);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return (_crd && EffectType === void 0 ? (_reportPossibleCrUseOfEffectType({
            error: Error()
          }), EffectType) : EffectType).None;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "playType", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return EffectPlayType.Normal;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "duration", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      })), _class2)) || _class);

      _export("EffectManager", EffectManager = (_dec6 = ccclass('EffectManager'), _dec7 = property({
        type: [EffectItem],
        displayName: '特效列表'
      }), _dec6(_class4 = (_class5 = class EffectManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "effectItems", _descriptor5, this);

          // 对象池映射表，按特效类型存储
          this._pools = new Map();
          // 正在播放的特效节点
          this._activeEffects = new Map();
        }

        /** 单例实例 */

        /** 获取单例实例 */
        static get instance() {
          if (!this._instance) {
            var _director$getScene;

            //console.warn('EffectManager 实例不存在 动态创建');
            // 动态创建节点并添加组件
            const node = new Node('EffectManager');
            this._instance = node.addComponent(EffectManager); // 添加到场景

            (_director$getScene = director.getScene()) == null || _director$getScene.addChild(node);
          }

          return this._instance;
        }

        get effectType() {
          return _crd && EffectType === void 0 ? (_reportPossibleCrUseOfEffectType({
            error: Error()
          }), EffectType) : EffectType;
        }

        onLoad() {
          // 单例检查
          if (EffectManager._instance) {
            this.node.destroy();
            return;
          }

          EffectManager._instance = this; // 初始化对象池

          this.initPools();
        }
        /**
         * 初始化所有特效的对象池
         */


        initPools() {
          for (const item of this.effectItems) {
            if (item.type !== (_crd && EffectType === void 0 ? (_reportPossibleCrUseOfEffectType({
              error: Error()
            }), EffectType) : EffectType).None && !this._pools.has(item.type)) {
              this._pools.set(item.type, new NodePool());
            }
          }
        }

        onDestroy() {
          if (EffectManager._instance === this) {
            EffectManager._instance = null;
          } // 清空对象池


          this._pools.forEach(pool => pool.clear());

          this._pools.clear(); // 清理正在播放的特效


          this._activeEffects.forEach((_, node) => {
            node.destroy();
          });

          this._activeEffects.clear(); // 这里似乎有个未定义的app，需要确保app已在其他地方定义


          if (typeof app !== 'undefined' && app.event) {
            app.event.offAllByTarget(this);
          }
        }
        /**
         * 根据特效类型获取预制体和播放类型
         * @param type 特效类型
         * @returns 对应类型的预制体和播放类型，如果不存在则返回null
         */


        getEffectByType(type) {
          return this.effectItems.find(item => item.type === type) || null;
        }
        /**
         * 播放特效
         * @param type 特效类型
         * @param position 特效位置
         * @param rotation 特效旋转(欧拉角)
         * @returns 创建的特效节点
         */


        playEffect(type, position, rotation, parent, scale) {
          const item = this.getEffectByType(type);

          if (!item) {
            //console.warn(`特效预制体不存在: ${type}`);
            return null;
          } // 从对象池获取或创建新节点


          let effect;

          const pool = this._pools.get(type);

          if (pool && pool.size() > 0) {
            effect = pool.get();

            if (!effect || !effect.isValid) {
              //console.warn('特效节点无效，重新创建');
              effect = instantiate(item.prefab);
              pool.clear();
              pool.put(effect);
            }
          } else {
            effect = instantiate(item.prefab);
          } // 记录该节点的特效类型


          this._activeEffects.set(effect, type); // 设置位置和旋转


          if (position) {
            effect.setPosition(position);
          } // 使用欧拉角设置旋转


          if (rotation) {
            effect.setRotation(rotation);
          }

          if (parent) {
            effect.setParent(parent);
          } else {
            effect.setParent(this.node);
          }

          if (scale) {
            effect.setScale(scale);
          } // 根据特效类型播放


          if (item.playType === EffectPlayType.Animation) {
            const animss = effect.getComponentsInChildren(Animation);
            let completedCount = 0;
            const totalAnims = animss.length;

            if (totalAnims > 0) {
              animss.forEach(anim => {
                anim.play();
                anim.once(Animation.EventType.FINISHED, () => {
                  completedCount++;

                  if (completedCount >= totalAnims) {
                    this.recycleEffect(effect);
                  }
                });
              });
            } else {
              // 如果没有动画组件且未设置持续时间，使用默认延迟回收
              if (item.duration <= 0) {
                this.scheduleOnce(() => {
                  this.recycleEffect(effect);
                }, 1.0); // 默认1秒后回收
              }
            }
          } else if (item.playType === EffectPlayType.Particle) {
            // 处理粒子特效
            const particles = effect.getComponentsInChildren(ParticleSystem);
            particles.forEach(particle => {
              particle.play();
            }); // 注意：粒子系统没有内置的完成事件，需要依赖duration
          } // 如果设置了持续时间，则定时回收


          if (item.duration > 0) {
            this.scheduleOnce(() => {
              this.recycleEffect(effect);
            }, item.duration);
          }

          return effect;
        }
        /**
         * 回收特效节点到对象池
         * @param effect 要回收的特效节点
         */


        recycleEffect(effect) {
          if (!effect.isValid) {
            return;
          } // 获取节点对应的特效类型


          const type = this._activeEffects.get(effect);

          if (!type) {
            console.warn(`[EffectManager] recycleEffect: 节点未注册到_activeEffects，直接destroy! name=${effect.name}`);
            effect.destroy();
            return;
          } // 从激活列表中移除


          this._activeEffects.delete(effect); // 停止所有动作


          effect.setParent(null); // 如果是动画特效，停止动画

          const anim = effect.getComponent(Animation);

          if (anim) {
            anim.stop();
          } // 停止粒子系统


          const particles = effect.getComponentsInChildren(ParticleSystem);
          particles.forEach(particle => {
            particle.stop();
          }); // 放回对象池

          const pool = this._pools.get(type);

          if (pool) {
            pool.put(effect);
          } else {
            effect.destroy();
          }
        }
        /**
         * 手动回收所有特效
         */


        recycleAllEffects() {
          const effects = Array.from(this._activeEffects.keys());

          for (const effect of effects) {
            this.recycleEffect(effect);
          }
        }
        /**
         * 获取当前正在播放的所有特效
         * @returns 正在播放的特效节点数组
         */


        getActiveEffects() {
          return Array.from(this._activeEffects.keys());
        }
        /**
         * 获取指定类型的正在播放的特效
         * @param type 特效类型
         * @returns 指定类型的正在播放的特效节点数组
         */


        getActiveEffectsByType(type) {
          const result = [];

          this._activeEffects.forEach((effectType, node) => {
            if (effectType === type) {
              result.push(node);
            }
          });

          return result;
        }
        /**
         * 在运行时添加新特效配置
         * @param item 特效配置项
         */


        addEffectItem(item) {
          if (!item || !item.prefab) {
            //console.warn('无效的特效配置项');
            return;
          } // 防止重复添加


          if (this.getEffectByType(item.type)) {
            //console.warn(`特效类型已存在: ${item.type}`);
            return;
          }

          this.effectItems.push(item); // 为新类型创建对象池

          if (!this._pools.has(item.type)) {
            this._pools.set(item.type, new NodePool());
          }
        }
        /**
         * 添加到特效层
         * @param effect 特效节点
         */


        addToEffectLayer(effect) {
          effect.setParent(this.node, true);
        }
        /**
         * 使节点沿抛物线轨迹飞行到目标位置
         * @param params 抛物线飞行参数
         * @param params.node 要移动的节点
         * @param params.target 目标节点或目标坐标
         * @param params.callback 飞行完成回调
         * @param params.duration 飞行持续时间(秒)，默认0.5
         * @param params.height 抛物线高度，默认5
         * @param params.targetWorldScale 目标世界缩放，可选
         * @param params.targetWorldRotation 目标世界旋转，可选
         * @returns 飞行的节点
         */


        flyNodeInParabola(params) {
          const {
            node,
            target,
            callback,
            duration = 0.3,
            height = 3,
            targetWorldScale,
            targetWorldRotation
          } = params;

          if (!node || !node.isValid) {
            //console.warn('节点无效，无法执行抛物线飞行');
            return node;
          } // 检查target有效性


          if (target instanceof Node && (!target || !target.isValid)) {
            //console.warn('目标节点无效，无法执行抛物线飞行');
            return node;
          }

          if (target instanceof Vec3 && !target) {
            //console.warn('目标坐标无效，无法执行抛物线飞行');
            return node;
          } // 确保节点在场景中


          this.addToEffectLayer(node); // 获取起始位置和目标位置

          const isNodeTarget = target instanceof Node;
          const startPos = node.getWorldPosition();
          const targetPos = isNodeTarget ? target.getWorldPosition() : target; // 获取起始缩放和旋转

          const startScale = node.getWorldScale();
          const startRotation = node.getWorldRotation(); // 创建一个临时对象来驱动动画进度

          const progressObj = {
            progress: 0
          }; // 创建缓动动画

          tween(progressObj).to(duration, {
            progress: 1
          }, {
            onUpdate: () => {
              const ratio = progressObj.progress;

              if (isNodeTarget) {
                targetPos.set(target.getWorldPosition());
              } // console.log('ratio', ratio);
              // 线性插值计算当前X和Z位置


              const currentX = startPos.x + (targetPos.x - startPos.x) * ratio;
              const currentZ = startPos.z + (targetPos.z - startPos.z) * ratio; // 计算Y位置（抛物线轨迹）
              // 使用公式: y = 4 * h * t * (1 - t)，其中t是[0,1]之间的进度值
              // 这个公式会创建一个在中点达到最大高度的抛物线

              const heightOffset = 4 * height * ratio * (1 - ratio);
              const currentY = startPos.y + (targetPos.y - startPos.y) * ratio + heightOffset;
              if (!node.isValid) return; // 设置节点位置

              node.setWorldPosition(new Vec3(currentX, currentY, currentZ)); // 设置缩放插值

              if (targetWorldScale || isNodeTarget) {
                let finalTargetScale = targetWorldScale;

                if (isNodeTarget) {
                  // 动态获取目标节点的当前缩放
                  finalTargetScale = target.getWorldScale();
                }

                if (finalTargetScale) {
                  const currentScale = new Vec3(startScale.x + (finalTargetScale.x - startScale.x) * ratio, startScale.y + (finalTargetScale.y - startScale.y) * ratio, startScale.z + (finalTargetScale.z - startScale.z) * ratio);
                  node.setWorldScale(currentScale);
                }
              } // 设置旋转插值


              if (targetWorldRotation || isNodeTarget) {
                let finalTargetRotation = targetWorldRotation;

                if (isNodeTarget) {
                  // 动态获取目标节点的当前旋转
                  finalTargetRotation = target.getWorldRotation();
                }

                if (finalTargetRotation) {
                  const currentRotation = new Quat();
                  Quat.slerp(currentRotation, startRotation, finalTargetRotation, ratio);
                  node.setWorldRotation(currentRotation);
                }
              } // console.log('currentY', currentY);

            }
          }).call(() => {
            // console.log('progressObj.progress', progressObj.progress);  
            // 飞行完成后的回调
            // 设置缩放插值
            if (targetWorldScale || isNodeTarget) {
              let finalTargetScale = targetWorldScale;

              if (isNodeTarget) {
                // 动态获取目标节点的当前缩放
                finalTargetScale = target.getWorldScale();
              }

              node.isValid && node.setWorldScale(finalTargetScale);
            } // 设置旋转插值


            if (targetWorldRotation || isNodeTarget) {
              let finalTargetRotation = targetWorldRotation;

              if (isNodeTarget) {
                // 动态获取目标节点的当前旋转
                finalTargetRotation = target.getWorldRotation();
              }

              if (finalTargetRotation && node.isValid) {
                node.setWorldRotation(finalTargetRotation);
              }
            }

            if (callback) {
              callback();
            }
          }).start();
          return node;
        }

        reset() {
          console.warn(`[EffectManager] reset() called! children=${this.node.children.length}`, new Error().stack);
          this.recycleAllEffects(); // 清理飞行中的节点

          this.node.children.forEach(child => {
            this.recycleEffect(child);
          });
        }

      }, (_descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "effectItems", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      })), _class5)) || _class4));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d712a596ecdb246fe7d05fa509327ff46fb1e27d.js.map