import { _decorator, Component, Label, Node, Tween, tween, UIOpacity } from 'cc';
import { CommonEvent } from '../../Main/Common/CommonEnum';
const { ccclass, property } = _decorator;

@ccclass('Tips')
export class Tips extends Component {

    @property({type: Label, displayName: '提示字体'})
    public tipsLabel: Label = null!;

    @property({type: UIOpacity, displayName: '提示节点透明度'})
    public tipsOpacity: UIOpacity = null!;

    private datas: {tips: string, id: string, duration: number}[] = [];
    private currentTip: {tips: string, id: string, duration: number} | null = null;
    private hideTimer: any = null;
    private isShowing: boolean = false;

    protected onLoad(): void {
        app.event.on(CommonEvent.ShowTips, this.onShowTips, this);
        app.event.on(CommonEvent.HideTips, this.onHideTips, this);

        this.node.active = false;
        this.tipsOpacity.opacity = 0;
    }

    protected onDestroy(): void {
        app.event.offAllByTarget(this);
        this.clearTimer();
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    private onShowTips(data: {tips: string, id: string, duration: number}): void {
        // 如果当前正在显示相同的提示，只刷新时长
        if (this.isShowing && this.currentTip && this.currentTip.tips === data.tips) {
            // 更新当前提示的数据
            this.currentTip = data;
            
            // 重新设置定时器
            if (data.duration !== -1) {
                this.startHideTimer(data.duration);
            } else {
                // 如果新的duration是-1，清除定时器
                this.clearTimer();
            }
            return;
        }
        
        // 如果当前正在显示不同的提示，将当前提示加入队列
        if (this.isShowing && this.currentTip) {
            this.datas.push(this.currentTip);
            this.forceHide();
            this.currentTip = null;
        }

        this.showTip(data);
    }

    private onHideTips(data: {id: string}): void {
        // 只有当ID匹配当前显示的提示时才隐藏
        if (this.currentTip && this.currentTip.id === data.id) {
            this.hideTips();
        }
    }

    private hideTips(): void {
        if (!this.isShowing) return;
        
        this.clearTimer();
        this.isShowing = false;
        this.hideAnim();
        this.currentTip = null;
        
        // 显示队列中的下一个提示
        this.showNextTip();
    }

    private forceHide(): void {
        this.clearTimer();
        this.isShowing = false;
        this.node.active = false;
        this.tipsOpacity.opacity = 0;
        // 注意：不在这里清空currentTip，因为可能需要先加入队列
    }

    private startHideTimer(duration: number): void {
        this.clearTimer();
        this.hideTimer = setTimeout(() => {
            this.hideTips();
        }, duration * 1000);
    }
    
    /**
     * 显示指定的提示
     */
    private showTip(data: {tips: string, id: string, duration: number}): void {
        this.currentTip = data;
        this.isShowing = true;
        
        // 设置提示文本
        this.tipsLabel.string = data.tips;
        this.node.active = true;
        
        // 显示动画
        this.showAnim();
        
        // 设置定时器（如果duration不是-1）
        if (data.duration !== -1) {
            this.startHideTimer(data.duration);
        }
    }
    
    /**
     * 显示队列中的下一个提示
     */
    private showNextTip(): void {
        if (this.datas.length > 0) {
            const nextTip = this.datas.shift(); // 从队列头部取出
            if (nextTip) {
                this.showTip(nextTip);
            }
        }
    }

    private clearTimer(): void {
        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
        }
    }

    private showAnim(): void {
        Tween.stopAllByTarget(this.tipsOpacity);
        tween(this.tipsOpacity)
            .to(0.5, {opacity: 255})
            .start();
    }

    private hideAnim(): void {
        Tween.stopAllByTarget(this.tipsOpacity);
        tween(this.tipsOpacity)
            .to(0.5, {opacity: 0})
            .call(() => {
                this.node.active = false;
            })
            .start();
    }
}


