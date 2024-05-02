import { describe, expect, it, vi, beforeEach } from 'vitest'
import { TaskState } from '../task'
import {
    completedSmartProject,
    initSmartProject,
    trashSmartProject
} from "@/service/task/smartProject.ts";

describe('smartProject', () => {
    let repository: any
    beforeEach(() => {
        repository = {}
        initSmartProject(repository)
    })

    it('should load tasks with completed project ', async () => {
        repository.findTasksByState = vi.fn(() => {
            return Promise.resolve([
                {
                    id: 1,
                    title: '吃饭',
                    content: '',
                    projectId: 1,
                    state: TaskState.COMPLETED,
                },
            ])
        })

        const tasks = await completedSmartProject.loadTasks()

        expect(tasks.length).toBe(1)
        expect(repository.findTasksByState).toBeCalledWith(TaskState.COMPLETED)
    })

    it('should load tasks with trash project ', async () => {
        repository.findTasksByState = vi.fn(() => {
            return Promise.resolve([
                {
                    id: 1,
                    title: '吃饭',
                    content: '',
                    projectId: 1,
                    state: TaskState.REMOVED,
                },
            ])
        })

        const tasks = await trashSmartProject.loadTasks()

        expect(tasks.length).toBe(1)
        expect(repository.findTasksByState).toBeCalledWith(TaskState.REMOVED)
    })
})
