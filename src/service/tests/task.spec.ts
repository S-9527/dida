import { describe, it, expect } from "vitest";
import { addTask, completeTask, createTask, removeTask, restoreTask, TaskState } from "@/service/task/task.ts";
import { createProject } from "@/service/task/project.ts";
import {
    completedSmartProject,
    initCompletedSmartProject,
    initTrashSmartProject, trashSmartProject
} from "@/service/task/smartProject.ts";


describe('task', () => {
    it('should edit title of task', () => {
        const task = createTask('coding')

        task.title = 'eat'

        expect(task.title).toBe('eat')
    })
    it('should edit content of task', () => {
        const task = createTask('coding')
        task.content = 'hi'

        expect(task.content).toBe('hi')
    })
    it('add task to project ', () => {
        const project = createProject('one')
        const firstTask = createTask('coding')
        addTask(firstTask, project)
        expect(project.tasks[0].title).toEqual('coding')

        const secondTask = createTask('play game')
        addTask(secondTask, project)
        expect(project.tasks[0].title).toEqual('play game')
    })

    it('remove task', () => {
        const project = createProject('one')
        const task = createTask('coding')
        addTask(task, project)
        initTrashSmartProject()
        removeTask(task)

        expect(project.tasks.length).toBe(0)
        expect(trashSmartProject!.tasks[0].title).toBe('coding')
    })

    it('complete task', () => {
        const project = createProject('one')
        const task = createTask('coding')
        addTask(task, project)
        initCompletedSmartProject()

        completeTask(task)

        expect(project.tasks.length).toBe(0)
        expect(completedSmartProject!.tasks[0].title).toBe('coding')
    })

    it('restore task', () => {
        const project = createProject('one')
        const task = createTask('coding')
        initCompletedSmartProject()

        addTask(task, project)
        completeTask(task)

        restoreTask(task)

        expect(completedSmartProject.tasks.length).toBe(0)
        expect(project!.tasks[0].title).toBe('coding')
    })

    it('task state', () => {
        const task = createTask('coding')
        expect(task.state).toEqual(TaskState.ACTIVE)

        const project = createProject('one')
        addTask(task, project)
        expect(task.state).toEqual(TaskState.ACTIVE)

        completeTask(task)
        expect(task.state).toEqual(TaskState.COMPLETED)

        removeTask(task)
        expect(task.state).toEqual(TaskState.REMOVED)
    })
})
