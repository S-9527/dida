<script setup lang="ts">
import SettingsBody from '@/components/settings/SettingsBody.vue'
import SettingsHeader from '@/components/settings/SettingsHeader.vue'
</script>

<template>
  <div class="h-[calc(100vh-40px)] base-color">
    <div class="mx-auto my-0 w-1000px">
      <SettingsHeader />
      <SettingsBody class="mt-20px" />
    </div>
  </div>
</template>

<style scoped></style>
