import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GetCurrentUser } from '../users/GetCurrentUser.decorator';
import { CollaborationOpportunitiesService } from './collaboration-opportunities.service';
import { CreateCollaborationOpportunityDto } from './dto/create-collaboration-opportunity.dto';
import { UpdateCollaborationOpportunityStep1Dto } from './dto/update-collaboration-opportunity-step1.dto';
import { UpdateCollaborationOpportunityStep2Dto } from './dto/update-collaboration-opportunity-step2.dto';
import { UpdateCollaborationOpportunityStep4Dto } from './dto/update-collaboration-opportunity-step4.dto';

@Controller('collaboration-opportunities')
export class CollaborationOpportunitiesController {
  constructor(
    private readonly collaborationOpportunitiesService: CollaborationOpportunitiesService,
  ) {}

  @Post()
  createDraft(
    @GetCurrentUser('userId') userId: string,
    @Body() _dto: CreateCollaborationOpportunityDto,
  ) {
    return this.collaborationOpportunitiesService.createDraft(userId);
  }

  @Get(':id/preview')
  getPreview(@Param('id') id: string, @GetCurrentUser('userId') userId: string) {
    return this.collaborationOpportunitiesService.getPreview(id, userId);
  }

  @Patch(':id/step-1')
  updateStep1(
    @Param('id') id: string,
    @GetCurrentUser('userId') userId: string,
    @Body() dto: UpdateCollaborationOpportunityStep1Dto,
  ) {
    return this.collaborationOpportunitiesService.updateStep1(id, userId, dto);
  }

  @Patch(':id/step-2')
  updateStep2(
    @Param('id') id: string,
    @GetCurrentUser('userId') userId: string,
    @Body() dto: UpdateCollaborationOpportunityStep2Dto,
  ) {
    return this.collaborationOpportunitiesService.updateStep2(id, userId, dto);
  }

  @Patch(':id/step-4')
  updateStep4(
    @Param('id') id: string,
    @GetCurrentUser('userId') userId: string,
    @Body() dto: UpdateCollaborationOpportunityStep4Dto,
  ) {
    return this.collaborationOpportunitiesService.updateStep4(id, userId, dto);
  }

  @Patch(':id/publish')
  publish(@Param('id') id: string, @GetCurrentUser('userId') userId: string) {
    return this.collaborationOpportunitiesService.publish(id, userId);
  }

  @Get(':id')
  getById(@Param('id') id: string, @GetCurrentUser('userId') userId: string) {
    return this.collaborationOpportunitiesService.getById(id, userId);
  }
}
