System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, StateMachine, CharacterState, ComponentEvent, BaseComponet, _dec, _class, _crd, ccclass, property, StateComponent;

  function _reportPossibleCrUseOfStateMachine(extras) {
    _reporterNs.report("StateMachine", "../StateMachine/StateMachine", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCharacterState(extras) {
    _reporterNs.report("CharacterState", "../../Main/Common/CommonEnum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfComponentEvent(extras) {
    _reporterNs.report("ComponentEvent", "../../Main/Common/ComponentEvents", _context.meta, extras);
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
    }, function (_unresolved_2) {
      StateMachine = _unresolved_2.StateMachine;
    }, function (_unresolved_3) {
      CharacterState = _unresolved_3.CharacterState;
    }, function (_unresolved_4) {
      ComponentEvent = _unresolved_4.ComponentEvent;
    }, function (_unresolved_5) {
      BaseComponet = _unresolved_5.BaseComponet;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2dcf0q8YlNOFogjl6Qid1DE", "StateComponent", undefined);

      __checkObsolete__(['_decorator', 'Component']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 状态组件 - 管理角色状态机相关功能
       */

      _export("StateComponent", StateComponent = (_dec = ccclass('StateComponent'), _dec(_class = class StateComponent extends (_crd && BaseComponet === void 0 ? (_reportPossibleCrUseOfBaseComponet({
        error: Error()
      }), BaseComponet) : BaseComponet) {
        constructor(...args) {
          super(...args);

          /** 状态机实例 */
          this.stateMachine = null;

          /** 状态进入回调映射 */
          this.stateEnterCallbacks = new Map();

          /** 状态更新回调映射 */
          this.stateUpdateCallbacks = new Map();

          /** 状态退出回调映射 */
          this.stateExitCallbacks = new Map();
        }

        onLoad() {
          super.onLoad();
          this.registerEvents();
        }

        start() {
          this.initStateMachine();
        }

        onDestroy() {
          this.unregisterEvents();
        }
        /**
         * 注册事件监听
         */


        registerEvents() {
          // 监听状态改变事件
          this.node.on((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).CHANGE_STATE, this.onChangeState, this);
        }
        /**
         * 注销事件监听
         */


        unregisterEvents() {
          this.node.off((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).CHANGE_STATE, this.onChangeState, this);
        }
        /**
         * 处理状态改变事件
         */


        onChangeState(state) {
          this.changeState(state);
        }
        /**
         * 初始化状态机
         */


        initStateMachine() {
          this.stateMachine = new (_crd && StateMachine === void 0 ? (_reportPossibleCrUseOfStateMachine({
            error: Error()
          }), StateMachine) : StateMachine)({
            initialState: (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
              error: Error()
            }), CharacterState) : CharacterState).Idle,
            states: {
              [(_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                error: Error()
              }), CharacterState) : CharacterState).Idle]: {
                onEnter: this.onStateEnter.bind(this, (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                  error: Error()
                }), CharacterState) : CharacterState).Idle),
                onUpdate: this.onStateUpdate.bind(this, (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                  error: Error()
                }), CharacterState) : CharacterState).Idle)
              },
              [(_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                error: Error()
              }), CharacterState) : CharacterState).Move]: {
                onEnter: this.onStateEnter.bind(this, (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                  error: Error()
                }), CharacterState) : CharacterState).Move),
                onUpdate: this.onStateUpdate.bind(this, (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                  error: Error()
                }), CharacterState) : CharacterState).Move),
                onExit: this.onStateExit.bind(this, (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                  error: Error()
                }), CharacterState) : CharacterState).Move)
              },
              [(_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                error: Error()
              }), CharacterState) : CharacterState).Attack]: {
                onEnter: this.onStateEnter.bind(this, (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                  error: Error()
                }), CharacterState) : CharacterState).Attack),
                onUpdate: this.onStateUpdate.bind(this, (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                  error: Error()
                }), CharacterState) : CharacterState).Attack),
                onExit: this.onStateExit.bind(this, (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                  error: Error()
                }), CharacterState) : CharacterState).Attack)
              },
              [(_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                error: Error()
              }), CharacterState) : CharacterState).Skill]: {
                onEnter: this.onStateEnter.bind(this, (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                  error: Error()
                }), CharacterState) : CharacterState).Skill),
                onUpdate: this.onStateUpdate.bind(this, (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                  error: Error()
                }), CharacterState) : CharacterState).Skill),
                onExit: this.onStateExit.bind(this, (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                  error: Error()
                }), CharacterState) : CharacterState).Skill)
              },
              [(_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                error: Error()
              }), CharacterState) : CharacterState).Dead]: {
                onEnter: this.onStateEnter.bind(this, (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                  error: Error()
                }), CharacterState) : CharacterState).Dead),
                onUpdate: this.onStateUpdate.bind(this, (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
                  error: Error()
                }), CharacterState) : CharacterState).Dead)
              }
            }
          });
        }
        /**
         * 设置状态进入回调
         * @param state 状态
         * @param callback 回调函数
         */


        setStateEnterCallback(state, callback) {
          this.stateEnterCallbacks.set(state, callback);
        }
        /**
         * 设置状态更新回调
         * @param state 状态
         * @param callback 回调函数
         */


        setStateUpdateCallback(state, callback) {
          this.stateUpdateCallbacks.set(state, callback);
        }
        /**
         * 设置状态退出回调
         * @param state 状态
         * @param callback 回调函数
         */


        setStateExitCallback(state, callback) {
          this.stateExitCallbacks.set(state, callback);
        }
        /**
         * 状态进入回调
         * @param state 状态
         */


        onStateEnter(state) {
          const callback = this.stateEnterCallbacks.get(state);

          if (callback) {
            callback();
          } // 发送状态改变事件


          this.node.emit((_crd && ComponentEvent === void 0 ? (_reportPossibleCrUseOfComponentEvent({
            error: Error()
          }), ComponentEvent) : ComponentEvent).STATE_CHANGED, state);
        }
        /**
         * 状态更新回调
         * @param state 状态
         * @param dt 时间间隔
         */


        onStateUpdate(state, dt) {
          const callback = this.stateUpdateCallbacks.get(state);

          if (callback) {
            callback(dt);
          }
        }
        /**
         * 状态退出回调
         * @param state 状态
         */


        onStateExit(state) {
          const callback = this.stateExitCallbacks.get(state);

          if (callback) {
            callback();
          }
        }
        /**
         * 更新状态机
         * @param dt 时间间隔
         */


        update(dt) {
          if (this.stateMachine) {
            this.stateMachine.update(dt);
          }
        }
        /**
         * 改变状态
         * @param state 目标状态
         */


        changeState(state) {
          if (this.stateMachine && this.stateMachine.currentState !== state) {
            this.stateMachine.changeState(state);
          }
        }
        /**
         * 获取当前状态
         * @returns 当前状态
         */


        getCurrentState() {
          return this.stateMachine ? this.stateMachine.currentState : (_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
            error: Error()
          }), CharacterState) : CharacterState).Idle;
        }
        /**
         * 判断是否处于指定状态
         * @param state 要检查的状态
         * @returns 是否处于该状态
         */


        isInState(state) {
          return this.stateMachine && this.stateMachine.currentState === state;
        }
        /**
         * 重置状态机到初始状态
         */


        reset() {
          if (this.stateMachine) {
            this.stateMachine.changeState((_crd && CharacterState === void 0 ? (_reportPossibleCrUseOfCharacterState({
              error: Error()
            }), CharacterState) : CharacterState).Idle);
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0f5456e08c543db6dc3170845b525f2911030f55.js.map