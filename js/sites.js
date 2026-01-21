// js/sites.js
"use strict";

const $ = (s, r = document) => r.querySelector(s);

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function projectCard(p) {
  const tech = (p.tech || []).map(t => `<span class="pill">${escapeHtml(t)}</span>`).join("");

  const thumbStyle = p.thumb ? `style="background-image:url('${escapeHtml(p.thumb)}')"` : "";
  const live = p.live && p.live !== "#" ? p.live : null;
  const repo = p.repo && p.repo !== "#" ? p.repo : null;

  return `
  <article class="project">
    <div class="thumb thumb-img" ${thumbStyle}>
      <span class="label">${escapeHtml(p.status || "Projeto")}</span>
    </div>

    <h4>${escapeHtml(p.title)}</h4>
    <p>${escapeHtml(p.desc || "")}</p>

    <div class="row">${tech}</div>

    <div class="row" style="margin-top:10px;">
      ${live ? `<a class="btn btn-outline btn-small" href="${escapeHtml(live)}" target="_blank" rel="noopener">Ver</a>` : ""}
      ${repo ? `<a class="btn btn-ghost btn-small" href="${escapeHtml(repo)}" target="_blank" rel="noopener">Repo</a>` : ""}
    </div>
  </article>`;
}

function setActiveButton(filtersEl, activeValue) {
  if (!filtersEl) return;
  filtersEl.querySelectorAll(".chip").forEach((b) => {
    const v = b.dataset.filter || b.dataset.cat || "";
    b.classList.toggle("is-active", v === activeValue);
  });
}

function applyFilter(catId, projects, tilesEl, queryEl) {
  const q = (queryEl?.value || "").trim().toLowerCase();

  const filtered = projects.filter(p => {
    const matchesCat = catId === "all" ? true : p.category === catId;
    const hay = `${p.title || ""} ${p.desc || ""} ${(p.tech || []).join(" ")}`.toLowerCase();
    const matchesSearch = !q || hay.includes(q);
    return matchesCat && matchesSearch;
  });

  tilesEl.innerHTML = filtered.length
    ? filtered.map(projectCard).join("")
    : `
      <div class="project">
        <div class="thumb"><span class="label">SEM ITENS</span></div>
        <h4>Nenhum projeto</h4>
        <p>Adicione itens em <b>js/data.js</b>.</p>
      </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  // Compatível com teu HTML atual:
  const queryEl = document.getElementById("q") || document.getElementById("search");
  const filtersEl =
    document.querySelector(".sites-filters") ||
    document.getElementById("filters");
  const tilesEl =
    document.getElementById("tiles") ||
    document.getElementById("grid");

  if (!filtersEl || !tilesEl) return;

  // pega categoria inicial: tenta achar botão "all"
  let active = (filtersEl.querySelector('[data-filter="all"]') ? "all" : (filtersEl.querySelector(".chip")?.dataset.filter || "all"));

  setActiveButton(filtersEl, active);
  applyFilter(active, data.projects, tilesEl, queryEl);

  // clique nos filtros (usa data-filter do teu HTML)
  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button.chip");
    if (!btn) return;

    const value = btn.dataset.filter || btn.dataset.cat;
    if (!value) return;

    active = value;
    setActiveButton(filtersEl, active);
    applyFilter(active, data.projects, tilesEl, queryEl);
  });

  // busca
  queryEl?.addEventListener("input", () => {
    applyFilter(active, data.projects, tilesEl, queryEl);
  });
});
