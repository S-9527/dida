<script setup lang="ts">
import type { Task } from '@/store'
import { Icon } from '@iconify/vue'
import { NPopover } from 'naive-ui'
import { computed } from 'vue'
import {
  useTaskOperationMessage,
  useTaskRightContextMenu,
} from '@/composables'
import { TaskStatus, useTasksStore } from '@/store'

interface Props {
  task: Task
  isShowDragIcon: boolean
}

const props = defineProps<Props>()
const tasksStore = useTasksStore()

const { showCompleteMessage } = useTaskOperationMessage()
const { showContextMenu } = useTaskRightContextMenu()

const isActive = computed(() => {
  return tasksStore.currentActiveTask?.id === props.task.id
})

const checkboxClass = computed(() => {
  const base
    = 'flex h-16px w-16px flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-150'

  if (props.task.status === TaskStatus.COMPLETED)
    return `${base} border-accent bg-accent text-white`
  if (props.task.status === TaskStatus.REMOVED)
    return `${base} border-line bg-inset text-ink-3`

  return `${base} border-line-strong bg-transparent hover:border-accent hover:text-accent`
})

function handleRightClickTask(e: MouseEvent, task: Task) {
  tasksStore.changeActiveTask(task)
  showContextMenu(e)
}

function handleClickTask(task: Task) {
  tasksStore.changeActiveTask(task)
}

function handleInput(e: Event, task: Task) {
  const newTitle = (e.target as HTMLElement).textContent ?? ''
  tasksStore.updateTaskTitle(task, newTitle)
}

function handleCompleteTodo() {
  if (props.task.status === TaskStatus.ACTIVE) {
    tasksStore.completeTask(props.task)
    showCompleteMessage(props.task)
  }
  else if (props.task.status === TaskStatus.COMPLETED) {
    tasksStore.restoreTask(props.task)
  }
  else if (props.task.status === TaskStatus.REMOVED) {
    // eslint-disable-next-line no-console
    console.log('在垃圾桶里面的 task 不可以直接恢复')
  }
}
</script>

<template>
  <div
    :data-id="props.task.id"
    class="group relative w-full flex items-center gap-8px"
    @click.right="handleRightClickTask($event, task)"
  >
    <i
      v-if="props.isShowDragIcon"
      class="i-mdi-format-align-justify flex-shrink-0 cursor-move text-ink-3 opacity-0 transition-opacity duration-100 group-hover:opacity-100"
    />
    <i v-else class="h-14px w-14px flex-shrink-0" />

    <div
      class="min-h-40px min-w-0 flex flex-1 items-center gap-10px rounded-lg py-6px pl-6px pr-10px transition-colors duration-100"
      :class="{
        'hover:bg-hover': !isActive,
        'bg-active': isActive,
        'opacity-60': props.task.status === TaskStatus.REMOVED,
      }"
    >
      <NPopover
        v-if="props.task.status === TaskStatus.REMOVED"
        trigger="hover"
        :show-arrow="false"
      >
        <template #trigger>
          <button :class="checkboxClass" aria-label="已删除">
            <Icon icon="carbon-trash-can" width="12" />
          </button>
        </template>
        <span class="text-12px">在垃圾桶里面的 Task 是不可以直接被恢复的哦</span>
      </NPopover>

      <button
        v-else
        :class="checkboxClass"
        aria-label="切换完成状态"
        @click="handleCompleteTodo"
      >
        <Icon
          v-if="props.task.status === TaskStatus.COMPLETED"
          icon="carbon-checkmark-filled"
          width="11"
        />
      </button>

      <div
        class="min-w-0 flex-1 cursor-pointer break-words text-14px"
        :class="{
          'text-ink-3 line-through': props.task.status !== TaskStatus.ACTIVE,
        }"
        contenteditable="true"
        @input="handleInput($event, task)"
        @focus="handleClickTask(task)"
      >
        {{ task.title }}
      </div>
    </div>
  </div>
</template>
