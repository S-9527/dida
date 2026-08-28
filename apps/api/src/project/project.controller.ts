import type { Project } from '@dida/db'
import type { AuthUser } from '../core/current-user.decorator'
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { CurrentUser as CurrentUserDecorator } from '../core/current-user.decorator'
import { LoginGuard } from '../core/login.guard'
import { CreateProjectDto } from './dto/create-project.dto'
import { ProjectsService } from './project.service'

@Controller('projects')
@UseGuards(LoginGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUserDecorator() user: AuthUser,
  ): Promise<Project> {
    return this.projectsService.create(createProjectDto, user)
  }

  @Get()
  findAll(@CurrentUserDecorator() user: AuthUser) {
    return this.projectsService.findAll(user.id)
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUserDecorator() user: AuthUser,
  ): Promise<Project> {
    return this.projectsService.findOne(id, user)
  }
}
