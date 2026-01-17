// src/app/api/account/update-alerts/route.ts
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
        const body = await request.json();
        const { useCurrentLocation, defaultLatitude, defaultLongitude, defaultAddress } = body;

        await db
            .update(user)
            .set({
                useCurrentLocation: useCurrentLocation ?? false,
                defaultLatitude: defaultLatitude || null,
                defaultLongitude: defaultLongitude || null,
                defaultAddress: defaultAddress || null,
            })
            .where(eq(user.userId, parseInt(session.user.id)));

        return NextResponse.json({ message: "Alerts updated" });
    } catch (error) {
        console.error("Error updating alerts:", error);
        return NextResponse.json({ error: "Failed to update alerts" }, { status: 500 });
    }
}