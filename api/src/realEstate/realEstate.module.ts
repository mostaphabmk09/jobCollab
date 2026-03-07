import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RealEstateController } from './realEstate.controller';
import { RealEstateService } from './realEstate.service';

@Module({
  imports: [PrismaModule],
  controllers: [RealEstateController],
  providers: [RealEstateService],
})
export class RealEstateModule {}
