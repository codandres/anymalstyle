import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

let prisma: PrismaClient;

const env: string = process.env.NODE_ENV;

if (env === 'production') {
  prisma = new PrismaClient();
} else {
  config({ path: `/.env.${env}` });

  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;
