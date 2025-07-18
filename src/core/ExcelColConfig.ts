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
}
