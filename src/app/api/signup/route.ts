// src/app/api/signup/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { user } from "@/lib/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const { username, email, password, fullName, phone } = await request.json();

        if (!username || !email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await db
            .select()
            .from(user)
            .where(eq(user.email, email))
            .limit(1);

        if (existingUser.length > 0) {
            return NextResponse.json({ error: "Email already registered" }, { status: 409 });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const [newUser] = await db
            .insert(user)
            .values({
                username,
                email,
                passwordHash,
                fullName: fullName || null,
                phone: phone || null,
            })
            .returning({ userId: user.userId, username: user.username, email: user.email });

        return NextResponse.json({
            message: "User created successfully",
            user: {
                id: newUser.userId,
                name: newUser.username,
                email: newUser.email,
            },
        }, { status: 201 });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}