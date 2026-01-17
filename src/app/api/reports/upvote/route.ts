// src/app/api/reports/upvote/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { reportUpvote, realTimeReport } from "@/lib/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { eq, sql } from "drizzle-orm";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const { reportId } = await request.json();

    if (!reportId || isNaN(reportId)) {
        return NextResponse.json({ error: "Invalid report ID" }, { status: 400 });
    }

    try {
        const existing = await db.select({ upvoteId: reportUpvote.upvoteId })
            .from(reportUpvote)
            .where(
                eq(reportUpvote.reportId, reportId) && eq(reportUpvote.userId, userId)
            )
            .limit(1);

        if (existing.length > 0) {
            // Remove upvote
            await db.delete(reportUpvote).where(eq(reportUpvote.upvoteId, existing[0].upvoteId));
            await db.update(realTimeReport)
                .set({ upvotes: sql`${realTimeReport.upvotes} - 1` })
                .where(eq(realTimeReport.reportId, reportId));

            const updated = await db.select({ upvotes: realTimeReport.upvotes })
                .from(realTimeReport)
                .where(eq(realTimeReport.reportId, reportId))
                .limit(1);

            return NextResponse.json({
                message: "Upvote removed",
                upvotes: updated[0]?.upvotes || 0,
                hasUpvoted: false,
            });
        } else {
            // Add upvote
            await db.insert(reportUpvote).values({ reportId, userId: userId });
            await db.update(realTimeReport)
                .set({ upvotes: sql`${realTimeReport.upvotes} + 1` })
                .where(eq(realTimeReport.reportId, reportId));

            const updated = await db.select({ upvotes: realTimeReport.upvotes })
                .from(realTimeReport)
                .where(eq(realTimeReport.reportId, reportId))
                .limit(1);

            return NextResponse.json({
                message: "Upvoted successfully",
                upvotes: updated[0]?.upvotes || 0,
                hasUpvoted: true,
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to toggle upvote" }, { status: 500 });
    }
}