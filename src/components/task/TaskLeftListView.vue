<template>
  <div>
    <div>
      <NTree
          block-line
          :data="data"
          :default-expanded-keys="[100]"
          :default-selected-keys="statusStore.selectedKey"
          :node-props="nodeProps"
          @update:selected-keys="changeSelectedKey"
      />
    </div>
    <div class="mt-2px">
      <ul>
        <li v-for="item in taskList" :key="item.key"
            class="flex justify-between items-center h-7
            hover:bg-[#F6F8FF] pl-4 pr-2 cursor-pointer"
            dark="color-white hover:color-white hover:rounded
            hover:bg-lightblue-700 transition duration-400 ease-in-out"
            :class="statusStore.selectedKey[0] === item.key ? selected : ''"
            @click="changeSelectedKeyAndActiveProject(item.title,item.key)"
        >
          <div class="flex">
            <Icon :icon="item.icon" width="20" class="dark:color-white-b  color-[#9D9FA3]"/>
            <span class="ml-2">{{ item.title }}</span>
          </div>

          <Icon icon="material-symbols:more-horiz" width="20"
                v-show="statusStore.selectedKey[0] === item.key"
                class="dark:color-white color-[#9D9FA3]"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { NTree } from "naive-ui";
import { Icon } from '@iconify/vue'
import { useTaskStore } from "@/store/task";
import { SpecialProjectNames } from "@/store/task/const.ts";
import { useStatusStore } from "@/store/task/status.ts";

interface TaskListType {
  key: number
  icon: string
  title: SpecialProjectNames
}

const taskStore = useTaskStore();
const statusStore = useStatusStore();

const selected = 'bg-[#E7F5EE] dark:bg-[#233633]'

const data = ref<any[]>([
  {
    key: 100,
    label: "清单",
    checkboxDisabled: false,
    isLeaf: false,
    children: taskStore.projectNames.map((projectName, index) => {
      return {
        key: 200 + index,
        label: projectName,
        isLeaf: true,
      };
    }),
  }
]);

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

const changeSelectedKeyAndActiveProject = (projectName: string, key: number) => {
  taskStore.changeCurrentActiveProject(projectName)
  statusStore.setSelectedKey([key])
}

const changeSelectedKey = (key: number[]) => {
  statusStore.setSelectedKey(key)
}

const nodeProps = (treeOption: any) => {
  return {
    onClick() {
      const projectName = treeOption.option.label;
      taskStore.changeCurrentActiveProject(projectName);
    },
  };
};
</script>

<style scoped></style>