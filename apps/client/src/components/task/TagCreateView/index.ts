import { dialogInit } from '../helper'
import TagCreateView from './TagCreatedView.vue'
import type { Tag } from '@/service/task/tag.ts'

export interface TagCreateViewOptions {
    show?: boolean
    tag?: Omit<Tag, 'loadTasks'>
}

export function tagCreateViewDialog(options: TagCreateViewOptions = {}) {
    return dialogInit(TagCreateView, options)
}
