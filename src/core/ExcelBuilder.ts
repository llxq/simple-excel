export class ExcelBuilder {
  /**
   * 当前激活的坐标
   */
  public activePoint: { x: TUndefinedAble<number>; y: TUndefinedAble<number> } = { x: void 0, y: void 0 };

  public updateActivePoint(x: TUndefinedAble<number>, y: TUndefinedAble<number>) {
    this.activePoint = { x, y };
  }
}
