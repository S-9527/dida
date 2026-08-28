import { TaskStatus } from '@dida/db'
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsOptional()
  @IsString()
  content?: string

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus

  @IsString()
  @IsNotEmpty()
  projectId: string
}
