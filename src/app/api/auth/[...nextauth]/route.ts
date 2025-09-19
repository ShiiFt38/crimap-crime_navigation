import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { openDb } from "@/lib/db";
import bcrypt from "bcryptjs";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string; // username
            email: string;
            fullName: string | null;
            phone: string | null;
        };
    }
}

// Define the handler at the module level
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("MISSING_CREDENTIALS");
                }

                let db;
                try {
                    db = await openDb();
                    const user = await db.get(
                        "SELECT user_id AS id, username AS name, email, password_hash FROM user WHERE email = ?",
                        [credentials.email]
                    );

                    if (!user || !user.password_hash) {
                        throw new Error("INVALID_EMAIL");
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password_hash);
                    if (!isValid) {
                        throw new Error("INCORRECT_PASSWORD");
                    }

                    return { id: user.id, name: user.name, email: user.email };
                } catch (error) {
                    console.error("Authorization error:", error);
                    throw error;
                } finally {
                    if (db) await db.close();
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        error: "/auth/signin", // Handle errors on sign-in page
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.sub) { // token.sub is the user ID
                // Fetch additional user data from DB
                const db = await openDb();
                try {
                    const fullUser = await db.get(
                        `SELECT username, full_name AS fullName, phone FROM user WHERE user_id = ?`,
                        [token.sub]
                    );
                    if (fullUser) {
                        session.user = {
                            ...session.user,
                            id: token.sub,
                            name: fullUser.username || session.user.name, // Ensure name is username
                            email: session.user.email,
                            fullName: fullUser.fullName,
                            phone: fullUser.phone,
                        };
                    }
                } finally {
                    await db.close();
                }
            }
            return session;
        },
    },
    debug: true, // Enable debug logging
});

// Export the handler for all methods
export { handler as GET, handler as POST };