const body = document.body;
const navToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const siteNav = document.querySelector(".site-nav");

const setScrollLock = (locked) => {
  document.documentElement.style.overflow = locked ? "hidden" : "";
};

// Improved focus management for mobile menu
const manageFocusTrap = (isOpen) => {
  if (!siteNav) return;

  const focusableElements = siteNav.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );

  if (isOpen && focusableElements.length > 0) {
    focusableElements[0].focus();
  }
};

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    setScrollLock(isOpen);

    // Add slight delay for CSS animation
    setTimeout(() => {
      manageFocusTrap(isOpen);
    }, 150);
  });
}

// Close menu when clicking nav links
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (body.classList.contains("nav-open")) {
      body.classList.remove("nav-open");
      navToggle?.setAttribute("aria-expanded", "false");
      setScrollLock(false);
      navToggle?.focus();
    }
  });
});

// Enhanced keyboard navigation
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && body.classList.contains("nav-open")) {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    setScrollLock(false);
    navToggle?.focus();
  }
});

// Close menu when clicking outside (mobile)
document.addEventListener("click", (event) => {
  if (
    body.classList.contains("nav-open") &&
    siteNav &&
    !siteNav.contains(event.target) &&
    !navToggle?.contains(event.target)
  ) {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    setScrollLock(false);
  }
});

// Smooth scrolling enhancement
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight =
        document.querySelector(".site-header")?.offsetHeight || 0;
      const targetPosition = target.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Update copyright year
const yearSpan = document.querySelector(".year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Lazy loading images enhancement
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}
