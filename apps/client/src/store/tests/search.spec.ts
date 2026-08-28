import { createTestingPinia } from '@pinia/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  useCommandsStore,
  useListProjectsStore,
  useSearchCommandsStore,
  useSearchStore,
  useSearchTasksStore,
  useTasksStore,
} from '@/store'
import { liveListProject, tasks } from '@/tests/fixture'

describe('search store', () => {
  beforeEach(async () => {
    vi.useFakeTimers()

    createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    })

    const tasksStore = useTasksStore()
    vi.mocked(tasksStore.findAllTasksNotRemoved).mockImplementation(
      async () => tasks,
    )

    const listProjectsStore = useListProjectsStore()
    vi.mocked(listProjectsStore.findProject).mockImplementation(
      () => liveListProject,
    )

    const commandsStore = useCommandsStore()
    commandsStore.addCommand({
      name: '主页',
      execute() {},
    })

    const searchStore = useSearchStore()
    searchStore.resetSearch()

    await vi.runAllTimersAsync()

    vi.clearAllMocks()
  })

  it('should be loading is true when search is start', async () => {
    const searchStore = useSearchStore()

    searchStore.search = '吃饭'

    await vi.advanceTimersToNextTimerAsync()

    expect(searchStore.loading).toBe(true)
  })

  it('should be loading is false when search is complete', async () => {
    const searchStore = useSearchStore()

    searchStore.search = '吃饭'

    await vi.runAllTimersAsync()

    expect(searchStore.loading).toBe(false)
  })

  it('should be searching is true when search is complete', async () => {
    const searchStore = useSearchStore()

    searchStore.search = '吃饭'

    await vi.runAllTimersAsync()

    expect(searchStore.searching).toBe(true)
  })

  it('search tasks', async () => {
    const searchStore = useSearchStore()
    const searchTasksStore = useSearchTasksStore()

    searchStore.search = '吃饭'

    await vi.runAllTimersAsync()

    expect(vi.mocked(searchTasksStore.searchTasks)).toBeCalledWith('吃饭')
  })

  describe('search commands', () => {
    it('normal', async () => {
      const searchStore = useSearchStore()
      const searchCommandsStore = useSearchCommandsStore()

      searchStore.search = '>主页'

      await vi.runAllTimersAsync()

      expect(vi.mocked(searchCommandsStore.searchCommands)).toBeCalledWith('主页')
    })

    it('removes the trailing white space', async () => {
      const searchStore = useSearchStore()
      const searchCommandsStore = useSearchCommandsStore()

      searchStore.search = '>主页 '

      await vi.runAllTimersAsync()

      expect(vi.mocked(searchCommandsStore.searchCommands)).toBeCalledWith('主页')
    })
  })

  it('should be reset when search is empty', async () => {
    const searchStore = useSearchStore()
    const searchCommandsStore = useSearchCommandsStore()
    const searchTasksStore = useSearchTasksStore()

    searchStore.search = '吃饭'
    await vi.runAllTimersAsync()

    searchStore.search = ''
    await vi.runAllTimersAsync()

    expect(searchStore.searching).toBe(false)
    expect(searchStore.loading).toBe(false)
    expect(vi.mocked(searchCommandsStore.resetSearchCommands)).toBeCalled()
    expect(vi.mocked(searchTasksStore.resetSearchTasks)).toBeCalled()
  })
})
