System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, StateMachine, _crd;

  _export("StateMachine", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "adbe9ULVvBNspYyt/Cz+BO9", "StateMachine", undefined);
      /**
       * 基础状态接口
       */


      /**
       * 泛型状态机实现
       * @typeparam T 状态类型，可以是字符串或数字
       */
      _export("StateMachine", StateMachine = class StateMachine {
        /**
         * 创建状态机实例
         * @param config 可选的初始配置
         */
        constructor(config) {
          this._currentState = null;
          this._states = new Map();
          this._isChangingState = false;
          this._previousState = null;
          this._isPaused = false;

          if (config) {
            var _this$_states$get;

            this.registerStates(config.states); // 直接设置初始状态

            this._currentState = config.initialState; // 执行初始状态的进入逻辑

            (_this$_states$get = this._states.get(config.initialState)) == null || _this$_states$get.onEnter == null || _this$_states$get.onEnter();
          }
        }
        /**
         * 注册多个状态
         * @param states 状态映射对象
         */


        registerStates(states) {
          for (const [key, state] of Object.entries(states)) {
            this._states.set(key, state);
          }
        }
        /**
         * 注册单个状态
         * @param stateKey 状态键
         * @param state 状态对象
         */


        registerState(stateKey, state) {
          this._states.set(stateKey, state);
        }
        /**
         * 删除状态
         * @param stateKey 要删除的状态键
         * @returns 是否成功删除
         */


        removeState(stateKey) {
          if (this._currentState === stateKey) {
            //console.warn(`不能删除当前活动状态: ${String(stateKey)}`);
            return false;
          }

          return this._states.delete(stateKey);
        }
        /**
         * 切换状态
         * @param newState 新状态
         * @param data 可选的传递数据
         * @returns 是否成功切换
         */


        changeState(newState, data) {
          // 检查状态是否存在
          if (!this._states.has(newState)) {
            //console.error(`状态 ${String(newState)} 未注册!`);
            return false;
          } // 如果已经在变更状态或当前状态相同且不是初始化，则跳过


          if (this._isChangingState || this._currentState === newState) {
            return false;
          }

          this._isChangingState = true;
          const oldState = this._currentState;

          try {
            var _this$_states$get3;

            // 执行旧状态退出逻辑
            if (oldState && this._states.has(oldState)) {
              var _this$_states$get2;

              (_this$_states$get2 = this._states.get(oldState)) == null || _this$_states$get2.onExit == null || _this$_states$get2.onExit(data);
            } // 保存前一个状态


            this._previousState = oldState; // 设置新状态并执行进入逻辑

            this._currentState = newState;
            (_this$_states$get3 = this._states.get(newState)) == null || _this$_states$get3.onEnter == null || _this$_states$get3.onEnter(data);
            return true;
          } catch (error) {
            //console.error(`状态切换错误: ${error}`);
            return false;
          } finally {
            this._isChangingState = false;
          }
        }
        /**
         * 更新当前状态
         * @param dt 帧间隔时间
         */


        update(dt) {
          if (!this._currentState || this._isChangingState || this._isPaused) {
            return;
          }

          try {
            var _this$_states$get4;

            (_this$_states$get4 = this._states.get(this._currentState)) == null || _this$_states$get4.onUpdate == null || _this$_states$get4.onUpdate(dt);
          } catch (error) {//console.error(`状态更新错误: ${error}`);
          }
        }
        /**
         * 返回到前一个状态
         * @param data 可选的传递数据
         * @returns 是否成功返回
         */


        returnToPreviousState(data) {
          if (this._previousState) {
            return this.changeState(this._previousState, data);
          }

          return false;
        }
        /**
         * 检查指定状态是否已注册
         * @param stateKey 状态键
         */


        hasState(stateKey) {
          return this._states.has(stateKey);
        }
        /**
         * 暂停状态机更新
         */


        pause() {
          this._isPaused = true;
        }
        /**
         * 恢复状态机更新
         */


        resume() {
          this._isPaused = false;
        }
        /**
         * 重置状态机
         */


        reset() {
          if (this._currentState) {
            var _this$_states$get5;

            (_this$_states$get5 = this._states.get(this._currentState)) == null || _this$_states$get5.onExit == null || _this$_states$get5.onExit();
          }

          this._currentState = null;
          this._previousState = null;
          this._isChangingState = false;
          this._isPaused = false;
        }
        /** 获取当前状态 */


        get currentState() {
          return this._currentState;
        }
        /** 获取前一个状态 */


        get previousState() {
          return this._previousState;
        }
        /** 获取是否暂停 */


        get isPaused() {
          return this._isPaused;
        }
        /** 获取所有已注册状态键 */


        get stateKeys() {
          return Array.from(this._states.keys());
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=da3a54cdf3cf637915af8121962295dd6dfa8308.js.map