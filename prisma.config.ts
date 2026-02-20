import path from "node:path";
import { defineConfig } from "prisma/config";
import { PrismaD1HTTP } from "@prisma/adapter-d1";
import "dotenv/config";

const prismaConfig = defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  // Prisma supports this for D1 HTTP adapter, but the current config types
  // do not expose `migrate` yet.
  // @ts-expect-error Prisma config typing gap
  migrate: {
    async adapter() {
      return new PrismaD1HTTP({
        CLOUDFLARE_D1_TOKEN: process.env.CLOUDFLARE_D1_TOKEN ?? "",
        CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID ?? "",
        CLOUDFLARE_DATABASE_ID: process.env.CLOUDFLARE_DATABASE_ID ?? "",
      });
    },
  },
});

export default prismaConfig;
