import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & {
            id: string;
            fullName?: string | null;
            phone?: string | null;
            address?: string | null;
            longitude?: number | null;
            latitude?: number | null;
            useCurrentLocation?: boolean | null;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
    }
}
