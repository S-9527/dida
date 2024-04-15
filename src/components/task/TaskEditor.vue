<template>
  <div>
    <div v-if="currentActiveTask">
      <h1 contenteditable="true" @input="handleInput" class="text-3xl">
        {{ currentActiveTask.title }}
      </h1>
      <div class="mt-2">
        <InkMde v-model="currentActiveTask.content" :options="{
          interface: {
            appearance: isDark ? 'dark' : 'light'
          }
        }" />
      </div>
    </div>
    <div v-else>
      点击任务标题查看详情
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/store/task";
import { storeToRefs } from "pinia";
import InkMde from 'ink-mde/vue'
import { isDark } from "@/composable/dark.ts";

const { currentActiveTask } = storeToRefs(useTaskStore());

function handleInput (e:Event) {
  if (currentActiveTask) {
    currentActiveTask.value!.title = (e.target as HTMLElement).innerText
  }
}

</script>

<style scoped></style>