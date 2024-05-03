import type { Project } from "./project";
import { completedSmartProject, trashSmartProject } from "./smartProject";
import { Repository } from "@/service/task/dbRepository.ts";
import { findProjectById } from "./project";
import { Tag } from "@/service/task/tag.ts";

export enum TaskState {
    ACTIVE,
    COMPLETED,
    GIVE_UP,
    REMOVED,
}
export interface Task {
    id: number;
    title: string;
    state: TaskState;
    content: string;
    project: Project | undefined
}

export function createTask(title: string, id: number = 0, content: string = "", projectId: number = 0, state = TaskState.ACTIVE): Task {
    return {
        id,
        title,
        content,
        state,
        project: getTaskFromProject(projectId, state),
    }
}

let repository: Repository | undefined
let tasks: Task[]

export function initTask(tasksReactive: Task[] = [], _repository: Repository) {
    repository = _repository
    tasks = tasksReactive
}

export async function loadTasks(category: Project | Tag) {
    const allTasks = await category.loadTasks()
    tasks.length = 0
    allTasks.forEach(({ title, id, content, projectId, state }) => {
        const task = createTask(title, id, content, projectId, state)
        tasks.unshift(task)
    })
}

export async function findAllTasksNotRemoved(): Promise<Task[]> {
    const tasks = (await repository?.getAllTasks()) || []

    return tasks
        .filter(({ state }) => {
            return state !== TaskState.REMOVED
        })
        .map(({ projectId, title, id, content, state }) => {
            return createTask(title, id, content, projectId, state)
        })
}

export function changeTaskTitle(task: Task, title: string) {
    repository?.updateTask(task.id, { title })
    task.title = title
}

export function changeTaskContent(task: Task, content: string) {
    repository?.updateTask(task.id, { content })
    task.content = content
}

export function addTask(task: Task, projectId: number = -1, tags: number[] = []) {
    repository?.addTask(task.title, task.content, task.state, projectId, tags)
    tasks.unshift(task)
}

export function removeTask(task: Task) {
    repository?.updateTask(task.id, { state: TaskState.REMOVED })
    task.state = TaskState.REMOVED
    _removeTask(task)
}

export function completeTask(task: Task) {
    repository?.updateTask(task.id, { state: TaskState.COMPLETED })
    task.state = TaskState.COMPLETED
    _removeTask(task)
}

export function restoreTask(task: Task) {
    repository?.updateTask(task.id, { state: TaskState.ACTIVE })
    task.state = TaskState.ACTIVE
    _removeTask(task)
}

export function getTaskFromProject(projectId: number, state: TaskState) {
    switch (state) {
        case TaskState.REMOVED:
            return trashSmartProject
        case TaskState.COMPLETED:
            return completedSmartProject
        default:
            return findProjectById(projectId)
    }
}

export function findTaskById(id: number) {
    return tasks.find((task) => {
        return task.id === id
    })
}

function _removeTask(task: Task) {
    const len = tasks.length - 1
    for (let i = len; i >= 0; i--) {
        if (task.id === tasks[i].id) {
            tasks.splice(i, 1)
        }
    }
}
