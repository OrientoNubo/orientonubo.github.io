/* blog-lang.js — per-post language switcher.
 * Markup contract:
 *   <div class="lang-switch"><button data-lang="zh-tw" ...>…</button> …</div>
 *   <div class="post-body" data-lang="zh-tw">…</div> …
 * Persists the chosen language in localStorage and restores it when the post
 * actually has that translation. */
(function () {
  "use strict";
  var sw = document.querySelector(".lang-switch");
  if (!sw) return;
  var buttons = [].slice.call(sw.querySelectorAll("button[data-lang]"));
  var bodies = [].slice.call(document.querySelectorAll(".post-body[data-lang]"));
  if (!buttons.length || !bodies.length) return;

  var available = buttons.map(function (b) { return b.dataset.lang; });

  function select(lang) {
    if (available.indexOf(lang) === -1) lang = available[0];
    buttons.forEach(function (b) { b.setAttribute("aria-selected", b.dataset.lang === lang); });
    bodies.forEach(function (body) { body.classList.toggle("active", body.dataset.lang === lang); });
    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem("nubo-blog-lang", lang); } catch (_) {}
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { select(b.dataset.lang); });
  });

  var saved = null;
  try { saved = localStorage.getItem("nubo-blog-lang"); } catch (_) {}
  select(saved && available.indexOf(saved) !== -1 ? saved : available[0]);
})();
