const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  navLinks.classList.toggle("is-open", !isExpanded);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  }
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    document.querySelectorAll(".filter-button").forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    document.querySelectorAll(".project-card").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const isPublicPage = /^https?:$/.test(window.location.protocol)
  && !["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
const pageUrl = new URL(isPublicPage ? window.location.href : "https://vixiik.github.io/");
pageUrl.hash = "";
pageUrl.search = "";
const stylesheetUrl = new URL(
  document.querySelector('link[rel="stylesheet"][href]').getAttribute("href"),
  pageUrl,
);

document.querySelectorAll("[data-validator]").forEach((link) => {
  const isHtmlValidator = link.dataset.validator === "html";
  const validatorUrl = new URL(
    isHtmlValidator
      ? "https://validator.w3.org/nu/"
      : "https://jigsaw.w3.org/css-validator/validator",
  );

  validatorUrl.searchParams.set(isHtmlValidator ? "doc" : "uri", isHtmlValidator ? pageUrl.href : stylesheetUrl.href);

  if (!isHtmlValidator) {
    validatorUrl.searchParams.set("profile", "css3");
  }

  link.href = validatorUrl.href;
});
