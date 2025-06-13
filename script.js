let ScrollInProgress = false;

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
    });

    // Calculate how far doors should go based on screen width
    const doorOffset = isWiderScreen() ? -150 : -100;

    // Start door opening animation with better control
    doorTimeline
        .to(".leftdoor", {
            xPercent: doorOffset,
            duration: 1.5,
            ease: "power2.in",
            force3D: true, // Force 3D acceleration
        }, 0)
        .to(".rightdoor", {
            xPercent: Math.abs(doorOffset),
            duration: 1.5,
            ease: "power2.in",
            force3D: true, // Force 3D acceleration
        }, 0) // Start at same time
        .to(".door", {
            opacity: 0,
            duration: 0.5,
            delay: 1, // Start fading after doors have mostly opened
            onComplete: function () {
                // Hide door after fade
                $('.door').css('display', 'none');
            }
        }, 0);

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

// Function to setup smooth scroll between sections
function setupSmoothScroll() {
    const slides = gsap.utils.toArray(".slide");
    let isScrolling = false;

    slides.forEach((panel, i) => {
        if (i == 0) {
            return; // Skip the first panel as it has no previous panel
        }
        if (i < slides.length - 1) {
            // ScrollTrigger for scrolling DOWN
            ScrollTrigger.create({
                trigger: panel,
                start: "bottom bottom",
                onEnter: function () {
                    if (!isScrolling && !ScrollInProgress) {
                        isScrolling = true;
                        gsap.to(window, {
                            duration: 0.5,
                            scrollTo: { y: panel.nextElementSibling, offsetY: 0 },
                            ease: "power2.inOut",
                            onComplete: () => {
                                isScrolling = false;
                                pauseScrolling();
                            }
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
                    if (!isScrolling && !ScrollInProgress) {
                        isScrolling = true;
                        gsap.to(window, {
                            duration: 0.5,
                            scrollTo: { y: panel.previousElementSibling, offsetY: 0 },
                            ease: "power2.inOut",
                            onComplete: () => {
                                isScrolling = false;
                                pauseScrolling();
                            }
                        });
                    }
                }
            });
        }
    });
}

$(document).on('click', '.open-invitation', function () {
    ScrollInProgress = true;
    gsap.to(window, {
        duration: 0.5,
        scrollTo: { y: ".slide2", offsetY: 0 },
        ease: "power2.inOut",
        onComplete: () => {
            setTimeout(() => {
                ScrollInProgress = false;
            }, 200); // give it some buffer
            $('.slide1').css('display', 'none');
            setupSmoothScroll();
        }
    });

    $('html, body').addClass('scrolling-enabled');
    $('.container').addClass('scrolling-enabled');
    $('.scrollpage').addClass('scrolling-enabled');

    // Set the height to auto to allow full content viewing
    document.body.style.height = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    // Refresh ScrollTrigger after layout changes
    ScrollTrigger.refresh();
});

function pauseScrolling(duration = 200) {
    ScrollInProgress = true;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    setTimeout(() => {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        document.body.style.touchAction = 'auto';
        ScrollInProgress = false;
    }, duration);
}

//carrousel
const images = [
    "images/9.png",
    "images/10.png",
    "images/11.png",
    "images/12.png",
];

const preview = document.getElementById("preview");
const thumbnailCarousel = document.getElementById("thumbnailCarousel");

const visibleCount = 3;
let currentIndex = 0;
let autoScrollInterval;

function renderThumbnails(centerIndex) {
    thumbnailCarousel.innerHTML = "";

    for (let i = -1; i <= visibleCount-1; i++) {
        const idx = (centerIndex + i + images.length) % images.length;
        const thumb = document.createElement("img");
        thumb.src = images[idx];
        if (i === 1) thumb.classList.add("active");

        if (i === 0) {
            thumb.onclick = () => {
                prevImage();
                restartAutoScroll();
            };
        } else if (i === 2) {
            thumb.onclick = () => {
                nextImage();
                restartAutoScroll();
            };
        }

        thumbnailCarousel.appendChild(thumb);
    }

    // Slide to center (1 thumbnail to the left)
    thumbnailCarousel.style.transform = `translateX(-170px)`;
}

function setImage(index) {
    currentIndex = index % images.length;
    preview.src = images[currentIndex];
}

function nextImage() {
    // Animate left slide
    thumbnailCarousel.style.transition = "transform 0.5s ease-in-out";
    thumbnailCarousel.style.transform = `translateX(-340px)`;

    setTimeout(() => {
        thumbnailCarousel.style.transition = "none";
        currentIndex = (currentIndex + 1) % images.length;
        renderThumbnails(currentIndex - 1);
        setImage(currentIndex);
    }, 500);
}

function prevImage() {
    // Animate right slide
    thumbnailCarousel.style.transition = "transform 0.5s ease-in-out";
    thumbnailCarousel.style.transform = `translateX(0px)`;

    setTimeout(() => {
        thumbnailCarousel.style.transition = "none";
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        renderThumbnails(currentIndex - 1);
        setImage(currentIndex);
    }, 500);
}

function restartAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(nextImage, 5000);
}

// Init
setImage(0);
autoScrollInterval = setInterval(nextImage, 5000);
