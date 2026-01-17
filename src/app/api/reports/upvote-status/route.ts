import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reportUpvoteTable } from "@/lib/tables";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get("reportId");

    if (!session?.user?.id || !reportId) return NextResponse.json({ hasUpvoted: false });

    const existing = await db.select().from(reportUpvoteTable)
        .where(eq(reportUpvoteTable.reportId, Number(reportId)))
        .where(eq(reportUpvoteTable.userId, session.user.id))
        .then(r => r[0]);

    return NextResponse.json({ hasUpvoted: !!existing });
}
