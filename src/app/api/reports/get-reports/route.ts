import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { offence, realTimeReport, reportMedia, user } from "@/lib/schema";
import { desc, eq, inArray } from "drizzle-orm";

function formatRelativeTime(timestamp: Date | string) {
    const reportDate = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now.getTime() - reportDate.getTime()) / 1000);

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;

    return reportDate.toLocaleDateString();
}

export async function GET() {
    try {
        const reports = await db
            .select({
                reportId: realTimeReport.reportId,
                offenceName: offence.offenceName,
                location: realTimeReport.locationAddress,
                timestamp: realTimeReport.timestamp,
                description: realTimeReport.description,
                upvotes: realTimeReport.upvotes,
                anonymous: realTimeReport.anonymous,
                author: user.username,
            })
            .from(realTimeReport)
            .leftJoin(offence, eq(realTimeReport.offenceId, offence.offenceId))
            .leftJoin(user, eq(realTimeReport.userId, user.userId))
            .orderBy(desc(realTimeReport.timestamp));

        const reportIds = reports.map((report) => report.reportId);
        const mediaRows = reportIds.length === 0
            ? []
            : await db
                .select({
                    reportId: reportMedia.reportId,
                    path: reportMedia.filePath,
                    type: reportMedia.mediaType,
                })
                .from(reportMedia)
                .where(inArray(reportMedia.reportId, reportIds));

        const mediaByReportId = mediaRows.reduce<Record<number, Array<{ path: string; type: "image" | "video" | "audio" }>>>(
            (acc, media) => {
                if (!acc[media.reportId]) {
                    acc[media.reportId] = [];
                }

                acc[media.reportId].push({
                    path: media.path,
                    type: (media.type || "image") as "image" | "video" | "audio",
                });

                return acc;
            },
            {}
        );

        return NextResponse.json(
            reports.map((report) => ({
                report_id: report.reportId,
                offence: report.offenceName,
                location: report.location,
                description: report.description,
                upvotes: report.upvotes ?? 0,
                time: report.timestamp ? formatRelativeTime(report.timestamp) : "Unknown time",
                media: mediaByReportId[report.reportId] || [],
                anonymous: Boolean(report.anonymous),
                author: report.anonymous ? "Anonymous" : report.author || "User",
            }))
        );
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 });
    }
}
