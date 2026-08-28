<script setup lang="ts">
import type { Theme } from '@/composables/settings'
import { computed } from 'vue'
import { useThemeStore } from '@/store'
import Selected from './Selected.vue'

const props = defineProps<{
  color: string
  name: string
  label: string
}>()

const store = useThemeStore()

const checked = computed(() => store.currentTheme?.name === props.name)

function changeTheme() {
  if (checked.value)
    return

  // 这里转换是因为目前 defineProps 仍然不支持 import type
  store.changeTheme(props.name as Theme)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-12px">
    <div
      class="h-60px w-60px flex cursor-pointer items-center justify-center rounded-5px"
      :style="{ background: color }"
      @click="changeTheme"
    >
      <Selected v-if="checked" />
    </div>
    <div class="text-12px">
      {{ label }}
    </div>
  </div>
</template>

<style scoped></style>
