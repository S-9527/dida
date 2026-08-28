<script setup lang="ts">
import InkMde from 'ink-mde/vue'
import { debounce } from 'lodash-es'
import { useTasksStore, useThemeStore } from '@/store'

const tasksStore = useTasksStore()
const themeStore = useThemeStore()

function handleInput(e: Event) {
  if (tasksStore.currentActiveTask) {
    tasksStore.updateTaskTitle(
      tasksStore.currentActiveTask,
      (e.target as HTMLElement).textContent ?? '',
    )
  }
}

function handleAfterUpdate(doc: string) {
  if (tasksStore.currentActiveTask)
    tasksStore.updateTaskContent(tasksStore.currentActiveTask, doc)
}

const waitTime = 700
const debounceHandleInput = debounce(handleInput, waitTime)
const debounceHandleAfterUpdate = debounce(handleAfterUpdate, waitTime)
</script>

<template>
  <div>
    <div v-if="tasksStore.currentActiveTask">
      <h1 contenteditable="true" class="text-3xl" @input="debounceHandleInput">
        {{ tasksStore.currentActiveTask.title }}
      </h1>
      <div class="mt-2">
        <InkMde
          v-model="tasksStore.currentActiveTask.content"
          :options="{
            interface: {
              appearance: themeStore.isDark ? 'dark' : 'light',
            },
            hooks: {
              afterUpdate: debounceHandleAfterUpdate,
            },
          }"
        />
      </div>
    </div>
    <div v-else class="h-full w-full flex flex-col items-center justify-center">
      <img
        src="@/assets/empty-task-detail-icon.svg"
        alt="Empty Task Detail Icon"
        class="h-200px w-192px"
      >
      <span class="pb-30 text-[16px]">点击任务标题查看详情</span>
    </div>
  </div>
</template>
