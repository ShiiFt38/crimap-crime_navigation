// src/app/api/crime/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { crimeRecord, station, district } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const districtId = searchParams.get("districtId");
        const limit = parseInt(searchParams.get("limit") || "20");

        const baseQuery = db
            .select({
                recordId: crimeRecord.recordId,
                stationName: station.stationName,
                districtName: district.districtName,
                offenceId: crimeRecord.offenceId,
                count: crimeRecord.count,
                date: crimeRecord.date,
            })
            .from(crimeRecord)
            .leftJoin(station, eq(crimeRecord.stationId, station.stationId))
            .leftJoin(district, eq(station.districtId, district.districtId))
            .orderBy(sql`${crimeRecord.date} DESC`)
            .limit(limit);

        const records = districtId && !isNaN(parseInt(districtId))
            ? await baseQuery.where(eq(district.districtId, parseInt(districtId)))
            : await baseQuery;

        return NextResponse.json(records);
    } catch (error) {
        console.error("Error fetching crime records:", error);
        return NextResponse.json({ error: "Failed to fetch crime records" }, { status: 500 });
    }
}
