import process from 'node:process'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from '../prisma/prisma.module'
import { ProjectsModule } from '../project/project.module'
import { TasksModule } from '../task/task.module'
import { UsersModule } from '../user/user.module'

@Module({
  imports: [
    TasksModule,
    ProjectsModule,
    UsersModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'dida-dev-only-secret',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
})
export class AppModule {}
