<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import TaskEditor from '@/components/task/TaskEditor.vue'
import TaskLeftListView from '@/components/task/TaskLeftListView.vue'
import TaskList from '@/components/task/TaskList.vue'
import { useDrag, useTaskLeftMenu } from '@/composables'
import { useListProjectsStore } from '@/store'

const projectsStore = useListProjectsStore()
const { taskLeftMenuVisible } = useTaskLeftMenu()

onBeforeMount(async () => {
  await projectsStore.init()
})

function useLeftDrag(el: Ref<HTMLDivElement | undefined>) {
  const leftWidth = ref(240)
  const leftWidthStyle = computed(() => {
    return `flex: 0 0 ${leftWidth.value}px`
  })

  onMounted(() => {
    const x = el.value?.getBoundingClientRect().x || 0

    useDrag({
      el: el.value!,
      moveRange: [x - 50, x + 150],
      onMove(moveDistance) {
        leftWidth.value += moveDistance
      },
    })
  })

  return {
    leftWidthStyle,
  }
}

function useRightDrag(el: Ref<HTMLDivElement | undefined>) {
  const rightWidth = ref(240)
  const rightWidthStyle = computed(() => {
    return `flex: 0 0 ${rightWidth.value}px`
  })

  onMounted(() => {
    const x = el.value?.getBoundingClientRect().x || 0

    useDrag({
      el: el.value!,
      moveRange: [x - 400, x],
      onMove(moveDistance) {
        rightWidth.value -= moveDistance
      },
    })
  })

  return {
    rightWidthStyle,
  }
}

const leftResizeElement = ref<HTMLDivElement>()
const { leftWidthStyle } = useLeftDrag(leftResizeElement)

const rightResizeElement = ref<HTMLDivElement>()
const { rightWidthStyle } = useRightDrag(rightResizeElement)
</script>

<template>
  <div
    class="flex overflow-hidden base-color p-10px pt-0 !h-[calc(100vh-40px)]"
  >
    <template v-if="taskLeftMenuVisible">
      <div :style="leftWidthStyle">
        <TaskLeftListView />
      </div>
      <div
        ref="leftResizeElement"
        class="h-screen cursor-col-resize border-l-2px border-solid opacity-60 hover-opacity-100"
        style="flex: 0 0 6px"
        title="收缩侧边栏"
      />
    </template>
    <div class="h-full min-w-300px w-full flex flex-1 p-24px">
      <TaskList class="w-full" />
    </div>
    <div
      ref="rightResizeElement"
      class="h-screen cursor-col-resize border-l-2px border-solid opacity-60 hover-opacity-100"
      style="flex: 0 0 6px"
      title="收缩侧边栏"
    />
    <div class="h-full w-full flex p-24px" :style="rightWidthStyle">
      <TaskEditor class="h-full w-full" />
    </div>
  </div>
</template>
