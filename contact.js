const contactForm = document.querySelector("#contact-form");

if (contactForm instanceof HTMLFormElement) {
  const fields = [...contactForm.querySelectorAll("input, select, textarea")];
  const errorElements = new Map(
    [...contactForm.querySelectorAll(".field-error")].map((element) => [element.id, element]),
  );
  const successMessage = contactForm.querySelector("#form-success");
  const submitButton = contactForm.querySelector(".submit-button");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const getError = (field) => {
    const value = field.type === "checkbox" ? field.checked : field.value.trim();
    if (field.required && !value) return "This field is required.";
    if (field.name === "email" && value && !emailPattern.test(field.value.trim())) return "Enter a valid email address.";
    if (field.name === "message" && value && field.value.trim().length < 20) {
      return "Please tell us a little more (at least 20 characters).";
    }
    return "";
  };

  const validateField = (field) => {
    const error = getError(field);
    field.setAttribute("aria-invalid", String(Boolean(error)));
    const errorId = field.getAttribute("aria-describedby")?.split(/\s+/).find((id) => errorElements.has(id));
    const errorElement = errorId && errorElements.get(errorId);
    if (errorElement) errorElement.textContent = error;
    return !error;
  };

  const validateEventField = (event) => {
    const field = event.target;
    if (field instanceof HTMLElement && fields.includes(field) && field.getAttribute("aria-invalid") === "true") {
      validateField(field);
    }
  };

  contactForm.addEventListener("focusout", (event) => {
    const field = event.target;
    if (field instanceof HTMLElement && fields.includes(field)) validateField(field);
  });
  contactForm.addEventListener("input", validateEventField);
  contactForm.addEventListener("change", validateEventField);

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let firstInvalidField;
    for (const field of fields) {
      if (!validateField(field) && !firstInvalidField) firstInvalidField = field;
    }
    if (firstInvalidField) {
      firstInvalidField.focus();
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
