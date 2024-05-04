import { dbRepository } from "@/service/task/dbRepository.ts";
import { initSmartProject } from "@/service/task/smartProject.ts";
import { initProjects, Project } from "@/service/task/project.ts";
import { initTask, Task } from "@/service/task/task.ts";
import { initTags, Tag } from "@/service/task/tag.ts";
export type { SmartProjectNames, SmartProject } from './smartProject'
export { loadProjects, createProject, addProject } from './project'
export { loadTags, createTags, addTags, updateTags, deleteTag } from './tag'
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
    findAllTasksNotRemoved,
    findTaskById,
} from './task'
export type { Task } from './task'
export type { Project } from './project'
export type { Tag } from './tag'

export function init(projectsReactive: Project[], tasksReactive: Task[], tagsReactive: Tag[]) {
    initProjects(projectsReactive, dbRepository)
    initTags(tagsReactive, dbRepository)
    initSmartProject(dbRepository)
    initTask(tasksReactive, dbRepository)
}
