import { initProjects } from "@/service/task/project";
import { fetchData } from '@/service/task/data'
export { useTaskStore } from "./useTaskStore";
export { useProjectSelectedStatusStore } from './useTaskStatus.ts'
export { TaskState } from "@/service/task/task";
export { SpecialProjectNames } from "@/service/task/specialProject";
export type { Task } from "@/service/task/task";
export type { Project } from "@/service/task/project";

initProjects(fetchData)