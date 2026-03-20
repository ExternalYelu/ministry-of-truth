/* ========================================
   BEHIND THE CURTAIN — ANALYSIS JS
   ======================================== */
(function(){
  'use strict';

  /* ---------- Curtain Intro Animation ---------- */
  const curtain = document.getElementById('anCurtain');
  if(curtain){
    setTimeout(()=>{
      curtain.classList.add('hidden');
    }, 3000);
  }

  /* ---------- Scroll Progress Bar ---------- */
  const bar = document.createElement('div');
  bar.className = 'an-progress';
  document.body.prepend(bar);
  window.addEventListener('scroll',()=>{
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    bar.style.width = Math.min(pct * 100, 100) + '%';
  });

  /* ---------- Section Fade-In ---------- */
  const sections = document.querySelectorAll('.an-section');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.08});
  sections.forEach(s=>obs.observe(s));

  /* ---------- Smooth Scroll for TOC links ---------- */
  document.querySelectorAll('.an-toc a').forEach(a=>{
    a.addEventListener('click',e=>{
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){
        el.scrollIntoView({behavior:'smooth',block:'start'});
        history.replaceState(null,null,'#'+id);
      }
    });
  });

  /* ---------- Reading Time ---------- */
  const main = document.querySelector('.an-main');
  if(main){
    const words = main.textContent.trim().split(/\s+/).length;
    const mins = Math.ceil(words / 230);
    const badge = document.createElement('div');
    badge.className = 'an-reading-time';
    badge.textContent = mins + ' min read · ' + words.toLocaleString() + ' words';
    const header = document.querySelector('.an-header');
    if(header) header.appendChild(badge);
  }

  /* ---------- Edit Mode ---------- */
  const STORAGE_KEY = 'minitrue_analysis_edits';
  const DELETED_KEY = 'minitrue_analysis_deleted';
  let editMode = false;

  // Editable selectors
  const editableSelector = '.an-section h2, .an-section h3, .an-section p, .an-section blockquote, .an-section cite, .an-header h1, .an-subtitle, .an-final';

  // Deletable selectors (elements that can be fully removed)
  const deletableSelector = '.an-section h2, .an-section h3, .an-section p, .an-section blockquote, .an-section .an-final';

  // Restore saved edits on load
  function restoreEdits(){
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const deleted = JSON.parse(localStorage.getItem(DELETED_KEY) || '[]');
    // Remove deleted elements
    deleted.forEach(key => {
      const el = document.querySelector(`[data-edit-id="${key}"]`);
      if(el) el.remove();
    });
    // Restore text edits
    Object.keys(saved).forEach(key => {
      const el = document.querySelector(`[data-edit-id="${key}"]`);
      if(el) el.innerHTML = saved[key];
    });
  }

  // Tag every editable element with a unique ID
  document.querySelectorAll(editableSelector).forEach((el, i) => {
    el.setAttribute('data-edit-id', 'an-' + i);
  });
  restoreEdits();

  // Save current state
  function saveEdits(){
    const edits = {};
    document.querySelectorAll('[data-edit-id][contenteditable="true"]').forEach(el => {
      edits[el.dataset.editId] = el.innerHTML;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(edits));
  }

  function enableEdit(){
    editMode = true;
    document.querySelectorAll(editableSelector).forEach(el => {
      el.contentEditable = 'true';
      el.classList.add('an-editable');
    });
    // Add delete buttons to deletable elements
    document.querySelectorAll(deletableSelector).forEach(el => {
      if(el.querySelector('.an-delete-btn')) return;
      el.style.position = 'relative';
      const btn = document.createElement('button');
      btn.className = 'an-delete-btn';
      btn.innerHTML = '&times;';
      btn.title = 'Delete this block';
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteBlock(el);
      });
      el.appendChild(btn);
    });
    toolbar.classList.add('active');
    toggleBtn.textContent = 'Exit Edit Mode';
    toggleBtn.style.background = '#8B1A1A';
    toggleBtn.style.color = '#fff';
  }

  function disableEdit(){
    editMode = false;
    document.querySelectorAll(editableSelector).forEach(el => {
      el.contentEditable = 'false';
      el.classList.remove('an-editable');
    });
    // Remove all delete buttons
    document.querySelectorAll('.an-delete-btn').forEach(b => b.remove());
    toolbar.classList.remove('active');
    toggleBtn.textContent = 'Edit Page';
    toggleBtn.style.background = '';
    toggleBtn.style.color = '';
  }

  function deleteBlock(el){
    const id = el.dataset.editId;
    // Animate out
    el.style.transition = 'opacity .3s ease, max-height .4s ease, margin .4s ease, padding .4s ease';
    el.style.overflow = 'hidden';
    el.style.maxHeight = el.scrollHeight + 'px';
    requestAnimationFrame(() => {
      el.style.opacity = '0';
      el.style.maxHeight = '0';
      el.style.marginTop = '0';
      el.style.marginBottom = '0';
      el.style.paddingTop = '0';
      el.style.paddingBottom = '0';
    });
    setTimeout(() => {
      el.remove();
      // Save deletion
      const deleted = JSON.parse(localStorage.getItem(DELETED_KEY) || '[]');
      if(id && !deleted.includes(id)){ deleted.push(id); }
      localStorage.setItem(DELETED_KEY, JSON.stringify(deleted));
      // Also clean up from text edits
      const edits = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      delete edits[id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(edits));
    }, 450);
  }

  // Build toolbar
  const toolbar = document.createElement('div');
  toolbar.className = 'an-edit-toolbar';
  toolbar.innerHTML = `
    <button class="an-edit-btn" id="anEditToggle">Edit Page</button>
    <button class="an-edit-btn an-save-btn" id="anEditSave">Save</button>
    <button class="an-edit-btn an-reset-btn" id="anEditReset">Reset All</button>
  `;
  document.body.appendChild(toolbar);

  const toggleBtn = document.getElementById('anEditToggle');
  const saveBtn = document.getElementById('anEditSave');
  const resetBtn = document.getElementById('anEditReset');

  const EDIT_PASSWORD = 'Syme';

  toggleBtn.addEventListener('click', () => {
    if(editMode){ disableEdit(); return; }
    const pw = prompt('Enter edit password:');
    if(pw === EDIT_PASSWORD){ enableEdit(); }
    else if(pw !== null){ alert('Access denied.'); }
  });

  saveBtn.addEventListener('click', () => {
    saveEdits();
    saveBtn.textContent = 'Saved!';
    setTimeout(() => { saveBtn.textContent = 'Save'; }, 1200);
  });

  resetBtn.addEventListener('click', () => {
    if(confirm('Reset all edits to original? This cannot be undone.')){
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(DELETED_KEY);
      location.reload();
    }
  });

  // Auto-save on blur of any editable element
  document.addEventListener('blur', (e) => {
    if(editMode && e.target.hasAttribute && e.target.hasAttribute('data-edit-id')){
      saveEdits();
    }
  }, true);

})();
