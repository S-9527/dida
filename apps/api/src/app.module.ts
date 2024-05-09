import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { CatsModule } from "./cats/cats.module";
import { TasksModule } from "./task/task.module";

@Module({
  imports: [
    CatsModule,
    TasksModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/dida'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
