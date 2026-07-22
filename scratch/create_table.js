const { Client } = require('pg');

const connectionString = "postgresql://postgres.pcdacfowlhkuvttwdanb:kals123456%23%232026@44.208.221.186:6543/postgres?sslmode=require";

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function run() {
  await client.connect();
  console.log("Connected to DB");

  const query = `
    CREATE TABLE IF NOT EXISTS "PushSubscription" (
        "id" TEXT NOT NULL,
        "endpoint" TEXT NOT NULL,
        "p256dh" TEXT NOT NULL,
        "auth" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "PushSubscription_pkey" PRIMARY KEY ("id")
    );
  `;
  await client.query(query);
  console.log("Table created");

  const query2 = `
    CREATE UNIQUE INDEX IF NOT EXISTS "PushSubscription_endpoint_key" ON "PushSubscription"("endpoint");
  `;
  await client.query(query2);
  console.log("Index created");

  // Try adding foreign key if it doesn't exist
  try {
    const query3 = `
      ALTER TABLE "PushSubscription" ADD CONSTRAINT "PushSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    `;
    await client.query(query3);
    console.log("FK created");
  } catch(e) {
    console.log("FK might already exist or error:", e.message);
  }

  await client.end();
}

run().catch(console.error);
