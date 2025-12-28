// src/app/api/reports/report/route.ts
import { NextResponse } from "next/server";
import { openDb } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const db = await openDb();
        const body = await request.json();

        const {
            offence,
            severity,
            location,
            date,
            time,
            description,
            witnesses,
            policeContacted,
            image = null,
            anonymous = false,
            contactEmail = null,
            contactPhone = null,
        } = body;

        // Basic validation
        if (!offence || !location || !date || !time || !description) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Combine date and time into timestamp
        const timestamp = `${date} ${time}:00`;

        // Insert into real_time_report
        const result = await db.run(
            `INSERT INTO real_time_report (
        user_id,
        offence_id,
        station_id,
        description,
        location_address,
        latitude,
        longitude,
        timestamp,
        verification_status,
        upvotes,
        severity_level,
        witnesses_present,
        police_contacted
      ) VALUES (
        NULL, -- user_id (anonymous for now)
        ?,    -- offence_id (using offence string as placeholder - improve later)
        NULL, -- station_id (can be added later via geolocation)
        ?,
        ?,
        NULL, -- latitude
        NULL, -- longitude
        ?,
        'pending',
        0,
        ?,
        ?,
        ?
      )`,
            [
                offence,           // offence_id placeholder
                description,
                location,
                timestamp,
                severity || null,
                witnesses ? 1 : 0,
                policeContacted ? 1 : 0,
            ]
        );

        const reportId = result.lastID;

        // Insert image if provided
        if (image) {
            await db.run(
                `INSERT INTO report_media (report_id, file_path, media_type) VALUES (?, ?, 'image')`,
                [reportId, image]
            );
        }

        return NextResponse.json(
            { message: "Report submitted successfully", reportId },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error submitting report:", error);
        return NextResponse.json(
            { error: "Failed to submit report" },
            { status: 500 }
        );
    }
}