import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProjectsController } from './project.controller'
import { ProjectsService } from './project.service'
import { Project, ProjectSchema } from './schemas/project.schema'

@Module({
    imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])],
    controllers: [ProjectsController],
    providers: [ProjectsService],
})
export class ProjectsModule {}
