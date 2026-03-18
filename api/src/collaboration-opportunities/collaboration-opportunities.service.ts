import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CollaborationNeedType,
  CollaborationType,
  OfferType,
  OpportunityStatus,
  OpportunityType,
  Prisma,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCollaborationOpportunityStep1Dto } from './dto/update-collaboration-opportunity-step1.dto';
import { UpdateCollaborationOpportunityStep2Dto } from './dto/update-collaboration-opportunity-step2.dto';
import { UpdateCollaborationOpportunityStep4Dto } from './dto/update-collaboration-opportunity-step4.dto';

const collaborationOpportunityInclude = Prisma.validator<Prisma.OpportunityInclude>()({
  collaboration: {
    include: {
      requirements: true,
    },
  },
});

type CollaborationOpportunityRecord = Prisma.OpportunityGetPayload<{
  include: typeof collaborationOpportunityInclude;
}>;

type RootUpdateInput = Partial<
  Pick<
    CollaborationOpportunityRecord,
    'title' | 'oneLinePitch' | 'description' | 'status' | 'completionPercent' | 'publishedAt'
  >
>;

type CollaborationUpdateInput = Partial<
  Omit<NonNullable<CollaborationOpportunityRecord['collaboration']>, 'requirements'>
>;

type RequirementInput = {
  collaborationType: CollaborationType;
  needTypes: CollaborationNeedType[];
};

type StepCompletion = {
  step1: boolean;
  step2: boolean;
  step3: boolean;
};

type PublishValidation = {
  missingFields: string[];
  stepCompletion: StepCompletion;
};

@Injectable()
export class CollaborationOpportunitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async createDraft(userId: string) {
    const opportunity = await this.prisma.opportunity.create({
      data: {
        type: OpportunityType.COLLABORATION,
        status: OpportunityStatus.DRAFT,
        authorId: userId,
        collaboration: {
          create: {},
        },
      },
      include: collaborationOpportunityInclude,
    });

    return this.serializeOpportunity(opportunity);
  }

  async listMine(userId: string) {
    const opportunities = await this.prisma.opportunity.findMany({
      where: {
        authorId: userId,
        type: OpportunityType.COLLABORATION,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      include: collaborationOpportunityInclude,
    });

    return opportunities.map((opportunity) => this.serializeOpportunity(opportunity));
  }

  async getById(id: string, userId: string) {
    const opportunity = await this.getOwnedOpportunityOrThrow(id, userId);
    return this.serializeOpportunity(opportunity);
  }

  async getPreview(id: string, userId: string) {
    const opportunity = await this.getOwnedOpportunityOrThrow(id, userId);
    return this.serializeOpportunity(opportunity);
  }

  async updateStep1(
    id: string,
    userId: string,
    dto: UpdateCollaborationOpportunityStep1Dto,
  ) {
    const current = await this.getOwnedOpportunityOrThrow(id, userId);
    this.ensureEditable(current);

    const rootUpdate = this.cleanUndefined<RootUpdateInput>({
      title: dto.title,
      oneLinePitch: dto.oneLinePitch,
      description: dto.description,
    });

    const collaborationUpdate = this.cleanUndefined<CollaborationUpdateInput>({
      projectCategory: dto.projectCategory,
      projectStage: dto.projectStage,
    });

    const merged = this.mergeOpportunity(current, rootUpdate, collaborationUpdate);
    const opportunity = await this.prisma.opportunity.update({
      where: { id },
      data: {
        ...rootUpdate,
        completionPercent: this.calculateCompletionPercent(merged),
        collaboration: {
          upsert: {
            create: collaborationUpdate,
            update: collaborationUpdate,
          },
        },
      },
      include: collaborationOpportunityInclude,
    });

    return this.serializeOpportunity(opportunity);
  }

  async updateStep2(
    id: string,
    userId: string,
    dto: UpdateCollaborationOpportunityStep2Dto,
  ) {
    const current = await this.getOwnedOpportunityOrThrow(id, userId);
    this.ensureEditable(current);

    const normalizedRequirements = this.normalizeRequirements(dto.requirements);
    const merged = this.mergeRequirements(current, normalizedRequirements);

    const opportunity = await this.prisma.opportunity.update({
      where: { id },
      data: {
        completionPercent: this.calculateCompletionPercent(merged),
        collaboration: {
          upsert: {
            create: {
              requirements: {
                create: normalizedRequirements,
              },
            },
            update: {
              requirements: {
                deleteMany: {},
                create: normalizedRequirements,
              },
            },
          },
        },
      },
      include: collaborationOpportunityInclude,
    });

    return this.serializeOpportunity(opportunity);
  }

  async updateStep4(
    id: string,
    userId: string,
    dto: UpdateCollaborationOpportunityStep4Dto,
  ) {
    this.validateStep4(dto);

    const current = await this.getOwnedOpportunityOrThrow(id, userId);
    this.ensureEditable(current);

    const collaborationUpdate = this.cleanUndefined<CollaborationUpdateInput>({
      offerType: dto.offerType,
      offerDescription: dto.offerDescription,
      equityMin: dto.equityMin,
      equityMax: dto.equityMax,
      revenueShareDetails: dto.revenueShareDetails,
      financialContributionExpected: dto.financialContributionExpected,
      financialContributionDescription: dto.financialContributionDescription,
      termsFlexibility: dto.termsFlexibility,
    });

    const merged = this.mergeOpportunity(current, {}, collaborationUpdate);
    const opportunity = await this.prisma.opportunity.update({
      where: { id },
      data: {
        completionPercent: this.calculateCompletionPercent(merged),
        collaboration: {
          upsert: {
            create: collaborationUpdate,
            update: collaborationUpdate,
          },
        },
      },
      include: collaborationOpportunityInclude,
    });

    return this.serializeOpportunity(opportunity);
  }

  async publish(id: string, userId: string) {
    const current = await this.getOwnedOpportunityOrThrow(id, userId);
    this.ensureEditable(current);

    const validation = this.getPublishValidation(current);
    if (validation.missingFields.length > 0) {
      throw new BadRequestException({
        message: 'Collaboration opportunity is incomplete and cannot be published.',
        missingFields: validation.missingFields,
      });
    }

    const opportunity = await this.prisma.opportunity.update({
      where: { id },
      data: {
        status: OpportunityStatus.PUBLISHED,
        publishedAt: new Date(),
        completionPercent: 100,
      },
      include: collaborationOpportunityInclude,
    });

    return this.serializeOpportunity(opportunity);
  }

  private async getOwnedOpportunityOrThrow(id: string, userId: string) {
    const opportunity = await this.prisma.opportunity.findFirst({
      where: {
        id,
        authorId: userId,
        type: OpportunityType.COLLABORATION,
      },
      include: collaborationOpportunityInclude,
    });

    if (!opportunity) {
      throw new NotFoundException('Collaboration opportunity not found.');
    }

    return opportunity;
  }

  private ensureEditable(opportunity: CollaborationOpportunityRecord) {
    if (
      opportunity.status !== OpportunityStatus.DRAFT &&
      opportunity.status !== OpportunityStatus.PAUSED
    ) {
      throw new ConflictException(
        'Only draft or paused collaboration opportunities can be edited.',
      );
    }
  }

  private serializeOpportunity(opportunity: CollaborationOpportunityRecord) {
    const validation = this.getPublishValidation(opportunity);

    return {
      ...opportunity,
      missingFields: validation.missingFields,
      isPublishReady: validation.missingFields.length === 0,
      stepCompletion: validation.stepCompletion,
      preview: this.buildPreview(opportunity),
    };
  }

  private buildPreview(opportunity: CollaborationOpportunityRecord) {
    const collaboration = this.getCollaborationRecord(opportunity);

    return {
      building: {
        title: opportunity.title,
        oneLinePitch: opportunity.oneLinePitch,
        description: opportunity.description,
        projectCategory: collaboration.projectCategory,
        projectStage: collaboration.projectStage,
      },
      collaboration: {
        requirements: collaboration.requirements.map((requirement) =>
          `${this.formatEnum(requirement.collaborationType)}: ${requirement.needTypes
            .map((needType) => this.formatEnum(needType))
            .join(', ')}`,
        ),
      },
      offer: {
        offerType: collaboration.offerType,
        offerDescription: collaboration.offerDescription,
        equityMin: collaboration.equityMin,
        equityMax: collaboration.equityMax,
        revenueShareDetails: collaboration.revenueShareDetails,
        financialContributionExpected: collaboration.financialContributionExpected,
        financialContributionDescription: collaboration.financialContributionDescription,
        termsFlexibility: collaboration.termsFlexibility,
      },
    };
  }

  private getPublishValidation(opportunity: CollaborationOpportunityRecord): PublishValidation {
    const collaboration = this.getCollaborationRecord(opportunity);
    const missingFields = new Set<string>();

    const step1 =
      this.hasText(opportunity.title) &&
      this.hasText(opportunity.oneLinePitch) &&
      this.hasText(opportunity.description) &&
      this.hasText(collaboration.projectCategory) &&
      Boolean(collaboration.projectStage);

    if (!this.hasText(opportunity.title)) {
      missingFields.add('title');
    }
    if (!this.hasText(opportunity.oneLinePitch)) {
      missingFields.add('oneLinePitch');
    }
    if (!this.hasText(opportunity.description)) {
      missingFields.add('description');
    }
    if (!this.hasText(collaboration.projectCategory)) {
      missingFields.add('projectCategory');
    }
    if (!collaboration.projectStage) {
      missingFields.add('projectStage');
    }

    const hasValidRequirements =
      collaboration.requirements.length > 0 &&
      collaboration.requirements.every(
        (requirement) =>
          Boolean(requirement.collaborationType) && requirement.needTypes.length > 0,
      );

    const step2 = hasValidRequirements;

    if (!hasValidRequirements) {
      missingFields.add('requirements');
    }

    const hasEquityValues =
      collaboration.equityMin !== null || collaboration.equityMax !== null;
    const validEquityRange =
      collaboration.equityMin === null ||
      collaboration.equityMax === null ||
      collaboration.equityMin <= collaboration.equityMax;
    const hasRevenueShareDetails =
      collaboration.offerType !== OfferType.REVENUE_SHARE ||
      this.hasText(collaboration.revenueShareDetails);
    const hasFinancialContributionDescription =
      !collaboration.financialContributionExpected ||
      this.hasText(collaboration.financialContributionDescription);
    const hasRequiredEquityInformation =
      collaboration.offerType !== OfferType.EQUITY || hasEquityValues;

    const step3 =
      Boolean(collaboration.offerType) &&
      this.hasText(collaboration.offerDescription) &&
      Boolean(collaboration.termsFlexibility) &&
      hasRequiredEquityInformation &&
      validEquityRange &&
      hasRevenueShareDetails &&
      hasFinancialContributionDescription;

    if (!collaboration.offerType) {
      missingFields.add('offerType');
    }
    if (!this.hasText(collaboration.offerDescription)) {
      missingFields.add('offerDescription');
    }
    if (!collaboration.termsFlexibility) {
      missingFields.add('termsFlexibility');
    }
    if (!hasRequiredEquityInformation) {
      missingFields.add('equityRange');
    }
    if (!validEquityRange) {
      missingFields.add('equityRangeOrder');
    }
    if (!hasRevenueShareDetails) {
      missingFields.add('revenueShareDetails');
    }
    if (!hasFinancialContributionDescription) {
      missingFields.add('financialContributionDescription');
    }

    return {
      missingFields: [...missingFields],
      stepCompletion: {
        step1,
        step2,
        step3,
      },
    };
  }

  private calculateCompletionPercent(opportunity: CollaborationOpportunityRecord) {
    const { stepCompletion } = this.getPublishValidation(opportunity);

    return (
      (stepCompletion.step1 ? 40 : 0) +
      (stepCompletion.step2 ? 30 : 0) +
      (stepCompletion.step3 ? 30 : 0)
    );
  }

  private validateStep4(dto: UpdateCollaborationOpportunityStep4Dto) {
    if (
      dto.offerType === OfferType.EQUITY &&
      dto.equityMin === undefined &&
      dto.equityMax === undefined
    ) {
      throw new BadRequestException('At least one equity value is required for equity offers.');
    }

    if (
      dto.equityMin !== undefined &&
      dto.equityMax !== undefined &&
      dto.equityMin > dto.equityMax
    ) {
      throw new BadRequestException('equityMin cannot be greater than equityMax.');
    }

    if (
      dto.offerType === OfferType.REVENUE_SHARE &&
      !this.hasText(dto.revenueShareDetails)
    ) {
      throw new BadRequestException('Revenue share details are required for revenue share offers.');
    }

    if (
      dto.financialContributionExpected &&
      !this.hasText(dto.financialContributionDescription)
    ) {
      throw new BadRequestException(
        'A financial contribution description is required when contribution is expected.',
      );
    }
  }

  private mergeOpportunity(
    opportunity: CollaborationOpportunityRecord,
    rootUpdate: RootUpdateInput,
    collaborationUpdate: CollaborationUpdateInput,
  ): CollaborationOpportunityRecord {
    const collaboration = this.getCollaborationRecord(opportunity);

    return {
      ...opportunity,
      ...rootUpdate,
      collaboration: {
        ...collaboration,
        ...collaborationUpdate,
      },
    } as CollaborationOpportunityRecord;
  }

  private mergeRequirements(
    opportunity: CollaborationOpportunityRecord,
    requirements: RequirementInput[],
  ): CollaborationOpportunityRecord {
    const collaboration = this.getCollaborationRecord(opportunity);
    const timestamp = new Date();

    return {
      ...opportunity,
      collaboration: {
        ...collaboration,
        requirements: requirements.map((requirement, index) => ({
          id: `draft-${index}`,
          collaborationOpportunityId: collaboration.id,
          collaborationType: requirement.collaborationType,
          needTypes: requirement.needTypes,
          createdAt: timestamp,
          updatedAt: timestamp,
        })),
      },
    } as CollaborationOpportunityRecord;
  }

  private normalizeRequirements(requirements: UpdateCollaborationOpportunityStep2Dto['requirements']) {
    return requirements.map((requirement) => ({
      collaborationType: requirement.collaborationType,
      needTypes: [...new Set(requirement.needTypes)],
    }));
  }

  private getCollaborationRecord(opportunity: CollaborationOpportunityRecord) {
    if (!opportunity.collaboration) {
      throw new NotFoundException('Collaboration details are missing for this opportunity.');
    }

    return opportunity.collaboration;
  }

  private cleanUndefined<T extends Record<string, unknown>>(value: T) {
    return Object.fromEntries(
      Object.entries(value).filter(([, entryValue]) => entryValue !== undefined),
    ) as T;
  }

  private hasText(value: string | null | undefined) {
    return typeof value === 'string' && value.trim().length > 0;
  }

  private formatEnum(value: string) {
    return value
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (character) => character.toUpperCase());
  }
}
