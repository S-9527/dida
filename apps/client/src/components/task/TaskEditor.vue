<template>
  <div>
    <div v-if="currentActiveTask">
      <h1 contenteditable="true" class="text-3xl" @input="debounceHandleInput">
        {{ currentActiveTask.title }}
      </h1>
      <div class="mt-2">
        <InkMde v-model="currentActiveTask.content" :options="{
          interface: {
            appearance: isDark ? 'dark' : 'light'
          },
          hooks: {
            afterUpdate: debounceHandleAfterUpdate,
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
import { useThemeStore, useTasksStore } from "@/store";
import { storeToRefs } from "pinia";
import InkMde from 'ink-mde/vue'
import { debounce } from 'lodash-es'

const { currentActiveTask } = storeToRefs(useTasksStore());
const { isDark } = storeToRefs(useThemeStore());
const { updateTaskTitle, updateTaskContent } = useTasksStore();

function handleInput (e:Event) {
  if (currentActiveTask) {
    updateTaskTitle(currentActiveTask.value!, (e.target as HTMLElement).innerText)
  }
}

function handleAfterUpdate(doc: string) {
  if (currentActiveTask)
    updateTaskContent(currentActiveTask.value!, doc)
}

const waitTime = 700
const debounceHandleInput = debounce(handleInput, waitTime)
const debounceHandleAfterUpdate = debounce(handleAfterUpdate, waitTime)
</script>

<style scoped></style>
