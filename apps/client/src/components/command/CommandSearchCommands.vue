<script setup lang="ts">
import type { Command } from '@/store'
import { Icon } from '@iconify/vue'
import { useCommandModalStore, useSearchCommandsStore } from '@/store'

const searchCommandsStore = useSearchCommandsStore()
const commandModalStore = useCommandModalStore()

function handleClick(command: Command) {
  command.execute()
  commandModalStore.closeCommandModal()
}
</script>

<template>
  <div class="flex flex-col gap-1px">
    <div
      v-for="(item, key) in searchCommandsStore.filteredCommands"
      :key="key"
      class="row w-full row-hover pl-10px pr-10px"
      @click="handleClick(item)"
    >
      <Icon
        icon="carbon-flash"
        width="16"
        class="flex-shrink-0 text-ink-3"
      />
      <span class="min-w-0 flex-1 truncate">{{ item.name }}</span>
      <span class="flex-shrink-0 text-11px text-ink-3">命令</span>
    </div>
  </div>
</template>
