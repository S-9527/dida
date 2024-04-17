<template>
  <div>
    <div>
      <TaskLeftListNTree />
    </div>
    <div class="mt-2px">
      <TaskLeftListProject />
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskLeftListNTree from "@/components/task/TaskLeftListNTree.vue";
import TaskLeftListProject from "@/components/task/TaskLeftListProject.vue";
</script>

<style scoped></style>