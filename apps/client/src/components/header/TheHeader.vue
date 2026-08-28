<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { openGithub, useGoto } from '@/composables/goto'
import { useCommandModalStore } from '@/store'

const { gotoHome, gotoSettings } = useGoto()
const { openCommandModal } = useCommandModalStore()

function handleSearch(e: MouseEvent) {
  e.stopPropagation()
  openCommandModal()
}
</script>

<template>
  <header
    class="h-52px w-full flex flex-shrink-0 items-center justify-between border-b border-line bg-panel px-14px"
  >
    <div
      class="flex cursor-pointer items-center gap-8px"
      aria-label="DiDa"
      @click="gotoHome"
    >
      <span
        class="h-24px w-24px flex items-center justify-center rounded-md bg-accent text-13px text-white font-bold"
      >
        D
      </span>
      <span class="text-16px font-semibold tracking-tight">DiDa</span>
    </div>

    <div class="flex items-center gap-4px">
      <button class="relative icon-btn" aria-label="搜索" @click="handleSearch">
        <Icon icon="carbon-search" width="19" />
      </button>
      <button class="icon-btn" aria-label="设置" @click="gotoSettings">
        <Icon icon="carbon-settings" width="19" />
      </button>
      <button class="icon-btn" aria-label="GitHub" @click="openGithub">
        <Icon icon="mdi-github" width="19" />
      </button>
    </div>
  </header>
</template>

<style scoped></style>
