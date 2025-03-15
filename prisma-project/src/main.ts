import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Create Account with Profile
  const account = await prisma.account.create({
    data: {
      email: 'user@example.com',
      username: 'johndoe',
      password: 'password123',
      profile: {
        create: {
          lastname: 'Doe',
          firstname: 'John',
          middlename: 'Smith',
          suffix: 'Jr.',
          bio: 'Software Engineer',
          picture: 'profile.jpg',
        }
      }
    }
  });

  console.log('Account with Profile Created:', account);

  // 2. Add Modules to an Existing Account
  const module = await prisma.module.create({
    data: {
      accountCode: account.id,
      moduleCode: 'MOD001',
      moduleDetails: 'Introduction to Programming',
      moduleDesc: 'Basic coding principles and logic.'
    }
  });

  console.log('Module Added:', module);

  // 3. Fetch Accounts with Profiles and Modules
  const accounts = await prisma.account.findMany({
    include: {
      profile: true,
      modules: true
    }
  });

  console.log('All Accounts:', accounts);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
