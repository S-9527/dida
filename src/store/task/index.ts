import { initProjects } from "./project";
import { fetchData } from './data'
export { useTaskStore } from "./useTaskStore";
export { TaskState } from "./Task";
export { SpecialProjectNames } from "./project";
export type { Task } from "./Task";
export type { Project } from "./project";

initProjects(fetchData)