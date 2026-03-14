/* ========================================
   POSTERS GALLERY – JS
   ======================================== */
(function(){
  'use strict';

  /* ---------- Canvas ---------- */
  const cv=document.getElementById('poCanvas');
  if(cv){
    const ctx=cv.getContext('2d');let w,h,pts=[];
    function resize(){w=cv.width=cv.offsetWidth;h=cv.height=cv.offsetHeight;}
    resize();window.addEventListener('resize',resize);
    class P{constructor(){this.reset();}reset(){this.x=Math.random()*w;this.y=Math.random()*h;this.vx=(Math.random()-.5)*.3;this.vy=(Math.random()-.5)*.3;this.r=Math.random()*2+.8;this.a=Math.random()*.3+.1;}update(){this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>w)this.vx*=-1;if(this.y<0||this.y>h)this.vy*=-1;}draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${this.a})`;ctx.fill();}}
    for(let i=0;i<Math.min(70,Math.floor(w*h/10000));i++)pts.push(new P());
    (function loop(){ctx.clearRect(0,0,w,h);pts.forEach(p=>{p.update();p.draw();});
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=dx*dx+dy*dy;if(d<16000){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(255,255,255,${.06*(1-d/16000)})`;ctx.lineWidth=.5;ctx.stroke();}}
      requestAnimationFrame(loop);})();
  }

  /* ---------- Counters ---------- */
  const cObs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;const el=e.target;cObs.unobserve(el);
      const target=parseInt(el.dataset.count,10),suffix=el.dataset.suffix||'';
      if(isNaN(target))return;const dur=1600;let start=null;
      function step(ts){if(!start)start=ts;const p=Math.min((ts-start)/dur,1);const ease=1-Math.pow(1-p,3);el.textContent=Math.round(ease*target).toLocaleString()+suffix;if(p<1)requestAnimationFrame(step);}
      requestAnimationFrame(step);
    });
  },{threshold:.3});
  document.querySelectorAll('.po-stat-num[data-count]').forEach(el=>cObs.observe(el));

  /* ---------- Fade-in ---------- */
  const fObs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');fObs.unobserve(e.target);}});
  },{threshold:.12});
  document.querySelectorAll('.fade-in').forEach(el=>fObs.observe(el));

  /* ---------- Download buttons ---------- */
  document.querySelectorAll('.po-dl-btn').forEach(btn=>{
    btn.addEventListener('click',function(e){
      e.preventDefault();
      const orig=this.textContent;
      this.textContent='Preparing...';
      setTimeout(()=>{this.textContent='Access Denied';
        setTimeout(()=>{this.textContent='Clearance Required';
          setTimeout(()=>{this.textContent=orig;},1800);
        },1200);
      },1000);
    });
  });

  /* ---------- Share buttons ---------- */
  document.querySelectorAll('.po-share-btn').forEach(btn=>{
    btn.addEventListener('click',function(e){
      e.preventDefault();
      const orig=this.textContent;
      this.textContent='Shared to Telescreen';
      setTimeout(()=>{this.textContent=orig;},2000);
    });
  });

})();
