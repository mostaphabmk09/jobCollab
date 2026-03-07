import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OpportunityType, Prisma, RealEstateAxis } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateRealEstateDto,
  InvestmentModeDto,
} from './dto/create-realEstate.dto';
import { UpdateRealEstateDto } from './dto/update-realEstate.dto';

@Injectable()
export class RealEstateService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(authorId: string, opportunityId: string) {
    const opportunity = await this.prisma.opportunity.findUnique({
      where: { id: opportunityId },
      include: { immobilier: true },
    });

    if (!opportunity || !opportunity.immobilier) {
      throw new NotFoundException('Real estate opportunity not found');
    }

    if (opportunity.authorId !== authorId) {
      throw new ForbiddenException('You can only access your own opportunity');
    }

    return opportunity;
  }

  async create(authorId: string, dto: CreateRealEstateDto) {
    const location = [dto.city, dto.district].filter(Boolean).join(', ');

    return this.prisma.opportunity.create({
      data: {
        title: dto.title,
        description: dto.description,
        type: OpportunityType.IMMOBILIER,
        location: location || null,
        author: {
          connect: { id: authorId },
        },
        immobilier: {
          create: this.buildCreatePayload(dto),
        },
      },
      include: {
        immobilier: true,
      },
    });
  }

  async update(authorId: string, opportunityId: string, dto: UpdateRealEstateDto) {
    const existing = await this.prisma.opportunity.findUnique({
      where: { id: opportunityId },
      include: { immobilier: true },
    });

    if (!existing || !existing.immobilier) {
      throw new NotFoundException('Real estate opportunity not found');
    }

    if (existing.authorId !== authorId) {
      throw new ForbiddenException('You can only update your own opportunity');
    }

    const nextCity = dto.city ?? existing.immobilier.city;
    const nextDistrict =
      dto.district !== undefined ? dto.district : existing.immobilier.district;
    const location = [nextCity, nextDistrict].filter(Boolean).join(', ');

    return this.prisma.opportunity.update({
      where: { id: opportunityId },
      data: {
        title: dto.title,
        description: dto.description,
        location: location || null,
        immobilier: {
          update: this.buildUpdatePayload(dto),
        },
      },
      include: {
        immobilier: true,
      },
    });
  }

  private buildCreatePayload(
    dto: CreateRealEstateDto,
  ): Prisma.ImmobilierOpportunityCreateWithoutOpportunityInput {
    return {
      axis: dto.axis as RealEstateAxis,
      city: dto.city,
      district: dto.district,
      propertyType: dto.propertyType,
      rooms: dto.rooms,
      purpose: dto.purpose,
      investmentMode: dto.investmentMode,
      totalBudget:
        dto.investmentMode === InvestmentModeDto.DEFINE
          ? dto.totalBudget
          : null,
      partners:
        dto.investmentMode === InvestmentModeDto.DEFINE ? dto.partners : null,
      revenue: dto.revenue,
      managementType: dto.managementType,
      commission: dto.commission,
      airbnbLink: dto.airbnbLink,
      maxRent: dto.maxRent,
      exploitation: dto.exploitation,
      tags: dto.tags ?? [],
    };
  }

  private buildUpdatePayload(
    dto: UpdateRealEstateDto,
  ): Prisma.ImmobilierOpportunityUpdateWithoutOpportunityInput {
    const data: Record<string, unknown> = {
      axis: dto.axis as RealEstateAxis | undefined,
      city: dto.city,
      district: dto.district,
      propertyType: dto.propertyType,
      rooms: dto.rooms,
      purpose: dto.purpose,
      investmentMode: dto.investmentMode,
      totalBudget:
        dto.investmentMode === InvestmentModeDto.DEFINE
          ? dto.totalBudget
          : null,
      partners:
        dto.investmentMode === InvestmentModeDto.DEFINE ? dto.partners : null,
      revenue: dto.revenue,
      managementType: dto.managementType,
      commission: dto.commission,
      airbnbLink: dto.airbnbLink,
      maxRent: dto.maxRent,
      exploitation: dto.exploitation,
      tags: dto.tags,
    };

    return Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined),
    ) as Prisma.ImmobilierOpportunityUpdateWithoutOpportunityInput;
  }
}
