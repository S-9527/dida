import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ProjectsService } from './project.service'
import { Project } from './schemas/project.schema'

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    async create(@Body() project: Project): Promise<Project> {
        return this.projectsService.create(project)
    }

    @Get()
    findAll() {
        return this.projectsService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Project> {
        return this.projectsService.findOne(id)
    }
}
