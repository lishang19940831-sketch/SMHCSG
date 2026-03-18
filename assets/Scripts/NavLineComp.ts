import { _decorator, Component, MeshRenderer, Material, Vec3, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

const tempV2 = new Vec3(1, 1, 1);
const tOffset = new Vec2(1, 1);

/**
 * 导航线组件 - 3D Mesh箭头引导线
 * 用于在3D场景中显示从起点到终点的箭头引导
 */
@ccclass('NavLineComp')
export class NavLineComp extends Component {

    @property({ type: MeshRenderer, displayName: "箭头Mesh", tooltip: "拖MeshRenderer组件到这里" })
    lineMesh: MeshRenderer = null!;

    @property({ displayName: "箭头速度", tooltip: "控制材质texture位移,在代码里设置x轴向或者y轴移动", min: 0.1 })
    moveSpeed: number = 2;

    @property({ displayName: "箭头密度", tooltip: "控制箭头的密度", min: 0.1 })
    density: number = 1;

    @property({ displayName: "长度缩放倍数", tooltip: "调整箭头线的实际长度，值越大越长", min: 0.1, max: 10 })
    lengthScale: number = 1.0;

    @property({ displayName: "Y轴旋转偏移", tooltip: "调整箭头朝向，通常为0或180", min: 0, max: 360 })
    yRotationOffset: number = 0;

    /** 材质实例（改为public以便外部访问） */
    public mat: Material = null!;

    /** 当前距离长度 */
    private desLen: number = 0;

    /** 上一次的缩放长度（用于优化，避免重复设置相同值） */
    private lastScaledLength: number = -1;

    /** 是否已初始化 */
    inited: boolean = false;

    protected onLoad(): void {
        if (this.lineMesh) {
            this.mat = this.lineMesh.material as Material;
        }
    }

    start() {
        const textureSpeed = new Vec2(0, 0);
        // 根据需求设置移动方向（Y轴）
        textureSpeed.y = this.moveSpeed;
        if (this.mat) {
            this.mat.setProperty("textureMoveSpeed", textureSpeed);
        }
    }

    /**
     * 停止显示导航线（仅重置状态，不控制显示）
     */
    stop() {
        // 重置状态，以便下次显示时可以重新初始化
        this.lastScaledLength = -1;
        this.inited = false;
    }

    /**
     * 显示导航线（空方法，保留接口兼容性）
     */
    show() {
        // 不再控制显示，由外部 arrow 节点控制
    }

    /**
     * 设置导航线的长度（父节点负责位置和旋转，本组件只负责拉伸）
     * @param distance 起点到终点的距离
     */
    setDistance(distance: number) {
        
        // 保存距离
        this.desLen = distance;
        
        // 应用长度缩放倍数
        const scaledLength = this.desLen * this.lengthScale;
        
        // 优化：只在长度变化时才更新（避免每帧重复设置相同值）
        const lengthDiff = Math.abs(scaledLength - this.lastScaledLength);
        if (lengthDiff < 0.01) {
            return; // 长度几乎没变化，跳过更新
        }
        
        this.lastScaledLength = scaledLength;
        
        // 根据距离缩放节点（Z轴方向拉伸）- 只设置局部缩放
        tempV2.set(1, 1, scaledLength);
        this.node.setScale(tempV2);
        
        // 设置局部Y轴旋转偏移（用于调整箭头朝向）- 只需设置一次
        if (this.yRotationOffset !== 0 && !this.inited) {
            const euler = new Vec3(0, this.yRotationOffset, 0);
            this.node.setRotationFromEuler(euler);
        }
        
        // 根据距离和密度设置纹理平铺（使用缩放后的长度）
        tOffset.y = scaledLength * this.density;
        if (this.mat) {
            this.mat.setProperty("tilingOffset", tOffset);
            
            // ⭐ 设置 tileCount 用于渐变计算（应与纹理平铺数量一致）
            // ⚠️ 注释掉：shader中未定义此属性，会产生警告
            // const tileCount = scaledLength * this.density;
            // this.mat.setProperty("tileCount", tileCount);
        }
        
        this.inited = true;
    }
    
    /**
     * 设置导航线的起点和终点（兼容旧接口，内部只使用距离）
     * @param startPos 起点世界坐标
     * @param desPos 终点世界坐标
     */
    setDis(startPos: Vec3, desPos: Vec3) {
        const distance = Vec3.distance(startPos, desPos);
        this.setDistance(distance);
    }
}

