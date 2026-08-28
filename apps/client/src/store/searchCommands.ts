import type { Command } from './commands'
import Fuse from 'fuse.js'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCommandsStore } from './commands'

const fuse = new Fuse([] as Command[], {
  keys: ['name'],
})

export const useSearchCommandsStore = defineStore('searchCommands', () => {
  const commandsStore = useCommandsStore()
  const filteredCommands = ref<Command[]>([])

  function searchCommands(input: string) {
    if (!input) {
      resetSearchCommands()
      return
    }

    fuse.setCollection(commandsStore.commands)
    filteredCommands.value = fuse.search(input).map(i => i.item)
  }

  function resetSearchCommands() {
    filteredCommands.value = commandsStore.commands
  }

  return {
    filteredCommands,
    searchCommands,
    resetSearchCommands,
  }
})
