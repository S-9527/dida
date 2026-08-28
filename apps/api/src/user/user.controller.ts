import type { Response } from 'express'
import type { AuthUser } from '../core/current-user.decorator'
import process from 'node:process'
import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CurrentUser as CurrentUserDecorator } from '../core/current-user.decorator'
import { LoginGuard } from '../core/login.guard'
import { SigninUserDto } from './dto/signin-user.dto'
import { SignupUserDto } from './dto/signup-user.dto'
import { UsersService } from './user.service'

const TOKEN_COOKIE = 'dida_token'
const isDev = process.env.NODE_ENV !== 'production'

@Controller('users')
export class UsersController {
  @Inject(JwtService)
  private jwtService: JwtService

  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(LoginGuard)
  me(@CurrentUserDecorator() user: AuthUser) {
    return { username: user.username }
  }

  @Post('signout')
  signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(TOKEN_COOKIE, this.cookieOptions())
    return { username: '' }
  }

  @Post('signin')
  async signin(
    @Body() signinUserDto: SigninUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.usersService.signin(signinUserDto)

    if (!user) {
      throw new HttpException('登录失败', 200)
    }

    const token = await this.signToken(user)
    res.cookie(TOKEN_COOKIE, token, this.cookieOptions())
    return { username: user.username }
  }

  @Post('signup')
  async signup(
    @Body() signupUserDto: SignupUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (signupUserDto.password !== signupUserDto.confirmPassword) {
      throw new HttpException('两次输入的密码不一致', 200)
    }

    const user = await this.usersService.signup(signupUserDto)

    if (!user) {
      throw new HttpException('注册失败', 200)
    }

    const token = await this.signToken(user)
    res.cookie(TOKEN_COOKIE, token, this.cookieOptions())
    return { username: user.username }
  }

  private async signToken(user) {
    return await this.jwtService.signAsync({
      user: {
        id: user.id,
        username: user.username,
      },
    })
  }

  private cookieOptions() {
    return {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: !isDev,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }
  }
}
