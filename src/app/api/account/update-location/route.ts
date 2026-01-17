// src/app/api/account/update-location/route.ts
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

    try {
        const { latitude, longitude, address, useCurrentLocation } = await request.json();

        await db
            .update(user)
            .set({
                defaultLatitude: latitude || null,
                defaultLongitude: longitude || null,
                defaultAddress: address || null,
                useCurrentLocation: useCurrentLocation ?? false,
            })
            .where(eq(user.userId, parseInt(session.user.id)));

        return NextResponse.json({ message: "Location updated" });
    } catch (error) {
        console.error("Error updating location:", error);
        return NextResponse.json({ error: "Failed to update location" }, { status: 500 });
    }
}