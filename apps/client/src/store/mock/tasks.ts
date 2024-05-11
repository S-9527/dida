import { vi } from 'vitest'
import type { Task } from '@/store'
export { TaskStatus } from '../tasks'


const tasks: Task[] = [
    {
        _id: '0',
        title: '吃饭',
        content: '今天吃什么',
        status: TaskStatus.ACTIVE,
        projectId: '1',
        position: 0,
    },
    {
        _id: '1',
        title: '写代码',
        content: '一杯茶，一包烟，一行代码写一天',
        status: TaskStatus.ACTIVE,
        projectId: '1',
        position: 1,
    },
    {
        _id: '2',
        title: '睡觉',
        content: '一睡睡一天',
        status: TaskStatus.COMPLETED,
        projectId: '1',
        position: 2,
    },
]

export const useTasksStore = vi.fn(() => {
    return {
        findAllTasksNotRemoved() {
            return Promise.resolve(tasks)
        },
    }
})
