// Ampersand Magnetics - Main JS
(function() {
  'use strict';

  // ============================================
  // Scroll animations (fade-in on scroll)
  // ============================================
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // ============================================
  // Accordion
  // ============================================
  function initAccordions() {
    const items = document.querySelectorAll('.accordion__item');
    items.forEach(function(item) {
      const trigger = item.querySelector('.accordion__trigger');
      if (!trigger) return;

      trigger.addEventListener('click', function() {
        const isOpen = item.classList.contains('open');
        const parent = item.closest('.accordion');
        if (parent) {
          parent.querySelectorAll('.accordion__item').forEach(function(sibling) {
            sibling.classList.remove('open');
            const content = sibling.querySelector('.accordion__content');
            if (content) content.style.maxHeight = null;
          });
        }
        if (!isOpen) {
          item.classList.add('open');
          const content = item.querySelector('.accordion__content');
          if (content) content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

  // ============================================
  // Animated counters
  // ============================================
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(el) { observer.observe(el); });
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const pre = el.getAttribute('data-prefix') || '';
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.textContent = pre + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ============================================
  // Smooth scroll for anchor links
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ============================================
  // Initialize
  // ============================================
  function init() {
    initScrollAnimations();
    initAccordions();
    initCounters();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
