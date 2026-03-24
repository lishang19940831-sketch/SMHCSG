System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Node, AudioSource, Director, director, EDITOR_NOT_IN_PREVIEW, dataMgr, resMgr, AudioMgr, _class, _crd, audioMgr;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOfdataMgr(extras) {
    _reporterNs.report("dataMgr", "./DataMgr", _context.meta, extras);
  }

  function _reportPossibleCrUseOfresMgr(extras) {
    _reporterNs.report("resMgr", "./ResMgr", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Node = _cc.Node;
      AudioSource = _cc.AudioSource;
      Director = _cc.Director;
      director = _cc.director;
    }, function (_ccEnv) {
      EDITOR_NOT_IN_PREVIEW = _ccEnv.EDITOR_NOT_IN_PREVIEW;
    }, function (_unresolved_2) {
      dataMgr = _unresolved_2.dataMgr;
    }, function (_unresolved_3) {
      resMgr = _unresolved_3.resMgr;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5d5e6jl+BhCcrd/zd8mluAV", "AudioMgr", undefined);

      __checkObsolete__(['Node', 'AudioSource', 'Director', 'director', 'AudioClip']);

      /** 
       * 音频管理器
       * 提供音乐和音效的播放、暂停、复位功能。
       */
      AudioMgr = class AudioMgr {
        /** 私有构造函数，确保外部无法直接通过new创建实例 */
        constructor() {
          /** 音乐播放组件 */
          this.musicSource = void 0;

          /** 音效播放组件池 */
          this.effectSourcePool = [];

          /** 音乐开关 */
          this.musicSwitch = true;

          /** 音效开关 */
          this.effectSwitch = true;

          /** 音乐音量 */
          this.musicVolume = void 0;

          /** 音效音量 */
          this.effectVolume = void 0;

          /** 当前音效组件池索引 */
          this.effectSourceIndex = 0;

          /** 已加载的音频资源缓存 */
          this.audioCache = new Map();

          /** 音效播放记录，用于防重复播放 */
          this.effectPlayRecord = new Map();

          /** 音效防重复播放间隔时间（毫秒），默认200ms */
          this.effectCooldownTime = 100;

          if (!EDITOR_NOT_IN_PREVIEW) {
            director.once(Director.EVENT_AFTER_SCENE_LAUNCH, this.init, this);
          }
        }
        /** 单例实例 */


        /** 初始化 */
        init() {
          var _getNumber, _getNumber2;

          this.musicVolume = (_getNumber = (_crd && dataMgr === void 0 ? (_reportPossibleCrUseOfdataMgr({
            error: Error()
          }), dataMgr) : dataMgr).getNumber("musicVolume")) != null ? _getNumber : 0.5;
          this.effectVolume = (_getNumber2 = (_crd && dataMgr === void 0 ? (_reportPossibleCrUseOfdataMgr({
            error: Error()
          }), dataMgr) : dataMgr).getNumber("effectVolume")) != null ? _getNumber2 : 0.5;
          this.musicSwitch = this.getDataBoolean("musicSwitch", false);
          this.effectSwitch = this.getDataBoolean("effectSwitch", false);
          /** 创建节点 */

          var audioMgrNode = new Node("__AudioMgr__");
          director.getScene().addChild(audioMgrNode);
          this.musicSource = this.createAudioSource(audioMgrNode, this.musicVolume);

          for (var i = 0; i < 5; i++) {
            this.effectSourcePool.push(this.createAudioSource(audioMgrNode, this.effectVolume));
          }
        }
        /**
         * 创建音频源
         * @param node 节点
         * @param volume 音量
         * @returns AudioSource 音频源组件
         */


        createAudioSource(node, volume) {
          var source = node.addComponent(AudioSource);
          source.loop = false;
          source.playOnAwake = false;
          source.volume = volume;
          return source;
        }
        /**
         * 预加载音频资源，解决音频缓冲区问题
         * @param paths 音频资源路径数组
         * @returns Promise<void> 加载完成后的Promise
         */


        preloadAudios(paths) {
          var _this = this;

          return _asyncToGenerator(function* () {
            return;
            var promises = paths.map( /*#__PURE__*/_asyncToGenerator(function* (path) {
              try {
                var clip = yield (_crd && resMgr === void 0 ? (_reportPossibleCrUseOfresMgr({
                  error: Error()
                }), resMgr) : resMgr).loadRes(path);

                _this.audioCache.set(path, clip);

                return clip;
              } catch (error) {
                app.log.err("\u9884\u52A0\u8F7D\u97F3\u9891\u5931\u8D25: " + path, error);
                return null;
              }
            }));
            yield Promise.all(promises);
          })();
        }
        /**
         * 播放音乐
         * @param path 音乐路径
         * @param loop 是否循环播放，默认为'true'
         * @param volume 音量大小，默认为'1.0'
         * @returns Promise<void> 播放完成后的Promise
         */


        playMusic(path, loop, volume) {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            if (loop === void 0) {
              loop = true;
            }

            if (volume === void 0) {
              volume = 1.0;
            }

            if (!_this2.musicSwitch) return;
            var clip; // 先从缓存中获取

            if (_this2.audioCache.has(path)) {
              clip = _this2.audioCache.get(path);
            } else {
              clip = yield (_crd && resMgr === void 0 ? (_reportPossibleCrUseOfresMgr({
                error: Error()
              }), resMgr) : resMgr).loadRes(path);

              _this2.audioCache.set(path, clip);
            }

            _this2.musicSource.stop();

            _this2.musicSource.clip = clip;
            _this2.musicSource.loop = loop;
            _this2.musicSource.volume = _this2.musicVolume * volume;

            _this2.musicSource.play();
          })();
        }
        /** 重播当前音乐 */


        replayMusic() {
          this.musicSource.stop();
          this.musicSource.play();
        }
        /** 暂停当前播放的音乐 */


        pauseMusic() {
          this.musicSource.pause();
        }
        /** 停止当前播放的音乐 */


        stopMusic() {
          this.musicSource.stop();
        }
        /**
         * 播放音效
         * @param path 音效路径
         * @param volume 音量大小，默认为'1.0'
         * @param ignoreCooldown 是否忽略冷却时间，默认为false
         * @returns Promise<void> 播放完成后的Promise
         */


        playEffect(path, volume, ignoreCooldown) {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            if (volume === void 0) {
              volume = 1.0;
            }

            if (ignoreCooldown === void 0) {
              ignoreCooldown = false;
            }

            if (!_this3.effectSwitch) return; // 检查防重复播放

            if (!ignoreCooldown && _this3.isEffectInCooldown(path)) {
              // app.log.debug("音效在冷却中，跳过播放：", path);
              return;
            } // app.log.debug("播放音效：", path);


            var clip; // 先从缓存中获取

            if (_this3.audioCache.has(path)) {
              clip = _this3.audioCache.get(path);
            } else {
              clip = yield (_crd && resMgr === void 0 ? (_reportPossibleCrUseOfresMgr({
                error: Error()
              }), resMgr) : resMgr).loadRes(path);

              _this3.audioCache.set(path, clip);
            } // 记录播放时间


            _this3.effectPlayRecord.set(path, Date.now());

            var source = _this3.getNextEffectSource();

            source.playOneShot(clip, _this3.effectVolume * volume);
          })();
        }
        /**
         * 获取下一个音效组件
         * @returns AudioSource 下一个音效组件
         */


        getNextEffectSource() {
          var source = this.effectSourcePool[this.effectSourceIndex];
          this.effectSourceIndex = (this.effectSourceIndex + 1) % this.effectSourcePool.length;
          return source;
        }
        /**
         * 检查音效是否在冷却中
         * @param path 音效路径
         * @returns boolean 是否在冷却中
         */


        isEffectInCooldown(path) {
          var lastPlayTime = this.effectPlayRecord.get(path);
          if (!lastPlayTime) return false;
          var currentTime = Date.now();
          return currentTime - lastPlayTime < this.effectCooldownTime;
        }
        /**
         * 设置音效防重复播放间隔时间
         * @param cooldownTime 冷却时间（毫秒）
         */


        setEffectCooldownTime(cooldownTime) {
          this.effectCooldownTime = Math.max(0, cooldownTime);
        }
        /**
         * 获取音效防重复播放间隔时间
         * @returns number 冷却时间（毫秒）
         */


        getEffectCooldownTime() {
          return this.effectCooldownTime;
        }
        /**
         * 清除指定音效的播放记录
         * @param path 音效路径，如果不传则清除所有记录
         */


        clearEffectPlayRecord(path) {
          if (path) {
            this.effectPlayRecord.delete(path);
          } else {
            this.effectPlayRecord.clear();
          }
        }
        /**
         * 设置音乐音量
         * @param volume 音量大小，范围为 0.0 到 1.0
         */


        setMusicVolume(volume) {
          this.musicVolume = volume;
          this.musicSource.volume = volume;
          (_crd && dataMgr === void 0 ? (_reportPossibleCrUseOfdataMgr({
            error: Error()
          }), dataMgr) : dataMgr).setData("musicVolume", volume);
        }
        /**
         * 获取当前音乐音量
         * @returns 当前音乐音量，范围为 0.0 到 1.0
         */


        getMusicVolume() {
          return this.musicVolume;
        }
        /**
         * 设置音效音量
         * @param volume 音量大小，范围为 0.0 到 1.0
         */


        setEffectVolume(volume) {
          this.effectVolume = volume;
          this.effectSourcePool.forEach(source => source.volume = volume);
          (_crd && dataMgr === void 0 ? (_reportPossibleCrUseOfdataMgr({
            error: Error()
          }), dataMgr) : dataMgr).setData("effectVolume", volume);
        }
        /**
         * 获取当前音效音量
         * @returns 当前音效音量，范围为 0.0 到 1.0
         */


        getEffectVolume() {
          return this.effectVolume;
        }
        /**
         * 设置音乐开关
         * @param isOn 是否打开音乐
         */


        setMusicSwitch(isOn) {
          this.musicSwitch = isOn;
          (_crd && dataMgr === void 0 ? (_reportPossibleCrUseOfdataMgr({
            error: Error()
          }), dataMgr) : dataMgr).setData("musicSwitch", isOn);

          if (!isOn) {
            var _this$musicSource;

            (_this$musicSource = this.musicSource) == null || _this$musicSource.pause();
          } else if (this.musicSource.clip) {
            var _this$musicSource2;

            (_this$musicSource2 = this.musicSource) == null || _this$musicSource2.play();
          }
        }
        /**
         * 获取音乐开关状态
         * @returns 音乐开关状态
         */


        getMusicSwitch() {
          return this.musicSwitch;
        }
        /**
         * 设置音效开关
         * @param isOn 是否打开音效
         */


        setEffectSwitch(isOn) {
          this.effectSwitch = isOn;
          (_crd && dataMgr === void 0 ? (_reportPossibleCrUseOfdataMgr({
            error: Error()
          }), dataMgr) : dataMgr).setData("effectSwitch", isOn);
        }
        /**
         * 获取音效开关状态
         * @returns 音效开关状态
         */


        getEffectSwitch() {
          return this.effectSwitch;
        }
        /**
         * 从存储中获取布尔值
         * @param key 键名
         * @param defaultValue 默认值
         * @returns 布尔值
         */


        getDataBoolean(key, defaultValue) {
          if (defaultValue === void 0) {
            defaultValue = false;
          }

          var value = (_crd && dataMgr === void 0 ? (_reportPossibleCrUseOfdataMgr({
            error: Error()
          }), dataMgr) : dataMgr).getText(key);
          if (value === null) return defaultValue;
          return value.toLowerCase() === 'true';
        }

      };
      /** 音频管理器实例 */

      _class = AudioMgr;
      AudioMgr.instance = new _class();

      _export("audioMgr", audioMgr = AudioMgr.instance);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7a09ee109e0f0a3226309c9416fec05c57502805.js.map