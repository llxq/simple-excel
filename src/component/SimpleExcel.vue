<script setup lang="ts">
import ExcelTable from "@/component/ExcelTable.vue";

defineOptions({
  name: "SimpleExcel",
});
</script>

<template>
  <div class="simple-excel__container">
    <ExcelTable :x-grid="40" :y-grid="40" />
  </div>
</template>

<style scoped lang="scss">
@use "../assets/var.scss";

.simple-excel__container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  @extend .var-definition;

  * {
    box-sizing: border-box;
  }
}
</style>
