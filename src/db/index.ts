import {advocates} from "@/db/schema";
import dotenv from "dotenv";
import {drizzle} from "drizzle-orm/node-postgres";
import {Pool} from "pg";

// Load environment variables
dotenv.config();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool, { schema: { advocates } });