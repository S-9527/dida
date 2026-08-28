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
    let message
      = exception.message
        ?? `${status >= 500 ? 'Service Error' : 'Client Error'}`

    if (
      typeof exceptionResponse === 'object'
      && exceptionResponse !== null
    ) {
      const respMessage = (exceptionResponse as { message?: unknown }).message
      if (typeof respMessage === 'string') {
        message = respMessage
      }
      else if (Array.isArray(respMessage)) {
        message = respMessage.filter((m): m is string => typeof m === 'string').join('; ')
      }
    }

    const errorResponse = {
      data: {},
      message,
      code: -1,
    }

    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(errorResponse)
  }
}
