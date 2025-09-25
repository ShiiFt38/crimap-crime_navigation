import { NextResponse } from "next/server";
import { openDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username, fullName, phoneNumber } = await req.json();

    if (!username || !fullName || !phoneNumber) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if username already exists for another user
    if (username !== session.user.name) {
        const db = await openDb();
        try {
            const existingUser = await db.get(
                "SELECT user_id FROM user WHERE username = ? AND user_id != ?",
                [username, session.user.id]
            );
            if (existingUser) {
                return NextResponse.json({ error: "Username already taken" }, { status: 400 });
            }
        } finally {
            await db.close();
        }
    }

    const db = await openDb();
    try {
        await db.run(
            "UPDATE user SET username = ?, full_name = ?, phone = ? WHERE user_id = ?",
            [username, fullName, phoneNumber, session.user.id]
        );

        return NextResponse.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.error("Profile update error: ", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    } finally {
        await db.close();
    }
}