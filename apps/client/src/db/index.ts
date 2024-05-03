import type { Table } from 'dexie'
import Dexie from 'dexie'
import { TaskState } from "@/service/task";
import type { ProjectTable, TagTable, TaskTable } from "@/db/types.ts";

export class DexieDB extends Dexie {
    tasks!: Table<TaskTable, number>
    projects!: Table<ProjectTable, number>
    tags!: Table<TagTable, number>

    constructor() {
        super('dida')
        this.version(1).stores({
            tasks: '++id, title, content, projectId, state',
            projects: '++id, name',
            tags: '++id, name, parentTagId, color',
        })
    }
}

let db: DexieDB
export async function setupDB() {
    db = new DexieDB()
    await initData()
}

export function getDB() {
    return db
}

async function initData() {
    await initProjectData()
    await initTagData()
}

async function initProjectData() {
    const projects = await db.projects.toArray()
    if (projects.length !== 0) return

    await db.tasks.add({
        title: '吃饭',
        content: '',
        projectId: 1,
        tagIds: [],
        state: TaskState.ACTIVE,
    })
    await db.tasks.add({
        title: '睡觉',
        content: '',
        projectId: 1,
        tagIds: [2],
        state: TaskState.ACTIVE,
    })
    await db.tasks.add({
        title: '写代码',
        content: '',
        projectId: 1,
        tagIds: [1],
        state: TaskState.ACTIVE,
    })

    await db.tasks.add({
        title: '摸鱼2个小时',
        content: '',
        projectId: 2,
        tagIds: [1, 2],
        state: TaskState.ACTIVE,
    })

    await db.projects.add({
        id: 1,
        name: '生活',
    })
    await db.projects.add({
        id: 2,
        name: '工作',
    })
}

async function initTagData() {
    const tags = await db.tags.toArray()
    if (tags.length !== 0) return

    await db.tags.add({
        id: 1,
        name: '标签1',
        parentTagId: null,
    })
    await db.tags.add({
        id: 2,
        name: '标签2',
        parentTagId: null,
    })
}
