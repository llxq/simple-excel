<script setup lang="ts">
import { queryElementRectByPoint, toPx } from "@/core/utils/helper.ts";
import { useInjectExcelBuilder } from "@/hooks/useExcelBuilder.ts";
import { ref, watchPostEffect } from "vue";

defineOptions({
  name: "ExcelLine",
});

const { excelBuilder } = useInjectExcelBuilder();

const showLine = ref(true);
const style = ref({ width: "", height: "", top: "", left: "" });

const calcAreaLinePosition = () => {
  if (!excelBuilder.startPoint || !excelBuilder.endPoint) {
    showLine.value = false;
    return;
  }
  const startRect = queryElementRectByPoint(excelBuilder.startPoint.x, excelBuilder.startPoint.y);
  const endRect = queryElementRectByPoint(excelBuilder.endPoint.x, excelBuilder.endPoint.y);
  if (!startRect || !endRect) {
    showLine.value = false;
    return;
  }
  showLine.value = true;
  const finalLeft = Math.min(startRect.left, endRect.left);
  const finalTop = Math.min(startRect.top, endRect.top);
  const startRight = startRect.left + startRect.width;
  const startBottom = startRect.top + startRect.height;
  const endRight = endRect.left + endRect.width;
  const endBottom = endRect.top + endRect.height;
  const finalRight = Math.max(startRight, endRight);
  const finalBottom = Math.max(startBottom, endBottom);
  const finalWidth = finalRight - finalLeft;
  const finalHeight = finalBottom - finalTop;
  style.value = {
    width: toPx(finalWidth),
    height: toPx(finalHeight),
    top: toPx(finalTop - excelBuilder.scrollOffset.top),
    left: toPx(finalLeft - excelBuilder.scrollOffset.left),
  };
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
    v-show="showLine"
    :class="[
      'excel-area-line-container',
      {
        'no-pointer-events': excelBuilder.startCalculatingSelectArea,
      },
    ]"
  >
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
      <div
        :class="[
          'excel-area-line__resize',
          {
            'no-pointer-events': excelBuilder.startCalculatingSelectArea,
          },
        ]"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.excel-area-line-container {
  &.no-pointer-events {
    pointer-events: none;
  }

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
}
</style>
