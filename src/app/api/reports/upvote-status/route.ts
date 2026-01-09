// src/app/api/reports/upvote-status/route.ts
import { NextResponse } from "next/server";
import { openDb } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get("reportId");

    if (!session?.user?.id || !reportId) {
        return NextResponse.json({ hasUpvoted: false });
    }

    try {
        const db = await openDb();
        const existing = await db.get(
            `SELECT 1 FROM report_upvote WHERE report_id = ? AND user_id = ?`,
            [reportId, session.user.id]
        );

        return NextResponse.json({ hasUpvoted: !!existing });
    } catch (error) {
        return NextResponse.json({ hasUpvoted: false });
    }
}