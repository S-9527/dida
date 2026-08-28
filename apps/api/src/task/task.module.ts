import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { TasksController } from './task.controller'
import { TasksService } from './task.service'

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
