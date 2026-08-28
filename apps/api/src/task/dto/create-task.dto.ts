import type { TaskStatus } from '@dida/db'

export class CreateTaskDto {
  title: string
  content: string
  status: TaskStatus
  projectId: string
}
