<template>
  <div>
    <h1>{{ currentActiveTask?.title }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/store/task.ts";
import { storeToRefs } from "pinia";

const { currentActiveTask } = storeToRefs(useTaskStore());

</script>

<style scoped></style>