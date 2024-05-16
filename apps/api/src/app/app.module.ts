import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { TasksModule } from "../task/task.module";
import { ProjectsModule } from "../project/project.module";
import { UsersModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TasksModule,
    ProjectsModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/dida'),
    JwtModule.register({
      global: true,
      secret: 'dida',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
})
export class AppModule {}
