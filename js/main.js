// Typer Animation
(function() {
  var words = [
    'partnership.',
    'new ideas.',
    'repeat orders.',
    'a higher bar.'
  ];

  var el = document.getElementById('typer-text');
  if (!el) return;

  var wordIndex = 0;
  var charIndex = 0;
  var deleting = false;

  function tick() {
    var current = words[wordIndex];

    if (!deleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        setTimeout(function() { deleting = true; tick(); }, 2000);
        return;
      }
      setTimeout(tick, 50 + Math.random() * 40);
    } else {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 30);
    }
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        observer.disconnect();
        setTimeout(tick, 500);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(el.parentElement);
})();

// Mobile Navigation Toggle
(function() {
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', function() {
    links.classList.toggle('nav__links--open');
    toggle.classList.toggle('nav__toggle--active');
  });
})();

// Nav scroll state
(function() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  function checkScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();
})();

// Scroll Animations
(function() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  if (!elements.length) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(function(el) {
    observer.observe(el);
  });
})();
