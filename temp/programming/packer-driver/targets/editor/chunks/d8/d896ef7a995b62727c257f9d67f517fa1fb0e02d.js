System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, easing, Node, tween, v3, Vec3, BuildingBase, Salesman, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, BuildingSalesman;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBuildingBase(extras) {
    _reporterNs.report("BuildingBase", "./BuildingBase", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSalesman(extras) {
    _reporterNs.report("Salesman", "../Role/Salesman", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      easing = _cc.easing;
      Node = _cc.Node;
      tween = _cc.tween;
      v3 = _cc.v3;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      BuildingBase = _unresolved_2.BuildingBase;
    }, function (_unresolved_3) {
      Salesman = _unresolved_3.Salesman;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "bb257DVFA9Hfq/0VfdTz79S", "BuildingSalesman", undefined);

      __checkObsolete__(['_decorator', 'easing', 'Node', 'tween', 'v3', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * BuildingSalesman —— 售货员建筑壳
       *
       * 职责：
       *  1. 继承 BuildingBase，接管解锁流程（监听 UnlockItem 事件）
       *  2. 锁定状态：隐藏建筑模型 + 隐藏/重置 Salesman
       *  3. 解锁动画：建筑模型弹出 → Salesman 弹出
       *  4. 解锁完成：调用 salesman.activate()，让其走向工作岗位开始工作
       *
       * 编辑器配置：
       *  - model        : 建筑的 3D 模型节点
       *  - movePos      : 解锁后 Salesman 先走向的过渡位置点（可选）
       *  - workStationPos: 最终工作岗位（对应 ShopCommon 触发器范围内的位置点）
       *  - salesman     : 场景中售货员角色节点上的 Salesman 组件
       */

      _export("BuildingSalesman", BuildingSalesman = (_dec = ccclass('BuildingSalesman'), _dec2 = property({
        type: Node,
        displayName: '建筑模型'
      }), _dec3 = property({
        type: Node,
        displayName: '解锁后售货员先移动到的位置点（可选）'
      }), _dec4 = property({
        type: Node,
        displayName: '最终工作岗位（ShopCommon 触发器范围内）'
      }), _dec5 = property({
        type: _crd && Salesman === void 0 ? (_reportPossibleCrUseOfSalesman({
          error: Error()
        }), Salesman) : Salesman,
        displayName: '售货员'
      }), _dec(_class = (_class2 = class BuildingSalesman extends (_crd && BuildingBase === void 0 ? (_reportPossibleCrUseOfBuildingBase({
        error: Error()
      }), BuildingBase) : BuildingBase) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "model", _descriptor, this);

          _initializerDefineProperty(this, "movePos", _descriptor2, this);

          _initializerDefineProperty(this, "workStationPos", _descriptor3, this);

          _initializerDefineProperty(this, "salesman", _descriptor4, this);
        }

        // ──────────────────────────────────────────────
        // 生命周期
        // ──────────────────────────────────────────────
        onLoad() {
          super.onLoad(); // 根据建筑类型同步售货员类型

          this._syncSalesmanType();
        } // ──────────────────────────────────────────────
        // BuildingBase 抽象方法实现
        // ──────────────────────────────────────────────

        /**
         * 锁定状态：隐藏建筑模型，隐藏并重置售货员
         */


        async showlock() {
          if (this.model) {
            this.model.active = false;
          }

          if (this.salesman) {
            this.salesman.node.active = false;
            this.salesman.node.setScale(0.1, 0.1, 0.1);
            this.salesman.node.setWorldPosition(this.node.getWorldPosition());
            this.salesman.reset();
          }
        }
        /**
         * 解锁动画：建筑模型弹出 → 售货员弹出
         */


        async showUnlockAnim() {
          return new Promise(resolve => {
            // 显示建筑模型并从 0 缩放弹出
            if (this.model) {
              this.model.active = true;
              this.model.setScale(new Vec3(0, 0, 0));
            } // 显示售货员并从小缩放弹出


            if (this.salesman) {
              this.salesman.node.active = true;
              this.salesman.node.setScale(0.1, 0.1, 0.1);
            }

            const modelTargetScale = this.model ? this.model.getScale().clone() : new Vec3(1, 1, 1); // 如果模型初始缩放已被设为0，目标用 (1,1,1)

            if (modelTargetScale.equals(Vec3.ZERO)) {
              modelTargetScale.set(1, 1, 1);
            }

            if (this.model) {
              tween(this.model).to(0.5, {
                scale: modelTargetScale
              }, {
                easing: easing.backOut
              }).call(() => {
                // 建筑弹出完成后，再弹出售货员
                if (this.salesman) {
                  tween(this.salesman.node).to(0.5, {
                    scale: v3(1, 1, 1)
                  }, {
                    easing: easing.backOut
                  }).start();
                }

                resolve();
              }).start();
            } else {
              resolve();
            }
          });
        }
        /**
         * 解锁完成：同步类型并激活售货员，让其走向工作岗位
         */


        onUnlockFinished() {
          this._syncSalesmanType();

          if (!this.salesman) return; // 获取最终工作岗位坐标

          const finalPos = this.workStationPos ? this.workStationPos.getWorldPosition() : undefined;

          if (this.movePos) {
            // 有过渡点：先走到 movePos，再激活（走向工作岗位）
            this.salesman.movementComponent.moveToWorldPosition(this.movePos.getWorldPosition(), () => {
              this.scheduleOnce(() => {
                this.salesman.activate(finalPos);
              }, 0.3);
            });
          } else {
            // 无过渡点：直接激活
            this.salesman.activate(finalPos);
          }
        } // ──────────────────────────────────────────────
        // 私有方法
        // ──────────────────────────────────────────────

        /** 将建筑类型同步给售货员 */


        _syncSalesmanType() {
          if (this.salesman) {
            this.salesman.salesmanType = this.Type;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "model", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "movePos", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "workStationPos", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "salesman", [_dec5], {
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
//# sourceMappingURL=d896ef7a995b62727c257f9d67f517fa1fb0e02d.js.map