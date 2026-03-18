import { Controller, Get } from '@nestjs/common';
import { GetCurrentUser } from '../users/GetCurrentUser.decorator';
import { CollaborationOpportunitiesService } from './collaboration-opportunities.service';

@Controller('me/collaboration-opportunities')
export class MeCollaborationOpportunitiesController {
  constructor(
    private readonly collaborationOpportunitiesService: CollaborationOpportunitiesService,
  ) {}

  @Get()
  listMine(@GetCurrentUser('userId') userId: string) {
    return this.collaborationOpportunitiesService.listMine(userId);
  }
}
