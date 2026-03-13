import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
  async updateProfile(userId: string, data: { profileType?: string; interests?: string[]; name?: string; phone?: string; company?: string; position?: string; website?: string; city?: string; bio?: string }) {
    const updateData: any = {};
    if (typeof data.profileType !== 'undefined') updateData.profileType = data.profileType as any;
    if (typeof data.interests !== 'undefined') updateData.interests = data.interests as any;
    if (typeof data.name !== 'undefined') updateData.name = data.name;
    if (typeof data.phone !== 'undefined') updateData.phone = data.phone;
    if (typeof data.company !== 'undefined') updateData.company = data.company;
    if (typeof data.position !== 'undefined') updateData.position = data.position;
    if (typeof data.website !== 'undefined') updateData.website = data.website;
    if (typeof data.city !== 'undefined') updateData.city = data.city;
    if (typeof data.bio !== 'undefined') updateData.bio = data.bio;

    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

}