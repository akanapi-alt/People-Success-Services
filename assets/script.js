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


  const finder = document.getElementById('next-step-finder');
  const finderResult = document.getElementById('finder-result');
  const finderOptions = Array.from(document.querySelectorAll('.finder-option'));

  const resourceRecommendations = {
    guidance: {
      title: 'Start with L&D Office Hours.',
      body: 'Choose the session that fits your schedule and join directly in Google Meet.',
      actions: [
        ['Monday 8:30 to 9:00', 'https://meet.google.com/zqj-onic-tkk', true],
        ['Wednesday 5:30 to 6:00', 'https://meet.google.com/xrs-cked-uqz', false],
        ['Thursday 12:00 to 12:30 AM', 'https://meet.google.com/fui-uasc-ued', false]
      ]
    },
    learning: {
      title: 'Start with Infosys Springboard.',
      body: 'Use the IBPAP Learning Hub for AI, technology, professional skills, soft skills, and structured learning paths.',
      actions: [['Open Infosys Springboard', 'https://infyspringboard-ph.onwingspan.com/web/en/login', true]]
    },
    growth: {
      title: 'Use DataCamp and Juno.',
      body: 'DataCamp supports technical capability building, while Juno supports role-based growth and development pathways.',
      actions: [
        ['Open DataCamp', 'https://www.datacamp.com/', true],
        ['Open Juno', 'https://boldr.the-juno.com/', false]
      ]
    },
    mentorship: {
      title: 'Connect through Mently.',
      body: 'Find mentors aligned with your goals, explore expertise, and book mentoring sessions.',
      actions: [['Open Mently', 'https://mently.boldrtech.com/l', true]]
    },
    leadership: {
      title: 'Explore the leadership development pathways.',
      body: 'Review Aspiring Leaders, Lead with Strengths, Lead with Impact, and the L.E.A.D. Coaching Program.',
      actions: [['Explore leadership programs', '#leadership', true]]
    }
  };

  if (finder && finderResult && finderOptions.length) {
    finderOptions.forEach(button => {
      button.addEventListener('click', () => {
        const choice = resourceRecommendations[button.dataset.resource];
        if (!choice) return;
        finderOptions.forEach(option => option.classList.toggle('is-selected', option === button));
        const actions = choice.actions.map(([label, href, primary]) => {
          const external = href.startsWith('http');
          return `<a class="${primary ? 'primary' : ''}" href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}${external ? ' ↗' : ''}</a>`;
        }).join('');
        finderResult.innerHTML = `<p><strong>${choice.title}</strong> ${choice.body}</p><div class="result-actions">${actions}</div>`;
      });
    });
  }


  const lightbox = document.getElementById('image-lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  const lightboxTriggers = Array.from(document.querySelectorAll('[data-lightbox-image]'));
  let lastLightboxTrigger = null;

  function openLightbox(trigger) {
    if (!lightbox || !lightboxImage || !trigger) return;
    const src = trigger.getAttribute('data-lightbox-image');
    const alt = trigger.getAttribute('data-lightbox-alt') || '';
    if (!src) return;
    lastLightboxTrigger = trigger;
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    lightboxImage.src = '';
    lightboxImage.alt = '';
    document.body.style.overflow = '';
    if (lastLightboxTrigger) lastLightboxTrigger.focus();
  }

  if (lightbox && lightboxTriggers.length) {
    lightboxTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => openLightbox(trigger));
    });

    lightbox.addEventListener('click', event => {
      if (event.target.matches('[data-lightbox-close="true"]')) closeLightbox();
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeLightbox();
    });
  }

})();
