import { describe, it, expect } from "vitest";
import { createTask } from './task.ts'
import { createProject, addTask, removeTask, resetTrashProject, trashProject } from './project.ts'


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
        const taskTitle = 'coding'
        const task = createTask(taskTitle)

        addTask(task, project)

        expect(project.tasks[0].title).toEqual(taskTitle)
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
})