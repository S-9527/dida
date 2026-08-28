<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref, useTemplateRef } from 'vue'
import draggable from 'vuedraggable'
import { useTaskLeftMenu } from '@/composables'
import {
  TasksSelectorType,
  useTasksSelectorStore,
  useTasksStore,
  useThemeStore,
} from '@/store'
import TaskItem from './TaskItem.vue'

const tasksStore = useTasksStore()
const tasksSelectorStore = useTasksSelectorStore()
const themeStore = useThemeStore()
const { toggleTaskLeftMenu, taskLeftMenuVisible } = useTaskLeftMenu()

const inputRef = useTemplateRef<HTMLInputElement>('inputRef')

function onFocus() {
  inputRef.value?.focus()
}

const taskTitle = ref('')
const dragging = ref(false)

const placeholderText = computed(() => {
  return `添加任务至“${tasksSelectorStore.currentSelector?.name}”，回车即可保存`
})
const isPlaceholder = computed(() => {
  return taskTitle.value.length === 0
})

function addTask() {
  if (!taskTitle.value)
    return
  else tasksStore.addTask(taskTitle.value)

  taskTitle.value = ''
}

function handleInputChange(event: any) {
  taskTitle.value = event.target.value
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
  <div class="flex flex-col gap-20px px-4 text-16px">
    <div flex items-center>
      <Icon
        :icon="
          taskLeftMenuVisible
            ? 'tabler:layout-sidebar-left-collapse'
            : 'tabler:layout-sidebar-right-collapse'
        "
        width="30"
        @click="toggleTaskLeftMenu"
      />
      <h1 class="ml-5px text-4xl">
        {{ tasksSelectorStore.currentSelector?.name }}
      </h1>
    </div>
    <div
      v-show="shouldShowTodoAdd"
      class="relative cursor-text"
      @click="onFocus"
    >
      <input
        ref="inputRef"
        :value="taskTitle"
        type="text"
        class="h-38px min-w-300px w-100% border-1 b-transparent rounded-6px bg-gray-100 p-4px pl-12px pr-12px outline-none dark:bg-#3B3B3B"
        @input="handleInputChange"
        @keypress.enter="addTask"
      >
      <div
        v-show="isPlaceholder"
        class="absolute top-0 h-38px min-w-300px w-100% flex select-none items-center border-1 b-transparent p-4px pl-12px pr-12px color-gray:50"
      >
        <Icon
          icon="ic:baseline-plus"
          width="20"
          class="box-content pr-4px color-gray:50"
        />
        {{ placeholderText }}
      </div>
    </div>
    <draggable
      :list="tasksStore.tasks"
      :ghost-class="themeStore.isDark ? 'dark-ghost' : 'ghost'"
      :drag-class="themeStore.isDark ? 'dark-drag' : 'drag'"
      item-key="id"
      :animation="200"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
        name: !dragging ? 'flip-list' : null,
      }"
      class="flex flex-col gap-10px"
      :disabled="!shouldEnabledDrag"
      @start="dragging = true"
      @end="handleEndDrag"
    >
      <template #item="{ element, index }">
        <TaskItem
          :task="element"
          :index="index"
          :is-show-drag-icon="shouldEnabledDrag"
          class="item"
        />
      </template>
    </draggable>
    <!-- 暂时性修复 contenteditable 的 bug #9 -->
    <div class="h-1px w-full" contenteditable="false" />
  </div>
</template>

<style scoped>
.list-enter-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.dark-ghost {
  opacity: 0.4;
  background: #2f2f2f;
}

.drag {
  opacity: 0.5;
  background: #c8ebfb;
}

.dark-drag {
  opacity: 0.4;
  background: #2f2f2f;
}
</style>
