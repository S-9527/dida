import { watchDebounced } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { delay } from '@/utils'
import { useSearchCommandsStore } from './searchCommands'
import { useSearchTasksStore } from './searchTasks'

export const useSearchStore = defineStore('search', () => {
  const search = ref('')
  const loading = ref(false)
  const searching = ref(false)

  const searchCommandsStore = useSearchCommandsStore()
  const searchTasksStore = useSearchTasksStore()

  watchDebounced(
    search,
    async (v) => {
      if (v) {
        loading.value = true
        await handleSearch(v)
        loading.value = false
        searching.value = true
      }
    },
    { debounce: 500 },
  )

  watch(
    search,
    (v) => {
      if (v === '') {
        resetSearch()
        searchCommandsStore.resetSearchCommands()
        searchTasksStore.resetSearchTasks()
      }
    },
  )

  const isSearchCommand = computed(() => {
    return search.value.startsWith('>')
  })

  function resetSearch() {
    search.value = ''
    loading.value = false
    searching.value = false
  }

  async function handleSearch(input: string) {
    if (isSearchCommand.value) {
      searchCommandsStore.searchCommands(input.trimEnd().slice(1))
      return
    }

    await delay()
    await searchTasksStore.searchTasks(input)
  }

  return {
    loading,
    searching,
    search,
    isSearchCommand,
    resetSearch,
  }
})
