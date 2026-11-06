const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");

if (menuButton && navigation) {
  const closeMenu = (returnFocus = false) => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
    if (returnFocus) menuButton.focus();
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isOpen);
    if (!isOpen) navigation.querySelector("a")?.focus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu(true);
    }
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) closeMenu();
  });
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const filterButtons = document.querySelectorAll("[data-filter]");
const portfolioCards = document.querySelectorAll(".portfolio-grid [data-category]");
const filterStatus = document.querySelector("#filter-status");
if (filterButtons.length && portfolioCards.length) {
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

const projectDialog = document.querySelector(".project-dialog");
if (projectDialog instanceof HTMLDialogElement) {
  const closeButton = projectDialog.querySelector(".dialog-close");
  const title = projectDialog.querySelector("#dialog-title");
  const detail = projectDialog.querySelector("#dialog-detail");
  const services = projectDialog.querySelector("#dialog-services");
  document.querySelectorAll(".project-open").forEach((button) => {
    button.addEventListener("click", () => {
      title.textContent = button.dataset.project || "Project";
      detail.textContent = button.dataset.detail || "";
      services.textContent = button.dataset.services || "";
      projectDialog.showModal();
      closeButton.focus();
    });
  });
  closeButton.addEventListener("click", () => projectDialog.close());
  projectDialog.addEventListener("click", (event) => {
    if (event.target === projectDialog) projectDialog.close();
  });
}

const contactForm = document.querySelector("#contact-form");
if (contactForm instanceof HTMLFormElement) {
  const fields = [...contactForm.querySelectorAll("input, select, textarea")];
  const successMessage = contactForm.querySelector("#form-success");
  const submitButton = contactForm.querySelector(".submit-button");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const getError = (field) => {
    const value = field.type === "checkbox" ? field.checked : field.value.trim();
    if (field.required && !value) return "This field is required.";
    if (field.name === "email" && value && !emailPattern.test(field.value.trim())) return "Enter a valid email address.";
    if (field.name === "message" && value && field.value.trim().length < 20) return "Please tell us a little more (at least 20 characters).";
    return "";
  };

  const validateField = (field) => {
    const error = getError(field);
    const errorElement = document.querySelector(`#${field.id}-error`);
    field.setAttribute("aria-invalid", String(Boolean(error)));
    if (errorElement) errorElement.textContent = error;
    return !error;
  };

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
    field.addEventListener("change", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const valid = fields.map(validateField).every(Boolean);
    if (!valid) {
      fields.find((field) => field.getAttribute("aria-invalid") === "true")?.focus();
      return;
    }
    submitButton.disabled = true;
    submitButton.setAttribute("aria-busy", "true");
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    submitButton.disabled = false;
    submitButton.removeAttribute("aria-busy");
    successMessage.hidden = false;
    successMessage.focus();
    contactForm.reset();
    fields.forEach((field) => field.removeAttribute("aria-invalid"));
  });
}
