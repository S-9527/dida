<template>
  <ul>
    <li v-for="item in taskList" :key="item.key"
        v-show="canShowTaskList.includes(item.key)"
        class="flex justify-between items-center h-7
        hover:bg-[#F6F8FF] pl-4 pr-2 cursor-pointer"
        dark="color-white hover:color-white hover:rounded
        hover:bg-lightblue-700 transition duration-400 ease-in-out"
        :class="projectSelectedStatusStore.selectedKey[0] === item.key ? selected : ''"
        @click="handleTaskItemClick(item.title,item.key)"
        @mouseenter="showMoreIconIndex = item.key"
        @mouseleave="showMoreIconIndex = -1"
    >
      <div class="flex">
        <Icon :icon="item.icon" width="20" class="color-[#9D9FA3]" dark="color-white-b"/>
        <span class="ml-2">{{ item.title }}</span>
      </div>

      <NPopover
          trigger="click"
          style="padding: 5px 0 5px 0"
          @clickoutside="showWitchPopover = -1"
          :show="showWitchPopover === item.key"
          :show-arrow="false"
          placement="bottom-start"
      >
        <template #trigger>
          <Icon
              v-show="projectSelectedStatusStore.selectedKey[0] === item.key || showMoreIconIndex === item.key"
              icon="material-symbols:more-horiz"
              width="20"
              class="color-[#9D9FA3]"
              dark="color-white"
              @click="($event) => {$event.stopPropagation(); openPopover(item.key)}"
          />
        </template>
        <ul w-180px cursor-pointer>
          <li hover="bg-[#F3F3F5] dark:bg-[#2D2D30]" pl-4 text-14px h-20px lh-20px
              @click="hideTaskItem(item.key)">隐藏</li>
        </ul>
      </NPopover>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { SmartProjectNames, useProjectSelectedStatusStore, useTaskStore } from '@/store'
import { useProjectMoreActions } from "@/composable/useProjectMoreActions.ts";
import { Icon } from '@iconify/vue'
import { NPopover } from "naive-ui";
import { reactive } from 'vue'

interface TaskListType {
  key: number
  icon: string
  title: `${SmartProjectNames}`
}

const taskList = reactive<TaskListType[]>([
  {
    key: 1,
    icon: 'material-symbols:check-box',
    title: SmartProjectNames.Complete,
  },
  {
    key: 2,
    icon: 'mdi:close-box',
    title: SmartProjectNames.Failed,
  },
  {
    key: 3,
    icon: 'material-symbols:delete',
    title: SmartProjectNames.Trash,
  },
  {
    key: 4,
    icon: 'material-symbols:text-snippet-rounded',
    title: SmartProjectNames.Abstract,
  },
])
const selected = 'bg-[#E7F5EE] dark:bg-[#233633]'

const taskStore = useTaskStore()
const projectSelectedStatusStore = useProjectSelectedStatusStore()
const { showMoreIconIndex, showWitchPopover, openPopover, hideTaskItem, canShowTaskList } = useProjectMoreActions()

const handleTaskItemClick = (projectName: string, key: number) => {
  taskStore.changeCurrentActiveProject(projectName)
  projectSelectedStatusStore.changeSelectedKey([key])
}
</script>

<style scoped></style>
