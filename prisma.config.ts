import { defineConfig } from "@prisma/config";
import { config } from "dotenv";

config({ path: ".env" });
config({ path: ".env.local" }); // Load local env as well to be safe

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL
  }
});
