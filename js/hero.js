function initialiseHero() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    hero.animate(
        [
            {
                opacity: 0,
                transform: "translateY(40px)"
            },
            {
                opacity: 1,
                transform: "translateY(0px)"
            }
        ],
        {
            duration: 900,
            easing: "ease-out",
            fill: "forwards"
        }
    );
}

function initialiseButtons() {
    const buttons = document.querySelectorAll(".waitlist-btn, .primary-btn");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const section = document.querySelector(".waitlist");
            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
}
