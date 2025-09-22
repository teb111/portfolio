const body = document.body;
const navToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

const setScrollLock = (locked) => {
  document.documentElement.style.overflow = locked ? 'hidden' : '';
};

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    setScrollLock(isOpen);
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (body.classList.contains('nav-open')) {
      body.classList.remove('nav-open');
      navToggle?.setAttribute('aria-expanded', 'false');
      setScrollLock(false);
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && body.classList.contains('nav-open')) {
    body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
    setScrollLock(false);
    navToggle?.focus();
  }
});

const yearSpan = document.querySelector('.year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
