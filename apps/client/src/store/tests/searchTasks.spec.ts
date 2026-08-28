import { createTestingPinia } from '@pinia/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  completeSmartProject,
  useListProjectsStore,
  useSearchTasksStore,
  useTasksStore,
} from '@/store'
import { liveListProject, tasks } from '@/tests/fixture'

describe('search tasks store', () => {
  beforeEach(() => {
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

    useSearchTasksStore().resetSearchTasks()
  })
  it('should be search a task by title', async () => {
    const searchTasksStore = useSearchTasksStore()

    await searchTasksStore.searchTasks('吃饭')

    expect(searchTasksStore.filteredTasks.length).toBe(1)
    const item = searchTasksStore.filteredTasks[0].item
    expect(item.title).toBe('吃饭')
    expect(item).toHaveProperty('id')
    expect(item).toHaveProperty('desc')
    expect(item).toHaveProperty('done')
    expect(item).toHaveProperty('from')
  })

  it('should be search a task by desc', async () => {
    const searchTasksStore = useSearchTasksStore()

    await searchTasksStore.searchTasks('吃什么')

    expect(searchTasksStore.filteredTasks.length).toBe(1)
    expect(searchTasksStore.filteredTasks[0].item.title).toBe('吃饭')
  })

  it('should not be found when the task does not exist', async () => {
    const searchTasksStore = useSearchTasksStore()

    await searchTasksStore.searchTasks('运动')

    expect(searchTasksStore.filteredTasks.length).toBe(0)
  })

  it('should be task\'s project is listProject when status is active', async () => {
    const searchTasksStore = useSearchTasksStore()

    await searchTasksStore.searchTasks('吃饭')

    expect(searchTasksStore.filteredTasks[0].item.done).toBe(false)
    expect(searchTasksStore.filteredTasks[0].item.from?.name).toBe('生活')
  })
  it('should be task\'s project is completeSmartProject when status is complete', async () => {
    const searchTasksStore = useSearchTasksStore()

    await searchTasksStore.searchTasks('写代码')

    expect(searchTasksStore.filteredTasks[0].item.done).toBe(true)
    expect(searchTasksStore.filteredTasks[0].item.from?.name).toBe(
      completeSmartProject.name,
    )
  })

  it('should be reset tasks', async () => {
    const searchTasksStore = useSearchTasksStore()

    await searchTasksStore.searchTasks('吃饭')

    searchTasksStore.resetSearchTasks()

    expect(searchTasksStore.filteredTasks.length).toBe(0)
  })
})
