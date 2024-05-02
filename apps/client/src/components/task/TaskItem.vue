<template>
  <div class="flex flex-row w-full items-center" @click.right="handleRightClickTask($event, task)">
    <i class="cursor-move text-gray-200 dark:text-#3B3B3B flex-shrink-0 i-mdi-format-align-justify text-sm" />
    <div
        class="flex justify-start items-center gap-5px h-40px py-5px flex-1 pl-10"
        :class="[isDark ? 'hover:bg-[#474747]/50' : 'hover:bg-[#ECF1FF]/50',
        currentActiveTask?.id === task.id ? isDark ? '!bg-[#474747]' : '!bg-[#ECF1FF]' : '']"
    >
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
            class="w-full cursor-pointer focus:outline-0"
            contenteditable="true"
            @input="handleInput($event, task)"
            @focus="handleClickTask(task)"
        >
          {{ task.title }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Project, Task, TaskState, useTaskStore, useThemeStore } from "@/store";
import { useTaskRightContextMenu } from "@/composable/useTaskRightConextMenu.ts";
import { NPopover } from "naive-ui";
import { storeToRefs } from "pinia";
import { useTaskOperationMessage } from "@/composable/useTaskOperationMessage.ts";
import { changeTaskTitle } from "@/service/task/task.ts";

const { changeActiveTask, completeTask, restoreTask } = useTaskStore()
const { currentActiveTask } = storeToRefs(useTaskStore());
const { showContextMenu } = useTaskRightContextMenu()
const { isDark } = storeToRefs(useThemeStore());

interface Props {
  task: Task,
  project: Project
}

const props = defineProps<Props>();
const { showCompleteMessage } = useTaskOperationMessage()

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

function handleInput (e:Event, task: Task) {
  changeTaskTitle(task, (e.target as HTMLElement).innerText)
}

function handleCompleteTodo () {
  switch (props.task.state) {
    case TaskState.ACTIVE:
      completeTask(props.task)
      showCompleteMessage(props.task, props.project)
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
