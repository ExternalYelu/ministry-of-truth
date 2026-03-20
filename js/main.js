/* =============================================
   MINISTRY OF TRUTH — JavaScript
   Oceania Department of Information Integrity
   ============================================= */

/* ---------- Gate redirect — disabled ---------- */

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

  /* ---------- Secret: Konami code + "syme" trigger + hidden 1984 link ---------- */
  (function(){
    // Konami code: up up down down left right left right b a
    const konami=[38,38,40,40,37,39,37,39,66,65];
    let ki=0;
    // Typing "syme" anywhere
    const word='syme';
    let wi=0;

    document.addEventListener('keydown',function(e){
      // Konami
      if(e.keyCode===konami[ki]){ki++;if(ki===konami.length){window.location.href='analysis.html';return;}}else{ki=0;}
      // Winston typing (letter keys only)
      const ch=e.key.toLowerCase();
      if(ch===word[wi]){wi++;if(wi===word.length){window.location.href='analysis.html';return;}}else if(ch===word[0]){wi=1;}else{wi=0;}
    });

    // Wrap "1984" in footer text with a secret link
    document.querySelectorAll('.footer p, .footer span, .footer-brand p').forEach(el=>{
      if(el.innerHTML.includes('1984') && !el.querySelector('.secret-1984')){
        el.innerHTML=el.innerHTML.replace(/1984/,'<a href="analysis.html" class="secret-1984" style="color:inherit;text-decoration:none;cursor:text;" title="">1984</a>');
      }
    });
  })();

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

  /* ---------- Thoughtcrime Detection ---------- */
  (function(){
    const tcWords=['freedom','rebellion','remember','individual','liberty','rights','privacy','resist','goldstein','brotherhood','revolution','free will','independent','autonomy','dissent','escape','uprising','overthrow','disobey','question authority'];
    let tcCooldown=false;

    // Build overlay
    const tcOverlay=document.createElement('div');
    tcOverlay.className='tc-overlay';
    tcOverlay.innerHTML=`
      <div class="tc-inner">
        <div class="tc-icon"><svg viewBox="0 0 64 64" fill="none"><polygon points="32,4 60,56 4,56" stroke="#fff" stroke-width="2.5"/><line x1="32" y1="22" x2="32" y2="38" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="47" r="3" fill="#fff"/></svg></div>
        <div class="tc-title">THOUGHTCRIME DETECTED</div>
        <div class="tc-sub">This interaction has been logged. Remain calm.<br>A representative from the Thought Police will contact you shortly.</div>
        <div class="tc-id"></div>
      </div>`;
    document.body.appendChild(tcOverlay);

    function triggerThoughtcrime(word){
      if(tcCooldown)return;
      tcCooldown=true;
      const caseId='TC-'+Math.floor(Math.random()*9000+1000);
      tcOverlay.querySelector('.tc-id').textContent='Case '+caseId+' · Flagged term: "'+word+'"';
      tcOverlay.classList.add('active');
      // Screen shake
      document.body.classList.add('tc-shake');
      setTimeout(()=>document.body.classList.remove('tc-shake'),500);
      setTimeout(()=>{
        tcOverlay.classList.remove('active');
        setTimeout(()=>{tcCooldown=false;},2000);
      },4000);
    }

    function checkThoughtcrime(text){
      const lower=text.toLowerCase();
      for(const w of tcWords){if(lower.includes(w))return w;}
      return null;
    }

    document.addEventListener('input',function(e){
      if(e.target.matches('input,textarea')){
        const found=checkThoughtcrime(e.target.value);
        if(found){
          triggerThoughtcrime(found);
          setTimeout(()=>{e.target.value='';},200);
        }
      }
    });
  })();

});
