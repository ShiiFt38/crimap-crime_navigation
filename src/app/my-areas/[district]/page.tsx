import { db } from "@/lib/drizzle";
import { crimeRecord, district, offence, station } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import Map from "./components/Map";
import StatsSummary from "./components/StatsSummary";
import TrendsChart from "./components/TrendsChart";
import RecentIncidents from "./components/RecentIncidents";
import SafetyTips from "./components/SafetyTips";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CrimeBreakdown from "@/app/my-areas/[district]/components/CrimeBreakdown";

type DistrictPageProps = {
    params: Promise<{ district: string }>;
};

export default async function DistrictPage({ params }: DistrictPageProps) {
    const resolvedParams = await params;
    const districtSlug = resolvedParams.district;
    const normalizedName = districtSlug.replace(/-/g, " ");

    const [dist] = await db
        .select({
            districtId: district.districtId,
            districtName: district.districtName,
            population: district.population,
        })
        .from(district)
        .where(eq(district.districtName, normalizedName))
        .limit(1);

    if (!dist) {
        return <div>District not found</div>;
    }

    const rows = await db
        .select({
            count: crimeRecord.count,
            date: crimeRecord.date,
            station_name: station.stationName,
            population: district.population,
            district_name: district.districtName,
            offence_name: offence.offenceName,
        })
        .from(crimeRecord)
        .leftJoin(station, eq(crimeRecord.stationId, station.stationId))
        .leftJoin(district, eq(station.districtId, district.districtId))
        .leftJoin(offence, eq(crimeRecord.offenceId, offence.offenceId))
        .where(eq(district.districtId, dist.districtId))
        .orderBy(desc(crimeRecord.date));

    const hasData = rows.length > 0 && rows.some((row) => row.count > 0);
    const normalizedRows = rows.map((row) => ({
        ...row,
        date: new Date(row.date).toISOString(),
    }));

    if (!hasData) {
        return (
            <div className="bg-gray-100 min-h-screen pb-14 font-inter flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">No Crime Data Found</h1>
                    <p className="text-gray-500 mb-6">
                        It seems there is no crime data available for {normalizedName}.
                    </p>
                    <Link href="/my-areas" className="inline-flex items-center px-4 py-2 bg-[#B05216] text-white rounded-lg hover:bg-[#4F2915]">
                        <ArrowLeft className="mr-2" /> Back to All Areas
                    </Link>
                </div>
            </div>
        );
    }

    const trendsData = normalizedRows.reduce((acc, row) => {
        const month = new Date(row.date).toLocaleString("default", { month: "short" });
        acc[month] = (acc[month] || 0) + row.count;
        return acc;
    }, {} as Record<string, number>);

    const trendLabels = Object.keys(trendsData).sort();
    const trendData = trendLabels.map((month) => trendsData[month]);
    const recentRows = [...normalizedRows]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

    return (
        <div className="bg-gray-100 min-h-screen pb-14 font-inter">
            <Map />
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-14 z-8">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Link href="/my-areas" className="group p-2 cursor-pointer hover:bg-gray-100 rounded-full">
                                <ArrowLeft className="group-active:text-[#4F2915]" />
                            </Link>
                            <div>
                                <h1 className="text-lg font-semibold text-gray-900">{dist.districtName.replace("District", "")}</h1>
                                <p className="text-sm text-gray-500">Crime & Safety Overview</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                <StatsSummary rows={normalizedRows} />
                <CrimeBreakdown rows={normalizedRows} />
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Crime Trends (Last 6 Months)</h3>
                    <TrendsChart labels={trendLabels} data={trendData} />
                </div>
                <RecentIncidents rows={recentRows} district={dist.districtName} />
                <SafetyTips district={dist.districtName} />
            </div>
        </div>
    );
}
