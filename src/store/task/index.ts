import { initProjects } from "./Project";
import { fetchData } from './data'
export { useTaskStore } from "./useTaskStore";
export { TaskState } from "./Task";
export { SpecialProjectNames } from "./Project";
export type { Task } from "./Task";
export type { Project } from "./Project";

initProjects(fetchData)