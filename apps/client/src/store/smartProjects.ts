import { defineStore } from "pinia";
import { TaskStatus } from "./tasks";
import { fetchAllTasks } from "@/api/task";
import { TasksSelectorType } from "./taskSelector";
import { useTasksSelectorStore } from "@/store";

export interface SmartProject {
  name: string;
  type: TasksSelectorType.smartProject;
}

function createSmartProject(name: string): SmartProject {
  return {
    name,
    type: TasksSelectorType.smartProject,
  };
}

export enum SmartProjectName {
  Complete = "已完成",
  Trash = "垃圾桶",
}
export const completeSmartProject = createSmartProject(
  SmartProjectName.Complete,
);
export const trashSmartProject = createSmartProject(SmartProjectName.Trash);
export const smartProjects = [completeSmartProject, trashSmartProject];

export const useSmartProjects = defineStore("smartProjects", () => {
  const tasksSelectorStore = useTasksSelectorStore();

  function selectProject(projectName: SmartProjectName) {
    switch (projectName) {
      case SmartProjectName.Complete:
        tasksSelectorStore.setCurrentSelector(completeSmartProject);
        break;
      case SmartProjectName.Trash:
        tasksSelectorStore.setCurrentSelector(trashSmartProject);
        break;
    }
  }

  return {
    selectProject,
  };
});

export async function loadSmartProjectTasks(smartProjectName: string) {
  const status =
    smartProjectName === "已完成" ? TaskStatus.COMPLETED : TaskStatus.REMOVED;
  return await fetchAllTasks({
    status,
    sortBy: "updatedAt",
  });
}
