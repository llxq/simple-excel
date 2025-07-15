<script setup lang="ts">
defineOptions({
  name: 'App',
})
</script>

<template>
  <div class="app__container">
    <SimpleExcel />
  </div>
</template>

<style lang="scss">
body, html {
  margin: 0;
  padding: 0;
}

.app__container {
  width: 100vw;
  height: 100vh;
}
</style>
