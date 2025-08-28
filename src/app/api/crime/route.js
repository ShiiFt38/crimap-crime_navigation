import { openDb } from "@/lib/db";

export async function GET() {
    try {
        const db = await openDb();

        // Simple test query
        const crimes = await db.all("SELECT * FROM crime_record LIMIT 20");

        return Response.json(crimes);
    } catch (err) {
        console.error("DB ERROR:", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}
