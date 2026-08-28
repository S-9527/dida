import type { Task, TaskStatus } from '@dida/db'
import type { CreateTaskDto } from './dto/create-task.dto'
import type { UpdateTaskDto } from './dto/update-task.dto'
import type { TasksService } from './task.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { LoginGuard } from '../core/login.guard'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(LoginGuard)
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto)
  }

  @Get()
  findAll(
    @Query('projectId') projectId?: string,
    @Query('status') status?: TaskStatus,
    @Query('sortBy') sortBy?: string,
  ) {
    return this.tasksService.findAll(projectId, status, sortBy)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Task> {
    return this.tasksService.delete(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto)
  }
}
