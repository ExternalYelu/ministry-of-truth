/* =============================================
   MINISTRY OF TRUTH — Admin / Manager CMS Mode
   Password: 2+2=5
   ============================================= */

(function() {
  'use strict';

  var ADMIN_PASS = '2+2=5';
  var ADMIN_KEY  = 'minitrue_admin';
  var EDITS_KEY  = 'minitrue_edits';
  var isAdmin    = false;

  /* ------ Editable selectors ------ */
  var EDITABLE = [
    'h1','h2','h3','h4',
    'p:not(.no-edit)',
    'blockquote',
    '.hero-badge',
    '.ticker-item',
    '.slogan-item',
    '.poster-text',
    '.poster-sub',
    '.press-date',
    '.news-tag',
    '.section-subtitle',
    '.section-desc',
    '.timeline-year',
    '.dash-metric label',
    '.dash-metric .value',
    '.dash-metric .trend',
    '.login-sub',
    'cite',
    '.job-meta span',
    'label',
    '.gate-classified',
    '.gate-sub',
    '.gate-footer'
  ].join(',');

  /* ------ Restore saved edits ------ */
  function restoreEdits() {
    var saved;
    try { saved = JSON.parse(localStorage.getItem(EDITS_KEY)); } catch(e) { return; }
    if (!saved) return;
    var page = location.pathname.split('/').pop() || 'index.html';
    var pageEdits = saved[page];
    if (!pageEdits) return;
    var els = document.querySelectorAll(EDITABLE);
    els.forEach(function(el, i) {
      var key = i.toString();
      if (pageEdits[key] !== undefined) {
        el.innerHTML = pageEdits[key];
      }
    });
  }

  /* ------ Save current edits ------ */
  function saveEdits() {
    var saved;
    try { saved = JSON.parse(localStorage.getItem(EDITS_KEY)) || {}; } catch(e) { saved = {}; }
    var page = location.pathname.split('/').pop() || 'index.html';
    saved[page] = {};
    var els = document.querySelectorAll(EDITABLE);
    els.forEach(function(el, i) {
      saved[page][i.toString()] = el.innerHTML;
    });
    localStorage.setItem(EDITS_KEY, JSON.stringify(saved));
  }

  /* ------ Toggle admin mode ------ */
  function enableAdmin() {
    isAdmin = true;
    localStorage.setItem(ADMIN_KEY, 'true');
    document.body.classList.add('admin-mode');
    document.querySelectorAll(EDITABLE).forEach(function(el) {
      el.setAttribute('contenteditable', 'true');
    });
    showToolbar();
  }

  function disableAdmin() {
    isAdmin = false;
    localStorage.removeItem(ADMIN_KEY);
    document.body.classList.remove('admin-mode');
    document.querySelectorAll('[contenteditable]').forEach(function(el) {
      if (el.closest('.nr-article-overlay')) return;
      el.removeAttribute('contenteditable');
    });
    hideToolbar();
  }

  /* ------ Floating toolbar ------ */
  var toolbar;

  function showToolbar() {
    if (toolbar) { toolbar.style.display = 'flex'; return; }
    toolbar = document.createElement('div');
    toolbar.className = 'admin-toolbar';
    toolbar.innerHTML =
      '<div class="admin-toolbar-inner">' +
        '<span class="admin-badge">MANAGER MODE</span>' +
        '<button class="admin-btn admin-save">Save Changes</button>' +
        '<button class="admin-btn admin-reset">Reset Page</button>' +
        '<button class="admin-btn admin-exit">Exit</button>' +
      '</div>';
    document.body.appendChild(toolbar);

    toolbar.querySelector('.admin-save').addEventListener('click', function() {
      saveEdits();
      this.textContent = 'Saved';
      var self = this;
      setTimeout(function() { self.textContent = 'Save Changes'; }, 1500);
    });

    toolbar.querySelector('.admin-reset').addEventListener('click', function() {
      if (confirm('Reset all edits on this page to defaults?')) {
        var saved;
        try { saved = JSON.parse(localStorage.getItem(EDITS_KEY)) || {}; } catch(e) { saved = {}; }
        var page = location.pathname.split('/').pop() || 'index.html';
        delete saved[page];
        localStorage.setItem(EDITS_KEY, JSON.stringify(saved));
        location.reload();
      }
    });

    toolbar.querySelector('.admin-exit').addEventListener('click', function() {
      disableAdmin();
    });
  }

  function hideToolbar() {
    if (toolbar) toolbar.style.display = 'none';
  }

  /* ------ Password modal ------ */
  function showLoginModal() {
    var overlay = document.createElement('div');
    overlay.className = 'admin-overlay';
    overlay.innerHTML =
      '<div class="admin-modal">' +
        '<div class="admin-modal-icon">' +
          '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>' +
        '</div>' +
        '<h3>Manager Access</h3>' +
        '<p>Enter the management clearance code.</p>' +
        '<input type="password" class="admin-modal-input" placeholder="Clearance code" autofocus />' +
        '<div class="admin-modal-actions">' +
          '<button class="admin-btn admin-modal-cancel">Cancel</button>' +
          '<button class="admin-btn admin-modal-submit">Authenticate</button>' +
        '</div>' +
        '<div class="admin-modal-error"></div>' +
      '</div>';
    document.body.appendChild(overlay);

    var input = overlay.querySelector('input');
    var errorEl = overlay.querySelector('.admin-modal-error');

    function tryLogin() {
      if (input.value === ADMIN_PASS) {
        enableAdmin();
        overlay.remove();
      } else {
        errorEl.textContent = 'Incorrect clearance code.';
        input.value = '';
        input.focus();
      }
    }

    overlay.querySelector('.admin-modal-submit').addEventListener('click', tryLogin);
    input.addEventListener('keydown', function(e) { if (e.key === 'Enter') tryLogin(); });
    overlay.querySelector('.admin-modal-cancel').addEventListener('click', function() { overlay.remove(); });
    overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });

    setTimeout(function() { input.focus(); }, 50);
  }

  /* ------ Keyboard shortcut: Ctrl+Shift+M ------ */
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'M') {
      e.preventDefault();
      if (isAdmin) { disableAdmin(); }
      else { showLoginModal(); }
    }
  });

  /* ------ Init ------ */
  document.addEventListener('DOMContentLoaded', function() {
    restoreEdits();

    // Resume admin if was active
    if (localStorage.getItem(ADMIN_KEY) === 'true') {
      enableAdmin();
    }
  });

})();
