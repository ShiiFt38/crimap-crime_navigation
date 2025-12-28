import { NextResponse } from "next/server";
import { openDb } from "@/lib/db"
import {time} from "motion";
import {error} from "next/dist/build/output/log";

export async function POST(request: Request) {
    const db = await openDb();
    try {
        const formData = await request.json();

        const {
            offence,
            severity,
            useCurrentLocation,
            location,
            date,
            time,
            description,
            witnesses,
            policeContacted,
            image,
            anonymous,
            termsConfirmation,
            contactEmail,
            contactPhone,
        } = formData;

        if (!offence || !date || !termsConfirmation) {
            return NextResponse.json({error: "Offence, date, and terms confirmation are required"}, {status: 400});
        }

        await db.run("BEGIN TRANSACTION");

        const reportQuery = `
            INSERT INTO real_time_report (user_id, offence_id, station_id, description, location_address, latitude,
                                          longitude,
                                          timestamp, verification_status, upvotes, severity_level, witnesses_present,
                                          police_contacted)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const reportResult = await db.run(reportQuery, [
            null,
            offence,
            null,
            description || null,
            location || null,
            null,
            null,
            `${date} ${time || '00:00:00'}`,
            'pending',
            0,
            severity || null,
            witnesses ? 1 : 0,
            policeContacted ? 1 : 0,
        ]);
        const reportId = reportResult.lastID;

        if (image) {
            const mediaQuery = `
                INSERT INTO real_media (report_id, file_path, media_type, uploaded_at)
                VALUES (?, ?, ?, CURRENT_TIMESTAMP)`;
            await db.run(mediaQuery, [reportId, image, 'image']);
        }

        await db.run("COMMIT");

        return NextResponse.json({message: "Reported successfully.", reportId});
    } catch (error) {
        await db?.run("ROLLBACK");
        console.log("Error submitting report;", error);
        return NextResponse.json({error: "Error submitting report"}, {status: 500});
    }
}