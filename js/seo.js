(function () {
  if (location.protocol !== "http:" && location.protocol !== "https:") return;
  var page = location.origin + location.pathname;

  function abs(value) {
    if (!value) return page;
    if (/^https?:/i.test(value)) return value;
    return new URL(value, page).href;
  }

  var canonical = document.createElement("link");
  canonical.rel = "canonical";
  canonical.href = page;
  document.head.appendChild(canonical);

  var ogUrl = document.head.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", page);

  ["meta[property='og:image']", "meta[name='twitter:image']"].forEach(function (selector) {
    var node = document.head.querySelector(selector);
    if (node && node.content) node.content = abs(node.content);
  });

  var ld = document.querySelector('script[type="application/ld+json"]');
  if (!ld) return;
  var data = JSON.parse(ld.textContent);

  function walk(node) {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (typeof node.url === "string") node.url = abs(node.url);
    if (typeof node.image === "string") node.image = abs(node.image);
    Object.keys(node).forEach(function (key) {
      if (key !== "url" && key !== "image") walk(node[key]);
    });
  }

  walk(data);
  ld.textContent = JSON.stringify(data);
})();
