// src/app/api/account/get-alerts/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/drizzle";
import { user } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const [userData] = await db
            .select({
                useCurrentLocation: user.useCurrentLocation,
                defaultLatitude: user.defaultLatitude,
                defaultLongitude: user.defaultLongitude,
                defaultAddress: user.defaultAddress,
            })
            .from(user)
            .where(eq(user.userId, parseInt(session.user.id)))
            .limit(1);

        return NextResponse.json(userData || {});
    } catch (error) {
        console.error("Error fetching alerts:", error);
        return NextResponse.json({ error: "Failed to fetch alerts" }, { status: 500 });
    }
}