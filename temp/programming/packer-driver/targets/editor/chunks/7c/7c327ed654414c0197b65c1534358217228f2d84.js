System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, EventMgr, _class, _crd, eventMgr;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "00062YqZvNK9ZwSUIBhAc4a", "EventMgr", undefined);

      /**
       * 事件管理器
       * 该类用于管理事件的注册、触发和注销。
       */
      EventMgr = class EventMgr {
        /** 私有构造函数，确保外部无法直接通过new创建实例 */
        constructor() {
          /** 唯一ID生成器，用于为每个事件处理器分配唯一的ID */
          this.uniqueId = 0;

          /** 存储所有事件处理器，键为唯一ID */
          this.handlers = {};

          /** 存储每个目标对象对应的事件处理器ID集合 */
          this.targetMap = new Map();

          /** 存储每个事件名对应的事件处理器ID集合 */
          this.keyMap = new Map();

          /** 存储每个目标对象对应的事件名和处理器ID的映射 */
          this.targetKeyMap = new Map();

          /** 存储持久化的数据，键为事件名 */
          this.persistentData = {};

          /** 存储粘性事件的数据，键为事件名 */
          this.stickyData = {};
        }
        /** 单例实例 */


        /**
         * 注册事件
         * @param key 事件名
         * @param callback 回调函数，当事件触发时调用
         * @param target 回调函数的上下文（默认值为 {}）
         */
        on(key, callback, target = {}) {
          const id = this.getOrCreateId(key, target);
          this.handlers[id] = {
            callback,
            target,
            key
          };
          this.addIdToMap(this.targetMap, target, id);
          this.addIdToMap(this.keyMap, key, id);
          const sticky = this.stickyData[key];

          if (sticky) {
            callback.call(target, sticky);
            delete this.stickyData[key];
          }
        }
        /**
         * 触发事件
         * @param key 事件名
         * @param data 传递给回调函数的数据
         * @param options 其他参数
         *  persistence 是否持久化数据
         *  sticky 传1则为粘性事件
         */


        emit(key, data, options = {}) {
          if (options.persistence) this.persistentData[key] = data;
          const ids = this.keyMap.get(key);

          if (ids) {
            ids.forEach(id => {
              const {
                callback,
                target
              } = this.handlers[id];
              callback.call(target, data);
              if (options.sticky === 1) options.sticky = -1;
            });
          }

          if (options.sticky === 1) this.stickyData[key] = data;
        }
        /**
         * 获取持久化数据
         * @param key 事件名
         * @returns 持久化的数据
         */


        getPersistentData(key) {
          return this.persistentData[key];
        }
        /**
         * 注销事件
         * @param key 事件名
         * @param target 目标对象
         */


        off(key, target) {
          const targetKeys = this.targetKeyMap.get(target);
          if (targetKeys) this.removeHandler(targetKeys[key]);
        }
        /**
         * 注销目标对象的所有事件
         * @param target 目标对象
         */


        offAllByTarget(target) {
          this.removeAllHandlers(this.targetMap.get(target));
        }
        /**
         * 注销某个事件名的所有事件
         * @param key 事件名
         */


        offAllByKey(key) {
          this.removeAllHandlers(this.keyMap.get(key));
        }
        /**
         * 获取或创建唯一ID
         * @param key 事件名
         * @param target 目标对象
         * @returns 唯一ID
         */


        getOrCreateId(key, target) {
          let targetKeys = this.targetKeyMap.get(target) || {};
          const id = targetKeys[key] || ++this.uniqueId;
          targetKeys[key] = id;
          this.targetKeyMap.set(target, targetKeys);
          return id;
        }
        /**
         * 移除处理器
         * @param id 处理器ID
         */


        removeHandler(id) {
          const handler = this.handlers[id];
          if (!handler) return;
          const {
            target,
            key
          } = handler;
          delete this.targetKeyMap.get(target)[key];
          this.targetMap.get(target).delete(id);
          this.keyMap.get(key).delete(id);
          delete this.handlers[id];
          delete this.persistentData[key];
        }
        /**
         * 移除所有处理器
         * @param ids 处理器ID集合
         */


        removeAllHandlers(ids) {
          if (ids) ids.forEach(id => this.removeHandler(id));
        }
        /**
         * 将ID添加到映射中
         * @param map 映射
         * @param key 键
         * @param id ID
         */


        addIdToMap(map, key, id) {
          const set = map.get(key) || new Set();
          set.add(id);
          map.set(key, set);
        }

      };
      /** 事件管理器实例 */

      _class = EventMgr;
      EventMgr.instance = new _class();

      _export("eventMgr", eventMgr = EventMgr.instance);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7c327ed654414c0197b65c1534358217228f2d84.js.map