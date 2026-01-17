// Ampersand Manufacturing - Main JavaScript

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// Navigation Dropdown Menu
const navMenu = document.querySelector('.nav__menu');
const navMenuToggle = document.querySelector('.nav__menu-toggle');

if (navMenu && navMenuToggle) {
  navMenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
    }
  });

  // Close dropdown when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navMenu.classList.remove('active');
    }
  });
}

// Scroll Animations
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll, .stagger-children');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
};

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scrolled class to nav on scroll
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// Contact Form Handling (if on contact page)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Show success message
        contactForm.innerHTML = `
          <div style="text-align: center; padding: var(--space-2xl);">
            <h3 style="color: var(--color-accent); margin-bottom: var(--space-lg);">Message Sent</h3>
            <p>Thanks for reaching out. We'll get back to you within one business day.</p>
          </div>
        `;
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      alert('Something went wrong. Please try again or email us directly.');
    }
  });
}
