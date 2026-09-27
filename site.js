// Redline Advisory — shared behaviors
(function () {
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = document.querySelectorAll(".reveal, .rule-anim");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
})();

// Mobile nav toggle
(function () {
  var btn = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-mobile");
  if (!btn || !menu) return;
  function setOpen(open) {
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", open);
  }
  btn.addEventListener("click", function () { setOpen(menu.hidden); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) setOpen(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 760 && !menu.hidden) setOpen(false); });
})();
