import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { openDb } from "@/lib/db";
import bcrypt from "bcryptjs";

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
                    return null; // Return null for missing credentials
                }

                let db;
                try {
                    db = await openDb();
                    const user = await db.get(
                        "SELECT user_id AS id, username AS name, email, password_hash FROM user WHERE email = ?",
                        [credentials.email]
                    );

                    if (!user || !user.password_hash) {
                        return null; // Invalid user
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password_hash);
                    if (!isValid) {
                        return null; // Invalid password
                    }

                    return { id: user.id, name: user.name, email: user.email };
                } catch (error) {
                    console.error("Authorization error:", error);
                    return null; // Fail gracefully
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
            if (session.user) {
                session.user.id = token.id;
            }
            return session;
        },
    },
    debug: true, // Enable debug logging
});

// Export the handler for all methods
export { handler as GET, handler as POST };