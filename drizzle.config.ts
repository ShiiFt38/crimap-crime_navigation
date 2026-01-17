// drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
    schema: "./lib/schema.ts",
    out: "./drizzle/migrations",
    driver: "pg",           // change to "better-sqlite" when testing SQLite
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
} satisfies Config;