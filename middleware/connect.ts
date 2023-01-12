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

export default pool;