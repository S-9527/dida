<template>
  <div @click="handleClick">
    {{ task.title }}
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/store/task.ts'
import { useTaskStore } from "@/store/task.ts";

const { changeActiveTask } = useTaskStore()

interface Props {
  task: Task
}

const props = defineProps<Props>()

function handleClick() {
  changeActiveTask(props.task)
}
</script>

<style scoped></style>