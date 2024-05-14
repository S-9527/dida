<template>
  <div class="flex flex-col gap-20px px-4 text-16px">
    <div class="flex items-center">
      <Icon :icon="taskLeftMenuVisible ? 'tabler:layout-sidebar-left-collapse' : 'tabler:layout-sidebar-right-collapse'"
             width="30" @click="toggleTaskLeftMenu" />
      <h1 class="text-4xl">{{ tasksSelectorStore.currentSelector?.name }}</h1>
    </div>
    <div
        v-show="shouldShowTodoAdd"
        class="relative cursor-pointer"
        @click="onFocus"
    >
      <input
          ref="inputRef"
          type="text"
          :value="taskTitle"
          v-show="shouldShowTodoAdd"
          @input="handleInputChange"
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
        :list="taskStore.tasks"
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
    <!-- 暂时性修复 contenteditable 的 bug -->
    <div class="w-full h-1px" contenteditable="false" />
  </div>
</template>

<script setup lang="ts">
import TaskItem from "./TaskItem.vue";
import { computed, Ref, ref } from "vue";
import { Icon } from '@iconify/vue'
import { TasksSelectorType, useTasksStore, useThemeStore } from "@/store";
import draggable from 'vuedraggable'
import { storeToRefs } from "pinia";
import { useTasksSelectorStore } from "@/store/taskSelector.ts";
import { useTaskLeftMenu } from "@/composables/taskLeftMenu.ts";

const taskStore = useTasksStore()
const tasksSelectorStore = useTasksSelectorStore()

const { toggleTaskLeftMenu, taskLeftMenuVisible } = useTaskLeftMenu()
const { isDark } = storeToRefs(useThemeStore());

const taskTitle = ref("")
const dragging = ref<boolean>(false)

const placeholderText = computed(() => {
  return `添加任务至"${tasksSelectorStore.currentSelector?.name}"，回车即可保存`;
});

const isPlaceholder = computed(() => {
  return taskTitle.value.length === 0;
});

function useInput() {
  const inputRef: Ref<HTMLInputElement | null> = ref(null)

  function onFocus() {
    inputRef.value!.focus()
  }

  return {
    inputRef,
    onFocus,
  }
}

const { inputRef, onFocus } = useInput()

const addTask = () => {
  if (!taskTitle.value) return
  // if (Reflect.has(taskStore.currentActiveProject, 'color')) {
  //   taskStore.addTaskToTag(taskTitle.value)
  // }
  else {
    taskStore.addTask(taskTitle.value)
  }
  taskTitle.value = ""
}

function handleInputChange(event: any) {
  taskTitle.value = event.target.value
}

const shouldShowTodoAdd = computed(() => {
  return tasksSelectorStore.currentSelector?.type === TasksSelectorType.listProject
})

const shouldEnabledDrag = computed(() =>{
  return tasksSelectorStore.currentSelector?.type === TasksSelectorType.listProject
})

function handleEndDrag(e: any) {
  dragging.value = false

  const currentTask = taskStore.tasks[e.newIndex]
  const currentIndex = taskStore.tasks.length - 1 - e.newIndex
  taskStore.updateTaskPosition(currentTask!, currentIndex)

  if (e.newIndex > e.oldIndex) {
    for (let i = e.oldIndex; i < e.newIndex; i++) {
      const exchangedIndex = taskStore.tasks.length - 1 - i
      taskStore.updateTaskPosition(taskStore.tasks[i], exchangedIndex)
    }
  }
  else {
    for (let i = e.newIndex + 1; i < e.oldIndex + 1; i++) {
      const exchangedIndex = taskStore.tasks.length - 1 - i
      taskStore.updateTaskPosition(taskStore.tasks[i], exchangedIndex)
    }
  }
}
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
