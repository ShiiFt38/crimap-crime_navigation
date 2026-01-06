//TODO: Implement comments table and query against it
//TODO: Implement upvotes feature
//TODO: Implement card pin feature

import CrimeReportCard from "@/app/reports/components/CrimeReportCard";


async function getReports(){
    const res = await fetch("http://localhost:3000/api/reports/get-reports", {
        cache: "no-store"
    });
    if (!res.ok) throw new Error("Failed to fetch reports");
    return res.json();
}

export default async function Reports(){
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
                    author={report.anonymous ? "Anonymous" : "User"}
                    likes={report.upvotes}
                    reportId={report.report_id}
                    media={report.media}
                />
            ))}
        </div>
    )
}