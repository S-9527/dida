<template>
  <div>
    <div>
      <h1 class="text-4xl">{{ taskStore.currentActiveProject?.name }}</h1>
    </div>
    <div>
      <input
          type="text"
          placeholder="添加任务，回车即可创建"
          @keydown.enter="addTask"
          v-model="taskTitle"
      />
    </div>
    <div>
      <ul v-for="task in taskStore.currentActiveProject?.taskList">
        <TaskItem :task="task"></TaskItem>
      </ul>
    </div>
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