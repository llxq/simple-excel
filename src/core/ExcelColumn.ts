export interface IExcelColumnProps {
  /**
   * 列的名称
   */
  name: string;
  /**
   * 列的宽度
   */
  width: number;
  /**
   * 内容文本
   */
  text?: string;
}

export class ExcelColumn implements IExcelColumnProps {
  public name: string;
  public width: number;
  public text?: string;

  constructor(props: IExcelColumnProps) {
    this.name = props.name;
    this.width = props.width;
  }

  public updateWidth(width: number): void {
    this.width = width;
  }
}
