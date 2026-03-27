import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { realTimeReport, reportMedia } from "@/lib/schema";
import { uploadReportMedia } from "@/lib/supabase";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const formData = await request.formData();

        const offenceValue = formData.get("offence");
        const offenceId = offenceValue ? Number(offenceValue) : NaN;
        const severity = formData.get("severity") as string | null;
        const location = (formData.get("location") as string | null)?.trim() || "";
        const date = formData.get("date") as string | null;
        const time = formData.get("time") as string | null;
        const description = (formData.get("description") as string | null)?.trim() || "";
        const witnesses = formData.get("witnesses") as string | null;
        const policeContacted = formData.get("policeContacted") as string | null;
        const anonymous = formData.get("anonymous") === "true";
        const contactEmail = (formData.get("contactEmail") as string | null)?.trim() || null;
        const contactPhone = (formData.get("contactPhone") as string | null)?.trim() || null;
        const mediaFiles = formData.getAll("media") as File[];

        if (isNaN(offenceId) || offenceId < 1) {
            return NextResponse.json({ error: "Invalid or missing offence selected" }, { status: 400 });
        }

        if (!location || !date || !time || !description) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const timestamp = new Date(`${date}T${time}:00`);
        if (Number.isNaN(timestamp.getTime())) {
            return NextResponse.json({ error: "Invalid date or time supplied" }, { status: 400 });
        }

        const userId = !anonymous && session?.user?.id ? Number(session.user.id) : null;

        const [newReport] = await db
            .insert(realTimeReport)
            .values({
                userId,
                offenceId,
                description,
                locationAddress: location,
                timestamp,
                severityLevel: severity || null,
                witnessesPresent: Boolean(witnesses?.trim()),
                policeContacted: Boolean(policeContacted?.trim()),
                verificationStatus: "pending",
                upvotes: 0,
                anonymous,
                contactEmail,
                contactPhone,
            })
            .returning({ reportId: realTimeReport.reportId });

        const reportId = newReport.reportId;

        for (const file of mediaFiles) {
            if (file.size === 0) continue;

            const uploaded = await uploadReportMedia(file);
            await db.insert(reportMedia).values({
                reportId,
                filePath: uploaded.filePath,
                mediaType: uploaded.mediaType,
            });
        }

        return NextResponse.json(
            { message: "Report submitted successfully", reportId },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error submitting report:", error);
        return NextResponse.json({ error: "Failed to submit report" }, { status: 500 });
    }
}
