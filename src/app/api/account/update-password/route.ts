import { NextResponse } from "next/server";
import { openDb } from "@/lib/db";
import bcrypt from "bcryptjs";
import {getServerSession} from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request){
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, {status: 401})
    }

    const { currentPassword, newPassword, confirmPassword } = await req.json();

    if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error("MISSING_CREDENTIALS");
    }

    if (newPassword !== confirmPassword) {
        return NextResponse.json({ error: "PASSWORD_MISMATCH" }, { status: 400 });
    }

    const db = await openDb();
    try {
        const user = await db.get(
            "SELECT password_hash FROM user WHERE user_id = ?",
            [session.user.id]
        );

        if (!user || !user.password_hash) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        const isValid = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isValid) {
            return NextResponse.json({ error: "PASSWORD_INCORRECT" }, { status: 400 });
        }

        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        await db.run("UPDATE user SET password_hash = ? WHERE user_id = ?",
            [newPasswordHash, session.user.id]
        );

        return NextResponse.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Password update error: ", error);
        return NextResponse.json({ error: "Server error" }, { status: 500});
    } finally {
        await db.close();
    }
}