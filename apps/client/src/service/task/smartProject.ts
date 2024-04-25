import type { Project } from "./project";
import { TaskState } from "@/service/task/task.ts";
import { Repository } from "@/service/task/dbRepository.ts";

export interface SmartProject extends Project {}

export enum SmartProjectNames {
    Complete = '已完成',
    Failed = '已放弃',
    Trash = '垃圾桶',
    Abstract = '摘要',
}

let repository: Repository | undefined

export function initSmartProject(_repository: Repository) {
    repository = _repository
}


export const trashSmartProject = createTrashSmartProject()
export const completedSmartProject = createCompletedSmartProject()

function createCompletedSmartProject(): SmartProject {
    return {
        id: -1,
        name: SmartProjectNames.Complete,
        loadTasks() {
            return repository!.findTasksByState(TaskState.COMPLETED)
        },
    }
}

export function createTrashSmartProject(): SmartProject {
    return {
        id: -2,
        name: SmartProjectNames.Trash,
        loadTasks() {
            return repository!.findTasksByState(TaskState.REMOVED)
        },
    }
}


const smartProjects = {
    [SmartProjectNames.Complete]: completedSmartProject,
    [SmartProjectNames.Trash]: trashSmartProject,
}

export function findSmartProjectByName(name: string) {
    return smartProjects[name as keyof typeof smartProjects]
}

export function isSmartProject(projectName: string) {
    return !!smartProjects[projectName as keyof typeof smartProjects]
}
