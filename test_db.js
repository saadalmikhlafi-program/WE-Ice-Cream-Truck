const { Pool } = require('pg');
const fs = require('fs');

// Read .env.local manually
const envContent = fs.readFileSync('.env.local', 'utf8');
const lines = envContent.split('\n');
const envVars = {};
for (const line of lines) {
  const match = line.match(/^([A-Z_]+)="?([^"]+)"?/);
  if (match) envVars[match[1]] = match[2];
}

const url = envVars['DATABASE_URL'];
if (!url) { console.error('DATABASE_URL not found'); process.exit(1); }

if (url.includes('[YOUR-PASSWORD]')) {
  console.error('ERROR: DATABASE_URL still has placeholder [YOUR-PASSWORD]. You need to set your real Supabase password in .env.local');
  process.exit(1);
}

console.log('Connecting to:', url.replace(/:[^:@]+@/, ':***@'));

const pool = new Pool({ connectionString: url });

pool.connect()
  .then(async (client) => {
    console.log('Connected successfully!');
    try {
      const r = await client.query('SELECT COUNT(*) FROM public."User"');
      console.log('User count:', r.rows[0].count);
      const admin = await client.query('SELECT email, role FROM public."User" WHERE role = $1 OR role = $2 LIMIT 5', ['OWNER', 'ADMIN']);
      if (admin.rows.length > 0) {
        console.log('Admin users found:');
        admin.rows.forEach(u => console.log(' -', u.email, '|', u.role));
      } else {
        console.log('No admin users found - you need to run the seed script');
      }
    } catch (err) {
      console.error('Query error:', err.message);
    }
    client.release();
    pool.end();
  })
  .catch(err => {
    console.error('Connection failed:', err.message);
    process.exit(1);
  });
