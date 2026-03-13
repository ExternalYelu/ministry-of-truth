/* ========================================
   COMMITMENT TO ACCURACY – PAGE JS
   ======================================== */
(function(){
  'use strict';

  /* ---------- Canvas Particle System ---------- */
  const cv=document.getElementById('acCanvas');
  if(cv){
    const ctx=cv.getContext('2d');
    let w,h,particles=[];
    function resize(){w=cv.width=cv.offsetWidth;h=cv.height=cv.offsetHeight;}
    resize();window.addEventListener('resize',resize);
    class P{
      constructor(){this.reset();}
      reset(){
        this.x=Math.random()*w;this.y=Math.random()*h;
        this.vx=(Math.random()-.5)*.35;this.vy=(Math.random()-.5)*.35;
        this.r=Math.random()*2+1;this.a=Math.random()*.35+.1;
      }
      update(){
        this.x+=this.vx;this.y+=this.vy;
        if(this.x<0||this.x>w)this.vx*=-1;
        if(this.y<0||this.y>h)this.vy*=-1;
      }
      draw(){
        ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${this.a})`;ctx.fill();
      }
    }
    const count=Math.min(90,Math.floor(w*h/8000));
    for(let i=0;i<count;i++)particles.push(new P());
    function lines(){
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,d=dx*dx+dy*dy;
          if(d<18000){
            ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);
            ctx.strokeStyle=`rgba(255,255,255,${.08*(1-d/18000)})`;ctx.lineWidth=.6;ctx.stroke();
          }
        }
      }
    }
    (function loop(){
      ctx.clearRect(0,0,w,h);
      particles.forEach(p=>{p.update();p.draw();});
      lines();requestAnimationFrame(loop);
    })();
  }

  /* ---------- Counter Animation ---------- */
  function animateCounters(entries,observer){
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      const el=e.target;observer.unobserve(el);
      const target=parseInt(el.dataset.count,10);
      const suffix=el.dataset.suffix||'';
      if(isNaN(target))return;
      const dur=1600;let start=null;
      function step(ts){
        if(!start)start=ts;
        const p=Math.min((ts-start)/dur,1);
        const ease=1-Math.pow(1-p,3);
        const v=Math.round(ease*target);
        el.textContent=v.toLocaleString()+suffix;
        if(p<1)requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  const cObs=new IntersectionObserver(animateCounters,{threshold:.3});
  document.querySelectorAll('.ac-stat-num[data-count]').forEach(el=>cObs.observe(el));

  /* ---------- Fade-in Observer ---------- */
  const fObs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('visible');fObs.unobserve(e.target);}
    });
  },{threshold:.15});
  document.querySelectorAll('.fade-in').forEach(el=>fObs.observe(el));

  /* ---------- Tech Bar Fill Animation ---------- */
  const bObs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const fill=e.target.dataset.fill;
        e.target.style.width=fill+'%';
        bObs.unobserve(e.target);
      }
    });
  },{threshold:.3});
  document.querySelectorAll('.ac-tech-fill, .ac-dash-bar-fill').forEach(el=>bObs.observe(el));

  /* ---------- Dashboard Live Feed ---------- */
  const feedList=document.getElementById('acFeedList');
  if(feedList){
    const entries=[
      'Correction applied — Sector 7 economic output realigned',
      'PNAS flag resolved — narrative deviation neutralized',
      'Archive update — 14 obsolete records transferred to Memory Hole',
      'Sentiment sync — Sector 2 alignment restored to 99.9%',
      'Citizen report processed — discrepancy confirmed and corrected',
      'Predictive scan complete — 0 pre-public inconsistencies detected',
      'Statistical enhancement — Q1 production figures optimized',
      'Memory verification — archival integrity confirmed',
      'Telescreen broadcast updated — new slogan rotation deployed',
      'Narrative consistency check — all sectors above 99.5%',
      'Historical record aligned — biography update distributed',
      'Cross-reference audit — 0 deviations found in Sector 4',
      'Belief synchronization pulse — citizen confidence at 98.7%',
      'Correction cascade complete — 38 linked records updated',
      'Approved vocabulary update — 12 new Newspeak terms integrated'
    ];
    function pad(n){return String(n).padStart(2,'0');}
    function addFeedItem(){
      const now=new Date();
      const time=pad(now.getHours())+':'+pad(now.getMinutes())+':'+pad(now.getSeconds());
      const text=entries[Math.floor(Math.random()*entries.length)];
      const div=document.createElement('div');
      div.className='ac-feed-item';
      div.innerHTML=`<span class="ac-feed-time">${time}</span> ${text}`;
      feedList.prepend(div);
      while(feedList.children.length>6)feedList.removeChild(feedList.lastChild);
    }
    setInterval(addFeedItem,4000);
  }

})();
