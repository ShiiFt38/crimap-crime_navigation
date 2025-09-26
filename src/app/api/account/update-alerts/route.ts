import { NextResponse } from "next/server";
import { openDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { smsAlerts, emailAlerts, pushNotifications } = await req.json();

    // Validate input
    if (typeof smsAlerts !== "boolean" || typeof emailAlerts !== "boolean" || typeof pushNotifications !== "boolean") {
        return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
    }

    const db = await openDb();
    try {
        await db.run(
            `UPDATE user SET sms_alerts = ?, email_alerts = ?, push_notifications = ? WHERE user_id = ?`,
            [smsAlerts ? 1 : 0, emailAlerts ? 1 : 0, pushNotifications ? 1 : 0, session.user.id]
        );

        return NextResponse.json({ success: true, message: "Alert preferences updated successfully" });
    } catch (error) {
        console.error("Alert preferences update error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    } finally {
        await db.close();
    }
}