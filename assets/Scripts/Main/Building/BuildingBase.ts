import { _decorator, Component, Enum, Node } from 'cc';
import { BuildingType, BuildUnlockState, CommonEvent } from '../../Main/Common/CommonEnum';

const { ccclass, property } = _decorator;

@ccclass('BuildingBase')
export abstract class BuildingBase extends Component {

    @property({ type: Enum(BuildingType), displayName: '建筑类型' })
    protected type: BuildingType = BuildingType.None;

    @property({ type: Enum(BuildUnlockState), displayName: '建筑状态' })
    protected state: BuildUnlockState = BuildUnlockState.Active;

    /**
     * 建筑类型
     */
    public get Type(): BuildingType {
        return this.type;
    }

    /**
     * 建筑状态
     */
    public get State(): BuildUnlockState {
        return this.state;
    }

    protected init(): void{
        switch (this.state) {
            case BuildUnlockState.Unlocked:
                this.showUnlockAnim();
                break;
            default:
                this.showlock();
                break;
        }
    }

    protected onLoad(): void {
        app.event.on(CommonEvent.OnReset, this.onReset, this);
        app.event.on(CommonEvent.UnlockItem, this.onUnlockItem, this);

        this.init();
    }
    protected start(): void {
        
    }
    protected onReset(): void {
        this.state = BuildUnlockState.Active;
        this.showlock();
    }

    protected onUnlockItem(type: BuildingType): void{
        if (type === this.type && this.state === BuildUnlockState.Active) {
            this.UnlockBuilding();
        }
    }
    
    protected abstract showUnlockAnim(): Promise<void>;
    protected abstract showlock(): Promise<void>;

    public UnlockBuilding(): void {
        this.state = BuildUnlockState.Unlocking;
        this.showUnlockAnim().then(() => {
            this.state = BuildUnlockState.Unlocked;
            app.event.emit(CommonEvent.UnlockFinished, this.type);
            this.onUnlockFinished();
        }).catch((e) => {
       //console.error(e);
        });
    }

    protected onUnlockFinished(): void {
        // 子类重写
    }

    public ResetBuilding(): void {
        this.state = BuildUnlockState.NoActive;
        this.showlock();
    }
}
