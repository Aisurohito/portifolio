// integracao.js
"use strict";

const CONFIG = {
  yourName: "Consciência",
  whatsappNumber: "5541998040145",
  email: "kauamiranda770@gmail.com",
  instagramUrl: "https://www.instagram.com/conisciecia/",
  linkedinUrl: "https://www.linkedin.com/in/kau%C3%A3-miranda-7bba29235/",
};

const PROJECTS = [
  {
    title: "titanmetal",
    type: "demonstracao",
    desc: "Modelos feitos para exposição",
    tech: ["HTML", "CSS", "JS"],
    link: "https://aisurohito.github.io/Sites-metalurgica/",
    thumb: "assets/thumb/titanmetal.png"
  },
  {
    title: "bellamoda",
    type: "demonstracao",
    desc: "Modelos feitos para exposição",
    tech: ["HTML", "CSS", "JS"],
    link: "https://aisurohito.github.io/Sites-loja-de-roupa/",
    thumb: "assets/thumb/bellamoda.png"
  },
  {
    title: "techsolutions",
    type: "demonstracao",
    desc: "Modelos feitos para exposição",
    tech: ["HTML", "CSS", "JS"],
    link: "https://aisurohito.github.io/Site-Tech/",
    thumb: "assets/thumb/techsolutions.png"
  },
];

const $ = (sel, root = document) => root.querySelector(sel);

function whatsappLink(message) {
  const num = String(CONFIG.whatsappNumber).replace(/\D/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function typeLabel(t) {
  if (t === "web") return "WEB";
  if (t === "shop") return "E-COMMERCE";
  if (t === "video") return "VÍDEO";
  if (t === "demonstracao") return "DEMONSTRAÇÃO";  
  return "PROJETO";
}

function setActiveFilter(activeId) {
  const ids = ["filterAll", "filterWeb", "filterShop", "filterVideo"];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle("is-active", id === activeId);
  });
}

function renderProjects(filterType = "all") {
  const grid = $("#projectsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const items = PROJECTS.filter((p) =>
    filterType === "all" ? true : p.type === filterType
  );

  if (!items.length) {
    grid.innerHTML = `
      <div class="project">
        <div class="thumb"><span class="label">SEM ITENS</span></div>
        <h4>Nenhum projeto nessa categoria</h4>
        <p>Adicione projetos no array <b>PROJECTS</b> do arquivo <b>integracao.js</b>.</p>
      </div>
    `;
    return;
  }

  items.forEach((p) => {
    const tech = (p.tech || []).map((t) => `<span class="pill">${escapeHtml(t)}</span>`).join("");

    const href = (p.link || "").trim();
    const hasLink = href && href !== "#";

    // thumb (imagem do card)
    const thumb = p.thumb ? escapeHtml(p.thumb) : "";
    const thumbStyle = thumb ? `style="background-image:url('${thumb}')"` : "";

    // REGRA: externo abre nova guia, interno abre mesma guia
    const isExternal = /^https?:\/\//i.test(href);
    const targetAttr = isExternal ? ` target="_blank" rel="noopener"` : "";
    const card = document.createElement("article");
    card.className = "project";

    card.innerHTML = `
      <div class="thumb thumb-img" ${thumbStyle}>
        <span class="label">${typeLabel(p.type)}</span>
      </div>

      <h4>${escapeHtml(p.title)}</h4>
      <p>${escapeHtml(p.desc)}</p>

      <div class="row">${tech}</div>

<div class="row" style="margin-top:10px;">
  ${
    hasLink
      ? `<a class="btn btn-outline btn-small" href="${escapeHtml(href)}"${targetAttr}>Ver</a>`
      : `<span class="muted small">Sem link</span>`
  }
</div>

    `;

    grid.appendChild(card);
  });
}

function wireFilters() {
  // Se os botões de filtro não existirem mais, só renderiza tudo e pronto.
  const hasFilters = document.getElementById("filterAll");
  if (!hasFilters) {
    renderProjects("all");
    return;
  }

  const map = {
    filterAll: "all",
    filterWeb: "web",
    filterShop: "shop",
    filterVideo: "video",
  };

  Object.entries(map).forEach(([id, type]) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener("click", () => {
      setActiveFilter(id);
      renderProjects(type);
    });
  });

  setActiveFilter("filterAll");
  renderProjects("all");
}


function wireSocial() {
  const ig = $("#linkInstagram");
  const li = $("#linkLinkedin");

  if (ig) ig.href = CONFIG.instagramUrl;
  if (li) li.href = CONFIG.linkedinUrl;
}

function wireWhatsAppButtons() {
  const message =
    `Olá, ${CONFIG.yourName}! Quero um orçamento.\n\n` +
    `Serviço: (site / loja / vídeo)\n` +
    `Objetivo:\n` +
    `Prazo:\n` +
    `Referências/links:\n`;

  ["btn-whats-top", "btn-whats-hero", "btn-whats-contact", "btn-whats-portfolio"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.href = whatsappLink(message);
  });
}

function wireEmailButton() {
  const emailBtn = $("#btn-email");
  const note = $("#contactNote");
  if (!emailBtn) return;

  if (!CONFIG.email) {
    emailBtn.style.display = "none";
    if (note) note.textContent = "Para ativar o botão de e-mail, preencha CONFIG.email no arquivo integracao.js.";
    return;
  }

  const subject = encodeURIComponent("Orçamento — Web / Loja / Vídeo");
  const body = encodeURIComponent(`Olá!\n\nQuero um orçamento.\n\nServiço:\nObjetivo:\nPrazo:\nReferências:\n`);

  emailBtn.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
}

function wireContactForm() {
  const form = $("#contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = ($("#name")?.value || "").trim();
    const service = ($("#service")?.value || "").trim();
    const message = ($("#message")?.value || "").trim();

    const text =
      `Olá, ${CONFIG.yourName}! Me chamo ${name || "—"}.\n\n` +
      `Serviço: ${service || "—"}\n\n` +
      `Detalhes:\n${message || "—"}\n\n` +
      `Pode me passar prazo e valor?`;

    window.open(whatsappLink(text), "_blank", "noopener");
  });
}

function wireMobileMenu() {
  const btn = $("#menuBtn");
  const menu = $("#mobileMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const open = menu.style.display === "block";
    menu.style.display = open ? "none" : "block";
    btn.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
  });

  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    menu.style.display = "none";
    btn.setAttribute("aria-label", "Abrir menu");
  });
}

function wireReveal() {
  const els = Array.from(document.querySelectorAll(".reveal"));
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  wireSocial();
  wireWhatsAppButtons();
  wireEmailButton();
  wireFilters();
  wireContactForm();
  wireMobileMenu();
  wireReveal();
});
