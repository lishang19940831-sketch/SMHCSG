System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, EDITOR, _decorator, Canvas, Component, director, Director, ResolutionPolicy, view, screen, adaptation_config, _class, _crd, ccclass, disallowMultiple, mk_adaptation_canvas;

  function _reportPossibleCrUseOfadaptation_config(extras) {
    _reporterNs.report("adaptation_config", "./global_config", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Canvas = _cc.Canvas;
      Component = _cc.Component;
      director = _cc.director;
      Director = _cc.Director;
      ResolutionPolicy = _cc.ResolutionPolicy;
      view = _cc.view;
      screen = _cc.screen;
    }, function (_ccEnv) {
      EDITOR = _ccEnv.EDITOR;
    }, function (_unresolved_2) {
      adaptation_config = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "06912t54RpO14gyAol/gaaE", "mk_adaptation_canvas", undefined);

      __checkObsolete__(['_decorator', 'Canvas', 'Component', 'director', 'Director', 'ResolutionPolicy', 'view', 'screen']);

      ({
        ccclass,
        disallowMultiple
      } = _decorator);
      /**
       * canvas 适配
       * @noInheritDoc
       */

      _export("default", mk_adaptation_canvas = ccclass(_class = disallowMultiple(_class = class mk_adaptation_canvas extends Component {
        /* ------------------------------- 生命周期 ------------------------------- */
        onLoad() {
          // 事件监听
          app.event.on("view_resize", this.adaptation, this);
        }

        onEnable() {
          // 初始化视图
          this.adaptation();
        }

        onDestroy() {
          app.event.off("view_resize", this);
        }
        /* ------------------------------- 功能 ------------------------------- */

        /** 适配 */


        async adaptation() {
          var _director$getScene2;

          // await new Promise((resolve) => this.scheduleOnce(resolve));
          const canvas = (_director$getScene2 = director.getScene()) == null ? void 0 : _director$getScene2.getComponentInChildren(Canvas); // 安检

          if (!canvas) {
            return;
          }
          /** 真实尺寸 */


          const frame_size = screen.windowSize;

          switch ((_crd && adaptation_config === void 0 ? (_reportPossibleCrUseOfadaptation_config({
            error: Error()
          }), adaptation_config) : adaptation_config).view.adaptation_type) {
            // 自适应
            case (_crd && adaptation_config === void 0 ? (_reportPossibleCrUseOfadaptation_config({
              error: Error()
            }), adaptation_config) : adaptation_config).view.adaptation_mode.adaptive:
              {
                /** 设计尺寸 */
                const design_size = (_crd && adaptation_config === void 0 ? (_reportPossibleCrUseOfadaptation_config({
                  error: Error()
                }), adaptation_config) : adaptation_config).view.original_design_size; // 检查设计尺寸是否有效

                if (design_size.width <= 0 || design_size.height <= 0) {
                  app.log.warn("mk_adaptation_canvas: 设计尺寸不能为零");
                  return;
                } // 检查真实尺寸是否有效


                if (frame_size.width <= 0 || frame_size.height <= 0) {
                  app.log.warn("mk_adaptation_canvas: 真实尺寸不能为零");
                  return;
                }
                /** 真实尺寸比设计尺寸高 */


                const higher_b = frame_size.height / frame_size.width > design_size.height / design_size.width;

                if (higher_b) {
                  view.setDesignResolutionSize(design_size.width, frame_size.height * (design_size.width / frame_size.width), ResolutionPolicy.FIXED_WIDTH);
                } else {
                  view.setDesignResolutionSize(frame_size.width * (design_size.height / frame_size.height), design_size.height, ResolutionPolicy.FIXED_HEIGHT);
                }

                break;
              }
            // 固定尺寸

            case (_crd && adaptation_config === void 0 ? (_reportPossibleCrUseOfadaptation_config({
              error: Error()
            }), adaptation_config) : adaptation_config).view.adaptation_mode.fixed_size:
              {
                view.setDesignResolutionSize(frame_size.width, frame_size.height, ResolutionPolicy.UNKNOWN);
                break;
              }
          }
        }

      }) || _class) || _class);

      // 自动添加至场景节点
      if (!EDITOR && (_crd && adaptation_config === void 0 ? (_reportPossibleCrUseOfadaptation_config({
        error: Error()
      }), adaptation_config) : adaptation_config).view.adaptation_type !== (_crd && adaptation_config === void 0 ? (_reportPossibleCrUseOfadaptation_config({
        error: Error()
      }), adaptation_config) : adaptation_config).view.adaptation_mode.none) {
        director.on(Director.EVENT_AFTER_SCENE_LAUNCH, () => {
          var _director$getScene;

          const canvas_node = (_director$getScene = director.getScene()) == null || (_director$getScene = _director$getScene.getComponentInChildren(Canvas)) == null ? void 0 : _director$getScene.node;

          if (!canvas_node || canvas_node.getComponent(mk_adaptation_canvas)) {
            return;
          }

          canvas_node.addComponent(mk_adaptation_canvas);
        });
      }

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=931d87b9e2127e1e4a9b5406b806c0c86b353909.js.map