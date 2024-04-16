<template>
  <div @click.right="handleRightClickTask($event, task)">
    <div class="flex justify-start items-center gap-5px">
      <template v-if="task.state === TaskState.REMOVED">
        <div class="flex justify-center items-center gap-5px">
          <NPopover trigger="hover">
            <template #trigger>
              <div
                  class="w-5 h-5 rounded-1 cursor-pointer"
                  :class="[checkboxColors[task.state]]"
                  @click="handleCompleteTodo"
              >
              </div>
            </template>
            <span>在垃圾桶里面的 Task 是不可以直接被恢复的哦</span>
          </NPopover>
          <div class="w-full" @click="handleClickTask(task)">
            {{ task.title }}
          </div>
        </div>
      </template>
      <template v-else>
        <div :class="[checkboxColors[task.state]]"
             class="w-5 h-5 rounded-1 cursor-pointer"
             @click="handleCompleteTodo">
        </div>
        <div
            class="w-full"
            contenteditable="true"
            @input="handleInput"
            @focus="handleClickTask(task)"
        >
          {{ task.title }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Task, TaskState, useTaskStore } from "@/store/task";
import { useTaskRightContextMenu } from "@/composable/taskRightConextMenu.ts";
import { NPopover } from "naive-ui";
import { storeToRefs } from "pinia";

const { changeActiveTask, completeTask, restoreTask } = useTaskStore()
const { currentActiveTask } = storeToRefs(useTaskStore());
const { showContextMenu } = useTaskRightContextMenu()

interface Props {
  task: Task
}

const props = defineProps<Props>();

const checkboxColors: Record<TaskState, string> = {
  [TaskState.ACTIVE]: "bg-#ccc",
  [TaskState.COMPLETED]: "bg-#007A78",
  [TaskState.GIVE_UP]: "bg-#FF2200",
  [TaskState.REMOVED]: "bg-#ccc",
};

function handleRightClickTask(e: MouseEvent, task: Task) {
  changeActiveTask(task)
  showContextMenu(e)
}
function handleClickTask(task: Task) {
  changeActiveTask(task)
}

function handleInput (e:Event) {
  if (currentActiveTask) {
    currentActiveTask.value!.title = (e.target as HTMLElement).innerText
  }
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