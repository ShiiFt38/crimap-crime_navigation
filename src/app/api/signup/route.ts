import { NextResponse } from "next/server";
import { openDb } from "@/lib/db"; // Import the centralized DB function
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const { username, email, password, full_name, phone } = await req.json();

    if (!email || !password || !username) {
        return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
    }

    const db = await openDb(); // Use the centralized DB connection

    try {
        // Debug: Check if table exists
        const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table' AND name='user'");
        if (tables.length === 0) {
            throw new Error("DATABASE_ERROR: User table does not exist in the database");
        }

        // Check for existing user
        const existingUser = await db.get(
            "SELECT email FROM user WHERE email = ? OR username = ?",
            [email, username]
        );
        if (existingUser) {
            return NextResponse.json({ error: "USER_EXISTS" }, { status: 400 });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Insert new user
        const result = await db.run(
            "INSERT INTO user (username, full_name, email, phone, password_hash) VALUES (?, ?, ?, ?, ?)",
            [username, full_name || null, email, phone || null, passwordHash]
        );
        console.log("User inserted, lastID:", result.lastID); // Debug log

        return NextResponse.json({ success: true, message: "User created successfully" });
    } catch (error) {
        console.error("Signup error:", error); // Log full error
        return NextResponse.json({
            error: "SERVER_ERROR",
            details: error.message || "Unknown error"
        }, { status: 500 });
    } finally {
        await db.close(); // Ensure the connection is closed
    }
}