import { Module } from '@nestjs/common'
import { TasksController } from './task.controller'
import { TasksService } from './task.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
    imports: [PrismaModule],
    controllers: [TasksController],
    providers: [TasksService],
})
export class TasksModule {}
