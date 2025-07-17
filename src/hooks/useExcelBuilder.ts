import { type InjectionKey, provide, inject, ref } from "vue";
import { ExcelBuilder } from "@/core/ExcelBuilder";

const excelBuilderInjectionKey: InjectionKey<ExcelBuilder> = Symbol("ExcelBuilder");

/**
 * 获取 ExcelBuilder
 */
export const useInjectExcelBuilder = () => {
  const excelBuilder = inject<ExcelBuilder>(excelBuilderInjectionKey);
  if (!excelBuilder) {
    throw new Error("useExcelBuilder must be used within a ExcelBuilderProvider");
  }
  return {
    excelBuilder,
  };
};

/**
 * 提供 ExcelBuilder
 */
export const useProvideExcelBuilder = () => {
  const excelBuilder = ref<ExcelBuilder>(new ExcelBuilder());
  provide(excelBuilderInjectionKey, excelBuilder.value);
  return {
    excelBuilder,
  };
};
