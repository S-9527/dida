<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { useRoute } from 'vue-router'
import { useCommandsStore, useThemeStore } from '@/store'
import BaseLayout from './layout/BaseLayout.vue'

const route = useRoute()
const themeStore = useThemeStore()
const commandsStore = useCommandsStore()

commandsStore.initCommands()
</script>

<template>
  <NConfigProvider abstract :theme="themeStore.naiveTheme">
    <BaseLayout v-if="route.meta.layout !== false">
      <RouterView />
    </BaseLayout>
    <RouterView v-else />
  </NConfigProvider>
</template>

<style scoped></style>
