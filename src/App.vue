<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<style>
/* Reset dasar agar tampilan di HP full screen */
body, html {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
}
</style>
