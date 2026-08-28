import { defineStore } from 'pinia'
import { fetchAllTasks } from '@/api'
import { TaskStatus } from './tasks'
import { useTasksSelectorStore } from './tasksSelector'
import { TasksSelectorType } from './types'

export interface SmartProject {
  name: SmartProjectName
  type: TasksSelectorType.smartProject
}

function createSmartProject(name: SmartProjectName): SmartProject {
  return {
    name,
    type: TasksSelectorType.smartProject,
  }
}

export enum SmartProjectName {
  Complete = '已完成',
  Trash = '垃圾桶',
}
export const completeSmartProject = createSmartProject(
  SmartProjectName.Complete,
)
export const trashSmartProject = createSmartProject(SmartProjectName.Trash)
export const smartProjects = [completeSmartProject, trashSmartProject]

export const useSmartProjectsStore = defineStore('smartProjects', () => {
  const tasksSelectorStore = useTasksSelectorStore()

  function selectProject(projectName: SmartProjectName) {
    switch (projectName) {
      case SmartProjectName.Complete:
        tasksSelectorStore.setCurrentSelector(completeSmartProject)
        break
      case SmartProjectName.Trash:
        tasksSelectorStore.setCurrentSelector(trashSmartProject)
        break
    }
  }

  return {
    selectProject,
  }
})

export async function loadSmartProjectTasks(smartProjectName: SmartProjectName) {
  const status
    = smartProjectName === SmartProjectName.Complete
      ? TaskStatus.COMPLETED
      : TaskStatus.REMOVED
  return await fetchAllTasks({
    status,
    sortBy: 'updatedAt',
  })
}
