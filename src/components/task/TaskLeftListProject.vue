<template>
  <ul>
    <li v-for="item in taskList" :key="item.key"
        class="flex justify-between items-center h-7
        hover:bg-[#F6F8FF] pl-4 pr-2 cursor-pointer"
        dark="color-white hover:color-white hover:rounded
        hover:bg-lightblue-700 transition duration-400 ease-in-out"
        :class="projectSelectedStatusStore.selectedKey[0] === item.key ? selected : ''"
        @click="changeSelectedKeyAndActiveProject(item.title,item.key)"
    >
      <div class="flex">
        <Icon :icon="item.icon" width="20" class="color-[#9D9FA3]" dark="color-white-b"/>
        <span class="ml-2">{{ item.title }}</span>
      </div>

      <Icon v-show="projectSelectedStatusStore.selectedKey[0] === item.key"
          icon="material-symbols:more-horiz" width="20"
          class="dark:color-white color-[#9D9FA3]"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import {SpecialProjectNames, useProjectSelectedStatusStore, useTaskStore,} from '@/store/task'
import { Icon } from '@iconify/vue'
import { reactive } from 'vue'

interface TaskListType {
  key: number
  icon: string
  title: `${SpecialProjectNames}`
}

const taskList = reactive<TaskListType[]>([
  {
    key: 1,
    icon: 'material-symbols:check-box',
    title: SpecialProjectNames.Complete,
  },
  {
    key: 2,
    icon: 'mdi:close-box',
    title: SpecialProjectNames.Failed,
  },
  {
    key: 3,
    icon: 'material-symbols:delete',
    title: SpecialProjectNames.Trash,
  },
  {
    key: 4,
    icon: 'material-symbols:text-snippet-rounded',
    title: SpecialProjectNames.Abstract,
  },
])
const selected = 'bg-[#E7F5EE] dark:bg-[#233633]'

const taskStore = useTaskStore()
const projectSelectedStatusStore = useProjectSelectedStatusStore()

const changeSelectedKeyAndActiveProject = (projectName: string, key: number) => {
  taskStore.changeCurrentActiveProject(projectName)
  projectSelectedStatusStore.changeSelectedKey([key])
}
</script>

<style scoped></style>