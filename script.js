gsap.registerPlugin(ScrollTrigger);

// --- THEME SWITCHER LOGIC ---
const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.documentElement;

// Check local storage for preference
if (localStorage.getItem("theme") === "light") {
  body.setAttribute("data-theme", "light");
}

themeToggleBtn.addEventListener("click", () => {
  if (body.getAttribute("data-theme") === "dark") {
    body.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
});

// --- RESUME DOWNLOAD LOGIC ---
document.getElementById("download-cv").addEventListener("click", function() {
  // Engineer Note: Replace 'Anurag_Resume.pdf' with your actual file path in your root directory
  const resumeUrl = "Profile.pdf"; 
  
  const anchor = document.createElement("a");
  anchor.href = resumeUrl;
  anchor.download = "Anurag_Choudhary_Resume.pdf";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  
  // Optional: Visual feedback on button click
  const btn = this;
  const originalText = btn.innerText;
  btn.innerText = "DOWNLOAD INITIATED...";
  setTimeout(() => { btn.innerText = originalText; }, 2000);
});

// --- GSAP ANIMATION PIPELINE ---

// 1. Hero Reveal
const tl = gsap.timeline();
tl.from(".split-line", {
  y: 100, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power4.out",
}).from(".hero-description", {
  opacity: 0, y: 20, duration: 1,
}, "-=0.5");

// 2. Story Text Reveal
gsap.from(".reveal-text", {
  scrollTrigger: { trigger: ".story-section", start: "top 75%" },
  y: 80, opacity: 0, duration: 1.5, ease: "power4.out",
});

gsap.utils.toArray(".story-p").forEach((p) => {
  gsap.from(p, {
    scrollTrigger: { trigger: p, start: "top 85%" },
    opacity: 0, y: 30, duration: 1,
  });
});

// 3. Skills Pill Stagger Reveal
gsap.from(".pill", {
  scrollTrigger: { trigger: ".skills-section", start: "top 80%" },
  y: 30, opacity: 0, stagger: 0.05, duration: 0.8, ease: "back.out(1.7)"
});

// 4. Project List Parallax & Reveal
gsap.utils.toArray(".project-row").forEach((row) => {
  // Smooth entry
  gsap.from(row, {
    scrollTrigger: { trigger: row, start: "top 90%" },
    y: 50, opacity: 0, duration: 0.8, ease: "power2.out"
  });
  
  // Subtle scroll parallax
  const speed = parseFloat(row.dataset.speed) || 1;
  gsap.to(row, {
    scrollTrigger: { trigger: row, scrub: true },
    y: -30 * speed, 
    ease: "none"
  });
});

// 5. Ticker Animations
gsap.to(".ticker-content", {
  xPercent: -30, ease: "none",
  scrollTrigger: {
    trigger: ".ticker-wrap.parallax-ticker",
    start: "top bottom", end: "bottom top", scrub: 2,
  },
});

gsap.to(".ticker.reverse", {
  xPercent: -50, repeat: -1, duration: 20, ease: "none",
});
// --- FOOTER PARALLAX ANIMATION ---

// This moves the massive background name at a different speed than the scroll
gsap.to(".massive-name", {
  scrollTrigger: {
    trigger: ".main-footer",
    start: "top bottom", // when the top of footer hits bottom of viewport
    end: "bottom bottom",
    scrub: 1, // Smooth interaction
  },
  y: -50, // Moves up slightly as you scroll to the end
  ease: "none"
});

// Fade in links staggered
gsap.from(".footer-col", {
  scrollTrigger: {
    trigger: ".footer-grid",
    start: "top 90%",
  },
  opacity: 0,
  y: 30,
  stagger: 0.2,
  duration: 1,
  ease: "power2.out"
});
// Updated Skills Reveal
gsap.from(".pill", {
  scrollTrigger: {
    trigger: ".skills-section",
    start: "top 85%",
    toggleActions: "play none none reverse"
  },
  y: 0, // Ensure it's not starting from a weird offset
  opacity: 1,
  stagger: 0.08,
  duration: 1,
  ease: "power4.out",
  clearProps: "all" // Clears GSAP styles after animation so CSS takes back over
});
