import { PrismaD1 } from "@prisma/adapter-d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  const { env } = getCloudflareContext();
  if (!env.DB) {
    throw new Error("Cloudflare D1 binding `DB` is not configured.");
  }
  const adapter = new PrismaD1(env.DB);

  return new PrismaClient({ adapter });
};

export const getDb = () => {
  if (process.env.NODE_ENV !== "production" && globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const prisma = createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }

  return prisma;
};
