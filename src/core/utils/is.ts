/**
 * 判断是否为数组
 * @param value
 */
export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

/**
 * 判断是否为对象
 * @param value
 */
export const isObject = <T>(value: unknown): value is Record<string, T> => typeof value === "object" && value !== null;

/**
 * 判断是否为 undefined
 * @param value
 */
export const isUndefined = (value: unknown): value is undefined => typeof value === "undefined";
