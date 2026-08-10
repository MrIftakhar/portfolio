// Custom JavaScript for Navbar + Hero

document.addEventListener('DOMContentLoaded', function () {

  // Add active class on click (for better UX)
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Remove active from all links
      navLinks.forEach(l => l.classList.remove('active'));

      // Add active to clicked link
      this.classList.add('active');
    });
  });

  // Change navbar style on scroll
  const navbar = document.querySelector('.custom-navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Animated counters (Projects section)
  const runCounter = (el) => {
    const target = +el.getAttribute('data-target');
    const suffix = el.getAttribute('data-suffix') || '';
    const isDecimal = target % 1 !== 0;
    const speed = 2000;
    const increment = target / (speed / 16);
    let current = 0;
    const update = () => {
      current += increment;
      if (current < target) {
        const display = isDecimal ? current.toFixed(1) : Math.ceil(current);
        el.innerHTML = display + '<span class="count-suffix">' + suffix + '</span>';
        requestAnimationFrame(update);
      } else {
        const display = isDecimal ? target.toFixed(1) : target;
        el.innerHTML = display + '<span class="count-suffix">' + suffix + '</span>';
      }
    };
    update();
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.count-num').forEach(n => counterObserver.observe(n));

  // Auto-update footer copyright year
  const footerYearEl = document.getElementById('footerYear');
  if (footerYearEl) {
    footerYearEl.textContent = new Date().getFullYear();
  }

  // Contact form submission (Formspree, via fetch — no page reload)
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.contact-submit-btn');
      const statusEl = document.getElementById('contactFormStatus');

      statusEl.textContent = '';
      statusEl.classList.remove('success', 'error');
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      })
        .then(response => {
          if (response.ok) {
            statusEl.textContent = "Thanks! Your message has been sent.";
            statusEl.classList.add('success');
            contactForm.reset();
          } else {
            return response.json().then(data => {
              const message = (data && data.errors && data.errors.length)
                ? data.errors.map(err => err.message).join(', ')
                : "Something went wrong. Please try again or email me directly.";
              throw new Error(message);
            });
          }
        })
        .catch(err => {
          statusEl.textContent = err.message || "Something went wrong. Please try again or email me directly.";
          statusEl.classList.add('error');
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
        });
    });
  }

});