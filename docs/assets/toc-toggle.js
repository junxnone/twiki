// A single "TOC" button toggles the page TOC (docsify-plugin-toc).
// The choice is remembered in localStorage; without a saved choice the TOC
// starts expanded on wide screens (>= 1300px) and collapsed on narrow ones.
(function () {
  var KEY = 'toc-collapsed';
  var btn = null;

  function getSaved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function save(collapsed) {
    try { localStorage.setItem(KEY, collapsed ? '1' : '0'); } catch (e) { }
  }

  function isCollapsed() {
    var v = getSaved();
    return v === null ? window.innerWidth < 1300 : v === '1';
  }

  function apply() {
    var collapsed = isCollapsed();
    document.body.classList.toggle('toc-collapsed', collapsed);
    if (btn) {
      btn.setAttribute('aria-expanded', String(!collapsed));
      btn.title = collapsed ? 'Show TOC' : 'Hide TOC';
    }
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(function (hook) {
    hook.mounted(function () {
      btn = document.createElement('button');
      btn.id = 'toc-toggle';
      btn.type = 'button';
      btn.textContent = 'TOC';
      btn.addEventListener('click', function () {
        save(!document.body.classList.contains('toc-collapsed'));
        apply();
      });
      document.body.appendChild(btn);
      apply();
      window.addEventListener('resize', apply);
    });

    // no headings on the page -> the plugin leaves an empty list, hide the button too
    hook.doneEach(function () {
      if (btn) btn.style.display = document.querySelector('.toc-nav .page_toc') ? '' : 'none';
    });
  });
})();
