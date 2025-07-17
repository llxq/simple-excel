<script setup lang="ts">
defineOptions({
  name: "ExcelCell",
});
</script>

<template>
  <div class="excel-cell__container"></div>
</template>

<style scoped lang="scss">
.excel-cell__container {
  &__cell-input {
    width: 100%;
    height: 100%;
    padding: 0 4px;
    box-sizing: border-box;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 14px;
    line-height: 24px; // 与单元格行高一致
    text-align: center;
    color: var(--table-body-text-color);

    &::placeholder {
      color: var(--text-disabled-color);
    }
  }
}
</style>
