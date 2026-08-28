import type { TaskStatus } from '@dida/db'
import type { PrismaService } from '../prisma/prisma.service'
import type { CreateTaskDto } from './dto/create-task.dto'
import type { UpdateTaskDto } from './dto/update-task.dto'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const position = await this.generatePosition(createTaskDto)

    return this.prisma.client.task.create({
      data: {
        ...createTaskDto,
        position,
      },
    })
  }

  async findAll(projectId?: string, status?: TaskStatus, sortBy = 'position') {
    const where: {
      projectId?: string
      status?: TaskStatus
    } = {}

    if (projectId)
      where.projectId = projectId

    if (status)
      where.status = status as any

    return this.prisma.client.task.findMany({
      where,
      orderBy: {
        [sortBy]: 'desc',
      },
    })
  }

  async findOne(id: string) {
    return this.prisma.client.task.findUnique({
      where: { id },
    })
  }

  async delete(id: string) {
    return this.prisma.client.task.delete({
      where: { id },
    })
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      return await this.prisma.client.task.update({
        where: { id },
        data: updateTaskDto,
      })
    }
    catch {
      throw new NotFoundException(`Task with ID "${id}" not found`)
    }
  }

  async generatePosition(createTaskDto: CreateTaskDto) {
    const highestPositionTask = await this.prisma.client.task.findFirst({
      where: { projectId: createTaskDto.projectId },
      orderBy: { position: 'desc' },
    })
    return highestPositionTask ? highestPositionTask.position + 1 : 0
  }
}
