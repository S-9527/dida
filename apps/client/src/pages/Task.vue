<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import TaskEditor from '@/components/task/TaskEditor.vue'
import TaskLeftListView from '@/components/task/TaskLeftListView.vue'
import TaskList from '@/components/task/TaskList.vue'
import { useResizePanel } from '@/composables'
import { useListProjectsStore, useTaskLeftMenuStore } from '@/store'

const projectsStore = useListProjectsStore()
const taskLeftMenuStore = useTaskLeftMenuStore()

onBeforeMount(async () => {
  await projectsStore.init()
})

const leftResizeElement = ref<HTMLDivElement>()
const { widthStyle: leftWidthStyle } = useResizePanel(leftResizeElement, {
  side: 'left',
  minWidth: 190,
  maxWidth: 390,
})

const rightResizeElement = ref<HTMLDivElement>()
const { widthStyle: rightWidthStyle } = useResizePanel(rightResizeElement, {
  side: 'right',
  minWidth: 300,
  maxWidth: 640,
})
</script>

<template>
  <div class="h-full flex overflow-hidden bg-app">
    <template v-if="taskLeftMenuStore.taskLeftMenuVisible">
      <aside :style="leftWidthStyle" class="overflow-hidden bg-panel">
        <TaskLeftListView />
      </aside>
      <div
        ref="leftResizeElement"
        class="group resize-handle h-full"
        style="flex: 0 0 6px"
        title="拖拽调整宽度"
      >
        <div class="divider-line" />
      </div>
    </template>

    <section class="h-full min-w-340px flex-1 overflow-y-auto px-32px py-20px">
      <TaskList class="w-full" />
    </section>

    <div
      ref="rightResizeElement"
      class="group resize-handle h-full"
      style="flex: 0 0 6px"
      title="拖拽调整宽度"
    >
      <div class="divider-line" />
    </div>

    <aside
      class="h-full w-full overflow-hidden bg-panel"
      :style="rightWidthStyle"
    >
      <TaskEditor class="h-full w-full" />
    </aside>
  </div>
</template>
