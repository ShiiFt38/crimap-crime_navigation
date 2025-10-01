// src/app/api/account/emergency-contacts/route.ts
import { NextResponse } from "next/server";
import { openDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let db;
    try {
        db = await openDb();
        const contacts = await db.all(
            "SELECT contact_id, contact_name, phone_number, relationship FROM emergency_contact WHERE user_id = ?",
            [session.user.id]
        );
        return NextResponse.json(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    } finally {
        if (db) await db.close();
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let db;
    try {
        const { contact_name, phone_number, relationship } = await req.json();
        if (!contact_name || !phone_number) {
            return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
        }

        db = await openDb();
        await db.run(
            "INSERT INTO emergency_contact (user_id, contact_name, phone_number, relationship) VALUES (?, ?, ?, ?)",
            [session.user.id, contact_name, phone_number, relationship || null]
        );
        return NextResponse.json({ success: true, message: "Contact added successfully" });
    } catch (error) {
        console.error("Error adding contact:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    } finally {
        if (db) await db.close();
    }
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let db;
    try {
        const { contact_id, contact_name, phone_number, relationship } = await req.json();
        if (!contact_id || !contact_name || !phone_number) {
            return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
        }

        db = await openDb();
        const ownership = await db.get(
            "SELECT COUNT(*) as count FROM emergency_contact WHERE contact_id = ? AND user_id = ?",
            [contact_id, session.user.id]
        );
        if (ownership.count === 0) {
            return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
        }

        await db.run(
            "UPDATE emergency_contact SET contact_name = ?, phone_number = ?, relationship = ? WHERE contact_id = ?",
            [contact_name, phone_number, relationship || null, contact_id]
        );
        return NextResponse.json({ success: true, message: "Contact updated successfully" });
    } catch (error) {
        console.error("Error updating contact:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    } finally {
        if (db) await db.close();
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let db;
    try {
        const { contact_id } = await req.json();
        if (!contact_id) {
            return NextResponse.json({ error: "MISSING_ID" }, { status: 400 });
        }

        db = await openDb();
        const ownership = await db.get(
            "SELECT COUNT(*) as count FROM emergency_contact WHERE contact_id = ? AND user_id = ?",
            [contact_id, session.user.id]
        );
        if (ownership.count === 0) {
            return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
        }

        await db.run(
            "DELETE FROM emergency_contact WHERE contact_id = ?",
            [contact_id]
        );
        return NextResponse.json({ success: true, message: "Contact deleted successfully" });
    } catch (error) {
        console.error("Error deleting contact:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    } finally {
        if (db) await db.close();
    }
}