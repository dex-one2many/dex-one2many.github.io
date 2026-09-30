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
    Array.prototype.forEach.call(document.querySelectorAll('video[autoplay]'), function (v) {
      v.loop = true;
      v.muted = true;
      v.playsInline = true;
      var tryPlay = function () {
        var p = v.play();
        if (p && typeof p.catch === 'function') p.catch(function () {});
      };
      tryPlay();
      v.addEventListener('ended', function () {
        try { v.currentTime = 0; } catch (e) {}
        tryPlay();
      });
    });

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
