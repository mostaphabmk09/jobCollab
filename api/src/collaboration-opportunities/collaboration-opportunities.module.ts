import { Module } from '@nestjs/common';
import { CollaborationOpportunitiesController } from './collaboration-opportunities.controller';
import { CollaborationOpportunitiesService } from './collaboration-opportunities.service';
import { MeCollaborationOpportunitiesController } from './me-collaboration-opportunities.controller';

@Module({
  controllers: [
    CollaborationOpportunitiesController,
    MeCollaborationOpportunitiesController,
  ],
  providers: [CollaborationOpportunitiesService],
})
export class CollaborationOpportunitiesModule {}
