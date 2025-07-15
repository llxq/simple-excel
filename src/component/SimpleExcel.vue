<script setup lang="ts">
defineOptions({
  name: "SimpleExcel",
});

const { xGrid, yGrid } = defineProps<{
  xGrid?: number;
  yGrid?: number;
}>();
</script>

<template>
  <div class="simple-excel__container" xxx="1">{{ xGrid }} x {{ yGrid }}</div>
</template>

<style scoped lang="scss">
.simple-excel__container {
  width: 100%;
  height: 100%;
}
</style>
