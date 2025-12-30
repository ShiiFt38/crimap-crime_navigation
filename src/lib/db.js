import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

// Ensure sqlite runs in verbose mode (helps debugging)
sqlite3.verbose();

const dbPath = path.join(
    process.cwd(),
    "data",
    "saps_crime_stats.db"
);

export async function openDb() {
    return open({
        filename: dbPath, // relative to project root
        driver: sqlite3.Database,
    });
}
