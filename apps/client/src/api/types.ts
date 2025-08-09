import type { TaskStatus } from "@/store/tasks";

export interface TaskResponse {
  id: string;
  title: string;
  content: string;
  status: TaskStatus;
  projectId: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  username: string;
  token: string;
}
