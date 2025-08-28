import { openDb } from "@/lib/db";

export async function GET() {
    try {
        const db = await openDb();

        const districts = await db.all("SELECT district_id, district_name FROM district")

        return Response.json(districts);
    } catch (err) {
        console.log(err);
        return new Response("Internal Server Error", { status: 500 });
    }
}