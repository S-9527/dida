<template>
  <div>
    <div v-if="currentActiveTask">
      <h1 contenteditable="true" @input="handleInput">
        {{ currentActiveTask.title }}
      </h1>
      <div>
        <InkMde v-model="currentActiveTask.content" />
      </div>
    </div>
    <div v-else>
      点击任务标题查看详情
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/store/task.ts";
import { storeToRefs } from "pinia";
import InkMde from 'ink-mde/vue'

const { currentActiveTask } = storeToRefs(useTaskStore());
const { setCurrentActiveTaskTitle } = useTaskStore()

function handleInput (e:Event) {
  setCurrentActiveTaskTitle((e.target as HTMLElement).innerText)
}

</script>

<style scoped></style>