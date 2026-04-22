// Ampersand Manufacturing - Shared Components
// Header + Footer injection for all pages

(function() {
  'use strict';

  // Determine if we're in a subdirectory (e.g., /blog/)
  const path = window.location.pathname;
  const prefix = path.includes('/blog/') ? '/' : '/';

  // ============================================
  // Header / Navigation
  // ============================================
  const headerHTML = `
    <nav class="nav" id="main-nav">
      <div class="container nav__inner">
        <a href="${prefix}" class="nav__logo">
          <span class="nav__logo-mark">&amp;</span>
          <span class="nav__logo-group">
            <span class="nav__logo-text">Ampersand Manufacturing</span>
            <span class="nav__logo-tagline">Custom Magnetic Components</span>
          </span>
        </a>

        <div class="nav__menu" id="nav-menu">
          <div class="nav__dropdown">
            <button class="nav__dropdown-trigger">
              Products
              <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1l4 4 4-4"/></svg>
            </button>
            <div class="nav__dropdown-menu">
              <a href="${prefix}products">All Products</a>
              <a href="${prefix}custom-inductors">Custom Inductors</a>
              <a href="${prefix}custom-transformers">Custom Transformers</a>
              <a href="${prefix}core-materials">Core Materials Guide</a>
              <a href="${prefix}wire-types">Wire Types Guide</a>
            </div>
          </div>

          <a href="${prefix}industries" class="nav__link">Industries</a>
          <a href="${prefix}how-it-works" class="nav__link">How We Work</a>

          <div class="nav__dropdown">
            <button class="nav__dropdown-trigger">
              Resources
              <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1l4 4 4-4"/></svg>
            </button>
            <div class="nav__dropdown-menu">
              <a href="${prefix}blog/">Blog</a>
              <a href="${prefix}use-cases">Use Cases</a>
              <a href="${prefix}quality">Quality &amp; Compliance</a>
            </div>
          </div>

          <a href="${prefix}contact" class="nav__link nav__link--cta">Contact Us</a>
        </div>

        <button class="nav__toggle" id="nav-toggle" aria-label="Toggle navigation menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="nav__overlay" id="nav-overlay"></div>
    </nav>
  `;

  // ============================================
  // Footer
  // ============================================
  const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <a href="${prefix}" class="footer__logo">
              <span class="mark">&amp;</span> Ampersand Manufacturing
            </a>
            <p class="footer__tagline">Custom Inductors &amp; Transformers</p>
            <p class="footer__address">
              2204 McKinley Avenue<br>
              Berkeley, California 94703
            </p>
          </div>

          <div class="footer__nav">
            <h4>Products</h4>
            <a href="${prefix}custom-inductors">Custom Inductors</a>
            <a href="${prefix}custom-transformers">Custom Transformers</a>
            <a href="${prefix}core-materials">Core Materials</a>
            <a href="${prefix}wire-types">Wire Types</a>
            <a href="${prefix}products">All Products</a>
          </div>

          <div class="footer__nav">
            <h4>Company</h4>
            <a href="${prefix}how-it-works">How We Work</a>
            <a href="${prefix}industries">Industries</a>
            <a href="${prefix}quality">Quality</a>
          </div>

          <div class="footer__nav">
            <h4>Resources</h4>
            <a href="${prefix}blog/">Blog</a>
            <a href="${prefix}use-cases">Use Cases</a>
          </div>

          <div class="footer__nav">
            <h4>Contact</h4>
            <div class="footer__contact-info">
              <a href="mailto:joe@ampmanufacturing.com">joe@ampmanufacturing.com</a>
              <a href="tel:5104737714">510-473-7714</a>
              <p style="font-size:0.85rem;color:var(--text-muted);margin-top:var(--s2);">
                2204 McKinley Avenue<br>Berkeley, California 94703
              </p>
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <p>&copy; ${new Date().getFullYear()} Ampersand Manufacturing. All rights reserved.</p>
          <div class="footer__badges">
            <span class="footer__badge">RoHS Compliant</span>
            <span class="footer__badge">Lead-Free</span>
          </div>
        </div>
      </div>
    </footer>
  `;

  // ============================================
  // Inject components
  // ============================================
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');

  if (headerEl) headerEl.innerHTML = headerHTML;
  if (footerEl) footerEl.innerHTML = footerHTML;

  // ============================================
  // Navigation interactions
  // ============================================
  function initNav() {
    const nav = document.getElementById('main-nav');
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const overlay = document.getElementById('nav-overlay');

    if (!nav || !toggle || !menu) return;

    // Scroll state
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
      lastScroll = scrollY;
    }, { passive: true });

    // Mobile toggle
    toggle.addEventListener('click', function() {
      toggle.classList.toggle('active');
      menu.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on overlay click
    if (overlay) {
      overlay.addEventListener('click', function() {
        toggle.classList.remove('active');
        menu.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Mobile dropdown toggles
    const dropdowns = menu.querySelectorAll('.nav__dropdown');
    dropdowns.forEach(function(dropdown) {
      const trigger = dropdown.querySelector('.nav__dropdown-trigger');
      if (trigger && window.innerWidth <= 900) {
        trigger.addEventListener('click', function(e) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        });
      }
    });
  }

  // ============================================
  // Initialize
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
