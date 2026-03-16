import { _decorator, Component, MeshRenderer, Material, tween, Vec4, Color } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 外发光控制器
 * 用于控制使用 standard-outline-001 材质的模型的外发光效果
 * 
 * 使用场景：电塔
 * - 常态：不发光（glowIntensity = 0）
 * - 准备攻击：发蓝光（glowIntensity = 3.0, 蓝色）
 * - 攻击后：发光消失，恢复常态
 */
@ccclass('GlowController')
export class GlowController extends Component {
    @property({ type: MeshRenderer, displayName: '网格渲染器列表' })
    private meshRenderers: MeshRenderer[] = [];

    @property({ displayName: '常态发光强度', slide: true, range: [0, 5.0], step: 0.01 })
    private glowIntensity: number = 0.0;

    @property({ type: Color, displayName: '发光颜色（蓝色=电塔）' })
    private glowColor: Color = new Color(100, 150, 255, 255);

    @property({ displayName: '准备攻击时的发光强度', slide: true, range: [0, 5.0], step: 0.01 })
    private readyGlowIntensity: number = 3.0;

    @property({ displayName: '发光动画时长(秒)' })
    private glowDuration: number = 0.3;
    
    private materials: Material[] = [];
    private currentGlowIntensity: number = 0;
    private isGlowing: boolean = false;

    onLoad() {
        this.initMaterial();
        this.setGlowColor(this.glowColor); // 先设置颜色
        this.setGlowIntensity(this.glowIntensity); // 再设置强度
    }

    /**
     * 初始化材质
     */
    private initMaterial(): void {
        if (this.meshRenderers.length===0) {
            // this.meshRenderers = this.getComponent(MeshRenderer);
            this.meshRenderers.push(this.getComponent(MeshRenderer));
        }

        if (this.meshRenderers.length> 0) {
            // 获取材质实例（如果是共享材质，会自动创建实例）
            for (let i = 0; i < this.meshRenderers.length; i++) {
                this.materials.push(this.meshRenderers[i].getMaterialInstance(0));
                this.meshRenderers[i].getMaterialInstance(0).getProperty('glowIntensity');
            }
       
        } else {
       //console.warn('[GlowController] 未找到 MeshRenderer 或材质');
        }
    }

    /**
     * 设置发光强度
     */
    public setGlowIntensity(intensity: number): void {
        if (this.materials.length===0) return;

        this.currentGlowIntensity = intensity;

        // 设置 glowIntensity 参数 (glowParams.x)
        for (let i = 0; i < this.materials.length; i++) {
            this.materials[i].setProperty('glowIntensity', intensity);
        }
    }

    /**
     * 设置发光颜色
     */
    public setGlowColor(color: Color): void {
        if (this.materials.length===0) return;

        this.glowColor = color;

        // 设置 glowColor 参数（独立的 vec4）
        const colorVec4 = new Vec4(
            this.glowColor.r / 255,
            this.glowColor.g / 255,
            this.glowColor.b / 255,
            1.0
        );
        for (let i = 0; i < this.materials.length; i++) {
            this.materials[i].setProperty('glowColor', colorVec4);
        }
    }

    /**
     * 开始外发光（准备点击）
     */
    public startGlow(): void {
        if (this.isGlowing) return;

        this.isGlowing = true;

        // 使用 tween 动画从当前强度渐变到目标强度
        const tempObj = { intensity: this.currentGlowIntensity };
        tween(tempObj)
            .to(this.glowDuration, { intensity: this.readyGlowIntensity }, {
                onUpdate: () => {
                    this.setGlowIntensity(tempObj.intensity);
                }
            }).call(()=>{
                this.stopGlow();
            })
            .start();
    }

    /**
     * 停止外发光（电击后恢复）
     */
    public stopGlow(): void {
        if (!this.isGlowing) return;

        this.isGlowing = false;

        // 使用 tween 动画从当前强度渐变回初始强度
        const tempObj = { intensity: this.currentGlowIntensity };
        tween(tempObj)
            .to(this.glowDuration, { intensity: this.glowIntensity }, {
                onUpdate: () => {
                    this.setGlowIntensity(tempObj.intensity);
                }
            })
            .start();
    }

    /**
     * 切换发光状态
     */
    public toggleGlow(): void {
        if (this.isGlowing) {
            this.stopGlow();
        } else {
            this.startGlow();
        }
    }

    /**
     * 立即设置发光状态（无动画）
     */
    public setGlowImmediate(isGlow: boolean): void {
        this.isGlowing = isGlow;
        const targetIntensity = isGlow ? this.readyGlowIntensity : this.glowIntensity;
        this.setGlowIntensity(targetIntensity);
    }

    /**
     * 获取当前是否正在发光
     */
    public get IsGlowing(): boolean {
        return this.isGlowing;
    }
}

