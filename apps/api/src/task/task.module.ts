import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TasksController } from './task.controller'
import { TasksService } from './task.service'
import { Task, TaskSchema } from './schemas/task.schema'

@Module({
    imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
    controllers: [TasksController],
    providers: [TasksService],
})
export class TasksModule {}
