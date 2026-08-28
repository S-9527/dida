import type {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common'
import type { Request } from 'express'
import type { Observable } from 'rxjs'
import {
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request & { user?: unknown }>()

    const authorization = request.header('authorization') || ''

    const bearer = authorization.split(' ')

    if (!bearer || bearer.length < 2)
      throw new UnauthorizedException('登录 token 错误')

    const token = bearer[1]

    try {
      const info = this.jwtService.verify(token)
      request.user = info.user
      return true
    }
    catch {
      throw new UnauthorizedException('登录 token 失效，请重新登录')
    }
  }
}
