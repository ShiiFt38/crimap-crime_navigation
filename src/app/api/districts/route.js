// app/api/districts/route.ts
import { openDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const db = await openDb();

        const districts = await db.all(`
            SELECT
                d.district_id,
                d.district_name,
                d.population,
                COALESCE(SUM(cr.count), 0) as total_crimes
            FROM district d
                     LEFT JOIN station s ON d.district_id = s.district_id
                     LEFT JOIN crime_record cr ON s.station_id = cr.station_id
            WHERE strftime('%Y', date) || '-Q' || ((CAST(strftime('%m', date) AS INTEGER)-1)/3 + 1)
                      = (SELECT strftime('%Y', date) || '-Q' || ((CAST(strftime('%m', date) AS INTEGER)-1)/3 + 1)
                         FROM crime_record
                         ORDER BY date DESC
                LIMIT 1)
            GROUP BY d.district_id, d.district_name, d.population
        `);

        if (!districts || districts.length === 0) {
            console.log("No districts found in the database for the latest quarter.");
            return NextResponse.json([]);
        }

        const districtsWithIndex = districts.map((dist) => {
            const population = dist.population || 10000;
            const latestTotalCrimes = dist.total_crimes || 0;
            const crimeRatePer100k = (latestTotalCrimes / population) * 100000;
            const maxExpectedRate = 6000; // Adjusted to 6,000 / 100k based on new data
            const crimeIndexBase = crimeRatePer100k / (maxExpectedRate / 12);
            const crimeIndex = Math.max(1, Math.min(12, crimeIndexBase + 1)).toFixed(1);

           // console.log(`Route - District: ${dist.district_name}, Population: ${population}, Total Crimes: ${latestTotalCrimes}, Crime Rate: ${crimeRatePer100k.toFixed(2)}, Index: ${crimeIndex}`);

            return {
                id: dist.district_id,
                district_name: dist.district_name,
                crimeIndex,
            };
        });

        console.log(`Returning ${districtsWithIndex.length} districts for the latest quarter.`);
        return NextResponse.json(districtsWithIndex);
    } catch (error) {
        console.error("Error in districts route:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}