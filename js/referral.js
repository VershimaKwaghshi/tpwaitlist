let currentReferral = "";

function initialiseReferral() {
    readReferralFromURL();
}

function readReferralFromURL() {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (!ref) return;

    currentReferral = ref;
    const referralInput = document.querySelectorAll(".waitlist input")[3];
    if (referralInput) {
        referralInput.value = ref;
    }
}
