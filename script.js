gsap.registerPlugin(ScrollTrigger);

gsap.set(".logo", { y: -50, opacity: 0 });
gsap.set(".title-text", { x: 50, opacity: 0 });
gsap.set(".couple-name", { y: 50, opacity: 0 });
gsap.set(".date-time", { x: -50, opacity: 0 });

const doorTimeline = gsap.timeline();

$(document).on('click', '#buttonstart', function(){
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
        }, "<") // same time
        .to(".details", {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
        }, "<"); 

})