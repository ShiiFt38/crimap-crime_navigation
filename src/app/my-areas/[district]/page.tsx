{/*
This is the main page for a specific district's crime and safety overview.
It fetches data from the database for a single district based on the URL parameter.
Here's how it works:

1. Wait for the district name from the URL (a promise that gives us { district: string }).
2. Connect to the database and run a query to get all crime records for that district.
   - The query joins tables (crime_record, station, district, offence) and returns an array of objects like:
     - { district_name: string, station_name: string, offence_name: string, date: string, count: number }[].
   - It filters where the district name (lowercase, with spaces as hyphens) matches the URL parameter.
3. Organize the data:
   - Use a reduce function to group crimes by offence, creating a Record<string, number> (e.g., { "Theft": 35, "Assault": 20 }) for the crime breakdown chart.
   - Use a reduce function to group crimes by month, creating a Record<string, number> (e.g., { "Jan": 45, "Feb": 52 }) for the trends chart.
   - Sort the original array by date and take the first 3 as { offence_name: string, date: string, count: number }[] for recent incidents.
4. Display the page layout:
   - Show a map at the top.
   - Add a header with the district name and a back button to return to the main areas page.
   - Include sections for stats summary, crime breakdown chart, trends chart, recent incidents, and safety tips.
   - Pass the organized data (arrays or records) to each section component to render their parts.
This page runs on the server, so it prepares everything (including the typed data) before sending it to the browser.
*/}

import { openDb } from "@/lib/db";
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
    const db = await openDb();
    const { district } = resolvedParams;

    const rows = await db.all(
        `SELECT
             d.district_name,
             d.population,
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

    // Log the fetched data to the server console for debugging
    // console.log("Fetched rows for district", district, ":", rows);

    // Check if data is empty or all counts are 0
    const hasData = rows.length > 0 && rows.some(row => row.count > 0);

    if (!hasData) {
        return (
            <div className="bg-gray-100 min-h-screen pb-14 font-inter flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">No Crime Data Found</h1>
                    <p className="text-gray-500 mb-6">It seems there is no crime data available for {district
                        .replace("-", " ").split(" ")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}.</p>
                    <Link href="/my-areas" className="inline-flex items-center px-4 py-2 bg-[#B05216] text-white rounded-lg hover:bg-[#4F2915]">
                        <ArrowLeft className="mr-2" /> Back to All Areas
                    </Link>
                </div>
            </div>
        );
    }

    // Aggregate crime counts by offence for the chart
    const crimeData = rows.reduce((acc, row) => {
        acc[row.offence_name] = (acc[row.offence_name] || 0) + row.count;
        return acc;
    }, {} as Record<string, number>);
    const labels = Object.keys(crimeData);
    const data = Object.values(crimeData);

    // Aggregate crime trends by month (simplified example)
    const trendsData = rows.reduce((acc, row) => {
        const month = new Date(row.date).toLocaleString("default", { month: "short" });
        acc[month] = (acc[month] || 0) + row.count;
        return acc;
    }, {} as Record<string, number>);
    const trendLabels = Object.keys(trendsData).sort();
    const trendData = trendLabels.map((month) => trendsData[month]);

    // Sort rows by date for recent incidents
    const recentRows = [...rows].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

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
                                <h1 className="text-lg font-semibold text-gray-900">{rows[0]?.district_name.replace("District", "")}</h1>
                                <p className="text-sm text-gray-500">Crime & Safety Overview</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                <StatsSummary rows={rows} />
                <CrimeBreakdown rows={rows} />
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Crime Trends (Last 6 Months)</h3>
                    <TrendsChart labels={trendLabels} data={trendData} />
                </div>
                <RecentIncidents rows={recentRows} district={district} />
                <SafetyTips district={district} />
            </div>
        </div>
    );
}