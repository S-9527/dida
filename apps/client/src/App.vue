<template>
  <NConfigProvider :theme="naiveTheme">
    <BaseLayout v-if="route.meta.layout !== false">
      <router-view></router-view>
    </BaseLayout>
    <router-view v-else></router-view>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import BaseLayout from "@/layout/BaseLayout.vue";
import { useThemeStore } from '@/store'
import { useCommand } from "@/composables/command";
import { useRoute } from "vue-router";

const route = useRoute()
const { naiveTheme } = useThemeStore()
const { initCommands } = useCommand()

initCommands()
</script>

<style scoped></style>
