import { Repository } from "@/service/task/dbRepository.ts";
import { ProjectTable, TaskTable } from "@/db/types.ts";

export interface Project {
    id: number;
    name: string;
    loadTasks: () => Promise<TaskTable[]>
}

let repository: Repository | undefined
let projects: Project[]

export function initProjects(projectsReactive: Project[] = [], _repository: Repository) {
    repository = _repository
    projects = projectsReactive
}

export async function loadProjects() {
    return repository!.loadProjects().then((projectList) => {
        projectList.length = 0
        projectList.forEach((project: ProjectTable) => {
            projects.push(createProject(project.name, project.id))
        })
    })
}

export function createProject(name: string, id: number = 0): Project {
    return {
        id,
        name,
        loadTasks: () => {
            return repository!.getTasks(id)
        },
    }
}

export async function addProject(project: Project) {
    const pIndex = await repository?.addProject(project.name)

    if (pIndex) {
        project.id = pIndex
    }

    projects.push(project)
}

export function findProjectByName(name: string | undefined) {
    if (!name) return

    return projects.find(project => project.name === name)
}

export function findProjectById(id: number) {
    return projects.find(project => project.id === id)
}
