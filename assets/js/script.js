// Custom JavaScript for Navbar + Hero + Dynamic Projects Fetcher

document.addEventListener('DOMContentLoaded', function () {

  // =========================================================================
  // 01. DYNAMIC GOOGLE SHEET PROJECTS FETCHER
  // =========================================================================
  const SHEET_ID = '1imTCD_JMyLTQByco8xuLCfna9Jbl2Qk9eE5WxotUfpI';
  const PROJECTS_TAB_NAME = 'projects';
  const PROJECTS_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(PROJECTS_TAB_NAME)}`;

  async function fetchProjectsData() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    try {
      const response = await fetch(PROJECTS_URL);
      const text = await response.text();

      // Extract JSON payload from Google Visualization response string
      const json = JSON.parse(text.substring(47, text.length - 2));
      const rows = json.table.rows;

      container.innerHTML = ''; // Clear loading spinner

      rows.forEach((row) => {
        // Col A: Category | Col B: Title | Col C: Description | Col D: Tech Tags | Col E: Demo URL | Col F: Image URL
        const category    = row.c[0] ? row.c[0].v : '';
        const title       = row.c[1] ? row.c[1].v : '';
        const description = row.c[2] ? row.c[2].v : '';
        const tags        = row.c[3] ? row.c[3].v.split(',') : [];
        const projectUrl  = row.c[4] ? row.c[4].v : '';
        const imageUrl    = row.c[5] ? row.c[5].v : 'https://via.placeholder.com/600x350/1f2937/9ca3af?text=Project+Preview';

        const tagsHTML = tags.map(tag => `<span class="tech-tag">${tag.trim()}</span>`).join('');

        const cardHTML = `
          <div class="project-card">
            <div class="project-thumb">
              <img src="${imageUrl}" alt="${title}" class="project-img" loading="lazy" />
              ${category ? `<span class="project-badge">${category}</span>` : ''}
              
              <div class="project-img-overlay">
                ${projectUrl ? `<a href="${projectUrl}" target="_blank" rel="noopener" class="hover-link-btn">View Live Project ↗</a>` : ''}
              </div>
            </div>

            <div class="project-content">
              <h3 class="project-title">${title}</h3>
              <p class="project-description">${description}</p>
              <div class="tech-tags">
                ${tagsHTML}
              </div>
            </div>
          </div>
        `;

        container.insertAdjacentHTML('beforeend', cardHTML);
      });

    } catch (error) {
      console.error('Error fetching Projects data:', error);
      if (container) {
        container.innerHTML = `
          <div class="alert alert-danger text-center grid-span-full">
            Failed to load projects. Please verify that your Google Sheet is shared publicly.
          </div>
        `;
      }
    }
  }

  fetchProjectsData();


  // =========================================================================
  // 02. NAVBAR ACTIVE LINKS & SCROLL STYLING
  // =========================================================================
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  const navbar = document.querySelector('.custom-navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // =========================================================================
  // 03. ANIMATED COUNTERS
  // =========================================================================
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


  // =========================================================================
  // 04. FOOTER COPYRIGHT YEAR
  // =========================================================================
  const footerYearEl = document.getElementById('footerYear');
  if (footerYearEl) {
    footerYearEl.textContent = new Date().getFullYear();
  }


  // =========================================================================
  // 05. CONTACT FORM SUBMISSION (FORMSPREE AJAX)
  // =========================================================================
  const contactForm = document.getElementById('contactForm');

  // Skip the Formspree AJAX handler when EmailJS is used (marked by data-emailjs)
  if (contactForm && !contactForm.dataset.emailjs) {
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