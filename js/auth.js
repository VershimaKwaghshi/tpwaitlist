async function loginWithMagicLink(email) {
    if (!supabase) {
        alert("Supabase has not been connected.");
        return;
    }
    const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            shouldCreateUser: true
        }
    });
    if (error) {
        alert(error.message);
    } else {
        alert("Check your email.\n\nA secure login link has been sent.");
    }
}

async function registerUser(data) {
    if (!supabase) return;

    const { error } = await supabase
        .from("waitlist")
        .upsert([data]);

    if (error) {
        console.error(error);
    }
}

async function checkSession() {
    if (!supabase) return;

    const { data } = await supabase.auth.getSession();
    if (!data.session) return;

    const userId = data.session.user.id;
    const { data: user } = await supabase
        .from("waitlist")
        .select("*")
        .eq("id", userId)
        .single();

    if (user) {
        buildDashboard(user);
    }
}
