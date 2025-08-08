import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) {}

    async create(project: { name: string }) {
        return this.prisma.project.create({
            data: project,
        })
    }

    async findAll() {
        return this.prisma.project.findMany()
    }

    async findOne(id: string) {
        return this.prisma.project.findUnique({
            where: { id },
        })
    }
}
