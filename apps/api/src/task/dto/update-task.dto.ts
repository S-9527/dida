import { TaskStatus } from '@dida/db'
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  content?: string

  @IsOptional()
  @IsString()
  projectId?: string

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus

  @IsOptional()
  @IsNumber()
  position?: number
}
