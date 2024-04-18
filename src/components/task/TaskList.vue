<template>
  <div class="flex flex-col gap-20px px-4 text-16px">
    <div>
      <h1 class="text-4xl">{{ taskStore.currentActiveProject?.name }}</h1>
    </div>
    <div
        v-show="shouldShowTodoAdd"
        class="relative cursor-pointer"
        @click="onFocus"
    >
      <input
          ref="inputRef"
          type="text"
          v-model="taskTitle"
          v-show="shouldShowTodoAdd"
          @keydown.enter="addTask"
          class="w-full min-w-300px h-38px rounded-6px p-4px mx-12px outline-none
          border-1 b-transparent bg-gray-100 dark:bg-#3B3B3B"/>
      <div
          v-show="isPlaceholder"
          class="w-full min-w-300px absolute top-0 flex items-center
          h-38px p-4px mx-12px border-1 b-transparent select-none color-gray:50"
      >
        <Icon
            icon="ic:baseline-plus"
            width="20"
            class="color-gray:50 pr-4px box-content"
        />
        {{ placeholderText }}
      </div>
    </div>
    <draggable
        :list="taskStore.currentActiveProject?.tasks ?? []"
        :ghost-class="isDark ? 'dark-ghost' : 'ghost'"
        :drag-class="isDark ? 'dark-drag' : 'drag'"
        item-key="id"
        :animation="200"
        :component-data="{
        tag: 'div',
        type: 'transition-group',
        name: !dragging ? 'flip-list' : null,
      }"
        class="flex flex-col gap-10px"
        @start="dragging = true"
        @end="dragging = false"
    >
      <template #item="{ element, index }">
        <TaskItem :task="element" :index="index" class="item" />
      </template>
    </draggable>
    <!-- 暂时性修复 contenteditable 的 bug -->
    <div class="w-full h-1px" contenteditable="false" />
  </div>
</template>

<script setup lang="ts">
import TaskItem from "./TaskItem.vue";
import { computed, ref } from "vue";
import { Icon } from '@iconify/vue'
import { SmartProjectNames, useTaskStore } from "@/store";
import draggable from 'vuedraggable'
import { isDark } from '@/composable/useTheme.ts'
import { useTaskListInput } from "@/composable/useTaskListInput.ts";

const taskStore = useTaskStore()
const taskTitle = ref("")
const dragging = ref<boolean>(false)

const placeholderText = computed(() => {
  return `添加任务至"${taskStore.currentActiveProject?.name}"，回车即可保存`;
});

const isPlaceholder = computed(() => {
  return taskTitle.value.length === 0;
});

const { inputRef, onFocus } = useTaskListInput()

const addTask = () => {
  taskStore.addTask(taskTitle.value)
  taskTitle.value = ""
}

const shouldShowTodoAdd = computed(() => {
  const name = taskStore.currentActiveProject?.name
  return (
      name !== (SmartProjectNames.Complete as string) &&
      name !== SmartProjectNames.Trash &&
      name !== SmartProjectNames.Failed &&
      name !== SmartProjectNames.Abstract
  )
})
</script>

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