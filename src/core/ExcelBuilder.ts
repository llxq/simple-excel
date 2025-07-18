import type { ExcelColConfig } from "@/core/ExcelColConfig.ts";
import { ExcelConfiguration } from "@/core/ExcelConfiguration.ts";
import { pointConvertKey } from "@/core/utils/helper.ts";
import { isUndefined } from "@/core/utils/is.ts";
import type { TPoint } from "@/core/utils/types.ts";

export class ExcelBuilder {
  /**
   * 当前激活的sheet
   */
  public activeSheetName: TUndefinedAble<string> = void 0;

  /**
   * 配置信息
   */
  public configuration: ExcelConfiguration = new ExcelConfiguration();

  public get meta() {
    return this.configuration.meta;
  }
  public get rowConfiguration(): TUndefinedAble<Map<number, ExcelColConfig>> {
    if (!this.activeSheetName) return void 0;
    return this.configuration.rowConfiguration.get(this.activeSheetName);
  }

  constructor() {
    this.updateActiveSheetName("sheet1");
  }

  public updateActiveSheetName(activeSheetName: string) {
    this.activeSheetName = activeSheetName;
  }

  /**
   * 当前激活的坐标
   */
  public activePoint: TPoint = void 0;

  /**
   * 当前选中的坐标，激活的坐标也包含在选中坐标内
   * @example
   * Set(['1,2', '2,1', '3,4'])
   */
  public selectPointSet: Set<string> = new Set<string>();
  public startPoint: TPoint = void 0;
  public endPoint: TPoint = void 0;
  /**
   * 用于记录滚动的偏移量，优化选中区域
   */
  public scrollOffset = { left: 0, top: 0 };
  /**
   * 是否开始计算选中区域
   */
  public startCalculatingSelectArea = false;

  public updateActivePoint(x: TUndefinedAble<number>, y?: number) {
    if (isUndefined(x) || isUndefined(y)) {
      this.activePoint = void 0;
    } else {
      this.activePoint = { x, y };
    }
  }

  /**
   * 点击某个坐标的时候，清空选中的坐标，并将当前坐标作为开始坐标
   * @param x
   * @param y
   */
  public pointClick(x: number, y: number): void {
    this.selectPointSet.clear();
    this.selectPointSet.add(pointConvertKey(x, y));
    this.startPoint = { x, y };
    this.endPoint = { x, y };
  }

  /**
   * 更新是否开始计算选中区域
   * @param value
   */
  public updateStartCalculatingSelectArea(value: boolean): void {
    this.startCalculatingSelectArea = value;
  }

  /**
   * 设置结束坐标（在鼠标进入单元格的时候）
   * @param x
   * @param y
   */
  public setEndPoint(x: number, y: number): void {
    if (!this.startPoint) {
      this.pointClick(x, y);
      return;
    }
    this.endPoint = { x, y };
    this.selectPointSet.clear();
    // 搜集开始和结束之间的坐标
    // 如果起始点已存在，则计算矩形选框的正确边界
    const { x: startX, y: startY } = this.startPoint;
    // 使用 Math.min 和 Math.max 来确保循环的起始和结束值是正确的，无论拖动方向如何
    const minX = Math.min(startX, x);
    const maxX = Math.max(startX, x);
    const minY = Math.min(startY, y);
    const maxY = Math.max(startY, y);
    // 遍历矩形区域内的所有坐标点
    for (let i = minX; i <= maxX; i++) {
      for (let j = minY; j <= maxY; j++) {
        this.selectPointSet.add(pointConvertKey(i, j));
      }
    }
  }
}
