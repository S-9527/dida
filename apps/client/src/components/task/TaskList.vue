<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref, useTemplateRef } from 'vue'
import draggable from 'vuedraggable'
import {
  TasksSelectorType,
  useTaskLeftMenuStore,
  useTasksSelectorStore,
  useTasksStore,
} from '@/store'
import TaskItem from './TaskItem.vue'

const tasksStore = useTasksStore()
const tasksSelectorStore = useTasksSelectorStore()
const taskLeftMenuStore = useTaskLeftMenuStore()

const inputRef = useTemplateRef<HTMLInputElement>('inputRef')

function onFocus() {
  inputRef.value?.focus()
}

const taskTitle = ref('')
const dragging = ref(false)

const placeholderText = computed(() => {
  return `添加任务至“${tasksSelectorStore.currentSelector?.name}”，回车即可保存`
})

function addTask() {
  if (!taskTitle.value)
    return

  tasksStore.addTask(taskTitle.value)
  taskTitle.value = ''
}

function handleInputChange(e: Event) {
  taskTitle.value = (e.target as HTMLInputElement).value
}

const shouldShowTodoAdd = computed(() => {
  return (
    tasksSelectorStore.currentSelector?.type === TasksSelectorType.listProject
  )
})

const shouldEnabledDrag = computed(() => {
  return (
    tasksSelectorStore.currentSelector?.type === TasksSelectorType.listProject
  )
})

function handleEndDrag(e: any) {
  dragging.value = false

  const currentTask = tasksStore.tasks[e.newIndex]
  const currentIndex = tasksStore.tasks.length - 1 - e.newIndex
  tasksStore.updateTaskPosition(currentTask!, currentIndex)

  if (e.newIndex > e.oldIndex) {
    for (let i = e.oldIndex; i < e.newIndex; i++) {
      const exchangedIndex = tasksStore.tasks.length - 1 - i
      tasksStore.updateTaskPosition(tasksStore.tasks[i], exchangedIndex)
    }
  }
  else {
    for (let i = e.newIndex + 1; i < e.oldIndex + 1; i++) {
      const exchangedIndex = tasksStore.tasks.length - 1 - i
      tasksStore.updateTaskPosition(tasksStore.tasks[i], exchangedIndex)
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-20px">
    <div class="flex items-center gap-10px">
      <button
        class="icon-btn flex-shrink-0"
        aria-label="切换侧边栏"
        @click="taskLeftMenuStore.toggleTaskLeftMenu"
      >
        <Icon
          :icon="
            taskLeftMenuStore.taskLeftMenuVisible
              ? 'tabler:layout-sidebar-left-collapse'
              : 'tabler:layout-sidebar-right-collapse'
          "
          width="18"
        />
      </button>
      <h1 class="min-w-0 flex-1 truncate text-24px font-semibold tracking-tight">
        {{ tasksSelectorStore.currentSelector?.name }}
      </h1>
      <span class="flex-shrink-0 text-12px text-ink-3">
        {{ tasksStore.tasks.length }}
      </span>
    </div>

    <div
      v-show="shouldShowTodoAdd"
      class="cursor-text"
      @click="onFocus"
    >
      <div class="field flex items-center gap-8px px-12px">
        <Icon
          icon="ic:baseline-plus"
          width="18"
          class="flex-shrink-0 text-ink-3"
        />
        <input
          ref="inputRef"
          :value="taskTitle"
          type="text"
          :placeholder="placeholderText"
          class="h-full min-w-0 flex-1 bg-transparent text-14px text-ink outline-none placeholder:text-ink-3"
          @input="handleInputChange"
          @keypress.enter="addTask"
        >
      </div>
    </div>

    <draggable
      :list="tasksStore.tasks"
      ghost-class="drag-ghost"
      drag-class="drag-ghost"
      item-key="id"
      :animation="200"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
        name: !dragging ? 'list' : null,
      }"
      class="flex flex-col gap-6px"
      :disabled="!shouldEnabledDrag"
      @start="dragging = true"
      @end="handleEndDrag"
    >
      <template #item="{ element, index }">
        <TaskItem
          :task="element"
          :index="index"
          :is-show-drag-icon="shouldEnabledDrag"
        />
      </template>
    </draggable>

    <div
      v-if="!tasksStore.tasks.length && shouldShowTodoAdd"
      class="flex flex-col items-center justify-center gap-8px py-48px text-13px text-ink-3"
    >
      <div class="i-carbon-folder text-36px opacity-60" />
      <span>这个清单是空的，从上面开始添加吧</span>
    </div>

    <!-- 暂时性修复 contenteditable 的 bug #9 -->
    <div class="h-1px w-full" contenteditable="false" />
  </div>
</template>

<style scoped>
.list-enter-active {
  transition: all 0.4s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(16px);
}

.drag-ghost {
  opacity: 0.5;
  background: var(--accent-soft);
}
</style>
