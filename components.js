/* =============================================================
   Ethos Annuities — Shared Component Logic
   All screens import this file. Each screen calls only the
   utilities it needs, configured with screen-specific values.
   ============================================================= */

window.EDS = (function () {

  const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  /* ── Navigation ─────────────────────────────────────────── */
  function navigate(url) {
    document.getElementById('slideInner').classList.add('is-leaving');
    setTimeout(function () { window.location.href = url; }, 300);
  }

  /* ── Mobile footer pinning (visualViewport) ─────────────── */
  function initMobileFooter(bottomWrapper) {
    if (!isMobile || !window.visualViewport) return;
    var update = function () {
      var kbH = window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop;
      bottomWrapper.style.bottom = Math.max(0, kbH) + 'px';
    };
    window.visualViewport.addEventListener('resize', update);
    window.visualViewport.addEventListener('scroll', update);
  }

  /* ── Formatters ─────────────────────────────────────────── */
  function formatDate(digits) {
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4, 8);
  }

  function formatPhone(digits) {
    if (!digits.length) return '';
    if (digits.length <= 3) return '(' + digits;
    if (digits.length <= 6) return '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
    return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
  }

  /* ── Shared SVGs ────────────────────────────────────────── */
  var SVG = {
    delete: '<svg class="kb-del-icon" viewBox="0 0 20 16" fill="none"><path d="M7.5 0L0 8l7.5 8H20V0H7.5z" fill="#3a3a3c"/><path d="M11 5l5 6M16 5l-5 6" stroke="#ADB5BD" stroke-width="1.5" stroke-linecap="round"/></svg>',
    shift:  '<svg class="kb-shift-icon" viewBox="0 0 18 18" fill="none"><path d="M9 2L2 9h4v7h6V9h4L9 2z" fill="#3a3a3c"/></svg>',
    alert:  '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><g clip-path="url(#a)"><path d="M8 5.33V8M8 10.67H8.007M14.667 8A6.667 6.667 0 1 1 1.333 8a6.667 6.667 0 0 1 13.334 0Z" stroke="#F44B40" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="a"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>'
  };

  /* ── Keyboard builders ──────────────────────────────────── */

  // v1 row-style numeric keyboard
  function buildNumericKeyboard(container) {
    container.className = 'keyboard';
    container.innerHTML =
      '<div class="kb-row">' +
        '<div class="kb-key kb-key--digit" data-key="1">1</div>' +
        '<div class="kb-key kb-key--digit" data-key="2">2</div>' +
        '<div class="kb-key kb-key--digit" data-key="3">3</div>' +
      '</div>' +
      '<div class="kb-row">' +
        '<div class="kb-key kb-key--digit" data-key="4">4</div>' +
        '<div class="kb-key kb-key--digit" data-key="5">5</div>' +
        '<div class="kb-key kb-key--digit" data-key="6">6</div>' +
      '</div>' +
      '<div class="kb-row">' +
        '<div class="kb-key kb-key--digit" data-key="7">7</div>' +
        '<div class="kb-key kb-key--digit" data-key="8">8</div>' +
        '<div class="kb-key kb-key--digit" data-key="9">9</div>' +
      '</div>' +
      '<div class="kb-row">' +
        '<div class="kb-key kb-key--special kb-key--delete" data-key="noop"></div>' +
        '<div class="kb-key kb-key--digit" data-key="0">0</div>' +
        '<div class="kb-key kb-key--special kb-key--delete" data-key="delete">' + SVG.delete + '</div>' +
      '</div>' +
      '<div class="kb-home-bar"><div class="kb-home-bar__pill"></div></div>';
  }

  // v2 iOS phone pad (grid, with letter subtext)
  var IOS_KEYS = [
    ['1',''],['2','ABC'],['3','DEF'],
    ['4','GHI'],['5','JKL'],['6','MNO'],
    ['7','PQRS'],['8','TUV'],['9','WXYZ'],
    [null,null],['0','+'],['delete',null]
  ];

  function buildIosKeyboard(container) {
    container.className = 'keyboard keyboard--ios';
    var html = '';
    IOS_KEYS.forEach(function (pair) {
      var digit = pair[0], sub = pair[1];
      if (digit === null) {
        html += '<div class="kb-key kb-key--special" data-key="noop"></div>';
      } else if (digit === 'delete') {
        html += '<div class="kb-key kb-key--special" data-key="delete">' + SVG.delete + '</div>';
      } else {
        html += '<div class="kb-key" data-key="' + digit + '">' +
          '<span class="kb-digit-main">' + digit + '</span>' +
          (sub ? '<span class="kb-digit-sub">' + sub + '</span>' : '') +
          '</div>';
      }
    });
    html += '<div class="kb-home-bar"><div class="kb-home-bar__pill"></div></div>';
    container.innerHTML = html;
  }

  // QWERTY keyboard
  var QWERTY_ROWS = [
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l'],
    ['shift','z','x','c','v','b','n','m','delete'],
    ['alt','space','return']
  ];

  function buildQwertyKeyboard(container) {
    container.className = 'keyboard keyboard--qwerty';
    var html = '';
    QWERTY_ROWS.forEach(function (row, ri) {
      html += '<div class="kb-row' + (ri === 1 ? ' kb-row--2' : '') + '">';
      row.forEach(function (key) {
        if (key === 'shift') {
          html += '<div class="kb-key kb-key--special kb-key--shift" data-key="shift">' + SVG.shift + '</div>';
        } else if (key === 'delete') {
          html += '<div class="kb-key kb-key--special kb-key--delete" data-key="delete">' + SVG.delete + '</div>';
        } else if (key === 'alt') {
          html += '<div class="kb-key kb-key--special kb-key--alt" data-key="alt">123</div>';
        } else if (key === 'space') {
          html += '<div class="kb-key kb-key--special kb-key--space" data-key="space">space</div>';
        } else if (key === 'return') {
          html += '<div class="kb-key kb-key--special kb-key--return" data-key="return">return</div>';
        } else {
          html += '<div class="kb-key kb-key--letter" data-key="' + key + '">' + key + '</div>';
        }
      });
      html += '</div>';
    });
    container.innerHTML = html;
  }

  /* ── Alert icon HTML ────────────────────────────────────── */
  function alertIconHTML() {
    return '<div class="alert-icon">' + SVG.alert + '</div>';
  }

  /* ── V1 keyboard init (keyboard + CTA slide together) ───── */
  // bottomWrapper contains: .footer (CTA) + keyboard element (appended below)
  // On desktop: initially slides keyboard below view, slides up on focus
  function initV1Keyboard(inputEl, bottomWrapper, keyboardEl, onKey) {
    if (isMobile) {
      initMobileFooter(bottomWrapper);
      inputEl.addEventListener('focus', function () {
        document.addEventListener('touchstart', function () { inputEl.focus(); }, { once: true, passive: true });
      });
      return;
    }
    function getKbH() { return keyboardEl.offsetHeight; }
    function slideDown() { bottomWrapper.style.transform = 'translateY(' + getKbH() + 'px)'; }
    function slideUp()   { bottomWrapper.style.transform = 'translateY(0)'; }

    bottomWrapper.style.transition = 'none';
    slideDown();
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { bottomWrapper.style.transition = ''; });
    });
    inputEl.addEventListener('focus', slideUp);
    inputEl.addEventListener('blur', function () {
      setTimeout(function () {
        if (document.activeElement !== inputEl) slideDown();
      }, 80);
    });
    keyboardEl.addEventListener('mousedown', function (e) {
      e.preventDefault();
      var key = e.target.closest('[data-key]');
      if (!key) return;
      onKey(key.dataset.key);
      inputEl.dispatchEvent(new Event('input'));
    });
  }

  /* ── V2 keyboard init (keyboard and CTA are independent) ── */
  // keyboardWrapper slides independently; CTA (bottomWrapper) hides when keyboard open
  function initV2Keyboard(inputEl, keyboardWrapper, bottomWrapper, onKey) {
    if (isMobile) {
      initMobileFooter(bottomWrapper);
      return;
    }
    function slideUp() {
      keyboardWrapper.classList.add('is-open');
      bottomWrapper.style.display = 'none';
    }
    function slideDown() {
      keyboardWrapper.classList.remove('is-open');
      bottomWrapper.style.display = '';
    }
    inputEl.addEventListener('focus', slideUp);
    inputEl.addEventListener('blur', function () {
      setTimeout(function () {
        if (document.activeElement !== inputEl) slideDown();
      }, 80);
    });
    var kbEl = keyboardWrapper.querySelector('.keyboard, .keyboard--ios, .keyboard--qwerty');
    if (kbEl) {
      kbEl.addEventListener('mousedown', function (e) {
        e.preventDefault();
        var key = e.target.closest('[data-key]');
        if (!key) return;
        onKey(key.dataset.key);
        inputEl.dispatchEvent(new Event('input'));
      });
    }
    // Auto-open on load
    setTimeout(function () { inputEl.focus(); }, 350);
    document.addEventListener('touchstart', function () { inputEl.focus(); }, { once: true, passive: true });
  }

  /* ── EDS Dropdown ───────────────────────────────────────── */
  function initDropdown(config) {
    // config: { wrapperId, triggerId, panelId, valueId, hintId, options, onSelect }
    var wrapper  = document.getElementById(config.wrapperId);
    var trigger  = document.getElementById(config.triggerId);
    var panel    = document.getElementById(config.panelId);
    var valueEl  = document.getElementById(config.valueId);
    var hintEl   = config.hintId ? document.getElementById(config.hintId) : null;
    var selected = '';

    // Build items
    config.options.forEach(function (opt, i) {
      if (i > 0) {
        var div = document.createElement('div');
        div.className = 'dropdown-divider';
        panel.appendChild(div);
      }
      var item = document.createElement('div');
      item.className = 'dropdown-item';
      item.innerHTML = '<div class="dropdown-item-inner">' + opt + '</div>';
      item.addEventListener('click', function () {
        selected = opt;
        valueEl.textContent = opt;
        valueEl.className = 'dropdown-value selected';
        panel.querySelectorAll('.dropdown-item').forEach(function (el) { el.classList.remove('is-selected'); });
        item.classList.add('is-selected');
        close();
        trigger.classList.remove('is-destructive');
        if (hintEl) hintEl.classList.remove('visible');
        if (config.onSelect) config.onSelect(opt);
      });
      panel.appendChild(item);
    });

    function open()  { trigger.classList.add('is-open');    panel.classList.add('is-open'); }
    function close() { trigger.classList.remove('is-open'); panel.classList.remove('is-open'); }

    trigger.addEventListener('click', function () {
      panel.classList.contains('is-open') ? close() : open();
    });
    document.addEventListener('click', function (e) {
      if (!wrapper.contains(e.target)) close();
    });

    // Returns validator for use in Next button handler
    return {
      getValue: function () { return selected; },
      showError: function () {
        trigger.classList.add('is-destructive');
        if (hintEl) hintEl.classList.add('visible');
      }
    };
  }

  /* ── Auto-focus helper ──────────────────────────────────── */
  function autoFocus(inputEl, delay) {
    setTimeout(function () { inputEl.focus(); }, delay || 350);
    document.addEventListener('touchstart', function () { inputEl.focus(); }, { once: true, passive: true });
  }

  /* ── Public API ─────────────────────────────────────────── */
  return {
    isMobile: isMobile,
    navigate: navigate,
    initMobileFooter: initMobileFooter,
    formatDate: formatDate,
    formatPhone: formatPhone,
    buildNumericKeyboard: buildNumericKeyboard,
    buildIosKeyboard: buildIosKeyboard,
    buildQwertyKeyboard: buildQwertyKeyboard,
    alertIconHTML: alertIconHTML,
    initV1Keyboard: initV1Keyboard,
    initV2Keyboard: initV2Keyboard,
    initDropdown: initDropdown,
    autoFocus: autoFocus
  };

}());
