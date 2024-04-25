import { dbRepository } from "@/service/task/dbRepository.ts";
import { initSmartProject } from "@/service/task/smartProject.ts";
import { initProjects } from "@/service/task/project.ts";
import { initTask } from "@/service/task/task.ts";
export type { SmartProjectNames, SmartProject } from './smartProject'
export { loadProjects } from './project'
export {
    TaskState,
    addTask,
    removeTask,
    restoreTask,
    completeTask,
    createTask,
    changeTaskTitle,
    changeTaskContent,
    loadTasks,
    loadAllTasksNotRemoved,
    getTaskFromProject,
    findTaskById,
} from './task'
export type { Task } from './task'
export type { Project } from './project'

export function init(projectsReactive: Project[], tasksReactive: Task[]) {
    initProjects(projectsReactive, dbRepository)
    initSmartProject(dbRepository)
    initTask(tasksReactive, dbRepository)
}