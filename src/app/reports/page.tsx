import CrimeReportCard from "@/app/reports/components/CrimeReportCard";
import { headers } from "next/headers";

async function getReports() {
    const headerList = await headers();
    const host = headerList.get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    const res = await fetch(`${protocol}://${host}/api/reports/get-reports`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch reports");
    }

    return res.json();
}

export default async function Reports() {
    let reports = [];

    try {
        reports = await getReports();
    } catch (error) {
        console.error(error);
        return <div className="text-center py-10">Failed to load reports</div>;
    }

    if (reports.length === 0) {
        return <div className="text-center py-10">No reports yet. Be the first to submit one!</div>;
    }

    return (
        <div id="reportsContent" className="max-w-7xl mx-auto py-10 space-y-6">
            {reports.map((report: any) => (
                <CrimeReportCard
                    key={report.report_id}
                    offence={report.offence || "Unknown offence"}
                    time={report.time}
                    description={report.description}
                    location={report.location}
                    author={report.author}
                    likes={report.upvotes}
                    reportId={report.report_id}
                    media={report.media}
                />
            ))}
        </div>
    );
}
