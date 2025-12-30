// src/app/api/reports/report/route.ts
import { NextResponse } from "next/server";
import { openDb } from "@/lib/db";
import { writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const config = {
    api: {
        bodyParser: false, // Required for FormData
    },
};

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized"}, { status: 401 })
    }

    try {
        const db = await openDb();
        const formData = await request.formData();

        const offence = formData.get("offence") as string;
        const severity = formData.get("severity") as string | null;
        const location = formData.get("location") as string;
        const date = formData.get("date") as string;
        const time = formData.get("time") as string;
        const description = formData.get("description") as string;
        const witnesses = formData.get("witnesses") as string | null;
        const policeContacted = formData.get("policeContacted") as string | null;
        const mediaFiles = formData.getAll("media") as File[];

        if (!offence || !location || !date || !time || !description) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const timestamp = `${date} ${time}:00`;

        const result = await db.run(
            `INSERT INTO real_time_report (
                user_id, offence_id, station_id, description, location_address,
                latitude, longitude, timestamp, verification_status, upvotes,
                severity_level, witnesses_present, police_contacted
            ) VALUES (NULL, ?, NULL, ?, ?, NULL, NULL, ?, 'pending', 0, ?, ?, ?)`,
            [
                offence,
                description,
                location,
                timestamp,
                severity,
                witnesses ? 1 : 0,
                policeContacted ? 1 : 0,
            ]
        );

        const reportId = result.lastID!;

        // Handle multiple media files
        for (const file of mediaFiles) {
            if (file.size === 0) continue;

            const buffer = Buffer.from(await file.arrayBuffer());
            const ext = file.name.split('.').pop() || 'bin';
            const filename = `${randomUUID()}.${ext}`;
            const filePath = `/uploads/${filename}`;

            await writeFile(join(process.cwd(), "public", "uploads", filename), buffer);

            const mediaType = file.type.startsWith("video/") ? "video"
                : file.type.startsWith("audio/") ? "audio" : "image";

            await db.run(
                `INSERT INTO report_media (report_id, file_path, media_type)
         VALUES (?, ?, ?)`,
                [reportId, filePath, mediaType]
            );
        }

        return NextResponse.json({ message: "Report submitted successfully" }, { status: 201 });
    } catch (error) {
        console.error("Submission error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}