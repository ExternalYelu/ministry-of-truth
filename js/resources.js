/* =============================================
   MINISTRY OF TRUTH — Resources Page JavaScript
   Canvas, counters, modals, form handling
   ============================================= */

(function () {
  'use strict';

  /* ---------- Canvas background ---------- */
  const canvas = document.getElementById('resCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, particles;

    function resize() { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; }

    function initParticles() {
      particles = [];
      const count = Math.floor((w * h) / 22000);
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
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
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

  /* ---------- Counter animation ---------- */
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
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounter(entry.target); counterObs.unobserve(entry.target); }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.res-stat-num[data-count]').forEach(el => counterObs.observe(el));

  /* ---------- Modal system ---------- */
  function openModal(id) {
    const modal = document.getElementById('modal-' + id);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Reset form state
    const form = modal.querySelector('.res-form');
    const success = modal.querySelector('.res-form-success');
    if (form) { form.style.display = ''; form.reset(); }
    if (success) success.style.display = 'none';
  }

  function closeModal(modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Card click → open modal
  document.querySelectorAll('.res-card[data-modal]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn')) return; // let button handle it
      openModal(card.dataset.modal);
    });
  });

  // Button click → open modal
  document.querySelectorAll('.res-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.res-card');
      if (card) openModal(card.dataset.modal);
    });
  });

  // Close button
  document.querySelectorAll('.res-modal-close').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('.res-modal')));
  });

  // Overlay click
  document.querySelectorAll('.res-modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', () => closeModal(overlay.closest('.res-modal')));
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.res-modal.open').forEach(m => closeModal(m));
    }
  });

  /* ---------- Form submissions ---------- */
  document.querySelectorAll('.res-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const originalText = btn.textContent;
      btn.textContent = 'Processing...';
      btn.disabled = true;

      // Simulate processing
      setTimeout(() => {
        const modal = form.closest('.res-modal-box');
        const success = modal.querySelector('.res-form-success');
        const genId = modal.querySelector('.gen-id');

        // Generate fake case ID
        if (genId) {
          genId.textContent = Math.floor(10000 + Math.random() * 90000);
        }

        form.style.display = 'none';
        success.style.display = 'block';
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1800);
    });
  });

  /* ---------- Download buttons (fake download) ---------- */
  document.querySelectorAll('.dl-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const original = btn.textContent;
      btn.textContent = 'Preparing...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Access Denied';
        setTimeout(() => {
          btn.textContent = 'Clearance Required';
          setTimeout(() => {
            btn.textContent = original;
            btn.disabled = false;
          }, 2000);
        }, 1500);
      }, 1200);
    });
  });

})();
