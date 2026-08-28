import type { TaskStatus } from '@dida/db'
import type { AuthUser } from '../core/current-user.decorator'
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, user: AuthUser) {
    const position = await this.generatePosition(createTaskDto, user.id)

    return this.prisma.client.task.create({
      data: {
        ...createTaskDto,
        position,
        userId: user.id,
      },
    })
  }

  async findAll(userId: string, projectId?: string, status?: TaskStatus, sortBy = 'position') {
    const where: {
      projectId?: string
      status?: TaskStatus
      userId: string
    } = { userId }

    if (projectId)
      where.projectId = projectId

    if (status)
      where.status = status

    return this.prisma.client.task.findMany({
      where,
      orderBy: {
        [sortBy]: 'desc',
      },
    })
  }

  async findOne(id: string, user: AuthUser) {
    const task = await this.prisma.client.task.findUnique({
      where: { id },
    })

    if (!task)
      throw new NotFoundException(`Task with ID "${id}" not found`)

    this.ensureOwnership(task.userId, user)

    return task
  }

  async delete(id: string, user: AuthUser) {
    const task = await this.findOne(id, user)
    return this.prisma.client.task.delete({
      where: { id: task.id },
    })
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user: AuthUser) {
    const task = await this.findOne(id, user)

    return this.prisma.client.task.update({
      where: { id: task.id },
      data: updateTaskDto,
    })
  }

  async generatePosition(createTaskDto: CreateTaskDto, userId: string) {
    const highestPositionTask = await this.prisma.client.task.findFirst({
      where: { projectId: createTaskDto.projectId, userId },
      orderBy: { position: 'desc' },
    })
    return highestPositionTask ? (highestPositionTask.position ?? 0) + 1 : 0
  }

  private ensureOwnership(taskUserId: string, user: AuthUser) {
    if (taskUserId !== user.id)
      throw new ForbiddenException('无权访问该任务')
  }
}
