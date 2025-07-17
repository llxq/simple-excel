<script setup lang="ts">
import ExcelTable from "@/component/ExcelTable.vue";

defineOptions({
  name: "SimpleExcel",
});
</script>

<template>
  <div class="simple-excel__container">
    <ExcelTable :x-grid="50" :y-grid="50" />
  </div>
</template>

<style scoped lang="scss">
.simple-excel__container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  * {
    box-sizing: border-box;
  }
}
</style>
