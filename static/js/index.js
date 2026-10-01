/* Dex-One2Many project page — behavior (no dependencies) */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.getElementById('site-nav');
    var hero = document.getElementById('hero');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- 1. Nav: transparent over hero ↔ solid after, active section ---------- */
    var links = nav ? Array.prototype.slice.call(nav.querySelectorAll('[data-sec]')) : [];
    var sections = links
      .map(function (a) { return document.getElementById(a.getAttribute('data-sec')); })
      .filter(Boolean);

    function onScroll() {
      if (!nav) return;
      var heroH = hero ? hero.offsetHeight : 480;
      nav.classList.toggle('is-solid', window.scrollY > heroH - 72);

      if (!sections.length) return;
      var pos = window.scrollY + 130;
      var current = sections[0].id;
      sections.forEach(function (s) { if (s.offsetTop <= pos) current = s.id; });
      links.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('data-sec') === current);
      });
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { onScroll(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    /* ---------- 2. Reveal on scroll ---------- */
    var revs = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (revs.length && !reduceMotion && 'IntersectionObserver' in window) {
      revs.forEach(function (el) { el.classList.add('is-hidden'); });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.remove('is-hidden');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
      revs.forEach(function (el) { io.observe(el); });
    }

    /* ---------- 3. Autoplay videos: make sure they really loop & play ---------- */
    function armVideo(v) {
      if (v.__armed) return;
      v.__armed = true;
      v.loop = true;
      v.muted = true;
      v.playsInline = true;
      // data-rate="2" 같은 속성으로 재생 속도 지정 (파일을 재인코딩하지 않고 배속)
      var rate = parseFloat(v.getAttribute('data-rate'));
      if (rate > 0) {
        var applyRate = function () { v.defaultPlaybackRate = rate; v.playbackRate = rate; };
        applyRate();
        v.addEventListener('loadedmetadata', applyRate);
      }
      var tryPlay = function () {
        var p = v.play();
        if (p && typeof p.catch === 'function') p.catch(function () {});
      };
      tryPlay();
      v.addEventListener('ended', function () {
        try { v.currentTime = 0; } catch (e) {}
        tryPlay();
      });
    }
    Array.prototype.forEach.call(document.querySelectorAll('video[autoplay]'), armVideo);

    /* ---------- 3b. Tabs (Simulation / Real World / Taxonomy) ----------
       <div data-tabs="key"> 안의 [data-tab] 버튼 ↔ <div data-tabs-for="key"> 안의 [data-panel].
       보이는 패널의 video[data-src] 만 실제 로드해서 20개 영상이 한꺼번에 내려오지 않게 한다. */
    function loadPanelVideos(panel) {
      Array.prototype.forEach.call(panel.querySelectorAll('video'), function (v) {
        var src = v.getAttribute('data-src');
        if (src) {
          v.setAttribute('src', src);
          v.removeAttribute('data-src');
          v.load();
        }
        armVideo(v);
        var p = v.play();
        if (p && typeof p.catch === 'function') p.catch(function () {});
      });
    }
    function pausePanelVideos(panel) {
      Array.prototype.forEach.call(panel.querySelectorAll('video'), function (v) {
        try { v.pause(); } catch (e) {}
      });
    }
    function initTabs(group) {
      var key = group.getAttribute('data-tabs');
      var panelsWrap = document.querySelector('[data-tabs-for="' + key + '"]');
      if (!panelsWrap) return;
      var tabs = Array.prototype.slice.call(group.querySelectorAll('[data-tab]'));
      var panels = Array.prototype.slice.call(panelsWrap.querySelectorAll('[data-panel]'));
      var label = group.querySelector('[data-tab-label]');
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var currentName = null;

      function activate(name, focus) {
        var changed = currentName !== null && currentName !== name;
        currentName = name;
        tabs.forEach(function (t) {
          var on = t.getAttribute('data-tab') === name;
          t.classList.toggle('is-active', on);
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          t.setAttribute('tabindex', on ? '0' : '-1');
          if (on && focus) t.focus();
          if (on && label) label.textContent = t.getAttribute('aria-label') || t.textContent.trim();
        });
        panels.forEach(function (p) {
          var on = p.getAttribute('data-panel') === name;
          p.classList.toggle('is-active', on);
          if (on) {
            p.removeAttribute('hidden');
            loadPanelVideos(p);
            if (changed && !reduce) {
              p.classList.remove('is-entering');
              void p.offsetWidth; // 애니메이션 재시작
              p.classList.add('is-entering');
            }
          } else {
            p.setAttribute('hidden', '');
            pausePanelVideos(p);
          }
        });
        group.dispatchEvent(new CustomEvent('tabchange', { detail: { name: name } }));
      }

      function step(dir, focus) {
        var idx = tabs.findIndex(function (t) { return t.getAttribute('data-tab') === currentName; });
        if (idx < 0) idx = 0;
        var next = tabs[(idx + dir + tabs.length) % tabs.length];
        activate(next.getAttribute('data-tab'), focus);
      }

      tabs.forEach(function (t) {
        t.addEventListener('click', function () { activate(t.getAttribute('data-tab'), false); });
        t.addEventListener('keydown', function (e) {
          var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
          if (!dir) return;
          e.preventDefault();
          step(dir, true);
        });
      });

      // 캐러셀 화살표 (있을 때만)
      Array.prototype.forEach.call(group.querySelectorAll('[data-prev]'), function (b) {
        b.addEventListener('click', function () { step(-1, false); });
      });
      Array.prototype.forEach.call(group.querySelectorAll('[data-next]'), function (b) {
        b.addEventListener('click', function () { step(1, false); });
      });

      var initial = group.querySelector('[data-tab].is-active') || tabs[0];
      if (initial) activate(initial.getAttribute('data-tab'), false);
      group.__activate = activate;
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-tabs]:not([data-tabs="taxo-task"])'), initTabs);

    /* ---------- 3c. Interactive grasp taxonomy ----------
       데이터: static/js/taxonomy-data.js (tools/build_taxonomy.py 가 생성)
         tasks[] → panels[] → corners(바둑판 네 꼭짓점 %), cells{"r,c": {name, img, …}}, tiles[](대표 타일 라벨)
       바둑판이 원근으로 그려져 있으므로 단위 정사각형 → 네 꼭짓점 사영변환(homography)을
       CSS matrix3d 로 적용해 rows×cols 격자를 그림 위에 정확히 얹는다.
       task 는 .carousel[data-tabs="taxo-task"] 의 tabchange 로, embodiment 는 알약 버튼으로 고른다. */
    (function initTaxonomy() {
      var data = window.TAXONOMY_DATA;
      var tabsEl = document.getElementById('taxo-tabs');
      var stage = document.getElementById('taxo-stage');
      var card = document.getElementById('taxo-card');
      if (!data || !data.tasks || !tabsEl || !stage || !card) return;

      var q = window.location.search;
      var debug = /[?&]taxodebug/.test(q);
      var taxoRoot = document.getElementById('taxo');
      if (debug && taxoRoot) taxoRoot.classList.add('taxo--debug');

      var cardImg = document.getElementById('taxo-card-img');
      var cardLabel = document.getElementById('taxo-card-label');
      var cardSub = document.getElementById('taxo-card-sub');
      var cardHint = document.getElementById('taxo-card-hint');

      // 단위 정사각형 (0,0),(1,0),(1,1),(0,1) → 사각형 TL,TR,BR,BL (Heckbert square-to-quad)
      function squareToQuad(qd) {
        var x0 = qd[0][0], y0 = qd[0][1], x1 = qd[1][0], y1 = qd[1][1];
        var x2 = qd[2][0], y2 = qd[2][1], x3 = qd[3][0], y3 = qd[3][1];
        var dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
        var dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
        var a, b, c, d, e, f, g, hh;
        if (Math.abs(dx3) < 1e-9 && Math.abs(dy3) < 1e-9) {
          a = x1 - x0; b = x2 - x1; c = x0; d = y1 - y0; e = y2 - y1; f = y0; g = 0; hh = 0;
        } else {
          var det = dx1 * dy2 - dx2 * dy1;
          g = (dx3 * dy2 - dx2 * dy3) / det;
          hh = (dx1 * dy3 - dx3 * dy1) / det;
          a = x1 - x0 + g * x1; b = x3 - x0 + hh * x3; c = x0;
          d = y1 - y0 + g * y1; e = y3 - y0 + hh * y3; f = y0;
        }
        return { a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: hh };
      }
      // .taxo__grid 는 100×100px 이므로 1/100 스케일을 먼저 곱한다
      function matrix3d(m, size) {
        var s = 1 / size;
        return 'matrix3d(' + [m.a * s, m.d * s, 0, m.g * s,
                               m.b * s, m.e * s, 0, m.h * s,
                               0, 0, 1, 0,
                               m.c, m.f, 0, 1].join(',') + ')';
      }

      // 현재 카드에 표시 중인 칸을 격자에서 강조
      function setActiveCell(el) {
        Array.prototype.forEach.call(stage.querySelectorAll('.taxo__cell.is-hover'), function (x) { x.classList.remove('is-hover'); });
        if (el) el.classList.add('is-hover');
      }

      function showCell(cell, r, c) {
        if (!cell) {
          cardImg.hidden = true;
          cardLabel.textContent = '';
          cardSub.textContent = '';
          cardHint.textContent = 'Click a cell to see its grasp here';
          return;
        }
        setActiveCell(stage.querySelector('[data-rc="' + r + ',' + c + '"]'));
        cardLabel.textContent = cell.name;
        var hasTiles = current && current.panel.tiles && current.panel.tiles.length > 0;
        cardSub.textContent = 'Row ' + (r + 1) + ' · Column ' + (c + 1) + (cell.zoomed && hasTiles ? '  ·  shown as a tile' : '');
        cardHint.textContent = '';
        if (cell.img) {
          cardImg.hidden = false;
          cardImg.alt = cell.name;
          cardImg.onerror = function () { cardImg.hidden = true; };
          if (cardImg.getAttribute('src') !== cell.img) cardImg.setAttribute('src', cell.img);
        } else {
          cardImg.hidden = true;
        }
      }

      var current = null; // { panel, img, grid }
      var currentTask = null, currentEmb = null;

      function layoutGrid() {
        if (!current) return;
        var w = current.img.clientWidth, hgt = current.img.clientHeight;
        if (!w || !hgt) return;
        var quad = current.panel.corners.map(function (p) { return [p[0] / 100 * w, p[1] / 100 * hgt]; });
        current.grid.style.transform = matrix3d(squareToQuad(quad), 100);
      }

      function renderPanel(panel) {
        stage.innerHTML = '';
        var img = document.createElement('img');
        img.src = panel.base;
        img.alt = panel.label + ' grasp map';
        img.draggable = false;
        stage.appendChild(img);

        // 대표 타일 라벨 (글자 없는 패널 위에 페이지 폰트로)
        (panel.tiles || []).forEach(function (t) {
          var lab = document.createElement('div');
          lab.className = 'taxo__tile-label';
          lab.textContent = t.label;
          lab.style.left = t.at[0] + '%';
          lab.style.top = t.at[1] + '%';
          stage.appendChild(lab);
        });

        var grid = document.createElement('div');
        grid.className = 'taxo__grid';
        grid.style.gridTemplateColumns = 'repeat(' + panel.cols + ', 1fr)';
        grid.style.gridTemplateRows = 'repeat(' + panel.rows + ', 1fr)';

        for (var r = 0; r < panel.rows; r++) {
          for (var c = 0; c < panel.cols; c++) {
            var cellEl = document.createElement('div');
            cellEl.className = 'taxo__cell';
            cellEl.setAttribute('data-rc', r + ',' + c);
            var cell = panel.cells && panel.cells[r + ',' + c];
            if (cell) {
              cellEl.setAttribute('data-grasp', cell.taxonomy || cell.name);
              cellEl.setAttribute('tabindex', '0');
              cellEl.setAttribute('role', 'button');
              cellEl.setAttribute('aria-label', cell.name + ', row ' + (r + 1) + ', column ' + (c + 1));
              (function (cl, rr, cc) {
                var on = function () { showCell(cl, rr, cc); };
                cellEl.addEventListener('mouseenter', on);
                cellEl.addEventListener('focus', on);
                cellEl.addEventListener('click', on);
                cellEl.addEventListener('touchstart', on, { passive: true });
              })(cell, r, c);
            }
            grid.appendChild(cellEl);
          }
        }
        stage.appendChild(grid);

        current = { panel: panel, img: img, grid: grid };

        // 기본 표시 칸: ?cell=r,c → 대표 칸(rep) → 타일 칸(zoomed) → 첫 칸
        var pre = (/[?&]cell=(\d+),(\d+)/.exec(q) || []);
        var defaultKey = null;
        if (pre.length && panel.cells[pre[1] + ',' + pre[2]]) defaultKey = pre[1] + ',' + pre[2];
        if (!defaultKey) {
          var keys = Object.keys(panel.cells).sort();
          defaultKey = keys.filter(function (k) { return panel.cells[k].rep; })[0]
                    || keys.filter(function (k) { return panel.cells[k].zoomed; })[0]
                    || keys[0];
        }
        if (defaultKey) {
          var rc = defaultKey.split(',');
          showCell(panel.cells[defaultKey], +rc[0], +rc[1]);
        } else {
          showCell(null);
        }
        if (img.complete) layoutGrid(); else img.addEventListener('load', layoutGrid);
      }

      function findTask(key) { return data.tasks.filter(function (t) { return t.key === key; })[0]; }
      function render() {
        var task = findTask(currentTask) || data.tasks[0];
        var panel = task.panels.filter(function (p) { return p.key === currentEmb; })[0] || task.panels[0];
        currentTask = task.key; currentEmb = panel.key;
        renderPanel(panel);
      }

      // embodiment 알약 버튼 (첫 task 의 패널 순서 기준, 모든 task 가 같은 embodiment 를 가짐)
      var embButtons = [];
      data.tasks[0].panels.forEach(function (p) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'tab';
        b.setAttribute('role', 'tab');
        b.setAttribute('data-tab', p.key);
        b.textContent = p.label;
        b.addEventListener('click', function () { setEmb(p.key); });
        tabsEl.appendChild(b);
        embButtons.push(b);
      });
      function setEmb(key) {
        currentEmb = key;
        embButtons.forEach(function (b) {
          var on = b.getAttribute('data-tab') === key;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        render();
      }

      // task 캐러셀: 숨겨진 dot 버튼 + 빈 패널을 만들어 공용 initTabs 로직을 재사용
      var dots = document.getElementById('taxo-task-dots');
      var panelsWrap = document.getElementById('taxo-task-panels');
      var carousel = document.querySelector('[data-tabs="taxo-task"]');
      var wantedTask = (/[?&]task=([a-z0-9_]+)/i.exec(q) || [])[1];
      var wantedEmb = (/[?&]taxo=([a-z0-9_]+)/i.exec(q) || [])[1];
      var initialTask = findTask(wantedTask) || data.tasks[0];
      if (dots && panelsWrap && carousel) {
        data.tasks.forEach(function (t) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'dot' + (t.key === initialTask.key ? ' is-active' : '');
          b.setAttribute('role', 'tab');
          b.setAttribute('data-tab', t.key);
          b.setAttribute('aria-label', t.label);
          dots.appendChild(b);
          var p = document.createElement('div');
          p.className = 'tab-panel';
          p.setAttribute('data-panel', t.key);
          p.setAttribute('hidden', '');
          panelsWrap.appendChild(p);
        });
        carousel.addEventListener('tabchange', function (e) {
          currentTask = e.detail.name;
          render();
        });
        initTabs(carousel); // 이 시점에 initial 패널이 활성화되며 tabchange 가 한 번 발생
      }
      currentTask = initialTask.key;
      var embKeys = initialTask.panels.map(function (p) { return p.key; });
      setEmb(embKeys.indexOf(wantedEmb) >= 0 ? wantedEmb : embKeys[0]);

      window.addEventListener('resize', layoutGrid);
      if ('ResizeObserver' in window) new ResizeObserver(layoutGrid).observe(stage);
    })();

    /* ---------- 4. BibTeX copy ---------- */
    Array.prototype.forEach.call(document.querySelectorAll('[data-copy-target]'), function (btn) {
      var target = document.querySelector(btn.getAttribute('data-copy-target'));
      if (!target) return;
      var original = btn.textContent;
      btn.addEventListener('click', function () {
        var text = target.textContent;
        var done = function () {
          btn.textContent = 'Copied!';
          setTimeout(function () { btn.textContent = original; }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
        } else {
          fallbackCopy(text);
          done();
        }
      });
    });

    function fallbackCopy(text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
    }
  });
})();
