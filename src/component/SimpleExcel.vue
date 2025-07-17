<script setup lang="ts">
import ExcelTable from "./ExcelTable.vue";

defineOptions({
  name: "SimpleExcel",
});
</script>

<template>
  <div class="simple-excel__container">
    <ExcelTable :x-grid="100" :y-grid="100" />
  </div>
</template>

<style scoped lang="scss">
.simple-excel__container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
