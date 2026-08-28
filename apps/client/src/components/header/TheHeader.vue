<script setup lang="ts">
import { openGithub, useGoto } from '@/composables/goto'

const { gotoHome, gotoSettings } = useGoto()
</script>

<template>
  <div
    class="h-40px w-full flex items-center justify-between base-color px-1% text-16px"
  >
    <div class="cursor-pointer" aria-label="Go Home" @click="gotoHome()">
      DiDa
    </div>
    <div class="flex items-center justify-start">
      <button class="mx-2 !outline-none" @click="gotoSettings()">
        <div i="carbon-settings" />
      </button>
      <button class="mx-2 !outline-none" @click="openGithub()">
        <div i="mdi-github" />
      </button>
    </div>
  </div>
</template>
