import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { openDb } from "@/lib/db"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized - PLease log in" }, { status: 401 });
    }

    try {
        const db = await openDb();
        const { reportId } = await request.json();

        if (!reportId || isNaN(reportId)) {
            return NextResponse.json({ error: "Missing reportId" }, { status: 400 });
        }

        await db.run(
            `UPDATE real_time_report SET upvotes = upvotes + 1 WHERE report_id=?`,
            [reportId]
        );

        const result = await db.get(
            `SELECT upvotes FROM real_time_report WHERE report_id=?`,
            [reportId]
        );

        return NextResponse.json({
            message: "Upvoted successfully",
            upvotes: result?.upvotes || 0
        });
    } catch (error) {
        console.error("Error upvoting report:", error);
        return NextResponse.json({ error: "Failed to upvote" }, { status: 500 });
    }
}