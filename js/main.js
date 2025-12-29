// ANT Manufacturing - Main JavaScript

// Reframe Typewriter Effect
class ReframeTyper {
  constructor() {
    this.negativeEl = document.querySelector('.reframe-typer__negative-text');
    this.positiveEl = document.querySelector('.reframe-typer__positive-text');
    this.listEl = document.getElementById('reframe-list');

    if (!this.negativeEl || !this.positiveEl || !this.listEl) return;

    this.pairs = [
      {
        negative: '"Your order is too small for us."',
        positive: 'Every order gets our full attention.'
      },
      {
        negative: '"We can\'t guarantee that timeline."',
        positive: 'We deliver when we say we will.'
      },
      {
        negative: '"You\'ll need larger quantities."',
        positive: '1,000 units? That\'s our sweet spot.'
      },
      {
        negative: '"We\'ll get back to you... eventually."',
        positive: 'We respond within one business day.'
      }
    ];

    this.currentIndex = 0;
    this.charIndex = 0;
    this.phase = 'negative'; // negative, strike, positive, move
    this.typeSpeed = 35;
    this.pauseAfterNegative = 800;
    this.pauseAfterStrike = 400;
    this.pauseAfterPositive = 1500;
    this.pauseBeforeNext = 600;
    this.fadeOutDuration = 500;

    this.run();
  }

  run() {
    const pair = this.pairs[this.currentIndex];

    switch (this.phase) {
      case 'negative':
        this.typeNegative(pair.negative);
        break;
      case 'strike':
        this.strikeNegative();
        break;
      case 'positive':
        this.typePositive(pair.positive);
        break;
      case 'move':
        this.moveToList(pair);
        break;
    }
  }

  typeNegative(text) {
    if (this.charIndex < text.length) {
      this.negativeEl.textContent = text.substring(0, this.charIndex + 1);
      this.charIndex++;
      setTimeout(() => this.run(), this.typeSpeed);
    } else {
      this.charIndex = 0;
      this.phase = 'strike';
      setTimeout(() => this.run(), this.pauseAfterNegative);
    }
  }

  strikeNegative() {
    this.negativeEl.classList.add('struck');
    this.phase = 'positive';
    setTimeout(() => this.run(), this.pauseAfterStrike);
  }

  typePositive(text) {
    if (this.charIndex < text.length) {
      this.positiveEl.textContent = text.substring(0, this.charIndex + 1);
      this.charIndex++;
      setTimeout(() => this.run(), this.typeSpeed);
    } else {
      this.charIndex = 0;
      this.phase = 'move';
      setTimeout(() => this.run(), this.pauseAfterPositive);
    }
  }

  moveToList(pair) {
    // Add completed pair to list
    const item = document.createElement('div');
    item.className = 'reframe-typer__list-item';
    item.innerHTML = `
      <span class="negative">${pair.negative}</span>
      <span class="positive">→ ${pair.positive}</span>
    `;
    // Insert at beginning so newest is on top, pushing others down
    this.listEl.insertBefore(item, this.listEl.firstChild);

    // Clear active typing area
    this.negativeEl.textContent = '';
    this.negativeEl.classList.remove('struck');
    this.positiveEl.textContent = '';

    // Move to next pair
    this.currentIndex = (this.currentIndex + 1) % this.pairs.length;

    // If we've completed all pairs, fade out and reset for smooth loop
    if (this.currentIndex === 0) {
      // Fade out the list
      this.listEl.classList.add('fading');

      setTimeout(() => {
        this.listEl.innerHTML = '';
        this.listEl.classList.remove('fading');
        this.phase = 'negative';
        setTimeout(() => this.run(), 200);
      }, this.fadeOutDuration);
    } else {
      this.phase = 'negative';
      setTimeout(() => this.run(), this.pauseBeforeNext);
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Start reframe typer when element is in view
  const reframeSection = document.querySelector('.reframe-typer');
  if (reframeSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          new ReframeTyper();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(reframeSection);
  }
});

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
