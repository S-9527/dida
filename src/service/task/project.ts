import { createTask, addTask } from "./task";
import { completedSmartProject, trashProject } from "./smartProject.ts";
import type { Task } from "./task.ts";

export interface FetchTaskData {
    title: string
    content: string
    id: string
    previousProjectName?: string
}

export interface FetchProjectData {
    name: string
    tasks: FetchTaskData[]
}

export interface Project {
    name: string;
    tasks: Task[];
}

export const projects: Project[] = [];

export function createProject(name: string): Project {
    return {
        name,
        tasks: [],
    }
}

export function addProject(project: Project) {
    projects.push(project)
}

export function findProjectByName(name: string) {
    if (!name) return

    switch (name) {
        case completedSmartProject.name:
            return completedSmartProject
        case trashProject.name:
            return trashProject
        default:
            return projects.find(project => project.name === name)
    }
}

export function initProjects(projectsData: FetchProjectData[]) {
    projects.length = 0

    projectsData.forEach((projectData) => {
        const project = createProject(projectData.name)
        addProject(project)

        projectData.tasks.forEach(({ id, title, content }) => {
            const task = createTask(title, id, content)
            addTask(task, project)
        })
    })
}

export function resetTrashProject() {
    trashProject.tasks = []
}