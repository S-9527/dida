import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { ProjectsController } from './project.controller'
import { ProjectsService } from './project.service'

@Module({
  imports: [PrismaModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
