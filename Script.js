
/* =========================================
   PORTFOLIO JAVASCRIPT
   Scroll animations and demo reel controls
========================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       1. SCROLL-REVEAL ANIMATIONS
    ========================================= */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check whether the browser supports IntersectionObserver.
    const supportsObserver = "IntersectionObserver" in window;

    // Only run reveal animations when motion is permitted
    // and the browser supports them.
    if (supportsObserver && !prefersReducedMotion) {

        // Select complete sections and cards rather than
        // animating every individual heading, paragraph and image.
        const elementsToReveal = document.querySelectorAll(
            [
                ".hero-content",
                ".page-intro",
                ".work-section > .subtitle",
                ".work-section > h2",
                ".section-heading",
                ".category-card",
                ".project-card",
                ".asset-project",
                ".about-section",
                ".video-section",
                ".contact-section",
                ".skill-item",
                ".badge-card"
            ].join(", ")
        );

        // Create the observer that detects when elements
        // enter the visitor's screen.
        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        // Make the element visible.
                        entry.target.classList.add("is-visible");

                        // Stop watching once it has appeared.
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        // Prepare and observe each selected element.
        elementsToReveal.forEach(function (element, index) {

            // Prevent duplicate animation setup.
            if (element.classList.contains("reveal")) {
                return;
            }

            element.classList.add("reveal");

            // Add a small delay for a staggered reveal effect.
            const delay = Math.min((index % 5) * 80, 320);

            element.style.setProperty(
                "--reveal-delay",
                delay + "ms"
            );

            // Start observing the element.
            revealObserver.observe(element);

        });

    }


    /* =========================================
       2. DEMO REEL VIDEO AUTO-PAUSE
    ========================================= */

    const showreelVideo = document.querySelector("#showreel-video");

    // Only set up the observer if the video exists
    // and the browser supports IntersectionObserver.
    if (showreelVideo && supportsObserver) {

        const videoObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    // Pause the video when it leaves the screen.
                    if (!entry.isIntersecting) {
                        showreelVideo.pause();
                    }

                });

            },
            {
                threshold: 0.1
            }
        );

        videoObserver.observe(showreelVideo);

    }


    console.log("Portfolio JavaScript loaded successfully!");

});
