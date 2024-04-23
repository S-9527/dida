import { describe, expect, it } from 'vitest'
import { TaskState } from '../task'
import { initProjects } from "@/service/task/project.ts";
import {
    completedSmartProject,
    initCompletedSmartProject,
    initTrashSmartProject,
    trashSmartProject
} from "@/service/task/smartProject.ts";

describe('smartProject', () => {
    it('init completed project ', () => {
        const firstTaskTitle = '欢迎加入 DiDa'
        const secondTaskTitle = '第二个完成测试'
        initProjects([
            {
                name: '快捷',
                tasks: [],
            },
        ])

        initCompletedSmartProject({
            tasks: [
                {
                    title: firstTaskTitle,
                    content: '',
                    id: crypto.randomUUID(),
                    previousProjectName: '快捷',
                },
                {
                    title: secondTaskTitle,
                    content: '',
                    id: crypto.randomUUID(),
                    previousProjectName: '快捷',
                },
            ],
        })

        expect(completedSmartProject.tasks.length).toBe(2)
        expect(completedSmartProject.tasks[0].title).toBe(firstTaskTitle)
        expect(completedSmartProject.tasks[0].state).toBe(TaskState.COMPLETED)
        expect(completedSmartProject.tasks[0].previousProject).toBeTruthy()

        expect(completedSmartProject.tasks[1].title).toBe(secondTaskTitle)
    })
    it('init trash project ', () => {
        const firstTaskTitle = '我是第一个被删除的任务'
        const secondTaskTitle = '我是第二个被删除的任务'
        initProjects([
            {
                name: '快捷',
                tasks: [],
            },
        ])

        initTrashSmartProject({
            name: '垃圾桶',
            tasks: [
                {
                    title: firstTaskTitle,
                    content: '',
                    id: crypto.randomUUID(),
                    previousProjectName: '快捷',
                },
                {
                    title: secondTaskTitle,
                    content: '',
                    id: crypto.randomUUID(),
                    previousProjectName: '快捷',
                },
            ],
        })

        expect(trashSmartProject.tasks.length).toBe(2)
        expect(trashSmartProject.tasks[0].title).toBe(firstTaskTitle)
        expect(trashSmartProject.tasks[0].state).toBe(TaskState.REMOVED)
        expect(trashSmartProject.tasks[0].previousProject).toBeTruthy()

        expect(trashSmartProject.tasks[1].title).toBe(secondTaskTitle)
    })
})
