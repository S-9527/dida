import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { smartProjects, SmartProjectOptionValue, setHideSmartProject } from '@/composables/settings'

export const useSettingsStore = defineStore('settingsStore', () => {
    const settingsSmartProjects = reactive(smartProjects)

    const visibleSmartProjects = computed(() => {
        return settingsSmartProjects.filter(smartProject => {
            return smartProject.option === SmartProjectOptionValue.Visible
        })
    })

    return {
        settingsSmartProjects,
        visibleSmartProjects,
        setHideSmartProject
    }
})
