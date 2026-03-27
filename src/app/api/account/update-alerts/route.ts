// src/app/api/account/update-alerts/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { userPreferences } from "@/lib/schema";
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
        const smsAlerts = Boolean(body["smsAlerts"]);
        const emailAlerts = Boolean(body["emailAlerts"]);
        const pushNotifications = Boolean(body["pushNotifications"]);

        const userId = parseInt(session.user.id);
        const [existing] = await db
            .select({ preferenceId: userPreferences.preferenceId })
            .from(userPreferences)
            .where(eq(userPreferences.userId, userId))
            .limit(1);

        if (existing) {
            await db
                .update(userPreferences)
                .set({
                    smsAlerts,
                    emailAlerts,
                    pushNotifications,
                })
                .where(eq(userPreferences.userId, userId));
        } else {
            await db
                .insert(userPreferences)
                .values({
                    userId,
                    smsAlerts,
                    emailAlerts,
                    pushNotifications,
                    alertRadius: 5,
                });
        }

        return NextResponse.json({ message: "Alerts updated" });
    } catch (error) {
        console.error("Error updating alerts:", error);
        return NextResponse.json({ error: "Failed to update alerts" }, { status: 500 });
    }
}
