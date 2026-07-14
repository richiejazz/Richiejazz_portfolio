// ── Active nav link highlight
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) link.classList.add('active');
  });
})();

// ── Hamburger menu toggle
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger) {
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('active'));
}

function closeMenu() {
  if (mobileMenu) mobileMenu.classList.remove('active');
}

// ── Scroll-reveal animation
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Skill bar fill animation
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width;
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.skill-fill').forEach(b => barObs.observe(b));

// ── Contact form submit with EmailJS
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const EMAILJS_PUBLIC_KEY = 'nsBz_x2TSAIOdKOzw';
  const EMAILJS_SERVICE_ID = 'service_richiejazz';
  const EMAILJS_TEMPLATE_ID = 'template_uxnuat1';

  if (typeof emailjs !== 'undefined' && typeof emailjs.init === 'function') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const msg = document.getElementById('form-msg');

    const name = document.getElementById('user_name').value.trim();
    const email = document.getElementById('user_email').value.trim();
    const serviceType = document.getElementById('user_service').value;
    const message = document.getElementById('user_message').value.trim();

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      service_type: serviceType,
      reply_to: email,
      to_email: 'Godswillmusic7@gmail.com'
    };

    btn.disabled = true;
    btn.textContent = 'Sending...';
    msg.style.display = 'none';

    if (typeof emailjs !== 'undefined' && typeof emailjs.sendForm === 'function') {
      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm, EMAILJS_PUBLIC_KEY)
        .then(() => {
          msg.style.color = '#c8a84b';
          msg.textContent = '✓ Message sent! I\'ll get back to you soon.';
          msg.style.display = 'block';
          contactForm.reset();
        })
        .catch((error) => {
          console.error('EmailJS error:', error);
          const detail = error?.text || error?.message || 'Please try again in a moment.';
          msg.style.color = '#ff6b6b';
          msg.textContent = `The message could not be sent right now. ${detail}`;
          msg.style.display = 'block';
        })
        .finally(() => {
          btn.disabled = false;
          btn.textContent = 'Send Message';
          setTimeout(() => { msg.style.display = 'none'; }, 8000);
        });
    } else {
      msg.style.color = '#ff6b6b';
      msg.textContent = 'Email delivery is unavailable right now. Please try again shortly.';
      msg.style.display = 'block';
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  });
}
