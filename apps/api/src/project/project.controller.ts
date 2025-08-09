import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from "@nestjs/common";
import { ProjectsService } from "./project.service";
import { Project } from "@prisma/client";
import { CreateProjectDto } from "./dto/create-project.dto";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }
}
