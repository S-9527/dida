import type { INestApplication } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './exception.filter'
import { ResponseInterceptor } from './response.interceptor'

export function appGlobalMiddleware(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  )
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())
}
