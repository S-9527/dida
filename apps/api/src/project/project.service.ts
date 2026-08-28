import type { AuthUser } from '../core/current-user.decorator'
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(project: { name: string }, user: AuthUser) {
    return this.prisma.client.project.create({
      data: {
        ...project,
        userId: user.id,
      },
    })
  }

  async findAll(userId: string) {
    return this.prisma.client.project.findMany({
      where: { userId },
    })
  }

  async findOne(id: string, user: AuthUser) {
    const project = await this.prisma.client.project.findUnique({
      where: { id },
    })

    if (!project)
      throw new NotFoundException(`Project with ID "${id}" not found`)

    if (project.userId !== user.id)
      throw new ForbiddenException('无权访问该项目')

    return project
  }
}
