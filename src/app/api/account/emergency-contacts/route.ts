import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { emergencyContact } from "@/lib/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { and, eq } from "drizzle-orm";

async function getUserId() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return null;
    }

    return parseInt(session.user.id);
}

export async function GET() {
    const userId = await getUserId();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const contacts = await db
            .select({
                contact_id: emergencyContact.contactId,
                contact_name: emergencyContact.name,
                phone_number: emergencyContact.phone,
                relationship: emergencyContact.relationship,
            })
            .from(emergencyContact)
            .where(eq(emergencyContact.userId, userId));

        return NextResponse.json(contacts);
    } catch (error) {
        console.error("Failed to fetch contacts: ", error);
        return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const userId = await getUserId();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { contact_name, phone_number, relationship } = await request.json();

    if (!contact_name || !phone_number) {
        return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
    }

    try {
        const [newContact] = await db
            .insert(emergencyContact)
            .values({
                userId,
                name: contact_name,
                phone: phone_number,
                relationship: relationship || null,
            })
            .returning({
                contact_id: emergencyContact.contactId,
                contact_name: emergencyContact.name,
                phone_number: emergencyContact.phone,
                relationship: emergencyContact.relationship,
            });

        return NextResponse.json({ message: "Contact added", contact: newContact });
    } catch (error) {
        console.log("Contact insert route error: ", error);
        return NextResponse.json({ error: "Failed to add contact" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const userId = await getUserId();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { contact_id, contact_name, phone_number, relationship } = await request.json();

    if (!contact_id) {
        return NextResponse.json({ error: "MISSING_ID" }, { status: 400 });
    }

    if (!contact_name || !phone_number) {
        return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
    }

    const [updated] = await db
        .update(emergencyContact)
        .set({
            name: contact_name,
            phone: phone_number,
            relationship: relationship || null,
        })
        .where(and(
            eq(emergencyContact.contactId, Number(contact_id)),
            eq(emergencyContact.userId, userId)
        ))
        .returning({
            contact_id: emergencyContact.contactId,
            contact_name: emergencyContact.name,
            phone_number: emergencyContact.phone,
            relationship: emergencyContact.relationship,
        });

    if (!updated) {
        return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }

    return NextResponse.json({ message: "Contact updated", contact: updated });
}

export async function DELETE(request: Request) {
    const userId = await getUserId();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { contact_id } = await request.json();

    if (!contact_id) {
        return NextResponse.json({ error: "MISSING_ID" }, { status: 400 });
    }

    const [deleted] = await db
        .delete(emergencyContact)
        .where(and(
            eq(emergencyContact.contactId, Number(contact_id)),
            eq(emergencyContact.userId, userId)
        ))
        .returning({ contact_id: emergencyContact.contactId });

    if (!deleted) {
        return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }

    return NextResponse.json({ message: "Contact deleted" });
}
