import { Transform } from 'class-transformer';
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { ProjectStage } from '@prisma/client';

export class UpdateCollaborationOpportunityStep1Dto {
  @Transform(({ value }) => value?.trim())
  @IsString()
  @MinLength(5)
  @MaxLength(120)
  title: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @MinLength(10)
  @MaxLength(180)
  oneLinePitch: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @MinLength(80)
  description: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @MaxLength(80)
  projectCategory: string;

  @IsEnum(ProjectStage)
  projectStage: ProjectStage;
}
