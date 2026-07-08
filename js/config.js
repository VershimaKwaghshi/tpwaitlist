const CONFIG = {
    supabaseUrl: "YOUR_SUPABASE_PROJECT_URL",
    supabaseKey: "YOUR_SUPABASE_ANON_KEY"
};

let supabase = null;

if (
    CONFIG.supabaseUrl !== "YOUR_SUPABASE_PROJECT_URL" &&
    CONFIG.supabaseKey !== "YOUR_SUPABASE_ANON_KEY"
) {
    supabase = window.supabase.createClient(
        CONFIG.supabaseUrl,
        CONFIG.supabaseKey
    );
}
