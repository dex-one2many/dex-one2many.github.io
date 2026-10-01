/* =========================================================
   정량 결과 차트 (SVG, 의존성 없음)
   데이터: static/js/results-data.js (window.RESULTS_DATA)
   구조:  [legend]
          [Simulation 패널 | Real World 패널]   ← 좁은 화면에서는 세로
            각 패널: Unseen(크게) / Seen(작게) 두 행의 묶음 막대
          [Show table] 토글 → 표 보기
   ========================================================= */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) if (attrs.hasOwnProperty(k)) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function h(tag, cls, parent, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    if (parent) parent.appendChild(n);
    return n;
  }
  function fmt(v) { return v == null ? 'N/A' : Math.round(v) + '%'; }

  document.addEventListener('DOMContentLoaded', function () {
    var D = window.RESULTS_DATA;
    var root = document.getElementById('results-chart');
    if (!D || !root) return;
    root.innerHTML = '';

    /* ---------- legend ---------- */
    var legend = h('div', 'rchart__legend', root);
    D.methods.forEach(function (m) {
      var item = h('span', 'rchart__key', legend);
      var sw = h('i', 'rchart__swatch', item);
      sw.style.background = m.color;
      h('span', null, item, m.label);
    });

    /* ---------- tooltip (하나를 공유) ---------- */
    var tip = h('div', 'rchart__tip', root);
    tip.setAttribute('role', 'tooltip');
    tip.hidden = true;
    function showTip(target, text) {
      tip.textContent = text;
      tip.hidden = false;
      var rb = root.getBoundingClientRect(), tb = target.getBoundingClientRect();
      var x = tb.left + tb.width / 2 - rb.left, y = tb.top - rb.top;
      tip.style.left = x + 'px';
      tip.style.top = y + 'px';
    }
    function hideTip() { tip.hidden = true; }

    /* ---------- panels ---------- */
    var grid = h('div', 'rchart__grid', root);
    var rows = []; // 다시 그릴 행 목록 {svg, domain, split, height}

    D.domains.forEach(function (dom) {
      var panel = h('section', 'rchart__panel', grid);
      h('h4', 'rchart__panel-title', panel, dom.label);
      D.splits.forEach(function (sp) {
        var row = h('div', 'rchart__row' + (sp.primary ? ' rchart__row--primary' : ''), panel);
        var head = h('div', 'rchart__row-head', row);
        h('div', 'rchart__row-title', head, sp.label);
        var svg = el('svg', { class: 'rchart__svg', role: 'img',
          'aria-label': dom.label + ', ' + sp.label + ': success rate per task for ' + D.methods.map(function (m) { return m.label; }).join(', ') }, row);
        rows.push({ svg: svg, dom: dom, sp: sp, height: sp.primary ? 210 : 140 });
      });
    });

    /* ---------- 한 행 그리기 ---------- */
    function drawRow(r) {
      var svg = r.svg;
      var W = svg.clientWidth || svg.parentNode.clientWidth || 500;
      var H = r.height;
      var M = { l: 38, r: 6, t: 18, b: 24 };
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      svg.setAttribute('width', W); svg.setAttribute('height', H);
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      var pw = W - M.l - M.r, ph = H - M.t - M.b;
      var y = function (v) { return M.t + ph - (v / 100) * ph; };

      // gridlines (hairline, solid) + y labels
      [0, 25, 50, 75, 100].forEach(function (v) {
        el('line', { x1: M.l, x2: W - M.r, y1: y(v), y2: y(v),
          stroke: v === 0 ? '#c3c2b7' : '#e5e7eb', 'stroke-width': 1, 'shape-rendering': 'crispEdges' }, svg);
        if (v % 50 === 0) {
          var t = el('text', { x: M.l - 6, y: y(v) + 3.5, 'text-anchor': 'end', class: 'rchart__tick' }, svg);
          t.textContent = v + '%';
        }
      });

      var n = D.tasks.length, k = D.methods.length;
      var gw = pw / n;                       // task 묶음 폭
      var gap = 2;                           // 막대 사이 표면 간격
      var bw = Math.min(24, Math.max(6, (gw * 0.72 - gap * (k - 1)) / k));
      var groupW = bw * k + gap * (k - 1);

      D.tasks.forEach(function (task, ti) {
        var gx = M.l + gw * ti + (gw - groupW) / 2;
        var vals = D.values[r.dom.key][r.sp.key][task];

        // task label
        var tl = el('text', { x: M.l + gw * ti + gw / 2, y: H - 7, 'text-anchor': 'middle', class: 'rchart__xlabel' }, svg);
        tl.textContent = task;

        D.methods.forEach(function (m, mi) {
          var v = vals[mi];
          var x = gx + mi * (bw + gap);
          var y0 = y(0);
          if (v == null) {
            if (bw >= 15) {
              var na = el('text', { x: x + bw / 2, y: y0 - 4, 'text-anchor': 'middle', class: 'rchart__na' }, svg);
              na.textContent = 'N/A';
            }
          } else {
            var top = y(v);
            var hgt = y0 - top;
            if (hgt < 2) { top = y0 - 2; hgt = 2; } // 0% 도 식별 가능한 2px 스텁
            var rr = Math.min(4, hgt / 2, bw / 2);
            // 위만 둥근 막대(아래는 baseline 에 각지게)
            var d = 'M' + x + ' ' + y0 +
                    ' V' + (top + rr) +
                    ' Q' + x + ' ' + top + ' ' + (x + rr) + ' ' + top +
                    ' H' + (x + bw - rr) +
                    ' Q' + (x + bw) + ' ' + top + ' ' + (x + bw) + ' ' + (top + rr) +
                    ' V' + y0 + ' Z';
            el('path', { d: d, fill: m.color }, svg);
            // 모든 막대 위에 success rate 표기. 막대가 너무 좁은(모바일) 경우에는 숫자가 겹치므로 Ours 만 표기
            if (bw >= 15 || m.emphasis) {
              var lab = el('text', { x: x + bw / 2, y: top - 4, 'text-anchor': 'middle', class: 'rchart__value' }, svg);
              lab.textContent = v;
            }
          }
          // hover/focus 대상: 막대보다 넓고 전체 높이
          var hit = el('rect', { x: x - gap / 2, y: M.t, width: bw + gap, height: ph, fill: 'transparent',
            tabindex: 0, class: 'rchart__hit', 'aria-label': m.label + ', ' + task + ': ' + fmt(v) }, svg);
          var text = m.label + ' · ' + task + ' · ' + fmt(v);
          hit.addEventListener('mouseenter', function () { showTip(hit, text); });
          hit.addEventListener('mouseleave', hideTip);
          hit.addEventListener('focus', function () { showTip(hit, text); });
          hit.addEventListener('blur', hideTip);
        });
      });
    }

    function drawAll() { rows.forEach(drawRow); }
    drawAll();
    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(function () { drawAll(); });
      ro.observe(grid);
    } else {
      window.addEventListener('resize', drawAll);
    }

  });
})();
