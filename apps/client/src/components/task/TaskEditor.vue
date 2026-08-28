<script setup lang="ts">
import InkMde from 'ink-mde/vue'
import { debounce } from 'lodash-es'
import { computed } from 'vue'
import {
  useListProjectsStore,
  useTasksStore,
  useThemeStore,
} from '@/store'

const tasksStore = useTasksStore()
const projectsStore = useListProjectsStore()
const themeStore = useThemeStore()

const currentProject = computed(() => {
  const task = tasksStore.currentActiveTask

  return task ? projectsStore.findProject(task.projectId) : undefined
})

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
  <div class="h-full flex flex-col overflow-y-auto px-28px py-24px">
    <template v-if="tasksStore.currentActiveTask">
      <div class="mb-12px flex items-center justify-between">
        <span class="section-label">任务详情</span>
        <span v-if="currentProject" class="text-12px text-ink-3">
          {{ currentProject.name }}
        </span>
      </div>

      <h1
        contenteditable="true"
        class="text-26px font-semibold leading-snug tracking-tight"
        @input="debounceHandleInput"
      >
        {{ tasksStore.currentActiveTask.title }}
      </h1>

      <div class="mt-20px flex-1">
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
    </template>

    <div
      v-else
      class="h-full flex flex-col items-center justify-center gap-16px text-ink-3"
    >
      <img
        src="@/assets/empty-task-detail-icon.svg"
        alt="空任务详情"
        class="h-150px w-150px opacity-70"
      >
      <span class="text-13px">点击左侧任务标题查看详情</span>
    </div>
  </div>
</template>
