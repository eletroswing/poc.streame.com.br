import { PrismaClient } from '@prisma/client';

interface Global {
  [key: string]: any;
}

const global: Global = globalThis;

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;