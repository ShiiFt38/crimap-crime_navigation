import { openDB } from "@lib/db";

export async function GET(request, { params }) {
    try {

        const db = await openDB();
        const district = await params.district; // Access district from URL params
        console.log("Incoming district: ", district);

        const rows = await db.all(
            `SELECT 
        d.district_name,
        s.station_name,
        o.offence_name,
        cr.date,
        cr.count
      FROM crime_record cr
      JOIN station s ON cr.station_id = s.station_id
      JOIN district d ON s.district_id = d.district_id
      JOIN offence o ON cr.offence_id = o.offence_id
      WHERE lower(replace(d.district_name, ' ', '-')) = ?`,
            [district]
        );

        return Response.json(rows);
    } catch (err) {
        console.error("DB ERROR:", err);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}