<script setup lang="ts">
import type { TasksSelector } from '@/store'
import { NCheckbox, NEllipsis } from 'naive-ui'
import { useTasksSelectorStore, useTasksStore } from '@/store'
import { useCommandModal } from './commandModal'

interface Props {
  title: string
  desc: string
  done: boolean
  from: TasksSelector | undefined
  id: string
}

const props = defineProps<Props>()
const tasksStore = useTasksStore()
const tasksSelectorStore = useTasksSelectorStore()
const { closeCommandModal } = useCommandModal()

async function goTo() {
  if (props.from) {
    await tasksSelectorStore.setCurrentSelector(props.from)
    tasksStore.changeActiveTask(props.id)
  }

  closeCommandModal()
}
</script>

<template>
  <div
    class="w-full border-b-1px border-gray-500/8 p-3 hover:bg-cyan/2"
    :class="{ 'text-gray-300 dark:text-gray-700': props.done }"
  >
    <!-- TODO 添加高亮 -->
    <div
      class="w-full flex cursor-pointer items-center justify-start"
      @click="goTo"
    >
      <NCheckbox :checked="props.done" disabled size="large" />
      <NEllipsis
        style="width: 660px"
        :tooltip="false"
        class="ml-10px overflow-hidden text-ellipsis text-18px"
        :class="{ 'line-through': props.done }"
      >
        {{ title }}
      </NEllipsis>
      <div class="w-80px flex items-center justify-center text-gray-500">
        {{ from?.name }}
      </div>
    </div>
    <NEllipsis
      style="width: 660px"
      :tooltip="false"
      class="ml-30px mt-5px w-full pr-80px"
    >
      {{ desc }}
    </NEllipsis>
  </div>
</template>

<style scoped></style>
