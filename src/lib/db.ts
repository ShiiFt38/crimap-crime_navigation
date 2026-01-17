// lib/db.ts (optional, keep for legacy, but migrate to drizzle)
import { db } from "./drizzle"; // Export Drizzle db
export { db as openDb }; // Alias for compatibility during migration