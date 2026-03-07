import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum RealEstateAxisDto {
  ACHAT = 'ACHAT',
  GESTION = 'GESTION',
  SOUS_LOCATION = 'SOUS_LOCATION',
}

export enum InvestmentModeDto {
  DEFINE = 'DEFINE',
  DISCUSS = 'DISCUSS',
}

export class CreateRealEstateDto {
  @IsEnum(RealEstateAxisDto)
  axis: RealEstateAxisDto;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  propertyType: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  rooms?: string;

  @ValidateIf((o) => o.axis === RealEstateAxisDto.ACHAT)
  @IsOptional()
  @IsString()
  purpose?: string;

  @ValidateIf((o) => o.axis === RealEstateAxisDto.ACHAT)
  @IsEnum(InvestmentModeDto)
  investmentMode?: InvestmentModeDto;

  @ValidateIf(
    (o) =>
      o.axis === RealEstateAxisDto.ACHAT &&
      o.investmentMode === InvestmentModeDto.DEFINE,
  )
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  totalBudget?: number;

  @ValidateIf(
    (o) =>
      o.axis === RealEstateAxisDto.ACHAT &&
      o.investmentMode === InvestmentModeDto.DEFINE,
  )
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  partners?: number;

  @ValidateIf(
    (o) =>
      o.axis === RealEstateAxisDto.GESTION ||
      o.axis === RealEstateAxisDto.SOUS_LOCATION,
  )
  @IsOptional()
  @IsString()
  revenue?: string;

  @ValidateIf((o) => o.axis === RealEstateAxisDto.GESTION)
  @IsOptional()
  @IsString()
  managementType?: string;

  @ValidateIf((o) => o.axis === RealEstateAxisDto.GESTION)
  @IsOptional()
  @IsString()
  commission?: string;

  @ValidateIf((o) => o.axis === RealEstateAxisDto.GESTION)
  @IsOptional()
  @IsUrl(
    { require_tld: false },
    { message: 'airbnbLink must be a valid URL' },
  )
  airbnbLink?: string;

  @ValidateIf((o) => o.axis === RealEstateAxisDto.SOUS_LOCATION)
  @IsOptional()
  @IsString()
  maxRent?: string;

  @ValidateIf((o) => o.axis === RealEstateAxisDto.SOUS_LOCATION)
  @IsOptional()
  @IsString()
  exploitation?: string;

  @ValidateIf((o) => o.axis === RealEstateAxisDto.SOUS_LOCATION)
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(3)
  @IsString({ each: true })
  tags?: string[];
}
