import { Module } from "@nestjs/common";
import { ProjectsController } from "./project.controller";
import { ProjectsService } from "./project.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
