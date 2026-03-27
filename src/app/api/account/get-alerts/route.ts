// src/app/api/account/get-alerts/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/drizzle";
import { userPreferences } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const [userData] = await db
            .select({
                smsAlerts: userPreferences.smsAlerts,
                emailAlerts: userPreferences.emailAlerts,
                pushNotifications: userPreferences.pushNotifications,
                alertRadius: userPreferences.alertRadius,
            })
            .from(userPreferences)
            .where(eq(userPreferences.userId, parseInt(session.user.id)))
            .limit(1);

        return NextResponse.json(userData || {});
    } catch (error) {
        console.error("Error fetching alerts:", error);
        return NextResponse.json({ error: "Failed to fetch alerts" }, { status: 500 });
    }
}