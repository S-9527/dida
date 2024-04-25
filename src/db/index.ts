import type { Table } from 'dexie'
import Dexie from 'dexie'

export interface Task {
    id?: number
    title: string
    content: string
    projectId: number
    state: number
}

export interface Project {
    id?: number
    name: string
}

export class MySubClassedDexie extends Dexie {
    tasks!: Table<Task>
    projects!: Table<Project>

    constructor() {
        super('myDatabase')
        this.version(1).stores({
            tasks: '++id, title, content, projectId, state',
            projects: '++id, name',
        })
    }
}

let db: MySubClassedDexie
export function initDB() {
    db = new MySubClassedDexie()
}

export function getDB() {
    return db
}
