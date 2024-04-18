import type { Project } from "./project";

export enum SmartProjectNames {
    Complete = '已完成',
    Failed = '已放弃',
    Trash = '垃圾桶',
    Abstract = '摘要',
}

interface CompletedProject extends Project {
    name: '已完成'
}

interface TrashProject extends Project {
    name: '垃圾桶'
}

export const trashProject = createTrashProject()
export const completedProject = createCompletedProject()

export function createCompletedProject(): CompletedProject {
    return {
        name: '已完成',
        tasks: [],
    }
}

export function createTrashProject(): TrashProject {
    return {
        name: '垃圾桶',
        tasks: [],
    }
}