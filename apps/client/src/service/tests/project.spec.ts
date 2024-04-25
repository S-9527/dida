import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
    addProject,
    createProject,
    findProjectById,
    findProjectByName,
    initProjects,
    loadProjects,
} from '@/service/task/project'
import type { Project } from '@/service/task/project'

describe('project', () => {
    let listProjects: Project[]
    let repository: any
    beforeEach(() => {
        listProjects = []
        repository = {}
        initProjects(listProjects, repository)
    })
    it('should get project by project name', () => {
        listProjects.push(
            createProject('生活', 1),
            createProject('工作', 2),
        )

        expect(findProjectByName('生活')?.name).toBeTruthy()
        expect(findProjectByName('工作')?.name).toBeTruthy()
    })
    it('should get project by project id', () => {
        listProjects.push(
            createProject('生活', 1),
            createProject('工作', 2),
        )

        expect(findProjectById(1)?.name).toBeTruthy()
        expect(findProjectById(2)?.name).toBeTruthy()
    })
    it('should load projects', async () => {
        repository.loadProjects = vi.fn(() =>
            Promise.resolve([
                {
                    name: '生活',
                    id: 1,
                },
                {
                    id: 2,
                    name: '工作',
                },
            ]),
        )

        await loadProjects()

        expect(listProjects.length).toBe(2)
    })

    it('add project', async () => {
        const pIndex = 1
        repository.addProject = vi.fn(() => Promise.resolve(pIndex))
        const listProject = createProject('过年')

        await addProject(listProject)

        expect(listProjects.length).toBe(1)
        expect(listProjects[0].id).toBe(pIndex)
    })
})
