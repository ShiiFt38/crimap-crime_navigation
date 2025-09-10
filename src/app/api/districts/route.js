// app/api/districts/route.ts
import { openDb } from "@/lib/db";
import { NextResponse } from "next/server";
import { unstable_cache } from 'next/cache';

export async function GET() {
    const cachedDistricts = unstable_cache(async () => {
        const db = await openDb();

        const districts = await db.all(`
      SELECT 
        d.district_id,
        d.district_name,
        d.population,
        SUM(cr.count) as total_crimes
      FROM district d
      LEFT JOIN station s ON d.district_id = s.district_id
      LEFT JOIN crime_record cr ON s.station_id = cr.station_id
      GROUP BY d.district_id, d.district_name, d.population
    `);

        const districtsWithIndex = districts.map((dist) => {
            const population = dist.population || 10000;
            const latestTotalCrimes = dist.total_crimes || 0;
            const crimeRatePer100k = (latestTotalCrimes / population) * 100000;
            const maxExpectedRate = 60000; // As per previous alignment
            const crimeIndexBase = crimeRatePer100k / (maxExpectedRate / 12);
            const crimeIndex = Math.max(1, Math.min(12, crimeIndexBase + 1)).toFixed(1);

            return {
                id: dist.district_id,
                district_name: dist.district_name,
                crimeIndex: crimeIndex,
            };
        });

        return districtsWithIndex;
    }, ['districts'], { revalidate: 3600 }); // Cache for 1 hour

    const data = await cachedDistricts();
    return NextResponse.json(data);
}