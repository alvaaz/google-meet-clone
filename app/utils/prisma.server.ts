import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;
declare global {
  var _db: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  if (!global._db) {
    global._db = new PrismaClient();
    global._db.$connect();
  }
  prisma = global._db;
}

export { prisma };
