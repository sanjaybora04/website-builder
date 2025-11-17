// src/prisma.ts
import { PrismaClient } from '@sitecraft/db';

// Create a PrismaClient instance
let prisma = new PrismaClient();

// Gracefully disconnect the client when the process exits
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;
