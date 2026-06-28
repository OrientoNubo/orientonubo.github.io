/* ==========================================================================
 * site.js — behaviour half of nubo-design-style's layout.js, for this site.
 * --------------------------------------------------------------------------
 * The chrome (header / sidebar / overlays) is server-rendered by Eleventy/
 * Nunjucks here, NOT injected by JS. This file keeps only the runtime
 * `window.nubo` API: theme toggle, dynamic accent, focus-trap, modal, drawer,
 * toast / message / notification, lightbox, back-to-top, and sidebar
 * scroll-spy. Markup contract is identical to the design system, so
 * components.js and nubo-design.css work unchanged.
 * ========================================================================== */
(function () {
  "use strict";

  var nubo = (window.nubo = window.nubo || {});

  /* ---- theme toggle（三段式 system / light / dark）-------------------- */
  var themeToggle = document.querySelector(".theme-toggle");
  var prefersDarkMQ = window.matchMedia("(prefers-color-scheme: dark)");
  var themeMode = localStorage.getItem("nubo-theme") || "system";
  function resolveActual(m) { return m === "system" ? (prefersDarkMQ.matches ? "dark" : "light") : m; }
  function applyTheme(m) {
    themeMode = m;
    document.documentElement.setAttribute("data-theme", resolveActual(m));
    if (themeToggle) themeToggle.querySelectorAll("button[data-mode]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.mode === m);
    });
    localStorage.setItem("nubo-theme", m);
  }
  nubo.applyTheme = applyTheme;
  if (themeToggle) themeToggle.querySelectorAll("button[data-mode]").forEach(function (b) {
    b.addEventListener("click", function () { applyTheme(b.dataset.mode); });
  });
  if (prefersDarkMQ.addEventListener) prefersDarkMQ.addEventListener("change", function () { if (themeMode === "system") applyTheme("system"); });
  applyTheme(themeMode);

  /* ---- 動態 accent（依亮度自動黑/白字）------------------------------- */
  var DEFAULT_ACCENT = "#328a97";
  function inkFor(hex) {
    var m = hex.replace("#", "");
    var r = parseInt(m.slice(0, 2), 16), g = parseInt(m.slice(2, 4), 16), b = parseInt(m.slice(4, 6), 16);
    var lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.62 ? "#1a1a1a" : "#ffffff";
  }
  function setAccent(hex) {
    document.documentElement.style.setProperty("--p-accent", hex);
    document.documentElement.style.setProperty("--p-accent-ink", inkFor(hex));
    localStorage.setItem("nubo-accent", hex);
    document.dispatchEvent(new CustomEvent("nubo:accent", { detail: hex }));
  }
  nubo.setAccent = setAccent;
  nubo.inkFor = inkFor;
  nubo.DEFAULT_ACCENT = DEFAULT_ACCENT;
  setAccent(localStorage.getItem("nubo-accent") || DEFAULT_ACCENT);

  /* ---- focus trap（modal / drawer 共用）------------------------------ */
  var lastFocused = null;
  var FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  function trapHandler(container) {
    return function (e) {
      if (e.key !== "Tab") return;
      var list = [].slice.call(container.querySelectorAll(FOCUSABLE)).filter(function (el) { return el.offsetParent !== null; });
      if (!list.length) return;
      var first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
  }
  function openTrap(container, focusEl) {
    if (!container) return;
    lastFocused = document.activeElement;
    container.__trap = trapHandler(container);
    container.addEventListener("keydown", container.__trap);
    requestAnimationFrame(function () { (focusEl || container.querySelector(FOCUSABLE) || container).focus(); });
  }
  function closeTrap(container) {
    if (container && container.__trap) { container.removeEventListener("keydown", container.__trap); container.__trap = null; }
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  /* ---- modal ---------------------------------------------------------- */
  var modalBack = document.getElementById("modalBack");
  var modalBox = modalBack ? modalBack.querySelector(".modal") : null;
  function openModal() { if (!modalBack) return; modalBack.classList.add("open"); openTrap(modalBox); }
  function closeModal() { if (!modalBack || !modalBack.classList.contains("open")) return; modalBack.classList.remove("open"); closeTrap(modalBox); }
  nubo.openModal = openModal; nubo.closeModal = closeModal;
  if (modalBack) {
    modalBack.addEventListener("click", function (e) { if (e.target === modalBack) closeModal(); });
    var mc = document.getElementById("modalCancel"); if (mc) mc.addEventListener("click", closeModal);
    var mo = document.getElementById("modalOk"); if (mo) mo.addEventListener("click", closeModal);
  }

  /* ---- drawer（四方向）----------------------------------------------- */
  var drawer = document.getElementById("drawer"), drawerBack = document.getElementById("drawerBack");
  function openDrawer(side) {
    if (!drawer) return;
    side = side || "right";
    drawer.style.transition = "none";
    drawer.className = "drawer " + side;
    if (drawerBack) drawerBack.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    void drawer.offsetWidth;
    drawer.style.transition = "";
    void drawer.offsetWidth;
    drawer.classList.add("open");
    openTrap(drawer);
  }
  function closeDrawer() {
    if (!drawer || !drawer.classList.contains("open")) return;
    drawer.classList.remove("open"); if (drawerBack) drawerBack.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    closeTrap(drawer);
  }
  nubo.openDrawer = openDrawer; nubo.closeDrawer = closeDrawer;
  if (drawerBack) drawerBack.addEventListener("click", closeDrawer);
  var dClose = document.getElementById("drawerClose"); if (dClose) dClose.addEventListener("click", closeDrawer);

  /* ---- toast ---------------------------------------------------------- */
  var toastHost = document.getElementById("toastHost");
  function toast(msg, kind) {
    if (!toastHost) return;
    var el = document.createElement("div");
    el.className = "toast" + (kind ? " " + kind : "");
    el.innerHTML = '<span class="toast-dot"></span><span></span>';
    el.lastChild.textContent = msg;
    toastHost.appendChild(el);
    setTimeout(function () { el.style.opacity = "0"; el.style.transition = "opacity .25s"; setTimeout(function () { el.remove(); }, 260); }, 2600);
  }
  nubo.toast = toast;

  /* ---- message（頂部置中）-------------------------------------------- */
  var MSG_ICONS = {
    success: '<svg class="m-ico" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>',
    error:   '<svg class="m-ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>',
    warn:    '<svg class="m-ico" viewBox="0 0 24 24"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><path d="M12 9v4M12 17h.01"/></svg>',
    info:    '<svg class="m-ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
    loading: '<span class="m-spin"></span>'
  };
  var messageHost = document.getElementById("messageHost");
  function message(msg, kind, duration) {
    if (!messageHost) return function () {};
    kind = kind || "info";
    var el = document.createElement("div");
    el.className = "message " + kind;
    el.innerHTML = (MSG_ICONS[kind] || MSG_ICONS.info) + "<span></span>";
    el.lastChild.textContent = msg;
    messageHost.appendChild(el);
    var dismiss = function () { el.classList.add("leaving"); setTimeout(function () { el.remove(); }, 220); };
    if (kind !== "loading") setTimeout(dismiss, duration || 2600);
    return dismiss;
  }
  nubo.message = message;

  /* ---- notification（右上角）----------------------------------------- */
  var NOTIF_ICONS = {
    success: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
    error:   '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>',
    warn:    '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><path d="M12 9v4M12 17h.01"/>',
    info:    '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>'
  };
  var notifHost = document.getElementById("notificationHost");
  function notify(opts) {
    if (!notifHost) return;
    opts = opts || {};
    var kind = opts.type || "info";
    var el = document.createElement("div");
    el.className = "notification " + kind;
    el.innerHTML =
      '<svg class="n-ico" viewBox="0 0 24 24">' + (NOTIF_ICONS[kind] || NOTIF_ICONS.info) + '</svg>' +
      '<div class="n-body"><div class="n-title"></div><div class="n-desc"></div></div>' +
      '<button class="n-close" aria-label="Close">&times;</button>';
    el.querySelector(".n-title").textContent = opts.title || "Notice";
    el.querySelector(".n-desc").textContent = opts.desc || "";
    notifHost.appendChild(el);
    var dismiss = function () { el.classList.add("leaving"); setTimeout(function () { el.remove(); }, 220); };
    el.querySelector(".n-close").addEventListener("click", dismiss);
    setTimeout(dismiss, opts.duration || 4200);
  }
  nubo.notify = notify;

  /* ---- lightbox ------------------------------------------------------- */
  var lightbox = document.getElementById("lightbox");
  var lbContent = document.getElementById("lbContent");
  function openLightbox(node) {
    if (!lightbox || !lbContent) return;
    lbContent.innerHTML = "";
    lbContent.appendChild(node.cloneNode(true));
    lightbox.classList.add("open");
  }
  function closeLightbox() { if (lightbox) lightbox.classList.remove("open"); }
  nubo.lightbox = openLightbox;
  if (lightbox) {
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
    var lbc = document.getElementById("lbClose"); if (lbc) lbc.addEventListener("click", closeLightbox);
  }

  /* ---- Esc 關閉所有 overlay ------------------------------------------- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeModal(); closeDrawer(); closeLightbox(); }
  });

  /* ---- backTop -------------------------------------------------------- */
  var backTop = document.getElementById("backTop");
  if (backTop) {
    backTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    var onScroll = function () { backTop.classList.toggle("show", window.scrollY > 320); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  /* ---- sidebar 子錨點 scroll-spy ------------------------------------- */
  var spyLinks = [].slice.call(document.querySelectorAll(".sidebar a[data-spy]"));
  if (spyLinks.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          spyLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("data-spy") === en.target.id); });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    spyLinks.forEach(function (a) {
      var sec = document.getElementById(a.getAttribute("data-spy"));
      if (sec) spy.observe(sec);
    });
  }

  /* ---- reveal-on-scroll（[data-reveal] → .in）------------------------ */
  var revealEls = [].slice.call(document.querySelectorAll("[data-reveal]"));
  if (revealEls.length && "IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }
})();
