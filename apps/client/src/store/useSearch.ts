import { defineStore } from 'pinia'
import { ref } from 'vue'
import Fuse, { FuseResult } from 'fuse.js'
import { Project, SmartProject, TaskState } from "@/service/task";
import { loadAllTasksNotRemoved } from "@/service/task/task.ts";

interface SearchTaskItem {
    id: number
    title: string
    desc: string
    done: boolean
    from: Project | SmartProject | undefined
}

export const useSearchStore = defineStore('searchStore', () => {
    const allTasks = ref<SearchTaskItem[]>([])

    const searchTasks = ref<FuseResult<SearchTaskItem>[]>([])
    // 还未实现后端的逻辑，这里就暂时模拟先收集所有的数据

    const fuse = new Fuse(allTasks.value, {
        keys: ['title', 'desc'],
    })

    async function collectAllTasks() {
        allTasks.value = []
        const tasks = await loadAllTasksNotRemoved();
        tasks.forEach((task) => {
            allTasks.value.push({
                id: task.id!,
                title: task.title,
                desc: task.content,
                done: task.state === TaskState.COMPLETED,
                from: task.project,
            })
        })
        fuse.setCollection(allTasks.value)
    }

    const handleSearch = async (input: string) => {
        await collectAllTasks()
        searchTasks.value = fuse.search(input)
    }

    const clear = () => {
        searchTasks.value = []
    }

    return {
        searchTasks,
        handleSearch,
        clear,
    }
})
