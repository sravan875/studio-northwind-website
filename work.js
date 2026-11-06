import { projects } from "./projects.js";

const filterButtons = document.querySelectorAll("[data-filter]");
const portfolioGrid = document.querySelector("[data-project-grid]");
const filterStatus = document.querySelector("#filter-status");
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
})[character]);

if (portfolioGrid) {
  portfolioGrid.innerHTML = projects.map((project) => {
    const image = project.gallery[0];
    const imageBase = image.src.replace(/\/\d+\/\d+$/, "");
    return `
      <article class="project-card reveal" data-category="${project.categories.map(escapeHtml).join(" ")}" id="${escapeHtml(project.id)}">
        <a class="project-open" href="project.html?id=${encodeURIComponent(project.id)}">
          <img src="${escapeHtml(`${imageBase}/900/700`)}"
            srcset="${escapeHtml(`${imageBase}/480/384 480w, ${imageBase}/900/700 900w`)}"
            sizes="(min-width: 1024px) 30vw, (min-width: 480px) 45vw, calc(100vw - 2.5rem)"
            width="900" height="700" loading="lazy" alt="${escapeHtml(image.alt)}">
          <span class="project-meta"><span><strong>${escapeHtml(project.title)}</strong><small>${escapeHtml(project.cardCategory)}</small></span><span class="project-arrow" aria-hidden="true">↗</span></span>
        </a>
      </article>
    `;
  }).join("");
}

const portfolioCards = document.querySelectorAll(".portfolio-grid [data-category]");

if (filterButtons.length && portfolioCards.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      let visibleCount = 0;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      portfolioCards.forEach((card) => {
        const visible = filter === "all" || card.dataset.category.split(" ").includes(filter);
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      if (filterStatus) filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"} shown.`;
    });
  });
}
