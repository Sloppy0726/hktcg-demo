/* ============================================================
   HKTCG — one-shot scroll-film hero
   Continuous walkthrough frames scrubbed by native scroll.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- scroll-scrub canvases ---------- */
  var COUNT = window.__FRAME_COUNT || 387;
  var PREFIX = window.__FRAME_PREFIX || "assets/walk/walk-";
  var EXT = window.__FRAME_EXT || ".jpg";
  var PAD = window.__FRAME_PAD || 4;
  var hero = document.getElementById("hero");
  var film = document.getElementById("film");
  var frames = [];
  var anyLoaded = false;
  var dpr = Math.min(2, window.devicePixelRatio || 1);

  function frameUrl(i) {
    return PREFIX + String(i + 1).padStart(PAD, "0") + EXT;
  }

  function makeSurface(canvas) {
    if (!canvas) return null;
    var ctx = canvas.getContext("2d");
    if (!ctx) return null;
    return { canvas: canvas, ctx: ctx, cw: 0, ch: 0 };
  }

  var surfaces = [makeSurface(film)].filter(Boolean);

  function resizeSurface(surface) {
    var canvas = surface.canvas;
    surface.cw = canvas.clientWidth;
    surface.ch = canvas.clientHeight;
    canvas.width = Math.round(surface.cw * dpr);
    canvas.height = Math.round(surface.ch * dpr);
    surface.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    surface.ctx.imageSmoothingEnabled = true;
    surface.ctx.imageSmoothingQuality = "high";
  }

  function resize() {
    surfaces.forEach(resizeSurface);
  }

  function clearSurface(surface) {
    surface.ctx.clearRect(0, 0, surface.cw, surface.ch);
  }

  function blit(surface, img, alpha) {
    if (!img || !img.complete || !img.naturalWidth || !surface.cw || !surface.ch) return;
    var scale = Math.max(surface.cw / img.naturalWidth, surface.ch / img.naturalHeight);
    var w = img.naturalWidth * scale;
    var h = img.naturalHeight * scale;
    var x = (surface.cw - w) / 2;
    var y = (surface.ch - h) / 2;
    surface.ctx.globalAlpha = alpha;
    surface.ctx.drawImage(img, x, y, w, h);
    surface.ctx.globalAlpha = 1;
  }

  function ok(i) {
    return i >= 0 && i < COUNT && frames[i] && frames[i].complete && frames[i].naturalWidth;
  }

  function nearest(i) {
    if (ok(i)) return i;
    for (var d = 1; d < COUNT; d++) {
      if (ok(i - d)) return i - d;
      if (ok(i + d)) return i + d;
    }
    return -1;
  }

  function render(fi) {
    if (!surfaces.length) return;
    var i0 = Math.floor(fi);
    var frac = fi - i0;
    var i1 = Math.min(COUNT - 1, i0 + 1);
    var base = nearest(i0);
    if (base < 0) return;

    surfaces.forEach(clearSurface);
    surfaces.forEach(function (surface) { blit(surface, frames[base], 1); });
    if (frac > 0.01 && base === i0 && ok(i1)) {
      surfaces.forEach(function (surface) { blit(surface, frames[i1], frac); });
    }
  }

  if (surfaces.length) {
    resize();
    for (var i = 0; i < COUNT; i++) {
      var img = new Image();
      img.decoding = "async";
      img.onload = function () {
        anyLoaded = true;
        update();
      };
      img.src = frameUrl(i);
      frames[i] = img;
    }
  }

  function heroProgress() {
    if (!hero) return 0;
    var r = hero.getBoundingClientRect();
    var total = r.height - window.innerHeight;
    return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
  }

  /* ---------- reel UI keyed to scroll ---------- */
  var hint = document.getElementById("hint");
  var bar = document.getElementById("progress");
  var nav = document.getElementById("nav");
  var beats = Array.prototype.slice.call(document.querySelectorAll("[data-beat]"));
  var segments = Array.prototype.slice.call(document.querySelectorAll(".story-segment"));

  function setReelState(p) {
    var total = Math.max(beats.length, segments.length, 1);
    var active = Math.min(total - 1, Math.floor(p * total));

    beats.forEach(function (beat, i) {
      beat.classList.toggle("active", i === active);
    });

    segments.forEach(function (segment, i) {
      var start = i / segments.length;
      var end = (i + 1) / segments.length;
      var fill = p >= end ? 1 : p <= start ? 0 : (p - start) / (end - start);
      segment.style.setProperty("--fill", fill.toFixed(3));
    });

  }

  var ticking = false;
  function update() {
    ticking = false;
    var p = heroProgress();
    if (anyLoaded) render(p * (COUNT - 1));
    setReelState(p);

    if (hint) hint.style.opacity = Math.max(0, 1 - Math.min(1, Math.max(0, (p - 0.01) / 0.04))).toFixed(3);

    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
    if (nav) {
      var heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      nav.classList.toggle("scrolled", hero ? heroBottom <= 80 : window.scrollY > 40);
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () {
    resize();
    onScroll();
  }, { passive: true });

  if (reduceMotion && hero) hero.style.height = "100vh";
  update();

  /* ---------- smooth anchor nav ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  /* ---------- IO reveals ---------- */
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
})();
