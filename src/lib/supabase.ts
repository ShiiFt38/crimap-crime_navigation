import { createClient } from "@supabase/supabase-js";
import {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_STORAGE_BUCKET,
} from "@/lib/env";

const serverKey = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;

export const supabaseServer = createClient(SUPABASE_URL, serverKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

export async function uploadReportMedia(file: File) {
    const extension = file.name.includes(".") ? file.name.split(".").pop() : undefined;
    const filename = `${crypto.randomUUID()}${extension ? `.${extension}` : ""}`;
    const objectPath = `reports/${filename}`;
    const mediaType = file.type.startsWith("video/")
        ? "video"
        : file.type.startsWith("audio/")
            ? "audio"
            : "image";

    const { error } = await supabaseServer.storage
        .from(SUPABASE_STORAGE_BUCKET)
        .upload(objectPath, file, {
            contentType: file.type || undefined,
            cacheControl: "3600",
            upsert: false,
        });

    if (error) {
        throw new Error(`Supabase storage upload failed: ${error.message}`);
    }

    const { data } = supabaseServer.storage
        .from(SUPABASE_STORAGE_BUCKET)
        .getPublicUrl(objectPath);

    return {
        filePath: data.publicUrl,
        mediaType,
    };
}
