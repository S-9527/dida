<template>
  <div>
    <div v-if="currentActiveTask">
      <h1>
        {{ currentActiveTask.title }}
      </h1>
      <div>
        <InkMde v-model="currentActiveTask.content" />
      </div>
    </div>
    <div v-else>
      点击任务标题查看详情
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/store/task.ts";
import { storeToRefs } from "pinia";
import InkMde from 'ink-mde/vue'

const { currentActiveTask } = storeToRefs(useTaskStore());

</script>

<style scoped></style>