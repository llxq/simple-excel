<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { generateRowNameByLength } from "@/core/helper.ts";
import ExcelCell from "./ExcelCell.vue";
import { useProvideExcelBuilder } from "@/hooks/useExcelBuilder";

defineOptions({
  name: "ExcelTable",
});

const { xGrid, yGrid } = defineProps<{
  xGrid: number;
  yGrid: number;
}>();

useProvideExcelBuilder();

const xGridNames = ref<string[]>();

watchEffect(() => {
  xGridNames.value = generateRowNameByLength(xGrid);
});
</script>

<template>
  <div class="excel-table">
    <div class="excel-table__header">
      <table>
        <colgroup>
          <col class="row-index__col" />
          <col v-for="name in xGridNames" :key="name" />
        </colgroup>
        <thead>
          <tr>
            <th class="row-index__th">
              <div class="row-index__header"></div>
            </th>
            <th v-for="name in xGridNames" :key="name">
              {{ name }}
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
          <col v-for="name in xGridNames" :key="name" />
        </colgroup>
        <tbody>
          <tr v-for="y in yGrid" :key="y">
            <td class="row-index__cell">{{ y }}</td>
            <td v-for="x in xGrid" :key="x">
              <ExcelCell :x="x" :y="y" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.var-definition {
  --border-color: #e6e6e6;
  --active-border-color: blue;
  --table-header-text-color: #333;
  --table-body-text-color: #000;
  --table-header-bg-color: #eee;
  --table-index-bg-color: #eee;
  --table-select-all-button-color: #757575;
  --table-select-all-button-size: 7px;
  --table-cell-height: 24px;
}

.excel-table {
  @extend .var-definition;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;

  &__header,
  &__body {
    width: max-content;

    table {
      width: max-content;
      border-collapse: collapse;

      col {
        width: 80px;
      }

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
      }
    }
  }

  &__header {
    background-color: var(--table-header-bg-color);
    height: var(--table-cell-height);
    position: sticky;
    top: 0;
    z-index: 1;
    /* 新增：使用 box-shadow 模拟一个不影响布局的底部边框 */
    box-shadow: 0 1px 0 0 var(--border-color);

    th {
      height: var(--table-cell-height);
      padding: 0;
      text-align: center;
      font-weight: 200;
      border-right: 1px solid var(--border-color);
      background-color: var(--header-bg-color);
      font-size: 14px;
      color: var(--table-header-text-color);

      &:last-child {
        border-right: none;
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

      &:first-child {
        border-left: none;
      }
    }
  }
}
</style>
