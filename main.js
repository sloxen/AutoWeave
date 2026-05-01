// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     Footer load + year
  ========================= */
  fetch("footer.html")
    .then(res => res.text())
    .then(html => {
      const footer = document.getElementById("site-footer");
      if (footer) footer.innerHTML = html;

      const yearEl = document.getElementById("year");
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    });

  /* =========================
     Mobile nav
  ========================= */
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const closeBtn = document.querySelector(".mobile-nav__close");

  function openNav(){
    mobileNav?.classList.add("is-open");
    mobileNav?.setAttribute("aria-hidden", "false");
    toggle?.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
  }

  function closeNav(){
    mobileNav?.classList.remove("is-open");
    mobileNav?.setAttribute("aria-hidden", "true");
    toggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }

  toggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    openNav();
  });

  closeBtn?.addEventListener("click", closeNav);

  mobileNav?.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", closeNav)
  );

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeNav();
  });

  document.addEventListener("click", (e) => {
    if (!mobileNav?.classList.contains("is-open")) return;

    const target = e.target;
    if (!(target instanceof Node)) return;

    const inside = mobileNav.contains(target);
    const toggleClicked = toggle && toggle.contains(target);

    if (!inside && !toggleClicked) closeNav();
  });

  /* =========================
     Back to top
  ========================= */
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display =
        window.scrollY > 300 ? "flex" : "none";
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

});

/* =========================
   Plot carousel scroll (GLOBAL)
========================= */
function scrollPlots(button, direction) {
  const carousel = button.closest(".plot-carousel");
  if (!carousel) return;

  const container = carousel.querySelector(
    ".product-plot-strip, .product-plot-strip-wide"
  );

  if (!container) return;

  const scrollAmount = container.clientWidth * 0.8;

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}