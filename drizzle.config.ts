// drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
    schema: "./src/lib/schema.ts",
    out: "./drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
} satisfies Config;
