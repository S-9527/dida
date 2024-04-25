<template>
  <div>
    <div v-if="currentActiveTask">
      <h1 contenteditable="true" class="text-3xl" @input="handleInput">
        {{ currentActiveTask.title }}
      </h1>
      <div class="mt-2">
        <InkMde v-model="currentActiveTask.content" :options="{
          interface: {
            appearance: isDark ? 'dark' : 'light'
          },
          hooks: {
            afterUpdate: handleAfterUpdate,
          },
        }" />
      </div>
    </div>
    <div v-else class="flex flex-col w-full h-full justify-center items-center">
      <img
          src="@/assets/empty-task-detail-icon.svg"
          alt="Empty Task Detail Icon"
          class="w-192px h-200px"
      >
      <span class="text-[16px] pb-30">点击任务标题查看详情</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore, useThemeStore } from "@/store";
import { storeToRefs } from "pinia";
import {changeTaskContent, changeTaskTitle} from "@/service/task/task.ts";
import InkMde from 'ink-mde/vue'

const { currentActiveTask } = storeToRefs(useTaskStore());
const { isDark } = storeToRefs(useThemeStore());

function handleInput (e:Event) {
  if (currentActiveTask) {
    changeTaskTitle(currentActiveTask.value!, (e.target as HTMLElement).innerText)
  }
}

function handleAfterUpdate(doc: string) {
  if (currentActiveTask)
    changeTaskContent(currentActiveTask.value!, doc)
}

</script>

<style scoped></style>
