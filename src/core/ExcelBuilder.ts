import { ExcelColumn } from "./ExcelColumn.ts";
import { generateRowNameByLength } from "./helper.ts";

export class ExcelBuilder {
  public columns: ExcelColumn[] = [];

  public generateColumnByLength(length: number): void {
    this.columns = generateRowNameByLength(length).map((m) => {
      return new ExcelColumn({
        name: m,
        width: 100,
      });
    });
  }
}
