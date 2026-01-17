import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { realTimeReport, reportMedia, user } from "@/lib/schema";
import { sql, eq } from "drizzle-orm";

function formatRelativeTime(timestamp: Date) {
    const now = new Date();
    const diff = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    return timestamp.toLocaleDateString();
}

export async function GET() {
    try {
        const reports = await db
            .select({
                reportId: realTimeReport.reportId,
                offence: realTimeReport.offenceId,
                location: realTimeReport.locationAddress,
                timestamp: realTimeReport.timestamp,
                description: realTimeReport.description,
                upvotes: realTimeReport.upvotes,
                mediaPaths: sql<string>`COALESCE(GROUP_CONCAT(${reportMedia.filePath}), '')`,
                mediaTypes: sql<string>`COALESCE(GROUP_CONCAT(${reportMedia.mediaType}), '')`,
            })
            .from(realTimeReport)
            .leftJoin(reportMedia, eq(realTimeReport.reportId, reportMedia.reportId))
            .groupBy(realTimeReport.reportId)
            .orderBy(sql`${realTimeReport.timestamp} DESC`);

        const formatted = reports.map((r) => {
            const paths = r.mediaPaths ? r.mediaPaths.split(",").filter(Boolean) : [];
            const types = r.mediaTypes ? r.mediaTypes.split(",").filter(Boolean) : [];
            const media = paths.map((path, i) => ({
                path,
                type: (types[i] || "image") as "image" | "video" | "audio",
            }));

            return {
                report_id: r.reportId,
                offence: r.offence,
                location: r.location,
                description: r.description,
                upvotes: r.upvotes,
                time: formatRelativeTime(r.timestamp),
                media,
            };
        });

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 });
    }
}