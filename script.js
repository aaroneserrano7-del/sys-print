(() => {
  'use strict';

  document.documentElement.classList.replace('no-js', 'js');

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menuClose = document.querySelector('[data-menu-close]');
  const navigation = document.querySelector('[data-navigation]');
  const header = document.querySelector('[data-header]');
  const navLinks = navigation ? navigation.querySelectorAll('a') : [];
  const mobileNavigation = window.matchMedia('(max-width: 62rem)');
  let previousFocus = null;

  const setMenu = (isOpen) => {
    if (!menuToggle || !navigation) return;
    const shouldOpen = mobileNavigation.matches && isOpen;
    document.body.classList.toggle('menu-open', shouldOpen);
    menuToggle.setAttribute('aria-expanded', String(shouldOpen));
    navigation.classList.toggle('is-open', shouldOpen);
    navigation.toggleAttribute('inert', !shouldOpen && mobileNavigation.matches);
    navigation.setAttribute('aria-hidden', String(!shouldOpen && mobileNavigation.matches));
    const label = menuToggle.querySelector('.sr-only');
    if (label) label.textContent = shouldOpen ? 'Cerrar menú' : 'Abrir menú';
    if (shouldOpen) {
      previousFocus = document.activeElement;
      menuClose?.focus();
    } else if (previousFocus instanceof HTMLElement && mobileNavigation.matches) {
      previousFocus.focus();
    }
  };

  setMenu(false);
  menuToggle?.addEventListener('click', () => setMenu(!navigation.classList.contains('is-open')));
  menuClose?.addEventListener('click', () => setMenu(false));
  navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
  mobileNavigation.addEventListener('change', () => setMenu(false));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation?.classList.contains('is-open')) setMenu(false);

    if (event.key !== 'Tab' || !navigation?.classList.contains('is-open')) return;
    const menuFocusable = [...navigation.querySelectorAll('a[href], button:not([disabled])')];
    const firstFocusable = menuFocusable[0];
    const lastFocusable = menuFocusable.at(-1);
    if (!firstFocusable || !lastFocusable) return;

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  });

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  document.querySelectorAll('.faq-list details').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      document.querySelectorAll('.faq-list details[open]').forEach((openItem) => {
        if (openItem !== item) openItem.open = false;
      });
    });
  });

  const form = document.querySelector('#contact-form');
  const status = document.querySelector('[data-form-status]');
  const whatsAppUrl = 'https://wa.me/528124427052';
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    const message = form.elements.message.value.trim();

    if (!name || !message) {
      if (status) status.textContent = 'Completa tu nombre y el mensaje para continuar.';
      (!name ? form.elements.name : form.elements.message).focus();
      return;
    }

    if (status) status.textContent = 'Abriendo WhatsApp…';
    const text = `Hola, soy ${name}. Necesito ayuda con: ${message}`;
    window.open(`${whatsAppUrl}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  });

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
