import { describe, it, vi, expect, beforeEach } from "vitest";
import type { Task } from '../task'
import {
    addTask,
    completeTask,
    createTask,
    initTask,
    removeTask,
    restoreTask,
    changeTaskTitle,
    changeTaskContent,
    TaskState
} from "@/service/task/task.ts";


describe('task', () => {
    let tasks: Task[]
    let repository: any
    beforeEach(() => {
        repository = {}
        tasks = []
        initTask(tasks, repository)
    })

    it('should change title of task', () => {
        repository.updateTask = vi.fn()
        const task = createTask('吃饭')

        changeTaskTitle(task, '睡觉')

        expect(task.title).toBe('睡觉')
    })
    it('should change content of task', () => {
        repository.updateTask = vi.fn()
        const task = createTask('吃饭')

        changeTaskContent(task, '干饭干饭')

        expect(task.content).toBe('干饭干饭')
    })
    it('should add task ', () => {
        repository.addTask = vi.fn()

        addTask(createTask('吃饭'))
        addTask(createTask('睡觉'))

        expect(tasks.length).toBe(2)
        expect(tasks[0].title).toBe('睡觉')
        expect(tasks[1].title).toBe('吃饭')
    })

    it('should remove task', () => {
        repository.updateTask = vi.fn()
        const task = createTask('吃饭')
        tasks.push(task)

        removeTask(task)

        expect(task.state).toBe(TaskState.REMOVED)
        expect(tasks.length).toBe(0)
    })

    it('should complete task', () => {
        repository.updateTask = vi.fn()
        const task = createTask('吃饭')
        tasks.push(task)

        completeTask(task)

        expect(task.state).toBe(TaskState.COMPLETED)
        expect(tasks.length).toBe(0)
    })

    it('should restore task', () => {
        repository.updateTask = vi.fn()
        const task = createTask('吃饭')
        task.state = TaskState.COMPLETED
        tasks.push(task)

        restoreTask(task)

        expect(task.state).toBe(TaskState.ACTIVE)
        expect(tasks.length).toBe(0)
    })
})
