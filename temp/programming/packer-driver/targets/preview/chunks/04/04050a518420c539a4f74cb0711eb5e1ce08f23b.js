System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, easing, Enum, MeshRenderer, Node, tween, Vec3, HealthComponent, ComponentEvent, BuildingType, CommonEvent, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, Wall;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfHealthComponent(extras) {
    _reporterNs.report("HealthComponent", "../Components/HealthComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../Common/ComponentEvents", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDamageData(extras) {
    _reporterNs.report("DamageData", "../Common/CommonInterface", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuildingType(extras) {
    _reporterNs.report("BuildingType", "../Common/CommonEnum", _context.meta, extras);
  }

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
      Color = _cc.Color;
      Component = _cc.Component;
      easing = _cc.easing;
      Enum = _cc.Enum;
      MeshRenderer = _cc.MeshRenderer;
      Node = _cc.Node;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      HealthComponent = _unresolved_2.HealthComponent;
    }, function (_unresolved_3) {
      ComponentEvent = _unresolved_3.ComponentEvent;
    }, function (_unresolved_4) {
      BuildingType = _unresolved_4.BuildingType;
      CommonEvent = _unresolved_4.CommonEvent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "152d3FZjzdAHLiD63kb2ZQ2", "Wall", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Component', 'director', 'easing', 'Enum', 'MeshRenderer', 'Node', 'tween', 'v3', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Wall", Wall = (_dec = ccclass('Wall'), _dec2 = property({
        displayName: '是否解锁'
      }), _dec3 = property({
        displayName: "墙体父节点",
        type: Node
      }), _dec4 = property({
        type: Enum(_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
          error: Error()
        }), BuildingType) : BuildingType),
        displayName: '墙体类型'
      }), _dec5 = property({
        type: Node,
        displayName: '墙体地面'
      }), _dec(_class = (_class2 = class Wall extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "isUnlock", _descriptor, this);

          _initializerDefineProperty(this, "wallParent", _descriptor2, this);

          _initializerDefineProperty(this, "wallType", _descriptor3, this);

          _initializerDefineProperty(this, "wallGround", _descriptor4, this);

          /** 场景中的所有墙体段信息 */
          this.wallMap = new Map();

          /** 每个墙段节点树中所有 MeshRenderer 的初始颜色（节点uuid → Color[]） */
          this._initColorMap = new Map();
        }

        onLoad() {
          // 遍历所有 wallParent 元素（每个都带有 HealthComponent）
          this.wallParent.forEach(wallSegment => {
            var initEul = new Vec3();
            var initWPos = new Vec3();
            var initScale = new Vec3();
            wallSegment.getScale(initScale);
            wallSegment.getWorldPosition(initWPos);
            wallSegment.getRotation().getEulerAngles(initEul); // 获取该墙段的健康组件

            var health = wallSegment.getComponent(_crd && HealthComponent === void 0 ? (_reportPossibleCrUseOfHealthComponent({
              error: Error()
            }), HealthComponent) : HealthComponent);
            this.wallMap.set(wallSegment, {
              initWPos,
              initEul,
              initScale,
              health
            });

            if (this.isUnlock) {
              wallSegment.setScale(initScale.x, initScale.y, initScale.z);
              wallSegment.setWorldPosition(initWPos.x, initWPos.y, initWPos.z);
            } else {
              wallSegment.setScale(0, 0, 0);
              wallSegment.setWorldPosition(initWPos.x, initWPos.y + 3, initWPos.z);
            } // 收集并缓存该墙段节点树中所有 MeshRenderer 的初始颜色


            this._cacheInitColors(wallSegment); // 为每个墙段注册事件


            if (health) {
              wallSegment.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
                error: Error()
              }), ComponentEvent) : ComponentEvent).HURT, damageData => this.onHurt(damageData, wallSegment), this);
              wallSegment.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
                error: Error()
              }), ComponentEvent) : ComponentEvent).DEAD, () => this.onSegmentDead(wallSegment), this);
            }
          });
          app.event.on((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).UnlockItem, this.onUnlockItem, this);
        }

        showLock() {
          this.wallParent.forEach(wallSegment => {
            var data = this.wallMap.get(wallSegment);
            if (!data) return;
            wallSegment.setScale(0, 0, 0);
            wallSegment.setRotationFromEuler(data.initEul);
            wallSegment.setWorldPosition(data.initWPos.x, data.initWPos.y + 3, data.initWPos.z);
          });
          this.isUnlock = false;
        }

        reset() {
          // 重置所有墙段的健康组件
          this.wallMap.forEach(data => {
            if (data.health) {
              data.health.reset();
            }
          });
        }

        showUnlock(cb) {
          var callbackExecuted = false;
          this.wallParent.forEach(wallSegment => {
            var data = this.wallMap.get(wallSegment);
            if (!data) return;
            tween(wallSegment).to(0.3, {
              scale: data.initScale
            }, {
              easing: easing.backOut
            }).to(0.3, {
              worldPosition: data.initWPos
            }, {
              easing: easing.backOut
            }).call(() => {
              wallSegment.setScale(data.initScale.x, data.initScale.y, data.initScale.z);
              wallSegment.setWorldPosition(data.initWPos.x, data.initWPos.y, data.initWPos.z);
              this.isUnlock = true; // 只执行一次回调

              if (!callbackExecuted) {
                callbackExecuted = true;
                cb == null || cb();
              }
            }).start();
          });
        }

        onUnlockItem(type) {
          if (type === this.wallType) {
            this.showUnlock(() => {
              if (type === (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
                error: Error()
              }), BuildingType) : BuildingType).Wall1 && this.wallGround) {
                this.wallGround.active = true;
              }
            });
          }

          if (type === (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).Wall1 && this.wallType == (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).Wall) {
            this.wallParent.forEach(wallSegment => {
              tween(wallSegment).to(0.3, {
                scale: Vec3.ZERO
              }, {
                easing: easing.backOut
              }).start();
            });
            this.showLock();
            this.reset();
          }
        }

        onHurt(damageData, wallSegment) {
          var data = this.wallMap.get(wallSegment);
          if (!data) return; // 对该墙段进行治疗（恢复伤害）

          if (data.health) {
            var healNum = (1 - data.health.healthPercentage) * damageData.damage + 0.1;
            data.health.heal(healNum);
          } // 墙体受击震动


          tween(wallSegment).to(0.1, {
            eulerAngles: new Vec3(data.initEul.x - 10, data.initEul.y, data.initEul.z)
          }).to(0.1, {
            eulerAngles: data.initEul
          }).start(); // 闪红逻辑

          tween(wallSegment).call(() => {
            this.setWallColor(wallSegment, Color.RED);
          }).delay(0.1).call(() => {
            this.restoreWallColor(wallSegment);
          }).start();
        }
        /**
         * 单个墙段死亡回调
         */


        onSegmentDead(wallSegment) {
          // 检查是否所有墙段都死亡
          var allDead = true;
          this.wallMap.forEach(data => {
            if (data.health && !data.health.isDead) {
              allDead = false;
            }
          });

          if (allDead) {
            this.onDead();
          }
        }
        /**
         * 递归收集节点树中所有 MeshRenderer 的初始颜色，存入 _initColorMap
         */


        _cacheInitColors(node) {
          var meshRenderer = node.getComponent(MeshRenderer);

          if (meshRenderer) {
            var colors = [];
            var count = meshRenderer.sharedMaterials.length;

            for (var i = 0; i < count; i++) {
              var mat = meshRenderer.getMaterialInstance(i); // mainColor 可能不存在（材质未暴露该属性），默认存 WHITE 作为兜底

              var raw = mat == null ? void 0 : mat.getProperty('mainColor');
              var color = raw instanceof Color ? raw.clone() : new Color(255, 255, 255, 255);
              colors.push(color);
            }

            this._initColorMap.set(node.uuid, colors);
          }

          for (var child of node.children) {
            this._cacheInitColors(child);
          }
        }
        /**
         * 递归设置节点及其子节点 MeshRenderer 的颜色（使用专属材质实例）
         */


        setWallColor(node, color) {
          var meshRenderer = node.getComponent(MeshRenderer);

          if (meshRenderer) {
            var count = meshRenderer.sharedMaterials.length;

            for (var i = 0; i < count; i++) {
              var _meshRenderer$getMate;

              (_meshRenderer$getMate = meshRenderer.getMaterialInstance(i)) == null || _meshRenderer$getMate.setProperty('mainColor', color);
            }
          }

          for (var child of node.children) {
            this.setWallColor(child, color);
          }
        }
        /**
         * 恢复节点树中所有 MeshRenderer 的初始颜色
         */


        restoreWallColor(node) {
          var meshRenderer = node.getComponent(MeshRenderer);

          if (meshRenderer) {
            var colors = this._initColorMap.get(node.uuid);

            var count = meshRenderer.sharedMaterials.length;

            for (var i = 0; i < count; i++) {
              var _colors$i, _meshRenderer$getMate2;

              var initColor = (_colors$i = colors == null ? void 0 : colors[i]) != null ? _colors$i : Color.WHITE;
              (_meshRenderer$getMate2 = meshRenderer.getMaterialInstance(i)) == null || _meshRenderer$getMate2.setProperty('mainColor', initColor);
            }
          }

          for (var child of node.children) {
            this.restoreWallColor(child);
          }
        }

        onDead() {
          this.node.removeFromParent();
          app.event.emit((_crd && CommonEvent === void 0 ? (_reportPossibleCrUseOfCommonEvent({
            error: Error()
          }), CommonEvent) : CommonEvent).GameFail);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isUnlock", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "wallParent", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "wallType", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && BuildingType === void 0 ? (_reportPossibleCrUseOfBuildingType({
            error: Error()
          }), BuildingType) : BuildingType).Wall;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "wallGround", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=04050a518420c539a4f74cb0711eb5e1ce08f23b.js.map