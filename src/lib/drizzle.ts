// lib/drizzle.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
// import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// For local dev/testing you can switch driver easily
// Uncomment the SQLite block when testing locally

import Database from "better-sqlite3";
const sqlite = new Database("./data/saps_crime_stats.db");
export const db = drizzle(sqlite, { schema, logger: true });


// Postgres (Supabase) – this is the production/default
/*const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
    throw new Error("DATABASE_URL is not set in .env");
}

const client = postgres(connectionString, {
    max: 10, // connection pool size
    ssl: "require", // Supabase requires SSL
});

export const db = drizzle(client, { schema, logger: true });

// Optional: helper to close connections gracefully (useful in serverless)
export async function closeDb() {
    await client.end();
} */