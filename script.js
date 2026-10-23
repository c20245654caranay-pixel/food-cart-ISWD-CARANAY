
// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);


// ---- B1: DARK MODE TOGGLE ----

const darkModeToggle = document.querySelector("#darkModeToggle");

darkModeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    darkModeToggle.textContent =
        document.documentElement.classList.contains("dark")
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";
});


// ---- D1 + D2: PAGE-LOAD INTRO TIMELINE ----

const intro = gsap.timeline({
    paused: true,
    defaults: {
        duration: 0.6,
        ease: "power2.out" // Smoothly slows near the end.
    }
});

intro
    .from("header", {
        y: -40,
        opacity: 0
    })
    .from("#hero h2", {
        y: 30,
        opacity: 0,
        ease: "back.out(1.2)" // Adds a small, playful bounce.
    }, "-=0.3")
    .from("#hero p, #hero a, #replayBtn", {
        y: 20,
        opacity: 0,
        stagger: 0.15
    }, "-=0.3")
    .from(".food-card", {
        y: 25,
        opacity: 0,
        stagger: 0.15
    }, "-=0.2");

// Play intro on page load
intro.play();


// ---- D3: CLICK INTERACTION ----

document.querySelector("#replayBtn").addEventListener("click", () => {
    intro.restart();
});


// ---- E1 + E2 + E3: SCROLL EFFECTS ----

const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {

    // E1: Reveal each section with its own ScrollTrigger
    gsap.utils.toArray(".reveal").forEach((section) => {
        gsap.from(section, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power1.out", // Gentle reveal.
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // E2: Scroll progress bar, synchronized with scrolling
    gsap.fromTo("#progressBar",
        {
            scaleX: 0,
            transformOrigin: "left"
        },
        {
            scaleX: 1,
            ease: "none", // Linear progress follows the scroll.
            scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        }
    );

});


// No markers: true — scroll markers stay hidden.


// ---- FOOD CART ORDER BUTTONS ----

document.querySelectorAll(".orderBtn").forEach((button) => {
    button.addEventListener("click", () => {
        alert("You ordered " + button.dataset.product + "!");
    });
});