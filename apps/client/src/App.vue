<template>
  <NConfigProvider :theme="naiveTheme">
    <BaseLayout>
      <router-view></router-view>
    </BaseLayout>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import BaseLayout from "@/layout/BaseLayout.vue";
import { useThemeStore } from '@/store'

const { naiveTheme } = useThemeStore()
</script>

<style scoped></style>
