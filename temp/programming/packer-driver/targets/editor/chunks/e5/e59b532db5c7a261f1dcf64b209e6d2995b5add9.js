System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, tween, CCFloat, Tween, Quat, instantiate, MeshRenderer, Color, HealthComponent, ComponentEvent, ComponentInitializer, EffectType, ObjectType, DropItemWood, Hero, Lumberjack, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _crd, ccclass, property, Tree;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfHealthComponent(extras) {
    _reporterNs.report("HealthComponent", "../Components/HealthComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../../Main/Common/ComponentEvents", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentInitializer(extras) {
    _reporterNs.report("ComponentInitializer", "../../Main/Common/ComponentInitializer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDamageData(extras) {
    _reporterNs.report("DamageData", "../../Main/Common/CommonInterface", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEffectType(extras) {
    _reporterNs.report("EffectType", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfObjectType(extras) {
    _reporterNs.report("ObjectType", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDropItemWood(extras) {
    _reporterNs.report("DropItemWood", "../Drop/DropItemWood", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHero(extras) {
    _reporterNs.report("Hero", "./Hero", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLumberjack(extras) {
    _reporterNs.report("Lumberjack", "./Lumberjack", _context.meta, extras);
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
      Vec3 = _cc.Vec3;
      tween = _cc.tween;
      CCFloat = _cc.CCFloat;
      Tween = _cc.Tween;
      Quat = _cc.Quat;
      instantiate = _cc.instantiate;
      MeshRenderer = _cc.MeshRenderer;
      Color = _cc.Color;
    }, function (_unresolved_2) {
      HealthComponent = _unresolved_2.HealthComponent;
    }, function (_unresolved_3) {
      ComponentEvent = _unresolved_3.ComponentEvent;
    }, function (_unresolved_4) {
      ComponentInitializer = _unresolved_4.ComponentInitializer;
    }, function (_unresolved_5) {
      EffectType = _unresolved_5.EffectType;
      ObjectType = _unresolved_5.ObjectType;
    }, function (_unresolved_6) {
      DropItemWood = _unresolved_6.DropItemWood;
    }, function (_unresolved_7) {
      Hero = _unresolved_7.Hero;
    }, function (_unresolved_8) {
      Lumberjack = _unresolved_8.Lumberjack;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d736b/ZpgBOn4VhTrKxMEKb", "Tree", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'tween', 'CCFloat', 'Tween', 'director', 'random', 'Quat', 'instantiate', 'MeshRenderer', 'Material', 'Color']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 树类 - 可被砍伐的树木
       */

      _export("Tree", Tree = (_dec = ccclass('Tree'), _dec2 = property({
        type: _crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
          error: Error()
        }), HealthComponent) : HealthComponent,
        displayName: '健康组件'
      }), _dec3 = property({
        type: CCFloat,
        displayName: '木头掉落数量',
        tooltip: '树被砍倒后掉落的木头数量'
      }), _dec4 = property({
        type: CCFloat,
        displayName: '掉落范围',
        tooltip: '木头掉落的范围半径'
      }), _dec5 = property({
        tooltip: '碎片数量'
      }), _dec6 = property({
        tooltip: '碎片缩放最小值（相对原模型）'
      }), _dec7 = property({
        tooltip: '碎片缩放最大值（相对原模型）'
      }), _dec8 = property({
        tooltip: '碎片飞散距离（米）'
      }), _dec9 = property({
        tooltip: '碎片飞散时间（秒）'
      }), _dec10 = property({
        tooltip: '碎片上升高度（米）'
      }), _dec(_class = (_class2 = class Tree extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "healthComponent", _descriptor, this);

          _initializerDefineProperty(this, "woodDropCount", _descriptor2, this);

          _initializerDefineProperty(this, "dropRange", _descriptor3, this);

          /** 树是否已经死亡 */
          this._isDead = false;

          // === 碎片散开效果配置 ===
          _initializerDefineProperty(this, "fragmentCount", _descriptor4, this);

          _initializerDefineProperty(this, "fragmentScaleMin", _descriptor5, this);

          _initializerDefineProperty(this, "fragmentScaleMax", _descriptor6, this);

          _initializerDefineProperty(this, "fragmentScatterDistance", _descriptor7, this);

          _initializerDefineProperty(this, "fragmentDuration", _descriptor8, this);

          _initializerDefineProperty(this, "fragmentUpHeight", _descriptor9, this);

          /** 闪白标记 */
          this.flashWhiteMark = false;

          /** 是否正在震动 */
          this.isShaking = false;
        }

        get isDead() {
          return this._isDead;
        }

        onLoad() {
          this.initComponents();
          this.registerComponentEvents();
        }

        onDestroy() {
          this.unregisterEvents();
        }
        /**
         * 初始化组件引用
         */


        initComponents() {
          // 使用组件初始化器获取或创建HealthComponent
          (_crd && ComponentInitializer === void 0 ? (_reportPossibleCrUseOfComponentInitializer({
            error: Error()
          }), ComponentInitializer) : ComponentInitializer).initComponents(this.node, {
            healthComponent: _crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
              error: Error()
            }), HealthComponent) : HealthComponent
          }, this);
        }
        /**
         * 注册组件事件监听
         */


        registerComponentEvents() {
          // 监听死亡事件
          this.healthComponent.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).DEAD, this.onDead, this);
          this.healthComponent.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).HURT, this.onHurt, this);
        }
        /**
         * 注销事件监听
         */


        unregisterEvents() {}
        /**
         * 受伤回调
         * @param damageData 伤害数据
         */


        onHurt(damageData) {
          // 播放树摇晃效果
          //console.log("[Tree] onHurt", damageData);
          this.playShakeEffect(damageData);
          this.createFragments(); //材质闪白

          this.flashWhite(); // app.audio.playEffect('resources/audio/挖矿')
        }

        /**
         * 材质闪白
         */
        flashWhite() {
          if (this.flashWhiteMark) return;
          this.flashWhiteMark = true;
          const meshNodes = [];
          this.findMeshNodes(this.node, meshNodes);

          if (meshNodes.length === 0) {
            //console.warn(`[${this.node.name}] 未找到 MeshRenderer，跳过闪白效果`);
            this.flashWhiteMark = false;
            return;
          }

          meshNodes.forEach(node => {
            // 记录原始emissive颜色，以便恢复
            // const originalEmissive = node.getComponent(MeshRenderer).material.getProperty('emissive');
            node.getComponent(MeshRenderer).material.setProperty('emissive', new Color(0, 0, 0, 255));
            let color = new Color(0, 0, 0);
            tween(color).to(0.1, {
              r: 255,
              g: 255,
              b: 255
            }, {
              onUpdate: (target, ratio) => {
                node.getComponent(MeshRenderer).material.setProperty('emissive', target);
              }
            }).to(0.1, {
              r: 0,
              g: 0,
              b: 0
            }, {
              onUpdate: (target, ratio) => {
                node.getComponent(MeshRenderer).material.setProperty('emissive', target);
              }
            }).call(() => {
              node.getComponent(MeshRenderer).material.setProperty('emissive', new Color(0, 0, 0, 255));
              this.flashWhiteMark = false; // 闪白结束后重置标记
            }).start();
          }); // 移除 scheduleOnce 重置标记，改为在 tween 回调中重置，更精准
          // this.scheduleOnce(() => {
          //     this.flashWhiteMark = false;
          // }, 0.3);
        }
        /**
        * 创建碎片效果
        */


        createFragments() {
          // 查找包含 MeshRenderer 的子节点（草的模型）
          const meshNodes = [];
          this.findMeshNodes(this.node, meshNodes);

          if (meshNodes.length === 0) {
            //console.warn(`[${this.node.name}] 未找到 MeshRenderer，跳过碎片效果`);
            return;
          } // 获取草的世界坐标


          const centerPos = this.node.worldPosition.clone(); // this.node.getChildByName("eff").active = true;
          // 生成多个碎片

          for (let i = 0; i < this.fragmentCount; i++) {
            // 克隆第一个有 MeshRenderer 的节点
            const fragment = instantiate(meshNodes[0]); // 设置为场景根节点的子节点（独立于草节点）

            fragment.setParent(this.node.parent);
            fragment.setWorldPosition(centerPos); // 缩小碎片（在区间内随机）

            const randomScale = this.fragmentScaleMin + Math.random() * (this.fragmentScaleMax - this.fragmentScaleMin);
            const originalFragmentScale = fragment.scale.clone();
            fragment.setScale(originalFragmentScale.x * randomScale, originalFragmentScale.y * randomScale, originalFragmentScale.z * randomScale); // 计算随机飞散方向（XZ平面）

            const angle = Math.PI * 2 * i / this.fragmentCount + (Math.random() - 0.5) * 0.5;
            const distance = this.fragmentScatterDistance * (0.7 + Math.random() * 0.6);
            const targetPos = new Vec3(centerPos.x + Math.cos(angle) * distance, centerPos.y + this.fragmentUpHeight * (0.8 + Math.random() * 0.4), // 随机上升高度
            centerPos.z + Math.sin(angle) * distance); // 随机旋转

            const randomRotation = new Vec3(Math.random() * 360, Math.random() * 360, Math.random() * 360); // 碎片飞散动画（抛物线 + 旋转 + 缩小消失）

            tween(fragment) // 飞散阶段
            .to(this.fragmentDuration, {
              worldPosition: targetPos // eulerAngles: randomRotation

            }, {
              easing: 'quadOut'
            }) // 同时缩小消失
            .to(this.fragmentDuration * 0.5, {
              scale: new Vec3(0, 0, 0)
            }).call(() => {
              // 销毁碎片
              fragment.destroy();
            }).start(); // 让碎片有下落效果（分离的tween控制Y轴）

            const fallStartTime = this.fragmentDuration * 0.5; // 到达顶点后开始下落

            this.scheduleOnce(() => {
              if (fragment && fragment.isValid) {
                const fallTargetPos = new Vec3(targetPos.x, centerPos.y - 0.5, targetPos.z);
                tween(fragment).to(this.fragmentDuration * 0.5, {
                  worldPosition: fallTargetPos
                }, {
                  easing: 'quadIn'
                }).start();
              }
            }, fallStartTime);
          } //console.log(`[${this.node.name}] 生成了 ${this.fragmentCount} 个碎片`);

        }
        /**
         * 递归查找包含 MeshRenderer 的节点
         */


        findMeshNodes(node, results) {
          const meshRenderer = node.getComponent(MeshRenderer);

          if (meshRenderer) {
            results.push(node);
          }

          for (const child of node.children) {
            this.findMeshNodes(child, results);
          }
        }
        /**
         * 播放树摇晃效果
         */


        playShakeEffect(damageData) {
          if (this.isShaking) return;
          this.isShaking = true; // 停止之前的摇晃动画

          Tween.stopAllByTarget(this.node); // 创建摇晃动画

          tween(this.node).to(0.05, {
            eulerAngles: new Vec3(0, 0, 5)
          }).to(0.1, {
            eulerAngles: new Vec3(0, 0, -5)
          }).to(0.05, {
            eulerAngles: Vec3.ZERO
          }).call(() => {
            this.isShaking = false;
          }).start(); // 树可不能死！

          this.healthComponent.heal(damageData.damage); // 受伤时掉落木头

          this.dropWood(damageData);
        }
        /**
         * 死亡回调 - 树被砍倒
         */


        onDead() {
          if (this._isDead) return;
          this._isDead = true; // 树死亡时不掉落任何物品
        }
        /**
         * 掉落木头
         */


        dropWood(damageData) {
          const treePosition = this.node.getWorldPosition();
          const dropPosition = new Vec3(treePosition.x, treePosition.y + 2, // 稍微抬高，让木头有掉落效果
          treePosition.z);
          this.schedule(() => {
            const rotation = new Quat();
            Quat.fromEuler(rotation, 0, Math.random() * 360, 0); // 从对象池获取木头节点

            const woodNode = manager.pool.getNode((_crd && ObjectType === void 0 ? (_reportPossibleCrUseOfObjectType({
              error: Error()
            }), ObjectType) : ObjectType).DropItemWood, undefined, dropPosition, rotation);

            if (!woodNode) {
              //console.warn('无法从对象池获取木头节点');
              return;
            } // 将木头添加到掉落层


            if (manager.game && manager.game.dropLayer) {
              manager.game.dropLayer.addChild(woodNode);
            } else {
              //console.warn('无法找到掉落层 (manager.game.dropLayer)，将添加到场景根节点');
              return;
            } // 获取木头组件


            const woodComponent = woodNode.getComponent(_crd && DropItemWood === void 0 ? (_reportPossibleCrUseOfDropItemWood({
              error: Error()
            }), DropItemWood) : DropItemWood); // 计算随机掉落位置
            // 将木头添加到掉落管理器中
            // manager.drop.addItem(woodNode);
            // 直接设置为可拾取状态

            if (woodComponent) {
              woodComponent.canPickup = true; // woodComponent.showRotate();
            }

            let Character = damageData.damageSource.getComponent(_crd && Hero === void 0 ? (_reportPossibleCrUseOfHero({
              error: Error()
            }), Hero) : Hero) || damageData.damageSource.getComponent(_crd && Lumberjack === void 0 ? (_reportPossibleCrUseOfLumberjack({
              error: Error()
            }), Lumberjack) : Lumberjack);

            if (Character) {
              Character.pickupComponent.pickupItem(woodComponent);
            }
          }, 0.05, this.woodDropCount - 1, 0); // 播放砍树音效
          // if (app && app.audio) {
          //     app.audio.playEffect('resources/audio/砍树');
          // }

          manager.effect.playEffect((_crd && EffectType === void 0 ? (_reportPossibleCrUseOfEffectType({
            error: Error()
          }), EffectType) : EffectType).Wood_Drop, treePosition.add(new Vec3(0, 3.5, 0)));
        }
        /**
         * 受到伤害
         * @param damageData 伤害数据
         * @returns 是否死亡
         */


        takeDamage(damageData) {
          if (this._isDead) return false;
          return this.healthComponent.takeDamage(damageData);
        }
        /**
         * 重置树的状态
         */


        reset() {
          this._isDead = false;
          this.healthComponent.reset(); // 重置变换

          this.node.setScale(1, 1, 1);
          this.node.setRotationFromEuler(0, 0, 0); // 停止所有动画

          tween(this.node).stop();
        }
        /**
         * 获取树的世界位置
         */


        getWorldPosition() {
          return this.node.getWorldPosition();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "healthComponent", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "woodDropCount", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 2;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "dropRange", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1.5;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "fragmentCount", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 4;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "fragmentScaleMin", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.3;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "fragmentScaleMax", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.5;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "fragmentScatterDistance", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1.0;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "fragmentDuration", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.5;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "fragmentUpHeight", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.8;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e59b532db5c7a261f1dcf64b209e6d2995b5add9.js.map