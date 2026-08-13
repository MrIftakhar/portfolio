(function () {
  // Replace these with values from your EmailJS dashboard
  const PUBLIC_KEY = 'K-XSXDxcokfzROj8Q';
  const SERVICE_ID = 'service_9vbnjv8';
  const TEMPLATE_ID = 'template_ku7y7md';

  const SDK_CDN = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';

  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = url;
      s.onload = () => resolve();
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }

  async function ensureSdk() {
    if (window.emailjs) return true;
    try {
      await loadScript(SDK_CDN);
      return !!window.emailjs;
    } catch (err) {
      console.error('Failed to load EmailJS SDK:', err);
      return false;
    }
  }

  document.addEventListener('DOMContentLoaded', async function () {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm || !contactForm.dataset.emailjs) return;

    const sdkReady = await ensureSdk();
    if (sdkReady) {
      try { emailjs.init(PUBLIC_KEY); } catch (err) { console.warn('emailjs.init error', err); }
    } else {
      console.warn('EmailJS SDK not available after attempted load.');
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.contact-submit-btn');
      const statusEl = document.getElementById('contactFormStatus');

      if (statusEl) { statusEl.textContent = ''; statusEl.classList.remove('success', 'error'); }
      if (submitBtn) { submitBtn.disabled = true; submitBtn.classList.add('loading'); }

      if (!window.emailjs || typeof emailjs.sendForm !== 'function') {
        if (statusEl) { statusEl.textContent = 'Email service unavailable.'; statusEl.classList.add('error'); }
        if (submitBtn) { submitBtn.disabled = false; submitBtn.classList.remove('loading'); }
        console.error('EmailJS unavailable:', { emailjs: window.emailjs });
        return;
      }

      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm)
        .then(function (response) {
          if (statusEl) { statusEl.textContent = 'Thanks! Your message has been sent.'; statusEl.classList.add('success'); }
          contactForm.reset();
          console.log('EmailJS sendForm success', response);
        })
        .catch(function (err) {
          if (statusEl) { statusEl.textContent = 'Failed to send message. ' + (err && err.text ? err.text : ''); statusEl.classList.add('error'); }
          console.error('EmailJS sendForm error', err);
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.classList.remove('loading'); }
        });
    });
  });
})();
