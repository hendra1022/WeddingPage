gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Set initial states
gsap.set(".logo", { y: -30, opacity: 0 });
gsap.set(".title-text", { x: 30, opacity: 0 });
gsap.set(".couple-name", { y: 30, opacity: 0 });
gsap.set(".date-time", { x: -30, opacity: 0 });

// Reset scroll position when page loads
window.onload = function () {
    window.scrollTo(0, 0);

    // Make sure scrolling is disabled initially
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Force the height to be 100vh until after start
    document.body.style.height = '100vh';
    document.documentElement.style.height = '100vh';

    // Make sure doors are properly positioned initially
    gsap.set(".leftdoor", { xPercent: 0 });
    gsap.set(".rightdoor", { xPercent: 0 });

    // Create a fresh timeline for the door animation
    const doorTimeline = gsap.timeline({
        paused: false,
        onComplete: function () {
            console.log("Door animation complete");
        }
    });

    // Calculate how far doors should go based on screen width
    const doorOffset = isWiderScreen() ? -150 : -100;

    // Start door opening animation with better control
    doorTimeline
        .to(".leftdoor", {
            xPercent: doorOffset,
            duration: 1.5,
            ease: "power2.inOut",
            force3D: true, // Force 3D acceleration
        }, 0)
        .to(".rightdoor", {
            xPercent: Math.abs(doorOffset),
            duration: 1.5,
            ease: "power2.inOut",
            force3D: true, // Force 3D acceleration
        }, 0) // Start at same time
        .to(".start", {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: function () {
                $('.start').css('display', 'none');
            }
        }, 0) // Start at same time
        .to(".door", {
            opacity: 0,
            duration: 0.4,
            delay: 0.9, // Start fading after doors have mostly opened
            onComplete: function () {
                // Hide door after fade
                $('.door').css('display', 'none');

                // Enable scrolling ONLY after door animation completes
                $('html, body').addClass('scrolling-enabled');
                $('.container').addClass('scrolling-enabled');
                $('.scrollpage').addClass('scrolling-enabled');

                // Set the height to auto to allow full content viewing
                document.body.style.height = 'auto';
                document.documentElement.style.height = 'auto';
                document.body.style.overflow = 'auto';
                document.documentElement.style.overflow = 'auto';

                // Start content animation
                startContentAnimation();

                // Refresh ScrollTrigger after layout changes
                ScrollTrigger.refresh();
            }
        });

    // Play the timeline
    doorTimeline.play();
};

// Determine if we should use wider screen animations
const isWiderScreen = () => {
    return window.innerWidth > 430;
};

// Handle resize to maintain proper layout
window.addEventListener('resize', function () {
    ScrollTrigger.refresh();
});

// Function to animate content after door opening
function startContentAnimation() {
    const contentTimeline = gsap.timeline();

    contentTimeline
        .to(".logo", {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
        })
        .to(".title-text", {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
        }, "<0.1") // Start slightly after logo
        .to(".couple-name", {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
        }, "<0.1") // Start slightly after title
        .to(".date-time", {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
        }, "<0.1"); // Start slightly after couple name

    // Animation for details section when scrolled into view
    gsap.fromTo(".details",
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".details",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );

    // Setup smooth scroll between sections
    setupSmoothScroll();
}

// Function to setup smooth scroll between sections
function setupSmoothScroll() {
    const slides = gsap.utils.toArray(".slide");
    let isScrolling = false;

    slides.forEach((panel, i) => {
        if (i < slides.length - 1) {
            // ScrollTrigger for scrolling DOWN
            ScrollTrigger.create({
                trigger: panel,
                start: "bottom bottom",
                onEnter: function () {
                    if (!isScrolling) {
                        isScrolling = true;
                        gsap.to(window, {
                            duration: 0.5,
                            scrollTo: { y: panel.nextElementSibling, offsetY: 0 },
                            ease: "power2.inOut",
                            onComplete: function () {
                                isScrolling = false;
                            }.bind(this)
                        });
                    }
                }
            });
        }

        if (i > 0) {
            // ScrollTrigger for scrolling UP
            ScrollTrigger.create({
                trigger: panel,
                start: "top 10%",
                onLeaveBack: function () {
                    if (!isScrolling) {
                        isScrolling = true;
                        gsap.to(window, {
                            duration: 0.5,
                            scrollTo: { y: panel.previousElementSibling, offsetY: 0 },
                            ease: "power2.inOut",
                            onComplete: function () {
                                isScrolling = false;
                            }
                        });
                    }
                }
            });
        }
    });
}

$(document).on('click', '.open-invitation', function () {
    gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: ".slide2", offsetY: 0 },
        ease: "power2.inOut"
    });
});