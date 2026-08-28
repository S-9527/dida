<script setup lang="ts">
import type { Command } from '@/composables/command'
import { useCommandModal } from './commandModal'
import { useSearchCommands } from './searchCommands'

const { closeCommandModal } = useCommandModal()
const { filteredCommands } = useSearchCommands()

function handleClick(command: Command) {
  command.execute()
  closeCommandModal()
}
</script>

<template>
  <div>
    <div
      v-for="(item, key) in filteredCommands"
      :key="key"
      class="cursor-pointer px-2 leading-30px hover:bg-gray-400/5"
      @click="handleClick(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<style scoped></style>
