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

// ── Skill bar fill + percentage count-up
// Each .skill-row's bar fills to its data-width while its .skill-pct counts up
// from 0 with the same ease-out curve and duration as the CSS transition.
const SKILL_DURATION = 1100;
const SKILL_STAGGER = 90;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

function animateSkillRow(row, index) {
  const fill = row.querySelector('.skill-fill');
  const pct = row.querySelector('.skill-pct');
  const target = parseInt(fill.dataset.width, 10) || 0;

  if (reduceMotion.matches) {
    fill.style.width = target + '%';
    if (pct) pct.textContent = target + '%';
    return;
  }

  const delay = index * SKILL_STAGGER;
  fill.style.transitionDelay = delay + 'ms';
  fill.style.width = target + '%';
  if (!pct) return;

  const start = performance.now() + delay;
  const tick = (now) => {
    const t = Math.min(Math.max((now - start) / SKILL_DURATION, 0), 1);
    pct.textContent = Math.round(target * easeOutCubic(t)) + '%';
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

document.querySelectorAll('.skills-wrap').forEach(card => {
  const rows = [...card.querySelectorAll('.skill-row')];
  if (!rows.length) return;
  const run = () => rows.forEach(animateSkillRow);

  // The HTML holds the final values (shown if JS never runs); start from 0%.
  if (!reduceMotion.matches) {
    rows.forEach(row => { const pct = row.querySelector('.skill-pct'); if (pct) pct.textContent = '0%'; });
  }

  if (!('IntersectionObserver' in window)) { run(); return; }
  const skillObs = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      run();
      skillObs.disconnect();
    }
  }, { threshold: 0.35 });
  skillObs.observe(card);
});

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
