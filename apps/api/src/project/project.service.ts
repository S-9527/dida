import type { PrismaService } from '../prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(project: { name: string }) {
    return this.prisma.client.project.create({
      data: project,
    })
  }

  async findAll() {
    return this.prisma.client.project.findMany()
  }

  async findOne(id: string) {
    return this.prisma.client.project.findUnique({
      where: { id },
    })
  }
}
