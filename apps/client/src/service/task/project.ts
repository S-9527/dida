import { Repository } from "@/service/task/dbRepository.ts";

export interface Project {
    id?: number;
    name: string;
    loadTasks: () => any
}

let repository: Repository | undefined
let projects: Project[]

export function initProjects(projectsReactive: Project[] = [], _repository: Repository) {
    repository = _repository
    projects = projectsReactive
}

export async function loadProjects() {
    return repository!.loadProjects().then((projectList) => {
        projectList.forEach((project: any) => {
            projects.push(createProject(project.name, project.id))
        })
    })
}

export function createProject(name: string, id: number): Project {
    return {
        id,
        name,
        loadTasks: () => {
            return repository!.getTasks(id)
        },
    }
}

export function addProject(project: Project) {
    projects.push(project)
}

export function findProjectByName(name: string | undefined) {
    if (!name) return

    return projects.find(project => project.name === name)
}

export function findProjectById(id: number) {
    return projects.find(project => project.id === id)
}
