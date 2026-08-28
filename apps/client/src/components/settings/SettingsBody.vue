<script setup lang="ts">
import SettingsSidebar from './SettingsSidebar.vue'
</script>

<template>
  <div class="min-h-400px flex items-center justify-between overflow-hidden rounded-5px">
    <div class="min-h-400px w-1/5 bg-white dark:bg-#1f1f1f">
      <SettingsSidebar />
    </div>
    <div class="min-h-400px w-4/5 bg-white dark:bg-#2e2e2e">
      <router-view />
    </div>
  </div>
</template>
