<template>
  <div :data-id="props.task.id" class="flex flex-row w-full items-center"
       @click.right="handleRightClickTask($event, task)" v-on="hoverEvents">
    <i
        v-if="isHover && props.isShowDragIcon"
        class="cursor-move text-gray dark:text-white flex-shrink-0 i-mdi-format-align-justify opacity-75 hover:opacity-100"
    />
    <i v-else class="w-1.2em h-1.2em flex-shrink-0" />
    <div
        class="flex justify-start items-center gap-5px h-40px py-5px flex-1 pl-10"
        :class="[isDark ? 'hover:bg-[#474747]/50' : 'hover:bg-[#ECF1FF]/50',
        currentActiveTask?.id === task.id ? isDark ? '!bg-[#474747]' : '!bg-[#ECF1FF]' : '']"
    >
      <template v-if="task.status === TaskStatus.REMOVED">
        <div class="flex justify-center items-center gap-5px">
          <NPopover trigger="hover">
            <template #trigger>
              <div
                  class="w-5 h-5 rounded-1 cursor-pointer"
                  :class="[checkboxColors[task.status]]"
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
        <div :class="[checkboxColors[task.status]]"
             class="w-5 h-5 rounded-1 cursor-pointer border border-solid border-black opacity-75 dark:border-white hover:opacity-100"
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
import { Project, useThemeStore } from "@/store";
import { TaskStatus, useTaskStore } from '@/store/tasks'
import type { Task } from '@/store/tasks'
import { useTaskRightContextMenu } from "@/composables/useTaskRightConextMenu.ts";
import { NPopover } from "naive-ui";
import { storeToRefs } from "pinia";
import { useTaskOperationMessage } from "@/composables/useTaskOperationMessage.ts";
import { ref } from "vue";

const { changeActiveTask, completeTask, restoreTask, changeTaskTitle } = useTaskStore()
const { currentActiveTask } = storeToRefs(useTaskStore());
const { showContextMenu } = useTaskRightContextMenu()
const { isDark } = storeToRefs(useThemeStore());
const { isHover, hoverEvents } = useHandleHover()

interface Props {
  task: Task,
  project: Project
  isShowDragIcon: boolean
}

const props = defineProps<Props>();
const { showCompleteMessage } = useTaskOperationMessage()

const checkboxColors: Record<TaskStatus, string> = {
  [TaskStatus.ACTIVE]: "bg-transparent",
  [TaskStatus.COMPLETED]: "bg-#007A78",
  [TaskStatus.REMOVED]: "bg-#ccc",
};

function useHandleHover() {
  const isHover = ref<boolean>(false)
  const hoverEvents: Record<string, () => void> = {
    mouseover: () => isHover.value = true,
    mousemove: () => isHover.value = true,
    mouseleave: () => isHover.value = false,
  }

  return {
    isHover,
    hoverEvents,
  }
}

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
  switch (props.task.status) {
    case TaskStatus.ACTIVE:
      completeTask(props.task)
      showCompleteMessage(props.task)
      break;
    case TaskStatus.COMPLETED:
      restoreTask(props.task)
      break;
    case TaskStatus.REMOVED:
      console.log("在垃圾桶里面的 task 不可以直接恢复")
      break;
  }
}
</script>

<style scoped></style>
