/* ============================================================
   HKTCG — scroll-cinema hero (generated scenes edition)
   Scenes are AI-generated (Higgsfield GPT Image 2) from the
   venue footage — the raw video is NOT used on the site.
   Engine: scroll-driven camera per scene (push/pan) + crossfades,
   native scroll, IO reveals. Flow per the boss's brief:
     1 logo wall — slow push forward, arriving beside the boxed T
     2 slat doors — push through the opening
     3 collectible museum — drift past the red cube
     4 showcase hall — pan 向左向右 across the shelves
     5 grand floor — pull-back reveal, Explore More
   ============================================================ */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hero = document.getElementById("hero");

  /* ---------- scene timeline ----------
     a/b: scroll window (with crossfade overlap)
     cam: {from:{s,x,y}, to:{s,x,y}} — x/y are focal drift in % of
     the stage box, applied as translate; s is scale about center. */
  var SCENES = [
    { id: "sc1", a: 0.00, b: 0.26, cam: { from: { s: 1.02, x: 0, y: 0 },     to: { s: 1.38, x: 6, y: 2 } } },
    { id: "sc2", a: 0.22, b: 0.46, cam: { from: { s: 1.05, x: -2, y: 0 },    to: { s: 1.32, x: -6, y: 1 } } },
    { id: "sc3", a: 0.42, b: 0.64, cam: { from: { s: 1.12, x: 4, y: 1 },     to: { s: 1.26, x: -4, y: -1 } } },
    { id: "sc4", a: 0.60, b: 0.84, cam: { from: { s: 1.22, x: 8, y: 0 },     to: { s: 1.22, x: -8, y: 0 } } },
    { id: "sc5", a: 0.80, b: 1.001, cam: { from: { s: 1.24, x: 0, y: 2 },    to: { s: 1.0, x: 0, y: 0 } } }
  ];
  SCENES.forEach(function (sc) { sc.el = document.getElementById(sc.id); });

  function clamp01(v) { return v < 0 ? 0 : (v > 1 ? 1 : v); }
  function ramp(p, a, b) { return clamp01((p - a) / (b - a)); }
  function ease(t) { return t * t * (3 - 2 * t); }
  var FADE = 0.04; // crossfade width at each window edge

  function heroProgress() {
    if (!hero) return 0;
    var r = hero.getBoundingClientRect();
    var total = r.height - window.innerHeight;
    return total > 0 ? clamp01(-r.top / total) : 0;
  }

  function drawScenes(p) {
    SCENES.forEach(function (sc) {
      if (!sc.el) return;
      var vis = Math.min(ramp(p, sc.a, sc.a + FADE), 1 - ramp(p, sc.b - FADE, sc.b));
      vis = clamp01(vis);
      // keep the first scene up before any scroll, the last at the end
      if (sc.a === 0) vis = Math.max(vis, 1 - ramp(p, sc.b - FADE, sc.b));
      if (sc.b > 1) vis = Math.max(vis, ramp(p, sc.a, sc.a + FADE));
      if (vis <= 0.001) { sc.el.style.opacity = 0; sc.el.style.visibility = "hidden"; return; }
      sc.el.style.visibility = "visible";
      sc.el.style.opacity = vis.toFixed(3);
      var t = ease(ramp(p, sc.a, sc.b));
      var s = sc.cam.from.s + (sc.cam.to.s - sc.cam.from.s) * t;
      var x = sc.cam.from.x + (sc.cam.to.x - sc.cam.from.x) * t;
      var y = sc.cam.from.y + (sc.cam.to.y - sc.cam.from.y) * t;
      sc.el.style.transform = "translate3d(" + x + "%," + y + "%,0) scale(" + s.toFixed(4) + ")";
    });
  }

  /* ---------- overlays keyed to scroll ---------- */
  var overlays = [
    [document.getElementById("ov1"), -0.05, 0.105],
    [document.getElementById("ov2"), 0.115, 0.24],
    [document.getElementById("ov3"), 0.27, 0.42],
    [document.getElementById("ov4"), 0.45, 0.61],
    [document.getElementById("ov5"), 0.64, 0.80],
    [document.getElementById("ov6"), 0.87, 1.01]
  ];
  var hint = document.getElementById("hint");
  var bar = document.getElementById("progress");
  var nav = document.getElementById("nav");

  var ticking = false;
  function update() {
    ticking = false;
    var p = heroProgress();
    drawScenes(p);
    overlays.forEach(function (o) {
      var el = o[0]; if (!el) return;
      var vis = Math.min(ramp(p, o[1], o[1] + 0.035), 1 - ramp(p, o[2] - 0.035, o[2]));
      vis = clamp01(vis);
      el.style.opacity = vis.toFixed(3);
      el.style.transform = "translateY(" + (14 * (1 - vis)) + "px)";
    });
    if (hint) hint.style.opacity = Math.max(0, 1 - ramp(p, 0.01, 0.04)).toFixed(3);

    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  // reduced motion: no film — land on the content with the first scene as poster
  if (reduceMotion && hero) hero.style.height = "100vh";
  update();

  /* ---------- smooth anchor nav ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href"); if (id.length < 2) return;
      var target = document.querySelector(id); if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  /* ---------- IO reveals ---------- */
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
})();
