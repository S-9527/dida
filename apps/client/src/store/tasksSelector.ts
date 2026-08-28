import type { ListProject } from './listProjects'
import type { SmartProject } from './smartProjects'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loadListProjectTasks } from './listProjects'
import { loadSmartProjectTasks } from './smartProjects'
import { useTasksStore } from './tasks'
import { TasksSelectorType } from './types'

export type TasksSelector = ListProject | SmartProject

export const useTasksSelectorStore = defineStore('tasksSelector', () => {
  const tasksStore = useTasksStore()

  const currentSelector = ref<TasksSelector>()

  async function updateTasks() {
    if (!currentSelector.value)
      return

    if (currentSelector.value.type === TasksSelectorType.listProject) {
      tasksStore.updateTasks(
        await loadListProjectTasks(currentSelector.value.id),
      )
    }
    else if (currentSelector.value.type === TasksSelectorType.smartProject) {
      tasksStore.updateTasks(
        await loadSmartProjectTasks(currentSelector.value.name),
      )
    }
  }

  async function setCurrentSelector(selector: TasksSelector) {
    currentSelector.value = selector
    await updateTasks()
  }

  return {
    currentSelector,
    setCurrentSelector,
  }
})
