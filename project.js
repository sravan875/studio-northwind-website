import { projects } from "./projects.js";

const root = document.querySelector("#project-content");
const lightbox = document.querySelector(".gallery-lightbox");
const lightboxImage = lightbox?.querySelector(".lightbox-image");
const lightboxCaption = lightbox?.querySelector(".lightbox-caption");
const lightboxCount = lightbox?.querySelector(".lightbox-count");
const closeButton = lightbox?.querySelector(".lightbox-close");
const previousButton = lightbox?.querySelector(".lightbox-previous");
const nextButton = lightbox?.querySelector(".lightbox-next");
const projectId = new URLSearchParams(window.location.search).get("id");
const projectIndex = projects.findIndex((project) => project.id === projectId);
const project = projects[projectIndex];

const setOpenGraphImage = (source) => {
  let meta = document.querySelector('meta[property="og:image"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", "og:image");
    document.head.append(meta);
  }
  meta.content = source;
};

const setOpenGraphImageAlt = (alt) => {
  let meta = document.querySelector('meta[property="og:image:alt"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", "og:image:alt");
    document.head.append(meta);
  }
  meta.content = alt;
};

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
})[character]);

const imageMarkup = (image, className = "") => {
  const imageBase = image.src.replace(/\/\d+\/\d+$/, "");
  const mediumHeight = Math.round(600 * image.height / image.width);
  const largeWidth = Math.max(image.width, 1200);
  const largeHeight = Math.round(largeWidth * image.height / image.width);
  const sizes = className === "case-hero-image" ? "100vw" : "(min-width: 768px) 50vw, 100vw";
  return `
    <img class="${className}" src="${escapeHtml(image.src)}"
      srcset="${escapeHtml(`${imageBase}/600/${mediumHeight} 600w, ${imageBase}/${largeWidth}/${largeHeight} ${largeWidth}w`)}"
      sizes="${sizes}" width="${image.width}" height="${image.height}"
      alt="${escapeHtml(image.alt)}" loading="${className === "case-hero-image" ? "eager" : "lazy"}">
  `;
};

const renderNotFound = () => {
  document.title = "Project not found — Studio Northwind";
  document.querySelector('meta[name="description"]').content = "This Studio Northwind project could not be found. Browse all selected work.";
  document.querySelector('meta[property="og:title"]').content = document.title;
  document.querySelector('meta[property="og:description"]').content = document.querySelector('meta[name="description"]').content;
  root.classList.add("not-found");
  root.innerHTML = `
    <p class="eyebrow">A page from the wrong notebook</p>
    <h1>Project not found<span>.</span></h1>
    <p>This project link may be out of date. Explore the portfolio to find another story.</p>
    <a class="button button-dark" href="work.html">Back to all projects <span aria-hidden="true">↗</span></a>
  `;
};

const renderProject = (item, index) => {
  const nextProject = projects[(index + 1) % projects.length];
  const hero = item.gallery[0];
  document.title = `${item.title} — Project Case Study | Studio Northwind`;
  document.querySelector('meta[name="description"]').content = `${item.subtitle} Read the ${item.title} project case study from Studio Northwind.`;
  document.querySelector('meta[property="og:title"]').content = document.title;
  document.querySelector('meta[property="og:description"]').content = document.querySelector('meta[name="description"]').content;
  setOpenGraphImage(hero.src);
  setOpenGraphImageAlt(hero.alt);

  root.classList.remove("not-found");
  root.innerHTML = `
    <header class="case-heading">
      <a class="text-link case-back" href="work.html">← Back to all projects</a>
      <p class="eyebrow">Selected work / ${escapeHtml(item.category)}</p>
      <h1>${escapeHtml(item.title)}<span>.</span></h1>
      <p class="lede">${escapeHtml(item.subtitle)}</p>
      <ul class="case-tags" aria-label="Project disciplines">${item.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}</ul>
    </header>
    <figure class="case-hero-figure">
      ${imageMarkup(hero, "case-hero-image")}
      <figcaption>${escapeHtml(hero.caption)}</figcaption>
    </figure>
    <section class="case-intro case-section" aria-labelledby="case-overview-title">
      <div><p class="eyebrow">The project</p><h2 id="case-overview-title">A little more<br>about the idea.</h2></div>
      <div class="case-copy">${item.overview.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div>
    </section>
    <section class="case-challenge case-section" aria-labelledby="case-challenge-title">
      <div><p class="eyebrow">The challenge</p><h2 id="case-challenge-title">Find the<br>right way in.</h2></div>
      <p class="case-statement">${escapeHtml(item.challenge)}</p>
    </section>
    <section class="case-strategy case-section" aria-labelledby="case-strategy-title">
      <div class="case-strategy-copy"><p class="eyebrow">Strategy &amp; solution</p><h2 id="case-strategy-title">Thoughtful by<br>design.</h2><p>${escapeHtml(item.strategy)}</p></div>
      <figure class="case-supporting-image">${imageMarkup(item.gallery[1])}<figcaption>${escapeHtml(item.gallery[1].caption)}</figcaption></figure>
    </section>
    <section class="case-process case-section" aria-labelledby="case-process-title">
      <p class="eyebrow">A considered process</p><h2 id="case-process-title">From first thought<br>to final detail.</h2>
      <ol class="case-process-list">${item.process.map((stage, stageIndex) => `
        <li><span class="case-step">0${stageIndex + 1}</span><div><h3>${escapeHtml(stage.title)}</h3><p>${escapeHtml(stage.detail)}</p></div></li>
      `).join("")}</ol>
    </section>
    <section class="case-deliverables case-section" aria-labelledby="case-deliverables-title">
      <div><p class="eyebrow">The work</p><h2 id="case-deliverables-title">Made to<br>work together.</h2></div>
      <ul class="deliverable-list">${item.deliverables.map((deliverable) => `<li>${escapeHtml(deliverable)}</li>`).join("")}</ul>
    </section>
    <section class="case-gallery case-section" aria-labelledby="case-gallery-title">
      <div class="case-gallery-heading"><div><p class="eyebrow">A closer look</p><h2 id="case-gallery-title">Inside the<br>${escapeHtml(item.title)} world.</h2></div><p>Select an image to view it larger.</p></div>
      <div class="case-gallery-grid">${item.gallery.map((image, imageIndex) => `
        <figure class="case-gallery-item case-gallery-${escapeHtml(image.layout)}">
          <button class="gallery-trigger" type="button" data-gallery-index="${imageIndex}" aria-label="View larger: ${escapeHtml(image.alt)}">
            ${imageMarkup(image)}
            <span class="gallery-zoom" aria-hidden="true">↗</span>
          </button>
          <figcaption>${escapeHtml(image.caption)}</figcaption>
        </figure>
      `).join("")}</div>
    </section>
    <section class="case-impact case-section" aria-labelledby="case-impact-title">
      <p class="eyebrow">Design intent</p><h2 id="case-impact-title">A clearer way<br>to show up.</h2>
      <p>${escapeHtml(item.impact)}</p>
      <small>Qualitative project summary; no performance metrics were supplied.</small>
    </section>
    <section class="case-credits case-section" aria-labelledby="case-credits-title">
      <div><p class="eyebrow">Project notes</p><h2 id="case-credits-title">The details.</h2></div>
      <dl class="case-credit-list">
        <div><dt>Project</dt><dd>${escapeHtml(item.title)}</dd></div>
        <div><dt>Industry</dt><dd>${escapeHtml(item.industry)}</dd></div>
        <div><dt>Project type</dt><dd>${escapeHtml(item.projectType)}</dd></div>
        <div><dt>Services</dt><dd>${item.services.map(escapeHtml).join(" · ")}</dd></div>
        ${item.credits.map((credit) => `<div><dt>${escapeHtml(credit.role)}</dt><dd>${escapeHtml(credit.names)}</dd></div>`).join("")}
      </dl>
    </section>
    <section class="next-project-section" aria-labelledby="next-project-title">
      <div class="page-wrap next-project-inner">
        <p class="eyebrow">Keep exploring</p><h2 id="next-project-title">Next project</h2>
        <a class="next-project-card" href="project.html?id=${encodeURIComponent(nextProject.id)}">
          ${imageMarkup(nextProject.gallery[0], "next-project-image")}
          <span class="next-project-copy"><span class="eyebrow">${escapeHtml(nextProject.category)}</span><strong>${escapeHtml(nextProject.title)}</strong><span>Explore the project <span aria-hidden="true">↗</span></span></span>
        </a>
        <a class="text-link" href="work.html">← Back to all projects</a>
      </div>
    </section>
  `;

  root.querySelector(".case-gallery-grid").addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-gallery-index]");
    if (!trigger || !lightbox) return;
    openLightbox(Number(trigger.dataset.galleryIndex));
  });
};

let activeImageIndex = 0;
let previousBodyOverflow = "";
let lightboxOpener = null;

const updateLightbox = () => {
  const image = project.gallery[activeImageIndex];
  lightboxImage.src = image.src.replace(/\/\d+\/\d+$/, "/1800/1400");
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = image.caption;
  lightboxCount.textContent = `${activeImageIndex + 1} of ${project.gallery.length}`;
  previousButton.disabled = project.gallery.length < 2;
  nextButton.disabled = project.gallery.length < 2;
};

const openLightbox = (index) => {
  activeImageIndex = index;
  lightboxOpener = root.querySelector(`[data-gallery-index="${index}"]`);
  updateLightbox();
  previousBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  lightbox.showModal();
  closeButton.focus();
};

const closeLightbox = () => {
  if (lightbox.open) lightbox.close();
  document.body.style.overflow = previousBodyOverflow;
  lightboxOpener?.focus();
};

const moveLightbox = (direction) => {
  activeImageIndex = (activeImageIndex + direction + project.gallery.length) % project.gallery.length;
  updateLightbox();
};

if (root && project && lightbox && lightboxImage && closeButton && previousButton && nextButton) {
  renderProject(project, projectIndex);
  closeButton.addEventListener("click", closeLightbox);
  previousButton.addEventListener("click", () => moveLightbox(-1));
  nextButton.addEventListener("click", () => moveLightbox(1));
  lightbox.addEventListener("close", () => {
    document.body.style.overflow = previousBodyOverflow;
    lightboxOpener?.focus();
  });
  lightbox.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeLightbox();
  });
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (!lightbox.open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveLightbox(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveLightbox(1);
    }
  });
} else if (root) {
  renderNotFound();
}
