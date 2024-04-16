import { createProject, projects } from "./project";
import { TaskState} from "./task";

export enum SpecialProjectNames {
    Complete = '已完成',
    Failed = '已放弃',
    Trash = '垃圾桶',
    Abstract = '摘要',
}

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

export function findSpecialProjectByName(projectName: string) {
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