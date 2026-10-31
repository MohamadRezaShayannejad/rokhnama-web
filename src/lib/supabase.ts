import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * کلاینت سروری Supabase. با کلید service role ساخته میشود چون RLS روی
 * جدولهای دیتابیس روشن است و هیچ policy ندارد، پس anon اجازهٔ نوشتن ندارد.
 * این کلید هرگز نباید با پیشوند NEXT_PUBLIC_ تعریف شود.
 */
export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("supabase env vars are missing");
  return createClient(url, key, { auth: { persistSession: false } });
}

export const DEMO_LEADS_TABLE = "demo_leads";
