import { faker }from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function generateFakeInterests() {
  try {
    // Generate 100 fake interests
    const fakeInterests = Array.from({ length: 100 }, () => ({
      name: faker.lorem.word(),
    }));

    // Insert fake interests into the database
    await prisma.interests.createMany({
      data: fakeInterests,
    });

    console.log('Fake interests generated successfully.');
  } catch (error) {
    console.error('Error generating fake interests:', error);
  } finally {
    await prisma.$disconnect();
  }
}

void generateFakeInterests();
