import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Ensure sqlite runs in verbose mode (helps debugging)
sqlite3.verbose();

export async function openDb() {
    return open({
        filename: "./data/saps_crime_stats.db", // relative to project root
        driver: sqlite3.Database,
    });
}
