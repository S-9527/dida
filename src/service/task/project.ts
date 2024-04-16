import { createTask, Task, TaskState } from "./task";
import type { fetchData } from "@/store/task/data.ts";

export enum SpecialProjectNames {
    Complete = '已完成',
    Failed = '已放弃',
    Trash = '垃圾桶',
    Abstract = '摘要',
}

export interface Project {
    name: string;
    tasks: Task[];
    state: TaskState;
}

export const projects: Project[] = [];

// 完成的任务列表
export const completedProject = createProject(
    SpecialProjectNames.Complete,
    TaskState.COMPLETED,
)
// 删除的任务列表
export const trashProject = createProject(
    SpecialProjectNames.Trash,
    TaskState.REMOVED,
)

export const failedProject = createProject(
    SpecialProjectNames.Failed,
    TaskState.REMOVED,
)

export const abstractProject = createProject(
    SpecialProjectNames.Abstract,
    TaskState.REMOVED,
)

function createProject(name: string, state: TaskState = TaskState.ACTIVE,): Project {
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
    switch (projectName) {
        case SpecialProjectNames.Complete:
            return completedProject
        case SpecialProjectNames.Trash:
            return trashProject
        case SpecialProjectNames.Failed:
            return failedProject
        case SpecialProjectNames.Abstract:
            return abstractProject
        default: {
            const project = projects.find((project) => project.name === projectName)
            if (project) return project
        }
    }
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