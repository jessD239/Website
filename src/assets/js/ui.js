export function initUi() {
  const header = document.getElementById("header");
  const contentStartSection = document.getElementById("contentStart");
  const introContent = document.getElementById("introContent");
  const toggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const reveals = document.querySelectorAll(".reveal:not(.reveal--manual)");

  if (!header || !toggle || !mobileNav) {
    return;
  }

  function onScroll() {
    const triggerPoint = window.innerHeight * 0.3;
    const contentTop = contentStartSection ? contentStartSection.getBoundingClientRect().top : window.innerHeight;

    if (contentTop <= triggerPoint) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  }

  let navOpen = false;

  function setNav(open) {
    navOpen = open;
    mobileNav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  function updateIntroReveal() {
    if (!introContent) {
      return;
    }

    if (window.scrollY <= 8) {
      introContent.classList.remove("is-visible");
      return;
    }

    const introTrigger = window.innerHeight * 0.88;
    const introTop = introContent.getBoundingClientRect().top;

    if (introTop <= introTrigger) {
      introContent.classList.add("is-visible");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("scroll", updateIntroReveal, { passive: true });
  window.addEventListener("resize", updateIntroReveal);

  toggle.addEventListener("click", function () {
    setNav(!navOpen);
  });

  document.querySelectorAll("[data-close-nav]").forEach(function (link) {
    link.addEventListener("click", function () {
      setNav(false);
    });
  });

  onScroll();
  updateIntroReveal();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
}
