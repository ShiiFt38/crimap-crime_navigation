// src/app/api/reports/report/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { realTimeReport, reportMedia } from "@/lib/schema";
import { sql } from "drizzle-orm";
import { writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request: Request) {
    try {
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

        const timestamp = new Date(`${date}T${time}:00`);

        const [newReport] = await db.insert(realTimeReport).values({
            offenceId: offence, // Adjust if offenceId is integer
            description,
            locationAddress: location,
            timestamp,
            severityLevel: severity || null,
            witnessesPresent: witnesses ? true : false,
            policeContacted: policeContacted ? true : false,
            verificationStatus: 'pending',
            upvotes: 0,
        }).returning({ reportId: realTimeReport.reportId });

        const reportId = newReport.reportId;

        for (const file of mediaFiles) {
            if (file.size === 0) continue;

            const buffer = Buffer.from(await file.arrayBuffer());
            const ext = file.name.split('.').pop() || 'bin';
            const filename = `${randomUUID()}.${ext}`;
            const filePath = `/uploads/${filename}`;

            await writeFile(join(process.cwd(), "public", "uploads", filename), buffer);

            const mediaType = file.type.startsWith('video/') ? 'video' : file.type.startsWith('audio/') ? 'audio' : 'image';

            await db.insert(reportMedia).values({
                reportId,
                filePath,
                mediaType,
            });
        }

        return NextResponse.json({ message: "Report submitted successfully", reportId }, { status: 201 });
    } catch (error) {
        console.error("Error submitting report:", error);
        return NextResponse.json({ error: "Failed to submit report" }, { status: 500 });
    }
}