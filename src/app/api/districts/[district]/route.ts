// src/app/api/districts/[district]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { district, station, crimeRecord } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(request: Request, { params }: { params: { district: string } }) {
    try {
        const districtId = parseInt(params.district);

        if (isNaN(districtId)) {
            return NextResponse.json({ error: "Invalid district ID" }, { status: 400 });
        }

        const [dist] = await db
            .select({
                districtId: district.districtId,
                districtName: district.districtName,
                population: district.population,
                totalCrimes: sql<number>`COALESCE(SUM(${crimeRecord.count}), 0)`.as("total_crimes"),
            })
            .from(district)
            .leftJoin(station, eq(district.districtId, station.districtId))
            .leftJoin(crimeRecord, eq(station.stationId, crimeRecord.stationId))
            .where(eq(district.districtId, districtId))
            .groupBy(district.districtId, district.districtName, district.population)
            .limit(1);

        if (!dist) {
            return NextResponse.json({ error: "District not found" }, { status: 404 });
        }

        const population = dist.population || 10000;
        const latestTotalCrimes = Number(dist.totalCrimes) || 0;
        const crimeRatePer100k = (latestTotalCrimes / population) * 100000;
        const maxExpectedRate = 6000;
        const crimeIndexBase = crimeRatePer100k / (maxExpectedRate / 12);
        const crimeIndex = Math.max(1, Math.min(12, crimeIndexBase + 1)).toFixed(1);

        let riskLevel = "Moderate Risk";
        if (parseFloat(crimeIndex) < 4) riskLevel = "Low Risk";
        else if (parseFloat(crimeIndex) > 8) riskLevel = "High Risk";

        return NextResponse.json({
            id: dist.districtId,
            district_name: dist.districtName,
            crimeIndex,
            riskLevel,
        });
    } catch (error) {
        console.error("Error fetching district:", error);
        return NextResponse.json({ error: "Failed to fetch district" }, { status: 500 });
    }
}
