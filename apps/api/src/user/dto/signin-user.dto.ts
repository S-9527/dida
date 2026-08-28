import { IsNotEmpty, IsString, Length } from 'class-validator'

export class SigninUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 25)
  username: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  password: string
}
