import { Controller, Get, Req, UseGuards, Post, Body } from '@nestjs/common';
import { GetCurrentUser } from './GetCurrentUser.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getMe(@GetCurrentUser() user: any) {
    // return enriched user from DB (includes interests, profileType, etc.)
    return this.usersService.findById(user.userId);
  }

  @Post('onboarding')
  @UseGuards(JwtAuthGuard)
  async onboarding(
    @GetCurrentUser() user: any,
    @Body() body: { profileType?: string; interests?: string[]; name?: string; phone?: string; company?: string; position?: string; website?: string; city?: string; bio?: string },
  ) {
    // update user profileType, interests, name and other profile fields
    return this.usersService.updateProfile(user.userId, {
      profileType: body.profileType,
      interests: body.interests,
      name: body.name,
      phone: body.phone,
      company: body.company,
      position: body.position,
      website: body.website,
      city: body.city,
      bio: body.bio,
    });
  }
}