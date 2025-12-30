// src/app/api/reports/get-reports/route.ts
import { NextResponse } from "next/server";
import { openDb } from "@/lib/db";

function formatRelativeTime(timestamp: string) {
    const now = new Date();
    const reportTime = new Date(timestamp);
    const diff = Math.floor((now.getTime() - reportTime.getTime()) / 1000);

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    return reportTime.toLocaleDateString();
}

export async function GET() {
    try {
        const db = await openDb();

        const reports = await db.all(`
            SELECT r.report_id,
                   r.offence_id                AS offence,
                   r.location_address          AS location,
                   r.timestamp,
                   r.description,
                   r.upvotes,
                   GROUP_CONCAT(rm.file_path)  AS media_paths,
                   GROUP_CONCAT(rm.media_type) AS media_types
            FROM real_time_report r
                     LEFT JOIN report_media rm ON r.report_id = rm.report_id
            GROUP BY r.report_id
            ORDER BY r.timestamp DESC
        `);

        const formatted = reports.map((r) => {
            const paths = r.media_paths ? r.media_paths.split(",") : [];
            const types = r.media_types ? r.media_types.split(",") : [];
            const media = paths.map((path: string, i: number) => ({
                path,
                type: types[i] || "image",
            }));

            return {
                report_id: r.report_id,
                offence: r.offence,
                location: r.location,
                description: r.description,
                upvotes: r.upvotes,
                time: formatRelativeTime(r.timestamp),
                media: r.media_paths ? r.media_paths.split(",").map((path: string, i: number) => ({
                    path,
                    type: r.media_types.split(",")[i] || "image",
                })) : [],
            };
        });

        return NextResponse.json(formatted);
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch reports"}, {status: 500});
    }
}