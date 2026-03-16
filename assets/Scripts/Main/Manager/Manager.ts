import { EffectManager } from "./EffectManager"
import { GameManager } from "./GameManager"
import { PoolManager } from "./PoolManager";
import { DropManager } from "./DropManager";
import { EnemyManager } from "./EnemyManager";
import { TreeManager } from "./TreeManager";
import { WallManager } from "./WallManager";
import { GuideManager } from "./GuideManager";
import { CameraFollow } from "../Camera/CameraFollow";
import { Door } from "./Door";

class Manager {
    public get game(): GameManager {
        return GameManager.instance;
    }

    public get effect(): EffectManager {
        return EffectManager.instance;
    }

    public get enemy(): EnemyManager {
        return EnemyManager.instance;
    }

    public get pool(): PoolManager {
        return PoolManager.instance;
    }

    public get drop(): DropManager {
        return DropManager.instance;
    }

    public get tree(): TreeManager {
        return TreeManager.instance;
    }

    public get wall(): WallManager {
        return WallManager.instance;
    }

    public get guide(): GuideManager {
        return GuideManager.instance;
    }
    public get cameraFollow(): CameraFollow {
        return CameraFollow.instance;
    }
    //添加门管理器
    public get door(): Door {
        return Door.instance;
    }
    
}

declare global {
    interface Window {
        manager: Manager;
    }
    const manager: Manager;
}

window.manager = new Manager();