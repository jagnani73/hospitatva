import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const getSupabaseClient = () => {
  const supabaseApiUrl = process?.env?.SUPABASE_API_URL;
  const supabaseApiKey = process?.env?.SUPABASE_API_KEY;

  if (!supabaseApiUrl || !supabaseApiKey) {
    console.log("Supabase error");
    throw Error("Internal Server Error");
  }

  const supabase = createClient(supabaseApiUrl, supabaseApiKey);
  return supabase;
};
