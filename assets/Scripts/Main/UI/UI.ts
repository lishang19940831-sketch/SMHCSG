import { _decorator, Camera, Component, Label, Node, tween, UIOpacity, Vec3, UITransform, Color, ProgressBar, Button } from 'cc';
import { CommonEvent, ObjectType } from '../../Main/Common/CommonEnum';
import { DamageData } from '../../Main/Common/CommonInterface';
import { UIPowerBar } from './UIPowerBar';
import { ComponentEvent } from '../../Main/Common/ComponentEvents';
const { ccclass, property } = _decorator;

@ccclass('UI')
export class UI extends Component {
    @property({type: Camera, displayName: '主相机'})
    private mainCamera: Camera = null!;
    @property({type: Label, displayName: '木头数量'})
    private woodLabel: Label = null!;
    @property({type: Label, displayName: '金币数量'})
    private goldLabel: Label = null!;
    @property({type: Label, displayName: '肉数量'})
    private meatLabel: Label = null!;
    @property({type: Node, displayName: '胜利面板'})
    private winPanel: Node = null!;
    @property({type: Node, displayName: '失败面板'})
    private losePanel: Node = null!;
    @property({type: Node, displayName: 'Home受伤闪红节点'})
    private heroHurtRed: Node = null!;
    @property({type: Button, displayName: '下载按钮'})
    private downloadBtn: Button = null!;
    @property({type: Label, displayName: '提示'})
    private tipLabel: Label = null!;

    private isJumped: boolean = false;

    private isShowResult: boolean = false;

    protected onLoad(): void {
        app.event.on(CommonEvent.UpdateHeroItemCount, this.onUpdateHeroItemCount, this);
        app.event.on(CommonEvent.ShowWinUI, this.onShowWinUI, this);
        app.event.on(CommonEvent.ShowFailUI, this.onShowFailUI, this);
        app.event.on(CommonEvent.HeroHurt, this.onHeroHurt, this);

        const opacity = this.heroHurtRed.getComponent(UIOpacity)!;
        tween(opacity)
            .to(0.3, { opacity: 255 })
            .to(0.3, { opacity: 0 })
            .union()
            .repeatForever()
            .start();

        this.isShowResult = false;
        this.isJumped = false;

        this.downloadBtn&&this.downloadBtn.node.on(Button.EventType.CLICK, this.onDownload, this);

        this.woodLabel.string = "0";
        this.goldLabel.string = "0";
        this.meatLabel.string = "0";

        // this.tipLabel.node.active = SuperPackage.Instance.isKR;
    }

    protected onDestroy(): void {
        app.event.offAllByTarget(this);
    }

    start() {
        
    }

    update(deltaTime: number) {
        
    }

    private onUpdateHeroItemCount(data: {type: ObjectType, count: number}): void {
        if(data.type === ObjectType.DropItemCoin){
            this.goldLabel.string = data.count.toString();
        }else if(data.type === ObjectType.DropItemWood){
            this.woodLabel.string = data.count.toString();
        }else if(data.type === ObjectType.DropItemMeat){
            this.meatLabel.string = data.count.toString();
        }
    }

    /**
     * 更新家基地血条
     * @param healthPercentage 生命值百分比
     */
    private onHeroHurt(data: {damageData: DamageData}): void {
        // 取消之前的所有延迟调用
        this.unscheduleAllCallbacks();
        
        // 显示伤害效果
        this.heroHurtRed.active = true;
        
        // 使用新的延迟调用
        this.scheduleOnce(() => {
            this.heroHurtRed.active = false;
        }, 1);
    }

    private onShowWinUI(): void {
        if(this.isShowResult) return;
        this.isShowResult = true
        this.winPanel.active = true;
        this.scheduleOnce(() => {
            manager.game.onDownloadTCE();
        }, 1);
    }

    private onShowFailUI(): void {
        if(this.isShowResult) return;
        this.isShowResult = true
        this.losePanel.active = true;
        this.scheduleOnce(() => {
            manager.game.onDownloadTCE();
        }, 1);
    }

    private converToUIPos(pos: Vec3): Vec3 {
        const uiPos = this.mainCamera.convertToUINode(pos, this.node);
        return uiPos;
    }

    private onDownload(): void {
        manager.game.onDownload();
        // manager.game.onRetry();
    }
}


