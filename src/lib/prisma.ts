import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  // Use DIRECT_URL (port 5432) — bypasses pgBouncer transaction mode which
  // causes "Server has closed the connection" errors with connection pools.
  // pgBouncer (DATABASE_URL, port 6543) is only needed for Prisma migrations.
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

  const pool = new Pool({
    connectionString,
    max: 1,                    // Absolute minimum (1 connection per build worker)
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 15000,
    allowExitOnIdle: true,
  });

  // Log pool errors so they don't go silent
  pool.on("error", (err) => {
    console.error("PG Pool Error:", err.message);
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
