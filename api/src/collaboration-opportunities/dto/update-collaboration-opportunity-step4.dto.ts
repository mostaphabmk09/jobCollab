import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { OfferType, TermsFlexibility } from '@prisma/client';

export class UpdateCollaborationOpportunityStep4Dto {
  @IsEnum(OfferType)
  offerType: OfferType;

  @IsString()
  @MinLength(20)
  offerDescription: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  equityMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  equityMax?: number;

  @IsOptional()
  @IsString()
  @MinLength(10)
  revenueShareDetails?: string;

  @Type(() => Boolean)
  @IsBoolean()
  financialContributionExpected: boolean;

  @IsOptional()
  @IsString()
  @MinLength(10)
  financialContributionDescription?: string;

  @IsEnum(TermsFlexibility)
  termsFlexibility: TermsFlexibility;
}
