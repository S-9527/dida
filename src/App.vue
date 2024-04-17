<template>
  <NConfigProvider :theme="naiveTheme">
    <router-view></router-view>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import { naiveTheme } from "@/composable/useTheme.ts";
</script>

<style scoped></style>
