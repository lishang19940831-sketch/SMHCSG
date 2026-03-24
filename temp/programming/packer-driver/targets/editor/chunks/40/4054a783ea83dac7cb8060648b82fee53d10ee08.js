System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, ComponentEvent;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e366aMmQ71Eg5PJVCN/SjXi", "ComponentEvents", undefined);

      /**
       * 组件通信事件常量
       * 集中管理所有组件间通信的事件名称
       */
      _export("ComponentEvent", ComponentEvent = /*#__PURE__*/function (ComponentEvent) {
        ComponentEvent["HURT"] = "component:hurt";
        ComponentEvent["DEAD"] = "component:dead";
        ComponentEvent["HEALTH_CHANGED"] = "component:healthChanged";
        ComponentEvent["MOVE_STATE_UPDATE"] = "component:moveStateUpdate";
        ComponentEvent["TARGET_REACHED"] = "component:targetReached";
        ComponentEvent["MOVE_TO_POSITION"] = "component:moveToPosition";
        ComponentEvent["STOP_MOVING"] = "component:stopMoving";
        ComponentEvent["SLOW_START"] = "component:slowStart";
        ComponentEvent["SLOW_END"] = "component:slowEnd";
        ComponentEvent["SLOW_UPDATED"] = "component:slowUpdated";
        ComponentEvent["APPLY_COLOR_EFFECT"] = "component:applyColorEffect";
        ComponentEvent["CANCEL_COLOR_EFFECT"] = "component:cancelColorEffect";
        ComponentEvent["ATTACK_START"] = "component:attackStart";
        ComponentEvent["ATTACK_ANI_END"] = "component:attackEnd";
        ComponentEvent["ATTACK_COOLDOWN_END"] = "component:attackCooldownEnd";
        ComponentEvent["PERFORM_ATTACK"] = "component:performAttack";
        ComponentEvent["REQUEST_ATTACK"] = "component:requestAttack";
        ComponentEvent["ANIMATION_COMPLETE"] = "component:animationComplete";
        ComponentEvent["ATTACK_ANI_COMPLETE"] = "component:attackAniComplete";
        ComponentEvent["PLAY_ANIMATION_START"] = "component:playAnimationStart";
        ComponentEvent["STATE_CHANGED"] = "component:stateChanged";
        ComponentEvent["CHANGE_STATE"] = "component:changeState";
        ComponentEvent["SET_TARGET"] = "component:setTarget";
        ComponentEvent["CLEAR_TARGET"] = "component:clearTarget";
        ComponentEvent["UPDATE_FACE_DIRECTION"] = "component:updateFaceDirection";
        ComponentEvent["PATH_COMPLETED"] = "path-completed";
        ComponentEvent["PATH_POINT_REACHED"] = "path-point-reached";
        ComponentEvent["SET_FACE_DIRECTION"] = "component:setFaceDirection";
        ComponentEvent["SET_FACE_DIRECTION_FROM_3D"] = "component:setFaceDirectionFrom3D";
        ComponentEvent["FACE_DIRECTION_CHANGED"] = "component:faceDirectionChanged";
        ComponentEvent["KNOCKBACK_START"] = "component:knockbackStart";
        ComponentEvent["KNOCKBACK_APPLIED"] = "component:knockbackApplied";
        ComponentEvent["KNOCKBACK_END"] = "component:knockbackEnd";
        ComponentEvent["KNOCKUP_START"] = "component:knockupStart";
        ComponentEvent["KNOCKUP_END"] = "component:knockupEnd";
        ComponentEvent["ELECTRIC_SHOCK_START"] = "component:electricShockStart";
        ComponentEvent["ELECTRIC_SHOCK_END"] = "component:electricShockEnd";
        ComponentEvent["CHARACTER_ELECTRIC_SHOCK"] = "component:characterElectricShock";
        ComponentEvent["CHARACTER_MOVE"] = "component:characterMove";
        ComponentEvent["CHARACTER_MOVE_WORLD"] = "component:characterMoveWorld";
        ComponentEvent["CHARACTER_ATTACK"] = "component:characterAttack";
        ComponentEvent["CHARACTER_STOP"] = "component:characterStop";
        ComponentEvent["CHARACTER_KNOCKBACK"] = "component:characterKnockback";
        ComponentEvent["CHARACTER_KNOCKUP"] = "component:characterKnockup";
        ComponentEvent["COMPONENT_INITIALIZED"] = "component:initialized";
        ComponentEvent["UPDATE_ITEM_COUNT"] = "component:updateItemCount";
        ComponentEvent["PICKUP_ITEM_FULL"] = "component:updateItemFull";
        ComponentEvent["ELECTRIC_POWER_CHANGED"] = "component:electricPowerChanged";
        ComponentEvent["SHOW_POWER_BAR"] = "component:showPowerBar";
        ComponentEvent["ITEM_COUNT_CHANGED"] = "component:itemCountChanged";
        ComponentEvent["PICKUP_ITEM_FINISH"] = "component:pickupItemFinish";
        return ComponentEvent;
      }({}));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4054a783ea83dac7cb8060648b82fee53d10ee08.js.map