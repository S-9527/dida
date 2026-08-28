import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { useCommand } from '@/composables/command'
import { useSearchCommands } from '../searchCommands'

describe('search commands', () => {
  beforeAll(() => {
    const { addCommand } = useCommand()

    addCommand({
      name: '回到主页',
      execute() {},
    })

    addCommand({
      name: '切换皮肤',
      execute() {},
    })
  })
  beforeEach(() => {
    const { resetSearchCommands } = useSearchCommands()
    resetSearchCommands()
  })
  it('should be search a command', () => {
    const { searchCommands, filteredCommands } = useSearchCommands()

    searchCommands('主页')

    expect(filteredCommands.value.length).toBe(1)
    expect(filteredCommands.value[0].name).toBe('回到主页')
  })

  it('should be search all commands ', () => {
    const { searchCommands, filteredCommands } = useSearchCommands()

    searchCommands('')

    expect(filteredCommands.value.length).toBe(2)
  })
})
