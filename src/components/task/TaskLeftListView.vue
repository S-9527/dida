<template>
  <div>
    <div>
      <NTree
          block-line
          :data="data"
          :default-expanded-keys="[1]"
          :default-selected-keys="[2]"
          :node-props="nodeProps"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NTree } from "naive-ui";
import { useTaskStore } from "@/store/task";
import { SpecialProjectNames } from "@/store/task/const.ts";

const taskStore = useTaskStore();

const data = ref<any[]>([
  {
    key: 100,
    label: "清单",
    checkboxDisabled: false,
    isLeaf: false,
    children: taskStore.projectNames.map((projectName, index) => {
      return {
        key: 2 + index,
        label: projectName,
        isLeaf: true,
      };
    }),
  },
  {
    key: 200,
    label: SpecialProjectNames.Complete,
  },
  {
    key: 300,
    label: SpecialProjectNames.Trash
  }
]);

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