<script setup lang="ts">
import type { Theme } from '@/composables/settings'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useThemeStore } from '@/store'

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

  store.changeTheme(props.name as Theme)
}
</script>

<template>
  <div class="flex flex-col items-center gap-10px">
    <button
      class="relative h-64px w-64px overflow-hidden border-2 rounded-xl transition-all duration-150"
      :style="{ background: color }"
      :class="
        checked
          ? 'border-accent shadow-elev-2'
          : 'border-line hover:border-line-strong'
      "
      :aria-label="`切换到${label}`"
      @click="changeTheme"
    >
      <span
        v-if="checked"
        class="absolute right-6px top-6px h-20px w-20px flex items-center justify-center rounded-full bg-accent text-white"
      >
        <Icon icon="carbon-checkmark-filled" width="12" />
      </span>
    </button>
    <span class="text-12px" :class="checked ? 'font-medium text-ink' : 'text-ink-3'">
      {{ label }}
    </span>
  </div>
</template>
