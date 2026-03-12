/* =============================================
   MINISTRY OF TRUTH — JavaScript
   Oceania Department of Information Integrity
   ============================================= */

/* ---------- Gate redirect (skip on gate.html itself) ---------- */
if (!window.location.pathname.endsWith('gate.html') &&
    localStorage.getItem('minitrue_clearance') !== 'granted') {
  window.location.replace('gate.html');
}

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navbar scroll effect ---------- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  /* ---------- Hero slogan rotation ---------- */
  const sloganEl = document.querySelector('.hero-slogan');
  if (sloganEl) {
    const slogans = [
      'Truth Is What We Say It Is.',
      'Consistency Is Clarity.',
      'Your Memory Has Been Updated.',
      'The Past Is Whatever We Need It to Be.',
      'Ignorance Is Strength.'
    ];
    let idx = 0;
    setInterval(() => {
      sloganEl.style.opacity = '0';
      setTimeout(() => {
        idx = (idx + 1) % slogans.length;
        sloganEl.textContent = slogans[idx];
        sloganEl.style.opacity = '1';
      }, 500);
    }, 5000);
  }

  /* ---------- Fade-in on scroll ---------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    fadeEls.forEach(el => observer.observe(el));
  }

  /* ---------- FCQ / Job accordions ---------- */
  document.querySelectorAll('.fcq-question, .job-header').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parent = trigger.closest('.fcq-item, .job-item');
      const isOpen = parent.classList.contains('open');
      // Close siblings
      parent.parentElement.querySelectorAll('.fcq-item.open, .job-item.open').forEach(el => {
        el.classList.remove('open');
      });
      if (!isOpen) parent.classList.add('open');
    });
  });

  /* ---------- News filter buttons ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const year = btn.dataset.year;
        document.querySelectorAll('.news-card').forEach(card => {
          if (year === 'all' || card.dataset.year === year) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------- Sync notification popup ---------- */
  const popup = document.querySelector('.sync-popup');
  if (popup) {
    setTimeout(() => {
      popup.classList.add('show');
    }, 4000);

    const closeBtn = popup.querySelector('.sync-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        popup.classList.remove('show');
      });
    }

    // Auto-hide after 8 seconds
    setTimeout(() => {
      popup.classList.remove('show');
    }, 12000);
  }

  /* ---------- Login form (prevent submit, show message) ---------- */
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = loginForm.querySelector('.btn-primary');
      btn.textContent = 'Synchronizing...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Session Aligned';
        setTimeout(() => {
          btn.textContent = 'Access Secured';
          btn.disabled = false;
        }, 2000);
      }, 1500);
    });
  }

  /* ---------- Scroll-triggered slogan change (page header) ---------- */
  const scrollSlogans = document.querySelectorAll('[data-scroll-slogan]');
  if (scrollSlogans.length) {
    const phrases = [
      'Truth requires maintenance.',
      'Alignment is progress.',
      'The record is always correct.'
    ];
    let lastPhrase = 0;
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const newIdx = Math.min(Math.floor(pct * phrases.length), phrases.length - 1);
      if (newIdx !== lastPhrase) {
        lastPhrase = newIdx;
        scrollSlogans.forEach(el => {
          el.style.opacity = '0';
          setTimeout(() => {
            el.textContent = phrases[newIdx];
            el.style.opacity = '1';
          }, 300);
        });
      }
    });
  }

  /* ---------- Counter animation for dashboard ---------- */
  document.querySelectorAll('.dash-metric .value[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current.toLocaleString() + suffix;
    }, 30);
  });

});
