import type { Repository } from './dbRepository'
import type { TaskTable } from '@/db/types'

export interface Tag {
    id: number
    name: string
    color: string
    parentTagId: number | null
    loadTasks: () => Promise<TaskTable[]>
}

let repository: Repository | undefined
let tags: Tag[]

export function initTags(tagsReactive: Tag[] = [], _repository: Repository,) {
    repository = _repository
    tags = tagsReactive
}

export function createTags(name: string, color?: string, parentTagId?: number, id = 0): Tag {
    return {
        id,
        name,
        color: color || '',
        parentTagId: parentTagId || null,
        loadTasks: () => {
            return repository!.getTasksByTagId(id)
        },
    }
}

export async function loadTags() {
    return repository!.loadTags().then((tagList) => {
        tagList.forEach((tag) => {
            tags.push(createTags(tag.name, tag.color, tag.parentTagId || undefined, tag.id))
        })
    })
}

export async function addTags(tag: Tag) {
    const pIndex = await repository?.addTag(tag.name, tag.parentTagId, tag.color)

    if (pIndex) {
        tag.id = pIndex
    }

    tags.push(tag)
}

export function updateTags(tag: Omit<Tag, 'loadTasks'>) {
    repository?.updateTag(tag.id, tag)
}

export function findTagByName(name: string | undefined) {
    if (!name) return
    return tags.find(tag => tag.name === name)
}

export function findTagById(id: number) {
    return tags.find(tag => tag.id === id)
}
