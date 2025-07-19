<script setup lang="ts">
import { useInjectExcelBuilder } from "@/hooks/useExcelBuilder";
import { computed, useTemplateRef, nextTick, watchSyncEffect, ref, watchPostEffect } from "vue";
import { pointConvertKey, queryElementRectByPoint } from "@/core/utils/helper.ts";

defineOptions({
  name: "ExcelCell",
});

const { x, y } = defineProps<{
  x: number;
  y: number;
}>();

const { excelBuilder } = useInjectExcelBuilder();
const inputRef = useTemplateRef<HTMLInputElement>("inputRef");

const isActive = computed(() => {
  return excelBuilder.activePoint?.x === x && excelBuilder.activePoint?.y === y;
});

const updateActivePoint = async () => {
  excelBuilder.updateActivePoint(x, y);
  await nextTick();
  inputRef.value?.focus();
};

const cellRef = useTemplateRef<HTMLDivElement>("cellRef");
const cellMousedown = (event: MouseEvent) => {
  // 如果不是左键则不理会
  if (event.button !== 0) {
    return;
  }
  calcScrollOffset();
  excelBuilder.pointClick(x, y);
  excelBuilder.updateStartCalculatingSelectArea(true);
  if (!isActive.value) {
    event.preventDefault();
    // 取消选中内容
    window.getSelection()?.removeAllRanges();
  }
};

const cellMouseUp = () => {
  excelBuilder.updateStartCalculatingSelectArea(false);
};

const startRect = ref<TUndefinedAble<DOMRect>>(void 0);
watchPostEffect(() => {
  if (cellRef.value && excelBuilder.recalculateSelectAreaFlag) {
    startRect.value = queryElementRectByPoint(x, y);
  }
});

/**
 * 计算滚动偏移
 */
const calcScrollOffset = () => {
  const { left, top } = queryElementRectByPoint(x, y)!;
  const { left: startLeft, top: startTop } = startRect.value!;
  excelBuilder.scrollOffset.left = left - startLeft;
  excelBuilder.scrollOffset.top = top - startTop;
};

const cellMouseEnter = () => {
  requestAnimationFrame(() => {
    if (excelBuilder.startCalculatingSelectArea) {
      excelBuilder.setEndPoint(x, y);
      calcScrollOffset();
    }
  });
};

/**
 * 使用 sync 模式，不等待批量更新
 */
watchSyncEffect(() => {
  if (excelBuilder.startCalculatingSelectArea) {
    cellRef.value?.addEventListener("mouseenter", cellMouseEnter);
  } else {
    cellRef.value?.removeEventListener("mouseenter", cellMouseEnter);
  }
});

const isSelected = computed(() => {
  return excelBuilder.selectPointSet.has(pointConvertKey(x, y));
});
</script>

<template>
  <div
    ref="cellRef"
    :class="[
      'excel-cell',
      {
        'is-selected': isSelected && !isActive,
      },
    ]"
    @mousedown.stop="cellMousedown"
    @mouseup="cellMouseUp"
  >
    <div v-if="!isActive" class="excel-cell__mask" @dblclick="updateActivePoint"></div>
    <input ref="inputRef" class="excel-cell__input" type="text" />
  </div>
</template>

<style scoped lang="scss">
.excel-cell {
  display: flex;
  width: 100%;
  height: max-content;
  min-height: var(--table-cell-height);
  position: relative;

  &__input {
    width: 100%;
    height: auto;
    min-height: var(--table-cell-height);
    padding: 0 4px;
    box-sizing: border-box;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 14px;
    line-height: 24px;
    color: var(--table-body-text-color);
  }

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: var(--cell-mask-z-index);
    width: 100%;
    height: 100%;
    background-color: transparent;
    cursor: cell;
  }

  &.is-selected {
    background-color: var(--table-cell-selected-bg-color);
  }
}
</style>
