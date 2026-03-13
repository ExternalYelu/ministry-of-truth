/* =============================================
   MINISTRY OF TRUTH — Newsroom Page JavaScript
   Canvas, counters, filters, article reader
   ============================================= */

(function () {
  'use strict';

  /* ========== ARTICLE DATABASE ========== */
  const articles = {
    'article-1': {
      classification: 'public',
      tag: 'Official',
      tagClass: 'nr-tag-official',
      date: 'March 8, 2026',
      ref: 'MOT-2026-0308-A',
      author: 'Department of Records',
      approvedBy: 'Minister of Truth',
      title: 'Ministry Announces Record-Setting Accuracy Improvements',
      body: `<p>The Ministry of Truth is pleased to announce that first-quarter correction targets for the year 2026 have been exceeded by a remarkable 14%, with a total of 14,207 archival records successfully realigned to current informational standards. This achievement represents the highest quarterly output in Ministry history and reflects the tireless dedication of our records specialists across all divisions.</p>

<p>Under the direction of the Department of Records, teams in all six sectors of Oceania have worked continuously to identify outdated, inconsistent, or prematurely published data within the national archive system. Each flagged entry underwent the Ministry's rigorous five-step correction protocol, ensuring that all publicly accessible information now reflects the most current and approved version of historical events.</p>

<div class="nr-article-quote">"When the past is corrected, the present becomes clearer. When the present is clear, the future is certain."<cite>— The Minister of Truth, Annual Address, 2026</cite></div>

<p>Of particular note is the work carried out by the Sub-Department of Statistical Enhancement, which identified 3,412 numerical inconsistencies across economic reports dating back to the previous fiscal cycle. These figures have been harmonized with current production data, ensuring citizens receive only the most optimistic and accurate picture of Oceania's economic trajectory.</p>

<div class="nr-article-divider">* * *</div>

<p>Citizens who encounter any remaining inconsistencies in public records, news archives, or personal memory are encouraged to report them through the Ministry's official channels. As always, the Ministry reminds all citizens: accuracy is not merely a standard — it is a moral obligation. The past exists only insofar as it aligns with the present, and the present is defined by those entrusted with its stewardship.</p>

<p>Additional statistical summaries will be distributed to sector administrators by end of quarter. Unauthorized reproduction or discussion of pre-correction data remains a Category B compliance violation.</p>`,
      distribution: 'All Sector Administrators, Department Heads, Public Information Terminals, Telescreen Broadcast Network, Approved Print Media'
    },

    'article-2': {
      classification: 'public',
      tag: 'Statistics',
      tagClass: 'nr-tag-statistics',
      date: 'January 22, 2026',
      ref: 'MOT-2026-0122-B',
      author: 'Department of Statistical Enhancement',
      approvedBy: 'Deputy Minister, Division of Numerical Integrity',
      title: 'Correction Initiative Exceeds Annual Targets',
      body: `<p>The Department of Statistical Enhancement is proud to report that the Annual Data Optimization Initiative has been completed ahead of schedule, with all numerical data across public databases fully harmonized for the new fiscal year. This process, which typically requires 90 days of concentrated effort, was accomplished in just 74 days — a testament to the dedication of our statistical correction teams.</p>

<p>The initiative encompassed the review and adjustment of 847,000 individual data points spanning production output reports, citizen satisfaction indices, resource allocation tables, and historical economic records. Each data point was evaluated against current approved benchmarks and, where necessary, refined to ensure full alignment with the Ministry's standards of informational consistency.</p>

<div class="nr-article-quote">"Numbers do not lie — provided they have been properly corrected."<cite>— Director of Statistical Enhancement, Internal Memo #4421</cite></div>

<p>Among the most significant corrections were updates to the chocolate ration records, which had contained legacy formatting errors suggesting a decrease where an increase had, in fact, always been the case. These errors have been fully resolved. Additionally, industrial production figures for Airstrip One have been recalibrated to accurately reflect the 23% increase in output that has always been consistent with our three-year plan projections.</p>

<div class="nr-article-divider">* * *</div>

<p>The Department wishes to remind all sector statisticians that unapproved data sets must be submitted for correction review before any public release. Citizens who believe they have encountered unoptimized numerical data are encouraged to file a discrepancy report through their local Ministry office. Remember: correct data builds a correct society. There are no exceptions to this principle.</p>`,
      distribution: 'Department of Statistical Enhancement (All Divisions), Sector Economists, Public Data Terminal Administrators, Ministry Archive System'
    },

    'article-3': {
      classification: 'public',
      tag: 'Sentiment',
      tagClass: 'nr-tag-official',
      date: 'November 14, 2025',
      ref: 'MOT-2025-1114-C',
      author: 'Department of Public Sentiment',
      approvedBy: 'Minister of Truth',
      title: 'Citizen Confidence Reaches Record High',
      body: `<p>Annual sentiment analysis conducted by the Department of Public Sentiment has confirmed that public trust in Ministry operations has reached an unprecedented 99.2% approval rating — the highest ever recorded since the Ministry began measuring citizen confidence in its founding year. This figure represents a 0.4% increase from the previous year's already exceptional 98.8% rating.</p>

<p>The survey, which was administered to a representative sample of 12 million citizens across all sectors of Oceania, utilized the Ministry's proprietary Sentiment Assessment Framework (SAF-7) — a comprehensive evaluation tool that measures trust, alignment, satisfaction, and informational confidence across 14 distinct categories. Participation in the survey is, as always, entirely voluntary and universally expected.</p>

<p>The Department notes with satisfaction that the category of "Trust in Official Narratives" scored a perfect 100% for the third consecutive year, while "Willingness to Report Inconsistencies" rose by 2.1 percentage points, indicating a healthy and engaged citizenry committed to the collective pursuit of truth.</p>

<div class="nr-article-quote">"The confidence of the people is not given — it is constructed, maintained, and perfected through the daily labor of alignment."<cite>— Department of Public Sentiment, Annual Report, 2025</cite></div>

<div class="nr-article-divider">* * *</div>

<p>The 0.8% of respondents whose answers did not align with standard confidence benchmarks have been referred to their local Cognitive Alignment Centers for complimentary guidance sessions. The Ministry extends its gratitude to all citizens who participated in the survey and reminds the public that confidence in institutions is not merely a feeling — it is a responsibility. Those who do not yet feel confident are encouraged to schedule a voluntary alignment session at their earliest convenience.</p>`,
      distribution: 'All Citizens (General Distribution), Telescreen Network, Community Notice Boards, Public Information Officers, Youth Loyalty Program Administrators'
    },

    'article-4': {
      classification: 'internal',
      tag: 'Technology',
      tagClass: 'nr-tag-technology',
      date: 'August 19, 2025',
      ref: 'MOT-2025-0819-T',
      author: 'Technology Division, Department of Records',
      approvedBy: 'Chief Technology Officer, Ministry of Truth',
      title: 'Predictive Monitoring System Goes Live',
      body: `<p>The Ministry of Truth is pleased to announce the successful deployment of the Predictive Narrative Alignment System (PNAS), a next-generation AI-driven monitoring infrastructure capable of identifying potential narrative inconsistencies an average of 4.7 hours before they reach public channels. This represents a 340% improvement over the previous reactive correction model.</p>

<p>Developed over 18 months by the Technology Division in collaboration with the Department of Records, PNAS utilizes advanced natural language processing, behavioral prediction algorithms, and real-time communications monitoring to detect emerging inconsistencies across all forms of public and private discourse. The system processes approximately 2.3 billion linguistic events per day across telescreen transcripts, written correspondence, digital communications, and in-person conversations captured through standard monitoring infrastructure.</p>

<div class="nr-article-quote">"The most effective correction is the one that occurs before the error is spoken."<cite>— Chief Technology Officer, PNAS Launch Address</cite></div>

<p>Early testing has yielded extraordinary results. During the three-month pilot phase, PNAS successfully pre-identified 12,847 potential narrative deviations, of which 99.97% were neutralized before reaching wider circulation. The remaining 0.03% were addressed within minutes through rapid-response correction teams deployed to the source locations.</p>

<div class="nr-article-divider">* * *</div>

<p>The system's deployment represents a significant advancement in the Ministry's capacity to maintain informational integrity in real time. Citizens should be reassured that PNAS operates entirely for their benefit, ensuring that harmful, confusing, or outdated ideas never have the opportunity to cause unnecessary distress. The Technology Division will continue to refine the system's accuracy, with a target of 6.0-hour pre-identification by end of fiscal year. All citizens are reminded that the monitoring infrastructure exists solely for the purpose of protection and should be regarded with gratitude, not apprehension.</p>`,
      distribution: 'Department Heads (All Divisions), Sector Security Coordinators, Technology Division Staff, Approved Media Liaisons'
    },

    'article-5': {
      classification: 'public',
      tag: 'Policy',
      tagClass: 'nr-tag-policy',
      date: 'May 3, 2025',
      ref: 'MOT-2025-0503-P',
      author: 'Office of International Informational Standards',
      approvedBy: 'Minister of Truth, in consultation with the Inner Party',
      title: 'Global Alignment Protocol Enters Phase III',
      body: `<p>The Ministry of Truth announces that the Global Alignment Protocol (GAP) — Oceania's comprehensive initiative to synchronize informational standards across all territories — has officially entered Phase III. As of this date, cross-territorial synchronization of approved narratives, historical records, and statistical benchmarks covers 97% of all Oceanian communications networks, up from 89% at the conclusion of Phase II.</p>

<p>Phase III focuses on the integration of the remaining 3% of communications infrastructure, primarily located in recently liberated territories and remote agricultural sectors. Mobile alignment units have been deployed to these areas, equipped with portable correction terminals and condensed versions of the Ministry's approved archive. It is anticipated that full 100% coverage will be achieved within the next two fiscal quarters.</p>

<p>The protocol also introduces enhanced cross-referencing capabilities between the Ministry of Truth and its counterpart agencies in allied territories, ensuring that informational standards remain consistent not only within Oceania but across the broader geopolitical landscape. As the nature of our alliances evolves, so too must the information that reflects them. The Protocol ensures these transitions occur seamlessly and without contradiction.</p>

<div class="nr-article-quote">"A world aligned in its understanding is a world at peace. Inconsistency between territories is no different from inconsistency within the mind — both must be corrected."<cite>— Office of International Informational Standards, Policy White Paper, 2025</cite></div>

<div class="nr-article-divider">* * *</div>

<p>Citizens in newly integrated territories are encouraged to visit their nearest Ministry Information Center to receive updated reference materials and schedule orientation sessions. The Ministry assures all citizens that the alignment process is designed to be as smooth and painless as possible. Those who experience difficulty adapting to updated informational standards should not hesitate to request cognitive support services, which are available at no cost and with complete confidentiality — as all Ministry services are.</p>`,
      distribution: 'All Sector Administrators, International Liaison Officers, Territory Integration Teams, Public Information Terminals'
    },

    'article-6': {
      classification: 'public',
      tag: 'Organization',
      tagClass: 'nr-tag-official',
      date: 'February 11, 2025',
      ref: 'MOT-2025-0211-O',
      author: 'Office of the Minister of Truth',
      approvedBy: 'The Inner Party, by unanimous resolution',
      title: 'New Sub-Department of Digital Narrative Established',
      body: `<p>The Ministry of Truth is pleased to announce the establishment of the Sub-Department of Digital Narrative (SDDN), a dedicated division tasked with monitoring, correcting, and aligning all digital communications across Oceania's expanding electronic infrastructure. The sub-department will operate with an initial staff of 3,400 specialists, making it the largest single expansion of Ministry personnel in the past five years.</p>

<p>The creation of SDDN responds to the growing volume of digital communications that now account for approximately 64% of all citizen-to-citizen information exchange. While the Ministry's existing monitoring infrastructure has performed admirably, the pace and volume of digital discourse requires a specialized approach — one that can address inconsistencies in real time across messaging platforms, digital notice boards, and personal computing devices.</p>

<p>SDDN personnel will be drawn from the Ministry's most accomplished correction specialists, supplemented by new recruits from the Youth Loyalty Program's Technology Track. Training will encompass advanced narrative analysis, digital forensics, behavioral pattern recognition, and the principles of Newspeak as applied to electronic communication.</p>

<div class="nr-article-quote">"Every keystroke is a thought made visible. Every thought must be correct."<cite>— Founding Charter of the Sub-Department of Digital Narrative</cite></div>

<div class="nr-article-divider">* * *</div>

<p>The Ministry wishes to assure all citizens that the establishment of SDDN is not a response to any increase in digital thoughtcrime — rates of which continue to decline thanks to the effectiveness of existing programs. Rather, it represents the Ministry's commitment to proactive excellence: ensuring that the digital sphere remains as orderly, consistent, and truthful as every other dimension of public life in Oceania. Citizens are encouraged to continue their digital communications without concern. SDDN exists to ensure that such communications remain safe, correct, and free from the burden of unsanctioned ideas.</p>`,
      distribution: 'All Ministry Departments, Sector Personnel Directors, Youth Loyalty Program Administration, Public Information Terminals, Digital Infrastructure Coordinators'
    },

    'article-7': {
      classification: 'public',
      tag: 'Archive',
      tagClass: 'nr-tag-official',
      date: 'October 15, 2024',
      ref: 'MOT-2024-1015-A',
      author: 'Department of Historical Integrity',
      approvedBy: 'Deputy Minister, Archives Division',
      title: 'Complete Digitization of Pre-Revolution Records',
      body: `<p>The Department of Historical Integrity is proud to announce the completion of a landmark initiative: the full digitization of all pre-Revolution archival materials held within the Ministry's custody. This multi-year project has resulted in the conversion, correction, and secure storage of over 47 million individual documents, photographs, and recorded materials dating from the period before the establishment of Oceania.</p>

<p>The digitization process involved far more than simple conversion. Each document was subjected to the Ministry's comprehensive Historical Accuracy Review, ensuring that all content now reflects the approved and current understanding of pre-Revolution events. Where original documents contained errors, mischaracterizations, or information no longer consistent with established historical fact, corrections were applied with the Ministry's customary precision and care.</p>

<p>Notably, the project has resolved several longstanding inconsistencies in the pre-Revolution record. Economic data from the capitalist period has been updated to more accurately reflect the conditions that necessitated the Revolution. Biographical records of key historical figures have been refined to align with their current designated status. Cultural artifacts that could cause confusion or nostalgic attachment to obsolete social structures have been annotated with appropriate contextual guidance.</p>

<div class="nr-article-quote">"The past is not a fixed landscape. It is a garden that requires constant tending — and the gardener must not hesitate to remove what no longer serves the whole."<cite>— Director, Department of Historical Integrity</cite></div>

<div class="nr-article-divider">* * *</div>

<p>Physical originals of all digitized documents have been transferred to high-security archival facilities, where they will be preserved in climate-controlled conditions accessible only to authorized Ministry personnel with Level 4 clearance or above. Citizens wishing to access pre-Revolution historical materials may submit a Historical Inquiry through the Citizen Resources portal. Please allow 6-8 weeks for processing, as all requests are reviewed for alignment compliance before fulfillment.</p>`,
      distribution: 'All Ministry Archives, Department of Historical Integrity Staff, Sector Libraries, Educational Institutions, Public Information Terminals'
    },

    'article-8': {
      classification: 'public',
      tag: 'Community',
      tagClass: 'nr-tag-official',
      date: 'April 2, 2024',
      ref: 'MOT-2024-0402-Y',
      author: 'Youth Programs Division',
      approvedBy: 'Minister of Truth',
      title: 'Youth Loyalty Program Enrollment Surpasses 2 Million',
      body: `<p>The Ministry of Truth celebrates a significant milestone: enrollment in the Junior Truth Ambassadors program — the Ministry's flagship youth initiative — has surpassed 2 million active participants across all sectors of Oceania. This achievement reflects the growing enthusiasm of Oceania's young citizens for the principles of informational integrity, civic loyalty, and collective alignment.</p>

<p>The Junior Truth Ambassadors program, established eight years ago, provides young citizens aged 8 to 17 with structured education in the foundations of truth maintenance, basic Newspeak proficiency, and the identification and reporting of informational inconsistencies. Participants progress through three tiers — Observer, Scout, and Cadet — each offering increasingly advanced training in the principles and practices that sustain our society.</p>

<p>Of particular pride is the program's peer reporting initiative, through which young Ambassadors have submitted over 340,000 inconsistency reports in the past year alone. These reports have led to the identification and correction of 12,400 instances of outdated or unsanctioned information circulating within households, educational institutions, and community gathering spaces.</p>

<div class="nr-article-quote">"The youth of Oceania do not merely inherit the truth — they actively defend it. Their vigilance is the foundation upon which our collective future is built."<cite>— Minister of Truth, Youth Loyalty Celebration Address, 2024</cite></div>

<div class="nr-article-divider">* * *</div>

<p>Parents and guardians are encouraged to enroll eligible young citizens through the Citizen Resources portal or at their local Ministry Youth Center. Participation is voluntary and universally recommended. The Ministry extends its gratitude to the educators, program coordinators, and family members who have supported this initiative, and reminds all citizens that investment in youth alignment is investment in the permanence of truth itself.</p>`,
      distribution: 'All Educational Institutions, Youth Program Coordinators, Family and Community Services, Sector Administrators, Public Information Terminals'
    },

    'article-9': {
      classification: 'internal',
      tag: 'Security',
      tagClass: 'nr-tag-security',
      date: 'September 28, 2023',
      ref: 'MOT-2023-0928-S',
      author: 'Archival Security Division',
      approvedBy: 'Deputy Minister, Security Operations',
      title: 'Enhanced Security Protocols for Archival Systems',
      body: `<p>The Archival Security Division announces the implementation of enhanced security protocols across all Ministry archival systems, effective immediately. These measures are designed to ensure that obsolete, corrected, or reclassified data remains permanently inaccessible to unauthorized personnel, thereby protecting citizens from the potential confusion and distress caused by exposure to outdated information.</p>

<p>The new protocols include three primary enhancements. First, all archival access points now require dual-factor verification, combining biometric identification with real-time clearance validation. Second, a new automated data lifecycle management system ensures that corrected records are permanently overwritten at the binary level, eliminating any possibility of recovery through unauthorized technical means. Third, access logging has been expanded to capture not only who accesses archival data, but the duration, nature, and emotional response indicators of each access session.</p>

<p>These measures follow a comprehensive security audit that identified 14 potential vulnerability points in the previous archival infrastructure. While no actual security breaches occurred — the Ministry's record of zero unauthorized data retrievals remains intact — the principle of preventive excellence demands that even theoretical vulnerabilities be addressed with the fullest possible response.</p>

<div class="nr-article-quote">"Information that has been corrected ceases to exist. To seek it is to seek nothing. To find it would be to find an error — and errors, by definition, are not truth."<cite>— Archival Security Division, Protocol Implementation Guide, Section 1.1</cite></div>

<div class="nr-article-divider">* * *</div>

<p>All Ministry personnel with archival access are required to complete the updated Security Awareness Module (SAM-3) within 30 days. Personnel who fail to complete the module within this timeframe will have their access privileges suspended pending review. Citizens are reminded that any attempt to access, reconstruct, or discuss corrected information constitutes a violation of the Information Integrity Act and will be addressed accordingly. These measures exist not as restrictions, but as protections — safeguarding the clarity that every citizen of Oceania deserves.</p>`,
      distribution: 'All Ministry Personnel (Mandatory), Sector Security Officers, Archival Staff, Technology Division, Compliance Review Board'
    }
  };

  /* ========== CANVAS ========== */
  const canvas = document.getElementById('nrCanvas');
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
  document.querySelectorAll('.nr-stat-num[data-count]').forEach(el => counterObs.observe(el));

  /* ========== YEAR & CATEGORY FILTERS ========== */
  let activeYear = 'all';
  let activeCat = 'all';

  function applyFilters() {
    const cards = document.querySelectorAll('.nr-card');
    let visible = 0;
    cards.forEach(card => {
      const yearMatch = activeYear === 'all' || card.dataset.year === activeYear;
      const catMatch = activeCat === 'all' || card.dataset.cat === activeCat;
      if (yearMatch && catMatch) {
        card.classList.remove('nr-hidden'); visible++;
      } else {
        card.classList.add('nr-hidden');
      }
    });
    document.querySelector('.nr-no-results').style.display = visible === 0 ? 'block' : 'none';
  }

  // Year filters
  document.querySelectorAll('.nr-filter[data-year]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nr-filter[data-year]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeYear = btn.dataset.year;
      applyFilters();
    });
  });

  // Category filters
  document.querySelectorAll('.nr-cat-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nr-cat-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      applyFilters();
    });
  });

  /* ========== ARTICLE READER ========== */
  const overlay = document.getElementById('articleOverlay');
  const contentEl = document.getElementById('articleContent');

  function openArticle(id) {
    const a = articles[id];
    if (!a) return;

    const classLabel = a.classification === 'public' ? 'Public Distribution' : 'Internal — Authorized Personnel Only';
    const classClass = a.classification === 'public' ? 'nr-class-public' : 'nr-class-internal';

    contentEl.innerHTML = `
      <div class="nr-article-header">
        <div class="nr-article-letterhead">
          <svg viewBox="0 0 24 24" fill="none" stroke="#8B1A1A" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          <div class="nr-article-letterhead-text">
            <strong>Ministry of Truth</strong>
            Official Communications Bureau — Oceania
          </div>
        </div>
        <span class="nr-article-classification ${classClass}">${classLabel}</span>
        <h1>${a.title}</h1>
        <div class="nr-article-meta">
          <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> ${a.date}</span>
          <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> ${a.author}</span>
          <span style="font-family:monospace;font-size:0.72rem;color:#bbb;">${a.ref}</span>
        </div>
      </div>
      <div class="nr-article-body">
        ${a.body}
      </div>
      <div class="nr-article-footer">
        <div class="nr-article-dist">Distribution</div>
        <div class="nr-article-dist-list">${a.distribution}</div>
        <div class="nr-article-stamp">
          <div class="nr-article-stamp-seal">APPROVED<br>MOT</div>
          <div class="nr-article-stamp-text">
            Approved by: ${a.approvedBy}<br>
            Classification: ${classLabel}<br>
            Unauthorized reproduction prohibited
          </div>
        </div>
      </div>
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeArticle() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Bind all read buttons
  document.querySelectorAll('.btn-read-article').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openArticle(btn.dataset.article);
    });
  });

  // Close button
  document.querySelector('.nr-article-close').addEventListener('click', closeArticle);

  // Click overlay background
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeArticle();
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeArticle();
  });

  /* ========== SUBSCRIBE FORM ========== */
  const subBtn = document.querySelector('.nr-sub-btn');
  const subInput = document.querySelector('.nr-sub-input');
  if (subBtn) {
    subBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!subInput.value.trim()) {
        subInput.style.borderColor = '#8B1A1A';
        subInput.setAttribute('placeholder', 'Citizen ID is required for subscription');
        return;
      }
      const orig = subBtn.textContent;
      subBtn.textContent = 'Processing...';
      subBtn.disabled = true;
      setTimeout(() => {
        subBtn.textContent = 'Subscription Recorded';
        subInput.value = '';
        subInput.disabled = true;
        setTimeout(() => {
          subBtn.textContent = 'Your compliance has been noted.';
          subBtn.style.background = '#333';
        }, 2000);
      }, 1500);
    });
  }

})();
