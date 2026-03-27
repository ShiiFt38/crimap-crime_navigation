import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { DATABASE_URL } from "./env";

declare global {
    // eslint-disable-next-line no-var
    var __crimapSqlClient: ReturnType<typeof postgres> | undefined;
}

if (!DATABASE_URL.startsWith("postgres")) {
    throw new Error(
        "DATABASE_URL must point to the Supabase Postgres instance. Update your environment variables before starting the app."
    );
}

const client =
    global.__crimapSqlClient ??
    postgres(DATABASE_URL, {
        max: 10,
        ssl: "require",
        prepare: false,
    });

if (process.env.NODE_ENV !== "production") {
    global.__crimapSqlClient = client;
}

export const db = drizzle(client, { schema, logger: true });

export async function closeDb() {
    await client.end();
}
