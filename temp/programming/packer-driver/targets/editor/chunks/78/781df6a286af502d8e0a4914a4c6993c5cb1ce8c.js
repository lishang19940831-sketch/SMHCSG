System.register(["cc", "cc/env"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Node, _decorator, Canvas, Component, director, Enum, size, Sprite, UITransform, v2, v3, Vec3, EDITOR, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _crd, ccclass, property, menu, executeInEditMode, _mk_adaptation_node, mk_adaptation_node;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Node = _cc.Node;
      _decorator = _cc._decorator;
      Canvas = _cc.Canvas;
      Component = _cc.Component;
      director = _cc.director;
      Enum = _cc.Enum;
      size = _cc.size;
      Sprite = _cc.Sprite;
      UITransform = _cc.UITransform;
      v2 = _cc.v2;
      v3 = _cc.v3;
      Vec3 = _cc.Vec3;
    }, function (_ccEnv) {
      EDITOR = _ccEnv.EDITOR;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3b56avlizRETZq+oleQ1QXA", "mk_adaptation_node", undefined);

      __checkObsolete__(['Node', '_decorator', 'Canvas', 'Component', 'director', 'Enum', 'size', 'Size', 'Sprite', 'UITransform', 'v2', 'v3', 'Vec3']);

      // eslint-disable-next-line @typescript-eslint/naming-convention
      ({
        ccclass,
        property,
        menu,
        executeInEditMode
      } = _decorator);

      (function (_mk_adaptation_node2) {
        let type = /*#__PURE__*/function (type) {
          type[type["\u9ED8\u8BA4"] = 0] = "\u9ED8\u8BA4";
          type[type["\u7F29\u653E"] = 1] = "\u7F29\u653E";
          type[type["\u81EA\u9002\u5E94_\u5C55\u793A\u5B8C"] = 2] = "\u81EA\u9002\u5E94_\u5C55\u793A\u5B8C";
          type[type["\u81EA\u9002\u5E94_\u586B\u5145\u6EE1"] = 3] = "\u81EA\u9002\u5E94_\u586B\u5145\u6EE1";
          type[type["\u586B\u5145\u5BBD"] = 4] = "\u586B\u5145\u5BBD";
          type[type["\u586B\u5145\u9AD8"] = 5] = "\u586B\u5145\u9AD8";
          return type;
        }({});

        _mk_adaptation_node2.type = type;

        let mode = /*#__PURE__*/function (mode) {
          mode[mode["scale"] = 0] = "scale";
          mode[mode["size"] = 1] = "size";
          return mode;
        }({});

        _mk_adaptation_node2.mode = mode;

        let source = /*#__PURE__*/function (source) {
          source[source["canvas"] = 0] = "canvas";
          source[source["parent"] = 1] = "parent";
          source[source["customize"] = 2] = "customize";
          return source;
        }({});

        _mk_adaptation_node2.source = source;
      })(_mk_adaptation_node || (_mk_adaptation_node = {}));
      /**
       * 节点适配
       * @noInheritDoc
       */


      _export("default", mk_adaptation_node = (_dec = property({
        displayName: "编辑器预览"
      }), _dec2 = property({
        displayName: "适配模式",
        type: Enum(_mk_adaptation_node.mode)
      }), _dec3 = property({
        displayName: "适配来源",
        type: Enum(_mk_adaptation_node.source)
      }), _dec4 = property({
        displayName: "原始大小",

        visible() {
          return this.adaptation_mode === _mk_adaptation_node.mode.size;
        }

      }), _dec5 = property({
        displayName: "自定义适配大小",

        visible() {
          return this.adaptation_source === _mk_adaptation_node.source.customize;
        }

      }), _dec6 = property({
        displayName: "适配类型",
        type: Enum(_mk_adaptation_node.type)
      }), _dec7 = property({
        displayName: "限制最大缩放",

        visible() {
          return this.adaptation_mode === _mk_adaptation_node.mode.scale;
        }

      }), _dec8 = property({
        displayName: "限制最小缩放",

        visible() {
          return this.adaptation_mode === _mk_adaptation_node.mode.scale;
        }

      }), _dec9 = property({
        displayName: "最大缩放",
        type: Vec3,
        visible: function () {
          return this.limit_max_scale_b;
        }
      }), _dec10 = property({
        displayName: "最小缩放",
        type: Vec3,
        visible: function () {
          return this.limit_min_scale_b;
        }
      }), ccclass(_class = executeInEditMode(_class = (_class2 = class mk_adaptation_node extends Component {
        constructor(...args) {
          super(...args);

          /** 适配模式 */
          _initializerDefineProperty(this, "adaptation_mode", _descriptor, this);

          /** 适配来源 */
          _initializerDefineProperty(this, "adaptation_source", _descriptor2, this);

          /** 原始大小 */
          _initializerDefineProperty(this, "original_size", _descriptor3, this);

          /** 自定义适配大小 */
          _initializerDefineProperty(this, "custom_adapt_size", _descriptor4, this);

          /* --------------- private --------------- */

          /** 适配类型 */
          _initializerDefineProperty(this, "_type", _descriptor5, this);

          /** 限制最大缩放 */
          _initializerDefineProperty(this, "_limit_max_scale_b", _descriptor6, this);

          /** 限制最小缩放 */
          _initializerDefineProperty(this, "_limit_min_scale_b", _descriptor7, this);

          /** 最大缩放 */
          _initializerDefineProperty(this, "_max_scale_v3", _descriptor8, this);

          /** 最小缩放 */
          _initializerDefineProperty(this, "_min_scale_v3", _descriptor9, this);

          /** 编辑器预览 */
          this._editor_preview_b = false;
        }

        /* --------------- 属性 --------------- */

        /** 编辑器预览 */
        get editor_preview_b() {
          return this._editor_preview_b;
        }

        set editor_preview_b(value_b_) {
          this._editor_preview_b = value_b_;

          if (value_b_) {
            this.update_adaptation();
          }
        }

        /** 适配类型 */
        get type() {
          return this._type;
        }

        set type(value_) {
          this._type = value_;

          if (this.editor_preview_b) {
            this.update_adaptation();
          }
        }
        /** 限制最大缩放 */


        get limit_max_scale_b() {
          return this._limit_max_scale_b;
        }

        set limit_max_scale_b(value_b_) {
          this._limit_max_scale_b = value_b_;

          if (this.type === _mk_adaptation_node.type.填充宽 || this.type === _mk_adaptation_node.type.填充高) {
            this.update_adaptation();
          }
        }
        /** 限制最小缩放 */


        get limit_min_scale_b() {
          return this._limit_min_scale_b;
        }

        set limit_min_scale_b(value_b_) {
          this._limit_min_scale_b = value_b_;

          if (this.type === _mk_adaptation_node.type.填充宽 || this.type === _mk_adaptation_node.type.填充高) {
            this.update_adaptation();
          }
        }
        /** 最大缩放 */


        get max_scale_v3() {
          return this._max_scale_v3;
        }

        set max_scale_v3(value_v3_) {
          this._max_scale_v3 = value_v3_;

          if (this.type === _mk_adaptation_node.type.填充宽 || this.type === _mk_adaptation_node.type.填充高) {
            this.update_adaptation();
          }
        }
        /** 最小缩放 */


        get min_scale_v3() {
          return this._min_scale_v3;
        }

        set min_scale_v3(value_v3_) {
          this._min_scale_v3 = value_v3_;

          if (this.type === _mk_adaptation_node.type.填充宽 || this.type === _mk_adaptation_node.type.填充高) {
            this.update_adaptation();
          }
        }

        /* ------------------------------- 生命周期 ------------------------------- */
        onLoad() {
          if (EDITOR) {
            if (this.original_size.equals(size())) {
              this.original_size = this.node.getComponent(UITransform).contentSize.clone();
            }

            this.update_adaptation();
          }
        }

        onEnable() {
          this.update_adaptation();

          if (this.adaptation_source === _mk_adaptation_node.source.canvas) {
            app.event.on("view_resize", this._event_global_resize, this);
          } else if (this.adaptation_source === _mk_adaptation_node.source.parent) {
            var _this$node$parent;

            (_this$node$parent = this.node.parent) == null || _this$node$parent.on(Node.EventType.SIZE_CHANGED, this._event_node_size_changed, this);
          }

          if (this.node.getComponent(Sprite)) {
            this.node.on(Sprite.EventType.SPRITE_FRAME_CHANGED, this._event_node_sprite_frame_changed, this);
          }

          this.node.on(Node.EventType.SIZE_CHANGED, this._event_node_size_changed, this);
        }

        onDisable() {
          if (this.adaptation_source === _mk_adaptation_node.source.canvas) {
            app.event.off("view_resize", this);
          } else if (this.adaptation_source === _mk_adaptation_node.source.parent) {
            var _this$node$parent2;

            (_this$node$parent2 = this.node.parent) == null || _this$node$parent2.off(Node.EventType.SIZE_CHANGED, this._event_node_size_changed, this);
          }

          this.node.off(Sprite.EventType.SPRITE_FRAME_CHANGED, this._event_node_sprite_frame_changed, this);
          this.node.off(Node.EventType.SIZE_CHANGED, this._event_node_size_changed, this);
        }
        /* ------------------------------- 功能函数 ------------------------------- */

        /** 延迟更新适配 */


        _delayed_update_adaptation(time_ms_n_ = 50) {
          this.scheduleOnce(() => {
            this.update_adaptation();
          }, time_ms_n_ * 0.001);
        }
        /** 自适应-展示完 */


        _adaptive_show_all(design_size_, frame_size_) {
          // 检查除数是否为零
          if (frame_size_.width <= 0 || frame_size_.height <= 0) {
            app.log.warn("mk_adaptation_node: 帧尺寸不能为零");
            return;
          }

          const scale_v2 = v2(design_size_.width / frame_size_.width, design_size_.height / frame_size_.height);

          if (scale_v2.x < scale_v2.y) {
            scale_v2.y = scale_v2.x;
          } else {
            scale_v2.x = scale_v2.y;
          }

          if (this.adaptation_mode === _mk_adaptation_node.mode.scale) {
            this.node.setScale(scale_v2.x, scale_v2.y);
          } else {
            this.node.getComponent(UITransform).setContentSize(this.original_size.width * scale_v2.x, this.original_size.height * scale_v2.y);
          }
        }
        /** 自适应-填充满 */


        _adaptive_fill_up(design_size_, frame_size_) {
          // 检查除数是否为零
          if (frame_size_.width <= 0 || frame_size_.height <= 0) {
            app.log.warn("mk_adaptation_node: 帧尺寸不能为零");
            return;
          }

          const scale_v2 = v2(design_size_.width / frame_size_.width, design_size_.height / frame_size_.height);

          if (scale_v2.x < scale_v2.y) {
            scale_v2.x = scale_v2.y;
          } else {
            scale_v2.y = scale_v2.x;
          }

          if (this.adaptation_mode === _mk_adaptation_node.mode.scale) {
            this.node.setScale(scale_v2.x, scale_v2.y);
          } else {
            this.node.getComponent(UITransform).setContentSize(this.original_size.width * scale_v2.x, this.original_size.height * scale_v2.y);
          }
        }
        /** 填充宽 */


        _fill_width(design_size_, frame_size_) {
          // 检查除数是否为零
          if (frame_size_.width <= 0) {
            app.log.warn("mk_adaptation_node: 帧宽度不能为零");
            return;
          }

          const scale_n = design_size_.width / frame_size_.width;
          const scale_v2 = v2(scale_n, scale_n);

          if (this.limit_max_scale_b) {
            scale_v2.x = Math.min(scale_v2.x, this.max_scale_v3.x);
            scale_v2.y = Math.min(scale_v2.y, this.max_scale_v3.y);
          }

          if (this.limit_min_scale_b) {
            scale_v2.x = Math.max(scale_v2.x, this.min_scale_v3.x);
            scale_v2.y = Math.max(scale_v2.y, this.min_scale_v3.y);
          }

          if (this.adaptation_mode === _mk_adaptation_node.mode.scale) {
            this.node.setScale(scale_v2.x, scale_v2.y);
          } else {
            this.node.getComponent(UITransform).setContentSize(this.original_size.width * scale_v2.x, this.original_size.height * scale_v2.y);
          }
        }
        /** 填充高 */


        _fill_height(design_size_, frame_size_) {
          // 检查除数是否为零
          if (frame_size_.height <= 0) {
            app.log.warn("mk_adaptation_node: 帧高度不能为零");
            return;
          }

          const scale_n = design_size_.height / frame_size_.height;
          const scale_v2 = v2(scale_n, scale_n);

          if (this.limit_max_scale_b) {
            scale_v2.x = Math.min(scale_v2.x, this.max_scale_v3.x);
            scale_v2.y = Math.min(scale_v2.y, this.max_scale_v3.y);
          }

          if (this.limit_min_scale_b) {
            scale_v2.x = Math.max(scale_v2.x, this.min_scale_v3.x);
            scale_v2.y = Math.max(scale_v2.y, this.min_scale_v3.y);
          }

          if (this.adaptation_mode === _mk_adaptation_node.mode.scale) {
            this.node.setScale(scale_v2.x, scale_v2.y);
          } else {
            this.node.getComponent(UITransform).setContentSize(this.original_size.width * scale_v2.x, this.original_size.height * scale_v2.y);
          }
        }
        /** 默认 */


        _default(design_size_, frame_size_) {
          if (this.adaptation_mode === _mk_adaptation_node.mode.scale) {
            this.node.setScale(1, 1);
          } else {
            this.node.getComponent(UITransform).setContentSize(this.original_size.width, this.original_size.height);
          }
        }
        /** 自适应 */


        _auto_adaption(design_size_, frame_size_) {
          // 检查除数是否为零
          if (frame_size_.width <= 0 || frame_size_.height <= 0) {
            app.log.warn("mk_adaptation_node: 帧尺寸不能为零");
            return;
          }

          const scale_v2 = v2(design_size_.width / frame_size_.width, design_size_.height / frame_size_.height);

          if (scale_v2.x < scale_v2.y) {
            scale_v2.y = scale_v2.x;
          } else {
            scale_v2.x = scale_v2.y;
          }

          if (this.limit_min_scale_b) {
            scale_v2.x = Math.max(scale_v2.x, this.min_scale_v3.x);
            scale_v2.y = Math.max(scale_v2.y, this.min_scale_v3.y);
          }

          if (this.adaptation_mode === _mk_adaptation_node.mode.scale) {
            this.node.setScale(scale_v2.x, scale_v2.y);
          } else {
            this.node.getComponent(UITransform).setContentSize(this.original_size.width * scale_v2.x, this.original_size.height * scale_v2.y);
          }
        }
        /** 更新适配 */


        update_adaptation() {
          if (EDITOR && !this.editor_preview_b) {
            return;
          }

          try {
            /** 设计尺寸 */
            let design_size;
            /** 真实尺寸 */

            let frame_size;
            /** 容器节点 */

            let layout_node = null;

            switch (this.adaptation_mode) {
              case _mk_adaptation_node.mode.scale:
                {
                  frame_size = this.node.getComponent(UITransform).contentSize.clone();
                  break;
                }

              case _mk_adaptation_node.mode.size:
                {
                  frame_size = this.original_size;
                  break;
                }
            }

            switch (this.adaptation_source) {
              case _mk_adaptation_node.source.canvas:
                {
                  layout_node = director.getScene().getComponentInChildren(Canvas).node;
                  design_size = layout_node.getComponent(UITransform).contentSize.clone();
                  break;
                }

              case _mk_adaptation_node.source.parent:
                {
                  layout_node = this.node.parent;
                  design_size = layout_node.getComponent(UITransform).contentSize.clone();
                  break;
                }

              case _mk_adaptation_node.source.customize:
                {
                  design_size = this.custom_adapt_size;
                  break;
                }
            }

            switch (this.type) {
              case _mk_adaptation_node.type.缩放:
                this._auto_adaption(design_size, frame_size);

                break;

              case _mk_adaptation_node.type.自适应_展示完:
                this._adaptive_show_all(design_size, frame_size);

                break;

              case _mk_adaptation_node.type.自适应_填充满:
                this._adaptive_fill_up(design_size, frame_size);

                break;

              case _mk_adaptation_node.type.填充宽:
                this._fill_width(design_size, frame_size);

                break;

              case _mk_adaptation_node.type.填充高:
                this._fill_height(design_size, frame_size);

                break;

              case _mk_adaptation_node.type.默认:
                this._default(design_size, frame_size);

                break;
            }
          } catch (error) {
            app.log.err(error);
          }
        }
        /* ------------------------------- 全局事件 ------------------------------- */


        _event_global_resize() {
          // 防止部分手机旋转后未适配
          for (let k_n = 0, len_n = 6; k_n < len_n; ++k_n) {
            this._delayed_update_adaptation(1000 * k_n);
          }
        }
        /* ------------------------------- 节点事件 ------------------------------- */


        _event_node_size_changed() {
          this._delayed_update_adaptation();
        }

        _event_node_sprite_frame_changed() {
          // 更新原始节点大小
          if (this.adaptation_mode === _mk_adaptation_node.mode.size) {
            this.original_size = this.getComponent(UITransform).contentSize.clone();
          } // 适配节点


          this._delayed_update_adaptation(0);
        }

      }, (_applyDecoratedDescriptor(_class2.prototype, "editor_preview_b", [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, "editor_preview_b"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "adaptation_mode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return _mk_adaptation_node.mode.scale;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "adaptation_source", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return _mk_adaptation_node.source.canvas;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "original_size", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return size();
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "custom_adapt_size", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return size();
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "type", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "limit_max_scale_b", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "limit_max_scale_b"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "limit_min_scale_b", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "limit_min_scale_b"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "max_scale_v3", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "max_scale_v3"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "min_scale_v3", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "min_scale_v3"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_type", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return _mk_adaptation_node.type.默认;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_limit_max_scale_b", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_limit_min_scale_b", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_max_scale_v3", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return v3(1, 1, 1);
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_min_scale_v3", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return v3(1, 1, 1);
        }
      })), _class2)) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=781df6a286af502d8e0a4914a4c6993c5cb1ce8c.js.map