<script setup lang="ts">
import SettingsBody from '@/components/settings/SettingsBody.vue'
import SettingsHeader from '@/components/settings/SettingsHeader.vue'
</script>

<template>
  <div class="h-full flex flex-col bg-app">
    <div
      class="mx-auto max-w-1000px w-full flex flex-1 flex-col overflow-y-auto px-20px py-20px"
    >
      <SettingsHeader />
      <SettingsBody class="mt-20px" />
    </div>
  </div>
</template>
