import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GetCurrentUser } from '../users/GetCurrentUser.decorator';
import { CreateRealEstateDto } from './dto/create-realEstate.dto';
import { UpdateRealEstateDto } from './dto/update-realEstate.dto';
import { RealEstateService } from './realEstate.service';

@Controller('opportunities/real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Get(':id')
  findOne(
    @GetCurrentUser('userId') userId: string,
    @Param('id') id: string,
  ) {
    return this.realEstateService.findOne(userId, id);
  }

  @Post()
  create(
    @GetCurrentUser('userId') userId: string,
    @Body() dto: CreateRealEstateDto,
  ) {
    return this.realEstateService.create(userId, dto);
  }

  @Patch(':id')
  update(
    @GetCurrentUser('userId') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateRealEstateDto,
  ) {
    return this.realEstateService.update(userId, id, dto);
  }
}
