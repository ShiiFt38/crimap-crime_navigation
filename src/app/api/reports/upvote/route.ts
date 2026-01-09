// src/app/api/reports/upvote/route.ts
import { NextResponse } from "next/server";
import { openDb } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    try {
        const { reportId } = await request.json();

        if (!reportId || isNaN(reportId)) {
            return NextResponse.json({ error: "Invalid report ID" }, { status: 400 });
        }

        const db = await openDb();

        // Check if user already upvoted
        const existing = await db.get(
            `SELECT upvote_id FROM report_upvote WHERE report_id = ? AND user_id = ?`,
            [reportId, userId]
        );

        if (existing) {
            // Remove upvote
            await db.run(
                `DELETE FROM report_upvote WHERE upvote_id = ?`,
                [existing.upvote_id]
            );
            await db.run(
                `UPDATE real_time_report SET upvotes = upvotes - 1 WHERE report_id = ?`,
                [reportId]
            );

            const updated = await db.get(`SELECT upvotes FROM real_time_report WHERE report_id = ?`, [reportId]);

            return NextResponse.json({
                message: "Upvote removed",
                upvotes: updated?.upvotes || 0,
                hasUpvoted: false,
            });
        } else {
            // Add upvote
            await db.run(
                `INSERT INTO report_upvote (report_id, user_id) VALUES (?, ?)`,
                [reportId, userId]
            );
            await db.run(
                `UPDATE real_time_report SET upvotes = upvotes + 1 WHERE report_id = ?`,
                [reportId]
            );

            const updated = await db.get(`SELECT upvotes FROM real_time_report WHERE report_id = ?`, [reportId]);

            return NextResponse.json({
                message: "Upvoted",
                upvotes: updated?.upvotes || 0,
                hasUpvoted: true,
            });
        }
    } catch (error) {
        console.error("Error toggling upvote:", error);
        return NextResponse.json({ error: "Failed to toggle upvote" }, { status: 500 });
    }
}