// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Animated stats counter
function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  if (!obj) return;

  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Create particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    const colors = ["var(--primary)", "var(--secondary)", "var(--accent)"];
    particle.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;

    particlesContainer.appendChild(particle);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Observe elements for animation
  const features = document.querySelectorAll(".feature-card");
  const pricingCards = document.querySelectorAll(".pricing-card");
  const testimonial = document.querySelector(".testimonial-container");
  const cta = document.querySelector(".cta-content");

  features.forEach((feature) => {
    feature.style.opacity = 0;
    feature.style.transform = "translateY(20px)";
    feature.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(feature);
  });

  pricingCards.forEach((card) => {
    card.style.opacity = 0;
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(card);
  });

  testimonial.style.opacity = 0;
  testimonial.style.transform = "translateY(20px)";
  testimonial.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(testimonial);

  cta.style.opacity = 0;
  cta.style.transform = "translateY(20px)";
  cta.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(cta);

  // Animate stats when they come into view
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateValue("stat1", 0, 250, 2000);
          animateValue("stat2", 0, 500, 2000);
          animateValue("stat3", 0, 35, 2000);
          animateValue("stat4", 0, 12, 2000);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector(".stats");
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Create particle effect
  createParticles();
});
