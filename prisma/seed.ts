import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding features...');

  // Create the admin feature
  const adminFeature = await prisma.feature.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      description: 'Administrative access to the admin panel',
    },
  });

  console.log('✅ Admin feature created:', adminFeature);

  // Create some other example features
  const features = [
    {
      name: 'premium',
      description: 'Premium features and enhanced limits'
    },
    {
      name: 'beta-access',
      description: 'Access to beta features and early previews'
    },
    {
      name: 'api-access',
      description: 'Access to API endpoints'
    }
  ];

  for (const feature of features) {
    const createdFeature = await prisma.feature.upsert({
      where: { name: feature.name },
      update: {},
      create: feature,
    });
    console.log('✅ Feature created:', createdFeature.name);
  }

  // Optionally assign admin feature to the first user
  // Uncomment the lines below if you want to automatically assign admin to the first user
  
  // const firstUser = await prisma.user.findFirst({
  //   orderBy: { createdAt: 'asc' }
  // });

  // if (firstUser) {
  //   const adminUserFeature = await prisma.userFeature.upsert({
  //     where: {
  //       userId_featureId: {
  //         userId: firstUser.id,
  //         featureId: adminFeature.id,
  //       }
  //     },
  //     update: {},
  //     create: {
  //       userId: firstUser.id,
  //       featureId: adminFeature.id,
  //     },
  //   });
  //   console.log('✅ Admin access granted to first user:', firstUser.email);
  // } else {
  //   console.log('⚠️  No users found. Create a user first, then run this seed again to grant admin access.');
  // }

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });