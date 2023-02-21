import pg from "pg";
import * as dotenv from 'dotenv';
dotenv.config();
// Connect to the database using the DATABASE_URL environment
//   variable injected by Railway

const pool = new pg.Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: parseInt(process.env.DATABASE_PORT!),
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

//all BIGSERIAL data was strings, this turns it into integers
pg.defaults.parseInt8 = true

export default pool;