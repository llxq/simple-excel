import type { ExcelColConfig } from "@/core/ExcelColConfig.ts";
import { EXCEL_CELL_DEFAULT_WIDTH } from "@/core/utils/constants.ts";

export interface IExcelMetaConfig {
  /**
   * 默认列宽
   */
  defaultColumnWidth: number;
}

export class ExcelConfiguration {
  /**
   * 默认配置
   */
  public meta: IExcelMetaConfig = {
    defaultColumnWidth: EXCEL_CELL_DEFAULT_WIDTH,
  };

  /**
   * 每一个 sheet 的行配置
   */
  public rowConfiguration: Map<string, Map<number, ExcelColConfig>> = new Map();

  public addRowConfiguration(sheetName: string, rowConfiguration: Map<number, ExcelColConfig>) {
    this.rowConfiguration.set(sheetName, rowConfiguration);
  }
}
