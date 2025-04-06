// src/prisma.ts
import { PrismaClient } from '@prisma/client';

// Create a PrismaClient instance
const prisma = new PrismaClient();

// Gracefully disconnect the client when the process exits
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;
