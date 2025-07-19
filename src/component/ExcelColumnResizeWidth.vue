<script setup lang="ts">
import { computed } from "vue";
import { toPx } from "@/core/utils/helper.ts";

defineOptions({
  name: "ExcelColumnResizeWidth",
});

const { left } = defineProps<{
  left: number;
}>();

const bindLeft = computed(() => {
  return toPx(left);
});
</script>

<template>
  <div class="row-header-resize-line"></div>
</template>

<style scoped lang="scss">
@use "../assets/base.scss";

.row-header-resize-line {
  --border-color: var(--resize-width-line-color);
  ----area-line-resize-z-index: var(--max-z-index);
  @extend .base-resize__line;
  height: 100%;
  top: 0;
  left: v-bind(bindLeft);
}
</style>
