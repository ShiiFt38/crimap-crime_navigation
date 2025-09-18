import { Adapter } from "next-auth/adapters";
import bcrypt from "bcryptjs";
import { openDb } from "@/lib/db"

async function sqliteAdapter(): Promise<Adapter> {
    const db = await openDb();


    return {
        createUser: async (data) => {
            const { name, email, password } = data;
            const passwordHash = await bcrypt.hash(password, 10);
            const result = await db.run(
                "INSERT INTO user (username, full_name, email, password_hash, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)",
                [name || email.split("@")[0], name, email, passwordHash]
            );
            return { id: result.lastID, name, email };
        },
        getUser: async (id) => {
            const user = await db.get("SELECT user_id AS id, username AS name, email, full_name, phone FROM user WHERE user_id = ?", [id]);
            return user || null;
        },
        getUserByEmail: async (email) => {
            const user = await db.get("SELECT user_id AS id, username AS name, email, password_hash, full_name, phone FROM user WHERE email = ?", [email]);
            return user || null;
        },
        updateUser: async (data) => {
            const { id, ...updates } = data;
            const setClauses = Object.keys(updates)
                .filter(key => key !== "id")
                .map(key => `${key} = ?`)
                .join(", ");
            const values = Object.values(updates).filter(() => true);
            values.push(id);
            await db.run(`UPDATE user SET ${setClauses} WHERE user_id = ?`, values);
            return data;
        },
        deleteUser: async (id) => {
            await db.run("DELETE FROM user WHERE user_id = ?", [id]);
        },
        linkAccount: async (account) => {
            // Not needed for credentials-only initially, but add if using OAuth later
            return account;
        },
        unlinkAccount: async (account) => {
            // Not needed for now
        },
    };
}

export default sqliteAdapter;