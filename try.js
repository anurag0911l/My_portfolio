gsap.registerPlugin(ScrollTrigger);

// 1. Smooth Reveal for Hero Text
const tl = gsap.timeline();
tl.from(".split-line", {
  y: 100,
  opacity: 0,
  duration: 1.2,
  stagger: 0.2,
  ease: "power4.out",
}).from(
  ".hero-description",
  {
    opacity: 0,
    y: 20,
    duration: 1,
  },
  "-=0.5",
);

// 2. Story Section Text Reveal (Ashley Brooke style)
gsap.from(".reveal-text", {
  scrollTrigger: {
    trigger: ".story-section",
    start: "top 70%",
  },
  y: 80,
  opacity: 0,
  duration: 1.5,
  ease: "power4.out",
});

// 3. Word Cloud Parallax / Scroll Interaction
gsap.utils.toArray(".big-word").forEach((word, i) => {
  gsap.from(word, {
    scrollTrigger: {
      trigger: word,
      start: "top 90%",
      scrub: true,
    },
    x: i % 2 === 0 ? -100 : 100,
    opacity: 0,
  });
});

// 4. Service Items staggered fade-in
gsap.from(".service-item", {
  scrollTrigger: {
    trigger: ".services-list",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  stagger: 0.3,
  duration: 1,
  ease: "power2.out",
});

// 5. Work Image Parallax
gsap.utils.toArray(".work-item").forEach((item) => {
  const img = item.querySelector(".work-img");
  const speed = item.dataset.speed;

  gsap.to(img, {
    scrollTrigger: {
      trigger: item,
      scrub: true,
    },
    y: -100 * speed,
    scale: 1.1,
    ease: "none",
  });
});

// 6. Reverse Ticker for Footer
gsap.to(".ticker.reverse", {
  xPercent: -50,
  repeat: -1,
  duration: 15,
  ease: "none",
});

// 7. Text highlight on scroll for paragraphs
gsap.utils.toArray(".story-p").forEach((p) => {
  gsap.from(p, {
    scrollTrigger: {
      trigger: p,
      start: "top 85%",
    },
    opacity: 0,
    y: 30,
    duration: 1,
  });
});
// PARALLAX TICKER ANIMATION
gsap.to(".ticker-content", {
  xPercent: -30, // Moves the text to the left
  ease: "none",
  scrollTrigger: {
    trigger: ".ticker-wrap",
    start: "top bottom", // Starts moving when the ticker enters the bottom of screen
    end: "bottom top", // Ends when it leaves the top
    scrub: 3, // Smooth "catch-up" delay
  },
});
