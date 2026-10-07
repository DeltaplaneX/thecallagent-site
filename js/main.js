/* ============================================================
   THE CALL AGENT — Premium Interactive JS
   - Particles canvas background
   - Mouse spotlight tracking on cards
   - Magnetic button effect
   - Parallax scrolling
   - Typed text effect
   - Tilt effect on hero visual
   - Smooth animated counters
   - Nav scroll + mobile menu
   - Contact form webhook
   - Scroll reveal
   ============================================================ */

/* Did the backend accept the lead? The /lead endpoint signals the outcome via
   BOTH the HTTP status and a JSON `success` flag, so a rejected lead (e.g.
   200 + {success:false} when consent is missing) must NOT be shown as sent.
   Side-effect-free + exported at the bottom of the file for unit tests. */
function leadSucceeded(res, data) {
  return !!res && res.ok === true && !!data && data.success === true;
}

/* ── Libellés JS par langue ─────────────────────────────────
   Les pages /en/ et /zh/ partagent ce fichier : la langue est lue sur
   <html lang>. Le texte HTML est traduit dans chaque page ; seuls les
   messages générés ici (formulaire, launcher Retell) passent par tcaT(). */
const TCA_LANG = ((typeof document !== 'undefined' && document.documentElement.lang) || 'fr').slice(0, 2).toLowerCase();
const TCA_I18N = {
  fr: {
    formRequired: 'Veuillez remplir tous les champs obligatoires.',
    formConsent: 'Veuillez accepter la politique de confidentialité.',
    formEmail: 'Adresse email invalide.',
    formSending: 'Envoi en cours…',
    formSent: 'Message envoyé ! Nous vous répondrons sous 24h.',
    formError: 'Une erreur est survenue. Veuillez nous contacter directement par email.',
    tpAria: 'Assistant IA de discussion',
    tpTitle: 'Une question ? Assistant IA',
    tpNote: 'Ce chat automatisé vous oriente vers la bonne offre. Il est fourni par Retell AI (États-Unis) et peut déposer des traceurs nécessaires à son fonctionnement. Rien n’est chargé sans votre accord ; retrait possible à tout moment.',
    tpDetails: 'Détails',
    tpDetailsHref: 'politique-de-cookies.html',
    tpAccept: 'Ouvrir le chat',
    tpRefuse: 'Non merci',
    tpActivated: 'Assistant de discussion activé pour cette session.',
    tpRevoked: 'Consentement retiré. Le chat Retell ne sera plus chargé automatiquement. Rechargez la page pour le désactiver immédiatement.'
  },
  en: {
    formRequired: 'Please fill in all required fields.',
    formConsent: 'Please accept the privacy policy.',
    formEmail: 'Invalid email address.',
    formSending: 'Sending…',
    formSent: 'Message sent! We will get back to you within 24 hours.',
    formError: 'Something went wrong. Please contact us directly by email.',
    tpAria: 'AI chat assistant',
    tpTitle: 'A question? AI assistant',
    tpNote: 'This automated chat points you to the right offer. It is provided by Retell AI (United States) and may set trackers required for it to work. Nothing is loaded without your consent; you can withdraw it at any time.',
    tpDetails: 'Details',
    tpDetailsHref: '/en/cookie-policy.html',
    tpAccept: 'Open the chat',
    tpRefuse: 'No thanks',
    tpActivated: 'Chat assistant enabled for this session.',
    tpRevoked: 'Consent withdrawn. The Retell chat will no longer load automatically. Reload the page to disable it immediately.'
  },
  zh: {
    formRequired: '请填写所有必填字段。',
    formConsent: '请接受隐私政策。',
    formEmail: '电子邮件地址无效。',
    formSending: '发送中…',
    formSent: '消息已发送！我们将在 24 小时内回复您。',
    formError: '发生错误，请直接通过电子邮件联系我们。',
    tpAria: 'AI 聊天助手',
    tpTitle: '有问题？AI 助手',
    tpNote: '此自动聊天可为您推荐合适的方案。它由 Retell AI（美国）提供，可能会设置其运行所需的跟踪器。未经您同意不会加载任何内容；您可随时撤回同意。',
    tpDetails: '详情',
    tpDetailsHref: '/zh/cookie-policy.html',
    tpAccept: '打开聊天',
    tpRefuse: '不用了，谢谢',
    tpActivated: '本次会话已启用聊天助手。',
    tpRevoked: '已撤回同意。Retell 聊天将不再自动加载。请刷新页面以立即停用。'
  }
};
function tcaT(key) {
  const dict = TCA_I18N[TCA_LANG] || TCA_I18N.fr;
  return dict[key] !== undefined ? dict[key] : TCA_I18N.fr[key];
}

if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', () => {

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Particles Canvas ─────────────────────────────────── */
  if (!prefersReduced) {
    const canvas = document.querySelector('.particles-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let particles = [];
      const PARTICLE_COUNT = 45;
      const CONNECT_DIST = 120;

      function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      resize();
      window.addEventListener('resize', resize, { passive: true });

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -Math.random() * 0.4 - 0.1,
          r: Math.random() * 1.5 + 0.5,
          o: Math.random() * 0.4 + 0.1
        });
      }

      function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
          if (p.x < -10) p.x = canvas.width + 10;
          if (p.x > canvas.width + 10) p.x = -10;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(43,111,255,${p.o})`;
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dx = p.x - q.x, dy = p.y - q.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECT_DIST) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.strokeStyle = `rgba(43,111,255,${0.08 * (1 - dist / CONNECT_DIST)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
        requestAnimationFrame(drawParticles);
      }
      requestAnimationFrame(drawParticles);
    }
  }

  /* ── Nav scroll effect ─────────────────────────────────── */
  const nav = document.querySelector('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ───────────────────────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('menu-open');
      const open = nav.classList.contains('menu-open');
      toggle.setAttribute('aria-expanded', open);
      const spans = toggle.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('menu-open');
        toggle.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity = '';
        });
      });
    });
  }

  /* ── Scroll Reveal ─────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  }

  /* ── Mouse Spotlight on Cards ─────────────────────────── */
  if (!prefersReduced) {
    const spotlightCards = document.querySelectorAll(
      '.feature-card, .sector-card, .contact-info-item, .workflow-item, .value-card, .contact-form-wrap, .founder-card'
    );
    spotlightCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    });
  }

  /* ── Magnetic Button Effect ────────────────────────────── */
  if (!prefersReduced) {
    const magneticEls = document.querySelectorAll('.magnetic-btn, .btn, .nav-cta, .form-submit');
    magneticEls.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.15;
        const dy = (e.clientY - cy) * 0.15;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => { el.style.transition = ''; }, 400);
      });
    });
  }

  /* ── Parallax ──────────────────────────────────────────── */
  if (!prefersReduced) {
    const parallaxEls = document.querySelectorAll('.parallax');
    if (parallaxEls.length) {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        parallaxEls.forEach(el => {
          const speed = parseFloat(el.dataset.speed) || 0.1;
          el.style.transform = `translateY(${scrollY * speed}px)`;
        });
      }, { passive: true });
    }
  }

  /* ── Tilt Effect on Hero Visual ────────────────────────── */
  if (!prefersReduced) {
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
      heroVisual.style.transformStyle = 'preserve-3d';
      heroVisual.style.perspective = '1000px';
      document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const rotateY = ((e.clientX - cx) / rect.width) * 8;
        const rotateX = -((e.clientY - cy) / rect.height) * 8;
        heroVisual.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      document.querySelector('.hero')?.addEventListener('mouseleave', () => {
        heroVisual.style.transform = '';
        heroVisual.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => { heroVisual.style.transition = ''; }, 600);
      });
    }
  }

  /* ── Typed Text Effect ─────────────────────────────────── */
  if (!prefersReduced) {
    const typedEl = document.querySelector('.typed-text');
    if (typedEl) {
      const fullText = typedEl.dataset.text || typedEl.textContent;
      typedEl.textContent = '';
      const cursor = document.createElement('span');
      cursor.className = 'typed-cursor';
      cursor.textContent = '|';
      typedEl.appendChild(cursor);
      let i = 0;
      function typeChar() {
        if (i < fullText.length) {
          typedEl.insertBefore(document.createTextNode(fullText[i]), cursor);
          i++;
          setTimeout(typeChar, 60);
        } else {
          setTimeout(() => { cursor.style.display = 'none'; }, 2000);
        }
      }
      setTimeout(typeChar, 800);
    }
  }

  /* ── Animated Counters ─────────────────────────────────── */
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(c => counterObserver.observe(c));
  }

  function animateCounter(el) {
    const target = el.dataset.target;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const isFloat = target.includes('.');
    const end = parseFloat(target);
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress); // expo ease-out
      const value = eased * end;
      el.textContent = prefix + (isFloat ? value.toFixed(1) : Math.floor(value)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(step);
  }

  /* ── Active nav link ───────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Contact Form (Railway backend /lead) ──────────────── */
  const form = document.querySelector('#contact-form');
  if (form) {
    const WEBHOOK_URL = 'https://thecallagent-backend-production.up.railway.app/lead';

    /* Accessibilite des erreurs (WCAG 3.3.1) : marque les champs fautifs,
       les relie au message d'erreur (lu par les lecteurs d'ecran) et
       place le focus sur le premier, au lieu d'un simple tremblement visuel. */
    function flagInvalid(names) {
      const errorMsg = form.querySelector('.form-msg.error');
      if (errorMsg && !errorMsg.id) errorMsg.id = 'contact-form-error';
      const fields = names.filter(Boolean)
        .map(n => form.querySelector('[name="' + n + '"]'))
        .filter(Boolean);
      fields.forEach(el => {
        el.setAttribute('aria-invalid', 'true');
        if (errorMsg) el.setAttribute('aria-describedby', errorMsg.id);
      });
      if (fields[0]) fields[0].focus();
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const successMsg = form.querySelector('.form-msg.success');
      const errorMsg = form.querySelector('.form-msg.error');

      if (successMsg) successMsg.style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'none';
      form.querySelectorAll('[aria-invalid]').forEach(el => {
        el.removeAttribute('aria-invalid');
        el.removeAttribute('aria-describedby');
      });

      const name    = form.querySelector('[name="name"]').value.trim();
      const email   = form.querySelector('[name="email"]').value.trim();
      const company = form.querySelector('[name="company"]').value.trim();
      const phone   = form.querySelector('[name="phone"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();
      const consent = form.querySelector('[name="consent"]').checked;

      if (!name || !email || !message) {
        if (errorMsg) { errorMsg.textContent = tcaT('formRequired'); errorMsg.style.display = 'block'; }
        flagInvalid([!name && 'name', !email && 'email', !message && 'message']);
        shakeElement(btn);
        return;
      }
      if (!consent) {
        if (errorMsg) { errorMsg.textContent = tcaT('formConsent'); errorMsg.style.display = 'block'; }
        flagInvalid(['consent']);
        shakeElement(btn);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (errorMsg) { errorMsg.textContent = tcaT('formEmail'); errorMsg.style.display = 'block'; }
        flagInvalid(['email']);
        shakeElement(form.querySelector('[name="email"]'));
        return;
      }

      const btnLabel = btn.textContent;        // libellé traduit dans le HTML
      btn.textContent = tcaT('formSending');
      btn.disabled = true;

      try {
        const res = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, company, phone, message, consent })
        });
        let data = null;
        try { data = await res.json(); } catch (_) { /* non-JSON body */ }
        if (leadSucceeded(res, data)) {
          if (successMsg) { successMsg.textContent = tcaT('formSent'); successMsg.style.display = 'block'; }
          form.reset();
          btn.style.transform = 'scale(1.05)';
          setTimeout(() => { btn.style.transform = ''; }, 300);
        } else {
          throw new Error('Erreur serveur');
        }
      } catch (err) {
        if (errorMsg) { errorMsg.textContent = tcaT('formError'); errorMsg.style.display = 'block'; }
      } finally {
        btn.textContent = btnLabel;
        btn.disabled = false;
      }
    });
  }

  /* ── Shake Animation Helper ────────────────────────────── */
  function shakeElement(el) {
    if (!el) return;
    el.style.transition = 'transform 0.1s';
    el.style.transform = 'translateX(-4px)';
    setTimeout(() => { el.style.transform = 'translateX(4px)'; }, 100);
    setTimeout(() => { el.style.transform = 'translateX(-2px)'; }, 200);
    setTimeout(() => { el.style.transform = ''; el.style.transition = ''; }, 300);
  }

  /* ── Calendar Button Scroll ────────────────────────────── */
  const openCalBtn = document.querySelector('#open-calendar-btn');
  if (openCalBtn) {
    openCalBtn.addEventListener('click', () => {
      const bookingSection = document.querySelector('#booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* ── Shimmer on CTA (scroll-triggered) ─────────────────── */
  if (!prefersReduced) {
    const shimmerEls = document.querySelectorAll('.shimmer');
    if (shimmerEls.length) {
      const shimmerObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('shimmer-active');
            shimmerObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      shimmerEls.forEach(el => shimmerObs.observe(el));
    }
  }

  /* ── Scroll-driven Video (Apple-style) ────────────────── */
  const scrollVideoEl = document.querySelector('#scroll-video-el');
  const scrollSection = document.querySelector('#scroll-video');
  if (scrollVideoEl && scrollSection) {
    scrollVideoEl.pause();
    scrollVideoEl.muted = true;
    scrollVideoEl.playsInline = true;
    scrollVideoEl.preload = 'auto';

    let scrollProgress = 0;
    let seekRaf = 0;
    let lastSeekAt = 0;
    let lastFrameIndex = -1;
    let scrubStarted = false;
    let playbackFallback = false;   // scrub impossible -> lecture en boucle
    let seekedOnce = false;
    let pendingSeekSince = 0;
    let seekWatchdog = 0;
    const VIDEO_FPS = 30;
    const SEEK_INTERVAL_MS = 1000 / VIDEO_FPS;
    const SEEK_TIMEOUT_MS = 3000;

    function calcProgress() {
      const rect = scrollSection.getBoundingClientRect();
      const sectionHeight = Math.max(1, scrollSection.offsetHeight - window.innerHeight);
      const scrolled = Math.max(0, -rect.top);
      return Math.min(scrolled / sectionHeight, 1);
    }

    function getTargetTime(progress) {
      const duration = scrollVideoEl.duration || 0;
      if (!duration) return 0;
      const endGuard = duration > 0.08 ? duration - 0.04 : duration;
      return Math.max(0, Math.min(endGuard, endGuard * progress));
    }

    function seekToProgress(progress, force = false) {
      if (playbackFallback) return;
      const targetTime = getTargetTime(progress);
      if (!Number.isFinite(targetTime)) return;
      const frameIndex = Math.round(targetTime * VIDEO_FPS);
      if (!force && frameIndex === lastFrameIndex) return;
      lastFrameIndex = frameIndex;
      const frameTime = Math.min(getTargetTime(1), frameIndex / VIDEO_FPS);
      if (Math.abs(frameTime - scrollVideoEl.currentTime) > 0.012) {
        try {
          if (!pendingSeekSince) pendingSeekSince = performance.now();
          scrollVideoEl.currentTime = frameTime;
        } catch (_) {
          // Ignore transient seek errors while the browser finishes buffering metadata.
        }
      }
    }

    function scheduleSeek(force = false) {
      scrollProgress = calcProgress();
      if (seekRaf) return;
      seekRaf = requestAnimationFrame((now) => {
        seekRaf = 0;
        const elapsed = now - lastSeekAt;
        if (!force && elapsed < SEEK_INTERVAL_MS) {
          setTimeout(() => scheduleSeek(false), SEEK_INTERVAL_MS - elapsed);
          return;
        }
        lastSeekAt = now;
        seekToProgress(scrollProgress, force);
      });
    }

    function updateScrollProgress() {
      scheduleSeek(false);
    }

    /* Repli : si aucun seek n'aboutit alors que des données sont là
       (serveur sans HTTP Range, webview in-app, décodeur qui refuse le
       scrub), on lit la vidéo en boucle plutôt que de laisser une image
       figée ou noire. */
    function fallbackToPlayback() {
      if (playbackFallback) return;
      playbackFallback = true;
      if (seekWatchdog) { clearInterval(seekWatchdog); seekWatchdog = 0; }
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
      scrollVideoEl.loop = true;
      const attempt = scrollVideoEl.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
    }

    function startSeekWatchdog() {
      if (seekWatchdog || seekedOnce) return;
      seekWatchdog = setInterval(() => {
        if (seekedOnce) { clearInterval(seekWatchdog); seekWatchdog = 0; return; }
        if (scrollVideoEl.readyState < 2 || !pendingSeekSince) return;   // pas encore de données : on attend
        const r = scrollVideoEl.seekable;
        const noRange = r.length === 0 || r.end(r.length - 1) <= 0;
        if (noRange || performance.now() - pendingSeekSince > SEEK_TIMEOUT_MS) fallbackToPlayback();
      }, 500);
    }

    scrollVideoEl.addEventListener('seeked', () => { seekedOnce = true; pendingSeekSince = 0; });
    // Source illisible (codec, 404, réseau) : on masque le lecteur, le poster
    // en fond CSS de .scroll-video-sticky reste visible.
    scrollVideoEl.addEventListener('error', () => { scrollSection.classList.add('video-failed'); });

    function startScrub() {
      if (scrubStarted) return;
      scrubStarted = true;
      scrollVideoEl.pause();
      scrollVideoEl.loop = false;
      scrollProgress = calcProgress();
      seekToProgress(scrollProgress, true);
      window.addEventListener('scroll', updateScrollProgress, { passive: true });
      window.addEventListener('resize', updateScrollProgress, { passive: true });
      startSeekWatchdog();
    }

    function primeVideoThenScrub() {
      const start = () => {
        scrollVideoEl.pause();
        startScrub();
      };

      const playAttempt = scrollVideoEl.play();
      if (playAttempt && typeof playAttempt.then === 'function') {
        playAttempt.then(start).catch(start);
      } else {
        start();
      }
    }

    function initScrollVideo() {
      if (!scrollVideoEl.duration) return;
      if (prefersReduced) {
        seekToProgress(0);
        return;
      }
      primeVideoThenScrub();
    }

    if (scrollVideoEl.readyState >= 1) {
      initScrollVideo();
    } else {
      scrollVideoEl.addEventListener('loadedmetadata', initScrollVideo, { once: true });
    }

    // iOS Low Power Mode et certaines webviews bloquent l'autoplay : la vidéo
    // reste sur le poster (readyState 0) tant qu'un play() n'est pas déclenché
    // par un vrai geste. Sur WebKit, touchstart seul ne vaut pas activation :
    // on écoute aussi touchend / click / keydown, jusqu'au premier succès.
    const unlockEvents = ['touchend', 'touchstart', 'click', 'keydown'];
    function removeUnlock() { unlockEvents.forEach(ev => window.removeEventListener(ev, unlockOnGesture)); }
    function unlockOnGesture() {
      if (scrollVideoEl.readyState >= 2) { removeUnlock(); return; }
      const attempt = scrollVideoEl.play();
      if (attempt && typeof attempt.then === 'function') {
        attempt.then(() => {
          removeUnlock();
          if (playbackFallback) return;        // la lecture en boucle continue
          scrollVideoEl.pause();
          seekToProgress(calcProgress(), true);
        }).catch(() => {});
      }
    }
    unlockEvents.forEach(ev => window.addEventListener(ev, unlockOnGesture, { passive: true }));
  }

  /* ── Smooth reveal for hero on load ───────────────────── */
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);

  /* ── Solutions modals (Nos Solutions interactive) ────────
     Pattern : un panel + un backdrop uniques, on injecte le
     contenu cloné depuis #fiche-{slug} au clic. Accessible :
     role=dialog, aria-modal, focus trap, fermeture Esc / clic
     extérieur, focus restitué au déclencheur.
     ───────────────────────────────────────────────────────── */
  (function setupSolutionModals() {
    const triggers = document.querySelectorAll('[data-modal]');
    const backdrop = document.querySelector('[data-modal-backdrop]');
    const panel    = document.querySelector('[data-modal-panel]');
    const slot     = panel ? panel.querySelector('[data-modal-content]') : null;
    const closeBtn = panel ? panel.querySelector('[data-modal-close]') : null;

    if (!triggers.length || !backdrop || !panel || !slot || !closeBtn) return;

    let lastTrigger = null;
    const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function openModal(slug, triggerEl) {
      const source = document.getElementById('fiche-' + slug);
      if (!source) return;

      slot.innerHTML = '';
      slot.appendChild(source.cloneNode(true));

      const titleEl = slot.querySelector('.modal-title');
      if (titleEl) {
        if (!titleEl.id) titleEl.id = 'modalTitle-' + slug;
        panel.setAttribute('aria-labelledby', titleEl.id);
      }

      backdrop.hidden = false;
      panel.hidden = false;
      void panel.offsetWidth;
      backdrop.classList.add('is-open');
      panel.classList.add('is-open');
      document.body.classList.add('modal-open');
      lastTrigger = triggerEl || null;

      // Always start the fiche scrolled at the top, and focus the close
      // button (top of the dialog) so users see the title first instead
      // of the panel auto-scrolling to the only inner link (the CTA).
      panel.scrollTop = 0;
      setTimeout(() => closeBtn.focus({ preventScroll: true }), 50);
    }

    function closeModal() {
      backdrop.classList.remove('is-open');
      panel.classList.remove('is-open');
      document.body.classList.remove('modal-open');

      const onEnd = () => {
        if (!panel.classList.contains('is-open')) {
          backdrop.hidden = true;
          panel.hidden = true;
          slot.innerHTML = '';
        }
        panel.removeEventListener('transitionend', onEnd);
      };
      panel.addEventListener('transitionend', onEnd);

      if (lastTrigger && typeof lastTrigger.focus === 'function') {
        lastTrigger.focus();
      }
      lastTrigger = null;
    }

    triggers.forEach(t => {
      t.addEventListener('click', (e) => {
        e.preventDefault();
        const slug = t.getAttribute('data-modal');
        if (slug) openModal(slug, t);
      });

      /* Accessibilite clavier (WCAG 2.1.1) : ces declencheurs sont des
         <article role="button" tabindex="0">, pas des <button> natifs.
         Enter et Espace ne declenchent donc PAS 'click' tout seuls :
         il faut les cabler a la main, sinon la fiche est focusable
         mais impossible a ouvrir sans souris. */
      t.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
        e.preventDefault(); // Espace ferait defiler la page
        const slug = t.getAttribute('data-modal');
        if (slug) openModal(slug, t);
      });
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (panel.hidden) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }
      if (e.key === 'Tab') {
        const items = Array.from(panel.querySelectorAll(FOCUSABLE)).filter(el => !el.hasAttribute('hidden'));
        if (!items.length) return;
        const first = items[0];
        const last  = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  })();

});

/* Expose pure helpers for unit tests (no-op in the browser). */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { leadSucceeded };
}
/* ─────────────────────────────────────────────────────────
   Services tiers charges AU CLIC (CNIL, art. 82 loi I&L)
   Retell AI (chat ecrit d'orientation) et Google Calendar (iframe) peuvent
   deposer des traceurs : rien n'est charge tant que le visiteur
   n'a pas clique sur un bouton qui l'informe du service tiers.
   Le choix Retell est memorise pour la session (sessionStorage),
   retirable depuis politique-de-cookies.html ([data-tp-revoke]).
   ───────────────────────────────────────────────────────── */
(function thirdPartyOnClick() {
  if (typeof document === 'undefined') return;   // require() sans DOM (tests Node)
  const RETELL_KEY = 'tca-consent-retell';
  const RETELL_DISMISS_KEY = 'tca-consent-retell-refus';

  function remember(key, on) {
    try { on ? sessionStorage.setItem(key, '1') : sessionStorage.removeItem(key); } catch (_) { /* stockage bloque */ }
  }
  function remembered(key) {
    try { return sessionStorage.getItem(key) === '1'; } catch (_) { return false; }
  }

  // Retell : recree une vraie <script type="module"> a partir du stub inerte.
  function loadRetell(stub) {
    if (stub.dataset.loaded) return;
    stub.dataset.loaded = '1';
    const s = document.createElement('script');
    Array.from(stub.attributes).forEach(({ name, value }) => {
      if (['id', 'type', 'data-type', 'data-consent-src', 'data-loaded'].includes(name)) return;
      s.setAttribute(name, value);
    });
    stub.removeAttribute('id');            // le widget se lit par cet id
    s.id = 'retell-widget';
    s.type = stub.dataset.type || 'module';
    s.src = stub.dataset.consentSrc;
    document.head.appendChild(s);
  }

  function mountRetellLauncher(stub) {
    // Information CNIL affichee AVANT tout chargement : identite du tiers,
    // finalite, traceurs, consequence du refus, droit de retrait.
    // Accepter et refuser ont la meme taille et le meme poids.
    const wrap = document.createElement('div');
    wrap.className = 'tp-launcher';
    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-label', tcaT('tpAria'));
    wrap.innerHTML =
      '<p class="tp-launcher-ttl">' + tcaT('tpTitle') + '</p>' +
      '<p class="tp-launcher-note">' + tcaT('tpNote') + ' ' +
      '<a href="' + tcaT('tpDetailsHref') + '">' + tcaT('tpDetails') + '</a></p>' +
      '<div class="tp-launcher-actions">' +
      '<button type="button" class="tp-launcher-btn" data-tp="accept">' + tcaT('tpAccept') + '</button>' +
      '<button type="button" class="tp-launcher-btn tp-launcher-btn--alt" data-tp="refuse">' + tcaT('tpRefuse') + '</button>' +
      '</div>';
    wrap.querySelector('[data-tp="accept"]').addEventListener('click', () => {
      remember(RETELL_KEY, true);
      wrap.remove();
      loadRetell(stub);
    });
    wrap.querySelector('[data-tp="refuse"]').addEventListener('click', () => {
      remember(RETELL_DISMISS_KEY, true);   // memorise le refus pour la session
      wrap.remove();
    });
    document.body.appendChild(wrap);
  }

  function init() {
    const stub = document.getElementById('retell-widget');
    if (stub && stub.dataset.consentSrc) {
      if (remembered(RETELL_KEY)) loadRetell(stub);
      else if (!remembered(RETELL_DISMISS_KEY) || document.querySelector('[data-tp-activate]')) mountRetellLauncher(stub);
    }

    const iframe = document.getElementById('booking-iframe');
    const gate = document.getElementById('calendar-consent');
    const gateBtn = document.getElementById('calendar-consent-btn');
    if (iframe && gate && gateBtn && iframe.dataset.consentSrc) {
      gateBtn.addEventListener('click', () => {
        gate.remove();                        // revele le loader existant
        iframe.src = iframe.dataset.consentSrc;
        iframe.focus();
      });
    }

    // Activation explicite depuis la page politique de cookies.
    document.querySelectorAll('[data-tp-activate]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!stub) return;
        remember(RETELL_KEY, true);
        const l = document.querySelector('.tp-launcher');
        if (l) l.remove();
        loadRetell(stub);
        const out = document.querySelector('[data-tp-revoke-status]');
        if (out) out.textContent = tcaT('tpActivated');
      });
    });

    // Retrait du consentement (page politique de cookies).
    document.querySelectorAll('[data-tp-revoke]').forEach(btn => {
      btn.addEventListener('click', () => {
        remember(RETELL_KEY, false);
        remember(RETELL_DISMISS_KEY, false);
        const out = document.querySelector('[data-tp-revoke-status]');
        if (out) out.textContent = tcaT('tpRevoked');
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
