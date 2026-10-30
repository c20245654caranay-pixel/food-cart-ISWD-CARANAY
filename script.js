
// =============================================
// YUMMY BITES - FIXED JAVASCRIPT
// DARK MODE + GSAP + SCROLLTRIGGER
// =============================================


// =============================================
// B1: DARK MODE TOGGLE
// =============================================

const darkModeToggle = document.querySelector("#darkModeToggle");
const htmlElement = document.documentElement;

// Load saved theme
function applyTheme(theme) {

    const isDark = theme === "dark";

    htmlElement.classList.toggle("dark", isDark);

    if (darkModeToggle) {
        darkModeToggle.textContent = isDark
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";

        darkModeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
    }
}

// Check saved theme
let savedTheme = "light";

try {
    savedTheme = localStorage.getItem("yummyBitesTheme") || "light";
} catch (error) {
    console.warn("Theme storage is unavailable.");
}

// Apply theme immediately
applyTheme(savedTheme);

// Toggle theme when clicked
if (darkModeToggle) {

    darkModeToggle.addEventListener("click", () => {

        const isDark = htmlElement.classList.contains("dark");

        const newTheme = isDark ? "light" : "dark";

        applyTheme(newTheme);

        // Save theme
        try {
            localStorage.setItem("yummyBitesTheme", newTheme);
        } catch (error) {
            console.warn("Could not save theme.");
        }

    });

}


// =============================================
// GSAP AVAILABILITY CHECK
// =============================================

const gsapAvailable =
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined";

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


// If GSAP is unavailable or reduced motion is enabled,
// show all content without animations.

if (!gsapAvailable || reduceMotion) {

    document.querySelectorAll(".reveal").forEach(section => {
        section.style.opacity = "1";
        section.style.transform = "none";
    });

    document.querySelectorAll(".food-card").forEach(card => {
        card.style.opacity = "1";
        card.style.transform = "none";
    });

    document.querySelectorAll(
        "#heroBadge, #heroTitle, #heroText, #heroButtons a, #heroImage, #replayBtn"
    ).forEach(element => {
        element.style.opacity = "1";
        element.style.transform = "none";
    });

} else {

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);


    // =============================================
    // D1 + D2: HERO INTRO TIMELINE
    // =============================================

    const intro = gsap.timeline({
        paused: true,

        defaults: {
            duration: 0.7,
            ease: "power3.out"
        }
    });

    intro

        // Step 1: Badge
        .from("#heroBadge", {
            y: -30,
            opacity: 0,
            duration: 0.5
        })

        // Step 2: Heading
        .from("#heroTitle", {
            y: 60,
            opacity: 0,
            scale: 0.9
        }, "-=0.2")

        // Step 3: Paragraph
        .from("#heroText", {
            y: 30,
            opacity: 0
        }, "-=0.3")

        // Step 4: Buttons with stagger
        .from("#heroButtons a", {
            y: 30,
            opacity: 0,
            stagger: 0.2
        }, "-=0.3")

        // Step 5: Hero image
        .from("#heroImage", {
            x: 60,
            opacity: 0,
            scale: 0.9
        }, "-=0.4")

        // Step 6: Replay button
        .from("#replayBtn", {
            y: 20,
            opacity: 0,
            duration: 0.4
        }, "-=0.2");


    // Play intro
    intro.play();


    // =============================================
    // D3: REPLAY INTRO BUTTON
    // =============================================

    const replayBtn = document.querySelector("#replayBtn");

    if (replayBtn) {

        replayBtn.addEventListener("click", () => {
            intro.restart();
        });

    }


    // =============================================
    // E1: SCROLL REVEAL ANIMATION
    // =============================================

    const revealSections = gsap.utils.toArray(".reveal");

    revealSections.forEach((section) => {

        gsap.fromTo(
            section,

            {
                y: 40,
                opacity: 0
            },

            {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power2.out",

                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );

    });


    // =============================================
    // E2: SCROLL PROGRESS BAR
    // =============================================

    gsap.to("#progressBar", {

        width: "100%",

        ease: "none",

        scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3
        }

    });


    // =============================================
    // E3: FOOD CARD ANIMATION
    // =============================================

    gsap.from(".food-card", {

        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",

        scrollTrigger: {
            trigger: "#menu",
            start: "top 75%",
            toggleActions: "play none none reverse"
        }

    });


    // Refresh ScrollTrigger
    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });

}


// =============================================
// CONTACT FORM
// FRONT-END DEMONSTRATION
// =============================================

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name = document.querySelector("#name").value.trim();

        if (formStatus) {

            formStatus.textContent =
                `Thank you, ${name}! Your message has been received in this demo.`;

            formStatus.className =
                "text-center text-sm font-semibold text-orange-500 mt-4";

        }

        contactForm.reset();

    });

}


// =============================================
// END OF YUMMY BITES JAVASCRIPT
// =============================================

