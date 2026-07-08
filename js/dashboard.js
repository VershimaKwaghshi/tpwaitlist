function buildDashboard(user) {
    const dashboard = document.createElement("section");
    dashboard.className = "dashboard";
    dashboard.innerHTML = `
        <div class="dashboard-card">
            <h2>Welcome ${user.full_name}</h2>
            <p>Your referral code</p>
            <h3>${user.referral_code}</h3>
            <input
                id="referralLink"
                value="${window.location.origin}${window.location.pathname}?ref=${user.referral_code}"
                readonly
            >
            <button id="copyReferral">
                Copy Referral Link
            </button>
        </div>
    `;
    document.body.appendChild(dashboard);

    document
        .getElementById("copyReferral")
        .addEventListener("click", copyReferralLink);
}

function copyReferralLink() {
    const input = document.getElementById("referralLink");
    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value);
    alert("Referral link copied.");
}
