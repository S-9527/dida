import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import {
  setHideSmartProject,
  SmartProjectOptionValue,
  smartProjects,
} from '@/composables/settings'

export const useSettingsStore = defineStore('settings', () => {
  const settingsSmartProjects = reactive(smartProjects)

  const visibleSmartProjects = computed(() => {
    return settingsSmartProjects.filter((smartProject) => {
      return smartProject.option === SmartProjectOptionValue.Visible
    })
  })

  return {
    settingsSmartProjects,
    visibleSmartProjects,
    setHideSmartProject,
  }
})
