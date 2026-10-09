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
       task 는 .carousel[data-tabs="taxo-task"] 의 tabchange 로, embodiment 는 알약 버튼으로 고른다.
       칸 위에 올리면(마우스) / 포커스하면(키보드) / 탭하면(터치) 칸 바로 위에 grasp 미리보기(#taxo-peek)가 뜨고,
       클릭 · Enter · 탭하면(큰 대표 타일을 눌러도) 오른쪽(좁은 화면은 아래)에 패널이 생기며 그 칸의 rollout 이 재생된다.
       × 나 Esc 로 닫는다. 패널이 열린 채 task · embodiment 를 바꾸면 같은 칸의 새 rollout 으로 바뀐다.
       키보드: 판 전체가 Tab 한 번(roving tabindex), 칸 사이는 화살표. */
    (function initTaxonomy() {
      var data = window.TAXONOMY_DATA;
      var tabsEl = document.getElementById('taxo-tabs');
      var stage = document.getElementById('taxo-stage');
      var card = document.getElementById('taxo-card');
      var taxoRoot = document.getElementById('taxo');
      var peekEl = document.getElementById('taxo-peek');
      if (!data || !data.tasks || !tabsEl || !stage || !card || !taxoRoot || !peekEl) return;

      var q = window.location.search;
      if (/[?&]taxodebug/.test(q)) taxoRoot.classList.add('taxo--debug');

      var cardImg = document.getElementById('taxo-card-img');
      var cardVideo = document.getElementById('taxo-card-video');
      var cardLabel = document.getElementById('taxo-card-label');
      var cardSwatch = document.getElementById('taxo-card-swatch');
      var cardSub = document.getElementById('taxo-card-sub');
      var peekImg = peekEl.querySelector('img');
      var peekSwatch = peekEl.querySelector('.taxo__swatch');
      var peekName = peekEl.querySelector('.taxo__peek-name span:last-child');
      var peekCta = peekEl.querySelector('.taxo__peek-cta');
      var how = document.querySelector('.taxo__how');
      peekImg.onerror = function () { peekImg.hidden = true; };

      // taxonomy 번호 → 색 (바둑판 그림을 그린 팔레트 = Real2Scene2Real scripts/strategy/render_teaser_grasp_thumbs.py 의 TAX_COLORS).
      // ponytail: taxonomy-data.js 에 색이 없어 사본을 둠 (없는 번호는 회색 칩). 팔레트를 바꾸면 여기도 고치거나,
      //           tools/build_taxonomy.py 가 칸마다 색을 넣게 하면 이 표는 지워도 됨
      var TAX_COLORS = {
        1: '#8c6bd6', 2: '#5b9aa0', 3: '#a0522d', 4: '#e3a8d6', 5: '#9aa23a', 6: '#4f7fe8', 7: '#9cc1f5', 8: '#c8a2e8', 9: '#f6d66f',
        10: '#2f9e8f', 11: '#3fd442', 12: '#f0a04b', 13: '#7fd6e8', 14: '#e0559a', 15: '#b8860b', 16: '#ff8a65', 17: '#7e57c2', 18: '#d9534f',
        19: '#d4e157', 20: '#ec407a', 21: '#5c6bc0', 22: '#b4e36b', 23: '#9e3d33', 24: '#ffb74d', 25: '#8d6e63', 26: '#d4a017', 27: '#5fd4af',
        28: '#c79a5b', 29: '#90a4ae', 30: '#4dd0e1', 31: '#d970e7', 32: '#aed581', 33: '#f4a3c4', 34: '#80cbc4', 35: '#9fa8da', 36: '#ce93d8',
        fingertip_small: '#a6e8b8', fingertip_mid: '#3cbf74', fingertip_large: '#1f6e45'
      };
      function taxColor(t) { t = String(t || ''); return TAX_COLORS[t] || TAX_COLORS[t.split('_')[0]] || 'var(--border)'; }

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

      var current = null; // { panel, img, grid }
      var currentTask = null, currentEmb = null;
      var selected = null;          // 패널에서 재생 중인 칸
      var peekCell = null, peekX = null, peekTimer = 0, lastPointer = 'mouse';
      var mouseOnBoard = false;     // 마우스 미리보기는 커서를 따라가고, 키보드 · 터치 미리보기는 칸에 붙어 있음

      function cellAt(t) {
        var el = t && t.closest ? t.closest('.taxo__cell[data-grasp]') : null;
        return el && stage.contains(el) ? el : null;
      }

      /* --- 미리보기: 칸 바로 위(위가 모자라면 아래)에 띄워 커서 밑의 칸을 가리지 않는다.
             가로는 포인터를 따라가고 화면 가장자리에서는 안쪽으로 붙는다. .taxo 기준 absolute 라 스크롤해도 같이 움직임 --- */
      function placePeek(el, x) {
        var r = el.getBoundingClientRect(), box = taxoRoot.getBoundingClientRect();
        var w = peekEl.offsetWidth, h = peekEl.offsetHeight, gap = 12;
        var vw = document.documentElement.clientWidth, minTop = (nav ? nav.offsetHeight : 0) + 8;
        if (x == null) x = r.left + r.width / 2;
        var left = Math.max(8, Math.min(x - w / 2, vw - w - 8));
        var top = r.top - gap - h;
        var below = top < minTop && r.bottom + gap + h <= window.innerHeight - 8;
        if (below) top = r.bottom + gap;
        peekEl.classList.toggle('is-below', below);
        peekEl.style.setProperty('--tail', Math.max(14, Math.min(x - left, w - 14)) + 'px');
        peekEl.style.transform = 'translate(' + Math.round(left - box.left) + 'px,' + Math.round(top - box.top) + 'px)';
      }
      function showPeek(el, x) {
        clearTimeout(peekTimer);
        if (el !== peekCell) {
          peekCell = el;
          var cell = current.panel.cells[el.getAttribute('data-rc')];
          peekImg.hidden = !cell.img;
          if (cell.img) peekImg.src = cell.img;
          peekName.textContent = cell.name;
          peekSwatch.style.setProperty('--cell-color', taxColor(cell.taxonomy));
        }
        peekX = x;
        var cta = x == null ? 'Press Enter for the rollout' : 'Click to watch the rollout'; // x 없음 = 키보드 포커스
        if (peekCta && peekCta.textContent !== cta) peekCta.textContent = cta;
        peekEl.classList.toggle('is-current', el === selected); // 이미 재생 중인 칸이면 이 줄을 뺌
        placePeek(el, x);
        peekEl.classList.add('is-on');
      }
      function hidePeek() {
        clearTimeout(peekTimer);
        peekCell = null;
        peekEl.classList.remove('is-on');
      }
      // 처음 보드에 들어올 때 이 패널의 grasp 이미지(칸당 ~8 KB)를 미리 받아 둔다: 칸을 옮길 때 이전 그림이 남지 않게
      function warmStills() {
        if (!current || current.warm) return;
        current.warm = true;
        Object.keys(current.panel.cells).forEach(function (k) {
          if (current.panel.cells[k].img) new Image().src = current.panel.cells[k].img;
        });
      }

      /* --- 패널: 클릭한 칸의 rollout 영상 static/videos/taxonomy/<task>/<emb>/X{행}Y{열}.mp4 (tools/build_rollouts.py).
             클릭한 영상만 받는다. 파일이 없으면 그 칸의 grasp 이미지로 대신 --- */
      function setSelected(el) {
        if (selected) { selected.classList.remove('is-selected'); selected.setAttribute('aria-pressed', 'false'); }
        selected = el;
        if (el) { el.classList.add('is-selected'); el.setAttribute('aria-pressed', 'true'); }
        if (peekCell) showPeek(peekCell, peekX); // 떠 있는 미리보기의 "Click to watch" 줄을 지금 선택에 맞춤
      }
      // fromUser: 클릭 · 탭 · Enter 로 연 경우. ?cell 이나 task · embodiment 전환으로 다시 열 때는 스크롤하지 않음
      function openCell(el, fromUser) {
        var key = el.getAttribute('data-rc'), cell = current.panel.cells[key];
        var r = +key.split(',')[0], c = +key.split(',')[1];
        setSelected(el);
        cardLabel.textContent = cell.name;
        cardSwatch.style.setProperty('--cell-color', taxColor(cell.taxonomy));
        var hasTiles = current.panel.tiles && current.panel.tiles.length > 0;
        cardSub.textContent = 'Row ' + (r + 1) + ' · Column ' + (c + 1) + (cell.zoomed && hasTiles ? '  ·  shown as a tile' : '');
        var src = 'static/videos/taxonomy/' + currentTask + '/' + currentEmb + '/X' + (r + 1) + 'Y' + (c + 1) + '.mp4';
        cardImg.hidden = true;
        cardVideo.hidden = false;
        cardVideo.onerror = function () {
          cardVideo.hidden = true;
          if (cell.img) { cardImg.src = cell.img; cardImg.alt = cell.name; cardImg.hidden = false; }
        };
        if (cardVideo.getAttribute('src') !== src) cardVideo.setAttribute('src', src);
        else cardVideo.currentTime = 0;
        var p = cardVideo.play();
        // 자동 재생이 막힌 브라우저(저전력 모드 등)에서는 재생 버튼을 보여 준다
        if (p && p.catch) p.catch(function (err) { if (err && err.name === 'NotAllowedError') cardVideo.controls = true; });
        card.hidden = false;
        taxoRoot.classList.add('is-open');
        if (!fromUser) return;
        if (how) how.classList.add('is-done'); // 한 번 써 봤으니 사용법 애니메이션은 마지막 장면에서 멈춤
        // 좁은 화면(패널이 보드 아래)에서 패널이 화면 밖으로 잘리면 보이는 만큼만 스크롤
        if (card.getBoundingClientRect().top >= stage.getBoundingClientRect().bottom) {
          card.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      }
      function closePanel() {
        if (card.hidden) return;
        if (selected && card.contains(document.activeElement)) selected.focus();
        cardVideo.pause();
        card.hidden = true;
        taxoRoot.classList.remove('is-open');
        setSelected(null);
      }

      function layoutGrid() {
        if (!current) return;
        var w = current.img.clientWidth, hgt = current.img.clientHeight;
        if (!w || !hgt) return;
        var quad = current.panel.corners.map(function (p) { return [p[0] / 100 * w, p[1] / 100 * hgt]; });
        current.grid.style.transform = matrix3d(squareToQuad(quad), 100);
        // 패널이 열리고 닫히며 보드 크기가 바뀌면: 마우스 미리보기는 숨기고(다음 움직임에 다시 뜸), 키보드 · 터치 미리보기는 칸을 따라감
        if (peekCell) { if (mouseOnBoard) hidePeek(); else placePeek(peekCell, null); }
      }

      function renderPanel(panel) {
        var keep = selected && selected.getAttribute('data-rc'); // 패널이 열려 있었으면 새 판에서도 같은 칸을 이어서 보여 줌
        hidePeek();
        stage.innerHTML = '';
        var img = document.createElement('img');
        img.src = panel.base;
        img.alt = panel.label + ' grasp map';
        img.draggable = false;
        stage.appendChild(img);

        // 대표 타일: 이름(글자 없는 패널 위에 페이지 폰트로) + 누르면 그 칸이 열리는 투명 상자(t.cell = "X{행}Y{열}")
        (panel.tiles || []).forEach(function (t) {
          var lab = document.createElement('div');
          lab.className = 'taxo__tile-label';
          lab.textContent = t.label;
          lab.style.left = t.at[0] + '%';
          lab.style.top = t.at[1] + '%';
          stage.appendChild(lab);
          var xy = /X(\d+)Y(\d+)/.exec(t.cell || '');
          if (!xy) return;
          var hit = document.createElement('div');
          hit.className = 'taxo__tile';
          hit.setAttribute('data-for', (xy[1] - 1) + ',' + (xy[2] - 1)); // 칸의 data-rc 와 섞이지 않게 다른 이름
          hit.setAttribute('aria-hidden', 'true'); // 키보드 · 보조기기는 같은 칸 버튼으로 (중복 Tab 자리를 만들지 않음)
          hit.style.left = t.at[0] + '%';
          hit.style.top = (t.at[1] - 37.2) + '%'; // 타일 위 끝 = 이름 위치보다 그림 높이의 37.2 % 위
          stage.appendChild(hit);
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
              cellEl.setAttribute('tabindex', '-1');
              cellEl.setAttribute('role', 'button');
              cellEl.setAttribute('aria-label', cell.name + ', row ' + (r + 1) + ', column ' + (c + 1));
              cellEl.setAttribute('aria-controls', 'taxo-card');
              cellEl.setAttribute('aria-pressed', 'false');
            }
            grid.appendChild(cellEl);
          }
        }
        stage.appendChild(grid);

        current = { panel: panel, img: img, grid: grid };
        var again = keep && grid.querySelector('.taxo__cell[data-grasp][data-rc="' + keep + '"]');
        var stop = again || grid.querySelector('.taxo__cell[data-grasp]');
        if (stop) stop.setAttribute('tabindex', '0'); // 판 전체가 Tab 한 번 (roving tabindex)
        // 닫았다 다시 열지 않고 내용만 바꿈: 판이 줄었다 늘거나 패널이 다시 미끄러져 들어오지 않게
        if (again) openCell(again, false); else closePanel();
        if (img.complete) layoutGrid(); else img.addEventListener('load', layoutGrid);
      }

      // 칸 이벤트는 stage 에 한 번만 건다 (renderPanel 은 stage 안만 다시 그림)
      stage.addEventListener('pointerdown', function (e) { lastPointer = e.pointerType; });
      stage.addEventListener('pointerenter', warmStills);
      stage.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch') return; // 터치는 탭(click)에서 처리
        mouseOnBoard = true;
        var el = cellAt(e.target);
        if (el) showPeek(el, e.clientX); else hidePeek();
      });
      stage.addEventListener('pointerleave', function (e) { if (e.pointerType !== 'touch') { mouseOnBoard = false; hidePeek(); } });
      stage.addEventListener('click', function (e) {
        var tile = e.target.closest('.taxo__tile');
        var el = tile ? stage.querySelector('.taxo__cell[data-grasp][data-rc="' + tile.getAttribute('data-for') + '"]') : cellAt(e.target);
        if (!el) return;
        openCell(el, true);
        if (tile) return; // 타일은 그 자체가 grasp 그림이라 미리보기 없이 재생만
        showPeek(el, e.detail ? e.clientX : null);
        if (lastPointer === 'touch') peekTimer = setTimeout(hidePeek, 1800); // 터치: 탭한 자리에 잠깐 보여 줌
      });
      var ARROWS = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] };
      stage.addEventListener('keydown', function (e) {
        var el = cellAt(e.target), d = ARROWS[e.key];
        if (!el) return;
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCell(el, true); return; }
        if (!d) return;
        e.preventDefault();
        var rc = el.getAttribute('data-rc').split(',');
        var next = stage.querySelector('.taxo__cell[data-grasp][data-rc="' + (+rc[0] + d[0]) + ',' + (+rc[1] + d[1]) + '"]');
        if (next) next.focus(); // 판 끝에서는 멈춤
      });
      stage.addEventListener('focusin', function (e) {
        warmStills();
        var el = cellAt(e.target);
        if (!el) return;
        var stop = stage.querySelector('.taxo__cell[tabindex="0"]');
        if (stop !== el) { if (stop) stop.setAttribute('tabindex', '-1'); el.setAttribute('tabindex', '0'); } // 마지막으로 간 칸이 Tab 자리
        if (el.matches(':focus-visible')) showPeek(el, null); // 키보드 포커스: 칸에 붙여서
      });
      stage.addEventListener('focusout', function (e) { if (!stage.contains(e.relatedTarget)) hidePeek(); });
      // 휠로 스크롤하면 칸이 커서 밑에서 움직이므로 마우스 미리보기는 숨김 (다음 움직임에 다시 뜸)
      window.addEventListener('scroll', function () { if (peekCell && mouseOnBoard) hidePeek(); }, { passive: true });
      document.getElementById('taxo-card-close').addEventListener('click', closePanel);
      document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        if (!card.hidden) closePanel(); else hidePeek();
      });

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

      // ?cell=행,열 (0부터): 처음부터 그 칸의 패널을 연다 (링크 · 스크린샷용)
      var pre = /[?&]cell=(\d+),(\d+)/.exec(q);
      var preEl = pre && stage.querySelector('.taxo__cell[data-grasp][data-rc="' + pre[1] + ',' + pre[2] + '"]');
      if (preEl) {
        openCell(preEl, false);
      } else if (current && current.panel.cells) {
        // 기본으로 한 칸을 열어 둔다: 대표 칸(rep) → 타일 칸(zoomed) → 첫 칸
        var cellsNow = current.panel.cells, keysNow = Object.keys(cellsNow).sort();
        var defKey = keysNow.filter(function (k) { return cellsNow[k].rep; })[0]
                  || keysNow.filter(function (k) { return cellsNow[k].zoomed; })[0]
                  || keysNow[0];
        var defEl = defKey && stage.querySelector('.taxo__cell[data-grasp][data-rc="' + defKey + '"]');
        if (defEl) openCell(defEl, false);
      }

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
