<template>
  <NConfigProvider :theme="naiveTheme">
    <router-view></router-view>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, darkTheme } from 'naive-ui';
import { computed } from 'vue';
import { isDark } from './composable/useDark.ts';

const naiveTheme = computed(() => isDark.value ? darkTheme : null);
</script>

<style scoped></style>
