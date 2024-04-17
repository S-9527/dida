<template>
  <div class="flex items-center justify-start">
    <button class="mx-2 !outline-none" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon"></div>
    </button>
    <button class="mx-2 !outline-none" @click="goToGithub()">
      <div class="i-carbon:logo-github"></div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { toggleDark } from '@/composable/useTheme.ts';

const goToGithub = () => {
  window.open("https://github.com/S-9527/dida")
}
</script>

<style scoped></style>