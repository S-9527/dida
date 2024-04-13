<template>
  <div @click="handleClickTask(task)" @click.right="handleRightClickTask($event, task)">
    {{ task.title }}
  </div>
</template>

<script setup lang="ts">
import { Task, useTaskStore } from "@/store/task.ts";
import {useTaskRightContextMenu} from "@/composable/taskRightConextMenu.ts";

const { changeActiveTask } = useTaskStore()
const { showContextMenu } = useTaskRightContextMenu()

interface Props {
  task: Task
}

defineProps<Props>();

function handleRightClickTask(e: MouseEvent, task: Task) {
  changeActiveTask(task)
  showContextMenu(e)
}
function handleClickTask(task: Task) {
  changeActiveTask(task)
}
</script>

<style scoped></style>