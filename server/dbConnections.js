import dotenv from "dotenv";
import pg from "pg";
dotenv.config();
export const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
