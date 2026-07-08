function initialiseNavbar() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            navbar.style.boxShadow = "0 8px 30px rgba(0,0,0,.08)";
        } else {
            navbar.style.boxShadow = "none";
        }
    });
}
