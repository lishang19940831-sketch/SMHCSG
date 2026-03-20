import { _decorator, Component, Node, Vec3, CCFloat, CCInteger, tween } from 'cc';

const { ccclass, property } = _decorator;

/**
 * 轨道阶段枚举
 */
export enum TrackPhase {
    /** 初始小圈：仅覆盖麦田 */
    Phase1 = 0,
    /** 大圈：扩张后的完整路径 */
    Phase2 = 1,
}

/**
 * TrainTrack —— 路径点（Waypoint）轨道管理
 *
 * 设计说明：
 *  - 在场景中创建若干空节点作为路径点，按行驶顺序拖入对应阶段的数组
 *  - 火车沿路径点依次直线行驶，完全贴合视觉轨道
 *  - 支持三个阶段（Phase1 / Phase2 / Phase3），升级时切换到更大的路径点组
 *  - 站台位置由 stationNode 节点标记，自动计算对应进度
 *  - 对外接口与原矩形版本完全相同，Train.ts 无需修改
 *
 * 使用方法：
 *  1. 在场景中 TrainTrack 节点下创建子节点作为路径点（空节点即可）
 *     按顺时针顺序排列，第一个点即为出发点
 *  2. 将路径点依次拖入 Inspector 的 Phase1 路径点 / Phase2 路径点 / Phase3 路径点 数组
 *  3. 创建一个节点放在站台位置，拖入 站台标记节点
 *  4. Phase2/Phase3 路径点包含 Phase1 的所有点 + 新增的扩展点（完整闭合路径）
 *
 * 节点结构示例：
 *   TrainTrack（挂本脚本）
 *   ├── WP_Station    ← 站台位置（同时也是路径点之一）
 *   ├── WP_01
 *   ├── WP_02
 *   ├── WP_03
 *   └── ...
 */
@ccclass('TrainTrack')
export class TrainTrack extends Component {

    // ─────────────────────────────────────────────
    // Inspector 属性
    // ─────────────────────────────────────────────

    @property({
        type: [Node],
        displayName: 'Phase1 路径点',
        tooltip: '初始轨道的路径点节点，按行驶顺序排列（闭合路径，最后一点自动连回第一点）'
    })
    public phase1Waypoints: Node[] = [];

    @property({
        type: [Node],
        displayName: 'Phase2 路径点',
        tooltip: 'Step3 扩张后的完整路径点（包含 Phase1 区域 + 新增区域，闭合路径）'
    })
    public phase2Waypoints: Node[] = [];

    @property({
        type: Node,
        displayName: '站台标记节点',
        tooltip: '放在站台位置的空节点，用于自动计算站台进度。留空则默认使用第一个路径点'
    })
    public stationNode: Node = null!;

    @property({
        type: CCFloat,
        displayName: '轨道扩张动画时长(秒)',
        tooltip: '轨道从一个阶段切换到下一阶段的过渡时长（当前为瞬切，预留扩展）',
        min: 0
    })
    public expandDuration: number = 1.5;

    @property({
        type: CCInteger,
        displayName: '贝塞尔采样点数',
        tooltip: '弯道贝塞尔曲线的采样点数量，越大越平滑，建议8~20',
        min: 2
    })
    public bezierSamples: number = 12;

    @property({
        type: [Node],
        displayName: '铁轨节点',
        tooltip: '铁轨节点'
    })
    public trackNodes: Node[] = [];
    // ─────────────────────────────────────────────
    // 运行时数据
    // ─────────────────────────────────────────────

    /** 当前阶段 */
    private _currentPhase: TrackPhase = TrackPhase.Phase1;

    /** 当前激活的路径点世界坐标缓存 */
    private _points: Vec3[] = [];

    /** 各段的累计长度（_segLengths[i] = 第0段到第i段的总长度） */
    private _segLengths: number[] = [];

    /** 当前轨道总周长 */
    private _totalLength: number = 0;

    /** 站台在当前路径上的归一化进度 [0,1) */
    private _stationProgress: number = 0;

    // ─────────────────────────────────────────────
    // 生命周期
    // ─────────────────────────────────────────────

    onLoad() {
        this._buildPath(this._getWaypointsByPhase(TrackPhase.Phase1));
        this._stationProgress = this._calcStationProgress();
        this._applyTrackNodeVisibility(TrackPhase.Phase1);
    }

    // ─────────────────────────────────────────────
    // 公开接口（与原矩形版本完全相同）
    // ─────────────────────────────────────────────

    /** 获取当前轨道阶段 */
    public get currentPhase(): TrackPhase {
        return this._currentPhase;
    }

    /**
     * 扩张到指定阶段
     * @param phase 目标阶段（只能升不能降）
     * @param onComplete 切换完成后的回调
     */
    public expandToPhase(phase: TrackPhase, onComplete?: () => void): void {
        if (phase <= this._currentPhase) return;
        this._currentPhase = phase;
        this._buildPath(this._getWaypointsByPhase(phase));
        this._stationProgress = this._calcStationProgress();

        // 动画：Phase1 → Phase2 逐段出现（使用轨道节点的缩放）
        if (phase === TrackPhase.Phase2 && this.trackNodes.length >= 3 && this.expandDuration > 0) {
            const oldA = this.trackNodes[0];
            const oldB = this.trackNodes[1];
            const newRail = this.trackNodes[2];
            if (oldA && oldB && newRail) {
                // 保证三者可见以播放动画
                oldA.active = true;
                oldB.active = true;
                newRail.active = true;

                const origNew = newRail.scale.clone();
                const origA = oldA.scale.clone();
                const origB = oldB.scale.clone();

                // 新轨道从0逐段出现：按子节点顺序依次放大
                const children = newRail.children.slice();
                if (children.length > 0) {
                    // 先将所有子段隐藏（缩放为0）
                    const childOrigScales = children.map(c => c.scale.clone());
                    for (const c of children) c.setScale(0, 0, 0);
                    const per = Math.max(0.05, this.expandDuration / children.length);
                    children.forEach((c, idx) => {
                        tween(c)
                            .delay(idx * per).call(()=>{
                              
                                manager.game.playLevelUpEffect(manager.game.upgradeEffects[0],c.worldPosition,manager.game.effectLayerNode);
                            })
                            .to(per, { scale: childOrigScales[idx] }, { easing: 'sineOut' })
                            .start();
                    });
                    // 恢复保障：收尾阶段强制还原子段缩放
                    tween(this.node)
                        .delay(this.expandDuration + 0.02)
                        .call(() => {
                            children.forEach((c, i) => c.setScale(childOrigScales[i]));
                        })
                        .start();
                } else {
                    // 无子段时整体放大
                    newRail.setScale(0, 0, 0);
                    tween(newRail).to(this.expandDuration, { scale: origNew }, { easing: 'sineOut' }).start();
                }

                // 旧轨道淡出（缩放为0），稍快结束
                tween(oldA).to(this.expandDuration * 0.6, { scale: new Vec3(0, 0, 0) }, { easing: 'sineIn' }).start();
                tween(oldB).to(this.expandDuration * 0.6, { scale: new Vec3(0, 0, 0) }, { easing: 'sineIn' }).start();

                // 收尾：还原缩放并切换显隐
                tween(this.node)
                    .delay(this.expandDuration + 0.05)
                    .call(() => {
                        // 复原缩放，应用最终显隐
                        oldA.setScale(origA);
                        oldB.setScale(origB);
                        newRail.setScale(origNew);
                        this._applyTrackNodeVisibility(phase);
                        onComplete && onComplete();
                    })
                    .start();
                return;
            }
        }

        // 无动画或配置不足，直接切换
        this._applyTrackNodeVisibility(phase);
        onComplete && onComplete();
    }

    /**
     * 根据归一化进度 t ∈ [0, 1) 返回轨道上的世界坐标
     */
    public getPositionAt(t: number): Vec3 {
        t = ((t % 1) + 1) % 1;
        if (this._points.length === 0) return new Vec3();

        const dist = t * this._totalLength;
        return this._getPositionAtDistance(dist);
    }

    /**
     * 根据归一化进度 t 返回切线方向（单位向量，XZ 平面）
     */
    public getDirectionAt(t: number): Vec3 {
        t = ((t % 1) + 1) % 1;
        if (this._points.length < 2) return new Vec3(0, 0, 1);

        const dist = t * this._totalLength;
        const segIdx = this._getSegmentIndex(dist);
        const n = this._points.length;
        const a = this._points[segIdx];
        const b = this._points[(segIdx + 1) % n];

        const dir = new Vec3(b.x - a.x, 0, b.z - a.z);
        dir.normalize();
        return dir;
    }

    /**
     * 获取当前轨道总周长
     */
    public getTotalLength(): number {
        return this._totalLength;
    }

    /**
     * 给定当前进度 t 和本帧移动距离 distance，返回新的归一化进度
     */
    public advanceDistance(t: number, distance: number): number {
        if (this._totalLength <= 0) return t;
        const delta = distance / this._totalLength;
        return ((t + delta) % 1 + 1) % 1;
    }

    /**
     * 获取站台位置的归一化进度
     * 由 stationNode 节点位置自动计算，轨道切换后会重新计算
     */
    public getStationProgress(): number {
        return this._stationProgress;
    }

    /**
     * 根据世界坐标反算轨道上最近点的归一化进度
     * 编辑器模式下用于从车头节点位置反推进度
     * @param worldPos 世界坐标
     * @returns 归一化进度 [0, 1)
     */
    public getProgressByPosition(worldPos: Vec3): number {
        if (this._totalLength <= 0 || this._points.length < 2) return 0;
        const n = this._points.length;
        let bestDist = Infinity;
        let bestProgress = 0;

        for (let i = 0; i < n; i++) {
            const a = this._points[i];
            const b = this._points[(i + 1) % n];

            const ab = new Vec3(b.x - a.x, 0, b.z - a.z);
            const ap = new Vec3(worldPos.x - a.x, 0, worldPos.z - a.z);
            const abLen2 = ab.x * ab.x + ab.z * ab.z;
            let t = abLen2 > 0 ? (ap.x * ab.x + ap.z * ab.z) / abLen2 : 0;
            t = Math.max(0, Math.min(1, t));

            const closest = new Vec3(a.x + ab.x * t, 0, a.z + ab.z * t);
            const d = Math.sqrt(
                (worldPos.x - closest.x) ** 2 + (worldPos.z - closest.z) ** 2
            );

            if (d < bestDist) {
                bestDist = d;
                const segStart = i === 0 ? 0 : this._segLengths[i - 1];
                const segLen = this._segLengths[i] - segStart;
                const distAlongPath = segStart + segLen * t;
                bestProgress = distAlongPath / this._totalLength;
            }
        }

        return bestProgress;
    }

    // ─────────────────────────────────────────────
    // 私有工具
    // ─────────────────────────────────────────────

    /**
     * 根据阶段切换 trackNodes 的显隐
     * Phase1：trackNodes[0] trackNodes[1] 显示，trackNodes[2] 隐藏
     * Phase2+：trackNodes[2] 显示，trackNodes[0] trackNodes[1] 隐藏
     */
    private _applyTrackNodeVisibility(phase: TrackPhase): void {
        if (this.trackNodes.length < 3) return;
        const isPhase1 = phase === TrackPhase.Phase1;
        this.trackNodes[0].active = isPhase1;
        this.trackNodes[1].active = isPhase1;
        this.trackNodes[2].active = !isPhase1;
    }

    /** 根据阶段获取对应的路径点节点数组 */
    private _getWaypointsByPhase(phase: TrackPhase): Node[] {
        switch (phase) {
            case TrackPhase.Phase1: return this.phase1Waypoints;
            case TrackPhase.Phase2: return this.phase2Waypoints;
        }
    }

    /**
     * 根据路径点节点数组构建路径缓存
     * - 节点下有 b_1/b_2/b_3 子节点 → 贝塞尔弯道，展开为采样点
     * - 节点下只有 pos 子节点 → 普通直线点
     */
    private _buildPath(waypoints: Node[]): void {
        this._points = [];
        this._segLengths = [];
        this._totalLength = 0;

        if (waypoints.length < 2) {
            console.warn('[TrainTrack] 路径点数量不足，至少需要2个');
            return;
        }

        // 收集世界坐标
        for (const wp of waypoints) {
            if (!wp || !wp.isValid) continue;

            const b1 = wp.getChildByName('b_1');
            const b2 = wp.getChildByName('b_2');
            const b3 = wp.getChildByName('b_3');

            if (b1 && b1.isValid && b2 && b2.isValid && b3 && b3.isValid) {
                // 贝塞尔弯道：b_1 起点，b_3 终点，b_2 途径点
                // 反算控制点使曲线在 t=0.5 时经过 b_2：P1 = 2*b_2 - 0.5*b_1 - 0.5*b_3
                const p0 = b1.getWorldPosition();
                const p2 = b3.getWorldPosition();
                const pm = b2.getWorldPosition();
                const p1 = new Vec3(
                    2 * pm.x - 0.5 * p0.x - 0.5 * p2.x,
                    2 * pm.y - 0.5 * p0.y - 0.5 * p2.y,
                    2 * pm.z - 0.5 * p0.z - 0.5 * p2.z,
                );

                // 等弧长采样：先高密度采样建立 t→弧长 映射表
                const oversample = this.bezierSamples * 10;
                const rawPts: Vec3[] = [];
                const arcLens: number[] = [0];
                for (let i = 0; i <= oversample; i++) {
                    const t = i / oversample;
                    const mt = 1 - t;
                    rawPts.push(new Vec3(
                        mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
                        mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
                        mt * mt * p0.z + 2 * mt * t * p1.z + t * t * p2.z,
                    ));
                    if (i > 0) {
                        arcLens.push(arcLens[i - 1] + Vec3.distance(rawPts[i - 1], rawPts[i]));
                    }
                }
                const totalArc = arcLens[arcLens.length - 1];

                // 按等弧长间隔取点（含起点不含终点，终点由 b_3 单独加入）
                for (let i = 0; i < this.bezierSamples; i++) {
                    const targetLen = (i / this.bezierSamples) * totalArc;
                    // 二分查找对应的 rawPts 索引
                    let lo = 0, hi = arcLens.length - 1;
                    while (lo < hi - 1) {
                        const mid = (lo + hi) >> 1;
                        if (arcLens[mid] < targetLen) lo = mid; else hi = mid;
                    }
                    const frac = arcLens[hi] > arcLens[lo]
                        ? (targetLen - arcLens[lo]) / (arcLens[hi] - arcLens[lo]) : 0;
                    this._points.push(new Vec3(
                        rawPts[lo].x + (rawPts[hi].x - rawPts[lo].x) * frac,
                        rawPts[lo].y + (rawPts[hi].y - rawPts[lo].y) * frac,
                        rawPts[lo].z + (rawPts[hi].z - rawPts[lo].z) * frac,
                    ));
                }
                // 补上终点 b_3，保证弯道与后续直道精确衔接
                this._points.push(new Vec3(p2.x, p2.y, p2.z));
            } else {
                // 普通直线点：优先用 pos 子节点，否则用节点本身
                const posNode = wp.getChildByName('pos');
                const target = (posNode && posNode.isValid) ? posNode : wp;
                const wp_world = target.getWorldPosition();
                this._points.push(new Vec3(wp_world.x, wp_world.y, wp_world.z));
            }
        }

        const n = this._points.length;
        let accumulated = 0;
        // 闭合路径：最后一段从 points[n-1] 回到 points[0]
        for (let i = 0; i < n; i++) {
            const a = this._points[i];
            const b = this._points[(i + 1) % n];
            const segLen = Vec3.distance(a, b);
            accumulated += segLen;
            this._segLengths.push(accumulated);
        }
        this._totalLength = accumulated;
    }

    /**
     * 根据沿路径的距离值返回世界坐标（线性插值）
     */
    private _getPositionAtDistance(dist: number): Vec3 {
        const n = this._points.length;
        if (n === 0) return new Vec3();
        if (n === 1) return this._points[0].clone();

        // 归一化距离到 [0, totalLength)
        dist = ((dist % this._totalLength) + this._totalLength) % this._totalLength;

        const segIdx = this._getSegmentIndex(dist);
        const a = this._points[segIdx];
        const b = this._points[(segIdx + 1) % n];

        const segStart = segIdx === 0 ? 0 : this._segLengths[segIdx - 1];
        const segLen = this._segLengths[segIdx] - segStart;
        const t = segLen > 0 ? (dist - segStart) / segLen : 0;

        return new Vec3(
            a.x + (b.x - a.x) * t,
            a.y + (b.y - a.y) * t,
            a.z + (b.z - a.z) * t
        );
    }

    /**
     * 根据沿路径的距离值返回所在线段的索引
     */
    private _getSegmentIndex(dist: number): number {
        const n = this._segLengths.length;
        for (let i = 0; i < n; i++) {
            if (dist < this._segLengths[i]) return i;
        }
        return n - 1;
    }

    /**
     * 计算 stationNode 在当前路径上最近点的归一化进度
     * 如果没有设置 stationNode，则返回 0（第一个路径点）
     */
    private _calcStationProgress(): number {
        if (!this.stationNode || !this.stationNode.isValid) return 0;
        if (this._totalLength <= 0) return 0;

        const stationPos = this.stationNode.getWorldPosition();
        const n = this._points.length;

        let bestDist = Infinity;
        let bestProgress = 0;

        for (let i = 0; i < n; i++) {
            const a = this._points[i];
            const b = this._points[(i + 1) % n];

            // 求 stationPos 在线段 a→b 上的最近点
            const ab = new Vec3(b.x - a.x, 0, b.z - a.z);
            const ap = new Vec3(stationPos.x - a.x, 0, stationPos.z - a.z);
            const abLen2 = ab.x * ab.x + ab.z * ab.z;
            let t = abLen2 > 0 ? (ap.x * ab.x + ap.z * ab.z) / abLen2 : 0;
            t = Math.max(0, Math.min(1, t));

            const closest = new Vec3(a.x + ab.x * t, 0, a.z + ab.z * t);
            const d = Math.sqrt(
                (stationPos.x - closest.x) ** 2 + (stationPos.z - closest.z) ** 2
            );

            if (d < bestDist) {
                bestDist = d;
                const segStart = i === 0 ? 0 : this._segLengths[i - 1];
                const segLen = this._segLengths[i] - segStart;
                const distAlongPath = segStart + segLen * t;
                bestProgress = distAlongPath / this._totalLength;
            }
        }

        return bestProgress;
    }
}
