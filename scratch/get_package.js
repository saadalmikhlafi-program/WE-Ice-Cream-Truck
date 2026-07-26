const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.pcdacfowlhkuvttwdanb:kals123456%23%232026@44.208.221.186:6543/postgres?pgbouncer=true',
  ssl: { rejectUnauthorized: false },
});

client.connect()
  .then(() => client.query('SELECT id, name FROM "Package" WHERE "isActive" = true ORDER BY "sortOrder" ASC LIMIT 1'))
  .then(res => console.log(JSON.stringify(res.rows[0])))
  .catch(e => console.error(e.message))
  .finally(() => client.end());
