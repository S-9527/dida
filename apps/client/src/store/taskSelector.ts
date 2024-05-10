import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ListProject, SmartProject } from '@/store'
import { loadListProjectTasks, loadSmartProjectTasks, useTasksStore } from '@/store'

export type TasksSelector = ListProject | SmartProject | undefined

export enum TasksSelectorType {
    listProject = 'listProject',
    smartProject = 'smartProject',
}

export const useTasksSelectorStore = defineStore('tasksSelectorStore', () => {
    const tasksStore = useTasksStore()

    const currentSelector = ref<TasksSelector>()

    async function updateTasks() {
        if (!currentSelector.value)
            return

        let rawTasks
        if (currentSelector.value.type === 'listProject')
            rawTasks = await loadListProjectTasks(currentSelector.value.id)

        else if (currentSelector.value.type === 'smartProject')
            rawTasks = await loadSmartProjectTasks(currentSelector.value.name)

        tasksStore.updateTasks(rawTasks)
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
