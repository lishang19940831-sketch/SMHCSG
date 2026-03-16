import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 引导系统测试组件
 * 演示如何使用新的节点引用方式的引导系统
 */
@ccclass('GuideTest')
export class GuideTest extends Component {

    @property({type: Node, displayName: '摇杆节点'})
    public joystickNode: Node = null!;

    @property({type: Node, displayName: '英雄节点'})
    public heroNode: Node = null!;

    @property({type: Node, displayName: '建造按钮节点'})
    public buildButtonNode: Node = null!;

    @property({type: Node, displayName: '资源节点'})
    public resourceNode: Node = null!;

    protected onLoad(): void {
        // 初始化引导节点缓存
        this.setupGuideNodes();
    }

    protected start(): void {
        // 延迟演示引导功能
        this.scheduleOnce(() => {
            this.demonstrateGuideFeatures();
        }, 1);
    }

    /**
     * 设置引导节点缓存
     */
    private setupGuideNodes(): void {
        // 方式1：批量设置节点
        manager.guide.setupGameNodes({
            joystick: this.joystickNode,
            hero: this.heroNode,
            buildButton: this.buildButtonNode
        });

        // 方式2：单独缓存节点
        manager.guide.cacheNode('resource', this.resourceNode);

   //console.log('引导节点缓存设置完成');
    }

    /**
     * 演示引导功能
     */
    private demonstrateGuideFeatures(): void {
   //console.log('开始演示引导功能');

        // 演示1：完整引导（箭头+提示）
        this.scheduleOnce(() => {
            this.showMoveGuide();
        }, 0.5);

        // 演示2：只显示箭头
        this.scheduleOnce(() => {
            this.showArrowOnly();
        }, 4);

        // 演示3：只显示提示
        this.scheduleOnce(() => {
            this.showTipOnly();
        }, 7);

        // 演示4：快速引导
        this.scheduleOnce(() => {
            this.showQuickGuide();
        }, 10);

        // 演示5：回调功能
        this.scheduleOnce(() => {
            this.showGuideWithCallback();
        }, 13);
    }

    /**
     * 演示移动引导
     */
    private showMoveGuide(): void {
   //console.log('演示：移动引导');

        const joystick = manager.guide.getCachedNode('joystick');
        const hero = manager.guide.getCachedNode('hero');

        if (joystick && hero) {
            manager.guide.showArrowGuide({
                startNode: joystick,
                endNode: hero,
                tipContent: '使用摇杆控制角色移动',
                duration: 3,
                onComplete: () => {
               //console.log('移动引导完成');
                }
            });
        }
    }

    /**
     * 演示只显示箭头
     */
    private showArrowOnly(): void {
   //console.log('演示：只显示箭头');

        const hero = manager.guide.getCachedNode('hero');
        const resource = manager.guide.getCachedNode('resource');

        if (hero && resource) {
            manager.guide.showArrowOnly(hero, resource, 2);
        }
    }

    /**
     * 演示只显示提示
     */
    private showTipOnly(): void {
   //console.log('演示：只显示提示');

        manager.guide.showTipOnly('收集资源可以建造建筑', 2);
    }

    /**
     * 演示快速引导
     */
    private showQuickGuide(): void {
   //console.log('演示：快速引导');

        // 使用预设的快速引导
        manager.guide.quickGuide('build');
    }

    /**
     * 演示带回调的引导
     */
    private showGuideWithCallback(): void {
   //console.log('演示：带回调的引导');

        const hero = manager.guide.getCachedNode('hero');
        const buildBtn = manager.guide.getCachedNode('buildButton');

        if (hero && buildBtn) {
            manager.guide.showArrowGuide({
                startNode: hero,
                endNode: buildBtn,
                tipContent: '点击这里开始建造',
                duration: 3,
                onComplete: () => {
               //console.log('建造引导完成 - 执行后续逻辑');
                    // 这里可以触发其他游戏逻辑
                    this.onGuideCompleted();
                },
                onSkip: () => {
               //console.log('用户跳过了建造引导');
                }
            });
        }
    }

    /**
     * 引导完成后的处理
     */
    private onGuideCompleted(): void {
   //console.log('所有引导演示完成');

        // 可以在这里触发其他游戏逻辑
        // 比如解锁功能、发送事件等
    }

    /**
     * 测试手动控制
     */
    public testManualControl(): void {
   //console.log('测试手动控制');

        // 显示引导
        const hero = manager.guide.getCachedNode('hero');
        const resource = manager.guide.getCachedNode('resource');

        if (hero && resource) {
            manager.guide.showArrowGuide({
                startNode: hero,
                endNode: resource,
                tipContent: '手动触发的引导'
                // 不设置duration，需要手动隐藏
            });

            // 3秒后手动隐藏
            this.scheduleOnce(() => {
           //console.log('手动隐藏引导');
                manager.guide.hideArrowGuide();
            }, 3);
        }
    }

    /**
     * 测试向后兼容性
     */
    public testBackwardCompatibility(): void {
   //console.log('测试向后兼容性');

        const hero = manager.guide.getCachedNode('hero');
        const resource = manager.guide.getCachedNode('resource');

        if (hero && resource) {
            // 使用旧的API方式
            manager.guide.showArrowBetween(hero, resource, 2);

            this.scheduleOnce(() => {
                manager.guide.hideArrowBetween();
           //console.log('向后兼容性测试完成');
            }, 3);
        }
    }

    /**
     * 清理所有引导
     */
    public cleanup(): void {
   //console.log('清理所有引导');
        manager.guide.hideAll();
    }
}