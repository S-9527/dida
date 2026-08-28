import type { Task, TaskStatus } from '@dida/db'
import type { AuthUser } from '../core/current-user.decorator'
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
import { CurrentUser as CurrentUserDecorator } from '../core/current-user.decorator'
import { LoginGuard } from '../core/login.guard'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TasksService } from './task.service'

@Controller('tasks')
@UseGuards(LoginGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUserDecorator() user: AuthUser,
  ): Promise<Task> {
    return this.tasksService.create(createTaskDto, user)
  }

  @Get()
  findAll(
    @CurrentUserDecorator() user: AuthUser,
    @Query('projectId') projectId?: string,
    @Query('status') status?: TaskStatus,
    @Query('sortBy') sortBy?: string,
  ) {
    return this.tasksService.findAll(user.id, projectId, status, sortBy)
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUserDecorator() user: AuthUser,
  ): Promise<Task> {
    return this.tasksService.findOne(id, user)
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @CurrentUserDecorator() user: AuthUser,
  ): Promise<Task> {
    return this.tasksService.delete(id, user)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUserDecorator() user: AuthUser,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto, user)
  }
}
