System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9", "__unresolved_10"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, EffectManager, GameManager, PoolManager, DropManager, EnemyManager, TreeManager, WallManager, GuideManager, CameraFollow, Door, Manager, _crd;

  function _reportPossibleCrUseOfEffectManager(extras) {
    _reporterNs.report("EffectManager", "./EffectManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "./GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPoolManager(extras) {
    _reporterNs.report("PoolManager", "./PoolManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDropManager(extras) {
    _reporterNs.report("DropManager", "./DropManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEnemyManager(extras) {
    _reporterNs.report("EnemyManager", "./EnemyManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTreeManager(extras) {
    _reporterNs.report("TreeManager", "./TreeManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfWallManager(extras) {
    _reporterNs.report("WallManager", "./WallManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGuideManager(extras) {
    _reporterNs.report("GuideManager", "./GuideManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCameraFollow(extras) {
    _reporterNs.report("CameraFollow", "../Camera/CameraFollow", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDoor(extras) {
    _reporterNs.report("Door", "./Door", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      EffectManager = _unresolved_2.EffectManager;
    }, function (_unresolved_3) {
      GameManager = _unresolved_3.GameManager;
    }, function (_unresolved_4) {
      PoolManager = _unresolved_4.PoolManager;
    }, function (_unresolved_5) {
      DropManager = _unresolved_5.DropManager;
    }, function (_unresolved_6) {
      EnemyManager = _unresolved_6.EnemyManager;
    }, function (_unresolved_7) {
      TreeManager = _unresolved_7.TreeManager;
    }, function (_unresolved_8) {
      WallManager = _unresolved_8.WallManager;
    }, function (_unresolved_9) {
      GuideManager = _unresolved_9.GuideManager;
    }, function (_unresolved_10) {
      CameraFollow = _unresolved_10.CameraFollow;
    }, function (_unresolved_11) {
      Door = _unresolved_11.Door;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "dac19+AZL1PP4yZe+ZNO+oy", "Manager", undefined);

      Manager = class Manager {
        get game() {
          return (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).instance;
        }

        get effect() {
          return (_crd && EffectManager === void 0 ? (_reportPossibleCrUseOfEffectManager({
            error: Error()
          }), EffectManager) : EffectManager).instance;
        }

        get enemy() {
          return (_crd && EnemyManager === void 0 ? (_reportPossibleCrUseOfEnemyManager({
            error: Error()
          }), EnemyManager) : EnemyManager).instance;
        }

        get pool() {
          return (_crd && PoolManager === void 0 ? (_reportPossibleCrUseOfPoolManager({
            error: Error()
          }), PoolManager) : PoolManager).instance;
        }

        get drop() {
          return (_crd && DropManager === void 0 ? (_reportPossibleCrUseOfDropManager({
            error: Error()
          }), DropManager) : DropManager).instance;
        }

        get tree() {
          return (_crd && TreeManager === void 0 ? (_reportPossibleCrUseOfTreeManager({
            error: Error()
          }), TreeManager) : TreeManager).instance;
        }

        get wall() {
          return (_crd && WallManager === void 0 ? (_reportPossibleCrUseOfWallManager({
            error: Error()
          }), WallManager) : WallManager).instance;
        }

        get guide() {
          return (_crd && GuideManager === void 0 ? (_reportPossibleCrUseOfGuideManager({
            error: Error()
          }), GuideManager) : GuideManager).instance;
        }

        get cameraFollow() {
          return (_crd && CameraFollow === void 0 ? (_reportPossibleCrUseOfCameraFollow({
            error: Error()
          }), CameraFollow) : CameraFollow).instance;
        } //添加门管理器


        get door() {
          return (_crd && Door === void 0 ? (_reportPossibleCrUseOfDoor({
            error: Error()
          }), Door) : Door).instance;
        }

      };
      window.manager = new Manager();

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=11afb08b35b05990bf101995284bff5d3c38648d.js.map