<template>
  <div class="flex flex-col gap-20px px-4 text-16px">
    <div>
      <h1 class="text-4xl">{{ taskStore.currentActiveProject?.name }}</h1>
    </div>
    <div
        class="relative cursor-pointer"
        @click="onFocus"
        v-show="shouldShowTodoAdd()"
    >
      <input
          ref="inputRef"
          type="text"
          @keydown.enter="addTask"
          v-model="taskTitle"
          v-show="shouldShowTodoAdd()"
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
    <TransitionGroup name="list" tag="ul" class="flex flex-col gap-10px">
      <ul v-for="task in taskStore.currentActiveProject?.tasks" :key="task.id">
        <TaskItem :task="task"></TaskItem>
      </ul>
    </TransitionGroup>
    <!-- 暂时性修复 contenteditable 的 bug -->
    <div class="w-full h-1px" contenteditable="false" />
  </div>
</template>

<script setup lang="ts">
import TaskItem from "./TaskItem.vue";
import { computed, Ref, ref } from "vue";
import { Icon } from '@iconify/vue'
import { SpecialProjectNames, useTaskStore } from "@/store/task";
import { useEventListener } from "@vueuse/core";

const taskStore = useTaskStore()
const taskTitle = ref("")

const placeholderText = computed(() => {
  return `添加任务至"${taskStore.currentActiveProject?.name}"，回车即可保存`;
});

const isPlaceholder = computed(() => {
  return taskTitle.value.length === 0;
});

const addTask = () => {
  taskStore.addTask(taskTitle.value)
  taskTitle.value = ""
}

function shouldShowTodoAdd() {
  const name = taskStore.currentActiveProject?.name
  return (
      name !== (SpecialProjectNames.Complete as string) &&
      name !== SpecialProjectNames.Trash &&
      name !== SpecialProjectNames.Failed &&
      name !== SpecialProjectNames.Abstract
  )
}

function useInput(){
  const inputRef: Ref<HTMLInputElement | null> = ref(null);
  useEventListener(
      () => inputRef.value,
      "focus",
      () => {
        const classList = inputRef.value!.classList;

        classList.add("border-blue");
        classList.add("dark:color-black");
        classList.remove("bg-gray-100");
        classList.remove("dark:bg-#3B3B3B");
      }
  );

  useEventListener(
      () => inputRef.value,
      "blur",
      () => {
        const classList = inputRef.value!.classList;

        classList.add("bg-gray-100");
        classList.add("dark:bg-#3B3B3B");

        classList.remove("border-blue");
        classList.remove("dark:color-black");
      }
  );

  function onFocus() {
    inputRef.value!.focus();
  }

  return {
    inputRef,
    onFocus,
  }
}

const { inputRef, onFocus } = useInput()
</script>

<style scoped>
.list-enter-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
</style>