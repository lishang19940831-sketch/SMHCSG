System.register(["cc", "cc/env"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Director, director, EDITOR_NOT_IN_PREVIEW, TimeMgr, _class, _crd, timeMgr;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Director = _cc.Director;
      director = _cc.director;
    }, function (_ccEnv) {
      EDITOR_NOT_IN_PREVIEW = _ccEnv.EDITOR_NOT_IN_PREVIEW;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c5de7JBEo1LO6fiPesT/L7E", "TimeMgr", undefined);

      __checkObsolete__(['Director', 'director']);

      /** 定义任务类型 */

      /** 
       * 时间管理器
       * 提供任务的计时、添加和移除功能。
       */
      TimeMgr = class TimeMgr {
        /** 私有构造函数，确保外部无法直接通过new创建实例 */
        constructor() {
          /** 存储任务列表的映射 */
          this.taskList = new Map();

          /** 下一任务ID */
          this.nextTaskId = 0;

          /** 更新间隔（毫秒） */
          this.updateInterval = 1000;

          if (!EDITOR_NOT_IN_PREVIEW) {
            director.once(Director.EVENT_AFTER_SCENE_LAUNCH, this.startTimer, this);
          }
        }
        /** 单例实例 */


        /** 启动定时器 */
        startTimer() {
          setInterval(() => {
            this.updateTimer(this.updateInterval);
          }, this.updateInterval);
        }
        /**
         * 更新方法，用于在游戏的主循环中调用，更新所有定时任务
         * @param dt 自上一次更新以来经过的时间（毫秒）
         */


        updateTimer(dt) {
          var tasksToRemove = [];
          this.taskList.forEach((task, id) => {
            task.elapsed += dt;

            if (task.elapsed >= task.interval) {
              task.callback();

              if (task.repeat) {
                task.elapsed %= task.interval;
              } else {
                tasksToRemove.push(id);
              }
            }
          });
          /** 移除已完成的非重复任务 */

          tasksToRemove.forEach(id => this.taskList.delete(id));
        }
        /**
         * 添加一个新的定时任务
         * @param callback 要执行的回调函数
         * @param interval 时间间隔，单位为毫秒
         * @param repeat 是否重复执行
         * @returns 返回一个任务ID，可用于稍后移除定时任务
         */


        addTimer(callback, interval, repeat) {
          if (repeat === void 0) {
            repeat = false;
          }

          var taskId = this.nextTaskId++;
          this.taskList.set(taskId, {
            callback,
            interval,
            repeat,
            elapsed: 0
          });
          return taskId;
        }
        /**
         * 根据任务ID移除定时任务
         * @param taskId 要移除的任务的ID
         */


        removeTimer(taskId) {
          this.taskList.delete(taskId);
        }

      };
      /** 时间管理器实例 */

      _class = TimeMgr;
      TimeMgr.instance = new _class();

      _export("timeMgr", timeMgr = TimeMgr.instance);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d8450b3a348d6de6d3d12fc88ea34c9f5c8c8f5e.js.map