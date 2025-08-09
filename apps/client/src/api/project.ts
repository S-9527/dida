import { http } from "./http";
import { ProjectResponse } from "@/api/types.ts";

export function fetchAllProjects() {
  return http.get<ProjectResponse[], ProjectResponse[]>("/projects");
}

export function fetchCreateProject(name: string) {
  return http.post<ProjectResponse, ProjectResponse>("/projects", {
    name,
  });
}
