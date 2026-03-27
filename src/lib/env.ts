const supabaseProjectId = process.env.SUPABASE_PROJECT_ID || "xytwpmtakgzzrkkhywbq";

export const SUPABASE_PROJECT_ID = supabaseProjectId;
export const SUPABASE_URL =
    process.env.SUPABASE_URL || `https://${supabaseProjectId}.supabase.co`;
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "";
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
export const SUPABASE_STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "report-media";

export const DATABASE_URL =
    process.env.DATABASE_URL ||
    `postgresql://postgres:[YOUR-PASSWORD]@db.${supabaseProjectId}.supabase.co:5432/postgres`;
