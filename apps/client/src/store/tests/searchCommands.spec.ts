import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useCommandsStore, useSearchCommandsStore } from '@/store'

describe('search commands store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    const commandsStore = useCommandsStore()
    commandsStore.addCommand({
      name: '回到主页',
      execute() {},
    })
    commandsStore.addCommand({
      name: '切换皮肤',
      execute() {},
    })

    useSearchCommandsStore().resetSearchCommands()
  })

  it('should be search a command', () => {
    const searchCommandsStore = useSearchCommandsStore()

    searchCommandsStore.searchCommands('主页')

    expect(searchCommandsStore.filteredCommands.length).toBe(1)
    expect(searchCommandsStore.filteredCommands[0].name).toBe('回到主页')
  })

  it('should be search all commands', () => {
    const searchCommandsStore = useSearchCommandsStore()

    searchCommandsStore.searchCommands('')

    expect(searchCommandsStore.filteredCommands.length).toBe(2)
  })

  it('should be reflect reset commands', () => {
    const commandsStore = useCommandsStore()
    const searchCommandsStore = useSearchCommandsStore()

    commandsStore.resetCommand()
    searchCommandsStore.searchCommands('')

    expect(searchCommandsStore.filteredCommands.length).toBe(0)
  })
})
