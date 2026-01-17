// src/app/api/account/update-user/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { user } from "@/lib/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const body = await request.json();

    try {
        const updated = await db
            .update(user)
            .set({
                fullName: body.fullName || null,
                phone: body.phone || null,
                defaultAddress: body.address || null,
                defaultLatitude: body.latitude || null,
                defaultLongitude: body.longitude || null,
                useCurrentLocation: body.useCurrentLocation ?? false,
            })
            .where(eq(user.userId, userId))
            .returning({
                fullName: user.fullName,
                phone: user.phone,
                defaultAddress: user.defaultAddress,
                defaultLatitude: user.defaultLatitude,
                defaultLongitude: user.defaultLongitude,
                useCurrentLocation: user.useCurrentLocation,
            });

        return NextResponse.json({ message: "User updated", user: updated[0] });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}