<template>
  <div
      contenteditable="true"
      @click="handleClickTask(task)"
      @click.right="handleRightClickTask($event, task)"
      @input="handleInput"
  >
    <span>
      {{ task.title }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { Task, useTaskStore } from "@/store/task.ts";
import {useTaskRightContextMenu} from "@/composable/taskRightConextMenu.ts";

const { changeActiveTask, setCurrentActiveTaskTitle } = useTaskStore()
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

function handleInput (e:Event) {
  setCurrentActiveTaskTitle((e.target as HTMLElement).innerText)
}
</script>

<style scoped></style>