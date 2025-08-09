import { Module } from "@nestjs/common";
import { TasksModule } from "../task/task.module";
import { ProjectsModule } from "../project/project.module";
import { UsersModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [
    TasksModule,
    ProjectsModule,
    UsersModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: "dida",
      signOptions: {
        expiresIn: "7d",
      },
    }),
  ],
})
export class AppModule {}
