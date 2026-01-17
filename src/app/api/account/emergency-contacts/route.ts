// src/app/api/account/emergency-contacts/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { emergencyContact } from "@/lib/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const contacts = await db
            .select()
            .from(emergencyContact)
            .where(eq(emergencyContact.userId, parseInt(session.user.id)));

        return NextResponse.json(contacts);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, phone, relationship } = await request.json();

    if (!name || !phone) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const [newContact] = await db
            .insert(emergencyContact)
            .values({
                userId: parseInt(session.user.id),
                name,
                phone,
                relationship: relationship || null,
            })
            .returning();

        return NextResponse.json({ message: "Contact added", contact: newContact });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add contact" }, { status: 500 });
    }
}