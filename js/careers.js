/* =============================================
   MINISTRY OF TRUTH — Careers Page JavaScript
   Canvas, counters, accordion, filters, modal
   ============================================= */

(function () {
  'use strict';

  /* ========== CANVAS ========== */
  const canvas = document.getElementById('crCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, particles;

    function resize() { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; }

    function initParticles() {
      particles = [];
      const count = Math.floor((w * h) / 20000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          r: Math.random() * 1.2 + 0.4,
          vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
          alpha: Math.random() * 0.35 + 0.08
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(255,255,255,0.025)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`; ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.05 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    resize(); initParticles(); draw();
    window.addEventListener('resize', () => { resize(); initParticles(); });
  }

  /* ========== COUNTER ANIMATION ========== */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString() + suffix;
    }
    requestAnimationFrame(update);
  }

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); } });
  }, { threshold: 0.3 });
  document.querySelectorAll('.cr-stat-num[data-count]').forEach(el => counterObs.observe(el));

  /* ========== JOB ACCORDION ========== */
  document.querySelectorAll('.cr-job-header').forEach(header => {
    header.addEventListener('click', () => {
      const job = header.closest('.cr-job');
      const wasOpen = job.classList.contains('open');
      document.querySelectorAll('.cr-job.open').forEach(j => {
        if (j !== job) j.classList.remove('open');
      });
      job.classList.toggle('open', !wasOpen);
    });
  });

  /* ========== DEPARTMENT FILTERS ========== */
  let activeDept = 'all';

  function applyFilter() {
    const jobs = document.querySelectorAll('.cr-job');
    jobs.forEach(job => {
      const match = activeDept === 'all' || job.dataset.dept === activeDept;
      job.classList.toggle('cr-hidden', !match);
      if (!match) job.classList.remove('open');
    });
  }

  document.querySelectorAll('.cr-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cr-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDept = btn.dataset.dept;
      applyFilter();
    });
  });

  /* ========== APPLICATION MODAL ========== */
  const modal = document.getElementById('crModal');
  const modalTitle = document.getElementById('crModalTitle');
  const form = document.getElementById('crApplyForm');
  const successEl = modal.querySelector('.cr-modal-success');

  function openModal(position) {
    modalTitle.textContent = position;
    form.style.display = '';
    form.reset();
    successEl.style.display = 'none';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.cr-apply-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(btn.dataset.position);
    });
  });

  modal.querySelector('.cr-modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.cr-form-submit');
    const origText = btn.textContent;
    btn.textContent = 'Processing...';
    btn.disabled = true;

    setTimeout(() => {
      const genId = successEl.querySelector('.cr-gen-id');
      genId.textContent = Math.floor(10000 + Math.random() * 90000);
      form.style.display = 'none';
      successEl.style.display = 'block';
      btn.textContent = origText;
      btn.disabled = false;
    }, 2000);
  });

})();
