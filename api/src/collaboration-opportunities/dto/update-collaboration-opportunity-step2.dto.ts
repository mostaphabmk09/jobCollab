import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { CollaborationNeedType, CollaborationType } from '@prisma/client';

class CollaborationRequirementDto {
  @IsEnum(CollaborationType)
  collaborationType: CollaborationType;

  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(CollaborationNeedType, { each: true })
  needTypes: CollaborationNeedType[];
}

export class UpdateCollaborationOpportunityStep2Dto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CollaborationRequirementDto)
  requirements: CollaborationRequirementDto[];
}
