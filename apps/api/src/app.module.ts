import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { TasksModule } from "./task/task.module";
import { ProjectsModule } from "./project/project.module";
import { UsersModule } from "./user/user.module";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { HttpExceptionFilter } from "./app/execption.filter";
import { TransformInterceptor } from "./app/transfrom.interceptor";
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
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
      AppService
  ],
})
export class AppModule {}
