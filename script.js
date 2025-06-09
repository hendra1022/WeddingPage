gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

gsap.set(".logo", { y: -50, opacity: 0 });
gsap.set(".title-text", { x: 50, opacity: 0 });
gsap.set(".couple-name", { y: 50, opacity: 0 });
gsap.set(".date-time", { x: -50, opacity: 0 });

const doorTimeline = gsap.timeline();

$(document).on('click', '#buttonstart', function () {
    $('html, body').height('1000vh');

    doorTimeline.to(".leftdoor", {
        xPercent: -150,
        duration: 1.5,
        ease: "linear",
        transformOrigin: "left center",
    }, 0)
        .to(".rightdoor", {
            xPercent: 150,
            duration: 1.5,
            ease: "linear",
            transformOrigin: "right center",
        }, "<")
        .to(".start", {
            opacity: 0,
            duration: 0.5,
            ease: "linear",
        }, "<")
        // Fade in with directional movement
        .to(".logo", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
        }, ">0.5")
        .to(".title-text", {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
        }, "<") // start at same time as previous
        .to(".couple-name", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
        }, "<") // same time
        .to(".date-time", {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
        });

    gsap.fromTo(".details",
        { x: 50, opacity: 0 },
        {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".details",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );

    // ScrollTrigger for scrolling down from .title to .slide1
    ScrollTrigger.create({
        trigger: '.title',
        start: 'bottom 90%',
        end: 'bottom bottom',
        onLeave: function () {
            console.log('Scrolling down from title to slide1');
            gsap.to(window, { duration: 0.5, scrollTo: { y: ".slide1", autoKill: false } });
        },
    });

    // ScrollTrigger for scrolling up from .slide1 to .title
    ScrollTrigger.create({
        trigger: '.slide1',
        start: 'top 10%',
        end: 'bottom bottom',
        onLeaveBack: function () {
            console.log('Scrolling up from slide1 to title');
            gsap.to(window, { duration: 0.5, scrollTo: { y: ".title", autoKill: false } });
        },
        markers: true
    });
})