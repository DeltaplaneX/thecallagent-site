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

document.addEventListener('DOMContentLoaded', () => {

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

  /* ── Contact Form (n8n Webhook) ────────────────────────── */
  const form = document.querySelector('#contact-form');
  if (form) {
    const WEBHOOK_URL = 'https://odilonbuisson.app.n8n.cloud/webhook/adb6ee25-01bd-4c69-8797-da599dc89d91';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const successMsg = form.querySelector('.form-msg.success');
      const errorMsg = form.querySelector('.form-msg.error');

      if (successMsg) successMsg.style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'none';

      const name    = form.querySelector('[name="name"]').value.trim();
      const email   = form.querySelector('[name="email"]').value.trim();
      const company = form.querySelector('[name="company"]').value.trim();
      const phone   = form.querySelector('[name="phone"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();
      const consent = form.querySelector('[name="consent"]').checked;

      if (!name || !email || !message) {
        if (errorMsg) { errorMsg.textContent = 'Veuillez remplir tous les champs obligatoires.'; errorMsg.style.display = 'block'; }
        shakeElement(btn);
        return;
      }
      if (!consent) {
        if (errorMsg) { errorMsg.textContent = 'Veuillez accepter la politique de confidentialité.'; errorMsg.style.display = 'block'; }
        shakeElement(btn);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (errorMsg) { errorMsg.textContent = 'Adresse email invalide.'; errorMsg.style.display = 'block'; }
        shakeElement(form.querySelector('[name="email"]'));
        return;
      }

      btn.textContent = 'Envoi en cours…';
      btn.disabled = true;

      try {
        const res = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, company, phone, message, consent })
        });
        if (res.ok) {
          if (successMsg) { successMsg.textContent = 'Message envoyé ! Nous vous répondrons sous 24h.'; successMsg.style.display = 'block'; }
          form.reset();
          btn.style.transform = 'scale(1.05)';
          setTimeout(() => { btn.style.transform = ''; }, 300);
        } else {
          throw new Error('Erreur serveur');
        }
      } catch (err) {
        if (errorMsg) { errorMsg.textContent = 'Une erreur est survenue. Veuillez nous contacter directement par email.'; errorMsg.style.display = 'block'; }
      } finally {
        btn.textContent = 'Envoyer le message';
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

    let scrollProgress = 0;
    let displayProgress = 0;
    let rafRunning = false;

    function calcProgress() {
      const rect = scrollSection.getBoundingClientRect();
      const sectionHeight = scrollSection.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      return Math.min(scrolled / sectionHeight, 1);
    }

    function rafLoop() {
      // Lerp très fort (0.18) = quasi-instantané mais sans saccade de seek
      displayProgress += (scrollProgress - displayProgress) * 0.18;

      if (scrollVideoEl.duration) {
        const t = scrollVideoEl.duration * displayProgress;
        // N'écrire que si delta > 1 frame (évite les seeks redondants)
        if (Math.abs(t - scrollVideoEl.currentTime) > 0.016) {
          scrollVideoEl.currentTime = t;
        }
      }
      requestAnimationFrame(rafLoop);
    }

    window.addEventListener('scroll', () => {
      scrollProgress = calcProgress();
    }, { passive: true });

    function startVideo() {
      scrollProgress = calcProgress();
      displayProgress = scrollProgress;
      if (scrollVideoEl.duration) {
        scrollVideoEl.currentTime = scrollVideoEl.duration * scrollProgress;
      }
      if (!rafRunning) {
        rafRunning = true;
        requestAnimationFrame(rafLoop);
      }
    }

    if (scrollVideoEl.readyState >= 2) {
      startVideo();
    } else {
      scrollVideoEl.addEventListener('canplay', startVideo, { once: true });
    }
  }

  /* ── Smooth reveal for hero on load ───────────────────── */
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);

});
