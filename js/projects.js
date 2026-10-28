// ──────────────────────────────────────────────────────────────────────────
//  Engineering project showcase data
//
//  HOW TO ADD OR UPDATE A PROJECT
//  ------------------------------
//  Each project is one object in the PROJECTS array below. Copy an existing
//  entry, change the fields, and save. The Engineering page builds the case
//  studies from this list automatically, so you never have to touch the HTML.
//
//  FIELD REFERENCE (the "type" each field should be)
//  -------------------------------------------------
//    title       {string}            Project name shown on the case study.
//    category    {string}            Short context label, e.g. "Client project".
//    role        {string}            What you did, grounded in the repository.
//    description {string}            A short, accurate summary (2–3 sentences).
//    highlights  {string[]}          2–3 concise, verifiable technical points.
//    tech        {string[]}          Technology badges, e.g. ["React", "Django"].
//    image       {Object | null}     Real screenshot of the live project:
//                                      src      1600×1000 JPEG (16:10)
//                                      srcSmall  800×500 JPEG of the same shot
//                                      alt      what the screenshot shows
//                                    null shows a text panel (see previewText).
//    previewText {string}            Panel text shown when there is no image.
//    liveUrl     {string | null}     Deployed app URL. Leave null until the app
//                                    is deployed AND verified. null hides the
//                                    "View Live Project" button entirely.
//    repoUrl     {string | null}     PUBLIC GitHub URL. Leave null for private
//                                    repos or when no code link should appear.
//                                    null hides the "View Code" button entirely.
//    status      {string}            Short deployment/progress label shown as a
//                                    pill, e.g. "Live", "In development".
//    featured    {boolean}           true  -> main case-study list.
//                                    false -> compact "Additional Projects" list.
//    countdown   {Object}            Optional live countdown shown directly under
//                                    the screenshot (needs an image):
//                                      target       absolute ISO time in UTC,
//                                                   e.g. "2027-01-16T07:00:00Z"
//                                      targetText   human date for screen readers
//                                      label        caption while counting down
//                                      completeLabel caption once target passes
//                                      cropScreenshotAt  optional y (of 1000) where
//                                                   the screenshot is trimmed, so
//                                                   the live panel replaces a
//                                                   countdown frozen in the shot
//
//  Optional fields (category, role, highlights, image, previewText, countdown)
//  are simply left out of the page when they're missing.
//
//  BUTTON RULES (enforced automatically by the renderer)
//    • A button appears ONLY when its URL is a non-empty string.
//    • No placeholder or fake URLs — a missing URL means no button.
//    • Both buttons navigate in the SAME browser tab (no target="_blank").
//
//  @typedef {Object} ProjectImage
//  @property {string}        src
//  @property {string}        srcSmall
//  @property {string}        alt
//
//  @typedef {Object} ProjectCountdown
//  @property {string}        target
//  @property {string}        targetText
//  @property {string}        label
//  @property {string}        completeLabel
//  @property {number}        [cropScreenshotAt]
//
//  @typedef {Object} Project
//  @property {string}             title
//  @property {string}             [category]
//  @property {string}             [role]
//  @property {string}             description
//  @property {string[]}           [highlights]
//  @property {string[]}           tech
//  @property {ProjectImage|null}  [image]
//  @property {string}             [previewText]
//  @property {string|null}        liveUrl
//  @property {string|null}        repoUrl
//  @property {string}             status
//  @property {boolean}            featured
//  @property {ProjectCountdown}   [countdown]
// ──────────────────────────────────────────────────────────────────────────

/** @type {Project[]} */
const PROJECTS = [
  {
    title: 'BRIGHTHOMES Construction Service',
    category: 'Construction & real-estate platform',
    role: 'Built the React website, Django REST API and Expo mobile app',
    description:
      'A construction and real-estate services platform built as three independently deployable apps: a React + TypeScript website, a Django REST API, and an Expo React Native mobile app. Visitors can browse services, property listings with galleries, and completed projects, book consultations, send enquiries, and save items to an account.',
    highlights: [
      'Website and mobile app share one Django REST API, and each app deploys independently',
      'JWT authentication with token refresh behind accounts, saved items, consultations and enquiries',
      'Media stored in Cloudinary and data in PostgreSQL, with Django and Vitest test suites',
    ],
    tech: ['React', 'TypeScript', 'Vite', 'Django REST', 'PostgreSQL', 'React Native'],
    image: {
      src: 'images/projects/brighthomes.jpg',
      srcSmall: 'images/projects/brighthomes-800.jpg',
      alt: 'BRIGHTHOMES website home page: a modern house at dusk behind the headline "Building Dreams, Constructing Reality", with Request a Consultation and Explore Our Work buttons.',
    },
    // Verified: Vercel project "brighthomes-construction-service" (linked to this repo, root: website/).
    liveUrl: 'https://brighthomes-construction-service.vercel.app',
    repoUrl: 'https://github.com/richiejazz/BRIGHTHOMES-CONSTRUCTION-SERVICE',
    status: 'Live · in development',
    featured: true,
  },
  {
    title: 'GrowVault',
    category: 'Client project · fintech prototype',
    role: 'Developer on a client engagement that ended before completion, now published as a portfolio prototype',
    description:
      'A savings and investment platform prototype with NGN and USD wallets, fixed-term savings plans, KYC-gated deposits and withdrawals, and an auditable transaction ledger. Portfolio demo only — payments run in sandbox mode and no real money moves.',
    highlights: [
      'Row-locked wallet balance changes, each paired with a ledger transaction',
      'Signature-verified, deduplicated payment webhooks behind a provider-agnostic settlement core',
      'JWT auth with rotating refresh tokens, per-user data isolation and rate limiting',
    ],
    tech: ['React', 'Vite', 'Django REST', 'PostgreSQL', 'JWT Auth'],
    image: {
      src: 'images/projects/growvault.jpg',
      srcSmall: 'images/projects/growvault-800.jpg',
      alt: 'GrowVault landing page with the headline "A clearer way to save and manage money in Naira or Dollars" and Create Free Account and Log In buttons.',
    },
    // Verified: Vercel project "growvault" (linked to this repo, root: frontend/).
    liveUrl: 'https://growvault-nine.vercel.app',
    repoUrl: 'https://github.com/richiejazz/growvault',
    status: 'Live demo · prototype',
    featured: true,
  },
  {
    title: 'AI Image Studio',
    category: 'AI image tool',
    role: 'Built the Vite frontend and the Express API',
    description:
      'Upload an image and apply Cloudinary AI transformations: format and quality optimisation, background removal, face-detected avatar crops, and smart-cropped sizes for Instagram, TikTok, X, LinkedIn and YouTube.',
    highlights: [
      'Cloudinary credentials stay server-side; uploads are processed in memory, never written to disk',
      'Uploads are validated by their actual file bytes, not just the declared type, up to 10 MB',
      'Per-visitor rate limiting on processing endpoints, with API tests that stub Cloudinary',
    ],
    tech: ['JavaScript', 'Vite', 'Node.js', 'Express', 'Cloudinary'],
    image: {
      src: 'images/projects/ai-image-studio.jpg',
      srcSmall: 'images/projects/ai-image-studio-800.jpg',
      alt: 'AI Image Studio landing page: the headline "Studio-quality image edits, without the studio" beside a before-and-after background-removal comparison of a potted plant.',
    },
    // Verified: Vercel project "ai-image-studio-complete" — the only origin the API's CORS allows.
    liveUrl: 'https://ai-image-studio-complete.vercel.app',
    repoUrl: 'https://github.com/richiejazz/AI-Image-Studio-complete',
    status: 'Live',
    featured: true,
  },
  {
    title: 'Recruitment Test — Patient Dashboard',
    category: 'Recruitment skills assessment',
    role: 'Frontend developer, for the Coalition Technologies Frontend Developer skills assessment',
    description:
      'A Tech.Care patient dashboard showing a patient’s profile, diagnosis history, vitals, diagnostic list and lab results from the assessment’s Patient Data API.',
    highlights: [
      'Reproduces the assessment design in React, including a Chart.js blood-pressure chart',
      'A Vercel serverless function proxies the API, keeping its credentials out of the browser',
      'The proxy filters data on the server, so the browser only receives what the UI displays',
    ],
    tech: ['React', 'Vite', 'Chart.js', 'Vercel Functions'],
    image: {
      src: 'images/projects/patient-dashboard.jpg',
      srcSmall: 'images/projects/patient-dashboard-800.jpg',
      alt: 'Tech.Care patient dashboard showing a patient list, a blood-pressure chart with respiratory rate, temperature and heart-rate cards, and the selected patient’s profile. Sample data from the assessment API.',
    },
    // Verified: Vercel project "coalition-patient-dashboard" (linked to this repo).
    liveUrl: 'https://coalition-patient-dashboard-seven.vercel.app',
    repoUrl: 'https://github.com/richiejazz/coalition-patient-dashboard',
    status: 'Live',
    featured: true,
  },
  {
    title: 'OneVote',
    category: 'Private project',
    role: 'Developer of the voter web app and the Django REST API',
    description:
      'A web-based electronic voting platform designed around Nigerian elections, with a voter web app, a candidate portal, and an administrator API using role-based access control. The MVP is live and under active development; its demo election data is still being set up.',
    highlights: [
      'Models Nigerian elections by state, local government area and polling unit',
      'JWT authentication with refresh-token rotation and blacklisting',
      'Role-based access control across voter, candidate and administrator areas',
    ],
    tech: ['Django REST', 'React', 'JWT Auth', 'PostgreSQL'],
    image: {
      src: 'images/projects/onevote.jpg',
      srcSmall: 'images/projects/onevote-800.jpg',
      alt: 'OneVote home page: a demonstration-mode notice above the headline "Every vote gets a receipt", with Register to vote and See live results buttons and a countdown to the presidential election.',
    },
    previewText: 'Live MVP · In Development',
    // Verified: production frontend on Vercel. repoUrl stays null: the repository is private.
    liveUrl: 'https://one-vote-pi.vercel.app',
    repoUrl: null, // private repository — intentionally no code link
    status: 'Live · in development',
    featured: true,
    // Verified 2026-10-28 from the live landing page's code: its countdown targets
    // Date.UTC(2027, 0, 16, 7, 0, 0), the presidential election's opensAt
    // ("Sat 16 Jan 2027 · 08:00 – 18:00 WAT"). Its countdown band starts at y=763
    // in onevote.jpg (measured on the live page at the same 1440×900 viewport).
    countdown: {
      target: '2027-01-16T07:00:00Z',
      targetText: 'Sat 16 Jan 2027, 08:00 WAT',
      label: 'Presidential election opens in',
      completeLabel: 'Scheduled opening time reached',
      cropScreenshotAt: 763,
    },
  },
  {
    title: 'CSS Landing Page',
    category: 'Frontend practice project',
    role: 'Frontend practice in HTML, CSS and vanilla JavaScript',
    description:
      'A responsive landing-page concept for an ambient lamp, built to practise layout, responsive design and styling fundamentals.',
    highlights: [
      'Collapsible mobile menu that also closes with the Escape key',
      'Swipeable scene gallery with previous and next controls',
      'Respects reduced-motion preferences and includes a skip-to-content link',
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: {
      src: 'images/projects/css-landing-page.jpg',
      srcSmall: 'images/projects/css-landing-page-800.jpg',
      alt: 'Aura landing page concept: the headline "Light that moves with your mood" over a purple and coral gradient, with three feature cards below.',
    },
    // Verified: Vercel project "css-practise-for-landing-page" (linked to this repo).
    liveUrl: 'https://css-practise-for-landing-page.vercel.app/',
    repoUrl: 'https://github.com/richiejazz/CSS-Practise-for-Landing-Page',
    status: 'Live',
    featured: false,
  },
];

// ── Render the case studies ─────────────────────────────────────────────────
// Escape any text that goes into HTML so titles/descriptions can never break
// the markup or inject anything unexpected.
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function projectButtons(project) {
  const buttons = [];
  // View Live Project — only when a real deployment URL exists. Same tab.
  if (typeof project.liveUrl === 'string' && project.liveUrl.trim() !== '') {
    buttons.push(
      `<a href="${escapeHtml(project.liveUrl)}" class="btn-primary">View Live Project</a>`
    );
  }
  // View Code — only for public repos with a real URL. Same tab.
  if (typeof project.repoUrl === 'string' && project.repoUrl.trim() !== '') {
    buttons.push(
      `<a href="${escapeHtml(project.repoUrl)}" class="btn-outline">View Code</a>`
    );
  }
  if (buttons.length === 0) return '';
  return `<div class="project-actions">${buttons.join('')}</div>`;
}

// Live countdown panel (see startCountdowns below). The clock digits are
// aria-hidden; the role="timer" element carries a readable aria-label instead.
const COUNTDOWN_UNITS = [['days', 'Days'], ['hours', 'Hrs'], ['minutes', 'Min'], ['seconds', 'Sec']];

function projectCountdown(project) {
  const cd = project.countdown;
  if (!cd || !Number.isFinite(Date.parse(cd.target))) return '';
  const units = COUNTDOWN_UNITS.map(([unit, label]) => `
            <div class="case-countdown-unit">
              <span class="case-countdown-num" data-unit="${unit}">00</span>
              <span class="case-countdown-unit-label">${label}</span>
            </div>`).join('');
  return `
        <div class="case-countdown" role="timer"
             data-target="${escapeHtml(cd.target)}"
             data-target-text="${escapeHtml(cd.targetText || '')}"
             data-label="${escapeHtml(cd.label)}"
             data-complete-label="${escapeHtml(cd.completeLabel)}">
          <p class="case-countdown-label">${escapeHtml(cd.label)}</p>
          <div class="case-countdown-clock" aria-hidden="true">${units}
          </div>
        </div>`;
}

// Screenshot, or a text panel when the project has no public screenshot yet.
// Width/height reserve the 16:10 space before the image loads (no layout shift).
function projectMedia(project) {
  const img = project.image;
  if (img && img.src) {
    const srcset = img.srcSmall
      ? ` srcset="${escapeHtml(img.srcSmall)} 800w, ${escapeHtml(img.src)} 1600w"
            sizes="(max-width: 900px) 100vw, 56vw"`
      : '';
    const countdown = projectCountdown(project);
    const crop = countdown && Number(project.countdown.cropScreenshotAt) > 0
      ? ` style="--shot-ratio: 1600 / ${Number(project.countdown.cropScreenshotAt)}"`
      : '';
    return `
      <figure class="case-media${countdown ? ' case-media--countdown' : ''}"${crop}>
        <img src="${escapeHtml(img.src)}"${srcset}
             width="1600" height="1000" loading="lazy" decoding="async"
             alt="${escapeHtml(img.alt || '')}">${countdown}
      </figure>`;
  }
  return `
      <div class="case-media case-media--panel">
        <p class="case-panel-text">${escapeHtml(project.previewText || project.status || '')}</p>
      </div>`;
}

/**
 * @param {Project} project
 * @param {{ index?: number, reverse?: boolean, compact?: boolean }} [opts]
 */
function projectCard(project, opts = {}) {
  const classes = ['case-study', 'reveal'];
  if (opts.reverse) classes.push('case-study--reverse');
  if (opts.compact) classes.push('case-study--compact');

  const index = typeof opts.index === 'number'
    ? `<span class="case-index">${String(opts.index + 1).padStart(2, '0')}</span>`
    : '';
  const category = project.category
    ? `<span class="case-category">${escapeHtml(project.category)}</span>`
    : '';
  const status = project.status
    ? `<span class="project-status">${escapeHtml(project.status)}</span>`
    : '';
  const role = project.role
    ? `<p class="case-role"><span class="case-role-label">Role</span>${escapeHtml(project.role)}</p>`
    : '';
  const highlights = Array.isArray(project.highlights) && project.highlights.length
    ? `<ul class="case-highlights">${project.highlights
        .map((h) => `<li>${escapeHtml(h)}</li>`)
        .join('')}</ul>`
    : '';
  const tags = project.tech
    .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
    .join('');

  return `
    <article class="${classes.join(' ')}">
      ${projectMedia(project)}
      <div class="case-body">
        <div class="case-meta">${index}${category}${status}</div>
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        ${role}
        <p class="project-desc">${escapeHtml(project.description)}</p>
        ${highlights}
        <div class="project-tags">${tags}</div>
        ${projectButtons(project)}
      </div>
    </article>`;
}

function renderProjects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const additional = PROJECTS.filter((p) => !p.featured);

  // Featured rows alternate the screenshot side: left, right, left, …
  const featuredEl = document.getElementById('featured-projects');
  if (featuredEl) {
    featuredEl.innerHTML = featured
      .map((p, i) => projectCard(p, { index: i, reverse: i % 2 === 1 }))
      .join('');
  }

  const additionalWrap = document.getElementById('additional-projects-section');
  const additionalEl = document.getElementById('additional-projects');
  if (additionalEl) {
    additionalEl.innerHTML = additional
      .map((p) => projectCard(p, { compact: true }))
      .join('');
  }
  // Hide the whole "Additional Projects" block if there are none.
  if (additionalWrap) additionalWrap.style.display = additional.length ? '' : 'none';
}

// ── Live countdowns ─────────────────────────────────────────────────────────
// Every update recomputes the remaining time from the absolute target and the
// current clock (never by decrementing), so it stays correct after a refresh,
// a sleeping tab or a clock change. Same maths as the live OneVote page.
function countdownParts(targetMs, nowMs) {
  const total = Math.max(0, Math.floor((targetMs - nowMs) / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    complete: nowMs >= targetMs,
  };
}

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

// Returns true once the target has passed: the clock then stays at zero with
// the completed label (it is never hidden, reset or restarted).
function renderCountdown(el, targetMs, nowMs) {
  const parts = countdownParts(targetMs, nowMs);
  el.querySelectorAll('.case-countdown-num').forEach((num) => {
    const value = parts[num.dataset.unit];
    const text = num.dataset.unit === 'days' ? String(value) : String(value).padStart(2, '0');
    if (num.textContent !== text) num.textContent = text;
  });

  const label = parts.complete ? el.dataset.completeLabel : el.dataset.label;
  const caption = el.querySelector('.case-countdown-label');
  if (caption.textContent !== label) caption.textContent = label;
  el.classList.toggle('is-complete', parts.complete);

  const when = el.dataset.targetText ? ` (${el.dataset.targetText})` : '';
  const aria = parts.complete
    ? `${label}${when}`
    : `${label} ${plural(parts.days, 'day')}, ${plural(parts.hours, 'hour')}, ${plural(parts.minutes, 'minute')}${when}`;
  if (el.getAttribute('aria-label') !== aria) el.setAttribute('aria-label', aria);
  return parts.complete;
}

function startCountdowns() {
  const timers = [...document.querySelectorAll('.case-countdown')]
    .map((el) => ({ el, target: Date.parse(el.dataset.target) }))
    .filter((t) => Number.isFinite(t.target));
  if (!timers.length) return;

  let timeoutId;
  const tick = () => {
    clearTimeout(timeoutId);
    const now = Date.now();
    const running = timers.filter((t) => !renderCountdown(t.el, t.target, now)).length;
    // Wake just after the next whole second; stop once every countdown is complete.
    if (running) timeoutId = setTimeout(tick, 1000 - (now % 1000) + 20);
  };
  tick();
  // Refresh at once when a hidden tab comes back or the page is restored from cache.
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
  window.addEventListener('pageshow', tick);
}

// Runs before main.js (this file is included first), so the scroll-reveal
// observer in main.js will pick up the freshly rendered .reveal case studies.
renderProjects();
startCountdowns();
