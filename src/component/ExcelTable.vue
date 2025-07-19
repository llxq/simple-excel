<script setup lang="ts">
import ExcelLine from "@/component/ExcelLine.vue";
import { generateRowNameByLength } from "@/core/utils/helper.ts";
import { useProvideExcelBuilder } from "@/hooks/useExcelBuilder";
import { computed, ref, useTemplateRef, watchEffect, watchPostEffect } from "vue";
import ExcelCell from "./ExcelCell.vue";
import ExcelColumnResizeWidth from "@/component/ExcelColumnResizeWidth.vue";

defineOptions({
  name: "ExcelTable",
});

const { xGrid, yGrid } = defineProps<{
  xGrid: number;
  yGrid: number;
}>();

const { excelBuilder } = useProvideExcelBuilder();

const getRowStyle = computed(() => {
  return (index: number) => {
    const { defaultColumnWidth } = excelBuilder.value.meta;
    let currentWidth: number = defaultColumnWidth;
    if (excelBuilder.value.rowConfiguration?.has(index)) {
      const { width, hidden } = excelBuilder.value.rowConfiguration.get(index)!;
      if (hidden) {
        return {
          display: "none",
        };
      }
      currentWidth = width ?? defaultColumnWidth;
    }
    return {
      width: `${currentWidth}px`,
    };
  };
});

const xGridNames = ref<string[]>();

watchEffect(() => {
  xGridNames.value = generateRowNameByLength(xGrid);
});

/**
 * 不处理表格位置变更的情况，只初始化的时候计算位置
 */
const tableRef = useTemplateRef<HTMLDivElement>("tableRef");
watchPostEffect(() => {
  if (tableRef.value) {
    const { left, top } = tableRef.value.getBoundingClientRect();
    excelBuilder.value.excelTableRect = {
      left,
      top,
    };
  }
});

const resizeWidthParams = ref({
  left: 0,
  startLeft: 0,
  // index start 1
  resizeIndex: 0,
  visible: false,
});
const startResizeColumnWidth = (index: number, event: MouseEvent) => {
  if (event.button !== 0) {
    return;
  }
  event.preventDefault();
  const target = event.target as HTMLElement;
  const clientX = event.clientX;
  const { left } = target.getBoundingClientRect();
  const startLeft = left - excelBuilder.value.excelTableRect.left;
  resizeWidthParams.value = {
    left: startLeft,
    startLeft,
    resizeIndex: index,
    visible: true,
  };

  const resizeColumnMove = (event: MouseEvent) => {
    const subLeft = event.clientX - clientX;
    resizeWidthParams.value.left = startLeft + subLeft;
  };
  document.addEventListener("mousemove", resizeColumnMove);
  const cleanup = () => {
    // 开始更新列宽
    const moveWidth = resizeWidthParams.value.left - resizeWidthParams.value.startLeft;
    excelBuilder.value.updateColumnWidth(index, moveWidth);
    document.removeEventListener("mousemove", resizeColumnMove);
    document.removeEventListener("mouseup", cleanup);
    resizeWidthParams.value.visible = false;
  };
  document.addEventListener("mouseup", cleanup);
};
</script>

<template>
  <div ref="tableRef" class="excel-table">
    <div class="excel-table__header">
      <table>
        <colgroup>
          <col class="row-index__col" />
          <col v-for="(name, index) in xGridNames" :key="name" :style="getRowStyle(index + 1)" />
        </colgroup>
        <thead>
          <tr>
            <th class="row-index__th">
              <div class="row-index__header"></div>
            </th>
            <th v-for="(name, index) in xGridNames" :key="name">
              {{ name }}
              <div class="row-header-resize-line" @mousedown.stop="startResizeColumnWidth(index + 1, $event)"></div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="excel-table__body">
      <table>
        <colgroup>
          <!-- 索引列 -->
          <col class="row-index__col" />
          <col v-for="x in xGrid" :key="x" :style="getRowStyle(x)" />
        </colgroup>
        <tbody>
          <tr v-for="y in yGrid" :key="y">
            <td class="row-index__cell">{{ y }}</td>
            <td v-for="x in xGrid" :key="x" class="excel-cell__td" :data-x="x" :data-y="y">
              <ExcelCell :x="x" :y="y" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ExcelLine />
  </div>
  <ExcelColumnResizeWidth v-if="resizeWidthParams.visible" v-bind="resizeWidthParams" />
</template>

<style scoped lang="scss">
@use "../assets/base.scss";

.excel-table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  position: relative;

  &__header,
  &__body {
    width: max-content;

    table {
      width: max-content;
      border-collapse: collapse;

      .row-index__cell,
      .row-index__col {
        min-width: 32px;
        width: auto;
        text-align: center;
        padding: 0 2px;
        font-size: 12px;
      }

      .row-index__th {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: sticky;
        left: 0;
        z-index: var(--table-header-z-index);
        background-color: var(--table-header-bg-color);
        border-right: 1px solid var(--border-color);
        border-bottom: 1px solid var(--border-color);

        .row-index__header {
          width: var(--table-select-all-button-size);
          height: var(--table-select-all-button-size);
          background-color: var(--table-select-all-button-color);
          clip-path: polygon(0% 100%, 100% 100%, 0% 0%);
          transform: rotate(-90deg);
        }
      }

      .row-index__cell {
        background-color: var(--table-index-bg-color);
        position: sticky;
        left: 0;
        z-index: var(--cell-mask-z-index);
      }
    }
  }

  &__header {
    background-color: var(--table-header-bg-color);
    height: var(--table-cell-height);
    position: sticky;
    top: 0;
    z-index: var(--table-header-z-index);
    /* 新增：使用 box-shadow 模拟一个不影响布局的底部边框 */
    box-shadow: 0 1px 0 0 var(--border-color);

    tr {
      border-top: 1px solid var(--border-color);
      border-left: 1px solid var(--border-color);
    }

    th {
      height: var(--table-cell-height);
      padding: 0;
      text-align: center;
      font-weight: 200;
      background-color: var(--header-bg-color);
      font-size: 14px;
      color: var(--table-header-text-color);
      position: relative;

      &:last-child {
        border-right: none;
      }

      .row-header-resize-line {
        @extend .base-resize__line;
      }
    }
  }

  &__body {
    flex: 1;

    table {
      tbody {
        tr:nth-child(odd) {
          background-color: var(--odd-row-bg-color);
        }

        tr:hover {
          background-color: var(--hover-bg-color);
        }

        tr:first-child {
          border-top: none;
        }
      }
    }

    td {
      height: var(--table-cell-height);
      padding: 0;
      border: 1px solid var(--border-color);
    }
  }
}
</style>
