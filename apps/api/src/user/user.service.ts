import { HttpException, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { md5 } from "../utils/md5";
import { SignupUserDto } from "./dto/signup-user.dto";
import { SigninUserDto } from "./dto/signin-user.dto";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async signin(signinUserDto: SigninUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: signinUserDto.username,
      },
    });

    if (!user) throw new HttpException("Invalid username or password", 200);

    if (user.password !== md5(signinUserDto.password))
      throw new HttpException("Invalid username or password", 200);

    return user;
  }

  async signup(signupUserDto: SignupUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        username: signupUserDto.username,
      },
    });

    if (existingUser) throw new HttpException("用户已存在", 200);

    try {
      return await this.prisma.user.create({
        data: {
          username: signupUserDto.username,
          password: md5(signupUserDto.password),
        },
      });
    } catch (e) {
      this.logger.error("用户注册失败", e);
      if (e.code === "P2002") {
        throw new HttpException("用户名已存在", 200);
      }
      throw new HttpException("注册失败", 200);
    }
  }
}
