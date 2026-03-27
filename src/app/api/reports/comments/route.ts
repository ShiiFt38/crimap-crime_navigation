import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { reportComment, user } from "@/lib/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { asc, eq } from "drizzle-orm";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get("reportId");

    if (!reportId) {
        return NextResponse.json({ error: "reportId required" }, { status: 400 });
    }

    try {
        const comments = await db.select({
            commentId: reportComment.commentId,
            commentText: reportComment.commentText,
            timestamp: reportComment.timestamp,
            author: user.username,
        })
            .from(reportComment)
            .leftJoin(user, eq(reportComment.userId, user.userId))
            .where(eq(reportComment.reportId, parseInt(reportId)))
            .orderBy(asc(reportComment.timestamp));

        return NextResponse.json(comments);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { reportId, comment } = await request.json();

    if (!reportId || !comment?.trim()) {
        return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    try {
        await db.insert(reportComment).values({
            reportId: parseInt(reportId),
            userId: parseInt(session.user.id),
            commentText: comment.trim(),
        });

        return NextResponse.json({ message: "Comment added" });
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
    }
}
