<script setup lang="ts">
import { toPx } from "@/core/utils/helper.ts";
import { useInjectExcelBuilder } from "@/hooks/useExcelBuilder.ts";
import { ref, watchPostEffect } from "vue";

defineOptions({
  name: "ExcelLine",
});

const { excelBuilder } = useInjectExcelBuilder();

const style = ref({ width: "", height: "", top: "", left: "" });

const queryElementRectByPoint = (x: number, y: number) => {
  const element = document.querySelector(`.excel-cell__td[data-x="${x}"][data-y="${y}"]`) as HTMLInputElement;
  if (!element) {
    return void 0;
  }
  return element.getBoundingClientRect();
};

const calcAreaLinePosition = () => {
  const { x: x1, y: y1 } = excelBuilder.startPoint!;
  const { x: x2, y: y2 } = excelBuilder.endPoint!;
  const startRect = queryElementRectByPoint(x1, y1);
  if (startRect) {
    const { width, height, top, left } = startRect;
    if (x1 === x2 && y1 === y2) {
      // 处理开始节点即可
      style.value = {
        width: toPx(width),
        height: toPx(height),
        top: toPx(top),
        left: toPx(left),
      };
    } else {
      const endRect = queryElementRectByPoint(x2, y2);
      if (endRect) {
        const { top: endTop, left: endLeft } = endRect;
        style.value = {
          width: toPx(Math.abs(endLeft - left)),
          height: toPx(Math.abs(endTop - top)),
          top: toPx(Math.min(top, endTop)),
          left: toPx(Math.min(left, endLeft)),
        };
      }
    }
  }
};

watchPostEffect(() => {
  if (
    excelBuilder.startPoint?.x &&
    excelBuilder.startPoint?.y &&
    excelBuilder.endPoint?.x &&
    excelBuilder.endPoint?.y
  ) {
    calcAreaLinePosition();
  }
});

const addStyle = (v1: string, v2: string) => {
  return toPx(parseFloat(v1) + parseFloat(v2));
};
</script>

<template>
  <div
    class="excel-area-line excel-area-line__left"
    :style="{
      height: style.height,
      top: style.top,
      left: style.left,
    }"
  ></div>
  <div
    class="excel-area-line excel-area-line__top"
    :style="{ width: style.width, left: style.left, top: style.top }"
  ></div>
  <div
    class="excel-area-line excel-area-line__right"
    :style="{ height: style.height, top: style.top, left: addStyle(style.left, style.width) }"
  ></div>
  <div
    class="excel-area-line excel-area-line__bottom"
    :style="{ width: style.width, top: addStyle(style.top, style.height), left: style.left }"
  >
    <div class="excel-area-line__resize"></div>
  </div>
</template>

<style scoped lang="scss">
.excel-area-line {
  position: absolute;
  background-color: var(--area-line-color);
  z-index: var(--area-line-z-index);
  cursor: move;

  &__left,
  &__right {
    width: var(--area-line-size);
  }

  &__top,
  &__bottom {
    height: var(--area-line-size);
  }

  &__bottom {
    .excel-area-line__resize {
      width: var(--area-line-resize-size);
      height: var(--area-line-resize-size);
      position: absolute;
      bottom: calc(-1 * ((var(--area-line-resize-size) / 2) - (var(--area-line-size) / 2)));
      right: calc(-1 * ((var(--area-line-resize-size) / 2) + (var(--area-line-size) / 2)));
      background-color: var(--area-line-color);
      box-shadow: 0 0 0 1px #fff;
    }
  }
}
</style>
