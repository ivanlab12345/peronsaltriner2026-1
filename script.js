/* ============================================================
   SCRIPT — Navbar scroll, reveal on scroll (IntersectionObserver),
   menu mobile, scroll-to-top, smooth anchor closing menu.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. NAVBAR: cambia colore allo scroll ---------- */
  const navbar = document.getElementById('navbar');

  function onScrollNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled'); // verde militare #303A32
    } else {
      navbar.classList.remove('scrolled'); // nero carbone #171A18
    }
  }
  window.addEventListener('scroll', onScrollNavbar, { passive: true });
  onScrollNavbar();

  /* ---------- 2. REVEAL ON SCROLL: gli elementi compaiono animati ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target); // anima una sola volta
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback per browser molto vecchi: mostra tutto
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- 3. MENU MOBILE (hamburger) ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Chiudi il menu quando si clicca un link
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- 4. BOTTONE "TORNA IN CIMA" ---------- */
  const toTop = document.getElementById('toTop');

  function onScrollToTop() {
    toTop.classList.toggle('visible', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScrollToTop, { passive: true });
  onScrollToTop();

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 5. EXTRA: evidenzia la voce di menu attiva ---------- */
  const SPY_IDS = ['servizi', 'pacchetti', 'perche', 'chi-sono', 'specializzazioni', 'percorsi', 'recensioni'];
  const sections = SPY_IDS
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const linkMap = {};
  navLinks.querySelectorAll('a[href^="#"]').forEach((a) => {
    linkMap[a.getAttribute('href').slice(1)] = a;
  });

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const link = linkMap[e.target.id];
          if (!link) return;
          if (e.isIntersecting) {
            Object.values(linkMap).forEach((l) => l.style.color = '');
            link.style.color = '#B7F34A';
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => spy.observe(s));
  }
})();
