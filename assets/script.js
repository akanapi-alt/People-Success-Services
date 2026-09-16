(function () {
  const mobileToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const navLinks = Array.from(document.querySelectorAll('.site-nav a'));

  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(open));
      if (!open) closeAllNavGroups();
    });

    navLinks.forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      closeAllNavGroups();
    }));
  }

  const navGroups = Array.from(document.querySelectorAll('.nav-group'));

  function closeNavGroup(group, { returnFocus = false } = {}) {
    if (!group) return;
    const button = group.querySelector('.nav-menu-button');
    group.classList.remove('is-open');
    if (button) {
      button.setAttribute('aria-expanded', 'false');
      if (returnFocus) button.focus();
    }
  }

  function closeAllNavGroups(except = null) {
    navGroups.forEach(group => {
      if (group !== except) closeNavGroup(group);
    });
  }

  navGroups.forEach((group, index) => {
    const button = group.querySelector('.nav-menu-button');
    const dropdown = group.querySelector('.nav-dropdown');
    if (!button || !dropdown) return;

    if (!dropdown.id) dropdown.id = `nav-dropdown-${index + 1}`;
    button.setAttribute('aria-controls', dropdown.id);

    const setOpen = (open, focusFirst = false) => {
      closeAllNavGroups(open ? group : null);
      group.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
      if (open && focusFirst) {
        const first = dropdown.querySelector('a');
        if (first) first.focus();
      }
    };

    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(!group.classList.contains('is-open'));
    });

    button.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setOpen(true, true);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        closeNavGroup(group);
      }
    });

    dropdown.addEventListener('keydown', event => {
      const links = Array.from(dropdown.querySelectorAll('a'));
      const current = links.indexOf(document.activeElement);
      if (event.key === 'Escape') {
        event.preventDefault();
        closeNavGroup(group, { returnFocus: true });
      } else if (event.key === 'ArrowDown' && current >= 0) {
        event.preventDefault();
        links[(current + 1) % links.length].focus();
      } else if (event.key === 'ArrowUp' && current >= 0) {
        event.preventDefault();
        links[(current - 1 + links.length) % links.length].focus();
      }
    });

    dropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeNavGroup(group));
    });
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-group')) closeAllNavGroups();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const openGroup = navGroups.find(group => group.classList.contains('is-open'));
      if (openGroup) closeNavGroup(openGroup, { returnFocus: true });
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px' });
    revealItems.forEach(item => observer.observe(item));
  } else { revealItems.forEach(item => item.classList.add('visible')); }

  const finderResult = document.getElementById('finder-result');
  const finderOptions = Array.from(document.querySelectorAll('.finder-option'));
  const recommendations = {
    guidance: { title: 'Start with L&D Office Hours.', body: 'Bring the question to People Success and get help choosing the right next step.', href: 'office-hours.html', label: 'Go to Office Hours' },
    learning: { title: 'Start with Learning.', body: 'Use the In-House Library, Infosys Springboard, DataCamp, and Juno to build the right capability.', href: 'learning.html', label: 'Go to Learning' },
    growth: { title: 'Explore Career Growth in Juno.', body: 'Use Juno Career Growth to explore roles, expectations, skills, and possible next steps.', href: 'learning.html#juno-career-growth', label: 'Go to Juno Career Growth' },
    mentorship: { title: 'Connect through Mently.', body: 'Find mentors, explore expertise, and book sessions that support your growth goals.', href: 'mentorship.html', label: 'Go to Mentorship' },
    leadership: { title: 'Explore Leadership Development.', body: 'Compare Aspiring Leaders, Lead with Strengths, Lead with Impact, and L.E.A.D. Coaching.', href: 'leadership.html', label: 'Go to Leadership' }
  };
  if (finderResult && finderOptions.length) {
    finderOptions.forEach(button => button.addEventListener('click', () => {
      const choice = recommendations[button.dataset.resource]; if (!choice) return;
      finderOptions.forEach(option => option.classList.toggle('is-selected', option === button));
      finderResult.innerHTML = `<p><strong>${choice.title}</strong> ${choice.body}</p><div class="result-actions"><a class="primary" href="${choice.href}">${choice.label} →</a></div>`;
    }));
  }

  const tabs = Array.from(document.querySelectorAll('.leadership-tab'));
  const panels = Array.from(document.querySelectorAll('[data-program-panel]'));
  if (tabs.length && panels.length) {
    const activate = (id) => {
      tabs.forEach(tab => { const on = tab.dataset.program === id; tab.classList.toggle('is-active', on); tab.setAttribute('aria-selected', String(on)); });
      panels.forEach(panel => { const on = panel.dataset.programPanel === id; panel.hidden = !on; if (on) panel.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')); });
      const active = panels.find(panel => panel.dataset.programPanel === id);
      if (active) active.scrollIntoView({behavior:'smooth', block:'start'});
    };
    tabs.forEach(tab => tab.addEventListener('click', () => activate(tab.dataset.program)));
    const hash = window.location.hash.replace('#',''); if (['aspiring-leaders','strengths','lead-with-impact','lead-coaching'].includes(hash)) activate(hash);
  }

  const lightbox = document.getElementById('image-lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  const lightboxTriggers = Array.from(document.querySelectorAll('[data-lightbox-image]'));
  let lastLightboxTrigger = null;
  function openLightbox(trigger) {
    if (!lightbox || !lightboxImage || !trigger) return;
    const src = trigger.getAttribute('data-lightbox-image'); if (!src) return;
    lastLightboxTrigger = trigger; lightboxImage.src = src; lightboxImage.alt = trigger.getAttribute('data-lightbox-alt') || '';
    lightbox.hidden = false; document.body.style.overflow = 'hidden'; if (lightboxClose) lightboxClose.focus();
  }
  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return; lightbox.hidden = true; lightboxImage.src = ''; lightboxImage.alt = ''; document.body.style.overflow = ''; if (lastLightboxTrigger) lastLightboxTrigger.focus();
  }
  if (lightbox && lightboxTriggers.length) {
    lightboxTriggers.forEach(trigger => trigger.addEventListener('click', () => openLightbox(trigger)));
    lightbox.addEventListener('click', event => { if (event.target.matches('[data-lightbox-close="true"]')) closeLightbox(); });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });
  }
})();
