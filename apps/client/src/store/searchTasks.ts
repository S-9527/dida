import type { FuseResult } from 'fuse.js'
import type { TasksSelector } from './tasksSelector'
import Fuse from 'fuse.js'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useListProjectsStore } from './listProjects'
import { completeSmartProject } from './smartProjects'
import { TaskStatus, useTasksStore } from './tasks'

interface SearchTaskItem {
  id: string
  title: string
  desc: string
  done: boolean
  from: TasksSelector | undefined
}

const fuse = new Fuse([] as SearchTaskItem[], {
  keys: ['title', 'desc'],
})

export const useSearchTasksStore = defineStore('searchTasks', () => {
  const tasksStore = useTasksStore()
  const projectsStore = useListProjectsStore()
  const filteredTasks = ref<FuseResult<SearchTaskItem>[]>([])

  async function searchTasks(input: string) {
    const tasks = await tasksStore.findAllTasksNotRemoved()
    const fuseTasks = tasks.map((task) => {
      const done = task.status === TaskStatus.COMPLETED
      const from = done
        ? completeSmartProject
        : projectsStore.findProject(task.projectId)
      return {
        id: task.id!,
        title: task.title,
        desc: task.content,
        done,
        from,
      }
    })
    fuse.setCollection(fuseTasks)

    filteredTasks.value = fuse.search(input)
  }

  function resetSearchTasks() {
    filteredTasks.value = []
  }

  return {
    filteredTasks,
    searchTasks,
    resetSearchTasks,
  }
})
