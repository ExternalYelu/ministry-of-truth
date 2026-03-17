/* =============================================
   MINISTRY OF TRUTH — FCQ Page JavaScript
   Canvas, counters, accordion, search, filters
   ============================================= */

/* One-time cleanup of stale admin edits after structure change */
(function(){
  var flag = 'minitrue_fcq_v2';
  if (localStorage.getItem(flag)) return;
  try {
    var s = JSON.parse(localStorage.getItem('minitrue_edits'));
    if (s && s['fcq.html']) { delete s['fcq.html']; localStorage.setItem('minitrue_edits', JSON.stringify(s)); }
  } catch(e){}
  localStorage.setItem(flag, '1');
  location.reload();
})();

(function () {
  'use strict';

  /* ========== CANVAS ========== */
  const canvas = document.getElementById('fqCanvas');
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
  document.querySelectorAll('.fq-stat-num[data-count]').forEach(el => counterObs.observe(el));

  /* ========== ACCORDION ========== */
  document.querySelectorAll('.fq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.fq-item');
      const wasOpen = item.classList.contains('open');

      // Close all others
      document.querySelectorAll('.fq-item.open').forEach(i => {
        if (i !== item) i.classList.remove('open');
      });

      item.classList.toggle('open', !wasOpen);
    });

    // Keyboard support
    q.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); q.click(); }
    });
  });

  /* ========== CATEGORY FILTERS ========== */
  let activeCat = 'all';

  function applyFilter() {
    const searchTerm = (document.getElementById('fqSearch').value || '').toLowerCase().trim();
    const items = document.querySelectorAll('.fq-item');
    let visible = 0;

    items.forEach(item => {
      const catMatch = activeCat === 'all' || item.dataset.cat === activeCat;
      const text = item.textContent.toLowerCase();
      const searchMatch = !searchTerm || text.includes(searchTerm);

      if (catMatch && searchMatch) {
        item.classList.remove('fq-hidden');
        visible++;
      } else {
        item.classList.add('fq-hidden');
        item.classList.remove('open');
      }
    });

    document.querySelector('.fq-no-results').style.display = visible === 0 ? 'block' : 'none';
  }

  document.querySelectorAll('.fq-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.fq-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      applyFilter();
    });
  });

  /* ========== SEARCH ========== */
  const searchInput = document.getElementById('fqSearch');
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(applyFilter, 200);
  });

  /* ========== HELPFUL BUTTONS ========== */
  document.querySelectorAll('.fq-helpful').forEach(wrap => {
    const yesBtn = wrap.querySelector('.fq-helpful-yes');
    const noBtn = wrap.querySelector('.fq-helpful-no');

    yesBtn.addEventListener('click', () => {
      wrap.innerHTML = '<span class="fq-helpful-done">Thank you. Your feedback has been recorded.</span>';
    });

    noBtn.addEventListener('click', () => {
      wrap.innerHTML = '<span class="fq-helpful-done" style="color:#8B1A1A;">Your dissatisfaction has been noted and forwarded to the Guidance Directorate.</span>';
    });
  });

  /* ========== FAKE VIEWER COUNT ========== */
  const viewerEl = document.getElementById('viewerCount');
  if (viewerEl) {
    setInterval(() => {
      const current = parseInt(viewerEl.textContent);
      const delta = Math.floor(Math.random() * 7) - 3;
      const next = Math.max(820, Math.min(890, current + delta));
      viewerEl.textContent = next;
    }, 4000);
  }

  /* ========== SUBMIT FORM ========== */
  const submitForm = document.getElementById('fqSubmitForm');
  if (submitForm) {
    submitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = submitForm.querySelector('.fq-submit-btn');
      const origText = btn.textContent;
      btn.textContent = 'Processing...';
      btn.disabled = true;

      setTimeout(() => {
        const success = submitForm.parentElement.querySelector('.fq-submit-success');
        const genId = success.querySelector('.fq-gen-id');
        genId.textContent = Math.floor(10000 + Math.random() * 90000);
        submitForm.style.display = 'none';
        success.style.display = 'flex';
        btn.textContent = origText;
        btn.disabled = false;
      }, 2000);
    });
  }

})();
