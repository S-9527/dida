import type {
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common'
import {
  Catch,
  HttpException,
} from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status = exception.getStatus()

    const exceptionResponse = exception.getResponse()
    const message
      = exception.message
        ?? `${status >= 500 ? 'Service Error' : 'Client Error'}`

    const errorResponse = {
      data: {},
      message,
      code: -1,
    }

    if (
      typeof exceptionResponse === 'object'
      && exceptionResponse !== null
      && 'message' in exceptionResponse
      && typeof exceptionResponse.message === 'string'
    ) {
      errorResponse.message = exceptionResponse.message
    }

    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(errorResponse)
  }
}
