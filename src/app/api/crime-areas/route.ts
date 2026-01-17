// src/app/api/crime-areas/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { district, station, crimeRecord } from "@/lib/schema";
import { sql } from "drizzle-orm";

export async function GET() {
    try {
        const areas = await db
            .select({
                districtId: district.districtId,
                districtName: district.districtName,
                totalCrimes: sql<number>`COALESCE(SUM(${crimeRecord.count}), 0)`.as("total_crimes"),
                stationCount: sql<number>`COUNT(DISTINCT ${station.stationId})`.as("station_count"),
            })
            .from(district)
            .leftJoin(station, eq(district.districtId, station.districtId))
            .leftJoin(crimeRecord, eq(station.stationId, crimeRecord.stationId))
            .groupBy(district.districtId, district.districtName)
            .orderBy(sql`total_crimes DESC`)
            .limit(50);

        return NextResponse.json(areas);
    } catch (error) {
        console.error("Error fetching crime areas:", error);
        return NextResponse.json({ error: "Failed to fetch crime areas" }, { status: 500 });
    }
}