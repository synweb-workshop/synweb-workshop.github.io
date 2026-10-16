(function () {
  "use strict";
  var D = window.SYNWEB || {};
  var MS_DAY = 86400000;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* Mobile navigation */
  var toggle = $(".nav-toggle");
  var nav = $("#site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  /* Dates. Deadlines close at 23:59 AoE (UTC-12), i.e. 11:59 UTC the next day. */
  function parseISO(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    return m ? { y: +m[1], mo: +m[2] - 1, d: +m[3] } : null;
  }
  function closesAt(item) {
    var p = parseISO(item.date);
    if (!p) return null;
    if (item.event) return Date.UTC(p.y, p.mo, p.d, 23, 59);
    return Date.UTC(p.y, p.mo, p.d, 23, 59) + 12 * 3600000;
  }
  function formatDate(iso) {
    var p = parseISO(iso);
    if (!p) return "To be announced";
    return new Date(Date.UTC(p.y, p.mo, p.d)).toLocaleDateString("en-GB", {
      weekday: "short", day: "numeric", month: "long", year: "numeric", timeZone: "UTC"
    });
  }

  var now = Date.now();
  var dates = (D.dates || []).map(function (d) {
    var t = closesAt(d);
    return { label: d.label, date: d.date, note: d.note, event: !!d.event, t: t, past: t !== null && t < now };
  });
  var next = null;
  dates.forEach(function (d) { if (d.t !== null && !d.past && (!next || d.t < next.t)) next = d; });

  $all("[data-dates]").forEach(function (el) {
    el.innerHTML = dates.map(function (d) {
      var cls = d.past ? "is-past" : (d === next ? "is-next" : "");
      var status = d.past ? (d.event ? "Held" : "Closed") : (d === next ? "Next" : "");
      return '<li class="' + cls + '">' +
        '<span class="date-when">' + esc(formatDate(d.date)) + "</span>" +
        '<span class="date-what">' + esc(d.label) +
        (status ? ' <span class="date-status">' + status + "</span>" : "") + "</span>" +
        (d.note ? '<span class="date-note">' + esc(d.note) + "</span>" : "") +
        "</li>";
    }).join("");
  });

  var cd = $("[data-countdown]");
  function renderCountdown() {
    if (!cd) return;
    if (!next) { cd.hidden = true; return; }
    var diff = next.t - Date.now();
    if (diff <= 0) { cd.hidden = true; return; }
    var days = Math.floor(diff / MS_DAY);
    var hours = Math.floor((diff % MS_DAY) / 3600000);
    var what = next.event ? "The workshop is in " : next.label + " in ";
    cd.textContent = what + days + (days === 1 ? " day, " : " days, ") + hours + (hours === 1 ? " hour" : " hours");
    cd.hidden = false;
  }
  renderCountdown();
  if (cd) setInterval(renderCountdown, 60000);

  $all("[data-workshop-date]").forEach(function (el) {
    var w = dates.filter(function (d) { return d.event; })[0];
    el.textContent = w && w.date ? formatDate(w.date) : "Date to be announced";
  });
  $all("[data-notification-date]").forEach(function (el) {
    var n = dates.filter(function (d) { return /notification/i.test(d.label); })[0];
    el.textContent = n && n.date ? formatDate(n.date) : "author notification";
  });
  $all("[data-tz]").forEach(function (el) { el.textContent = D.workshopTimezone || ""; });

  /* Links and announcement */
  $all("[data-contact]").forEach(function (el) {
    el.href = "mailto:" + D.contactEmail;
    if (!el.textContent.trim()) el.textContent = D.contactEmail;
  });
  $all("[data-submit]").forEach(function (el) {
    if (D.submissionUrl) {
      el.href = D.submissionUrl;
      el.removeAttribute("aria-disabled");
      el.classList.remove("is-disabled");
      el.textContent = el.getAttribute("data-label-open") || "Submit a paper";
    } else {
      el.removeAttribute("href");
      el.setAttribute("aria-disabled", "true");
      el.classList.add("is-disabled");
      el.textContent = el.getAttribute("data-label-closed") || "Submission portal opens soon";
    }
  });
  var ann = $("[data-announcement]");
  if (ann) {
    if (D.announcement) { ann.querySelector("p").textContent = D.announcement; ann.hidden = false; }
    else ann.hidden = true;
  }

  /* Program */
  var prog = $("[data-program]");
  if (prog) {
    prog.innerHTML = (D.program || []).map(function (s) {
      return '<tr' + (s.isBreak ? ' class="is-break"' : "") + '><th scope="row">' + esc(s.time) +
        "</th><td>" + esc(s.title) + "</td></tr>";
    }).join("");
  }

  /* Program committee */
  var pc = $("[data-pc]");
  if (pc) {
    var members = (D.pc || []).filter(function (m) { return m.confirmed; })
      .sort(function (a, b) {
        var la = a.name.split(" ").pop(), lb = b.name.split(" ").pop();
        return la.localeCompare(lb);
      });
    pc.innerHTML = members.map(function (m) {
      var name = m.url ? '<a href="' + esc(m.url) + '">' + esc(m.name) + "</a>" : esc(m.name);
      return '<li><span class="pc-name">' + name + '</span><span class="pc-aff">' + esc(m.affiliation) + "</span></li>";
    }).join("");
  }

  /* Accepted papers */
  var papers = $("[data-papers]");
  if (papers) {
    var list = D.papers || [];
    if (!list.length) {
      $("[data-papers-empty]").hidden = false;
      papers.hidden = true;
    } else {
      papers.innerHTML = list.map(function (p) {
        var title = p.pdf ? '<a href="' + esc(p.pdf) + '">' + esc(p.title) + "</a>" : esc(p.title);
        var meta = [p.type, p.session].filter(Boolean).map(esc).join(", ");
        return '<li><p class="paper-title">' + title + '</p><p class="paper-authors">' + esc(p.authors) + "</p>" +
          (meta ? '<p class="paper-meta">' + meta + "</p>" : "") + "</li>";
      }).join("");
    }
  }

  /* Current page in nav */
  var here = location.pathname.split("/").pop() || "index.html";
  $all("#site-nav a").forEach(function (a) {
    if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
  });
})();
