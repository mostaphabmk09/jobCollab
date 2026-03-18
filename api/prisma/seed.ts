import { PrismaClient, Interest, ProfileType, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

type SeedUser = {
  email: string;
  plainPassword: string;
  role: Role;
  profileType?: ProfileType;
  interests?: Interest[];
};

const seedUsers: SeedUser[] = [
  {
    email: process.env.SEED_ADMIN_EMAIL ?? 'admin@jobcollab.local',
    plainPassword: process.env.SEED_ADMIN_PASSWORD ?? 'Admin123!',
    role: Role.ADMIN,
    profileType: ProfileType.COMPANY,
    interests: [Interest.COLLABORATION, Interest.FINANCEMENT],
  },
  {
    email: process.env.SEED_USER_EMAIL ?? 'user@jobcollab.local',
    plainPassword: process.env.SEED_USER_PASSWORD ?? 'User123!',
    role: Role.USER,
    profileType: ProfileType.ENTREPRENEUR,
    interests: [Interest.IMMOBILIER],
  },
];

async function main() {
  for (const user of seedUsers) {
    const hashedPassword = await bcrypt.hash(user.plainPassword, 10);

    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        password: hashedPassword,
        role: user.role,
        profileType: user.profileType,
        interests: user.interests ?? [],
      },
      create: {
        email: user.email,
        password: hashedPassword,
        role: user.role,
        profileType: user.profileType,
        interests: user.interests ?? [],
      },
    });
  }

  console.log(`Seeded ${seedUsers.length} users`);
}

void main()
  .catch((error) => {
    console.error('Error while seeding users:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
