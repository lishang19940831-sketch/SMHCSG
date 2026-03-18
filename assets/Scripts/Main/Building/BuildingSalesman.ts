import { _decorator, easing, Node, tween, v3, Vec3 } from 'cc';
import { BuildingBase } from './BuildingBase';
import { Salesman } from '../Role/Salesman';

const { ccclass, property } = _decorator;

/**
 * BuildingSalesman —— 售货员建筑壳
 *
 * 职责：
 *  1. 继承 BuildingBase，接管解锁流程（监听 UnlockItem 事件）
 *  2. 锁定状态：隐藏建筑模型 + 隐藏/重置 Salesman
 *  3. 解锁动画：建筑模型弹出 → Salesman 弹出
 *  4. 解锁完成：调用 salesman.activate()，让其走向工作岗位开始工作
 *
 * 编辑器配置：
 *  - model        : 建筑的 3D 模型节点
 *  - movePos      : 解锁后 Salesman 先走向的过渡位置点（可选）
 *  - workStationPos: 最终工作岗位（对应 ShopCommon 触发器范围内的位置点）
 *  - salesman     : 场景中售货员角色节点上的 Salesman 组件
 */
@ccclass('BuildingSalesman')
export class BuildingSalesman extends BuildingBase {

    @property({ type: Node, displayName: '建筑模型' })
    protected model: Node = null!;

    @property({ type: Node, displayName: '解锁后售货员先移动到的位置点（可选）' })
    protected movePos: Node = null!;

    @property({ type: Node, displayName: '最终工作岗位（ShopCommon 触发器范围内）' })
    protected workStationPos: Node = null!;

    @property({ type: Salesman, displayName: '售货员' })
    public salesman: Salesman = null!;

    // ──────────────────────────────────────────────
    // 生命周期
    // ──────────────────────────────────────────────

    protected onLoad(): void {
        super.onLoad();
        // 根据建筑类型同步售货员类型
        this._syncSalesmanType();
    }

    // ──────────────────────────────────────────────
    // BuildingBase 抽象方法实现
    // ──────────────────────────────────────────────

    /**
     * 锁定状态：隐藏建筑模型，隐藏并重置售货员
     */
    protected async showlock(): Promise<void> {
        if (this.model) {
            this.model.active = false;
        }
        if (this.salesman) {
            this.salesman.node.active = false;
            this.salesman.node.setScale(0.1, 0.1, 0.1);
            this.salesman.node.setWorldPosition(this.node.getWorldPosition());
            this.salesman.reset();
        }
    }

    /**
     * 解锁动画：建筑模型弹出 → 售货员弹出
     */
    protected async showUnlockAnim(): Promise<void> {
        return new Promise((resolve) => {
            // 显示建筑模型并从 0 缩放弹出
            if (this.model) {
                this.model.active = true;
                this.model.setScale(new Vec3(0, 0, 0));
            }

            // 显示售货员并从小缩放弹出
            if (this.salesman) {
                this.salesman.node.active = true;
                this.salesman.node.setScale(0.1, 0.1, 0.1);
            }

            const modelTargetScale = this.model
                ? this.model.getScale().clone()
                : new Vec3(1, 1, 1);
            // 如果模型初始缩放已被设为0，目标用 (1,1,1)
            if (modelTargetScale.equals(Vec3.ZERO)) {
                modelTargetScale.set(1, 1, 1);
            }

            if (this.model) {
                tween(this.model)
                    .to(0.5, { scale: modelTargetScale }, { easing: easing.backOut })
                    .call(() => {
                        // 建筑弹出完成后，再弹出售货员
                        if (this.salesman) {
                            tween(this.salesman.node)
                                .to(0.5, { scale: v3(1, 1, 1) }, { easing: easing.backOut })
                                .start();
                        }
                        resolve();
                    })
                    .start();
            } else {
                resolve();
            }
        });
    }

    /**
     * 解锁完成：同步类型并激活售货员，让其走向工作岗位
     */
    protected onUnlockFinished(): void {
        this._syncSalesmanType();

        if (!this.salesman) return;

        // 获取最终工作岗位坐标
        const finalPos = this.workStationPos
            ? this.workStationPos.getWorldPosition()
            : undefined;

        if (this.movePos) {
            // 有过渡点：先走到 movePos，再激活（走向工作岗位）
            this.salesman.movementComponent.moveToWorldPosition(
                this.movePos.getWorldPosition(),
                () => {
                    this.scheduleOnce(() => {
                        this.salesman.activate(finalPos);
                    }, 0.3);
                }
            );
        } else {
            // 无过渡点：直接激活
            this.salesman.activate(finalPos);
        }
    }

    // ──────────────────────────────────────────────
    // 私有方法
    // ──────────────────────────────────────────────

    /** 将建筑类型同步给售货员 */
    private _syncSalesmanType(): void {
        if (this.salesman) {
            this.salesman.salesmanType = this.Type;
        }
    }
}

