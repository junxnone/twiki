// Adds a small "▸ 代码" toggle button after every GitHub permalink on the page
// (https://github.com/<owner>/<repo>/blob/<40-char sha>/<path>[#L10[-L20]]).
// The code is fetched from raw.githubusercontent.com on the first click and
// shown below the link as a highlighted code block; clicking again collapses it.
(function () {
  var PERMALINK = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([0-9a-f]{40})\/([^#?]+)(?:\?[^#]*)?(?:#(.*))?$/;
  var SKIP_EXT = /\.(png|jpe?g|gif|svg|ico|webp|bmp|pdf|zip|gz|tgz|7z|rar|tar|bin|exe|dll|so|onnx|pt|pth|ipynb)$/i;
  var LANGS = {
    py: 'python', c: 'c', h: 'c', cpp: 'cpp', cc: 'cpp', cxx: 'cpp', hpp: 'cpp', hh: 'cpp', cu: 'cpp',
    sh: 'bash', bash: 'bash', js: 'javascript', mjs: 'javascript', ts: 'javascript', json: 'json',
    yaml: 'yaml', yml: 'yaml', cmake: 'cmake', md: 'markdown', html: 'markup', htm: 'markup',
    xml: 'markup', css: 'css', java: 'clike', go: 'clike', rs: 'clike'
  };
  var cache = {};

  function langOf(path) {
    var name = path.split('/').pop();
    if (name === 'CMakeLists.txt') return 'cmake';
    var m = name.match(/\.([^.]+)$/);
    return (m && LANGS[m[1].toLowerCase()]) || 'none';
  }

  // "#L10", "#L10-L20", "#L10C5-L20C3" -> [10, 20]; anything else -> null
  function rangeOf(hash) {
    var m = (hash || '').match(/^L(\d+)(?:C\d+)?(?:-L(\d+)(?:C\d+)?)?$/);
    return m ? [+m[1], +(m[2] || m[1])] : null;
  }

  function fetchText(url) {
    if (!cache[url]) {
      cache[url] = fetch(url).then(function (r) {
        if (!r.ok) throw new Error(r.status + ' ' + r.statusText);
        return r.text();
      });
    }
    return cache[url];
  }

  function buildBlock(a, m) {
    var path = decodeURIComponent(m[4]);
    var range = rangeOf(m[5]);
    var raw = 'https://raw.githubusercontent.com/' + m[1] + '/' + m[2] + '/' + m[3] + '/' + m[4];
    var box = document.createElement('div');
    box.className = 'gh-code';

    var head = document.createElement('div');
    head.className = 'gh-code-head';
    head.textContent = m[1] + '/' + m[2] + ' : ' + path + (range ? '  L' + range[0] + (range[1] !== range[0] ? '-L' + range[1] : '') : '');
    var copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'gh-code-copy';
    copy.textContent = '复制';
    head.appendChild(copy);
    box.appendChild(head);

    var pre = document.createElement('pre');
    var code = document.createElement('code');
    code.textContent = 'loading...';
    pre.appendChild(code);
    box.appendChild(pre);

    fetchText(raw).then(function (text) {
      var lines = text.replace(/\r\n/g, '\n').split('\n');
      if (range) lines = lines.slice(range[0] - 1, range[1]);
      var lang = langOf(path);
      pre.setAttribute('data-lang', lang);
      code.className = 'language-' + lang;
      code.textContent = lines.join('\n');
      if (window.Prism && Prism.languages[lang]) Prism.highlightElement(code);
      copy.onclick = function () {
        navigator.clipboard.writeText(lines.join('\n')).then(function () {
          copy.textContent = '已复制';
          setTimeout(function () { copy.textContent = '复制'; }, 1500);
        });
      };
    }).catch(function (e) {
      box.classList.add('gh-code-error');
      code.textContent = '无法加载代码（' + e.message + '）：' + a.href;
      copy.remove();
    });
    return box;
  }

  // put the block under the list item / table cell / quote, or after the paragraph
  function place(a, box) {
    var host = a.closest('li, td, th, blockquote');
    if (host) { host.appendChild(box); return; }
    var p = a.closest('p') || a;
    p.parentNode.insertBefore(box, p.nextSibling);
  }

  function attach(a, m) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gh-code-btn';
    btn.textContent = '▸ 代码';
    btn.title = '展开代码';
    var box = null;
    btn.addEventListener('click', function (ev) {
      ev.preventDefault();
      if (!box) {
        box = buildBlock(a, m);
        place(a, box);
      } else {
        box.hidden = !box.hidden;
      }
      btn.classList.toggle('open', !box.hidden);
      btn.textContent = box.hidden ? '▸ 代码' : '▾ 收起';
      btn.title = box.hidden ? '展开代码' : '收起代码';
    });
    a.insertAdjacentElement('afterend', btn);
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(function (hook) {
    hook.doneEach(function () {
      document.querySelectorAll('#main a[href]').forEach(function (a) {
        if (a.hasAttribute('data-gh-code')) return;
        a.setAttribute('data-gh-code', '');
        if (a.closest('h1, h2, h3, h4, h5, h6, pre, code')) return;
        var m = a.href.match(PERMALINK);
        if (!m || SKIP_EXT.test(m[4])) return;
        attach(a, m);
      });
    });
  });
})();
