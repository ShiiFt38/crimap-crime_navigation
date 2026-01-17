import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { district, station, crimeRecord } from "@/lib/schema";
import { eq, sql, desc } from "drizzle-orm";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const pageRaw = Number(searchParams.get("page"));
        const limitRaw = Number(searchParams.get("limit"));

        const page = Number.isInteger(pageRaw) && pageRaw > 0 ? pageRaw : 1;
        const limit = Number.isInteger(limitRaw) && limitRaw > 0 ? limitRaw : 10;
        const offset = (page - 1) * limit;

        const districts = await db
            .select({
                districtId: district.districtId,
                districtName: district.districtName,
                population: district.population,
                totalCrimes: sql<number>`
                    COALESCE(SUM(${crimeRecord.count}), 0)
                `.as("total_crimes"),
            })
            .from(district)
            .leftJoin(station, eq(district.districtId, station.districtId))
            .leftJoin(crimeRecord, eq(station.stationId, crimeRecord.stationId))
            .groupBy(
                district.districtId,
                district.districtName,
                district.population
            )
            .orderBy(desc(sql`total_crimes`), district.districtId)
            .limit(limit)
            .offset(offset);

        const totalResult = await db
            .select({
                total: sql<number>`
                    COUNT(DISTINCT ${district.districtId})
                `.as("total"),
            })
            .from(district);

        const total = totalResult.length ? Number(totalResult[0].total) : 0;

        const MAX_EXPECTED_RATE = 6000;

        const districtsWithIndex = districts.map((d) => {
            const population = d.population && d.population > 0 ? d.population : 10_000;
            const totalCrimes = Number(d.totalCrimes) || 0;

            const crimeRatePer100k = (totalCrimes / population) * 100_000;
            const crimeIndexRaw = crimeRatePer100k / (MAX_EXPECTED_RATE / 12);
            const crimeIndex = Math.min(12, Math.max(1, crimeIndexRaw + 1));

            let riskLevel: "Low Risk" | "Moderate Risk" | "High Risk";
            if (crimeIndex < 4) riskLevel = "Low Risk";
            else if (crimeIndex > 8) riskLevel = "High Risk";
            else riskLevel = "Moderate Risk";

            return {
                id: d.districtId,
                district_name: d.districtName,
                crimeIndex: crimeIndex.toFixed(1),
                riskLevel,
            };
        });

        return NextResponse.json({
            page,
            limit,
            total,
            districts: districtsWithIndex,
        });
    } catch (error) {
        console.error("Error fetching districts:", error);
        return NextResponse.json(
            { error: "Failed to fetch districts" },
            { status: 500 }
        );
    }
}
