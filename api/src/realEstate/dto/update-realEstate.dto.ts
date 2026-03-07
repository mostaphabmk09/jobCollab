import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  InvestmentModeDto,
  RealEstateAxisDto,
} from './create-realEstate.dto';

export class UpdateRealEstateDto {
  @IsOptional()
  @IsEnum(RealEstateAxisDto)
  axis?: RealEstateAxisDto;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  propertyType?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  rooms?: string;

  @IsOptional()
  @IsString()
  purpose?: string;

  @IsOptional()
  @IsEnum(InvestmentModeDto)
  investmentMode?: InvestmentModeDto;

  @ValidateIf((o) => o.investmentMode === InvestmentModeDto.DEFINE)
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalBudget?: number;

  @ValidateIf((o) => o.investmentMode === InvestmentModeDto.DEFINE)
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  partners?: number;

  @IsOptional()
  @IsString()
  revenue?: string;

  @IsOptional()
  @IsString()
  managementType?: string;

  @IsOptional()
  @IsString()
  commission?: string;

  @IsOptional()
  @IsUrl(
    { require_tld: false },
    { message: 'airbnbLink must be a valid URL' },
  )
  airbnbLink?: string;

  @IsOptional()
  @IsString()
  maxRent?: string;

  @IsOptional()
  @IsString()
  exploitation?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(3)
  @IsString({ each: true })
  tags?: string[];
}
