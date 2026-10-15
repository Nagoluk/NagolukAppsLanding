const ICONS = {
  google:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 4.8c0-.9 1-1.5 1.8-1L19 10.2c.8.5.8 1.6 0 2.1l-10.2 6.4c-.8.5-1.8-.1-1.8-1V4.8z"/></svg>',
  apple:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-.1 2.9-2.3c.7-1 1.2-2.1 1.5-3.2-3.9-1.5-3.8-5.5-3.8-5.2zM14.7 6.2c.6-.8 1.1-1.9.9-3-1 .1-2.1.6-2.8 1.4-.6.7-1.2 1.8-.9 2.9 1.1.1 2.1-.5 2.8-1.3z"/></svg>',
};

function appById(id) {
  return APPS.find((app) => app.id === id);
}

function storeButton(link) {
  const icon = ICONS[link.store] || "";
  if (!link.href) {
    return `<span class="store-btn is-soon" aria-disabled="true">${icon}<span><small>Coming soon</small>${link.label}</span></span>`;
  }
  const cls = link.store === "apple" ? "store-btn apple" : "store-btn";
  return `<a class="${cls}" href="${link.href}" target="_blank" rel="noopener noreferrer">${icon}<span><small>Download</small>${link.label}</span></a>`;
}

function renderStores() {
  document.querySelectorAll("[data-stores-for]").forEach((node) => {
    const app = appById(node.dataset.storesFor);
    if (!app) return;
    node.innerHTML = app.links
      .filter((link) => link.store !== "privacy")
      .map(storeButton)
      .join("");
  });
}

function renderCatalog() {
  const list = document.querySelector("[data-app-list]");
  if (!list || list.children.length || typeof APPS === "undefined") return;
  const root = document.body.dataset.root || "";
  list.innerHTML = APPS.map(
    (app) => `
      <a class="app-card" href="${root}${app.page || ""}">
        <img src="${root}${app.icon}" alt="" width="92" height="92" />
        <div>
          <p class="app-meta">${app.kind}</p>
          <h3>${app.name}</h3>
          <p>${app.tagline}</p>
        </div>
        <span class="go">Open</span>
      </a>`
  ).join("");
}

function paintStars() {
  const canvas = document.getElementById("stars");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const stars = Array.from({ length: 80 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.3 + 0.3,
    a: Math.random() * 0.5 + 0.25,
  }));

  const draw = () => {
    const { width, height } = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);
    stars.forEach((star) => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${star.a})`;
      ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  draw();
  window.addEventListener("resize", draw);
}

function bindNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const header = document.querySelector(".site-header");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function bindGameplay() {
  const video = document.querySelector(".phone video");
  if (!video) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.removeAttribute("autoplay");
    video.pause();
    return;
  }
  video.play().catch(() => {});
}

if (typeof APPS !== "undefined") {
  renderStores();
  renderCatalog();
}
document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});
paintStars();
bindNav();
bindGameplay();
