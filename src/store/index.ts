import { initProjects } from "@/service/task/project";
import { fetchData } from '@/service/task/data'
export { useTaskStore } from "./useTaskStore";
export { useProjectSelectedStatusStore } from './useProjectSelectedStatusStore.ts'
export { useTaskLeftMenuStatusStore } from './useTaskLeftMenuStatusStore'
export { TaskState } from "@/service/task/task";
export { SmartProjectNames } from "@/service/task/smartProject.ts";
export type { Task } from "@/service/task/task";
export type { Project } from "@/service/task/project";

initProjects(fetchData.projects)