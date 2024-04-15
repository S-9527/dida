<template>
  <div class="flex flex-col gap-20px px-4 text-16px">
    <div>
      <h1 class="text-4xl">{{ taskStore.currentActiveProject?.name }}</h1>
    </div>
    <div>
      <input
          type="text"
          placeholder="添加任务，回车即可创建"
          @keydown.enter="addTask"
          v-model="taskTitle"
          class="w-300px h-30px rounded-6px p-4px pl-12px outline-none
          border-none box-content bg-gray-200 dark:bg-#3B3B3B"/>
    </div>
    <div class="flex flex-col gap-10px">
      <ul v-for="task in taskStore.currentActiveProject?.taskList">
        <TaskItem :task="task"></TaskItem>
      </ul>
    </div>
    <!-- 暂时性修复 contenteditable 的 bug -->
    <div class="w-full h-1px" contenteditable="false" />
  </div>
</template>

<script setup lang="ts">
import TaskItem from "./TaskItem.vue";
import { ref } from "vue";
import { useTaskStore } from "@/store/task";

const taskStore = useTaskStore()
const taskTitle = ref("")

const addTask = () => {
  taskStore.addTask(taskTitle.value)
  taskTitle.value = ""
}

</script>

<style scoped></style>