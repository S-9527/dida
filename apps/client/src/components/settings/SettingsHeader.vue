<script setup lang="ts">
import { NSpace } from 'naive-ui'
import { useGoto } from '@/composables/goto'

const { gotoHome } = useGoto()
</script>

<template>
  <NSpace justify="space-between" item-style="center">
    <h1 class="text-3xl">
      设置
    </h1>
    <button
      class="h-40px w-100px rounded-md bg-blue-500 text-16px text-white transition-colors active:bg-blue-700 hover:bg-blue-400"
      @click="() => gotoHome()"
    >
      完成
    </button>
  </NSpace>
</template>
