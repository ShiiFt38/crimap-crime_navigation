import { NextResponse } from "next/server";
import { openDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }

    const { address, useCurrentLocation, latitude, longitude } = await req.json();

    if (!useCurrentLocation && !address) {
        return NextResponse.json(
            { error: "MISSING_LOCATION" },
            { status: 400 }
        );
    }

    const db = await openDb();
    try {
        await db.run(
            `UPDATE user SET default_address = ?, default_latitude = ?, default_longitude = ?, use_current_location = ?
       WHERE user_id = ?`,
            [
                address || null,
                useCurrentLocation ? latitude : null,
                useCurrentLocation ? longitude : null,
                useCurrentLocation,
                session.user.id,
            ]
        );

        return NextResponse.json({
            success: true,
            message: "Location updated successfully",
        });
    } catch (error) {
        console.error("Location update error: ", error);
        return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
    } finally {
        await db.close();
    }
}