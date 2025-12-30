// src/app/api/reports/comments/route.ts
import { NextResponse } from "next/server";
import { openDb } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get("reportId");

    if (!reportId) {
        return NextResponse.json({ error: "reportId required" }, { status: 400 });
    }

    try {
        const db = await openDb();
        const comments = await db.all(`
      SELECT 
        c.comment_id,
        c.comment_text,
        c.timestamp,
        u.username AS author
      FROM report_comment c
      JOIN user u ON c.user_id = u.user_id
      WHERE c.report_id = ?
      ORDER BY c.timestamp ASC
    `, [reportId]);

        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { reportId, comment } = await request.json();
        if (!reportId || !comment?.trim()) {
            return NextResponse.json({ error: "Missing data" }, { status: 400 });
        }

        const db = await openDb();
        await db.run(
            `INSERT INTO report_comment (report_id, user_id, comment_text)
       VALUES (?, ?, ?)`,
            [reportId, session.user.id, comment.trim()]
        );

        return NextResponse.json({ message: "Comment added" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
    }
}