import { watchDebounced } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useSearchCommands } from './searchCommands'
import { resetSearchTasks, searchTasks, useSearchTasks } from './searchTasks'
import { delay } from "@/utils";

const { resetSearchCommands, searchCommands } = useSearchCommands()
const { resetSearchTasks, searchTasks } = useSearchTasks()

const search = ref('')
const loading = ref(false)
const searching = ref(false)

function resetSearch() {
    search.value = ''
}

const isSearchCommand = computed(() => {
    return search.value.startsWith('>')
})

async function handleSearch(input: string) {
    if (isSearchCommand.value) {
        searchCommands(input.trimEnd().slice(1))
    }
    else {
        await delay()
        await searchTasks(input)
    }
}

watchDebounced(
    () => search.value,
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
    () => search.value,
    (v) => {
        if (v === '') {
            searching.value = false
            resetSearchCommands()
            resetSearchTasks()
        }
    },
)

export function useSearch() {
    return {
        loading,
        searching,
        search,
        isSearchCommand,
        resetSearch,
    }
}
