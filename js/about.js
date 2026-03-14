/* =============================================
   MINISTRY OF TRUTH — About Us JavaScript
   Canvas animation + counter/bar animations
   ============================================= */

/* Clear stale admin edits for about page (structure changed v2) */
(function(){
  try {
    var s = JSON.parse(localStorage.getItem('minitrue_edits'));
    if (s && s['about.html']) { delete s['about.html']; localStorage.setItem('minitrue_edits', JSON.stringify(s)); location.reload(); }
  } catch(e){}
})();

(function () {
  'use strict';

  /* ---------- Canvas background (subtle grid + floating particles) ---------- */
  const canvas = document.getElementById('aboutCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, particles;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }

    function initParticles() {
      particles = [];
      const count = Math.floor((w * h) / 22000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.2 + 0.4,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          alpha: Math.random() * 0.35 + 0.08
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 80) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 80) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Particles + connections
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
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
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();
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

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.about-stat-num[data-count], .impact-num[data-count]').forEach(el => {
    counterObserver.observe(el);
  });

  /* ---------- Impact bar fill animation ---------- */
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.dataset.width;
        fill.style.setProperty('--target-width', width + '%');
        requestAnimationFrame(() => fill.classList.add('animated'));
        barObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.impact-fill[data-width]').forEach(el => {
    barObserver.observe(el);
  });

})();
