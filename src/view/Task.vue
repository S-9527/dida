<template>
  <div class="w-full bg-gray-100 text-black dark:bg-#18181c dark:text-white
  h-40px px-1% flex justify-between items-center text-16px">
    <div>Vue3 Todo App Real-World</div>
    <TheHeader />
  </div>
  <div
      ref="boxContainerElement"
      class="!h-[calc(100vh-40px)] flex p-10px pt-0
      overflow-hidden dark:bg-#18181c dark:text-white"
  >
    <div
        v-if="visible"
        ref="leftContainerElement"
        :style="{ flex: `0 0 ${AREA_MIN_WIDTH}px` }"
    >
      <TaskLeftListView/>
    </div>
    <div
        v-if="visible"
        ref="leftResizeElement"
        class="border-solid cursor-w-resize h-screen border-1 opacity-60 hover-opacity-100"
        style="flex: 0 0 1px"
        title="收缩侧边栏"
        @mousedown.prevent="useDividerLeftDrag"
    />
    <div class="flex-1 flex w-full h-full p-24px">
      <TaskList class="w-full"/>
    </div>
    <div
        ref="rightResizeElement"
        class="border-solid cursor-w-resize h-screen border-1 opacity-60 hover-opacity-100"
        style="flex: 0 0 1px"
        title="收缩侧边栏"
        @mousedown.prevent="useDividerRightDrag"
    />
    <div
        ref="rightContainerElement"
        class="flex w-full h-full p-24px"
        :style="{ flex: `0 0 ${AREA_MIN_WIDTH}px` }"
    >
      <TaskEditor class="w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskList from "@/components/task/TaskList.vue";
import TaskEditor from "@/components/task/TaskEditor.vue";
import TaskLeftListView from "@/components/task/TaskLeftListView.vue";
import TheHeader from "@/components/header/TheHeader.vue";
import { ref } from "vue";
import { useTaskSidebarDrag } from "@/composable/useTaskSidebarDrag.ts";
import { useTaskLeftMenuStatusStore } from '@/store'
import { storeToRefs } from "pinia";

const AREA_MIN_WIDTH = 240

const leftResizeElement = ref()
const rightResizeElement = ref()
const boxContainerElement = ref()
const leftContainerElement = ref()
const rightContainerElement = ref()

const { useDividerLeftDrag, useDividerRightDrag } = useTaskSidebarDrag(
    AREA_MIN_WIDTH,
    leftResizeElement,
    rightResizeElement,
    boxContainerElement,
    leftContainerElement,
    rightContainerElement,
)

const { visible } = storeToRefs(useTaskLeftMenuStatusStore());
</script>

<style scoped></style>