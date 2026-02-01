// Reframe Typer Animation
(function() {
  const reframes = [
    { negative: '"Too small for the big shops"', positive: 'The perfect size for us' },
    { negative: '"Nobody takes our orders seriously"', positive: 'Every order gets our full attention' },
    { negative: '"Mixed specs are a hassle"', positive: 'Mixed runs are our specialty' },
    { negative: '"Overseas means quality uncertainty"', positive: 'U.S.-based production you can trust' },
    { negative: '"We get lost in the queue"', positive: "You're a partner, not a number" }
  ];

  let currentIndex = 0;
  let completedReframes = [];

  const negativeTextEl = document.querySelector('.reframe-typer__negative-text');
  const positiveTextEl = document.querySelector('.reframe-typer__positive-text');
  const listEl = document.getElementById('reframe-list');

  if (!negativeTextEl || !positiveTextEl || !listEl) return;

  function typeText(element, text, callback) {
    let i = 0;
    element.textContent = '';

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, 40 + Math.random() * 30);
      } else if (callback) {
        callback();
      }
    }
    type();
  }

  function showNegative(text, callback) {
    negativeTextEl.classList.remove('struck');
    negativeTextEl.textContent = text;
    setTimeout(callback, 1200);
  }

  function strikeNegative(callback) {
    negativeTextEl.classList.add('struck');
    setTimeout(callback, 600);
  }

  function clearActive(callback) {
    positiveTextEl.textContent = '';
    negativeTextEl.textContent = '';
    negativeTextEl.classList.remove('struck');
    setTimeout(callback, 300);
  }

  function addToList(negative, positive) {
    completedReframes.push({ negative, positive });
    renderList();
  }

  function renderList() {
    // Show last 3 completed reframes
    const toShow = completedReframes.slice(-3);
    listEl.innerHTML = toShow.map(item => `
      <div class="reframe-typer__list-item">
        <span class="negative">${item.negative}</span>
        <span class="positive">${item.positive}</span>
      </div>
    `).join('');
  }

  function runCycle() {
    const current = reframes[currentIndex];

    showNegative(current.negative, function() {
      strikeNegative(function() {
        typeText(positiveTextEl, current.positive, function() {
          setTimeout(function() {
            addToList(current.negative, current.positive);
            currentIndex = (currentIndex + 1) % reframes.length;
            clearActive(runCycle);
          }, 2000);
        });
      });
    });
  }

  // Start animation when element is in view
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        observer.disconnect();
        setTimeout(runCycle, 500);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(document.querySelector('.reframe-typer'));
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
