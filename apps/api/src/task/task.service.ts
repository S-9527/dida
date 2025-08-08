import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import {TaskStatus} from "@prisma/client";

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    async create(createTaskDto: CreateTaskDto) {
        const position = await this.generatePosition(createTaskDto)

        return this.prisma.task.create({
            data: {
                ...createTaskDto,
                position,
            },
        })
    }

    async findAll(
        projectId?: string,
        status?: TaskStatus,
        sortBy = 'position',
    ) {
        const where: {
            projectId?: string
            status?: TaskStatus
        } = {}

        if (projectId)
            where.projectId = projectId

        if (status)
            where.status = status as any

        return this.prisma.task.findMany({
            where,
            orderBy: {
                [sortBy]: 'desc',
            },
        })
    }

    async findOne(id: string) {
        return this.prisma.task.findUnique({
            where: { id },
        })
    }

    async delete(id: string) {
        return this.prisma.task.delete({
            where: { id },
        })
    }

    async update(id: string, updateTaskDto: UpdateTaskDto) {
        try {
            return await this.prisma.task.update({
                where: { id },
                data: updateTaskDto,
            })
        } catch (error) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
    }

    async generatePosition(createTaskDto: CreateTaskDto) {
        const highestPositionTask = await this.prisma.task.findFirst({
            where: { projectId: createTaskDto.projectId },
            orderBy: { position: 'desc' },
        })
        return highestPositionTask ? highestPositionTask.position + 1 : 0
    }
}
