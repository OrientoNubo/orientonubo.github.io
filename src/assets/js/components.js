/* ==========================================================================
 * nubo-design-style — 元件互動 components.js
 * --------------------------------------------------------------------------
 * 依「元素是否存在」自動綁定，缺少的元件會被略過，因此每個頁面只放需要的
 * 元件即可，不必客製腳本。回饋類（toast / message / notify / modal / drawer /
 * lightbox）由 layout.js 提供於 window.nubo，這裡負責頁面元件的互動行為。
 * ========================================================================== */
(function () {
  "use strict";
  var nubo = window.nubo || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };

  /* ---- 程式碼語法高亮（highlight.js）-------------------------------- */
  if (window.hljs) {
    hljs.highlightAll();
    if (hljs.initLineNumbersOnLoad) hljs.initLineNumbersOnLoad();
  }

  /* ---- 動態 Accent 調整器（general 頁色票區）-----------------------
     支援多種輸入：色票選擇器、以及文字框輸入 hex / rgb() / hsl() / 色名。
     任意 CSS 顏色字串都先正規化成 hex 再套用（--p-accent 用 hex 配合 color-mix）。 */
  var accentPicker = $("#accentPicker");
  if (accentPicker) {
    var accentText = $("#accentText"), accentSwatchVal = $("#accentSwatchVal");
    var curAccent = function () { return getComputedStyle(document.documentElement).getPropertyValue("--p-accent").trim() || "#328a97"; };
    /* 任意 CSS 顏色字串 → #rrggbb；無效回 null（用瀏覽器原生解析驗證）*/
    var toHex = function (input) {
      input = String(input).trim();
      if (!input) return null;
      var probe = document.createElement("div");
      probe.style.color = "";
      probe.style.color = input;
      if (probe.style.color === "") return null;          // 瀏覽器不認得 → 無效
      probe.style.display = "none";
      document.body.appendChild(probe);
      var rgb = getComputedStyle(probe).color;            // → "rgb(r, g, b)" / "rgba(...)"
      document.body.removeChild(probe);
      var m = rgb.match(/\d+(\.\d+)?/g);
      if (!m || m.length < 3) return null;
      return "#" + m.slice(0, 3).map(function (n) { return ("0" + Math.round(+n).toString(16)).slice(-2); }).join("");
    };
    var paintAccent = function (hex) {
      accentPicker.value = hex;
      if (accentText && document.activeElement !== accentText) accentText.value = hex;  // 輸入中不打斷
      if (accentSwatchVal) accentSwatchVal.textContent = "--p-accent · " + hex;
    };
    accentPicker.addEventListener("input", function () { if (nubo.setAccent) nubo.setAccent(accentPicker.value); });
    if (accentText) {
      accentText.addEventListener("input", function () {            // 邊打邊套用（有效才套）
        var hex = toHex(accentText.value);
        if (hex && nubo.setAccent) nubo.setAccent(hex);
      });
      accentText.addEventListener("change", function () {           // 失焦：無效則還原、有效則正規化成 hex
        var hex = toHex(accentText.value);
        if (hex && nubo.setAccent) nubo.setAccent(hex);
        accentText.value = curAccent();
      });
    }
    var reset = $("#accentReset");
    if (reset) reset.addEventListener("click", function () { if (nubo.setAccent) nubo.setAccent(nubo.DEFAULT_ACCENT || "#328a97"); });
    document.addEventListener("nubo:accent", function (e) { paintAccent(e.detail); });
    paintAccent(curAccent());
  }

  /* ---- Tabs / Segmented：切換選中態 + 內容面板 ---------------------- */
  $$("[data-tabs]").forEach(function (group) {
    var btns = $$("button[data-target]", group);
    var attr = group.classList.contains("segmented") ? "aria-pressed" : "aria-selected";
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        btns.forEach(function (b) { b.setAttribute(attr, b === btn ? "true" : "false"); });
        btns.forEach(function (b) {
          var p = document.getElementById(b.dataset.target);
          if (p) p.classList.toggle("active", b === btn);
        });
      });
    });
  });

  /* ---- Line tabs（.tabbar）滑動 ink bar ----------------------------- */
  $$(".tabbar").forEach(function (bar) {
    var ink = $(".tab-ink", bar);
    if (!ink) { ink = document.createElement("span"); ink.className = "tab-ink"; bar.appendChild(ink); }
    var moveInk = function () {
      var active = $('.tab[aria-selected="true"]', bar) || $(".tab", bar);
      if (!active) return;
      ink.style.left = active.offsetLeft + "px";
      ink.style.width = active.offsetWidth + "px";
    };
    $$(".tab", bar).forEach(function (t) { t.addEventListener("click", moveInk); });
    moveInk();
    window.addEventListener("resize", moveInk);
  });

  /* ---- Pagination ---------------------------------------------------- */
  $$(".pagination").forEach(function (pg) {
    $$("button", pg).forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.disabled || !/^\d+$/.test(b.textContent.trim())) return;
        $$("button", pg).forEach(function (x) { x.removeAttribute("aria-current"); });
        b.setAttribute("aria-current", "page");
      });
    });
  });

  /* ---- 內容區 dropdown / popover（點擊切換、點外部關閉）------------- */
  var contentMenus = $$(".content .menu, .page .menu");
  contentMenus.forEach(function (menu) {
    var btn = menu.querySelector("button");
    var pop = menu.querySelector(".menu-pop, .popover");
    if (!btn || !pop) return;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = pop.classList.toggle("open");
      if (btn.hasAttribute("aria-expanded")) btn.setAttribute("aria-expanded", open);
    });
  });
  document.addEventListener("click", function () {
    contentMenus.forEach(function (m) {
      var p = m.querySelector(".menu-pop, .popover");
      if (p) p.classList.remove("open");
    });
  });

  /* ---- Popconfirm ---------------------------------------------------- */
  $$(".popconfirm").forEach(function (pc) {
    var trigger = pc.querySelector(".pc-trigger") || pc.querySelector("button");
    var ok = pc.querySelector(".pc-ok"), cancel = pc.querySelector(".pc-cancel");
    if (trigger) trigger.addEventListener("click", function (e) { e.stopPropagation(); pc.classList.toggle("open"); });
    if (cancel) cancel.addEventListener("click", function () { pc.classList.remove("open"); });
    if (ok) ok.addEventListener("click", function () {
      pc.classList.remove("open");
      if (nubo.message) nubo.message(pc.dataset.okMsg || "已刪除", "success");
    });
    document.addEventListener("click", function (e) { if (!pc.contains(e.target)) pc.classList.remove("open"); });
  });

  /* ---- Range 即時數值 ----------------------------------------------- */
  $$('input[type="range"][data-out]').forEach(function (r) {
    var out = document.getElementById(r.dataset.out);
    var sync = function () { if (out) out.textContent = r.value; };
    r.addEventListener("input", sync); sync();
  });

  /* ---- Chip / Tag 移除 ---------------------------------------------- */
  $$(".chip .x, .tag .x").forEach(function (x) {
    x.addEventListener("click", function (e) {
      var host = e.currentTarget.closest(".chip, .tag");
      if (host) host.remove();
    });
  });

  /* ---- 觸發器：modal / drawer / toast / message / notification ------ */
  $$("[data-action]").forEach(function (b) {
    b.addEventListener("click", function () {
      var a = b.dataset.action;
      if (a === "modal" && nubo.openModal) nubo.openModal();
      else if (a === "toast" && nubo.toast) nubo.toast(b.dataset.text || "這是一則 Toast 通知", b.dataset.kind);
      else if (a === "message" && nubo.message) nubo.message(b.dataset.text || "操作完成", b.dataset.kind || "info");
      else if (a === "notify" && nubo.notify) nubo.notify({ type: b.dataset.kind || "info", title: b.dataset.title || "通知", desc: b.dataset.text || "" });
    });
  });
  $$("[data-drawer]").forEach(function (b) {
    b.addEventListener("click", function () { if (nubo.openDrawer) nubo.openDrawer(b.dataset.drawer); });
  });

  /* ---- Dropzone + Upload list --------------------------------------- */
  $$(".dropzone").forEach(function (drop) {
    var input = drop.dataset.input ? document.getElementById(drop.dataset.input) : drop.parentElement.querySelector('input[type="file"]');
    var list = drop.dataset.list ? document.getElementById(drop.dataset.list) : null;
    var fmt = function (n) { return n < 1024 ? n + " B" : n < 1048576 ? (n / 1024).toFixed(1) + " KB" : (n / 1048576).toFixed(1) + " MB"; };
    var addItem = function (name, size) {
      if (!list) return;
      var el = document.createElement("div");
      el.className = "upload-item";
      el.innerHTML =
        '<svg class="u-ico" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>' +
        '<span class="u-name"></span><span class="u-size">' + fmt(size) + '</span>' +
        '<span class="u-bar"><i></i></span>' +
        '<button class="u-x" aria-label="移除"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>';
      el.querySelector(".u-name").textContent = name;
      list.appendChild(el);
      el.querySelector(".u-x").addEventListener("click", function () { el.remove(); });
      var bar = el.querySelector(".u-bar i"), p = 0;
      var t = setInterval(function () {
        p += Math.random() * 28 + 8; if (p >= 100) { p = 100; clearInterval(t); el.classList.add("done"); }
        bar.style.width = p + "%";
      }, 180);
    };
    var handleFiles = function (files) { [].slice.call(files).forEach(function (f) { addItem(f.name, f.size); }); };
    if (input) {
      drop.addEventListener("click", function () { input.click(); });
      input.addEventListener("change", function () { handleFiles(input.files); });
    }
    ["dragenter", "dragover"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add("drag"); }); });
    ["dragleave", "drop"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove("drag"); }); });
    drop.addEventListener("drop", function (e) { if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files); });
  });

  /* ---- Rating（星等）------------------------------------------------ */
  $$(".rating").forEach(function (root) {
    var stars = $$(".star", root);
    var out = root.dataset.out ? document.getElementById(root.dataset.out) : null;
    var paint = function (n) { stars.forEach(function (s) { s.classList.toggle("on", +s.dataset.v <= n); }); };
    var current = stars.filter(function (s) { return s.classList.contains("on"); }).length;
    stars.forEach(function (s) {
      s.addEventListener("mouseenter", function () { paint(+s.dataset.v); });
      s.addEventListener("click", function () { current = +s.dataset.v; paint(current); if (out) out.textContent = current + " / 5"; });
    });
    root.addEventListener("mouseleave", function () { paint(current); });
  });

  /* ---- Stepper / Steps（上一步 / 下一步）---------------------------- */
  $$("[data-stepper]").forEach(function (wrap) {
    var steps = $$(".step", wrap);
    var prev = wrap.querySelector(".step-prev"), next = wrap.querySelector(".step-next");
    var cur = Math.max(0, steps.findIndex ? steps.findIndex(function (s) { return s.classList.contains("active"); }) : 0);
    if (cur < 0) cur = 0;
    var render = function () {
      steps.forEach(function (st, i) {
        st.classList.toggle("done", i < cur);
        st.classList.toggle("active", i === cur);
        var dot = st.querySelector(".s-dot");
        if (dot) dot.textContent = i < cur ? "✓" : (i + 1);
      });
    };
    if (next) next.addEventListener("click", function () { if (cur < steps.length - 1) { cur++; render(); } });
    if (prev) prev.addEventListener("click", function () { if (cur > 0) { cur--; render(); } });
    render();
  });

  /* ---- Tree（展開 / 選取 / 勾選傳遞）-------------------------------- */
  $$(".tree").forEach(function (tree) {
    $$(".caret", tree).forEach(function (c) {
      c.addEventListener("click", function (e) {
        e.stopPropagation();
        var li = c.closest("li"); if (li && li.querySelector("ul")) li.classList.toggle("collapsed");
      });
    });
    $$(".tree-node", tree).forEach(function (node) {
      node.addEventListener("click", function (e) {
        if (e.target.closest(".caret") || e.target.closest('input[type="checkbox"]')) return;
        $$(".tree-node.selected", tree).forEach(function (n) { n.classList.remove("selected"); });
        node.classList.add("selected");
        var li = node.closest("li"); if (li && li.querySelector("ul")) li.classList.toggle("collapsed");
      });
    });
    $$('input[type="checkbox"]', tree).forEach(function (cb) {
      cb.addEventListener("change", function () {
        var li = cb.closest("li");
        $$('input[type="checkbox"]', li).forEach(function (child) { child.checked = cb.checked; child.indeterminate = false; });
        var p = li.parentElement.closest("li");
        while (p) {
          var parentCb = p.querySelector(":scope > .tree-node input[type=checkbox]");
          var kids = $$(":scope > ul > li > .tree-node input[type=checkbox]", p);
          var on = kids.filter(function (k) { return k.checked; }).length;
          if (parentCb) { parentCb.checked = on === kids.length && kids.length > 0; parentCb.indeterminate = on > 0 && on < kids.length; }
          p = p.parentElement.closest("li");
        }
      });
    });
  });

  /* ---- Transfer（穿梭框）------------------------------------------- */
  $$(".transfer").forEach(function (tr) {
    var source = tr.querySelector('[data-side="source"] .transfer-body');
    var target = tr.querySelector('[data-side="target"] .transfer-body');
    var toTarget = tr.querySelector(".tr-to-target"), toSource = tr.querySelector(".tr-to-source");
    var countSel = function (body) { return $$('.transfer-item input:checked', body).length; };
    var updateHeads = function () {
      $$(".transfer-panel", tr).forEach(function (p) {
        var body = p.querySelector(".transfer-body"), head = p.querySelector(".transfer-head .tr-count");
        if (head) head.textContent = $$(".transfer-item", body).length + " 項";
      });
    };
    var move = function (from, to) {
      $$(".transfer-item", from).forEach(function (it) {
        var cb = it.querySelector("input"); if (cb && cb.checked) { cb.checked = false; to.appendChild(it); }
      });
      updateHeads();
    };
    if (toTarget) toTarget.addEventListener("click", function () { move(source, target); });
    if (toSource) toSource.addEventListener("click", function () { move(target, source); });
    updateHeads();
  });

  /* ---- Cascader（多欄級聯）----------------------------------------- */
  var CASCADER_DATA = [
    { label: "台灣 Taiwan", children: [
      { label: "台北市", children: [{ label: "中正區" }, { label: "大安區" }, { label: "信義區" }] },
      { label: "新北市", children: [{ label: "板橋區" }, { label: "新店區" }] },
      { label: "台中市", children: [{ label: "西屯區" }, { label: "北區" }] }
    ] },
    { label: "日本 Japan", children: [
      { label: "東京都", children: [{ label: "新宿區" }, { label: "澀谷區" }] },
      { label: "大阪府", children: [{ label: "北區" }, { label: "中央區" }] }
    ] }
  ];
  $$(".cascader").forEach(function (cas) {
    var trigger = cas.querySelector(".cascader-trigger"), pop = cas.querySelector(".cascader-pop");
    var label = cas.querySelector(".cas-label");
    if (!trigger || !pop) return;
    var path = [];
    var renderCols = function () {
      pop.innerHTML = "";
      var level = CASCADER_DATA, depth = 0;
      while (level && level.length) {
        var col = document.createElement("div"); col.className = "cascader-col";
        (function (lvl, d) {
          lvl.forEach(function (opt) {
            var o = document.createElement("div");
            o.className = "cascader-opt" + (path[d] && path[d].label === opt.label ? " active" : "");
            o.innerHTML = "<span></span>" + (opt.children ? '<span class="arr">›</span>' : "");
            o.firstChild.textContent = opt.label;
            o.addEventListener("click", function (e) {
              e.stopPropagation();
              path = path.slice(0, d); path[d] = opt;
              if (opt.children) { renderCols(); }
              else {
                if (label) { label.textContent = path.map(function (p) { return p.label; }).join(" / "); label.classList.remove("cas-ph"); }
                cas.classList.remove("open"); renderCols();
              }
            });
            col.appendChild(o);
          });
        })(level, depth);
        pop.appendChild(col);
        level = path[depth] && path[depth].children ? path[depth].children : null;
        depth++;
      }
    };
    trigger.addEventListener("click", function (e) { e.stopPropagation(); cas.classList.toggle("open"); renderCols(); });
    document.addEventListener("click", function (e) { if (!cas.contains(e.target)) cas.classList.remove("open"); });
  });

  /* ---- DatePicker / Calendar（單日 + 區間）------------------------- */
  var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
  var fmtDate = function (d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); };
  var sameDay = function (a, b) { return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); };
  $$(".datepicker").forEach(function (dp) {
    var input = dp.querySelector(".dp-input");
    var mode = dp.dataset.mode || "single";
    var cal = document.createElement("div"); cal.className = "calendar"; dp.appendChild(cal);
    var view = new Date(); view.setDate(1);
    var sel = null, rStart = null, rEnd = null;
    var today = new Date();
    var DOW = ["日", "一", "二", "三", "四", "五", "六"];
    function render() {
      var y = view.getFullYear(), m = view.getMonth();
      var first = new Date(y, m, 1).getDay();
      var days = new Date(y, m + 1, 0).getDate();
      var prevDays = new Date(y, m, 0).getDate();
      var html =
        '<div class="cal-head"><div class="cal-nav"><button class="cal-prev" aria-label="上個月">‹</button></div>' +
        '<div class="cal-title">' + y + " 年 " + (m + 1) + " 月</div>" +
        '<div class="cal-nav"><button class="cal-next" aria-label="下個月">›</button></div></div><div class="cal-grid">';
      DOW.forEach(function (d) { html += '<div class="dow">' + d + "</div>"; });
      for (var i = 0; i < 42; i++) {
        var dayNum, cls = "cal-cell", cellDate, out = false;
        if (i < first) { dayNum = prevDays - first + 1 + i; cellDate = new Date(y, m - 1, dayNum); cls += " out"; out = true; }
        else if (i - first + 1 <= days) { dayNum = i - first + 1; cellDate = new Date(y, m, dayNum); }
        else { dayNum = i - first + 1 - days; cellDate = new Date(y, m + 1, dayNum); cls += " out"; out = true; }
        if (!out) {
          if (sameDay(cellDate, today)) cls += " today";
          if (mode === "single" && sameDay(cellDate, sel)) cls += " selected";
          if (mode === "range") {
            if (sameDay(cellDate, rStart)) cls += " range-start";
            if (sameDay(cellDate, rEnd)) cls += " range-end";
            if (rStart && rEnd && cellDate > rStart && cellDate < rEnd) cls += " in-range";
          }
        }
        html += '<div class="' + cls + '" data-ts="' + cellDate.getTime() + '">' + dayNum + "</div>";
      }
      html += "</div>";
      cal.innerHTML = html;
      cal.querySelector(".cal-prev").addEventListener("click", function (e) { e.stopPropagation(); view.setMonth(view.getMonth() - 1); render(); });
      cal.querySelector(".cal-next").addEventListener("click", function (e) { e.stopPropagation(); view.setMonth(view.getMonth() + 1); render(); });
      $$(".cal-cell:not(.out)", cal).forEach(function (cell) {
        cell.addEventListener("click", function (e) {
          e.stopPropagation();
          var d = new Date(+cell.dataset.ts);
          if (mode === "single") { sel = d; input.value = fmtDate(d); dp.classList.remove("open"); }
          else {
            if (!rStart || (rStart && rEnd)) { rStart = d; rEnd = null; }
            else { if (d < rStart) { rEnd = rStart; rStart = d; } else rEnd = d; input.value = fmtDate(rStart) + " ～ " + fmtDate(rEnd); }
            if (rStart && !rEnd) input.value = fmtDate(rStart) + " ～ …";
            if (rStart && rEnd) dp.classList.remove("open");
          }
          render();
        });
      });
    }
    input.addEventListener("click", function (e) { e.stopPropagation(); dp.classList.toggle("open"); render(); });
    document.addEventListener("click", function (e) { if (!dp.contains(e.target)) dp.classList.remove("open"); });
  });

  /* ---- AutoComplete -------------------------------------------------- */
  $$(".autocomplete").forEach(function (ac) {
    var input = ac.querySelector("input");
    var pop = ac.querySelector(".ac-pop");
    if (!input || !pop) return;
    var source = [];
    try { source = JSON.parse(ac.dataset.source || "[]"); } catch (e) { source = []; }
    var active = -1, items = [];
    var close = function () { ac.classList.remove("open"); active = -1; };
    var render = function () {
      var q = input.value.trim().toLowerCase();
      items = q ? source.filter(function (s) { return s.toLowerCase().indexOf(q) >= 0; }) : source.slice(0, 8);
      if (!items.length) { pop.innerHTML = '<div class="ac-empty">無相符項目</div>'; ac.classList.add("open"); return; }
      pop.innerHTML = items.map(function (s, i) {
        var disp = q ? s.replace(new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), "<mark>$1</mark>") : s;
        return '<div class="ac-opt' + (i === active ? " active" : "") + '" data-i="' + i + '">' + disp + "</div>";
      }).join("");
      ac.classList.add("open");
      $$(".ac-opt", pop).forEach(function (o) {
        o.addEventListener("mousedown", function (e) { e.preventDefault(); input.value = items[+o.dataset.i]; close(); });
      });
    };
    input.addEventListener("input", render);
    input.addEventListener("focus", render);
    input.addEventListener("keydown", function (e) {
      if (!ac.classList.contains("open")) return;
      if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(active + 1, items.length - 1); render(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(active - 1, 0); render(); }
      else if (e.key === "Enter" && active >= 0) { e.preventDefault(); input.value = items[active]; close(); }
      else if (e.key === "Escape") close();
    });
    document.addEventListener("click", function (e) { if (!ac.contains(e.target)) close(); });
  });

  /* ---- Carousel（走馬燈）------------------------------------------- */
  $$(".carousel").forEach(function (car) {
    var track = car.querySelector(".carousel-track");
    var slides = $$(".carousel-slide", track);
    if (!slides.length) return;
    var idx = 0, timer = null;
    var dots = document.createElement("div"); dots.className = "carousel-dots";
    slides.forEach(function (_, i) {
      var b = document.createElement("button"); b.className = i === 0 ? "active" : "";
      b.addEventListener("click", function () { go(i); });
      dots.appendChild(b);
    });
    car.appendChild(dots);
    var mkArrow = function (dir, sym) {
      var a = document.createElement("button"); a.className = "carousel-arrow " + dir;
      a.innerHTML = '<svg viewBox="0 0 24 24"><path d="' + sym + '"/></svg>';
      a.addEventListener("click", function () { go(dir === "prev" ? idx - 1 : idx + 1); });
      car.appendChild(a);
    };
    mkArrow("prev", "M15 18l-6-6 6-6"); mkArrow("next", "M9 18l6-6-6-6");
    function go(n) {
      idx = (n + slides.length) % slides.length;
      track.style.transform = "translateX(-" + idx * 100 + "%)";
      $$("button", dots).forEach(function (d, i) { d.classList.toggle("active", i === idx); });
    }
    var start = function () { timer = setInterval(function () { go(idx + 1); }, 3800); };
    var stop = function () { clearInterval(timer); };
    car.addEventListener("mouseenter", stop); car.addEventListener("mouseleave", start);
    start();
  });

  /* ---- Image lightbox ------------------------------------------------ */
  $$(".img-thumb").forEach(function (t) {
    t.addEventListener("click", function () {
      var media = t.querySelector("img, svg");
      if (media && nubo.lightbox) nubo.lightbox(media);
    });
  });

  /* ---- Anchor（頁內導覽捲動高亮）----------------------------------- */
  $$(".anchor").forEach(function (anchor) {
    var links = $$('a[href^="#"]', anchor);
    var targets = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); }).filter(Boolean);
    links.forEach(function (a) {
      a.addEventListener("click", function (e) {
        var t = document.getElementById(a.getAttribute("href").slice(1));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
      });
    });
    if ("IntersectionObserver" in window && targets.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
        });
      }, { rootMargin: "-30% 0px -60% 0px" });
      targets.forEach(function (t) { io.observe(t); });
    }
  });

  /* ---- Table：排序 + 全選 / 列選 ----------------------------------- */
  $$(".data-table[data-sortable]").forEach(function (table) {
    var tbody = table.querySelector("tbody");
    $$("th.sortable", table).forEach(function (th, col) {
      th.addEventListener("click", function () {
        var dir = th.getAttribute("aria-sort") === "ascending" ? "descending" : "ascending";
        $$("th", table).forEach(function (h) { h.removeAttribute("aria-sort"); });
        th.setAttribute("aria-sort", dir);
        var rows = $$("tr", tbody);
        var idx = [].indexOf.call(th.parentElement.children, th);
        rows.sort(function (a, b) {
          var x = a.children[idx].textContent.trim(), y = b.children[idx].textContent.trim();
          var nx = parseFloat(x.replace(/[^0-9.\-]/g, "")), ny = parseFloat(y.replace(/[^0-9.\-]/g, ""));
          var r = (!isNaN(nx) && !isNaN(ny)) ? nx - ny : x.localeCompare(y, "zh-Hant");
          return dir === "ascending" ? r : -r;
        });
        rows.forEach(function (r) { tbody.appendChild(r); });
      });
    });
  });
  $$(".data-table[data-selectable]").forEach(function (table) {
    var all = table.querySelector("thead .col-check input");
    var rows = $$("tbody tr", table);
    var info = document.getElementById(table.dataset.selinfo || "");
    var update = function () {
      var n = rows.filter(function (r) { var c = r.querySelector(".col-check input"); return c && c.checked; }).length;
      rows.forEach(function (r) { var c = r.querySelector(".col-check input"); if (c) r.classList.toggle("selected", c.checked); });
      if (info) info.textContent = n ? "已選取 " + n + " 列" : "未選取任何列";
      if (all) { all.checked = n === rows.length && rows.length > 0; all.indeterminate = n > 0 && n < rows.length; }
    };
    if (all) all.addEventListener("change", function () { rows.forEach(function (r) { var c = r.querySelector(".col-check input"); if (c) c.checked = all.checked; }); update(); });
    rows.forEach(function (r) { var c = r.querySelector(".col-check input"); if (c) c.addEventListener("change", update); });
    update();
  });

  /* ---- QRCode（離線 qrcodejs）-------------------------------------- */
  $$(".qrcode[data-qr]").forEach(function (box) {
    if (!window.QRCode) return;
    var make = function (text) {
      box.innerHTML = "";
      new window.QRCode(box, { text: text, width: 132, height: 132, colorDark: "#1f1f1e", colorLight: "#ffffff", correctLevel: window.QRCode.CorrectLevel.M });
    };
    make(box.dataset.qr);
    if (box.dataset.qrInput) {
      var inp = document.getElementById(box.dataset.qrInput);
      if (inp) inp.addEventListener("input", function () { make(inp.value || " "); });
    }
  });

  /* ---- Statistic countup（進入視窗時數字遞增）---------------------- */
  var statEls = $$("[data-count]");
  var runCount = function (el) {
    var target = parseFloat(el.dataset.count), dec = (el.dataset.count.split(".")[1] || "").length;
    var t0 = null, dur = 1100;
    var step = function (ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
      var v = target * eased;
      el.textContent = Number(v).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (statEls.length && "IntersectionObserver" in window) {
    var sio = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); obs.unobserve(en.target); } });
    }, { threshold: 0.4 });
    statEls.forEach(function (el) { sio.observe(el); });
  } else { statEls.forEach(runCount); }

  /* ---- Progress circle（環形進度，進入視窗時填充）------------------ */
  $$(".progress-circle[data-percent]").forEach(function (pc) {
    var fill = pc.querySelector(".pc-fill");
    if (!fill) return;
    var r = parseFloat(fill.getAttribute("r")), C = 2 * Math.PI * r;
    var pct = Math.max(0, Math.min(100, parseFloat(pc.dataset.percent)));
    fill.style.strokeDasharray = C; fill.style.strokeDashoffset = C;
    var run = function () { fill.style.strokeDashoffset = C * (1 - pct / 100); };
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es, obs) {
        es.forEach(function (e) { if (e.isIntersecting) { setTimeout(run, 80); obs.unobserve(e.target); } });
      }, { threshold: 0.4 });
      io.observe(pc);
    } else { run(); }
  });

  /* ---- Reveal-on-scroll（進場動畫，stagger）+ 穩健安全網 ----------- */
  /* 內容初始為 opacity:0，靠進場動畫顯示。為避免 IntersectionObserver 回呼被
     節流/延遲時內容卡在隱形，另用 setTimeout + scroll/resize 主動顯示已進入視窗
     的區塊——任一機制成功即可，內容絕不會永久隱形。 */
  var revealEls = $$("[data-reveal]");
  var revealOne = function (el) {
    if (el.classList.contains("in")) return;
    var sibs = $$(":scope > [data-reveal]", el.parentElement);
    el.style.transitionDelay = Math.min(sibs.indexOf(el), 6) * 60 + "ms";
    el.classList.add("in");
  };
  var revealInView = function () {
    revealEls.forEach(function (el) {
      if (!el.classList.contains("in") && el.getBoundingClientRect().top < window.innerHeight * 0.95) revealOne(el);
    });
  };
  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) { if (en.isIntersecting) { revealOne(en.target); obs.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    revealEls.forEach(function (el) { ro.observe(el); });
    setTimeout(revealInView, 120);                                   // 安全網：載入後顯示已在視窗內者
    window.addEventListener("scroll", revealInView, { passive: true });
    window.addEventListener("resize", revealInView);
  } else { revealEls.forEach(function (el) { el.classList.add("in"); }); }

  /* ---- 按鈕點擊漣漪 wave（借鏡 Ant Design）------------------------- */
  $$(".btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.disabled || btn.classList.contains("loading")) return;
      var w = document.createElement("span"); w.className = "nubo-wave";
      btn.appendChild(w);
      setTimeout(function () { w.remove(); }, 560);
    });
  });
})();
