<script setup lang="ts">
import { useGoto } from '@/composables/goto'

const { gotoHome } = useGoto()
</script>

<template>
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-26px font-semibold tracking-tight">
        设置
      </h1>
      <p class="mt-2px text-13px text-ink-3">
        管理你的偏好与外观
      </p>
    </div>
    <button class="btn-primary" @click="gotoHome">
      完成
    </button>
  </div>
</template>
