// ===============================
//  SUPABASE CLIENT CONFIGURATION
// ===============================

// Your Supabase Project URL
const SUPABASE_URL = "https://ovphitnisrmfweayzajh.supabase.co";

// Your public anon key
const SUPABASE_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92cGhpdG5pc3JtZndlYXl6YWpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjQ0NDMsImV4cCI6MjA3OTg0MDQ0M30.eD1tcq8OzR2v1K7tMcOy1UXXdkcVaxc6bBUnpgactyM";

// Create global Supabase client
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// ===============================
// GLOBAL AUTH CHECK (Admin Only)
// ===============================

async function requireAdminAuth() {
    const { data: { session } } = await client.auth.getSession();
    if (!session) {
        window.location.href = "admin-login.html";
        return null;
    }

    // Verify email is listed in admins table
    const { data } = await client
        .from("admins")
        .select("*")
        .eq("email", session.user.email)
        .single();

    if (!data) {
        await client.auth.signOut();
        window.location.href = "admin-login.html";
        return null;
    }

    return session.user;
}


// ===============================
// GLOBAL LOGOUT FUNCTION
// ===============================

async function adminLogout() {
    await client.auth.signOut();
    window.location.href = "admin-login.html";
}