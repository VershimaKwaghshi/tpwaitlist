async function initialiseWaitlist() {
    const form = document.querySelector(".waitlist form");
    if (!form) return;
    form.addEventListener("submit", submitWaitlist);
}

async function submitWaitlist(event) {
    event.preventDefault();

    const fullName = formValue(0);
    const email = formValue(1);
    const country = formValue(2);
    const referral = formValue(3);

    if (!fullName || !email || !country) {
        alert("Please complete all required fields.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email.");
        return;
    }

    const submitButton = document.querySelector(".waitlist button");
    submitButton.disabled = true;
    submitButton.textContent = "Joining...";

    const referralCode = createReferralCode();

    if (!supabase) {
        console.log({
            fullName,
            email,
            country,
            referral,
            referralCode
        });
        alert("Supabase not connected yet.\n\nYour information has been prepared successfully.");
        submitButton.disabled = false;
        submitButton.textContent = "Join Waitlist";
        return;
    }

    const { error } = await supabase
        .from("waitlist")
        .insert([
            {
                full_name: fullName,
                email: email,
                country: country,
                referred_by: referral,
                referral_code: referralCode
            }
        ]);

    if (error) {
        alert(error.message);
    } else {
        alert("Welcome to Take Profit.");
        document.querySelector(".waitlist form").reset();
    }

    submitButton.disabled = false;
    submitButton.textContent = "Join Waitlist";
}

function formValue(index) {
    return document.querySelectorAll(".waitlist input")[index].value.trim();
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createReferralCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "TP-";
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

async function updateWaitlistCounter() {
    if (!supabase) return;

    const { count } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true });

    const counter = document.getElementById("waitlistCounter");
    if (counter) {
        counter.innerHTML = Number(count).toLocaleString();
    }
}

function createLiveStatus() {
    const badge = document.createElement("div");
    badge.className = "liveStatus";
    badge.innerHTML = `<span class="liveDot"></span> System Online`;
    document.body.appendChild(badge);
}

setInterval(updateWaitlistCounter, 30000);
