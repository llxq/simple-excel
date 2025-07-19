import { isArray, isObject, isUndefined } from "@/core/utils/is.ts";

const MAX_ALPHABET = 26;

/**
 * 从a-z字符串列表
 * A ASCII is 65
 */
export const alphabet = Array.from({ length: MAX_ALPHABET }, (_, i) => String.fromCharCode(i + 65));

/**
 * 将列号转换为对应的列名称
 * @param columnNumber
 */
const convertColumnNumberToColumnName = (columnNumber: number): string => {
  let columnName = "";
  while (columnNumber > 0) {
    // 取余用于获取对应的字母
    const remainder = (columnNumber - 1) % MAX_ALPHABET;
    columnName = alphabet[remainder] + columnName;
    // 用于判断是第几轮（每一轮对应的就是 % 26）
    columnNumber = Math.floor((columnNumber - 1) / MAX_ALPHABET);
  }
  return columnName;
};

/**
 * 根据长度生成excel的行名称
 * @example
 * generateRowNameByLength(27) => ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA']
 * @param length 行数
 */
export const generateRowNameByLength = (length: number): string[] => {
  const rowNames: string[] = [];
  for (let i = 1; i <= length; i++) {
    rowNames.push(convertColumnNumberToColumnName(i));
  }
  return rowNames;
};

/**
 * 将坐标转换为key
 * @param x
 * @param y
 */
export const pointConvertKey = (x: number | [number, number] | { x: number; y: number }, y?: number): string => {
  if (isArray(x)) {
    return x.toString();
  } else if (isObject(x)) {
    return `${x.x},${x.y}`;
  } else {
    if (isUndefined(x) || isUndefined(y)) {
      throw new Error("x and y must be defined");
    }
    return `${x},${y}`;
  }
};

/**
 * 将px转换为字符串
 * @param value
 */
export const toPx = (value: number | string): string => {
  if (typeof value === "number") {
    return `${value}px`;
  }
  return toPx(parseFloat(value));
};

/**
 * 根据坐标查询元素的rect
 * @param x
 * @param y
 */
export const queryElementRectByPoint = (x: number, y: number) => {
  const element = document.querySelector(`.excel-cell__td[data-x="${x}"][data-y="${y}"]`) as HTMLInputElement;
  if (!element) {
    return void 0;
  }
  return element.getBoundingClientRect();
};
