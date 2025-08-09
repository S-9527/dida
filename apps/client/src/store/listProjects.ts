import { defineStore } from "pinia";
import { ref } from "vue";
import { TaskStatus } from "./tasks";
import { fetchAllProjects, fetchCreateProject } from "@/api/project";
import { fetchAllTasks } from "@/api/task";
import { TasksSelectorType, useTasksSelectorStore } from "@/store";
import { ProjectResponse } from "@/api/types.ts";

export interface ListProject {
  id: string;
  name: string;
  type: TasksSelectorType.listProject;
}

export const useListProjectsStore = defineStore("newProjects", () => {
  const tasksSelectorStore = useTasksSelectorStore();
  const projects = ref<ListProject[]>([]);

  async function init() {
    const rawProjects: any = await fetchAllProjects();
    projects.value = rawProjects.map(mapProjectResponseToProject);

    if (projects.value.length > 0) {
      tasksSelectorStore.setCurrentSelector(projects.value[0]);
    }
  }

  function selectProject(project: ListProject): void;
  function selectProject(projectId: ListProject["id"]): void;
  function selectProject(projectName: ListProject["name"]): void;
  function selectProject(projectOrNameOrId: ListProject | string): void {
    let project: ListProject | undefined;

    project =
      typeof projectOrNameOrId === "string"
        ? findProject(projectOrNameOrId)
        : projectOrNameOrId;

    if (project) tasksSelectorStore.setCurrentSelector(project);
  }

  function findProject(projectIdOrName: string): ListProject | undefined {
    return projects.value.find(
      (p) => p.name === projectIdOrName || p.id === projectIdOrName,
    );
  }

  async function createProject(name: string) {
    if (!name) return;

    const rawProject = await fetchCreateProject(name);
    const newProject = mapProjectResponseToProject(rawProject);
    projects.value.push(newProject);

    selectProject(newProject);
  }

  function checkProjectIsExist(projectName: string) {
    return projects.value.some((p) => {
      return p.name === projectName;
    });
  }

  return {
    projects,
    init,
    createProject,
    selectProject,
    findProject,
    checkProjectIsExist,
  };
});

function mapProjectResponseToProject(rawProject: ProjectResponse): ListProject {
  return {
    id: rawProject.id,
    name: rawProject.name,
    type: TasksSelectorType.listProject,
  };
}

export async function loadListProjectTasks(pId: string) {
  return await fetchAllTasks({
    pId,
    status: TaskStatus.ACTIVE,
  });
}
