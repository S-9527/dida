import { initTask } from "@/service/task/task.ts";
export { useTaskStore } from "./useTaskStore";
export { useProjectSelectedStatusStore } from './useProjectSelectedStatusStore.ts'
export { useTaskLeftMenuStatusStore } from './useTaskLeftMenuStatusStore'
export { useThemeStore, getGlobalThemeStore } from './useTheme'
export { useCommandStore } from './useCommandStore'
export { useSearchStore } from './useSearch'
export { useSettingsStore } from './useSettingsStore'
export { TaskState } from "@/service/task/task";
export { SmartProjectNames } from "@/service/task/smartProject.ts";
export type { Task } from "@/service/task/task";
export type { Project } from "@/service/task/project";

export async function initStore() {
    await initTask()
}
