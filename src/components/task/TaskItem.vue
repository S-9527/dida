<template>
  <div class="flex flex-row gap-10px w-full items-center" @click.right="handleRightClickTask($event, task)">
    <i class="cursor-move text-gray-200 dark:text-#3B3B3B flex-shrink-0 i-mdi-format-align-justify text-sm" />
    <div class="flex justify-start items-center gap-5px h-40px py-5px flex-1">
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
import { SpecialProjectNames, Task, TaskState, useTaskStore } from "@/store/task";
import { useTaskRightContextMenu } from "@/composable/taskRightConextMenu.ts";
import { createDiscreteApi, MessageReactive, NPopover } from "naive-ui";
import { storeToRefs } from "pinia";
import { h } from "vue";

const { changeActiveTask, completeTask, restoreTask } = useTaskStore()
const { currentActiveTask } = storeToRefs(useTaskStore());
const { showContextMenu } = useTaskRightContextMenu()

interface Props {
  task: Task
}

const props = defineProps<Props>();

function useMessage() {
  const { message } = createDiscreteApi(['message'])

  let messageReactive: MessageReactive | null = null

  function createMessageView(title: string, onClick: () => void) {
    return () => h('p', null, [
      h('span', null, `${title} ${SpecialProjectNames.Complete}`),
      h('i',
          {
            style: 'color: teal;font-style:unset;cursor:pointer;margin-left: 20px',
            onClick,
          },
          '撤销',
      ),
    ])
  }
  function removeMessage() {
    if (messageReactive) {
      messageReactive.destroy()
      messageReactive = null
    }
  }

  function showCompleteMessage(task: Task) {
    const onClick = () => {
      restoreTask(task)
      removeMessage()
    }

    messageReactive = message.info(createMessageView(task.title, onClick), {
      icon: () => null,
      duration: 1000,
    })
  }

  return {
    showCompleteMessage,
  }
}

const { showCompleteMessage } = useMessage();

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
      showCompleteMessage(props.task)
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