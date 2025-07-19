export interface IExcelColConfig {
  /**
   * 宽度
   */
  width?: number;
  /**
   * 是否隐藏
   */
  hidden?: boolean;
}

export class ExcelColConfig {
  public width?: number;
  public hidden?: boolean;

  constructor(props: IExcelColConfig) {
    this.width = props.width;
    this.hidden = props.hidden;
  }

  /**
   * 更新宽度
   * @param width
   * @param add
   */
  public updateWidth(width: number, add?: boolean): void {
    if (add) {
      this.width = this.width ? this.width + width : width;
    } else {
      this.width = width;
    }
  }
}
