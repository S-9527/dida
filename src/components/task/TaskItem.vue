<template>
  <div
      contenteditable="true"
      @click="handleClickTask(task)"
      @click.right="handleRightClickTask($event, task)"
      @input="handleInput"
  >
    <div class="flex">
      <div class="w-4 h-4 bg-blue-400" @click="handleCompleteTodo"></div>
      <div class="w-full" contenteditable="true" @input="handleInput">
        {{ task.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Task, useTaskStore } from "@/store/task.ts";
import {useTaskRightContextMenu} from "@/composable/taskRightConextMenu.ts";

const { changeActiveTask, setCurrentActiveTaskTitle, completeTask } = useTaskStore()
const { showContextMenu } = useTaskRightContextMenu()

interface Props {
  task: Task
}

const props = defineProps<Props>();

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

function handleCompleteTodo () {
  completeTask(props.task)
}
</script>

<style scoped></style>