<template>
  <div @click.right="handleRightClickTask($event, task)">
    <div class="flex">
      <template v-if="task.state === TaskState.REMOVED">
        <div class="flex">
          <div>
            <n-popover trigger="hover">
              <template #trigger>
                <div class="w-4 h-4 bg-blue-400"></div>
              </template>
              <span>在垃圾桶里面的 Task 是不可以直接被恢复的哦</span>
            </n-popover>
          </div>
          <div class="w-full" @click="handleClickTask(task)">
            {{ task.title }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="w-4 h-4 bg-blue-400" @click="handleCompleteTodo"></div>
        <div
            class="w-full"
            contenteditable="true"
            @input="handleInput"
            @click="handleClickTask(task)"
            @focus="handleClickTask(task)"
        >
          {{ task.title }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Task, TaskState, useTaskStore } from "@/store/task.ts";
import {useTaskRightContextMenu} from "@/composable/taskRightConextMenu.ts";
import { NPopover } from "naive-ui";

const { changeActiveTask, setCurrentActiveTaskTitle, completeTask, restoreTask } = useTaskStore()
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
  switch (props.task.state) {
    case TaskState.ACTIVE:
      completeTask(props.task)
      break;
    case TaskState.COMPLETED:
      restoreTask(props.task)
      break;
    case TaskState.REMOVED:
      console.log("在垃圾桶里面的 task 不可以直接恢复")
      break;
  }
}
</script>

<style scoped></style>