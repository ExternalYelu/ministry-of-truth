/* ========================================
   CITIZEN LOGIN – JS
   ======================================== */
(function(){
  'use strict';

  /* ---------- Canvas ---------- */
  const cv=document.getElementById('lgCanvas');
  if(cv){
    const ctx=cv.getContext('2d');let w,h,pts=[];
    function resize(){w=cv.width=cv.offsetWidth;h=cv.height=cv.offsetHeight;}
    resize();window.addEventListener('resize',resize);
    class P{constructor(){this.reset();}reset(){this.x=Math.random()*w;this.y=Math.random()*h;this.vx=(Math.random()-.5)*.25;this.vy=(Math.random()-.5)*.25;this.r=Math.random()*1.5+.5;this.a=Math.random()*.25+.05;}update(){this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>w)this.vx*=-1;if(this.y<0||this.y>h)this.vy*=-1;}draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(139,26,26,${this.a})`;ctx.fill();}}
    for(let i=0;i<Math.min(60,Math.floor(w*h/12000));i++)pts.push(new P());
    (function loop(){ctx.clearRect(0,0,w,h);pts.forEach(p=>{p.update();p.draw();});
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=dx*dx+dy*dy;if(d<14000){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(139,26,26,${.06*(1-d/14000)})`;ctx.lineWidth=.5;ctx.stroke();}}
      requestAnimationFrame(loop);})();
  }

  /* ---------- Login → Profile ---------- */
  const form=document.getElementById('lgForm');
  const card=document.getElementById('lgCard');
  const profile=document.getElementById('lgProfile');
  const bb=document.getElementById('lgBB');

  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const cidInput=document.getElementById('lgCitizenId');
      const btn=form.querySelector('.lg-btn');
      const cid=cidInput.value.trim()||'7749-A-0012';

      btn.textContent='Authenticating...';
      btn.disabled=true;

      setTimeout(()=>{
        btn.textContent='Verifying Clearance...';
        setTimeout(()=>{
          btn.textContent='Synchronizing Profile...';
          setTimeout(()=>{
            // Hide card, show profile
            card.classList.add('hidden');
            buildProfile(cid);
            setTimeout(()=>{
              profile.classList.add('show');
              if(bb)bb.style.opacity='1';
            },100);
          },800);
        },700);
      },900);
    });
  }

  function buildProfile(cid){
    // Generate deterministic-looking data from citizen ID
    const hash=cid.split('').reduce((a,c)=>a+c.charCodeAt(0),0);
    const loyalty=82+hash%16; // 82-97
    const thought=94+hash%6;  // 94-99
    const sector=1+hash%8;
    const level=(hash%3)+2;   // 2-4
    const flags=hash%5===0?1:0;
    const initials=cid.replace(/[^A-Za-z]/g,'').substring(0,2).toUpperCase()||'CT';

    const now=new Date();
    function fmt(d){return d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'});}
    function fmtDate(d){return d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});}

    const statusClass=loyalty>=90?'lg-status-good':'lg-status-warn';
    const statusText=loyalty>=90?'COMPLIANT':'UNDER REVIEW';

    profile.innerHTML=`
      <div class="lg-profile-bar">
        <div class="lg-profile-dots"><span class="lg-d-red"></span><span class="lg-d-yellow"></span><span class="lg-d-green"></span></div>
        <span class="lg-profile-title">MiniTrue Citizen Portal v3.1.7</span>
        <span class="lg-profile-live"><span class="lg-pulse"></span>MONITORED</span>
      </div>
      <div class="lg-profile-body">
        <div class="lg-p-header">
          <div class="lg-avatar">${initials}</div>
          <div>
            <div class="lg-p-name">Citizen ${cid}</div>
            <div class="lg-p-id">Sector ${sector} · Clearance Level ${level} · Registered ${fmtDate(new Date(now-86400000*hash%1000))}</div>
          </div>
          <span class="lg-p-status ${statusClass}">${statusText}</span>
        </div>

        <div class="lg-p-grid">
          <div class="lg-p-metric">
            <div class="lg-p-value gold">${loyalty}%</div>
            <div class="lg-p-label">Loyalty Score</div>
          </div>
          <div class="lg-p-metric">
            <div class="lg-p-value green">${thought}.${hash%10}%</div>
            <div class="lg-p-label">Thought Compliance</div>
          </div>
          <div class="lg-p-metric">
            <div class="lg-p-value ${flags?'red':'green'}">${flags}</div>
            <div class="lg-p-label">Active Flags</div>
          </div>
          <div class="lg-p-metric">
            <div class="lg-p-value">${12+hash%30}</div>
            <div class="lg-p-label">Pages Accessed Today</div>
          </div>
          <div class="lg-p-metric">
            <div class="lg-p-value green">${2+hash%4}</div>
            <div class="lg-p-label">Alignment Sessions</div>
          </div>
          <div class="lg-p-metric">
            <div class="lg-p-value">Sector ${sector}</div>
            <div class="lg-p-label">Assigned Zone</div>
          </div>
        </div>

        <div class="lg-p-log-title">Recent Monitoring Activity</div>
        <div class="lg-p-log">
          <div class="lg-p-log-item"><span class="lg-p-log-time">${fmt(now)}</span> Citizen portal accessed — session initiated</div>
          <div class="lg-p-log-item"><span class="lg-p-log-time">${fmt(new Date(now-60000))}</span> Telescreen active — Sector ${sector} residential unit verified</div>
          <div class="lg-p-log-item"><span class="lg-p-log-time">${fmt(new Date(now-180000))}</span> Browsing activity logged — Ministry of Truth homepage visited</div>
          <div class="lg-p-log-item"><span class="lg-p-log-time">${fmt(new Date(now-420000))}</span> Communication scan complete — 0 anomalies detected</div>
          <div class="lg-p-log-item"><span class="lg-p-log-time">${fmt(new Date(now-900000))}</span> Loyalty assessment updated — score maintained at ${loyalty}%</div>
          <div class="lg-p-log-item"><span class="lg-p-log-time">${fmt(new Date(now-3600000))}</span> Cognitive alignment session #${2+hash%4} confirmed — next session pending</div>
          <div class="lg-p-log-item"><span class="lg-p-log-time">${fmt(new Date(now-7200000))}</span> Citizen report filed — discrepancy in Sector ${1+((sector+2)%8)} acknowledged</div>
        </div>

        <div class="lg-p-warning">
          <strong>Notice:</strong> All citizen activity within this portal is monitored and recorded in accordance with Directive 7.4.1. Unauthorized access or identity misrepresentation constitutes a Category 3 thoughtcrime. If you believe your profile contains an error, do not attempt correction — submit a formal inquiry through <a href="resources.html" style="color:#8B1A1A;">Citizen Resources</a>.
        </div>

        <button class="lg-logout" id="lgLogout">Terminate Session</button>
      </div>
    `;

    // Logout
    document.getElementById('lgLogout').addEventListener('click',()=>{
      profile.classList.remove('show');
      setTimeout(()=>{
        profile.innerHTML='';
        card.classList.remove('hidden');
        form.querySelector('.lg-btn').textContent='Authenticate';
        form.querySelector('.lg-btn').disabled=false;
        if(bb)bb.style.opacity='0';
      },500);
    });
  }

  /* ---------- Forgot Memory ---------- */
  const forgot=document.getElementById('lgForgot');
  if(forgot){
    forgot.addEventListener('click',function(e){
      e.preventDefault();
      this.textContent='Memory cannot be recovered.';
      this.style.color='rgba(139,26,26,.6)';
      setTimeout(()=>{
        this.textContent='Forgot Memory?';
        this.style.color='';
      },3000);
    });
  }

})();
