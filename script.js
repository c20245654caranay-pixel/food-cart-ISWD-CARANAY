
// =====================================================
// MIDTERM PROJECT: script.js
// =====================================================

gsap.registerPlugin(ScrollTrigger);


// ---- B1: DARK MODE TOGGLE ----

// Toggle the dark class on the HTML element
const darkModeToggle = document.querySelector("#darkModeToggle");

darkModeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
});


// ---- D1 + D2: PAGE-LOAD INTRO TIMELINE ----

// Set initial animation states
gsap.set(["nav", "h1", ".hero-content", ".hero-buttons"], {
    opacity: 0,
    y: 30
});

// Create ONE GSAP timeline with defaults
const introTimeline = gsap.timeline({
    defaults: {
        duration: 0.7,
        ease: "power2.out"
    }
});

// Navigation animation
// power2.out creates a smooth and natural stopping effect.
introTimeline.to("nav", {
    opacity: 1,
    y: 0
});

// Heading animation
// back.out adds a slight bounce effect.
introTimeline.to("h1", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "back.out(1.7)"
}, "-=0.3");

// Hero content animation
// power2.out makes the entrance smooth.
introTimeline.to(".hero-content", {
    opacity: 1,
    y: 0
}, "-=0.3");

// Hero buttons animation with stagger
// power1.out gives the buttons a gentle finish.
introTimeline.to(".hero-buttons", {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    ease: "power1.out"
}, "-=0.2");


// ---- D3: CLICK INTERACTION ----

// Replay the intro timeline when clicked
const replayBtn = document.querySelector("#replayBtn");

replayBtn.addEventListener("click", () => {
    introTimeline.restart();
});


// ---- E1: SCROLL REVEALS ----

// ---- E2: SCROLL-LINKED EFFECT ----

// ---- E3: REDUCED MOTION + CLEANUP ----

// Use matchMedia to check reduced-motion preferences
const mm = gsap.matchMedia();

mm.add(
    {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        noPreference: "(prefers-reduced-motion: no-preference)"
    },
    (context) => {

        const { reduceMotion } = context.conditions;


        // E1: REVEAL EVERY ELEMENT WITH ITS OWN SCROLLTRIGGER

        document.querySelectorAll(".reveal").forEach((element) => {

            if (reduceMotion) {

                // Show elements immediately for reduced-motion users
                gsap.set(element, {
                    opacity: 1,
                    y: 0
                });

            } else {

                gsap.fromTo(element,

                    {
                        opacity: 0,
                        y: 50
                    },

                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",

                        scrollTrigger: {
                            trigger: element,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }

                );

            }

        });


        // E2: SCROLL PROGRESS BAR WITH SCRUB

        const progressBar = document.querySelector("#progressBar");

        if (progressBar) {

            if (reduceMotion) {

                // Show completed progress without scroll animation
                gsap.set(progressBar, {
                    scaleX: 1,
                    transformOrigin: "left center"
                });

            } else {

                gsap.fromTo(progressBar,

                    {
                        scaleX: 0
                    },

                    {
                        scaleX: 1,
                        ease: "none",

                        scrollTrigger: {
                            trigger: document.documentElement,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: true
                        }
                    }

                );

            }

        }

    }
);


// Refresh ScrollTrigger after page loads
window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});


// =====================================================
// END OF MIDTERM PROJECT SCRIPT
// =====================================================
