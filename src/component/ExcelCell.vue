<script setup lang="ts">
import { useInjectExcelBuilder } from "@/hooks/useExcelBuilder";
import { computed, useTemplateRef, nextTick } from "vue";

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
  return excelBuilder.activePoint.x === x && excelBuilder.activePoint.y === y;
});

const updateActivePoint = async () => {
  excelBuilder.updateActivePoint(x, y);
  await nextTick();
  inputRef.value?.focus();
};
</script>

<template>
  <div class="excel-cell">
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
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: transparent;
    cursor: cell;
  }
}
</style>
