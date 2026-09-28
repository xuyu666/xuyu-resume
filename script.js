const root = document.documentElement;
const spotlight = document.querySelector('.spotlight');

window.addEventListener('pointermove', (event) => {
  root.style.setProperty('--x', `${event.clientX}px`);
  root.style.setProperty('--y', `${event.clientY}px`);
}, { passive: true });

const navLinks = [...document.querySelectorAll('.section-nav a')];
const sections = [...document.querySelectorAll('[data-observe]')];

const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;
  const id = visible.target.id;
  navLinks.forEach((link) => {
    const active = link.dataset.section === id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}, {
  rootMargin: '-20% 0px -55% 0px',
  threshold: [0, 0.25, 0.5, 0.75, 1]
});

sections.forEach((section) => observer.observe(section));
