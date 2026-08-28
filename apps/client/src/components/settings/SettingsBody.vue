<script setup lang="ts">
import SettingsSidebar from './SettingsSidebar.vue'
</script>

<template>
  <div
    class="min-h-420px flex overflow-hidden border border-line rounded-xl bg-panel"
  >
    <div class="w-200px flex-shrink-0 border-r border-line p-8px">
      <SettingsSidebar />
    </div>
    <div class="min-w-0 flex-1 p-20px">
      <router-view />
    </div>
  </div>
</template>
