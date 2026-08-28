import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCommandsStore } from '@/store'

describe('commands store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should init built-in commands', () => {
    const commandsStore = useCommandsStore()

    commandsStore.initCommands()

    expect(commandsStore.commands.length).toBe(2)
    expect(commandsStore.commands.map(c => c.name)).toEqual(['前往主页', '切换皮肤'])
  })

  it('should add command', () => {
    const commandsStore = useCommandsStore()

    commandsStore.addCommand({
      name: '新命令',
      execute() {},
    })

    expect(commandsStore.commands.length).toBe(1)
    expect(commandsStore.commands[0].name).toBe('新命令')
  })

  it('should reset commands', () => {
    const commandsStore = useCommandsStore()
    commandsStore.initCommands()

    commandsStore.resetCommand()

    expect(commandsStore.commands.length).toBe(0)
  })

  it('should execute a command', () => {
    const execute = vi.fn()
    const commandsStore = useCommandsStore()

    commandsStore.addCommand({
      name: '测试命令',
      execute,
    })

    commandsStore.commands[0].execute()

    expect(execute).toHaveBeenCalledTimes(1)
  })
})
