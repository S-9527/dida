<script setup lang="ts">
import type { TasksSelector } from '@/store'
import { NCheckbox, NEllipsis } from 'naive-ui'
import {
  useCommandModalStore,
  useTasksSelectorStore,
  useTasksStore,
} from '@/store'

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
const { closeCommandModal } = useCommandModalStore()

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
    class="flex flex-col cursor-pointer gap-4px rounded-lg p-10px transition-colors duration-100 hover:bg-hover"
    @click="goTo"
  >
    <div class="flex items-center gap-10px">
      <NCheckbox :checked="props.done" disabled size="large" />
      <NEllipsis
        class="min-w-0 flex-1 text-14px font-medium"
        :tooltip="false"
        :class="{ 'line-through': props.done, 'text-ink-3': props.done }"
      >
        {{ title }}
      </NEllipsis>
      <span class="flex-shrink-0 text-11px text-ink-3">
        {{ from?.name }}
      </span>
    </div>
    <NEllipsis
      v-if="desc"
      class="ml-26px text-12px text-ink-2"
      :tooltip="false"
    >
      {{ desc }}
    </NEllipsis>
  </div>
</template>

<style scoped></style>
