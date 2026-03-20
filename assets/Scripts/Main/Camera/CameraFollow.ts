import { _decorator, Component, Node, Vec3, tween, Camera } from 'cc';

const { ccclass, property } = _decorator;

/**
 * 相机跟随脚本
 * 跟随目标移动，但保持固定的角度和距离
 */
@ccclass('CameraFollow')
export class CameraFollow extends Component {
    @property({
        type: Node,
        tooltip: '跟随目标（通常是Player节点）'
    })
    public target: Node = null;
    @property({
        type: Node,
        tooltip: '粒子摄像机节点（用于显示粒子效果）'
    })
    public cameraParticleNode: Node = null;
    @property({
        tooltip: '跟随速度（0-1，越大越快，1=瞬间跟随）'
    })
    public followSpeed: number = 0.1;

    @property({
        tooltip: '是否启用平滑跟随（关闭则瞬间跟随）'
    })
    public smoothFollow: boolean = true;

    @property({
        tooltip: '相机相对目标的偏移（X, Y, Z）'
    })
    public offset: Vec3 = new Vec3(0, 800, -800);

    @property({
        tooltip: '是否自动计算初始偏移（从当前位置）'
    })
    public autoCalculateOffset: boolean = true;

    @property({
        tooltip: 'Boss出现时正交高度增加量（拉高镜头）'
    })
    public bossOrthoHeightIncrease: number = 5;

    @property({
        tooltip: '镜头缩放的缓动时间（秒）'
    })
    public zoomDuration: number = 2.0;

    @property({
        tooltip: 'Boss攻击时摄像机抖动强度'
    })
    public bossAttackShakeStrength: number = 20;

    @property({
        tooltip: '摄像机抖动持续时间（秒）'
    })
    public shakeDuration: number = 0.3;

    @property({
        tooltip: '摄像机抖动频率（次/秒）'
    })
    public shakeFrequency: number = 30;

    

    private initialOffset: Vec3 = new Vec3();
    private camera: Camera = null; // 相机组件
    private cameraParticle: Camera = null; // 粒子摄像机组件
    private normalOrthoHeight: number = 0; // 正常状态的正交高度
    private isBossMode: boolean = false; // 是否处于Boss模式
    private isShaking: boolean = false; // 是否正在抖动
    private shakeTimer: number = 0; // 抖动计时器
    private shakeOffset: Vec3 = new Vec3(); // 抖动偏移
    static instance: CameraFollow = null;

    start() {
        CameraFollow.instance = this;

        // 获取相机组件
        this.camera = this.node.getComponent(Camera);
        if (!this.camera) {
            //console.error(' CameraFollow: 未找到 Camera 组件！');
            return;
        }
        this.cameraParticleNode&&(this.cameraParticle = this.cameraParticleNode.getComponent(Camera));

        // 保存正常状态的正交高度
        this.normalOrthoHeight = this.camera.orthoHeight;

        // 自动计算初始偏移量（使用世界坐标）
        if (this.autoCalculateOffset) {
            if (this.target) {
                const targetWorld = this.target.worldPosition;
                const cameraWorld = this.node.worldPosition;
                this.initialOffset.set(
                    cameraWorld.x - targetWorld.x,
                    cameraWorld.y - targetWorld.y,
                    cameraWorld.z - targetWorld.z
                );
            } else {
                // target 未绑定时，用固定 offset 作为初始值，等 setTarget 时再重算
                this.initialOffset.set(this.offset);
            }
        } else {
            this.initialOffset.set(this.offset);
        }
    }

    lateUpdate(deltaTime: number) {
        if (!this.target) {
            return;
        }

        // 更新抖动效果
        this.updateShake(deltaTime);

        // 使用世界坐标计算目标位置（加上抖动偏移）
        const targetWorld = this.target.worldPosition;
        const targetPosition = new Vec3(
            targetWorld.x + this.initialOffset.x + this.shakeOffset.x,
            targetWorld.y + this.initialOffset.y + this.shakeOffset.y,
            targetWorld.z + this.initialOffset.z + this.shakeOffset.z
        );

        if (this.smoothFollow) {
            // 平滑跟随（线性插值）
            const currentPos = this.node.worldPosition;
            const newPos = new Vec3(
                currentPos.x + (targetPosition.x - currentPos.x) * this.followSpeed,
                currentPos.y + (targetPosition.y - currentPos.y) * this.followSpeed,
                currentPos.z + (targetPosition.z - currentPos.z) * this.followSpeed
            );
            this.node.setWorldPosition(newPos);
            this.cameraParticleNode&&this.cameraParticleNode.setWorldPosition(newPos);
        } else {
            // 瞬间跟随
            this.node.setWorldPosition(targetPosition);
            this.cameraParticleNode&&this.cameraParticleNode.setWorldPosition(targetPosition);
        }
    }

    /**
     * 设置跟随目标
     */
    public setTarget(target: Node): void {
        this.target = target;
        
        if (this.autoCalculateOffset && target) {
            const targetWorld = target.worldPosition;
            const cameraWorld = this.node.worldPosition;
            this.initialOffset.set(
                cameraWorld.x - targetWorld.x,
                cameraWorld.y - targetWorld.y,
                cameraWorld.z - targetWorld.z
            );
        }
    }

    /**
     * 设置偏移量
     */
    public setOffset(offset: Vec3): void {
        this.initialOffset.set(offset);
    }

    /**
     * 瞬间移动到目标位置（不平滑）
     */
    public snapToTarget(): void {
        if (!this.target) return;

        const targetWorld = this.target.worldPosition;
        const targetPosition = new Vec3(
            targetWorld.x + this.initialOffset.x,
            targetWorld.y + this.initialOffset.y,
            targetWorld.z + this.initialOffset.z
        );

        this.node.setWorldPosition(targetPosition);
        this.cameraParticleNode&&this.cameraParticleNode.setWorldPosition(targetPosition);
    }


    /**
     * Boss出现回调 - 平滑拉高镜头（调整正交高度）
     */
    private onBossSpawn(target: Node = null): void {
        if (this.isBossMode || !this.camera) return;
        
        this.isBossMode = true;
        //console.log(`[CameraFollow]  Boss出现，正交高度 ${this.normalOrthoHeight} → ${this.normalOrthoHeight + this.bossOrthoHeightIncrease}`);
        
        // 计算目标正交高度
        const targetHeight = this.normalOrthoHeight + this.bossOrthoHeightIncrease;

        // 创建缓动对象
        const tweenTarget = { height: this.camera.orthoHeight };
        // 使用缓动平滑过渡
        tween(tweenTarget)
            .to(this.zoomDuration, { height: targetHeight }, {
                easing: 'sineInOut',
                onUpdate: () => {
                    if (this.camera) {
                        this.camera.orthoHeight = tweenTarget.height;
                    }
                    if(this.cameraParticle){
                        this.cameraParticle.orthoHeight = tweenTarget.height;
                    }
                }
            })
            .call(() => {
                //console.log('[CameraFollow]  镜头拉高完成');
            })
            .start();
    }
    private onBossSpawn2(target: Node = null, duration: number = 1.2): void {
     
        // 计算目标正交高度
        const targetHeight = this.normalOrthoHeight;

        // 创建缓动对象
        const tweenTarget = { height: this.camera.orthoHeight };
        // 使用缓动平滑过渡
        tween(tweenTarget)
            .to(duration, { height: targetHeight }, {
                easing: 'sineInOut',
                onUpdate: () => {
                    if (this.camera) {
                        this.camera.orthoHeight = tweenTarget.height;
                    }
                    if(this.cameraParticle){
                        this.cameraParticle.orthoHeight = tweenTarget.height;
                    }
                }
            })
            .call(() => {
                //console.log('[CameraFollow]  镜头拉高完成');
            })
            .start();
    }
    /**
     * 平滑移动镜头到指定世界坐标（带缓动）
     * @param worldPos 目标世界坐标
     * @param duration 缓动时长（秒）
     * @param onComplete 完成回调
     * @param delay 延迟时间（秒）
     */
    public moveTo(worldPos: Vec3, duration: number = 1.0, onComplete?: () => void, delay: number = 0): void {   
        const startPos = this.node.worldPosition.clone();
        const tweenTarget = { x: startPos.x, y: startPos.y, z: startPos.z };

        tween(tweenTarget)
            .to(duration, { x: worldPos.x, y: worldPos.y, z: worldPos.z }, { easing: 'sineInOut',
                "onUpdate" : () => {
                this.node.setWorldPosition(tweenTarget.x, tweenTarget.y, tweenTarget.z);
                this.cameraParticleNode && this.cameraParticleNode.setWorldPosition(tweenTarget.x, tweenTarget.y, tweenTarget.z);
            
             }})
            .delay(delay)
            .call(() => {
                if (onComplete) onComplete();
            })
            .start();
    }

    /**
     * 平滑移动镜头到指定目标节点（带缓动）
     * @param targetNode 目标节点
     * @param duration 缓动时长（秒）
     * @param onComplete 完成回调
     * @param delay 延迟时间（秒）
     */
    public moveToTarget(targetNode: Node, duration: number = 1.0, onComplete?: () => void, delay: number = 0): void {
        if (!targetNode || !targetNode.isValid) {
            if (onComplete) onComplete();
            return;
        }
        const targetWorld = targetNode.worldPosition;
        const offsetPos = new Vec3(
            targetWorld.x + this.initialOffset.x,
            targetWorld.y + this.initialOffset.y,
            targetWorld.z + this.initialOffset.z
        );
        this.moveTo(offsetPos, duration, onComplete, delay);    
        
    }

    
    /**
     * 平滑偏移镜头（在当前位置基础上偏移）
     * @param deltaOffset 偏移量
     * @param duration 缓动时长（秒）
     * @param onComplete 完成回调
     */
    public moveBy(deltaOffset: Vec3, duration: number = 1.0, onComplete?: () => void): void {
        const currentPos = this.node.worldPosition;
        const targetPos = currentPos.add(deltaOffset);
        this.moveTo(targetPos, duration, onComplete);
    }
    public bossSpawn(target: Node = null): void {
        this.onBossSpawn(target);
    }
    /**
     * 镜像方法：平滑拉低镜头（恢复到正常高度），可同时设置跟随目标
     */
    public bossSpawn2(target: Node = null, duration: number = this.zoomDuration): void {
        if (!this.camera) return;
     
        // 使用当前相机高度作为起点，缓动到 normalOrthoHeight
        const tweenTarget = { height: this.camera.orthoHeight };
        const targetHeight = this.normalOrthoHeight;
        tween(tweenTarget)
            .to(duration, { height: targetHeight }, {
                easing: 'sineInOut',
                onUpdate: () => {
                    if (this.camera) {
                        this.camera.orthoHeight = tweenTarget.height;
                    }
                    if (this.cameraParticle) {
                        this.cameraParticle.orthoHeight = tweenTarget.height;
                    }
                }
            })
            .call(() => {
                // 归位后关闭Boss模式标记
                this.isBossMode = false;
            })
            .start();
    }
      
    /**
     * 手动恢复镜头（由外部调用）
     */
    public restoreCamera(): void {
        if (!this.isBossMode || !this.camera) {
            //console.warn('[CameraFollow] ️ 镜头不在Boss模式，无需恢复');
            return;
        }
        
        this.isBossMode = false;
        //console.log(`[CameraFollow]  手动恢复镜头，正交高度 ${this.camera.orthoHeight} → ${this.normalOrthoHeight}`);

        // 创建缓动对象
        const tweenTarget = { height: this.camera.orthoHeight };

        // 使用缓动平滑恢复
        tween(tweenTarget)
            .to(this.zoomDuration, { height: this.normalOrthoHeight }, {
                easing: 'sineInOut',
                onUpdate: () => {
                    if (this.camera) {
                        this.camera.orthoHeight = tweenTarget.height;
                    }
                    if(this.cameraParticle){
                        this.cameraParticle.orthoHeight = tweenTarget.height;
                    }
                }
            })
            .call(() => {
                //console.log('[CameraFollow]  镜头恢复完成');
            })
            .start();
    }

    /**
     * 立即恢复镜头（不使用缓动）
     */
    public restoreCameraInstant(): void {
        if (!this.isBossMode || !this.camera) return;
        
        this.isBossMode = false;
        //console.log('[CameraFollow]  立即恢复镜头');
        
        // 直接设置正交高度
        this.camera.orthoHeight = this.normalOrthoHeight;
        this.cameraParticle&&(this.cameraParticle.orthoHeight = this.normalOrthoHeight);
    }

    /**
     * 检查是否处于Boss模式
     */
    public isBossCamera(): boolean {
        return this.isBossMode;
    }

    /**
     * 玩家受伤回调 - Boss攻击时触发抖动
     */
    private onPlayerHurt(damage: number, isBoss: boolean): void {
        if (isBoss) {
            this.startShake();
        }
    }

    /**
     * 开始摄像机抖动
     */
    public startShake(strength?: number): void {
        this.isShaking = true;
        this.shakeTimer = 0;
        
        const shakeStr = strength !== undefined ? strength : this.bossAttackShakeStrength;
        //console.log(`[CameraFollow]  摄像机抖动开始，强度: ${shakeStr}`);
    }

    /**
     * 更新抖动效果
     */
    private updateShake(deltaTime: number): void {
        if (!this.isShaking) {
            // 如果不在抖动，确保偏移为0
            this.shakeOffset.set(0, 0, 0);
            return;
        }

        this.shakeTimer += deltaTime;

        if (this.shakeTimer >= this.shakeDuration) {
            // 抖动结束
            this.isShaking = false;
            this.shakeOffset.set(0, 0, 0);
            //console.log('[CameraFollow]  摄像机抖动结束');
            return;
        }

        // 计算衰减强度（从100%衰减到0%）
        const progress = this.shakeTimer / this.shakeDuration;
        const decay = 1 - progress;
        const currentStrength = this.bossAttackShakeStrength * decay;

        // 生成随机抖动偏移（使用高频随机）
        this.shakeOffset.set(
            (Math.random() - 0.5) * 2 * currentStrength,
            (Math.random() - 0.5) * 2 * currentStrength,
            0 // Z轴不抖动
        );
    }

    /**
     * 停止摄像机抖动
     */
    public stopShake(): void {
        this.isShaking = false;
        this.shakeTimer = 0;
        this.shakeOffset.set(0, 0, 0);
    }

    onDestroy() {
        // 清理事件监听
    }
}

