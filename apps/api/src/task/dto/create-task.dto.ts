import { TaskStatus } from "@prisma/client";

export class CreateTaskDto {
  title: string;
  content: string;
  status: TaskStatus;
  projectId: string;
}
