<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { generateRowNameByLength } from "../core/helper.ts";
import ExcelCell from "./ExcelCell.vue";

defineOptions({
  name: "ExcelTable",
});

const { xGrid, yGrid } = defineProps<{
  xGrid: number;
  yGrid: number;
}>();

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
          <col v-for="name in xGridNames" :key="name" />
        </colgroup>
        <thead>
          <tr>
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
          <col v-for="name in xGridNames" :key="name" />
        </colgroup>
        <tbody>
          <tr v-for="y in yGrid" :key="y">
            <td v-for="x in xGridNames" :key="x">
              <ExcelCell />
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
  --table-header-text-color: #333;
  --table-body-text-color: #000;
  --table-header-bg-color: #eee;
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
    }
  }

  &__header {
    background-color: var(--table-header-bg-color);
    height: 24px;
    position: sticky;
    top: 0;
    z-index: 1;
    /* 新增：使用 box-shadow 模拟一个不影响布局的底部边框 */
    box-shadow: 0 1px 0 0 var(--border-color);

    th {
      height: 24px;
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
      height: 24px;
      padding: 0;
      border: 1px solid var(--border-color);

      &:first-child {
        border-left: none;
      }
    }
  }
}
</style>
