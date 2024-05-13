import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
    fetchAllTasks,
    fetchCompleteTask,
    fetchCreateTask, fetchMoveTaskToProject,
    fetchRemoveTask,
    fetchRestoreTask,
    fetchUpdateTaskContent,
    fetchUpdateTaskPosition,
    fetchUpdateTaskTitle,
} from '@/api/task.ts'
import { useTasksSelectorStore } from "@/store/taskSelector.ts";
import { TaskResponse } from "@/api/types.ts";

export enum TaskStatus {
    ACTIVE = 'active',
    COMPLETED = 'completed',
    REMOVED = 'removed',
}

export interface Task {
    id: string
    title: string
    status: TaskStatus
    content: string
    projectId: string
    position: number
}

export const useTasksStore = defineStore('tasksStore', () => {
    const tasksSelectorStore = useTasksSelectorStore()

    const tasks = ref<Task[]>([])
    const currentActiveTask = ref<Task>()

    async function updateTasks(_tasks: TaskResponse[]) {
        tasks.value = _tasks.map(mapTaskResponseToTask)
    }

    async function addTask(title: string): Promise<Task | undefined> {
        if (!tasksSelectorStore.currentSelector) return
        if (tasksSelectorStore.currentSelector.type !== 'listProject') return

        const newRawTask = await fetchCreateTask(title, tasksSelectorStore.currentSelector.id)
        const task = mapTaskResponseToTask(newRawTask)
        tasks.value.unshift(task)
        changeActiveTask(task)

        return task
    }

    function changeActiveTask(taskId: Task['id']): void
    function changeActiveTask(task: Task | undefined): void
    function changeActiveTask(taskOrTaskId: Task | Task['id'] | undefined): void {
        let task: Task | undefined

        task = typeof taskOrTaskId === 'string'
            ? tasks.value.find(t => t.id === taskOrTaskId)
            : taskOrTaskId;

        currentActiveTask.value = task
    }

    async function completeTask(task: Task) {
        await fetchCompleteTask(task.id)
        task.status = TaskStatus.COMPLETED
        tasks.value = tasks.value.filter(t => t.id !== task.id)
        changeActiveTask(undefined)
    }

    async function restoreTask(task: Task) {
        await fetchRestoreTask(task.id)
        task.status = TaskStatus.ACTIVE

        tasks.value = tasks.value.filter(t => t.id !== task.id)
    }
    async function cancelCompleteTask(task: Task) {
        function taskPositionRestorer(task: Task) {
            const lastTask = tasks.value[tasks.value.length - 1]
            if (task.position < lastTask.position) {
                tasks.value.push(task)
                return
            }

            for (let i = 0; i < tasks.value.length; i++) {
                if (task.position > tasks.value[i].position) {
                    const currentIndex = tasks.value.indexOf(tasks.value[i])
                    tasks.value.splice(currentIndex, 0, task)
                    return
                }
            }
        }

        await fetchRestoreTask(task.id)
        task.status = TaskStatus.ACTIVE

        taskPositionRestorer(task)
    }

    async function removeTask(task: Task) {
        await fetchRemoveTask(task.id)
        task.status = TaskStatus.REMOVED
        tasks.value = tasks.value.filter(t => t.id !== task.id)
        changeActiveTask(undefined)
    }

    async function updateTaskTitle(task: Task, newTitle: string) {
        const oldTitle = task.title
        if (newTitle === oldTitle) return

        await fetchUpdateTaskTitle(task.id, newTitle)
        task.title = newTitle
    }

    async function updateTaskContent(task: Task, newContent: string) {
        const oldContent = task.content
        if (newContent === oldContent) return

        await fetchUpdateTaskContent(task.id, newContent)
        task.content = newContent
    }

    async function updateTaskPosition(task: Task, newPosition: number) {
        const oldPosition = task.position
        if (newPosition === oldPosition) return

        await fetchUpdateTaskPosition(task.id, newPosition)
        task.position = newPosition
    }

    async function findAllTasksNotRemoved() {
        const activeTasks = await fetchAllTasks({
            status: TaskStatus.ACTIVE
        })

        const completedTasks = await fetchAllTasks({
            status: TaskStatus.COMPLETED
        })

        return [
            ...activeTasks.map(mapTaskResponseToTask),
            ...completedTasks.map(mapTaskResponseToTask)
        ]
    }

    async function moveTaskToProject(task: Task, projectId: string) {
        await fetchMoveTaskToProject(task.id, projectId)
        task.projectId = projectId

        tasks.value = tasks.value.filter(t => t.id !== task.id)
    }

    return {
        tasks,
        currentActiveTask,
        addTask,
        removeTask,
        updateTasks,
        changeActiveTask,
        completeTask,
        restoreTask,
        moveTaskToProject,
        cancelCompleteTask,
        updateTaskTitle,
        updateTaskContent,
        updateTaskPosition,
        findAllTasksNotRemoved,
    }
})

function mapTaskResponseToTask(rawTask: TaskResponse): Task {
    return {
        id: rawTask._id,
        title: rawTask.title,
        content: rawTask.content,
        status: rawTask.status,
        projectId: rawTask.projectId,
        position: rawTask.position,
    }
}
