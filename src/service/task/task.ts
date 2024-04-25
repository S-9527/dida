import type { Project } from "./project";
import { completedSmartProject, trashSmartProject } from "./smartProject";
import { Repository } from "@/service/task/dbRepository.ts";
import { findProjectById } from "./project";

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
    projectId: number
}

export function createTask(title: string, id: number = 0, content: string = "", projectId: number = 0, state = TaskState.ACTIVE): Task {
    return {
        id,
        title,
        content,
        state,
        projectId,
    }
}

let repository: Repository | undefined
let tasks: Task[]

export function initTask(tasksReactive: Task[] = [], _repository: Repository) {
    repository = _repository
    tasks = tasksReactive
}

export async function loadTasks(project: Project) {
    await project.loadTasks().then((tasksData: any) => {
        // 每次 loadTasks 的时候都需要清空 tasks
        // 要注意不可以直接对 tasks 赋值， 因为 tasks 是个 reactive 对象 直接赋值的话会造成响应式对象的丢失问题
        tasks.length = 0
        tasksData.forEach(({ title, id, content, projectId: pId, state }: any) => {
            const task = createTask(title, id, content, pId, state)
            tasks.unshift(task)
        })
    })
}

export async function loadAllTasksNotRemoved(): Promise<Task[]> {
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

export function addTask(task: Task, projectId: number) {
    repository?.addTask(task.title, task.content, task.state, projectId)
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

export function getTaskFromProject(task: Task) {
    switch (task.state) {
        case TaskState.REMOVED:
            return trashSmartProject
        case TaskState.COMPLETED:
            return completedSmartProject
        default:
            return findProjectById(task.projectId)
    }
}

export function findTaskById(id: number) {
    return tasks.find((task) => {
        return task.id === id
    })
}

function _removeTask(task: Task) {
    tasks = tasks.filter(t => t.id !== task.id);
}
