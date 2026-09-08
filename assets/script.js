(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    navLinks.forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  const sections = ['office-hours', 'learning', 'growth', 'leadership', 'engage']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id));
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }
})();
