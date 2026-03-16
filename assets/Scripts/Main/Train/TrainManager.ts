import { _decorator, Component, Node } from 'cc';
import { CommonEvent } from '../Common/CommonEnum';
import { TrainTrack, TrackPhase } from './TrainTrack';
import { Train, TrainState } from './Train';
import { TrainCar } from './TrainCar';
import { ObjectType } from '../Common/CommonEnum';
const { ccclass, property } = _decorator;

/**
 * 火车等级枚举
 */
export enum TrainLevel {
    Lv1 = 1,
    Lv2 = 2,
    Lv3 = 3,
}

/**
 * TrainManager —— 3辆独立火车的切换管理器
 *
 * 设计说明：
 *  - 场景中存在3个独立的火车节点（TrainLv1 / TrainLv2 / TrainLv3），各自挂 Train 组件
 *  - 初始只激活 TrainLv1，其余隐藏
 *  - 升级时：
 *    1. 记录当前火车的行驶进度
 *    2. 隐藏旧火车节点（旧火车 onDisable 自动取消触摸监听）
 *    3. 激活新火车节点（新火车 onEnable 自动注册触摸监听）
 *    4. 调用新火车的 initAtProgress() 让其从旧火车位置继续行驶
 *  - 轨道扩张完成后统一调用所有火车的 syncStationProgress()
 *
 * 节点结构：
 *   TrainManager（挂本脚本）
 *   ├── TrainLv1  ← 挂 Train 组件，speed=6，1节车厢
 *   ├── TrainLv2  ← 挂 Train 组件，speed=9，3节车厢
 *   └── TrainLv3  ← 挂 Train 组件，speed=12，4节车厢
 */
@ccclass('TrainManager')
export class TrainManager extends Component {

    // ─────────────────────────────────────────────
    // Inspector 属性
    // ─────────────────────────────────────────────

    @property({
        type: Train,
        displayName: 'Lv1 火车',
        tooltip: '棕黄色，1节车厢'
    })
    public trainLv1: Train = null!;

    @property({
        type: Train,
        displayName: 'Lv2 火车',
        tooltip: '橙红色，3节车厢'
    })
    public trainLv2: Train = null!;

    @property({
        type: Train,
        displayName: 'Lv3 火车',
        tooltip: '紫色，4节车厢'
    })
    public trainLv3: Train = null!;

    @property({
        type: TrainTrack,
        displayName: '轨道组件',
        tooltip: '场景中的 TrainTrack 节点（3辆火车共享）'
    })
    public track: TrainTrack = null!;

    // ─────────────────────────────────────────────
    // 运行时数据
    // ─────────────────────────────────────────────

    /** 当前激活的火车 */
    private _activeTrain: Train = null!;

    /** 当前等级 */
    private _level: TrainLevel = TrainLevel.Lv1;

    // ─────────────────────────────────────────────
    // 生命周期
    // ─────────────────────────────────────────────

    onLoad() {
        // 初始只激活 Lv1，其余隐藏
        this.trainLv1.node.active = true;
        this.trainLv2.node.active = false;
        this.trainLv3.node.active = false;
        this._activeTrain = this.trainLv1;
        this._level = TrainLevel.Lv1;
    }
    protected start(): void {
        // 自动行驶由 Train.autoRun 属性控制，在 Inspector 勾选即可，无需在此手动调用
        // 若需要运行时动态切换模式，调用 activeTrain.startAutoRun() 或 activeTrain.startManualRun()
    }
    // ─────────────────────────────────────────────
    // 公开接口
    // ─────────────────────────────────────────────

    /** 当前等级 */
    public get level(): TrainLevel {
        return this._level;
    }

    /** 当前激活的火车 */
    public get activeTrain(): Train {
        return this._activeTrain;
    }

    /**
     * 升级到目标等级
     * @param level 目标等级（只能升不能降）
     * @param onComplete 升级演出完成后的回调（轨道扩张动画结束后触发）
     */
    public upgradeTo(level: TrainLevel, onComplete?: () => void): void {
        if (level <= this._level) return;

        const prevTrain = this._activeTrain;
        const prevProgress = prevTrain.progress;

        this._level = level;

        // 发送升级事件（供特效系统处理光扫动画）
        app.event.emit(CommonEvent.TrainUpgraded, level);

        // 切换到新火车
        const nextTrain = this._getTrainByLevel(level);
        prevTrain.node.active = false;
        nextTrain.node.active = true;
        this._activeTrain = nextTrain;

        // 新火车从旧火车当前位置继续行驶，避免瞬移
        nextTrain.initAtProgress(prevProgress);

        // Lv3 升级时扩张轨道到 Phase3，扩张完成后同步所有火车的站台进度
        if (level === TrainLevel.Lv3) {
            this.track.expandToPhase(TrackPhase.Phase3, () => {
                this._syncAllStationProgress();
                onComplete && onComplete();
            });
        } else {
            onComplete && onComplete();
        }
    }

    /**
     * 轨道扩张到 Phase2（Step3 丧尸出现时调用，与火车升级解耦）
     * @param onComplete 扩张完成后的回调
     */
    public expandTrackPhase2(onComplete?: () => void): void {
        this.track.expandToPhase(TrackPhase.Phase2, () => {
            this._syncAllStationProgress();
            onComplete && onComplete();
        });
    }

    /**
     * 向当前激活火车的车厢添加资源（由 Chainsaw 锯条收割时调用）
     */
    public addResource(type: ObjectType, amount: number): number {
        return this._activeTrain.addResource(type, amount);
    }

    /**
     * 找到第一个能接收该类型资源的车厢（用于 Chainsaw 获取飞行动画目标）
     */
    public getCarForResource(type: ObjectType): TrainCar | null {
        return this._activeTrain.getCarForResource(type);
    }

    /** 获取当前火车总载量 */
    public getTotalLoad(): number {
        return this._activeTrain.getTotalLoad();
    }

    /** 获取当前火车总容量 */
    public getTotalCapacity(): number {
        return this._activeTrain.getTotalCapacity();
    }

    /** 强制停止当前火车 */
    public stopTrain(): void {
        this._activeTrain.stopTrain();
    }

    /** 切换当前火车为自动驾驶模式并立即出发（运行时动态切换用） */
    public startAutoRun(): void {
        this._activeTrain.startAutoRun();
    }

    /** 切换当前火车为手动触摸模式（运行时动态切换用） */
    public startManualRun(): void {
        this._activeTrain.startManualRun();
    }

    /** 重置当前火车到站台 */
    public reset(): void {
        this._activeTrain.reset();
    }

    /**
     * 尝试让玩家上当前激活的火车
     * @returns true = 上车成功；false = 当前火车不允许上车（Lv3自动模式）
     */
    public tryBoardTrain(): boolean {
        if (this._activeTrain.autoRun) {
            return false;  // Lv3 不允许上车
        }
        this._activeTrain.onPlayerBoard();
        return true;
    }

    /**
     * 让玩家下当前激活的火车（强制，不等到站）
     * 通常由 Train 内部自动调用，外部特殊情况（如强制下车）可调用此方法
     */
    public alightTrain(): void {
        this._activeTrain.onPlayerAlight();
    }

    /** 当前火车是否有玩家乘坐 */
    public get trainHasPlayer(): boolean {
        return this._activeTrain.hasPlayer;
    }

    // ─────────────────────────────────────────────
    // 私有方法
    // ─────────────────────────────────────────────

    /** 根据等级获取对应的 Train 实例 */
    private _getTrainByLevel(level: TrainLevel): Train {
        switch (level) {
            case TrainLevel.Lv1: return this.trainLv1;
            case TrainLevel.Lv2: return this.trainLv2;
            case TrainLevel.Lv3: return this.trainLv3;
        }
    }

    /**
     * 轨道扩张后同步所有火车的站台进度
     * 避免因 _halfX/_halfZ 变化导致 getStationProgress() 返回值漂移
     */
    private _syncAllStationProgress(): void {
        this.trainLv1.syncStationProgress();
        this.trainLv2.syncStationProgress();
        this.trainLv3.syncStationProgress();
    }
}

