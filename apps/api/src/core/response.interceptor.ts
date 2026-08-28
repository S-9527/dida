import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common'
import type { Observable } from 'rxjs'
import {
  Injectable,
} from '@nestjs/common'
import { map } from 'rxjs/operators'

export interface Response<T> {
  data: T
  code: number
  message: string
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        data,
        code: 0,
        message: 'success',
      })),
    )
  }
}
