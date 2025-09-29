import { NextResponse } from "next/server";
import { openDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        console.log("No authenticated session found");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Fetching preferences for user_id:", session.user.id); // Debug user_id

    const db = await openDb();
    try {
        const preferences = await db.get(
            `SELECT sms_alerts, email_alerts, push_notifications FROM user_preference WHERE user_id = ?`,
            [session.user.id]
        );

        console.log("Query result:", preferences); // Debug query result

        if (!preferences) {
            console.log("No alert preferences found for user_id:", session.user.id);
            return NextResponse.json({
                smsAlerts: false,
                emailAlerts: false,
                pushNotifications: false,
            });
        }

        console.log("Alert preferences fetched successfully:", preferences);

        return NextResponse.json({
            smsAlerts: !!preferences.sms_alerts, // Convert 0/1 to boolean
            emailAlerts: !!preferences.email_alerts,
            pushNotifications: !!preferences.push_notifications,
        });
    } catch (error) {
        console.error("Error fetching alert preferences:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    } finally {
        await db.close();
    }
}