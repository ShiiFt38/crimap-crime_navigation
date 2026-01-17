// src/app/api/account/update-password/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { user } from "@/lib/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
        return NextResponse.json({ error: "Missing passwords" }, { status: 400 });
    }

    try {
        const [existing] = await db
            .select({ passwordHash: user.passwordHash })
            .from(user)
            .where(eq(user.userId, userId))
            .limit(1);

        if (!existing) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isValid = await bcrypt.compare(currentPassword, existing.passwordHash);
        if (!isValid) {
            return NextResponse.json({ error: "Current password incorrect" }, { status: 401 });
        }

        const newHash = await bcrypt.hash(newPassword, 10);

        await db
            .update(user)
            .set({ passwordHash: newHash })
            .where(eq(user.userId, userId));

        return NextResponse.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
    }
}