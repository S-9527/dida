import { createTask, Task, TaskState } from "./task";
import type { fetchData } from "@/store/task/data.ts";
import { completedProject, findSpecialProjectByName, trashProject } from "@/service/task/specialProject.ts";

export interface Project {
    name: string;
    tasks: Task[];
    state: TaskState;
}

export const projects: Project[] = [];

export function createProject(name: string, state: TaskState = TaskState.ACTIVE,): Project {
    return {
        name,
        state,
        tasks: [],
    }
}

export function addTaskToProject(task: Task, project: Project) {
    project.tasks.unshift(task);
    task.project = project
    task.state = project.state
}

export function addTaskToCompleteProject(task: Task) {
    removeTaskFromProject(task, task.project!)
    addTaskToProject(task, completedProject)
}

export function removeTaskToTrashProject(task: Task) {
    removeTaskFromProject(task, task.project!)
    addTaskToProject(task, trashProject)
}

export function removeTaskFromProject(task: Task, project: Project) {
    const index = project.tasks.indexOf(task)
    if (index !== -1) {
        project.tasks.splice(index, 1)
        task.previousProject = task.project
        task.project = undefined
    }
}

export function findProjectByName(projectName: string) {
    const project = findNormalProjectByName(projectName)
    if (project)
        return project

    return findSpecialProjectByName(projectName)
}

function findNormalProjectByName(projectName: string) {
    return projects.find((project) => {
        return project.name === projectName
    })
}

export function initProjects(data: typeof fetchData) {
    data.projectList.forEach((projectListData) => {
        const project = createProject(projectListData.name)
        projectListData.tasks.forEach(({ title, content, state, id }) => {
            const task = createTask(title, id)
            task.content = content;
            switch (state) {
                case TaskState.ACTIVE:
                    addTaskToProject(task, project)
                    break;
                case TaskState.COMPLETED:
                    task.previousProject = project
                    addTaskToProject(task, completedProject)
                    break;
            }
        });

        projects.push(project);
    });

    data.trash.tasks.forEach(({ title, content, id }) => {
        const task = createTask(title, id);
        task.content = content;
        addTaskToProject(task, trashProject)
    });
}