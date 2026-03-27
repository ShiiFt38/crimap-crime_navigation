// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/drizzle";
import { user } from "@/lib/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

const authOptions: NextAuthOptions = {
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

                try {
                    const [foundUser] = await db
                        .select({
                            userId: user.userId,
                            username: user.username,
                            email: user.email,
                            passwordHash: user.passwordHash,
                        })
                        .from(user)
                        .where(eq(user.email, credentials.email))
                        .limit(1);

                    if (!foundUser || !foundUser.passwordHash) {
                        throw new Error("INVALID_EMAIL");
                    }

                    const isValid = await bcrypt.compare(credentials.password, foundUser.passwordHash);
                    if (!isValid) {
                        throw new Error("INCORRECT_PASSWORD");
                    }

                    return {
                        id: foundUser.userId.toString(),
                        name: foundUser.username,
                        email: foundUser.email,
                    };
                } catch (error) {
                    console.error("Authorization error:", error);
                    throw error;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        error: "/auth/signin",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.sub = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            const sessionUserId = token.id || token.sub;

            if (session.user && sessionUserId) {
                const [fullUser] = await db
                    .select({
                        username: user.username,
                        fullName: user.fullName,
                        phone: user.phone,
                        defaultAddress: user.defaultAddress,
                        defaultLongitude: user.defaultLongitude,
                        defaultLatitude: user.defaultLatitude,
                        useCurrentLocation: user.useCurrentLocation,
                    })
                    .from(user)
                    .where(eq(user.userId, parseInt(sessionUserId)))
                    .limit(1);

                if (fullUser) {
                    session.user = {
                        ...session.user,
                        id: sessionUserId,
                        name: fullUser.username || session.user.name,
                        email: session.user.email,
                        fullName: fullUser.fullName,
                        phone: fullUser.phone,
                        address: fullUser.defaultAddress,
                        longitude: fullUser.defaultLongitude,
                        latitude: fullUser.defaultLatitude,
                        useCurrentLocation: fullUser.useCurrentLocation,
                    };
                }
            }
            return session;
        },
    },
    debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { authOptions };
