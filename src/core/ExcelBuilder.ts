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
  public startPoint: TPoint = { x: 10, y: 10 };
  public endPoint: TPoint = { x: 20, y: 20 };

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
  public pointClick(x: number, y: number) {
    this.selectPointSet.clear();
    this.selectPointSet.add(pointConvertKey(x, y));
    this.startPoint = { x, y };
    this.endPoint = { x, y };
  }
}
