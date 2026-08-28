import type { ProjectResponse } from './types'
import { http } from './http'

export function fetchAllProjects() {
  return http.get<ProjectResponse[], ProjectResponse[]>('/projects')
}

export function fetchCreateProject(name: string) {
  return http.post<ProjectResponse, ProjectResponse>('/projects', {
    name,
  })
}
