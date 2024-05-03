import { TaskState } from './task'
import { getDB } from '@/db'
import { PromiseExtended } from "dexie";
import type { ProjectTable, TagTable, TaskTable } from "@/db/types.ts";

export interface Repository {
    loadProjects: () => Promise<ProjectTable[]>
    getTasks: (projectId: number) => Promise<TaskTable[]>
    getAllTasks: () => Promise<TaskTable[]>
    findTasksByState: (state: TaskState) => Promise<TaskTable[]>
    addTask: (
        title: string,
        content: string,
        state: TaskState,
        projectId: number,
        tagIds: number[],
    ) => void
    updateTask: (id: number, changes: any) => void
    addProject: (name: string) => PromiseExtended<number>

    loadTags: () => Promise<TagTable[]>
    getTasksByTagId: (tagId: number) => Promise<TaskTable[]>
    addTag: (name: string, parentTagId: number | null, color: string) => PromiseExtended<number>
}

export const dbRepository: Repository = {
    addProject(name: string) {
        return getDB().projects.add({ name })
    },

    async loadProjects() {
        return getDB().projects.toArray()
    },

    async getTasks(projectId: number) {
        return getDB().tasks
            .filter((task) => {
                return task.projectId === projectId && task.state === TaskState.ACTIVE
            })
            .toArray()
    },

    async getAllTasks() {
        return getDB().tasks.toArray()
    },

    addTag(name, parentTagId, color) {
        return getDB().tags.add({ name, parentTagId, color })
    },

    async loadTags() {
        return getDB().tags.toArray()
    },

    async getTasksByTagId(tagId: number) {
        return getDB().tasks.filter(task => task.tagIds.includes(tagId) && task.state === TaskState.ACTIVE).toArray()
    },

    async findTasksByState(state: TaskState) {
        return getDB().tasks
            .filter((task) => {
                return task.state === state
            })
            .toArray()
    },

    addTask(title: string, content: string, state = TaskState.ACTIVE, projectId: number, tagIds: number[]) {
        return getDB().tasks.add({
            title,
            content,
            projectId,
            state,
            tagIds
        })
    },

    async updateTask(id: number, changes = {}) {
        return getDB().tasks.update(id, changes)
    },
}
