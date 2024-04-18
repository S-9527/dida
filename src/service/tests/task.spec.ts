import { describe, it, expect } from "vitest";
import { addTask, completeTask, createTask, removeTask, restoreTask, TaskState } from "@/service/task/task.ts";
import { createProject, resetCompletedProject, resetTrashProject } from "@/service/task/project.ts";
import { completedProject, trashProject } from "@/service/task/smartProject.ts";


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

        removeTask(task)

        expect(project.tasks.length).toBe(0)
        expect(trashProject!.tasks[0].title).toBe('coding')

        resetTrashProject()
    })

    it('complete task', () => {
        const project = createProject('one')
        const task = createTask('coding')
        addTask(task, project)

        completeTask(task)

        expect(project.tasks.length).toBe(0)
        expect(completedProject!.tasks[0].title).toBe('coding')

        resetCompletedProject()
    })

    it('restore task', () => {
        const project = createProject('one')
        const task = createTask('coding')
        addTask(task, project)
        completeTask(task)

        restoreTask(task)

        expect(completedProject.tasks.length).toBe(0)
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