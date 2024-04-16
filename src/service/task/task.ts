import { addTaskToProject, Project, removeTaskFromProject } from "./project";
import { nanoid } from "nanoid";

export enum TaskState {
    ACTIVE,
    COMPLETED,
    GIVE_UP,
    REMOVED,
}
export interface Task {
    title: string;
    id: string;
    content: string;
    project?: Project;
    state: TaskState;
    previousProject?: Project;
}

export function createTask(title: string, id: string = nanoid()): Task {
    return {
        id,
        title,
        content: '',
        state: TaskState.ACTIVE,
    }
}

export function restoreTask(task: Task) {
    const previousProject = task.previousProject!
    removeTaskFromProject(task, task.project!)
    addTaskToProject(task, previousProject)
}