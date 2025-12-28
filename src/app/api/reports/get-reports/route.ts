// src/app/api/reports/get-reports/route.ts
import { NextResponse } from "next/server";
import { openDb } from "@/lib/db";

export async function GET() {
    try {
        const db = await openDb();

        const reports = await db.all(`
      SELECT 
        r.report_id,
        r.offence_id AS offence,
        r.severity_level AS severity,
        r.location_address AS location,
        r.timestamp,
        r.description,
        r.witnesses_present AS witnesses,
        r.police_contacted AS policeContacted,
        r.upvotes,
        rm.file_path AS image
      FROM real_time_report r
      LEFT JOIN report_media rm ON r.report_id = rm.report_id
      ORDER BY r.timestamp DESC
    `);

        // Format timestamp to relative time
        const formattedReports = reports.map(report => ({
            ...report,
            time: formatRelativeTime(report.timestamp),
        }));

        return NextResponse.json(formattedReports);
    } catch (error) {
        console.error("Error fetching reports:", error);
        return NextResponse.json(
            { error: "Failed to fetch reports" },
            { status: 500 }
        );
    }
}

// Helper function for relative time
function formatRelativeTime(timestamp: string) {
    const now = new Date();
    const reportTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - reportTime.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return reportTime.toLocaleDateString();
}