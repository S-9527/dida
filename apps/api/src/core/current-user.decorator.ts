import type { ExecutionContext } from '@nestjs/common'
import type { Request } from 'express'
import { createParamDecorator } from '@nestjs/common'

export interface AuthUser {
  id: string
  username: string
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest<Request & { user?: AuthUser }>()
    return request.user!
  },
)
