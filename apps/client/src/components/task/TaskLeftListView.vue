<script setup lang="ts">
import TaskLeftListProject from './TaskLeftListProject.vue'
import TaskLeftListSmartProject from './TaskLeftListSmartProject.vue'
</script>

<template>
  <div class="h-full flex flex-col overflow-hidden">
    <div class="flex-1 overflow-y-auto py-14px">
      <TaskLeftListProject />
    </div>
    <div class="border-t border-line py-14px">
      <TaskLeftListSmartProject />
    </div>
  </div>
</template>
